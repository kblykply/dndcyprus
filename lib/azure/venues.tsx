// Ana sayfa "DND ile yaşam ve ayrıcalıklar": kaydırmalı üç büyük kart (La Joya sitesindeki oda kartları gibi).
// Sıra kullanıcının isteği: Ülfet Shu → Ülfet Beach Club → Mariachi Beach Club. Her fotoğrafın sağ üst köşesinde mekânın
// logosu etiket olarak durur (bütün kartlarda aynı yer). Bilgiler: ayrıcalıklar lib/azure/pages.tsx ve
// home-flow.tsx ile aynı; adres, rezervasyon numarası, Instagram ve mekân bilgileri mekânların kendi Instagram
// biyografileri ve paylaşımlarından (Ekim 2026). Fiyat yazılmaz.
import type { Locale } from "./site";

export type VenueKey = "ulfet-shu" | "ulfet-beach" | "mariachi";
export type VenueImage = { src: string };
export type Venue = {
  key: VenueKey;
  /** mekânın kendi logosu; yoksa etiket gösterilmez (marka tipografisi uydurulmaz) */
  logo?: string;
  images: VenueImage[];
  instagram?: { handle: string; href: string };
  phone?: { display: string; tel: string };
  /** sitedeki sayfa (Mariachi) */
  path?: string;
};

export const VENUES: Venue[] = [
  {
    key: "ulfet-shu",
    logo: "/azure/venues/ulfet-shu-logo.png",
    // Ülfet Shu Instagram (Ekim 2026): dolu salon, DJ kabini, sahnede kemancı (dansçılı kare kurumsal sitede uygun değil); dikey reel kareleri kartın 3:2 oranına Kling ile yanlardan
    // genişletildi (salonda özgün pikseller ortada aynen; DJ karesi tamamen yeniden çizildi, mekân aynı; kemancı karesinde oynat simgesi temizlendi)
    images: [
      { src: "/azure/venues/ulfet-shu-salon.jpg" },
      { src: "/azure/venues/ulfet-shu-dj.jpg" },
      { src: "/azure/venues/ulfet-shu-keman.jpg" },
    ],
    instagram: { handle: "@ulfetshu", href: "https://www.instagram.com/ulfetshu/" },
    phone: { display: "0546 996 55 55", tel: "+905469965555" },
  },
  {
    key: "ulfet-beach",
    logo: "/azure/venues/ulfet-beach-logo.png",
    // havadan HD görünüm + Ülfet Beach Club Instagram (Ekim 2026): iskele ve kabanalar, giriş kapısı, yön tabelaları
    // (yanlardan genişletildi; girişteki kişi ve görsellerin üstündeki telefon/altyazı yazıları silindi)
    images: [
      { src: "/azure/pages/ulfet-beach.jpg" },
      { src: "/azure/venues/ulfet-beach-iskele.jpg" },
      { src: "/azure/venues/ulfet-beach-giris.jpg" },
      { src: "/azure/venues/ulfet-beach-tabela.jpg" },
    ],
    instagram: { handle: "@ulfetbeachclub", href: "https://www.instagram.com/ulfetbeachclub/" },
    phone: { display: "0546 994 55 55", tel: "+905469945555" },
  },
  {
    key: "mariachi",
    logo: "/logos/web/mariachi.webp",
    images: [
      { src: "/azure/mb-6.jpg" },
      { src: "/azure/mb-1.jpg" },
      { src: "/azure/mb-5.jpg" },
      { src: "/azure/mb-3.jpg" },
      { src: "/azure/mb-7.jpg" },
    ],
    path: "/mariachi",
  },
];

/** badge: kartta sıra numarasının yanında mercan etiket (açılış durumu) */
type VenueText = { name: string; sub: string; chips: string[]; bullets: string[]; badge?: string };
export type VenuesCopy = {
  ui: { prev: string; next: string; photo: (n: number) => string; reserve: string; discover: string; region: string };
  venues: Record<VenueKey, VenueText>;
};

