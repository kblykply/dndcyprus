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

export async function createAdminSession(): Promise<string | null> {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const sig = await hmacHex(secret, `admin:${expires}`);
  return `${expires}.${sig}`;
}

export async function verifyAdminSession(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const secret = sessionSecret();
  if (!secret) return false;
  const parts = /^([1-9]\d*)\.([a-f0-9]{64})$/.exec(value);
  if (!parts || parts[0] !== value) return false;
  const expires = Number(parts[1]);
  const sig = parts[2];
  if (!Number.isSafeInteger(expires) || expires <= Date.now()) return false;
  const expected = await hmacHex(secret, `admin:${expires}`);
  return safeEqual(sig, expected);
}

/** Girişten sonra yalnız /admin altındaki yollara dönülebilir (açık yönlendirme engeli) */
export function safeAdminNext(next: string | null | undefined) {
  const fallback = "/admin/leads";
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
