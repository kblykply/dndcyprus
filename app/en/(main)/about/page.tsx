import AboutHero from "../../../components/en/about/AboutHero";
import AboutUs from "../../../components/en/about/AboutWhoWeAreGlass";
import MissionVisionValues from "../../../components/en/about/MissionVisionValues";
import TimelineMilestones from "../../../components/en/about/TimelineMilestones";
import WhyChooseUs from "../../../components/en/about/WhyChooseUs";

import CallToAction from "../../../components/en/about/CallToAction";
import OzanSpotlight from "../../../components/en/about/OzanSpotlight";
import AynurSpotlightAlt from "../../../components/en/about/AynurSpotlightAlt"

import AboutDndHomes from "../../../components/en/about/AboutDndHomes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/about",
  title: "About Us – North Cyprus Real Estate Developer | DND Cyprus",
  description:
    "DND Cyprus is the Cyprus arm of Boston-founded DND Homes. Led by Ozan Dökmecioğlu, we develop award-winning, design-led residences in Iskele. Meet our story.",
});



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
<AboutDndHomes
   videoId="4oSQ67UeyXQ"             // e.g. "dQw4w9WgXcQ"
  poster="/homesthumb.webp"
heading = "DND Homes — Cyprus Vision"
description = "Discover our projects and living concept."

/>
<OzanSpotlight/>
    <TimelineMilestones />
    <AynurSpotlightAlt/>


        <MissionVisionValues />

    <WhyChooseUs />
    <CallToAction />
    
    </main>
  );
}
