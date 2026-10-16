import PageHero from "@/app/components/azure/PageHero";
import PressSection, { type PressItem } from "@/app/components/de/PressSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/press",
  title: "Presse & Neuigkeiten | DND Cyprus",
  description:
    "DND Cyprus in der Presse: Berichte von Kıbrıs Postası, Yenidüzen, Haber Kıbrıs und weiteren Medien, u. a. zur Fertigstellung der La Joya Residences and Holiday Village.",
});

const PRESS_ITEMS: PressItem[] = [
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "Eigentum in Nordzypern – ohne Schulden in Pfund Sterling",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    excerpt: "Ozan Dökmecioğlu, Gründer von DND Cyprus, hat ein neues Finanzierungsmodell für Käufer mit Einkommen in Türkischer Lira entwickelt. Für eine begrenzte Zahl von Wohnungen im preisgekrönten Projekt Lagoon Verde wird in Türkischer Lira gezahlt; die Raten über bis zu 60 Monate sind zinsfrei und ohne Laufzeitaufschlag und werden regelmäßig an die Erhöhung des Mindestlohns in der TRNZ angepasst – nicht an den Wechselkurs des Pfund Sterling. So bietet das Modell einen alternativen Weg zum Eigenheim in Nordzypern – für den Urlaub, zum Wohnen oder als Investition – ohne Währungsrisiko.",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli-v3.webp",
    tags: ["Lagoon Verde", "TL-Zahlungsmodell"],
  },
  {
    id: "cekicmagazin-2026-10-14",
    outlet: "Çekiç Magazin",
    title: "DND Cyprus bietet Einheimischen Wohnungsfinanzierung in Türkischer Lira",
    url: "https://cekicmagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani",
    excerpt: "DND Cyprus hat ein neues Finanzierungsmodell entwickelt, das Menschen in Nordzypern mit Einkommen in Türkischer Lira den Weg zum Eigenheim erleichtert. Das System bietet bis zu 60 Monate zinsfreie Zahlung ohne Laufzeitaufschlag; die Raten werden regelmäßig an die Erhöhung des Mindestlohns in der TRNZ angepasst.",
    date: "2026-10-14",
    cover: "/news/tl-konut-finansmani-v3.webp",
    tags: ["TL-Zahlungsmodell", "DND Cyprus"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "Bis zu 60 Monate zinsfrei: die Lira-Finanzierung von DND Cyprus",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    excerpt: "Das von Gründer Ozan Dökmecioğlu vorgestellte Modell ermöglicht Käufern die Zahlung in Türkischer Lira; die Raten orientieren sich an den Mindestlohnerhöhungen in der TRNZ statt am Pfund Sterling. Das Angebot gilt für eine begrenzte Zahl von Wohnungen in Lagoon Verde und umfasst bis zu 60 Monate zinsfreie Zahlung ohne Laufzeitaufschlag.",
    date: "2026-10-14",
    cover: "/news/50fifty-haber-kapak-v2.webp",
    tags: ["TL-Zahlungsmodell", "DND Cyprus"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND verkündet die gute Nachricht: La Joya ist fertiggestellt",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    excerpt: "DND Cyprus hat die Fertigstellung der La Joya Residences and Holiday Village in İskele Long Beach bekannt gegeben. Das Projekt mit 74 privaten Wohnungen ist nun bereit für seine Eigentümer.",
    date: "2025-11-04",
    cover: "/news/mhacover.webp",
    tags: ["La Joya", "DND Cyprus"],
  },
  {
    id: "kibrispostasi-2025-11-04",
    outlet: "Kıbrıs Postası",
    title:
      "Träume wurden wahr: DND Cyprus meldet die Fertigstellung der La Joya Residences and Holiday Village",
    url: "https://www.kibrispostasi.com/c35-KIBRIS_HABERLERI/n580748-hayaller-gercek-oldu-dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu",
    excerpt: "DND Cyprus hat bekannt gegeben, dass die La Joya Residences and Holiday Village in İskele Long Beach fertiggestellt sind. Das Projekt mit 74 privaten Wohnungen in niedriger Bauweise ist bereit zur Übergabe.",
    date: "2025-11-04",
    cover: "/news/kpcover.jpg",
    tags: ["La Joya", "İskele Long Beach"],
  },
  {
    id: "yeniduzen-2025-11-04",
    outlet: "YENİDÜZEN",
    title:
      "DND Cyprus meldet die Fertigstellung der La Joya Residences and Holiday Village",
    url: "https://www.yeniduzen.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-188492h.htm",
    excerpt: "DND Cyprus hat bekannt gegeben, dass die mit Spannung erwarteten La Joya Residences and Holiday Village offiziell fertiggestellt und nun bereit für ihre Eigentümer sind.",
    date: "2025-11-04",
    cover: "/news/ydcover.jpg",
    tags: ["La Joya"],
  },
  {
    id: "haberkibris-2025-11-04",
    outlet: "Haber Kıbrıs",
    title:
      "DND Cyprus meldet die Fertigstellung der La Joya Residences and Holiday Village",
    url: "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    excerpt: "Die La Joya Residences and Holiday Village sind fertig: DND Cyprus meldet, dass das Projekt in İskele Long Beach bereit für seine Eigentümer ist.",
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
];





export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus in der Presse" title={<>Aktuelles</>} lead="Presseberichte und Pressemitteilungen über unsere Marke." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
   <PressSection items={PRESS_ITEMS} title="Alle Meldungen" description="" moreHref="" initialLimit={PRESS_ITEMS.length} />


    </main>
  );
}
