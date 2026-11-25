// app/api/cron/yedek/route.ts
// Haftalık talep yedeği: Vercel Cron (vercel.json, pazartesi 06:00 UTC = 09:00 Kıbrıs) çağırır.
// Yetki: CRON_SECRET tanımlıysa Vercel'in gönderdiği Bearer başlığı şart; değilse yalnız Vercel Cron istemcisi.
// Yedek yalnız sabit alıcıya (info@dndcyprus.com) gider; yanıtta kişisel veri yok.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadBackup, type BackupRow } from "@/lib/lead-backup";

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
  if (!(process.env.DATABASE_URL || "").trim() || !(process.env.RESEND_API_KEY || "").trim()) {
    return NextResponse.json({ ok: true, skipped: "not-configured" });
  }
  // aynı sunucu örneğinde 12 saatte bir kez (yinelenen tetiklemelere karşı; e-postada ayrıca günlük tekillik anahtarı var)
  if (Date.now() - lastRun < 12 * 3600 * 1000) return NextResponse.json({ ok: true, skipped: "recent" });
  lastRun = Date.now();
  try {
    const rows = (await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } })) as BackupRow[];
    const sent = await sendLeadBackup(rows);
    return NextResponse.json({ ok: sent === true, count: rows.length });
  } catch (error) {
    const e = error as { code?: unknown; name?: unknown } | null;
    console.error("LEAD_BACKUP_ERROR", { code: e?.code, name: e?.name });
    lastRun = 0;
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
