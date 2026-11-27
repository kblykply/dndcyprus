// lib/morning-digest.ts
// Sabah özeti (27.11.2026): her sabah 09:00 (Kıbrıs) info@dndcyprus.com'a tek e-posta — dün gelen talepler, cevap bekleyen
// mesajlar, bugünün aramaları, aranmamış yeni talepler ve haftanın kısa özeti. "Bugün" sayfasıyla aynı hesap (lib/today-board).
// Alıcılar: info@ (LEAD_EMAIL_TO) + mesajlara cevap veren (MSG_RESPONDER_EMAIL) + e-postası girilmiş panel kullanıcıları;
// müşteriye hiçbir şey gönderilmez. Ayrıca cevap veren kişiye "cevap bekleyen mesajlar" e-postası (gece gelenler önce,
// müşterinin son mesajı ve Business Suite'te cevap yaz bağlantısı).
import { SITE_URL } from "./seo";
import { F, R, esc, kabuk, recipients } from "./lead-email";
import { cyprusDayKey } from "./lead-followup";
import { isSalesLead, originGroup, statusInfo } from "./lead-status";
import { MSG_RESPONDER, durationLabel, inboxUrl, replyStats, threadsByLead, waitingSince, type Thread } from "./meta-msg-view";
import type { MetaMsgState } from "./meta-messages";
import { agenda, funnel, noNumberLeads, type AgendaItem, type BoardLead } from "./today-board";

const DAY = 86_400_000;

export type Digest = {
  dayLabel: string;
  yesterday: BoardLead[];
  cevap: AgendaItem[];
  arama: AgendaItem[];
  yeni: AgendaItem[];
  noNumber: number;
  week: { leads: number; withContact: number; talking: number; sold: number };
  replyMedian: number | null;
  total: number;
};

export function buildDigest(leads: BoardLead[], state: MetaMsgState | null, now: Date): Digest {
  const threads = threadsByLead(state);
  const { items } = agenda(leads, threads, now);
  const yKey = cyprusDayKey(new Date(now.getTime() - DAY));
  const yesterday = leads.filter((l) => cyprusDayKey(l.createdAt) === yKey && isSalesLead(l)).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  const fn = funnel(leads, new Date(now.getTime() - 7 * DAY));
  const sales = leads.filter(isSalesLead);
  const cevap = items.filter((i) => i.kind === "cevap");
  const arama = items.filter((i) => i.kind === "arama");
  const yeni = items.filter((i) => i.kind === "yeni");
  return {
    dayLabel: now.toLocaleDateString("tr-TR", { timeZone: "Asia/Famagusta", day: "numeric", month: "long", year: "numeric", weekday: "long" }),
    yesterday,
    cevap,
    arama,
    yeni,
    noNumber: noNumberLeads(leads).length,
    week: {
      leads: fn.steps[0].count,
      withContact: fn.steps[1].count,
      talking: sales.filter((l) => statusInfo(l.status).key === "gorusuluyor").length,
      sold: fn.steps[4].count,
    },
    replyMedian: replyStats(state, now.getTime() - 7 * DAY, now.getTime()).median,
    total: cevap.length + arama.length + yeni.length,
  };
}

export function digestSubject(d: Digest) {
  const bits = [d.yesterday.length ? `dün ${d.yesterday.length} talep` : "dün talep yok", d.total ? `${d.total} iş bekliyor` : "bekleyen iş yok"];
  return `Sabah özeti · ${bits.join(" · ")}`;
}

const td = `padding:9px 0;border-bottom:1px solid #EDF1F4;font-family:${F};font-size:14px;line-height:20px;vertical-align:top;`;
const leadLink = (id: number, name: string) => `<a href="${SITE_URL}/admin/leads?id=${id}" style="color:${R.yazi};font-weight:700;text-decoration:none;">${esc(name)}</a>`;

