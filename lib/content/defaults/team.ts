// lib/content/defaults/team.ts
// Ekip listesinin KOD İÇİNDEKİ varsayılanı (26.11.2026'da 5 dildeki LeadershipTeam bileşenlerinden birleştirildi).
// Panelde liste ilk açıldığında veritabanına aktarılır; sonrasında site listeyi veritabanından okur (lib/content/store.ts).
// Dile göre değişen: görev, kısa tanıtım, kategori (Almanca/Rusça filtre adları çevrilmiş). Ortak: ad, fotoğraf, sıra, vurgu rengi.
import type { Member } from "@/app/components/about/LeadershipTeam";
import type { ContentLocale } from "../core";

export type TeamRecord = {
  id: string;
  name: string;
  photo?: string;
  accent?: "teal" | "orange";
  sortOrder?: number;
  socials?: Member["socials"];
  role: Record<ContentLocale, string>;
  bio: Record<ContentLocale, string>;
  category: Record<ContentLocale, string>;
};

export function memberFor(r: TeamRecord, l: ContentLocale): Member {
  const pick = (v: Record<string, string> | undefined) => (v?.[l] || v?.en || v?.tr || "").trim();
  return { id: r.id, name: r.name, role: pick(r.role), category: pick(r.category), photo: r.photo || undefined, bio: pick(r.bio) || undefined, socials: r.socials ?? {}, accent: r.accent, sortOrder: r.sortOrder };
}

