"use server";
// app/(default)/admin/icerik/actions.ts
// İçerik yönetimi eylemleri: sayfa metni kaydet / orijinale dön, liste kaydı ekle-düzenle-sil-yayınla-sırala, görsel yükle.
// Her eylem oturumu doğrular; değişiklik sonrası ilgili sayfalar yeniden üretilir (revalidatePath) ve işlem geçmişine yazılır.
import { blobUploadConfigured } from "@/lib/content/blob";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authorFromCookies, requireAdmin } from "@/lib/admin-auth";
import { CONTENT_LOCALES, type ContentLocale } from "@/lib/content/core";
import { SCOPES, isScopeKey } from "@/lib/content/scopes";
import { COLLECTIONS, allRoutes, ensureSeeded, isCollectionKey, sectionFields, slugify } from "@/lib/content/admin";

const isLocale = (v: unknown): v is ContentLocale => typeof v === "string" && (CONTENT_LOCALES as readonly string[]).includes(v);
const str = (fd: FormData, k: string, max = 5000) => String(fd.get(k) ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);

function refresh(routes: string[]) {
  for (const r of new Set(routes)) revalidatePath(r);
}

/* ---------------- Sayfa metinleri ---------------- */

export async function saveSection(formData: FormData) {
  const store = await requireAdmin("/admin/icerik");
  const scope = String(formData.get("scope"));
  const locale = formData.get("locale");
  const section = String(formData.get("section"));
  if (!isScopeKey(scope) || !isLocale(locale) || !SCOPES[scope].sections.some(([k]) => k === section)) redirect("/admin/icerik");
  const author = authorFromCookies(store);
  const fields = await sectionFields(scope, locale, section);
  let changed = 0;
  for (const f of fields) {
    if (!formData.has(`f:${f.path}`)) continue;
    let v = str(formData, `f:${f.path}`, 5000);
    if (f.kind === "number" && !Number.isFinite(Number(v.replace(",", ".")))) continue;
    if (f.kind !== "long" && f.kind !== "rich") v = v.replace(/\n+/g, " ");
    const same = v === f.original;
    if (same && f.overridden) {
      await prisma.contentOverride.deleteMany({ where: { scope, locale, path: f.path } });
      changed++;
    } else if (!same && v !== f.value) {
      await prisma.contentOverride.upsert({
        where: { scope_locale_path: { scope, locale, path: f.path } },
        create: { scope, locale, path: f.path, value: v, updatedBy: author },
        update: { value: v, updatedBy: author },
      });
      changed++;
    }
  }
  if (changed) {
    const label = SCOPES[scope].sections.find(([k]) => k === section)?.[1] ?? section;
    await prisma.contentLog.create({ data: { area: SCOPES[scope].label, action: "düzenleme", detail: `${label} (${locale.toUpperCase()}): ${changed} alan`, author } });
    refresh(SCOPES[scope].routes(locale));
  }
  redirect(`/admin/icerik/sayfa/${scope}?dil=${locale}&bolum=${section}&kaydedildi=${changed}`);
}

/** Düğmeye bağlanır: resetField.bind(null, alanYolu) (React, formAction düğmesinin name/value'sunu forma eklemiyor) */
export async function resetField(path: string, formData: FormData) {
  const store = await requireAdmin("/admin/icerik");
  const scope = String(formData.get("scope"));
  const locale = formData.get("locale");
  const section = String(formData.get("section"));
  if (!isScopeKey(scope) || !isLocale(locale) || !path.startsWith(`${section}.`)) redirect("/admin/icerik");
  const n = await prisma.contentOverride.deleteMany({ where: { scope, locale, path } });
  if (n.count) {
    await prisma.contentLog.create({ data: { area: SCOPES[scope].label, action: "orijinale dönüş", detail: `${path} (${locale.toUpperCase()})`, author: authorFromCookies(store) } });
    refresh(SCOPES[scope].routes(locale));
  }
  redirect(`/admin/icerik/sayfa/${scope}?dil=${locale}&bolum=${section}&geri=1`);
}

/* ---------------- Listeler (Basında DND, Ekip) ---------------- */

export type ItemFormState = { error?: string; values?: Record<string, string>; at?: number } | undefined;

function itemFromForm(collection: "basin" | "ekip", fd: FormData): { data: Record<string, unknown>; error?: string } {
  const def = COLLECTIONS[collection];
  const data: Record<string, unknown> = {};
  for (const f of def.shared) {
    const v = str(fd, f.key, f.kind === "long" ? 5000 : 600);
    if (f.required && !v) return { data, error: `${f.label} gerekli.` };
    if (f.kind === "url" && v && !/^https?:\/\/\S+$/i.test(v)) return { data, error: `${f.label} geçerli bir bağlantı olmalı (https://…).` };
    if (f.kind === "date" && v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return { data, error: `${f.label} geçersiz.` };
    if (f.kind === "image" && v && !/^(\/|https:\/\/)\S+$/i.test(v)) return { data, error: `${f.label} için site içi yol (/…) ya da https bağlantısı girin.` };
    if (f.kind === "select" && v && f.options && !f.options.includes(v)) return { data, error: `${f.label} geçersiz.` };
    if (v) data[f.key] = v;
  }
  for (const f of def.perLocale) {
    const per: Record<string, unknown> = {};
    for (const l of CONTENT_LOCALES) {
      const v = str(fd, `${l}.${f.key}`, f.kind === "long" ? 5000 : 600);
      per[l] = f.kind === "tags" ? v.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12) : v;
    }
    if (f.required && !per.tr) return { data, error: `${f.label} (Türkçe) gerekli.` };
    data[f.key] = per;
  }
  return { data };
}

