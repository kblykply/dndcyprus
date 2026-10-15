// Azure tasarımı için site geneli veri: projeler, menü, iletişim, sosyal.
// İçerik mevcut sitedeki bileşenlerden (Header/Footer/ProjectsStrip/Perla2Hero) taşındı.

export type Locale = "tr" | "en";

export const CONTACT = {
  phone: "+90 392 444 03 63",
  phoneHref: "tel:+903924440363",
  mobile: "+90 548 888 03 63",
  whatsapp: "905488880363",
  email: "info@dndcyprus.com",
  hq: {
    tr: "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Gazimağusa, Kıbrıs, 99450",
    en: "Alasya Park Sitesi 2nd Stage, Shop No: 2/3, Gazi Mustafa Kemal Boulevard, Sakarya, Famagusta, Cyprus, 99450",
  },
  hours: { tr: "Hafta içi 08:30–17:30, Cumartesi 08:30–13:00", en: "Weekdays 08:30–17:30, Saturday 08:30–13:00" },
  sales: { tr: "Sahil Yolu 45, İskele, Kuzey Kıbrıs", en: "Sahil Yolu 45, İskele, North Cyprus" },
  hqMap: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
  salesMap: "https://maps.app.goo.gl/V2ainR6Rs2JkLaN27",
};

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/dndcyprus/" },
  { label: "LinkedIn", href: "https://cy.linkedin.com/company/dndcyprus" },
  { label: "Facebook", href: "https://www.facebook.com/dndcyprus/" },
  { label: "YouTube", href: "https://www.youtube.com/@dndcyprus" },
];

export type ProjectSlug = "lagoon-verde" | "perla-ii" | "perla" | "la-joya" | "mariachi" | "gecitkale";

