// lib/content/admin.ts
// Panelin içerik yardımcıları (yalnız sunucu): bölüm alanları, listelerin tanımı ve ilk aktarım, sitede yenilenecek adresler.
import { prisma } from "@/lib/prisma";
import { CONTENT_LOCALES, getAt, walkFields, type ContentLocale, type Field } from "./core";
import { SCOPES, type ScopeKey } from "./scopes";
import { PRESS_DEFAULTS } from "./defaults/press";
import { TEAM_DEFAULTS } from "./defaults/team";
import type { CollectionKey } from "./store";

export type EditorField = Field & { original: string; overridden: boolean };

/** Bir bölümün alanları: koddaki değer (orijinal) + varsa panelde yazılan değer */
export async function sectionFields(scope: ScopeKey, locale: ContentLocale, section: string): Promise<EditorField[]> {
  const base = SCOPES[scope].build(locale);
  const fields = walkFields(getAt(base, section), section);
  const rows = await prisma.contentOverride.findMany({ where: { scope, locale, path: { startsWith: `${section}.` } }, select: { path: true, value: true } });
  const ov = new Map(rows.map((r) => [r.path, r.value]));
  return fields.map((f) => ({ ...f, original: f.value, value: ov.get(f.path) ?? f.value, overridden: ov.has(f.path) }));
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

export type ItemFieldDef = { key: string; label: string; kind: "text" | "long" | "url" | "date" | "image" | "tags" | "select"; required?: boolean; options?: string[]; hint?: string };

export const COLLECTIONS: Record<CollectionKey, { label: string; singular: string; desc: string; shared: ItemFieldDef[]; perLocale: ItemFieldDef[]; routes: (l: ContentLocale) => string[] }> = {
  basin: {
    label: "Basında DND",
    singular: "haber",
    desc: "Ana sayfada en yeni 5 haber, Basın sayfasında hepsi tarihe göre görünür.",
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
};

export const isCollectionKey = (v: string): v is CollectionKey => v in COLLECTIONS;

const DEFAULTS: Record<CollectionKey, { id: string }[]> = { basin: PRESS_DEFAULTS, ekip: TEAM_DEFAULTS };

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

export function slugify(s: string) {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
