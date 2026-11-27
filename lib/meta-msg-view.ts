// lib/meta-msg-view.ts
// Panelde mesaj talepleri (27.11.2026): cevap bekleyen müşteriler, ilk cevap süresi, numara vermeyenler ve Business Suite
// bağlantısı. Kaynak: mesaj senkronunun sohbet hafızası (SyncState "meta-mesaj"). Saf yardımcılar (testli).
import type { ConvMemo, MetaMsgState } from "./meta-messages";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
/** Bu kadar süredir cevapsız müşteri kırmızı görünür */
export const WAIT_ALERT_MS = HOUR;

export type Thread = ConvMemo & { conv: string };
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
export function waitingSince(th: Thread | undefined, lead: LeadLite): number | null {
  if (!th?.w || lead.status === "satis_disi") return null;
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
 * Business Suite gelen kutusu: Messenger ya da Instagram sekmesi; kişinin kimliği de eklenir (Business Suite seçili
 * sohbeti adrese yazmıyor; açmazsa kişi adıyla aranır).
 */
export function inboxUrl(pageId: string | null | undefined, th: Pick<Thread, "c" | "p"> | undefined) {
  const tab = th?.c === "i" ? "instagram" : th?.c === "m" ? "facebook" : "all";
  const u = new URL(`https://business.facebook.com/latest/inbox/${tab}`);
  if (pageId) u.searchParams.set("asset_id", pageId);
  if (th?.p) {
    u.searchParams.set("selected_item_id", th.p);
    u.searchParams.set("thread_type", th.c === "i" ? "IG_MESSAGE" : "FB_MESSAGE");
  }
  return u.toString();
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
