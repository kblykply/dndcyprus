// Ana sayfa akışı (Ekim 2026, müşterinin "DND Cyprus web sitesi akış" belgesi): 8 bölüm.
// 1 Hayalinizdeki yaşam (proje vitrini) · 2 Projelerimiz · 3 Neden DND · 4 Ödeme ve yatırım fırsatları ·
// 5 Yaşam ve ayrıcalıklar · 6 Rakamlarla DND · 7 Haberler ve ödüller · 8 Hayalinizdeki evi birlikte bulalım.
// Ana sayfada yalnız Kıbrıs anlatılır; Amerika (DND Homes, Boston) Hakkımızda'da. Rakamlar sitedeki doğrulanmış verilerden.
import type { ReactNode } from "react";
import type { Locale, ProjectSlug } from "./site";

export type HeroSlide = { slug: ProjectSlug; name: string; title: ReactNode; sub: string };

export type HomeFlow = {
  hero: { brand: string; cta: string; prev: string; next: string; pause: string; play: string; slides: HeroSlide[]; label: string };
  why: { kicker: string; title: ReactNode; lead: string; items: { icon: string; h: string; p: string }[]; imageAlt: string; imageTag: string };
  offers: {
    kicker: string; title: ReactNode; lead: string;
    /** kart başlığı büyük "60" ile bölünür: pre (varsa, sayının üstünde) · 60 · post; ayrıntı proje ve ödeme sayfalarında */
    tl: { k: string; pre: string; post: string };
    neo: { k: string; h: string; zeros: string[]; cta: string };
    note: string;
  };
  life: { kicker: string; title: ReactNode; lead: string; perk: { k: string; h: string; p: string; items: string[]; cta: string } };
  numbers: { kicker: string; title: ReactNode; items: { n: number; suffix?: string; label: string }[] };
  news: { kicker: string; awardsProject: string; homesProject: string };
  contact: { kicker: string; title: ReactNode; lead: string };
};

