// Azure proje şablonunun arayüz metinleri (veri dosyalarında olmayan düğme/etiket yazıları).
// Eski bileşenlerdeki TR/EN etiketlerden taşındı.
import type { Locale } from "./site";

export const PROJECT_UI = {
  tr: {
    ids: { gallery: "galeri", overview: "genel-bakis", facts: "bilgiler", tech: "teknik-donanim", interiors: "ic-mekan", floorPlans: "kat-planlari", mariachi: "mariachi", amenities: "olanaklar", tour: "sanal-tur", location: "konum", update: "guncelleme" },
    gallery: { aria: "Galeri", item: (i: number) => `Galeri görseli ${i}` },
    tech: { prev: "Önceki", next: "Sonraki", list: "Teknik donanım listesi", page: (i: number) => `Sayfa ${i}` },
    interiors: { tabs: "Açılar" },
    floor: {
      types: "Daire Tipleri", variants: "Varyantlar",
      enlarge: "Büyüt", enlargeAria: "Görseli büyüt", pdf: "PDF",
      gallery: "Galeri", galleryImage: (i: number) => `Galeri görseli ${i}`,
      closed: "Toplam Kapalı Alan", usage: "Toplam Kullanım Alanı",
      close: "Kapat", prev: "Önceki", next: "Sonraki", planImage: "Plan Görseli", lightbox: "Galeri büyütülmüş görünüm",
      planAlt: (plan: string, variant: string) => `${plan} — ${variant} kat planı`,
    },
    tour: { start: "360 Turu Başlat", open: "Yeni sekmede aç", fs: "Fullscreen", exitFs: "Çık", exitFsAria: "Fullscreen'den çık" },
    location: { address: "Adres:", google: "Google Haritalar ile Yol Tarifi", apple: "Apple Haritalar ile Yol Tarifi", open: "Haritada Aç", mapTitle: "Proje Konumu" },
    update: { videoTitle: "Son İnşaat Güncellemesi" },
  },
  en: {
    ids: { gallery: "gallery", overview: "overview", facts: "key-facts", tech: "technical-features", interiors: "interiors", floorPlans: "floor-plans", mariachi: "mariachi", amenities: "amenities", tour: "virtual-tour", location: "location", update: "update" },
    gallery: { aria: "Gallery", item: (i: number) => `Gallery image ${i}` },
    tech: { prev: "Previous", next: "Next", list: "Technical features list", page: (i: number) => `Page ${i}` },
    interiors: { tabs: "Angles" },
    floor: {
      types: "Apartment types", variants: "Variants",
      enlarge: "Enlarge", enlargeAria: "Enlarge image", pdf: "PDF",
      gallery: "Gallery", galleryImage: (i: number) => `Gallery image ${i}`,
      closed: "Total Covered Area", usage: "Total Usable Area",
      close: "Close", prev: "Previous", next: "Next", planImage: "Floor Plan", lightbox: "Enlarged gallery view",
      planAlt: (plan: string, variant: string) => `${plan} — ${variant} floor plan`,
    },
    tour: { start: "Start 360 Tour", open: "Open in new tab", fs: "Fullscreen", exitFs: "Exit", exitFsAria: "Exit fullscreen" },
    location: { address: "Address:", google: "Get Directions with Google Maps", apple: "Get Directions with Apple Maps", open: "Open on Map", mapTitle: "Project location" },
    update: { videoTitle: "Latest Construction Update" },
  },
} as const satisfies Record<Locale, unknown>;

export type ProjectUi = (typeof PROJECT_UI)[Locale];
