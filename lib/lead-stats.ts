// lib/lead-stats.ts
// Genel Bakış ve Reklam Raporu hesapları (25.11.2026). Saf fonksiyonlar; sayılar yalnız veritabanındaki taleplerden
// o anda hesaplanır, uydurma ya da tahmini değer yoktur. Gün/ay sınırları Kıbrıs saatine göre.

import { sanitizeAttribution, type Touch } from "./attribution";
import { cyprusMonthStart, sourceGroup, statusInfo } from "./lead-status";

const TZ = "Asia/Famagusta";

export const OVERVIEW_PERIODS = [
  { key: "30g", label: "Son 30 gün" },
  { key: "90g", label: "Son 90 gün" },
  { key: "12a", label: "Son 12 ay" },
  { key: "tumu", label: "Tüm zamanlar" },
] as const;

export type OverviewPeriod = (typeof OVERVIEW_PERIODS)[number]["key"];

export function overviewPeriod(v: string | undefined): OverviewPeriod {
  return (OVERVIEW_PERIODS.find((p) => p.key === v)?.key ?? "12a") as OverviewPeriod;
}

export type StatLead = {
  id: number;
  createdAt: Date;
  name: string;
  status: string;
  source: string | null;
  campaign: string | null;
  project: string | null;
  unitType?: string | null;
  form?: string | null;
  pageUrl?: string | null;
  attribution?: unknown;
};

const dayKey = (d: Date) => d.toLocaleDateString("sv-SE", { timeZone: TZ }); // YYYY-MM-DD
const monthKey = (d: Date) => dayKey(d).slice(0, 7);

export type Bucket = { key: string; label: string; title: string; count: number };

/** Seçilen dönemin başlangıcı, önceki eş dönemin aralığı ve grafik kovaları */
export function periodBuckets(period: OverviewPeriod, now: Date, leads: { createdAt: Date }[]) {
  const DAY = 86_400_000;
  if (period === "30g" || period === "90g") {
    const n = period === "30g" ? 30 : 90;
    const days: Date[] = Array.from({ length: n }, (_, i) => new Date(now.getTime() - (n - 1 - i) * DAY));
    const from = startOfCyprusDay(days[0]);
    const span = now.getTime() - from.getTime();
    return {
      from,
      prevFrom: new Date(from.getTime() - span),
      prevTo: from,
      granularity: "day" as const,
      keys: days.map((d) => ({
        key: dayKey(d),
        label: d.toLocaleDateString("tr-TR", { timeZone: TZ, day: "numeric", month: "short" }),
        title: d.toLocaleDateString("tr-TR", { timeZone: TZ, day: "numeric", month: "long", year: "numeric" }),
      })),
    };
  }
  let months = 12;
  if (period === "tumu") {
    const first = leads.reduce<Date | null>((m, l) => (!m || l.createdAt < m ? l.createdAt : m), null);
    if (first) {
      const [fy, fm] = monthKey(first).split("-").map(Number);
      const [ny, nm] = monthKey(now).split("-").map(Number);
      months = Math.min(48, Math.max(1, (ny - fy) * 12 + (nm - fm) + 1));
    }
  }
  const starts = Array.from({ length: months }, (_, i) => cyprusMonthStart(now, i - (months - 1)));
  const from = period === "tumu" ? null : starts[0];
  return {
    from,
    prevFrom: from ? cyprusMonthStart(now, -(2 * months - 1)) : null,
    prevTo: from,
    granularity: "month" as const,
    keys: starts.map((d) => ({
      key: monthKey(new Date(d.getTime() + 3 * 3600_000)),
      label: d.toLocaleDateString("tr-TR", { timeZone: TZ, month: "short" }),
      title: d.toLocaleDateString("tr-TR", { timeZone: TZ, month: "long", year: "numeric" }),
    })),
  };
}

function startOfCyprusDay(d: Date) {
  const key = dayKey(d);
  // Kıbrıs günü 00:00 → UTC: o güne ait ayın başlangıcından gün farkı kadar ileri
  const [y, m, day] = key.split("-").map(Number);
  const guess = new Date(Date.UTC(y, m - 1, day));
  const off = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "longOffset" }).format(guess);
  const mm = /GMT([+-])(\d{2}):?(\d{2})?/.exec(off);
  const mins = mm ? (mm[1] === "-" ? -1 : 1) * (Number(mm[2]) * 60 + Number(mm[3] || 0)) : 120;
  return new Date(guess.getTime() - mins * 60_000);
}

