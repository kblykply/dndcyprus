// lib/ga4.ts
// GA4 verisini panelde göstermek için Google Analytics Data API (yalnız sunucu) · 25.11.2026.
// Yöntem DND Homes panelinden (dnd-homes-yenileme/cms/src/lib/ga4.ts): servis hesabı JSON'u ile imzalı JWT → erişim anahtarı →
// REST çağrısı. Kütüphane yok (@google-analytics/data ~40 MB gRPC getirir). Anahtar yalnız ortam değişkeninden okunur, loglanmaz.
//   GA4_PROPERTY_ID            → DND Cyprus mülk numarası (G-M944YNCLQ2'nin mülkü)
//   GA4_SERVICE_ACCOUNT_JSON   → servis hesabı anahtar dosyasının TAMAMI (Vercel, Sensitive)
// Aynı rapor 5 dk bellekte tutulur (GA4 kotası + sayfa hızı). Hata paneli düşürmez: { ok:false, hata } döner.

import crypto from "node:crypto";

type Key = { client_email: string; private_key: string };
export type Ga4Row = { dims: string[]; vals: number[] };
export type Ga4Report = { rows: Ga4Row[]; totals: number[] };
export type Ga4Result<T> = { ok: true; data: T } | { ok: false; error: string; notConfigured?: boolean };

let token: { value: string; until: number } | null = null;
const cache = new Map<string, { until: number; data: unknown }>();
const CACHE_MS = 5 * 60_000;

function readKey(): Key | null {
  try {
    const raw = (process.env.GA4_SERVICE_ACCOUNT_JSON || "").trim();
    if (!raw) return null;
    const k = JSON.parse(raw) as Key;
    return k.client_email && k.private_key ? k : null;
  } catch {
    return null;
  }
}

export const ga4PropertyId = () => (process.env.GA4_PROPERTY_ID || "").trim().replace(/^properties\//, "");
export const ga4Configured = () => !!readKey() && /^\d+$/.test(ga4PropertyId());
/** Panelde "şu hesaba okuma izni verin" diye gösterilir (gizli değil) */
export const ga4ServiceEmail = () => readKey()?.client_email ?? null;

async function accessToken(k: Key): Promise<string> {
  if (token && token.until > Date.now() + 60_000) return token.value;
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const body = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: k.client_email,
    aud: "https://oauth2.googleapis.com/token",
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = crypto.createSign("RSA-SHA256").update(body).sign(k.private_key).toString("base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${body}.${sig}` }),
    cache: "no-store",
  });
  const j = (await r.json()) as { access_token?: string; expires_in?: number; error_description?: string };
  if (!j.access_token) throw new Error(`Google kimlik doğrulaması reddetti (${j.error_description || r.status})`);
  token = { value: j.access_token, until: Date.now() + (j.expires_in || 3600) * 1000 };
  return token.value;
}

/** runReport / runRealtimeReport; değerler sayıya çevrilmiş döner */
export async function ga4Report(body: Record<string, unknown>, kind: "runReport" | "runRealtimeReport" = "runReport"): Promise<Ga4Result<Ga4Report>> {
  const k = readKey();
  const id = ga4PropertyId();
  if (!k || !/^\d+$/.test(id)) return { ok: false, notConfigured: true, error: "GA4 okuma anahtarı ya da mülk numarası tanımlı değil." };
  const cacheKey = `${id}|${kind}|${JSON.stringify(body)}`;
  const hit = cache.get(cacheKey);
  if (hit && hit.until > Date.now()) return { ok: true, data: hit.data as Ga4Report };
  try {
    const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${id}:${kind}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${await accessToken(k)}`, "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    const j = (await r.json()) as {
      rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[];
      totals?: { metricValues?: { value: string }[] }[];
      error?: { message?: string; status?: string };
    };
    if (j.error) {
      const denied = j.error.status === "PERMISSION_DENIED";
      return { ok: false, error: denied ? "Servis hesabının bu GA4 mülkünde okuma izni yok." : `GA4: ${j.error.status || ""} ${j.error.message || ""}`.trim() };
    }
    const data: Ga4Report = {
      rows: (j.rows || []).map((row) => ({
        dims: (row.dimensionValues || []).map((d) => d.value),
        vals: (row.metricValues || []).map((m) => Number(m.value) || 0),
      })),
      totals: (j.totals?.[0]?.metricValues || []).map((m) => Number(m.value) || 0),
    };
    cache.set(cacheKey, { until: Date.now() + (kind === "runRealtimeReport" ? 30_000 : CACHE_MS), data });
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: (e as Error).message || "GA4'e ulaşılamadı." };
  }
}

export const CHANNEL_TR: Record<string, string> = {
  "Organic Search": "Organik arama",
  "Paid Search": "Ücretli arama (Google Ads)",
  "Organic Social": "Organik sosyal medya",
  "Paid Social": "Ücretli sosyal medya (Meta)",
  Direct: "Doğrudan",
  Referral: "Başka siteler",
  Email: "E-posta",
  Display: "Görüntülü reklam",
  "Cross-network": "Çapraz ağ (Performance Max)",
  "Organic Video": "Organik video",
  "Paid Video": "Ücretli video",
  "Organic Shopping": "Organik alışveriş",
  "Paid Other": "Diğer ücretli",
  "Organic Maps": "Haritalar",
  Unassigned: "Atanmamış",
  SMS: "SMS",
};

export const DEVICE_TR: Record<string, string> = { mobile: "Telefon", desktop: "Bilgisayar", tablet: "Tablet", "smart tv": "Akıllı TV" };

export const EVENT_TR: Record<string, string> = {
  generate_lead: "Form talebi",
  contact_whatsapp: "WhatsApp tıklaması",
  contact_phone: "Telefon tıklaması",
  contact_email: "E-posta tıklaması",
  brochure_download: "Broşür indirme",
  price_request_click: "Fiyat isteme",
  tour_start: "Sanal tur",
  floorplan_view: "Kat planı",
  view_item: "Proje görüntüleme",
};

/** Dönem → GA4 tarih aralığı ve zaman serisi boyutu */
export function ga4Range(period: "30g" | "90g" | "12a" | "tumu") {
  if (period === "30g") return { dateRanges: [{ startDate: "29daysAgo", endDate: "today" }], timeDim: "date" as const };
  if (period === "90g") return { dateRanges: [{ startDate: "89daysAgo", endDate: "today" }], timeDim: "date" as const };
  if (period === "12a") return { dateRanges: [{ startDate: "364daysAgo", endDate: "today" }], timeDim: "yearMonth" as const };
  return { dateRanges: [{ startDate: "2024-01-01", endDate: "today" }], timeDim: "yearMonth" as const };
}

/** GA4 "20261125" / "202611" → panel kova anahtarı "2026-11-25" / "2026-11" */
export function ga4TimeKey(v: string) {
  if (/^\d{8}$/.test(v)) return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
  if (/^\d{6}$/.test(v)) return `${v.slice(0, 4)}-${v.slice(4, 6)}`;
  return v;
}
