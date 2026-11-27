// app/(default)/admin/kullanicilar/page.tsx
// Kullanıcılar (27.11.2026): yöneticinin panele kişi eklediği sayfa (ör. Talha — satış rolü). Şifreyi yönetici kendisi belirler
// ve kişiye iletir; panel şifreyi hiçbir yerde göstermez. Satış rolü: Bugün, Genel Bakış, Satış Talepleri, Reklam Raporu.
import { cookies } from "next/headers";
import { CheckCircle2, KeyRound, Link2, Mail, MessageCircle, ShieldCheck, TriangleAlert, UserPlus } from "lucide-react";
import { requireRole } from "@/lib/admin-auth";
import { INVITE_FLASH, ROLE_LABEL, loadPanelUsers } from "@/lib/panel-users";
import { cyprusDateTime } from "@/lib/lead-status";
import { createUser, inviteUser, resetPassword, updateUser } from "./actions";
import { ConfirmButton } from "../leads/LeadControls";

export const dynamic = "force-dynamic";

const INPUT = "mt-1.5 block h-10 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";
const LABEL = "text-[12px] font-semibold uppercase tracking-wide text-slate-500";
const BTN = "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#0d6570] px-5 text-sm font-semibold text-white hover:bg-[#0a5159]";
const SMALL = "inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50";
/** Satır içi kutu + düğme: ikisi de 40 px, aynı çizgide (çakışan boşluk/yükseklik sınıfı yok) */
const INLINE_INPUT = "block h-10 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";
const INLINE_BTN = "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50";

