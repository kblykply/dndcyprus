import PageHero from "@/app/components/azure/PageHero";
import PressSection, { type PressItem } from "@/app/components/pl/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/press",
  title: "Prasa i aktualności | DND Cyprus",
  description:
    "DND Cyprus w mediach: publikacje m.in. w Kıbrıs Postası, Yenidüzen i Haber Kıbrıs, w tym o ukończeniu rezydencji i wioski wakacyjnej La Joya.",
});

const PRESS_ITEMS: PressItem[] = [
  // 25 Ekim 2026: NeoCity ilk etap satışta (MHA ve Ya Haber aynı içerik; birini aldık)
  {
    id: "kibrisvizyon-2026-10-25",
    outlet: "Kıbrıs Vizyon",
    title: "NeoCity: nowy projekt DND Cyprus dla lokalnych rodzin",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprustan-yerli-ailelere-ozel-neocity-projesi-4695",
    excerpt: "DND Cyprus rozpoczęła sprzedaż pierwszego etapu NeoCity w regionie Famagusty, w pobliżu Eastern Mediterranean University. Wille łączą nowoczesną architekturę śródziemnomorską, prywatne ogrody i koncepcję rodzinnego osiedla; płatności w lirach tureckich w modelu „5 zer” — bez odsetek, banku, poręczyciela, różnic kursowych i dopłat za raty.",
    date: "2026-10-25",
    cover: "/news/kibrisvizyon-neocity.webp",
    tags: ["NeoCity", "„5 zer”"],
  },
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "Własny dom na Cyprze Północnym bez zadłużania się w funtach",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    excerpt: "Założyciel DND Cyprus, Ozan Dökmecioğlu, opracował nowy model finansowania zakupu domu dla osób zarabiających w lirach tureckich. W przypadku ograniczonej liczby rezydencji w nagradzanym projekcie Lagoon Verde płatności dokonuje się w lirach tureckich; raty rozłożone na maksymalnie 60 miesięcy są nieoprocentowane i bez dopłat za rozłożenie płatności, a ich wysokość jest okresowo aktualizowana zgodnie ze wzrostem płacy minimalnej w TRCP, a nie z kursem funta. Model ten daje alternatywną drogę do własnego domu na Cyprze Północnym – na wakacje, do zamieszkania lub jako inwestycji – bez ryzyka walutowego.",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli-v3.webp",
    tags: ["Lagoon Verde", "Płatności w lirach"],
  },
  {
    // 19 Ekim 2026: Lagoon Verde TL modeli. Aynı içerikli Çekiç Magazin haberinin (MHA ile aynı başlık ve görsel) yerine
    id: "fuardergisi-2026-10-19",
    outlet: "Fuar Dergisi",
    title: "DND Cyprus sprzedaje domy na Cyprze Północnym za liry zamiast funtów",
    url: "https://www.fuardergisi.com.tr/dnd-cyprustan-kuzey-kibrista-sterlin-yerine-tl-ile-konut-satis-modeli",
    excerpt: "DND Cyprus wprowadził model płatności w lirach tureckich dla ograniczonej liczby apartamentów w Lagoon Verde. W planie finansowanym przez firmę, na okres do 60 miesięcy, płatności dokonuje się w lirach, a raty są okresowo aktualizowane zgodnie ze wzrostem płacy minimalnej w TRCP, a nie kursem funta.",
    date: "2026-10-19",
    cover: "/news/fuardergisi-lagoon-verde-tl.webp",
    tags: ["Lagoon Verde", "Płatności w lirach"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "Do 60 miesięcy bez odsetek: finansowanie domu w lirach tureckich od DND Cyprus",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    excerpt: "Ogłoszony przez założyciela firmy, Ozana Dökmecioğlu, model pozwala kupującym płacić w lirach tureckich, a wysokość rat jest powiązana ze wzrostem płacy minimalnej w TRCP zamiast z kursem funta. Oferta obejmuje ograniczoną liczbę rezydencji w Lagoon Verde i przewiduje do 60 miesięcy nieoprocentowanych płatności bez dopłat za rozłożenie na raty.",
    date: "2026-10-14",
    cover: "/news/50fifty-haber-kapak-v2.webp",
    tags: ["Płatności w lirach", "DND Cyprus"],
  },
  {
    id: "ekonomist-2026-09-30",
    outlet: "Ekonomist",
    title: "DND Cyprus inwestuje 50 mln dolarów na Cyprze Północnym",
    url: "https://www.ekonomist.com.tr/talip-yilmaz/dnd-cyprus-tan-kktc-de-50-milyon-dolarlik-yatirim--79348",
    excerpt: "Felietonista Ekonomist Talip Yılmaz opisuje trzy lata inwestycji DND Cyprus w nieruchomości na Cyprze Północnym: sukces projektów La Joya w İskele, ukończenie La Joya i nowe inwestycje firmy w regionie.",
    date: "2026-09-30",
    cover: "/news/ekonomist-dnd-50-milyon-yatirim.webp",
    tags: ["Inwestycje", "La Joya"],
  },
  {
    id: "nethaber-2026-09-29",
    outlet: "Net Haber",
    title: "Konflikty na Bliskim Wschodzie zmieniają szlaki inwestycyjne: Cypr Północny przyciąga kapitał",
    url: "https://www.nethaber.com.tr/haber/orta-dogudaki-catismalar-yatirim-rotasini-degistirdi-kktc-cazibe-merkezi-oldu-1009797",
    excerpt: "W rozmowie z agencją İHA prezes DND Cyprus Ozan Dökmecioğlu wyjaśnia, dlaczego po ostatnich wydarzeniach w regionie wzrosło zainteresowanie inwestorów Cyprem Północnym, wskazując na dochód z najmu w walutach i krótki okres zwrotu.",
    date: "2026-09-29",
    cover: "/news/nethaber-la-joya-havadan.webp",
    tags: ["Wywiad", "Inwestycje"],
  },
  {
    id: "halkinsesi-2026-09-26",
    outlet: "Halkın Sesi",
    title: "Mistrzowska drużyna U17 Larnaka Gençler Birliği spotkała się ze sponsorem na kolacji",
    url: "https://www.halkinsesikibris.com/sampiyon-larnaka-gencler-birligi-u17-takimi-sponsoruyla-yemekte-bulustu",
    excerpt: "Drużyna U17 Larnaka Gençler Birliği, która zdobyła mistrzostwo, spotkała się na kolacji wydanej przez sponsora, DND Cyprus. Podczas wieczoru świętowano sukces i podkreślano znaczenie inwestowania w młodych sportowców.",
    date: "2026-09-26",
    cover: "/news/halkinsesi-larnaka-u17.webp",
    tags: ["Sport", "Sponsoring"],
  },
  {
    id: "kibrisvizyon-2026-09-24",
    outlet: "Kıbrıs Vizyon",
    title: "Nowy styl życia w İskele z DND Cyprus",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprus-ile-iskelede-yeni-bir-yasam-anlayisi-4690",
    excerpt: "Artykuł opowiada, jak Netice i Ozan Dökmecioğlu przenieśli doświadczenie z rynku nieruchomości w Bostonie na Cypr Północny i skupili się na İskele. W wypowiedziach współzałożycielki DND Cyprus Netice Dökmecioğlu pojawiają się La Joya, La Joya Perla, La Joya Perla II i Lagoon Verde oraz Joy Cafe w La Joya — mieszkanie łączy się z życiem towarzyskim i turystyką.",
    date: "2026-09-24",
    cover: "/news/kibrisvizyon-iskele-yasam.webp",
    tags: ["Wywiad", "İskele"],
  },
  {
    id: "yeniduzen-2026-09-16",
    outlet: "YENİDÜZEN",
    title: "Joy Cafe & Bar otwarte w İskele",
    url: "https://www.yeniduzen.com/joy-cafe-bar-iskelede-hizmete-acildi-199408h.htm",
    excerpt: "W La Joya Residences & Resort firmy DND Cyprus w İskele otwarto Joy Cafe & Bar. Lokal przy basenie jest otwarty dla mieszkańców i gości hotelu, a także dla lokalnej społeczności i odwiedzających region.",
    date: "2026-09-16",
    cover: "/news/yeniduzen-joy-cafe-bar.webp",
    tags: ["La Joya", "Otwarcie"],
  },
  {
    id: "yeniduzen-2026-08-17",
    outlet: "YENİDÜZEN",
    title: "DND Cyprus wspiera sztukę i twórczość: film „tüş” rusza w festiwalową podróż",
    url: "https://www.yeniduzen.com/dnd-cyprustan-sanata-ve-yaratici-uretime-destek-tus-festival-yolculuguna-basladi-198450h.htm",
    excerpt: "DND Cyprus jest jednym z partnerów eksperymentalnego filmu krótkometrażowego „tüş” w reżyserii Cansu Ezgi Bozkurt, pokazywanego na festiwalach w Turcji i Europie. Współzałożycielka Netice Dökmecioğlu podkreśliła, jak ważne jest wspieranie kobiet w sztuce i branżach kreatywnych.",
    date: "2026-08-17",
    cover: "/news/yeniduzen-tus-kisa-film.webp",
    tags: ["Sztuka", "Sponsoring"],
  },
  {
    id: "mha-2026-07-30",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "Dökmecioğlu: wcześnie dostrzegliśmy potencjał İskele",
    url: "https://www.mhahaber.com/dokmecioglu-iskelenin-potansiyelini-erken-gorduk",
    excerpt: "Ozan Dökmecioğlu opowiada, że DND wcześnie dostrzegło potencjał İskele i buduje nie tylko mieszkania, lecz miejsca do życia. La Joya, La Joya Perla, Perla II, Lagoon Verde i beach club traktuje jako części jednej wizji.",
    date: "2026-07-30",
    cover: "/news/mha-iskele-potansiyel.webp",
    tags: ["Wywiad", "İskele"],
  },
  {
    id: "haberturk-2026-03-11",
    outlet: "Habertürk",
    title: "Portfel wart 400 mln dolarów w USA",
    url: "https://yerel-haberler.haberturk.com/kayseri-haberleri/abdye-400-milyon-dolarlik-portfoy-116967814",
    excerpt: "Materiał agencji İHA przedstawia założyciela DND Cyprus Ozana Dökmecioğlu i portfel inwestycji, który zbudował z DND Homes w USA i na Cyprze Północnym, w tym projekty mieszkaniowe w Bostonie i Cambridge.",
    date: "2026-03-11",
    cover: "/news/haberturk-400-milyon-portfoy.webp",
    tags: ["DND Homes", "Boston"],
  },
  {
    id: "gundemkibris-2026-02-08",
    outlet: "Gündem Kıbrıs",
    title: "Gala nagród „Turystyka i Sukces” TRNC w hotelu Les Ambassadeurs",
    url: "https://www.gundemkibris.com/kktc-turizm-ve-basari-odul-toreni-les-ambassadeurs-hotelde-gerceklesti",
    excerpt: "Podczas gali nagród „Turystyka i Sukces” w Kyrenii, zorganizowanej pod patronatem wicepremiera i Ministerstwa Turystyki, Ozan Dökmecioğlu otrzymał nagrodę „Najlepsza firma deweloperska roku”.",
    date: "2026-02-08",
    cover: "/news/gundemkibris-turizm-basari-odulu.webp",
    tags: ["Nagroda"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND ogłasza dobrą wiadomość: La Joya ukończona",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    excerpt: "DND Cyprus ogłosił ukończenie rezydencji i wioski wakacyjnej La Joya w İskele Long Beach. Projekt obejmujący 74 prywatne rezydencje jest gotowy na przyjęcie właścicieli.",
    date: "2025-11-04",
    cover: "/news/mhacover.webp",
    tags: ["La Joya", "DND Cyprus"],
  },
  {
    id: "haberkibris-2025-11-04",
    outlet: "Haber Kıbrıs",
    title:
      "DND Cyprus ogłasza ukończenie rezydencji i wioski wakacyjnej La Joya",
    url: "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    excerpt: "Rezydencje i wioska wakacyjna La Joya są gotowe: DND Cyprus ogłosił, że projekt w İskele Long Beach czeka już na swoich właścicieli.",
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
  {
    id: "mha-2025-04-28",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND Cyprus wyróżnia się na Property NC Awards",
    url: "https://www.mhahaber.com/dnd-kibris-property-nc-odullerine-damga-vurdu",
    excerpt: "Na Property NC Awards 2025 DND Cyprus zdobyło trzy nagrody: Najlepszy debiut (złoto), Najlepszy proponowany projekt społeczno-kulturalny (złoto) za Lagoon Verde oraz Najlepszy proponowany nowy projekt komercyjny (platyna) za Mariachi Beach Club.",
    date: "2025-04-28",
    cover: "/news/mha-propertync-2025-odulleri.webp",
    tags: ["Nagroda", "Lagoon Verde", "Mariachi"],
  },
  {
    id: "kibrispostasi-2023-11-08",
    outlet: "Kıbrıs Postası",
    title: "DND North Cyprus wprowadza do sprzedaży La Joya Perla Residences & Beach Resort",
    url: "https://www.kibrispostasi.com/c68-ISKELE/n494500-dnd-kuzey-kibris-la-joya-perla-residences-beach-resortu-satisa-sundu",
    excerpt: "DND North Cyprus wprowadziło do sprzedaży La Joya Perla Residences & Beach Resort – projekt obejmujący 384 lokale w İskele Bahçeler. W materiale wypowiadają się założyciel Ozan Dökmecioğlu i dyrektor Aynur Zorba Güloğlu, opisano też udogodnienia projektu.",
    date: "2023-11-08",
    cover: "/news/kibrispostasi-la-joya-perla-lansman.webp",
    tags: ["La Joya Perla", "Premiera"],
  },
];





export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus w mediach" title={<>Aktualności</>} lead="Wiadomości od DND, DND w prasie i wydarzenia." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="pl" />
      <PressBlock locale="pl"><PressSection items={PRESS_ITEMS} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="pl" />


    </main>
  );
}
