import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/en/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/en/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/en/about/WhyChooseUs";

import CallToAction from "@/app/components/en/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

import AboutDndHomes from "@/app/components/en/about/AboutDndHomes";
import { AboutUsa, PartnerCard } from "@/app/components/azure/pages/PageSections";
import { Numbers } from "@/app/components/azure/home/FlowSections";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import { PAGES } from "@/lib/azure/pages";
import { SECTION_IDS } from "@/lib/azure/nav";
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
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="compact" kicker="About Us" title={<>DND <b>Cyprus</b></>} lead="With our innovative vision, deep-rooted experience, and commitment to quality construction, we are building the future of Cyprus." image="/azure/about-uu.jpg" imageAlt="DND Cyprus" />
    <AboutUs
    
      youtubeId="jxjWP9L0SwQ"        // replace with your real ID
  poster="/DND Beach Parti 24-59.jpg" // optional
  videoTitle="DND Cyprus Introduction"
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
<section className="az-section" id="founder" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="en" heading="h2" /></div></section>
    <PartnerCard locale="en" />
    <section className="az-section" id="director" aria-label="Aynur Zorba Güloğlu"><div className="az-wrap"><AynurCard locale="en" heading="h2" /></div></section>
    <Timeline locale="en" id="timeline" about />
    <AboutUsa locale="en" />
    <Numbers locale="en" id={SECTION_IDS.en.numbers} usa={PAGES.en.about.numbersUsa} title={PAGES.en.about.numbersTitle} />
    <AwardsShowcase locale="en" />


        <MissionVisionValues />

    <WhyChooseUs />
    <CallToAction />
    
    </main>
  );
}
