// lib/responder-score.ts
// Mesaj yanıt performansı (27.11.2026): Messenger / Instagram mesajlarına yanıt veren kişinin (Talha) 100 üzerinden puanı.
// Yalnız kişinin elindeki ölçüler: numara alma çıkarıldı (müşteri numara verip vermemeye kendisi karar verir).
// Gece (23:00–08:00 Kıbrıs) gelen mesajlar hız puanını bozmaz: onlar "sabah 10:00'a kadar yanıtlandı mı" diye ayrı ölçülür.
// Kaynak: mesaj senkronunun sohbet hafızası (f ilk müşteri mesajı, r ilk yanıt süresi, a ekibin son yanıtı).
// Saf hesap (testli); panelde Performans sayfası kullanır.
import type { ConvMemo } from "./meta-messages";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const TZ = "Asia/Famagusta";

export type ScorePart = { key: string; label: string; max: number; points: number; value: string; hint: string; noData?: boolean };

/** Puan ağırlıkları (toplam 100) */
export const WEIGHTS = { hiz: 40, saat: 25, gece: 20, cevapsiz: 15 } as const;
/** Haftalık grafikte gösterilen hedef: gündüz medyan yanıt süresi */
export const TARGET_MS = 15 * MIN;

/** Gündüz medyan ilk yanıt süresi → hız oranı: 5 dk %100, 15 dk %89, 30 dk %77, 1 sa %63, 3 sa %40, 12 sa %11, 24 sa+ 0 (arası logaritmik) */
const SPEED_RATIO: [number, number][] = [
  [5, 1],
  [15, 0.886],
  [30, 0.771],
  [60, 0.629],
  [180, 0.4],
  [720, 0.114],
  [1440, 0],
];

export function speedRatio(medianMs: number) {
  const m = Math.max(0, medianMs) / MIN;
  if (m <= SPEED_RATIO[0][0]) return SPEED_RATIO[0][1];
  for (let i = 1; i < SPEED_RATIO.length; i++) {
    const [m1, p1] = SPEED_RATIO[i];
    const [m0, p0] = SPEED_RATIO[i - 1];
    if (m <= m1) return p0 + ((Math.log(m) - Math.log(m0)) / (Math.log(m1) - Math.log(m0))) * (p1 - p0);
  }
  return 0;
}

/** Hız puanı (0–40) */
export const speedPoints = (medianMs: number) => speedRatio(medianMs) * WEIGHTS.hiz;

function cyprusHour(ts: number) {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hourCycle: "h23" }).format(new Date(ts)));
}

/** Gece: 23:00–08:00 (Kıbrıs) */
export const isNight = (ts: number) => {
  const h = cyprusHour(ts);
  return h >= 23 || h < 8;
};

