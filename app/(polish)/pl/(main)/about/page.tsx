import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/pl/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/pl/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/pl/about/WhyChooseUs";

import CallToAction from "@/app/components/pl/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

import LeadershipTeam from "@/app/components/pl/about/LeadershipTeam";
import AboutDndHomes from "@/app/components/pl/about/AboutDndHomes";
import { AboutUsa, PartnerCard } from "@/app/components/azure/pages/PageSections";
import { Numbers } from "@/app/components/azure/home/FlowSections";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import { SECTION_IDS } from "@/lib/azure/nav";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/about",
  title: "O nas – deweloper nieruchomości na Cyprze Północnym | DND Cyprus",
  description:
    "DND Cyprus to cypryjski oddział firmy DND Homes założonej w Bostonie. Pod kierownictwem Ozana Dökmecioğlu tworzymy nagradzane rezydencje o przemyślanym designie w İskele. Zapraszamy do poznania naszej historii.",
});



export default async function HomePage() {
  const team = await getTeam("pl"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="hakkimizda" section="hero" lang="pl" as={PageHero} size="compact" />
    <CmsSection scope="hakkimizda" section="kim" lang="pl" as={AboutUs} />
<CmsSection scope="hakkimizda" section="dndHomes" lang="pl" as={AboutDndHomes} />
<section className="az-section" id="founder" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="pl" heading="h2" /></div></section>
    <PartnerCard locale="pl" />
    <section className="az-section" id="director" aria-label="Aynur Zorba Gülol"><div className="az-wrap"><AynurCard locale="pl" heading="h2" /></div></section>
    {/* 22.11.2026: önce yöneticiler (kurucu, kurucu ortak, direktör), ardından tüm ekip */}
    <LeadershipTeam embedded members={team} />
    <Timeline locale="pl" id="timeline" about />
    <AboutUsa locale="pl" />
    <CmsSection scope="hakkimizda" section="rakamlar" lang="pl" as={Numbers} locale="pl" id={SECTION_IDS.pl.numbers} />
    <AwardsShowcase locale="pl" />


        <CmsSection scope="hakkimizda" section="misyon" lang="pl" as={MissionVisionValues} />

    <CmsSection scope="hakkimizda" section="neden" lang="pl" as={WhyChooseUs} />
    <CmsSection scope="hakkimizda" section="cagri" lang="pl" as={CallToAction} />
    
    </main>
  );
}
