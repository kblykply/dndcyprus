// lib/content/defaults/press.ts
// "Basında DND" haberlerinin KOD İÇİNDEKİ varsayılan listesi (26.11.2026'da ana sayfa + basın sayfası, 5 dil, 10 kopyadan birleştirildi).
// Panelde liste ilk açıldığında bu kayıtlar veritabanına aktarılır; sonrasında site listeyi veritabanından okur (lib/content/store.ts).
// Dile göre değişen: başlık, özet, etiketler. Ortak: yayın adı, bağlantı, tarih, kapak.
import type { PressItem } from "@/app/components/PressSection";
import type { ContentLocale } from "../core";

export type PressRecord = {
  id: string;
  outlet: string;
  url: string;
  date: string;
  cover?: string;
  title: Record<ContentLocale, string>;
  excerpt: Record<ContentLocale, string>;
  tags: Record<ContentLocale, string[]>;
};

/** Kayıt → sayfanın beklediği biçim; çevirisi boş alanda İngilizce, o da yoksa Türkçe kullanılır */
export function pressItemFor(r: PressRecord, l: ContentLocale): PressItem {
  const pick = (v: Record<string, string> | undefined) => (v?.[l] || v?.en || v?.tr || "").trim();
  const tags = r.tags?.[l]?.length ? r.tags[l] : r.tags?.en?.length ? r.tags.en : r.tags?.tr ?? [];
  return { id: r.id, outlet: r.outlet, url: r.url, date: r.date, title: pick(r.title), excerpt: pick(r.excerpt) || undefined, cover: r.cover || undefined, tags };
}

