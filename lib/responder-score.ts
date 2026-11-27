// lib/responder-score.ts
// Mesaj cevap performansı (27.11.2026): Messenger / Instagram mesajlarına cevap veren kişinin (Talha) 100 üzerinden puanı.
// Gece (23:00–08:00 Kıbrıs) gelen mesajlar hız puanını bozmaz: onlar "sabah 10'a kadar cevaplandı mı" diye ayrı ölçülür.
// Kaynak: mesaj senkronunun sohbet hafızası (f ilk müşteri mesajı, r ilk cevap süresi, a ekibin son cevabı) + talepler.
// Saf hesap (testli); panelde Performans sayfası kullanır.
import type { ConvMemo } from "./meta-messages";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const TZ = "Asia/Famagusta";

export type ScoreLead = { phone: string | null; email: string; status: string };

export type ScorePart = { key: string; label: string; max: number; points: number; value: string; hint: string; noData?: boolean };

/** Gündüz ilk cevap süresi → puan (35): 5 dk 35, 15 dk 31, 30 dk 27, 1 sa 22, 3 sa 14, 12 sa 4, 24 sa+ 0 (arası logaritmik) */
const SPEED_POINTS: [number, number][] = [
  [5, 35],
  [15, 31],
  [30, 27],
  [60, 22],
  [180, 14],
  [720, 4],
  [1440, 0],
];

export function speedPoints(medianMs: number) {
  const m = Math.max(0, medianMs) / MIN;
  if (m <= SPEED_POINTS[0][0]) return SPEED_POINTS[0][1];
  for (let i = 1; i < SPEED_POINTS.length; i++) {
    const [m1, p1] = SPEED_POINTS[i];
    const [m0, p0] = SPEED_POINTS[i - 1];
    if (m <= m1) return p0 + ((Math.log(m) - Math.log(m0)) / (Math.log(m1) - Math.log(m0))) * (p1 - p0);
  }
  return 0;
}

function cyprusHour(ts: number) {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hourCycle: "h23" }).format(new Date(ts)));
}

/** Gece: 23:00–08:00 (Kıbrıs) */
export const isNight = (ts: number) => {
  const h = cyprusHour(ts);
  return h >= 23 || h < 8;
};

/** Gece gelen mesajın sabah son cevap zamanı: o sabah (23:xx ise ertesi sabah) 10:00 Kıbrıs */
export function morningDeadline(ts: number) {
  const h = cyprusHour(ts);
  const base = h >= 23 ? ts + DAY : ts;
  // base gününün 10:00'ı: saat farkını Kıbrıs saatine göre bul
  const hb = cyprusHour(base);
  const minutes = Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, minute: "2-digit" }).format(new Date(base)));
  return base - hb * HOUR - minutes * MIN - (base % MIN) + 10 * HOUR;
}

const median = (xs: number[]) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const dur = (ms: number) => (ms < HOUR ? `${Math.max(1, Math.round(ms / MIN))} dk` : ms < DAY ? `${(ms / HOUR).toFixed(1).replace(".", ",")} sa` : `${(ms / DAY).toFixed(1).replace(".", ",")} gün`);
const pct = (x: number) => `%${Math.round(x * 100)}`;

export function grade(score: number) {
  if (score >= 90) return { label: "Mükemmel", tone: "teal" };
  if (score >= 75) return { label: "Çok iyi", tone: "teal" };
  if (score >= 60) return { label: "İyi", tone: "amber" };
  if (score >= 45) return { label: "Gelişmeli", tone: "amber" };
  return { label: "Zayıf", tone: "rose" };
}

/**
 * Dönemde ilk mesajı gelen sohbetler (son 1 saat hariç: cevabı henüz beklenen sohbet puanı düşürmesin).
 * Puan: gündüz hızı 35 + gündüz 1 saat içinde 20 + gece mesajları sabah 10'a kadar 15 + cevapsız bırakmama 10 + numara alma 20.
 */
