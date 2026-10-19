// Azure proje verisi: NeoCity (TR/EN/DE/RU/PL). Kaynak: "NEOCITY PRESANTATION" sunumu (DND Cyprus, Ekim 2026)
// ve onaylı render seti. Rakamlar sunumdan birebir; fiyatlar diğer projelerde olduğu gibi sayfada yazılmaz.
// Konum: sunumun 9. sayfasındaki uydu görselindeki arsa, Google uydu görüntüsüyle eşlenerek (DAÜ Bağlantı Yolu'nun kuzeyi,
// Yasemin Sitesi yolunun doğusu) 35.15406, 33.85201; mesafeler sunumdaki gibi dakika. Teslim: Nisan 2029 (DND, 19 Ekim 2026).
import type { ReactNode } from "react";
import type { Locale } from "@/lib/azure/site";
import type { Accent, ProjectContent, ProjectData, ProjectPayment } from "@/lib/azure/project-types";
import { SITE_URL } from "@/lib/seo";

const G = (n: number) => `/neocity/g-${String(n).padStart(2, "0")}.jpg`;
const IN = (n: number) => `/neocity/in-${String(n).padStart(2, "0")}`;

type Copy = {
  galleryKicker: string; galleryLead: string; galleryAlts: string[]; hint: string;
  overview: { kicker: string; title: string; lead: string; highlights: string[]; chips: string[]; imageAlt: string };
  facts: { kicker: string; title: string; lead: string; items: [string, string][]; note: string };
  site: { kicker: string; title: string; lead: string; day: string; night: string; dayAlt: string; nightAlt: string; stats: [string, string][]; legend: string[]; note: string };
  interiors: { kicker: string; title: string; lead: ReactNode; labels: string[]; alt: (label: string) => string };
  plans: {
    kicker: string; title: string; lead: string; note: string; ground: string; first: string;
    single: string; twin: string; singleSize: string; twinSize: string; singleNote: string; twinNote: string;
    singleGround: [string, string][]; singleFirst: [string, string][]; twinGround: [string, string][]; twinFirst: [string, string][];
  };
  payment: ProjectPayment;
  amenities: { kicker: string; title: string; lead: string; items: [string, string, string][] };
  location: { kicker: string; title: string; lead: string; address: string; nearby: string[]; distances: [string, number][] };
};

// galeri (akordiyon) diğer projeler gibi 5 kare: genel site görünümü, tek ve ikiz villa ön cephe, tek villa havuz/bahçe,
// tek villanın tam karşıdan ön cephesi (kullanıcı isteği; ikiz villa arka bahçe karesi yerine)
// (g-NN numaraları; galleryAlts tüm 12 render için sırayla)
const GALLERY = [1, 2, 3, 4, 11];

const ACC: Accent[] = ["sea", "coral"];
const acc = (i: number): Accent => ACC[i % 2];

function build(locale: Locale, c: Copy): ProjectContent {
  return {
    gallery: {
      kicker: c.galleryKicker,
      title: `NeoCity ${c.galleryKicker}`,
      lead: c.galleryLead,
      items: GALLERY.map((n) => ({ src: G(n), alt: c.galleryAlts[n - 1] })),
      hint: c.hint,
    },
    overview: {
      kicker: c.overview.kicker,
      title: c.overview.title,
      lead: c.overview.lead,
      highlights: c.overview.highlights,
      chips: c.overview.chips.map((label, i) => ({ label, accent: acc(i) })),
      image: G(4),
      imageAlt: c.overview.imageAlt,
      youtubeId: null,
      videoTitle: "NeoCity",
      videoPosterAlt: "NeoCity",
    },
    facts: {
      kicker: c.facts.kicker,
      title: c.facts.title,
      lead: c.facts.lead,
      items: c.facts.items.map(([label, value], i) => ({ label, value, accent: acc(i) })),
      note: c.facts.note,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Residence",
        name: "NeoCity",
        url: `${SITE_URL}/${locale}/neocity`,
        description: c.overview.lead,
        image: `${SITE_URL}/neocity/hero.jpg`,
        address: { "@type": "PostalAddress", addressLocality: "Tuzla", addressRegion: "Gazimağusa", addressCountry: "CY" },
        geo: { "@type": "GeoCoordinates", latitude: 35.15406, longitude: 33.85201 },
        numberOfAccommodationUnits: { "@type": "QuantitativeValue", value: 54 },
      },
    },
    sitePlan: {
      kicker: c.site.kicker,
      title: c.site.title,
      lead: c.site.lead,
      views: [
        { id: "day", label: c.site.day, image: "/neocity/vaziyet-gunduz.jpg", alt: c.site.dayAlt },
        { id: "night", label: c.site.night, image: "/neocity/vaziyet-gece.jpg", alt: c.site.nightAlt },
      ],
      stats: c.site.stats.map(([label, value]) => ({ label, value })),
      legend: c.site.legend,
      note: c.site.note,
    },
    mariachi: false,
    interiors: {
      kicker: c.interiors.kicker,
      title: c.interiors.title,
      lead: c.interiors.lead,
      angles: [],
      groups: [{
        id: "neocity",
        name: "NeoCity",
        shots: c.interiors.labels.map((label, i) => ({ image: `${IN(i + 1)}.jpg`, thumb: `${IN(i + 1)}-t.jpg`, label, alt: c.interiors.alt(label) })),
      }],
    },
    floorPlans: {
      kicker: c.plans.kicker,
      title: c.plans.title,
      lead: c.plans.lead,
      plans: [
        {
          id: "neo-single", title: c.plans.single, size: c.plans.singleSize, note: c.plans.singleNote,
          variants: [
            { name: `${c.plans.single} (${c.plans.ground})`, image: "/neocity/plan-tek-zemin.jpg", areas: c.plans.singleGround.map(([label, value]) => ({ label, value })), totals: { closed: "87,5 m²" } },
            { name: `${c.plans.single} (${c.plans.first})`, image: "/neocity/plan-tek-ust.jpg", areas: c.plans.singleFirst.map(([label, value]) => ({ label, value })), totals: { closed: "87,5 m²" } },
          ],
        },
        {
          id: "neo-twin", title: c.plans.twin, size: c.plans.twinSize, note: c.plans.twinNote,
          variants: [
            { name: `${c.plans.twin} (${c.plans.ground})`, image: "/neocity/plan-ikiz-zemin.jpg", areas: c.plans.twinGround.map(([label, value]) => ({ label, value })), totals: { closed: "67,5 m²" } },
            { name: `${c.plans.twin} (${c.plans.first})`, image: "/neocity/plan-ikiz-ust.jpg", areas: c.plans.twinFirst.map(([label, value]) => ({ label, value })), totals: { closed: "67,5 m²" } },
          ],
        },
      ],
      note: c.plans.note,
    },
    payment: c.payment,
    amenities: {
      kicker: c.amenities.kicker,
      title: c.amenities.title,
      lead: c.amenities.lead,
      items: c.amenities.items.map(([label, desc, icon], i) => ({ label, desc, icon, accent: acc(i) })),
    },
    location: {
      kicker: c.location.kicker,
      title: c.location.title,
      lead: c.location.lead,
      address: c.location.address,
      lat: 35.15406,
      lng: 33.85201,
      mapQuery: "35.15406,33.85201",
      nearby: c.location.nearby,
      distances: c.location.distances.map(([label, min], i) => ({ label, min, accent: acc(i) })),
    },
    catalog: false,
  };
}