const TR: HomeFlow = {
  hero: {
    brand: "DND Cyprus — Hayalinizdeki yaşam burada başlıyor",
    label: "Projelerimiz",
    cta: "Projeyi keşfet", prev: "Önceki proje", next: "Sonraki proje", pause: "Durdur", play: "Oynat",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Yerli aileler için <b>villa yaşamı.</b></>, sub: "Tuzla, Gazimağusa · 54 villa · 5 Sıfır ödeme" },
      { slug: "lagoon-verde", name: "Lagoon Verde Rezidansları ve Tatil Köyü", title: <>Akdeniz’de yeni bir <b>yaşam ritmi.</b></>, sub: "Ötüken, İskele · 3.500 m² lagün" },
      { slug: "la-joya", name: "La Joya Resort & Residences", title: <>Tamamlandı, <b>yaşam başladı.</b></>, sub: "Long Beach, İskele · 74 konut · 2025’te teslim edildi" },
      { slug: "perla", name: "La Joya Perla", title: <>Dört mevsim <b>resort yaşamı.</b></>, sub: "Bahçeler, İskele · Denize 700 m · Sand pool ve spa" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>Perla yaşamının <b>butik devamı.</b></>, sub: "Bahçeler, İskele · Bahçeli ve özel havuzlu seçenekler" },
    ],
  },
  why: {
    kicker: "Neden DND?",
    title: <>Sözünü tutan bir <b>geliştirici.</b></>,
    lead: "Kuzey Kıbrıs’ta arsadan teslimata kadar her adımı kendi bünyemizde yönetiyoruz.",
    items: [
      { icon: "house", h: "Tasarımdan teslimata tek çatı", p: "Konut, ticari ve karma projelerde planlamadan teslime uçtan uca çözüm." },
      { icon: "key", h: "Zamanında teslim", p: "La Joya, 74 konutuyla 2025’te sahiplerine teslim edildi; yaşam başladı." },
      { icon: "gear", h: "Her projede standart donanım", p: "Merkezi ısıtma-soğutma, jeneratör, akıllı ev ve banyolarda yerden ısıtma." },
      { icon: "award", h: "Ödüllü projeler", p: "PropertyNC 2025’te üç ödül: Lagoon Verde, Mariachi Beach Club ve En İyi Yeni Girişim." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · 2025’te teslim edildi",
  },
  offers: {
    kicker: "Size özel ödeme ve yatırım fırsatları",
    title: <>Maaşınız TL, <b>taksitiniz de TL.</b></>,
    lead: "Bankasız, faizsiz ve kur riskinden uzak ödeme modelleriyle ev sahibi olmak artık daha kolay.",
    tl: { k: "Lagoon Verde · NeoCity · TL ödeme modeli", pre: "", post: "aya kadar faizsiz TL taksit" },
    neo: { k: "NeoCity · 5 Sıfır", h: "Villanızı bankasız, bugünkü TL fiyatla alın", zeros: ["Faiz", "Banka", "Kefil", "Vade farkı", "Kur farkı"], cta: "Ödeme planını gör" },
    note: "* Ödeme modelleri tanıtım amaçlıdır. Güncel koşullar için satış ekibimizle iletişime geçiniz.",
  },
  life: {
    kicker: "DND ile yaşam ve ayrıcalıklar",
    title: <>Ev sahibi olmak, <b>bir yaşam tarzı.</b></>,
    lead: "Resort yaşamı, sosyal alanlar ve DND ev sahiplerine özel ayrıcalıklar.",
    perk: { k: "DND ev sahiplerine özel", h: "Mariachi Beach Club", p: "Platin ödüllü plaj kulübünde DND ev sahiplerine ayrıcalık.", items: ["Ücretsiz giriş", "Restoran ve barda %10 indirim", "Plaj, 4 jakuzili havuz, pavilyonlar", "DJ geceleri"], cta: "Mariachi’yi keşfet" },
  },
  numbers: {
    kicker: "Rakamlarla DND",
    title: <>Kıbrıs’ta <b>büyüyen bir değer.</b></>,
    items: [
      { n: 74, label: "konut teslim edildi (La Joya, 2025)" },
      { n: 3, label: "PropertyNC 2025 ödülü" },
      { n: 60, label: "aya kadar faizsiz TL taksit" },
      { n: 27, label: "kişilik ekip" },
    ],
  },
  news: { kicker: "Haberler ve ödüller", awardsProject: "Ödüllü proje", homesProject: "DND Cyprus" },
  contact: { kicker: "İletişim", title: <>Hayalinizdeki evi <b>birlikte bulalım.</b></>, lead: "Size en uygun projeyi ve ödeme planını birlikte belirleyelim. Talebinizi iletin, ekibimiz 24–48 saat içinde dönüş yapsın." },
};

const EN: HomeFlow = {
  hero: {
    brand: "DND Cyprus — Your dream life starts here",
    label: "Our projects",
    cta: "Explore the project", prev: "Previous project", next: "Next project", pause: "Pause", play: "Play",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Villa living for <b>local families.</b></>, sub: "Tuzla, Famagusta · 54 villas · 5 Zeros payment" },
      { slug: "lagoon-verde", name: "Lagoon Verde Residences & Holiday Village", title: <>A new rhythm of life <b>on the Mediterranean.</b></>, sub: "Ötüken, İskele · 3,500 m² lagoon" },
      { slug: "la-joya", name: "La Joya Resort & Residences", title: <>Completed, <b>and life has begun.</b></>, sub: "Long Beach, İskele · 74 homes · Delivered in 2025" },
      { slug: "perla", name: "La Joya Perla", title: <>Resort living <b>all year round.</b></>, sub: "Bahçeler, İskele · 700 m to the sea · Sand pool and spa" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>The boutique sequel <b>to Perla living.</b></>, sub: "Bahçeler, İskele · Options with gardens and private pools" },
    ],
  },
  why: {
    kicker: "Why DND?",
    title: <>A developer that <b>keeps its word.</b></>,
    lead: "In North Cyprus we manage every step in-house, from the land to the keys.",
    items: [
      { icon: "house", h: "From design to delivery, under one roof", p: "End-to-end solutions for residential, commercial and mixed-use projects." },
      { icon: "key", h: "On-time delivery", p: "La Joya and its 74 homes were handed over in 2025 — life has begun." },
      { icon: "gear", h: "Standard features in every project", p: "Central heating and cooling, generator, smart home and underfloor heating in bathrooms." },
      { icon: "award", h: "Award-winning projects", p: "Three awards at PropertyNC 2025: Lagoon Verde, Mariachi Beach Club and Best Newcomer." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · Delivered in 2025",
  },
  offers: {
    kicker: "Payment and investment opportunities for you",
    title: <>Your salary in lira, <b>your instalments too.</b></>,
    lead: "Payment models with no bank, no interest and no currency risk make owning a home easier.",
    tl: { k: "Lagoon Verde · NeoCity · Lira payment model", pre: "Up to", post: "months of interest-free lira instalments" },
    neo: { k: "NeoCity · 5 Zeros", h: "Buy your villa without a bank, at today’s lira price", zeros: ["Interest", "Bank", "Guarantor", "Maturity charge", "FX risk"], cta: "See the payment plan" },
    note: "* Payment models are for promotional purposes. Please contact our sales team for current terms.",
  },
  life: {
    kicker: "Life and privileges with DND",
    title: <>Owning a home is <b>a way of life.</b></>,
    lead: "Resort living, social spaces and privileges reserved for DND homeowners.",
    perk: { k: "Exclusive to DND homeowners", h: "Mariachi Beach Club", p: "Privileges for DND homeowners at the platinum award-winning beach club.", items: ["Free entry", "10% off at the restaurant and bar", "Beach, pool with 4 jacuzzis, pavilions", "DJ nights"], cta: "Discover Mariachi" },
  },
  numbers: {
    kicker: "DND in numbers",
    title: <>Growing value <b>in Cyprus.</b></>,
    items: [
      { n: 74, label: "homes delivered (La Joya, 2025)" },
      { n: 3, label: "PropertyNC 2025 awards" },
      { n: 60, label: "months of interest-free lira instalments" },
      { n: 27, label: "team members" },
    ],
  },
  news: { kicker: "News and awards", awardsProject: "Award-winning project", homesProject: "DND Cyprus" },
  contact: { kicker: "Contact", title: <>Let’s find your dream home <b>together.</b></>, lead: "Let’s choose the right project and payment plan for you. Send your request and our team will get back to you within 24–48 hours." },
};

const DE: HomeFlow = {
  hero: {
    brand: "DND Cyprus — Ihr Traumleben beginnt hier",
    label: "Unsere Projekte",
    cta: "Projekt entdecken", prev: "Vorheriges Projekt", next: "Nächstes Projekt", pause: "Pausieren", play: "Abspielen",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Villenleben für <b>einheimische Familien.</b></>, sub: "Tuzla, Famagusta · 54 Villen · 5-Null-Zahlung" },
      { slug: "lagoon-verde", name: "Lagoon Verde Residences & Holiday Village", title: <>Ein neuer Lebensrhythmus <b>am Mittelmeer.</b></>, sub: "Ötüken, İskele · 3.500 m² Lagune" },
      { slug: "la-joya", name: "La Joya Resort & Residences", title: <>Fertiggestellt – <b>das Leben hat begonnen.</b></>, sub: "Long Beach, İskele · 74 Wohnungen · Übergeben 2025" },
      { slug: "perla", name: "La Joya Perla", title: <>Resort-Leben <b>zu jeder Jahreszeit.</b></>, sub: "Bahçeler, İskele · 700 m zum Meer · Sand pool und Spa" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>Die Boutique-Fortsetzung <b>von Perla.</b></>, sub: "Bahçeler, İskele · Mit Garten und Privatpool" },
    ],
  },
  why: {
    kicker: "Warum DND?",
    title: <>Ein Bauträger, der <b>Wort hält.</b></>,
    lead: "In Nordzypern steuern wir jeden Schritt selbst – vom Grundstück bis zur Schlüsselübergabe.",
    items: [
      { icon: "house", h: "Von der Planung bis zur Übergabe aus einer Hand", p: "Komplettlösungen für Wohn-, Gewerbe- und Mischprojekte." },
      { icon: "key", h: "Pünktliche Übergabe", p: "La Joya wurde 2025 mit 74 Wohnungen übergeben – das Leben hat begonnen." },
      { icon: "gear", h: "Standardausstattung in jedem Projekt", p: "Zentrale Heizung und Kühlung, Generator, Smart Home und Fußbodenheizung im Bad." },
      { icon: "award", h: "Preisgekrönte Projekte", p: "Drei Auszeichnungen bei PropertyNC 2025: Lagoon Verde, Mariachi Beach Club und Best Newcomer." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · Übergeben 2025",
  },
  offers: {
    kicker: "Zahlungs- und Investitionsangebote für Sie",
    title: <>Gehalt in Lira, <b>Raten auch in Lira.</b></>,
    lead: "Zahlungsmodelle ohne Bank, ohne Zinsen und ohne Währungsrisiko machen den Hauskauf leichter.",
    tl: { k: "Lagoon Verde · NeoCity · Lira-Zahlungsmodell", pre: "Bis zu", post: "Monate zinsfreie Raten in Lira" },
    neo: { k: "NeoCity · 5 Null", h: "Ihre Villa ohne Bank, zum heutigen Lira-Preis", zeros: ["Zinsen", "Bank", "Bürge", "Laufzeit", "Kursrisiko"], cta: "Zahlungsplan ansehen" },
    note: "* Die Zahlungsmodelle dienen Werbezwecken. Aktuelle Konditionen erhalten Sie von unserem Vertriebsteam.",
  },
  life: {
    kicker: "Leben und Vorteile mit DND",
    title: <>Eigentum ist <b>ein Lebensstil.</b></>,
    lead: "Resort-Leben, Gemeinschaftsflächen und exklusive Vorteile für DND-Eigentümer.",
    perk: { k: "Exklusiv für DND-Eigentümer", h: "Mariachi Beach Club", p: "Vorteile für DND-Eigentümer im mit Platin ausgezeichneten Beach Club.", items: ["Freier Eintritt", "10 % Rabatt in Restaurant und Bar", "Strand, Pool mit 4 Whirlpools, Pavillons", "DJ-Abende"], cta: "Mariachi entdecken" },
  },
  numbers: {
    kicker: "DND in Zahlen",
    title: <>Wachsende Werte <b>auf Zypern.</b></>,
    items: [
      { n: 74, label: "Wohnungen übergeben (La Joya, 2025)" },
      { n: 3, label: "Auszeichnungen bei PropertyNC 2025" },
      { n: 60, label: "Monate zinsfreie Raten in Lira" },
      { n: 27, label: "Teammitglieder" },
    ],
  },
  news: { kicker: "Neuigkeiten und Auszeichnungen", awardsProject: "Ausgezeichnetes Projekt", homesProject: "DND Cyprus" },
  contact: { kicker: "Kontakt", title: <>Finden wir Ihr Traumhaus <b>gemeinsam.</b></>, lead: "Wir wählen gemeinsam das passende Projekt und den passenden Zahlungsplan. Senden Sie uns Ihre Anfrage – wir melden uns innerhalb von 24–48 Stunden." },
};

const RU: HomeFlow = {
  hero: {
    brand: "DND Cyprus — жизнь вашей мечты начинается здесь",
    label: "Наши проекты",
    cta: "Узнать о проекте", prev: "Предыдущий проект", next: "Следующий проект", pause: "Пауза", play: "Воспроизвести",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Жизнь в вилле <b>для местных семей.</b></>, sub: "Тузла, Фамагуста · 54 виллы · Оплата «5 нулей»" },
      { slug: "lagoon-verde", name: "Lagoon Verde Residences & Holiday Village", title: <>Новый ритм жизни <b>на Средиземном море.</b></>, sub: "Ötüken, Искеле · лагуна 3 500 m²" },
      { slug: "la-joya", name: "La Joya Resort & Residences", title: <>Построено — <b>жизнь началась.</b></>, sub: "Long Beach, Искеле · 74 квартиры · Сдан в 2025 году" },
      { slug: "perla", name: "La Joya Perla", title: <>Курортная жизнь <b>круглый год.</b></>, sub: "Bahçeler, Искеле · 700 m до моря · Sand pool и спа" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>Бутиковое продолжение <b>Perla.</b></>, sub: "Bahçeler, Искеле · Варианты с садом и частным бассейном" },
    ],
  },
  why: {
    kicker: "Почему DND?",
    title: <>Застройщик, который <b>держит слово.</b></>,
    lead: "На Северном Кипре мы ведём каждый этап сами — от участка до передачи ключей.",
    items: [
      { icon: "house", h: "От проекта до сдачи — в одних руках", p: "Комплексные решения для жилых, коммерческих и смешанных проектов." },
      { icon: "key", h: "Сдача в срок", p: "La Joya с 74 квартирами передана владельцам в 2025 году — жизнь началась." },
      { icon: "gear", h: "Стандартное оснащение в каждом проекте", p: "Центральное отопление и кондиционирование, генератор, умный дом и тёплый пол в ванных." },
      { icon: "award", h: "Проекты-лауреаты", p: "Три награды PropertyNC 2025: Lagoon Verde, Mariachi Beach Club и «Лучший новичок»." },
    ],
    imageAlt: "La Joya Resort & Residences, Искеле",
    imageTag: "La Joya · Сдан в 2025 году",
  },
  offers: {
    kicker: "Особые условия оплаты и инвестиций",
    title: <>Зарплата в лирах — <b>и взносы в лирах.</b></>,
    lead: "Модели оплаты без банка, процентов и валютного риска упрощают покупку дома.",
    tl: { k: "Lagoon Verde · NeoCity · Оплата в лирах", pre: "До", post: "месяцев беспроцентной рассрочки в лирах" },
    neo: { k: "NeoCity · «5 нулей»", h: "Вилла без банка, по сегодняшней цене в лирах", zeros: ["Проценты", "Банк", "Поручитель", "Надбавка", "Курс"], cta: "План оплаты" },
    note: "* Модели оплаты носят рекламный характер. Актуальные условия уточняйте у отдела продаж.",
  },
  life: {
    kicker: "Жизнь и привилегии с DND",
    title: <>Свой дом — <b>это образ жизни.</b></>,
    lead: "Курортная жизнь, общественные пространства и привилегии для владельцев DND.",
    perk: { k: "Только для владельцев DND", h: "Mariachi Beach Club", p: "Привилегии для владельцев DND в пляжном клубе с платиновой наградой.", items: ["Бесплатный вход", "Скидка 10 % в ресторане и баре", "Пляж, бассейн с 4 джакузи, павильоны", "DJ-вечеринки"], cta: "Узнать о Mariachi" },
  },
  numbers: {
    kicker: "DND в цифрах",
    title: <>Растущая ценность <b>на Кипре.</b></>,
    items: [
      { n: 74, label: "квартиры сданы (La Joya, 2025)" },
      { n: 3, label: "награды PropertyNC 2025" },
      { n: 60, label: "месяцев беспроцентной рассрочки в лирах" },
      { n: 27, label: "человек в команде" },
    ],
  },
  news: { kicker: "Новости и награды", awardsProject: "Проект-лауреат", homesProject: "DND Cyprus" },
  contact: { kicker: "Контакты", title: <>Найдём дом вашей мечты <b>вместе.</b></>, lead: "Вместе подберём подходящий проект и план оплаты. Оставьте заявку — мы ответим в течение 24–48 часов." },
};

