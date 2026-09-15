// lib/seo.ts
// Sayfa başına başlık, açıklama, canonical, hreflang ve Open Graph üretir.
import type { Metadata } from "next";

export const SITE_URL = "https://www.dndcyprus.com";
export const SITE_NAME = "DND Cyprus";
export const DEFAULT_OG_IMAGE = "/og/dnd-cyprus.jpg";

export type Locale = "tr" | "en";

type PageMetaInput = {
  locale: Locale;
  /** Dil öneki olmadan yol: "" (ana sayfa), "/lagoon-verde", "/contact" */
  path: string;
  title: string;
  description: string;
  /** 1200×630 görsel, public/ altından mutlak yol */
  image?: string;
  imageAlt?: string;
  /** Sayfa yalnızca tek dilde varsa hreflang alternatifi verilmez */
  singleLanguage?: boolean;
  noindex?: boolean;
};

export function localePath(locale: Locale, path: string) {
  return `/${locale}${path}`;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  singleLanguage = false,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = localePath(locale, path);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      ...(singleLanguage
        ? {}
        : {
            languages: {
              tr: localePath("tr", path),
              en: localePath("en", path),
              "x-default": localePath("en", path),
            },
          }),
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      alternateLocale: singleLanguage ? undefined : locale === "tr" ? ["en_GB"] : ["tr_TR"],
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
