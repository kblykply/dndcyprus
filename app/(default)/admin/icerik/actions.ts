"use server";
// app/(default)/admin/icerik/actions.ts
// İçerik yönetimi eylemleri: sayfa metni kaydet / orijinale dön, liste kaydı ekle-düzenle-sil-yayınla-sırala, görsel yükle.
// Her eylem oturumu doğrular; değişiklik sonrası ilgili sayfalar yeniden üretilir (revalidatePath) ve işlem geçmişine yazılır.
import { blobUploadConfigured } from "@/lib/content/blob";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authorFromCookies, requireAdmin } from "@/lib/admin-auth";
import { CONTENT_LOCALES, fieldLabel, postHtml, type ContentLocale } from "@/lib/content/core";
import { SCOPES, isScopeKey, type ScopeKey } from "@/lib/content/scopes";
import { COLLECTIONS, allRoutes, ensureSeeded, isCollectionKey, sectionFields, slugify } from "@/lib/content/admin";
import type { CollectionKey } from "@/lib/content/store";

const isLocale = (v: unknown): v is ContentLocale => typeof v === "string" && (CONTENT_LOCALES as readonly string[]).includes(v);
const str = (fd: FormData, k: string, max = 5000) => String(fd.get(k) ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);

/** "[slug]" içeren yol o şablondaki tüm sayfaları yeniler; siteWide tüm siteyi (alt bilgi her sayfada) */
function refresh(routes: string[], siteWide = false) {
  if (siteWide) revalidatePath("/", "layout");
  for (const r of new Set(routes)) {
    if (r.includes("[")) revalidatePath(r, "page");
    else revalidatePath(r);
  }
}


/* ---------------- Sayfa metinleri ---------------- */

const isSiteWide = (scope: ScopeKey) => "siteWide" in SCOPES[scope] && !!SCOPES[scope].siteWide;

async function setOverride(scope: string, locale: string, path: string, value: string | null, author: string) {
  if (value === null) await prisma.contentOverride.deleteMany({ where: { scope, locale, path } });
  else
    await prisma.contentOverride.upsert({
      where: { scope_locale_path: { scope, locale, path } },
      create: { scope, locale, path, value, updatedBy: author },
      update: { value, updatedBy: author },
    });
}

/**
 * Görsel tüm dillerde ortaktır: bir dilde değişen görsel, aynı yerde aynı görseli gösteren diğer dillere de yazılır
 * (o dilde ayrıca başka bir görsel seçilmişse dokunulmaz). Değişen diller döner.
 */
async function propagateImage(scope: ScopeKey, locale: ContentLocale, section: string, path: string, original: string, oldValue: string, next: string, author: string) {
  const touched: ContentLocale[] = [];
  for (const l2 of CONTENT_LOCALES) {
    if (l2 === locale) continue;
    const g = (await sectionFields(scope, l2, section)).find((x) => x.path === path);
    if (!g || g.kind !== "image" || g.original !== original || g.value !== oldValue || g.value === next) continue;
    await setOverride(scope, l2, path, next === g.original ? null : next, author);
    touched.push(l2);
  }
  return touched;
}

