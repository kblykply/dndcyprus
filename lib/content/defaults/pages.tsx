// lib/content/defaults/pages.tsx
// OTOMATİK ÇIKARILDI (26.11.2026): sayfa dosyalarındaki içerik propları (PageHero, ContactCard…) ve Hakkımızda/İletişim
// bileşenlerinin dil kopyalarındaki varsayılan metinler. Sitede bu değerler gösterilir; panelde değiştirilen alanlar üstüne yazılır.

const TR = {
  hakkimizda: {
    hero: {
      kicker: "Hakkımızda",
      title: <>DND <b>Cyprus</b></>,
      lead: "Yenilikçi vizyonumuz, köklü tecrübemiz ve kaliteli inşaat anlayışımız ile Kıbrıs’ın geleceğini inşa ediyoruz.",
      image: "/azure/about-uu.jpg",
      imageAlt: "DND Cyprus",
    },
    kim: {
      images: {
        main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
        sideTop: "/dndwhoweare.jpg",
        sideBottom: "/dndtoplu.jpg",
      },
      videoTitle: "DND Cyprus Tanıtım",
      kicker: "Hakkımızda",
      youtubeId: "jxjWP9L0SwQ",
      poster: "/DND Beach Parti 24-59.jpg",
    },
    dndHomes: {
      kicker: "ABD'de doğdu, Kuzey Kıbrıs’ta yaşıyor",
      videoTitle: "DND Homes Tanıtım Videosu",
      heading: "DND Homes — Kıbrıs Vizyonu",
      description: "Projelerimizi ve yaşam konseptimizi keşfedin.",
      videoId: "4oSQ67UeyXQ",
      poster: "/homesthumb.webp",
    },
    misyon: {
      kicker: "DND Cyprus",
      title: <>Misyon, Vizyon <b>&amp; Değerler</b></>,
      missionTitle: "Misyonumuz",
      missionText: "Estetik mimariyi, mühendislik disiplinini ve sürdürülebilir çözümleri birleştirerek Kuzey Kıbrıs’ta yaşam kalitesini yükselten projeler geliştirmek; şeffaflık, güvenlik ve zamanında teslim prensipleriyle değer üretmek.",
      visionTitle: "Vizyonumuz",
      visionText: "Kuzey Kıbrıs’ta yenilikçi gayrimenkul geliştirme alanında referans marka olmak; kalite, müşteri memnuniyeti ve çevresel duyarlılık konularında sektöre yön vermek.",
      valuesTitle: "Değerlerimiz",
      values: [
        "Dürüstlük & Şeffaflık",
        "Kalite Odaklılık",
        "Güvenlik Kültürü (HSE)",
        "Sürdürülebilirlik",
        "Müşteri Memnuniyeti",
        "Zamanında Teslim",
        "İşbirliği & Güvenilir Tedarik",
      ],
    },
    neden: {
      kicker: "DND Cyprus",
      title: <>Neden Bizi <b>Tercih Etmelisiniz?</b></>,
      subtitle: "Güvenilir, yenilikçi ve sürdürülebilir yaklaşımımızla fark yaratıyoruz.",
      strengths: [
        {
          title: "Kalite Garantisi",
          description: "ISO sertifikalı süreçlerle her projemizde yüksek kalite standartları sunuyoruz.",
          accent: "teal",
        },
        {
          title: "Zamanında Teslim",
          description: "Projelerimizi planlanan tarihlerde, güvenilir ve şeffaf şekilde tamamlıyoruz.",
          accent: "orange",
        },
        {
          title: "Sürdürülebilirlik",
          description: "Enerji verimli, çevre dostu malzemeler ve yeşil çözümler önceliğimizdir.",
          accent: "teal",
        },
        {
          title: "Müşteri Memnuniyeti",
          description: "Şeffaf iletişim ve satış sonrası destekle uzun vadeli güven ilişkisi kuruyoruz.",
          accent: "orange",
        },
      ],
    },
    cagri: {
      title: <>Birlikte Geleceği <b>İnşa Edelim</b></>,
      subtitle: "Projeleriniz için güvenilir ve yenilikçi bir çözüm ortağı arıyorsanız, bizimle iletişime geçin.",
      buttonLabel: "İletişime Geçin",
      bgSrc: "/azure/contact-sea.webp",
      bgAlt: "",
    },
  },
  iletisim: {
    hero: {
      kicker: "İletişim",
      title: <>Bize <b>ulaşın</b></>,
      lead: "Projelerimiz ve yatırım fırsatları hakkında daha fazla bilgi almak için bizimle iletişime geçin.",
      image: "/azure/contact/iletisim-banner.jpg",
      imageAlt: "Deniz manzaralı masada ev anahtarları, kat planı ve kahve",
      ctas: [{ label: "Mesaj Gönder", href: "#form" }, { label: "Projelerimiz", href: "/tr/projects", variant: "ghost" }],
    },
    bilgi: {
      kicker: "DND Cyprus",
      title: <>İletişim <b>Bilgileri</b></>,
      subtitle: "Tüm sorularınız için bize ulaşın. En kısa sürede dönüş yaparız.",
      offices: [
        {
          id: "hq",
          label: "DND Cyprus Merkez Ofis",
          addressLines: ["Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Gazimağusa, Kıbrıs, 99450"],
          city: "Gazimağusa",
          country: "Kuzey Kıbrıs",
          phone: "+90 392 444 03 63",
          phoneDisplay: "+90 392 444 03 63",
          email: "mailto:info@dndcyprus.com",
          hours: ["Hafta içi 08:30–17:30 , Cumartesi 8:30–13:00 "],
          mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
          whatsapp: "https://wa.me/905488390363",
          image: "/dndofis.JPG",
          imageAlt: "DND Cyprus Merkez Ofis",
          coords: [35.1310, 33.9193],
          mapImage: "/maps/ofis-gazimagusa.webp",
        },
      ],
    },
    form: {
      title: <>Hadi hayallerinizi birlikte <b>hayata geçirelim</b></>,
      lead: "DND Cyprus ekibi, yatırımlarınız için size destek olmaya hazır. Mesajınızı bırakın, en kısa sürede dönüş yapalım.",
    },
  },
  projelerSayfasi: {
    hero: {
      kicker: "Projeler",
      title: <>Altı adres, <b>tek standart.</b></>,
      lead: "NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II ve Mariachi Beach Club: DND Cyprus projelerini tek yerde karşılaştırın.",
      image: "/azure/lv-7.jpg",
      imageAlt: "DND Cyprus",
      chips: [{ big: "6", label: "Proje" }, { big: "2", label: "Ödül · 2025" }],
    },
    form: {
      kicker: "DND Cyprus",
      title: <>Projelerimiz hakkında <b>daha fazla bilgi alın.</b></>,
      lead: "Devam eden veya yakında başlayacak projelerimizle ilgileniyorsanız, satış ekibimiz size detaylı bilgi ve fırsatlar sunmaktan memnuniyet duyar.",
    },
  },
  ekipSayfasi: {
    hero: {
      title: <>Ekibimiz</>,
      lead: "Her projemizin yükselişinde, ekibimizin profesyonelliği en sağlam yapı taşıdır.",
      image: "/property_awards_2025-747.jpg",
    },
  },
  haberler: {
    hero: {
      kicker: "Basında DND Cyprus",
      title: <>Haberler</>,
      lead: "DND’den haberler, basında DND ve etkinlikler.",
      image: "/dndwhoweare.jpg",
    },
  },
  ayricalik: {
    hero: {
      image: "/azure/lv-1.jpg",
      imageAlt: "DND Cyprus",
    },
  },
  odeme: {
    hero: {
      image: "/neocity/g-05.jpg",
      imageAlt: "DND Cyprus",
    },
  },
};

