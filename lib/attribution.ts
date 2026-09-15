// lib/attribution.ts
// UTM ve tıklama kimliklerini (gclid, fbclid…) okur. İzin varsa ilk/son temas çerezlerine yazar,
// izin yoksa yalnızca bu sayfa oturumunun belleğinde tutar. Kişisel veri saklanmaz.
// "use client" yok: sanitize/kaynak yardımcıları API ve admin tarafında da kullanılır.

import { getCookie, readConsent, setCookie } from "./analytics";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export type Touch = {
  [K in AttributionKey]?: string;
} & {
  landing?: string;
  referrer?: string;
  ts: number;
};

export type Attribution = { first: Touch | null; last: Touch | null; current: Touch | null };

export const FIRST_TOUCH_COOKIE = "dnd_ft";
export const LAST_TOUCH_COOKIE = "dnd_lt";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 gün
const MAX_LEN = 200;

/* ---------------- Temizleme (istemci + sunucu) ---------------- */

function cleanValue(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim().slice(0, MAX_LEN);
  // E-posta benzeri değerler kişisel veri olabilir → alınmaz
  if (!s || s.includes("@")) return undefined;
  return s;
}

export function sanitizeTouch(input: unknown): Touch | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const src = input as Record<string, unknown>;
  const out: Touch = { ts: 0 };
  let has = false;
  for (const k of ATTRIBUTION_KEYS) {
    const v = cleanValue(src[k]);
    if (v) {
      out[k] = v;
      has = true;
    }
  }
  const landing = cleanValue(src.landing);
  if (landing && landing.startsWith("/")) {
    out.landing = landing;
    has = true;
  }
  const referrer = cleanValue(src.referrer);
  if (referrer && /^https?:\/\/[^/\s]+$/i.test(referrer)) {
    out.referrer = referrer;
    has = true;
  }
  const ts = Number(src.ts);
  out.ts = Number.isFinite(ts) && ts > 0 ? Math.floor(ts) : 0;
  return has ? out : null;
}

export function sanitizeAttribution(input: unknown): Attribution | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const src = input as Record<string, unknown>;
  const a: Attribution = {
    first: sanitizeTouch(src.first),
    last: sanitizeTouch(src.last),
    current: sanitizeTouch(src.current),
  };
  return a.first || a.last || a.current ? a : null;
}

/** Admin ve DB için kısa kaynak etiketi: "facebook / paid_social", kampanya adı */
export function sourceFromAttribution(a: Attribution | null): { source: string | null; campaign: string | null } {
  if (!a) return { source: null, campaign: null };
  const clickTouch = [a.current, a.last].find((t) => t && (t.utm_source || t.gclid || t.gbraid || t.wbraid || t.fbclid));
  const t = clickTouch ?? a.first;
  if (!t) return { source: null, campaign: null };

  let source: string;
  if (t.utm_source) source = [t.utm_source, t.utm_medium].filter(Boolean).join(" / ");
  else if (t.gclid || t.gbraid || t.wbraid) source = "google / cpc";
  else if (t.fbclid) source = "facebook / fbclid";
  else if (t.referrer) source = `${t.referrer.replace(/^https?:\/\//i, "")} / referral`;
  else source = "(direct) / (none)";

  return { source: source.slice(0, MAX_LEN), campaign: t.utm_campaign ?? null };
}

/* ---------------- Tarayıcı tarafı ---------------- */

const mem: {
  first: Touch | null;
  last: Touch | null;
  current: Touch | null;
  capturedHref: string;
  lastWrittenTs: number;
} = { first: null, last: null, current: null, capturedHref: "", lastWrittenTs: 0 };

function externalReferrer() {
  try {
    if (!document.referrer) return undefined;
    const u = new URL(document.referrer);
    return u.origin !== location.origin ? u.origin : undefined;
  } catch {
    return undefined;
  }
}

function readParams(search: string) {
  const sp = new URLSearchParams(search);
  const out: { [K in AttributionKey]?: string } = {};
  let has = false;
  for (const k of ATTRIBUTION_KEYS) {
    const v = cleanValue(sp.get(k));
    if (v) {
      out[k] = v;
      has = true;
    }
  }
  return has ? out : null;
}

function readTouchCookie(name: string) {
  const raw = getCookie(name);
  if (!raw) return null;
  try {
    return sanitizeTouch(JSON.parse(raw));
  } catch {
    return null;
  }
}

function storageAllowed() {
  const c = readConsent();
  return !!c && (c.analytics || c.ads);
}

/** İzin varsa bellekteki temasları çerezlere yazar (izin sonradan verildiğinde de çağrılır) */
export function persistAttribution() {
  if (typeof window === "undefined" || !storageAllowed()) return;
  if (mem.first && !getCookie(FIRST_TOUCH_COOKIE)) {
    setCookie(FIRST_TOUCH_COOKIE, JSON.stringify(mem.first), MAX_AGE);
  }
  if (mem.last && mem.last.ts !== mem.lastWrittenTs) {
    setCookie(LAST_TOUCH_COOKIE, JSON.stringify(mem.last), MAX_AGE);
    mem.lastWrittenTs = mem.last.ts;
  }
}

/** Her gezinmede çağrılır; aynı URL ikinci kez işlenmez */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const href = location.href;
  if (mem.capturedHref === href) return;
  mem.capturedHref = href;

  const params = readParams(location.search);
  const base = { landing: location.pathname.slice(0, MAX_LEN), referrer: externalReferrer(), ts: Date.now() };
  const touch: Touch | null = params ? { ...params, ...base } : null;

  mem.current = touch;
  // Sayfa oturumunun ilk sayfası; parametresiz de olsa ilk temas adayıdır
  if (!mem.first) mem.first = touch ?? base;
  if (touch) mem.last = touch;

  persistAttribution();
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return { first: null, last: null, current: null };
  captureAttribution();
  const allowed = storageAllowed();
  return {
    first: (allowed ? readTouchCookie(FIRST_TOUCH_COOKIE) : null) ?? mem.first,
    last: mem.last ?? (allowed ? readTouchCookie(LAST_TOUCH_COOKIE) : null),
    current: mem.current,
  };
}

/** WhatsApp mesajı için kısa referans: yalnızca utm_source ve utm_campaign → " (Ref: facebook-lagoonverde_tr)" */
export function attributionRef(): string {
  if (typeof window === "undefined") return "";
  const a = getAttribution();
  const t = [a.current, a.last].find((x) => x && (x.utm_source || x.utm_campaign));
  if (!t) return "";
  const clean = (s?: string) => (s || "").replace(/[^\w.-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60);
  const ref = [clean(t.utm_source), clean(t.utm_campaign)].filter(Boolean).join("-");
  return ref ? ` (Ref: ${ref})` : "";
}
