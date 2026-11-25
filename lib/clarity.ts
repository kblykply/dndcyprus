// lib/clarity.ts
// Microsoft Clarity Data Export API (yalnız sunucu) · 25.11.2026. Yöntem DND Homes panelinden (lib/clarity.ts).
// API sınırları: proje başına GÜNDE EN FAZLA 10 istek, yalnız son 1–3 gün, ≤1000 satır. Bu yüzden panel Clarity'yi her açılışta
// sormaz: her sabah bir kez (Vercel Cron) son 24 saat URL/Cihaz/Kanal boyutlarıyla çekilip ClaritySnapshot tablosunda birikir;
// 7/30/90 günlük görünüm bu birikimden toplanır. "Şimdi güncelle" ayrı bir "anlik" kayda yazar (geçmişe karışmaz).
// Isı haritası GÖRÜNTÜSÜ API'de yok ve Clarity sayfası başka siteye gömülemiyor: panel ölçüleri gösterir, haritayı Clarity'de açar.
//   CLARITY_API_TOKEN       → Clarity → Ayarlar → Veri dışa aktarma → API belirteci (Vercel, Sensitive)
//   NEXT_PUBLIC_CLARITY_ID  → proje kimliği (bağlantılar için; zaten tanımlı)

export const CLARITY_DIMENSIONS = ["URL", "Device", "Channel"] as const;
export type ClarityDimension = (typeof CLARITY_DIMENSIONS)[number];
export type ClarityResponse = { metricName: string; information?: Record<string, unknown>[] }[];

export const clarityConfigured = () => !!(process.env.CLARITY_API_TOKEN || "").trim();
export const clarityProjectId = () => (process.env.NEXT_PUBLIC_CLARITY_ID || "").trim();

