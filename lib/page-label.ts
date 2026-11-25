// lib/page-label.ts
// Site adresini panelde okunur ada çevirir: "/en/lagoon-verde" → { name: "Lagoon Verde", lang: "İngilizce" },
// "/tr/blog/<adres>" → "Blog: <yazı başlığı>". Isı Haritası, Site Trafiği, Reklam Raporu ve talep ayrıntısı kullanır.
import { BLOG_POSTS } from "@/lib/blog";

export const LANG_NAMES: Record<string, string> = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça", pl: "Lehçe" };

const PAGE_NAMES: Record<string, string> = {
  "": "Ana sayfa",
  about: "Hakkımızda",
  team: "Ekibimiz",
  contact: "İletişim",
  projects: "Projeler",
  press: "Haberler",
  advantage: "DND Ayrıcalığı",
  "payment-plans": "Ödeme ve yatırım fırsatları",
  blog: "DND'den Haberler (blog)",
  dndcyprus: "Medya merkezi",
  privacy: "Gizlilik politikası",
  terms: "Kullanım şartları",
  mariachi: "Mariachi Beach Club",
  neocity: "NeoCity",
  "lagoon-verde": "Lagoon Verde",
  "la-joya": "La Joya",
  perla: "La Joya Perla",
  "perla-ii": "La Joya Perla II",
  admin: "Yönetim paneli",
};

const BLOG_TITLES = new Map(BLOG_POSTS.map((p) => [p.slug, p.title]));

export type PageLabel = { name: string; lang?: string; path: string; ad?: boolean };

/** Tam adres ya da yol → okunur sayfa adı ve dili (bilinmeyen yolda adresin kendisi) */
export function pageLabel(urlOrPath: string, blogTitles?: Map<string, string>): PageLabel {
  let path = String(urlOrPath || "").trim();
  let search = "";
  try {
    const u = new URL(path, "https://www.dndcyprus.com");
    path = u.pathname;
    search = u.search;
  } catch {
    /* yol olarak kalır */
  }
  const segs = path.replace(/\/+$/, "").split("/").filter(Boolean);
  const lang = segs[0] && LANG_NAMES[segs[0].toLowerCase()] ? LANG_NAMES[segs[0].toLowerCase()] : undefined;
  const rest = lang ? segs.slice(1) : segs;
  const ad = /[?&](utm_|gclid=|fbclid=)/i.test(search);
  let name: string | undefined;
  if (rest[0] === "blog" && rest[1]) {
    const t = blogTitles?.get(rest[1]) ?? BLOG_TITLES.get(rest[1]);
    name = `Blog: ${t ?? rest[1].replace(/-/g, " ")}`;
  } else if (rest.length <= 1) {
    name = PAGE_NAMES[rest[0] ?? ""];
  } else if (rest[0] === "admin") {
    name = PAGE_NAMES.admin;
  }
  return { name: name ?? (path || "/"), lang, path: path || "/", ad };
}

/** Tek satırlık metin: "Lagoon Verde · İngilizce" (reklam parametreliyse "· reklamdan") */
export function pageLabelText(urlOrPath: string, blogTitles?: Map<string, string>) {
  const p = pageLabel(urlOrPath, blogTitles);
  return [p.name, p.lang, p.ad ? "reklamdan" : ""].filter(Boolean).join(" · ");
}
