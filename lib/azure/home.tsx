// Ana sayfa (Azure) içerikleri — TR/EN. Metinler mevcut siteden ve onaylı Azure konseptinden taşındı.
import type { ReactNode } from "react";
import type { Locale } from "./site";

export type HomeContent = {
  hero: { tag: string; play: string; title: ReactNode; primary: string; secondary: string };
  awards: { label: string; items: { b: string; rest: string; ribbon?: string }[] };
  bento: {
    kicker: string; title: ReactNode; lead: string;
    tl: { k: string; h: string; upto: string; rules: string[]; months: string; cta: string };
    usa: { k: string; count: number; p: string };
    mariachi: { k: string; h: string; p: string; pill: string };
    lajoya: { k: string; h: string; p: string; pill: string };
    tech: { k: string; h: string; p: string };
    awards: { k: string; h: string; items: { title: string; text: string; ribbon: string; href: string }[] };
  };
  videos: { kicker: string; title: ReactNode };
  story: { kicker: string; title: ReactNode; steps: { t: string; h: string; p: string; tags: string[]; img: string }[] };
  projects: { kicker: string; title: ReactNode; prev: string; next: string; soonKicker: string; soonCta: string };
  location: { kicker: string; title: ReactNode; p: string; dist: { label: string; v: string; w: number }[]; directions: string; tour: string; lbl: string; sub: string };
  leadership: { kicker: string; title: ReactNode; people: { img: string; role: string; name: string; q: string; dl: [string, string][] }[]; team: string; teamCta: string; brandsLabel: string };
  timeline: { kicker: string; title: ReactNode; items: { year: string; tag: string; p: string; img: string }[] };
  press: { kicker: string; title: string; all: string };
  faq: { kicker: string; title: string; items: { q: string; a: string }[] };
  instagram: { kicker: string; title: ReactNode };
  contact: { kicker: string; title: ReactNode; lead: string; highlights: string[] };
};

