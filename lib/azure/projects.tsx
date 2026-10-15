// Proje sayfaları (Azure hero + iletişim kartı) için metinler — mevcut Perla2Hero/Perla2CTA/LeadForm varsayılanlarından taşındı.
import type { Locale } from "./site";

export type ProjectPage = {
  slug: "lagoon-verde" | "perla-ii" | "perla" | "la-joya";
  name: string;
  logo: string;
  image: string;        // hero (fotogerçekçi)
  ctaImage: string;
  brochure?: Record<Locale, string | undefined>;
  tagline: Record<Locale, string>;
  location: Record<Locale, string>;
  status: Record<Locale, string>;
  delivery: Record<Locale, string>;
  award?: Record<Locale, string>;
  chips: Record<Locale, { big: string; label: string }[]>;
  ctaLead: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  unitTypes: Record<Locale, string[]>;
};

export const PROJECT_PAGES: Record<ProjectPage["slug"], ProjectPage> = {
  "lagoon-verde": {
    slug: "lagoon-verde", name: "Lagoon Verde", logo: "/logos/lagoon.png", image: "/azure/lv-5.jpg", ctaImage: "/azure/lv-7.jpg",
    brochure: { tr: "/lagoonbrotr.pdf", en: "#catalog" },
    tagline: { tr: "Bahçeler, İskele'de modern yaşam ve yatırım fırsatı.", en: "Modern living and investment opportunity in Bahçeler, İskele." },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele" },
    status: { tr: "Devam Eden", en: "Ongoing" },
    delivery: { tr: "Teslim: Aralık 2028", en: "Delivery: December 2028" },
    award: { tr: "Altın Ödül · PropertyNC 2025", en: "Gold Award · PropertyNC 2025" },
    chips: { tr: [{ big: "354", label: "Rezidans" }, { big: "43.179", label: "m² arsa" }, { big: "60", label: "aya kadar TL taksit" }], en: [{ big: "354", label: "Residences" }, { big: "43,179", label: "m² plot" }, { big: "60", label: "months, lira instalments" }] },
    ctaLead: { tr: "Ötüken, İskele — doğayla iç içe, Long Beach'e yakın konum. Stüdyo, 1+1 Loft ve 2+1 seçenekleri; geniş teras ve çatı terasları.", en: "Ötüken, İskele — immersed in nature, close to Long Beach. Studio, 1+1 Loft and 2+1 options with spacious terraces and roof terraces." },
    highlights: { tr: ["Lagün havuzu & Aqua Park", "Mini Golf", "Spor alanları & fitness", "Spa & wellness", "Mariachi Beach Club erişimi", "Long Beach'e yakın"], en: ["Lagoon pool & Aqua Park", "Mini Golf", "Sports areas & fitness", "Spa & wellness", "Access to Mariachi Beach Club", "Close to Long Beach"] },
    unitTypes: { tr: ["1+0 Studio Residence", "1+1 Loft Residence", "2+1 Roof Residence", "2+1 Garden Residence"], en: ["1+0 Studio Residence", "1+1 Loft Residence", "2+1 Roof Residence", "2+1 Garden Residence"] },
  },
  "perla-ii": {
    slug: "perla-ii", name: "La Joya Perla II", logo: "/logos/perlaii.png", image: "/azure/p2-1.jpg", ctaImage: "/azure/p2-9.jpg",
    tagline: { tr: "Bahçeler, İskele'de modern yaşam ve yatırım fırsatı.", en: "Modern living and investment opportunity in Bahçeler, İskele." },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele" },
    status: { tr: "Devam Eden", en: "Ongoing" },
    delivery: { tr: "Teslim: Mayıs 2027", en: "Delivery: May 2027" },
    chips: { tr: [{ big: "128", label: "Birim" }, { big: "8.800", label: "m² arsa" }, { big: "1+0 · 2+1", label: "Daire tipleri" }], en: [{ big: "128", label: "Units" }, { big: "8,800", label: "m² plot" }, { big: "1+0 · 2+1", label: "Unit types" }] },
    ctaLead: { tr: "Bahçeler, İskele — denize ve günlük ihtiyaçlara yakın konum. Stüdyo, 1+1 ve 2+1 seçenekleri; geniş balkon, teras ve çatı terasları.", en: "Bahçeler, İskele — close to the sea and daily amenities. Studio, 1+1 and 2+1 options with spacious balconies, terraces and roof terraces." },
    highlights: { tr: ["Lagün & ada havuzları", "Aquapark & mini golf", "Long Beach'e yakın", "Geniş balkon/teras"], en: ["Lagoon & island pools", "Aquapark & mini golf", "Close to Long Beach", "Spacious balconies/terraces"] },
    unitTypes: { tr: ["1+0 Stüdyo", "1+1 Loft", "2+1 Çatı Teraslı", "2+1 Bahçeli"], en: ["1+0 Studio", "1+1 Loft", "2+1 Roof Terrace", "2+1 Garden"] },
  },
  perla: {
    slug: "perla", name: "La Joya Perla", logo: "/logos/perla.png", image: "/azure/p1-7.jpg", ctaImage: "/azure/p1-4.jpg",
    tagline: { tr: "Bahçeler, İskele'de denize 700 m, yıl boyu lüks ve konfor.", en: "700 m from the sea in Bahçeler, İskele — year-round luxury and comfort." },
    location: { tr: "Bahçeler, İskele", en: "Bahçeler, İskele" },
    status: { tr: "Devam Eden", en: "Ongoing" },
    delivery: { tr: "Teslim: Kasım 2026", en: "Delivery: November 2026" },
    chips: { tr: [{ big: "700 m", label: "Denize" }, { big: "Sand pool", label: "Kapalı havuz & spa" }, { big: "1+0 · 2+1", label: "Daire tipleri" }], en: [{ big: "700 m", label: "To the sea" }, { big: "Sand pool", label: "Indoor pool & spa" }, { big: "1+0 · 2+1", label: "Unit types" }] },
    ctaLead: { tr: "Bahçeler, İskele — denize ve günlük ihtiyaçlara yakın konum. Stüdyo, 1+1 ve 2+1 seçenekleri; geniş balkon, teras ve çatı terasları.", en: "Bahçeler, İskele — close to the sea and daily amenities. Studio, 1+1 and 2+1 options with spacious balconies, terraces and rooftop terraces." },
    highlights: { tr: ["Lagün & ada havuzları", "Aquapark & mini golf", "Long Beach'e yakın", "Geniş balkon/teras"], en: ["Lagoon & island-style pools", "Aquapark & mini golf", "Close to Long Beach", "Spacious balconies/terraces"] },
    unitTypes: { tr: ["1+0 Stüdyo", "1+1", "2+1"], en: ["1+0 Studio", "1+1", "2+1"] },
  },
  "la-joya": {
    slug: "la-joya", name: "La Joya", logo: "/logos/lajoya.png", image: "/azure/lj-2.jpg", ctaImage: "/azure/lj-5.jpg",
    tagline: { tr: "Long Beach, İskele'de denize 500 m mesafede, yatay mimarili modern yaşam.", en: "Modern, low-rise living just 500 m from the sea in Long Beach, İskele." },
    location: { tr: "Long Beach, İskele", en: "Long Beach, İskele" },
    status: { tr: "Tamamlanan Proje", en: "Completed Project" },
    delivery: { tr: "Teslim: 2025", en: "Delivered: 2025" },
    chips: { tr: [{ big: "74", label: "Konut" }, { big: "500 m", label: "Denize" }, { big: "2025", label: "Teslim edildi" }], en: [{ big: "74", label: "Homes" }, { big: "500 m", label: "To the sea" }, { big: "2025", label: "Delivered" }] },
    ctaLead: { tr: "Long Beach, İskele — denize 500 m. Yatay mimarili 1+1 Loft, 2+1 Penthouse ve 1+0 Stüdyo seçenekleri; loftlarda havuza direkt erişim, penthouselarda çatı terası & jakuzi.", en: "Long Beach, İskele — 500 m from the sea. Low-rise 1+1 loft, 2+1 penthouse and 1+0 studio options; direct pool access from lofts, rooftop terraces & jacuzzi in penthouses." },
    highlights: { tr: ["Açık yüzme havuzları", "Gym / Spor Salonu", "Restoran & Pool Bar", "Mariachi Beach Club üyeliği", "Denize 500 m", "Yatay mimari — 74 konut"], en: ["Outdoor swimming pools", "Gym / Fitness Center", "Restaurant & Pool Bar", "Mariachi Beach Club membership", "500 m to the sea", "Low-rise architecture — 74 residences"] },
    unitTypes: { tr: ["1+0 Stüdyo", "1+1 Loft", "2+1 Penthouse"], en: ["1+0 Studio", "1+1 Loft", "2+1 Penthouse"] },
  },
};
