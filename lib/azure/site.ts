// Azure tasarımı için site geneli veri: projeler, menü, iletişim, sosyal.
// İçerik mevcut sitedeki bileşenlerden (Header/Footer/ProjectsStrip/Perla2Hero) taşındı.

export type Locale = "tr" | "en" | "de" | "ru" | "pl";

/** Site dilleri (sıra: dil menüsü ve hreflang sırası). "tr" varsayılan, "en" x-default. */
export const LOCALES = ["tr", "en", "de", "ru", "pl"] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_META: Record<Locale, { name: string; short: string; og: string; blog: boolean }> = {
  tr: { name: "Türkçe", short: "TR", og: "tr_TR", blog: true },
  en: { name: "English", short: "EN", og: "en_GB", blog: true },
  de: { name: "Deutsch", short: "DE", og: "de_DE", blog: true },
  ru: { name: "Русский", short: "RU", og: "ru_RU", blog: true },
  pl: { name: "Polski", short: "PL", og: "pl_PL", blog: true },
};
export const isLocale = (v: unknown): v is Locale => typeof v === "string" && (LOCALES as readonly string[]).includes(v);
/** Yoldan dili ayıkla: "/de/about" → "de"; dil öneki yoksa "tr" */
export const localeFromPathname = (pathname: string): Locale => {
  const m = /^\/([a-z]{2})(?=\/|$)/i.exec(pathname);
  return m && isLocale(m[1].toLowerCase()) ? (m[1].toLowerCase() as Locale) : DEFAULT_LOCALE;
};
/** Dil önekini at: "/de/about" → "/about", "/en" → "/" */
export const stripLocale = (pathname: string) => pathname.replace(/^\/(tr|en|de|ru|pl)(?=\/|$)/i, "").replace(/\/+$/, "") || "/";

export const CONTACT = {
  phone: "+90 392 444 03 63",
  phoneHref: "tel:+903924440363",
  mobile: "+90 548 888 03 63",
  whatsapp: "905488880363",
  email: "info@dndcyprus.com",
  hq: {
    tr: "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Gazimağusa, Kıbrıs, 99450",
    en: "Alasya Park Sitesi 2nd Stage, Shop No: 2/3, Gazi Mustafa Kemal Boulevard, Sakarya, Famagusta, Cyprus, 99450",
    de: "Alasya Park Sitesi 2. Bauabschnitt, Laden Nr. 2/3, Gazi Mustafa Kemal Boulevard, Sakarya, Famagusta, Zypern, 99450",
    ru: "Alasya Park Sitesi, 2-я очередь, магазин № 2/3, бульвар Gazi Mustafa Kemal, Sakarya, Фамагуста, Кипр, 99450",
    pl: "Alasya Park Sitesi, II etap, lokal nr 2/3, bulwar Gazi Mustafa Kemal, Sakarya, Famagusta, Cypr, 99450",
  },
  hours: { tr: "Hafta içi 08:30–17:30, Cumartesi 08:30–13:00", en: "Weekdays 08:30–17:30, Saturday 08:30–13:00", de: "Montag bis Freitag 08:30–17:30, Samstag 08:30–13:00", ru: "По будням 08:30–17:30, в субботу 08:30–13:00", pl: "Poniedziałek–piątek 08:30–17:30, sobota 08:30–13:00" },
  sales: { tr: "Sahil Yolu 45, İskele, Kuzey Kıbrıs", en: "Sahil Yolu 45, İskele, North Cyprus", de: "Sahil Yolu 45, İskele, Nordzypern", ru: "Sahil Yolu 45, Искеле, Северный Кипр", pl: "Sahil Yolu 45, İskele, Cypr Północny" },
  hqMap: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
  salesMap: "https://maps.app.goo.gl/V2ainR6Rs2JkLaN27",
};

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/dndcyprus/" },
  { label: "LinkedIn", href: "https://cy.linkedin.com/company/dndcyprus" },
  { label: "Facebook", href: "https://www.facebook.com/dndcyprus/" },
  { label: "YouTube", href: "https://www.youtube.com/@dndcyprus" },
];

