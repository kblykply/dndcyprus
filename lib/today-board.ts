// lib/today-board.ts
// "Bugün" sayfası (27.11.2026): ekibi bekleyen işler (cevap bekleyen mesajlar, bugünkü aramalar, aranmamış yeni talepler),
// satış hunisi, haftanın arama takvimi ve sorumlulara göre iş yükü. Saf yardımcılar (testli); sabah özeti e-postası da kullanır.
import { isSalesLead, statusInfo } from "./lead-status";
import { cyprusDayKey, dueFollowUps, followUpLabel } from "./lead-followup";
import { durationLabel, noContact, waitingSince, type Thread } from "./meta-msg-view";

const DAY = 86_400_000;
const TZ = "Asia/Famagusta";

export type BoardLead = {
  id: number;
  createdAt: Date;
  name: string;
  phone: string | null;
  email: string;
  project: string | null;
  source: string | null;
  form: string | null;
  status: string;
  statusAt: Date | null;
  assignee: string | null;
  followUpAt: Date | null;
  /** talep konusu (sabah e-postasında mesaj metni yoksa) */
  subject?: string;
};

export type AgendaKind = "cevap" | "arama" | "yeni";
export type AgendaItem = { kind: AgendaKind; lead: BoardLead; since: number; label: string; thread?: Thread };

/** Yeni talep bu kadar gün içinde aranmadıysa listede kalır (daha eskisi Satış Talepleri'nde) */
export const NEW_LEAD_DAYS = 14;

const channelOf = (l: BoardLead, th?: Thread) =>
  th?.c === "i" || (l.source || "").toLowerCase().startsWith("instagram") ? "Instagram" : "Messenger";

/** Ekibi bekleyen işler: önce cevap bekleyen mesajlar, sonra bugünün aramaları, sonra aranmamış yeni talepler (her grupta en eski önce) */
export function agenda(leads: BoardLead[], threads: Map<number, Thread>, now: Date) {
  const t = now.getTime();
  const seen = new Set<number>();
  const cevap: AgendaItem[] = [];
  for (const l of leads) {
    const th = threads.get(l.id);
    const w = waitingSince(th, l, t);
    if (w === null) continue;
    seen.add(l.id);
    cevap.push({ kind: "cevap", lead: l, since: w, thread: th, label: `${channelOf(l, th)} · cevap bekliyor · ${durationLabel(t - w)}` });
  }
  const arama: AgendaItem[] = dueFollowUps(leads, now)
    .filter((l) => !seen.has(l.id))
    .map((l) => {
      seen.add(l.id);
      return { kind: "arama" as const, lead: l, since: l.followUpAt!.getTime(), label: [followUpLabel(l.followUpAt, now), l.assignee].filter(Boolean).join(" · ") };
    });
  const yeni: AgendaItem[] = leads
    .filter((l) => !seen.has(l.id) && statusInfo(l.status).key === "yeni" && isSalesLead(l) && !l.followUpAt)
    .filter((l) => (l.phone || l.email) && t - l.createdAt.getTime() < NEW_LEAD_DAYS * DAY)
    .map((l) => ({ kind: "yeni" as const, lead: l, since: l.createdAt.getTime(), label: `Yeni talep · ${durationLabel(t - l.createdAt.getTime())} önce geldi` }));
  const byOld = (a: AgendaItem, b: AgendaItem) => a.since - b.since;
  cevap.sort(byOld);
  arama.sort(byOld);
  yeni.sort(byOld);
  return { items: [...cevap, ...arama, ...yeni], counts: { cevap: cevap.length, arama: arama.length, yeni: yeni.length } };
}

export type FunnelStep = { key: string; label: string; count: number };

