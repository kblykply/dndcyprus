// Ana sayfa akışı (Ekim 2026, müşterinin "DND Cyprus web sitesi akış" belgesi): 8 bölüm.
// 1 Hayalinizdeki yaşam (proje vitrini) · 2 Projelerimiz · 3 Neden DND · 4 Ödeme ve yatırım fırsatları ·
// 5 Yaşam ve ayrıcalıklar · 6 Rakamlarla DND · 7 Haberler ve ödüller · 8 Hayalinizdeki evi birlikte bulalım.
// Ana sayfada yalnız Kıbrıs anlatılır; Amerika (DND Homes, Boston) Hakkımızda'da. Rakamlar sitedeki doğrulanmış verilerden.
import type { ReactNode } from "react";
import type { Locale, ProjectSlug } from "./site";

export type HeroSlide = { slug: ProjectSlug; name: string; title: ReactNode; sub: string };

export type HomeFlow = {
  hero: { brand: string; cta: string; prev: string; next: string; pause: string; play: string; slides: HeroSlide[]; label: string };
  why: { kicker: string; title: ReactNode; lead: string; more: string[]; motto: string; items: { icon: string; h: string; p: string }[]; imageAlt: string; imageTag: string; videoTitle: string };
  offers: {
    kicker: string; title: ReactNode; lead: string;
    /** kart başlığı büyük "60" ile bölünür: pre (varsa, sayının üstünde) · 60 · post; ayrıntı proje ve ödeme sayfalarında */
    tl: { k: string; pre: string; post: string };
    neo: { k: string; h: string; zeros: string[]; cta: string };
    note: string;
  };
  life: { kicker: string; title: ReactNode; lead: string };
  numbers: { kicker: string; title: ReactNode; items: { n: number; suffix?: string; label: string }[] };
  news: { kicker: string; awardsProject: string; homesProject: string };
  contact: { kicker: string; title: ReactNode; lead: string };
};

