import PressSection, { type PressItem } from "@/app/components/PressSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/press",
  title: "Basın Haberleri ve Duyurular | DND Cyprus",
  description:
    "Basında DND Cyprus: La Joya Rezidansları ve Tatil Köyü'nün tamamlanması başta olmak üzere Kıbrıs Postası, Yenidüzen ve Haber Kıbrıs'taki haberleri okuyun.",
});

const PRESS_ITEMS: PressItem[] = [
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "Kuzey Kıbrıs’ta sterlinle borçlanmadan ev sahibi olma fırsatı!",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli.webp",
    tags: ["Lagoon Verde", "TL Ödeme Modeli"],
  },
  {
    id: "cekicmagazin-2026-10-14",
    outlet: "Çekiç Magazin",
    title: "DND Cyprus’tan yerli halka Türk lirasıyla konut finansmanı",
    url: "https://cekicmagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani",
    date: "2026-10-14",
    cover: "/news/tl-konut-finansmani.webp",
    tags: ["TL Ödeme Modeli", "DND Cyprus"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "DND Cyprus’tan yerli halka Türk lirasıyla konut finansmanı",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    date: "2026-10-14",
    cover: "/news/50fifty-tl-konut-finansmani.webp",
    tags: ["TL Ödeme Modeli", "DND Cyprus"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND MÜJDEYİ VERDİ: LA JOYA TAMAMLANDI",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    date: "2025-11-04",
    cover: "/news/mhacover.webp",
    tags: ["La Joya", "DND Cyprus"],
  },
  {
    id: "kibrispostasi-2025-11-04",
    outlet: "Kıbrıs Postası",
    title:
      "Hayaller gerçek oldu: DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
    url: "https://www.kibrispostasi.com/c35-KIBRIS_HABERLERI/n580748-hayaller-gercek-oldu-dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu",
    date: "2025-11-04",
    cover: "/news/kpcover.jpg",
    tags: ["La Joya", "İskele Long Beach"],
  },
  {
    id: "yeniduzen-2025-11-04",
    outlet: "YENİDÜZEN",
    title:
      "DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
    url: "https://www.yeniduzen.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-188492h.htm",
    date: "2025-11-04",
    cover: "/news/ydcover.jpg",
    tags: ["La Joya"],
  },
  {
    id: "haberkibris-2025-11-04",
    outlet: "Haber Kıbrıs",
    title:
      "DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
    url: "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
];





export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">
      <h1 className="sr-only">Basında DND Cyprus</h1>
   <PressSection items={PRESS_ITEMS} moreHref="" initialLimit={PRESS_ITEMS.length} />


    </main>
  );
}
