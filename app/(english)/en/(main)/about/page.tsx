import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/en/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/en/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/en/about/WhyChooseUs";

import CallToAction from "@/app/components/en/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

import LeadershipTeam from "@/app/components/en/about/LeadershipTeam";
import AboutDndHomes from "@/app/components/en/about/AboutDndHomes";
import { AboutUsa, PartnerCard } from "@/app/components/azure/pages/PageSections";
import { Numbers } from "@/app/components/azure/home/FlowSections";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import { SECTION_IDS } from "@/lib/azure/nav";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "en",
  path: "/about",
  title: "About Us – North Cyprus Real Estate Developer | DND Cyprus",
  description:
    "DND Cyprus is the Cyprus arm of Boston-founded DND Homes. Led by Ozan Dökmecioğlu, we develop award-winning, design-led residences in Iskele. Meet our story.",
});



export default async function HomePage() {
  const team = await getTeam("en"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="hakkimizda" section="hero" lang="en" as={PageHero} size="compact" />
    <CmsSection scope="hakkimizda" section="kim" lang="en" as={AboutUs} />
<CmsSection scope="hakkimizda" section="dndHomes" lang="en" as={AboutDndHomes} />
<section className="az-section" id="founder" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="en" heading="h2" /></div></section>
    <PartnerCard locale="en" />
    <section className="az-section" id="director" aria-label="Aynur Zorba Gülol"><div className="az-wrap"><AynurCard locale="en" heading="h2" /></div></section>
    {/* 22.11.2026: önce yöneticiler (kurucu, kurucu ortak, direktör), ardından tüm ekip */}
    <LeadershipTeam embedded members={team} />
    <Timeline locale="en" id="timeline" about />
    <AboutUsa locale="en" />
    <CmsSection scope="hakkimizda" section="rakamlar" lang="en" as={Numbers} locale="en" id={SECTION_IDS.en.numbers} />
    <AwardsShowcase locale="en" />


        <CmsSection scope="hakkimizda" section="misyon" lang="en" as={MissionVisionValues} />

    <CmsSection scope="hakkimizda" section="neden" lang="en" as={WhyChooseUs} />
    <CmsSection scope="hakkimizda" section="cagri" lang="en" as={CallToAction} />
    
    </main>
  );
}
