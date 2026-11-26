"use server";
// app/(default)/admin/icerik/actions.ts
// İçerik yönetimi eylemleri: sayfa metni kaydet / orijinale dön, liste kaydı ekle-düzenle-sil-yayınla-sırala, görsel yükle.
// Her eylem oturumu doğrular; değişiklik sonrası ilgili sayfalar yeniden üretilir (revalidatePath) ve işlem geçmişine yazılır.
import { blobUploadConfigured } from "@/lib/content/blob";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authorFromCookies, requireAdmin } from "@/lib/admin-auth";
import { CONTENT_LOCALES, applyOverrides, fieldLabel, getAt, listOperation, listSources, postHtml, youtubeIdOf, type ContentLocale, type ListOp } from "@/lib/content/core";
import { AUTO_TRANSLATOR, translateFromTurkish, translationConfigured } from "@/lib/content/translate";
import { enqueueTranslation, processTranslationQueue, translateItemData, translateSectionFields, type Changed } from "@/lib/content/translate-jobs";
import { SCOPES, isScopeKey, type ScopeDef, type ScopeKey } from "@/lib/content/scopes";
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

type SectionCtx = { scope: ScopeKey; locale: ContentLocale; section: string; author: string };

async function sectionCtx(formData: FormData): Promise<SectionCtx> {
  const store = await requireAdmin("/admin/icerik");
  const scope = String(formData.get("scope"));
  const locale = formData.get("locale");
  const section = String(formData.get("section"));
  if (!isScopeKey(scope) || !isLocale(locale) || !SCOPES[scope].sections.some(([k]) => k === section)) redirect("/admin/icerik");
  return { scope, locale, section, author: authorFromCookies(store) };
}

const editorUrl = (c: SectionCtx, extra: Record<string, string>) =>
  `/admin/icerik/sayfa/${c.scope}?${new URLSearchParams({ dil: c.locale, bolum: c.section, ...extra })}`;

/**
 * Türkçede değişen yazıları 4 dile çevirir (lib/content/translate-jobs). Çeviri servisi o an yanıt vermezse Türkçe kayıt
 * bozulmaz; iş kuyruğa girer ve 10 dakikada bir kendiliğinden yeniden denenir.
 */
async function translateSection(c: SectionCtx, changed: Changed[]): Promise<{ count: number; error?: string; queued?: boolean }> {
  if (c.locale !== "tr") return { count: 0 };
  const r = await translateSectionFields(c.scope, c.section, changed);
  if (r.error && !("off" in r && r.off) && r.paths.length) {
    await enqueueTranslation({ kind: "section", scope: c.scope, section: c.section, paths: r.paths, at: Date.now(), tries: 0, error: r.error });
    return { count: 0, queued: true };
  }
  return { count: r.count, error: r.error };
}

