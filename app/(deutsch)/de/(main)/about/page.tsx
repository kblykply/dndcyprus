import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/de/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/de/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/de/about/WhyChooseUs";

import CallToAction from "@/app/components/de/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

import LeadershipTeam from "@/app/components/de/about/LeadershipTeam";
import AboutDndHomes from "@/app/components/de/about/AboutDndHomes";
import { AboutUsa, PartnerCard } from "@/app/components/azure/pages/PageSections";
import { Numbers } from "@/app/components/azure/home/FlowSections";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import { SECTION_IDS } from "@/lib/azure/nav";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "de",
  path: "/about",
  title: "Über uns – Bauträger in Nordzypern | DND Cyprus",
  description:
    "DND Cyprus ist der Zypern-Zweig der in Boston gegründeten DND Homes. Unter der Leitung von Ozan Dökmecioğlu entstehen preisgekrönte Design-Residenzen in İskele.",
});



export default async function HomePage() {
  const team = await getTeam("de"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="hakkimizda" section="hero" lang="de" as={PageHero} size="compact" imagePosition="50% 35%" /> {/* grup fotoğrafı: geniş ekranda başlar kesilmesin (26.11.2026) */}
    <CmsSection scope="hakkimizda" section="kim" lang="de" as={AboutUs} />
<CmsSection scope="hakkimizda" section="dndHomes" lang="de" as={AboutDndHomes} />
<section className="az-section" id="founder" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="de" heading="h2" /></div></section>
    <PartnerCard locale="de" />
    <section className="az-section" id="director" aria-label="Aynur Zorba Gülol"><div className="az-wrap"><AynurCard locale="de" heading="h2" /></div></section>
    {/* 22.11.2026: önce yöneticiler (kurucu, kurucu ortak, direktör), ardından tüm ekip */}
    <LeadershipTeam embedded members={team} />
    <Timeline locale="de" id="timeline" about />
    <AboutUsa locale="de" />
    <CmsSection scope="hakkimizda" section="rakamlar" lang="de" as={Numbers} locale="de" id={SECTION_IDS.de.numbers} />
    <AwardsShowcase locale="de" />


        <CmsSection scope="hakkimizda" section="misyon" lang="de" as={MissionVisionValues} />

    <CmsSection scope="hakkimizda" section="neden" lang="de" as={WhyChooseUs} />
    <CmsSection scope="hakkimizda" section="cagri" lang="de" as={CallToAction} />
    
    </main>
  );
}
