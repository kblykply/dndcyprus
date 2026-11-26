// app/api/cron/meta-mesaj/route.ts
// Meta mesajları (Messenger + Instagram DM): Vercel Cron (vercel.json, 10 dakikada bir) yeni ve değişen sohbetleri panele
// işler (lib/meta-messages.ts). Yetki: CRON_SECRET varsa Bearer, yoksa yalnız Vercel Cron istemcisi. Yanıtta yalnız sayılar.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { metaLeadsConfigured } from "@/lib/meta-leads";
import { syncMetaMessages } from "@/lib/meta-messages";

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
    const r = await syncMetaMessages();
    return NextResponse.json({ ok: r.ok, inserted: r.inserted ?? 0, updated: r.updated ?? 0, merged: r.merged ?? 0, conversations: r.conversations ?? 0, error: r.error ? "sync-error" : null });
  } catch (error) {
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("META_MESSAGES_SYNC_ERROR", { code: e?.code, name: e?.name });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
