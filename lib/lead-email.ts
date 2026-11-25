// lib/lead-email.ts
// Sunucu: web formundan gelen her talebi info@dndcyprus.com'a DND kurumsal e-posta şablonunda bildirir (25.11.2026).
// Şablon DND Akış bildirimleriyle aynı kurumsal kimlik: logo + turuncu/turkuaz çizgi, rozetli başlık, ince çizgili ayrıntı tablosu,
// lacivert düğmeler, imza ve turkuaz alt bant. Gönderim Resend ile (takip.dndcyprus.com alan adı DND'nin Resend hesabında doğrulanmış).
// Anahtar yalnız ortam değişkeninden okunur, asla loglanmaz; anahtar yoksa hiçbir şey yapılmaz. Hata formun sonucunu bozmaz.

import { SITE_URL } from "./seo";

export type LeadEmailInput = {
  name: string;
  email: string;
  phone?: string;
  project?: string;
  unitType?: string;
  subject?: string;
  message?: string;
  form?: string;
  pageUrl?: string;
  source?: string | null;
  campaign?: string | null;
  eventId?: string;
  receivedAt?: Date;
  /** Paneldeki kaydın numarası: "Panelde aç" doğrudan bu talebi açar */
  leadId?: number;
};

export const R = { teal: "#27959B", turuncu: "#F15C34", lac: "#0E3A5C", yazi: "#1D293D", gri: "#45556C", acik: "#EEF3F4" };
export const F = "'Albert Sans',Arial,Helvetica,sans-serif";
const TIMEOUT_MS = 10000;

export const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FORM_LABEL: Record<string, string> = {
  lead: "Fiyat / kat planı talebi (proje sayfası)",
  home: "Bilgi talebi (ana sayfa)",
  contact: "İletişim formu",
  "meta-lead": "Meta reklam formu (Facebook / Instagram)",
};

export function leadEmailConfigured() {
  return !!(process.env.RESEND_API_KEY || "").trim();
}

export function recipients() {
  return (process.env.LEAD_EMAIL_TO || "info@dndcyprus.com").split(",").map((s) => s.trim()).filter(Boolean);
}

