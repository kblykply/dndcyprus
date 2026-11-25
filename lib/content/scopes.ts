// lib/content/scopes.ts
// Panelden düzenlenen sayfa metinleri: her "kapsam" koddaki içerikten bir nesne kurar; bölüm adları panelde görünür.
// Yalnız sitede gerçekten kullanılan alanlar alınır (ana sayfada görünmeyen eski bölümler listelenmez).
// hide: panelde gösterilmeyen teknik alanlar (yol öneki; "*" tek bir yol parçasına uyar).
import { HOME } from "@/lib/azure/home";
import { HOME_FLOW } from "@/lib/azure/home-flow";
import { PAGES } from "@/lib/azure/pages";
import { PROJECT_PAGES, type ProjectPage } from "@/lib/azure/projects";
import { PROJECT_DATA } from "@/lib/azure/projects/index";
import { CONTACT, FOOTER_COPY } from "@/lib/azure/site";
import { TIMELINE_ABOUT_HEAD, TIMELINE_MAP } from "@/lib/azure/timeline";
import { PAGE_DEFAULTS } from "./defaults/pages";
import { MARIACHI_DEFAULTS } from "./defaults/mariachi";
import type { ContentLocale } from "./core";

export type ScopeGroup = "sayfa" | "proje";

export type ScopeDef = {
  label: string;
  group: ScopeGroup;
  /** Sitede bu içeriğin göründüğü adresler (kaydedince yenilenir) */
  routes: (l: ContentLocale) => string[];
  /** true: içerik her sayfada (alt bilgi) → kaydedince tüm site yenilenir */
  siteWide?: boolean;
  /** Bölüm anahtarı → panelde görünen ad (sıra sitedeki sırayla aynı) */
  sections: [key: string, label: string][];
  hide?: string[];
  /** dilden bağımsız bölümler: bir dilde kaydedilen değer 5 dile birden yazılır (telefon, e-posta) */
  shared?: string[];
  build: (l: ContentLocale) => Record<string, unknown>;
  /** panel değişiklikleri uygulandıktan sonra bölümler arası eşitleme (ör. ofis kartındaki telefon = site telefonu) */
  finalize?: (c: Record<string, unknown>) => Record<string, unknown>;
};

function buildHome(l: ContentLocale) {
  const f = HOME_FLOW[l];
  const h = HOME[l];
  return {
    vitrin: f.hero,
    projeler: h.projects,
    neden: f.why,
    odeme: f.offers,
    yasam: f.life,
    gun: h.story,
    rakamlar: f.numbers,
    oduller: { kicker: f.news.kicker, awardsProject: f.news.awardsProject, homesProject: f.news.homesProject, strip: h.awards, kartlar: h.bento.awards },
    basin: h.press,
    sss: h.faq,
    iletisim: { ...f.contact, highlights: h.contact.highlights },
  };
}
export type HomeScopeContent = ReturnType<typeof buildHome>;

function buildAbout(l: ContentLocale) {
  const d = PAGE_DEFAULTS[l].hakkimizda;
  const a = PAGES[l].about;
  const h = HOME[l];
  const { from, to, dist } = TIMELINE_MAP[l];
  return {
    hero: d.hero,
    kim: d.kim,
    dndHomes: d.dndHomes,
    ozan: { ...h.leadership.people[0], career: h.leadership.career },
    partner: a.partner,
    aynur: h.leadership.people[1],
    usa: a.usa,
    zaman: { ...TIMELINE_ABOUT_HEAD[l], items: h.timeline.items, harita: { from, to, dist } },
    rakamlar: { title: a.numbersTitle, usa: a.numbersUsa },
    misyon: d.misyon,
    neden: d.neden,
    cagri: d.cagri,
  };
}

function buildAdvantage(l: ContentLocale) {
  const t = PAGES[l].advantage;
  return { hero: { ...t.hero, ...PAGE_DEFAULTS[l].ayricalik.hero }, quality: t.quality, social: t.social, after: t.after, extra: t.extra };
}

function buildPayment(l: ContentLocale) {
  const t = PAGES[l].payment;
  return { hero: { ...t.hero, ...PAGE_DEFAULTS[l].odeme.hero }, campaigns: t.campaigns, rental: t.rental, sss: { faqTitle: t.faqTitle, faqLead: t.faqLead } };
}

function buildNews(l: ContentLocale) {
  const p = PAGES[l];
  const { kicker, title, lead, follow } = p.events;
  return { hero: PAGE_DEFAULTS[l].haberler.hero, blog: p.news.blog, basin: p.news.press, etkinlik: { kicker, title, lead, follow } };
}

