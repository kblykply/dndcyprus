// app/api/cron/sabah-ozeti/route.ts
// Sabah e-postaları: Vercel Cron 06:00 ve 07:00 UTC'de çağırır; yalnız Kıbrıs saati 09 olan çağrı gönderir (yaz/kış saati
// farkı kendiliğinden doğru saate oturur). Göndermeden hemen önce Meta mesajları yeniden çekilir (gece gelenler eksik kalmasın).
//   1) Sabah özeti → info@ + mesajlara cevap veren (MSG_RESPONDER_EMAIL) + e-postası girilmiş panel kullanıcıları
//   2) Cevap bekleyen mesajlar (gece gelenler önce, müşterinin son mesajı + "Cevap yaz") → cevap veren + satış rolündeki kullanıcılar
// Günde bir kez (SyncState "sabah-ozeti" + Resend tekillik anahtarları).
// Yetki: CRON_SECRET varsa Bearer şart, yoksa yalnız Vercel Cron istemcisi. ?zorla=1 yalnız CRON_SECRET ile (saat şartını atlar).
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { cyprusDayKey } from "@/lib/lead-followup";
import { loadLiveMsgState, syncMetaMessages } from "@/lib/meta-messages";
import { metaLeadsConfigured } from "@/lib/meta-leads";
import { buildDigest, digestRecipients, responderEmails, sendDigest, sendWaiting, waitingMessages } from "@/lib/morning-digest";
import { loadPanelUsers } from "@/lib/panel-users";
import type { BoardLead } from "@/lib/today-board";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 180;

const KEY = "sabah-ozeti";

function authorized(req: NextRequest) {
  const secret = (process.env.CRON_SECRET || "").trim();
  if (secret) return req.headers.get("authorization") === `Bearer ${secret}`;
  return /vercel-cron/i.test(req.headers.get("user-agent") || "");
}

const cyprusHour = (d: Date) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Famagusta", hour: "2-digit", hourCycle: "h23" }).format(d));

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(process.env.DATABASE_URL || "").trim() || !(process.env.RESEND_API_KEY || "").trim()) return NextResponse.json({ ok: true, skipped: "not-configured" });
  const force = req.nextUrl.searchParams.get("zorla") === "1" && !!(process.env.CRON_SECRET || "").trim();
  if (!force && cyprusHour(new Date()) !== 9) return NextResponse.json({ ok: true, skipped: "not-9am" });
  const day = cyprusDayKey(new Date());
  try {
    const prev = await prisma.syncState.findUnique({ where: { key: KEY } });
    if (!force && (prev?.data as { day?: string } | null)?.day === day) return NextResponse.json({ ok: true, skipped: "already-sent" });
    // gece gelen mesajlar: göndermeden önce Meta'dan son durum (en çok ~90 sn; hata olursa eldekiyle devam)
    const sync = metaLeadsConfigured() ? await syncMetaMessages().catch(() => null) : null;
    const now = new Date();
    const [rows, state, users] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: { id: true, createdAt: true, name: true, phone: true, email: true, project: true, source: true, form: true, status: true, statusAt: true, assignee: true, followUpAt: true, subject: true },
      }),
      loadLiveMsgState(),
      loadPanelUsers(),
    ]);
    const leads = rows as BoardLead[];
    const active = users.filter((u) => u.active && u.email);
    const digest = buildDigest(leads, state, now);
    const sent = await sendDigest(digest, day, digestRecipients(active.map((u) => u.email!)));
    const waiting = waitingMessages(leads, state, now);
    const waitingTo = [...new Set([...responderEmails(), ...active.filter((u) => u.role === "satis").map((u) => u.email!.toLowerCase())])];
    const waitingSent = waitingTo.length ? await sendWaiting(waiting, now, day, waitingTo) : null;
    if (sent) await prisma.syncState.upsert({ where: { key: KEY }, create: { key: KEY, data: { day, at: now.toISOString() } }, update: { data: { day, at: now.toISOString() } } });
    return NextResponse.json({ ok: sent === true, synced: sync ? sync.conversations ?? 0 : null, waiting: waiting.length, waitingSent, yesterday: digest.yesterday.length });
  } catch (error) {
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("MORNING_DIGEST_ERROR", { code: e?.code, name: e?.name });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
