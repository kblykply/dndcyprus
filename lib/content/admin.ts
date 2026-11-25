// lib/content/admin.ts
// Panelin içerik yardımcıları (yalnız sunucu): bölüm alanları, listelerin tanımı ve ilk aktarım, sitede yenilenecek adresler.
import { prisma } from "@/lib/prisma";
import { CONTENT_LOCALES, applyOverrides, editableLists, getAt, slugify, walkFields, type ContentLocale, type Field } from "./core";
import { AUTO_TRANSLATOR } from "./translate";
export { slugify };
import { SCOPES, isHiddenPath, type ScopeKey } from "./scopes";
import { PRESS_DEFAULTS } from "./defaults/press";
import { TEAM_DEFAULTS } from "./defaults/team";
import { EVENT_DEFAULTS } from "./defaults/events";
import { BLOG_DEFAULTS } from "./defaults/blog";
import type { CollectionKey } from "./store";

export type EditorField = Field & { original: string; overridden: boolean; /** başka dilde otomatik çeviriyle yazıldı */ auto: boolean };
export type EditorList = { path: string; length: number; /** madde eklendi/silindi/taşındı */ overridden: boolean };

/**
 * Bir bölümün düzenleyici durumu: liste yapısı değişiklikleri uygulanmış içerik üzerinden alanlar (orijinal = liste yapısıyla
 * birlikte koddaki değer, değer = panelde yazılan), madde eklenip silinebilen listeler ve bu dildeki tüm kayıtlar.
 */
export async function sectionState(scope: ScopeKey, locale: ContentLocale, section: string) {
  const def = SCOPES[scope];
  const base = def.build(locale);
  const hide = "hide" in def ? def.hide : undefined;
  const rows = await prisma.contentOverride.findMany({
    where: { scope, locale, OR: [{ path: section }, { path: { startsWith: `${section}.` } }] },
    select: { path: true, value: true, updatedBy: true },
  });
  const structural = applyOverrides(base, Object.fromEntries(rows.filter((r) => r.value.startsWith("[")).map((r) => [r.path, r.value])));
  const listRows = new Map(rows.filter((r) => r.value.startsWith("[") && Array.isArray(getAt(structural, r.path))).map((r) => [r.path, r.value]));
  const leaf = new Map(rows.filter((r) => !listRows.has(r.path)).map((r) => [r.path, r]));
  const fields: EditorField[] = walkFields(getAt(structural, section), section)
    .filter((f) => !isHiddenPath(f.path, hide))
    .map((f) => {
      const o = leaf.get(f.path);
      return { ...f, original: f.value, value: o?.value ?? f.value, overridden: !!o, auto: o?.updatedBy === AUTO_TRANSLATOR };
    });
  const lists: EditorList[] = editableLists(getAt(structural, section), section)
    .filter((l) => !isHiddenPath(l.path, hide))
    .map((l) => ({ ...l, overridden: listRows.has(l.path) }));
  return { base, rows, fields, lists, listRows };
}

/** Bir bölümün alanları: koddaki değer (orijinal) + varsa panelde yazılan değer */
export async function sectionFields(scope: ScopeKey, locale: ContentLocale, section: string): Promise<EditorField[]> {
  return (await sectionState(scope, locale, section)).fields;
}

export async function overrideCounts(scope: ScopeKey, locale: ContentLocale) {
  const rows = await prisma.contentOverride.findMany({ where: { scope, locale }, select: { path: true } });
  const counts: Record<string, number> = {};
  for (const r of rows) {
    const s = r.path.split(".")[0];
    counts[s] = (counts[s] || 0) + 1;
  }
  return counts;
}

/* ---------------- Listeler ---------------- */

export type ItemFieldDef = {
  key: string;
  label: string;
  /** link: site içi yol (/…) ya da https bağlantısı; html: yazı metni (paragraflar, **kalın**, HTML) */
  kind: "text" | "long" | "url" | "link" | "date" | "image" | "tags" | "select" | "html";
  required?: boolean;
  options?: string[];
  hint?: string;
};

