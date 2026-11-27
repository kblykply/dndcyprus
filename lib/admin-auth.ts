// lib/admin-auth.ts — panel sunucu eylemleri için ortak oturum ve "yazan" bilgisi (yalnız sunucu)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, readAdminSession, verifyAdminSession, type AdminSession } from "./admin-session";

export const AUTHOR_COOKIE = "admin_author";

/** Sunucu eylemleri doğrudan POST ile de çağrılabilir: her eylem oturumu yeniden doğrular */
export async function requireAdmin(next = "/admin") {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect(`/admin/login?next=${encodeURIComponent(next)}`);
  return store;
}

export function authorFromCookies(store: Awaited<ReturnType<typeof cookies>>) {
  const saved = store.get(AUTHOR_COOKIE)?.value;
  if (saved) {
    try {
      return decodeURIComponent(saved).slice(0, 60);
    } catch {
      /* bozuk çerez */
    }
  }
  return (process.env.ADMIN_USER || "Yönetici").slice(0, 60);
}

/** Geçerli panel oturumu (kullanıcı, ad, rol) */
export async function currentAdmin(store?: Awaited<ReturnType<typeof cookies>>): Promise<AdminSession | null> {
  const st = store ?? (await cookies());
  return readAdminSession(st.get(ADMIN_SESSION_COOKIE)?.value);
}

/** Yalnız yönetici: satış rolü yönetici sayfasına/eylemine gelirse Bugün'e döner */
export async function requireRole(role: "admin", next = "/admin") {
  const store = await requireAdmin(next);
  const s = await currentAdmin(store);
  if (!s || s.role !== role) redirect("/admin/bugun");
  return { store, session: s };
}
