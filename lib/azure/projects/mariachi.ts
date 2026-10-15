// Mariachi Beach Club avantajları (proje sayfalarında ortak) — eski app/components/mariachi/MariachiPerks.tsx
// ve en/mariachi/MariachiPerks.tsx içindeki MARIACHI_DEFAULTS + perks verisinden birebir taşındı.
import type { Locale } from "@/lib/azure/site";

export const MARIACHI_MEDIA = {
  logo: "/logos/mariachi.png",
  youtubeId: "AobeR8p2Aq4",
  embedQuery: "autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=AobeR8p2Aq4&playsinline=1&modestbranding=1",
  bg: "/mariachi/7.jpg",
  zoom: 1.6,   // orijinal videonun yan bantlarını kırpmak için
};

export type MariachiPerk = { title: string; desc: string; icon: "Waves" | "BadgePercent" };

export const MARIACHI_PERKS: Record<Locale, {
  kicker: string;
  title: string;
  subtitle: string;
  note: string;
  href: string;
  cta: string;
  ctaAria: string;
  videoTitle: string;
  videoPosterAlt: string;
  videoPlayLabel: string;
  perks: MariachiPerk[];
}> = {
  tr: {
    kicker: "Mariachi Beach Club",
    title: "DND Ev Sahiplerine Mariachi Beach Club Avantajları",
    subtitle: "Gündüz deniz & güneş, akşam ritim — tek adreste.",
    note: "Kimlik doğrulaması gerekebilir. Kampanya tarihleri ve gün koşulları değişebilir.",
    href: "/tr/mariachi",
    cta: "Mariachi Sayfası",
    ctaAria: "Mariachi sayfasına git",
    videoTitle: "Mariachi Beach Club tanıtım videosu",
    videoPosterAlt: "Mariachi Beach Club tanıtım videosu kapak görseli",
    videoPlayLabel: "Mariachi Beach Club videosunu oynat",
    perks: [
      { title: "Ücretsiz Giriş", desc: "Proje sakinleri ve misafirleri için giriş ücreti alınmaz.", icon: "Waves" },
      { title: "%10 İndirim", desc: "Restoran, havuz barı ve şezlong/cabana harcamalarında ekstra avantaj.", icon: "BadgePercent" },
    ],
  },
  en: {
    kicker: "Mariachi Beach Club",
    title: "Mariachi Beach Club Benefits for DND Homeowners",
    subtitle: "Sea & sun by day, rhythm by night — all in one place.",
    note: "ID verification may be required. Campaign dates and applicable days are subject to change.",
    href: "/en/mariachi",
    cta: "Mariachi Page",
    ctaAria: "Go to the Mariachi page",
    videoTitle: "Mariachi Beach Club promotional video",
    videoPosterAlt: "Mariachi Beach Club promotional video thumbnail",
    videoPlayLabel: "Play the Mariachi Beach Club video",
    perks: [
      { title: "Free Entry", desc: "No entrance fee for residents and their guests.", icon: "Waves" },
      { title: "10% Discount", desc: "Extra benefits on restaurant, pool bar, and sunbed/cabana spend.", icon: "BadgePercent" },
    ],
  },
};
