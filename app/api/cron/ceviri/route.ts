// app/api/cron/ceviri/route.ts
// Bekleyen otomatik çeviriler: Vercel Cron (vercel.json, 10 dakikada bir) kuyruktaki işleri yeniden dener (lib/content/translate-jobs).
// Yetki: CRON_SECRET varsa Bearer, yoksa yalnız Vercel Cron istemcisi. Yanıtta yalnız sayılar.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { translationConfigured } from "@/lib/content/translate";
import { processTranslationQueue } from "@/lib/content/translate-jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function authorized(req: NextRequest) {
  const secret = (process.env.CRON_SECRET || "").trim();
  if (secret) return req.headers.get("authorization") === `Bearer ${secret}`;
  return /vercel-cron/i.test(req.headers.get("user-agent") || "");
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(process.env.DATABASE_URL || "").trim() || !translationConfigured()) return NextResponse.json({ ok: true, skipped: "not-configured" });
  try {
    const r = await processTranslationQueue(90_000);
    return NextResponse.json({ ok: true, ...r });
  } catch (error) {
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("TRANSLATE_QUEUE_ERROR", { code: e?.code, name: e?.name });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
