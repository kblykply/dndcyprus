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
  const [expiresRaw, sig] = value.split(".");
  const expires = Number(expiresRaw);
  if (!sig || !Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = await hmacHex(secret, `admin:${expires}`);
  return safeEqual(sig, expected);
}

/** Girişten sonra yalnız /admin altındaki yollara dönülebilir (açık yönlendirme engeli) */
export function safeAdminNext(next: string | null | undefined) {
  if (!next || !next.startsWith("/admin") || next.startsWith("//")) return "/admin/leads";
  if (next.startsWith("/admin/login")) return "/admin/leads";
  return next;
}
