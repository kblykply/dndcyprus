// Üst menü (Ekim 2026, müşterinin "DND Cyprus web sitesi akış" belgesi): 7 başlık ve alt başlıkları.
// Alt başlık bir sayfanın bölümüne (#id) bağlanır. Satış sonrası, kira geliri ve etkinlik metinleri genel ve rakamsız
// (müşteriden ayrıntı bekleniyor); kampanyalar sitede yayımlanmış ödeme modelleri.
import type { Locale, ProjectSlug } from "./site";

export type NavLink = { label: string; path: string; hash?: string; external?: string };
export type NavItem = { key: string; label: string; path: string; children: NavLink[] };

/** Projeler mega menüsü: durum grupları (/projects sayfasındaki filtrelerle aynı) */
export const PROJECT_GROUPS: { key: "ongoing" | "completed" | "upcoming"; slugs: ProjectSlug[] }[] = [
  { key: "ongoing", slugs: ["neocity", "lagoon-verde", "perla", "perla-ii"] },
  { key: "completed", slugs: ["la-joya"] },
  { key: "upcoming", slugs: ["mariachi", "gecitkale"] },
];

/** /projects#… filtre çapaları (ProjectsFilters adresteki çapayla açılır) */
export const PROJECT_HASH: Record<Locale, Record<"ongoing" | "completed" | "upcoming", string>> = {
  tr: { ongoing: "devam-eden", completed: "tamamlanan", upcoming: "gelecek" },
  en: { ongoing: "ongoing", completed: "completed", upcoming: "upcoming" },
  de: { ongoing: "laufend", completed: "abgeschlossen", upcoming: "kommend" },
  ru: { ongoing: "tekushchie", completed: "zavershennye", upcoming: "budushchie" },
  pl: { ongoing: "w-realizacji", completed: "ukonczone", upcoming: "przyszle" },
};

/** Yeni sayfaların ve Hakkımızda / İletişim bölümlerinin çapaları */
export const SECTION_IDS: Record<Locale, {
  quality: string; social: string; aftersales: string; perks: string; tl: string; campaigns: string; rental: string; events: string;
  story: string; founders: string; usa: string; numbers: string; awards: string; offices: string; form: string;
}> = {
  tr: { quality: "insaat-kalitesi", social: "sosyal-yasam", aftersales: "satis-sonrasi", perks: "ev-sahibi-ayricaliklari", tl: "tl-odeme-modeli", campaigns: "kampanyalar", rental: "kira-geliri", events: "etkinlikler", story: "timeline", founders: "kurucu", usa: "dnd-homes-amerika", numbers: "rakamlar", awards: "oduller", offices: "satis-ofisleri", form: "form" },
  en: { quality: "construction-quality", social: "social-life", aftersales: "after-sales", perks: "homeowner-privileges", tl: "lira-payment-model", campaigns: "campaigns", rental: "rental-income", events: "events", story: "timeline", founders: "founder", usa: "dnd-homes-usa", numbers: "numbers", awards: "oduller", offices: "sales-offices", form: "form" },
  de: { quality: "bauqualitaet", social: "gemeinschaft", aftersales: "kundendienst", perks: "eigentuemer-vorteile", tl: "lira-zahlungsmodell", campaigns: "aktionen", rental: "mieteinnahmen", events: "veranstaltungen", story: "timeline", founders: "founder", usa: "dnd-homes-usa", numbers: "zahlen", awards: "oduller", offices: "verkaufsbueros", form: "form" },
  ru: { quality: "kachestvo", social: "obshchestvennaya-zhizn", aftersales: "servis", perks: "privilegii", tl: "oplata-v-lirakh", campaigns: "aktsii", rental: "arendnyy-dokhod", events: "meropriyatiya", story: "timeline", founders: "founder", usa: "dnd-homes-usa", numbers: "v-tsifrakh", awards: "oduller", offices: "ofisy-prodazh", form: "form" },
  pl: { quality: "jakosc-budowy", social: "zycie-spoleczne", aftersales: "obsluga-posprzedazowa", perks: "przywileje", tl: "platnosc-w-lirach", campaigns: "promocje", rental: "dochod-z-najmu", events: "wydarzenia", story: "timeline", founders: "founder", usa: "dnd-homes-usa", numbers: "w-liczbach", awards: "oduller", offices: "biura-sprzedazy", form: "form" },
};

type Copy = {
  home: string; projects: string; groups: Record<"ongoing" | "completed" | "upcoming", string>; allProjects: string;
  advantage: string; quality: string; social: string; aftersales: string; perks: string;
  payment: string; paymentShort: string; tl: string; campaigns: string; rental: string; events: string;
  about: string; story: string; founders: string; usa: string; numbers: string; awards: string;
  news: string; dndNews: string; press: string;
  contact: string; offices: string; form: string; whatsapp: string;
};

