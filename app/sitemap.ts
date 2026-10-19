// app/sitemap.ts
// /sitemap.xml: TR ve EN sayfalar (hreflang alternatifleriyle) ve TR blog yazıları.
import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL, localePath, type Locale } from "@/lib/seo";
import { LOCALES } from "@/lib/azure/site";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// Her iki dilde bulunan sayfalar ("" = ana sayfa)
const BILINGUAL: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/neocity", priority: 0.9, changeFrequency: "monthly" },
  { path: "/lagoon-verde", priority: 0.9, changeFrequency: "monthly" },
  { path: "/perla-ii", priority: 0.9, changeFrequency: "monthly" },
  { path: "/perla", priority: 0.9, changeFrequency: "monthly" },
  { path: "/la-joya", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mariachi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/advantage", priority: 0.7, changeFrequency: "monthly" },
  { path: "/payment-plans", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/team", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/dndcyprus", priority: 0.5, changeFrequency: "monthly" },
  { path: "/press", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

const abs = (locale: Locale, path: string) => `${SITE_URL}${localePath(locale, path)}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = BILINGUAL.flatMap(({ path, priority, changeFrequency }) => {
    // pageMetadata ile aynı: x-default İngilizce sürüm
    const languages = { ...Object.fromEntries(LOCALES.map((l) => [l, abs(l, path)])), "x-default": abs("en", path) };
    return LOCALES.map((locale) => ({
      url: abs(locale, path),
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });

  // DND'den Haberler: her dilde liste ve yazılar
  const blogPaths = [{ path: "/blog", lastModified: undefined as Date | undefined, images: undefined as string[] | undefined, priority: 0.6, changeFrequency: "weekly" as Freq },
    ...BLOG_POSTS.map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.date ? new Date(post.date) : undefined, images: post.cover ? [new URL(post.cover, SITE_URL).href] : undefined, priority: 0.5, changeFrequency: "yearly" as Freq }))];
  const blog: MetadataRoute.Sitemap = blogPaths.flatMap(({ path, ...rest }) => {
    const languages = { ...Object.fromEntries(LOCALES.map((l) => [l, abs(l, path)])), "x-default": abs("en", path) };
    return LOCALES.map((locale) => ({ url: abs(locale, path), ...rest, alternates: { languages } }));
  });

  return [...pages, ...blog];
}
