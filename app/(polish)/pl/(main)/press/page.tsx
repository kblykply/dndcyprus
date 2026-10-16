import PageHero from "@/app/components/azure/PageHero";
import PressSection, { type PressItem } from "@/app/components/pl/PressSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/press",
  title: "Prasa i aktualności | DND Cyprus",
  description:
    "DND Cyprus w mediach: publikacje m.in. w Kıbrıs Postası, Yenidüzen i Haber Kıbrıs, w tym o ukończeniu rezydencji i wioski wakacyjnej La Joya.",
});

const PRESS_ITEMS: PressItem[] = [
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
    id: "cekicmagazin-2026-10-14",
    outlet: "Çekiç Magazin",
    title: "DND Cyprus wprowadza finansowanie zakupu domu w lirach tureckich dla mieszkańców wyspy",
    url: "https://cekicmagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani",
    excerpt: "DND Cyprus opracował nowy model finansowania, który ułatwia zakup domu mieszkańcom Cypru Północnego zarabiającym w lirach tureckich. System przewiduje do 60 miesięcy nieoprocentowanych płatności bez dopłat za rozłożenie na raty, a wysokość rat jest okresowo aktualizowana zgodnie ze wzrostem płacy minimalnej w TRCP.",
    date: "2026-10-14",
    cover: "/news/tl-konut-finansmani-v3.webp",
    tags: ["Płatności w lirach", "DND Cyprus"],
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
    id: "kibrispostasi-2025-11-04",
    outlet: "Kıbrıs Postası",
    title:
      "Marzenia się spełniły: DND Cyprus ogłasza ukończenie rezydencji i wioski wakacyjnej La Joya",
    url: "https://www.kibrispostasi.com/c35-KIBRIS_HABERLERI/n580748-hayaller-gercek-oldu-dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu",
    excerpt: "DND Cyprus poinformował o ukończeniu rezydencji i wioski wakacyjnej La Joya w İskele Long Beach. Projekt w niskiej zabudowie, obejmujący 74 prywatne rezydencje, jest gotowy do przekazania właścicielom.",
    date: "2025-11-04",
    cover: "/news/kpcover.jpg",
    tags: ["La Joya", "İskele Long Beach"],
  },
  {
    id: "yeniduzen-2025-11-04",
    outlet: "YENİDÜZEN",
    title:
      "DND Cyprus ogłasza ukończenie rezydencji i wioski wakacyjnej La Joya",
    url: "https://www.yeniduzen.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-188492h.htm",
    excerpt: "DND Cyprus poinformował, że długo wyczekiwane rezydencje i wioska wakacyjna La Joya zostały oficjalnie ukończone i są gotowe na przyjęcie właścicieli.",
    date: "2025-11-04",
    cover: "/news/ydcover.jpg",
    tags: ["La Joya"],
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
];





export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus w mediach" title={<>Aktualności</>} lead="Publikacje prasowe i komunikaty dotyczące naszej marki." image="/azure/p2-3.jpg" />
   <PressSection items={PRESS_ITEMS} title="Wszystkie aktualności" description="" moreHref="" initialLimit={PRESS_ITEMS.length} />


    </main>
  );
}
