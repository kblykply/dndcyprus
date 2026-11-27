// app/api/cron/sabah-ozeti/route.ts
// Sabah özeti e-postası: Vercel Cron 06:00 ve 07:00 UTC'de çağırır; yalnız Kıbrıs saati 09 olan çağrı gönderir (yaz/kış saati
// farkı kendiliğinden doğru saate oturur). Günde bir kez (SyncState "sabah-ozeti" + Resend tekillik anahtarı).
// Yetki: CRON_SECRET varsa Bearer şart, yoksa yalnız Vercel Cron istemcisi. ?zorla=1 yalnız CRON_SECRET ile (saat şartını atlar).
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { cyprusDayKey } from "@/lib/lead-followup";
import { loadMetaMsgState } from "@/lib/meta-messages";
import { buildDigest, sendDigest } from "@/lib/morning-digest";
import type { BoardLead } from "@/lib/today-board";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const now = new Date();
  const force = req.nextUrl.searchParams.get("zorla") === "1" && !!(process.env.CRON_SECRET || "").trim();
  if (!force && cyprusHour(now) !== 9) return NextResponse.json({ ok: true, skipped: "not-9am" });
  const day = cyprusDayKey(now);
  try {
    const prev = await prisma.syncState.findUnique({ where: { key: KEY } });
    if (!force && (prev?.data as { day?: string } | null)?.day === day) return NextResponse.json({ ok: true, skipped: "already-sent" });
    const [rows, state] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: { id: true, createdAt: true, name: true, phone: true, email: true, project: true, source: true, form: true, status: true, statusAt: true, assignee: true, followUpAt: true },
      }),
      loadMetaMsgState(),
    ]);
    const digest = buildDigest(rows as BoardLead[], state, now);
    const sent = await sendDigest(digest, day);
    if (sent) await prisma.syncState.upsert({ where: { key: KEY }, create: { key: KEY, data: { day, at: now.toISOString() } }, update: { data: { day, at: now.toISOString() } } });
    return NextResponse.json({ ok: sent === true, waiting: digest.total, yesterday: digest.yesterday.length });
  } catch (error) {
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("MORNING_DIGEST_ERROR", { code: e?.code, name: e?.name });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