// alan değerleri dillerden bağımsız (ondalık virgül diğer projelerdeki gibi)
const A = {
  sg: ["14 m²", "32,2 m²", "37,8 m²", "3,5 m²", "46 m²"],
  sf: ["17,4 m²", "5,0 m²", "5,7 m²", "18,2 m²", "19,2 m²", "5,0 m²", "17,0 m²", "9 m²"],
  tg: ["47,55 m²", "15,75 m²", "4,2 m²", "26 m²"],
  tf: ["17,7 m²", "4,8 m²", "14,2 m²", "14,2 m²", "5,9 m²", "10,7 m²", "3 m²"],
};
const zip = (labels: string[], values: string[]): [string, string][] => labels.map((l, i) => [l, values[i]]);
const DIST = [2, 5, 6, 6, 8, 9, 15, 35];
const zipMin = (labels: string[]): [string, number][] => labels.map((l, i) => [l, DIST[i]]);

const TR = build("tr", {
  galleryKicker: "Galeri",
  galleryLead: "NeoCity görselleri",
  galleryAlts: [
    "NeoCity ikiz villalar ve özel havuzlar, akşamüstü kuşbakışı", "NeoCity tek villa, ön cephe ve giriş, akşamüstü",
    "NeoCity ikiz villa, ön cephe, akşamüstü", "NeoCity tek villa, özel havuz ve bahçe, gündüz",
    "NeoCity ikiz villalar ve özel havuzlar, gündüz kuşbakışı", "NeoCity ikiz villa, arka bahçe ve havuzlar, akşamüstü",
    "NeoCity tek villa, köşe görünümü, gündüz", "NeoCity ikiz villa, giriş ve otopark, gündüz",
    "NeoCity ikiz villalar, gece kuşbakışı", "NeoCity tek villa, arka cephe, akşamüstü",
    "NeoCity tek villa, ön cephe, gece", "NeoCity ikiz villa, köşe ve giriş, gündüz",
  ],
  hint: "*Mobilde bir görsele dokunarak büyütüp sabitleyebilir, tekrar dokunarak varsayılan görünüme dönebilirsiniz.",
  overview: {
    kicker: "Genel bakış",
    title: "NeoCity Genel Bakış",
    lead: "DND Cyprus’un yeni projesi NeoCity ile bu kez odağımızda yerli aileler ve villa yaşamı var. Gazimağusa ve Tuzla’nın hemen yanı başında konumlanan NeoCity, günlük yaşamın ihtiyaçlarına, eğitim ve sağlık olanaklarına kolay ulaşım sağlayan avantajlı bir lokasyonda yükseliyor.",
    highlights: [
      "3 etaptan birincisi hayata geçiyor: 18 tek villa ve 36 ikiz villa, toplam 54 villa",
      "Her villada özel bahçe; opsiyonel özel yüzme havuzu",
      "Modern Akdeniz mimarisi, aile yaşamına uygun ferah evler; komşuluk değerleri ön planda",
      "Site içinde market, eczane, restoran, çocuk oyun alanı, spor tesisi ve yürüyüş yolu",
    ],
    chips: ["Aile Yaşamı", "Müstakil Yaşam", "5 Sıfır Ödeme"],
    imageAlt: "NeoCity tek villa, özel havuz ve bahçe",
  },
  facts: {
    kicker: "Öne çıkan bilgiler",
    title: "NeoCity Öne Çıkan Bilgiler",
    lead: "Projenin temel özelliklerine hızlıca göz atın.",
    items: [["Lokasyon", "Tuzla, Gazimağusa"], ["Teslim", "Nisan 2029"], ["Etap", "1. Etap (3 etaptan ilki)"], ["Villa Sayısı", "54 (18 tek · 36 ikiz)"], ["Arsa Alanı", "20.170 m²"], ["İnşaat Alanı", "8.556 m²"]],
    note: "* Bilgiler tanıtım amaçlıdır. Nihai teknik ve satış detayları için satış ekibimizle iletişime geçiniz.",
  },
  site: {
    kicker: "Vaziyet planı",
    title: "NeoCity Vaziyet Planı",
    lead: "1. etapta 54 villa üç sıra halinde yerleşiyor: üst sırada 18 tek villa, ortadaki iki sırada 36 ikiz villa. Ana yol tarafında market, eczane ve restoran; yanında yürüyüş yolu, spor tesisi ve çocuk oyun alanının bulunduğu yeşil alan.",
    day: "Gündüz", night: "Gece",
    dayAlt: "NeoCity vaziyet planı, villa numaralarıyla gündüz görünümü", nightAlt: "NeoCity vaziyet planı, villa numaralarıyla gece görünümü",
    stats: [["Arsa alanı", "20.170 m²"], ["İnşaat alanı", "8.556 m²"], ["Yeşil alan", "1.920 m²"], ["Tek villa", "18"], ["İkiz villa", "36"]],
    legend: ["Yürüyüş alanı", "Spor tesisi", "Çocuk oyun alanı", "Yeşil alan", "Otopark", "Restoran", "Market", "Eczane"],
    note: "* Görseller temsilidir. Planı büyütmek için görsele dokunun.",
  },
  interiors: {
    kicker: "İç mekân",
    title: "NeoCity İç Mekân & Tasarım",
    lead: <>Ferah salonlar, ahşap dokular ve aydınlık odalar: <strong>NeoCity</strong> villalarından örnek iç mekânlar.</>,
    labels: ["Yatak Odası", "Salon", "Banyo", "Yemek Alanı", "Salon", "Banyo", "Yatak Odası", "Salon ve Merdiven", "Mutfak", "Mutfak"],
    alt: (l) => `NeoCity ${l.toLocaleLowerCase("tr")} iç mekân görseli`,
  },
  plans: {
    kicker: "Kat planları",
    title: "NeoCity Kat Planları",
    lead: "Tek ve ikiz villa tiplerine ait kat planları. Detaylı bilgi için satış ekibimizle iletişime geçiniz.",
    note: "* Görseller ve ölçüler temsilidir. Tip, ölçü ve yerleşimler projeye bağlı olarak değişebilir.",
    ground: "Zemin Kat", first: "1. Kat", single: "Tek Villa", twin: "İkiz Villa",
    singleSize: "175 m² kapalı • 230 m² brüt", twinSize: "135 m² kapalı • 164 m² brüt",
    singleNote: "55 m² teras ve balkon · özel bahçe · opsiyonel özel havuz", twinNote: "29 m² teras ve balkon · özel bahçe · opsiyonel özel havuz",
    singleGround: zip(["Giriş", "Salon", "Yemek Alanı ve Mutfak", "WC", "Teras"], A.sg),
    singleFirst: zip(["Ebeveyn Yatak Odası", "Ebeveyn Duş / WC", "Ebeveyn Giyinme Odası", "Çocuk Yatak Odası 1", "Çocuk Yatak Odası 2", "Duş / WC", "Koridor ve Merdiven", "Balkon"], A.sf),
    twinGround: zip(["Salon ve Yemek Odası", "Mutfak", "WC", "Teras"], A.tg),
    twinFirst: zip(["Ebeveyn Yatak Odası", "Ebeveyn Duş / WC", "Yatak Odası 1", "Yatak Odası 2", "Duş / WC", "Koridor ve Merdiven", "Balkon"], A.tf),
  },
  payment: {
    kicker: "Ödeme modeli",
    title: "5 Sıfır: Devrimsel Ödeme Planı",
    lead: "Maaşınız TL, eviniz neden sterlinle olsun? Kuzey Kıbrıs’ta konut fiyatları çoğunlukla sterlin üzerinden belirlenirken yerli halkın gelirinin büyük bölümü Türk lirası. DND Cyprus bu gerçeklikten yola çıkarak NeoCity için yerli halkın gelir yapısına uygun, Türk lirası bazlı yenilikçi bir ödeme modeli geliştirdi.",
    zeros: ["Faiz", "Banka", "Kefil", "Vade farkı", "Kur farkı"],
    steps: ["Konut fiyatı Türk lirası", "%35 peşinat", "Kalan %65 için 60 aya kadar ödeme imkânı", "Faizsiz ve vade farksız DND finansmanı", "Ödemenin bir bölümü 5 yıl boyunca sabit", "Kalan kısım KKTC asgari ücret artışına paralel olarak 6 ayda bir güncellenir"],
    quote: { h: "Villanızı bankasız, bugünkü TL fiyatla alın.", p: "Villanın satış bedeli sözleşme tarihinde TL olarak sabitlenir. %35 peşinat sonrası kalan tutar 60 ay vade ile doğrudan NeoCity’ye ödenir." },
    cta: "Ödeme planını iste",
    note: "* Ödeme planı tanıtım amaçlıdır. Güncel fiyat ve koşullar için satış ekibimizle iletişime geçiniz.",
  },
  amenities: {
    kicker: "Öne çıkanlar",
    title: "NeoCity Proje Olanakları",
    lead: "Günlük yaşamı kolaylaştıran site içi olanaklar ve aileler için açık alanlar.",
    items: [
      ["Özel Bahçe", "Her villaya ait, dört mevsim kullanılabilen özel bahçe.", "garden"],
      ["Özel Yüzme Havuzu", "Her villa için opsiyonel özel havuz.", "pool"],
      ["Yürüyüş Alanı", "Yeşil alan boyunca uzanan yürüyüş yolu.", "walk"],
      ["Spor Tesisi", "Site içinde futbol sahası ve spor alanı.", "football"],
      ["Çocuk Oyun Alanı", "Çocuklar için güvenli ve keyifli oyun alanı.", "playground"],
      ["Yeşil Alan", "1.920 m² ortak yeşil alan.", "green"],
      ["Otopark", "Villaların önünde araç park yeri ve ortak otopark.", "parking"],
      ["Restoran", "Site içinde restoran.", "restaurant"],
      ["Market", "Günlük ihtiyaçlar için site içinde market.", "market"],
      ["Eczane", "Site içinde eczane.", "pharmacy"],
    ],
  },
  location: {
    kicker: "Konum",
    title: "NeoCity Konum",
    lead: "Gazimağusa ve Tuzla’nın hemen yanı başında, Lefkoşa–DAÜ bağlantı yolu üzerinde: eğitim, sağlık ve günlük ihtiyaçlara birkaç dakika.",
    address: "DAÜ Bağlantı Yolu, Tuzla, Gazimağusa, Kuzey Kıbrıs",
    nearby: ["Doğu Akdeniz Üniversitesi", "Doğa Koleji", "Tuzla Merkez", "Gazimağusa"],
    distances: zipMin(["Market", "Tuzla Merkez", "DAÜ", "Doğa Koleji", "Gazimağusa", "Hastane", "İskele", "Ercan Havalimanı"]),
  },
});