/** Formdaki alanları kaydeder (sayfa yönlendirmesi yapmaz): görsel diğer dillere, ortak bölüm 5 dile, Türkçe yazı çeviriye */
async function saveFields(c: SectionCtx, formData: FormData) {
  const { scope, locale, section, author } = c;
  const fields = await sectionFields(scope, locale, section);
  let changed = 0;
  const locales = new Set<ContentLocale>([locale]);
  const def = SCOPES[scope] as ScopeDef;
  const shared = !!def.shared?.includes(section); // telefon/e-posta: 5 dile birden
  const toTranslate: Changed[] = [];
  for (const f of fields) {
    if (!formData.has(`f:${f.path}`)) continue;
    let v = str(formData, `f:${f.path}`, 5000);
    if (f.kind === "number" && !Number.isFinite(Number(v.replace(",", ".")))) continue;
    if (f.kind !== "long" && f.kind !== "rich") v = v.replace(/\n+/g, " ");
    if (f.kind === "image" && v && !/^(\/|https:\/\/)\S+$/i.test(v)) continue; // geçersiz görsel yolu kaydedilmez
    if (f.kind === "video" && v) {
      const norm = normalizeVideo(f.original, f.path, v);
      if (norm === null) continue; // tanınmayan video kaydedilmez
      v = norm;
    }
    if (/\.email$/.test(f.path) && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) continue; // geçersiz e-posta kaydedilmez
    if (/\.(whatsapp|phone|mobile)$/.test(f.path) && v && v.replace(/\D/g, "").length < 8) continue; // eksik numara kaydedilmez
    const same = v === f.original;
    if ((same && f.overridden) || (!same && v !== f.value)) {
      await setOverride(scope, locale, f.path, same ? null : v, author);
      changed++;
      if (shared) {
        for (const l2 of CONTENT_LOCALES) {
          if (l2 === locale) continue;
          await setOverride(scope, l2, f.path, same ? null : v, author);
          locales.add(l2);
        }
      } else if (f.kind === "image") {
        for (const l2 of await propagateImage(scope, locale, section, f.path, f.original, f.value, v, author)) locales.add(l2);
      } else {
        toTranslate.push({ path: f.path, kind: f.kind, value: v, reverted: same });
      }
    }
  }
  const tr = shared ? { count: 0 } : await translateSection(c, toTranslate);
  if (tr.count) for (const l of CONTENT_LOCALES) locales.add(l);
  if (changed) {
    const label = SCOPES[scope].sections.find(([k]) => k === section)?.[1] ?? section;
    const extra = shared ? " · tüm dillerde" : tr.count ? ` · ${tr.count} alan 4 dile çevrildi` : locales.size > 1 ? " · görsel diğer dillerde de" : "";
    await prisma.contentLog.create({ data: { area: SCOPES[scope].label, action: "düzenleme", detail: `${label} (${locale.toUpperCase()}): ${changed} alan${extra}`, author } });
    refresh([...locales].flatMap((l) => SCOPES[scope].routes(l)), isSiteWide(scope));
  }
  return { changed, translated: tr.count, translateError: "error" in tr ? tr.error : undefined, queued: "queued" in tr && !!tr.queued };
}