type Data = Record<string, unknown>;
const trOf = (d: Data, k: string) => String(((d[k] as Record<string, string> | undefined) ?? {}).tr ?? "");

export type CollectionDef = {
  label: string;
  singular: string;
  /** düzenleme sayfası başlığı */
  editTitle: string;
  desc: string;
  shared: ItemFieldDef[];
  perLocale: ItemFieldDef[];
  /** listede küçük görsel olarak gösterilen alan */
  imageKey: string;
  title: (d: Data) => string;
  sub: (d: Data) => string;
  /** yeni kaydın anahtarı (blogda yazının adresi olur) */
  keyFrom: (d: Data) => string;
  /** sitede yenilenecek adresler; "[slug]" içeren yol tüm yazı sayfalarını yeniler */
  routes: (l: ContentLocale) => string[];
  /** kayıt sitede nerede (panelde "sitede gör" bağlantısı) */
  viewHref?: (key: string) => string;
};

export const COLLECTIONS: Record<CollectionKey, CollectionDef> = {
  basin: {
    label: "Basında DND",
    singular: "haber",
    editTitle: "Haberi düzenle",
    desc: "Ana sayfada en yeni 5 haber, Basın sayfasında hepsi tarihe göre görünür.",
    imageKey: "cover",
    title: (d) => trOf(d, "title"),
    sub: (d) => `${d.outlet ?? ""} · ${d.date ?? ""}`,
    keyFrom: (d) => `${d.outlet}-${d.date}`,
    shared: [
      { key: "outlet", label: "Yayın adı", kind: "text", required: true, hint: "Örnek: Kıbrıs Postası" },
      { key: "url", label: "Haberin bağlantısı", kind: "url", required: true },
      { key: "date", label: "Tarih", kind: "date", required: true },
      { key: "cover", label: "Kapak görseli", kind: "image" },
    ],
    perLocale: [
      { key: "title", label: "Başlık", kind: "text", required: true },
      { key: "excerpt", label: "Özet", kind: "long" },
      { key: "tags", label: "Etiketler", kind: "tags", hint: "Virgülle ayırın: Röportaj, NeoCity" },
    ],
    routes: (l) => [`/${l}`, `/${l}/press`],
  },
  ekip: {
    label: "Ekip",
    singular: "kişi",
    editTitle: "Kişiyi düzenle",
    imageKey: "photo",
    title: (d) => String(d.name ?? ""),
    sub: (d) => trOf(d, "role"),
    keyFrom: (d) => String(d.name ?? ""),
    desc: "Ekip ve Hakkımızda sayfalarında listedeki sırayla görünür.",
    shared: [
      { key: "name", label: "Ad soyad", kind: "text", required: true },
      { key: "photo", label: "Fotoğraf", kind: "image", hint: "Dikey portre, şeffaf ya da düz arka plan" },
      { key: "accent", label: "Kart vurgu rengi", kind: "select", options: ["teal", "orange"] },
    ],
    perLocale: [
      { key: "role", label: "Görev", kind: "text", required: true },
      { key: "category", label: "Bölüm (filtre)", kind: "text", hint: "Aynı bölümdeki kişilerle aynı yazın (ör. Satış / Sales)" },
      { key: "bio", label: "Kısa tanıtım", kind: "long" },
    ],
    routes: (l) => [`/${l}/team`, `/${l}/about`],
  },
  etkinlik: {
    label: "Etkinlikler",
    singular: "etkinlik",
    editTitle: "Etkinliği düzenle",
    desc: "Haberler sayfasındaki Etkinlikler bölümünde listedeki sırayla görünür (en yeni en üstte).",
    imageKey: "img",
    title: (d) => trOf(d, "h"),
    sub: (d) => trOf(d, "date"),
    keyFrom: (d) => trOf(d, "h"),
    shared: [
      { key: "img", label: "Fotoğraf", kind: "image", required: true, hint: "Yatay fotoğraf (kartta kırpılarak gösterilir)" },
      { key: "href", label: "Bağlantı (isteğe bağlı)", kind: "link", hint: "Site içi yol (/blog/…) ya da https://… — boşsa kart tıklanmaz" },
    ],
    perLocale: [
      { key: "date", label: "Tarih yazısı", kind: "text", required: true, hint: "Örnek: 7 Kasım 2026" },
      { key: "h", label: "Başlık", kind: "text", required: true },
      { key: "p", label: "Metin", kind: "long" },
    ],
    routes: (l) => [`/${l}/press`],
  },
  haber: {
    label: "DND'den Haberler",
    singular: "yazı",
    editTitle: "Yazıyı düzenle",
    desc: "Blog yazıları: Haberler sayfasında en yeni 3 yazı, /blog sayfasında hepsi tarihe göre görünür. Yazının adresi ilk kayıtta başlıktan oluşur.",
    imageKey: "cover",
    title: (d) => trOf(d, "title"),
    sub: (d) => String(d.date ?? ""),
    keyFrom: (d) => trOf(d, "title"),
    shared: [
      { key: "date", label: "Tarih", kind: "date", required: true },
      { key: "cover", label: "Kapak görseli", kind: "image" },
    ],
    perLocale: [
      { key: "title", label: "Başlık", kind: "text", required: true },
      { key: "excerpt", label: "Özet", kind: "long", hint: "Listede ve arama sonuçlarında görünen 1–2 cümle" },
      { key: "content", label: "Yazı", kind: "html", required: true, hint: "Paragrafları boş satırla ayırın; **kalın** yazabilirsiniz. HTML de kullanılabilir (<p>, <a href=…>, <blockquote>)." },
      { key: "author", label: "İmza (isteğe bağlı)", kind: "text", hint: "Örnek: Basın bülteni — boşsa imza görünmez" },
    ],
    routes: (l) => [`/${l}/blog`, `/${l}/press`, `/${l}/blog/[slug]`],
    viewHref: (key) => `/tr/blog/${key}`,
  },
};