const EN = build("en", {
  galleryKicker: "Gallery",
  galleryLead: "NeoCity images",
  galleryAlts: [
    "NeoCity twin villas with private pools, aerial view at dusk", "NeoCity single villa, front façade and entrance at dusk",
    "NeoCity twin villa, front façade at dusk", "NeoCity single villa with private pool and garden, daytime",
    "NeoCity twin villas with private pools, aerial view by day", "NeoCity twin villa, back gardens and pools at dusk",
    "NeoCity single villa, corner view by day", "NeoCity twin villa, entrance and parking by day",
    "NeoCity twin villas, aerial view at night", "NeoCity single villa, rear façade at dusk",
    "NeoCity single villa, front façade at night", "NeoCity twin villa, corner and entrance by day",
  ],
  hint: "*On mobile, tap an image to enlarge and pin it; tap again to return to the default view.",
  overview: {
    kicker: "Overview",
    title: "NeoCity Overview",
    lead: "With NeoCity, DND Cyprus’s newest project, our focus is on local families and villa living. Set right beside Famagusta and Tuzla, NeoCity rises in an advantageous location with easy access to daily needs, schools and healthcare.",
    highlights: [
      "Phase 1 of 3 is under way: 18 single and 36 twin villas, 54 villas in total",
      "A private garden with every villa; optional private swimming pool",
      "Modern Mediterranean architecture and spacious family homes, with neighbourliness at heart",
      "On site: market, pharmacy, restaurant, children’s playground, sports facility and walking path",
    ],
    chips: ["Family Living", "Detached Living", "5 Zeros Payment"],
    imageAlt: "NeoCity single villa with private pool and garden",
  },
  facts: {
    kicker: "Key facts",
    title: "NeoCity Key Facts",
    lead: "A quick look at the project’s main features.",
    items: [["Location", "Tuzla, Famagusta"], ["Delivery", "April 2029"], ["Phase", "Phase 1 (of 3)"], ["Villas", "54 (18 single · 36 twin)"], ["Plot Area", "20,170 m²"], ["Construction Area", "8,556 m²"]],
    note: "* Information is for promotional purposes. Please contact our sales team for final technical and sales details.",
  },
  site: {
    kicker: "Site plan",
    title: "NeoCity Site Plan",
    lead: "Phase 1 places 54 villas in three rows: 18 single villas in the top row and 36 twin villas in the two middle rows. Along the main road: market, pharmacy and restaurant, next to a green area with a walking path, sports facility and children’s playground.",
    day: "Day", night: "Night",
    dayAlt: "NeoCity site plan with villa numbers, daytime view", nightAlt: "NeoCity site plan with villa numbers, night view",
    stats: [["Plot area", "20,170 m²"], ["Construction area", "8,556 m²"], ["Green area", "1,920 m²"], ["Single villas", "18"], ["Twin villas", "36"]],
    legend: ["Walking path", "Sports facility", "Children’s playground", "Green area", "Parking", "Restaurant", "Market", "Pharmacy"],
    note: "* Images are representative. Tap the plan to enlarge it.",
  },
  interiors: {
    kicker: "Interiors",
    title: "NeoCity Interiors & Design",
    lead: <>Airy living rooms, wood textures and bright bedrooms: sample interiors from <strong>NeoCity</strong> villas.</>,
    labels: ["Bedroom", "Living Room", "Bathroom", "Dining Area", "Living Room", "Bathroom", "Bedroom", "Living Room & Stairs", "Kitchen", "Kitchen"],
    alt: (l) => `NeoCity ${l.toLowerCase()} interior image`,
  },
  plans: {
    kicker: "Floor plans",
    title: "NeoCity Floor Plans",
    lead: "Floor plans of the single and twin villa types. Please contact our sales team for details.",
    note: "* Images and dimensions are representative. Types, sizes and layouts may vary by project.",
    ground: "Ground Floor", first: "First Floor", single: "Single Villa", twin: "Twin Villa",
    singleSize: "175 m² closed • 230 m² gross", twinSize: "135 m² closed • 164 m² gross",
    singleNote: "55 m² terraces and balcony · private garden · optional private pool", twinNote: "29 m² terraces and balcony · private garden · optional private pool",
    singleGround: zip(["Entrance", "Living Room", "Dining Area & Kitchen", "WC", "Terrace"], A.sg),
    singleFirst: zip(["Master Bedroom", "Master Shower / WC", "Master Dressing Room", "Children’s Bedroom 1", "Children’s Bedroom 2", "Shower / WC", "Corridor & Stairs", "Balcony"], A.sf),
    twinGround: zip(["Living & Dining Room", "Kitchen", "WC", "Terrace"], A.tg),
    twinFirst: zip(["Master Bedroom", "Master Shower / WC", "Bedroom 1", "Bedroom 2", "Shower / WC", "Corridor & Stairs", "Balcony"], A.tf),
  },
  payment: {
    kicker: "Payment model",
    title: "5 Zeros: A Revolutionary Payment Plan",
    lead: "Your salary is in lira, so why should your home be priced in sterling? In North Cyprus, home prices are mostly set in sterling while most local income is in Turkish lira. Starting from this reality, DND Cyprus developed an innovative, lira-based payment model for NeoCity that suits local incomes.",
    zeros: ["Interest", "Bank", "Guarantor", "Maturity charge", "Exchange-rate risk"],
    steps: ["Home price in Turkish lira", "35% down payment", "Up to 60 months to pay the remaining 65%", "Interest-free DND financing with no maturity charge", "Part of the payment stays fixed for 5 years", "The rest is updated every 6 months in line with the TRNC minimum wage increase"],
    quote: { h: "Buy your villa without a bank, at today’s lira price.", p: "The villa’s sale price is fixed in lira on the contract date. After a 35% down payment, the remaining balance is paid directly to NeoCity over 60 months." },
    cta: "Request the payment plan",
    note: "* The payment plan is for promotional purposes. Please contact our sales team for current prices and terms.",
  },
  amenities: {
    kicker: "Highlights",
    title: "NeoCity Amenities",
    lead: "On-site amenities that make daily life easier, and open spaces for families.",
    items: [
      ["Private Garden", "A private garden with every villa, to enjoy all year round.", "garden"],
      ["Private Pool", "Optional private pool for every villa.", "pool"],
      ["Walking Path", "A walking path along the green area.", "walk"],
      ["Sports Facility", "Football pitch and sports area on site.", "football"],
      ["Children’s Playground", "A safe and fun playground for children.", "playground"],
      ["Green Area", "1,920 m² of shared green space.", "green"],
      ["Parking", "Parking in front of the villas and a shared car park.", "parking"],
      ["Restaurant", "An on-site restaurant.", "restaurant"],
      ["Market", "An on-site market for daily needs.", "market"],
      ["Pharmacy", "An on-site pharmacy.", "pharmacy"],
    ],
  },
  location: {
    kicker: "Location",
    title: "NeoCity Location",
    lead: "Right beside Famagusta and Tuzla, on the Nicosia–EMU link road: schools, healthcare and daily needs are minutes away.",
    address: "DAÜ Bağlantı Yolu (EMU link road), Tuzla, Famagusta, North Cyprus",
    nearby: ["Eastern Mediterranean University", "Doğa College", "Tuzla Centre", "Famagusta"],
    distances: zipMin(["Market", "Tuzla Centre", "EMU", "Doğa College", "Famagusta", "Hospital", "İskele", "Ercan Airport"]),
  },
});