/** Satış hunisi: dönemde gelen alıcı talepleri hangi aşamaya kadar ilerledi; en büyük kayıp hangi adımda */
export function funnel(leads: BoardLead[], from: Date | null) {
  const cur = leads.filter((l) => isSalesLead(l) && (!from || l.createdAt >= from));
  const st = (l: BoardLead) => statusInfo(l.status).key;
  const steps: FunnelStep[] = [
    { key: "geldi", label: "Talep geldi", count: cur.length },
    { key: "numara", label: "Numara / e-posta bıraktı", count: cur.filter((l) => l.phone || l.email.trim()).length },
    { key: "ulasildi", label: "Ulaşıldı", count: cur.filter((l) => st(l) !== "yeni").length },
    { key: "gorusuluyor", label: "Görüşülüyor", count: cur.filter((l) => st(l) === "gorusuluyor" || st(l) === "satis").length },
    { key: "satis", label: "Satış", count: cur.filter((l) => st(l) === "satis").length },
  ];
  // en büyük kayıp: bir önceki adıma göre en çok düşüş (satıştan önceki adımlar; az veride yanıltmasın diye en az 5 kişi)
  let drop: { from: FunnelStep; to: FunnelStep; lostPer100: number } | null = null;
  for (let i = 1; i < steps.length - 1; i++) {
    const a = steps[i - 1];
    const b = steps[i];
    if (a.count < 5) continue;
    const lost = Math.round(((a.count - b.count) / a.count) * 100);
    if (!drop || lost > drop.lostPer100) drop = { from: a, to: b, lostPer100: lost };
  }
  return { steps, drop };
}

/** Kıbrıs'ta bugünün saati, haftanın günü (0 = pazartesi) */
function cyprusClock(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short", hour: "2-digit", hourCycle: "h23", day: "2-digit" }).formatToParts(d).map((x) => [x.type, x.value]),
  );
  const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(p.weekday);
  return { hour: Number(p.hour), dow: dow < 0 ? 0 : dow, day: Number(p.day) };
}

export function greeting(now: Date) {
  const h = cyprusClock(now).hour;
  if (h >= 5 && h < 12) return "Günaydın";
  if (h >= 12 && h < 18) return "İyi günler";
  if (h >= 18 && h < 23) return "İyi akşamlar";
  return "İyi geceler";
}

const DOW = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

/** Bu haftanın 7 günü (pazartesiden): planlı arama sayısı, bugün işaretli */
export function weekStrip(leads: BoardLead[], now: Date) {
  const { dow } = cyprusClock(now);
  const today = cyprusDayKey(now);
  const open = leads.filter((l) => l.followUpAt && !["satis", "olumsuz", "satis_disi"].includes(statusInfo(l.status).key));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getTime() + (i - dow) * DAY);
    const key = cyprusDayKey(d);
    return { key, dow: DOW[i], day: cyprusClock(d).day, count: open.filter((l) => cyprusDayKey(l.followUpAt!) === key).length, today: key === today, past: key < today };
  });
}

/** Sıradaki planlı aramalar (şu andan sonra) */
export function upcoming(leads: BoardLead[], now: Date, n = 3) {
  return leads
    .filter((l) => l.followUpAt && l.followUpAt.getTime() >= now.getTime() && !["satis", "olumsuz", "satis_disi"].includes(statusInfo(l.status).key))
    .sort((a, b) => a.followUpAt!.getTime() - b.followUpAt!.getTime())
    .slice(0, n);
}

/** Sorumlulara göre açık talepler ve bugünkü aramalar */
export function teamLoad(leads: BoardLead[], now: Date) {
  const due = new Set(dueFollowUps(leads, now).map((l) => l.id));
  const map = new Map<string, { name: string; open: number; due: number }>();
  for (const l of leads) {
    if (!l.assignee || ["satis", "olumsuz", "satis_disi"].includes(statusInfo(l.status).key)) continue;
    const row = map.get(l.assignee) ?? { name: l.assignee, open: 0, due: 0 };
    row.open++;
    if (due.has(l.id)) row.due++;
    map.set(l.assignee, row);
  }
  return [...map.values()].sort((a, b) => b.due - a.due || b.open - a.open || a.name.localeCompare(b.name, "tr"));
}

/** Mesajla gelip numara bırakmayan alıcı talepleri */
export const noNumberLeads = (leads: BoardLead[]) => leads.filter((l) => noContact(l) && isSalesLead(l) && statusInfo(l.status).key !== "olumsuz");