/** Video alanı: kimlik alanına YouTube kimliği, gömme bağlantısı alanına gömme bağlantısı, dosya alanına site içi yol */
function normalizeVideo(original: string, path: string, v: string): string | null {
  const id = youtubeIdOf(v);
  const key = path.split(".").pop() ?? "";
  if (key === "youtubeId" || key === "videoId") return id;
  if (/youtube(-nocookie)?\.com\/embed\//i.test(original) || youtubeIdOf(original)) return id ? `https://www.youtube.com/embed/${id}` : /^\/\S+\.(mp4|webm|mov)$/i.test(v) ? v : null;
  return /^(\/\S+|https:\/\/\S+)\.(mp4|webm|mov)(\?\S*)?$/i.test(v) ? v : id ? `https://www.youtube.com/embed/${id}` : null;
}

function resultParams(r: { changed: number; translated: number; translateError?: string; queued?: boolean }) {
  const p: Record<string, string> = { kaydedildi: String(r.changed) };
  if (r.translated) p.ceviri = String(r.translated);
  if (r.queued) p.cevirisira = "1";
  if (r.translateError) p.cevirihata = r.translateError.slice(0, 200);
  return p;
}

export async function saveSection(formData: FormData) {
  const c = await sectionCtx(formData);
  const r = await saveFields(c, formData);
  redirect(editorUrl(c, resultParams(r)));
}

/** Düğmeye bağlanır: resetField.bind(null, alanYolu) (React, formAction düğmesinin name/value'sunu forma eklemiyor) */
export async function resetField(path: string, formData: FormData) {
  const c = await sectionCtx(formData);
  const { scope, locale, section, author } = c;
  if (!path.startsWith(`${section}.`)) redirect("/admin/icerik");
  const f = (await sectionFields(scope, locale, section)).find((x) => x.path === path);
  const sharedReset = !!(SCOPES[scope] as ScopeDef).shared?.includes(section);
  const n = await prisma.contentOverride.deleteMany({ where: sharedReset ? { scope, path } : { scope, locale, path } });
  if (n.count) {
    const locales = new Set<ContentLocale>(sharedReset ? CONTENT_LOCALES : [locale]);
    if (f?.kind === "image") for (const l2 of await propagateImage(scope, locale, section, path, f.original, f.value, f.original, author)) locales.add(l2);
    else if (locale === "tr" && !sharedReset) {
      // Türkçe orijinaline döndü: o alanın otomatik çevirileri de kalkar
      const m = await prisma.contentOverride.deleteMany({ where: { scope, locale: { not: "tr" }, path, updatedBy: AUTO_TRANSLATOR } });
      if (m.count) for (const l of CONTENT_LOCALES) locales.add(l);
    }
    const label = SCOPES[scope].sections.find(([k]) => k === section)?.[1] ?? section;
    await prisma.contentLog.create({ data: { area: SCOPES[scope].label, action: "orijinale dönüş", detail: `${label} · ${fieldLabel(path.slice(section.length + 1), section)} (${locale.toUpperCase()})`, author } });
    refresh([...locales].flatMap((l) => SCOPES[scope].routes(l)), isSiteWide(scope));
  }
  redirect(editorUrl(c, { geri: "1" }));
}

/* ---------------- Bölüm içindeki listeler: madde ekle / sil / taşı ---------------- */

async function listItemsOf(scope: ScopeKey, locale: ContentLocale, listPath: string) {
  const base = SCOPES[scope].build(locale);
  const rows = await prisma.contentOverride.findMany({ where: { scope, locale }, select: { path: true, value: true } });
  const ov = Object.fromEntries(rows.map((r) => [r.path, r.value]));
  const items = getAt(applyOverrides(base, ov), listPath);
  return Array.isArray(items) ? { items, sources: listSources(ov[listPath]?.startsWith("[") ? ov[listPath] : undefined, items.length) } : null;
}

/** Listeye işlem uygular ve listeyi tek kayıt olarak yazar; listenin altındaki tek tek alan kayıtları kayda katılmıştır, silinir */
async function writeListOp(scope: ScopeKey, locale: ContentLocale, listPath: string, op: ListOp, index: number, author: string, expectLength?: number) {
  const cur = await listItemsOf(scope, locale, listPath);
  if (!cur || (expectLength !== undefined && cur.items.length !== expectLength)) return null;
  const json = listOperation(cur.items, cur.sources, op, index);
  if (!json) return null;
  await prisma.$transaction([
    prisma.contentOverride.deleteMany({ where: { scope, locale, path: { startsWith: `${listPath}.` } } }),
    prisma.contentOverride.upsert({
      where: { scope_locale_path: { scope, locale, path: listPath } },
      create: { scope, locale, path: listPath, value: json, updatedBy: author },
      update: { value: json, updatedBy: author },
    }),
  ]);
  return cur.items.length;
}

/**
 * Düğmeye bağlanır: listAction.bind(null, işlem, listeYolu, sıra). Önce formdaki yazılar kaydedilir (yazılan kaybolmasın),
 * sonra işlem bu dilde ve listesi aynı uzunlukta olan diğer dillerde aynı yere uygulanır (maddeler dillerde hizalı kalır;
 * eklenen maddenin Türkçe metni değişince çeviriyle dolar).
 */
export async function listAction(op: ListOp, listPath: string, index: number, formData: FormData) {
  const c = await sectionCtx(formData);
  if (!listPath.startsWith(`${c.section}`) || !["add", "delete", "up", "down"].includes(op)) redirect("/admin/icerik");
  const saved = await saveFields(c, formData);
  const before = await writeListOp(c.scope, c.locale, listPath, op, index, c.author);
  const skipped: string[] = [];
  if (before !== null) {
    for (const l2 of CONTENT_LOCALES) {
      if (l2 === c.locale) continue;
      const r = await writeListOp(c.scope, l2, listPath, op, index, c.author, before);
      if (r === null) skipped.push(l2.toUpperCase());
    }
    const def = SCOPES[c.scope];
    const label = def.sections.find(([k]) => k === c.section)?.[1] ?? c.section;
    const what = { add: "madde eklendi", delete: "madde silindi", up: "madde yukarı taşındı", down: "madde aşağı taşındı" }[op];
    await prisma.contentLog.create({ data: { area: def.label, action: "liste", detail: `${label} · ${fieldLabel(listPath.slice(c.section.length + 1), c.section)}: ${what}`, author: c.author } });
    refresh(CONTENT_LOCALES.flatMap((l) => def.routes(l)), isSiteWide(c.scope));
  }
  const newIndex = op === "add" ? index + 1 : op === "up" ? index - 1 : op === "down" ? index + 1 : Math.max(0, index - 1);
  const extra: Record<string, string> = { ...resultParams(saved), liste: op };
  if (before === null) extra.listehata = "1";
  if (skipped.length) extra.atlanan = skipped.join(",");
  redirect(`${editorUrl(c, extra)}#m-${listPath}.${newIndex}`);
}

/** Listenin madde yapısını koddaki haline döndürür (tüm dillerde; listedeki yazı değişiklikleri de kalkar) */
export async function resetList(listPath: string, formData: FormData) {
  const c = await sectionCtx(formData);
  if (!listPath.startsWith(`${c.section}`)) redirect("/admin/icerik");
  const n = await prisma.contentOverride.deleteMany({ where: { scope: c.scope, OR: [{ path: listPath }, { path: { startsWith: `${listPath}.` } }] } });
  if (n.count) {
    const def = SCOPES[c.scope];
    await prisma.contentLog.create({ data: { area: def.label, action: "orijinale dönüş", detail: `${fieldLabel(listPath.slice(c.section.length + 1), c.section)} listesi (tüm diller)`, author: c.author } });
    refresh(CONTENT_LOCALES.flatMap((l) => def.routes(l)), isSiteWide(c.scope));
  }
  redirect(editorUrl(c, { geri: "1" }));
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
  const prevRow = existing ? await prisma.contentItem.findUnique({ where: { collection_key: { collection, key: existing } } }) : null;
  if (existing && !prevRow) return failed("Kayıt bulunamadı (silinmiş olabilir).", formData);
  const tr = await translateItemData(collection, data, (prevRow?.data ?? null) as Record<string, unknown> | null);
  if (existing) {
    const row = prevRow!;
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
  const q = new URLSearchParams({ kaydedildi: key });
  if (tr.count) q.set("ceviri", String(tr.count));
  if ("pending" in tr && tr.pending?.length) {
    await enqueueTranslation({ kind: "item", collection, key, fields: tr.pending, snapshot: tr.snapshot ?? {}, at: Date.now(), tries: 0, error: tr.error });
    q.set("cevirisira", "1");
  } else if (tr.error) q.set("cevirihata", tr.error.slice(0, 200));
  redirect(`/admin/icerik/liste/${collection}?${q}`);
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

/* ---------------- Çeviriyi dene (kaydetmeden) ---------------- */

export type TryState = { tr?: string; out?: Record<string, string>; error?: string } | undefined;

export async function tryTranslation(_prev: TryState, formData: FormData): Promise<TryState> {
  await requireAdmin("/admin/icerik");
  const tr = str(formData, "tr", 3000);
  if (!tr) return { error: "Türkçe bir metin yazın." };
  if (!translationConfigured()) return { tr, error: "Otomatik çeviri kapalı: GEMINI_API_KEY tanımlı değil." };
  const r = await translateFromTurkish([{ id: "x", text: tr, kind: tr.includes("**") || tr.includes("\n") ? "rich" : tr.length > 90 ? "long" : "text" }], "Test sentence typed in the admin panel of www.dndcyprus.com");
  if (!r.ok) return { tr, error: r.error };
  return { tr, out: r.out.x ?? {} };
}

/** Bekleyen çevirileri hemen dener (normalde 10 dakikada bir kendiliğinden) */
export async function runTranslationQueue(): Promise<{ message?: string; error?: string; at: number }> {
  await requireAdmin("/admin/icerik");
  if (!translationConfigured()) return { error: "Otomatik çeviri kapalı (anahtar yok).", at: Date.now() };
  const r = await processTranslationQueue(45_000);
  revalidatePath("/admin/icerik");
  if (r.done && !r.left) return { message: `Bekleyen çevirilerin hepsi yapıldı (${r.done}).`, at: Date.now() };
  if (r.done) return { message: `${r.done} çeviri yapıldı, ${r.left} tanesi sırada.`, at: Date.now() };
  if (r.left) return { error: "Çeviri servisi hâlâ yoğun; sıradakiler 10 dakikada bir kendiliğinden denenecek.", at: Date.now() };
  return { message: "Sırada bekleyen çeviri yok.", at: Date.now() };
}