export const TEAM_DEFAULTS: TeamRecord[] = [
  {
    "id": "ozan",
    "name": "Ozan Dökmecioğlu",
    "photo": "/teams/ozan.png",
    "accent": "teal",
    "sortOrder": 1,
    "role": {
      "tr": "Yönetim Kurulu Başkanı",
      "en": "Chairman of the Board",
      "de": "Vorstandsvorsitzender",
      "ru": "Председатель совета директоров",
      "pl": "Prezes zarządu"
    },
    "bio": {
      "tr": "Şirketin kurucusu ve vizyoner lideri.",
      "en": "Founder of the company and its visionary leader.",
      "de": "Gründer des Unternehmens und dessen visionärer Kopf.",
      "ru": "Основатель компании и её идейный лидер.",
      "pl": "Założyciel firmy i jej wizjoner."
    },
    "category": {
      "tr": "Leadership",
      "en": "Leadership",
      "de": "Führung",
      "ru": "Руководство",
      "pl": "Leadership"
    }
  },
  {
    "id": "aynur",
    "name": "Aynur Zorba Gülol",
    "photo": "/teams/aynurzorbagulol.png",
    "accent": "orange",
    "sortOrder": 2,
    "role": {
      "tr": "Direktör & Mimar",
      "en": "Director & Architect",
      "de": "Direktorin & Architektin",
      "ru": "Директор и архитектор",
      "pl": "Dyrektor i architekt"
    },
    "bio": {
      "tr": "Yönetim ve stratejik planlama süreçlerinde sorumlu.",
      "en": "Responsible for management and strategic planning processes.",
      "de": "Verantwortlich für Management und strategische Planung.",
      "ru": "Отвечает за управление и стратегическое планирование.",
      "pl": "Odpowiada za zarządzanie i planowanie strategiczne."
    },
    "category": {
      "tr": "Leadership",
      "en": "Leadership",
      "de": "Führung",
      "ru": "Руководство",
      "pl": "Leadership"
    }
  },
  {
    "id": "burcin",
    "name": "Burçin Gül",
    "photo": "/teams/burcingul.png",
    "accent": "teal",
    "sortOrder": 3,
    "role": {
      "tr": "İnş. Koordinatör",
      "en": "Construction Coordinator",
      "de": "Baukoordination",
      "ru": "Координатор строительства",
      "pl": "Koordynator budowy"
    },
    "bio": {
      "tr": "İnşaat projelerinin koordinasyonu.",
      "en": "Coordinates construction projects.",
      "de": "Koordiniert die Bauprojekte.",
      "ru": "Координирует строительные проекты.",
      "pl": "Koordynuje projekty budowlane."
    },
    "category": {
      "tr": "Engineering",
      "en": "Engineering",
      "de": "Technik",
      "ru": "Инжиниринг",
      "pl": "Engineering"
    }
  },
  {
    "id": "borhan",
    "name": "Borhan Ghasemzadeh",
    "photo": "/teams/borhan.png",
    "accent": "orange",
    "sortOrder": 4,
    "role": {
      "tr": "Genel Satış Müdürü",
      "en": "General Sales Manager",
      "de": "Vertriebsleiter",
      "ru": "Генеральный менеджер по продажам",
      "pl": "Dyrektor sprzedaży"
    },
    "bio": {
      "tr": "Genel satış stratejilerinden sorumlu.",
      "en": "Responsible for overall sales strategies.",
      "de": "Verantwortlich für die gesamte Vertriebsstrategie.",
      "ru": "Отвечает за общую стратегию продаж.",
      "pl": "Odpowiada za ogólną strategię sprzedaży."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "sabina",
    "name": "Sabina Rahimova",
    "photo": "/teams/sabina.png",
    "accent": "teal",
    "sortOrder": 6,
    "role": {
      "tr": "Satış Müdürü",
      "en": "Sales Manager",
      "de": "Sales Manager",
      "ru": "Менеджер по продажам",
      "pl": "Kierownik sprzedaży"
    },
    "bio": {
      "tr": "Satış operasyonlarının lideri.",
      "en": "Leads sales operations.",
      "de": "Leitet die Vertriebsaktivitäten.",
      "ru": "Руководит работой отдела продаж.",
      "pl": "Kieruje działaniami sprzedażowymi."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "shadi",
    "name": "Shadi Maghfoori",
    "photo": "/teams/shadi.png",
    "accent": "orange",
    "sortOrder": 7,
    "role": {
      "tr": "Satış Müdürü",
      "en": "Sales Manager",
      "de": "Sales Manager",
      "ru": "Менеджер по продажам",
      "pl": "Kierownik sprzedaży"
    },
    "bio": {
      "tr": "Satış departmanında yönetici.",
      "en": "Manager within the sales department.",
      "de": "Führungskraft im Vertrieb.",
      "ru": "Менеджер отдела продаж.",
      "pl": "Kierownik w dziale sprzedaży."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "bob",
    "name": "Bob Porpiev",
    "photo": "/teams/bob.png",
    "accent": "teal",
    "sortOrder": 9,
    "role": {
      "tr": "Satış Temsilcisi",
      "en": "Sales Representative",
      "de": "Vertriebsmitarbeiter",
      "ru": "Консультант по продажам",
      "pl": "Przedstawiciel handlowy"
    },
    "bio": {
      "tr": "Müşteri ilişkileri ve satış temsilcisi.",
      "en": "Responsible for customer relations and sales representation.",
      "de": "Verantwortlich für Kundenbeziehungen und Verkauf.",
      "ru": "Отвечает за работу с клиентами и сопровождение сделок.",
      "pl": "Odpowiada za relacje z klientami i obsługę sprzedaży."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "onur_y",
    "name": "Onur Yalçın",
    "photo": "/teams/onuryalcin.png",
    "accent": "teal",
    "sortOrder": 26,
    "role": {
      "tr": "Mühendis",
      "en": "Engineer",
      "de": "Ingenieur",
      "ru": "Инженер",
      "pl": "Inżynier"
    },
    "bio": {
      "tr": "Proje mühendisliği sorumlusu.",
      "en": "Responsible for project engineering.",
      "de": "Verantwortlich für die technische Projektplanung.",
      "ru": "Отвечает за инженерное сопровождение проектов.",
      "pl": "Odpowiada za część inżynierską projektów."
    },
    "category": {
      "tr": "Engineering",
      "en": "Engineering",
      "de": "Technik",
      "ru": "Инжиниринг",
      "pl": "Engineering"
    }
  },
  {
    "id": "shayan",
    "name": "Shayan Karimi",
    "photo": "/teams/shayan.png",
    "accent": "orange",
    "sortOrder": 10,
    "role": {
      "tr": "Satış Temsilcisi",
      "en": "Sales Representative",
      "de": "Vertriebsmitarbeiter",
      "ru": "Консультант по продажам",
      "pl": "Przedstawiciel handlowy"
    },
    "bio": {
      "tr": "Satış sürecinde aktif temsilci.",
      "en": "Active representative throughout the sales process.",
      "de": "Begleitet Kunden durch den gesamten Verkaufsprozess.",
      "ru": "Сопровождает клиентов на всех этапах покупки.",
      "pl": "Wspiera klientów na każdym etapie sprzedaży."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "onur_p",
    "name": "Onur Pekkaya",
    "photo": "/teams/onur.png",
    "accent": "teal",
    "sortOrder": 8,
    "role": {
      "tr": "Türkiye Satış ve Pazarlama",
      "en": "Turkey Sales & Marketing",
      "de": "Vertrieb & Marketing Türkei",
      "ru": "Продажи и маркетинг в Турции",
      "pl": "Sprzedaż i marketing – Turcja"
    },
    "bio": {
      "tr": "",
      "en": "",
      "de": "",
      "ru": "",
      "pl": ""
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "okan",
    "name": "Okan Afşar",
    "photo": "/teams/okan.png",
    "accent": "orange",
    "sortOrder": 13,
    "role": {
      "tr": "Satış Manager",
      "en": "Sales Manager",
      "de": "Sales Manager",
      "ru": "Менеджер по продажам",
      "pl": "Kierownik sprzedaży"
    },
    "bio": {
      "tr": "Satış faaliyetlerinde görevli.",
      "en": "Responsible for sales activities.",
      "de": "Verantwortlich für die Vertriebsaktivitäten.",
      "ru": "Отвечает за продажи.",
      "pl": "Odpowiada za działania sprzedażowe."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "ava",
    "name": "Ava Pasandideh",
    "photo": "/teams/ava.png",
    "accent": "teal",
    "sortOrder": 11,
    "role": {
      "tr": "Satış Sonrası Sorumlusu",
      "en": "After-Sales Specialist",
      "de": "After-Sales-Spezialistin",
      "ru": "Специалист послепродажного сервиса",
      "pl": "Specjalista ds. obsługi posprzedażowej"
    },
    "bio": {
      "tr": "Satış sonrası hizmetler sorumlusu.",
      "en": "Responsible for after-sales services.",
      "de": "Verantwortlich für den After-Sales-Service.",
      "ru": "Отвечает за послепродажный сервис.",
      "pl": "Odpowiada za obsługę posprzedażową."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "nevin",
    "name": "Nevin Timoroğlu",
    "photo": "/teams/nevin.png",
    "accent": "orange",
    "sortOrder": 16,
    "role": {
      "tr": "Mimar",
      "en": "Architect",
      "de": "Architektin",
      "ru": "Архитектор",
      "pl": "Architekt"
    },
    "bio": {
      "tr": "Proje tasarımı ve uygulamasında görevli.",
      "en": "Works on project design and implementation.",
      "de": "Arbeitet an Entwurf und Umsetzung der Projekte.",
      "ru": "Занимается проектированием и реализацией проектов.",
      "pl": "Zajmuje się projektowaniem i realizacją projektów."
    },
    "category": {
      "tr": "Architecture",
      "en": "Architecture",
      "de": "Architektur",
      "ru": "Архитектура",
      "pl": "Architecture"
    }
  },
  {
    "id": "digdem",
    "name": "Diğdem Kutgün",
    "photo": "/teams/digdem.png",
    "accent": "teal",
    "sortOrder": 16.5,
    "role": {
      "tr": "Mimar",
      "en": "Architect",
      "de": "Architektin",
      "ru": "Архитектор",
      "pl": "Architekt"
    },
    "bio": {
      "tr": "Proje tasarımı ve uygulamasında görevli.",
      "en": "Works on project design and implementation.",
      "de": "Arbeitet an Entwurf und Umsetzung der Projekte.",
      "ru": "Занимается проектированием и реализацией проектов.",
      "pl": "Zajmuje się projektowaniem i realizacją projektów."
    },
    "category": {
      "tr": "Architecture",
      "en": "Architecture",
      "de": "Architektur",
      "ru": "Архитектура",
      "pl": "Architecture"
    }
  },
  {
    "id": "mustafa",
    "name": "Mustafa Muhtaroğlu",
    "photo": "/teams/mustafa.png",
    "accent": "teal",
    "sortOrder": 12,
    "role": {
      "tr": "Arsa Satış Sorumlusu",
      "en": "Land Sales Specialist",
      "de": "Spezialist für Grundstücksverkauf",
      "ru": "Специалист по продаже земли",
      "pl": "Specjalista ds. sprzedaży gruntów"
    },
    "bio": {
      "tr": "Arsa satış sürecinden sorumlu.",
      "en": "Responsible for the land sales process.",
      "de": "Verantwortlich für den Verkauf von Grundstücken.",
      "ru": "Отвечает за продажу земельных участков.",
      "pl": "Odpowiada za proces sprzedaży gruntów."
    },
    "category": {
      "tr": "Sales",
      "en": "Sales",
      "de": "Vertrieb",
      "ru": "Продажи",
      "pl": "Sales"
    }
  },
  {
    "id": "tanya",
    "name": "Tanya Yıldırım",
    "photo": "/teams/tanya.png",
    "accent": "orange",
    "sortOrder": 30,
    "role": {
      "tr": "Servis Personeli",
      "en": "Service Staff",
      "de": "Servicemitarbeiterin",
      "ru": "Сотрудник сервиса",
      "pl": "Personel obsługi"
    },
    "bio": {
      "tr": "Servis ve destek hizmetleri sorumlusu.",
      "en": "Responsible for service and support operations.",
      "de": "Verantwortlich für Service und Betreuung.",
      "ru": "Отвечает за сервис и поддержку жителей.",
      "pl": "Odpowiada za obsługę i wsparcie operacyjne."
    },
    "category": {
      "tr": "Operations",
      "en": "Operations",
      "de": "Betrieb",
      "ru": "Сервис",
      "pl": "Operations"
    }
  },
  {
    "id": "bulent",
    "name": "Bülent Çınar",
    "photo": "/teams/bulent.png",
    "accent": "orange",
    "sortOrder": 5,
    "role": {
      "tr": "Mali İşler Müdürü",
      "en": "Financial Affairs Manager",
      "de": "Leiter Finanzen",
      "ru": "Руководитель финансового отдела",
      "pl": "Kierownik ds. finansowych"
    },
    "bio": {
      "tr": "Mali işler yönetiminden sorumlu.",
      "en": "Responsible for managing financial affairs.",
      "de": "Verantwortlich für die Finanzverwaltung.",
      "ru": "Руководит финансовыми вопросами компании.",
      "pl": "Zarządza sprawami finansowymi firmy."
    },
    "category": {
      "tr": "Finance",
      "en": "Finance",
      "de": "Finanzen",
      "ru": "Финансы",
      "pl": "Finance"
    }
  },
  {
    "id": "gozde",
    "name": "Gözde Onar",
    "photo": "/teams/gozde.png",
    "accent": "teal",
    "sortOrder": 20,
    "role": {
      "tr": "Finans Sorumlusu",
      "en": "Finance Specialist",
      "de": "Finanzspezialistin",
      "ru": "Финансовый специалист",
      "pl": "Specjalista ds. finansów"
    },
    "bio": {
      "tr": "Finans yönetim süreçlerinden sorumlu.",
      "en": "Responsible for finance management processes.",
      "de": "Verantwortlich für die Prozesse im Finanzmanagement.",
      "ru": "Отвечает за процессы финансового управления.",
      "pl": "Odpowiada za procesy zarządzania finansami."
    },
    "category": {
      "tr": "Finance",
      "en": "Finance",
      "de": "Finanzen",
      "ru": "Финансы",
      "pl": "Finance"
    }
  },
  {
    "id": "emine",
    "name": "Emine Akkuş",
    "photo": "/teams/emine.png",
    "accent": "orange",
    "sortOrder": 5.1,
    "role": {
      "tr": "Muhasebe Müdürü",
      "en": "Accounting Manager",
      "de": "Leiterin Buchhaltung",
      "ru": "Руководитель бухгалтерии",
      "pl": "Kierownik ds. księgowości"
    },
    "bio": {
      "tr": "Muhasebe ve finans yönetimi.",
      "en": "Responsible for accounting and finance management.",
      "de": "Verantwortlich für Buchhaltung und Finanzmanagement.",
      "ru": "Отвечает за бухгалтерский учёт и финансы.",
      "pl": "Odpowiada za księgowość i zarządzanie finansami."
    },
    "category": {
      "tr": "Finance",
      "en": "Finance",
      "de": "Finanzen",
      "ru": "Финансы",
      "pl": "Finance"
    }
  },
  {
    "id": "muhammed",
    "name": "Muhammed Dinç",
    "photo": "/teams/mami.png",
    "accent": "teal",
    "sortOrder": 22,
    "role": {
      "tr": "Muhasebe Sorumlusu",
      "en": "Accounting Specialist",
      "de": "Buchhaltungsspezialist",
      "ru": "Бухгалтер",
      "pl": "Specjalista ds. księgowości"
    },
    "bio": {
      "tr": "Muhasebe kayıt ve süreçleri.",
      "en": "Responsible for accounting records and processes.",
      "de": "Verantwortlich für Buchführung und Buchhaltungsprozesse.",
      "ru": "Ведёт бухгалтерский учёт и документацию.",
      "pl": "Odpowiada za ewidencję i procesy księgowe."
    },
    "category": {
      "tr": "Finance",
      "en": "Finance",
      "de": "Finanzen",
      "ru": "Финансы",
      "pl": "Finance"
    }
  },
  {
    "id": "omer",
    "name": "Ömer Dursun",
    "photo": "/teams/omer.png",
    "accent": "orange",
    "sortOrder": 28,
    "role": {
      "tr": "Teknik Servis Sorumlusu",
      "en": "Technical Service Supervisor",
      "de": "Leiter Technischer Service",
      "ru": "Руководитель технической службы",
      "pl": "Kierownik serwisu technicznego"
    },
    "bio": {
      "tr": "Teknik servis ve bakım sorumlusu.",
      "en": "Responsible for technical service and maintenance.",
      "de": "Verantwortlich für technischen Service und Wartung.",
      "ru": "Отвечает за техническое обслуживание и ремонт.",
      "pl": "Odpowiada za serwis techniczny i konserwację."
    },
    "category": {
      "tr": "Engineering",
      "en": "Engineering",
      "de": "Technik",
      "ru": "Инжиниринг",
      "pl": "Engineering"
    }
  },
  {
    "id": "yusuf",
    "name": "Yusuf Yalçın",
    "photo": "/teams/yusuf.png",
    "accent": "teal",
    "sortOrder": 24,
    "role": {
      "tr": "Mühendis",
      "en": "Engineer",
      "de": "Ingenieur",
      "ru": "Инженер",
      "pl": "Inżynier"
    },
    "bio": {
      "tr": "Mühendislik projelerinde görevli.",
      "en": "Works on engineering projects.",
      "de": "Arbeitet an Ingenieurprojekten.",
      "ru": "Работает над инженерными проектами.",
      "pl": "Pracuje przy projektach inżynieryjnych."
    },
    "category": {
      "tr": "Engineering",
      "en": "Engineering",
      "de": "Technik",
      "ru": "Инжиниринг",
      "pl": "Engineering"
    }
  },
  {
    "id": "rojina",
    "name": "Rojina",
    "photo": "/teams/rojina.png",
    "accent": "orange",
    "sortOrder": 25,
    "role": {
      "tr": "Mühendis",
      "en": "Engineer",
      "de": "Ingenieurin",
      "ru": "Инженер",
      "pl": "Inżynier"
    },
    "bio": {
      "tr": "Mühendislik alanında görevli.",
      "en": "Works in engineering.",
      "de": "Arbeitet im Bereich Technik.",
      "ru": "Работает в инженерном отделе.",
      "pl": "Pracuje w dziale inżynierii."
    },
    "category": {
      "tr": "Engineering",
      "en": "Engineering",
      "de": "Technik",
      "ru": "Инжиниринг",
      "pl": "Engineering"
    }
  },
  {
    "id": "hilal",
    "name": "Syed Hilal Ahmed",
    "photo": "/teams/hilal.png",
    "accent": "teal",
    "sortOrder": 27,
    "role": {
      "tr": "Mühendis",
      "en": "Engineer",
      "de": "Ingenieur",
      "ru": "Инженер",
      "pl": "Inżynier"
    },
    "bio": {
      "tr": "Proje mühendisliği sorumlusu.",
      "en": "Responsible for project engineering.",
      "de": "Verantwortlich für die technische Projektplanung.",
      "ru": "Отвечает за инженерное сопровождение проектов.",
      "pl": "Odpowiada za część inżynierską projektów."
    },
    "category": {
      "tr": "Engineering",
      "en": "Engineering",
      "de": "Technik",
      "ru": "Инжиниринг",
      "pl": "Engineering"
    }
  },
  {
    "id": "mehmet-alp",
    "name": "Mehmet Alp Artıkoğlu",
    "photo": "/teams/placeholder-erkek.png",
    "accent": "teal",
    "role": {
      "tr": "Grafik Tasarım ve Video Prodüksiyon",
      "en": "Graphic Design & Video Production",
      "de": "Grafikdesign & Videoproduktion",
      "ru": "Графический дизайн и видеопродакшн",
      "pl": "Projektowanie graficzne i produkcja wideo"
    },
    "bio": {
      "tr": "Marka iletişimi için grafik tasarım, video çekim ve kurgudan sorumlu.",
      "en": "Responsible for graphic design, video shooting and editing for brand communication.",
      "de": "Verantwortlich für Grafikdesign, Videoaufnahmen und Schnitt in der Markenkommunikation.",
      "ru": "Отвечает за графический дизайн, видеосъёмку и монтаж для коммуникаций бренда.",
      "pl": "Odpowiada za projekty graficzne, zdjęcia wideo i montaż w komunikacji marki."
    },
    "category": {
      "tr": "Marketing",
      "en": "Marketing",
      "de": "Marketing",
      "ru": "Marketing",
      "pl": "Marketing"
    }
  }
];

export const teamDefaultsFor = (l: ContentLocale): Member[] => TEAM_DEFAULTS.map((r) => memberFor(r, l));
