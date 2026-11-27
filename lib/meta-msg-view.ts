// lib/meta-msg-view.ts
// Panelde mesaj talepleri (27.11.2026): cevap bekleyen müşteriler, ilk cevap süresi, numara vermeyenler ve Business Suite
// bağlantısı. Kaynak: mesaj senkronunun sohbet hafızası (SyncState "meta-mesaj"). Saf yardımcılar (testli).
import type { ConvMemo, MetaMsgState } from "./meta-messages";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
/** Bu kadar süredir cevapsız müşteri kırmızı görünür */
export const WAIT_ALERT_MS = HOUR;
/** Bundan eski cevapsız sohbet "cevap bekliyor" sayılmaz (iş listesini eski sohbetler doldurmasın; talep listede kalır) */
export const WAIT_MAX_MS = 14 * DAY;

export type Thread = ConvMemo & { conv: string };

/** Messenger / Instagram mesajlarına cevap veren (27.11 kullanıcı: "bütün mesajlara Talha cevap veriyor") */
export const MSG_RESPONDER = (process.env.META_MSG_RESPONDER || "Talha").trim() || "Talha";

/**
 * Mesajlara cevap verebilen ekip (27.11 kullanıcı: "Muhammed de cevap veriyor"). Meta sayfa adına yazılan cevabın hangi
 * kişiden geldiğini API'de bildirmez: sohbetler varsayılan olarak MSG_RESPONDER'a sayılır, başkası cevapladıysa panelden işaretlenir.
 */
export const MSG_TEAM: string[] = [
  ...new Set([MSG_RESPONDER, ...(process.env.META_MSG_TEAM ?? "Muhammed").split(",").map((s) => s.trim().slice(0, 40)).filter(Boolean)]),
];

/** Sohbetin ilk cevabını veren: panelden işaretlenen, yoksa MSG_RESPONDER */
export const responderOf = (leadId: number | null | undefined, by: Record<string, string>) => (leadId ? by[String(leadId)] : undefined) || MSG_RESPONDER;

/** Ekip sohbette cevap verdiyse son cevabın zamanı (müşteri o zamandan beri yazmadıysa) */
export function answeredAt(th: Thread | undefined): number | null {
  return th?.a && !th.w ? th.a : null;
}
type LeadLite = { id: number; status: string | null; statusAt?: Date | null; form?: string | null; phone?: string | null; email?: string | null };

/** Talep → sohbeti (aynı kişinin birden çok sohbeti varsa en son yazılanı) */
export function threadsByLead(state: MetaMsgState | null | undefined) {
  const map = new Map<number, Thread>();
  for (const [conv, m] of Object.entries(state?.convs ?? {})) {
    if (!m.l) continue;
    const cur = map.get(m.l);
    if (!cur || m.t > cur.t) map.set(m.l, { ...m, conv });
  }
  return map;
}

/**
 * Müşteri cevap bekliyor mu: sohbette ekibin son cevabından sonra yazdı ve ekip o zamandan beri talebin durumunu da
 * değiştirmedi (ör. telefonla aradıysa ve durumu "Arandı" yaptıysa bekleyen sayılmaz). Satış dışı kayıtlar sayılmaz.
 */
export function waitingSince(th: Thread | undefined, lead: LeadLite, now = Date.now()): number | null {
  if (!th?.w || lead.status === "satis_disi") return null;
  if (now - th.w > WAIT_MAX_MS) return null;
  if (lead.statusAt && lead.statusAt.getTime() >= th.w) return null;
  return th.w;
}

/** "4 dk", "2 sa", "3 gün" */
export function durationLabel(ms: number) {
  if (ms < HOUR) return `${Math.max(1, Math.round(ms / 60_000))} dk`;
  if (ms < DAY) return `${Math.round(ms / HOUR)} sa`;
  return `${Math.floor(ms / DAY)} gün`;
}

/** Mesajla gelip numara da e-posta da bırakmayan talep */
export const noContact = (l: LeadLite) => l.form === "meta-mesaj" && !l.phone && !(l.email || "").trim();

/**
 * Business Suite: Meta sohbet bağlantısı verdiyse doğrudan o sohbet; yoksa doğru gelen kutusu sekmesi (Messenger =
 * /inbox/messenger, Instagram mesajları = /inbox/instagram_direct; "facebook" ve "instagram" yorum sekmeleridir).
 * Business Suite kendi kişi kimliğini kullanır, Meta'nın sayfaya özel kimliğiyle (PSID) sohbet açılmaz — hata sayfası verir.
 */
export function inboxUrl(pageId: string | null | undefined, th: Pick<Thread, "c" | "u"> | undefined) {
  const link = th?.u ? conversationLink(th.u) : null;
  if (link) return link;
  const tab = th?.c === "i" ? "instagram_direct" : th?.c === "m" ? "messenger" : "all";
  const u = new URL(`https://business.facebook.com/latest/inbox/${tab}`);
  if (pageId) {
    u.searchParams.set("asset_id", pageId);
    u.searchParams.set("mailbox_id", pageId);
  }
  return u.toString();
}

/** Meta'nın sohbet bağlantısı yalnız facebook.com alan adlarında kabul edilir; göreli yol Business Suite'e bağlanır */
export function conversationLink(raw: string) {
  try {
    const u = new URL(raw, "https://business.facebook.com");
    return u.protocol === "https:" && /(^|\.)facebook\.com$/.test(u.hostname) ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Dönemde ilk mesajı gelen sohbetlerin ilk cevap istatistiği */
export function replyStats(state: MetaMsgState | null | undefined, from: number | null, now = Date.now()) {
  const list = Object.values(state?.convs ?? {}).filter((m) => m.f !== undefined && (from === null || m.f! >= from) && m.f! <= now);
  const answered = list.filter((m) => typeof m.r === "number").map((m) => m.r as number).sort((a, b) => a - b);
  const median = answered.length ? answered[Math.floor((answered.length - 1) / 2)] : null;
  const withinHour = answered.filter((r) => r <= HOUR).length;
  // cevapsız kalanlar: ilk mesajdan beri ekip hiç yazmadı (a yok) ve sohbetin başı görülebildi
  const unanswered = list.filter((m) => m.r === null && !m.a).length;
  return { conversations: list.length, answered: answered.length, median, withinHourPct: answered.length ? Math.round((withinHour / answered.length) * 100) : null, unanswered };
}
