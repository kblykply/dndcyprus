// lib/admin-session.ts
// İmzalı yönetici oturumu. Hem middleware (edge) hem Node route'larında çalışır (Web Crypto).
// Eskiden çerezin yalnızca varlığına bakılıyordu; herkes "admin_session=1" yazıp
// /admin/leads sayfasındaki müşteri bilgilerini görebiliyordu.

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8; // 8 saat

function sessionSecret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit) return explicit;
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  // Şifre değişince eski oturumlar da geçersiz olur.
  if (user && pass) return `dnd-admin:${user}:${pass}`;
  return null;
}

async function hmacHex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Uzunluğa göre erken çıkmayan karşılaştırma */
export function safeEqual(a: string, b: string) {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/**
 * Panel rolleri (27.11.2026): "admin" her şeyi görür; "satis" (ör. mesajlara cevap veren Talha) yalnız satış sayfalarını
 * (Bugün, Genel Bakış, Satış Talepleri, Reklam Raporu) görür ve talep durumunu/notunu kendi adıyla değiştirir.
 */
export type PanelRole = "admin" | "satis";
export type AdminSession = { user: string; name: string; role: PanelRole };

const b64 = (s: string) => btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64 = (s: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0)));

/**
 * Oturum çerezi. Ortamdaki yönetici (ADMIN_USER) eski biçimi kullanır: "<bitiş>.<imza>". Panel kullanıcısı:
 * "<bitiş>.<kullanıcı b64>.<ad b64>.<rol>.<imza>" — rol imzanın içinde, değiştirilemez.
 */
export async function createAdminSession(who?: AdminSession): Promise<string | null> {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  if (!who) {
    const sig = await hmacHex(secret, `admin:${expires}`);
    return `${expires}.${sig}`;
  }
  const u = b64(who.user);
  const n = b64(who.name || who.user);
  const sig = await hmacHex(secret, `admin:${expires}:${u}:${n}:${who.role}`);
  return `${expires}.${u}.${n}.${who.role}.${sig}`;
}

export async function readAdminSession(value: string | undefined | null): Promise<AdminSession | null> {
  if (!value) return null;
  const secret = sessionSecret();
  if (!secret) return null;
  const old = /^([1-9]\d*)\.([a-f0-9]{64})$/.exec(value);
  if (old && old[0] === value) {
    const expires = Number(old[1]);
    if (!Number.isSafeInteger(expires) || expires <= Date.now()) return null;
    if (!safeEqual(old[2], await hmacHex(secret, `admin:${expires}`))) return null;
    const user = (process.env.ADMIN_USER || "Yönetici").slice(0, 60);
    return { user, name: user, role: "admin" };
  }
  const m = /^([1-9]\d*)\.([A-Za-z0-9_-]{1,120})\.([A-Za-z0-9_-]{1,240})\.(admin|satis)\.([a-f0-9]{64})$/.exec(value);
  if (!m || m[0] !== value) return null;
  const expires = Number(m[1]);
  if (!Number.isSafeInteger(expires) || expires <= Date.now()) return null;
  if (!safeEqual(m[5], await hmacHex(secret, `admin:${expires}:${m[2]}:${m[3]}:${m[4]}`))) return null;
  try {
    return { user: unb64(m[2]).slice(0, 60), name: unb64(m[3]).slice(0, 60), role: m[4] as PanelRole };
  } catch {
    return null;
  }
}

export async function verifyAdminSession(value: string | undefined | null): Promise<boolean> {
  return !!(await readAdminSession(value));
}

/** Satış rolünün açabildiği panel yolları; diğerleri (İçerik, Trafik, Kullanıcılar, Performans…) yalnız yönetici */
const SALES_PATHS = ["/admin/bugun", "/admin/genel", "/admin/leads", "/admin/reklam", "/admin/logout"];
export function roleAllows(role: PanelRole, pathname: string) {
  if (role === "admin") return true;
  return pathname === "/admin" || pathname === "/admin/" || SALES_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

/** Girişten sonra yalnız /admin altındaki yollara dönülebilir (açık yönlendirme engeli) */
export function safeAdminNext(next: string | null | undefined) {
  const fallback = "/admin/bugun";
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  // Tarayıcının yol olarak yeniden yorumlayabileceği karakterleri reddet.
  if (/[\\\u0000-\u001f\u007f]/.test(next)) return fallback;
  try {
    const base = "https://admin.invalid";
    const url = new URL(next, base);
    const path = url.pathname; // URL, ../ ve %2e%2e gibi yolları normalize eder.
    if (url.origin !== base || /%(?:2f|5c)/i.test(path)) return fallback;
    if (path !== "/admin" && !path.startsWith("/admin/")) return fallback;
    if (path === "/admin/login" || path.startsWith("/admin/login/")) return fallback;
    return `${path}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
