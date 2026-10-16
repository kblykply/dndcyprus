import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/pl/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/pl/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/pl/about/WhyChooseUs";

import CallToAction from "@/app/components/pl/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

import AboutDndHomes from "@/app/components/pl/about/AboutDndHomes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/about",
  title: "O nas – deweloper nieruchomości na Cyprze Północnym | DND Cyprus",
  description:
    "DND Cyprus to cypryjski oddział firmy DND Homes założonej w Bostonie. Pod kierownictwem Ozana Dökmecioğlu tworzymy nagradzane rezydencje o przemyślanym designie w İskele. Zapraszamy do poznania naszej historii.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <PageHero size="compact" kicker="O nas" title={<>DND <b>Cyprus</b></>} lead="Dzięki innowacyjnej wizji, wieloletniemu doświadczeniu i dbałości o jakość wykonania budujemy przyszłość Cypru." image="/azure/about-uu.jpg" imageAlt="DND Cyprus" />
    <AboutUs
    
      youtubeId="jxjWP9L0SwQ"        // replace with your real ID
  poster="/DND Beach Parti 24-59.jpg" // optional
  videoTitle="DND Cyprus – film o firmie"
  images={{
    main: "/dndwhoweare.jpg",   // used only if no youtubeId or as poster fallback
    sideTop: "/dndwhoweare.jpg",
    sideBottom: "/dndtoplu.jpg",
  }}
  
  />
<AboutDndHomes
   videoId="4oSQ67UeyXQ"             // e.g. "dQw4w9WgXcQ"
  poster="/homesthumb.webp"
heading = "DND Homes — wizja dla Cypru"
description = "Zapraszamy do poznania naszych projektów i koncepcji życia."

/>
<section className="az-section" id="founder" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="pl" heading="h2" /></div></section>
    <Timeline locale="pl" id="timeline" about />
    <section className="az-section" id="director" aria-label="Aynur Zorba Güloğlu"><div className="az-wrap"><AynurCard locale="pl" heading="h2" /></div></section>


        <MissionVisionValues />

    <WhyChooseUs />
    <CallToAction />
    
    </main>
  );
}