export type ProjectSlug = "neocity" | "lagoon-verde" | "perla-ii" | "perla" | "la-joya" | "mariachi" | "gecitkale";

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
    slug: "neocity",
    name: "NeoCity",
    short: { tr: "Tuzla · Yeni proje", en: "Tuzla · New project", de: "Tuzla · Neues Projekt", ru: "Тузла · Новый проект", pl: "Tuzla · Nowy projekt" },
    location: { tr: "Tuzla, Gazimağusa", en: "Tuzla, Famagusta", de: "Tuzla, Famagusta", ru: "Тузла, Фамагуста", pl: "Tuzla, Famagusta" },
    status: { tr: "Yeni proje", en: "New project", de: "Neues Projekt", ru: "Новый проект", pl: "Nowy projekt" },
    blurb: { tr: "54 villa · Tek ve ikiz villa, özel bahçe", en: "54 villas · Single and twin villas, private gardens", de: "54 Villen · Freistehend und Doppelvilla, Privatgärten", ru: "54 виллы · Отдельные и дуплекс-виллы, частные сады", pl: "54 wille · Wolnostojące i bliźniacze, prywatne ogrody" },
    cover: "/neocity/hero.jpg",
    thumb: "/neocity/g-02.jpg",
    logo: "/logos/web/neocity.webp",
    cta: { tr: "Detaylara bak", en: "View details", de: "Details ansehen", ru: "Подробнее", pl: "Zobacz szczegóły" },
  },
  {
    slug: "lagoon-verde",
    name: "Lagoon Verde",
    short: { tr: "İskele · Altın Ödül", en: "İskele · Gold Award", de: "İskele · Goldpreis", ru: "Искеле · Золотая награда", pl: "İskele · Złota Nagroda" },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele", de: "Bahçeler, İskele", ru: "Bahçeler, Искеле", pl: "Bahçeler, İskele" },
    status: { tr: "Devam eden", en: "Ongoing", de: "Im Bau", ru: "Строится", pl: "W budowie" },
    award: { tr: "Altın Ödül", en: "Gold Award", de: "Goldpreis", ru: "Золотая награда", pl: "Złota Nagroda" },
    blurb: { tr: "354 rezidans · Teslim Aralık 2028", en: "354 residences · Delivery December 2028", de: "354 Residenzen · Übergabe: Dezember 2028", ru: "354 резиденции · Сдача: декабрь 2028", pl: "354 apartamenty · Oddanie: grudzień 2028" },
    cover: "/azure/lv-7.jpg",
    thumb: "/azure/lv-5.jpg",
    logo: "/logos/web/lagoon.webp",
    cta: { tr: "Detaylara bak", en: "View details", de: "Details ansehen", ru: "Подробнее", pl: "Zobacz szczegóły" },
  },
  {
    slug: "la-joya",
    name: "La Joya",
    short: { tr: "Long Beach · 2025", en: "Long Beach · 2025", de: "Long Beach · 2025", ru: "Long Beach · 2025", pl: "Long Beach · 2025" },
    location: { tr: "Long Beach, İskele · Denize 500 m", en: "Long Beach, İskele · 500 m to the sea", de: "Long Beach, İskele · 500 m zum Meer", ru: "Long Beach, Искеле · 500 m до моря", pl: "Long Beach, İskele · 500 m od morza" },
    status: { tr: "Tamamlandı · 2025", en: "Completed · 2025", de: "Fertiggestellt · 2025", ru: "Завершён · 2025", pl: "Ukończony · 2025" },
    blurb: { tr: "Yatay mimari, 74 konut, loft ve penthouse", en: "Low-rise architecture, 74 homes, lofts and penthouses", de: "Flache Bauweise, 74 Wohnungen, Lofts und Penthouses", ru: "Малоэтажная архитектура, 74 квартиры, лофты и пентхаусы", pl: "Niska zabudowa, 74 mieszkania, lofty i penthouse’y" },
    cover: "/azure/lj-5.jpg",
    thumb: "/azure/lj-5.jpg",
    logo: "/logos/web/lajoya.webp",
    cta: { tr: "Detaylara bak", en: "View details", de: "Details ansehen", ru: "Подробнее", pl: "Zobacz szczegóły" },
  },
  {
    slug: "perla",
    name: "La Joya Perla",
    short: { tr: "İskele · Devam eden", en: "İskele · Ongoing", de: "İskele · Im Bau", ru: "Искеле · Строится", pl: "İskele · W budowie" },
    location: { tr: "Bahçeler, İskele · Denize 700 m", en: "Bahçeler, İskele · 700 m to the sea", de: "Bahçeler, İskele · 700 m zum Meer", ru: "Bahçeler, Искеле · 700 m до моря", pl: "Bahçeler, İskele · 700 m od morza" },
    status: { tr: "Devam eden", en: "Ongoing", de: "Im Bau", ru: "Строится", pl: "W budowie" },
    blurb: { tr: "Sand pool, kapalı havuz ve spa", en: "Sand pool, indoor pool and spa", de: "Sand pool, Hallenbad und Spa", ru: "Sand pool, крытый бассейн и спа", pl: "Sand pool, kryty basen i spa" },
    cover: "/azure/p1-9.jpg",
    thumb: "/azure/p1-7.jpg",
    logo: "/logos/web/perla.webp",
    cta: { tr: "Detaylara bak", en: "View details", de: "Details ansehen", ru: "Подробнее", pl: "Zobacz szczegóły" },
  },
  {
    slug: "perla-ii",
    name: "La Joya Perla II",
    short: { tr: "İskele · Devam eden", en: "İskele · Ongoing", de: "İskele · Im Bau", ru: "Искеле · Строится", pl: "İskele · W budowie" },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele", de: "Bahçeler, İskele", ru: "Bahçeler, Искеле", pl: "Bahçeler, İskele" },
    status: { tr: "Devam eden", en: "Ongoing", de: "Im Bau", ru: "Строится", pl: "W budowie" },
    blurb: { tr: "Stüdyo, 1+1 loft, çatı teraslı veya bahçeli 2+1", en: "Studio, 1+1 loft, 2+1 with roof terrace or garden", de: "Studio, 1+1 Loft, 2+1 mit Dachterrasse oder Garten", ru: "Студия, лофт 1+1, 2+1 с террасой на крыше или садом", pl: "Studio, loft 1+1, 2+1 z tarasem na dachu lub ogrodem" },
    cover: "/azure/p2-9.jpg",
    thumb: "/azure/p2-2.jpg",
    logo: "/logos/web/perlaii.webp",
    cta: { tr: "Detaylara bak", en: "View details", de: "Details ansehen", ru: "Подробнее", pl: "Zobacz szczegóły" },
  },
  {
    slug: "mariachi",
    name: "Mariachi Beach Club",
    short: { tr: "Platin Ödül", en: "Platinum Award", de: "Platinpreis", ru: "Платиновая награда", pl: "Platynowa Nagroda" },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele", de: "Bahçeler, İskele", ru: "Bahçeler, Искеле", pl: "Bahçeler, İskele" },
    status: { tr: "Beach Club", en: "Beach Club", de: "Beach Club", ru: "Пляжный клуб", pl: "Beach Club" },
    award: { tr: "Platin Ödül", en: "Platinum Award", de: "Platinpreis", ru: "Платиновая награда", pl: "Platynowa Nagroda" },
    blurb: { tr: "Plaj, 4 jakuzili havuz, pavilyonlar, DJ", en: "Beach, pool with 4 jacuzzis, pavilions, DJ", de: "Strand, Pool mit 4 Whirlpools, Pavillons, DJ", ru: "Пляж, бассейн с 4 джакузи, павильоны, DJ", pl: "Plaża, basen z 4 jacuzzi, pawilony, DJ" },
    cover: "/azure/mb-2.jpg",
    thumb: "/azure/mb-1.jpg",
    logo: "/logos/web/mariachi.webp",
    cta: { tr: "Pavilyon rezervasyonu", en: "Book a pavilion", de: "Pavillon reservieren", ru: "Забронировать павильон", pl: "Zarezerwuj pawilon" },
  },
  {
    slug: "gecitkale",
    name: "Geçitkale",
    short: { tr: "Arazi · Yakında", en: "Land · Coming soon", de: "Grundstück · Demnächst", ru: "Участок · Скоро", pl: "Działka · Wkrótce" },
    location: { tr: "Geçitkale", en: "Geçitkale", de: "Geçitkale", ru: "Гечиткале", pl: "Geçitkale" },
    status: { tr: "Yakında", en: "Coming soon", de: "Demnächst", ru: "Скоро", pl: "Wkrótce" },
    blurb: { tr: "Ada'nın iç kesiminde yeni bir yatırım bölgesi.", en: "A new investment zone in the island's interior.", de: "Eine neue Investitionsregion im Landesinneren der Insel.", ru: "Новая инвестиционная зона в глубине острова.", pl: "Nowa strefa inwestycyjna w głębi wyspy." },
    cover: "/gecitkaleimage.jpg",
    thumb: "/gecitkale/gecitkale-1.jpg",
    cta: { tr: "Ön kayıt", en: "Pre-register", de: "Vorab registrieren", ru: "Предварительная запись", pl: "Wstępna rejestracja" },
  },
];

