
import Hero from "../components/en/Hero";
import AwardsSection from "../components/en/AwardsSection";
import ProjectsStrip from "../components/en/ProjectsStrip";
import StoryTimeline from "../components/en/StoryTimeline";
import BeachClubPerksSection from "../components/en/BeachClubPerksSection";
import WhyDNDSection from "../components/en/WhyDNDSection";
import StatsStrip from "../components/en/StatsStrip";
import NewsBlogSection from "../components/en/NewsBlogSection";
import ContactVisitSection from "../components/en/ContactVisitSection";
import BrandsLogoSliderGlass  from "../components/en/BrandsSection";
import Payment from  "../components/en/Payment";
import IgEmbedGallery from "../components/en/IgPost";
import PressSection, { type PressItem } from "../components/PressSection";

const PRESS_ITEMS: PressItem[] = [
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
      <Hero />
            <AwardsSection />
                        <ProjectsStrip />
                                                <StoryTimeline/>
                                                                                                <Payment/>
                 <WhyDNDSection />



                        <BeachClubPerksSection />
                          <BrandsLogoSliderGlass
 
    />
                        <StatsStrip />
                        
                <IgEmbedGallery />

   <PressSection items={PRESS_ITEMS} />
                        <ContactVisitSection />
    



    

    </main>
  );
}
