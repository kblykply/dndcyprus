import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/de/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/de/about/MissionVisionValues";
import TimelineMilestones from "@/app/components/de/about/TimelineMilestones";
import WhyChooseUs from "@/app/components/de/about/WhyChooseUs";

import CallToAction from "@/app/components/de/about/CallToAction";
import OzanSpotlight from "@/app/components/de/about/OzanSpotlight";
import AynurSpotlightAlt from "@/app/components/de/about/AynurSpotlightAlt"

import AboutDndHomes from "@/app/components/de/about/AboutDndHomes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/about",
  title: "Über uns – Bauträger in Nordzypern | DND Cyprus",
  description:
    "DND Cyprus ist der Zypern-Zweig der in Boston gegründeten DND Homes. Unter der Leitung von Ozan Dökmecioğlu entstehen preisgekrönte Design-Residenzen in İskele.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <PageHero size="compact" kicker="Über uns" title={<>DND <b>Cyprus</b></>} lead="Mit innovativer Vision, langjähriger Erfahrung und dem Anspruch an hochwertige Bauqualität gestalten wir die Zukunft Zyperns." image="/azure/about-uu.jpg" imageAlt="DND Cyprus" />
    <AboutUs
    
      youtubeId="jxjWP9L0SwQ"        // replace with your real ID
  poster="/DND Beach Parti 24-59.jpg" // optional
  videoTitle="Vorstellung von DND Cyprus"
  images={{
    main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
    sideTop: "/dndwhoweare.jpg",
    sideBottom: "/dndtoplu.jpg",
  }}
  
  />
<AboutDndHomes
   videoId="4oSQ67UeyXQ"             // e.g. "dQw4w9WgXcQ"
  poster="/homesthumb.webp"
heading = "DND Homes – Vision für Zypern"
description = "Entdecken Sie unsere Projekte und unser Wohnkonzept."

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
