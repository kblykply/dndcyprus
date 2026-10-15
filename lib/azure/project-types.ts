// Azure proje sayfası şablonu için veri tipleri.
// Her proje için lib/azure/projects/<slug>.tsx dosyası ProjectData (tr + en) dışa aktarır.
// Metinler, m² değerleri, görseller ve JSON-LD eski bileşenlerden birebir taşınır.
import type { ReactNode } from "react";
import type { Locale } from "./site";

export type Accent = "sea" | "coral";

/* ---- Galeri (eski Perla2Gallery) ---- */
export type GalleryItem = { src: string; alt: string; label?: string };
export type ProjectGallery = {
  kicker: string;          // kısa üst etiket (ör. "Galeri" / "Gallery")
  title: string;           // eski h2 metni birebir
  lead?: string;           // eski alt başlık (subtitle)
  items: GalleryItem[];
  hint?: string;           // eski "*Mobilde bir görsele dokunarak…" notu
};

/* ---- Genel bakış (eski Perla2Overview) ---- */
export type ProjectOverview = {
  kicker: string;
  title: string;
  lead: string;
  highlights: string[];
  chips: { label: string; accent: Accent }[];   // eski "micro chips"
  image: string;                                 // eski imagePrimary
  imageAlt: string;
  youtubeId?: string | null;                     // eski embedUrl'den çıkarılan kimlik
  videoTitle: string;                            // LazyYouTube title
  videoPosterAlt: string;
  videoPlayLabel?: string;
};

/* ---- Öne çıkan bilgiler (eski Perla2Facts) ---- */
export type ProjectFact = { label: string; value: string; accent: Accent };
export type ProjectFacts = {
  kicker: string;
  title: string;
  lead: string;
  items: ProjectFact[];
  note: string;                                  // eski "* Bilgiler tanıtım amaçlıdır…" notu
  jsonLd: Record<string, unknown>;               // eski PROJECT_JSON_LD birebir (SITE_URL ile)
};

/* ---- Teknik donanım (eski LaJoyaTechnicalFacilities) ---- */
export type TechItem = { title: string; desc: string; image: string; icon: string }; // icon: lucide-react adı ("Wind")
export type ProjectTech = {
  kicker: string;
  title: string;
  lead: string;
  badge: string;                                 // kart rozeti: "Özellik" / "Feature"
  items: TechItem[];
};

/* ---- İç mekân (eski Hotspots) ---- */
export type InteriorAngle = { id: string; name: string; image: string; alt: string };
export type ProjectInteriors = {
  kicker: string;
  title: string;
  lead: ReactNode;                               // eski <p> içeriği (<strong> dahil)
  angles: InteriorAngle[];
};

/* ---- Kat planları (eski Perla2FloorPlans) ---- */
export type AreaRow = { label: string; value: string };
export type PlanVariant = {
  name: string;
  note?: string;
  image: string;
  pdf?: string;
  areas: AreaRow[];
  gallery?: string[];
  totals?: { closed?: string; usage?: string };  // eski totals.kapali / totals.kullanim
};
export type FloorPlan = {
  id: string;
  title: string;
  size?: string;
  note?: string;
  variants: PlanVariant[];
};
export type ProjectFloorPlans = {
  kicker: string;
  title: string;
  lead: string;
  plans: FloorPlan[];
  note: string;                                  // eski "* Görseller ve ölçüler temsilidir…" notu
};

/* ---- Olanaklar (eski Charts) ---- */
export type AmenityItem = { label: string; desc: string; icon: string; accent: Accent }; // icon: lucide-react adı
export type ProjectAmenities = {
  kicker: string;
  title: string;
  lead: string;
  items: AmenityItem[];
};

/* ---- 360° tur (eski Perla2Amenities / LagoonVerde360Section) ---- */
export type ProjectTour = {
  kicker: string;
  title: string;
  lead: string;
  src: string;                                   // eski TOUR_SRC
  bg: string;                                    // eski BG_IMAGE
  poster: string;                                // eski POSTER_IMAGE
  iframeTitle: string;
};

/* ---- Konum (eski Perla2Location) ---- */
export type Distance = { label: string; km?: number; m?: number; accent: Accent; note?: string };
export type ProjectLocation = {
  kicker: string;
  title: string;
  lead: string;
  address: string;
  lat: number;
  lng: number;
  embedSrc?: string;
  nearby: string[];
  distances: Distance[];
};

/* ---- Son güncelleme (eski Perla2Timeline; değerler SAYFADAN gelen prop'lar) ---- */
export type ProjectUpdate = {
  eyebrow: string;
  title: string;
  description: string;
  video: { src: string; type?: "youtube" | "vimeo" | "mp4"; title?: string; poster?: string };
  cta?: { label: string; href: string };
  bullets: string[];                             // eski sabit iki madde
  comingSoon: boolean;                           // eski comingSoon varsayılanı (true ise bölüm bulanık + kaplama)
  placeholderText?: string;
  placeholderSub?: string;                       // eski "Güncelleme hazırlanıyor."
};

export type ProjectContent = {
  gallery: ProjectGallery;
  overview: ProjectOverview;
  facts: ProjectFacts;
  tech: ProjectTech;
  interiors: ProjectInteriors;
  floorPlans: ProjectFloorPlans;
  amenities: ProjectAmenities;
  tour?: ProjectTour;                            // la-joya'da yok
  location: ProjectLocation;
  catalog: boolean;                              // DeferredCatalog (flipbook) var mı
  update?: ProjectUpdate;                        // lagoon-verde'de yok
};

export type ProjectData = Record<Locale, ProjectContent>;
