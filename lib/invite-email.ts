// lib/invite-email.ts
// Panel daveti (27.11.2026): yöneticinin eklediği kişiye (ör. Talha) şifre belirleme bağlantısı DND kurumsal e-posta kabuğunda.
// Gönderim Resend ile (takip.dndcyprus.com); anahtar yoksa gönderilmez (bağlantı yine panelde yöneticiye gösterilir).
import { SITE_URL } from "./seo";
import { F, R, esc, kabuk } from "./lead-email";

export type InviteMail = { name: string; user: string; email: string; url: string; reset?: boolean };

export function inviteSubject(v: InviteMail) {
  return v.reset ? "DND Cyprus panel · şifre yenileme bağlantın" : "DND Cyprus yönetim paneline davetlisin";
}

export function inviteHtml(v: InviteMail) {
  const govde = `<tr><td class="px" style="padding:26px 40px 4px;font-family:${F};">
<p style="margin:0 0 10px;"><span style="display:inline-block;background:${R.teal};color:#FFFFFF;border-radius:6px;padding:4px 10px;font-size:11px;letter-spacing:1px;font-weight:800;">${v.reset ? "ŞİFRE YENİLEME" : "PANEL DAVETİ"}</span></p>
<p style="margin:0;font-size:22px;line-height:29px;font-weight:800;color:${R.yazi};">Merhaba ${esc(v.name)},</p>
<p style="margin:8px 0 0;font-size:15px;line-height:23px;color:${R.gri};">${
    v.reset ? "Panel şifreni yenilemek için aşağıdaki düğmeye bas." : "DND Cyprus yönetim paneline hesabın açıldı. Şifreni aşağıdaki düğmeden kendin belirle."
  }</p>
<p style="margin:14px 0 0;font-size:15px;line-height:23px;color:${R.yazi};">Kullanıcı adın: <b>${esc(v.user)}</b></p></td></tr>
<tr><td class="px" style="padding:20px 40px 0;"><a href="${esc(v.url)}" style="display:inline-block;background:${R.lac};color:#FFFFFF;font-family:${F};font-size:15px;font-weight:700;line-height:44px;padding:0 22px;border-radius:7px;text-decoration:none;">Şifremi belirle</a></td></tr>
<tr><td class="px" style="padding:16px 40px 0;font-family:${F};font-size:13px;line-height:20px;color:${R.gri};">Bağlantı 3 gün geçerli ve tek kullanımlık. Şifreni belirledikten sonra <a href="${SITE_URL}/admin" style="color:${R.teal};font-weight:700;text-decoration:none;">www.dndcyprus.com/admin</a> adresinden giriş yapabilirsin. Bu e-postayı sen istemediysen dikkate alma.</td></tr>`;
  return kabuk(v.reset ? "ŞİFRE YENİLEME" : "PANEL DAVETİ", govde, "Bu e-posta DND Cyprus yönetim panelinden, yöneticinin isteğiyle gönderildi.");
}

export function inviteText(v: InviteMail) {
  return [`Merhaba ${v.name},`, "", v.reset ? "Panel şifreni yenilemek için:" : "DND Cyprus yönetim paneline hesabın açıldı. Şifreni kendin belirle:", v.url, "", `Kullanıcı adın: ${v.user}`, "Bağlantı 3 gün geçerli ve tek kullanımlık.", `Giriş: ${SITE_URL}/admin`].join("\n");
}

/** true gönderildi, false gönderilemedi, null anahtar yok */
export async function sendInviteEmail(v: InviteMail): Promise<boolean | null> {
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (!key || !v.email) return null;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || "DND Cyprus Web <bildirim@takip.dndcyprus.com>",
        to: [v.email],
        subject: inviteSubject(v),
        html: inviteHtml(v),
        text: inviteText(v),
      }),
    });
    if (!res.ok) console.error("INVITE_EMAIL_ERROR", { status: res.status });
    return res.ok;
  } catch {
    console.error("INVITE_EMAIL_ERROR", { reason: "network" });
    return false;
  }
}