const DE = build("de", {
  galleryKicker: "Galerie",
  galleryLead: "Bilder von NeoCity",
  galleryAlts: [
    "NeoCity Doppelvillen mit privaten Pools, Luftaufnahme in der Abenddämmerung", "NeoCity freistehende Villa, Vorderfassade und Eingang am Abend",
    "NeoCity Doppelvilla, Vorderfassade am Abend", "NeoCity freistehende Villa mit Privatpool und Garten, tagsüber",
    "NeoCity Doppelvillen mit privaten Pools, Luftaufnahme bei Tag", "NeoCity Doppelvilla, Gärten und Pools am Abend",
    "NeoCity freistehende Villa, Eckansicht bei Tag", "NeoCity Doppelvilla, Eingang und Parkplatz bei Tag",
    "NeoCity Doppelvillen, Luftaufnahme bei Nacht", "NeoCity freistehende Villa, Rückfassade am Abend",
    "NeoCity freistehende Villa, Vorderfassade bei Nacht", "NeoCity Doppelvilla, Ecke und Eingang bei Tag",
  ],
  hint: "*Auf dem Smartphone ein Bild antippen, um es zu vergrößern und festzuhalten; erneut antippen, um zur Standardansicht zurückzukehren.",
  overview: {
    kicker: "Überblick",
    title: "NeoCity Überblick",
    lead: "Mit NeoCity, dem neuesten Projekt von DND Cyprus, stehen diesmal einheimische Familien und das Leben in der Villa im Mittelpunkt. Direkt neben Famagusta und Tuzla entsteht NeoCity in vorteilhafter Lage mit kurzen Wegen zu allem für den täglichen Bedarf, zu Schulen und zur Gesundheitsversorgung.",
    highlights: [
      "Der erste von 3 Bauabschnitten entsteht: 18 freistehende und 36 Doppelvillen, insgesamt 54 Villen",
      "Privatgarten bei jeder Villa; optionaler privater Pool",
      "Moderne mediterrane Architektur, großzügige Familienhäuser, gelebte Nachbarschaft",
      "In der Anlage: Markt, Apotheke, Restaurant, Kinderspielplatz, Sportanlage und Spazierweg",
    ],
    chips: ["Familienleben", "Freistehend wohnen", "5-Null-Zahlung"],
    imageAlt: "NeoCity freistehende Villa mit Privatpool und Garten",
  },
  facts: {
    kicker: "Wichtige Fakten",
    title: "NeoCity Wichtige Fakten",
    lead: "Die wichtigsten Merkmale des Projekts auf einen Blick.",
    items: [["Lage", "Tuzla, Famagusta"], ["Übergabe", "April 2029"], ["Bauabschnitt", "1. Bauabschnitt (von 3)"], ["Villen", "54 (18 freistehend · 36 Doppel)"], ["Grundstücksfläche", "20.170 m²"], ["Baufläche", "8.556 m²"]],
    note: "* Die Angaben dienen Werbezwecken. Für endgültige technische und vertragliche Details wenden Sie sich bitte an unser Vertriebsteam.",
  },
  site: {
    kicker: "Lageplan",
    title: "NeoCity Lageplan",
    lead: "Im 1. Bauabschnitt liegen 54 Villen in drei Reihen: 18 freistehende Villen in der oberen Reihe, 36 Doppelvillen in den beiden mittleren Reihen. An der Hauptstraße: Markt, Apotheke und Restaurant, daneben eine Grünfläche mit Spazierweg, Sportanlage und Kinderspielplatz.",
    day: "Tag", night: "Nacht",
    dayAlt: "NeoCity Lageplan mit Villennummern, Tagansicht", nightAlt: "NeoCity Lageplan mit Villennummern, Nachtansicht",
    stats: [["Grundstücksfläche", "20.170 m²"], ["Baufläche", "8.556 m²"], ["Grünfläche", "1.920 m²"], ["Freistehende Villen", "18"], ["Doppelvillen", "36"]],
    legend: ["Spazierweg", "Sportanlage", "Kinderspielplatz", "Grünfläche", "Parkplatz", "Restaurant", "Markt", "Apotheke"],
    note: "* Abbildungen sind beispielhaft. Zum Vergrößern auf den Plan tippen.",
  },
  interiors: {
    kicker: "Innenräume",
    title: "NeoCity Innenräume & Design",
    lead: <>Helle Wohnräume, Holzakzente und lichtdurchflutete Zimmer: Beispiel-Innenräume der <strong>NeoCity</strong>-Villen.</>,
    labels: ["Schlafzimmer", "Wohnzimmer", "Badezimmer", "Essbereich", "Wohnzimmer", "Badezimmer", "Schlafzimmer", "Wohnzimmer & Treppe", "Küche", "Küche"],
    alt: (l) => `NeoCity ${l} – Innenansicht`,
  },
  plans: {
    kicker: "Grundrisse",
    title: "NeoCity Grundrisse",
    lead: "Grundrisse der freistehenden Villa und der Doppelvilla. Für Details wenden Sie sich bitte an unser Vertriebsteam.",
    note: "* Abbildungen und Maße sind beispielhaft. Typen, Größen und Grundrisse können je nach Projekt abweichen.",
    ground: "Erdgeschoss", first: "Obergeschoss", single: "Freistehende Villa", twin: "Doppelvilla",
    singleSize: "175 m² geschlossen • 230 m² brutto", twinSize: "135 m² geschlossen • 164 m² brutto",
    singleNote: "55 m² Terrassen und Balkon · Privatgarten · optionaler Privatpool", twinNote: "29 m² Terrassen und Balkon · Privatgarten · optionaler Privatpool",
    singleGround: zip(["Eingang", "Wohnzimmer", "Essbereich & Küche", "WC", "Terrasse"], A.sg),
    singleFirst: zip(["Elternschlafzimmer", "Eltern-Dusche / WC", "Ankleide", "Kinderzimmer 1", "Kinderzimmer 2", "Dusche / WC", "Flur & Treppe", "Balkon"], A.sf),
    twinGround: zip(["Wohn- & Esszimmer", "Küche", "WC", "Terrasse"], A.tg),
    twinFirst: zip(["Elternschlafzimmer", "Eltern-Dusche / WC", "Schlafzimmer 1", "Schlafzimmer 2", "Dusche / WC", "Flur & Treppe", "Balkon"], A.tf),
  },
  payment: {
    kicker: "Zahlungsmodell",
    title: "5 Null: Ein revolutionärer Zahlungsplan",
    lead: "Ihr Gehalt kommt in Lira – warum sollte Ihr Zuhause in Pfund kosten? In Nordzypern werden Immobilienpreise meist in Pfund festgelegt, während die Einkommen der Einheimischen überwiegend in Türkischer Lira gezahlt werden. Davon ausgehend hat DND Cyprus für NeoCity ein innovatives, auf Lira basierendes Zahlungsmodell entwickelt, das zu den lokalen Einkommen passt.",
    zeros: ["Zinsen", "Bank", "Bürge", "Laufzeitaufschlag", "Kursrisiko"],
    steps: ["Kaufpreis in Türkischer Lira", "35 % Anzahlung", "Bis zu 60 Monate für die restlichen 65 %", "Zinsfreie DND-Finanzierung ohne Laufzeitaufschlag", "Ein Teil der Rate bleibt 5 Jahre lang fest", "Der Rest wird alle 6 Monate entsprechend der Erhöhung des Mindestlohns in der TRNZ angepasst"],
    quote: { h: "Kaufen Sie Ihre Villa ohne Bank, zum heutigen Lira-Preis.", p: "Der Kaufpreis der Villa wird am Vertragstag in Lira festgeschrieben. Nach 35 % Anzahlung wird der Restbetrag über 60 Monate direkt an NeoCity gezahlt." },
    cta: "Zahlungsplan anfordern",
    note: "* Der Zahlungsplan dient Werbezwecken. Aktuelle Preise und Konditionen erhalten Sie von unserem Vertriebsteam.",
  },
  amenities: {
    kicker: "Highlights",
    title: "NeoCity Ausstattung",
    lead: "Angebote in der Anlage, die den Alltag erleichtern, und Freiflächen für Familien.",
    items: [
      ["Privatgarten", "Ein eigener Garten bei jeder Villa, das ganze Jahr nutzbar.", "garden"],
      ["Privatpool", "Optionaler Privatpool für jede Villa.", "pool"],
      ["Spazierweg", "Ein Spazierweg entlang der Grünfläche.", "walk"],
      ["Sportanlage", "Fußballplatz und Sportfläche in der Anlage.", "football"],
      ["Kinderspielplatz", "Ein sicherer, fröhlicher Spielplatz für Kinder.", "playground"],
      ["Grünfläche", "1.920 m² gemeinsame Grünfläche.", "green"],
      ["Parkplatz", "Stellplätze vor den Villen und ein gemeinsamer Parkplatz.", "parking"],
      ["Restaurant", "Ein Restaurant in der Anlage.", "restaurant"],
      ["Markt", "Ein Markt für den täglichen Bedarf in der Anlage.", "market"],
      ["Apotheke", "Eine Apotheke in der Anlage.", "pharmacy"],
    ],
  },
  location: {
    kicker: "Lage",
    title: "NeoCity Lage",
    lead: "Direkt neben Famagusta und Tuzla, an der Verbindungsstraße Nikosia–EMU: Schulen, Gesundheitsversorgung und Einkauf in wenigen Minuten.",
    address: "DAÜ Bağlantı Yolu (Zufahrt zur EMU), Tuzla, Famagusta, Nordzypern",
    nearby: ["Eastern Mediterranean University", "Doğa College", "Zentrum Tuzla", "Famagusta"],
    distances: zipMin(["Markt", "Zentrum Tuzla", "EMU", "Doğa College", "Famagusta", "Krankenhaus", "İskele", "Flughafen Ercan"]),
  },
});