export type ProjectMeta = {
  slug: ProjectSlug;
  name: string;
  short: Record<Locale, string>;      // menüde alt satır
  location: Record<Locale, string>;
  status: Record<Locale, string>;
  award?: Record<Locale, string>;
  blurb: Record<Locale, string>;       // carousel açıklaması
  cover: string;                       // /azure/… (fotogerçekçi görsel)
  thumb: string;
  logo?: string;
  cta: Record<Locale, string>;
};

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "lagoon-verde",
    name: "Lagoon Verde",
    short: { tr: "İskele · Altın Ödül", en: "İskele · Gold Award" },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele" },
    status: { tr: "Devam eden", en: "Ongoing" },
    award: { tr: "Altın Ödül", en: "Gold Award" },
    blurb: { tr: "354 rezidans · Teslim Aralık 2028", en: "354 residences · Delivery December 2028" },
    cover: "/azure/lv-7.jpg",
    thumb: "/azure/lv-5.jpg",
    logo: "/logos/lagoon.png",
    cta: { tr: "Detaylara bak", en: "View details" },
  },
  {
    slug: "perla-ii",
    name: "La Joya Perla II",
    short: { tr: "İskele · Devam eden", en: "İskele · Ongoing" },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele" },
    status: { tr: "Devam eden", en: "Ongoing" },
    blurb: { tr: "Stüdyo, 1+1 loft, çatı teraslı veya bahçeli 2+1", en: "Studio, 1+1 loft, 2+1 with roof terrace or garden" },
    cover: "/azure/p2-9.jpg",
    thumb: "/azure/p2-2.jpg",
    logo: "/logos/perlaii.png",
    cta: { tr: "Detaylara bak", en: "View details" },
  },
  {
    slug: "perla",
    name: "La Joya Perla",
    short: { tr: "İskele · Devam eden", en: "İskele · Ongoing" },
    location: { tr: "Bahçeler, İskele · Denize 700 m", en: "Bahçeler, İskele · 700 m to the sea" },
    status: { tr: "Devam eden", en: "Ongoing" },
    blurb: { tr: "Sand pool, kapalı havuz ve spa", en: "Sand pool, indoor pool and spa" },
    cover: "/azure/p1-9.jpg",
    thumb: "/azure/p1-7.jpg",
    logo: "/logos/perla.png",
    cta: { tr: "Detaylara bak", en: "View details" },
  },
  {
    slug: "la-joya",
    name: "La Joya",
    short: { tr: "Long Beach · 2025", en: "Long Beach · 2025" },
    location: { tr: "Long Beach, İskele · Denize 500 m", en: "Long Beach, İskele · 500 m to the sea" },
    status: { tr: "Tamamlandı · 2025", en: "Completed · 2025" },
    blurb: { tr: "Yatay mimari, 74 konut, loft ve penthouse", en: "Low-rise architecture, 74 homes, lofts and penthouses" },
    cover: "/azure/lj-5.jpg",
    thumb: "/azure/lj-5.jpg",
    logo: "/logos/lajoya.png",
    cta: { tr: "Detaylara bak", en: "View details" },
  },
  {
    slug: "mariachi",
    name: "Mariachi Beach Club",
    short: { tr: "Platin Ödül", en: "Platinum Award" },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele" },
    status: { tr: "Beach Club", en: "Beach Club" },
    award: { tr: "Platin Ödül", en: "Platinum Award" },
    blurb: { tr: "Plaj, 4 jakuzili havuz, pavilyonlar, DJ", en: "Beach, pool with 4 jacuzzis, pavilions, DJ" },
    cover: "/azure/mb-2.jpg",
    thumb: "/azure/mb-1.jpg",
    logo: "/logos/mariachi.png",
    cta: { tr: "Pavilyon rezervasyonu", en: "Book a pavilion" },
  },
  {
    slug: "gecitkale",
    name: "Geçitkale",
    short: { tr: "Arazi · Yakında", en: "Land · Coming soon" },
    location: { tr: "Geçitkale", en: "Geçitkale" },
    status: { tr: "Yakında", en: "Coming soon" },
    blurb: { tr: "Ada'nın iç kesiminde yeni bir yatırım bölgesi.", en: "A new investment zone in the island's interior." },
    cover: "/gecitkaleimage.jpg",
    thumb: "/gecitkale/gecitkale-1.jpg",
    cta: { tr: "Ön kayıt", en: "Pre-register" },
  },
];

export const projectBySlug = (slug: ProjectSlug) => PROJECTS.find((p) => p.slug === slug)!;

export const href = (locale: Locale, path: string) => `/${locale}${path === "/" ? "" : path}`;

export const NAV_COPY = {
  tr: {
    projects: "Projeler", all: "Tüm Projeler", allSub: "6 proje", about: "Hakkımızda", team: "Ekibimiz",
    press: "Haberler", blog: "Yazılar", media: "Medya Merkezi", contact: "İletişim", cta: "Bilgi Al",
    menu: "Menü", close: "Menüyü kapat", home: "Ana Sayfa", lang: "Dil",
  },
  en: {
    projects: "Projects", all: "All Projects", allSub: "6 projects", about: "About Us", team: "Our Team",
    press: "News", blog: "Blog", media: "Media Center", contact: "Contact", cta: "Enquire",
    menu: "Menu", close: "Close menu", home: "Home", lang: "Language",
  },
} as const;

export const FOOTER_COPY = {
  tr: {
    tagline: "Güvenilir, şeffaf ve sürdürülebilir çözümler.",
    projects: "Projeler", general: "Genel", social: "Sosyal",
    rights: "Tüm hakları saklıdır.", privacy: "Gizlilik", terms: "Şartlar", cookies: "Çerez tercihleri",
  },
  en: {
    tagline: "Reliable, transparent and sustainable solutions.",
    projects: "Projects", general: "General", social: "Social",
    rights: "All rights reserved.", privacy: "Privacy", terms: "Terms", cookies: "Cookie preferences",
  },
} as const;
