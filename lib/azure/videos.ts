import type { Locale } from "./site";

/** Ana sayfa video bölümü (VideoShowcase): slaytlar ve arayüz metinleri, beş dil. */
export type VideoSlide = {
  id: string;
  /** Sitede barındırılan video (Instagram reel'leri); verilmezse YouTube */
  src?: string;
  poster?: string;
  youtube?: string;
  /** Dikey (9:16) video: telefonda 4:5, geniş ekranda yanları bulanık kopyayla dolar */
  vertical?: boolean;
  tag: string;
  /** [düz, vurgulu] başlık parçaları */
  title: [string, string];
  lead: string;
  bullets: string[];
  primary: { label: string; path: string };
  secondary?: { label: string; path: string };
};

export type VideoUi = {
  region: string; next: string;
  prev: string; nextAria: string; goTo: (n: number) => string;
  mute: string; unmute: string; fullscreen: string; exitFullscreen: string;
};

const TL_1 = { id: "tl-odeme", src: "/videos/tl-odeme-modeli.mp4", poster: "/videos/tl-odeme-modeli.jpg", vertical: true } as const;
const TL_2 = { id: "lv-tl", src: "/videos/lagoon-verde-tl-odeme.mp4", poster: "/videos/lagoon-verde-tl-odeme.jpg", vertical: true } as const;
const OPEN = { id: "lajoya-acilis", youtube: "GKH4VSPH57E" } as const;
const TOUR = { id: "lajoya-tur", youtube: "hMbzVAJMzXo" } as const;
const KKTC = { id: "kktc", youtube: "JNKcu1APZO0" } as const;