const TR: HomeFlow = {
  hero: {
    brand: "DND Cyprus — Yaşamı yeniden tanımlıyoruz",
    label: "Projelerimiz",
    cta: "Projeyi keşfet", prev: "Önceki proje", next: "Sonraki proje", pause: "Durdur", play: "Oynat",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Yerli aileler için <b>villa yaşamı.</b></>, sub: "Gazimağusa Bölgesi · 50 villa · 5 Sıfır ödeme" },
      { slug: "lagoon-verde", name: "Lagoon Verde", title: <>Akdeniz’de yeni bir <b>yaşam ritmi.</b></>, sub: "Ötüken, İskele · 3.500 m² lagün" },
      { slug: "la-joya", name: "La Joya", title: <>La Joya, yaşayan bir <b>Akdeniz destinasyonu.</b></>, sub: "Bahçeler, İskele · 74 konut · 2025’te teslim edildi" },
      { slug: "perla", name: "La Joya Perla", title: <>Dört mevsim <b>resort yaşamı.</b></>, sub: "Bahçeler, İskele · Denize 700 m · Kum görünümlü ada havuzu ve sosyal yaşam olanakları" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>İskele’de ayrıcalıklı <b>bir yaşam.</b></>, sub: "Bahçeler, İskele · Bahçeli ve özel havuzlu rezidanslar" },
    ],
  },
  why: {
    kicker: "Neden DND Cyprus?",
    title: <>Çünkü biz sadece ev değil, <b>gelecek inşa ediyoruz.</b></>,
    lead: "Boston’dan Kuzey Kıbrıs’a uzanan uluslararası deneyimimizle, mimari kaliteyi, güveni ve yenilikçi yaşam konseptlerini bir araya getiriyoruz.",
    more: ["DND Cyprus olarak yalnızca konut değil, sosyal alanları, zengin olanakları ve ayrıcalıklı yaşam tarzlarıyla fark yaratan destinasyonlar geliştiriyoruz.", "Zamanında teslim ettiğimiz projelerimiz, yatırımcılarımıza sunduğumuz yenilikçi ödeme modellerimiz ve satış sonrası hizmetlerimizle verdiğimiz sözlerin arkasında duruyoruz."],
    motto: "DND Cyprus. Güvenle yatırım yapın, ayrıcalıkla yaşayın.",
    items: [
      { icon: "key", h: "Zamanında teslim", p: "La Joya, 74 konutuyla 2025’te sahiplerine teslim edildi; yaşam başladı." },
      { icon: "award", h: "Ödüllü projeler", p: "PropertyNC 2025’te üç ödül: Lagoon Verde, Mariachi Beach Club ve En İyi Yeni Girişim." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · 2025’te teslim edildi",
    videoTitle: "La Joya açılış videosu",
  },
  offers: {
    kicker: "DND’den Devrimsel TL Ödeme Modeli",
    title: <>Maaşınız TL, <b>taksitiniz de TL.</b></>,
    lead: "Bankasız, faizsiz ve kur riskinden uzak ödeme modelleriyle ev sahibi olmak artık daha kolay.",
    tl: { k: "Lagoon Verde · TL ödeme modeli", pre: "", post: "aya kadar faizsiz TL taksit" },
    neo: { k: "NeoCity · 5 Sıfır", h: "Villanızı bankasız, bugünkü TL fiyatla alın", zeros: ["Faiz", "Banka", "Kefil", "Vade farkı", "Kur farkı"], cta: "Ödeme planını gör" },
    note: "* Ödeme modelleri tanıtım amaçlıdır. Güncel koşullar için satış ekibimizle iletişime geçiniz.",
  },
  life: {
    // Netice Hanım'ın üç ifadesi (9 Kasım 2026): başlık, üst yazı ve alt cümle
    kicker: "DND Ev Sahiplerine Beach Club Ayrıcalıkları",
    title: <>DND Lifestyle – <b>Sahilde de Ayrıcalıklısınız</b></>,
    lead: "DND ile hayat sahilde de güzel: resort yaşamı, sosyal alanlar ve DND ev sahiplerine özel ayrıcalıklar.",
  },
  numbers: {
    kicker: "Rakamlarla DND",
    title: <>Kıbrıs’ta <b>büyüyen bir değer.</b></>,
    items: [
      // Patron 21.11.2026 (WhatsApp): "5 Özgün Proje, Toplam 1000+ Rezidans, 3 Prestijli Gayrimenkul
      // Ödülü, Yenilikçi TL Ödeme Modeli". 60 = TL modelinin vadesi (Lagoon Verde + NeoCity).
      { n: 5, label: "Kıbrıs’ta özgün proje" },
      { n: 1000, suffix: "+", label: "rezidans" },
      { n: 3, label: "prestijli gayrimenkul ödülü (PropertyNC 2025)" },
      { n: 60, label: "aya varan yenilikçi TL ödeme modeli" },
    ],
  },
  news: { kicker: "Haberler ve ödüller", awardsProject: "Ödüllü proje", homesProject: "DND Cyprus" },
  contact: { kicker: "İletişim", title: <>Hayalinizdeki evi <b>birlikte bulalım.</b></>, lead: "Size en uygun projeyi ve ödeme planını birlikte belirleyelim. Talebinizi iletin, ekibimiz 24–48 saat içinde dönüş yapsın." },
};

const EN: HomeFlow = {
  hero: {
    brand: "DND Cyprus — Redefining how you live",
    label: "Our projects",
    cta: "Explore the project", prev: "Previous project", next: "Next project", pause: "Pause", play: "Play",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Villa living for <b>local families.</b></>, sub: "Famagusta Region · 50 villas · 5 Zeros payment" },
      { slug: "lagoon-verde", name: "Lagoon Verde", title: <>A new rhythm of life <b>on the Mediterranean.</b></>, sub: "Ötüken, İskele · 3,500 m² lagoon" },
      { slug: "la-joya", name: "La Joya", title: <>La Joya, a living <b>Mediterranean destination.</b></>, sub: "Bahçeler, İskele · 74 homes · Delivered in 2025" },
      { slug: "perla", name: "La Joya Perla", title: <>Resort living <b>all year round.</b></>, sub: "Bahçeler, İskele · 700 m to the sea · Sand-look island pool and social amenities" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>A privileged life <b>in İskele.</b></>, sub: "Bahçeler, İskele · Residences with gardens and private pools" },
    ],
  },
  why: {
    kicker: "Why DND Cyprus?",
    title: <>Because we don’t just build homes, <b>we build the future.</b></>,
    lead: "With international experience stretching from Boston to North Cyprus, we bring together architectural quality, trust and innovative living concepts.",
    more: ["At DND Cyprus we don’t just develop homes; we create destinations that stand out for their social spaces, rich amenities and exclusive lifestyles.", "With projects delivered on time, innovative payment models for our investors and dedicated after-sales service, we stand behind every promise we make."],
    motto: "DND Cyprus. Invest with confidence, live with privilege.",
    items: [
      { icon: "key", h: "On-time delivery", p: "La Joya and its 74 homes were handed over in 2025 — life has begun." },
      { icon: "award", h: "Award-winning projects", p: "Three awards at PropertyNC 2025: Lagoon Verde, Mariachi Beach Club and Best Newcomer." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · Delivered in 2025",
    videoTitle: "La Joya opening video",
  },
  offers: {
    kicker: "DND’s Revolutionary Lira Payment Model",
    title: <>Your salary in lira, <b>your instalments too.</b></>,
    lead: "Payment models with no bank, no interest and no currency risk make owning a home easier.",
    tl: { k: "Lagoon Verde · Lira payment model", pre: "Up to", post: "months of interest-free lira instalments" },
    neo: { k: "NeoCity · 5 Zeros", h: "Buy your villa without a bank, at today’s lira price", zeros: ["Interest", "Bank", "Guarantor", "Maturity charge", "FX risk"], cta: "See the payment plan" },
    note: "* Payment models are for promotional purposes. Please contact our sales team for current terms.",
  },
  life: {
    kicker: "Beach Club Privileges for DND Homeowners",
    title: <>DND Lifestyle – <b>Privileged on the Beach, Too</b></>,
    lead: "With DND, life is beautiful on the beach too: resort living, social spaces and privileges reserved for DND homeowners.",
  },
  numbers: {
    kicker: "DND in numbers",
    title: <>Growing value <b>in Cyprus.</b></>,
    items: [
      { n: 5, label: "distinctive projects in Cyprus" },
      { n: 1000, suffix: "+", label: "residences" },
      { n: 3, label: "prestigious property awards (PropertyNC 2025)" },
      { n: 60, label: "months: our innovative lira payment model" },
    ],
  },
  news: { kicker: "News and awards", awardsProject: "Award-winning project", homesProject: "DND Cyprus" },
  contact: { kicker: "Contact", title: <>Let’s find your dream home <b>together.</b></>, lead: "Let’s choose the right project and payment plan for you. Send your request and our team will get back to you within 24–48 hours." },
};

const DE: HomeFlow = {
  hero: {
    brand: "DND Cyprus — Wir definieren das Leben neu",
    label: "Unsere Projekte",
    cta: "Projekt entdecken", prev: "Vorheriges Projekt", next: "Nächstes Projekt", pause: "Pausieren", play: "Abspielen",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Villenleben für <b>einheimische Familien.</b></>, sub: "Region Famagusta · 50 Villen · 5-Null-Zahlung" },
      { slug: "lagoon-verde", name: "Lagoon Verde", title: <>Ein neuer Lebensrhythmus <b>am Mittelmeer.</b></>, sub: "Ötüken, İskele · 3.500 m² Lagune" },
      { slug: "la-joya", name: "La Joya", title: <>La Joya, ein lebendiges <b>Reiseziel am Mittelmeer.</b></>, sub: "Bahçeler, İskele · 74 Wohnungen · Übergeben 2025" },
      { slug: "perla", name: "La Joya Perla", title: <>Resort-Leben <b>zu jeder Jahreszeit.</b></>, sub: "Bahçeler, İskele · 700 m zum Meer · Inselpool in Sandoptik und Gemeinschaftsangebote" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>Ein privilegiertes Leben <b>in İskele.</b></>, sub: "Bahçeler, İskele · Residenzen mit Garten und Privatpool" },
    ],
  },
  why: {
    kicker: "Warum DND Cyprus?",
    title: <>Denn wir bauen nicht nur Häuser, <b>wir bauen Zukunft.</b></>,
    lead: "Mit internationaler Erfahrung von Boston bis Nordzypern vereinen wir architektonische Qualität, Vertrauen und innovative Wohnkonzepte.",
    more: ["Bei DND Cyprus entwickeln wir nicht nur Wohnungen, sondern Destinationen, die sich durch Gemeinschaftsflächen, vielfältige Annehmlichkeiten und einen exklusiven Lebensstil auszeichnen.", "Mit pünktlich übergebenen Projekten, innovativen Zahlungsmodellen für unsere Investoren und unserem After-Sales-Service stehen wir zu unserem Wort."],
    motto: "DND Cyprus. Mit Vertrauen investieren, mit Privilegien leben.",
    items: [
      { icon: "key", h: "Pünktliche Übergabe", p: "La Joya wurde 2025 mit 74 Wohnungen übergeben – das Leben hat begonnen." },
      { icon: "award", h: "Preisgekrönte Projekte", p: "Drei Auszeichnungen bei PropertyNC 2025: Lagoon Verde, Mariachi Beach Club und Best Newcomer." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · Übergeben 2025",
    videoTitle: "Eröffnungsvideo von La Joya",
  },
  offers: {
    kicker: "Das revolutionäre Lira-Zahlungsmodell von DND",
    title: <>Gehalt in Lira, <b>Raten auch in Lira.</b></>,
    lead: "Zahlungsmodelle ohne Bank, ohne Zinsen und ohne Währungsrisiko machen den Hauskauf leichter.",
    tl: { k: "Lagoon Verde · Lira-Zahlungsmodell", pre: "Bis zu", post: "Monate zinsfreie Raten in Lira" },
    neo: { k: "NeoCity · 5 Null", h: "Ihre Villa ohne Bank, zum heutigen Lira-Preis", zeros: ["Zinsen", "Bank", "Bürge", "Laufzeit", "Kursrisiko"], cta: "Zahlungsplan ansehen" },
    note: "* Die Zahlungsmodelle dienen Werbezwecken. Aktuelle Konditionen erhalten Sie von unserem Vertriebsteam.",
  },
  life: {
    kicker: "Beach-Club-Vorteile für DND-Eigentümer",
    title: <>DND Lifestyle – <b>auch am Strand privilegiert</b></>,
    lead: "Mit DND ist das Leben auch am Strand schön: Resort-Leben, Gemeinschaftsflächen und exklusive Vorteile für DND-Eigentümer.",
  },
  numbers: {
    kicker: "DND in Zahlen",
    title: <>Wachsende Werte <b>auf Zypern.</b></>,
    items: [
      { n: 5, label: "einzigartige Projekte auf Zypern" },
      { n: 1000, suffix: "+", label: "Residenzen" },
      { n: 3, label: "renommierte Immobilienpreise (PropertyNC 2025)" },
      { n: 60, label: "Monate: unser innovatives Zahlungsmodell in Lira" },
    ],
  },
  news: { kicker: "Neuigkeiten und Auszeichnungen", awardsProject: "Ausgezeichnetes Projekt", homesProject: "DND Cyprus" },
  contact: { kicker: "Kontakt", title: <>Finden wir Ihr Traumhaus <b>gemeinsam.</b></>, lead: "Wir wählen gemeinsam das passende Projekt und den passenden Zahlungsplan. Senden Sie uns Ihre Anfrage – wir melden uns innerhalb von 24–48 Stunden." },
};

const RU: HomeFlow = {
  hero: {
    brand: "DND Cyprus — мы заново определяем жизнь",
    label: "Наши проекты",
    cta: "Узнать о проекте", prev: "Предыдущий проект", next: "Следующий проект", pause: "Пауза", play: "Воспроизвести",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Жизнь в вилле <b>для местных семей.</b></>, sub: "Район Фамагусты · 50 вилл · Оплата «5 нулей»" },
      { slug: "lagoon-verde", name: "Lagoon Verde", title: <>Новый ритм жизни <b>на Средиземном море.</b></>, sub: "Ötüken, Искеле · лагуна 3 500 m²" },
      { slug: "la-joya", name: "La Joya", title: <>La Joya — живое <b>средиземноморское направление.</b></>, sub: "Bahçeler, Искеле · 74 квартиры · Сдан в 2025 году" },
      { slug: "perla", name: "La Joya Perla", title: <>Курортная жизнь <b>круглый год.</b></>, sub: "Bahçeler, Искеле · 700 m до моря · Островной бассейн с эффектом песка и пространства для общения" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>Привилегированная жизнь <b>в Искеле.</b></>, sub: "Bahçeler, Искеле · Резиденции с садом и частным бассейном" },
    ],
  },
  why: {
    kicker: "Почему DND Cyprus?",
    title: <>Потому что мы строим не просто дома, <b>мы строим будущее.</b></>,
    lead: "Опираясь на международный опыт — от Бостона до Северного Кипра, — мы объединяем архитектурное качество, надёжность и инновационные концепции жизни.",
    more: ["DND Cyprus создаёт не просто жильё, а места притяжения с общественными пространствами, богатой инфраструктурой и особым образом жизни.", "Проекты, сданные в срок, инновационные модели оплаты для инвесторов и послепродажное обслуживание — так мы держим своё слово."],
    motto: "DND Cyprus. Инвестируйте с уверенностью, живите с привилегиями.",
    items: [
      { icon: "key", h: "Сдача в срок", p: "La Joya с 74 квартирами передана владельцам в 2025 году — жизнь началась." },
      { icon: "award", h: "Проекты-лауреаты", p: "Три награды PropertyNC 2025: Lagoon Verde, Mariachi Beach Club и «Лучший новичок»." },
    ],
    imageAlt: "La Joya Resort & Residences, Искеле",
    imageTag: "La Joya · Сдан в 2025 году",
    videoTitle: "Видео открытия La Joya",
  },
  offers: {
    kicker: "Революционная модель оплаты в лирах от DND",
    title: <>Зарплата в лирах — <b>и взносы в лирах.</b></>,
    lead: "Модели оплаты без банка, процентов и валютного риска упрощают покупку дома.",
    tl: { k: "Lagoon Verde · Оплата в лирах", pre: "До", post: "месяцев беспроцентной рассрочки в лирах" },
    neo: { k: "NeoCity · «5 нулей»", h: "Вилла без банка, по сегодняшней цене в лирах", zeros: ["Проценты", "Банк", "Поручитель", "Надбавка", "Курс"], cta: "План оплаты" },
    note: "* Модели оплаты носят рекламный характер. Актуальные условия уточняйте у отдела продаж.",
  },
  life: {
    kicker: "Привилегии Beach Club для владельцев домов DND",
    title: <>DND Lifestyle — <b>привилегии и на пляже</b></>,
    lead: "С DND жизнь прекрасна и на пляже: курортная жизнь, общественные пространства и привилегии для владельцев DND.",
  },
  numbers: {
    kicker: "DND в цифрах",
    title: <>Растущая ценность <b>на Кипре.</b></>,
    items: [
      { n: 5, label: "уникальных проектов на Кипре" },
      { n: 1000, suffix: "+", label: "резиденций" },
      { n: 3, label: "престижные награды в сфере недвижимости (PropertyNC 2025)" },
      { n: 60, label: "месяцев: инновационная модель оплаты в лирах" },
    ],
  },
  news: { kicker: "Новости и награды", awardsProject: "Проект-лауреат", homesProject: "DND Cyprus" },
  contact: { kicker: "Контакты", title: <>Найдём дом вашей мечты <b>вместе.</b></>, lead: "Вместе подберём подходящий проект и план оплаты. Оставьте заявку — мы ответим в течение 24–48 часов." },
};

