// app/api/contact/route.ts
import { NextResponse, after } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeAttribution, sourceFromAttribution } from "@/lib/attribution";
import { sendMetaLeadEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Alan başına üst sınır (fazlası kesilir)
const LIMITS = {
  name: 120,
  phone: 40,
  subject: 200,
  message: 5000,
  project: 80,
  unitType: 80,
  form: 40,
  pageUrl: 1000,
} as const;

function str(v: unknown, max: number) {
  if (typeof v !== "string" && typeof v !== "number") return "";
  return String(v).trim().slice(0, max);
}

function cleanPageUrl(v: unknown) {
  const s = str(v, LIMITS.pageUrl);
  if (!s) return "";
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString().slice(0, LIMITS.pageUrl) : "";
  } catch {
    return "";
  }
}

/** Migration henüz çalışmadıysa yeni kolonlar yoktur (P2022 / Postgres 42703) */
function isMissingColumnError(err: unknown) {
  const e = err as { code?: unknown; message?: unknown } | null;
  const msg = typeof e?.message === "string" ? e.message : "";
  return e?.code === "P2022" || /column .* does not exist/i.test(msg) || msg.includes("42703");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("bad body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot doluysa kaydetmeden başarılı dön
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, LIMITS.name);
  const email = str(body.email, 1000);
  const phone = str(body.phone, LIMITS.phone);
  const project = str(body.project, LIMITS.project);
  const unitType = str(body.unitType, LIMITS.unitType);
  const form = str(body.form, LIMITS.form);
  const pageUrl = cleanPageUrl(body.pageUrl);
  const rawEventId = str(body.eventId, 64);
  const eventId = /^[A-Za-z0-9-]{8,64}$/.test(rawEventId) ? rawEventId : "";

  let subject = str(body.subject, LIMITS.subject);
  let message = str(body.message, LIMITS.message);

  if (!name || !email || (!phone && !message)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  // Mesaj yoksa telefon tek iletişim bilgisidir → makul uzunlukta olmalı
  if (!message && phone.replace(/\D/g, "").length < 6) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  // Lead formunda konu/mesaj alanı yok → okunur varsayılanlar
  if (!subject) subject = project ? `${project} – Fiyat/Bilgi talebi` : "Web sitesi – Bilgi talebi";
  if (!message) message = unitType ? `Daire tipi: ${unitType}` : "Fiyat ve kat planı bilgisi talebi.";

  const attribution = sanitizeAttribution(body.attribution);
  const { source, campaign } = sourceFromAttribution(attribution);

  const legacyData = { name, email, phone: phone || null, subject, message };

  try {
    try {
      await prisma.contactMessage.create({
        data: {
          ...legacyData,
          project: project || null,
          unitType: unitType || null,
          form: form || null,
          source,
          campaign,
          pageUrl: pageUrl || null,
          eventId: eventId || null,
          ...(attribution ? { attribution } : {}),
        },
        // Yalnızca id: RETURNING eski şemada olmayan kolonları istemesin
        select: { id: true },
      });
    } catch (err) {
      if (!isMissingColumnError(err)) throw err;
      console.warn(
        "CONTACT_API_LEGACY_COLUMNS: 20260915120000_lead_attribution migration'ı uygulanmamış; kayıt kaynak bilgisi olmadan yapıldı",
      );
      await prisma.contactMessage.create({ data: legacyData, select: { id: true } });
    }
  } catch (error) {
    // Prisma hata metni form verisini içerebilir → yalnızca kod
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("CONTACT_API_ERROR", { code: e?.code, name: e?.name });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // Meta CAPI: yalnızca reklam izni varsa; yanıt döndükten sonra çalışır
  const consent = body.consent as { ads?: unknown } | null | undefined;
  if (consent && consent.ads === true && eventId) {
    const xff = req.headers.get("x-forwarded-for") || "";
    const clientIp = xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
    const userAgent = req.headers.get("user-agent")?.slice(0, 500) || undefined;
    const fbp = req.cookies.get("_fbp")?.value;
    const fbc = req.cookies.get("_fbc")?.value;
    const fbTouch = [attribution?.current, attribution?.last, attribution?.first].find((t) => t?.fbclid);
    const locale = pageUrl && new URL(pageUrl).pathname.startsWith("/en") ? "en" : "tr";

    after(() =>
      sendMetaLeadEvent({
        eventId,
        eventSourceUrl: pageUrl || undefined,
        email,
        phone: phone || undefined,
        clientIp,
        userAgent,
        fbp: fbp && fbp.startsWith("fb.") ? fbp.slice(0, 300) : undefined,
        fbc: fbc && fbc.startsWith("fb.") ? fbc.slice(0, 500) : undefined,
        fbclid: fbTouch?.fbclid,
        fbclidTs: fbTouch?.ts || undefined,
        contentName: project || undefined,
        locale,
      }),
    );
  }

  return NextResponse.json({ ok: true });
}