export const VENUES_TEXT: Record<Locale, VenuesCopy> = {
  tr: {
    ui: { prev: "Önceki", next: "Sonraki", photo: (n) => `${n}. fotoğraf`, reserve: "Rezervasyon", discover: "Mariachi’yi keşfet", region: "DND ev sahiplerine özel mekânlar" },
    venues: {
      "ulfet-shu": { name: "Ülfet Shu", sub: "Girne Karaoğlanoğlu’nda deniz kıyısında yeni nesil meyhane.", chips: ["Karaoğlanoğlu, Girne", "%10 indirim"],
        bullets: ["DND ev sahiplerine ve La Joya misafirlerine %10 indirim", "Rakı, meze ve canlı müzik, deniz kıyısında", "80’ler ve 90’lar DJ geceleri, klarnet, darbuka ve keman"] },
      "ulfet-beach": { name: "Ülfet Beach Club", badge: "2027 yazında açılıyor", sub: "Karaoğlanoğlu’nda havuz, kabana ve deniz.", chips: ["Karaoğlanoğlu, Girne", "Ücretsiz giriş"],
        bullets: ["DND ev sahiplerine ücretsiz giriş", "Kabana, havuz, kokteyller ve deniz esintisi", "Hafta sonu havuz partileri ve DJ performansları"] },
      mariachi: { name: "Mariachi Beach Club", badge: "Yakında", sub: "Platin ödüllü plaj kulübünde DND ev sahiplerine ayrıcalık.", chips: ["Bahçeler, İskele", "Platin Ödül"],
        bullets: ["Ücretsiz giriş", "Restoran ve barda %10 indirim", "Plaj, 4 jakuzili havuz, pavilyonlar", "DJ geceleri"] },
    },
  },
  en: {
    ui: { prev: "Previous", next: "Next", photo: (n) => `Photo ${n}`, reserve: "Reservations", discover: "Discover Mariachi", region: "Venues reserved for DND homeowners" },
    venues: {
      "ulfet-shu": { name: "Ülfet Shu", sub: "A new-generation meyhane by the sea in Karaoğlanoğlu, Kyrenia.", chips: ["Karaoğlanoğlu, Kyrenia", "10% off"],
        bullets: ["10% off for DND homeowners and La Joya guests", "Rakı, meze and live music by the sea", "80s and 90s DJ nights with clarinet, darbuka and violin"] },
      "ulfet-beach": { name: "Ülfet Beach Club", badge: "Opening summer 2027", sub: "Pool, cabanas and the sea in Karaoğlanoğlu.", chips: ["Karaoğlanoğlu, Kyrenia", "Free entry"],
        bullets: ["Free entry for DND homeowners", "Cabanas, pool, cocktails and a sea breeze", "Weekend pool parties and DJ sets"] },
      mariachi: { name: "Mariachi Beach Club", badge: "Coming soon", sub: "Privileges for DND homeowners at the platinum award-winning beach club.", chips: ["Bahçeler, İskele", "Platinum Award"],
        bullets: ["Free entry", "10% off at the restaurant and bar", "Beach, pool with 4 jacuzzis, pavilions", "DJ nights"] },
    },
  },
  de: {
    ui: { prev: "Zurück", next: "Weiter", photo: (n) => `Foto ${n}`, reserve: "Reservierung", discover: "Mariachi entdecken", region: "Exklusive Orte für DND-Eigentümer" },
    venues: {
      "ulfet-shu": { name: "Ülfet Shu", sub: "Ein Meyhane der neuen Generation am Meer in Karaoğlanoğlu, Kyrenia.", chips: ["Karaoğlanoğlu, Kyrenia", "10 % Rabatt"],
        bullets: ["10 % Rabatt für DND-Eigentümer und Gäste von La Joya", "Rakı, Meze und Livemusik am Meer", "DJ-Abende mit Hits der 80er und 90er, Klarinette, Darbuka und Geige"] },
      "ulfet-beach": { name: "Ülfet Beach Club", badge: "Eröffnung Sommer 2027", sub: "Pool, Cabanas und Meer in Karaoğlanoğlu.", chips: ["Karaoğlanoğlu, Kyrenia", "Freier Eintritt"],
        bullets: ["Freier Eintritt für DND-Eigentümer", "Cabanas, Pool, Cocktails und Meeresbrise", "Poolpartys und DJ-Sets am Wochenende"] },
      mariachi: { name: "Mariachi Beach Club", badge: "Demnächst", sub: "Vorteile für DND-Eigentümer im mit Platin ausgezeichneten Beach Club.", chips: ["Bahçeler, İskele", "Platinpreis"],
        bullets: ["Freier Eintritt", "10 % Rabatt in Restaurant und Bar", "Strand, Pool mit 4 Whirlpools, Pavillons", "DJ-Abende"] },
    },
  },
  ru: {
    ui: { prev: "Назад", next: "Далее", photo: (n) => `Фото ${n}`, reserve: "Бронирование", discover: "Открыть Mariachi", region: "Места для владельцев DND" },
    venues: {
      "ulfet-shu": { name: "Ülfet Shu", sub: "Мейхане нового поколения у моря в Караогланоглу, Кирения.", chips: ["Караогланоглу, Кирения", "Скидка 10 %"],
        bullets: ["Скидка 10 % для владельцев DND и гостей La Joya", "Раки, мезе и живая музыка у моря", "DJ-вечера хитов 80-х и 90-х, кларнет, дарбука и скрипка"] },
      "ulfet-beach": { name: "Ülfet Beach Club", badge: "Открытие летом 2027", sub: "Бассейн, кабаны и море в Караогланоглу.", chips: ["Караогланоглу, Кирения", "Бесплатный вход"],
        bullets: ["Бесплатный вход для владельцев DND", "Кабаны, бассейн, коктейли и морской бриз", "Вечеринки у бассейна и DJ-сеты по выходным"] },
      mariachi: { name: "Mariachi Beach Club", badge: "Скоро", sub: "Привилегии для владельцев DND в пляжном клубе с платиновой наградой.", chips: ["Bahçeler, Искеле", "Платиновая награда"],
        bullets: ["Бесплатный вход", "Скидка 10 % в ресторане и баре", "Пляж, бассейн с 4 джакузи, павильоны", "DJ-вечеринки"] },
    },
  },
  pl: {
    ui: { prev: "Poprzedni", next: "Następny", photo: (n) => `Zdjęcie ${n}`, reserve: "Rezerwacje", discover: "Poznaj Mariachi", region: "Miejsca dla właścicieli DND" },
    venues: {
      "ulfet-shu": { name: "Ülfet Shu", sub: "Meyhane nowej generacji nad morzem w Karaoğlanoğlu, Kyrenia.", chips: ["Karaoğlanoğlu, Kyrenia", "10% zniżki"],
        bullets: ["10% zniżki dla właścicieli DND i gości La Joya", "Rakı, meze i muzyka na żywo nad morzem", "Wieczory DJ z hitami lat 80. i 90., klarnet, darbuka i skrzypce"] },
      "ulfet-beach": { name: "Ülfet Beach Club", badge: "Otwarcie latem 2027", sub: "Basen, kabany i morze w Karaoğlanoğlu.", chips: ["Karaoğlanoğlu, Kyrenia", "Bezpłatne wejście"],
        bullets: ["Bezpłatne wejście dla właścicieli DND", "Kabany, basen, koktajle i morska bryza", "Weekendowe imprezy przy basenie i sety DJ"] },
      mariachi: { name: "Mariachi Beach Club", badge: "Wkrótce", sub: "Przywileje dla właścicieli DND w nagrodzonym platyną klubie plażowym.", chips: ["Bahçeler, İskele", "Platynowa Nagroda"],
        bullets: ["Bezpłatne wejście", "10% zniżki w restauracji i barze", "Plaża, basen z 4 jacuzzi, pawilony", "Wieczory DJ"] },
    },
  },
};