const RU = build("ru", {
  galleryKicker: "Галерея",
  galleryLead: "Изображения NeoCity",
  galleryAlts: [
    "NeoCity, дуплекс-виллы с частными бассейнами, вид сверху на закате", "NeoCity, отдельная вилла, фасад и вход вечером",
    "NeoCity, дуплекс-вилла, фасад вечером", "NeoCity, отдельная вилла с частным бассейном и садом днём",
    "NeoCity, дуплекс-виллы с частными бассейнами, вид сверху днём", "NeoCity, дуплекс-вилла, сады и бассейны вечером",
    "NeoCity, отдельная вилла, угловой вид днём", "NeoCity, дуплекс-вилла, вход и парковка днём",
    "NeoCity, дуплекс-виллы, вид сверху ночью", "NeoCity, отдельная вилла, задний фасад вечером",
    "NeoCity, отдельная вилла, фасад ночью", "NeoCity, дуплекс-вилла, угол и вход днём",
  ],
  hint: "*На телефоне коснитесь изображения, чтобы увеличить и закрепить его; коснитесь ещё раз, чтобы вернуться к обычному виду.",
  overview: {
    kicker: "Обзор",
    title: "NeoCity Обзор",
    lead: "В новом проекте DND Cyprus — NeoCity — в центре внимания местные семьи и жизнь в вилле. NeoCity строится рядом с Фамагустой и Тузлой, в удобном месте с быстрым доступом ко всему необходимому, школам и медицине.",
    highlights: [
      "Начинается первая из 3 очередей: 18 отдельных и 36 дуплекс-вилл, всего 54 виллы",
      "Частный сад у каждой виллы; частный бассейн по желанию",
      "Современная средиземноморская архитектура, просторные дома для семей, добрососедство",
      "На территории: магазин, аптека, ресторан, детская площадка, спортивная площадка и прогулочная дорожка",
    ],
    chips: ["Для семей", "Отдельный дом", "Оплата «5 нулей»"],
    imageAlt: "NeoCity, отдельная вилла с частным бассейном и садом",
  },
  facts: {
    kicker: "Ключевые факты",
    title: "NeoCity Ключевые факты",
    lead: "Основные характеристики проекта в кратком обзоре.",
    items: [["Расположение", "Тузла, Фамагуста"], ["Сдача", "апрель 2029"], ["Очередь", "1-я очередь (из 3)"], ["Вилл", "54 (18 отдельных · 36 дуплекс)"], ["Площадь участка", "20 170 m²"], ["Площадь застройки", "8 556 m²"]],
    note: "* Информация носит рекламный характер. Окончательные технические и коммерческие условия уточняйте у отдела продаж.",
  },
  site: {
    kicker: "Генплан",
    title: "NeoCity Генплан",
    lead: "В 1-й очереди 54 виллы расположены в три ряда: 18 отдельных вилл в верхнем ряду и 36 дуплекс-вилл в двух средних. Вдоль главной дороги — магазин, аптека и ресторан, рядом зелёная зона с прогулочной дорожкой, спортивной и детской площадками.",
    day: "День", night: "Ночь",
    dayAlt: "Генплан NeoCity с номерами вилл, дневной вид", nightAlt: "Генплан NeoCity с номерами вилл, ночной вид",
    stats: [["Площадь участка", "20 170 m²"], ["Площадь застройки", "8 556 m²"], ["Зелёная зона", "1 920 m²"], ["Отдельные виллы", "18"], ["Дуплекс-виллы", "36"]],
    legend: ["Прогулочная дорожка", "Спортивная площадка", "Детская площадка", "Зелёная зона", "Парковка", "Ресторан", "Магазин", "Аптека"],
    note: "* Изображения носят иллюстративный характер. Коснитесь плана, чтобы увеличить его.",
  },
  interiors: {
    kicker: "Интерьеры",
    title: "NeoCity Интерьеры и дизайн",
    lead: <>Просторные гостиные, фактура дерева и светлые спальни: примеры интерьеров вилл <strong>NeoCity</strong>.</>,
    labels: ["Спальня", "Гостиная", "Ванная", "Столовая", "Гостиная", "Ванная", "Спальня", "Гостиная и лестница", "Кухня", "Кухня"],
    alt: (l) => `NeoCity, ${l.toLowerCase()} — интерьер`,
  },
  plans: {
    kicker: "Планировки",
    title: "NeoCity Планировки",
    lead: "Планировки отдельной виллы и дуплекс-виллы. Подробности уточняйте у отдела продаж.",
    note: "* Изображения и размеры носят иллюстративный характер. Типы, площади и планировки могут меняться.",
    ground: "Первый этаж", first: "Второй этаж", single: "Отдельная вилла", twin: "Дуплекс-вилла",
    singleSize: "175 m² закрытая • 230 m² общая", twinSize: "135 m² закрытая • 164 m² общая",
    singleNote: "55 m² террас и балкон · частный сад · бассейн по желанию", twinNote: "29 m² террас и балкон · частный сад · бассейн по желанию",
    singleGround: zip(["Прихожая", "Гостиная", "Столовая и кухня", "WC", "Терраса"], A.sg),
    singleFirst: zip(["Главная спальня", "Душ / WC при спальне", "Гардеробная", "Детская 1", "Детская 2", "Душ / WC", "Коридор и лестница", "Балкон"], A.sf),
    twinGround: zip(["Гостиная-столовая", "Кухня", "WC", "Терраса"], A.tg),
    twinFirst: zip(["Главная спальня", "Душ / WC при спальне", "Спальня 1", "Спальня 2", "Душ / WC", "Коридор и лестница", "Балкон"], A.tf),
  },
  payment: {
    kicker: "Модель оплаты",
    title: "«5 нулей»: революционный план оплаты",
    lead: "Зарплата в лирах — почему дом должен стоить в фунтах? На Северном Кипре цены на жильё в основном устанавливаются в фунтах стерлингов, а доходы местных жителей — преимущественно в турецких лирах. Исходя из этого, DND Cyprus разработала для NeoCity инновационную модель оплаты в лирах, соответствующую местным доходам.",
    zeros: ["Проценты", "Банк", "Поручитель", "Надбавка за срок", "Курсовой риск"],
    steps: ["Цена дома в турецких лирах", "Первый взнос 35 %", "До 60 месяцев на оставшиеся 65 %", "Беспроцентное финансирование DND без надбавки за срок", "Часть платежа фиксирована на 5 лет", "Остальная часть каждые 6 месяцев пересматривается в соответствии с ростом минимальной зарплаты в ТРСК"],
    quote: { h: "Купите виллу без банка, по сегодняшней цене в лирах.", p: "Цена виллы фиксируется в лирах в день подписания договора. После взноса 35 % остаток выплачивается напрямую NeoCity в течение 60 месяцев." },
    cta: "Запросить план оплаты",
    note: "* План оплаты носит рекламный характер. Актуальные цены и условия уточняйте у отдела продаж.",
  },
  amenities: {
    kicker: "Преимущества",
    title: "NeoCity Инфраструктура",
    lead: "Удобства на территории, облегчающие повседневную жизнь, и открытые пространства для семей.",
    items: [
      ["Частный сад", "Собственный сад у каждой виллы — круглый год.", "garden"],
      ["Частный бассейн", "Частный бассейн для каждой виллы по желанию.", "pool"],
      ["Прогулочная дорожка", "Дорожка вдоль зелёной зоны.", "walk"],
      ["Спортивная площадка", "Футбольное поле и спортивная зона на территории.", "football"],
      ["Детская площадка", "Безопасная и весёлая площадка для детей.", "playground"],
      ["Зелёная зона", "1 920 m² общей зелёной зоны.", "green"],
      ["Парковка", "Парковочные места у вилл и общая парковка.", "parking"],
      ["Ресторан", "Ресторан на территории.", "restaurant"],
      ["Магазин", "Магазин для повседневных покупок на территории.", "market"],
      ["Аптека", "Аптека на территории.", "pharmacy"],
    ],
  },
  location: {
    kicker: "Расположение",
    title: "NeoCity Расположение",
    lead: "Рядом с Фамагустой и Тузлой, на дороге Никосия — EMU: школы, медицина и магазины в нескольких минутах.",
    address: "DAÜ Bağlantı Yolu (дорога к EMU), Тузла, Фамагуста, Северный Кипр",
    nearby: ["Eastern Mediterranean University", "Колледж Doğa", "Центр Тузлы", "Фамагуста"],
    distances: zipMin(["Магазин", "Центр Тузлы", "EMU", "Колледж Doğa", "Фамагуста", "Больница", "Искеле", "Аэропорт Эрджан"]),
  },
});

