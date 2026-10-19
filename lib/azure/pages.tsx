// Yeni sayfa ve bölüm metinleri (Ekim 2026, müşterinin akış belgesi): DND Ayrıcalığı (/advantage), Ödeme ve Yatırım
// Fırsatları (/payment-plans), Etkinlikler (/press), Hakkımızda'ya DND Homes Amerika, kurucu ortak ve rakamlar.
// Satış sonrası (DND Maintenance), peşinat indirimleri ve DND Kira Garantisi: DND Cyprus satış sunumu ("SATIŞ SUNUMM TR",
// Eylül 2026). Ülfet ayrıcalıkları: kullanıcı + lajoyacyprus.com (Ülfet Shu %10, Ülfet Beach Club ücretsiz giriş, 2026 yazı).
// Kiralama: La Joya (lajoyacyprus.com) ve DND Reserve. Etkinlikler Instagram gönderilerinden (CRT eğitimi, Halloween afişi);
// Larnaka ve Friday Fun Day fotoğrafları @dndcyprus gönderilerinden (Eylül 2026).
import type { ReactNode } from "react";
import type { Locale } from "./site";

type Card = { k: string; h: string; p: string; img: string; path: string; cta: string };
const LAJOYA = "https://lajoyacyprus.com/";
const RESERVE = "https://www.dndreserve.com";
type Event = { date: string; h: string; p: string; img: string; href?: string };

export type PagesCopy = {
  advantage: {
    meta: { title: string; description: string };
    hero: { kicker: string; title: ReactNode; lead: string };
    quality: { kicker: string; title: string; lead: string };
    social: { kicker: string; title: string; lead: string };
    after: { kicker: string; title: ReactNode; lead: string; points: string[]; imageAlt: string; note: string; cta: string };
    extra: { kicker: string; title: ReactNode; lead: string; items: { h: string; p: string; tag: string }[]; imageAlt: string };
  };
  payment: {
    meta: { title: string; description: string };
    hero: { kicker: string; title: ReactNode; lead: string };
    faqTitle: string;
    faqLead: string;
    campaigns: { kicker: string; title: ReactNode; lead: string; items: Card[]; note: string };
    rental: {
      kicker: string; title: ReactNode; lead: string; points: string[]; imageAlt: string; note: string; cta: string;
      statsLabel: string; stats: { n: string; l: string }[]; links: { label: string; href: string }[];
    };
  };
  events: { kicker: string; title: ReactNode; lead: string; items: Event[]; follow: string };
  about: {
    usa: { kicker: string; title: ReactNode; p: string[]; stat: string; photos: string[]; link: string };
    partner: { role: string; bio: string; quote: string; dl: [string, string][] };
    numbersUsa: string;
    numbersTitle: ReactNode;
  };
};

