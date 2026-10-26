import { type PressItem } from "@/app/components/PressSection";
import { pageMetadata } from "@/lib/seo";
import { HOME } from "@/lib/azure/home";

// Azure tasarımı — ana sayfa bölümleri
import HomeHero from "@/app/components/azure/home/HomeHero";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import Story from "@/app/components/azure/home/Story";
import ProjectsCarousel from "@/app/components/azure/home/ProjectsCarousel";
import PressFaq from "@/app/components/azure/home/PressFaq";
import ContactCard from "@/app/components/azure/ContactCard";
import { WhyDnd, Offers, LifePerks, Numbers } from "@/app/components/azure/home/FlowSections";
import { HOME_FLOW } from "@/lib/azure/home-flow";

export const metadata = pageMetadata({
  locale: "en",
  path: "",
  title: "DND Cyprus | Award-Winning Homes and Villas in North Cyprus",
  description:
    "NeoCity, Lagoon Verde, La Joya, La Joya Perla and Perla II: award-winning projects in North Cyprus, interest-free lira payment models up to 60 months and Mariachi Beach Club privileges.",
});

const PRESS_ITEMS: PressItem[] = [
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
    id: "kibrispostasi-2025-11-04",
    outlet: "Kıbrıs Postası",
    title:
      "Dreams Came True: DND Cyprus Announces the Completion of La Joya Residences and Holiday Village",
    url: "https://www.kibrispostasi.com/c35-KIBRIS_HABERLERI/n580748-hayaller-gercek-oldu-dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu",
    excerpt: "DND Cyprus announced that La Joya Residences and Holiday Village in İskele Long Beach has been completed. The low-rise project of 74 private residences is ready for handover.",
    date: "2025-11-04",
    cover: "/news/kpcover.jpg",
    tags: ["La Joya", "Iskele Long Beach"],
  },
  {
    id: "yeniduzen-2025-11-04",
    outlet: "YENİDÜZEN",
    title:
      "DND Cyprus Announces the Completion of La Joya Residences and Holiday Village",
    url: "https://www.yeniduzen.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-188492h.htm",
    excerpt: "DND Cyprus announced that the much-anticipated La Joya Residences and Holiday Village has been officially completed and is now ready to welcome its owners.",
    date: "2025-11-04",
    cover: "/news/ydcover.jpg",
    tags: ["La Joya"],
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
];

export default function HomePage() {
  const t = HOME.en;
  const f = HOME_FLOW.en;
  // Akış (müşteri belgesi, Ekim 2026): vitrin · projeler · neden DND · ödeme fırsatları · yaşam ve ayrıcalıklar ·
  // rakamlar · haberler ve ödüller (haberlerin yanında S.S.S., kullanıcı isteğiyle) · iletişim. Ana sayfada Amerika anılmaz (Hakkımızda'da).
  return (
    <>
      <HomeHero locale="en" />
      <ProjectsCarousel locale="en" />
      <WhyDnd locale="en" />
      <Offers locale="en" />
      <LifePerks locale="en" />
      <Story locale="en" />
      <Numbers locale="en" />
      <AwardsShowcase locale="en" kicker={f.news.kicker} withProjects projectLabel={f.news.awardsProject} companyName={f.news.homesProject} />
      <PressFaq locale="en" items={PRESS_ITEMS} />
      <ContactCard locale="en" mode="home" kicker={f.contact.kicker} title={f.contact.title} lead={f.contact.lead} highlights={t.contact.highlights} image="/azure/contact-sea.webp" id="iletisim" />
    </>
  );
}