export const isCollectionKey = (v: string): v is CollectionKey => Object.prototype.hasOwnProperty.call(COLLECTIONS, v);

const DEFAULTS: Record<CollectionKey, { id: string }[]> = { basin: PRESS_DEFAULTS, ekip: TEAM_DEFAULTS, etkinlik: EVENT_DEFAULTS, haber: BLOG_DEFAULTS };

/** Liste veritabanında yoksa koddaki listeyi aktarır (ilk değişiklikten önce; tekrar çalışırsa bir şey yapmaz) */
export async function ensureSeeded(collection: CollectionKey, author: string) {
  const n = await prisma.contentItem.count({ where: { collection } });
  if (n) return false;
  await prisma.contentItem.createMany({
    data: DEFAULTS[collection].map((d, i) => ({ collection, key: d.id, data: d as unknown as object, sortOrder: (i + 1) * 10, updatedBy: author })),
    skipDuplicates: true,
  });
  await prisma.contentLog.create({ data: { area: COLLECTIONS[collection].label, action: "aktarım", detail: `Koddaki ${DEFAULTS[collection].length} kayıt panele aktarıldı`, author } });
  return true;
}

/** Liste kayıtları: veritabanında varsa oradan, yoksa koddaki varsayılan (henüz aktarılmamış) */
export async function listItems(collection: CollectionKey) {
  const rows = await prisma.contentItem.findMany({ where: { collection }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
  if (rows.length) return { seeded: true, items: rows.map((r) => ({ key: r.key, published: r.published, updatedAt: r.updatedAt as Date | null, data: r.data as Record<string, unknown> })) };
  return { seeded: false, items: DEFAULTS[collection].map((d) => ({ key: d.id, published: true, updatedAt: null as Date | null, data: d as unknown as Record<string, unknown> })) };
}

export const allRoutes = (fn: (l: ContentLocale) => string[]) => CONTENT_LOCALES.flatMap(fn);

