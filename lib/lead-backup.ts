// lib/lead-backup.ts
// Haftalık talep yedeği (25.11.2026): panelin veritabanındaki bütün talepler Excel'de açılan CSV olarak, DND kurumsal
// e-posta şablonunda info@dndcyprus.com'a gönderilir (Vercel Cron, pazartesi 09:00 Kıbrıs). Neon ücretsiz planda geri alma
// süresi kısa olduğu için ek, kalıcı kopya.

import { Buffer } from "node:buffer";
import { F, R, cyprusTime, esc, kabuk, recipients } from "./lead-email";
import { sourceGroup, statusInfo } from "./lead-status";

export type BackupRow = {
  createdAt: Date | string;
  name: string;
  email: string;
  phone?: string | null;
  project?: string | null;
  unitType?: string | null;
  subject?: string | null;
  message?: string | null;
  form?: string | null;
  source?: string | null;
  campaign?: string | null;
  pageUrl?: string | null;
  status?: string | null;
  notes?: { text: string; author?: string | null; createdAt: Date | string }[];
};

const COLS: [string, (r: BackupRow) => unknown][] = [
  ["Tarih (Kıbrıs)", (r) => cyprusTime(new Date(r.createdAt))],
  ["Ad soyad", (r) => r.name],
  ["Telefon", (r) => r.phone],
  ["E-posta", (r) => r.email],
  ["Proje", (r) => r.project],
  ["Daire tipi", (r) => r.unitType],
  ["Durum", (r) => statusInfo(r.status).label],
  ["Konu", (r) => r.subject],
  ["Mesaj", (r) => r.message],
  ["Notlar", (r) => (r.notes || []).map((n) => `${cyprusTime(new Date(n.createdAt))} ${n.author || ""}: ${n.text}`).join("\n")],
  ["Form", (r) => r.form],
  ["Kaynak", (r) => (r.source ? `${sourceGroup(r.source).label} (${r.source})` : "")],
  ["Kampanya", (r) => r.campaign],
  ["Sayfa", (r) => r.pageUrl],
];

/** Hücre: tırnaklı; formdan gelen =, +, -, @ ile başlayan metin Excel'de formül çalışmasın diye ' ile başlar. */
function cell(v: unknown) {
  let s = String(v ?? "").replace(/\r\n?/g, "\n");
  if (/^[=+\-@\t]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

/** Türkçe Excel ; ayırıcı bekler; BOM ile Türkçe karakterler doğru açılır. */
export function leadsToCsv(rows: BackupRow[]) {
  const lines = [COLS.map(([h]) => cell(h)).join(";"), ...rows.map((r) => COLS.map(([, f]) => cell(f(r))).join(";"))];
  return "﻿" + lines.join("\r\n") + "\r\n";
}

export function backupEmailHtml(total: number, lastWeek: number, at: Date) {
  const kutu = (n: number, et: string, renk: string) => `<td width="50%" align="center" style="padding:0 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F6F9FA;border-radius:8px;"><tr><td align="center" style="padding:14px 6px;font-family:${F};"><p style="margin:0;font-size:26px;line-height:30px;font-weight:800;color:${renk};">${n}</p><p style="margin:2px 0 0;font-size:12px;line-height:16px;color:${R.gri};">${esc(et)}</p></td></tr></table></td>`;
  const govde = `<tr><td class="px" style="padding:26px 40px 6px;font-family:${F};">
<p style="margin:0 0 10px;"><span style="display:inline-block;background:${R.teal};color:#FFFFFF;border-radius:6px;padding:4px 10px;font-size:11px;letter-spacing:1px;font-weight:800;">HAFTALIK YEDEK</span></p>
<p style="margin:0 0 6px;font-size:22px;line-height:29px;font-weight:800;color:${R.yazi};">Web sitesi talepleri yedeği</p>
<p style="margin:0;font-size:14.5px;line-height:22px;color:${R.gri};">${esc(cyprusTime(at))} itibarıyla yönetim panelindeki bütün talepler ekteki dosyada. Dosya Excel'de doğrudan açılır.</p></td></tr>
<tr><td class="px" style="padding:16px 36px 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${kutu(total, "toplam talep", R.lac)}${kutu(lastWeek, "son 7 günde", R.turuncu)}</tr></table></td></tr>`;
  return kabuk("HAFTALIK YEDEK", govde, "Bu e-posta her pazartesi otomatik gönderilir; ekteki dosyayı arşivde saklayın.");
}

/** true: gönderildi; false: gönderilemedi; null: yapılandırılmamış */
export async function sendLeadBackup(rows: BackupRow[], at = new Date()): Promise<boolean | null> {
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (!key) return null;
  const weekAgo = at.getTime() - 7 * 24 * 3600 * 1000;
  const lastWeek = rows.filter((r) => new Date(r.createdAt).getTime() >= weekAgo).length;
  const day = at.toLocaleDateString("sv-SE", { timeZone: "Asia/Famagusta" }); // YYYY-MM-DD
  const csv = leadsToCsv(rows);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `web-lead-backup-${day}` },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || "DND Cyprus Web <bildirim@takip.dndcyprus.com>",
      to: recipients(),
      subject: `Haftalık talep yedeği · ${day} · ${rows.length} talep`,
      html: backupEmailHtml(rows.length, lastWeek, at),
      text: `Web sitesi talepleri yedeği (${day}): toplam ${rows.length}, son 7 günde ${lastWeek}. Dosya ekte.`,
      attachments: [{ filename: `dndcyprus-talepler-${day}.csv`, content: Buffer.from(csv, "utf8").toString("base64") }],
    }),
  });
  if (!res.ok) {
    console.error("LEAD_BACKUP_ERROR", { status: res.status });
    return false;
  }
  return true;
}
