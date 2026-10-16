import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/about/WhyChooseUs";

import CallToAction from "@/app/components/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

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
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="compact" kicker="Hakkımızda" title={<>DND <b>Cyprus</b></>} lead="Yenilikçi vizyonumuz, köklü tecrübemiz ve kaliteli inşaat anlayışımız ile Kıbrıs’ın geleceğini inşa ediyoruz." image="/azure/about-uu.jpg" imageAlt="DND Cyprus" />
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
<section className="az-section" id="kurucu" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="tr" heading="h2" /></div></section>
    <Timeline locale="tr" id="timeline" about />
    <section className="az-section" id="direktor" aria-label="Aynur Zorba Güloğlu"><div className="az-wrap"><AynurCard locale="tr" heading="h2" /></div></section>


        <MissionVisionValues />

    <WhyChooseUs />
    <CallToAction />
    
    </main>
  );
}
