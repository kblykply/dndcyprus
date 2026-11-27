"use server";
// app/(default)/admin/kullanicilar/actions.ts — panel kullanıcısı ekle, şifre yenile, kapat/aç, sil (yalnız yönetici)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/admin-auth";
import { cleanUsername, hashPassword, loadPanelUsers, newInvite, passwordProblem, savePanelUsers, type PanelUser } from "@/lib/panel-users";
import { SITE_URL } from "@/lib/seo";

/** Davet bağlantısı yöneticiye bir kez gösterilir: 10 dakikalık, yalnız bu sayfaya giden çerezle (adres çubuğuna düşmez) */
export const INVITE_FLASH = "davet_baglanti";
async function flashInvite(user: string, name: string, token: string) {
  const url = `${SITE_URL}/admin/sifre?u=${encodeURIComponent(user)}&t=${token}`;
  (await cookies()).set(INVITE_FLASH, JSON.stringify({ user, name, url }), { httpOnly: true, secure: true, sameSite: "strict", path: "/admin/kullanicilar", maxAge: 600 });
}

const back = (q: Record<string, string>) => redirect(`/admin/kullanicilar?${new URLSearchParams(q)}`);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createUser(formData: FormData) {
  await requireRole("admin", "/admin/kullanicilar");
  const user = cleanUsername(formData.get("user"));
  const name = String(formData.get("name") || "").replace(/\s+/g, " ").trim().slice(0, 60);
  const role = formData.get("role") === "admin" ? "admin" : "satis";
  const email = String(formData.get("email") || "").trim().toLowerCase().slice(0, 254);
  const pw = String(formData.get("password") || "");
  const pw2 = String(formData.get("password2") || "");
  if (!user) back({ hata: "Kullanıcı adı 3–30 karakter olmalı: harf, rakam, nokta, tire." });
  if (!name) back({ hata: "Ad gerekli (notlarda bu ad görünür)." });
  if (email && !EMAIL_RE.test(email)) back({ hata: "E-posta adresi geçersiz." });
  // şifre boşsa kişi kendi şifresini davet bağlantısıyla belirler
  if (pw) {
    const problem = passwordProblem(pw);
    if (problem) back({ hata: problem });
    if (pw !== pw2) back({ hata: "Şifreler aynı değil." });
  }
  if (user === (process.env.ADMIN_USER || "").toLowerCase()) back({ hata: "Bu kullanıcı adı ana yöneticinin adı." });
  const users = await loadPanelUsers();
  if (users.some((u) => u.user === user)) back({ hata: "Bu kullanıcı adı zaten var." });
  const inv = pw ? null : newInvite();
  const row: PanelUser = {
    user: user!,
    name,
    role,
    ...(email ? { email } : {}),
    active: true,
    hash: pw ? await hashPassword(pw) : "",
    ...(inv ? { invite: inv.invite } : {}),
    createdAt: new Date().toISOString(),
  };
  await savePanelUsers([...users, row]);
  if (inv) await flashInvite(row.user, name, inv.token);
  revalidatePath("/admin/kullanicilar");
  back({ tamam: inv ? `${name} eklendi. Aşağıdaki bağlantıyı kişiye gönderin; şifresini kendisi belirleyecek.` : `${name} eklendi. Kullanıcı adı: ${user}` });
}

export async function resetPassword(formData: FormData) {
  await requireRole("admin", "/admin/kullanicilar");
  const user = cleanUsername(formData.get("user"));
  const pw = String(formData.get("password") || "");
  const problem = passwordProblem(pw);
  if (problem) back({ hata: problem });
  const users = await loadPanelUsers();
  const found = users.find((u) => u.user === user);
  if (!found) back({ hata: "Kullanıcı bulunamadı." });
  found!.hash = await hashPassword(pw);
  await savePanelUsers(users);
  revalidatePath("/admin/kullanicilar");
  back({ tamam: `${found!.name} için yeni şifre kaydedildi.` });
}

export async function updateUser(formData: FormData) {
  await requireRole("admin", "/admin/kullanicilar");
  const user = cleanUsername(formData.get("user"));
  const op = String(formData.get("op") || "");
  const users = await loadPanelUsers();
  const found = users.find((u) => u.user === user);
  if (!found) back({ hata: "Kullanıcı bulunamadı." });
  if (op === "sil") {
    await savePanelUsers(users.filter((u) => u.user !== user));
    revalidatePath("/admin/kullanicilar");
    back({ tamam: `${found!.name} silindi.` });
  }
  if (op === "kapat" || op === "ac") found!.active = op === "ac";
  if (op === "eposta") {
    const email = String(formData.get("email") || "").trim().toLowerCase().slice(0, 254);
    if (email && !EMAIL_RE.test(email)) back({ hata: "E-posta adresi geçersiz." });
    found!.email = email || undefined;
  }
  await savePanelUsers(users);
  revalidatePath("/admin/kullanicilar");
  back({ tamam: op === "kapat" ? `${found!.name} girişi kapatıldı (açık oturumu en çok 8 saat sürer).` : op === "ac" ? `${found!.name} girişi açıldı.` : "Kaydedildi." });
}

/** Davet / şifre yenileme bağlantısı (önceki bağlantı geçersiz olur; mevcut şifre bağlantı kullanılana kadar çalışır) */
export async function inviteUser(formData: FormData) {
  await requireRole("admin", "/admin/kullanicilar");
  const user = cleanUsername(formData.get("user"));
  const users = await loadPanelUsers();
  const found = users.find((u) => u.user === user);
  if (!found) back({ hata: "Kullanıcı bulunamadı." });
  const inv = newInvite();
  found!.invite = inv.invite;
  await savePanelUsers(users);
  await flashInvite(found!.user, found!.name, inv.token);
  revalidatePath("/admin/kullanicilar");
  back({ tamam: `${found!.name} için yeni bağlantı hazır.` });
}
