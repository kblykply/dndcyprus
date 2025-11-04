
import Hero from "../components/Hero";
import AwardsSection from "../components/AwardsSection";
import ProjectsStrip from "../components/ProjectsStrip";
import StoryTimeline from "../components/StoryTimeline";
import BeachClubPerksSection from "../components/BeachClubPerksSection";
import WhyDNDSection from "../components/WhyDNDSection";
import StatsStrip from "../components/StatsStrip";
import ContactVisitSection from "../components/ContactVisitSection";
import BrandsLogoSliderGlass  from "../components/BrandsSection";
import Payment from  "../components/Payment";
import IgEmbedGallery from "../components/IgPost";

// app/(site)/page.tsx  (or wherever you render the section)
import PressSection, { type PressItem } from "../components/PressSection";

const PRESS_ITEMS: PressItem[] = [
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