export const VIDEO_SLIDES: Record<Locale, VideoSlide[]> = {
  tr: [
    { ...TL_1, tag: "Yeni ödeme modeli", title: ["Maaşınız TL,", "taksitiniz de TL"], lead: "Size özel yeni konut finansman modeliyle ev sahibi olmak artık daha kolay.",
      bullets: ["Banka yok, faiz yok, kefil yok", "Kur farkı ve vade farkı yok; 60 aya kadar vade", "Taksitler KKTC asgari ücretine göre güncellenir"],
      primary: { label: "Lagoon Verde'yi incele", path: "/lagoon-verde" }, secondary: { label: "Bilgi al", path: "/contact" } },
    { ...TL_2, tag: "Lagoon Verde", title: ["Lagoon Verde'de", "TL ile ev sahibi olun"], lead: "Maaşınız TL ise, hayalinizdeki eve giden yol da TL ile olsun.",
      bullets: ["Tüm ödemeler Türk Lirası ile", "Banka, faiz ve kur farkı yok", "Sınırlı sayıda rezidans"],
      primary: { label: "Lagoon Verde'yi incele", path: "/lagoon-verde" }, secondary: { label: "İletişime geç", path: "/contact" } },
    { ...OPEN, tag: "La Joya · Açılış", title: ["La Joya", "açıldı"], lead: "İskele Long Beach'teki 74 rezidanslık La Joya, resmi açılışla sahiplerini ağırlamaya başladı.",
      bullets: ["Resmi açılış: 1 Kasım 2025, İskele", "Ev sahipleri, iş ortakları ve ekibimizle kutlama", "Yalın mimari çizgiler, sosyal alanlar ve sahil atmosferi"],
      primary: { label: "La Joya'yı keşfet", path: "/la-joya" }, secondary: { label: "İletişime geç", path: "/contact" } },
    { ...TOUR, tag: "La Joya · Tur", title: ["La Joya", "rezidans turu"], lead: "Denizle iç içe, yalın ve modern hatların buluştuğu bir sahne.",
      bullets: ["Sahil ritmini alan minimal mimari", "Geniş sosyal alanlar ve yürüyüş rotaları", "Gün batımında doğal ışık senaryosu"],
      primary: { label: "Projeyi incele", path: "/la-joya" }, secondary: { label: "İletişime geç", path: "/contact" } },
    { ...KKTC, tag: "Kuzey Kıbrıs", title: ["Kuzey Kıbrıs", "tanıtım videosu"], lead: "Zamanla değer kazanan, iyi tasarlanmış bir yaşam ekosistemi.",
      bullets: ["Esnek ödeme ve teslim kolaylıkları", "Yüksek doluluk hedefi ve yönetim", "Uzun vadeli değer odaklı yaklaşım"],
      primary: { label: "Hakkımızda", path: "/about" }, secondary: { label: "Diğer projeler", path: "/projects" } },
  ],
  en: [
    { ...OPEN, tag: "La Joya · Opening", title: ["La Joya", "is now open"], lead: "A new life on the Mediterranean coast has begun with the official opening.",
      bullets: ["Official opening: November 1, 2025, İskele", "Celebrated with homeowners, partners and our team", "Clean lines, social spaces, beachfront atmosphere"],
      primary: { label: "Discover La Joya", path: "/la-joya" }, secondary: { label: "Contact us", path: "/contact" } },
    { ...TOUR, tag: "La Joya · Tour", title: ["La Joya", "residence tour"], lead: "Take a closer look at La Joya, where simple, modern lines meet the Mediterranean.",
      bullets: ["Minimal architecture in the rhythm of the coast", "Spacious social areas and walking routes", "Natural lighting scenarios at sunset"],
      primary: { label: "Explore the project", path: "/la-joya" }, secondary: { label: "Contact us", path: "/contact" } },
    { ...KKTC, tag: "Northern Cyprus", title: ["Northern Cyprus", "introduction video"], lead: "A well-designed living ecosystem that gains value over time.",
      bullets: ["Flexible payment and delivery options", "High occupancy goals and management", "Long-term, value-oriented approach"],
      primary: { label: "About us", path: "/about" }, secondary: { label: "Other projects", path: "/projects" } },
  ],
  de: [
    { ...OPEN, tag: "La Joya · Eröffnung", title: ["La Joya", "ist eröffnet"], lead: "Mit der offiziellen Eröffnung beginnt ein neues Leben an der Mittelmeerküste.",
      bullets: ["Offizielle Eröffnung: 1. November 2025, İskele", "Gefeiert mit Eigentümern, Partnern und Team", "Klare Linien, Gemeinschaftsflächen, Strandflair"],
      primary: { label: "La Joya entdecken", path: "/la-joya" }, secondary: { label: "Kontakt aufnehmen", path: "/contact" } },
    { ...TOUR, tag: "La Joya · Rundgang", title: ["Rundgang durch", "La Joya"], lead: "Erleben Sie La Joya aus der Nähe: schlichte, moderne Linien treffen auf das Meer.",
      bullets: ["Minimalistische Architektur im Rhythmus der Küste", "Großzügige Gemeinschaftsflächen und Spazierwege", "Natürliches Licht bei Sonnenuntergang"],
      primary: { label: "Projekt ansehen", path: "/la-joya" }, secondary: { label: "Kontakt aufnehmen", path: "/contact" } },
    { ...KKTC, tag: "Nordzypern", title: ["Nordzypern", "im Video"], lead: "Ein durchdachtes Lebensumfeld, das mit der Zeit an Wert gewinnt.",
      bullets: ["Flexible Zahlungs- und Übergabeoptionen", "Hohe Auslastung und professionelle Verwaltung", "Langfristiger, wertorientierter Ansatz"],
      primary: { label: "Über uns", path: "/about" }, secondary: { label: "Weitere Projekte", path: "/projects" } },
  ],
  ru: [
    { ...OPEN, tag: "La Joya · Открытие", title: ["La Joya", "открыт"], lead: "С официальным открытием на средиземноморском побережье началась новая жизнь.",
      bullets: ["Официальное открытие: 1 ноября 2025 г., Искеле", "Праздник с владельцами, партнёрами и командой", "Чистые линии, общие зоны, атмосфера пляжа"],
      primary: { label: "Откройте La Joya", path: "/la-joya" }, secondary: { label: "Связаться с нами", path: "/contact" } },
    { ...TOUR, tag: "La Joya · Тур", title: ["Тур по резиденциям", "La Joya"], lead: "Взгляните на La Joya поближе: простота и современные линии на фоне Средиземного моря.",
      bullets: ["Минималистичная архитектура в ритме побережья", "Просторные общие зоны и прогулочные маршруты", "Игра естественного света на закате"],
      primary: { label: "Смотреть проект", path: "/la-joya" }, secondary: { label: "Связаться с нами", path: "/contact" } },
    { ...KKTC, tag: "Северный Кипр", title: ["Видео о", "Северном Кипре"], lead: "Продуманная среда для жизни, которая со временем только растёт в цене.",
      bullets: ["Гибкие условия оплаты и сдачи", "Высокая загрузка и профессиональное управление", "Долгосрочный, ценностный подход"],
      primary: { label: "О нас", path: "/about" }, secondary: { label: "Другие проекты", path: "/projects" } },
  ],
  pl: [
    { ...OPEN, tag: "La Joya · Otwarcie", title: ["Oficjalnie otworzyliśmy", "La Joya"], lead: "Wraz z oficjalnym otwarciem na wybrzeżu Morza Śródziemnego zaczęło się nowe życie.",
      bullets: ["Oficjalne otwarcie: 1 listopada 2025, İskele", "Święto z właścicielami, partnerami i zespołem", "Czyste linie, strefy wspólne, plażowa atmosfera"],
      primary: { label: "Poznaj La Joya", path: "/la-joya" }, secondary: { label: "Skontaktuj się z nami", path: "/contact" } },
    { ...TOUR, tag: "La Joya · Prezentacja", title: ["Prezentacja rezydencji", "La Joya"], lead: "La Joya z bliska: prostota i nowoczesne linie w bliskim sąsiedztwie morza.",
      bullets: ["Minimalistyczna architektura w rytmie wybrzeża", "Przestronne strefy wspólne i ścieżki spacerowe", "Gra naturalnego światła o zachodzie słońca"],
      primary: { label: "Zobacz projekt", path: "/la-joya" }, secondary: { label: "Skontaktuj się z nami", path: "/contact" } },
    { ...KKTC, tag: "Cypr Północny", title: ["Film o", "Cyprze Północnym"], lead: "Przemyślane miejsce do życia, którego wartość rośnie z czasem.",
      bullets: ["Elastyczne warunki płatności i terminy oddania", "Wysokie obłożenie i sprawne zarządzanie", "Długoterminowe podejście nastawione na wartość"],
      primary: { label: "O nas", path: "/about" }, secondary: { label: "Inne projekty", path: "/projects" } },
  ],
};