const EN = {
  hakkimizda: {
    hero: {
      kicker: "About Us",
      title: <>DND <b>Cyprus</b></>,
      lead: "With our innovative vision, deep-rooted experience, and commitment to quality construction, we are building the future of Cyprus.",
      image: "/azure/about-uu.jpg",
      imageAlt: "DND Cyprus",
    },
    kim: {
      images: {
        main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
        sideTop: "/dndwhoweare.jpg",
        sideBottom: "/dndtoplu.jpg",
      },
      videoTitle: "DND Cyprus Introduction",
      kicker: "About Us",
      youtubeId: "jxjWP9L0SwQ",
      poster: "/DND Beach Parti 24-59.jpg",
    },
    dndHomes: {
      kicker: "Born in the USA, living in North Cyprus",
      videoTitle: "DND Homes Introduction Video",
      heading: "DND Homes — Cyprus Vision",
      description: "Discover our projects and living concept.",
      videoId: "4oSQ67UeyXQ",
      poster: "/homesthumb.webp",
    },
    misyon: {
      kicker: "DND Cyprus",
      title: <>Mission, Vision <b>&amp; Values</b></>,
      missionTitle: "Our Mission",
      missionText: "To develop projects that enhance the quality of life in North Cyprus by combining aesthetic architecture, engineering discipline, and sustainable solutions; and to create value through the principles of transparency, safety, and on-time delivery.",
      visionTitle: "Our Vision",
      visionText: "To become a reference brand in innovative real estate development in North Cyprus and to lead the sector in quality, customer satisfaction, and environmental responsibility.",
      valuesTitle: "Our Values",
      values: [
        "Integrity & Transparency",
        "Quality Focus",
        "Safety Culture (HSE)",
        "Sustainability",
        "Customer Satisfaction",
        "On-Time Delivery",
        "Collaboration & Reliable Supply",
      ],
    },
    neden: {
      kicker: "DND Cyprus",
      title: <>Why <b>Choose Us?</b></>,
      subtitle: "We stand out with our reliable, innovative, and sustainable approach.",
      strengths: [
        {
          title: "Quality Assurance",
          description: "We deliver high quality standards in every project through ISO-certified processes.",
          accent: "teal",
        },
        {
          title: "On-Time Delivery",
          description: "We complete our projects on the planned dates in a reliable and transparent manner.",
          accent: "orange",
        },
        {
          title: "Sustainability",
          description: "Energy-efficient, environmentally friendly materials and green solutions are our priority.",
          accent: "teal",
        },
        {
          title: "Customer Satisfaction",
          description: "With transparent communication and after-sales support, we build long-term relationships of trust.",
          accent: "orange",
        },
      ],
    },
    cagri: {
      title: <>Let’s Build the Future <b>Together</b></>,
      subtitle: "If you are looking for a reliable and innovative solution partner for your projects, get in touch with us.",
      buttonLabel: "Contact Us",
      bgSrc: "/azure/contact-sea.webp",
      bgAlt: "",
    },
  },
  iletisim: {
    hero: {
      kicker: "Contact",
      title: <>Get in <b>touch</b></>,
      lead: "Contact us to learn more about our projects and investment opportunities.",
      image: "/azure/contact/iletisim-banner.jpg",
      imageAlt: "House keys, a floor plan and coffee on a table overlooking the sea",
      ctas: [{ label: "Send Message", href: "#form" }, { label: "Our Projects", href: "/en/projects", variant: "ghost" }],
    },
    bilgi: {
      kicker: "DND Cyprus",
      title: <>Contact <b>Information</b></>,
      subtitle: "Reach out to us with any questions. We’ll get back to you as soon as possible.",
      offices: [
        {
          id: "hq",
          label: "DND Cyprus Head Office",
          addressLines: [
            "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450",
          ],
          city: "Famagusta",
          country: "North Cyprus",
          phone: "+90 392 444 03 63",
          phoneDisplay: "+90 392 444 03 63",
          email: "mailto:info@dndcyprus.com",
          hours: ["Weekdays 08:30–17:30, Saturday 08:30–13:00"],
          mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
          whatsapp: "https://wa.me/905488390363",
          image: "/dndofis.JPG",
          imageAlt: "DND Cyprus Head Office",
          coords: [35.1310, 33.9193],
          mapImage: "/maps/ofis-gazimagusa.webp",
        },
      ],
    },
    form: {
      title: <>Let’s bring your dreams <b>to life together</b></>,
      lead: "The DND Cyprus team is ready to support your investment. Leave a message and we will get back to you shortly.",
    },
  },
  projelerSayfasi: {
    hero: {
      kicker: "Projects",
      title: <>Six addresses, <b>one standard.</b></>,
      lead: "NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II and Mariachi Beach Club: compare all DND Cyprus projects in one place.",
      image: "/azure/lv-7.jpg",
      imageAlt: "DND Cyprus",
      chips: [{ big: "6", label: "Projects" }, { big: "2", label: "Awards · 2025" }],
    },
    form: {
      kicker: "DND Cyprus",
      title: <>Learn more <b>about our projects.</b></>,
      lead: "If you are interested in our ongoing or upcoming projects, our sales team will be glad to share detailed information and opportunities.",
    },
  },
  ekipSayfasi: {
    hero: {
      title: <>Our Team</>,
      lead: "Behind the rise of every project, our team’s professionalism is our strongest foundation.",
      image: "/property_awards_2025-747.jpg",
    },
  },
  haberler: {
    hero: {
      kicker: "DND Cyprus in the press",
      title: <>News</>,
      lead: "News from DND, DND in the press and events.",
      image: "/dndwhoweare.jpg",
    },
  },
  ayricalik: {
    hero: {
      image: "/azure/lv-1.jpg",
      imageAlt: "DND Cyprus",
    },
  },
  odeme: {
    hero: {
      image: "/neocity/g-05.jpg",
      imageAlt: "DND Cyprus",
    },
  },
};

