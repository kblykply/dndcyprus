// lib/analytics.ts
// İstemci olay API'si: dataLayer + GA4 + Google Ads + Meta Pixel ve çerez izni.
// Script yoksa ya da ID tanımlı değilse her çağrı sessizce hiçbir şey yapmaz.
// "use client" yok: saf yardımcılar (normalizePhoneE164, projectFromPath) sunucuda da kullanılır.

/* ---------------- Ortam değişkenleri ---------------- */

// NEXT_PUBLIC_* değerleri derlemede gömülür; biçim hatalıysa entegrasyon kapalı sayılır.
function envId(value: string | undefined, pattern: RegExp) {
  const v = (value || "").trim();
  return pattern.test(v) ? v : "";
}

export const ANALYTICS_ENV = {
  ga4Id: envId(process.env.NEXT_PUBLIC_GA4_ID, /^G-[A-Z0-9]+$/i),
  adsId: envId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, /^AW-\d+$/i),
  adsLeadLabel: envId(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL, /^[\w-]+$/),
  adsWhatsappLabel: envId(process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL, /^[\w-]+$/),
  adsPhoneLabel: envId(process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL, /^[\w-]+$/),
  metaPixelId: envId(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d+$/),
  gtmId: envId(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]+$/i),
  clarityId: envId(process.env.NEXT_PUBLIC_CLARITY_ID, /^[a-z0-9]{6,20}$/i),
};

/* ---------------- Tipler ---------------- */

type Gtag = (...args: unknown[]) => void;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
  allowDuplicatePageViews?: boolean;
};

export type ConsentState = { v: 1; analytics: boolean; ads: boolean; ts: number };
export type ConsentChoice = { analytics: boolean; ads: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    dndConsent?: { open: () => void; get: () => ConsentState | null };
  }
}

const isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";

/* ---------------- Yol yardımcıları ---------------- */

export function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function localeFromPath(pathname: string): "tr" | "en" {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

export const PROJECTS = {
  "lagoon-verde": "Lagoon Verde",
  perla: "La Joya Perla",
  "perla-ii": "La Joya Perla II",
  "la-joya": "La Joya",
  gecitkale: "Geçitkale",
} as const;

export type ProjectSlug = keyof typeof PROJECTS;

/** /tr/lagoon-verde → { slug, name, locale }; proje sayfası değilse null */
export function projectFromPath(pathname: string) {
  const m = pathname.match(/^\/(tr|en)\/(lagoon-verde|perla|perla-ii|la-joya|gecitkale)\/?$/);
  if (!m) return null;
  const slug = m[2] as ProjectSlug;
  return { slug, name: PROJECTS[slug], locale: m[1] as "tr" | "en" };
}

/* ---------------- Telefon normalizasyonu ---------------- */

/**
 * Ülke kodlu E.164 (+905488880363). Ülke kodu çıkarılamazsa null.
 * TR sayfasında 0 ile başlayan 11 haneli numara +90 kabul edilir (KKTC/TR mobil).
 */
export function normalizePhoneE164(raw: string | undefined | null, locale?: "tr" | "en") {
  const s = (raw || "").trim();
  if (!s) return null;
  let digits = s.replace(/\D/g, "");
  if (s.startsWith("+")) {
    // ülke kodu var
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (locale === "tr" && /^0\d{10}$/.test(digits)) {
    digits = "90" + digits.slice(1);
  } else if (!/^90\d{10}$/.test(digits)) {
    return null;
  }
  // "+90 0548…" gibi yazımlarda fazladan 0
  if (/^900\d{10}$/.test(digits)) digits = "90" + digits.slice(3);
  if (digits.length < 8 || digits.length > 15) return null;
  return "+" + digits;
}

/* ---------------- Çerez yardımcıları ---------------- */

export function getCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return null;
  }
}

export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (!isBrowser()) return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
}