export function bucketCounts(leads: { createdAt: Date }[], b: ReturnType<typeof periodBuckets>): Bucket[] {
  const keyOf = b.granularity === "day" ? dayKey : monthKey;
  const counts = new Map<string, number>();
  for (const l of leads) {
    const k = keyOf(l.createdAt);
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  return b.keys.map((k) => ({ ...k, count: counts.get(k.key) || 0 }));
}

export function inRange<T extends { createdAt: Date }>(leads: T[], from: Date | null, to?: Date | null) {
  return leads.filter((l) => (!from || l.createdAt >= from) && (!to || l.createdAt < to));
}

export const isQualified = (status: string) => ["gorusuluyor", "satis"].includes(statusInfo(status).key);

export type Group = { key: string; label: string; count: number; qualified: number; sold: number; lost: number };

export function groupLeads<T extends StatLead>(leads: T[], keyOf: (l: T) => { key: string; label: string } | null): Group[] {
  const m = new Map<string, Group>();
  for (const l of leads) {
    const k = keyOf(l);
    if (!k) continue;
    const g = m.get(k.key) ?? { key: k.key, label: k.label, count: 0, qualified: 0, sold: 0, lost: 0 };
    g.count += 1;
    const s = statusInfo(l.status).key;
    if (s === "gorusuluyor" || s === "satis") g.qualified += 1;
    if (s === "satis") g.sold += 1;
    if (s === "olumsuz") g.lost += 1;
    m.set(k.key, g);
  }
  return [...m.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "tr"));
}

/** Kaynak grubu renkleri (grafiklerde her yerde aynı) */
export const SOURCE_COLORS: Record<string, string> = {
  "meta-reklam": "#4f6bed",
  instagram: "#d6249f",
  facebook: "#1877f2",
  "google-ads": "#f4a100",
  "google-arama": "#2f9e57",
  google: "#2f9e57",
  dogrudan: "#0d6570",
  arama: "#64748b",
  whatsapp: "#1f9d55",
  "e-posta": "#7c3aed",
  site: "#2aa9b3",
  bilinmiyor: "#cbd5e1",
};
export const FALLBACK_COLORS = ["#2aa9b3", "#cd4824", "#0d6570", "#f4a100", "#7c3aed", "#64748b", "#d6249f", "#2f9e57"];

export function sourceColor(key: string, i = 0) {
  return SOURCE_COLORS[key] ?? (key.startsWith("manuel-") ? "#94a3b8" : FALLBACK_COLORS[i % FALLBACK_COLORS.length]);
}

/** Reklam ayrıntısı: kampanya, reklam (utm_content), anahtar kelime (utm_term), giriş sayfası */
export function adTouch(l: StatLead): Touch | null {
  const a = sanitizeAttribution(l.attribution);
  if (!a) return null;
  return [a.current, a.last].find((t) => t && (t.utm_source || t.utm_campaign || t.gclid || t.fbclid)) ?? a.first ?? null;
}

function pathOf(url: string | null | undefined) {
  if (!url) return null;
  try {
    return new URL(url).pathname;
  } catch {
    return url.startsWith("/") ? url : null;
  }
}

export const AD_DIMENSIONS = [
  { key: "kanal", label: "Kanal" },
  { key: "kampanya", label: "Kampanya" },
  { key: "reklam", label: "Reklam / kreatif" },
  { key: "kelime", label: "Anahtar kelime" },
  { key: "sayfa", label: "Giriş sayfası" },
  { key: "proje", label: "Proje" },
] as const;

export type AdDimension = (typeof AD_DIMENSIONS)[number]["key"];

export function adKey(dim: AdDimension, l: StatLead): { key: string; label: string } | null {
  const t = adTouch(l);
  switch (dim) {
    case "kanal": {
      const g = sourceGroup(l.source);
      return g;
    }
    case "kampanya": {
      const c = l.campaign || t?.utm_campaign;
      return c ? { key: c, label: c } : null;
    }
    case "reklam":
      return t?.utm_content ? { key: t.utm_content, label: t.utm_content } : null;
    case "kelime":
      return t?.utm_term ? { key: t.utm_term, label: t.utm_term } : null;
    case "sayfa": {
      const p = t?.landing || pathOf(l.pageUrl);
      return p ? { key: p, label: p } : null;
    }
    case "proje":
      return l.project ? { key: l.project, label: l.project } : { key: "-", label: "Proje seçilmemiş" };
  }
}

/** Önceki döneme göre değişim yüzdesi (önceki 0 ise null) */
export function changePct(cur: number, prev: number) {
  if (!prev) return null;
  return ((cur - prev) / prev) * 100;
}

/** Grafik ekseni için yuvarlak üst sınır ve ara değerler */
export function niceTicks(max: number, count = 4) {
  if (max <= 0) return { top: count, ticks: Array.from({ length: count + 1 }, (_, i) => i) };
  const raw = max / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const s = Math.max(1, Math.ceil(step));
  const top = s * count;
  return { top, ticks: Array.from({ length: count + 1 }, (_, i) => i * s) };
}
