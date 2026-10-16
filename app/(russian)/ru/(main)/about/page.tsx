import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/ru/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/ru/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/ru/about/WhyChooseUs";

import CallToAction from "@/app/components/ru/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

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
    <main className="relative w-full min-h-screen overflow-x-clip">
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
<section className="az-section" id="founder" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="ru" heading="h2" /></div></section>
    <Timeline locale="ru" id="timeline" about />
    <section className="az-section" id="director" aria-label="Aynur Zorba Güloğlu"><div className="az-wrap"><AynurCard locale="ru" heading="h2" /></div></section>


        <MissionVisionValues />

    <WhyChooseUs />
    <CallToAction />
    
    </main>
  );
}
