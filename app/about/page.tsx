import AboutHero from "../components/about/AboutHero";
import AboutUs from "../components/about/AboutWhoWeAreGlass";
import CompanyOverview from "../components/CompanyOverview";
import MissionVisionValues from "../components/about/MissionVisionValues";
import TimelineMilestones from "../components/about/TimelineMilestones";
import LeadershipTeam from "../components/about/LeadershipTeam";
import WhyChooseUs from "../components/about/WhyChooseUs";
import ClientsPartners from "../components/about/ClientsPartners";
import CertificationsAwards from "../components/about/CertificationsAwards";
import CallToAction from "../components/about/CallToAction";
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      <AboutHero />
    <AboutUs
    
      youtubeId="jxjWP9L0SwQ"        // replace with your real ID
  poster="/DND Beach Parti 24-59.jpg" // optional
  videoTitle="DND Cyprus Tanıtım"
  images={{
    main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
    sideTop: "/dndwhoweare.jpg",
    sideBottom: "/dndtoplu.jpg",
  }}
  
  />
    <CompanyOverview />  
    <MissionVisionValues />
    <TimelineMilestones />
    <LeadershipTeam />
    <WhyChooseUs />
    <ClientsPartners />
    <CertificationsAwards />
    <CallToAction />
    
    </main>
  );
}
