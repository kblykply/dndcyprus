"use server";
// Isı Haritası: "Şimdi güncelle" (son 24 saati "anlik" kaydına yazar). 3 Clarity isteği harcar; 2 saatte bir kez.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { clarityConfigured } from "@/lib/clarity";
import { syncClarity } from "@/lib/clarity-sync";

export async function refreshClarity() {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/isi-haritasi");
  if (!clarityConfigured()) redirect("/admin/isi-haritasi");
  const last = await prisma.claritySnapshot.findFirst({ where: { day: "anlik" }, orderBy: { fetchedAt: "desc" }, select: { fetchedAt: true } });
  if (last && Date.now() - last.fetchedAt.getTime() < 2 * 3600 * 1000) redirect("/admin/isi-haritasi?donem=anlik&mesaj=yakin");
  const r = await syncClarity("anlik");
  revalidatePath("/admin/isi-haritasi");
  redirect(`/admin/isi-haritasi?donem=anlik${r.saved.length ? "" : "&mesaj=hata"}`);
}