const PL = build("pl", {
  galleryKicker: "Galeria",
  galleryLead: "Zdjęcia NeoCity",
  galleryAlts: [
    "NeoCity, wille bliźniacze z prywatnymi basenami, widok z lotu ptaka o zmierzchu", "NeoCity, willa wolnostojąca, fasada i wejście wieczorem",
    "NeoCity, willa bliźniacza, fasada wieczorem", "NeoCity, willa wolnostojąca z prywatnym basenem i ogrodem w dzień",
    "NeoCity, wille bliźniacze z prywatnymi basenami, widok z lotu ptaka w dzień", "NeoCity, willa bliźniacza, ogrody i baseny wieczorem",
    "NeoCity, willa wolnostojąca, widok narożny w dzień", "NeoCity, willa bliźniacza, wejście i parking w dzień",
    "NeoCity, wille bliźniacze, widok z lotu ptaka nocą", "NeoCity, willa wolnostojąca, tylna fasada wieczorem",
    "NeoCity, willa wolnostojąca, fasada nocą", "NeoCity, willa bliźniacza, narożnik i wejście w dzień",
  ],
  hint: "*Na telefonie dotknij zdjęcia, aby je powiększyć i przypiąć; dotknij ponownie, aby wrócić do widoku domyślnego.",
  overview: {
    kicker: "Przegląd",
    title: "NeoCity Przegląd",
    lead: "W NeoCity, najnowszym projekcie DND Cyprus, w centrum uwagi są tym razem lokalne rodziny i życie w willi. NeoCity powstaje tuż obok Famagusty i Tuzli, w dogodnej lokalizacji z łatwym dostępem do codziennych potrzeb, szkół i opieki zdrowotnej.",
    highlights: [
      "Rusza pierwszy z 3 etapów: 18 willi wolnostojących i 36 bliźniaczych, łącznie 54 wille",
      "Prywatny ogród przy każdej willi; opcjonalny prywatny basen",
      "Nowoczesna architektura śródziemnomorska, przestronne domy dla rodzin, dobre sąsiedztwo",
      "Na miejscu: market, apteka, restauracja, plac zabaw, obiekt sportowy i ścieżka spacerowa",
    ],
    chips: ["Dla rodzin", "Dom wolnostojący", "Płatność „5 zer”"],
    imageAlt: "NeoCity, willa wolnostojąca z prywatnym basenem i ogrodem",
  },
  facts: {
    kicker: "Najważniejsze informacje",
    title: "NeoCity Najważniejsze informacje",
    lead: "Szybki przegląd głównych cech projektu.",
    items: [["Lokalizacja", "Tuzla, Famagusta"], ["Oddanie", "kwiecień 2029"], ["Etap", "Etap 1 (z 3)"], ["Liczba willi", "54 (18 wolnost. · 36 bliźn.)"], ["Powierzchnia działki", "20 170 m²"], ["Powierzchnia zabudowy", "8 556 m²"]],
    note: "* Informacje mają charakter promocyjny. W sprawie ostatecznych szczegółów technicznych i handlowych skontaktuj się z naszym działem sprzedaży.",
  },
  site: {
    kicker: "Plan osiedla",
    title: "NeoCity Plan osiedla",
    lead: "W 1. etapie 54 wille stoją w trzech rzędach: 18 willi wolnostojących w górnym rzędzie i 36 bliźniaczych w dwóch środkowych. Przy głównej drodze: market, apteka i restauracja, obok teren zielony ze ścieżką spacerową, obiektem sportowym i placem zabaw.",
    day: "Dzień", night: "Noc",
    dayAlt: "Plan osiedla NeoCity z numerami willi, widok dzienny", nightAlt: "Plan osiedla NeoCity z numerami willi, widok nocny",
    stats: [["Powierzchnia działki", "20 170 m²"], ["Powierzchnia zabudowy", "8 556 m²"], ["Teren zielony", "1 920 m²"], ["Wille wolnostojące", "18"], ["Wille bliźniacze", "36"]],
    legend: ["Ścieżka spacerowa", "Obiekt sportowy", "Plac zabaw", "Teren zielony", "Parking", "Restauracja", "Market", "Apteka"],
    note: "* Zdjęcia mają charakter poglądowy. Dotknij planu, aby go powiększyć.",
  },
  interiors: {
    kicker: "Wnętrza",
    title: "NeoCity Wnętrza i design",
    lead: <>Przestronne salony, drewniane akcenty i jasne sypialnie: przykładowe wnętrza willi <strong>NeoCity</strong>.</>,
    labels: ["Sypialnia", "Salon", "Łazienka", "Jadalnia", "Salon", "Łazienka", "Sypialnia", "Salon i schody", "Kuchnia", "Kuchnia"],
    alt: (l) => `NeoCity, ${l.toLowerCase()} — wnętrze`,
  },
  plans: {
    kicker: "Plany pięter",
    title: "NeoCity Plany pięter",
    lead: "Plany pięter willi wolnostojącej i bliźniaczej. Szczegóły uzyskasz w naszym dziale sprzedaży.",
    note: "* Zdjęcia i wymiary mają charakter poglądowy. Typy, metraże i układy mogą się różnić.",
    ground: "Parter", first: "Piętro", single: "Willa wolnostojąca", twin: "Willa bliźniacza",
    singleSize: "175 m² zamknięta • 230 m² brutto", twinSize: "135 m² zamknięta • 164 m² brutto",
    singleNote: "55 m² tarasów i balkon · prywatny ogród · opcjonalny basen", twinNote: "29 m² tarasów i balkon · prywatny ogród · opcjonalny basen",
    singleGround: zip(["Wejście", "Salon", "Jadalnia i kuchnia", "WC", "Taras"], A.sg),
    singleFirst: zip(["Sypialnia główna", "Prysznic / WC przy sypialni", "Garderoba", "Pokój dziecięcy 1", "Pokój dziecięcy 2", "Prysznic / WC", "Korytarz i schody", "Balkon"], A.sf),
    twinGround: zip(["Salon z jadalnią", "Kuchnia", "WC", "Taras"], A.tg),
    twinFirst: zip(["Sypialnia główna", "Prysznic / WC przy sypialni", "Sypialnia 1", "Sypialnia 2", "Prysznic / WC", "Korytarz i schody", "Balkon"], A.tf),
  },
  payment: {
    kicker: "Model płatności",
    title: "„5 zer”: rewolucyjny plan płatności",
    lead: "Zarabiasz w lirach — dlaczego dom ma kosztować w funtach? Na Cyprze Północnym ceny mieszkań ustala się głównie w funtach szterlingach, a dochody mieszkańców to przeważnie liry tureckie. Wychodząc od tej rzeczywistości, DND Cyprus opracowało dla NeoCity innowacyjny model płatności w lirach, dopasowany do lokalnych dochodów.",
    zeros: ["Odsetki", "Bank", "Poręczyciel", "Dopłata za okres", "Ryzyko kursowe"],
    steps: ["Cena domu w lirach tureckich", "35% wkładu własnego", "Do 60 miesięcy na spłatę pozostałych 65%", "Nieoprocentowane finansowanie DND bez dopłaty za okres", "Część raty stała przez 5 lat", "Pozostała część aktualizowana co 6 miesięcy zgodnie ze wzrostem płacy minimalnej w TRCP"],
    quote: { h: "Kup willę bez banku, po dzisiejszej cenie w lirach.", p: "Cena willi jest ustalana w lirach w dniu podpisania umowy. Po wpłacie 35% pozostała kwota jest spłacana bezpośrednio na rzecz NeoCity przez 60 miesięcy." },
    cta: "Poproś o plan płatności",
    note: "* Plan płatności ma charakter promocyjny. Aktualne ceny i warunki uzyskasz w naszym dziale sprzedaży.",
  },
  amenities: {
    kicker: "Atuty",
    title: "NeoCity Udogodnienia",
    lead: "Udogodnienia na terenie osiedla, które ułatwiają codzienne życie, i otwarte przestrzenie dla rodzin.",
    items: [
      ["Prywatny ogród", "Własny ogród przy każdej willi, przez cały rok.", "garden"],
      ["Prywatny basen", "Opcjonalny prywatny basen dla każdej willi.", "pool"],
      ["Ścieżka spacerowa", "Ścieżka wzdłuż terenu zielonego.", "walk"],
      ["Obiekt sportowy", "Boisko do piłki nożnej i strefa sportu na miejscu.", "football"],
      ["Plac zabaw", "Bezpieczny i radosny plac zabaw dla dzieci.", "playground"],
      ["Teren zielony", "1 920 m² wspólnej zieleni.", "green"],
      ["Parking", "Miejsca parkingowe przed willami i wspólny parking.", "parking"],
      ["Restauracja", "Restauracja na terenie osiedla.", "restaurant"],
      ["Market", "Market z artykułami codziennymi na miejscu.", "market"],
      ["Apteka", "Apteka na terenie osiedla.", "pharmacy"],
    ],
  },
  location: {
    kicker: "Lokalizacja",
    title: "NeoCity Lokalizacja",
    lead: "Tuż obok Famagusty i Tuzli, przy drodze Nikozja–EMU: szkoły, opieka zdrowotna i zakupy w kilka minut.",
    address: "DAÜ Bağlantı Yolu (droga do EMU), Tuzla, Famagusta, Cypr Północny",
    nearby: ["Eastern Mediterranean University", "Doğa College", "Centrum Tuzli", "Famagusta"],
    distances: zipMin(["Market", "Centrum Tuzli", "EMU", "Doğa College", "Famagusta", "Szpital", "İskele", "Lotnisko Ercan"]),
  },
});

export const NEOCITY: ProjectData = { tr: TR, en: EN, de: DE, ru: RU, pl: PL };
