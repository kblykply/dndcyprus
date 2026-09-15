// app/sitemap.ts
// /sitemap.xml: TR ve EN sayfalar (hreflang alternatifleriyle) ve TR blog yazıları.
import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL, localePath, type Locale } from "@/lib/seo";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// Her iki dilde bulunan sayfalar ("" = ana sayfa)
const BILINGUAL: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/lagoon-verde", priority: 0.9, changeFrequency: "monthly" },
  { path: "/perla-ii", priority: 0.9, changeFrequency: "monthly" },
  { path: "/perla", priority: 0.9, changeFrequency: "monthly" },
  { path: "/la-joya", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mariachi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gecitkale", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/team", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/dndturkiye", priority: 0.6, changeFrequency: "yearly" },
  { path: "/dndcyprus", priority: 0.5, changeFrequency: "monthly" },
  { path: "/press", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

const abs = (locale: Locale, path: string) => `${SITE_URL}${localePath(locale, path)}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = BILINGUAL.flatMap(({ path, priority, changeFrequency }) => {
    // pageMetadata ile aynı: x-default İngilizce sürüm
    const languages = { tr: abs("tr", path), en: abs("en", path), "x-default": abs("en", path) };
    return (["tr", "en"] as const).map((locale) => ({
      url: abs(locale, path),
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });

  // Yalnızca Türkçe olan blog
  const blog: MetadataRoute.Sitemap = [
    { url: abs("tr", "/blog"), changeFrequency: "weekly", priority: 0.6 },
    ...BLOG_POSTS.map((post) => ({
      url: abs("tr", `/blog/${post.slug}`),
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];

  return [...pages, ...blog];
}
