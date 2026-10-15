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
  de: {
    kicker: "Mariachi Beach Club",
    title: "Vorteile im Mariachi Beach Club für DND-Eigentümer",
    subtitle: "Tagsüber Meer & Sonne, abends Rhythmus – alles an einem Ort.",
    note: "Ein Ausweis kann verlangt werden. Aktionszeiträume und gültige Tage können sich ändern.",
    href: "/de/mariachi",
    cta: "Mariachi-Seite",
    ctaAria: "Zur Mariachi-Seite wechseln",
    videoTitle: "Imagevideo des Mariachi Beach Club",
    videoPosterAlt: "Vorschaubild des Imagevideos des Mariachi Beach Club",
    videoPlayLabel: "Video des Mariachi Beach Club abspielen",
    perks: [
      { title: "Freier Eintritt", desc: "Kein Eintritt für Bewohner und ihre Gäste.", icon: "Waves" },
      { title: "10% Rabatt", desc: "Zusätzliche Vorteile im Restaurant, an der Poolbar sowie bei Sonnenliegen und Cabanas.", icon: "BadgePercent" },
    ],
  },
  ru: {
    kicker: "Mariachi Beach Club",
    title: "Привилегии Mariachi Beach Club для владельцев DND",
    subtitle: "Днём — море и солнце, вечером — ритм. Всё в одном месте.",
    note: "Может потребоваться удостоверение личности. Сроки акций и дни их действия могут меняться.",
    href: "/ru/mariachi",
    cta: "Страница Mariachi",
    ctaAria: "Перейти на страницу Mariachi",
    videoTitle: "Промо-ролик Mariachi Beach Club",
    videoPosterAlt: "Обложка промо-ролика Mariachi Beach Club",
    videoPlayLabel: "Смотреть видео Mariachi Beach Club",
    perks: [
      { title: "Бесплатный вход", desc: "Для жителей и их гостей вход свободный.", icon: "Waves" },
      { title: "Скидка 10%", desc: "Дополнительная выгода в ресторане, баре у бассейна, а также на шезлонги и кабаны.", icon: "BadgePercent" },
    ],
  },
  pl: {
    kicker: "Mariachi Beach Club",
    title: "Przywileje Mariachi Beach Club dla właścicieli DND",
    subtitle: "Za dnia morze i słońce, wieczorem rytm – wszystko w jednym miejscu.",
    note: "Może być wymagane okazanie dokumentu tożsamości. Terminy promocji i obowiązujące dni mogą ulec zmianie.",
    href: "/pl/mariachi",
    cta: "Strona Mariachi",
    ctaAria: "Przejdź do strony Mariachi",
    videoTitle: "Film promocyjny Mariachi Beach Club",
    videoPosterAlt: "Miniatura filmu promocyjnego Mariachi Beach Club",
    videoPlayLabel: "Odtwórz film Mariachi Beach Club",
    perks: [
      { title: "Bezpłatny wstęp", desc: "Mieszkańcy i ich goście nie płacą za wstęp.", icon: "Waves" },
      { title: "10% zniżki", desc: "Dodatkowe korzyści w restauracji, pool barze oraz przy leżakach i cabanach.", icon: "BadgePercent" },
    ],
  },
};