export default async function UsersPage(props: { searchParams?: Promise<{ tamam?: string; hata?: string }> } = {}) {
  await requireRole("admin", "/admin/kullanicilar");
  const sp = (await props.searchParams) ?? {};
  const users = await loadPanelUsers();
  const owner = process.env.ADMIN_USER || "Yönetici";
  // az önce oluşturulan davet bağlantısı (10 dk'lık çerezden; adres çubuğunda görünmez)
  let invite: { user: string; name: string; url: string; mailed?: string | null } | null = null;
  try {
    const raw = (await cookies()).get(INVITE_FLASH)?.value;
    invite = raw ? JSON.parse(raw) : null;
  } catch {
    invite = null;
  }
  const waText = invite
    ? `Merhaba ${invite.name}, DND Cyprus yönetim paneline hesabın açıldı. Kullanıcı adın: ${invite.user}\nŞifreni bu bağlantıdan kendin belirle (3 gün geçerli, tek kullanımlık):\n${invite.url}\nSonra www.dndcyprus.com/admin adresinden giriş yapabilirsin.`
    : "";

  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">Kullanıcılar</h1>
      <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
        Panele girecek kişileri buradan ekleyin. Satış rolü yalnız Bugün, Genel Bakış, Satış Talepleri ve Reklam Raporu&apos;nu görür; talep durumunu ve
        notları kendi adıyla değiştirir. Şifre boş bırakılırsa kişi şifresini e-postasına gelen bağlantıyla kendisi belirler.
      </p>

      {sp.tamam ? (
        <p className="mt-5 flex items-center gap-2 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden /> {sp.tamam}
        </p>
      ) : null}
      {sp.hata ? (
        <p className="mt-5 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden /> {sp.hata}
        </p>
      ) : null}

      {invite ? (
        <section className="mt-5 rounded-3xl border border-teal-200 bg-[#eef5f6] p-5" aria-label="Davet bağlantısı">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Link2 className="h-4 w-4 text-[#0d6570]" aria-hidden /> {invite.name} için şifre belirleme bağlantısı
          </p>
          <p className="mt-1 text-[13px] text-slate-600">
            {invite.mailed ? `${invite.mailed} adresine e-postayla gönderildi. ` : ""}3 gün geçerli, tek kullanımlık. Bu bağlantı yalnız şimdi gösterilir;
            kaybolursa &quot;Yeni bağlantı&quot; ile tekrar oluşturun.
          </p>
          <label className="sr-only" htmlFor="davet-url">
            Bağlantı
          </label>
          <input id="davet-url" readOnly value={invite.url} className={`${INPUT} font-mono text-xs`} />
          <a href={`https://wa.me/?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" className={`${BTN} mt-3 bg-[#1f9d55] hover:bg-[#178246]`}>
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp&apos;tan gönder
          </a>
        </section>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="liste">
          <h2 id="liste" className="text-lg font-semibold text-slate-900">
            Panele girebilenler
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3 rounded-2xl bg-[#f5f8f8] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-slate-900">{owner}</span>
                <span className="block text-[13px] text-slate-500">Ana yönetici · şifresi Vercel&apos;de (değiştirmek için Vercel ayarları)</span>
              </span>
            </li>
            {users.map((u) => (
              <li key={u.user} className={`rounded-2xl border p-4 ${u.active ? "border-slate-200" : "border-dashed border-slate-300 bg-slate-50"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-slate-900">
                      {u.name} <span className="font-normal text-slate-500">· {u.user}</span>
                    </p>
                    <p className="text-[13px] text-slate-500">
                      {ROLE_LABEL[u.role]}
                      {u.active ? "" : " · giriş kapalı"}
                      {!u.hash ? " · şifresini henüz belirlemedi" : ""}
                      {u.invite ? ` · bağlantı ${cyprusDateTime(new Date(u.invite.exp)).date} ${cyprusDateTime(new Date(u.invite.exp)).time}'e kadar geçerli` : ""}
                      {u.lastLoginAt ? ` · son giriş ${cyprusDateTime(new Date(u.lastLoginAt)).date} ${cyprusDateTime(new Date(u.lastLoginAt)).time}` : " · henüz girmedi"}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[13px] text-slate-500">
                      <Mail className="h-3.5 w-3.5" aria-hidden /> {u.email ? `${u.email} · sabah özeti buraya da gider` : "e-posta yok"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={inviteUser}>
                      <input type="hidden" name="user" value={u.user} />
                      <button type="submit" className={SMALL} title="Kişi şifresini kendisi belirlesin / unuttuysa yenilesin">
                        <Link2 className="h-3.5 w-3.5" aria-hidden /> {u.hash ? "Şifre yenileme bağlantısı" : "Yeni bağlantı"}
                      </button>
                    </form>
                    <form action={updateUser}>
                      <input type="hidden" name="user" value={u.user} />
                      <input type="hidden" name="op" value={u.active ? "kapat" : "ac"} />
                      <button type="submit" className={SMALL}>
                        {u.active ? "Girişi kapat" : "Girişi aç"}
                      </button>
                    </form>
                    <form action={updateUser}>
                      <input type="hidden" name="user" value={u.user} />
                      <input type="hidden" name="op" value="sil" />
                      <ConfirmButton message={`${u.name} kullanıcısı silinsin mi? Bu kişi panele bir daha giremez.`} className={`${SMALL} text-red-600 hover:bg-red-50`}>
                        Sil
                      </ConfirmButton>
                    </form>
                  </div>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <form action={resetPassword} className="flex items-center gap-2">
                    <input type="hidden" name="user" value={u.user} />
                    <label className="sr-only" htmlFor={`pw-${u.user}`}>
                      Yeni şifre
                    </label>
                    <input id={`pw-${u.user}`} name="password" type="password" autoComplete="new-password" placeholder="Yeni şifre" className={INLINE_INPUT} required minLength={8} />
                    <button type="submit" className={INLINE_BTN}>
                      <KeyRound className="h-3.5 w-3.5" aria-hidden /> Kaydet
                    </button>
                  </form>
                  <form action={updateUser} className="flex items-center gap-2">
                    <input type="hidden" name="user" value={u.user} />
                    <input type="hidden" name="op" value="eposta" />
                    <label className="sr-only" htmlFor={`em-${u.user}`}>
                      E-posta
                    </label>
                    <input id={`em-${u.user}`} name="email" type="email" defaultValue={u.email ?? ""} placeholder="E-posta (sabah özeti)" className={INLINE_INPUT} />
                    <button type="submit" className={INLINE_BTN}>
                      <Mail className="h-3.5 w-3.5" aria-hidden /> Kaydet
                    </button>
                  </form>
                </div>
              </li>
            ))}
            {!users.length ? <li className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">Henüz kimse eklenmedi.</li> : null}
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="yeni">
          <h2 id="yeni" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <UserPlus className="h-5 w-5 text-[#0d6570]" aria-hidden /> Yeni kullanıcı
          </h2>
          <form action={createUser} className="mt-4 space-y-4">
            <div>
              <label className={LABEL} htmlFor="name">
                Ad (notlarda görünür)
              </label>
              <input id="name" name="name" required maxLength={60} placeholder="örn. Ahmet" className={INPUT} />
            </div>
            <div>
              <label className={LABEL} htmlFor="user">
                Kullanıcı adı
              </label>
              <input id="user" name="user" required maxLength={30} autoComplete="off" placeholder="örn. ahmet" className={INPUT} />
            </div>
            <div>
              <label className={LABEL} htmlFor="role">
                Rol
              </label>
              <select id="role" name="role" defaultValue="satis" className={INPUT}>
                <option value="satis">{ROLE_LABEL.satis}</option>
                <option value="admin">{ROLE_LABEL.admin}</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="email">
                E-posta (isteğe bağlı · sabah özeti)
              </label>
              <input id="email" name="email" type="email" maxLength={254} placeholder="örn. ahmet@gmail.com" className={INPUT} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={LABEL} htmlFor="password">
                  Şifre (isteğe bağlı)
                </label>
                <input id="password" name="password" type="password" minLength={8} autoComplete="new-password" className={INPUT} />
              </div>
              <div>
                <label className={LABEL} htmlFor="password2">
                  Şifre (tekrar)
                </label>
                <input id="password2" name="password2" type="password" minLength={8} autoComplete="new-password" className={INPUT} />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Şifreyi <b>boş bırakın</b>: şifre belirleme bağlantısı kişinin e-postasına gider (size de gösterilir, isterseniz WhatsApp&apos;tan
              iletirsiniz); kişi şifresini kendisi belirler. Ya da siz belirleyin (en az 8 karakter, bir harf ve bir rakam).
            </p>
            <button type="submit" className={BTN}>
              <UserPlus className="h-4 w-4" aria-hidden /> Kullanıcıyı ekle
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