function section(title: string, count: number, rows: string[], empty: string, color: string = R.teal) {
  const head = `<p style="margin:0 0 6px;font-family:${F};font-size:11px;letter-spacing:1px;font-weight:800;color:${color};">${esc(title.toLocaleUpperCase("tr-TR"))} (${count})</p>`;
  const body = rows.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.join("")}</table>`
    : `<p style="margin:0;font-family:${F};font-size:14px;line-height:20px;color:${R.gri};">${esc(empty)}</p>`;
  return `<tr><td class="px" style="padding:20px 40px 0;">${head}${body}</td></tr>`;
}

const row = (left: string, right: string) =>
  `<tr><td style="${td}color:${R.yazi};">${left}</td><td align="right" style="${td}color:${R.gri};white-space:nowrap;padding-left:12px;">${right}</td></tr>`;

const more = (n: number) => (n > 0 ? row(`<span style="color:${R.gri};">… ve ${n} kişi daha (panelde)</span>`, "") : "");

export function digestHtml(d: Digest) {
  const LIMIT = 12;
  const y = d.yesterday.slice(0, LIMIT).map((l) =>
    row(`${leadLink(l.id, l.name)}<br><span style="font-size:12.5px;color:${R.gri};">${esc([l.project, originGroup(l.form, l.source).label].filter(Boolean).join(" · "))}</span>`, esc(l.phone || l.email || "numara yok")),
  );
  const list = (items: AgendaItem[]) =>
    items.slice(0, LIMIT).map((i) => row(`${leadLink(i.lead.id, i.lead.name)}<br><span style="font-size:12.5px;color:${R.gri};">${esc(i.label)}</span>`, esc(i.lead.phone || "")));
  const w = d.week;
  const summary = [
    `Son 7 günde <b>${w.leads}</b> talep`,
    `<b>${w.withContact}</b> kişi numara / e-posta bıraktı`,
    `<b>${w.talking}</b> kişiyle görüşülüyor`,
    w.sold ? `<b>${w.sold}</b> satış` : "",
    d.replyMedian !== null ? `mesajlara medyan ilk yanıt süresi <b>${esc(durationLabel(d.replyMedian))}</b>` : "",
  ].filter(Boolean);
  const govde = `<tr><td class="px" style="padding:26px 40px 4px;font-family:${F};">