function buildContact(l: ContentLocale) {
  const d = PAGE_DEFAULTS[l].iletisim;
  return {
    hero: d.hero,
    bilgi: d.bilgi,
    form: d.form,
    telefon: { phone: CONTACT.phone, mobile: CONTACT.mobile, whatsapp: CONTACT.whatsapp, email: CONTACT.email },
    altbilgi: { tagline: FOOTER_COPY[l].tagline as string, address: CONTACT.hq[l], hours: CONTACT.hours[l] },
  };
}

type Office = { id?: string; phone?: string; phoneDisplay?: string; email?: string; whatsapp?: string };
/** Merkez ofis kartı site telefonunu, e-postasını ve WhatsApp'ı kullanır (iki yerden ayrı ayrı düzenlenmesin) */
function syncContact(c: Record<string, unknown>) {
  const t = c.telefon as { phone: string; mobile: string; whatsapp: string; email: string };
  const bilgi = c.bilgi as { offices?: Office[] } | undefined;
  for (const o of bilgi?.offices ?? []) {
    if (o.id !== "hq") continue;
    o.phone = t.phone;
    o.phoneDisplay = t.phone;
    o.email = `mailto:${t.email}`;
    o.whatsapp = `https://wa.me/${t.whatsapp.replace(/\D/g, "")}`;
  }
  return c;
}

/* ---------------- Proje sayfaları ---------------- */

export const PROJECT_SECTIONS: [key: string, label: string][] = [
  ["ust", "Sayfa başı ve teklif formu"],
  ["gallery", "Galeri"],
  ["overview", "Genel bakış"],
  ["facts", "Öne çıkan bilgiler"],
  ["sitePlan", "Vaziyet planı"],
  ["tech", "Teknik donanım"],
  ["interiors", "İç mekân"],
  ["floorPlans", "Kat planları"],
  ["payment", "Ödeme modeli"],
  ["amenities", "Olanaklar"],
  ["tour", "360° tur"],
  ["location", "Konum"],
  ["update", "Son güncelleme"],
];

function buildProject(slug: ProjectPage["slug"], l: ContentLocale) {
  const p = PROJECT_PAGES[slug];
  const d = PROJECT_DATA[slug][l];
  return {
    ...d,
    ust: {
      tagline: p.tagline[l],
      status: p.status[l],
      location: p.location[l],
      delivery: p.delivery[l],
      award: p.award?.[l],
      chips: p.chips[l],
      image: p.image,
      ctaImage: p.ctaImage,
      ctaLead: p.ctaLead[l],
      highlights: p.highlights[l],
      unitTypes: p.unitTypes[l],
    },
  };
}
export type ProjectScopeContent = ReturnType<typeof buildProject>;

function projectScope(slug: ProjectPage["slug"]): ScopeDef {
  const has = buildProject(slug, "tr") as Record<string, unknown>;
  return {
    label: PROJECT_PAGES[slug].name,
    group: "proje",
    // DND Ayrıcalığı ve Ödeme sayfaları proje bölümlerini (teknik donanım, olanaklar, 5 Sıfır) yeniden kullanır
    routes: (l) => [`/${l}/${slug}`, `/${l}/advantage`, `/${l}/payment-plans`],
    sections: PROJECT_SECTIONS.filter(([k]) => has[k] && typeof has[k] === "object"),
    hide: [
      "facts.jsonLd",
      "tour.src",
      "location.embedSrc",
      "location.lat",
      "location.lng",
      "location.mapQuery",
      "update.video.type",
      "floorPlans.plans.*.variants.*.pdf",
    ],
    build: (l) => buildProject(slug, l),
  };
}