/** Gece gelen mesajın sabah son yanıt zamanı: o sabah (23:xx ise ertesi sabah) 10:00 Kıbrıs */
export function morningDeadline(ts: number) {
  const h = cyprusHour(ts);
  const base = h >= 23 ? ts + DAY : ts;
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

export const durationText = (ms: number) =>
  ms < HOUR ? `${Math.max(1, Math.round(ms / MIN))} dk` : ms < DAY ? `${(ms / HOUR).toFixed(1).replace(".", ",")} sa` : `${(ms / DAY).toFixed(1).replace(".", ",")} gün`;
const pct = (x: number) => `%${Math.round(x * 100)}`;

export function grade(score: number) {
  if (score >= 90) return { label: "Mükemmel", tone: "teal" };
  if (score >= 75) return { label: "Çok iyi", tone: "teal" };
  if (score >= 60) return { label: "İyi", tone: "amber" };
  if (score >= 45) return { label: "Geliştirilmeli", tone: "amber" };
  return { label: "Yetersiz", tone: "rose" };
}

/**
 * Dönemde ilk mesajı gelen sohbetler (son 1 saat hariç: yanıtı henüz beklenen sohbet puanı düşürmesin).
 * Puan: gündüz yanıt hızı 40 + gündüz 1 saat içinde yanıt 25 + gece mesajlarına sabah 10:00'a kadar yanıt 20 + yanıtsız
 * bırakmama 15.
 */
/** Dönemde ilk mesajı gelen sohbet mi (son 1 saat hariç) */
const inPeriod = (c: ConvMemo, now: number, days: number) => typeof c.f === "number" && c.f >= now - days * DAY && c.f <= now - HOUR;

export function responderScore(convs: Record<string, ConvMemo>, now: number, days = 30) {
  const list = Object.values(convs).filter((c) => inPeriod(c, now, days));
  const day = list.filter((c) => !isNight(c.f!));
  const night = list.filter((c) => isNight(c.f!));
  const answered = (c: ConvMemo) => typeof c.r === "number";

  const dayMedian = median(day.filter(answered).map((c) => c.r as number));
  const dayWithinHour = day.length ? day.filter((c) => answered(c) && (c.r as number) <= HOUR).length / day.length : null;
  const nightOnTime = night.length ? night.filter((c) => answered(c) && c.f! + (c.r as number) <= morningDeadline(c.f!)).length / night.length : null;
  const neverAnswered = list.filter((c) => !answered(c) && !c.a).length;

  const parts: ScorePart[] = [
    {
      key: "hiz",
      label: "Gündüz yanıt hızı",
      max: WEIGHTS.hiz,
      points: dayMedian === null ? WEIGHTS.hiz : speedPoints(dayMedian),
      value: dayMedian === null ? "—" : `medyan ${durationText(dayMedian)}`,
      hint: "08:00–23:00 arasında gelen mesajlara medyan ilk yanıt süresi (yanıtların yarısı bu sürenin altında). 5 dakika ve altı tam puan.",
      noData: dayMedian === null,
    },
    {
      key: "saat",
      label: "1 saat içinde yanıt oranı",
      max: WEIGHTS.saat,
      points: dayWithinHour === null ? WEIGHTS.saat : dayWithinHour * WEIGHTS.saat,
      value: dayWithinHour === null ? "—" : pct(dayWithinHour),
      hint: "Gündüz gelen sohbetlerden ilk 1 saat içinde yanıtlananların oranı.",
      noData: dayWithinHour === null,
    },
    {
      key: "gece",
      label: "Gece mesajlarına sabah yanıtı",
      max: WEIGHTS.gece,
      points: nightOnTime === null ? WEIGHTS.gece : nightOnTime * WEIGHTS.gece,
      value: nightOnTime === null ? "—" : `${pct(nightOnTime)} · ${night.length} sohbet`,
      hint: "23:00–08:00 arasında gelen mesajlardan ertesi sabah 10:00'a kadar yanıtlananların oranı (mesai dışı; hız puanına katılmaz).",
      noData: nightOnTime === null,
    },
    {
      key: "cevapsiz",
      label: "Yanıtsız bırakmama",
      max: WEIGHTS.cevapsiz,
      points: list.length ? (1 - neverAnswered / list.length) * WEIGHTS.cevapsiz : WEIGHTS.cevapsiz,
      value: list.length ? `${neverAnswered} yanıtsız / ${list.length}` : "—",
      hint: "Hiç yanıt verilmeyen sohbetlerin oranı düştükçe puan artar.",
      noData: !list.length,
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
      dayWithinHour,
      neverAnswered,
    },
  };
}

/** "Yanıtsız sohbet" sayısının arkasındaki sohbetler (ekip hiç yazmadı), en yeni önce: panelde hangileri olduğu görünsün */
export function unansweredConvs(convs: Record<string, ConvMemo>, now: number, days = 30) {
  return Object.entries(convs)
    .filter(([, c]) => inPeriod(c, now, days) && typeof c.r !== "number" && !c.a)
    .map(([id, c]) => ({ id, l: c.l, f: c.f as number, c: c.c }))
    .sort((a, b) => b.f - a.f);
}

export type WeekPoint = { from: number; count: number; median: number | null; withinHour: number | null };

/** Haftalık eğilim: son N haftada gelen sohbet sayısı, gündüz medyan ilk yanıt süresi ve 1 saat içinde yanıt oranı (eski önce) */
export function weeklyTrend(convs: Record<string, ConvMemo>, now: number, weeks = 8): WeekPoint[] {
  const out: WeekPoint[] = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const to = now - w * 7 * DAY;
    const from = to - 7 * DAY;
    // son 1 saatte gelenler henüz sayılmaz (puandaki gibi)
    const list = Object.values(convs).filter((c) => typeof c.f === "number" && c.f >= from && c.f < Math.min(to, now - HOUR));
    const day = list.filter((c) => !isNight(c.f!));
    const times = day.filter((c) => typeof c.r === "number").map((c) => c.r as number);
    out.push({
      from,
      count: list.length,
      median: median(times),
      withinHour: day.length ? day.filter((c) => typeof c.r === "number" && (c.r as number) <= HOUR).length / day.length : null,
    });
  }
  return out;
}
