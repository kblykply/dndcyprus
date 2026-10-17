import { DeferredInstagram } from "@/app/components/performance/DeferredMedia";
import { type PressItem } from "@/app/components/PressSection";
import { pageMetadata } from "@/lib/seo";
import { HOME } from "@/lib/azure/home";

// Azure tasarımı — ana sayfa bölümleri
import HomeHero from "@/app/components/azure/home/HomeHero";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import Bento from "@/app/components/azure/home/Bento";
import Story from "@/app/components/azure/home/Story";
import ProjectsCarousel from "@/app/components/azure/home/ProjectsCarousel";
import LocationPanel from "@/app/components/azure/home/LocationPanel";
import Leadership from "@/app/components/azure/home/Leadership";
import Timeline from "@/app/components/azure/home/Timeline";
import PressFaq from "@/app/components/azure/home/PressFaq";
import SectionHead from "@/app/components/azure/home/SectionHead";
import VideoShowcase from "@/app/components/azure/home/VideoShowcase";
import ContactCard from "@/app/components/azure/ContactCard";

export const metadata = pageMetadata({
  locale: "de",
  path: "",
  title: "Wohnen nach US-Standard in Nordzypern | DND Cyprus",
  description:
    "Die Erfahrung aus 120 Projekten in Massachusetts, jetzt in İskele: das preisgekrönte Lagoon Verde, die Residenzen La Joya Perla und der Mariachi Beach Club.",
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
  const t = HOME.de;
  return (
    <>
      <HomeHero locale="de" />
      <AwardsShowcase locale="de" />
      <Bento locale="de" />
      <SectionHead kicker={t.videos.kicker} title={t.videos.title}>
        <VideoShowcase locale="de" />
      </SectionHead>
      <Story locale="de" />
      <ProjectsCarousel locale="de" />
      <LocationPanel locale="de" />
      <Leadership locale="de" />
      <Timeline locale="de" />
      <PressFaq locale="de" items={PRESS_ITEMS} />
      <div className="az-section tight rv"><div className="az-wrap"><DeferredInstagram locale="de" /></div></div>
      <ContactCard locale="de" mode="home" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} highlights={t.contact.highlights} image="/azure/contact-sea.webp" id="iletisim" />
    </>
  );
}