function failed(error: string, fd: FormData): ItemFormState {
  const values: Record<string, string> = {};
  for (const [k, v] of fd.entries()) if (typeof v === "string" && !k.startsWith("$")) values[k] = v;
  return { error, values, at: Date.now() };
}

export async function saveItem(_prev: ItemFormState, formData: FormData): Promise<ItemFormState> {
  const store = await requireAdmin("/admin/icerik");
  const collection = String(formData.get("collection"));
  if (!isCollectionKey(collection)) return failed("Liste bulunamadı.", formData);
  const author = authorFromCookies(store);
  const { data, error } = itemFromForm(collection, formData);
  if (error) return failed(error, formData);
  await ensureSeeded(collection, author);
  const existing = String(formData.get("key") || "");
  const published = formData.get("published") === "on";
  let key = existing;
  if (existing) {
    const row = await prisma.contentItem.findUnique({ where: { collection_key: { collection, key: existing } } });
    if (!row) return failed("Kayıt bulunamadı (silinmiş olabilir).", formData);
    await prisma.contentItem.update({ where: { id: row.id }, data: { data: { ...(data as object), id: existing }, published, updatedBy: author } });
  } else {
    const baseKey = slugify(collection === "basin" ? `${data.outlet}-${data.date}` : String(data.name)) || `${collection}-${Date.now()}`;
    key = baseKey;
    for (let i = 2; await prisma.contentItem.findUnique({ where: { collection_key: { collection, key } } }); i++) key = `${baseKey}-${i}`;
    const first = await prisma.contentItem.findFirst({ where: { collection }, orderBy: { sortOrder: "asc" }, select: { sortOrder: true } });
    // yeni haber/kişi listenin başına (haberler zaten tarihe göre dizilir)
    await prisma.contentItem.create({ data: { collection, key, data: { ...(data as object), id: key }, published, sortOrder: (first?.sortOrder ?? 10) - 10, updatedBy: author } });
  }
  const def = COLLECTIONS[collection];
  const title = collection === "basin" ? String((data.title as Record<string, string>).tr) : String(data.name);
  await prisma.contentLog.create({ data: { area: def.label, action: existing ? "düzenleme" : "ekleme", detail: title.slice(0, 160), author } });
  refresh(allRoutes(def.routes));
  redirect(`/admin/icerik/liste/${collection}?kaydedildi=${encodeURIComponent(key)}`);
}

async function itemAction(formData: FormData, op: "delete" | "toggle" | "up" | "down") {
  const store = await requireAdmin("/admin/icerik");
  const collection = String(formData.get("collection"));
  const key = String(formData.get("key"));
  if (!isCollectionKey(collection)) redirect("/admin/icerik");
  const author = authorFromCookies(store);
  await ensureSeeded(collection, author);
  const rows = await prisma.contentItem.findMany({ where: { collection }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
  const idx = rows.findIndex((r) => r.key === key);
  if (idx < 0) redirect(`/admin/icerik/liste/${collection}`);
  const row = rows[idx];
  const def = COLLECTIONS[collection];
  const name = collection === "basin" ? String(((row.data as Record<string, unknown>).title as Record<string, string>)?.tr ?? key) : String((row.data as Record<string, unknown>).name ?? key);
  if (op === "delete") {
    await prisma.contentItem.delete({ where: { id: row.id } });
    await prisma.contentLog.create({ data: { area: def.label, action: "silme", detail: name.slice(0, 160), author } });
  } else if (op === "toggle") {
    await prisma.contentItem.update({ where: { id: row.id }, data: { published: !row.published, updatedBy: author } });
    await prisma.contentLog.create({ data: { area: def.label, action: row.published ? "yayından kaldırma" : "yayına alma", detail: name.slice(0, 160), author } });
  } else {
    const j = op === "up" ? idx - 1 : idx + 1;
    if (j >= 0 && j < rows.length) {
      // sıraları baştan numaralandır (eşit sortOrder kalmasın), sonra iki kaydı değiştir
      const order = rows.map((r) => r.id);
      [order[idx], order[j]] = [order[j], order[idx]];
      await prisma.$transaction(order.map((id, i) => prisma.contentItem.update({ where: { id }, data: { sortOrder: (i + 1) * 10 } })));
    }
  }
  refresh(allRoutes(def.routes));
  redirect(`/admin/icerik/liste/${collection}${op === "up" || op === "down" ? `#k-${key}` : ""}`);
}

export async function deleteItem(formData: FormData) {
  await itemAction(formData, "delete");
}
export async function toggleItem(formData: FormData) {
  await itemAction(formData, "toggle");
}
export async function moveItemUp(formData: FormData) {
  await itemAction(formData, "up");
}
export async function moveItemDown(formData: FormData) {
  await itemAction(formData, "down");
}

/* ---------------- Görsel yükleme (Vercel Blob) ---------------- */

const MAX_IMAGE = 8 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export async function uploadImage(formData: FormData): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin("/admin/icerik");
  if (!blobUploadConfigured()) return { ok: false, error: "Görsel deposu bağlı değil (Vercel Blob)." };
  const file = formData.get("file");
  if (!(file instanceof File) || !file.size) return { ok: false, error: "Dosya seçilmedi." };
  if (!IMAGE_TYPES.has(file.type)) return { ok: false, error: "Yalnız JPG, PNG, WebP, AVIF ya da GIF yüklenebilir." };
  if (file.size > MAX_IMAGE) return { ok: false, error: "Görsel 8 MB'tan büyük olamaz." };
  const { put } = await import("@vercel/blob");
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "gorsel";
  const res = await put(`icerik/${base}.${ext}`, file, { access: "public", addRandomSuffix: true, contentType: file.type });
  return { ok: true, url: res.url };
}