<p style="margin:0 0 10px;"><span style="display:inline-block;background:${R.teal};color:#FFFFFF;border-radius:6px;padding:4px 10px;font-size:11px;letter-spacing:1px;font-weight:800;">SABAH ÖZETİ</span></p>
<p style="margin:0;font-size:22px;line-height:29px;font-weight:800;color:${R.yazi};">Günaydın, ${d.total ? `bugün ${d.total} iş bekliyor` : "bugün bekleyen iş yok"}</p>
<p style="margin:6px 0 0;font-size:14.5px;line-height:22px;color:${R.gri};">${esc(d.dayLabel)}</p></td></tr>
${section("Cevap bekleyen mesajlar", d.cevap.length, [...list(d.cevap), more(d.cevap.length - LIMIT)], "Bütün mesajlar cevaplanmış.", R.turuncu)}
${section("Bugün aranacaklar", d.arama.length, [...list(d.arama), more(d.arama.length - LIMIT)], "Bugün için planlı arama yok.")}
${section("Dün gelen talepler", d.yesterday.length, [...y, more(d.yesterday.length - LIMIT)], "Dün yeni talep gelmedi.")}
${section("Aranmayı bekleyen yeni talepler", d.yeni.length, [...list(d.yeni), more(d.yeni.length - LIMIT)], "Aranmamış yeni talep yok.")}
<tr><td class="px" style="padding:20px 40px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#EAF5F6;border-left:4px solid ${R.teal};border-radius:0 8px 8px 0;padding:12px 16px;font-family:${F};font-size:14px;line-height:22px;color:${R.yazi};">${summary.join(" · ")}.${d.noNumber ? `<br><span style="color:${R.gri};">${d.noNumber} kişi mesajla yazıp numara bırakmadı.</span>` : ""}</td></tr></table></td></tr>
<tr><td class="px" style="padding:22px 40px 0;"><a href="${SITE_URL}/admin/bugun" style="display:inline-block;background:${R.lac};color:#FFFFFF;font-family:${F};font-size:14px;font-weight:700;line-height:42px;padding:0 20px;border-radius:7px;text-decoration:none;">Bugün ekranını aç</a></td></tr>`;
  return kabuk("SABAH ÖZETİ", govde, "Bu e-posta DND Cyprus yönetim panelinden her sabah 09:00'da (Kıbrıs) otomatik gönderilir.");
}

export function digestText(d: Digest) {
  const lines = [`Sabah özeti · ${d.dayLabel}`, ""];
  const block = (title: string, items: string[]) => {
    lines.push(`${title} (${items.length})`);
    items.slice(0, 20).forEach((x) => lines.push(`- ${x}`));
    lines.push("");
  };
  block("Cevap bekleyen mesajlar", d.cevap.map((i) => `${i.lead.name}: ${i.label}`));
  block("Bugün aranacaklar", d.arama.map((i) => `${i.lead.name}: ${i.label}${i.lead.phone ? ` · ${i.lead.phone}` : ""}`));
  block("Dün gelen talepler", d.yesterday.map((l) => `${l.name}${l.project ? ` · ${l.project}` : ""}${l.phone ? ` · ${l.phone}` : ""}`));
  block("Aranmayı bekleyen yeni talepler", d.yeni.map((i) => `${i.lead.name}${i.lead.phone ? ` · ${i.lead.phone}` : ""}`));
  lines.push(`Panel: ${SITE_URL}/admin/bugun`);
  return lines.join("\n");
}

/** Mesajlara cevap veren kişinin e-postası (ortam: MSG_RESPONDER_EMAIL, virgülle birden çok) */
export const responderEmails = () =>
  (process.env.MSG_RESPONDER_EMAIL || "")
    .split(",")
    .map((x) => x.trim().toLowerCase())
    .filter((x) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x));

/** Sabah özeti alıcıları: info@ + cevap veren + panel kullanıcıları (tekrarsız) */
export const digestRecipients = (extra: string[] = []) => [...new Set([...recipients(), ...responderEmails(), ...extra].map((x) => x.toLowerCase()))];

async function send(to: string[], subject: string, html: string, text: string, idem: string): Promise<boolean | null> {
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (!key || !to.length) return null;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": idem },
      body: JSON.stringify({ from: process.env.LEAD_EMAIL_FROM || "DND Cyprus Web <bildirim@takip.dndcyprus.com>", to, subject, html, text }),
    });
    if (!res.ok) console.error("MORNING_DIGEST_ERROR", { status: res.status, idem: idem.split("-").slice(0, 2).join("-") });
    return res.ok;
  } catch (err) {
    console.error("MORNING_DIGEST_ERROR", { reason: (err as { name?: string })?.name === "TimeoutError" ? "timeout" : "network" });
    return false;
  }
}

/** true gönderildi, false gönderilemedi, null yapılandırılmamış */
export async function sendDigest(d: Digest, dayKey: string, to: string[] = digestRecipients()): Promise<boolean | null> {
  return send(to, digestSubject(d), digestHtml(d), digestText(d), `sabah-ozeti-${dayKey}`);
}

/* ---------------- Cevap bekleyen mesajlar (cevap veren kişiye) ---------------- */

export type WaitingMsg = { lead: BoardLead; since: number; night: boolean; text: string; channel: string; link: string };

/**
 * Şu an cevap bekleyen sohbetler (14 güne kadar), en eski önce. night: dün 23:00'ten sonra gelen (e-posta 09:00'da gittiği
 * için son 10 saat). text: müşterinin son mesajı (yoksa talep konusu).
 */
export function waitingMessages(leads: BoardLead[], state: MetaMsgState | null, now: Date): WaitingMsg[] {
  const threads = threadsByLead(state);
  const t = now.getTime();
  const out: WaitingMsg[] = [];
  for (const l of leads) {
    const th: Thread | undefined = threads.get(l.id);
    const w = waitingSince(th, l, t);
    if (w === null) continue;
    out.push({
      lead: l,
      since: w,
      night: t - w <= 10 * 3_600_000,
      text: (th?.x || l.subject || "").slice(0, 240),
      channel: th?.c === "i" || (l.source || "").toLowerCase().startsWith("instagram") ? "Instagram" : "Messenger",
      link: inboxUrl(state?.pageId ?? null, th),
    });
  }
  return out.sort((a, b) => a.since - b.since);
}

export function waitingSubject(items: WaitingMsg[]) {
  const night = items.filter((i) => i.night).length;
  return `Cevap bekleyen ${items.length} mesaj${night ? ` · ${night} tanesi gece geldi` : ""}`;
}

export function waitingHtml(items: WaitingMsg[], now: Date) {
  const t = now.getTime();
  const card = (i: WaitingMsg) =>
    `<tr><td style="padding:12px 0;border-bottom:1px solid #EDF1F4;font-family:${F};">