export async function clarityFetch(
  dimension: ClarityDimension,
  days: 1 | 2 | 3 = 1,
): Promise<{ ok: true; data: ClarityResponse } | { ok: false; error: string; status?: number }> {
  const token = (process.env.CLARITY_API_TOKEN || "").trim();
  if (!token) return { ok: false, error: "Clarity API belirteci tanımlı değil (CLARITY_API_TOKEN)." };
  try {
    const r = await fetch(`https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=${days}&dimension1=${encodeURIComponent(dimension)}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (r.status === 429) return { ok: false, status: 429, error: "Clarity günlük sorgu sınırı (10) doldu; yarın yeniden denenir." };
    if (r.status === 401 || r.status === 403) return { ok: false, status: r.status, error: "Clarity belirteci geçersiz ya da yetkisiz." };
    if (!r.ok) return { ok: false, status: r.status, error: `Clarity ${r.status} döndü.` };
    const data = (await r.json()) as unknown;
    if (!Array.isArray(data)) return { ok: false, error: "Clarity beklenmeyen yanıt verdi." };
    return { ok: true, data: data as ClarityResponse };
  } catch (e) {
    return { ok: false, error: `Clarity'ye ulaşılamadı: ${(e as Error).message}` };
  }
}

const num = (v: unknown): number => {
  const n = typeof v === "number" ? v : Number(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const first = (o: Record<string, unknown> | undefined, keys: string[]): number | undefined => {
  if (!o) return undefined;
  for (const k of keys) if (o[k] !== undefined && o[k] !== null && o[k] !== "") return num(o[k]);
  return undefined;
};

export type ClarityRow = {
  value: string;
  sessions: number;
  bots: number;
  /** Σ(kaydırma % × oturum): ağırlıklı ortalama için */
  scrollW: number;
  rage: number;
  rageW: number;
  dead: number;
  deadW: number;
  quickback: number;
  quickbackW: number;
  errors: number;
};

/** Satırdaki boyut değeri: Clarity anahtarı istekteki adla aynı yazılmıyor (URL → "Url"), büyük/küçük harf duyarsız aranır */
export function dimensionValue(r: Record<string, unknown>, dimension: ClarityDimension): string {
  const want = dimension.toLowerCase();
  const key = dimension in r ? dimension : Object.keys(r).find((k) => k.toLowerCase() === want);
  const v = key ? r[key] : undefined;
  return v === undefined || v === null || v === "" ? "(bilinmiyor)" : String(v);
}

/**
 * Sayfa adresini tek biçime indirir: Clarity aynı sayfayı http/https, www'siz, sonda "/" ya da reklam parametreleriyle
 * (?utm_…) ayrı satırlar olarak verebiliyor → https://www.dndcyprus.com/<yol>
 */
export function canonicalPageUrl(raw: string): string {
  try {
    const u = new URL(raw);
    const path = u.pathname.replace(/\/+$/, "") || "/";
    return `https://www.dndcyprus.com${path === "/" ? "" : path}`;
  } catch {
    return raw;
  }
}

/** Bir ya da daha çok ham yanıtı boyut değerine göre toplar; yüzdeler oturum sayısıyla ağırlıklandırılır */
export function clarityAggregate(responses: ClarityResponse[], dimension: ClarityDimension): ClarityRow[] {
  const m = new Map<string, ClarityRow>();
  const keyOf = (raw: string) => (dimension === "URL" && raw !== "(bilinmiyor)" ? canonicalPageUrl(raw) : raw);
  const row = (v: string) => {
    let s = m.get(v);
    if (!s) {
      s = { value: v, sessions: 0, bots: 0, scrollW: 0, rage: 0, rageW: 0, dead: 0, deadW: 0, quickback: 0, quickbackW: 0, errors: 0 };
      m.set(v, s);
    }
    return s;
  };
  for (const res of responses) {
    const sessions = new Map<string, number>();
    for (const block of res) {
      if (block.metricName !== "Traffic") continue;
      for (const r of block.information || []) {
        const raw = dimensionValue(r, dimension);
        const n = first(r, ["totalSessionCount", "sessionsCount"]) || 0;
        sessions.set(raw, (sessions.get(raw) || 0) + n); // ağırlık ham satırın kendi oturumu (birleşen satırlar ayrı ağırlıklanır)
        const s = row(keyOf(raw));
        s.sessions += n;
        s.bots += first(r, ["totalBotSessionCount"]) || 0;
      }
    }
    for (const block of res) {
      for (const r of block.information || []) {
        const raw = dimensionValue(r, dimension);
        const s = row(keyOf(raw));
        const w = sessions.get(raw) || first(r, ["sessionsCount", "totalSessionCount"]) || 0;
        const pct = first(r, ["sessionsWithMetricPercentage", "percentage"]);
        const total = first(r, ["subTotal", "total", "count", "sessionsWithMetric"]);
        switch (block.metricName) {
          case "ScrollDepth":
            s.scrollW += (first(r, ["averageScrollDepth", "scrollDepth", "value"]) || 0) * w;
            break;
          case "RageClickCount":
            s.rage += total || 0;
            s.rageW += (pct || 0) * w;
            break;
          case "DeadClickCount":
            s.dead += total || 0;
            s.deadW += (pct || 0) * w;
            break;
          case "QuickbackClick":
            s.quickback += total || 0;
            s.quickbackW += (pct || 0) * w;
            break;
          case "ScriptErrorCount":
            s.errors += total || 0;
            break;
        }
      }
    }
  }
  return [...m.values()].filter((s) => s.sessions > 0).sort((a, b) => b.sessions - a.sessions);
}

/** Ağırlıklı yüzde/ortalama; oturum yoksa null (uydurma 0 yok) */
export const weighted = (w: number, sessions: number): number | null => (sessions ? w / sessions : null);

export function clarityTotals(rows: ClarityRow[]) {
  return rows.reduce(
    (a, s) => ({
      sessions: a.sessions + s.sessions,
      bots: a.bots + s.bots,
      scrollW: a.scrollW + s.scrollW,
      rage: a.rage + s.rage,
      rageW: a.rageW + s.rageW,
      dead: a.dead + s.dead,
      deadW: a.deadW + s.deadW,
      quickback: a.quickback + s.quickback,
      quickbackW: a.quickbackW + s.quickbackW,
      errors: a.errors + s.errors,
    }),
    { sessions: 0, bots: 0, scrollW: 0, rage: 0, rageW: 0, dead: 0, deadW: 0, quickback: 0, quickbackW: 0, errors: 0 },
  );
}

/** Clarity'de ısı haritası / kayıt bağlantısı (proje kimliği yoksa Clarity ana sayfası) */
export function clarityLink(kind: "heatmaps" | "recordings" | "dashboard", opts: { url?: string; days?: number } = {}) {
  const id = clarityProjectId();
  if (!id) return "https://clarity.microsoft.com/";
  const base = `https://clarity.microsoft.com/projects/view/${id}`;
  const range = !opts.days || opts.days <= 3 ? "Last 3 days" : opts.days <= 7 ? "Last 7 days" : "Last 30 days";
  const q = new URLSearchParams({ date: range });
  if (opts.url) q.set("url", opts.url);
  const path = kind === "heatmaps" ? "heatmaps" : kind === "recordings" ? "impressions" : "dashboard";
  return `${base}/${path}?${q.toString()}`;
}

/** Kıbrıs saatine göre gün anahtarı (YYYY-MM-DD) */
export const cyprusDay = (d: Date) => d.toLocaleDateString("sv-SE", { timeZone: "Asia/Famagusta" });
