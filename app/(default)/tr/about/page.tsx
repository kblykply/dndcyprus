import AboutHero from "@/app/components/about/AboutHero";
import AboutUs from "@/app/components/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/about/MissionVisionValues";
import TimelineMilestones from "@/app/components/about/TimelineMilestones";
import WhyChooseUs from "@/app/components/about/WhyChooseUs";

import CallToAction from "@/app/components/about/CallToAction";
import OzanSpotlight from "@/app/components/about/OzanSpotlight";
import AynurSpotlightAlt from "@/app/components/about/AynurSpotlightAlt"

import AboutDndHomes from "@/app/components/about/AboutDndHomes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/about",
  title: "Hakkımızda | Kıbrıs Gayrimenkul Geliştiricisi – DND Cyprus",
  description:
    "DND Cyprus; Boston'da kurulan DND Homes'un Kıbrıs yapılanması. Ozan Dökmecioğlu liderliğinde İskele'de ödüllü, tasarım odaklı konut projeleri geliştiriyoruz.",
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
  heading="DND Homes — Kıbrıs Vizyonu"
  description="Projelerimizi ve yaşam konseptimizi keşfedin."
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