export const VIDEO_UI: Record<Locale, VideoUi> = {
  tr: { region: "Video galerisi", next: "Sıradaki", prev: "Önceki video", nextAria: "Sonraki video", goTo: (n) => `${n}. videoya git`,
    mute: "Sesi kapat", unmute: "Sesi aç", fullscreen: "Tam ekran", exitFullscreen: "Tam ekrandan çık" },
  en: { region: "Video gallery", next: "Up next", prev: "Previous video", nextAria: "Next video", goTo: (n) => `Go to video ${n}`,
    mute: "Mute", unmute: "Unmute", fullscreen: "Fullscreen", exitFullscreen: "Exit fullscreen" },
  de: { region: "Videogalerie", next: "Als Nächstes", prev: "Vorheriges Video", nextAria: "Nächstes Video", goTo: (n) => `Zu Video ${n}`,
    mute: "Ton aus", unmute: "Ton an", fullscreen: "Vollbild", exitFullscreen: "Vollbild beenden" },
  ru: { region: "Видеогалерея", next: "Далее", prev: "Предыдущее видео", nextAria: "Следующее видео", goTo: (n) => `Перейти к видео ${n}`,
    mute: "Выключить звук", unmute: "Включить звук", fullscreen: "Во весь экран", exitFullscreen: "Выйти из полноэкранного режима" },
  pl: { region: "Galeria wideo", next: "Następny", prev: "Poprzedni film", nextAria: "Następny film", goTo: (n) => `Przejdź do filmu ${n}`,
    mute: "Wyłącz dźwięk", unmute: "Włącz dźwięk", fullscreen: "Pełny ekran", exitFullscreen: "Zamknij pełny ekran" },
};
