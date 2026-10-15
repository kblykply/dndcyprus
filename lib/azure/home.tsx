// Ana sayfa (Azure) içerikleri — TR/EN. Metinler mevcut siteden ve onaylı Azure konseptinden taşındı.
import type { ReactNode } from "react";
import type { Locale } from "./site";

export type HomeContent = {
  hero: { tag: string; play: string; title: ReactNode; lead: string; primary: string; secondary: string; chips: { big: string; label: string }[] };
  awards: { label: string; items: { b: string; rest: string; ribbon?: string }[] };
  bento: {
    kicker: string; title: ReactNode; lead: string;
    lagoon: { k: string; h: string; p: string; pill: string };
    tl: { k: string; h: string; upto: string; rules: string[]; months: string };
    units: { k: string; big: string; small: string; p: string };
    usa: { k: string; count: number; p: string };
    mariachi: { k: string; h: string; p: string; pill: string };
    lajoya: { k: string; h: string; p: string; pill: string };
    tech: { k: string; h: string; p: string };
    awards: { k: string; h: string; items: { title: string; text: string; ribbon: string; href: string }[] };
    stats: { k: string; h: string; items: { value: number; suffix: string; label: string }[] };
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
    lead: "Boston'da kurulan DND Homes'un Kıbrıs yapılanması. İskele'de lagün havuzlu rezidanslar, sahilde butik yaşam ve ödüllü bir beach club.",
    primary: "Projeleri Keşfet",
    secondary: "Lagoon Verde",
    chips: [{ big: "354", label: "Rezidans · Lagoon Verde" }, { big: "30.000+", label: "Konut vizyonu · Kuzey Kıbrıs" }, { big: "4", label: "Ödül · 2018–2025" }],
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
    lagoon: { k: "Bahçeler, İskele · Teslim Aralık 2028", h: "Lagoon Verde", p: "Eşsiz lagün havuzu konsepti; aquapark, mini golf, amfitiyatro, fitness, Verde Cafe. 43.179 m² arsa üzerinde 354 rezidans.", pill: "Altın Ödül · Devam eden" },
    tl: { k: "Yeni ödeme modeli", h: "Maaşınız TL, taksitiniz de TL.", upto: "aya kadar faizsiz", rules: ["Banka, faiz ve kefil yok", "Kur farkı ve vade farkı yok", "Taksitler KKTC asgari ücret artışına göre güncellenir"], months: "ay" },
    units: { k: "Daire tipleri", big: "1+0", small: " · 1+1 · 2+1", p: "Studio 39 m² · Loft 50 m² · Roof 70 m² · Garden 78 m² kapalı alan" },
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
    stats: { k: "Rakamlarla DND", h: "Boston'dan İskele'ye", items: [{ value: 30000, suffix: "+", label: "Planlanan konut" }, { value: 8, suffix: "+", label: "Bölge" }, { value: 4, suffix: "+", label: "Ödül" }] },
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
    lead: "The Cyprus arm of Boston-founded DND Homes. Lagoon-pool residences in İskele, boutique seaside living and an award-winning beach club.",
    primary: "Explore Projects",
    secondary: "Lagoon Verde",
    chips: [{ big: "354", label: "Residences · Lagoon Verde" }, { big: "30,000+", label: "Homes vision · North Cyprus" }, { big: "4", label: "Awards · 2018–2025" }],
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
    lagoon: { k: "Bahçeler, İskele · Delivery December 2028", h: "Lagoon Verde", p: "A unique lagoon-pool concept; aqua park, mini golf, amphitheatre, fitness, Verde Cafe. 354 residences on a 43,179 m² plot.", pill: "Gold Award · Ongoing" },
    tl: { k: "New payment model", h: "Earn in lira, pay in lira.", upto: "months interest-free", rules: ["No bank, no interest, no guarantor", "No exchange-rate or maturity difference", "Instalments follow the TRNC minimum-wage increase"], months: "months" },
    units: { k: "Unit types", big: "1+0", small: " · 1+1 · 2+1", p: "Studio 39 m² · Loft 50 m² · Roof 70 m² · Garden 78 m² enclosed area" },
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
    stats: { k: "DND in numbers", h: "From Boston to İskele", items: [{ value: 30000, suffix: "+", label: "Planned homes" }, { value: 8, suffix: "+", label: "Regions" }, { value: 4, suffix: "+", label: "Awards" }] },
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

export const HOME: Record<Locale, HomeContent> = { tr: TR, en: EN };