const PL: HomeFlow = {
  hero: {
    brand: "DND Cyprus — życie Twoich marzeń zaczyna się tutaj",
    label: "Nasze projekty",
    cta: "Poznaj projekt", prev: "Poprzedni projekt", next: "Następny projekt", pause: "Wstrzymaj", play: "Odtwórz",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Życie w willi <b>dla lokalnych rodzin.</b></>, sub: "Tuzla, Famagusta · 54 wille · Płatność „5 zer”" },
      { slug: "lagoon-verde", name: "Lagoon Verde Residences & Holiday Village", title: <>Nowy rytm życia <b>nad Morzem Śródziemnym.</b></>, sub: "Ötüken, İskele · laguna 3 500 m²" },
      { slug: "la-joya", name: "La Joya Resort & Residences", title: <>Ukończone — <b>życie się zaczęło.</b></>, sub: "Long Beach, İskele · 74 mieszkania · Oddane w 2025" },
      { slug: "perla", name: "La Joya Perla", title: <>Życie jak w kurorcie <b>przez cały rok.</b></>, sub: "Bahçeler, İskele · 700 m od morza · Sand pool i spa" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>Butikowa kontynuacja <b>Perli.</b></>, sub: "Bahçeler, İskele · Opcje z ogrodem i prywatnym basenem" },
    ],
  },
  why: {
    kicker: "Dlaczego DND?",
    title: <>Deweloper, który <b>dotrzymuje słowa.</b></>,
    lead: "Na Cyprze Północnym prowadzimy każdy etap sami — od działki po przekazanie kluczy.",
    items: [
      { icon: "house", h: "Od projektu do odbioru w jednych rękach", p: "Kompleksowe rozwiązania dla projektów mieszkaniowych, komercyjnych i mieszanych." },
      { icon: "key", h: "Terminowe oddanie", p: "La Joya z 74 mieszkaniami została oddana w 2025 roku — życie się zaczęło." },
      { icon: "gear", h: "Standardowe wyposażenie w każdym projekcie", p: "Centralne ogrzewanie i chłodzenie, generator, inteligentny dom i ogrzewanie podłogowe w łazienkach." },
      { icon: "award", h: "Nagradzane projekty", p: "Trzy nagrody PropertyNC 2025: Lagoon Verde, Mariachi Beach Club i Best Newcomer." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · Oddane w 2025",
  },
  offers: {
    kicker: "Wyjątkowe możliwości płatności i inwestycji",
    title: <>Pensja w lirach, <b>raty też w lirach.</b></>,
    lead: "Modele płatności bez banku, odsetek i ryzyka kursowego ułatwiają zakup domu.",
    tl: { k: "Lagoon Verde · NeoCity · Płatność w lirach", pre: "Do", post: "miesięcy nieoprocentowanych rat w lirach" },
    neo: { k: "NeoCity · „5 zer”", h: "Willa bez banku, po dzisiejszej cenie w lirach", zeros: ["Odsetki", "Bank", "Poręczyciel", "Dopłata", "Kurs"], cta: "Zobacz plan płatności" },
    note: "* Modele płatności mają charakter promocyjny. Aktualne warunki uzyskasz w naszym dziale sprzedaży.",
  },
  life: {
    kicker: "Życie i przywileje z DND",
    title: <>Własny dom to <b>styl życia.</b></>,
    lead: "Życie jak w kurorcie, przestrzenie wspólne i przywileje dla właścicieli DND.",
    perk: { k: "Tylko dla właścicieli DND", h: "Mariachi Beach Club", p: "Przywileje dla właścicieli DND w nagrodzonym platyną klubie plażowym.", items: ["Bezpłatne wejście", "10% zniżki w restauracji i barze", "Plaża, basen z 4 jacuzzi, pawilony", "Wieczory DJ"], cta: "Poznaj Mariachi" },
  },
  numbers: {
    kicker: "DND w liczbach",
    title: <>Rosnąca wartość <b>na Cyprze.</b></>,
    items: [
      { n: 74, label: "mieszkania oddane (La Joya, 2025)" },
      { n: 3, label: "nagrody PropertyNC 2025" },
      { n: 60, label: "miesięcy nieoprocentowanych rat w lirach" },
      { n: 27, label: "osób w zespole" },
    ],
  },
  news: { kicker: "Aktualności i nagrody", awardsProject: "Nagrodzony projekt", homesProject: "DND Cyprus" },
  contact: { kicker: "Kontakt", title: <>Znajdźmy razem <b>dom Twoich marzeń.</b></>, lead: "Wspólnie wybierzemy odpowiedni projekt i plan płatności. Wyślij zapytanie — odpowiemy w ciągu 24–48 godzin." },
};

export const HOME_FLOW: Record<Locale, HomeFlow> = { tr: TR, en: EN, de: DE, ru: RU, pl: PL };
