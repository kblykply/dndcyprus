
import Hero from "./components/Hero";
import AwardsSection from "./components/AwardsSection";
import ProjectsStrip from "./components/ProjectsStrip";
import StoryTimeline from "./components/StoryTimeline";
import BeachClubPerksSection from "./components/BeachClubPerksSection";
import WhyDNDSection from "./components/WhyDNDSection";
import StatsStrip from "./components/StatsStrip";
import RegionsLifestyleSection from "./components/RegionsLifestyleSection";
import DNDProcessSection from "./components/DNDProcessSection";
import InvestorResidentAdvantagesSection from "./components/InvestorResidentAdvantagesSection";
import NewsBlogSection from "./components/NewsBlogSection";
import ContactVisitSection from "./components/ContactVisitSection";
import BrandsLogoSliderGlass  from "./components/BrandsSection";
import Payment from  "./components/Payment";
import IgEmbedGallery from "./components/IgPost";








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