const TR: PagesCopy = {
  advantage: {
    meta: { title: "DND Ayrıcalığı | İnşaat Kalitesi, Sosyal Yaşam ve Ev Sahibi Ayrıcalıkları – DND Cyprus", description: "DND Cyprus projelerinde standart teknik donanım, resort konseptli sosyal tesisler, satış sonrası destek ve Mariachi Beach Club’da ev sahiplerine özel ayrıcalıklar." },
    hero: { kicker: "DND Ayrıcalığı", title: <>Bir evden <b>fazlası.</b></>, lead: "İnşaat kalitesinden sosyal yaşama, teslim sonrası destekten ev sahiplerine özel ayrıcalıklara kadar DND farkı." },
    quality: { kicker: "İnşaat kalitesi ve mimari", title: "Her projede aynı standart", lead: "Merkezi ısıtma-soğutma, jeneratör, akıllı ev sistemleri ve banyolarda yerden ısıtma DND projelerinde standart donanımdır." },
    social: { kicker: "Sosyal yaşam ve tesisler", title: "Resort yaşamı, kapınızın önünde", lead: "Lagoon Verde ve La Joya Perla’daki ortak yaşam alanlarından örnekler: havuzlar, spor ve wellness, restoranlar, çocuklar için alanlar." },
    after: {
      kicker: "Satış sonrası hizmetler", title: <>DND Maintenance ile <b>teslimden sonra da yanınızdayız.</b></>,
      lead: "DND Maintenance, tamamlanan DND projelerinin profesyonel site yönetimini üstlenerek yaşam kalitesinin ve proje standartlarının uzun yıllar korunmasını hedefliyor.",
      points: ["Ortak alanların ve sosyal tesislerin profesyonel yönetimi", "Teknik bakım, peyzaj, temizlik ve günlük operasyonların koordinasyonu", "Ev sahiplerine profesyonel kiralama ve rezervasyon hizmetleri", "Ev sahipleri için kolay, güvenilir ve profesyonel mülk yönetimi"],
      imageAlt: "La Joya’da anahtar teslimi", note: "* Hizmet kapsamı projeye göre değişebilir. Ayrıntılı bilgi için satış ekibimizle görüşün.", cta: "Satış ekibine ulaşın",
    },
    extra: {
      kicker: "Diğer ev sahibi ayrıcalıkları", title: <>Ülfet’te <b>DND ayrıcalığı.</b></>,
      lead: "DND Cyprus’un Girne Karaoğlanoğlu’ndaki iş ortağı Ülfet’te ev sahiplerine özel avantajlar.",
      items: [{ h: "Ülfet Beach Club", p: "DND Cyprus ev sahiplerine 2026 yaz sezonu boyunca ücretsiz giriş.", tag: "Ücretsiz giriş" }, { h: "Ülfet Shu", p: "Yeni nesil meyhane Ülfet Shu’da DND ev sahiplerine ve La Joya misafirlerine %10 indirim.", tag: "%10 indirim" }],
      imageAlt: "Ülfet Beach Club, Karaoğlanoğlu",
    },
  },
  payment: {
    meta: { title: "Ödeme ve Yatırım Fırsatları | TL Ödeme Modeli, Kampanyalar – DND Cyprus", description: "Lagoon Verde’de 60 aya kadar faizsiz TL taksit, NeoCity’de 5 Sıfır ödeme planı: %35 peşinat, bankasız ve kefilsiz. Güncel kampanyalar ve yatırım için DND Cyprus." },
    hero: { kicker: "Ödeme ve yatırım fırsatları", title: <>Maaşınız TL, <b>taksitiniz de TL.</b></>, lead: "Bankasız, faizsiz ve kur riskinden uzak ödeme modelleriyle ev sahibi olmak artık daha kolay." },
    faqTitle: "Ödeme modeli hakkında",
    faqLead: "Merak edilenleri yanıtladık; başka sorunuz için ekibimize ulaşın.",
    campaigns: {
      kicker: "Güncel kampanyalar", title: <>Şimdi geçerli <b>fırsatlar.</b></>, lead: "Sitede yayımlanan güncel ödeme modelleri ve ev sahiplerine özel ayrıcalıklar.",
      items: [
        { k: "NeoCity · Yeni proje", h: "5 Sıfır ödeme planı", p: "Faiz, banka, kefil, vade farkı ve kur farkı yok. %35 peşinat, kalan tutar 60 ay vadeyle doğrudan NeoCity’ye.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "NeoCity’yi incele" },
        { k: "Lagoon Verde · Sınırlı sayıda rezidans", h: "60 aya kadar faizsiz TL taksit", p: "Tüm ödemeler Türk lirasıyla; taksitler sterlin kuruna değil KKTC asgari ücretindeki artışa göre güncellenir.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Lagoon Verde’yi incele" },
        { k: "DND ev sahiplerine özel", h: "Mariachi Beach Club ayrıcalığı", p: "Ücretsiz giriş ve restoran, havuz barı, şezlong ve cabana harcamalarında %10 indirim.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Mariachi’yi keşfet" },
        { k: "Lagoon Verde · Peşin ödeme", h: "Peşinata göre indirim", p: "Lagoon Verde’de %35 peşinatta %5, %50 peşinatta %10, %70 peşinatta %17, tamamı peşin ödemede %22 indirim.", img: "/azure/lv-1.jpg", path: "/lagoon-verde", cta: "Lagoon Verde’yi incele" },
        { k: "DND ev sahipleri ve La Joya misafirleri · Girne", h: "Ülfet Beach Club ve Ülfet Shu", p: "DND ev sahiplerine Ülfet Beach Club’da 2026 yaz sezonu boyunca ücretsiz giriş; ev sahiplerine ve La Joya misafirlerine yeni nesil meyhane Ülfet Shu’da %10 indirim.", img: "/azure/pages/ulfet-beach.jpg", path: "/advantage", cta: "Ayrıcalıkları gör" },
      ],
      note: "* Kampanya koşulları ve süreleri değişebilir. Peşinat indirimleri yalnız Lagoon Verde’de geçerlidir; güncel bilgi için satış ekibimizle görüşün.",
    },
    rental: {
      kicker: "Yatırım ve kira geliri", title: <>Tatil yaşamı ve yatırım <b>bir arada.</b></>,
      lead: "Kuzey Kıbrıs’ın turizm odaklı güçlü talebi ve DND’nin turizm ekosistemiyle evinizi kendiniz kullanabilir ya da kiraya verebilirsiniz. DND Maintenance, kiralamanın tanıtım, rezervasyon, misafir karşılama ve operasyon aşamalarını tek merkezden yönetir.",
      points: ["Lagoon Verde’de DND Kira Garantisi: liste fiyatı üzerinden 1 ay içinde peşin ödeme yapılıp talep edilirse yıllık %12,5 kira garantisi", "İlk kira geliri 36. ayda; ardından her 6 ayda bir %6,25 kira ödemesi", "8 yıl boyunca garantili gelir ve 8 yılda %100 amorti garantisi", "La Joya Resort & Residences tatil konaklaması için rezervasyon kabul ediyor"],
      imageAlt: "Lagoon Verde’de tatilciler", note: "* Kira garantisi yalnız Lagoon Verde’de geçerlidir. Güncel koşullar ve uygun birimler için satış ekibimizle görüşün.", cta: "Kira garantisi için bilgi alın",
      statsLabel: "Neden Kuzey Kıbrıs?", stats: [{ n: "2,2 M+", l: "yıllık ziyaretçi" }, { n: "%19,1", l: "turist artışı (2023–2024)" }, { n: "300+", l: "güneşli gün (yılda)" }],
      links: [{ label: "La Joya’da konaklama", href: LAJOYA }, { label: "DND Reserve", href: RESERVE }],
    },
  },
  events: {
    kicker: "Etkinlikler", title: <>DND Cyprus’la <b>bir arada.</b></>, lead: "Ödül törenlerinden kutlamalara, DND Cyprus ailesinin bir araya geldiği anlar.",
    items: [
      { date: "24–25 Ekim 2026", h: "Halloween Workshop · Joy Cafe", p: "La Joya’daki Joy Cafe’de çocuklu ve yetişkinli Halloween atölyesi: kova süsleme, slime atölyesi, hazine avı, kostüm defilesi ve disko. 11:00–13:00.", img: "/azure/pages/halloween-workshop.jpg" },
      { date: "Ekim 2026", h: "Takım çalışması: CRT ekibiyle satış eğitimi", p: "CRT ekibiyle DND Cyprus projeleri üzerine tanıtım ve satış eğitimi gerçekleştirdik. Güçlü ekip, ortak hedef.", img: "/azure/pages/ekip-egitimi.jpg" },
      { date: "25 Eylül 2026", h: "Larnaka Gençlerbirliği La Joya’da", p: "Sponsoru olduğumuz Larnaka Gençlerbirliği’nin genç sporcularını La Joya’da ağırladık; takımımıza sezon boyunca başarılar diliyoruz.", img: "/azure/pages/larnaka-genclerbirligi.jpg" },
      { date: "12 Eylül 2026", h: "Friday, Fun Day: takım çalışması", p: "Eğitimci Zafer Erkoç liderliğinde La Joya’da ekip çalışması, iletişim ve iş birliği üzerine eğlenceli bir eğitim günü geçirdik.", img: "/azure/pages/friday-fun-day.jpg" },
      { date: "Nisan 2025", h: "PropertyNC 2025 Ödül Töreni", p: "DND Cyprus üç ödülle döndü: Lagoon Verde, Mariachi Beach Club ve En İyi Yeni Girişim.", img: "/property_awards_2025-747.jpg", href: "/blog/dnd-cyprus-gold-award-propertync-2025" },
      { date: "31 Ekim 2025", h: "La Joya açılışı", p: "La Joya, 74 konutuyla tamamlandı; açılışı ev sahipleri, emlak danışmanları ve iş ortaklarımızla kutladık.", img: "/news/mhacover.webp" },
      { date: "Aralık 2023", h: "Yeni Yıl Galası", p: "İş ortakları, acenteler ve sektör paydaşlarıyla yeni yılı birlikte karşıladık.", img: "/dndwhoweare.jpg", href: "/blog/dnd-cyprus-new-year-celebration-2023" },
      { date: "Yaz", h: "DND Beach Parti", p: "DND Cyprus ailesiyle sahilde bir araya geldiğimiz beach parti.", img: "/DND Beach Parti 24-59.jpg" },
      { date: "Her hafta", h: "Mariachi’de DJ geceleri", p: "Gün batımından geç saate uzanan müzik ve canlı performanslar.", img: "/azure/dj.jpg" },
    ],
    follow: "Yaklaşan etkinlikler için Instagram’da takip edin",
  },
  about: {
    usa: {
      kicker: "DND Homes · Amerika", title: <>Boston’dan Kıbrıs’a uzanan <b>gayrimenkul vizyonu.</b></>,
      p: ["DND Homes, 2017 yılında Boston’da kuruldu. Boston bölgesinde, özellikle Cambridge ve çevresinde konut projeleri geliştiren şirket, arsadan tasarıma, inşaattan teslimata kadar geliştirme sürecinin tamamını kendi bünyesinde yönetiyor.", "DND Cyprus, grubun Amerika’da edindiği gayrimenkul geliştirme deneyimini Kuzey Kıbrıs’a taşıyor; özellikle İskele bölgesinde resort yaşam anlayışını modern konut mimarisiyle bir araya getiriyor."],
      stat: "Massachusetts’te DND Homes imzalı tamamlanmış proje", photos: ["15 Tyler Road, Lexington, MA", "131 Dane Hill Road, Newton, MA"], link: "DND Homes web sitesi",
    },
    partner: { role: "Kurucu Ortak & Yönetim Kurulu Başkan Yardımcısı", bio: "DND’nin kurucu ortağı olarak şirketin büyüme stratejisinde, kurumsal gelişiminde ve marka vizyonunda aktif rol üstleniyor; kalite, tasarım ve müşteri deneyiminde yüksek standartlara odaklanıyor.", quote: "Kalite, güven ve güçlü marka değerleriyle, insanların yaşamına ve yatırımına kalıcı değer katan projeler yaratmak.", dl: [["Liderlik", "Strateji · Denetim · Uygulama"], ["Temsil", "Uluslararası platformlar · PropertyNC Awards"], ["DND ödülleri", "PropertyNC Awards 2025 · 1 Platin · 2 Altın"]] },
    numbersUsa: "ABD’de tamamlanan proje (DND Homes)",
    numbersTitle: <>Boston’dan İskele’ye, <b>rakamlarla.</b></>,
  },
};

const EN: PagesCopy = {
  advantage: {
    meta: { title: "The DND Advantage | Build Quality, Social Life & Homeowner Privileges – DND Cyprus", description: "Standard technical features in every DND Cyprus project, resort-style social facilities, after-sales support and exclusive Mariachi Beach Club privileges for homeowners." },
    hero: { kicker: "The DND Advantage", title: <>More than <b>a home.</b></>, lead: "From build quality to social life, from support after handover to privileges reserved for homeowners — the DND difference." },
    quality: { kicker: "Construction quality & architecture", title: "The same standard in every project", lead: "Central heating and cooling, generator, smart home systems and underfloor heating in bathrooms come as standard in DND projects." },
    social: { kicker: "Social life & facilities", title: "Resort living at your doorstep", lead: "Examples from the shared spaces at Lagoon Verde and La Joya Perla: pools, sport and wellness, restaurants and areas for children." },
    after: {
      kicker: "After-sales services", title: <>With DND Maintenance, <b>still by your side after handover.</b></>,
      lead: "DND Maintenance takes on the professional management of completed DND projects, aiming to preserve quality of life and project standards for many years.",
      points: ["Professional management of shared areas and social facilities", "Coordination of technical maintenance, landscaping, cleaning and daily operations", "Professional rental and reservation services for homeowners", "Easy, reliable and professional property management for homeowners"],
      imageAlt: "Key handover at La Joya", note: "* The scope of services may vary by project. Please contact our sales team for details.", cta: "Contact the sales team",
    },
    extra: {
      kicker: "More homeowner privileges", title: <>DND privileges <b>at Ülfet.</b></>,
      lead: "Exclusive benefits for homeowners at Ülfet, DND Cyprus’s partner in Karaoğlanoğlu, Kyrenia.",
      items: [{ h: "Ülfet Beach Club", p: "Free entry for DND Cyprus homeowners throughout the 2026 summer season.", tag: "Free entry" }, { h: "Ülfet Shu", p: "10% off for DND homeowners and La Joya guests at Ülfet Shu, a new-generation meyhane (tavern).", tag: "10% off" }],
      imageAlt: "Ülfet Beach Club, Karaoğlanoğlu",
    },
  },
  payment: {
    meta: { title: "Payment & Investment Opportunities | Lira Payment Model – DND Cyprus", description: "Up to 60 months of interest-free lira instalments at Lagoon Verde and the 5 Zeros plan at NeoCity: 35% down, no bank, no guarantor. Current campaigns and investment with DND Cyprus." },
    hero: { kicker: "Payment & investment opportunities", title: <>Your salary in lira, <b>your instalments too.</b></>, lead: "Payment models with no bank, no interest and no currency risk make owning a home easier." },
    faqTitle: "About the payment model",
    faqLead: "Answers to common questions; for anything else, contact our team.",
    campaigns: {
      kicker: "Current campaigns", title: <>Offers <b>available now.</b></>, lead: "The current payment models published on our site and privileges reserved for homeowners.",
      items: [
        { k: "NeoCity · New project", h: "5 Zeros payment plan", p: "No interest, bank, guarantor, maturity charge or exchange-rate risk. 35% down, the rest paid directly to NeoCity over 60 months.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "Explore NeoCity" },
        { k: "Lagoon Verde · Limited residences", h: "Up to 60 months interest-free in lira", p: "All payments in Turkish lira; instalments follow the TRNC minimum wage, not the sterling rate.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Explore Lagoon Verde" },
        { k: "Exclusive to DND homeowners", h: "Mariachi Beach Club privileges", p: "Free entry and 10% off at the restaurant, pool bar, sunbeds and cabanas.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Discover Mariachi" },
        { k: "Lagoon Verde · Upfront payment", h: "Discounts by down payment", p: "At Lagoon Verde: 5% off with 35% down, 10% with 50% down, 17% with 70% down and 22% when paid in full.", img: "/azure/lv-1.jpg", path: "/lagoon-verde", cta: "Explore Lagoon Verde" },
        { k: "DND homeowners & La Joya guests · Kyrenia", h: "Ülfet Beach Club & Ülfet Shu", p: "Free entry to Ülfet Beach Club for DND homeowners throughout the 2026 summer season; 10% off for homeowners and La Joya guests at the new-generation meyhane Ülfet Shu.", img: "/azure/pages/ulfet-beach.jpg", path: "/advantage", cta: "See the privileges" },
      ],
      note: "* Campaign terms and durations may change. Down-payment discounts apply only at Lagoon Verde; please contact our sales team for current information.",
    },
    rental: {
      kicker: "Investment & rental income", title: <>Holiday living and investment <b>together.</b></>,
      lead: "With North Cyprus’s strong tourism-driven demand and DND’s tourism ecosystem, you can use your home yourself or rent it out. DND Maintenance runs marketing, reservations, guest welcome and operations from one centre.",
      points: ["DND Rental Guarantee at Lagoon Verde: if paid in full at list price within 1 month and requested, a 12.5% annual rental guarantee", "First rental income in month 36, then a 6.25% rental payment every 6 months", "Guaranteed income for 8 years and a 100% payback guarantee within 8 years", "La Joya Resort & Residences accepts holiday bookings"],
      imageAlt: "Holiday guests at Lagoon Verde", note: "* The rental guarantee applies only at Lagoon Verde. Please contact our sales team for current terms and eligible units.", cta: "Ask about the rental guarantee",
      statsLabel: "Why North Cyprus?", stats: [{ n: "2.2M+", l: "visitors a year" }, { n: "+19.1%", l: "tourist growth (2023–2024)" }, { n: "300+", l: "sunny days a year" }],
      links: [{ label: "Stay at La Joya", href: LAJOYA }, { label: "DND Reserve", href: RESERVE }],
    },
  },
  events: {
    kicker: "Events", title: <>Together with <b>DND Cyprus.</b></>, lead: "From award ceremonies to celebrations — moments when the DND Cyprus family came together.",
    items: [
      { date: "24–25 October 2026", h: "Halloween Workshop · Joy Cafe", p: "A Halloween workshop for children and adults at Joy Cafe, La Joya: bucket decorating, slime workshop, scavenger hunt, costume catwalk and disco. 11:00–13:00.", img: "/azure/pages/halloween-workshop.jpg" },
      { date: "October 2026", h: "Teamwork: sales training with the CRT team", p: "We held a presentation and sales training on DND Cyprus projects with the CRT team. A strong team with a shared goal.", img: "/azure/pages/ekip-egitimi.jpg" },
      { date: "25 September 2026", h: "Larnaka Gençlerbirliği at La Joya", p: "We hosted the young athletes of Larnaka Gençlerbirliği, the club we sponsor, at La Joya and wish the team a successful season.", img: "/azure/pages/larnaka-genclerbirligi.jpg" },
      { date: "12 September 2026", h: "Friday, Fun Day: teamwork", p: "Led by trainer Zafer Erkoç, we spent a fun training day at La Joya on teamwork, communication and collaboration.", img: "/azure/pages/friday-fun-day.jpg" },
      { date: "April 2025", h: "PropertyNC 2025 Awards", p: "DND Cyprus came home with three awards: Lagoon Verde, Mariachi Beach Club and Best Newcomer.", img: "/property_awards_2025-747.jpg", href: "/blog/dnd-cyprus-gold-award-propertync-2025" },
      { date: "31 October 2025", h: "La Joya opening", p: "La Joya was completed with 74 homes; we celebrated the opening with homeowners, real estate agents and business partners.", img: "/news/mhacover.webp" },
      { date: "December 2023", h: "New Year Gala", p: "We welcomed the new year with business partners, agents and industry stakeholders.", img: "/dndwhoweare.jpg", href: "/blog/dnd-cyprus-new-year-celebration-2023" },
      { date: "Summer", h: "DND Beach Party", p: "A beach party that brought the DND Cyprus family together by the sea.", img: "/DND Beach Parti 24-59.jpg" },
      { date: "Every week", h: "DJ nights at Mariachi", p: "Music and live performances from sunset until late.", img: "/azure/dj.jpg" },
    ],
    follow: "Follow us on Instagram for upcoming events",
  },
  about: {
    usa: {
      kicker: "DND Homes · USA", title: <>A real estate vision <b>from Boston to Cyprus.</b></>,
      p: ["DND Homes was founded in Boston in 2017. Developing residential projects in the Boston area, particularly in and around Cambridge, the company manages the entire development process in-house — from land and design to construction and handover.", "DND Cyprus brings the group’s US development experience to North Cyprus, combining resort living with modern residential architecture, especially in the İskele region."],
      stat: "completed DND Homes projects in Massachusetts", photos: ["15 Tyler Road, Lexington, MA", "131 Dane Hill Road, Newton, MA"], link: "DND Homes website",
    },
    partner: { role: "Co-founder & Vice Chair", bio: "As co-founder of DND, she plays an active role in the company’s growth strategy, corporate development and brand vision, with a focus on high standards in quality, design and customer experience.", quote: "Creating projects that add lasting value to people’s lives and investments through quality, trust and strong brand values.", dl: [["Leadership", "Strategy · Oversight · Execution"], ["Representation", "International platforms · PropertyNC Awards"], ["DND awards", "PropertyNC Awards 2025 · 1 Platinum · 2 Gold"]] },
    numbersUsa: "completed projects in the USA (DND Homes)",
    numbersTitle: <>From Boston to İskele, <b>in numbers.</b></>,
  },
};

const DE: PagesCopy = {
  advantage: {
    meta: { title: "Der DND-Vorteil | Bauqualität, Gemeinschaft & Eigentümervorteile – DND Cyprus", description: "Standardausstattung in jedem DND-Cyprus-Projekt, Gemeinschaftseinrichtungen im Resort-Stil, Kundendienst nach dem Kauf und exklusive Vorteile im Mariachi Beach Club." },
    hero: { kicker: "Der DND-Vorteil", title: <>Mehr als <b>ein Zuhause.</b></>, lead: "Von der Bauqualität über das Gemeinschaftsleben und die Betreuung nach der Übergabe bis zu exklusiven Vorteilen für Eigentümer – der DND-Unterschied." },
    quality: { kicker: "Bauqualität & Architektur", title: "Derselbe Standard in jedem Projekt", lead: "Zentrale Heizung und Kühlung, Generator, Smart-Home-Systeme und Fußbodenheizung im Bad gehören in DND-Projekten zum Standard." },
    social: { kicker: "Gemeinschaft & Einrichtungen", title: "Resort-Leben vor der Haustür", lead: "Beispiele aus den Gemeinschaftsbereichen von Lagoon Verde und La Joya Perla: Pools, Sport und Wellness, Restaurants und Bereiche für Kinder." },
    after: {
      kicker: "Kundendienst nach dem Kauf", title: <>Mit DND Maintenance <b>auch nach der Übergabe an Ihrer Seite.</b></>,
      lead: "DND Maintenance übernimmt die professionelle Verwaltung fertiggestellter DND-Projekte, damit Lebensqualität und Projektstandards über viele Jahre erhalten bleiben.",
      points: ["Professionelle Verwaltung der Gemeinschaftsbereiche und Einrichtungen", "Koordination von technischer Wartung, Gartenpflege, Reinigung und täglichem Betrieb", "Professionelle Vermietungs- und Reservierungsdienste für Eigentümer", "Einfache, zuverlässige und professionelle Immobilienverwaltung für Eigentümer"],
      imageAlt: "Schlüsselübergabe in La Joya", note: "* Der Leistungsumfang kann je nach Projekt variieren. Details erhalten Sie von unserem Vertriebsteam.", cta: "Vertriebsteam kontaktieren",
    },
    extra: {
      kicker: "Weitere Eigentümervorteile", title: <>DND-Vorteile <b>bei Ülfet.</b></>,
      lead: "Exklusive Vorteile für Eigentümer bei Ülfet, dem Partner von DND Cyprus in Karaoğlanoğlu, Kyrenia.",
      items: [{ h: "Ülfet Beach Club", p: "Freier Eintritt für DND-Cyprus-Eigentümer in der gesamten Sommersaison 2026.", tag: "Freier Eintritt" }, { h: "Ülfet Shu", p: "10 % Rabatt für DND-Eigentümer und Gäste von La Joya im Ülfet Shu, einer Meyhane (Taverne) der neuen Generation.", tag: "10 % Rabatt" }],
      imageAlt: "Ülfet Beach Club, Karaoğlanoğlu",
    },
  },
  payment: {
    meta: { title: "Zahlung & Investition | Lira-Zahlungsmodell – DND Cyprus", description: "Bis zu 60 Monate zinsfreie Lira-Raten bei Lagoon Verde und der 5-Null-Plan bei NeoCity: 35 % Anzahlung, ohne Bank, ohne Bürgen. Aktuelle Aktionen und Investition mit DND Cyprus." },
    hero: { kicker: "Zahlung & Investition", title: <>Gehalt in Lira, <b>Raten auch in Lira.</b></>, lead: "Zahlungsmodelle ohne Bank, ohne Zinsen und ohne Währungsrisiko machen den Hauskauf leichter." },
    faqTitle: "Zum Zahlungsmodell",
    faqLead: "Antworten auf häufige Fragen; bei allem Weiteren hilft Ihnen unser Team.",
    campaigns: {
      kicker: "Aktuelle Aktionen", title: <>Jetzt <b>verfügbare Angebote.</b></>, lead: "Die auf unserer Website veröffentlichten Zahlungsmodelle und exklusive Vorteile für Eigentümer.",
      items: [
        { k: "NeoCity · Neues Projekt", h: "5-Null-Zahlungsplan", p: "Keine Zinsen, keine Bank, kein Bürge, kein Laufzeitaufschlag, kein Kursrisiko. 35 % Anzahlung, der Rest über 60 Monate direkt an NeoCity.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "NeoCity ansehen" },
        { k: "Lagoon Verde · Begrenzte Residenzen", h: "Bis zu 60 Monate zinsfrei in Lira", p: "Alle Zahlungen in Türkischer Lira; die Raten folgen dem Mindestlohn der TRNZ, nicht dem Pfundkurs.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Lagoon Verde ansehen" },
        { k: "Exklusiv für DND-Eigentümer", h: "Vorteile im Mariachi Beach Club", p: "Freier Eintritt und 10 % Rabatt in Restaurant, Poolbar, auf Liegen und Cabanas.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Mariachi entdecken" },
        { k: "Lagoon Verde · Vorauszahlung", h: "Rabatt nach Anzahlung", p: "In Lagoon Verde: 5 % Rabatt bei 35 % Anzahlung, 10 % bei 50 %, 17 % bei 70 % und 22 % bei Vollzahlung.", img: "/azure/lv-1.jpg", path: "/lagoon-verde", cta: "Lagoon Verde ansehen" },
        { k: "DND-Eigentümer & La-Joya-Gäste · Kyrenia", h: "Ülfet Beach Club & Ülfet Shu", p: "Freier Eintritt in den Ülfet Beach Club für DND-Eigentümer in der Sommersaison 2026; 10 % Rabatt für Eigentümer und La-Joya-Gäste in der Meyhane Ülfet Shu.", img: "/azure/pages/ulfet-beach.jpg", path: "/advantage", cta: "Vorteile ansehen" },
      ],
      note: "* Bedingungen und Laufzeiten der Aktionen können sich ändern. Die Anzahlungsrabatte gelten nur für Lagoon Verde; aktuelle Informationen erhalten Sie von unserem Vertriebsteam.",
    },
    rental: {
      kicker: "Investition & Mieteinnahmen", title: <>Urlaubsleben und Investition <b>vereint.</b></>,
      lead: "Dank der starken touristischen Nachfrage in Nordzypern und dem Tourismus-Ökosystem von DND können Sie Ihr Zuhause selbst nutzen oder vermieten. DND Maintenance steuert Vermarktung, Reservierung, Gästeempfang und Betrieb aus einer Hand.",
      points: ["DND-Mietgarantie in Lagoon Verde: bei Vollzahlung zum Listenpreis innerhalb von 1 Monat und auf Wunsch 12,5 % Mietgarantie pro Jahr", "Erste Mieteinnahme im 36. Monat, danach alle 6 Monate eine Mietzahlung von 6,25 %", "8 Jahre garantiertes Einkommen und 100 % Amortisationsgarantie in 8 Jahren", "La Joya Resort & Residences nimmt Urlaubsbuchungen an"],
      imageAlt: "Urlaubsgäste in Lagoon Verde", note: "* Die Mietgarantie gilt nur für Lagoon Verde. Aktuelle Bedingungen und verfügbare Einheiten erhalten Sie von unserem Vertriebsteam.", cta: "Zur Mietgarantie beraten lassen",
      statsLabel: "Warum Nordzypern?", stats: [{ n: "2,2 Mio.+", l: "Besucher pro Jahr" }, { n: "+19,1 %", l: "Touristenwachstum (2023–2024)" }, { n: "300+", l: "Sonnentage im Jahr" }],
      links: [{ label: "Urlaub in La Joya", href: LAJOYA }, { label: "DND Reserve", href: RESERVE }],
    },
  },
  events: {
    kicker: "Veranstaltungen", title: <>Gemeinsam mit <b>DND Cyprus.</b></>, lead: "Von Preisverleihungen bis zu Feiern – Momente, in denen die DND-Cyprus-Familie zusammenkam.",
    items: [
      { date: "24.–25. Oktober 2026", h: "Halloween-Workshop · Joy Cafe", p: "Halloween-Workshop für Kinder und Erwachsene im Joy Cafe in La Joya: Eimer gestalten, Slime-Workshop, Schatzsuche, Kostümlaufsteg und Disco. 11:00–13:00 Uhr.", img: "/azure/pages/halloween-workshop.jpg" },
      { date: "Oktober 2026", h: "Teamarbeit: Verkaufsschulung mit dem CRT-Team", p: "Mit dem CRT-Team haben wir eine Präsentation und Verkaufsschulung zu den Projekten von DND Cyprus durchgeführt. Ein starkes Team mit gemeinsamem Ziel.", img: "/azure/pages/ekip-egitimi.jpg" },
      { date: "25. September 2026", h: "Larnaka Gençlerbirliği in La Joya", p: "Wir haben die jungen Sportler von Larnaka Gençlerbirliği, dem von uns gesponserten Verein, in La Joya empfangen und wünschen eine erfolgreiche Saison.", img: "/azure/pages/larnaka-genclerbirligi.jpg" },
      { date: "12. September 2026", h: "Friday, Fun Day: Teamarbeit", p: "Unter der Leitung von Trainer Zafer Erkoç verbrachten wir in La Joya einen unterhaltsamen Schulungstag zu Teamarbeit, Kommunikation und Zusammenarbeit.", img: "/azure/pages/friday-fun-day.jpg" },
      { date: "April 2025", h: "PropertyNC 2025 Awards", p: "DND Cyprus kehrte mit drei Auszeichnungen zurück: Lagoon Verde, Mariachi Beach Club und Best Newcomer.", img: "/property_awards_2025-747.jpg", href: "/blog/dnd-cyprus-gold-award-propertync-2025" },
      { date: "31. Oktober 2025", h: "Eröffnung von La Joya", p: "La Joya wurde mit 74 Wohnungen fertiggestellt; die Eröffnung feierten wir mit Eigentümern, Maklern und Geschäftspartnern.", img: "/news/mhacover.webp" },
      { date: "Dezember 2023", h: "Neujahrsgala", p: "Mit Geschäftspartnern, Maklern und Branchenvertretern haben wir das neue Jahr begrüßt.", img: "/dndwhoweare.jpg", href: "/blog/dnd-cyprus-new-year-celebration-2023" },
      { date: "Sommer", h: "DND Beach Party", p: "Eine Strandparty, bei der die DND-Cyprus-Familie am Meer zusammenkam.", img: "/DND Beach Parti 24-59.jpg" },
      { date: "Jede Woche", h: "DJ-Abende im Mariachi", p: "Musik und Live-Auftritte vom Sonnenuntergang bis spät in die Nacht.", img: "/azure/dj.jpg" },
    ],
    follow: "Folgen Sie uns auf Instagram für kommende Veranstaltungen",
  },
  about: {
    usa: {
      kicker: "DND Homes · USA", title: <>Eine Immobilienvision <b>von Boston bis Zypern.</b></>,
      p: ["DND Homes wurde 2017 in Boston gegründet. Das Unternehmen entwickelt Wohnprojekte im Großraum Boston, vor allem in und um Cambridge, und steuert den gesamten Entwicklungsprozess selbst – vom Grundstück über Planung und Bau bis zur Übergabe.", "DND Cyprus bringt die in den USA gewonnene Erfahrung der Gruppe nach Nordzypern und verbindet vor allem in der Region İskele Resort-Leben mit moderner Wohnarchitektur."],
      stat: "fertiggestellte DND-Homes-Projekte in Massachusetts", photos: ["15 Tyler Road, Lexington, MA", "131 Dane Hill Road, Newton, MA"], link: "Website von DND Homes",
    },
    partner: { role: "Mitgründerin & stellvertretende Vorsitzende", bio: "Als Mitgründerin von DND wirkt sie aktiv an Wachstumsstrategie, Unternehmensentwicklung und Markenvision mit und setzt auf hohe Standards in Qualität, Design und Kundenerlebnis.", quote: "Mit Qualität, Vertrauen und starken Markenwerten Projekte schaffen, die dem Leben und der Investition der Menschen bleibenden Wert verleihen.", dl: [["Führung", "Strategie · Aufsicht · Umsetzung"], ["Repräsentation", "Internationale Plattformen · PropertyNC Awards"], ["DND-Auszeichnungen", "PropertyNC Awards 2025 · 1× Platin · 2× Gold"]] },
    numbersUsa: "fertiggestellte Projekte in den USA (DND Homes)",
    numbersTitle: <>Von Boston bis İskele, <b>in Zahlen.</b></>,
  },
};

const RU: PagesCopy = {
  advantage: {
    meta: { title: "Преимущества DND | Качество, инфраструктура и привилегии владельцев – DND Cyprus", description: "Стандартное оснащение в каждом проекте DND Cyprus, курортная инфраструктура, послепродажная поддержка и привилегии владельцев в Mariachi Beach Club." },
    hero: { kicker: "Преимущества DND", title: <>Больше, <b>чем просто дом.</b></>, lead: "От качества строительства до общественной жизни, от поддержки после передачи ключей до привилегий для владельцев — в этом отличие DND." },
    quality: { kicker: "Качество строительства и архитектура", title: "Единый стандарт в каждом проекте", lead: "Центральное отопление и кондиционирование, генератор, системы умного дома и тёплый пол в ванных — стандарт проектов DND." },
    social: { kicker: "Общественная жизнь и инфраструктура", title: "Курортная жизнь у вашего порога", lead: "Примеры общих зон Lagoon Verde и La Joya Perla: бассейны, спорт и велнес, рестораны и пространства для детей." },
    after: {
      kicker: "Послепродажный сервис", title: <>С DND Maintenance — <b>рядом и после передачи ключей.</b></>,
      lead: "DND Maintenance профессионально управляет завершёнными проектами DND, чтобы качество жизни и стандарты проектов сохранялись долгие годы.",
      points: ["Профессиональное управление общими зонами и инфраструктурой", "Координация технического обслуживания, озеленения, уборки и ежедневной работы", "Профессиональные услуги аренды и бронирования для владельцев", "Простое, надёжное и профессиональное управление недвижимостью"],
      imageAlt: "Передача ключей в La Joya", note: "* Объём услуг может зависеть от проекта. Подробности уточняйте у отдела продаж.", cta: "Связаться с отделом продаж",
    },
    extra: {
      kicker: "Другие привилегии владельцев", title: <>Привилегии DND <b>в Ülfet.</b></>,
      lead: "Эксклюзивные преимущества для владельцев в Ülfet — партнёре DND Cyprus в Караогланоглу (Кирения).",
      items: [{ h: "Ülfet Beach Club", p: "Бесплатный вход для владельцев DND Cyprus в течение всего летнего сезона 2026.", tag: "Бесплатный вход" }, { h: "Ülfet Shu", p: "Скидка 10 % для владельцев DND и гостей La Joya в Ülfet Shu — мейхане (таверне) нового поколения.", tag: "Скидка 10 %" }],
      imageAlt: "Ülfet Beach Club, Караогланоглу",
    },
  },
  payment: {
    meta: { title: "Оплата и инвестиции | Оплата в лирах – DND Cyprus", description: "До 60 месяцев беспроцентной рассрочки в лирах в Lagoon Verde и план «5 нулей» в NeoCity: взнос 35 %, без банка и поручителя. Актуальные акции и инвестиции с DND Cyprus." },
    hero: { kicker: "Оплата и инвестиции", title: <>Зарплата в лирах — <b>и взносы в лирах.</b></>, lead: "Модели оплаты без банка, процентов и валютного риска упрощают покупку дома." },
    faqTitle: "О модели оплаты",
    faqLead: "Ответы на частые вопросы; по остальным вопросам обращайтесь к нашей команде.",
    campaigns: {
      kicker: "Актуальные акции", title: <>Предложения, <b>доступные сейчас.</b></>, lead: "Актуальные модели оплаты, опубликованные на сайте, и привилегии для владельцев.",
      items: [
        { k: "NeoCity · Новый проект", h: "План оплаты «5 нулей»", p: "Без процентов, банка, поручителя, надбавки за срок и курсового риска. Взнос 35 %, остаток — напрямую NeoCity в течение 60 месяцев.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "Смотреть NeoCity" },
        { k: "Lagoon Verde · Ограниченное число резиденций", h: "До 60 месяцев без процентов в лирах", p: "Все платежи в турецких лирах; взносы привязаны к минимальной зарплате ТРСК, а не к курсу фунта.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Смотреть Lagoon Verde" },
        { k: "Только для владельцев DND", h: "Привилегии Mariachi Beach Club", p: "Бесплатный вход и скидка 10 % в ресторане, баре у бассейна, на шезлонгах и в кабанах.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Узнать о Mariachi" },
        { k: "Lagoon Verde · Предоплата", h: "Скидка в зависимости от взноса", p: "В Lagoon Verde: скидка 5 % при взносе 35 %, 10 % при 50 %, 17 % при 70 % и 22 % при полной оплате.", img: "/azure/lv-1.jpg", path: "/lagoon-verde", cta: "Смотреть Lagoon Verde" },
        { k: "Владельцам DND и гостям La Joya · Кирения", h: "Ülfet Beach Club и Ülfet Shu", p: "Бесплатный вход в Ülfet Beach Club для владельцев DND весь летний сезон 2026; скидка 10 % для владельцев и гостей La Joya в мейхане Ülfet Shu.", img: "/azure/pages/ulfet-beach.jpg", path: "/advantage", cta: "Смотреть привилегии" },
      ],
      note: "* Условия и сроки акций могут меняться. Скидки за взнос действуют только в Lagoon Verde; актуальную информацию уточняйте у отдела продаж.",
    },
    rental: {
      kicker: "Инвестиции и арендный доход", title: <>Отдых и инвестиции <b>вместе.</b></>,
      lead: "Благодаря высокому туристическому спросу на Северном Кипре и туристической экосистеме DND вы можете пользоваться домом сами или сдавать его. DND Maintenance ведёт продвижение, бронирование, встречу гостей и работу объекта из одного центра.",
      points: ["Гарантия аренды DND в Lagoon Verde: при полной оплате по прайсу в течение 1 месяца и по запросу — 12,5 % годовых", "Первый арендный доход на 36-м месяце, затем выплата 6,25 % каждые 6 месяцев", "Гарантированный доход 8 лет и гарантия 100 % окупаемости за 8 лет", "La Joya Resort & Residences принимает бронирования на отдых"],
      imageAlt: "Отдыхающие в Lagoon Verde", note: "* Гарантия аренды действует только в Lagoon Verde. Актуальные условия и доступные квартиры уточняйте у отдела продаж.", cta: "Узнать о гарантии аренды",
      statsLabel: "Почему Северный Кипр?", stats: [{ n: "2,2 млн+", l: "туристов в год" }, { n: "+19,1 %", l: "рост турпотока (2023–2024)" }, { n: "300+", l: "солнечных дней в году" }],
      links: [{ label: "Отдых в La Joya", href: LAJOYA }, { label: "DND Reserve", href: RESERVE }],
    },
  },
  events: {
    kicker: "Мероприятия", title: <>Вместе <b>с DND Cyprus.</b></>, lead: "От церемоний награждения до праздников — моменты, когда семья DND Cyprus собиралась вместе.",
    items: [
      { date: "24–25 октября 2026", h: "Halloween Workshop · Joy Cafe", p: "Хэллоуин-мастер-класс для детей и взрослых в Joy Cafe в La Joya: украшение корзинок, слайм, поиск сокровищ, костюмированный показ и дискотека. 11:00–13:00.", img: "/azure/pages/halloween-workshop.jpg" },
      { date: "Октябрь 2026", h: "Командная работа: тренинг по продажам с командой CRT", p: "Вместе с командой CRT мы провели презентацию и тренинг по продажам проектов DND Cyprus. Сильная команда, общая цель.", img: "/azure/pages/ekip-egitimi.jpg" },
      { date: "25 сентября 2026", h: "Larnaka Gençlerbirliği в La Joya", p: "Мы принимали в La Joya юных спортсменов клуба Larnaka Gençlerbirliği, спонсором которого являемся, и желаем команде успешного сезона.", img: "/azure/pages/larnaka-genclerbirligi.jpg" },
      { date: "12 сентября 2026", h: "Friday, Fun Day: командная работа", p: "Под руководством тренера Зафера Эркоча мы провели в La Joya весёлый день обучения командной работе, коммуникации и сотрудничеству.", img: "/azure/pages/friday-fun-day.jpg" },
      { date: "Апрель 2025", h: "Премия PropertyNC 2025", p: "DND Cyprus вернулась с тремя наградами: Lagoon Verde, Mariachi Beach Club и «Лучший новичок».", img: "/property_awards_2025-747.jpg", href: "/blog/dnd-cyprus-gold-award-propertync-2025" },
      { date: "31 октября 2025", h: "Открытие La Joya", p: "La Joya с 74 квартирами завершён; открытие мы отпраздновали с владельцами, риелторами и партнёрами.", img: "/news/mhacover.webp" },
      { date: "Декабрь 2023", h: "Новогодний гала-вечер", p: "Мы встретили новый год вместе с партнёрами, агентами и представителями отрасли.", img: "/dndwhoweare.jpg", href: "/blog/dnd-cyprus-new-year-celebration-2023" },
      { date: "Лето", h: "DND Beach Party", p: "Пляжная вечеринка, которая собрала семью DND Cyprus у моря.", img: "/DND Beach Parti 24-59.jpg" },
      { date: "Каждую неделю", h: "DJ-вечера в Mariachi", p: "Музыка и живые выступления от заката до поздней ночи.", img: "/azure/dj.jpg" },
    ],
    follow: "Следите за будущими мероприятиями в Instagram",
  },
  about: {
    usa: {
      kicker: "DND Homes · США", title: <>Видение недвижимости <b>от Бостона до Кипра.</b></>,
      p: ["DND Homes основана в Бостоне в 2017 году. Компания развивает жилые проекты в районе Бостона, прежде всего в Кембридже и окрестностях, и сама ведёт весь процесс — от участка и проектирования до строительства и сдачи.", "DND Cyprus переносит опыт группы, накопленный в США, на Северный Кипр, сочетая курортную жизнь с современной жилой архитектурой, прежде всего в регионе Искеле."],
      stat: "завершённых проектов DND Homes в Массачусетсе", photos: ["15 Tyler Road, Lexington, MA", "131 Dane Hill Road, Newton, MA"], link: "Сайт DND Homes",
    },
    partner: { role: "Соучредитель и заместитель председателя совета директоров", bio: "Как соучредитель DND принимает активное участие в стратегии роста, корпоративном развитии и формировании видения бренда, уделяя особое внимание высоким стандартам качества, дизайна и клиентского опыта.", quote: "Создавать проекты, которые благодаря качеству, доверию и сильным ценностям бренда приносят долговечную ценность жизни и инвестициям людей.", dl: [["Руководство", "Стратегия · Контроль · Реализация"], ["Представительство", "Международные площадки · PropertyNC Awards"], ["Награды DND", "PropertyNC Awards 2025 · 1 платиновая · 2 золотые"]] },
    numbersUsa: "завершённых проектов в США (DND Homes)",
    numbersTitle: <>От Бостона до Искеле — <b>в цифрах.</b></>,
  },
};

const PL: PagesCopy = {
  advantage: {
    meta: { title: "Przewaga DND | Jakość budowy, życie społeczne i przywileje – DND Cyprus", description: "Standardowe wyposażenie w każdym projekcie DND Cyprus, udogodnienia w stylu resortu, wsparcie posprzedażowe i przywileje dla właścicieli w Mariachi Beach Club." },
    hero: { kicker: "Przewaga DND", title: <>Więcej niż <b>dom.</b></>, lead: "Od jakości budowy po życie społeczne, od wsparcia po odbiorze kluczy po przywileje dla właścicieli — tym wyróżnia się DND." },
    quality: { kicker: "Jakość budowy i architektura", title: "Ten sam standard w każdym projekcie", lead: "Centralne ogrzewanie i chłodzenie, generator, systemy inteligentnego domu i ogrzewanie podłogowe w łazienkach to standard w projektach DND." },
    social: { kicker: "Życie społeczne i udogodnienia", title: "Życie jak w kurorcie tuż obok", lead: "Przykłady wspólnych przestrzeni w Lagoon Verde i La Joya Perla: baseny, sport i wellness, restauracje i miejsca dla dzieci." },
    after: {
      kicker: "Obsługa posprzedażowa", title: <>Z DND Maintenance <b>także po odbiorze kluczy.</b></>,
      lead: "DND Maintenance profesjonalnie zarządza ukończonymi projektami DND, aby jakość życia i standardy projektów były zachowane przez wiele lat.",
      points: ["Profesjonalne zarządzanie częściami wspólnymi i udogodnieniami", "Koordynacja konserwacji technicznej, zieleni, sprzątania i bieżących działań", "Profesjonalne usługi wynajmu i rezerwacji dla właścicieli", "Łatwe, niezawodne i profesjonalne zarządzanie nieruchomością"],
      imageAlt: "Przekazanie kluczy w La Joya", note: "* Zakres usług może się różnić w zależności od projektu. Szczegóły uzyskasz w dziale sprzedaży.", cta: "Skontaktuj się z działem sprzedaży",
    },
    extra: {
      kicker: "Więcej przywilejów właścicieli", title: <>Przywileje DND <b>w Ülfet.</b></>,
      lead: "Wyjątkowe korzyści dla właścicieli w Ülfet — partnerze DND Cyprus w Karaoğlanoğlu (Kyrenia).",
      items: [{ h: "Ülfet Beach Club", p: "Bezpłatne wejście dla właścicieli DND Cyprus przez cały sezon letni 2026.", tag: "Bezpłatne wejście" }, { h: "Ülfet Shu", p: "10% zniżki dla właścicieli DND i gości La Joya w Ülfet Shu, meyhane (tawernie) nowej generacji.", tag: "10% zniżki" }],
      imageAlt: "Ülfet Beach Club, Karaoğlanoğlu",
    },
  },
  payment: {
    meta: { title: "Płatności i inwestycje | Płatność w lirach – DND Cyprus", description: "Do 60 miesięcy nieoprocentowanych rat w lirach w Lagoon Verde i plan „5 zer” w NeoCity: 35% wkładu, bez banku i poręczyciela. Aktualne promocje i inwestycje z DND Cyprus." },
    hero: { kicker: "Płatności i inwestycje", title: <>Pensja w lirach, <b>raty też w lirach.</b></>, lead: "Modele płatności bez banku, odsetek i ryzyka kursowego ułatwiają zakup domu." },
    faqTitle: "O modelu płatności",
    faqLead: "Odpowiedzi na najczęstsze pytania; w innych sprawach skontaktuj się z naszym zespołem.",
    campaigns: {
      kicker: "Aktualne promocje", title: <>Oferty <b>dostępne teraz.</b></>, lead: "Aktualne modele płatności opublikowane na naszej stronie i przywileje dla właścicieli.",
      items: [
        { k: "NeoCity · Nowy projekt", h: "Plan płatności „5 zer”", p: "Bez odsetek, banku, poręczyciela, dopłaty za okres i ryzyka kursowego. 35% wkładu, reszta bezpośrednio na rzecz NeoCity przez 60 miesięcy.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "Zobacz NeoCity" },
        { k: "Lagoon Verde · Ograniczona liczba apartamentów", h: "Do 60 miesięcy bez odsetek w lirach", p: "Wszystkie płatności w lirach tureckich; raty zależą od płacy minimalnej w TRCP, a nie od kursu funta.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Zobacz Lagoon Verde" },
        { k: "Tylko dla właścicieli DND", h: "Przywileje Mariachi Beach Club", p: "Bezpłatne wejście i 10% zniżki w restauracji, barze przy basenie, na leżakach i w kabanach.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Poznaj Mariachi" },
        { k: "Lagoon Verde · Przedpłata", h: "Rabat zależny od wpłaty", p: "W Lagoon Verde: 5% rabatu przy wpłacie 35%, 10% przy 50%, 17% przy 70% i 22% przy płatności w całości.", img: "/azure/lv-1.jpg", path: "/lagoon-verde", cta: "Zobacz Lagoon Verde" },
        { k: "Właściciele DND i goście La Joya · Kyrenia", h: "Ülfet Beach Club i Ülfet Shu", p: "Bezpłatne wejście do Ülfet Beach Club dla właścicieli DND przez sezon letni 2026; 10% zniżki dla właścicieli i gości La Joya w meyhane Ülfet Shu.", img: "/azure/pages/ulfet-beach.jpg", path: "/advantage", cta: "Zobacz przywileje" },
      ],
      note: "* Warunki i okresy promocji mogą się zmieniać. Rabaty za wpłatę obowiązują tylko w Lagoon Verde; aktualne informacje uzyskasz w dziale sprzedaży.",
    },
    rental: {
      kicker: "Inwestycje i dochód z najmu", title: <>Wakacje i inwestycja <b>w jednym.</b></>,
      lead: "Dzięki silnemu popytowi turystycznemu na Cyprze Północnym i ekosystemowi turystycznemu DND możesz korzystać z domu sam lub go wynajmować. DND Maintenance prowadzi promocję, rezerwacje, przyjmowanie gości i obsługę z jednego miejsca.",
      points: ["Gwarancja najmu DND w Lagoon Verde: przy pełnej płatności według cennika w ciągu 1 miesiąca i na życzenie — 12,5% rocznie", "Pierwszy dochód z najmu w 36. miesiącu, następnie wypłata 6,25% co 6 miesięcy", "Gwarantowany dochód przez 8 lat i gwarancja 100% zwrotu w 8 lat", "La Joya Resort & Residences przyjmuje rezerwacje wakacyjne"],
      imageAlt: "Wczasowicze w Lagoon Verde", note: "* Gwarancja najmu obowiązuje tylko w Lagoon Verde. Aktualne warunki i dostępne lokale uzyskasz w dziale sprzedaży.", cta: "Zapytaj o gwarancję najmu",
      statsLabel: "Dlaczego Cypr Północny?", stats: [{ n: "2,2 mln+", l: "turystów rocznie" }, { n: "+19,1%", l: "wzrost ruchu turystycznego (2023–2024)" }, { n: "300+", l: "słonecznych dni w roku" }],
      links: [{ label: "Pobyt w La Joya", href: LAJOYA }, { label: "DND Reserve", href: RESERVE }],
    },
  },
  events: {
    kicker: "Wydarzenia", title: <>Razem <b>z DND Cyprus.</b></>, lead: "Od gal nagród po świętowanie — chwile, w których rodzina DND Cyprus była razem.",
    items: [
      { date: "24–25 października 2026", h: "Halloween Workshop · Joy Cafe", p: "Halloweenowe warsztaty dla dzieci i dorosłych w Joy Cafe w La Joya: ozdabianie koszyczków, warsztaty slime, poszukiwanie skarbów, pokaz kostiumów i dyskoteka. 11:00–13:00.", img: "/azure/pages/halloween-workshop.jpg" },
      { date: "Październik 2026", h: "Praca zespołowa: szkolenie sprzedażowe z zespołem CRT", p: "Razem z zespołem CRT przeprowadziliśmy prezentację i szkolenie sprzedażowe dotyczące projektów DND Cyprus. Silny zespół, wspólny cel.", img: "/azure/pages/ekip-egitimi.jpg" },
      { date: "25 września 2026", h: "Larnaka Gençlerbirliği w La Joya", p: "Gościliśmy w La Joya młodych sportowców klubu Larnaka Gençlerbirliği, którego jesteśmy sponsorem, i życzymy drużynie udanego sezonu.", img: "/azure/pages/larnaka-genclerbirligi.jpg" },
      { date: "12 września 2026", h: "Friday, Fun Day: praca zespołowa", p: "Pod przewodnictwem trenera Zafera Erkoça spędziliśmy w La Joya pełen energii dzień szkoleniowy o pracy zespołowej, komunikacji i współpracy.", img: "/azure/pages/friday-fun-day.jpg" },
      { date: "Kwiecień 2025", h: "Nagrody PropertyNC 2025", p: "DND Cyprus wróciło z trzema nagrodami: Lagoon Verde, Mariachi Beach Club i Best Newcomer.", img: "/property_awards_2025-747.jpg", href: "/blog/dnd-cyprus-gold-award-propertync-2025" },
      { date: "31 października 2025", h: "Otwarcie La Joya", p: "La Joya została ukończona z 74 mieszkaniami; otwarcie świętowaliśmy z właścicielami, agentami nieruchomości i partnerami.", img: "/news/mhacover.webp" },
      { date: "Grudzień 2023", h: "Gala noworoczna", p: "Powitaliśmy nowy rok z partnerami biznesowymi, agentami i przedstawicielami branży.", img: "/dndwhoweare.jpg", href: "/blog/dnd-cyprus-new-year-celebration-2023" },
      { date: "Lato", h: "DND Beach Party", p: "Impreza na plaży, która zgromadziła rodzinę DND Cyprus nad morzem.", img: "/DND Beach Parti 24-59.jpg" },
      { date: "Co tydzień", h: "Wieczory DJ w Mariachi", p: "Muzyka i występy na żywo od zachodu słońca do późna.", img: "/azure/dj.jpg" },
    ],
    follow: "Śledź nas na Instagramie, aby poznać nadchodzące wydarzenia",
  },
  about: {
    usa: {
      kicker: "DND Homes · USA", title: <>Wizja nieruchomości <b>od Bostonu po Cypr.</b></>,
      p: ["DND Homes powstało w Bostonie w 2017 roku. Firma rozwija projekty mieszkaniowe w okolicach Bostonu, zwłaszcza w Cambridge i okolicy, i sama prowadzi cały proces — od działki i projektu po budowę i odbiór.", "DND Cyprus przenosi doświadczenie grupy zdobyte w USA na Cypr Północny, łącząc życie w stylu resortu z nowoczesną architekturą mieszkaniową, zwłaszcza w regionie İskele."],
      stat: "ukończonych projektów DND Homes w Massachusetts", photos: ["15 Tyler Road, Lexington, MA", "131 Dane Hill Road, Newton, MA"], link: "Strona DND Homes",
    },
    partner: { role: "Współzałożycielka i wiceprzewodnicząca zarządu", bio: "Jako współzałożycielka DND aktywnie uczestniczy w strategii rozwoju, rozwoju korporacyjnym i budowaniu wizji marki, dbając o wysokie standardy jakości, designu i obsługi klienta.", quote: "Tworzyć projekty, które dzięki jakości, zaufaniu i silnym wartościom marki dodają trwałej wartości życiu i inwestycjom ludzi.", dl: [["Przywództwo", "Strategia · Nadzór · Realizacja"], ["Reprezentacja", "Platformy międzynarodowe · PropertyNC Awards"], ["Nagrody DND", "PropertyNC Awards 2025 · 1 platynowa · 2 złote"]] },
    numbersUsa: "ukończonych projektów w USA (DND Homes)",
    numbersTitle: <>Od Bostonu po İskele, <b>w liczbach.</b></>,
  },
};

export const PAGES: Record<Locale, PagesCopy> = { tr: TR, en: EN, de: DE, ru: RU, pl: PL };