const DE = {
  hakkimizda: {
    hero: {
      kicker: "Über uns",
      title: <>DND <b>Cyprus</b></>,
      lead: "Mit innovativer Vision, langjähriger Erfahrung und dem Anspruch an hochwertige Bauqualität gestalten wir die Zukunft Zyperns.",
      image: "/azure/about-uu.jpg",
      imageAlt: "DND Cyprus",
    },
    kim: {
      images: {
        main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
        sideTop: "/dndwhoweare.jpg",
        sideBottom: "/dndtoplu.jpg",
      },
      videoTitle: "Vorstellung von DND Cyprus",
      kicker: "Über uns",
      youtubeId: "jxjWP9L0SwQ",
      poster: "/DND Beach Parti 24-59.jpg",
    },
    dndHomes: {
      kicker: "In den USA gegründet, in Nordzypern zu Hause",
      videoTitle: "Vorstellungsvideo von DND Homes",
      heading: "DND Homes – Vision für Zypern",
      description: "Entdecken Sie unsere Projekte und unser Wohnkonzept.",
      videoId: "4oSQ67UeyXQ",
      poster: "/homesthumb.webp",
    },
    misyon: {
      kicker: "DND Cyprus",
      title: <>Mission, Vision <b>&amp; Werte</b></>,
      missionTitle: "Unsere Mission",
      missionText: "Wir entwickeln Projekte, die die Lebensqualität in Nordzypern steigern – mit ästhetischer Architektur, ingenieurtechnischer Präzision und nachhaltigen Lösungen. Dabei schaffen wir Werte durch Transparenz, Sicherheit und termingerechte Übergabe.",
      visionTitle: "Unsere Vision",
      visionText: "Wir wollen zur Referenzmarke für innovative Immobilienentwicklung in Nordzypern werden und die Branche in Qualität, Kundenzufriedenheit und ökologischer Verantwortung anführen.",
      valuesTitle: "Unsere Werte",
      values: [
        "Integrität & Transparenz",
        "Qualitätsanspruch",
        "Sicherheitskultur (HSE)",
        "Nachhaltigkeit",
        "Kundenzufriedenheit",
        "Termingerechte Übergabe",
        "Partnerschaft & verlässliche Lieferketten",
      ],
    },
    neden: {
      kicker: "DND Cyprus",
      title: <>Warum <b>DND Cyprus?</b></>,
      subtitle: "Uns zeichnet ein verlässlicher, innovativer und nachhaltiger Ansatz aus.",
      strengths: [
        {
          title: "Qualitätssicherung",
          description: "Mit ISO-zertifizierten Prozessen sichern wir in jedem Projekt hohe Qualitätsstandards.",
          accent: "teal",
        },
        {
          title: "Termingerechte Übergabe",
          description: "Wir stellen unsere Projekte verlässlich, transparent und zu den geplanten Terminen fertig.",
          accent: "orange",
        },
        {
          title: "Nachhaltigkeit",
          description: "Energieeffiziente, umweltfreundliche Materialien und grüne Lösungen haben für uns Priorität.",
          accent: "teal",
        },
        {
          title: "Kundenzufriedenheit",
          description: "Mit offener Kommunikation und After-Sales-Betreuung bauen wir langfristige Vertrauensbeziehungen auf.",
          accent: "orange",
        },
      ],
    },
    cagri: {
      title: <>Gestalten wir die Zukunft <b>gemeinsam</b></>,
      subtitle: "Sie suchen einen verlässlichen und innovativen Partner für Ihre Projekte? Nehmen Sie Kontakt mit uns auf.",
      buttonLabel: "Kontakt aufnehmen",
      bgSrc: "/azure/contact-sea.webp",
      bgAlt: "",
    },
  },
  iletisim: {
    hero: {
      kicker: "Kontakt",
      title: <>Nehmen Sie <b>Kontakt auf</b></>,
      lead: "Kontaktieren Sie uns, um mehr über unsere Projekte und Investitionsmöglichkeiten zu erfahren.",
      image: "/azure/contact/iletisim-banner.jpg",
      imageAlt: "Hausschlüssel, Grundriss und Kaffee auf einem Tisch mit Meerblick",
      ctas: [{ label: "Nachricht senden", href: "#form" }, { label: "Unsere Projekte", href: "/de/projects", variant: "ghost" }],
    },
    bilgi: {
      kicker: "DND Cyprus",
      title: <>Unsere <b>Kontaktdaten</b></>,
      subtitle: "Sie haben Fragen? Schreiben Sie uns – wir melden uns so schnell wie möglich bei Ihnen.",
      offices: [
        {
          id: "hq",
          label: "Hauptsitz DND Cyprus",
          addressLines: [
            "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450",
          ],
          city: "Famagusta",
          country: "Nordzypern",
          phone: "+90 392 444 03 63",
          phoneDisplay: "+90 392 444 03 63",
          email: "mailto:info@dndcyprus.com",
          hours: ["Wochentags 08:30–17:30, Samstag 08:30–13:00"],
          mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
          whatsapp: "https://wa.me/905488390363",
          image: "/dndofis.JPG",
          imageAlt: "Hauptsitz DND Cyprus",
          coords: [35.1310, 33.9193],
          mapImage: "/maps/ofis-gazimagusa.webp",
        },
      ],
    },
    form: {
      title: <>Verwirklichen wir Ihre Träume <b>gemeinsam</b></>,
      lead: "Das Team von DND Cyprus begleitet Sie bei Ihrer Investition. Hinterlassen Sie uns eine Nachricht – wir melden uns in Kürze bei Ihnen.",
    },
  },
  projelerSayfasi: {
    hero: {
      kicker: "Projekte",
      title: <>Sechs Adressen, <b>ein Standard.</b></>,
      lead: "NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II und Mariachi Beach Club: Vergleichen Sie alle Projekte von DND Cyprus an einem Ort.",
      image: "/azure/lv-7.jpg",
      imageAlt: "DND Cyprus",
      chips: [{ big: "6", label: "Projekte" }, { big: "2", label: "Auszeichnungen · 2025" }],
    },
    form: {
      kicker: "DND Cyprus",
      title: <>Erfahren Sie mehr <b>über unsere Projekte.</b></>,
      lead: "Sie interessieren sich für unsere laufenden oder kommenden Projekte? Unser Vertriebsteam informiert Sie gern ausführlich über Details und Möglichkeiten.",
    },
  },
  ekipSayfasi: {
    hero: {
      title: <>Unser Team</>,
      lead: "Hinter dem Erfolg jedes Projekts steht die Professionalität unseres Teams – unser stärkstes Fundament.",
      image: "/property_awards_2025-747.jpg",
    },
  },
  haberler: {
    hero: {
      kicker: "DND Cyprus in der Presse",
      title: <>Aktuelles</>,
      lead: "Neues von DND, DND in der Presse und Veranstaltungen.",
      image: "/dndwhoweare.jpg",
    },
  },
  ayricalik: {
    hero: {
      image: "/azure/lv-1.jpg",
      imageAlt: "DND Cyprus",
    },
  },
  odeme: {
    hero: {
      image: "/neocity/g-05.jpg",
      imageAlt: "DND Cyprus",
    },
  },
};