export const SCOPES = {
  anasayfa: {
    label: "Ana sayfa",
    group: "sayfa",
    routes: (l) => [`/${l}`],
    sections: [
      ["vitrin", "Vitrin (kayan proje yazıları)"],
      ["projeler", "Projelerimiz başlığı"],
      ["neden", "Neden DND Cyprus"],
      ["odeme", "Ödeme ve yatırım fırsatları"],
      ["yasam", "Yaşam ve ayrıcalıklar"],
      ["gun", "Lagoon Verde'de bir gün"],
      ["rakamlar", "Rakamlarla DND"],
      ["oduller", "Haberler ve ödüller"],
      ["basin", "Basın başlığı"],
      ["sss", "Sıkça sorulan sorular"],
      ["iletisim", "İletişim bölümü"],
    ],
    build: buildHome,
  },
  hakkimizda: {
    label: "Hakkımızda",
    group: "sayfa",
    routes: (l) => [`/${l}/about`],
    sections: [
      ["hero", "Sayfa başı"],
      ["kim", "Biz kimiz (tanıtım videosu)"],
      ["dndHomes", "DND Homes videosu"],
      ["ozan", "Kurucu (Ozan Dökmecioğlu)"],
      ["partner", "Kurucu ortak (Netice Dökmecioğlu)"],
      ["aynur", "Direktör (Aynur Zorba Gülol)"],
      ["zaman", "Zaman çizelgesi (Yolculuğumuz)"],
      ["usa", "DND Homes Amerika"],
      ["rakamlar", "Rakamlar başlığı"],
      ["misyon", "Misyon, vizyon ve değerler"],
      ["neden", "Neden bizi tercih etmelisiniz"],
      ["cagri", "Sayfa sonu çağrısı"],
    ],
    build: buildAbout,
  },
  ayricalik: {
    label: "DND Ayrıcalığı",
    group: "sayfa",
    routes: (l) => [`/${l}/advantage`, `/${l}`],
    sections: [
      ["hero", "Sayfa başı"],
      ["quality", "İnşaat kalitesi"],
      ["social", "Sosyal yaşam"],
      ["after", "Satış sonrası (DND Maintenance)"],
      ["extra", "Diğer ayrıcalıklar (Ülfet)"],
    ],
    build: buildAdvantage,
  },
  odeme: {
    label: "Ödeme ve yatırım fırsatları",
    group: "sayfa",
    routes: (l) => [`/${l}/payment-plans`],
    sections: [
      ["hero", "Sayfa başı"],
      ["campaigns", "Kampanyalar"],
      ["rental", "Kira geliri"],
      ["sss", "S.S.S. başlığı"],
    ],
    build: buildPayment,
  },
  haberler: {
    label: "Haberler",
    group: "sayfa",
    routes: (l) => [`/${l}/press`],
    sections: [
      ["hero", "Sayfa başı"],
      ["blog", "DND'den haberler başlığı"],
      ["basin", "Basında DND başlığı"],
      ["etkinlik", "Etkinlikler başlığı"],
    ],
    build: buildNews,
  },
  projelerSayfasi: {
    label: "Projeler sayfası",
    group: "sayfa",
    routes: (l) => [`/${l}/projects`],
    sections: [
      ["hero", "Sayfa başı"],
      ["form", "İletişim formu"],
    ],
    build: (l) => PAGE_DEFAULTS[l].projelerSayfasi,
  },
  ekipSayfasi: {
    label: "Ekip sayfası",
    group: "sayfa",
    routes: (l) => [`/${l}/team`],
    sections: [["hero", "Sayfa başı"]],
    build: (l) => PAGE_DEFAULTS[l].ekipSayfasi,
  },
  iletisim: {
    label: "İletişim ve alt bilgi",
    group: "sayfa",
    routes: (l) => [`/${l}/contact`],
    siteWide: true,
    sections: [
      ["hero", "Sayfa başı"],
      ["bilgi", "Ofis bilgileri"],
      ["form", "İletişim formu"],
      ["telefon", "Telefon ve e-posta (tüm site, tüm diller)"],
      ["altbilgi", "Alt bilgi ve merkez ofis adresi (her sayfada)"],
    ],
    hide: [
      "bilgi.offices.*.email",
      "bilgi.offices.*.whatsapp",
      "bilgi.offices.*.phone",
      "bilgi.offices.*.phoneDisplay",
      "bilgi.offices.*.mapUrl",
      "bilgi.offices.*.coords",
      "bilgi.offices.*.mapEmbedUrl",
    ],
    shared: ["telefon"],
    build: buildContact,
    finalize: syncContact,
  },
  mariachi: {
    label: "Mariachi Beach Club",
    group: "proje",
    routes: (l) => [`/${l}/mariachi`],
    sections: [
      ["hero", "Sayfa başı"],
      ["video", "Tanıtım videosu"],
      ["olanaklar", "Olanaklar (kartlar)"],
      ["galeri", "Galeri"],
      ["ayricaliklar", "Üyelik ve sakin ayrıcalıkları"],
      ["iletisim", "İletişim ve rezervasyon"],
    ],
    build: (l) => MARIACHI_DEFAULTS[l],
  },
  "proje-neocity": projectScope("neocity"),
  "proje-lagoon-verde": projectScope("lagoon-verde"),
  "proje-la-joya": projectScope("la-joya"),
  "proje-perla": projectScope("perla"),
  "proje-perla-ii": projectScope("perla-ii"),
} satisfies Record<string, ScopeDef>;

export type ScopeKey = keyof typeof SCOPES;
export const isScopeKey = (v: string): v is ScopeKey => Object.prototype.hasOwnProperty.call(SCOPES, v);
export const projectScopeKey = (slug: ProjectPage["slug"]) => `proje-${slug}` as const;

/** Alan panelde gizli mi (yol öneki; "*" tek parçaya uyar) */
export function isHiddenPath(path: string, hide: readonly string[] | undefined) {
  if (!hide?.length) return false;
  const segs = path.split(".");
  return hide.some((h) => {
    const hs = h.split(".");
    if (hs.length > segs.length) return false;
    return hs.every((p, i) => p === "*" || p === segs[i]);
  });
}
