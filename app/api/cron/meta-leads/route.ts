// app/api/cron/meta-leads/route.ts
// Meta reklam formu talepleri: Vercel Cron (vercel.json, 10 dakikada bir) yeni talepleri panele çeker (lib/meta-leads.ts).
// Yetki: CRON_SECRET varsa Bearer, yoksa yalnız Vercel Cron istemcisi. Yanıtta yalnız sayılar (kişi verisi yok).
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { metaLeadsConfigured, syncMetaLeads } from "@/lib/meta-leads";

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
  if (!(process.env.DATABASE_URL || "").trim() || !metaLeadsConfigured()) return NextResponse.json({ ok: true, skipped: "not-configured" });
  try {
    const r = await syncMetaLeads();
    return NextResponse.json({ ok: r.ok, inserted: r.inserted ?? 0, merged: r.merged ?? 0, forms: r.forms ?? 0, error: r.error ? "sync-error" : null });
  } catch (error) {
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("META_LEADS_SYNC_ERROR", { code: e?.code, name: e?.name });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