const PL: HomeFlow = {
  hero: {
    brand: "DND Cyprus — na nowo definiujemy życie",
    label: "Nasze projekty",
    cta: "Poznaj projekt", prev: "Poprzedni projekt", next: "Następny projekt", pause: "Wstrzymaj", play: "Odtwórz",
    slides: [
      { slug: "neocity", name: "NeoCity", title: <>Życie w willi <b>dla lokalnych rodzin.</b></>, sub: "Region Famagusty · 50 willi · Płatność „5 zer”" },
      { slug: "lagoon-verde", name: "Lagoon Verde", title: <>Nowy rytm życia <b>nad Morzem Śródziemnym.</b></>, sub: "Ötüken, İskele · laguna 3 500 m²" },
      { slug: "la-joya", name: "La Joya", title: <>La Joya, tętniąca życiem <b>śródziemnomorska destynacja.</b></>, sub: "Bahçeler, İskele · 74 mieszkania · Oddane w 2025" },
      { slug: "perla", name: "La Joya Perla", title: <>Życie jak w kurorcie <b>przez cały rok.</b></>, sub: "Bahçeler, İskele · 700 m od morza · Wyspowy basen z efektem piasku i strefy towarzyskie" },
      { slug: "perla-ii", name: "La Joya Perla II", title: <>Ekskluzywne życie <b>w İskele.</b></>, sub: "Bahçeler, İskele · Rezydencje z ogrodem i prywatnym basenem" },
    ],
  },
  why: {
    kicker: "Dlaczego DND Cyprus?",
    title: <>Bo budujemy nie tylko domy, <b>budujemy przyszłość.</b></>,
    lead: "Dzięki międzynarodowemu doświadczeniu — od Bostonu po Cypr Północny — łączymy jakość architektury, zaufanie i innowacyjne koncepcje życia.",
    more: ["W DND Cyprus tworzymy nie tylko mieszkania, ale miejsca, które wyróżniają się przestrzeniami wspólnymi, bogatymi udogodnieniami i wyjątkowym stylem życia.", "Projekty oddawane na czas, innowacyjne modele płatności dla inwestorów i obsługa posprzedażowa — tak dotrzymujemy słowa."],
    motto: "DND Cyprus. Inwestuj z zaufaniem, żyj z przywilejami.",
    items: [
      { icon: "key", h: "Terminowe oddanie", p: "La Joya z 74 mieszkaniami została oddana w 2025 roku — życie się zaczęło." },
      { icon: "award", h: "Nagradzane projekty", p: "Trzy nagrody PropertyNC 2025: Lagoon Verde, Mariachi Beach Club i Best Newcomer." },
    ],
    imageAlt: "La Joya Resort & Residences, İskele",
    imageTag: "La Joya · Oddane w 2025",
    videoTitle: "Film z otwarcia La Joya",
  },
  offers: {
    kicker: "Rewolucyjny model płatności w lirach od DND",
    title: <>Pensja w lirach, <b>raty też w lirach.</b></>,
    lead: "Modele płatności bez banku, odsetek i ryzyka kursowego ułatwiają zakup domu.",
    tl: { k: "Lagoon Verde · Płatność w lirach", pre: "Do", post: "miesięcy nieoprocentowanych rat w lirach" },
    neo: { k: "NeoCity · „5 zer”", h: "Willa bez banku, po dzisiejszej cenie w lirach", zeros: ["Odsetki", "Bank", "Poręczyciel", "Dopłata", "Kurs"], cta: "Zobacz plan płatności" },
    note: "* Modele płatności mają charakter promocyjny. Aktualne warunki uzyskasz w naszym dziale sprzedaży.",
  },
  life: {
    kicker: "Przywileje Beach Club dla właścicieli domów DND",
    title: <>DND Lifestyle – <b>przywileje także na plaży</b></>,
    lead: "Z DND życie jest piękne także na plaży: życie jak w kurorcie, przestrzenie wspólne i przywileje dla właścicieli DND.",
  },
  numbers: {
    kicker: "DND w liczbach",
    title: <>Rosnąca wartość <b>na Cyprze.</b></>,
    items: [
      { n: 5, label: "wyjątkowych projektów na Cyprze" },
      { n: 1000, suffix: "+", label: "rezydencji" },
      { n: 3, label: "prestiżowe nagrody nieruchomościowe (PropertyNC 2025)" },
      { n: 60, label: "miesięcy: nasz innowacyjny model płatności w lirach" },
    ],
  },
  news: { kicker: "Aktualności i nagrody", awardsProject: "Nagrodzony projekt", homesProject: "DND Cyprus" },
  contact: { kicker: "Kontakt", title: <>Znajdźmy razem <b>dom Twoich marzeń.</b></>, lead: "Wspólnie wybierzemy odpowiedni projekt i plan płatności. Wyślij zapytanie — odpowiemy w ciągu 24–48 godzin." },
};

export const HOME_FLOW: Record<Locale, HomeFlow> = { tr: TR, en: EN, de: DE, ru: RU, pl: PL };
