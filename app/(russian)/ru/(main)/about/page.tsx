import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/ru/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/ru/about/MissionVisionValues";
import TimelineMilestones from "@/app/components/ru/about/TimelineMilestones";
import WhyChooseUs from "@/app/components/ru/about/WhyChooseUs";

import CallToAction from "@/app/components/ru/about/CallToAction";
import OzanSpotlight from "@/app/components/ru/about/OzanSpotlight";
import AynurSpotlightAlt from "@/app/components/ru/about/AynurSpotlightAlt"

import AboutDndHomes from "@/app/components/ru/about/AboutDndHomes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/about",
  title: "О нас – девелопер недвижимости на Северном Кипре | DND Cyprus",
  description:
    "DND Cyprus — кипрское подразделение бостонской DND Homes. Под руководством Ozan Dökmecioğlu мы создаём отмеченные наградами дизайнерские резиденции в Искеле.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <PageHero size="compact" kicker="О нас" title={<>DND <b>Cyprus</b></>} lead="Инновационное видение, многолетний опыт и приверженность качественному строительству — так мы создаём будущее Кипра." image="/azure/about-uu.jpg" imageAlt="DND Cyprus" />
    <AboutUs
    
      youtubeId="jxjWP9L0SwQ"        // replace with your real ID
  poster="/DND Beach Parti 24-59.jpg" // optional
  videoTitle="Знакомство с DND Cyprus"
  images={{
    main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
    sideTop: "/dndwhoweare.jpg",
    sideBottom: "/dndtoplu.jpg",
  }}
  
  />
<AboutDndHomes
   videoId="4oSQ67UeyXQ"             // e.g. "dQw4w9WgXcQ"
  poster="/homesthumb.webp"
heading = "DND Homes — видение для Кипра"
description = "Откройте для себя наши проекты и концепцию жизни."

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