export async function saveSection(formData: FormData) {
  const store = await requireAdmin("/admin/icerik");
  const scope = String(formData.get("scope"));
  const locale = formData.get("locale");
  const section = String(formData.get("section"));
  if (!isScopeKey(scope) || !isLocale(locale) || !SCOPES[scope].sections.some(([k]) => k === section)) redirect("/admin/icerik");
  const author = authorFromCookies(store);
  const fields = await sectionFields(scope, locale, section);
  let changed = 0;
  const locales = new Set<ContentLocale>([locale]);
  for (const f of fields) {
    if (!formData.has(`f:${f.path}`)) continue;
    let v = str(formData, `f:${f.path}`, 5000);
    if (f.kind === "number" && !Number.isFinite(Number(v.replace(",", ".")))) continue;
    if (f.kind !== "long" && f.kind !== "rich") v = v.replace(/\n+/g, " ");
    if (f.kind === "image" && v && !/^(\/|https:\/\/)\S+$/i.test(v)) continue; // geçersiz görsel yolu kaydedilmez
    const same = v === f.original;
    if ((same && f.overridden) || (!same && v !== f.value)) {
      await setOverride(scope, locale, f.path, same ? null : v, author);
      changed++;
      if (f.kind === "image") for (const l2 of await propagateImage(scope, locale, section, f.path, f.original, f.value, v, author)) locales.add(l2);
    }
  }
  if (changed) {
    const label = SCOPES[scope].sections.find(([k]) => k === section)?.[1] ?? section;
    const extra = locales.size > 1 ? " · görsel diğer dillerde de" : "";
    await prisma.contentLog.create({ data: { area: SCOPES[scope].label, action: "düzenleme", detail: `${label} (${locale.toUpperCase()}): ${changed} alan${extra}`, author } });
    refresh([...locales].flatMap((l) => SCOPES[scope].routes(l)), isSiteWide(scope));
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
  const author = authorFromCookies(store);
  const f = (await sectionFields(scope, locale, section)).find((x) => x.path === path);
  const n = await prisma.contentOverride.deleteMany({ where: { scope, locale, path } });
  if (n.count) {
    const locales = new Set<ContentLocale>([locale]);
    if (f?.kind === "image") for (const l2 of await propagateImage(scope, locale, section, path, f.original, f.value, f.original, author)) locales.add(l2);
    const label = SCOPES[scope].sections.find(([k]) => k === section)?.[1] ?? section;
    await prisma.contentLog.create({ data: { area: SCOPES[scope].label, action: "orijinale dönüş", detail: `${label} · ${fieldLabel(path.slice(section.length + 1))} (${locale.toUpperCase()})`, author } });
    refresh([...locales].flatMap((l) => SCOPES[scope].routes(l)), isSiteWide(scope));
  }
  redirect(`/admin/icerik/sayfa/${scope}?dil=${locale}&bolum=${section}&geri=1`);
}

/* ---------------- Listeler (Basında DND, Ekip, Etkinlikler, DND'den Haberler) ---------------- */

export type ItemFormState = { error?: string; values?: Record<string, string>; at?: number } | undefined;

const maxLen = (kind: string) => (kind === "html" ? 60000 : kind === "long" ? 5000 : 600);

async function itemFromForm(collection: CollectionKey, fd: FormData): Promise<{ data: Record<string, unknown>; error?: string }> {
  const def = COLLECTIONS[collection];
  const data: Record<string, unknown> = {};
  for (const f of def.shared) {
    const v = str(fd, f.key, maxLen(f.kind));
    if (f.required && !v) return { data, error: `${f.label} gerekli.` };
    if (f.kind === "url" && v && !/^https?:\/\/\S+$/i.test(v)) return { data, error: `${f.label} geçerli bir bağlantı olmalı (https://…).` };
    if (f.kind === "date" && v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return { data, error: `${f.label} geçersiz.` };
    if (f.kind === "image" && v && !/^(\/|https:\/\/)\S+$/i.test(v)) return { data, error: `${f.label} için site içi yol (/…) ya da https bağlantısı girin.` };
    if (f.kind === "link" && v && !/^(\/[^\s]*|https?:\/\/\S+)$/i.test(v)) return { data, error: `${f.label}: site içi yol (/…) ya da https bağlantısı olmalı.` };
    if (f.kind === "select" && v && f.options && !f.options.includes(v)) return { data, error: `${f.label} geçersiz.` };
    if (v) data[f.key] = v;
  }
  for (const f of def.perLocale) {
    const per: Record<string, unknown> = {};
    for (const l of CONTENT_LOCALES) {
      const v = str(fd, `${l}.${f.key}`, maxLen(f.kind));
      per[l] = f.kind === "tags" ? v.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12) : f.kind === "html" ? postHtml(v) : v;
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
  const { data, error } = await itemFromForm(collection, formData);
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
    const baseKey = slugify(COLLECTIONS[collection].keyFrom(data)) || `${collection}-${Date.now()}`;
    key = baseKey;
    for (let i = 2; await prisma.contentItem.findUnique({ where: { collection_key: { collection, key } } }); i++) key = `${baseKey}-${i}`;
    const first = await prisma.contentItem.findFirst({ where: { collection }, orderBy: { sortOrder: "asc" }, select: { sortOrder: true } });
    // yeni haber/kişi listenin başına (haberler zaten tarihe göre dizilir)
    await prisma.contentItem.create({ data: { collection, key, data: { ...(data as object), id: key }, published, sortOrder: (first?.sortOrder ?? 10) - 10, updatedBy: author } });
  }
  const def = COLLECTIONS[collection];
  const title = def.title(data);
  await prisma.contentLog.create({ data: { area: def.label, action: existing ? "düzenleme" : "ekleme", detail: title.slice(0, 160), author } });
  refresh([...allRoutes(def.routes), ...(collection === "haber" ? ["/sitemap.xml"] : [])]);
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
  const name = def.title(row.data as Record<string, unknown>) || key;
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
  refresh([...allRoutes(def.routes), ...(collection === "haber" ? ["/sitemap.xml"] : [])]);
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