const RU = {
  hakkimizda: {
    hero: {
      kicker: "О нас",
      title: <>DND <b>Cyprus</b></>,
      lead: "Инновационное видение, многолетний опыт и приверженность качественному строительству — так мы создаём будущее Кипра.",
      image: "/azure/about-uu.jpg",
      imageAlt: "DND Cyprus",
    },
    kim: {
      images: {
        main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
        sideTop: "/dndwhoweare.jpg",
        sideBottom: "/dndtoplu.jpg",
      },
      videoTitle: "Знакомство с DND Cyprus",
      kicker: "О нас",
      youtubeId: "jxjWP9L0SwQ",
      poster: "/DND Beach Parti 24-59.jpg",
    },
    dndHomes: {
      kicker: "Родом из США, дома на Северном Кипре",
      videoTitle: "Презентационное видео DND Homes",
      heading: "DND Homes — видение для Кипра",
      description: "Откройте для себя наши проекты и концепцию жизни.",
      videoId: "4oSQ67UeyXQ",
      poster: "/homesthumb.webp",
    },
    misyon: {
      kicker: "DND Cyprus",
      title: <>Миссия, видение <b>и ценности</b></>,
      missionTitle: "Наша миссия",
      missionText: "Создавать проекты, которые повышают качество жизни на Северном Кипре, соединяя эстетичную архитектуру, инженерную дисциплину и устойчивые решения, и приумножать ценность благодаря принципам прозрачности, безопасности и своевременной сдачи.",
      visionTitle: "Наше видение",
      visionText: "Стать эталонным брендом инновационного девелопмента на Северном Кипре и лидировать в отрасли по качеству, удовлетворённости клиентов и экологической ответственности.",
      valuesTitle: "Наши ценности",
      values: [
        "Честность и прозрачность",
        "Ориентация на качество",
        "Культура безопасности (ОТ, ПБ и ООС)",
        "Устойчивое развитие",
        "Удовлетворённость клиентов",
        "Своевременная сдача",
        "Сотрудничество и надёжные поставки",
      ],
    },
    neden: {
      kicker: "DND Cyprus",
      title: <>Почему <b>выбирают нас?</b></>,
      subtitle: "Нас отличает надёжный, инновационный и устойчивый подход.",
      strengths: [
        {
          title: "Гарантия качества",
          description: "Благодаря процессам, сертифицированным по ISO, мы выдерживаем высокие стандарты в каждом проекте.",
          accent: "teal",
        },
        {
          title: "Сдача в срок",
          description: "Мы завершаем проекты точно в запланированные сроки — надёжно и прозрачно.",
          accent: "orange",
        },
        {
          title: "Устойчивое развитие",
          description: "Энергоэффективность, экологичные материалы и «зелёные» решения — наш приоритет.",
          accent: "teal",
        },
        {
          title: "Удовлетворённость клиентов",
          description: "Открытое общение и послепродажная поддержка помогают нам строить долгие отношения, основанные на доверии.",
          accent: "orange",
        },
      ],
    },
    cagri: {
      title: <>Построим будущее <b>вместе</b></>,
      subtitle: "Если вы ищете надёжного и инновационного партнёра для своих проектов, свяжитесь с нами.",
      buttonLabel: "Связаться с нами",
      bgSrc: "/azure/contact-sea.webp",
      bgAlt: "",
    },
  },
  iletisim: {
    hero: {
      kicker: "Контакты",
      title: <>Свяжитесь <b>с нами</b></>,
      lead: "Свяжитесь с нами, чтобы узнать больше о наших проектах и инвестиционных возможностях.",
      image: "/azure/contact/iletisim-banner.jpg",
      imageAlt: "Ключи от дома, план квартиры и кофе на столе с видом на море",
      ctas: [{ label: "Написать нам", href: "#form" }, { label: "Наши проекты", href: "/ru/projects", variant: "ghost" }],
    },
    bilgi: {
      kicker: "DND Cyprus",
      title: <>Контактная <b>информация</b></>,
      subtitle: "Задайте нам любой вопрос — мы ответим как можно скорее.",
      offices: [
        {
          id: "hq",
          label: "Головной офис DND Cyprus",
          addressLines: [
            "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450",
          ],
          city: "Фамагуста",
          country: "Северный Кипр",
          phone: "+90 392 444 03 63",
          phoneDisplay: "+90 392 444 03 63",
          email: "mailto:info@dndcyprus.com",
          hours: ["Пн–пт 08:30–17:30, сб 08:30–13:00"],
          mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
          whatsapp: "https://wa.me/905488390363",
          image: "/dndofis.JPG",
          imageAlt: "Головной офис DND Cyprus",
          coords: [35.1310, 33.9193],
          mapImage: "/maps/ofis-gazimagusa.webp",
        },
      ],
    },
    form: {
      title: <>Воплотим вашу мечту <b>вместе</b></>,
      lead: "Команда DND Cyprus готова поддержать ваши инвестиции. Оставьте сообщение — мы скоро с вами свяжемся.",
    },
  },
  projelerSayfasi: {
    hero: {
      kicker: "Проекты",
      title: <>Шесть адресов, <b>один стандарт.</b></>,
      lead: "NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II и Mariachi Beach Club: сравните все проекты DND Cyprus в одном месте.",
      image: "/azure/lv-7.jpg",
      imageAlt: "DND Cyprus",
      chips: [{ big: "6", label: "проектов" }, { big: "2", label: "награды · 2025" }],
    },
    form: {
      kicker: "DND Cyprus",
      title: <>Узнайте больше <b>о наших проектах.</b></>,
      lead: "Если вас интересуют текущие или будущие проекты, наш отдел продаж с радостью расскажет подробности и предложит лучшие варианты.",
    },
  },
  ekipSayfasi: {
    hero: {
      title: <>Наша команда</>,
      lead: "За каждым проектом стоит профессионализм нашей команды — это наш самый прочный фундамент.",
      image: "/property_awards_2025-747.jpg",
    },
  },
  haberler: {
    hero: {
      kicker: "DND Cyprus в прессе",
      title: <>Новости</>,
      lead: "Новости DND, DND в прессе и мероприятия.",
      image: "/dndwhoweare.jpg",
    },
  },
  ayricalik: {
    hero: {
      image: "/azure/lv-1.jpg",
      imageAlt: "DND Cyprus",
    },
  },
  odeme: {
    hero: {
      image: "/neocity/g-05.jpg",
      imageAlt: "DND Cyprus",
    },
  },
};

