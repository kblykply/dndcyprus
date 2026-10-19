// Yeni sayfa ve bölüm metinleri (Ekim 2026, müşterinin akış belgesi): DND Ayrıcalığı (/advantage), Ödeme ve Yatırım
// Fırsatları (/payment-plans), Etkinlikler (/press), Hakkımızda'ya DND Homes Amerika, kurucu ortak ve rakamlar.
// Satış sonrası ve kira geliri metinleri bilerek genel ve rakamsızdır (müşteriden ayrıntı bekleniyor; garanti / getiri
// vaadi yok). Kampanyalar sitede yayımlanmış ödeme modelleri ve ev sahibi ayrıcalığı; etkinlikler gerçek fotoğraflarla.
import type { ReactNode } from "react";
import type { Locale } from "./site";

type Card = { k: string; h: string; p: string; img: string; path: string; cta: string };
type Event = { date: string; h: string; p: string; img: string; href?: string };

export type PagesCopy = {
  advantage: {
    meta: { title: string; description: string };
    hero: { kicker: string; title: ReactNode; lead: string };
    quality: { kicker: string; title: string; lead: string };
    social: { kicker: string; title: string; lead: string };
    after: { kicker: string; title: ReactNode; lead: string; points: string[]; imageAlt: string; note: string; cta: string };
  };
  payment: {
    meta: { title: string; description: string };
    hero: { kicker: string; title: ReactNode; lead: string };
    faqTitle: string;
    campaigns: { kicker: string; title: ReactNode; lead: string; items: Card[]; note: string };
    rental: { kicker: string; title: ReactNode; lead: string; points: string[]; imageAlt: string; note: string; cta: string };
  };
  events: { kicker: string; title: ReactNode; lead: string; items: Event[]; follow: string };
  about: {
    usa: { kicker: string; title: ReactNode; p: string[]; stat: string; photos: string[]; link: string };
    partner: { role: string; p: string; label: string };
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
      kicker: "Satış sonrası hizmetler", title: <>Teslimden sonra da <b>yanınızdayız.</b></>,
      lead: "DND Cyprus’ta ilişki anahtar tesliminde bitmez. Evinize yerleştikten sonra da sorularınızda satış ve proje ekiplerimiz size eşlik eder.",
      points: ["Anahtar teslimi ve evinizin size tanıtılması", "Sorularınız için satış ekibimizle doğrudan iletişim", "Ortak alanlar ve sosyal tesisler hakkında bilgilendirme", "Mariachi Beach Club ayrıcalıklarına erişim"],
      imageAlt: "La Joya’da anahtar teslimi", note: "* Satış sonrası hizmetlerin kapsamı projeye göre değişebilir. Ayrıntılı bilgi için satış ekibimizle görüşün.", cta: "Satış ekibine ulaşın",
    },
  },
  payment: {
    meta: { title: "Ödeme ve Yatırım Fırsatları | TL Ödeme Modeli, Kampanyalar – DND Cyprus", description: "Lagoon Verde’de 60 aya kadar faizsiz TL taksit, NeoCity’de 5 Sıfır ödeme planı: %35 peşinat, bankasız ve kefilsiz. Güncel kampanyalar ve yatırım için DND Cyprus." },
    hero: { kicker: "Ödeme ve yatırım fırsatları", title: <>Maaşınız TL, <b>taksitiniz de TL.</b></>, lead: "Bankasız, faizsiz ve kur riskinden uzak ödeme modelleriyle ev sahibi olmak artık daha kolay." },
    faqTitle: "Ödeme modeli hakkında",
    campaigns: {
      kicker: "Güncel kampanyalar", title: <>Şimdi geçerli <b>fırsatlar.</b></>, lead: "Sitede yayımlanan güncel ödeme modelleri ve ev sahiplerine özel ayrıcalıklar.",
      items: [
        { k: "NeoCity · Yeni proje", h: "5 Sıfır ödeme planı", p: "Faiz, banka, kefil, vade farkı ve kur farkı yok. %35 peşinat, kalan tutar 60 ay vadeyle doğrudan NeoCity’ye.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "NeoCity’yi incele" },
        { k: "Lagoon Verde · Sınırlı sayıda rezidans", h: "60 aya kadar faizsiz TL taksit", p: "Tüm ödemeler Türk lirasıyla; taksitler sterlin kuruna değil KKTC asgari ücretindeki artışa göre güncellenir.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Lagoon Verde’yi incele" },
        { k: "DND ev sahiplerine özel", h: "Mariachi Beach Club ayrıcalığı", p: "Ücretsiz giriş ve restoran, havuz barı, şezlong ve cabana harcamalarında %10 indirim.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Mariachi’yi keşfet" },
      ],
      note: "* Kampanya koşulları ve süreleri değişebilir. Güncel bilgi için satış ekibimizle görüşün.",
    },
    rental: {
      kicker: "Yatırım ve kira geliri", title: <>Tatil yaşamı ve yatırım <b>bir arada.</b></>,
      lead: "Denize ve Mariachi Beach Club’a yakın, resort konseptli projelerimiz hem kendi tatiliniz hem de yatırım için düşünülebilir. Kiralama ve yatırım planınızı satış ekibimizle birlikte değerlendirin.",
      points: ["Denize yakın, resort konseptli projeler (La Joya denize 500 m, La Joya Perla 700 m)", "Havuz, spa, restoran gibi sosyal tesisler", "TL ödeme seçenekleriyle döviz riski olmadan ödeme"],
      imageAlt: "Lagoon Verde’de tatilciler", note: "* Kira geliri garanti edilmez; getiri piyasa koşullarına bağlıdır. Ayrıntılı bilgi için satış ekibimizle görüşün.", cta: "Yatırım için bilgi alın",
    },
  },
  events: {
    kicker: "Etkinlikler", title: <>DND Cyprus’la <b>bir arada.</b></>, lead: "Ödül törenlerinden kutlamalara, DND Cyprus ailesinin bir araya geldiği anlar.",
    items: [
      { date: "Nisan 2025", h: "PropertyNC 2025 Ödül Töreni", p: "DND Cyprus üç ödülle döndü: Lagoon Verde, Mariachi Beach Club ve En İyi Yeni Girişim.", img: "/property_awards_2025-747.jpg", href: "/blog/dnd-cyprus-gold-award-propertync-2025" },
      { date: "2025", h: "La Joya teslim edildi", p: "La Joya, 74 konutuyla sahiplerine teslim edildi; açılışı DND Cyprus ailesiyle kutladık.", img: "/news/mhacover.webp" },
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
    partner: { role: "Kurucu Ortak", p: "DND Cyprus’un kuruluşundan itibaren markanın gelişiminde, yaşam konseptlerinin oluşturulmasında ve Kuzey Kıbrıs’taki büyüme vizyonunda aktif rol üstleniyor.", label: "DND’nin arkasındaki isimler" },
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
      kicker: "After-sales services", title: <>Still by your side <b>after handover.</b></>,
      lead: "At DND Cyprus the relationship does not end with the keys. Our sales and project teams stay with you for your questions after you move in.",
      points: ["Key handover and an introduction to your home", "Direct contact with our sales team for your questions", "Guidance on shared areas and social facilities", "Access to Mariachi Beach Club privileges"],
      imageAlt: "Key handover at La Joya", note: "* The scope of after-sales services may vary by project. Please contact our sales team for details.", cta: "Contact the sales team",
    },
  },
  payment: {
    meta: { title: "Payment & Investment Opportunities | Lira Payment Model – DND Cyprus", description: "Up to 60 months of interest-free lira instalments at Lagoon Verde and the 5 Zeros plan at NeoCity: 35% down, no bank, no guarantor. Current campaigns and investment with DND Cyprus." },
    hero: { kicker: "Payment & investment opportunities", title: <>Your salary in lira, <b>your instalments too.</b></>, lead: "Payment models with no bank, no interest and no currency risk make owning a home easier." },
    faqTitle: "About the payment model",
    campaigns: {
      kicker: "Current campaigns", title: <>Offers <b>available now.</b></>, lead: "The current payment models published on our site and privileges reserved for homeowners.",
      items: [
        { k: "NeoCity · New project", h: "5 Zeros payment plan", p: "No interest, bank, guarantor, maturity charge or exchange-rate risk. 35% down, the rest paid directly to NeoCity over 60 months.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "Explore NeoCity" },
        { k: "Lagoon Verde · Limited residences", h: "Up to 60 months interest-free in lira", p: "All payments in Turkish lira; instalments follow the TRNC minimum wage, not the sterling rate.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Explore Lagoon Verde" },
        { k: "Exclusive to DND homeowners", h: "Mariachi Beach Club privileges", p: "Free entry and 10% off at the restaurant, pool bar, sunbeds and cabanas.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Discover Mariachi" },
      ],
      note: "* Campaign terms and durations may change. Please contact our sales team for current information.",
    },
    rental: {
      kicker: "Investment & rental income", title: <>Holiday living and investment <b>together.</b></>,
      lead: "Our resort-style projects close to the sea and Mariachi Beach Club suit both your own holidays and investment. Plan rentals and investment together with our sales team.",
      points: ["Resort-style projects close to the sea (La Joya 500 m, La Joya Perla 700 m)", "Social facilities such as pools, spa and restaurants", "Lira payment options with no currency risk"],
      imageAlt: "Holiday guests at Lagoon Verde", note: "* Rental income is not guaranteed; returns depend on market conditions. Please contact our sales team for details.", cta: "Ask about investing",
    },
  },
  events: {
    kicker: "Events", title: <>Together with <b>DND Cyprus.</b></>, lead: "From award ceremonies to celebrations — moments when the DND Cyprus family came together.",
    items: [
      { date: "April 2025", h: "PropertyNC 2025 Awards", p: "DND Cyprus came home with three awards: Lagoon Verde, Mariachi Beach Club and Best Newcomer.", img: "/property_awards_2025-747.jpg" },
      { date: "2025", h: "La Joya handed over", p: "La Joya and its 74 homes were handed over to their owners; we celebrated with the DND Cyprus family.", img: "/news/mhacover.webp" },
      { date: "December 2023", h: "New Year Gala", p: "We welcomed the new year with business partners, agents and industry stakeholders.", img: "/dndwhoweare.jpg" },
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
    partner: { role: "Co-founder", p: "Since the founding of DND Cyprus she has played an active role in developing the brand, shaping its living concepts and its growth vision in North Cyprus.", label: "The people behind DND" },
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
      kicker: "Kundendienst nach dem Kauf", title: <>Auch nach der Übergabe <b>an Ihrer Seite.</b></>,
      lead: "Bei DND Cyprus endet die Beziehung nicht mit der Schlüsselübergabe. Unsere Vertriebs- und Projektteams begleiten Sie auch nach dem Einzug bei Ihren Fragen.",
      points: ["Schlüsselübergabe und Einweisung in Ihr Zuhause", "Direkter Kontakt zu unserem Vertriebsteam bei Fragen", "Informationen zu Gemeinschaftsbereichen und Einrichtungen", "Zugang zu den Vorteilen im Mariachi Beach Club"],
      imageAlt: "Schlüsselübergabe in La Joya", note: "* Der Umfang des Kundendienstes kann je nach Projekt variieren. Details erhalten Sie von unserem Vertriebsteam.", cta: "Vertriebsteam kontaktieren",
    },
  },
  payment: {
    meta: { title: "Zahlung & Investition | Lira-Zahlungsmodell – DND Cyprus", description: "Bis zu 60 Monate zinsfreie Lira-Raten bei Lagoon Verde und der 5-Null-Plan bei NeoCity: 35 % Anzahlung, ohne Bank, ohne Bürgen. Aktuelle Aktionen und Investition mit DND Cyprus." },
    hero: { kicker: "Zahlung & Investition", title: <>Gehalt in Lira, <b>Raten auch in Lira.</b></>, lead: "Zahlungsmodelle ohne Bank, ohne Zinsen und ohne Währungsrisiko machen den Hauskauf leichter." },
    faqTitle: "Zum Zahlungsmodell",
    campaigns: {
      kicker: "Aktuelle Aktionen", title: <>Jetzt <b>verfügbare Angebote.</b></>, lead: "Die auf unserer Website veröffentlichten Zahlungsmodelle und exklusive Vorteile für Eigentümer.",
      items: [
        { k: "NeoCity · Neues Projekt", h: "5-Null-Zahlungsplan", p: "Keine Zinsen, keine Bank, kein Bürge, kein Laufzeitaufschlag, kein Kursrisiko. 35 % Anzahlung, der Rest über 60 Monate direkt an NeoCity.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "NeoCity ansehen" },
        { k: "Lagoon Verde · Begrenzte Residenzen", h: "Bis zu 60 Monate zinsfrei in Lira", p: "Alle Zahlungen in Türkischer Lira; die Raten folgen dem Mindestlohn der TRNZ, nicht dem Pfundkurs.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Lagoon Verde ansehen" },
        { k: "Exklusiv für DND-Eigentümer", h: "Vorteile im Mariachi Beach Club", p: "Freier Eintritt und 10 % Rabatt in Restaurant, Poolbar, auf Liegen und Cabanas.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Mariachi entdecken" },
      ],
      note: "* Bedingungen und Laufzeiten der Aktionen können sich ändern. Aktuelle Informationen erhalten Sie von unserem Vertriebsteam.",
    },
    rental: {
      kicker: "Investition & Mieteinnahmen", title: <>Urlaubsleben und Investition <b>vereint.</b></>,
      lead: "Unsere Resort-Projekte nahe am Meer und am Mariachi Beach Club eignen sich für den eigenen Urlaub wie als Investition. Planen Sie Vermietung und Investition gemeinsam mit unserem Vertriebsteam.",
      points: ["Resort-Projekte nahe am Meer (La Joya 500 m, La Joya Perla 700 m)", "Einrichtungen wie Pools, Spa und Restaurants", "Lira-Zahlungsoptionen ohne Währungsrisiko"],
      imageAlt: "Urlaubsgäste in Lagoon Verde", note: "* Mieteinnahmen sind nicht garantiert; Renditen hängen von den Marktbedingungen ab. Details erhalten Sie von unserem Vertriebsteam.", cta: "Zur Investition beraten lassen",
    },
  },
  events: {
    kicker: "Veranstaltungen", title: <>Gemeinsam mit <b>DND Cyprus.</b></>, lead: "Von Preisverleihungen bis zu Feiern – Momente, in denen die DND-Cyprus-Familie zusammenkam.",
    items: [
      { date: "April 2025", h: "PropertyNC 2025 Awards", p: "DND Cyprus kehrte mit drei Auszeichnungen zurück: Lagoon Verde, Mariachi Beach Club und Best Newcomer.", img: "/property_awards_2025-747.jpg" },
      { date: "2025", h: "La Joya übergeben", p: "La Joya wurde mit 74 Wohnungen an die Eigentümer übergeben; wir feierten mit der DND-Cyprus-Familie.", img: "/news/mhacover.webp" },
      { date: "Dezember 2023", h: "Neujahrsgala", p: "Mit Geschäftspartnern, Maklern und Branchenvertretern haben wir das neue Jahr begrüßt.", img: "/dndwhoweare.jpg" },
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
    partner: { role: "Mitgründerin", p: "Seit der Gründung von DND Cyprus wirkt sie aktiv an der Entwicklung der Marke, der Gestaltung der Wohnkonzepte und der Wachstumsvision in Nordzypern mit.", label: "Die Menschen hinter DND" },
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
      kicker: "Послепродажный сервис", title: <>Рядом с вами <b>и после передачи ключей.</b></>,
      lead: "В DND Cyprus отношения не заканчиваются передачей ключей. Наши команды продаж и проектов помогут вам с вопросами и после заселения.",
      points: ["Передача ключей и знакомство с вашим домом", "Прямая связь с отделом продаж по вашим вопросам", "Информация об общих зонах и инфраструктуре", "Доступ к привилегиям Mariachi Beach Club"],
      imageAlt: "Передача ключей в La Joya", note: "* Объём послепродажного сервиса может зависеть от проекта. Подробности уточняйте у отдела продаж.", cta: "Связаться с отделом продаж",
    },
  },
  payment: {
    meta: { title: "Оплата и инвестиции | Оплата в лирах – DND Cyprus", description: "До 60 месяцев беспроцентной рассрочки в лирах в Lagoon Verde и план «5 нулей» в NeoCity: взнос 35 %, без банка и поручителя. Актуальные акции и инвестиции с DND Cyprus." },
    hero: { kicker: "Оплата и инвестиции", title: <>Зарплата в лирах — <b>и взносы в лирах.</b></>, lead: "Модели оплаты без банка, процентов и валютного риска упрощают покупку дома." },
    faqTitle: "О модели оплаты",
    campaigns: {
      kicker: "Актуальные акции", title: <>Предложения, <b>доступные сейчас.</b></>, lead: "Актуальные модели оплаты, опубликованные на сайте, и привилегии для владельцев.",
      items: [
        { k: "NeoCity · Новый проект", h: "План оплаты «5 нулей»", p: "Без процентов, банка, поручителя, надбавки за срок и курсового риска. Взнос 35 %, остаток — напрямую NeoCity в течение 60 месяцев.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "Смотреть NeoCity" },
        { k: "Lagoon Verde · Ограниченное число резиденций", h: "До 60 месяцев без процентов в лирах", p: "Все платежи в турецких лирах; взносы привязаны к минимальной зарплате ТРСК, а не к курсу фунта.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Смотреть Lagoon Verde" },
        { k: "Только для владельцев DND", h: "Привилегии Mariachi Beach Club", p: "Бесплатный вход и скидка 10 % в ресторане, баре у бассейна, на шезлонгах и в кабанах.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Узнать о Mariachi" },
      ],
      note: "* Условия и сроки акций могут меняться. Актуальную информацию уточняйте у отдела продаж.",
    },
    rental: {
      kicker: "Инвестиции и арендный доход", title: <>Отдых и инвестиции <b>вместе.</b></>,
      lead: "Наши курортные проекты рядом с морем и Mariachi Beach Club подходят и для собственного отдыха, и для инвестиций. Планируйте аренду и инвестиции вместе с отделом продаж.",
      points: ["Курортные проекты рядом с морем (La Joya — 500 m, La Joya Perla — 700 m)", "Инфраструктура: бассейны, спа, рестораны", "Оплата в лирах без валютного риска"],
      imageAlt: "Отдыхающие в Lagoon Verde", note: "* Арендный доход не гарантируется; доходность зависит от рыночных условий. Подробности уточняйте у отдела продаж.", cta: "Узнать об инвестициях",
    },
  },
  events: {
    kicker: "Мероприятия", title: <>Вместе <b>с DND Cyprus.</b></>, lead: "От церемоний награждения до праздников — моменты, когда семья DND Cyprus собиралась вместе.",
    items: [
      { date: "Апрель 2025", h: "Премия PropertyNC 2025", p: "DND Cyprus вернулась с тремя наградами: Lagoon Verde, Mariachi Beach Club и «Лучший новичок».", img: "/property_awards_2025-747.jpg" },
      { date: "2025", h: "La Joya сдан", p: "La Joya с 74 квартирами передан владельцам; мы отпраздновали это вместе с семьёй DND Cyprus.", img: "/news/mhacover.webp" },
      { date: "Декабрь 2023", h: "Новогодний гала-вечер", p: "Мы встретили новый год вместе с партнёрами, агентами и представителями отрасли.", img: "/dndwhoweare.jpg" },
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
    partner: { role: "Соучредитель", p: "С момента основания DND Cyprus принимает активное участие в развитии бренда, создании жилых концепций и в стратегии роста на Северном Кипре.", label: "Люди, стоящие за DND" },
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
      kicker: "Obsługa posprzedażowa", title: <>Z Tobą także <b>po odbiorze kluczy.</b></>,
      lead: "W DND Cyprus relacja nie kończy się na przekazaniu kluczy. Nasze zespoły sprzedaży i projektów pomagają w Twoich sprawach również po przeprowadzce.",
      points: ["Przekazanie kluczy i zapoznanie z Twoim domem", "Bezpośredni kontakt z działem sprzedaży w razie pytań", "Informacje o częściach wspólnych i udogodnieniach", "Dostęp do przywilejów Mariachi Beach Club"],
      imageAlt: "Przekazanie kluczy w La Joya", note: "* Zakres obsługi posprzedażowej może się różnić w zależności od projektu. Szczegóły uzyskasz w dziale sprzedaży.", cta: "Skontaktuj się z działem sprzedaży",
    },
  },
  payment: {
    meta: { title: "Płatności i inwestycje | Płatność w lirach – DND Cyprus", description: "Do 60 miesięcy nieoprocentowanych rat w lirach w Lagoon Verde i plan „5 zer” w NeoCity: 35% wkładu, bez banku i poręczyciela. Aktualne promocje i inwestycje z DND Cyprus." },
    hero: { kicker: "Płatności i inwestycje", title: <>Pensja w lirach, <b>raty też w lirach.</b></>, lead: "Modele płatności bez banku, odsetek i ryzyka kursowego ułatwiają zakup domu." },
    faqTitle: "O modelu płatności",
    campaigns: {
      kicker: "Aktualne promocje", title: <>Oferty <b>dostępne teraz.</b></>, lead: "Aktualne modele płatności opublikowane na naszej stronie i przywileje dla właścicieli.",
      items: [
        { k: "NeoCity · Nowy projekt", h: "Plan płatności „5 zer”", p: "Bez odsetek, banku, poręczyciela, dopłaty za okres i ryzyka kursowego. 35% wkładu, reszta bezpośrednio na rzecz NeoCity przez 60 miesięcy.", img: "/neocity/g-01.jpg", path: "/neocity", cta: "Zobacz NeoCity" },
        { k: "Lagoon Verde · Ograniczona liczba apartamentów", h: "Do 60 miesięcy bez odsetek w lirach", p: "Wszystkie płatności w lirach tureckich; raty zależą od płacy minimalnej w TRCP, a nie od kursu funta.", img: "/azure/lv-7.jpg", path: "/lagoon-verde", cta: "Zobacz Lagoon Verde" },
        { k: "Tylko dla właścicieli DND", h: "Przywileje Mariachi Beach Club", p: "Bezpłatne wejście i 10% zniżki w restauracji, barze przy basenie, na leżakach i w kabanach.", img: "/azure/mb-1.jpg", path: "/mariachi", cta: "Poznaj Mariachi" },
      ],
      note: "* Warunki i okresy promocji mogą się zmieniać. Aktualne informacje uzyskasz w dziale sprzedaży.",
    },
    rental: {
      kicker: "Inwestycje i dochód z najmu", title: <>Wakacje i inwestycja <b>w jednym.</b></>,
      lead: "Nasze projekty w stylu resortu, blisko morza i Mariachi Beach Club, sprawdzą się zarówno na własne wakacje, jak i jako inwestycja. Zaplanuj najem i inwestycję razem z naszym działem sprzedaży.",
      points: ["Projekty w stylu resortu blisko morza (La Joya 500 m, La Joya Perla 700 m)", "Udogodnienia: baseny, spa, restauracje", "Płatność w lirach bez ryzyka kursowego"],
      imageAlt: "Wczasowicze w Lagoon Verde", note: "* Dochód z najmu nie jest gwarantowany; zwrot zależy od warunków rynkowych. Szczegóły uzyskasz w dziale sprzedaży.", cta: "Zapytaj o inwestycję",
    },
  },
  events: {
    kicker: "Wydarzenia", title: <>Razem <b>z DND Cyprus.</b></>, lead: "Od gal nagród po świętowanie — chwile, w których rodzina DND Cyprus była razem.",
    items: [
      { date: "Kwiecień 2025", h: "Nagrody PropertyNC 2025", p: "DND Cyprus wróciło z trzema nagrodami: Lagoon Verde, Mariachi Beach Club i Best Newcomer.", img: "/property_awards_2025-747.jpg" },
      { date: "2025", h: "La Joya oddana", p: "La Joya z 74 mieszkaniami została przekazana właścicielom; świętowaliśmy z rodziną DND Cyprus.", img: "/news/mhacover.webp" },
      { date: "Grudzień 2023", h: "Gala noworoczna", p: "Powitaliśmy nowy rok z partnerami biznesowymi, agentami i przedstawicielami branży.", img: "/dndwhoweare.jpg" },
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
    partner: { role: "Współzałożycielka", p: "Od założenia DND Cyprus aktywnie uczestniczy w rozwoju marki, tworzeniu koncepcji życia i wizji rozwoju na Cyprze Północnym.", label: "Ludzie stojący za DND" },
    numbersUsa: "ukończonych projektów w USA (DND Homes)",
    numbersTitle: <>Od Bostonu po İskele, <b>w liczbach.</b></>,
  },
};

export const PAGES: Record<Locale, PagesCopy> = { tr: TR, en: EN, de: DE, ru: RU, pl: PL };
