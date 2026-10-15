import { DeferredInstagram, DeferredPayment } from "@/app/components/performance/DeferredMedia";

import Hero from "@/app/components/en/Hero";
import AwardsSection from "@/app/components/en/AwardsSection";
import ProjectsStrip from "@/app/components/en/ProjectsStrip";
import StoryTimeline from "@/app/components/en/StoryTimeline";
import BeachClubPerksSection from "@/app/components/en/BeachClubPerksSection";
import WhyDNDSection from "@/app/components/en/WhyDNDSection";
import StatsStrip from "@/app/components/en/StatsStrip";
import NewsBlogSection from "@/app/components/en/NewsBlogSection";
import ContactVisitSection from "@/app/components/en/ContactVisitSection";
import BrandsLogoSliderGlass  from "@/app/components/en/BrandsSection";


import PressSection, { type PressItem } from "@/app/components/en/PressSection";
import ProjectsHeroFullSlider from "@/app/components/en/projects/ProjectsHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "",
  title: "North Cyprus Property Developer & Apartments | DND Cyprus",
  description:
    "Award-winning developer DND Cyprus builds seaside homes in Iskele: Lagoon Verde, La Joya Perla and Perla II, with Mariachi Beach Club perks. See our projects.",
});
const PRESS_ITEMS: PressItem[] = [
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "A Chance to Own a Home in North Cyprus Without Borrowing in Sterling",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli-v2.webp",
    tags: ["Lagoon Verde", "TL Payment Model"],
  },
  {
    id: "cekicmagazin-2026-10-14",
    outlet: "Çekiç Magazin",
    title: "DND Cyprus Brings Turkish Lira Home Financing to Local Residents",
    url: "https://cekicmagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani",
    date: "2026-10-14",
    cover: "/news/tl-konut-finansmani-v2.webp",
    tags: ["TL Payment Model", "DND Cyprus"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "Up to 60 Months Interest-Free: DND Cyprus’ Turkish Lira Home Financing",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    date: "2026-10-14",
    cover: "/news/50fifty-tl-konut-finansmani.webp",
    tags: ["TL Payment Model", "DND Cyprus"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND Announced the Good News: La Joya is Completed",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
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
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
];








export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
            <ProjectsHeroFullSlider />

            <DeferredPayment locale="en" />
            <AwardsSection />
                        <ProjectsStrip />
                                                <StoryTimeline/>
                 <WhyDNDSection />



                        <BeachClubPerksSection />
                          <BrandsLogoSliderGlass
 
    />
                        <StatsStrip />
                        
                <DeferredInstagram locale="en" />

   <PressSection items={PRESS_ITEMS} />
                        <ContactVisitSection />
    



    

    </main>
  );
}
