"use server";
// app/(default)/admin/sifre/actions.ts — davet bağlantısıyla şifre belirleme (girişsiz; bağlantıdaki tek kullanımlık anahtar şart)
import { redirect } from "next/navigation";
import { setPasswordByInvite } from "@/lib/panel-users";

export async function setPasswordAction(formData: FormData) {
  const u = String(formData.get("u") || "");
  const t = String(formData.get("t") || "");
  const res = await setPasswordByInvite(u, t, String(formData.get("password") || ""), String(formData.get("password2") || ""));
  if (!res.ok) {
    await new Promise((r) => setTimeout(r, 600)); // deneme-yanılmayı yavaşlat
    redirect(`/admin/sifre?${new URLSearchParams({ u, t, hata: res.error })}`);
  }
  redirect(`/admin/login?${new URLSearchParams({ sifre: "1", kullanici: res.user })}`);
}