/** Çerezi hem host'ta hem üst alan adında siler (_ga gibi .dndcyprus.com'a yazılanlar için) */
export function deleteCookies(match: (name: string) => boolean) {
  if (!isBrowser()) return;
  const host = location.hostname;
  const parts = host.split(".");
  const domains: (string | null)[] = [null, host, "." + host];
  if (parts.length > 2) domains.push("." + parts.slice(-2).join("."));
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n && match(n));
  for (const n of names) {
    for (const d of domains) {
      document.cookie = `${n}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ""}`;
    }
  }
}

/* ---------------- Çerez izni (dnd_consent) ---------------- */

export const CONSENT_COOKIE = "dnd_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180; // 180 gün
export const CONSENT_EVENT = "dnd:consent";

export function readConsent(): ConsentState | null {
  const raw = getCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Partial<ConsentState>;
    if (c && c.v === 1 && typeof c.analytics === "boolean" && typeof c.ads === "boolean") {
      return { v: 1, analytics: c.analytics, ads: c.ads, ts: Number(c.ts) || 0 };
    }
  } catch {
    // bozuk çerez → seçim yok sayılır
  }
  return null;
}

export function hasConsent(kind: "analytics" | "ads") {
  const c = readConsent();
  return !!c && c[kind];
}

function consentModeFields(c: ConsentChoice) {
  const ads = c.ads ? "granted" : "denied";
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: c.analytics ? "granted" : "denied",
  };
}

/** Seçimi kaydeder, Consent Mode'u günceller, geri çekilen izinlerin çerezlerini siler */
export function saveConsent(choice: ConsentChoice): ConsentState {
  const prev = readConsent();
  const next: ConsentState = { v: 1, analytics: !!choice.analytics, ads: !!choice.ads, ts: Date.now() };
  setCookie(CONSENT_COOKIE, JSON.stringify(next), CONSENT_MAX_AGE);

  gtag("consent", "update", consentModeFields(next));

  if (!next.ads) {
    if (window.fbq) window.fbq("consent", "revoke");
    if (prev?.ads) deleteCookies((n) => n === "_fbp" || n === "_fbc" || n.startsWith("_gcl_"));
  } else if (window.fbq) {
    window.fbq("consent", "grant");
  }
  if (!next.analytics && prev?.analytics) {
    deleteCookies((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gid");
  }
  // Microsoft Clarity yalnız analitik izniyle çalışır; geri çekilirse çerezlerini siler
  if (window.clarity) {
    if (next.analytics) {
      window.clarity("consentv2", { ad_Storage: next.ads ? "granted" : "denied", analytics_Storage: "granted" });
    } else {
      window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      window.clarity("consent", false);
      deleteCookies((n) => n === "_clck" || n === "_clsk");
    }
  }
  if (!next.analytics && !next.ads) {
    deleteCookies((n) => n === "dnd_ft" || n === "dnd_lt");
  }

  window.dispatchEvent(new CustomEvent<{ prev: ConsentState | null; next: ConsentState }>(CONSENT_EVENT, { detail: { prev, next } }));
  return next;
}

export function onConsentChange(cb: (next: ConsentState, prev: ConsentState | null) => void) {
  if (!isBrowser()) return () => {};
  const handler = (e: Event) => {
    const d = (e as CustomEvent<{ prev: ConsentState | null; next: ConsentState }>).detail;
    if (d) cb(d.next, d.prev);
  };
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

/** Kök layout <head> içindeki Consent Mode v2 varsayılanı (beforeInteractive) */
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){dataLayer.push(arguments);};
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
try{var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);if(m){var c=JSON.parse(decodeURIComponent(m[1]));if(c&&c.v===1){var a=c.ads?'granted':'denied';gtag('consent','update',{ad_storage:a,ad_user_data:a,ad_personalization:a,analytics_storage:c.analytics?'granted':'denied'});}}}catch(e){}`;

/* ---------------- Script yükleme ---------------- */

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function gtag(...args: unknown[]) {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // Head script çalışmadıysa yedek tanım (gtag.js Arguments nesnesi bekler)
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag(...args);
}

let googleConfigured = false;

/** gtag.js (GA4 ve/veya Ads). Çerezleri Consent Mode yönetir. */
export function loadGoogleTags() {
  if (!isBrowser()) return false;
  const { ga4Id, adsId } = ANALYTICS_ENV;
  if (!ga4Id && !adsId) return false;
  if (!googleConfigured) {
    googleConfigured = true;
    gtag("js", new Date());
    // Sayfa görüntülemeleri App Router gezinmesinde elle gönderilir
    if (ga4Id) gtag("config", ga4Id, { send_page_view: false });
    if (adsId) gtag("config", adsId, { send_page_view: false, allow_enhanced_conversions: true });
    injectScript("dnd-gtag", `https://www.googletagmanager.com/gtag/js?id=${ga4Id || adsId}`);
  }
  return true;
}

