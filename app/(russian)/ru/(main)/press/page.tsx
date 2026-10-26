import PageHero from "@/app/components/azure/PageHero";
import PressSection, { type PressItem } from "@/app/components/ru/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/press",
  title: "Публикации в прессе и новости | DND Cyprus",
  description:
    "DND Cyprus в прессе: публикации Kıbrıs Postası, Yenidüzen, Haber Kıbrıs и других изданий, в том числе о завершении резиденций и курортного комплекса La Joya.",
});

const PRESS_ITEMS: PressItem[] = [
  // 25 Ekim 2026: NeoCity ilk etap satışta (MHA ve Ya Haber aynı içerik; birini aldık)
  {
    id: "kibrisvizyon-2026-10-25",
    outlet: "Kıbrıs Vizyon",
    title: "NeoCity: новый проект DND Cyprus для местных семей",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprustan-yerli-ailelere-ozel-neocity-projesi-4695",
    excerpt: "DND Cyprus открыла продажи первой очереди NeoCity в районе Фамагусты, рядом с Eastern Mediterranean University. Виллы в современном средиземноморском стиле с частными садами и концепцией семейного квартала; оплата в турецких лирах по модели «5 нулей» — без процентов, банка, поручителя, курсовой разницы и надбавки за рассрочку.",
    date: "2026-10-25",
    cover: "/news/kibrisvizyon-neocity.webp",
    tags: ["NeoCity", "«5 нулей»"],
  },
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "Шанс стать владельцем дома на Северном Кипре без долгов в фунтах стерлингов",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    excerpt: "Основатель DND Cyprus Ozan Dökmecioğlu разработал новую модель финансирования жилья для покупателей с доходом в турецких лирах. Для ограниченного числа резиденций в отмеченном наградами проекте Lagoon Verde платежи вносятся в турецких лирах: рассрочка до 60 месяцев — без процентов и без наценки за срок, а взносы периодически пересматриваются вслед за ростом минимальной зарплаты в ТРСК, а не по курсу фунта стерлингов. Модель открывает альтернативный путь к собственному дому на Северном Кипре — для отдыха, жизни или инвестиций — без валютного риска.",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli-v3.webp",
    tags: ["Lagoon Verde", "Оплата в лирах"],
  },
  {
    // 19 Ekim 2026: Lagoon Verde TL modeli. Aynı içerikli Çekiç Magazin haberinin (MHA ile aynı başlık ve görsel) yerine
    id: "fuardergisi-2026-10-19",
    outlet: "Fuar Dergisi",
    title: "DND Cyprus продаёт жильё на Северном Кипре за лиры вместо фунтов",
    url: "https://www.fuardergisi.com.tr/dnd-cyprustan-kuzey-kibrista-sterlin-yerine-tl-ile-konut-satis-modeli",
    excerpt: "DND Cyprus ввела модель оплаты в турецких лирах для ограниченного числа резиденций в Lagoon Verde. По плану с финансированием от компании сроком до 60 месяцев платежи вносятся в лирах, а взносы периодически пересматриваются вслед за ростом минимальной зарплаты в ТРСК, а не по курсу фунта.",
    date: "2026-10-19",
    cover: "/news/fuardergisi-lagoon-verde-tl.webp",
    tags: ["Lagoon Verde", "Оплата в лирах"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "До 60 месяцев без процентов: финансирование жилья в турецких лирах от DND Cyprus",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    excerpt: "Модель, представленная основателем компании Ozan Dökmecioğlu, позволяет платить в турецких лирах, а взносы привязаны к росту минимальной зарплаты в ТРСК, а не к курсу фунта стерлингов. Предложение действует для ограниченного числа резиденций в Lagoon Verde и включает рассрочку до 60 месяцев без процентов и без наценки за срок.",
    date: "2026-10-14",
    cover: "/news/50fifty-haber-kapak-v2.webp",
    tags: ["Оплата в лирах", "DND Cyprus"],
  },
  {
    id: "ekonomist-2026-09-30",
    outlet: "Ekonomist",
    title: "DND Cyprus инвестирует 50 млн долларов в Северный Кипр",
    url: "https://www.ekonomist.com.tr/talip-yilmaz/dnd-cyprus-tan-kktc-de-50-milyon-dolarlik-yatirim--79348",
    excerpt: "Колумнист Ekonomist Талип Йылмаз рассказывает о трёх годах инвестиций DND Cyprus в недвижимость Северного Кипра: об успехе проектов La Joya в Искеле, завершении La Joya и новых проектах компании в регионе.",
    date: "2026-09-30",
    cover: "/news/ekonomist-dnd-50-milyon-yatirim.webp",
    tags: ["Инвестиции", "La Joya"],
  },
  {
    id: "nethaber-2026-09-29",
    outlet: "Net Haber",
    title: "Конфликты на Ближнем Востоке меняют инвестиционные маршруты: Северный Кипр становится центром притяжения",
    url: "https://www.nethaber.com.tr/haber/orta-dogudaki-catismalar-yatirim-rotasini-degistirdi-kktc-cazibe-merkezi-oldu-1009797",
    excerpt: "В интервью агентству İHA председатель совета директоров DND Cyprus Озан Дёкмеджиоглу объясняет, почему после событий в регионе вырос интерес инвесторов к Северному Кипру, и выделяет арендный доход в валюте и короткий срок окупаемости.",
    date: "2026-09-29",
    cover: "/news/nethaber-la-joya-havadan.webp",
    tags: ["Интервью", "Инвестиции"],
  },
  {
    id: "halkinsesi-2026-09-26",
    outlet: "Halkın Sesi",
    title: "Команда-чемпион U17 «Ларнака Генчлер Бирлиги» встретилась со спонсором за ужином",
    url: "https://www.halkinsesikibris.com/sampiyon-larnaka-gencler-birligi-u17-takimi-sponsoruyla-yemekte-bulustu",
    excerpt: "Команда U17 «Ларнака Генчлер Бирлиги», завоевавшая чемпионский титул, собралась на ужине, который устроил её спонсор DND Cyprus. Вечер был посвящён победе и важности инвестиций в молодых спортсменов.",
    date: "2026-09-26",
    cover: "/news/halkinsesi-larnaka-u17.webp",
    tags: ["Спорт", "Спонсорство"],
  },
  {
    id: "kibrisvizyon-2026-09-24",
    outlet: "Kıbrıs Vizyon",
    title: "Новый образ жизни в Искеле с DND Cyprus",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprus-ile-iskelede-yeni-bir-yasam-anlayisi-4690",
    excerpt: "Статья рассказывает, как Netice и Ozan Dökmecioğlu перенесли опыт работы с недвижимостью в Бостоне на Северный Кипр и сосредоточились на Искеле. Со слов соучредителя DND Cyprus Netice Dökmecioğlu — о проектах La Joya, La Joya Perla, La Joya Perla II и Lagoon Verde, а также о Joy Cafe в La Joya: жильё, общение и туризм в одном месте.",
    date: "2026-09-24",
    cover: "/news/kibrisvizyon-iskele-yasam.webp",
    tags: ["Интервью", "Искеле"],
  },
  {
    id: "yeniduzen-2026-09-16",
    outlet: "YENİDÜZEN",
    title: "В Искеле открылся Joy Cafe & Bar",
    url: "https://www.yeniduzen.com/joy-cafe-bar-iskelede-hizmete-acildi-199408h.htm",
    excerpt: "На территории La Joya Residences & Resort от DND Cyprus в Искеле открылся Joy Cafe & Bar. Заведение у бассейна открыто для жителей и гостей отеля, а также для местных жителей и гостей региона.",
    date: "2026-09-16",
    cover: "/news/yeniduzen-joy-cafe-bar.webp",
    tags: ["La Joya", "Открытие"],
  },
  {
    id: "yeniduzen-2026-08-17",
    outlet: "YENİDÜZEN",
    title: "DND Cyprus поддерживает искусство и творчество: фильм «tüş» начал фестивальный путь",
    url: "https://www.yeniduzen.com/dnd-cyprustan-sanata-ve-yaratici-uretime-destek-tus-festival-yolculuguna-basladi-198450h.htm",
    excerpt: "DND Cyprus вошла в число партнёров экспериментального короткометражного фильма «tüş» режиссёра Джансу Эзги Бозкурт, который участвует в фестивалях Турции и Европы. Сооснователь компании Нетидже Дёкмеджиоглу подчеркнула важность поддержки женщин в искусстве и креативных индустриях.",
    date: "2026-08-17",
    cover: "/news/yeniduzen-tus-kisa-film.webp",
    tags: ["Искусство", "Спонсорство"],
  },
  {
    id: "mha-2026-07-30",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "Дёкмеджиоглу: мы рано увидели потенциал Искеле",
    url: "https://www.mhahaber.com/dokmecioglu-iskelenin-potansiyelini-erken-gorduk",
    excerpt: "Озан Дёкмеджиоглу рассказывает, что DND рано разглядела потенциал Искеле и строит не просто жильё, а пространства для жизни. La Joya, La Joya Perla, Perla II, Lagoon Verde и бич-клуб он называет частями единого замысла.",
    date: "2026-07-30",
    cover: "/news/mha-iskele-potansiyel.webp",
    tags: ["Интервью", "Искеле"],
  },
  {
    id: "haberturk-2026-03-11",
    outlet: "Habertürk",
    title: "Портфель в 400 млн долларов в США",
    url: "https://yerel-haberler.haberturk.com/kayseri-haberleri/abdye-400-milyon-dolarlik-portfoy-116967814",
    excerpt: "Материал İHA рассказывает об основателе DND Cyprus Озане Дёкмеджиоглу и инвестиционном портфеле, который он создал вместе с DND Homes в США и на Северном Кипре, включая жилые проекты в Бостоне и Кембридже.",
    date: "2026-03-11",
    cover: "/news/haberturk-400-milyon-portfoy.webp",
    tags: ["DND Homes", "Бостон"],
  },
  {
    id: "gundemkibris-2026-02-08",
    outlet: "Gündem Kıbrıs",
    title: "Церемония премии «Туризм и успех ТРСК» прошла в отеле Les Ambassadeurs",
    url: "https://www.gundemkibris.com/kktc-turizm-ve-basari-odul-toreni-les-ambassadeurs-hotelde-gerceklesti",
    excerpt: "На церемонии вручения премии «Туризм и успех» в Кирении, проходившей под патронатом вице-премьерства и Министерства туризма, Озан Дёкмеджиоглу получил награду «Лучшая девелоперская компания года».",
    date: "2026-02-08",
    cover: "/news/gundemkibris-turizm-basari-odulu.webp",
    tags: ["Награда"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND сообщила радостную новость: La Joya завершён",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    excerpt: "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya в Long Beach (Искеле). Проект из 74 частных резиденций готов встречать своих владельцев.",
    date: "2025-11-04",
    cover: "/news/mhacover.webp",
    tags: ["La Joya", "DND Cyprus"],
  },
  {
    id: "haberkibris-2025-11-04",
    outlet: "Haber Kıbrıs",
    title:
      "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya",
    url: "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    excerpt: "Резиденции и курортный комплекс La Joya завершены: DND Cyprus сообщила, что проект в Long Beach (Искеле) готов встречать своих владельцев.",
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
  {
    id: "mha-2025-04-28",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND Cyprus отличилась на премии Property NC Awards",
    url: "https://www.mhahaber.com/dnd-kibris-property-nc-odullerine-damga-vurdu",
    excerpt: "На Property NC Awards 2025 DND Cyprus получила три награды: «Лучшая новая компания» (золото), «Лучший предлагаемый социокультурный проект» (золото) за Lagoon Verde и «Лучший предлагаемый новый коммерческий проект» (платина) за Mariachi Beach Club.",
    date: "2025-04-28",
    cover: "/news/mha-propertync-2025-odulleri.webp",
    tags: ["Награда", "Lagoon Verde", "Mariachi"],
  },
  {
    id: "kibrispostasi-2023-11-08",
    outlet: "Kıbrıs Postası",
    title: "DND North Cyprus открыла продажи La Joya Perla Residences & Beach Resort",
    url: "https://www.kibrispostasi.com/c68-ISKELE/n494500-dnd-kuzey-kibris-la-joya-perla-residences-beach-resortu-satisa-sundu",
    excerpt: "DND North Cyprus открыла продажи La Joya Perla Residences & Beach Resort — проекта на 384 квартиры в Искеле-Бахчелер. В материале приводятся слова основателя Озана Дёкмеджиоглу и директора Айнур Зорба Гюлоглу, а также описание инфраструктуры проекта.",
    date: "2023-11-08",
    cover: "/news/kibrispostasi-la-joya-perla-lansman.webp",
    tags: ["La Joya Perla", "Старт продаж"],
  },
];





export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus в прессе" title={<>Новости</>} lead="Новости DND, DND в прессе и мероприятия." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="ru" />
      <PressBlock locale="ru"><PressSection items={PRESS_ITEMS} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="ru" />


    </main>
  );
}