export function cyprusTime(d: Date) {
  return d.toLocaleString("tr-TR", { timeZone: "Asia/Famagusta", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function langOf(pageUrl?: string) {
  try {
    const seg = new URL(pageUrl || "").pathname.split("/")[1];
    return ({ tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça", pl: "Lehçe" } as Record<string, string>)[seg] || "";
  } catch {
    return "";
  }
}

const button = (href: string, text: string, color = R.lac) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${color};color:#FFFFFF;font-family:${F};font-size:14px;font-weight:700;line-height:42px;padding:0 20px;border-radius:7px;text-decoration:none;margin:0 6px 8px 0;">${text}</a>`;

/** Talep başlığı: ad + (proje · daire tipi) */
export function leadEmailSubject(v: LeadEmailInput) {
  const what = [v.project, v.unitType].filter(Boolean).join(" · ");
  return `Yeni web talebi: ${v.name}${what ? " · " + what : ""}`;
}

export function leadEmailHtml(v: LeadEmailInput) {
  const when = cyprusTime(v.receivedAt || new Date());
  const digits = (v.phone || "").replace(/\D/g, "");
  const rows: [string, string][] = [
    ["Ad soyad", v.name],
    ["Telefon", v.phone || ""],
    ["E-posta", v.email],
    ["Proje", v.project || ""],
    ["Daire tipi", v.unitType || ""],
    ["Konu", v.subject || ""],
    ["Form", FORM_LABEL[v.form || ""] || v.form || ""],
    ["Dil", langOf(v.pageUrl)],
    ["Kaynak", v.source || "Doğrudan / organik"],
    ["Kampanya", v.campaign || ""],
    ["Sayfa", v.pageUrl ? v.pageUrl.replace(/^https?:\/\/(www\.)?/, "") : ""],
    ["Tarih", when + " (Kıbrıs)"],
  ];
  const td = `padding:9px 0;border-bottom:1px solid #EDF1F4;font-family:${F};font-size:14px;line-height:20px;vertical-align:top;`;
  const table = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.filter(([, b]) => b).map(([a, b]) =>
    `<tr><td width="30%" style="${td}color:${R.gri};">${esc(a)}</td><td style="${td}color:${R.yazi};font-weight:700;word-break:break-word;">${esc(b)}</td></tr>`).join("")}</table>`;
  const message = v.message
    ? `<tr><td class="px" style="padding:14px 40px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#EAF5F6;border-left:4px solid ${R.teal};border-radius:0 8px 8px 0;padding:12px 16px;font-family:${F};">
<p style="margin:0 0 4px;font-size:11px;letter-spacing:1px;font-weight:800;color:${R.teal};">MESAJ</p><p style="margin:0;font-size:14.5px;line-height:22px;color:${R.yazi};white-space:pre-wrap;">${esc(v.message)}</p></td></tr></table></td></tr>`
    : "";
  const actions = [
    digits ? button(`tel:+${digits}`, "Ara") : "",
    digits ? button(`https://wa.me/${digits}`, "WhatsApp'tan yaz", "#0B6B38") : "",
    button(`mailto:${v.email}`, "E-posta ile yanıtla", R.teal),
    button(`${SITE_URL}/admin/leads${v.leadId ? `?id=${v.leadId}` : ""}`, "Panelde aç"),
  ].join("");
  const what = [v.project, v.unitType].filter(Boolean).join(" · ");
  const govde = `<tr><td class="px" style="padding:26px 40px 4px;font-family:${F};">
<p style="margin:0 0 10px;"><span style="display:inline-block;background:${R.turuncu};color:#FFFFFF;border-radius:6px;padding:4px 10px;font-size:11px;letter-spacing:1px;font-weight:800;">YENİ TALEP</span></p>
<p style="margin:0;font-size:22px;line-height:29px;font-weight:800;color:${R.yazi};">${esc(v.name)}${what ? ` · ${esc(what)}` : ""}</p>
<p style="margin:6px 0 0;font-size:14.5px;line-height:22px;color:${R.gri};">Web sitesindeki formdan ${esc(when)} tarihinde talep geldi.</p></td></tr>
${message}
<tr><td class="px" style="padding:16px 40px 0;">${table}</td></tr>
<tr><td class="px" style="padding:22px 40px 0;">${actions}</td></tr>
<tr><td class="px" style="padding:10px 40px 0;font-family:${F};font-size:12px;line-height:18px;color:#8090A3;">Bu e-postayı yanıtlarsanız yanıt doğrudan müşteriye gider.</td></tr>`;

  return kabuk("WEB SİTESİ TALEBİ", govde, "Bu e-posta www.dndcyprus.com formundan otomatik gönderildi; talep sitenin yönetim panelinde de kayıtlıdır.");
}

/** DND kurumsal e-posta kabuğu (DND Akış bildirimleriyle aynı kimlik): logo, çizgi, gövde, imza, turkuaz alt bant. */
export function kabuk(ust: string, govde: string, alt: string) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0;background:${R.acik};}@media only screen and (max-width:620px){.w{width:100%!important}.px{padding-left:20px!important;padding-right:20px!important}}</style></head>
<body style="margin:0;padding:0;background:${R.acik};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${R.acik};"><tr><td align="center" style="padding:24px 10px;">
<table role="presentation" class="w" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#FFFFFF;border-radius:10px;">
<tr><td class="px" style="padding:28px 40px 18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="middle"><img src="${SITE_URL}/eposta/dnd-logo.png" width="130" height="56" alt="DND · USA Quality in Cyprus" style="display:block;width:130px;height:auto;border:0;"></td>
<td valign="middle" align="right" style="font-family:${F};font-size:11px;line-height:16px;letter-spacing:1px;font-weight:700;color:#62748E;">${esc(ust)}</td></tr></table></td></tr>
<tr><td class="px" style="padding:0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="56" height="3" style="width:56px;height:3px;background:${R.turuncu};font-size:0;line-height:0;">&nbsp;</td><td height="3" style="height:3px;background:${R.teal};font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
${govde}
<tr><td class="px" style="padding:22px 40px 26px;font-family:${F};"><p style="margin:0 0 6px;font-size:16px;line-height:22px;font-weight:700;color:${R.yazi};">DND Cyprus</p>
<p style="margin:0;font-size:12.5px;line-height:20px;color:${R.gri};">T&nbsp;+90 392 444 03 63&nbsp;&nbsp;·&nbsp;&nbsp;E&nbsp;info@dndcyprus.com<br><a href="${SITE_URL}/tr" style="color:${R.teal};text-decoration:none;font-weight:700;">www.dndcyprus.com</a></p></td></tr>
<tr><td class="px" style="background:${R.teal};padding:14px 40px;border-radius:0 0 10px 10px;font-family:${F};font-size:11.5px;line-height:17px;color:#FFFFFF;"><b>DND Cyprus</b> · CY-DND HOMES LTD.<br>Alasya Park Sitesi 2. Etap, Dükkân No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Gazimağusa, KKTC</td></tr></table>
<p style="margin:14px 0 0;font-family:${F};font-size:11px;line-height:16px;color:#8090A3;">${esc(alt)}</p></td></tr></table></body></html>`;
}

export function leadEmailText(v: LeadEmailInput) {
  const lines = [
    `Yeni web talebi (${cyprusTime(v.receivedAt || new Date())}, Kıbrıs)`,
    "",
    `Ad soyad: ${v.name}`,
    v.phone ? `Telefon: ${v.phone}` : "",
    `E-posta: ${v.email}`,
    v.project ? `Proje: ${v.project}` : "",
    v.unitType ? `Daire tipi: ${v.unitType}` : "",
    v.subject ? `Konu: ${v.subject}` : "",
    v.message ? `Mesaj: ${v.message}` : "",
    `Kaynak: ${v.source || "Doğrudan / organik"}${v.campaign ? " · " + v.campaign : ""}`,
    v.pageUrl ? `Sayfa: ${v.pageUrl}` : "",
    "",
    `Panel: ${SITE_URL}/admin/leads${v.leadId ? `?id=${v.leadId}` : ""}`,
  ];
  return lines.filter((l, i) => l || lines[i - 1]).join("\n");
}

/** true: e-posta kabul edildi; false: gönderilemedi; null: yapılandırılmamış */
export async function sendLeadEmail(v: LeadEmailInput): Promise<boolean | null> {
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (!key) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(v.eventId ? { "Idempotency-Key": `web-lead-${v.eventId}` } : {}),
      },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || "DND Cyprus Web <bildirim@takip.dndcyprus.com>",
        to: recipients(),
        reply_to: v.email,
        subject: leadEmailSubject(v),
        html: leadEmailHtml(v),
        text: leadEmailText(v),
      }),
    });
    if (!res.ok) {
      console.error("LEAD_EMAIL_ERROR", { status: res.status });
      return false;
    }
    return true;
  } catch (err) {
    const e = err as { name?: unknown } | null;
    console.error("LEAD_EMAIL_ERROR", { reason: e?.name === "AbortError" ? "timeout" : "network" });
    return false;
  } finally {
    clearTimeout(timer);
  }
}
