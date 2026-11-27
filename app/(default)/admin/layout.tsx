// app/(default)/admin/layout.tsx
// Panel kabuğu: sol menü + içerik. Menüdeki "aranmayı bekleyen" sayısı yalnız geçerli oturumda sunucuda okunur.
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminShell from "@/app/(default)/admin/AdminShell";
import { ADMIN_SESSION_COOKIE, readAdminSession, verifyAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim Paneli | DND Cyprus",
  robots: { index: false, follow: false },
};

async function waitingCount(): Promise<number | null> {
  if (!(process.env.DATABASE_URL || "").trim()) return null;
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) return null;
  try {
    return await prisma.contactMessage.count({ where: { status: "yeni" } });
  } catch {
    return null; // durum kolonu henüz yoksa menü sayısız görünür
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const [waiting, session] = await Promise.all([waitingCount(), cookies().then((s) => readAdminSession(s.get(ADMIN_SESSION_COOKIE)?.value))]);
  return (
    <AdminShell waiting={waiting} user={(session?.name || process.env.ADMIN_USER || "Yönetici").slice(0, 40)} role={session?.role ?? "admin"}>
      {children}
    </AdminShell>
  );
}