export const projectBySlug = (slug: ProjectSlug) => PROJECTS.find((p) => p.slug === slug)!;

export const href = (locale: Locale, path: string) => `/${locale}${path === "/" ? "" : path}`;

export const NAV_COPY = {
  tr: {
    projects: "Projeler", all: "Tüm Projeler", allSub: "7 proje", about: "Hakkımızda", team: "Ekibimiz",
    press: "Haberler", blog: "Yazılar", media: "Medya Merkezi", contact: "İletişim", cta: "Bilgi Al",
    menu: "Menü", close: "Menüyü kapat", home: "Ana Sayfa", lang: "Dil",
  },
  en: {
    projects: "Projects", all: "All Projects", allSub: "7 projects", about: "About Us", team: "Our Team",
    press: "News", blog: "Blog", media: "Media Center", contact: "Contact", cta: "Enquire",
    menu: "Menu", close: "Close menu", home: "Home", lang: "Language",
  },
  de: {
    projects: "Projekte", all: "Alle Projekte", allSub: "7 Projekte", about: "Über uns", team: "Unser Team",
    press: "Aktuelles", blog: "Blog", media: "Mediencenter", contact: "Kontakt", cta: "Anfragen",
    menu: "Menü", close: "Menü schließen", home: "Startseite", lang: "Sprache",
  },
  ru: {
    projects: "Проекты", all: "Все проекты", allSub: "7 проектов", about: "О компании", team: "Наша команда",
    press: "Новости", blog: "Блог", media: "Медиацентр", contact: "Контакты", cta: "Узнать больше",
    menu: "Меню", close: "Закрыть меню", home: "Главная", lang: "Язык",
  },
  pl: {
    projects: "Projekty", all: "Wszystkie projekty", allSub: "7 projektów", about: "O nas", team: "Nasz zespół",
    press: "Aktualności", blog: "Blog", media: "Centrum medialne", contact: "Kontakt", cta: "Zapytaj",
    menu: "Menu", close: "Zamknij menu", home: "Strona główna", lang: "Język",
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
  de: {
    tagline: "Zuverlässige, transparente und nachhaltige Lösungen.",
    projects: "Projekte", general: "Allgemein", social: "Social Media",
    rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz", terms: "Nutzungsbedingungen", cookies: "Cookie-Einstellungen",
  },
  ru: {
    tagline: "Надёжные, прозрачные и устойчивые решения.",
    projects: "Проекты", general: "Общее", social: "Соцсети",
    rights: "Все права защищены.", privacy: "Конфиденциальность", terms: "Условия", cookies: "Настройки cookie",
  },
  pl: {
    tagline: "Niezawodne, przejrzyste i zrównoważone rozwiązania.",
    projects: "Projekty", general: "Ogólne", social: "Social media",
    rights: "Wszelkie prawa zastrzeżone.", privacy: "Prywatność", terms: "Regulamin", cookies: "Ustawienia plików cookie",
  },
} as const;
