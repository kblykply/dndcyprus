// lib/content/defaults/blog.ts
// "DND'den Haberler" (blog) KOD İÇİNDEKİ varsayılan yazıları: Türkçe lib/blog.ts + çeviriler lib/blog-i18n.ts birleştirilir.
// Panelde liste ilk değiştiğinde veritabanına aktarılır; sonra site yazıları veritabanından okur (lib/content/store.ts).
// Kayıt anahtarı (id) yazının adresidir: /blog/<id>. Dile göre değişen: başlık, özet, metin (HTML). Ortak: tarih, kapak, yazar.
import { BLOG_POSTS, type BlogPost } from "@/lib/blog";
import { BLOG_I18N } from "@/lib/blog-i18n";
import { CONTENT_LOCALES, type ContentLocale } from "../core";

export type BlogRecord = {
  id: string;
  date: string;
  cover?: string;
  /** dile göre imza ("Basın bülteni" / "Press release"); boşsa imza görünmez (yedek dile düşmez) */
  author?: Record<ContentLocale, string>;
  title: Record<ContentLocale, string>;
  excerpt: Record<ContentLocale, string>;
  content: Record<ContentLocale, string>;
};

const per = (p: BlogPost, k: "title" | "excerpt" | "content") =>
  Object.fromEntries(CONTENT_LOCALES.map((l) => [l, l === "tr" ? p[k] : (BLOG_I18N[l][p.slug]?.[k] ?? "")])) as Record<ContentLocale, string>;

export const BLOG_DEFAULTS: BlogRecord[] = BLOG_POSTS.map((p) => ({
  id: p.slug,
  date: p.date,
  ...(p.cover ? { cover: p.cover } : {}),
  ...(p.author
    ? { author: Object.fromEntries(CONTENT_LOCALES.map((l) => [l, l === "tr" ? p.author! : (BLOG_I18N[l][p.slug]?.author ?? (p.author === "Admin" ? "" : p.author!))])) as Record<ContentLocale, string> }
    : {}),
  title: per(p, "title"),
  excerpt: per(p, "excerpt"),
  content: Object.fromEntries(Object.entries(per(p, "content")).map(([l, v]) => [l, v.trim()])) as Record<ContentLocale, string>,
}));

/** Kayıt → yazı; çevirisi boş alanda İngilizce, o da yoksa Türkçe (imza hariç) */
export function postFor(r: BlogRecord, l: ContentLocale): BlogPost {
  const pick = (v: Record<string, string> | undefined) => (v?.[l] || v?.en || v?.tr || "").trim();
  const author = (r.author?.[l] || "").trim();
  return { slug: r.id, title: pick(r.title), excerpt: pick(r.excerpt), content: pick(r.content), date: r.date, ...(r.cover ? { cover: r.cover } : {}), ...(author ? { author } : {}) };
}