const TR: HomeContent = {
  hero: {
    tag: "PropertyNC 2025 · Altın Ödül",
    play: "Tanıtım filmi",
    title: <>Akdeniz’de yeni bir <b>yaşam ritmi.</b></>,
    primary: "Projeleri Keşfet",
    secondary: "Lagoon Verde",
  },
  awards: {
    label: "Ödüller & Tanınma",
    items: [
      { b: "Altın", rest: " · Lagoon Verde 2025", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png" },
      { b: "Platin", rest: " · Mariachi Beach Club 2025", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png" },
      { b: "En İyi Çıkış Yapan Şirket", rest: " · PropertyNC 2025", ribbon: "/BEST-NEWCOMER.png" },
      { b: "Yılın CFO'su", rest: " · Boston Business Journal 2018" },
    ],
  },
  bento: {
    kicker: "Bir bakışta DND Cyprus",
    title: <>Kıbrıs’ta <b>ABD kalitesi.</b> Ödüllü projeler, TL ile ödeme, beach club ayrıcalığı.</>,
    lead: "Konut, ticari ve karma projelerde tasarımdan teslimata uçtan uca çözüm. Zamanında teslim, kalite güvencesi, şeffaf iletişim.",
    tl: { k: "Yeni ödeme modeli", h: "Maaşınız TL, taksitiniz de TL.", upto: "aya kadar faizsiz", rules: ["Banka, faiz ve kefil yok", "Kur farkı ve vade farkı yok", "Taksitler KKTC asgari ücret artışına göre güncellenir"], months: "ay", cta: "Lagoon Verde'yi incele" },
    usa: { k: "Massachusetts, ABD", count: 120, p: "Tamamlanmış proje; Kuzey Kıbrıs'ta 30.000+ konut vizyonu" },
    mariachi: { k: "DND ev sahiplerine özel", h: "Mariachi Beach Club", p: "Ücretsiz giriş ve %10 restoran-bar indirimi. Plaj, 4 jakuzili havuz, pavilyonlar, DJ geceleri.", pill: "Platin Ödül" },
    lajoya: { k: "Long Beach · Denize 500 m", h: "La Joya", p: "74 rezidans, sahiplerine teslim edildi.", pill: "Tamamlandı · 2025" },
    tech: { k: "Teknik donanım", h: "Her projede standart", p: "Merkezi ısıtma-soğutma · Jeneratör · Akıllı ev · Yerden ısıtma" },
    awards: {
      k: "PropertyNC 2025", h: "Üç ödül, tek yıl",
      items: [
        { title: "Platin Ödül – Mariachi Beach Club", text: "En İyi Önerilen Yeni Ticari Proje. Dünya standartlarında eğlence, tasarım ve topluluk Kuzey Kıbrıs sahillerine geliyor.", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png", href: "/tr/mariachi" },
        { title: "Altın Ödül – DND Homes", text: "En İyi Yeni Girişim. Tasarım mükemmeliyeti ve müşteri memnuniyeti için yeni bir standart.", ribbon: "/BEST-NEWCOMER.png", href: "https://dnd-homes.com" },
        { title: "Altın Ödül – Lagoon Verde", text: "En İyi Sosyo-Kültürel Gelişim. Refah, sürdürülebilirlik ve çevreyle uyumu önceliklendiren toplum odaklı proje.", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png", href: "/tr/lagoon-verde" },
      ],
    },
  },
  videos: { kicker: "Videolar", title: <>Projeler ve kampanyalar, <b>kendi sesinden.</b></> },
  story: {
    kicker: "Lagoon Verde'de bir gün",
    title: <>Sabahtan geceye, <b>tek adreste.</b></>,
    steps: [
      { t: "08:30 · Sabah", h: "Lagün kenarında uyanış", p: "Sabahın ilk ışığında dingin lagün; geniş lagün havuzu ve adalı havuz konsepti. Verde Cafe'de üçüncü nesil demlemeler ve sakin teras.", tags: ["Lagün havuzu", "Verde Cafe", "Fitness"], img: "/azure/lv-6m.jpg" },
      { t: "13:00 · Öğle", h: "Havuz kenarında öğle", p: "Şezlonglar, şemsiyeler ve pool bar: ferahlatıcı içecekler, gurme lezzetler. Aqua park ve mini golf birkaç adım ötede.", tags: ["Pool bar & restaurant", "Aqua park", "Mini golf"], img: "/azure/lv-1.jpg" },
      { t: "19:30 · Akşam", h: "Lagün ışıkları yanarken", p: "Gün batımıyla teraslarda akşam; amfitiyatroda açık hava performansları ve yıldızlar altında film geceleri.", tags: ["Amfitiyatro", "Köy pazarı", "Güzellik merkezi"], img: "/azure/lv-2.jpg" },
      { t: "22:00 · Gece", h: "Mariachi'de DJ gecesi", p: "700 metre ötede Mariachi Beach Club: sunset'ten geç saate uzanan canlı performanslar. Sakinlere ücretsiz giriş.", tags: ["DJ geceleri", "Latino menü", "2 bar"], img: "/azure/dj.jpg" },
    ],
  },
  projects: { kicker: "Projeler", title: <>Altı adres, <b>tek standart.</b></>, prev: "Önceki", next: "Sonraki", soonKicker: "Yakında", soonCta: "Ön kayıt" },
  location: {
    kicker: "Konum · Lagoon Verde",
    title: <>Denize, şehre ve havalimanına <b>yakın.</b></>,
    p: "Bahçeler, İskele (Ötüken). Long Beach Market ve restoranlar, sahil yürüyüş yolu, İskele merkezi.",
    dist: [{ label: "Mariachi Beach Club", v: "700 m", w: 0.14 }, { label: "Long Beach", v: "5 km", w: 0.2 }, { label: "Hastane", v: "10 km", w: 0.32 }, { label: "Gazimağusa", v: "15 km", w: 0.45 }, { label: "Ercan Havalimanı", v: "45 km", w: 1 }],
    directions: "Yol tarifi", tour: "360° Tur", lbl: "Lagoon Verde", sub: "Bahçeler, İskele · Kuzey Kıbrıs",
  },
  leadership: {
    kicker: "Kurucu & yönetim",
    title: <>Küresel tecrübe, <b>yerel disiplin.</b></>,
    people: [
      { img: "/azure/ozan.jpg", role: "Kurucu · Yönetim Kurulu Başkanı", name: "Ozan Dökmecioğlu", q: "Disiplin, şeffaflık ve sürdürülebilir büyüme; her işimizin temelinde.", dl: [["Uzmanlık", "Finans & Operasyon"], ["Küresel rol", "Keurig Dr Pepper, eski CFO / President Int."], ["Geçmiş", "Kellogg, Kraft, Cargill"]] },
      { img: "/azure/aynur.jpg", role: "DND Cyprus Direktörü", name: "Aynur Zorba Güloğlu", q: "Güven, şeffaflık ve ekip ruhu; başarılarımızın temelinde bunlar var.", dl: [["Odak", "Operasyonel liderlik"], ["Uzmanlık", "Mimarlık & yöneticilik"], ["Yaklaşım", "Sürdürülebilirlik"]] },
    ],
    team: "27 kişilik ekip", teamCta: "Tüm ekibimiz", brandsLabel: "Markalar & projeler",
  },
  timeline: {
    kicker: "Hikayemiz",
    title: <>2017’den bugüne, <b>Boston’dan İskele’ye.</b></>,
    items: [
      { year: "2017", tag: "Kuruluş", p: "DND Homes, Boston'da kuruldu.", img: "/azure/about-boston.jpg" },
      { year: "2017", tag: "ABD", p: "12 Longfellow Road, Lexington projesi.", img: "/azure/about-12lex.jpg" },
      { year: "2018", tag: "Ödül", p: "Boston Business Journal, Yılın CFO'su.", img: "/azure/about-cfo.jpg" },
      { year: "2023", tag: "Kıbrıs", p: "DND Cyprus operasyon merkezi açıldı.", img: "/kurulus.JPG" },
      { year: "2025", tag: "PropertyNC", p: "En İyi Çıkış Yapan Şirket; Altın ve Platin ödüller.", img: "/property_awards_2025-747.jpg" },
      { year: "2025", tag: "Teslim", p: "La Joya, 74 rezidansıyla teslim edildi.", img: "/azure/lj-2.jpg" },
    ],
  },
  press: { kicker: "Basında DND Cyprus", title: "Haberler", all: "Tüm haberler" },
  faq: {
    kicker: "Sık sorulanlar", title: "Merak edilenler",
    items: [
      { q: "Ödemeler hangi para birimiyle yapılıyor?", a: "Lagoon Verde'deki sınırlı sayıda rezidans için tüm ödemeler Türk Lirası ile yapılır. Banka, faiz, kefil, kur farkı ve vade farkı yoktur." },
      { q: "Taksitler nasıl güncelleniyor?", a: "Taksitler sterlin kuruna değil, KKTC asgari ücretindeki artış oranına göre dönemsel olarak güncellenir. 60 aya kadar vade seçeneği sunulur." },
      { q: "Mariachi Beach Club ayrıcalıkları kimler için?", a: "La Joya, La Joya Perla, Perla II ve Lagoon Verde sakinleri için ücretsiz giriş ve restoran, havuz barı, şezlong/cabana harcamalarında %10 indirim. Yerinde kimlik doğrulaması gerekebilir." },
      { q: "Lagoon Verde ne zaman teslim edilecek?", a: "Hedef teslim tarihi Aralık 2028. Proje 43.179 m² arsa üzerinde 354 birimden oluşuyor; 1+0, 1+1 ve 2+1 tipleri mevcut." },
      { q: "Hangi teknik donanımlar standart?", a: "Merkezi ısıtma-soğutma, merkezi jeneratör, akıllı ev sistemleri ve banyolarda yerden ısıtma tüm projelerde standarttır." },
    ],
  },
  instagram: { kicker: "Sosyal medya", title: <>Instagram’da <b>DND Cyprus.</b></> },
  contact: { kicker: "İletişim", title: <>Birlikte değer <b>yaratalım.</b></>, lead: "Konut, ticari ve karma projelerde tasarımdan teslimata uçtan uca çözüm. Talebinizi iletin, ekibimiz 24–48 saat içinde dönüş yapsın.", highlights: ["Zamanında teslim", "Kalite güvencesi", "Şeffaf iletişim"] },
};

const EN: HomeContent = {
  hero: {
    tag: "PropertyNC 2025 · Gold Award",
    play: "Showreel",
    title: <>A new rhythm of life <b>on the Mediterranean.</b></>,
    primary: "Explore Projects",
    secondary: "Lagoon Verde",
  },
  awards: {
    label: "Awards & Recognition",
    items: [
      { b: "Gold", rest: " · Lagoon Verde 2025", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png" },
      { b: "Platinum", rest: " · Mariachi Beach Club 2025", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png" },
      { b: "Best Newcomer", rest: " · PropertyNC 2025", ribbon: "/BEST-NEWCOMER.png" },
      { b: "CFO of the Year", rest: " · Boston Business Journal 2018" },
    ],
  },
  bento: {
    kicker: "DND Cyprus at a glance",
    title: <><b>USA quality</b> in Cyprus. Award-winning projects, payment in Turkish lira, beach club privileges.</>,
    lead: "End-to-end solutions from design to delivery in residential, commercial and mixed-use projects. On-time delivery, quality assurance, transparent communication.",
    tl: { k: "New payment model", h: "Earn in lira, pay in lira.", upto: "months interest-free", rules: ["No bank, no interest, no guarantor", "No exchange-rate or maturity difference", "Instalments follow the TRNC minimum-wage increase"], months: "months", cta: "Explore Lagoon Verde" },
    usa: { k: "Massachusetts, USA", count: 120, p: "Completed projects; a 30,000+ homes vision for North Cyprus" },
    mariachi: { k: "Exclusive to DND homeowners", h: "Mariachi Beach Club", p: "Free entry and 10% off at the restaurant and bars. Beach, pool with 4 jacuzzis, pavilions, DJ nights.", pill: "Platinum Award" },
    lajoya: { k: "Long Beach · 500 m to the sea", h: "La Joya", p: "74 residences, handed over to their owners.", pill: "Completed · 2025" },
    tech: { k: "Technical equipment", h: "Standard in every project", p: "Central heating & cooling · Generator · Smart home · Underfloor heating" },
    awards: {
      k: "PropertyNC 2025", h: "Three awards, one year",
      items: [
        { title: "Platinum Award – Mariachi Beach Club", text: "Best Proposed New Commercial Project. World-class entertainment, design and community coming to the North Cyprus coast.", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png", href: "/en/mariachi" },
        { title: "Gold Award – DND Homes", text: "Best Newcomer. A new standard for design excellence and customer satisfaction.", ribbon: "/BEST-NEWCOMER.png", href: "https://dnd-homes.com" },
        { title: "Gold Award – Lagoon Verde", text: "Best Socio-Cultural Development. A community-focused project prioritising well-being, sustainability and harmony with nature.", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png", href: "/en/lagoon-verde" },
      ],
    },
  },
  videos: { kicker: "Videos", title: <>Projects and campaigns, <b>in their own voice.</b></> },
  story: {
    kicker: "A day at Lagoon Verde",
    title: <>From morning to night, <b>at one address.</b></>,
    steps: [
      { t: "08:30 · Morning", h: "Waking up by the lagoon", p: "A calm lagoon in the first light; the wide lagoon pool and island-pool concept. Third-wave coffee and a quiet terrace at Verde Cafe.", tags: ["Lagoon pool", "Verde Cafe", "Fitness"], img: "/azure/lv-6m.jpg" },
      { t: "13:00 · Noon", h: "Lunch by the pool", p: "Sun loungers, umbrellas and the pool bar: refreshing drinks and gourmet flavours. Aqua park and mini golf a few steps away.", tags: ["Pool bar & restaurant", "Aqua park", "Mini golf"], img: "/azure/lv-1.jpg" },
      { t: "19:30 · Evening", h: "As the lagoon lights come on", p: "Evenings on the terraces at sunset; open-air performances at the amphitheatre and movie nights under the stars.", tags: ["Amphitheatre", "Village market", "Beauty centre"], img: "/azure/lv-2.jpg" },
      { t: "22:00 · Night", h: "DJ night at Mariachi", p: "Mariachi Beach Club, 700 metres away: live performances from sunset until late. Free entry for residents.", tags: ["DJ nights", "Latino menu", "2 bars"], img: "/azure/dj.jpg" },
    ],
  },
  projects: { kicker: "Projects", title: <>Six addresses, <b>one standard.</b></>, prev: "Previous", next: "Next", soonKicker: "Coming soon", soonCta: "Pre-register" },
  location: {
    kicker: "Location · Lagoon Verde",
    title: <>Close to the sea, the city <b>and the airport.</b></>,
    p: "Bahçeler, İskele (Ötüken). Long Beach Market and restaurants, the seaside promenade, İskele town centre.",
    dist: [{ label: "Mariachi Beach Club", v: "700 m", w: 0.14 }, { label: "Long Beach", v: "5 km", w: 0.2 }, { label: "Hospital", v: "10 km", w: 0.32 }, { label: "Famagusta", v: "15 km", w: 0.45 }, { label: "Ercan Airport", v: "45 km", w: 1 }],
    directions: "Directions", tour: "360° Tour", lbl: "Lagoon Verde", sub: "Bahçeler, İskele · North Cyprus",
  },
  leadership: {
    kicker: "Founder & management",
    title: <>Global experience, <b>local discipline.</b></>,
    people: [
      { img: "/azure/ozan.jpg", role: "Founder · Chairman of the Board", name: "Ozan Dökmecioğlu", q: "Discipline, transparency and sustainable growth; the foundation of everything we do.", dl: [["Expertise", "Finance & Operations"], ["Global role", "Keurig Dr Pepper, former CFO / President Int."], ["Background", "Kellogg, Kraft, Cargill"]] },
      { img: "/azure/aynur.jpg", role: "Director, DND Cyprus", name: "Aynur Zorba Güloğlu", q: "Trust, transparency and team spirit; these are at the heart of our success.", dl: [["Focus", "Operational leadership"], ["Expertise", "Architecture & management"], ["Approach", "Sustainability"]] },
    ],
    team: "A team of 27", teamCta: "Meet the whole team", brandsLabel: "Brands & projects",
  },
  timeline: {
    kicker: "Our story",
    title: <>From 2017 to today, <b>Boston to İskele.</b></>,
    items: [
      { year: "2017", tag: "Foundation", p: "DND Homes was founded in Boston.", img: "/azure/about-boston.jpg" },
      { year: "2017", tag: "USA", p: "12 Longfellow Road, Lexington project.", img: "/azure/about-12lex.jpg" },
      { year: "2018", tag: "Award", p: "Boston Business Journal, CFO of the Year.", img: "/azure/about-cfo.jpg" },
      { year: "2023", tag: "Cyprus", p: "DND Cyprus operations centre opened.", img: "/kurulus.JPG" },
      { year: "2025", tag: "PropertyNC", p: "Best Newcomer; Gold and Platinum awards.", img: "/property_awards_2025-747.jpg" },
      { year: "2025", tag: "Delivery", p: "La Joya handed over with its 74 residences.", img: "/azure/lj-2.jpg" },
    ],
  },
  press: { kicker: "DND Cyprus in the press", title: "News", all: "All news" },
  faq: {
    kicker: "FAQ", title: "Good to know",
    items: [
      { q: "Which currency are payments made in?", a: "For a limited number of residences at Lagoon Verde, all payments are made in Turkish lira. No bank, no interest, no guarantor, no exchange-rate or maturity difference." },
      { q: "How are instalments updated?", a: "Instalments are updated periodically in line with the TRNC minimum-wage increase, not the sterling exchange rate. Terms of up to 60 months are available." },
      { q: "Who gets the Mariachi Beach Club privileges?", a: "Residents of La Joya, La Joya Perla, Perla II and Lagoon Verde enjoy free entry and 10% off restaurant, pool bar and sun lounger/cabana spending. ID verification may be required on site." },
      { q: "When will Lagoon Verde be delivered?", a: "The target delivery date is December 2028. The project comprises 354 units on a 43,179 m² plot; 1+0, 1+1 and 2+1 types are available." },
      { q: "Which technical features are standard?", a: "Central heating & cooling, a central generator, smart-home systems and underfloor heating in bathrooms are standard in every project." },
    ],
  },
  instagram: { kicker: "Social", title: <>DND Cyprus <b>on Instagram.</b></> },
  contact: { kicker: "Contact", title: <>Let’s create value <b>together.</b></>, lead: "End-to-end solutions from design to delivery in residential, commercial and mixed-use projects. Send your request and our team will reply within 24–48 hours.", highlights: ["On-time delivery", "Quality assurance", "Transparent communication"] },
};

const DE: HomeContent = {
  hero: {
    tag: "PropertyNC 2025 · Goldpreis",
    play: "Imagefilm",
    title: <>Ein neues Lebensgefühl <b>am Mittelmeer.</b></>,
    primary: "Projekte entdecken",
    secondary: "Lagoon Verde",
  },
  awards: {
    label: "Auszeichnungen & Anerkennung",
    items: [
      { b: "Gold", rest: " · Lagoon Verde 2025", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png" },
      { b: "Platin", rest: " · Mariachi Beach Club 2025", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png" },
      { b: "Bester Newcomer", rest: " · PropertyNC 2025", ribbon: "/BEST-NEWCOMER.png" },
      { b: "CFO des Jahres", rest: " · Boston Business Journal 2018" },
    ],
  },
  bento: {
    kicker: "DND Cyprus auf einen Blick",
    title: <><b>US-Qualität</b> auf Zypern. Preisgekrönte Projekte, Zahlung in Lira, Beach-Club-Vorteile.</>,
    lead: "Ganzheitliche Lösungen von der Planung bis zur Übergabe – für Wohn-, Gewerbe- und Mischprojekte. Termingerechte Übergabe, Qualitätssicherung, transparente Kommunikation.",
    tl: { k: "Neues Zahlungsmodell", h: "Einkommen in Lira, Raten in Lira.", upto: "Monate zinsfrei", rules: ["Keine Bank, keine Zinsen, kein Bürge", "Keine Kursdifferenz, kein Laufzeitaufschlag", "Raten folgen der Mindestlohnerhöhung in Nordzypern"], months: "Monate", cta: "Lagoon Verde ansehen" },
    usa: { k: "Massachusetts, USA", count: 120, p: "Abgeschlossene Projekte; die Vision: 30.000+ Wohnungen in Nordzypern" },
    mariachi: { k: "Exklusiv für DND-Eigentümer", h: "Mariachi Beach Club", p: "Freier Eintritt und 10% Rabatt in Restaurant und Bars. Strand, Pool mit 4 Whirlpools, Pavillons, DJ-Abende.", pill: "Platinpreis" },
    lajoya: { k: "Long Beach · 500 m zum Meer", h: "La Joya", p: "74 Residenzen, an ihre Eigentümer übergeben.", pill: "Fertiggestellt · 2025" },
    tech: { k: "Technische Ausstattung", h: "Standard in jedem Projekt", p: "Zentrale Heizung & Kühlung · Generator · Smart Home · Fußbodenheizung" },
    awards: {
      k: "PropertyNC 2025", h: "Drei Auszeichnungen, ein Jahr",
      items: [
        { title: "Platinpreis – Mariachi Beach Club", text: "Bestes geplantes neues Gewerbeprojekt. Unterhaltung, Design und Gemeinschaft auf Weltniveau für die Küste Nordzyperns.", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png", href: "/de/mariachi" },
        { title: "Goldpreis – DND Homes", text: "Bester Newcomer. Ein neuer Maßstab für exzellentes Design und Kundenzufriedenheit.", ribbon: "/BEST-NEWCOMER.png", href: "https://dnd-homes.com" },
        { title: "Goldpreis – Lagoon Verde", text: "Beste soziokulturelle Entwicklung. Ein gemeinschaftsorientiertes Projekt mit Fokus auf Wohlbefinden, Nachhaltigkeit und Einklang mit der Natur.", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png", href: "/de/lagoon-verde" },
      ],
    },
  },
  videos: { kicker: "Videos", title: <>Projekte und Kampagnen, <b>aus erster Hand.</b></> },
  story: {
    kicker: "Ein Tag im Lagoon Verde",
    title: <>Vom Morgen bis in die Nacht, <b>an einer Adresse.</b></>,
    steps: [
      { t: "08:30 · Morgen", h: "Aufwachen an der Lagune", p: "Die ruhige Lagune im ersten Licht, dazu der weitläufige Lagunenpool und das Inselpool-Konzept. Third-Wave-Kaffee und eine stille Terrasse im Verde Cafe.", tags: ["Lagunenpool", "Verde Cafe", "Fitness"], img: "/azure/lv-6m.jpg" },
      { t: "13:00 · Mittag", h: "Mittagessen am Pool", p: "Sonnenliegen, Schirme und die Poolbar: erfrischende Drinks und Gourmet-Küche. Aquapark und Minigolf sind nur wenige Schritte entfernt.", tags: ["Poolbar & Restaurant", "Aquapark", "Minigolf"], img: "/azure/lv-1.jpg" },
      { t: "19:30 · Abend", h: "Wenn die Lichter der Lagune angehen", p: "Abende auf den Terrassen bei Sonnenuntergang, Open-Air-Aufführungen im Amphitheater und Kinoabende unter Sternen.", tags: ["Amphitheater", "Dorfmarkt", "Beauty-Center"], img: "/azure/lv-2.jpg" },
      { t: "22:00 · Nacht", h: "DJ-Nacht im Mariachi", p: "Der Mariachi Beach Club, nur 700 Meter entfernt: Live-Auftritte vom Sonnenuntergang bis spät in die Nacht. Freier Eintritt für Bewohner.", tags: ["DJ-Abende", "Latino-Menü", "2 Bars"], img: "/azure/dj.jpg" },
    ],
  },
  projects: { kicker: "Projekte", title: <>Sechs Adressen, <b>ein Standard.</b></>, prev: "Zurück", next: "Weiter", soonKicker: "Demnächst", soonCta: "Vorab registrieren" },
  location: {
    kicker: "Lage · Lagoon Verde",
    title: <>Nah an Meer, Stadt <b>und Flughafen.</b></>,
    p: "Bahçeler, İskele (Ötüken). Long Beach Market und Restaurants, die Strandpromenade, das Zentrum von İskele.",
    dist: [{ label: "Mariachi Beach Club", v: "700 m", w: 0.14 }, { label: "Long Beach", v: "5 km", w: 0.2 }, { label: "Krankenhaus", v: "10 km", w: 0.32 }, { label: "Famagusta", v: "15 km", w: 0.45 }, { label: "Flughafen Ercan", v: "45 km", w: 1 }],
    directions: "Route", tour: "360°-Tour", lbl: "Lagoon Verde", sub: "Bahçeler, İskele · Nordzypern",
  },
  leadership: {
    kicker: "Gründer & Management",
    title: <>Globale Erfahrung, <b>lokale Disziplin.</b></>,
    people: [
      { img: "/azure/ozan.jpg", role: "Gründer · Vorstandsvorsitzender", name: "Ozan Dökmecioğlu", q: "Disziplin, Transparenz und nachhaltiges Wachstum – das Fundament all unseres Handelns.", dl: [["Expertise", "Finanzen & operatives Geschäft"], ["Globale Rolle", "Keurig Dr Pepper, ehem. CFO / President Int."], ["Werdegang", "Kellogg, Kraft, Cargill"]] },
      { img: "/azure/aynur.jpg", role: "Direktorin, DND Cyprus", name: "Aynur Zorba Güloğlu", q: "Vertrauen, Transparenz und Teamgeist – sie stehen im Zentrum unseres Erfolgs.", dl: [["Fokus", "Operative Führung"], ["Expertise", "Architektur & Management"], ["Ansatz", "Nachhaltigkeit"]] },
    ],
    team: "Ein Team von 27 Personen", teamCta: "Das ganze Team kennenlernen", brandsLabel: "Marken & Projekte",
  },
  timeline: {
    kicker: "Unsere Geschichte",
    title: <>Von 2017 bis heute, <b>von Boston nach İskele.</b></>,
    items: [
      { year: "2017", tag: "Gründung", p: "DND Homes wird in Boston gegründet.", img: "/azure/about-boston.jpg" },
      { year: "2017", tag: "USA", p: "Projekt 12 Longfellow Road, Lexington.", img: "/azure/about-12lex.jpg" },
      { year: "2018", tag: "Auszeichnung", p: "Boston Business Journal: CFO des Jahres.", img: "/azure/about-cfo.jpg" },
      { year: "2023", tag: "Zypern", p: "Eröffnung des Betriebszentrums von DND Cyprus.", img: "/kurulus.JPG" },
      { year: "2025", tag: "PropertyNC", p: "Bester Newcomer; Gold- und Platinpreis.", img: "/property_awards_2025-747.jpg" },
      { year: "2025", tag: "Übergabe", p: "La Joya mit 74 Residenzen übergeben.", img: "/azure/lj-2.jpg" },
    ],
  },
  press: { kicker: "DND Cyprus in der Presse", title: "Aktuelles", all: "Alle Meldungen" },
  faq: {
    kicker: "FAQ", title: "Gut zu wissen",
    items: [
      { q: "In welcher Währung wird bezahlt?", a: "Für eine begrenzte Anzahl von Residenzen im Lagoon Verde erfolgen alle Zahlungen in Türkischer Lira – ohne Bank, ohne Zinsen, ohne Bürgen, ohne Kursdifferenz und ohne Laufzeitaufschlag." },
      { q: "Wie werden die Raten angepasst?", a: "Die Raten werden regelmäßig an die Erhöhung des Mindestlohns in Nordzypern angepasst – nicht an den Wechselkurs des Pfund Sterling. Laufzeiten von bis zu 60 Monaten sind möglich." },
      { q: "Wer erhält die Vorteile im Mariachi Beach Club?", a: "Bewohner von La Joya, La Joya Perla, Perla II und Lagoon Verde erhalten freien Eintritt und 10% Rabatt auf Ausgaben im Restaurant, an der Poolbar sowie für Sonnenliegen und Cabanas. Vor Ort kann ein Ausweis verlangt werden." },
      { q: "Wann wird Lagoon Verde übergeben?", a: "Die Übergabe ist für Dezember 2028 geplant. Das Projekt umfasst 354 Einheiten auf einem 43.179 m² großen Grundstück; erhältlich sind die Typen 1+0, 1+1 und 2+1." },
      { q: "Welche technische Ausstattung ist Standard?", a: "Zentrale Heizung und Kühlung, ein zentraler Generator, Smart-Home-Systeme und Fußbodenheizung in den Bädern sind in jedem Projekt Standard." },
    ],
  },
  instagram: { kicker: "Social Media", title: <>DND Cyprus <b>auf Instagram.</b></> },
  contact: { kicker: "Kontakt", title: <>Lassen Sie uns gemeinsam <b>Werte schaffen.</b></>, lead: "Ganzheitliche Lösungen von der Planung bis zur Übergabe – für Wohn-, Gewerbe- und Mischprojekte. Senden Sie uns Ihre Anfrage, unser Team meldet sich innerhalb von 24–48 Stunden.", highlights: ["Termingerechte Übergabe", "Qualitätssicherung", "Transparente Kommunikation"] },
};

const RU: HomeContent = {
  hero: {
    tag: "PropertyNC 2025 · Золотая награда",
    play: "Промо-ролик",
    title: <>Новый ритм жизни <b>на Средиземноморье.</b></>,
    primary: "Смотреть проекты",
    secondary: "Lagoon Verde",
  },
  awards: {
    label: "Награды и признание",
    items: [
      { b: "Золото", rest: " · Lagoon Verde 2025", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png" },
      { b: "Платина", rest: " · Mariachi Beach Club 2025", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png" },
      { b: "Лучшая новая компания", rest: " · PropertyNC 2025", ribbon: "/BEST-NEWCOMER.png" },
      { b: "Финансовый директор года", rest: " · Boston Business Journal 2018" },
    ],
  },
  bento: {
    kicker: "Коротко о DND Cyprus",
    title: <><b>Качество США</b> на Кипре. Проекты-лауреаты, оплата в лирах, пляжный клуб.</>,
    lead: "Комплексные решения от проектирования до сдачи — в жилых, коммерческих и многофункциональных проектах. Сдача в срок, гарантия качества, прозрачная коммуникация.",
    tl: { k: "Новая схема оплаты", h: "Зарплата в лирах — и платежи в лирах.", upto: "мес. без процентов", rules: ["Без банка, процентов и поручителей", "Без курсовой разницы и наценки за срок", "Платежи индексируются по росту минимальной зарплаты на Северном Кипре"], months: "мес.", cta: "Смотреть Lagoon Verde" },
    usa: { k: "Массачусетс, США", count: 120, p: "Завершённых проектов; в перспективе — 30 000+ квартир на Северном Кипре" },
    mariachi: { k: "Только для владельцев жилья DND", h: "Mariachi Beach Club", p: "Бесплатный вход и скидка 10% в ресторане и барах. Пляж, бассейн с 4 джакузи, павильоны, DJ-вечеринки.", pill: "Платиновая награда" },
    lajoya: { k: "Long Beach · 500 m до моря", h: "La Joya", p: "74 резиденции переданы владельцам.", pill: "Завершён · 2025" },
    tech: { k: "Техническое оснащение", h: "Стандарт в каждом проекте", p: "Центральное отопление и кондиционирование · Генератор · Умный дом · Тёплый пол" },
    awards: {
      k: "PropertyNC 2025", h: "Три награды за один год",
      items: [
        { title: "Платиновая награда — Mariachi Beach Club", text: "Лучший предлагаемый новый коммерческий проект. Развлечения, дизайн и комьюнити мирового уровня — на побережье Северного Кипра.", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png", href: "/ru/mariachi" },
        { title: "Золотая награда — DND Homes", text: "Лучшая новая компания. Новый стандарт качества дизайна и удовлетворённости клиентов.", ribbon: "/BEST-NEWCOMER.png", href: "https://dnd-homes.com" },
        { title: "Золотая награда — Lagoon Verde", text: "Лучший социокультурный проект. Проект, ориентированный на сообщество, где в приоритете благополучие, устойчивое развитие и гармония с природой.", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png", href: "/ru/lagoon-verde" },
      ],
    },
  },
  videos: { kicker: "Видео", title: <>Проекты и кампании — <b>из первых уст.</b></> },
  story: {
    kicker: "Один день в Lagoon Verde",
    title: <>С утра до ночи — <b>по одному адресу.</b></>,
    steps: [
      { t: "08:30 · Утро", h: "Пробуждение у лагуны", p: "Спокойная лагуна в первых лучах солнца, просторный бассейн-лагуна и бассейны с островками. Кофе третьей волны и тихая терраса в Verde Cafe.", tags: ["Бассейн-лагуна", "Verde Cafe", "Фитнес"], img: "/azure/lv-6m.jpg" },
      { t: "13:00 · День", h: "Обед у бассейна", p: "Шезлонги, зонтики и бар у бассейна: освежающие напитки и блюда для гурманов. Аквапарк и мини-гольф — в нескольких шагах.", tags: ["Бар и ресторан у бассейна", "Аквапарк", "Мини-гольф"], img: "/azure/lv-1.jpg" },
      { t: "19:30 · Вечер", h: "Когда зажигаются огни лагуны", p: "Вечера на террасах под закат, выступления под открытым небом в амфитеатре и кино под звёздами.", tags: ["Амфитеатр", "Деревенский рынок", "Салон красоты"], img: "/azure/lv-2.jpg" },
      { t: "22:00 · Ночь", h: "DJ-вечеринка в Mariachi", p: "Mariachi Beach Club в 700 метрах: живые выступления от заката до поздней ночи. Для жителей вход бесплатный.", tags: ["DJ-вечеринки", "Латиноамериканское меню", "2 бара"], img: "/azure/dj.jpg" },
    ],
  },
  projects: { kicker: "Проекты", title: <>Шесть адресов, <b>один стандарт.</b></>, prev: "Назад", next: "Далее", soonKicker: "Скоро", soonCta: "Предварительная запись" },
  location: {
    kicker: "Расположение · Lagoon Verde",
    title: <>Рядом море, город <b>и аэропорт.</b></>,
    p: "Bahçeler, Искеле (Ötüken). Long Beach Market и рестораны, набережная, центр Искеле.",
    dist: [{ label: "Mariachi Beach Club", v: "700 m", w: 0.14 }, { label: "Long Beach", v: "5 km", w: 0.2 }, { label: "Больница", v: "10 km", w: 0.32 }, { label: "Фамагуста", v: "15 km", w: 0.45 }, { label: "Аэропорт Эрджан", v: "45 km", w: 1 }],
    directions: "Маршрут", tour: "3D-тур", lbl: "Lagoon Verde", sub: "Bahçeler, Искеле · Северный Кипр",
  },
  leadership: {
    kicker: "Основатель и руководство",
    title: <>Международный опыт, <b>местная дисциплина.</b></>,
    people: [
      { img: "/azure/ozan.jpg", role: "Основатель · Председатель совета директоров", name: "Ozan Dökmecioğlu", q: "Дисциплина, прозрачность и устойчивый рост — основа всего, что мы делаем.", dl: [["Специализация", "Финансы и операционная деятельность"], ["Международная роль", "Keurig Dr Pepper, экс-CFO / President Int."], ["Опыт", "Kellogg, Kraft, Cargill"]] },
      { img: "/azure/aynur.jpg", role: "Директор DND Cyprus", name: "Aynur Zorba Güloğlu", q: "Доверие, прозрачность и командный дух — вот что лежит в основе нашего успеха.", dl: [["Фокус", "Операционное руководство"], ["Специализация", "Архитектура и управление"], ["Подход", "Устойчивое развитие"]] },
    ],
    team: "Команда из 27 человек", teamCta: "Познакомиться с командой", brandsLabel: "Бренды и проекты",
  },
  timeline: {
    kicker: "Наша история",
    title: <>С 2017 года до наших дней — <b>из Бостона в Искеле.</b></>,
    items: [
      { year: "2017", tag: "Основание", p: "В Бостоне основана компания DND Homes.", img: "/azure/about-boston.jpg" },
      { year: "2017", tag: "США", p: "Проект 12 Longfellow Road в Лексингтоне.", img: "/azure/about-12lex.jpg" },
      { year: "2018", tag: "Награда", p: "Boston Business Journal: финансовый директор года.", img: "/azure/about-cfo.jpg" },
      { year: "2023", tag: "Кипр", p: "Открыт операционный центр DND Cyprus.", img: "/kurulus.JPG" },
      { year: "2025", tag: "PropertyNC", p: "«Лучшая новая компания», золотая и платиновая награды.", img: "/property_awards_2025-747.jpg" },
      { year: "2025", tag: "Сдача", p: "Комплекс La Joya сдан: 74 резиденции.", img: "/azure/lj-2.jpg" },
    ],
  },
  press: { kicker: "DND Cyprus в прессе", title: "Новости", all: "Все новости" },
  faq: {
    kicker: "Частые вопросы", title: "Полезно знать",
    items: [
      { q: "В какой валюте производятся платежи?", a: "Для ограниченного числа резиденций в Lagoon Verde все платежи принимаются в турецких лирах. Без банка, процентов и поручителей, без курсовой разницы и наценки за срок." },
      { q: "Как индексируются платежи?", a: "Платежи периодически пересчитываются в соответствии с ростом минимальной зарплаты на Северном Кипре, а не по курсу фунта стерлингов. Рассрочка доступна на срок до 60 месяцев." },
      { q: "Кому доступны привилегии Mariachi Beach Club?", a: "Жители La Joya, La Joya Perla, Perla II и Lagoon Verde получают бесплатный вход и скидку 10% в ресторане, баре у бассейна, а также на шезлонги и кабаны. На месте может потребоваться удостоверение личности." },
      { q: "Когда сдаётся Lagoon Verde?", a: "Плановый срок сдачи — декабрь 2028. Проект включает 354 квартиры на участке 43 179 m²; доступны планировки 1+0, 1+1 и 2+1." },
      { q: "Какое техническое оснащение входит в стандарт?", a: "Центральное отопление и кондиционирование, центральный генератор, системы умного дома и тёплые полы в ванных комнатах — стандарт в каждом проекте." },
    ],
  },
  instagram: { kicker: "Соцсети", title: <>DND Cyprus <b>в Instagram.</b></> },
  contact: { kicker: "Контакты", title: <>Давайте создавать ценность <b>вместе.</b></>, lead: "Комплексные решения от проектирования до сдачи — в жилых, коммерческих и многофункциональных проектах. Оставьте заявку, и наша команда свяжется с вами в течение 24–48 часов.", highlights: ["Сдача в срок", "Гарантия качества", "Прозрачная коммуникация"] },
};

const PL: HomeContent = {
  hero: {
    tag: "PropertyNC 2025 · Złota Nagroda",
    play: "Film promocyjny",
    title: <>Nowy rytm życia <b>nad Morzem Śródziemnym.</b></>,
    primary: "Odkryj projekty",
    secondary: "Lagoon Verde",
  },
  awards: {
    label: "Nagrody i wyróżnienia",
    items: [
      { b: "Złoto", rest: " · Lagoon Verde 2025", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png" },
      { b: "Platyna", rest: " · Mariachi Beach Club 2025", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png" },
      { b: "Najlepszy debiut", rest: " · PropertyNC 2025", ribbon: "/BEST-NEWCOMER.png" },
      { b: "CFO Roku", rest: " · Boston Business Journal 2018" },
    ],
  },
  bento: {
    kicker: "DND Cyprus w skrócie",
    title: <><b>Jakość z USA</b> na Cyprze. Nagradzane projekty, płatność w lirach, beach club.</>,
    lead: "Kompleksowe rozwiązania od projektu po oddanie – w inwestycjach mieszkaniowych, komercyjnych i wielofunkcyjnych. Terminowe oddanie, gwarancja jakości, przejrzysta komunikacja.",
    tl: { k: "Nowy model płatności", h: "Pensja w lirach, raty w lirach.", upto: "mies. bez odsetek", rules: ["Bez banku, odsetek i poręczyciela", "Bez różnic kursowych i dopłat za termin", "Raty rosną wraz z płacą minimalną na Cyprze Północnym"], months: "mies.", cta: "Zobacz Lagoon Verde" },
    usa: { k: "Massachusetts, USA", count: 120, p: "Zrealizowanych projektów; wizja 30 000+ mieszkań na Cyprze Północnym" },
    mariachi: { k: "Wyłącznie dla właścicieli nieruchomości DND", h: "Mariachi Beach Club", p: "Bezpłatny wstęp i 10% zniżki w restauracji i barach. Plaża, basen z 4 jacuzzi, pawilony, wieczory z DJ-em.", pill: "Platynowa Nagroda" },
    lajoya: { k: "Long Beach · 500 m od morza", h: "La Joya", p: "74 apartamenty przekazane właścicielom.", pill: "Ukończony · 2025" },
    tech: { k: "Wyposażenie techniczne", h: "Standard w każdym projekcie", p: "Centralne ogrzewanie i chłodzenie · Generator · Inteligentny dom · Ogrzewanie podłogowe" },
    awards: {
      k: "PropertyNC 2025", h: "Trzy nagrody w jednym roku",
      items: [
        { title: "Platynowa Nagroda – Mariachi Beach Club", text: "Najlepszy proponowany nowy projekt komercyjny. Rozrywka, design i społeczność na światowym poziomie na wybrzeżu Cypru Północnego.", ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png", href: "/pl/mariachi" },
        { title: "Złota Nagroda – DND Homes", text: "Najlepszy debiut. Nowy standard doskonałego designu i satysfakcji klientów.", ribbon: "/BEST-NEWCOMER.png", href: "https://dnd-homes.com" },
        { title: "Złota Nagroda – Lagoon Verde", text: "Najlepszy projekt społeczno-kulturalny. Inwestycja skupiona na społeczności, w której priorytetem są dobrostan, zrównoważony rozwój i harmonia z naturą.", ribbon: "/BEST-SOCIOCULTURAL-GOLD.png", href: "/pl/lagoon-verde" },
      ],
    },
  },
  videos: { kicker: "Wideo", title: <>Projekty i kampanie <b>z pierwszej ręki.</b></> },
  story: {
    kicker: "Jeden dzień w Lagoon Verde",
    title: <>Od rana do nocy, <b>pod jednym adresem.</b></>,
    steps: [
      { t: "08:30 · Poranek", h: "Pobudka nad laguną", p: "Spokojna laguna w pierwszym świetle dnia, rozległy basen-laguna i baseny z wyspami. Kawa trzeciej fali i cichy taras w Verde Cafe.", tags: ["Basen-laguna", "Verde Cafe", "Fitness"], img: "/azure/lv-6m.jpg" },
      { t: "13:00 · Południe", h: "Lunch przy basenie", p: "Leżaki, parasole i pool bar: orzeźwiające napoje i smaki dla smakoszy. Aquapark i minigolf zaledwie kilka kroków dalej.", tags: ["Pool bar i restauracja", "Aquapark", "Minigolf"], img: "/azure/lv-1.jpg" },
      { t: "19:30 · Wieczór", h: "Gdy zapalają się światła laguny", p: "Wieczory na tarasach o zachodzie słońca, występy plenerowe w amfiteatrze i seanse filmowe pod gwiazdami.", tags: ["Amfiteatr", "Wiejski targ", "Centrum urody"], img: "/azure/lv-2.jpg" },
      { t: "22:00 · Noc", h: "Noc z DJ-em w Mariachi", p: "Mariachi Beach Club 700 metrów dalej: występy na żywo od zachodu słońca do późnej nocy. Dla mieszkańców wstęp bezpłatny.", tags: ["Wieczory z DJ-em", "Menu latino", "2 bary"], img: "/azure/dj.jpg" },
    ],
  },
  projects: { kicker: "Projekty", title: <>Sześć adresów, <b>jeden standard.</b></>, prev: "Poprzedni", next: "Następny", soonKicker: "Wkrótce", soonCta: "Wstępna rejestracja" },
  location: {
    kicker: "Lokalizacja · Lagoon Verde",
    title: <>Blisko morza, miasta <b>i lotniska.</b></>,
    p: "Bahçeler, İskele (Ötüken). Long Beach Market i restauracje, nadmorska promenada, centrum İskele.",
    dist: [{ label: "Mariachi Beach Club", v: "700 m", w: 0.14 }, { label: "Long Beach", v: "5 km", w: 0.2 }, { label: "Szpital", v: "10 km", w: 0.32 }, { label: "Famagusta", v: "15 km", w: 0.45 }, { label: "Lotnisko Ercan", v: "45 km", w: 1 }],
    directions: "Trasa", tour: "Wirtualny spacer", lbl: "Lagoon Verde", sub: "Bahçeler, İskele · Cypr Północny",
  },
  leadership: {
    kicker: "Założyciel i zarząd",
    title: <>Globalne doświadczenie, <b>lokalna dyscyplina.</b></>,
    people: [
      { img: "/azure/ozan.jpg", role: "Założyciel · Przewodniczący Rady Dyrektorów", name: "Ozan Dökmecioğlu", q: "Dyscyplina, przejrzystość i zrównoważony wzrost – fundament wszystkiego, co robimy.", dl: [["Specjalizacja", "Finanse i operacje"], ["Rola globalna", "Keurig Dr Pepper, były CFO / President Int."], ["Doświadczenie", "Kellogg, Kraft, Cargill"]] },
      { img: "/azure/aynur.jpg", role: "Dyrektor DND Cyprus", name: "Aynur Zorba Güloğlu", q: "Zaufanie, przejrzystość i duch zespołu – to one stoją u podstaw naszego sukcesu.", dl: [["Obszar działania", "Przywództwo operacyjne"], ["Specjalizacja", "Architektura i zarządzanie"], ["Podejście", "Zrównoważony rozwój"]] },
    ],
    team: "Zespół 27 osób", teamCta: "Poznaj cały zespół", brandsLabel: "Marki i projekty",
  },
  timeline: {
    kicker: "Nasza historia",
    title: <>Od 2017 roku do dziś, <b>z Bostonu do İskele.</b></>,
    items: [
      { year: "2017", tag: "Założenie", p: "W Bostonie powstaje DND Homes.", img: "/azure/about-boston.jpg" },
      { year: "2017", tag: "USA", p: "Projekt 12 Longfellow Road w Lexington.", img: "/azure/about-12lex.jpg" },
      { year: "2018", tag: "Nagroda", p: "Boston Business Journal: CFO Roku.", img: "/azure/about-cfo.jpg" },
      { year: "2023", tag: "Cypr", p: "Otwarcie centrum operacyjnego DND Cyprus.", img: "/kurulus.JPG" },
      { year: "2025", tag: "PropertyNC", p: "Najlepszy debiut; Złota i Platynowa Nagroda.", img: "/property_awards_2025-747.jpg" },
      { year: "2025", tag: "Oddanie", p: "Oddano La Joya – 74 apartamenty.", img: "/azure/lj-2.jpg" },
    ],
  },
  press: { kicker: "DND Cyprus w mediach", title: "Aktualności", all: "Wszystkie aktualności" },
  faq: {
    kicker: "FAQ", title: "Warto wiedzieć",
    items: [
      { q: "W jakiej walucie dokonuje się płatności?", a: "W przypadku ograniczonej liczby apartamentów w Lagoon Verde wszystkie płatności realizowane są w lirach tureckich. Bez banku, odsetek i poręczyciela, bez różnic kursowych i dopłat za termin." },
      { q: "Jak aktualizowane są raty?", a: "Raty są okresowo aktualizowane zgodnie ze wzrostem płacy minimalnej na Cyprze Północnym, a nie według kursu funta szterlinga. Dostępne są okresy spłaty do 60 miesięcy." },
      { q: "Kto korzysta z przywilejów Mariachi Beach Club?", a: "Mieszkańcy La Joya, La Joya Perla, Perla II i Lagoon Verde mają bezpłatny wstęp i 10% zniżki w restauracji, pool barze oraz na leżaki i cabany. Na miejscu może być wymagane okazanie dokumentu tożsamości." },
      { q: "Kiedy Lagoon Verde zostanie oddany do użytku?", a: "Planowany termin oddania to grudzień 2028. Projekt obejmuje 354 lokale na działce o powierzchni 43 179 m²; dostępne są typy 1+0, 1+1 i 2+1." },
      { q: "Jakie wyposażenie techniczne jest standardem?", a: "Centralne ogrzewanie i chłodzenie, centralny generator, systemy inteligentnego domu oraz ogrzewanie podłogowe w łazienkach to standard w każdym projekcie." },
    ],
  },
  instagram: { kicker: "Social media", title: <>DND Cyprus <b>na Instagramie.</b></> },
  contact: { kicker: "Kontakt", title: <>Twórzmy wartość <b>razem.</b></>, lead: "Kompleksowe rozwiązania od projektu po oddanie – w inwestycjach mieszkaniowych, komercyjnych i wielofunkcyjnych. Prosimy o przesłanie zapytania – nasz zespół odpowie w ciągu 24–48 godzin.", highlights: ["Terminowe oddanie", "Gwarancja jakości", "Przejrzysta komunikacja"] },
};

export const HOME: Record<Locale, HomeContent> = { tr: TR, en: EN, de: DE, ru: RU, pl: PL };
