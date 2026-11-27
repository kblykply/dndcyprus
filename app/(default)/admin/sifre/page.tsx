// app/(default)/admin/sifre/page.tsx
// Şifre belirleme (27.11.2026): yöneticinin Kullanıcılar sayfasından gönderdiği bağlantıyla kişi (ör. Talha) şifresini kendisi
// belirler. Girişsiz açılır; bağlantı tek kullanımlık ve 3 gün geçerli. Panel kabuğu (menü) burada gösterilmez.
import type { Metadata } from "next";
import { KeyRound, TriangleAlert } from "lucide-react";
import { inviteValid, loadPanelUsers } from "@/lib/panel-users";
import { setPasswordAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Şifre belirle | DND Cyprus", robots: { index: false, follow: false } };

const INPUT = "mt-1 w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";

export default async function SetPasswordPage(props: { searchParams?: Promise<{ u?: string; t?: string; hata?: string }> } = {}) {
  const sp = (await props.searchParams) ?? {};
  const u = String(sp.u || "");
  const t = String(sp.t || "");
  const users = await loadPanelUsers();
  const found = users.find((x) => x.user === u && x.active);
  const ok = !!found && inviteValid(found, t);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">DND CYPRUS</p>
        <h1 className="mt-1 flex items-center gap-2 text-xl font-semibold text-slate-900">
          <KeyRound className="h-5 w-5 text-[#0d6570]" aria-hidden /> Şifreni belirle
        </h1>
        {ok ? (
          <>
            <p className="mt-1 text-sm text-slate-500">
              Merhaba {found!.name}. Kullanıcı adın: <b className="text-slate-800">{found!.user}</b>. Şifreni belirle, sonra panele giriş yap.
            </p>
            {sp.hata ? (
              <p className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden /> {sp.hata}
              </p>
            ) : null}
            <form action={setPasswordAction} className="mt-5 space-y-4">
              <input type="hidden" name="u" value={found!.user} />
              <input type="hidden" name="t" value={t} />
              <input type="text" name="username" value={found!.user} autoComplete="username" readOnly hidden />
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-slate-700">
                  Yeni şifre
                </label>
                <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={INPUT} />
              </div>
              <div>
                <label htmlFor="password2" className="block text-xs font-medium text-slate-700">
                  Yeni şifre (tekrar)
                </label>
                <input id="password2" name="password2" type="password" required minLength={8} autoComplete="new-password" className={INPUT} />
              </div>
              <p className="text-xs text-slate-500">En az 8 karakter; en az bir harf ve bir rakam.</p>
              <button type="submit" className="w-full rounded-full bg-[#0d6570] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0a5159]">
                Şifreyi kaydet
              </button>
            </form>
          </>
        ) : (
          <p className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-800">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> Bu bağlantı geçersiz, kullanılmış ya da süresi dolmuş. Yöneticiden yeni bağlantı iste.
          </p>
        )}
      </div>
    </div>
  );
}