const PL = {
  hakkimizda: {
    hero: {
      kicker: "O nas",
      title: <>DND <b>Cyprus</b></>,
      lead: "Dzięki innowacyjnej wizji, wieloletniemu doświadczeniu i dbałości o jakość wykonania budujemy przyszłość Cypru.",
      image: "/azure/about-uu.jpg",
      imageAlt: "DND Cyprus",
    },
    kim: {
      images: {
        main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
        sideTop: "/dndwhoweare.jpg",
        sideBottom: "/dndtoplu.jpg",
      },
      videoTitle: "DND Cyprus – film o firmie",
      kicker: "O nas",
      youtubeId: "jxjWP9L0SwQ",
      poster: "/DND Beach Parti 24-59.jpg",
    },
    dndHomes: {
      kicker: "Rodem z USA, u siebie na Cyprze Północnym",
      videoTitle: "Film prezentacyjny DND Homes",
      heading: "DND Homes — wizja dla Cypru",
      description: "Zapraszamy do poznania naszych projektów i koncepcji życia.",
      videoId: "4oSQ67UeyXQ",
      poster: "/homesthumb.webp",
    },
    misyon: {
      kicker: "DND Cyprus",
      title: <>Misja, wizja <b>i wartości</b></>,
      missionTitle: "Nasza misja",
      missionText: "Tworzymy projekty, które podnoszą jakość życia na Cyprze Północnym, łącząc estetyczną architekturę, inżynierską dyscyplinę i zrównoważone rozwiązania. Wartość budujemy na przejrzystości, bezpieczeństwie i terminowym oddawaniu inwestycji.",
      visionTitle: "Nasza wizja",
      visionText: "Chcemy być marką, która wyznacza standardy innowacyjnej działalności deweloperskiej na Cyprze Północnym, i liderem branży pod względem jakości, satysfakcji klientów oraz odpowiedzialności za środowisko.",
      valuesTitle: "Nasze wartości",
      values: [
        "Uczciwość i przejrzystość",
        "Nacisk na jakość",
        "Kultura bezpieczeństwa (BHP)",
        "Zrównoważony rozwój",
        "Satysfakcja klientów",
        "Terminowa realizacja",
        "Współpraca i niezawodne dostawy",
      ],
    },
    neden: {
      kicker: "DND Cyprus",
      title: <>Dlaczego warto <b>nas wybrać?</b></>,
      subtitle: "Wyróżnia nas rzetelne, innowacyjne i zrównoważone podejście.",
      strengths: [
        {
          title: "Gwarancja jakości",
          description: "Dzięki procesom z certyfikatem ISO utrzymujemy wysokie standardy jakości w każdym projekcie.",
          accent: "teal",
        },
        {
          title: "Terminowa realizacja",
          description: "Kończymy projekty w zaplanowanych terminach – rzetelnie i przejrzyście.",
          accent: "orange",
        },
        {
          title: "Zrównoważony rozwój",
          description: "Priorytetem są dla nas energooszczędność, materiały przyjazne środowisku i ekologiczne rozwiązania.",
          accent: "teal",
        },
        {
          title: "Satysfakcja klientów",
          description: "Dzięki przejrzystej komunikacji i wsparciu posprzedażowemu budujemy długotrwałe relacje oparte na zaufaniu.",
          accent: "orange",
        },
      ],
    },
    cagri: {
      title: <>Budujmy przyszłość <b>razem</b></>,
      subtitle: "Jeśli szukają Państwo rzetelnego i innowacyjnego partnera dla swoich projektów, zapraszamy do kontaktu.",
      buttonLabel: "Skontaktuj się z nami",
      bgSrc: "/azure/contact-sea.webp",
      bgAlt: "",
    },
  },
  iletisim: {
    hero: {
      kicker: "Kontakt",
      title: <>Zapraszamy <b>do kontaktu</b></>,
      lead: "Chętnie opowiemy Państwu więcej o naszych projektach i możliwościach inwestycyjnych.",
      image: "/azure/contact/iletisim-banner.jpg",
      imageAlt: "Klucze do domu, plan mieszkania i kawa na stole z widokiem na morze",
      ctas: [{ label: "Wyślij wiadomość", href: "#form" }, { label: "Nasze projekty", href: "/pl/projects", variant: "ghost" }],
    },
    bilgi: {
      kicker: "DND Cyprus",
      title: <>Dane <b>kontaktowe</b></>,
      subtitle: "W razie pytań prosimy o kontakt. Odpowiemy najszybciej, jak to możliwe.",
      offices: [
        {
          id: "hq",
          label: "Siedziba główna DND Cyprus",
          addressLines: [
            "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cypr, 99450",
          ],
          city: "Famagusta",
          country: "Cypr Północny",
          phone: "+90 392 444 03 63",
          phoneDisplay: "+90 392 444 03 63",
          email: "mailto:info@dndcyprus.com",
          hours: ["Poniedziałek–piątek 08:30–17:30, sobota 08:30–13:00"],
          mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
          whatsapp: "https://wa.me/905488390363",
          image: "/dndofis.JPG",
          imageAlt: "Siedziba główna DND Cyprus",
          coords: [35.1310, 33.9193],
          mapImage: "/maps/ofis-gazimagusa.webp",
        },
      ],
    },
    form: {
      title: <>Zrealizujmy Państwa marzenia <b>wspólnie</b></>,
      lead: "Zespół DND Cyprus jest gotów wesprzeć Państwa inwestycję. Prosimy zostawić wiadomość – wkrótce się odezwiemy.",
    },
  },
  projelerSayfasi: {
    hero: {
      kicker: "Projekty",
      title: <>Sześć adresów, <b>jeden standard.</b></>,
      lead: "NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II i Mariachi Beach Club – wszystkie projekty DND Cyprus do porównania w jednym miejscu.",
      image: "/azure/lv-7.jpg",
      imageAlt: "DND Cyprus",
      chips: [{ big: "6", label: "Projektów" }, { big: "2", label: "Nagrody · 2025" }],
    },
    form: {
      kicker: "DND Cyprus",
      title: <>Więcej informacji <b>o naszych projektach.</b></>,
      lead: "Jeśli interesują Państwa nasze bieżące lub planowane inwestycje, nasz zespół sprzedaży chętnie przedstawi szczegółowe informacje i aktualne możliwości.",
    },
  },
  ekipSayfasi: {
    hero: {
      title: <>Nasz zespół</>,
      lead: "Za rozwojem każdego projektu stoi profesjonalizm naszego zespołu – to nasz najmocniejszy fundament.",
      image: "/property_awards_2025-747.jpg",
    },
  },
  haberler: {
    hero: {
      kicker: "DND Cyprus w mediach",
      title: <>Aktualności</>,
      lead: "Wiadomości od DND, DND w prasie i wydarzenia.",
      image: "/dndwhoweare.jpg",
    },
  },
  ayricalik: {
    hero: {
      image: "/azure/lv-1.jpg",
      imageAlt: "DND Cyprus",
    },
  },
  odeme: {
    hero: {
      image: "/neocity/g-05.jpg",
      imageAlt: "DND Cyprus",
    },
  },
};

export type PageDefaults = typeof TR;
export const PAGE_DEFAULTS = { tr: TR, en: EN as unknown as PageDefaults, de: DE as unknown as PageDefaults, ru: RU as unknown as PageDefaults, pl: PL as unknown as PageDefaults };
