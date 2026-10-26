import PageHero from "@/app/components/azure/PageHero";
import PressSection, { type PressItem } from "@/app/components/en/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";

export const metadata = pageMetadata({
  locale: "en",
  path: "/press",
  title: "Press Coverage & News | DND Cyprus",
  description:
    "DND Cyprus in the press: coverage from Kıbrıs Postası, Yenidüzen, Haber Kıbrıs and more, including the completion of La Joya Residences and Holiday Village.",
});

const PRESS_ITEMS: PressItem[] = [
  // 25 Ekim 2026: NeoCity ilk etap satışta (MHA ve Ya Haber aynı içerik; birini aldık)
  {
    id: "kibrisvizyon-2026-10-25",
    outlet: "Kıbrıs Vizyon",
    title: "NeoCity: A New DND Cyprus Project for Local Families",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprustan-yerli-ailelere-ozel-neocity-projesi-4695",
    excerpt: "DND Cyprus has put the first phase of NeoCity on sale, near Eastern Mediterranean University in the Famagusta region. The villas combine modern Mediterranean architecture, private gardens and a family-focused neighbourhood concept; payments are made in Turkish lira under the 5 Zeros model, with no interest, bank, guarantor, exchange-rate difference or maturity charge.",
    date: "2026-10-25",
    cover: "/news/kibrisvizyon-neocity.webp",
    tags: ["NeoCity", "5 Zeros"],
  },
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "A Chance to Own a Home in North Cyprus Without Borrowing in Sterling",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    excerpt: "DND Cyprus founder Ozan Dökmecioğlu has developed a new home financing model for buyers who earn in Turkish lira. For a limited number of residences at the award-winning Lagoon Verde project, payments are made in Turkish lira; instalments of up to 60 months are interest-free with no maturity difference, and are updated periodically in line with the TRNC minimum wage increase rather than the sterling exchange rate. The model offers an alternative way to own a home in North Cyprus — for holidays, living or investment — without currency risk.",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli-v3.webp",
    tags: ["Lagoon Verde", "TL Payment Model"],
  },
  {
    // 19 Ekim 2026: Lagoon Verde TL modeli. Aynı içerikli Çekiç Magazin haberinin (MHA ile aynı başlık ve görsel) yerine
    id: "fuardergisi-2026-10-19",
    outlet: "Fuar Dergisi",
    title: "DND Cyprus Offers Homes in North Cyprus in Turkish Lira Instead of Sterling",
    url: "https://www.fuardergisi.com.tr/dnd-cyprustan-kuzey-kibrista-sterlin-yerine-tl-ile-konut-satis-modeli",
    excerpt: "DND Cyprus has introduced a Turkish lira payment model for a limited number of residences at Lagoon Verde. Under the company-financed plan of up to 60 months, payments are made in lira and instalments are updated periodically in line with the TRNC minimum wage increase rather than the sterling exchange rate.",
    date: "2026-10-19",
    cover: "/news/fuardergisi-lagoon-verde-tl.webp",
    tags: ["Lagoon Verde", "TL Payment Model"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "Up to 60 Months Interest-Free: DND Cyprus’ Turkish Lira Home Financing",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    excerpt: "Announced by founder Ozan Dökmecioğlu, the model lets buyers pay in Turkish lira, with instalments tied to TRNC minimum wage increases instead of sterling. Valid for a limited number of residences at Lagoon Verde, the plan offers up to 60 months of interest-free payments with no maturity difference.",
    date: "2026-10-14",
    cover: "/news/50fifty-haber-kapak-v2.webp",
    tags: ["TL Payment Model", "DND Cyprus"],
  },
  {
    id: "ekonomist-2026-09-30",
    outlet: "Ekonomist",
    title: "DND Cyprus Makes a $50 Million Investment in North Cyprus",
    url: "https://www.ekonomist.com.tr/talip-yilmaz/dnd-cyprus-tan-kktc-de-50-milyon-dolarlik-yatirim--79348",
    excerpt: "Ekonomist columnist Talip Yılmaz writes about DND Cyprus’ three years of real estate investment in North Cyprus, highlighting the success of its La Joya projects in İskele, the completion of La Joya and the company’s new developments in the region.",
    date: "2026-09-30",
    cover: "/news/ekonomist-dnd-50-milyon-yatirim.webp",
    tags: ["Investment", "La Joya"],
  },
  {
    id: "nethaber-2026-09-29",
    outlet: "Net Haber",
    title: "Conflicts in the Middle East Reshape Investment Routes: North Cyprus Becomes a Magnet",
    url: "https://www.nethaber.com.tr/haber/orta-dogudaki-catismalar-yatirim-rotasini-degistirdi-kktc-cazibe-merkezi-oldu-1009797",
    excerpt: "Speaking to İHA, DND Cyprus Chairman Ozan Dökmecioğlu explains how investor interest in North Cyprus has grown after recent regional developments, pointing to foreign-currency rental income and short payback periods.",
    date: "2026-09-29",
    cover: "/news/nethaber-la-joya-havadan.webp",
    tags: ["Interview", "Investment"],
  },
  {
    id: "halkinsesi-2026-09-26",
    outlet: "Halkın Sesi",
    title: "Champion Larnaka Gençler Birliği U17 Team Meets Its Sponsor over Dinner",
    url: "https://www.halkinsesikibris.com/sampiyon-larnaka-gencler-birligi-u17-takimi-sponsoruyla-yemekte-bulustu",
    excerpt: "The championship-winning Larnaka Gençler Birliği U17 team came together at a dinner hosted by its sponsor DND Cyprus. The evening celebrated the title and underlined the value of investing in young athletes.",
    date: "2026-09-26",
    cover: "/news/halkinsesi-larnaka-u17.webp",
    tags: ["Sport", "Sponsorship"],
  },
  {
    id: "kibrisvizyon-2026-09-24",
    outlet: "Kıbrıs Vizyon",
    title: "A New Way of Living in İskele with DND Cyprus",
    url: "https://www.kibrisvizyon.com/haber/dnd-cyprus-ile-iskelede-yeni-bir-yasam-anlayisi-4690",
    excerpt: "The article tells the story of Netice and Ozan Dökmecioğlu, who brought their Boston real estate experience to North Cyprus and focused on İskele. With insights from DND Cyprus co-founder Netice Dökmecioğlu, it highlights La Joya, La Joya Perla, La Joya Perla II and Lagoon Verde, as well as Joy Cafe at La Joya, where home ownership meets social life and tourism.",
    date: "2026-09-24",
    cover: "/news/kibrisvizyon-iskele-yasam.webp",
    tags: ["Interview", "İskele"],
  },
  {
    id: "yeniduzen-2026-09-16",
    outlet: "YENİDÜZEN",
    title: "Joy Cafe & Bar Opens in İskele",
    url: "https://www.yeniduzen.com/joy-cafe-bar-iskelede-hizmete-acildi-199408h.htm",
    excerpt: "Joy Cafe & Bar has opened within DND Cyprus’ La Joya Residences & Resort in İskele. The poolside venue welcomes residents and hotel guests as well as locals and visitors to the area.",
    date: "2026-09-16",
    cover: "/news/yeniduzen-joy-cafe-bar.webp",
    tags: ["La Joya", "Opening"],
  },
  {
    id: "yeniduzen-2026-08-17",
    outlet: "YENİDÜZEN",
    title: "DND Cyprus Supports Art and Creative Work: “tüş” Begins Its Festival Journey",
    url: "https://www.yeniduzen.com/dnd-cyprustan-sanata-ve-yaratici-uretime-destek-tus-festival-yolculuguna-basladi-198450h.htm",
    excerpt: "DND Cyprus is among the supporters of “tüş”, an experimental short film directed by Cansu Ezgi Bozkurt that is screening at festivals in Türkiye and Europe. Co-founder Netice Dökmecioğlu stressed the importance of supporting women in the arts and creative industries.",
    date: "2026-08-17",
    cover: "/news/yeniduzen-tus-kisa-film.webp",
    tags: ["Art", "Sponsorship"],
  },
  {
    id: "mha-2026-07-30",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "Dökmecioğlu: We Saw İskele’s Potential Early",
    url: "https://www.mhahaber.com/dokmecioglu-iskelenin-potansiyelini-erken-gorduk",
    excerpt: "Ozan Dökmecioğlu explains that DND saw İskele’s potential early and builds not just homes but destinations for living, describing La Joya, La Joya Perla, Perla II, Lagoon Verde and the beach club as parts of a single vision.",
    date: "2026-07-30",
    cover: "/news/mha-iskele-potansiyel.webp",
    tags: ["Interview", "İskele"],
  },
  {
    id: "haberturk-2026-03-11",
    outlet: "Habertürk",
    title: "A $400 Million Portfolio Built in the USA",
    url: "https://yerel-haberler.haberturk.com/kayseri-haberleri/abdye-400-milyon-dolarlik-portfoy-116967814",
    excerpt: "This İHA story profiles DND Cyprus founder Ozan Dökmecioğlu and the investment portfolio he has built with DND Homes in the USA and North Cyprus, including residential projects in Boston and Cambridge.",
    date: "2026-03-11",
    cover: "/news/haberturk-400-milyon-portfoy.webp",
    tags: ["DND Homes", "Boston"],
  },
  {
    id: "gundemkibris-2026-02-08",
    outlet: "Gündem Kıbrıs",
    title: "TRNC Tourism and Achievement Awards Held at Les Ambassadeurs Hotel",
    url: "https://www.gundemkibris.com/kktc-turizm-ve-basari-odul-toreni-les-ambassadeurs-hotelde-gerceklesti",
    excerpt: "At the TRNC Tourism and Achievement Awards in Kyrenia, held under the auspices of the Deputy Prime Ministry and Ministry of Tourism, Ozan Dökmecioğlu received the “Best Project Development Company of the Year” award.",
    date: "2026-02-08",
    cover: "/news/gundemkibris-turizm-basari-odulu.webp",
    tags: ["Award"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND Announced the Good News: La Joya is Completed",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    excerpt: "DND Cyprus announced the completion of La Joya Residences and Holiday Village in İskele Long Beach. The project of 74 private residences is now ready to welcome its owners.",
    date: "2025-11-04",
    cover: "/news/mhacover.webp",
    tags: ["La Joya", "DND Cyprus"],
  },
  {
    id: "haberkibris-2025-11-04",
    outlet: "Haber Kıbrıs",
    title:
      "DND Cyprus Announces the Completion of La Joya Residences and Holiday Village",
    url: "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    excerpt: "La Joya Residences and Holiday Village is complete: DND Cyprus announced that the İskele Long Beach project is ready to welcome its owners.",
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
  {
    id: "mha-2025-04-28",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND Cyprus Makes Its Mark at the Property NC Awards",
    url: "https://www.mhahaber.com/dnd-kibris-property-nc-odullerine-damga-vurdu",
    excerpt: "DND Cyprus came away from the 2025 Property NC Awards with three honours: Best Newcomer (Gold), Best Proposed Socio-Cultural Development (Gold) for Lagoon Verde and Best Proposed New Commercial Project (Platinum) for Mariachi Beach Club.",
    date: "2025-04-28",
    cover: "/news/mha-propertync-2025-odulleri.webp",
    tags: ["Award", "Lagoon Verde", "Mariachi"],
  },
  {
    id: "kibrispostasi-2023-11-08",
    outlet: "Kıbrıs Postası",
    title: "DND North Cyprus Launches La Joya Perla Residences & Beach Resort",
    url: "https://www.kibrispostasi.com/c68-ISKELE/n494500-dnd-kuzey-kibris-la-joya-perla-residences-beach-resortu-satisa-sundu",
    excerpt: "DND North Cyprus has put La Joya Perla Residences & Beach Resort, a 384-unit project in İskele Bahçeler, on sale. The story features comments from founder Ozan Dökmecioğlu and director Aynur Zorba Güloğlu and outlines the project’s amenities.",
    date: "2023-11-08",
    cover: "/news/kibrispostasi-la-joya-perla-lansman.webp",
    tags: ["La Joya Perla", "Launch"],
  },
];





export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus in the press" title={<>News</>} lead="News from DND, DND in the press and events." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="en" />
      <PressBlock locale="en"><PressSection items={PRESS_ITEMS} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="en" />


    </main>
  );
}