<p style="margin:0;font-size:15px;line-height:21px;font-weight:700;color:${R.yazi};">${esc(i.lead.name)} <span style="font-weight:400;color:${R.gri};">· ${esc(i.channel)} · ${esc(durationLabel(t - i.since))} bekliyor${i.lead.project ? ` · ${esc(i.lead.project)}` : ""}</span></p>
${i.text ? `<p style="margin:6px 0 0;font-size:14px;line-height:21px;color:${R.yazi};background:#F4F7F8;border-radius:8px;padding:8px 12px;">“${esc(i.text)}”</p>` : ""}
<p style="margin:8px 0 0;"><a href="${esc(i.link)}" style="display:inline-block;background:${R.teal};color:#FFFFFF;font-size:13px;font-weight:700;line-height:34px;padding:0 14px;border-radius:7px;text-decoration:none;margin-right:6px;">Cevap yaz</a><a href="${SITE_URL}/admin/leads?id=${i.lead.id}" style="font-size:13px;color:${R.teal};font-weight:700;text-decoration:none;">Panelde aç</a></p></td></tr>`;
  const night = items.filter((i) => i.night);
  const older = items.filter((i) => !i.night);
  const block = (title: string, list: WaitingMsg[]) =>
    list.length
      ? `<tr><td class="px" style="padding:20px 40px 0;"><p style="margin:0 0 4px;font-family:${F};font-size:11px;letter-spacing:1px;font-weight:800;color:${R.turuncu};">${esc(title.toLocaleUpperCase("tr-TR"))} (${list.length})</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${list.slice(0, 40).map(card).join("")}</table></td></tr>`
      : "";
  const govde = `<tr><td class="px" style="padding:26px 40px 4px;font-family:${F};">
<p style="margin:0 0 10px;"><span style="display:inline-block;background:${R.turuncu};color:#FFFFFF;border-radius:6px;padding:4px 10px;font-size:11px;letter-spacing:1px;font-weight:800;">CEVAP BEKLEYEN MESAJLAR</span></p>
<p style="margin:0;font-size:22px;line-height:29px;font-weight:800;color:${R.yazi};">Günaydın ${esc(MSG_RESPONDER)}, ${items.length} müşteri cevap bekliyor</p>
<p style="margin:6px 0 0;font-size:14.5px;line-height:22px;color:${R.gri};">Messenger ve Instagram'da ekipten cevap bekleyen sohbetler, en eskisi önce. "Cevap yaz" Business Suite gelen kutusunu açar.</p></td></tr>
${block("Gece gelenler", night)}
${block("Daha önceden bekleyenler", older)}`;
  return kabuk("MESAJLAR", govde, "Bu e-posta DND Cyprus yönetim panelinden her sabah 09:00'da (Kıbrıs) otomatik gönderilir; mesajlar gönderimden hemen önce Meta'dan yeniden çekilir.");
}

export function waitingText(items: WaitingMsg[], now: Date) {
  const t = now.getTime();
  return [
    `Cevap bekleyen ${items.length} mesaj`,
    "",
    ...items.map((i) => `${i.night ? "[gece] " : ""}${i.lead.name} · ${i.channel} · ${durationLabel(t - i.since)} bekliyor${i.text ? `\n  "${i.text}"` : ""}\n  ${i.link}`),
  ].join("\n");
}

export async function sendWaiting(items: WaitingMsg[], now: Date, dayKey: string, to: string[]) {
  if (!items.length) return null;
  return send(to, waitingSubject(items), waitingHtml(items, now), waitingText(items, now), `gece-mesaj-${dayKey}`);
}