/** İsteğe bağlı GTM (GA4/Ads/Pixel GTM içinde tekrar kurulmamalı) */
export function loadGtm() {
  if (!isBrowser() || !ANALYTICS_ENV.gtmId) return;
  if (document.getElementById("dnd-gtm")) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  injectScript("dnd-gtm", `https://www.googletagmanager.com/gtm.js?id=${ANALYTICS_ENV.gtmId}`);
}

/** Meta Pixel yalnızca reklam izni verildiyse yüklenir. true → bu çağrıda ilk kez yüklendi. */
export function loadMetaPixel() {
  if (!isBrowser() || !ANALYTICS_ENV.metaPixelId || !hasConsent("ads")) return false;
  if (window.fbq) return false;

  const n = function (...args: unknown[]) {
    // fbevents.js callMethod'u fbq bağlamında (this) çağırır
    // eslint-disable-next-line prefer-spread
    if (n.callMethod) n.callMethod.apply(n, args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  // SPA: PageView'i biz gönderiyoruz, Pixel'in history dinleyicisi çift saymasın
  n.disablePushState = true;
  n.allowDuplicatePageViews = true;
  window.fbq = n;
  if (!window._fbq) window._fbq = n;

  n("consent", "grant");
  n("init", ANALYTICS_ENV.metaPixelId);
  injectScript("dnd-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  return true;
}

/** Microsoft Clarity (ısı haritası, oturum kaydı) yalnızca analitik izni verildiyse yüklenir. */
export function loadClarity() {
  const id = ANALYTICS_ENV.clarityId;
  if (!isBrowser() || !id || !hasConsent("analytics")) return false;
  if (window.clarity) return false;
  const c = function (...args: unknown[]) {
    (c.q = c.q || []).push(args);
  } as ((...args: unknown[]) => void) & { q?: unknown[] };
  window.clarity = c;
  injectScript("dnd-clarity", `https://www.clarity.ms/tag/${id}`);
  // Consent API v2: izin durumunu ilk çağrıda bildir (AB/UK için zorunlu)
  c("consentv2", { ad_Storage: hasConsent("ads") ? "granted" : "denied", analytics_Storage: "granted" });
  return true;
}

function metaReady() {
  return isBrowser() && !!window.fbq && !!ANALYTICS_ENV.metaPixelId && hasConsent("ads");
}

/* ---------------- Olaylar ---------------- */

// Tek yerde tanımlı olay adları ve platform eşlemeleri
const EVENTS = {
  generate_lead: { meta: "Lead", ads: "lead" },
  contact_whatsapp: { meta: "Contact", ads: "whatsapp" },
  contact_phone: { meta: "Contact", ads: "phone" },
  contact_email: { meta: "Contact" },
  brochure_download: { meta: "BrochureDownload", custom: true },
  price_request_click: { meta: "PriceRequest", custom: true },
  tour_start: { meta: "VirtualTour", custom: true },
  floorplan_view: { meta: "FloorPlanView", custom: true },
  view_item: { meta: "ViewContent" },
} as const satisfies Record<string, { meta?: string; custom?: boolean; ads?: "lead" | "whatsapp" | "phone" }>;

export type TrackEventName = keyof typeof EVENTS;
export type TrackParams = Record<string, unknown>;

export function isTrackEventName(name: string): name is TrackEventName {
  return Object.prototype.hasOwnProperty.call(EVENTS, name);
}

function adsLabel(kind: "lead" | "whatsapp" | "phone") {
  if (kind === "lead") return ANALYTICS_ENV.adsLeadLabel;
  if (kind === "whatsapp") return ANALYTICS_ENV.adsWhatsappLabel;
  return ANALYTICS_ENV.adsPhoneLabel;
}

function cleanParams(params: TrackParams) {
  const out: TrackParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  }
  return out;
}

function metaParams(name: TrackEventName, p: TrackParams) {
  if (name === "view_item") {
    return cleanParams({ content_ids: p.item_id ? [p.item_id] : undefined, content_name: p.item_name, content_type: "product" });
  }
  const out: TrackParams = {};
  for (const [k, v] of Object.entries(p)) {
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") out[k] = v;
  }
  const contentName = p.project ?? p.label ?? p.file_name;
  if (contentName) out.content_name = contentName;
  return cleanParams(out);
}

export function track(name: TrackEventName, params: TrackParams = {}, opts: { eventId?: string } = {}) {
  if (!isBrowser() || isAdminPath(location.pathname)) return;
  const def = EVENTS[name] as { meta?: string; custom?: boolean; ads?: "lead" | "whatsapp" | "phone" };
  const p = cleanParams(params);

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...p, ...(opts.eventId ? { event_id: opts.eventId } : {}) });

    if (loadGoogleTags()) {
      const { ga4Id, adsId } = ANALYTICS_ENV;
      if (ga4Id) gtag("event", name, { ...p, send_to: ga4Id });
      const label = def.ads ? adsLabel(def.ads) : "";
      if (adsId && label) {
        gtag("event", "conversion", {
          send_to: `${adsId}/${label}`,
          ...(opts.eventId ? { transaction_id: opts.eventId } : {}),
        });
      }
    }

    if (def.meta && metaReady()) {
      const method = def.custom ? "trackCustom" : "track";
      if (opts.eventId) window.fbq!(method, def.meta, metaParams(name, p), { eventID: opts.eventId });
      else window.fbq!(method, def.meta, metaParams(name, p));
    }
  } catch {
    // ölçüm hatası sayfayı asla bozmamalı
  }
}

