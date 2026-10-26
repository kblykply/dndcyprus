import PageHero from "@/app/components/azure/PageHero";
import PressSection, { type PressItem } from "@/app/components/de/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";

export const metadata = pageMetadata({
  locale: "de",
  path: "/press",
  title: "Presse & Neuigkeiten | DND Cyprus",
  description:
    "DND Cyprus in der Presse: Berichte von Kıbrıs Postası, Yenidüzen, Haber Kıbrıs und weiteren Medien, u. a. zur Fertigstellung der La Joya Residences and Holiday Village.",
});

const PRESS_ITEMS: PressItem[] = [
  // 25 Ekim 2026: NeoCity ilk etap satışta (MHA ve Ya Haber aynı içerik; birini aldık)
  {
    id: "kibrisvizyon-2026-10-25",
    outlet: "Kıbrıs Vizyon",
    title: "NeoCity: Neues Projekt von DND Cyprus für einheimische Familien",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprustan-yerli-ailelere-ozel-neocity-projesi-4695",
    excerpt: "DND Cyprus hat die erste Bauphase von NeoCity in der Region Famagusta, nahe der Eastern Mediterranean University, in den Verkauf gebracht. Die Villen verbinden moderne mediterrane Architektur, Privatgärten und ein familienorientiertes Nachbarschaftskonzept; gezahlt wird in türkischer Lira nach dem 5-Null-Modell – ohne Zinsen, Bank, Bürgen, Wechselkurs- oder Laufzeitaufschlag.",
    date: "2026-10-25",
    cover: "/news/kibrisvizyon-neocity.webp",
    tags: ["NeoCity", "5-Null-Modell"],
  },
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
    // 19 Ekim 2026: Lagoon Verde TL modeli. Aynı içerikli Çekiç Magazin haberinin (MHA ile aynı başlık ve görsel) yerine
    id: "fuardergisi-2026-10-19",
    outlet: "Fuar Dergisi",
    title: "DND Cyprus verkauft Wohnungen in Nordzypern in Lira statt in Pfund",
    url: "https://www.fuardergisi.com.tr/dnd-cyprustan-kuzey-kibrista-sterlin-yerine-tl-ile-konut-satis-modeli",
    excerpt: "DND Cyprus hat für eine begrenzte Zahl von Residenzen in Lagoon Verde ein Zahlungsmodell in Türkischer Lira eingeführt. Beim vom Unternehmen finanzierten Plan mit bis zu 60 Monaten Laufzeit wird in Lira gezahlt; die Raten werden regelmäßig an die Erhöhung des Mindestlohns in der TRNZ statt an den Pfundkurs angepasst.",
    date: "2026-10-19",
    cover: "/news/fuardergisi-lagoon-verde-tl.webp",
    tags: ["Lagoon Verde", "TL-Zahlungsmodell"],
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
    id: "ekonomist-2026-09-30",
    outlet: "Ekonomist",
    title: "DND Cyprus investiert 50 Millionen Dollar in Nordzypern",
    url: "https://www.ekonomist.com.tr/talip-yilmaz/dnd-cyprus-tan-kktc-de-50-milyon-dolarlik-yatirim--79348",
    excerpt: "Ekonomist-Kolumnist Talip Yılmaz schreibt über drei Jahre Immobilieninvestitionen von DND Cyprus in Nordzypern – über den Erfolg der La-Joya-Projekte in İskele, die Fertigstellung von La Joya und die neuen Projekte des Unternehmens in der Region.",
    date: "2026-09-30",
    cover: "/news/ekonomist-dnd-50-milyon-yatirim.webp",
    tags: ["Investition", "La Joya"],
  },
  {
    id: "nethaber-2026-09-29",
    outlet: "Net Haber",
    title: "Konflikte im Nahen Osten verändern Investitionsrouten: Nordzypern wird zum Anziehungspunkt",
    url: "https://www.nethaber.com.tr/haber/orta-dogudaki-catismalar-yatirim-rotasini-degistirdi-kktc-cazibe-merkezi-oldu-1009797",
    excerpt: "Im Gespräch mit İHA erläutert DND-Cyprus-Vorstandsvorsitzender Ozan Dökmecioğlu, warum das Interesse von Investoren an Nordzypern nach den jüngsten Entwicklungen in der Region gestiegen ist – mit Mieteinnahmen in Fremdwährung und kurzen Amortisationszeiten.",
    date: "2026-09-29",
    cover: "/news/nethaber-la-joya-havadan.webp",
    tags: ["Interview", "Investition"],
  },
  {
    id: "halkinsesi-2026-09-26",
    outlet: "Halkın Sesi",
    title: "Meistermannschaft: Die U17 von Larnaka Gençler Birliği trifft ihren Sponsor zum Abendessen",
    url: "https://www.halkinsesikibris.com/sampiyon-larnaka-gencler-birligi-u17-takimi-sponsoruyla-yemekte-bulustu",
    excerpt: "Die U17-Mannschaft von Larnaka Gençler Birliği feierte ihren Meistertitel bei einem Abendessen auf Einladung ihres Sponsors DND Cyprus. Dabei wurde betont, wie wichtig Investitionen in junge Sportler sind.",
    date: "2026-09-26",
    cover: "/news/halkinsesi-larnaka-u17.webp",
    tags: ["Sport", "Sponsoring"],
  },
  {
    id: "kibrisvizyon-2026-09-24",
    outlet: "Kıbrıs Vizyon",
    title: "Mit DND Cyprus ein neues Lebensgefühl in İskele",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprus-ile-iskelede-yeni-bir-yasam-anlayisi-4690",
    excerpt: "Der Beitrag erzählt, wie Netice und Ozan Dökmecioğlu ihre Immobilienerfahrung aus Boston nach Nordzypern brachten und sich auf İskele konzentrierten. Mit Stimmen von DND-Cyprus-Mitgründerin Netice Dökmecioğlu stehen La Joya, La Joya Perla, La Joya Perla II und Lagoon Verde sowie das Joy Cafe in La Joya im Mittelpunkt – Wohnen trifft auf soziales Leben und Tourismus.",
    date: "2026-09-24",
    cover: "/news/kibrisvizyon-iskele-yasam.webp",
    tags: ["Interview", "İskele"],
  },
  {
    id: "yeniduzen-2026-09-16",
    outlet: "YENİDÜZEN",
    title: "Joy Cafe & Bar in İskele eröffnet",
    url: "https://www.yeniduzen.com/joy-cafe-bar-iskelede-hizmete-acildi-199408h.htm",
    excerpt: "In der La Joya Residences & Resort von DND Cyprus in İskele hat die Joy Cafe & Bar eröffnet. Der Ort am Pool steht Bewohnern und Hotelgästen ebenso offen wie Einheimischen und Besuchern der Region.",
    date: "2026-09-16",
    cover: "/news/yeniduzen-joy-cafe-bar.webp",
    tags: ["La Joya", "Eröffnung"],
  },
  {
    id: "yeniduzen-2026-08-17",
    outlet: "YENİDÜZEN",
    title: "DND Cyprus fördert Kunst und kreatives Schaffen: „tüş“ startet seine Festivalreise",
    url: "https://www.yeniduzen.com/dnd-cyprustan-sanata-ve-yaratici-uretime-destek-tus-festival-yolculuguna-basladi-198450h.htm",
    excerpt: "DND Cyprus gehört zu den Unterstützern des experimentellen Kurzfilms „tüş“ von Regisseurin Cansu Ezgi Bozkurt, der auf Festivals in der Türkei und in Europa gezeigt wird. Mitgründerin Netice Dökmecioğlu betonte, wie wichtig die Förderung von Frauen in Kunst und Kreativwirtschaft ist.",
    date: "2026-08-17",
    cover: "/news/yeniduzen-tus-kisa-film.webp",
    tags: ["Kunst", "Sponsoring"],
  },
  {
    id: "mha-2026-07-30",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "Dökmecioğlu: Wir haben das Potenzial von İskele früh erkannt",
    url: "https://www.mhahaber.com/dokmecioglu-iskelenin-potansiyelini-erken-gorduk",
    excerpt: "Ozan Dökmecioğlu erzählt, dass DND das Potenzial von İskele früh erkannt hat und nicht nur Wohnungen, sondern Lebensorte baut. La Joya, La Joya Perla, Perla II, Lagoon Verde und den Beach Club sieht er als Teile einer gemeinsamen Vision.",
    date: "2026-07-30",
    cover: "/news/mha-iskele-potansiyel.webp",
    tags: ["Interview", "İskele"],
  },
  {
    id: "haberturk-2026-03-11",
    outlet: "Habertürk",
    title: "Ein Portfolio von 400 Millionen Dollar in den USA",
    url: "https://yerel-haberler.haberturk.com/kayseri-haberleri/abdye-400-milyon-dolarlik-portfoy-116967814",
    excerpt: "Die İHA-Meldung porträtiert DND-Cyprus-Gründer Ozan Dökmecioğlu und das Investitionsportfolio, das er mit DND Homes in den USA und in Nordzypern aufgebaut hat – darunter Wohnprojekte in Boston und Cambridge.",
    date: "2026-03-11",
    cover: "/news/haberturk-400-milyon-portfoy.webp",
    tags: ["DND Homes", "Boston"],
  },
  {
    id: "gundemkibris-2026-02-08",
    outlet: "Gündem Kıbrıs",
    title: "Tourismus- und Erfolgspreise der TRNZ im Les Ambassadeurs Hotel verliehen",
    url: "https://www.gundemkibris.com/kktc-turizm-ve-basari-odul-toreni-les-ambassadeurs-hotelde-gerceklesti",
    excerpt: "Bei der Verleihung der Tourismus- und Erfolgspreise in Kyrenia unter der Schirmherrschaft des Vizepremierministeriums und des Tourismusministeriums wurde Ozan Dökmecioğlu als „Bestes Projektentwicklungsunternehmen des Jahres“ ausgezeichnet.",
    date: "2026-02-08",
    cover: "/news/gundemkibris-turizm-basari-odulu.webp",
    tags: ["Auszeichnung"],
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
  {
    id: "mha-2025-04-28",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND Cyprus prägt die Property NC Awards",
    url: "https://www.mhahaber.com/dnd-kibris-property-nc-odullerine-damga-vurdu",
    excerpt: "DND Cyprus erhielt bei den Property NC Awards 2025 drei Auszeichnungen: Bester Newcomer (Gold), beste geplante soziokulturelle Entwicklung (Gold) für Lagoon Verde und bestes geplantes neues Gewerbeprojekt (Platin) für den Mariachi Beach Club.",
    date: "2025-04-28",
    cover: "/news/mha-propertync-2025-odulleri.webp",
    tags: ["Auszeichnung", "Lagoon Verde", "Mariachi"],
  },
  {
    id: "kibrispostasi-2023-11-08",
    outlet: "Kıbrıs Postası",
    title: "DND North Cyprus bringt La Joya Perla Residences & Beach Resort auf den Markt",
    url: "https://www.kibrispostasi.com/c68-ISKELE/n494500-dnd-kuzey-kibris-la-joya-perla-residences-beach-resortu-satisa-sundu",
    excerpt: "DND North Cyprus hat La Joya Perla Residences & Beach Resort, ein Projekt mit 384 Einheiten in İskele Bahçeler, in den Verkauf gebracht. Der Beitrag enthält Aussagen von Gründer Ozan Dökmecioğlu und Direktorin Aynur Zorba Güloğlu und stellt die Ausstattung des Projekts vor.",
    date: "2023-11-08",
    cover: "/news/kibrispostasi-la-joya-perla-lansman.webp",
    tags: ["La Joya Perla", "Markteinführung"],
  },
];





export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus in der Presse" title={<>Aktuelles</>} lead="Neues von DND, DND in der Presse und Veranstaltungen." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="de" />
      <PressBlock locale="de"><PressSection items={PRESS_ITEMS} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="de" />


    </main>
  );
}
