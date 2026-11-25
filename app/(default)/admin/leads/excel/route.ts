// app/(default)/admin/leads/excel/route.ts
// Paneldeki görünümün (durum sekmesi + filtreler) Excel'de açılan CSV'si: durum ve iç notlar dahil.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { leadsToCsv } from "@/lib/lead-backup";
import { filterLeads } from "@/lib/lead-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await verifyAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sp = req.nextUrl.searchParams;
  const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, include: { notes: { orderBy: { createdAt: "asc" } } } });
  const list = filterLeads(rows, {
    durum: sp.get("durum") || undefined,
    q: sp.get("q") || undefined,
    proje: sp.get("proje") || undefined,
    kaynak: sp.get("kaynak") || undefined,
    donem: sp.get("donem") || undefined,
  });
  const day = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Famagusta" });
  return new NextResponse(leadsToCsv(list), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dndcyprus-satis-talepleri-${day}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