let lastPageUrl = "";

/** GA4 + Ads yeniden pazarlama page_view ve Meta PageView */
export function pageView() {
  if (!isBrowser() || isAdminPath(location.pathname)) return;
  const url = location.href;
  try {
    if (loadGoogleTags()) {
      gtag("event", "page_view", cleanParams({
        page_location: url,
        page_title: document.title,
        page_referrer: lastPageUrl || document.referrer || undefined,
      }));
    }
    loadMetaPixel();
    if (metaReady()) window.fbq!("track", "PageView");
  } catch {
    // yok say
  }
  lastPageUrl = url;
}

/** İzin sayfa ortasında verildiyse o sayfanın Meta PageView/ViewContent'i */
export function metaPageViewOnly() {
  if (!metaReady()) return;
  try {
    window.fbq!("track", "PageView");
    const project = projectFromPath(location.pathname);
    if (project) {
      window.fbq!("track", "ViewContent", { content_ids: [project.slug], content_name: project.name, content_type: "product" });
    }
  } catch {
    // yok say
  }
}

/** Google gelişmiş dönüşümler: yalnızca reklam izni (ad_user_data) varsa */
export function setEnhancedConversionData(input: { email?: string; phone?: string; locale?: "tr" | "en" }) {
  if (!isBrowser() || !ANALYTICS_ENV.adsId || !hasConsent("ads")) return;
  const email = (input.email || "").trim().toLowerCase();
  const phone = normalizePhoneE164(input.phone, input.locale);
  if (!email && !phone) return;
  if (!loadGoogleTags()) return;
  gtag("set", "user_data", cleanParams({ email, phone_number: phone || undefined }));
}