export function responderScore(convs: Record<string, ConvMemo>, leads: Map<number, ScoreLead>, now: number, days = 30) {
  const from = now - days * DAY;
  const list = Object.values(convs).filter((c) => typeof c.f === "number" && c.f >= from && c.f <= now - HOUR);
  const day = list.filter((c) => !isNight(c.f!));
  const night = list.filter((c) => isNight(c.f!));
  const answered = (c: ConvMemo) => typeof c.r === "number";

  const dayTimes = day.filter(answered).map((c) => c.r as number);
  const dayMedian = median(dayTimes);
  const dayWithinHour = day.length ? day.filter((c) => answered(c) && (c.r as number) <= HOUR).length / day.length : null;
  const nightOnTime = night.length ? night.filter((c) => answered(c) && c.f! + (c.r as number) <= morningDeadline(c.f!)).length / night.length : null;
  const neverAnswered = list.filter((c) => !answered(c) && !c.a).length;
  const linked = list.filter((c) => c.l && leads.has(c.l));
  const withContact = linked.filter((c) => {
    const l = leads.get(c.l!)!;
    return !!(l.phone || l.email.trim());
  }).length;
  const contactRate = linked.length ? withContact / linked.length : null;

  const parts: ScorePart[] = [
    {
      key: "hiz",
      label: "Gündüz cevap hızı",
      max: 35,
      points: dayMedian === null ? 35 : speedPoints(dayMedian),
      value: dayMedian === null ? "—" : `ortanca ${dur(dayMedian)}`,
      hint: "08:00–23:00 arası gelen mesaja ilk cevap süresi (ortanca). 5 dk ve altı tam puan.",
      noData: dayMedian === null,
    },
    {
      key: "saat",
      label: "1 saat içinde cevap",
      max: 20,
      points: dayWithinHour === null ? 20 : dayWithinHour * 20,
      value: dayWithinHour === null ? "—" : pct(dayWithinHour),
      hint: "Gündüz gelen sohbetlerin kaçına 1 saat içinde cevap verildi.",
      noData: dayWithinHour === null,
    },
    {
      key: "gece",
      label: "Gece mesajları sabaha",
      max: 15,
      points: nightOnTime === null ? 15 : nightOnTime * 15,
      value: nightOnTime === null ? "—" : `${pct(nightOnTime)} · ${night.length} sohbet`,
      hint: "23:00–08:00 gelen mesajların kaçı sabah 10:00'a kadar cevaplandı (gece uyku saati, hız puanını bozmaz).",
      noData: nightOnTime === null,
    },
    {
      key: "cevapsiz",
      label: "Cevapsız bırakmama",
      max: 10,
      points: list.length ? (1 - neverAnswered / list.length) * 10 : 10,
      value: list.length ? `${neverAnswered} cevapsız / ${list.length}` : "—",
      hint: "Ekibin hiç yazmadığı sohbet oranı düştükçe puan artar.",
      noData: !list.length,
    },
    {
      key: "numara",
      label: "Numara alma",
      max: 20,
      points: contactRate === null ? 20 : Math.min(1, contactRate / 0.5) * 20,
      value: contactRate === null ? "—" : pct(contactRate),
      hint: "Mesajla yazan kişilerin kaçından telefon ya da e-posta alındı. %50 ve üstü tam puan.",
      noData: contactRate === null,
    },
  ];
  const score = Math.round(parts.reduce((s, p) => s + p.points, 0));
  return {
    score,
    grade: grade(score),
    parts: parts.map((p) => ({ ...p, points: Math.round(p.points * 10) / 10 })),
    stats: {
      conversations: list.length,
      answered: list.filter(answered).length,
      night: night.length,
      dayMedian,
      allMedian: median(list.filter(answered).map((c) => c.r as number)),
      neverAnswered,
      withContact,
      linked: linked.length,
    },
  };
}

/** Haftalık eğilim: son N haftada gündüz ilk cevap ortancası ve sohbet sayısı (en eski hafta önce) */
export function weeklyTrend(convs: Record<string, ConvMemo>, now: number, weeks = 8) {
  const out: { from: number; count: number; median: number | null }[] = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const to = now - w * 7 * DAY;
    const from = to - 7 * DAY;
    const list = Object.values(convs).filter((c) => typeof c.f === "number" && c.f >= from && c.f < to);
    out.push({ from, count: list.length, median: median(list.filter((c) => !isNight(c.f!) && typeof c.r === "number").map((c) => c.r as number)) });
  }
  return out;
}