export const NAV_TEXT: Record<Locale, Copy> = {
  tr: {
    home: "Ana Sayfa", projects: "Projelerimiz", groups: { ongoing: "Devam Eden Projeler", completed: "Tamamlanan Projeler", upcoming: "Gelecek Projeler" }, allProjects: "Tüm Projeler",
    advantage: "DND Ayrıcalığı", quality: "İnşaat Kalitesi ve Mimari", social: "Sosyal Yaşam ve Tesisler", aftersales: "Satış Sonrası Hizmetler", perks: "DND Ev Sahibi Ayrıcalıkları",
    payment: "Ödeme ve Yatırım Fırsatları", paymentShort: "Ödeme ve Yatırım", tl: "TL Ödeme Modeli", campaigns: "Güncel Kampanyalar", rental: "Yatırım ve Kira Geliri", events: "Etkinlikler",
    about: "Hakkımızda", story: "Hikâyemiz", founders: "Kurucularımız ve Yönetimimiz", usa: "DND Homes Amerika", numbers: "Rakamlarla DND", awards: "Ödüllerimiz",
    news: "Haberler", dndNews: "DND’den Haberler", press: "Basında DND",
    contact: "İletişim", offices: "Satış Ofislerimiz", form: "İletişim Formu", whatsapp: "WhatsApp",
  },
  en: {
    home: "Home", projects: "Our Projects", groups: { ongoing: "Ongoing Projects", completed: "Completed Projects", upcoming: "Upcoming Projects" }, allProjects: "All Projects",
    advantage: "The DND Advantage", quality: "Construction Quality & Architecture", social: "Social Life & Facilities", aftersales: "After-Sales Services", perks: "DND Homeowner Privileges",
    payment: "Payment & Investment", paymentShort: "Payment & Investment", tl: "Lira Payment Model", campaigns: "Current Campaigns", rental: "Investment & Rental Income", events: "Events",
    about: "About Us", story: "Our Story", founders: "Founders & Management", usa: "DND Homes USA", numbers: "DND in Numbers", awards: "Our Awards",
    news: "News", dndNews: "News from DND", press: "DND in the Press",
    contact: "Contact", offices: "Sales Offices", form: "Contact Form", whatsapp: "WhatsApp",
  },
  de: {
    home: "Startseite", projects: "Unsere Projekte", groups: { ongoing: "Laufende Projekte", completed: "Abgeschlossene Projekte", upcoming: "Kommende Projekte" }, allProjects: "Alle Projekte",
    advantage: "Der DND-Vorteil", quality: "Bauqualität & Architektur", social: "Gemeinschaft & Einrichtungen", aftersales: "Kundendienst nach dem Kauf", perks: "Vorteile für DND-Eigentümer",
    payment: "Zahlung & Investition", paymentShort: "Zahlung & Investition", tl: "Lira-Zahlungsmodell", campaigns: "Aktuelle Aktionen", rental: "Investition & Mieteinnahmen", events: "Veranstaltungen",
    about: "Über uns", story: "Unsere Geschichte", founders: "Gründer & Management", usa: "DND Homes USA", numbers: "DND in Zahlen", awards: "Unsere Auszeichnungen",
    news: "Aktuelles", dndNews: "Neues von DND", press: "DND in der Presse",
    contact: "Kontakt", offices: "Verkaufsbüros", form: "Kontaktformular", whatsapp: "WhatsApp",
  },
  ru: {
    home: "Главная", projects: "Наши проекты", groups: { ongoing: "Текущие проекты", completed: "Завершённые проекты", upcoming: "Будущие проекты" }, allProjects: "Все проекты",
    advantage: "Преимущества DND", quality: "Качество строительства и архитектура", social: "Общественная жизнь и инфраструктура", aftersales: "Послепродажный сервис", perks: "Привилегии владельцев DND",
    payment: "Оплата и инвестиции", paymentShort: "Оплата и инвестиции", tl: "Оплата в лирах", campaigns: "Актуальные акции", rental: "Инвестиции и арендный доход", events: "Мероприятия",
    about: "О компании", story: "Наша история", founders: "Основатели и руководство", usa: "DND Homes США", numbers: "DND в цифрах", awards: "Наши награды",
    news: "Новости", dndNews: "Новости DND", press: "DND в прессе",
    contact: "Контакты", offices: "Офисы продаж", form: "Форма обратной связи", whatsapp: "WhatsApp",
  },
  pl: {
    home: "Strona główna", projects: "Nasze projekty", groups: { ongoing: "Projekty w realizacji", completed: "Projekty ukończone", upcoming: "Projekty przyszłe" }, allProjects: "Wszystkie projekty",
    advantage: "Przewaga DND", quality: "Jakość budowy i architektura", social: "Życie społeczne i udogodnienia", aftersales: "Obsługa posprzedażowa", perks: "Przywileje właścicieli DND",
    payment: "Płatności i inwestycje", paymentShort: "Płatności i inwestycje", tl: "Płatność w lirach", campaigns: "Aktualne promocje", rental: "Inwestycje i dochód z najmu", events: "Wydarzenia",
    about: "O nas", story: "Nasza historia", founders: "Założyciele i zarząd", usa: "DND Homes USA", numbers: "DND w liczbach", awards: "Nasze nagrody",
    news: "Aktualności", dndNews: "Wiadomości od DND", press: "DND w prasie",
    contact: "Kontakt", offices: "Biura sprzedaży", form: "Formularz kontaktowy", whatsapp: "WhatsApp",
  },
};

/**
 * Menü başlıkları (projeler hariç; projeler mega menüsü PROJECT_GROUPS'tan). Akış belgesine göre (Ekim 2026) yalnız
 * Projelerimiz açılır menü; diğer başlıklar doğrudan sayfaya gider, belgedeki "alt sayfalar" o sayfanın bölümleridir
 * (bağlantıları SECTION_IDS'te: ör. /advantage#satis-sonrasi).
 */
export function navItems(locale: Locale): NavItem[] {
  const t = NAV_TEXT[locale];
  return [
    { key: "advantage", label: t.advantage, path: "/advantage", children: [] },
    { key: "payment", label: t.payment, path: "/payment-plans", children: [] },
    { key: "about", label: t.about, path: "/about", children: [] },
    { key: "news", label: t.news, path: "/press", children: [] },
    { key: "contact", label: t.contact, path: "/contact", children: [] },
  ];
}
