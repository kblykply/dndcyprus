// app/api/cron/clarity/route.ts
// Clarity günlük birikimi: Vercel Cron (vercel.json, her gün 03:00 UTC = 06:00 Kıbrıs) son 24 saati çeker.
// Yetki: CRON_SECRET varsa Bearer, yoksa yalnız Vercel Cron istemcisi. Yanıtta yalnız sayılar.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clarityConfigured, cyprusDay } from "@/lib/clarity";
import { syncClarity } from "@/lib/clarity-sync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let lastRun = 0;

function authorized(req: NextRequest) {
  const secret = (process.env.CRON_SECRET || "").trim();
  if (secret) return req.headers.get("authorization") === `Bearer ${secret}`;
  return /vercel-cron/i.test(req.headers.get("user-agent") || "");
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(process.env.DATABASE_URL || "").trim() || !clarityConfigured()) return NextResponse.json({ ok: true, skipped: "not-configured" });
  if (Date.now() - lastRun < 6 * 3600 * 1000) return NextResponse.json({ ok: true, skipped: "recent" });
  lastRun = Date.now();
  // 06:00 Kıbrıs'ta çekilen son 24 saatin çoğu önceki güne ait → o günün tarihiyle saklanır
  const day = cyprusDay(new Date(Date.now() - 12 * 3600 * 1000));
  try {
    const r = await syncClarity(day);
    if (!r.saved.length) lastRun = 0;
    return NextResponse.json({ ok: r.saved.length > 0, day, saved: r.saved.length, errors: r.errors.length });
  } catch (error) {
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("CLARITY_SYNC_ERROR", { code: e?.code, name: e?.name });
    lastRun = 0;
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
