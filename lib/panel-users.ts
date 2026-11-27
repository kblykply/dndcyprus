// lib/panel-users.ts
// Panel kullanıcıları (27.11.2026): ortamdaki yöneticinin (ADMIN_USER) dışında, yöneticinin panelden açtığı kişiler
// (ör. mesajlara cevap veren Talha). Ayrı tablo gerekmesin diye SyncState "panel-users" satırında durur; şifre scrypt ile
// tuzlanmış özet olarak saklanır, hiçbir yerde düz yazılmaz. Yalnız sunucu (Node).
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { prisma } from "@/lib/prisma";
import type { PanelRole } from "@/lib/admin-session";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;
export const PANEL_USERS_KEY = "panel-users";

export type PanelUser = {
  user: string;
  name: string;
  role: PanelRole;
  /** sabah özeti ve cevap bekleyen mesaj e-postaları buraya da gider (boşsa gitmez) */
  email?: string;
  active: boolean;
  hash: string;
  createdAt: string;
  lastLoginAt?: string;
};

export const ROLE_LABEL: Record<PanelRole, string> = { admin: "Yönetici", satis: "Satış (mesaj / arama)" };

/** Kullanıcı adı: küçük harf, rakam, nokta, tire, alt çizgi; 3–30 karakter */
export function cleanUsername(v: unknown) {
  const u = String(v ?? "").trim().toLocaleLowerCase("tr-TR").replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c");
  return /^[a-z0-9._-]{3,30}$/.test(u) ? u : null;
}

export function passwordProblem(pw: string) {
  if (pw.length < 8) return "Şifre en az 8 karakter olmalı.";
  if (pw.length > 128) return "Şifre en çok 128 karakter olabilir.";
  if (!/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(pw) || !/\d/.test(pw)) return "Şifrede en az bir harf ve bir rakam olmalı.";
  return null;
}

export async function hashPassword(pw: string) {
  const salt = randomBytes(16);
  const key = await scrypt(pw, salt, 64);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function checkPassword(pw: string, stored: string) {
  const [kind, saltB64, keyB64] = stored.split("$");
  if (kind !== "scrypt" || !saltB64 || !keyB64) return false;
  const want = Buffer.from(keyB64, "base64");
  const got = await scrypt(pw, Buffer.from(saltB64, "base64"), want.length);
  return got.length === want.length && timingSafeEqual(got, want);
}

export async function loadPanelUsers(): Promise<PanelUser[]> {
  try {
    const row = await prisma.syncState.findUnique({ where: { key: PANEL_USERS_KEY } });
    const list = (row?.data as { users?: PanelUser[] } | null)?.users;
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function savePanelUsers(users: PanelUser[]) {
  await prisma.syncState.upsert({
    where: { key: PANEL_USERS_KEY },
    create: { key: PANEL_USERS_KEY, data: { users } as object },
    update: { data: { users } as object },
  });
}

/** Giriş: etkin kullanıcı ve doğru şifre → oturum bilgisi (son giriş zamanı yazılır) */
export async function authenticatePanelUser(username: string, password: string) {
  const u = cleanUsername(username);
  if (!u || !password) return null;
  const users = await loadPanelUsers();
  const found = users.find((x) => x.user === u && x.active);
  if (!found || !(await checkPassword(password, found.hash))) return null;
  found.lastLoginAt = new Date().toISOString();
  await savePanelUsers(users).catch(() => null);
  return { user: found.user, name: found.name || found.user, role: found.role };
}

/** Sabah özeti alacak panel kullanıcılarının e-postaları */
export async function panelUserEmails() {
  return (await loadPanelUsers()).filter((u) => u.active && u.email).map((u) => u.email!) as string[];
}