export const PRESS_DEFAULTS: PressRecord[] = [
  {
    "id": "genctv-2026-11-18",
    "outlet": "Kıbrıs Genç TV",
    "url": "https://www.youtube.com/watch?v=wcKVmNq05PA",
    "date": "2026-11-18",
    "cover": "/news/genctv-perspektif-ikili.webp",
    "title": {
      "tr": "Yağmur Çal ile Perspektif: Ozan Dökmecioğlu",
      "en": "Perspektif with Yağmur Çal: Ozan Dökmecioğlu",
      "de": "Perspektif mit Yağmur Çal: Ozan Dökmecioğlu",
      "ru": "Perspektif с Ягмур Чал: Озан Дёкмеджиоглу",
      "pl": "Perspektif z Yağmur Çal: Ozan Dökmecioğlu"
    },
    "excerpt": {
      "tr": "DND Cyprus Kurucusu Ozan Dökmecioğlu, Kıbrıs Genç TV’de Yağmur Çal’ın konuğu oldu; Boston’dan Kuzey Kıbrıs’a uzanan yolculuğunu, NeoCity’yi ve Türk lirasıyla faizsiz, vade farksız ödeme modelini anlattı. Programda Maraş vizyonu, planlı şehirleşme ve uzun vadeli konut kredisinin önemi de konuşuldu.",
      "en": "DND Cyprus founder Ozan Dökmecioğlu was Yağmur Çal’s guest on Kıbrıs Genç TV, talking about his journey from Boston to North Cyprus, NeoCity and the interest-free Turkish-lira payment model. The programme also covered the Maraş vision, planned urban development and the importance of long-term mortgages.",
      "de": "DND-Cyprus-Gründer Ozan Dökmecioğlu war bei Kıbrıs Genç TV zu Gast bei Yağmur Çal und sprach über seinen Weg von Boston nach Nordzypern, NeoCity und das zinsfreie Lira-Zahlungsmodell. Themen waren außerdem die Maraş-Vision, geplante Stadtentwicklung und langfristige Hypothekenkredite.",
      "ru": "Основатель DND Cyprus Озан Дёкмеджиоглу стал гостем Ягмур Чал на Kıbrıs Genç TV: он рассказал о пути из Бостона на Северный Кипр, о проекте NeoCity и беспроцентной модели оплаты в турецких лирах. Также обсуждались проект Мараш, планирование застройки и роль долгосрочной ипотеки.",
      "pl": "Założyciel DND Cyprus Ozan Dökmecioğlu był gościem Yağmur Çal w Kıbrıs Genç TV: opowiedział o drodze z Bostonu na Cypr Północny, o NeoCity i nieoprocentowanym modelu płatności w lirach tureckich. Rozmawiano też o wizji Maraş, planowanej zabudowie i znaczeniu długoterminowych kredytów hipotecznych."
    },
    "tags": {
      "tr": [
        "Röportaj",
        "TV"
      ],
      "en": [
        "Interview",
        "TV"
      ],
      "de": [
        "Interview",
        "TV"
      ],
      "ru": [
        "Интервью",
        "ТВ"
      ],
      "pl": [
        "Wywiad",
        "TV"
      ]
    }
  },
  {
    "id": "businessworldglobal-2026-11-16",
    "outlet": "Business World Global",
    "url": "https://businessworldglobal.com/ozan-dokmecioglu-turk-lirasiyla-kazananlar-turk-lirasiyla-ev-sahibi-olabilmeli/",
    "date": "2026-11-16",
    "cover": "/news/bwg-ozan-tl-roportaj.webp",
    "title": {
      "tr": "Ozan Dökmecioğlu: Türk lirasıyla kazananlar, Türk lirasıyla ev sahibi olabilmeli",
      "en": "Ozan Dökmecioğlu: Those who earn in Turkish lira should be able to buy a home in Turkish lira",
      "de": "Ozan Dökmecioğlu: Wer in Türkischer Lira verdient, soll auch in Lira ein Eigenheim kaufen können",
      "ru": "Озан Дёкмеджиоглу: те, кто зарабатывает в турецких лирах, должны иметь возможность купить жильё в лирах",
      "pl": "Ozan Dökmecioğlu: kto zarabia w lirach tureckich, powinien móc kupić dom w lirach"
    },
    "excerpt": {
      "tr": "DND Cyprus Kurucusu Ozan Dökmecioğlu, Lagoon Verde’de 60 aya kadar Türk lirasıyla ödeme modelini anlattı; Netice Dökmecioğlu İskele’nin potansiyelini değerlendirdi.",
      "en": "DND Cyprus founder Ozan Dökmecioğlu explains the Turkish-lira payment model of up to 60 months at Lagoon Verde, while Netice Dökmecioğlu talks about İskele’s potential.",
      "de": "DND-Cyprus-Gründer Ozan Dökmecioğlu erläutert das Lira-Zahlungsmodell mit bis zu 60 Monaten bei Lagoon Verde; Netice Dökmecioğlu spricht über das Potenzial von İskele.",
      "ru": "Основатель DND Cyprus Озан Дёкмеджиоглу рассказывает о модели оплаты в турецких лирах на срок до 60 месяцев в Lagoon Verde, а Нетидже Дёкмеджиоглу — о потенциале Искеле.",
      "pl": "Założyciel DND Cyprus Ozan Dökmecioğlu opisuje model płatności w lirach tureckich do 60 miesięcy w Lagoon Verde, a Netice Dökmecioğlu mówi o potencjale İskele."
    },
    "tags": {
      "tr": [
        "Röportaj",
        "TL Ödeme Modeli"
      ],
      "en": [
        "Interview",
        "TL Payment Model"
      ],
      "de": [
        "Interview",
        "TL-Zahlungsmodell"
      ],
      "ru": [
        "Интервью",
        "Оплата в лирах"
      ],
      "pl": [
        "Wywiad",
        "Płatności w lirach"
      ]
    }
  },
  {
    "id": "mha-2026-11-14",
    "outlet": "Mağusa Haber Ajansı (MHA)",
    "url": "https://www.mhahaber.com/dnd-cyprusta-ozel-bulusma-kuzey-kibris-ve-abd-yatirimlari-masaya-yatirildi",
    "date": "2026-11-14",
    "cover": "/news/mha-dnd-ozel-bulusma.webp",
    "title": {
      "tr": "DND Cyprus’ta özel buluşma: Kuzey Kıbrıs ve ABD yatırımları masaya yatırıldı",
      "en": "A special meeting at DND Cyprus: investments in North Cyprus and the US on the agenda",
      "de": "Besonderes Treffen bei DND Cyprus: Investitionen in Nordzypern und den USA im Fokus",
      "ru": "Особая встреча в DND Cyprus: инвестиции на Северном Кипре и в США",
      "pl": "Wyjątkowe spotkanie w DND Cyprus: inwestycje na Cyprze Północnym i w USA"
    },
    "excerpt": {
      "tr": "DND Cyprus, Mesut ve Ferda Yar ile Business World Global’den Umut Çelik’i ağırladı; buluşmada şirketin projeleri, Kuzey Kıbrıs ve ABD’deki yatırımları ile büyüme stratejisi konuşuldu.",
      "en": "DND Cyprus hosted Mesut and Ferda Yar and Umut Çelik of Business World Global; the meeting covered the company’s projects, its investments in North Cyprus and the US, and its growth strategy.",
      "de": "DND Cyprus empfing Mesut und Ferda Yar sowie Umut Çelik von Business World Global; Thema waren die Projekte, die Investitionen in Nordzypern und den USA und die Wachstumsstrategie.",
      "ru": "DND Cyprus принимала Месута и Ферду Яр, а также Умута Челика из Business World Global; обсуждались проекты компании, инвестиции на Северном Кипре и в США и стратегия роста.",
      "pl": "DND Cyprus gościło Mesuta i Ferdę Yar oraz Umuta Çelika z Business World Global; rozmawiano o projektach firmy, inwestycjach na Cyprze Północnym i w USA oraz strategii rozwoju."
    },
    "tags": {
      "tr": [
        "DND Cyprus",
        "Yatırım"
      ],
      "en": [
        "DND Cyprus",
        "Investment"
      ],
      "de": [
        "DND Cyprus",
        "Investition"
      ],
      "ru": [
        "DND Cyprus",
        "Инвестиции"
      ],
      "pl": [
        "DND Cyprus",
        "Inwestycje"
      ]
    }
  },
  {
    "id": "mha-2026-08-08",
    "outlet": "Mağusa Haber Ajansı (MHA)",
    "url": "https://www.mhahaber.com/dnd-larnaka-gencler-birligi-basarili-sezonun-ardindan-iskele-belediyesinde-bir-araya-geldi",
    "date": "2026-08-08",
    "cover": "/news/mha-gencler-birligi-sezon.webp",
    "title": {
      "tr": "DND Larnaka Gençler Birliği, başarılı sezonun ardından İskele Belediyesi’nde bir araya geldi",
      "en": "DND Larnaka Gençler Birliği meets at İskele Municipality after a successful season",
      "de": "DND Larnaka Gençler Birliği nach erfolgreicher Saison im Rathaus von İskele",
      "ru": "DND Larnaka Gençler Birliği собрался в муниципалитете Искеле после успешного сезона",
      "pl": "DND Larnaka Gençler Birliği w ratuszu İskele po udanym sezonie"
    },
    "excerpt": {
      "tr": "DND Cyprus’un sponsoru olduğu DND Larnaka Gençler Birliği Spor Kulübü, 2025–2026 sezonunu İskele Belediye Başkanı Hasan Sadıkoğlu’nun ev sahipliğindeki buluşmada değerlendirdi.",
      "en": "DND Larnaka Gençler Birliği Sports Club, sponsored by DND Cyprus, reviewed its 2025–2026 season at a meeting hosted by İskele Mayor Hasan Sadıkoğlu.",
      "de": "Der von DND Cyprus gesponserte Sportverein DND Larnaka Gençler Birliği zog bei einem Treffen mit İskeles Bürgermeister Hasan Sadıkoğlu Bilanz der Saison 2025–2026.",
      "ru": "Спортивный клуб DND Larnaka Gençler Birliği, спонсором которого выступает DND Cyprus, подвёл итоги сезона 2025–2026 на встрече у мэра Искеле Хасана Садыкоглу.",
      "pl": "Klub sportowy DND Larnaka Gençler Birliği, sponsorowany przez DND Cyprus, podsumował sezon 2025–2026 na spotkaniu u burmistrza İskele Hasana Sadıkoğlu."
    },
    "tags": {
      "tr": [
        "Spor",
        "Sponsorluk"
      ],
      "en": [
        "Sport",
        "Sponsorship"
      ],
      "de": [
        "Sport",
        "Sponsoring"
      ],
      "ru": [
        "Спорт",
        "Спонсорство"
      ],
      "pl": [
        "Sport",
        "Sponsoring"
      ]
    }
  },
  {
    "id": "halkinsesi-2025-09-30",
    "outlet": "Halkın Sesi",
    "url": "https://www.halkinsesikibris.com/gencler-birliginin-isim-sponsoru-ikinci-kez-dnd-cyprus",
    "date": "2025-09-30",
    "cover": "/news/halkinsesi-isim-sponsoru.webp",
    "title": {
      "tr": "Gençler Birliği’nin isim sponsoru ikinci kez DND Cyprus",
      "en": "DND Cyprus becomes Gençler Birliği’s name sponsor for the second time",
      "de": "DND Cyprus zum zweiten Mal Namenssponsor von Gençler Birliği",
      "ru": "DND Cyprus второй раз стала титульным спонсором Gençler Birliği",
      "pl": "DND Cyprus po raz drugi sponsorem tytularnym Gençler Birliği"
    },
    "excerpt": {
      "tr": "DND Cyprus, 2025–26 sezonunda da Gençler Birliği’nin isim sponsoru oldu; takımlar sezon boyunca “DND Larnaka Gençler Birliği” adıyla mücadele ediyor.",
      "en": "DND Cyprus is again Gençler Birliği’s name sponsor for the 2025–26 season; the teams play as “DND Larnaka Gençler Birliği”.",
      "de": "DND Cyprus ist auch in der Saison 2025–26 Namenssponsor von Gençler Birliği; die Teams treten als „DND Larnaka Gençler Birliği“ an.",
      "ru": "DND Cyprus снова стала титульным спонсором Gençler Birliği на сезон 2025–26: команды выступают под названием «DND Larnaka Gençler Birliği».",
      "pl": "DND Cyprus ponownie jest sponsorem tytularnym Gençler Birliği w sezonie 2025–26; drużyny grają jako „DND Larnaka Gençler Birliği”."
    },
    "tags": {
      "tr": [
        "Spor",
        "Sponsorluk"
      ],
      "en": [
        "Sport",
        "Sponsorship"
      ],
      "de": [
        "Sport",
        "Sponsoring"
      ],
      "ru": [
        "Спорт",
        "Спонсорство"
      ],
      "pl": [
        "Sport",
        "Sponsoring"
      ]
    }
  },
  {
    "id": "yeniduzen-2025-08-07",
    "outlet": "YENİDÜZEN",
    "url": "https://www.yeniduzen.com/dnd-kibris-turkiye-ofisi-ile-buyumesini-surduruyor-185586h.htm",
    "date": "2025-08-07",
    "cover": "/news/yeniduzen-turkiye-ofisi.webp",
    "title": {
      "tr": "DND Kıbrıs, Türkiye ofisi ile büyümesini sürdürüyor",
      "en": "DND Cyprus continues to grow with its Türkiye office",
      "de": "DND Cyprus wächst mit Büro in der Türkei weiter",
      "ru": "DND Cyprus продолжает рост с офисом в Турции",
      "pl": "DND Cyprus rozwija się dzięki biuru w Turcji"
    },
    "excerpt": {
      "tr": "DND Cyprus Kurucusu Ozan Dökmecioğlu, DND Türkiye ofisinin kurulduğunu duyurdu; ofis konut geliştirme ve iş ortaklıklarına odaklanacak.",
      "en": "DND Cyprus founder Ozan Dökmecioğlu announced the opening of the DND Türkiye office, which will focus on residential development and business partnerships.",
      "de": "DND-Cyprus-Gründer Ozan Dökmecioğlu gab die Eröffnung des Büros DND Türkiye bekannt; im Fokus stehen Wohnbauprojekte und Geschäftspartnerschaften.",
      "ru": "Основатель DND Cyprus Озан Дёкмеджиоглу объявил об открытии офиса DND Türkiye, который займётся девелопментом жилья и деловыми партнёрствами.",
      "pl": "Założyciel DND Cyprus Ozan Dökmecioğlu ogłosił otwarcie biura DND Türkiye, które skupi się na budownictwie mieszkaniowym i partnerstwach biznesowych."
    },
    "tags": {
      "tr": [
        "DND Cyprus",
        "Türkiye"
      ],
      "en": [
        "DND Cyprus",
        "Türkiye"
      ],
      "de": [
        "DND Cyprus",
        "Türkei"
      ],
      "ru": [
        "DND Cyprus",
        "Турция"
      ],
      "pl": [
        "DND Cyprus",
        "Turcja"
      ]
    }
  },
  {
    "id": "gundemkibris-2023-05-11",
    "outlet": "Gündem Kıbrıs",
    "url": "https://www.gundemkibris.com/gmb-barinaginin-ameliyathanesi-donanimli-altyapiya-kavustu",
    "date": "2023-05-11",
    "cover": "/news/gundemkibris-gmb-barinak.webp",
    "title": {
      "tr": "GMB Barınağının ameliyathanesi donanımlı altyapıya kavuştu",
      "en": "Famagusta Municipality dog shelter gets an equipped operating room",
      "de": "Tierheim der Stadt Famagusta erhält ausgestatteten OP-Saal",
      "ru": "Приют для собак муниципалитета Фамагусты получил оснащённую операционную",
      "pl": "Schronisko dla psów w Famaguście z wyposażoną salą operacyjną"
    },
    "excerpt": {
      "tr": "DND Homes’un sponsorluğuyla Gazimağusa Belediyesi Köpek Barınağı ve Rehabilitasyon Merkezi’ndeki ameliyathanenin altyapısı oluşturuldu; Belediye Başkanı Süleyman Uluçay, Ozan Dökmecioğlu’na teşekkür etti.",
      "en": "With DND Homes’ sponsorship, the operating room at Famagusta Municipality’s Dog Shelter and Rehabilitation Centre was equipped; Mayor Süleyman Uluçay thanked Ozan Dökmecioğlu.",
      "de": "Mit dem Sponsoring von DND Homes wurde der OP-Saal im Hundeheim und Rehabilitationszentrum der Stadt Famagusta ausgestattet; Bürgermeister Süleyman Uluçay dankte Ozan Dökmecioğlu.",
      "ru": "При спонсорской поддержке DND Homes была оснащена операционная приюта и реабилитационного центра для собак муниципалитета Фамагусты; мэр Сулейман Улучай поблагодарил Озана Дёкмеджиоглу.",
      "pl": "Dzięki sponsoringowi DND Homes wyposażono salę operacyjną schroniska i centrum rehabilitacji psów gminy Famagusta; burmistrz Süleyman Uluçay podziękował Ozanowi Dökmecioğlu."
    },
    "tags": {
      "tr": [
        "DND Homes",
        "Sosyal sorumluluk"
      ],
      "en": [
        "DND Homes",
        "Social responsibility"
      ],
      "de": [
        "DND Homes",
        "Soziales Engagement"
      ],
      "ru": [
        "DND Homes",
        "Социальная ответственность"
      ],
      "pl": [
        "DND Homes",
        "Odpowiedzialność społeczna"
      ]
    }
  },
  {
    "id": "kibrisvizyon-2026-10-25",
    "outlet": "Kıbrıs Vizyon",
    "url": "https://www.kibrisvizyon.com/haber/dnd-cyprustan-yerli-ailelere-ozel-neocity-projesi-4695",
    "date": "2026-10-25",
    "cover": "/news/kibrisvizyon-neocity.webp",
    "title": {
      "tr": "DND Cyprus’tan Yerli Ailelere Özel NeoCity Projesi",
      "en": "NeoCity: A New DND Cyprus Project for Local Families",
      "de": "NeoCity: Neues Projekt von DND Cyprus für einheimische Familien",
      "ru": "NeoCity: новый проект DND Cyprus для местных семей",
      "pl": "NeoCity: nowy projekt DND Cyprus dla lokalnych rodzin"
    },
    "excerpt": {
      "tr": "DND Cyprus, Gazimağusa bölgesinde Doğu Akdeniz Üniversitesi’ne yakın geliştirdiği NeoCity projesinin ilk etabını satışa çıkardı. Modern Akdeniz mimarisi, özel bahçeler ve aile odaklı mahalle konseptiyle tasarlanan villalarda ödemeler, faiz, banka, kefil, kur farkı ve vade farkı olmadan 5 Sıfır modeliyle Türk lirası üzerinden yapılıyor.",
      "en": "DND Cyprus has put the first phase of NeoCity on sale, near Eastern Mediterranean University in the Famagusta region. The villas combine modern Mediterranean architecture, private gardens and a family-focused neighbourhood concept; payments are made in Turkish lira under the 5 Zeros model, with no interest, bank, guarantor, exchange-rate difference or maturity charge.",
      "de": "DND Cyprus hat die erste Bauphase von NeoCity in der Region Famagusta, nahe der Eastern Mediterranean University, in den Verkauf gebracht. Die Villen verbinden moderne mediterrane Architektur, Privatgärten und ein familienorientiertes Nachbarschaftskonzept; gezahlt wird in türkischer Lira nach dem 5-Null-Modell – ohne Zinsen, Bank, Bürgen, Wechselkurs- oder Laufzeitaufschlag.",
      "ru": "DND Cyprus открыла продажи первой очереди NeoCity в районе Фамагусты, рядом с Eastern Mediterranean University. Виллы в современном средиземноморском стиле с частными садами и концепцией семейного квартала; оплата в турецких лирах по модели «5 нулей» — без процентов, банка, поручителя, курсовой разницы и надбавки за рассрочку.",
      "pl": "DND Cyprus rozpoczęła sprzedaż pierwszego etapu NeoCity w regionie Famagusty, w pobliżu Eastern Mediterranean University. Wille łączą nowoczesną architekturę śródziemnomorską, prywatne ogrody i koncepcję rodzinnego osiedla; płatności w lirach tureckich w modelu „5 zer” — bez odsetek, banku, poręczyciela, różnic kursowych i dopłat za raty."
    },
    "tags": {
      "tr": [
        "NeoCity",
        "5 Sıfır"
      ],
      "en": [
        "NeoCity",
        "5 Zeros"
      ],
      "de": [
        "NeoCity",
        "5-Null-Modell"
      ],
      "ru": [
        "NeoCity",
        "«5 нулей»"
      ],
      "pl": [
        "NeoCity",
        "„5 zer”"
      ]
    }
  },
  {
    "id": "bestlife-2026-10-14",
    "outlet": "Bestlife Magazin",
    "url": "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    "date": "2026-10-14",
    "cover": "/news/bestlife-tl-konut-modeli-v3.webp",
    "title": {
      "tr": "Kuzey Kıbrıs’ta sterlinle borçlanmadan ev sahibi olma fırsatı!",
      "en": "A Chance to Own a Home in North Cyprus Without Borrowing in Sterling",
      "de": "Eigentum in Nordzypern – ohne Schulden in Pfund Sterling",
      "ru": "Шанс стать владельцем дома на Северном Кипре без долгов в фунтах стерлингов",
      "pl": "Własny dom na Cyprze Północnym bez zadłużania się w funtach"
    },
    "excerpt": {
      "tr": "DND Cyprus Kurucusu Ozan Dökmecioğlu, gelirini Türk lirasıyla kazananlar için yeni bir konut finansman modeli geliştirdi. Ödüllü Lagoon Verde projesindeki sınırlı sayıdaki rezidansta ödemeler Türk lirasıyla yapılıyor; 60 aya kadar faizsiz ve vade farksız taksitler, sterlin kuruna değil KKTC asgari ücretindeki artış oranına göre dönemsel olarak güncelleniyor. Model, Kuzey Kıbrıs’ta tatil, yaşam ya da yatırım amaçlı ev sahibi olmak isteyenlere döviz yükü olmadan alternatif bir yol sunuyor.",
      "en": "DND Cyprus founder Ozan Dökmecioğlu has developed a new home financing model for buyers who earn in Turkish lira. For a limited number of residences at the award-winning Lagoon Verde project, payments are made in Turkish lira; instalments of up to 60 months are interest-free with no maturity difference, and are updated periodically in line with the TRNC minimum wage increase rather than the sterling exchange rate. The model offers an alternative way to own a home in North Cyprus — for holidays, living or investment — without currency risk.",
      "de": "Ozan Dökmecioğlu, Gründer von DND Cyprus, hat ein neues Finanzierungsmodell für Käufer mit Einkommen in Türkischer Lira entwickelt. Für eine begrenzte Zahl von Wohnungen im preisgekrönten Projekt Lagoon Verde wird in Türkischer Lira gezahlt; die Raten über bis zu 60 Monate sind zinsfrei und ohne Laufzeitaufschlag und werden regelmäßig an die Erhöhung des Mindestlohns in der TRNZ angepasst – nicht an den Wechselkurs des Pfund Sterling. So bietet das Modell einen alternativen Weg zum Eigenheim in Nordzypern – für den Urlaub, zum Wohnen oder als Investition – ohne Währungsrisiko.",
      "ru": "Основатель DND Cyprus Ozan Dökmecioğlu разработал новую модель финансирования жилья для покупателей с доходом в турецких лирах. Для ограниченного числа резиденций в отмеченном наградами проекте Lagoon Verde платежи вносятся в турецких лирах: рассрочка до 60 месяцев — без процентов и без наценки за срок, а взносы периодически пересматриваются вслед за ростом минимальной зарплаты в ТРСК, а не по курсу фунта стерлингов. Модель открывает альтернативный путь к собственному дому на Северном Кипре — для отдыха, жизни или инвестиций — без валютного риска.",
      "pl": "Założyciel DND Cyprus, Ozan Dökmecioğlu, opracował nowy model finansowania zakupu domu dla osób zarabiających w lirach tureckich. W przypadku ograniczonej liczby rezydencji w nagradzanym projekcie Lagoon Verde płatności dokonuje się w lirach tureckich; raty rozłożone na maksymalnie 60 miesięcy są nieoprocentowane i bez dopłat za rozłożenie płatności, a ich wysokość jest okresowo aktualizowana zgodnie ze wzrostem płacy minimalnej w TRCP, a nie z kursem funta. Model ten daje alternatywną drogę do własnego domu na Cyprze Północnym – na wakacje, do zamieszkania lub jako inwestycji – bez ryzyka walutowego."
    },
    "tags": {
      "tr": [
        "Lagoon Verde",
        "TL Ödeme Modeli"
      ],
      "en": [
        "Lagoon Verde",
        "TL Payment Model"
      ],
      "de": [
        "Lagoon Verde",
        "TL-Zahlungsmodell"
      ],
      "ru": [
        "Lagoon Verde",
        "Оплата в лирах"
      ],
      "pl": [
        "Lagoon Verde",
        "Płatności w lirach"
      ]
    }
  },
  {
    "id": "fuardergisi-2026-10-19",
    "outlet": "Fuar Dergisi",
    "url": "https://www.fuardergisi.com.tr/dnd-cyprustan-kuzey-kibrista-sterlin-yerine-tl-ile-konut-satis-modeli",
    "date": "2026-10-19",
    "cover": "/news/fuardergisi-lagoon-verde-tl.webp",
    "title": {
      "tr": "DND Cyprus’tan Kuzey Kıbrıs’ta sterlin yerine TL ile konut satış modeli",
      "en": "DND Cyprus Offers Homes in North Cyprus in Turkish Lira Instead of Sterling",
      "de": "DND Cyprus verkauft Wohnungen in Nordzypern in Lira statt in Pfund",
      "ru": "DND Cyprus продаёт жильё на Северном Кипре за лиры вместо фунтов",
      "pl": "DND Cyprus sprzedaje domy na Cyprze Północnym za liry zamiast funtów"
    },
    "excerpt": {
      "tr": "DND Cyprus, Lagoon Verde projesindeki sınırlı sayıda rezidans için Türk lirası bazlı yeni bir ödeme modeli geliştirdi. Şirket finansmanıyla sunulan 60 aya kadar vadeli planda ödemeler Türk lirasıyla yapılıyor; taksitler sterlin kuru yerine KKTC asgari ücretindeki artış oranına göre dönemsel olarak güncelleniyor.",
      "en": "DND Cyprus has introduced a Turkish lira payment model for a limited number of residences at Lagoon Verde. Under the company-financed plan of up to 60 months, payments are made in lira and instalments are updated periodically in line with the TRNC minimum wage increase rather than the sterling exchange rate.",
      "de": "DND Cyprus hat für eine begrenzte Zahl von Residenzen in Lagoon Verde ein Zahlungsmodell in Türkischer Lira eingeführt. Beim vom Unternehmen finanzierten Plan mit bis zu 60 Monaten Laufzeit wird in Lira gezahlt; die Raten werden regelmäßig an die Erhöhung des Mindestlohns in der TRNZ statt an den Pfundkurs angepasst.",
      "ru": "DND Cyprus ввела модель оплаты в турецких лирах для ограниченного числа резиденций в Lagoon Verde. По плану с финансированием от компании сроком до 60 месяцев платежи вносятся в лирах, а взносы периодически пересматриваются вслед за ростом минимальной зарплаты в ТРСК, а не по курсу фунта.",
      "pl": "DND Cyprus wprowadził model płatności w lirach tureckich dla ograniczonej liczby apartamentów w Lagoon Verde. W planie finansowanym przez firmę, na okres do 60 miesięcy, płatności dokonuje się w lirach, a raty są okresowo aktualizowane zgodnie ze wzrostem płacy minimalnej w TRCP, a nie kursem funta."
    },
    "tags": {
      "tr": [
        "Lagoon Verde",
        "TL Ödeme Modeli"
      ],
      "en": [
        "Lagoon Verde",
        "TL Payment Model"
      ],
      "de": [
        "Lagoon Verde",
        "TL-Zahlungsmodell"
      ],
      "ru": [
        "Lagoon Verde",
        "Оплата в лирах"
      ],
      "pl": [
        "Lagoon Verde",
        "Płatności w lirach"
      ]
    }
  },
  {
    "id": "50fifty-2026-10-14",
    "outlet": "50fifty Magazin",
    "url": "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    "date": "2026-10-14",
    "cover": "/news/50fifty-haber-kapak-v2.webp",
    "title": {
      "tr": "DND Cyprus’tan 60 aya kadar faizsiz, vade farksız TL konut modeli",
      "en": "Up to 60 Months Interest-Free: DND Cyprus’ Turkish Lira Home Financing",
      "de": "Bis zu 60 Monate zinsfrei: die Lira-Finanzierung von DND Cyprus",
      "ru": "До 60 месяцев без процентов: финансирование жилья в турецких лирах от DND Cyprus",
      "pl": "Do 60 miesięcy bez odsetek: finansowanie domu w lirach tureckich od DND Cyprus"
    },
    "excerpt": {
      "tr": "Kurucu Ozan Dökmecioğlu’nun duyurduğu modelde ödemeler Türk lirasıyla yapılıyor; taksitler sterline değil KKTC asgari ücretindeki artışa bağlı olarak güncelleniyor. Lagoon Verde’deki sınırlı sayıda rezidans için geçerli plan, 60 aya kadar faizsiz ve vade farksız ödeme sunuyor.",
      "en": "Announced by founder Ozan Dökmecioğlu, the model lets buyers pay in Turkish lira, with instalments tied to TRNC minimum wage increases instead of sterling. Valid for a limited number of residences at Lagoon Verde, the plan offers up to 60 months of interest-free payments with no maturity difference.",
      "de": "Das von Gründer Ozan Dökmecioğlu vorgestellte Modell ermöglicht Käufern die Zahlung in Türkischer Lira; die Raten orientieren sich an den Mindestlohnerhöhungen in der TRNZ statt am Pfund Sterling. Das Angebot gilt für eine begrenzte Zahl von Wohnungen in Lagoon Verde und umfasst bis zu 60 Monate zinsfreie Zahlung ohne Laufzeitaufschlag.",
      "ru": "Модель, представленная основателем компании Ozan Dökmecioğlu, позволяет платить в турецких лирах, а взносы привязаны к росту минимальной зарплаты в ТРСК, а не к курсу фунта стерлингов. Предложение действует для ограниченного числа резиденций в Lagoon Verde и включает рассрочку до 60 месяцев без процентов и без наценки за срок.",
      "pl": "Ogłoszony przez założyciela firmy, Ozana Dökmecioğlu, model pozwala kupującym płacić w lirach tureckich, a wysokość rat jest powiązana ze wzrostem płacy minimalnej w TRCP zamiast z kursem funta. Oferta obejmuje ograniczoną liczbę rezydencji w Lagoon Verde i przewiduje do 60 miesięcy nieoprocentowanych płatności bez dopłat za rozłożenie na raty."
    },
    "tags": {
      "tr": [
        "TL Ödeme Modeli",
        "DND Cyprus"
      ],
      "en": [
        "TL Payment Model",
        "DND Cyprus"
      ],
      "de": [
        "TL-Zahlungsmodell",
        "DND Cyprus"
      ],
      "ru": [
        "Оплата в лирах",
        "DND Cyprus"
      ],
      "pl": [
        "Płatności w lirach",
        "DND Cyprus"
      ]
    }
  },
  {
    "id": "ekonomist-2026-09-30",
    "outlet": "Ekonomist",
    "url": "https://www.ekonomist.com.tr/talip-yilmaz/dnd-cyprus-tan-kktc-de-50-milyon-dolarlik-yatirim--79348",
    "date": "2026-09-30",
    "cover": "/news/ekonomist-dnd-50-milyon-yatirim.webp",
    "title": {
      "tr": "DND Cyprus’tan KKTC’de 50 milyon dolarlık yatırım",
      "en": "DND Cyprus Makes a $50 Million Investment in North Cyprus",
      "de": "DND Cyprus investiert 50 Millionen Dollar in Nordzypern",
      "ru": "DND Cyprus инвестирует 50 млн долларов в Северный Кипр",
      "pl": "DND Cyprus inwestuje 50 mln dolarów na Cyprze Północnym"
    },
    "excerpt": {
      "tr": "Ekonomist yazarı Talip Yılmaz, DND Cyprus’un üç yılda Kuzey Kıbrıs’ta yaptığı gayrimenkul yatırımlarını kaleme aldı. Yazıda İskele’deki La Joya projelerinin başarısı, La Joya’nın tamamlanması ve şirketin bölgedeki yeni projeleri öne çıkıyor.",
      "en": "Ekonomist columnist Talip Yılmaz writes about DND Cyprus’ three years of real estate investment in North Cyprus, highlighting the success of its La Joya projects in İskele, the completion of La Joya and the company’s new developments in the region.",
      "de": "Ekonomist-Kolumnist Talip Yılmaz schreibt über drei Jahre Immobilieninvestitionen von DND Cyprus in Nordzypern – über den Erfolg der La-Joya-Projekte in İskele, die Fertigstellung von La Joya und die neuen Projekte des Unternehmens in der Region.",
      "ru": "Колумнист Ekonomist Талип Йылмаз рассказывает о трёх годах инвестиций DND Cyprus в недвижимость Северного Кипра: об успехе проектов La Joya в Искеле, завершении La Joya и новых проектах компании в регионе.",
      "pl": "Felietonista Ekonomist Talip Yılmaz opisuje trzy lata inwestycji DND Cyprus w nieruchomości na Cyprze Północnym: sukces projektów La Joya w İskele, ukończenie La Joya i nowe inwestycje firmy w regionie."
    },
    "tags": {
      "tr": [
        "Yatırım",
        "La Joya"
      ],
      "en": [
        "Investment",
        "La Joya"
      ],
      "de": [
        "Investition",
        "La Joya"
      ],
      "ru": [
        "Инвестиции",
        "La Joya"
      ],
      "pl": [
        "Inwestycje",
        "La Joya"
      ]
    }
  },
  {
    "id": "nethaber-2026-09-29",
    "outlet": "Net Haber",
    "url": "https://www.nethaber.com.tr/haber/orta-dogudaki-catismalar-yatirim-rotasini-degistirdi-kktc-cazibe-merkezi-oldu-1009797",
    "date": "2026-09-29",
    "cover": "/news/nethaber-la-joya-havadan.webp",
    "title": {
      "tr": "Orta Doğu'daki çatışmalar yatırım rotasını değiştirdi: KKTC cazibe merkezi oldu",
      "en": "Conflicts in the Middle East Reshape Investment Routes: North Cyprus Becomes a Magnet",
      "de": "Konflikte im Nahen Osten verändern Investitionsrouten: Nordzypern wird zum Anziehungspunkt",
      "ru": "Конфликты на Ближнем Востоке меняют инвестиционные маршруты: Северный Кипр становится центром притяжения",
      "pl": "Konflikty na Bliskim Wschodzie zmieniają szlaki inwestycyjne: Cypr Północny przyciąga kapitał"
    },
    "excerpt": {
      "tr": "İHA’ya konuşan DND Cyprus Yönetim Kurulu Başkanı Ozan Dökmecioğlu, bölgedeki gelişmelerin ardından yatırımcıların Kuzey Kıbrıs’a ilgisinin arttığını anlattı; döviz bazlı kira gelirinin ve kısa amortisman süresinin öne çıktığını vurguladı.",
      "en": "Speaking to İHA, DND Cyprus Chairman Ozan Dökmecioğlu explains how investor interest in North Cyprus has grown after recent regional developments, pointing to foreign-currency rental income and short payback periods.",
      "de": "Im Gespräch mit İHA erläutert DND-Cyprus-Vorstandsvorsitzender Ozan Dökmecioğlu, warum das Interesse von Investoren an Nordzypern nach den jüngsten Entwicklungen in der Region gestiegen ist – mit Mieteinnahmen in Fremdwährung und kurzen Amortisationszeiten.",
      "ru": "В интервью агентству İHA председатель совета директоров DND Cyprus Озан Дёкмеджиоглу объясняет, почему после событий в регионе вырос интерес инвесторов к Северному Кипру, и выделяет арендный доход в валюте и короткий срок окупаемости.",
      "pl": "W rozmowie z agencją İHA prezes DND Cyprus Ozan Dökmecioğlu wyjaśnia, dlaczego po ostatnich wydarzeniach w regionie wzrosło zainteresowanie inwestorów Cyprem Północnym, wskazując na dochód z najmu w walutach i krótki okres zwrotu."
    },
    "tags": {
      "tr": [
        "Röportaj",
        "Yatırım"
      ],
      "en": [
        "Interview",
        "Investment"
      ],
      "de": [
        "Interview",
        "Investition"
      ],
      "ru": [
        "Интервью",
        "Инвестиции"
      ],
      "pl": [
        "Wywiad",
        "Inwestycje"
      ]
    }
  },
  {
    "id": "halkinsesi-2026-09-26",
    "outlet": "Halkın Sesi",
    "url": "https://www.halkinsesikibris.com/sampiyon-larnaka-gencler-birligi-u17-takimi-sponsoruyla-yemekte-bulustu",
    "date": "2026-09-26",
    "cover": "/news/halkinsesi-larnaka-u17.webp",
    "title": {
      "tr": "Şampiyon Larnaka Gençler Birliği U17 takımı, sponsoruyla yemekte buluştu",
      "en": "Champion Larnaka Gençler Birliği U17 Team Meets Its Sponsor over Dinner",
      "de": "Meistermannschaft: Die U17 von Larnaka Gençler Birliği trifft ihren Sponsor zum Abendessen",
      "ru": "Команда-чемпион U17 «Ларнака Генчлер Бирлиги» встретилась со спонсором за ужином",
      "pl": "Mistrzowska drużyna U17 Larnaka Gençler Birliği spotkała się ze sponsorem na kolacji"
    },
    "excerpt": {
      "tr": "Şampiyonluğa ulaşan Larnaka Gençler Birliği U17 takımı, sponsoru DND Cyprus’un ev sahipliğinde verilen yemekte bir araya geldi. Gecede başarı kutlanırken genç sporculara yapılan yatırımın önemi vurgulandı.",
      "en": "The championship-winning Larnaka Gençler Birliği U17 team came together at a dinner hosted by its sponsor DND Cyprus. The evening celebrated the title and underlined the value of investing in young athletes.",
      "de": "Die U17-Mannschaft von Larnaka Gençler Birliği feierte ihren Meistertitel bei einem Abendessen auf Einladung ihres Sponsors DND Cyprus. Dabei wurde betont, wie wichtig Investitionen in junge Sportler sind.",
      "ru": "Команда U17 «Ларнака Генчлер Бирлиги», завоевавшая чемпионский титул, собралась на ужине, который устроил её спонсор DND Cyprus. Вечер был посвящён победе и важности инвестиций в молодых спортсменов.",
      "pl": "Drużyna U17 Larnaka Gençler Birliği, która zdobyła mistrzostwo, spotkała się na kolacji wydanej przez sponsora, DND Cyprus. Podczas wieczoru świętowano sukces i podkreślano znaczenie inwestowania w młodych sportowców."
    },
    "tags": {
      "tr": [
        "Spor",
        "Sponsorluk"
      ],
      "en": [
        "Sport",
        "Sponsorship"
      ],
      "de": [
        "Sport",
        "Sponsoring"
      ],
      "ru": [
        "Спорт",
        "Спонсорство"
      ],
      "pl": [
        "Sport",
        "Sponsoring"
      ]
    }
  },
  {
    "id": "kibrisvizyon-2026-09-24",
    "outlet": "Kıbrıs Vizyon",
    "url": "https://www.kibrisvizyon.com/haber/dnd-cyprus-ile-iskelede-yeni-bir-yasam-anlayisi-4690",
    "date": "2026-09-24",
    "cover": "/news/kibrisvizyon-iskele-yasam.webp",
    "title": {
      "tr": "DND Cyprus ile İskele’de Yeni Bir Yaşam Anlayışı",
      "en": "A New Way of Living in İskele with DND Cyprus",
      "de": "Mit DND Cyprus ein neues Lebensgefühl in İskele",
      "ru": "Новый образ жизни в Искеле с DND Cyprus",
      "pl": "Nowy styl życia w İskele z DND Cyprus"
    },
    "excerpt": {
      "tr": "Boston’daki gayrimenkul deneyimini Kuzey Kıbrıs’a taşıyan Netice ve Ozan Dökmecioğlu’nun İskele’deki projeleri anlatılıyor. DND Cyprus’un kurucu ortağı Netice Dökmecioğlu’nun görüşleriyle La Joya, La Joya Perla, La Joya Perla II ve Lagoon Verde ile La Joya’daki Joy Cafe öne çıkıyor; konut yatırımı sosyal yaşam ve turizmle buluşuyor.",
      "en": "The article tells the story of Netice and Ozan Dökmecioğlu, who brought their Boston real estate experience to North Cyprus and focused on İskele. With insights from DND Cyprus co-founder Netice Dökmecioğlu, it highlights La Joya, La Joya Perla, La Joya Perla II and Lagoon Verde, as well as Joy Cafe at La Joya, where home ownership meets social life and tourism.",
      "de": "Der Beitrag erzählt, wie Netice und Ozan Dökmecioğlu ihre Immobilienerfahrung aus Boston nach Nordzypern brachten und sich auf İskele konzentrierten. Mit Stimmen von DND-Cyprus-Mitgründerin Netice Dökmecioğlu stehen La Joya, La Joya Perla, La Joya Perla II und Lagoon Verde sowie das Joy Cafe in La Joya im Mittelpunkt – Wohnen trifft auf soziales Leben und Tourismus.",
      "ru": "Статья рассказывает, как Netice и Ozan Dökmecioğlu перенесли опыт работы с недвижимостью в Бостоне на Северный Кипр и сосредоточились на Искеле. Со слов соучредителя DND Cyprus Netice Dökmecioğlu — о проектах La Joya, La Joya Perla, La Joya Perla II и Lagoon Verde, а также о Joy Cafe в La Joya: жильё, общение и туризм в одном месте.",
      "pl": "Artykuł opowiada, jak Netice i Ozan Dökmecioğlu przenieśli doświadczenie z rynku nieruchomości w Bostonie na Cypr Północny i skupili się na İskele. W wypowiedziach współzałożycielki DND Cyprus Netice Dökmecioğlu pojawiają się La Joya, La Joya Perla, La Joya Perla II i Lagoon Verde oraz Joy Cafe w La Joya — mieszkanie łączy się z życiem towarzyskim i turystyką."
    },
    "tags": {
      "tr": [
        "Röportaj",
        "İskele"
      ],
      "en": [
        "Interview",
        "İskele"
      ],
      "de": [
        "Interview",
        "İskele"
      ],
      "ru": [
        "Интервью",
        "Искеле"
      ],
      "pl": [
        "Wywiad",
        "İskele"
      ]
    }
  },
  {
    "id": "yeniduzen-2026-09-16",
    "outlet": "YENİDÜZEN",
    "url": "https://www.yeniduzen.com/joy-cafe-bar-iskelede-hizmete-acildi-199408h.htm",
    "date": "2026-09-16",
    "cover": "/news/yeniduzen-joy-cafe-bar.webp",
    "title": {
      "tr": "Joy Cafe & Bar İskele’de hizmete açıldı",
      "en": "Joy Cafe & Bar Opens in İskele",
      "de": "Joy Cafe & Bar in İskele eröffnet",
      "ru": "В Искеле открылся Joy Cafe & Bar",
      "pl": "Joy Cafe & Bar otwarte w İskele"
    },
    "excerpt": {
      "tr": "DND Cyprus’un İskele’deki La Joya Rezidansları ve Tatil Köyü bünyesinde Joy Cafe & Bar kapılarını açtı. Havuz başındaki mekân rezidans sakinlerinin ve otel misafirlerinin yanı sıra İskele halkına ve bölge ziyaretçilerine de açık.",
      "en": "Joy Cafe & Bar has opened within DND Cyprus’ La Joya Residences & Resort in İskele. The poolside venue welcomes residents and hotel guests as well as locals and visitors to the area.",
      "de": "In der La Joya Residences & Resort von DND Cyprus in İskele hat die Joy Cafe & Bar eröffnet. Der Ort am Pool steht Bewohnern und Hotelgästen ebenso offen wie Einheimischen und Besuchern der Region.",
      "ru": "На территории La Joya Residences & Resort от DND Cyprus в Искеле открылся Joy Cafe & Bar. Заведение у бассейна открыто для жителей и гостей отеля, а также для местных жителей и гостей региона.",
      "pl": "W La Joya Residences & Resort firmy DND Cyprus w İskele otwarto Joy Cafe & Bar. Lokal przy basenie jest otwarty dla mieszkańców i gości hotelu, a także dla lokalnej społeczności i odwiedzających region."
    },
    "tags": {
      "tr": [
        "La Joya",
        "Açılış"
      ],
      "en": [
        "La Joya",
        "Opening"
      ],
      "de": [
        "La Joya",
        "Eröffnung"
      ],
      "ru": [
        "La Joya",
        "Открытие"
      ],
      "pl": [
        "La Joya",
        "Otwarcie"
      ]
    }
  },
  {
    "id": "yeniduzen-2026-08-17",
    "outlet": "YENİDÜZEN",
    "url": "https://www.yeniduzen.com/dnd-cyprustan-sanata-ve-yaratici-uretime-destek-tus-festival-yolculuguna-basladi-198450h.htm",
    "date": "2026-08-17",
    "cover": "/news/yeniduzen-tus-kisa-film.webp",
    "title": {
      "tr": "DND Cyprus’tan sanata ve yaratıcı üretime destek: “tüş” Festival yolculuğuna başladı",
      "en": "DND Cyprus Supports Art and Creative Work: “tüş” Begins Its Festival Journey",
      "de": "DND Cyprus fördert Kunst und kreatives Schaffen: „tüş“ startet seine Festivalreise",
      "ru": "DND Cyprus поддерживает искусство и творчество: фильм «tüş» начал фестивальный путь",
      "pl": "DND Cyprus wspiera sztukę i twórczość: film „tüş” rusza w festiwalową podróż"
    },
    "excerpt": {
      "tr": "DND Cyprus, Cansu Ezgi Bozkurt’un yönettiği deneysel kısa film “tüş”ün destekçileri arasında yer aldı; film Türkiye ve Avrupa’daki festivallere katılıyor. Kurucu ortak Netice Dökmecioğlu, kadınların sanat ve yaratıcı sektörlerde desteklenmesinin önemine dikkat çekti.",
      "en": "DND Cyprus is among the supporters of “tüş”, an experimental short film directed by Cansu Ezgi Bozkurt that is screening at festivals in Türkiye and Europe. Co-founder Netice Dökmecioğlu stressed the importance of supporting women in the arts and creative industries.",
      "de": "DND Cyprus gehört zu den Unterstützern des experimentellen Kurzfilms „tüş“ von Regisseurin Cansu Ezgi Bozkurt, der auf Festivals in der Türkei und in Europa gezeigt wird. Mitgründerin Netice Dökmecioğlu betonte, wie wichtig die Förderung von Frauen in Kunst und Kreativwirtschaft ist.",
      "ru": "DND Cyprus вошла в число партнёров экспериментального короткометражного фильма «tüş» режиссёра Джансу Эзги Бозкурт, который участвует в фестивалях Турции и Европы. Сооснователь компании Нетидже Дёкмеджиоглу подчеркнула важность поддержки женщин в искусстве и креативных индустриях.",
      "pl": "DND Cyprus jest jednym z partnerów eksperymentalnego filmu krótkometrażowego „tüş” w reżyserii Cansu Ezgi Bozkurt, pokazywanego na festiwalach w Turcji i Europie. Współzałożycielka Netice Dökmecioğlu podkreśliła, jak ważne jest wspieranie kobiet w sztuce i branżach kreatywnych."
    },
    "tags": {
      "tr": [
        "Sanat",
        "Sponsorluk"
      ],
      "en": [
        "Art",
        "Sponsorship"
      ],
      "de": [
        "Kunst",
        "Sponsoring"
      ],
      "ru": [
        "Искусство",
        "Спонсорство"
      ],
      "pl": [
        "Sztuka",
        "Sponsoring"
      ]
    }
  },
  {
    "id": "mha-2026-07-30",
    "outlet": "Mağusa Haber Ajansı (MHA)",
    "url": "https://www.mhahaber.com/dokmecioglu-iskelenin-potansiyelini-erken-gorduk",
    "date": "2026-07-30",
    "cover": "/news/mha-iskele-potansiyel.webp",
    "title": {
      "tr": "DÖKMECİOĞLU: İSKELE'NİN POTANSİYELİNİ ERKEN GÖRDÜK",
      "en": "Dökmecioğlu: We Saw İskele’s Potential Early",
      "de": "Dökmecioğlu: Wir haben das Potenzial von İskele früh erkannt",
      "ru": "Дёкмеджиоглу: мы рано увидели потенциал Искеле",
      "pl": "Dökmecioğlu: wcześnie dostrzegliśmy potencjał İskele"
    },
    "excerpt": {
      "tr": "Ozan Dökmecioğlu, İskele’nin potansiyelini erken gördüklerini ve yalnızca konut değil yaşam destinasyonları inşa ettiklerini anlattı. La Joya, La Joya Perla, Perla II, Lagoon Verde ve beach club projelerini tek bir vizyonun parçaları olarak değerlendirdi.",
      "en": "Ozan Dökmecioğlu explains that DND saw İskele’s potential early and builds not just homes but destinations for living, describing La Joya, La Joya Perla, Perla II, Lagoon Verde and the beach club as parts of a single vision.",
      "de": "Ozan Dökmecioğlu erzählt, dass DND das Potenzial von İskele früh erkannt hat und nicht nur Wohnungen, sondern Lebensorte baut. La Joya, La Joya Perla, Perla II, Lagoon Verde und den Beach Club sieht er als Teile einer gemeinsamen Vision.",
      "ru": "Озан Дёкмеджиоглу рассказывает, что DND рано разглядела потенциал Искеле и строит не просто жильё, а пространства для жизни. La Joya, La Joya Perla, Perla II, Lagoon Verde и бич-клуб он называет частями единого замысла.",
      "pl": "Ozan Dökmecioğlu opowiada, że DND wcześnie dostrzegło potencjał İskele i buduje nie tylko mieszkania, lecz miejsca do życia. La Joya, La Joya Perla, Perla II, Lagoon Verde i beach club traktuje jako części jednej wizji."
    },
    "tags": {
      "tr": [
        "Röportaj",
        "İskele"
      ],
      "en": [
        "Interview",
        "İskele"
      ],
      "de": [
        "Interview",
        "İskele"
      ],
      "ru": [
        "Интервью",
        "Искеле"
      ],
      "pl": [
        "Wywiad",
        "İskele"
      ]
    }
  },
  {
    "id": "haberturk-2026-03-11",
    "outlet": "Habertürk",
    "url": "https://yerel-haberler.haberturk.com/kayseri-haberleri/abdye-400-milyon-dolarlik-portfoy-116967814",
    "date": "2026-03-11",
    "cover": "/news/haberturk-400-milyon-portfoy.webp",
    "title": {
      "tr": "ABD'ye 400 milyon dolarlık portföy",
      "en": "A $400 Million Portfolio Built in the USA",
      "de": "Ein Portfolio von 400 Millionen Dollar in den USA",
      "ru": "Портфель в 400 млн долларов в США",
      "pl": "Portfel wart 400 mln dolarów w USA"
    },
    "excerpt": {
      "tr": "İHA kaynaklı haberde DND Cyprus’un kurucusu Ozan Dökmecioğlu’nun DND Homes ile ABD’de ve Kuzey Kıbrıs’ta oluşturduğu yatırım portföyü anlatılıyor; Boston ve Cambridge’deki konut projelerine yer veriliyor.",
      "en": "This İHA story profiles DND Cyprus founder Ozan Dökmecioğlu and the investment portfolio he has built with DND Homes in the USA and North Cyprus, including residential projects in Boston and Cambridge.",
      "de": "Die İHA-Meldung porträtiert DND-Cyprus-Gründer Ozan Dökmecioğlu und das Investitionsportfolio, das er mit DND Homes in den USA und in Nordzypern aufgebaut hat – darunter Wohnprojekte in Boston und Cambridge.",
      "ru": "Материал İHA рассказывает об основателе DND Cyprus Озане Дёкмеджиоглу и инвестиционном портфеле, который он создал вместе с DND Homes в США и на Северном Кипре, включая жилые проекты в Бостоне и Кембридже.",
      "pl": "Materiał agencji İHA przedstawia założyciela DND Cyprus Ozana Dökmecioğlu i portfel inwestycji, który zbudował z DND Homes w USA i na Cyprze Północnym, w tym projekty mieszkaniowe w Bostonie i Cambridge."
    },
    "tags": {
      "tr": [
        "DND Homes",
        "Boston"
      ],
      "en": [
        "DND Homes",
        "Boston"
      ],
      "de": [
        "DND Homes",
        "Boston"
      ],
      "ru": [
        "DND Homes",
        "Бостон"
      ],
      "pl": [
        "DND Homes",
        "Boston"
      ]
    }
  },
  {
    "id": "gundemkibris-2026-02-08",
    "outlet": "Gündem Kıbrıs",
    "url": "https://www.gundemkibris.com/kktc-turizm-ve-basari-odul-toreni-les-ambassadeurs-hotelde-gerceklesti",
    "date": "2026-02-08",
    "cover": "/news/gundemkibris-turizm-basari-odulu.webp",
    "title": {
      "tr": "KKTC Turizm ve Başarı Ödül Töreni, Les Ambassadeurs Hotel’de gerçekleşti",
      "en": "TRNC Tourism and Achievement Awards Held at Les Ambassadeurs Hotel",
      "de": "Tourismus- und Erfolgspreise der TRNZ im Les Ambassadeurs Hotel verliehen",
      "ru": "Церемония премии «Туризм и успех ТРСК» прошла в отеле Les Ambassadeurs",
      "pl": "Gala nagród „Turystyka i Sukces” TRNC w hotelu Les Ambassadeurs"
    },
    "excerpt": {
      "tr": "Başbakan Yardımcılığı ve Turizm Bakanlığı himayesinde Girne’de düzenlenen KKTC Turizm ve Başarı Ödül Töreni’nde Ozan Dökmecioğlu, “Yılın En İyi Proje Geliştirme Şirketi” ödülüne layık görüldü.",
      "en": "At the TRNC Tourism and Achievement Awards in Kyrenia, held under the auspices of the Deputy Prime Ministry and Ministry of Tourism, Ozan Dökmecioğlu received the “Best Project Development Company of the Year” award.",
      "de": "Bei der Verleihung der Tourismus- und Erfolgspreise in Kyrenia unter der Schirmherrschaft des Vizepremierministeriums und des Tourismusministeriums wurde Ozan Dökmecioğlu als „Bestes Projektentwicklungsunternehmen des Jahres“ ausgezeichnet.",
      "ru": "На церемонии вручения премии «Туризм и успех» в Кирении, проходившей под патронатом вице-премьерства и Министерства туризма, Озан Дёкмеджиоглу получил награду «Лучшая девелоперская компания года».",
      "pl": "Podczas gali nagród „Turystyka i Sukces” w Kyrenii, zorganizowanej pod patronatem wicepremiera i Ministerstwa Turystyki, Ozan Dökmecioğlu otrzymał nagrodę „Najlepsza firma deweloperska roku”."
    },
    "tags": {
      "tr": [
        "Ödül"
      ],
      "en": [
        "Award"
      ],
      "de": [
        "Auszeichnung"
      ],
      "ru": [
        "Награда"
      ],
      "pl": [
        "Nagroda"
      ]
    }
  },
  {
    "id": "mha-2025-11-04",
    "outlet": "Mağusa Haber Ajansı (MHA)",
    "url": "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    "date": "2025-11-04",
    "cover": "/news/mhacover.webp",
    "title": {
      "tr": "DND MÜJDEYİ VERDİ: LA JOYA TAMAMLANDI",
      "en": "DND Announced the Good News: La Joya is Completed",
      "de": "DND verkündet die gute Nachricht: La Joya ist fertiggestellt",
      "ru": "DND сообщила радостную новость: La Joya завершён",
      "pl": "DND ogłasza dobrą wiadomość: La Joya ukończona"
    },
    "excerpt": {
      "tr": "DND Cyprus, İskele Long Beach’teki La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu. 74 özel rezidanstan oluşan proje artık sahiplerini ağırlamaya hazır.",
      "en": "DND Cyprus announced the completion of La Joya Residences and Holiday Village in İskele Long Beach. The project of 74 private residences is now ready to welcome its owners.",
      "de": "DND Cyprus hat die Fertigstellung der La Joya Residences and Holiday Village in İskele Long Beach bekannt gegeben. Das Projekt mit 74 privaten Wohnungen ist nun bereit für seine Eigentümer.",
      "ru": "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya в Long Beach (Искеле). Проект из 74 частных резиденций готов встречать своих владельцев.",
      "pl": "DND Cyprus ogłosił ukończenie rezydencji i wioski wakacyjnej La Joya w İskele Long Beach. Projekt obejmujący 74 prywatne rezydencje jest gotowy na przyjęcie właścicieli."
    },
    "tags": {
      "tr": [
        "La Joya",
        "DND Cyprus"
      ],
      "en": [
        "La Joya",
        "DND Cyprus"
      ],
      "de": [
        "La Joya",
        "DND Cyprus"
      ],
      "ru": [
        "La Joya",
        "DND Cyprus"
      ],
      "pl": [
        "La Joya",
        "DND Cyprus"
      ]
    }
  },
  {
    "id": "haberkibris-2025-11-04",
    "outlet": "Haber Kıbrıs",
    "url": "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    "date": "2025-11-04",
    "cover": "/news/hkcover.jpg",
    "title": {
      "tr": "DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
      "en": "DND Cyprus Announces the Completion of La Joya Residences and Holiday Village",
      "de": "DND Cyprus meldet die Fertigstellung der La Joya Residences and Holiday Village",
      "ru": "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya",
      "pl": "DND Cyprus ogłasza ukończenie rezydencji i wioski wakacyjnej La Joya"
    },
    "excerpt": {
      "tr": "La Joya Rezidansları ve Tatil Köyü tamamlandı: DND Cyprus, İskele Long Beach’teki projenin sahiplerini ağırlamaya hazır olduğunu açıkladı.",
      "en": "La Joya Residences and Holiday Village is complete: DND Cyprus announced that the İskele Long Beach project is ready to welcome its owners.",
      "de": "Die La Joya Residences and Holiday Village sind fertig: DND Cyprus meldet, dass das Projekt in İskele Long Beach bereit für seine Eigentümer ist.",
      "ru": "Резиденции и курортный комплекс La Joya завершены: DND Cyprus сообщила, что проект в Long Beach (Искеле) готов встречать своих владельцев.",
      "pl": "Rezydencje i wioska wakacyjna La Joya są gotowe: DND Cyprus ogłosił, że projekt w İskele Long Beach czeka już na swoich właścicieli."
    },
    "tags": {
      "tr": [
        "La Joya"
      ],
      "en": [
        "La Joya"
      ],
      "de": [
        "La Joya"
      ],
      "ru": [
        "La Joya"
      ],
      "pl": [
        "La Joya"
      ]
    }
  },
  {
    "id": "mha-2025-04-28",
    "outlet": "Mağusa Haber Ajansı (MHA)",
    "url": "https://www.mhahaber.com/dnd-kibris-property-nc-odullerine-damga-vurdu",
    "date": "2025-04-28",
    "cover": "/news/mha-propertync-2025-odulleri.webp",
    "title": {
      "tr": "DND KIBRIS, PROPERTY NC ÖDÜLLERİ'NE DAMGA VURDU",
      "en": "DND Cyprus Makes Its Mark at the Property NC Awards",
      "de": "DND Cyprus prägt die Property NC Awards",
      "ru": "DND Cyprus отличилась на премии Property NC Awards",
      "pl": "DND Cyprus wyróżnia się na Property NC Awards"
    },
    "excerpt": {
      "tr": "DND Kıbrıs, 2025 Property NC Ödülleri’nden üç ödülle döndü: En İyi Yeni Girişim (Altın), Lagoon Verde ile En İyi Önerilen Sosyo-Kültürel Gelişim (Altın) ve Mariachi Beach Club ile En İyi Önerilen Yeni Ticari Proje (Platin).",
      "en": "DND Cyprus came away from the 2025 Property NC Awards with three honours: Best Newcomer (Gold), Best Proposed Socio-Cultural Development (Gold) for Lagoon Verde and Best Proposed New Commercial Project (Platinum) for Mariachi Beach Club.",
      "de": "DND Cyprus erhielt bei den Property NC Awards 2025 drei Auszeichnungen: Bester Newcomer (Gold), beste geplante soziokulturelle Entwicklung (Gold) für Lagoon Verde und bestes geplantes neues Gewerbeprojekt (Platin) für den Mariachi Beach Club.",
      "ru": "На Property NC Awards 2025 DND Cyprus получила три награды: «Лучшая новая компания» (золото), «Лучший предлагаемый социокультурный проект» (золото) за Lagoon Verde и «Лучший предлагаемый новый коммерческий проект» (платина) за Mariachi Beach Club.",
      "pl": "Na Property NC Awards 2025 DND Cyprus zdobyło trzy nagrody: Najlepszy debiut (złoto), Najlepszy proponowany projekt społeczno-kulturalny (złoto) za Lagoon Verde oraz Najlepszy proponowany nowy projekt komercyjny (platyna) za Mariachi Beach Club."
    },
    "tags": {
      "tr": [
        "Ödül",
        "Lagoon Verde",
        "Mariachi"
      ],
      "en": [
        "Award",
        "Lagoon Verde",
        "Mariachi"
      ],
      "de": [
        "Auszeichnung",
        "Lagoon Verde",
        "Mariachi"
      ],
      "ru": [
        "Награда",
        "Lagoon Verde",
        "Mariachi"
      ],
      "pl": [
        "Nagroda",
        "Lagoon Verde",
        "Mariachi"
      ]
    }
  },
  {
    "id": "kibrispostasi-2023-11-08",
    "outlet": "Kıbrıs Postası",
    "url": "https://www.kibrispostasi.com/c68-ISKELE/n494500-dnd-kuzey-kibris-la-joya-perla-residences-beach-resortu-satisa-sundu",
    "date": "2023-11-08",
    "cover": "/news/kibrispostasi-la-joya-perla-lansman.webp",
    "title": {
      "tr": "DND Kuzey Kıbrıs, La Joya Perla Residences & Beach Resort’u satışa sundu",
      "en": "DND North Cyprus Launches La Joya Perla Residences & Beach Resort",
      "de": "DND North Cyprus bringt La Joya Perla Residences & Beach Resort auf den Markt",
      "ru": "DND North Cyprus открыла продажи La Joya Perla Residences & Beach Resort",
      "pl": "DND North Cyprus wprowadza do sprzedaży La Joya Perla Residences & Beach Resort"
    },
    "excerpt": {
      "tr": "DND Kuzey Kıbrıs, İskele Bahçeler’deki 384 konutluk La Joya Perla Residences & Beach Resort projesini satışa sundu. Haberde kurucu Ozan Dökmecioğlu ile direktör Aynur Zorba Gülol’nun açıklamalarına ve projenin olanaklarına yer veriliyor.",
      "en": "DND North Cyprus has put La Joya Perla Residences & Beach Resort, a 384-unit project in İskele Bahçeler, on sale. The story features comments from founder Ozan Dökmecioğlu and director Aynur Zorba Gülol and outlines the project’s amenities.",
      "de": "DND North Cyprus hat La Joya Perla Residences & Beach Resort, ein Projekt mit 384 Einheiten in İskele Bahçeler, in den Verkauf gebracht. Der Beitrag enthält Aussagen von Gründer Ozan Dökmecioğlu und Direktorin Aynur Zorba Gülol und stellt die Ausstattung des Projekts vor.",
      "ru": "DND North Cyprus открыла продажи La Joya Perla Residences & Beach Resort — проекта на 384 квартиры в Искеле-Бахчелер. В материале приводятся слова основателя Озана Дёкмеджиоглу и директора Айнур Зорба Гюлол, а также описание инфраструктуры проекта.",
      "pl": "DND North Cyprus wprowadziło do sprzedaży La Joya Perla Residences & Beach Resort – projekt obejmujący 384 lokale w İskele Bahçeler. W materiale wypowiadają się założyciel Ozan Dökmecioğlu i dyrektor Aynur Zorba Gülol, opisano też udogodnienia projektu."
    },
    "tags": {
      "tr": [
        "La Joya Perla",
        "Lansman"
      ],
      "en": [
        "La Joya Perla",
        "Launch"
      ],
      "de": [
        "La Joya Perla",
        "Markteinführung"
      ],
      "ru": [
        "La Joya Perla",
        "Старт продаж"
      ],
      "pl": [
        "La Joya Perla",
        "Premiera"
      ]
    }
  },
  {
    "id": "kibrispostasi-2025-11-04",
    "outlet": "Kıbrıs Postası",
    "url": "https://www.kibrispostasi.com/c35-KIBRIS_HABERLERI/n580748-hayaller-gercek-oldu-dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu",
    "date": "2025-11-04",
    "cover": "/news/kpcover.jpg",
    "title": {
      "tr": "Hayaller gerçek oldu: DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
      "en": "Dreams Came True: DND Cyprus Announces the Completion of La Joya Residences and Holiday Village",
      "de": "Träume wurden wahr: DND Cyprus meldet die Fertigstellung der La Joya Residences and Holiday Village",
      "ru": "Мечты сбылись: DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya",
      "pl": "Marzenia się spełniły: DND Cyprus ogłasza ukończenie rezydencji i wioski wakacyjnej La Joya"
    },
    "excerpt": {
      "tr": "DND Cyprus, İskele Long Beach bölgesindeki La Joya Rezidansları ve Tatil Köyü projesinin tamamlandığını duyurdu. Yatay mimariyle tasarlanan 74 özel rezidanslık proje, sahiplerine teslime hazır.",
      "en": "DND Cyprus announced that La Joya Residences and Holiday Village in İskele Long Beach has been completed. The low-rise project of 74 private residences is ready for handover.",
      "de": "DND Cyprus hat bekannt gegeben, dass die La Joya Residences and Holiday Village in İskele Long Beach fertiggestellt sind. Das Projekt mit 74 privaten Wohnungen in niedriger Bauweise ist bereit zur Übergabe.",
      "ru": "DND Cyprus сообщила, что резиденции и курортный комплекс La Joya в Long Beach (Искеле) завершены. Малоэтажный проект из 74 частных резиденций готов к передаче владельцам.",
      "pl": "DND Cyprus poinformował o ukończeniu rezydencji i wioski wakacyjnej La Joya w İskele Long Beach. Projekt w niskiej zabudowie, obejmujący 74 prywatne rezydencje, jest gotowy do przekazania właścicielom."
    },
    "tags": {
      "tr": [
        "La Joya",
        "İskele Long Beach"
      ],
      "en": [
        "La Joya",
        "Iskele Long Beach"
      ],
      "de": [
        "La Joya",
        "İskele Long Beach"
      ],
      "ru": [
        "La Joya",
        "Long Beach, Искеле"
      ],
      "pl": [
        "La Joya",
        "İskele Long Beach"
      ]
    }
  },
  {
    "id": "yeniduzen-2025-11-04",
    "outlet": "YENİDÜZEN",
    "url": "https://www.yeniduzen.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-188492h.htm",
    "date": "2025-11-04",
    "cover": "/news/ydcover.jpg",
    "title": {
      "tr": "DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
      "en": "DND Cyprus Announces the Completion of La Joya Residences and Holiday Village",
      "de": "DND Cyprus meldet die Fertigstellung der La Joya Residences and Holiday Village",
      "ru": "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya",
      "pl": "DND Cyprus ogłasza ukończenie rezydencji i wioski wakacyjnej La Joya"
    },
    "excerpt": {
      "tr": "DND Cyprus, büyük heyecanla beklenen La Joya Rezidansları ve Tatil Köyü projesinin resmi olarak tamamlandığını ve artık sahiplerini ağırlamaya hazır olduğunu duyurdu.",
      "en": "DND Cyprus announced that the much-anticipated La Joya Residences and Holiday Village has been officially completed and is now ready to welcome its owners.",
      "de": "DND Cyprus hat bekannt gegeben, dass die mit Spannung erwarteten La Joya Residences and Holiday Village offiziell fertiggestellt und nun bereit für ihre Eigentümer sind.",
      "ru": "DND Cyprus сообщила, что долгожданные резиденции и курортный комплекс La Joya официально завершены и готовы встречать своих владельцев.",
      "pl": "DND Cyprus poinformował, że długo wyczekiwane rezydencje i wioska wakacyjna La Joya zostały oficjalnie ukończone i są gotowe na przyjęcie właścicieli."
    },
    "tags": {
      "tr": [
        "La Joya"
      ],
      "en": [
        "La Joya"
      ],
      "de": [
        "La Joya"
      ],
      "ru": [
        "La Joya"
      ],
      "pl": [
        "La Joya"
      ]
    }
  }
];

export const pressDefaultsFor = (l: ContentLocale): PressItem[] => PRESS_DEFAULTS.map((r) => pressItemFor(r, l));
