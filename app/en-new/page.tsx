
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

                        <NewsBlogSection />
                        <ContactVisitSection />
    



    

    </main>
  );
}
