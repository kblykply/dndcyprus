import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/about/WhyChooseUs";

import CallToAction from "@/app/components/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

import LeadershipTeam from "@/app/components/about/LeadershipTeam";
import AboutDndHomes from "@/app/components/about/AboutDndHomes";
import { AboutUsa, PartnerCard } from "@/app/components/azure/pages/PageSections";
import { Numbers } from "@/app/components/azure/home/FlowSections";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import { SECTION_IDS } from "@/lib/azure/nav";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/about",
  title: "Hakkımızda | Kıbrıs Gayrimenkul Geliştiricisi – DND Cyprus",
  description:
    "DND Cyprus; Boston'da kurulan DND Homes'un Kıbrıs yapılanması. Ozan Dökmecioğlu liderliğinde İskele'de ödüllü, tasarım odaklı konut projeleri geliştiriyoruz.",
});



export default async function HomePage() {
  const team = await getTeam("tr"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="hakkimizda" section="hero" lang="tr" as={PageHero} size="compact" />
    <CmsSection scope="hakkimizda" section="kim" lang="tr" as={AboutUs} />
<CmsSection scope="hakkimizda" section="dndHomes" lang="tr" as={AboutDndHomes} />
<section className="az-section" id="kurucu" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="tr" heading="h2" /></div></section>
    <PartnerCard locale="tr" />
    <section className="az-section" id="direktor" aria-label="Aynur Zorba Gülol"><div className="az-wrap"><AynurCard locale="tr" heading="h2" /></div></section>
    {/* 22.11.2026: önce yöneticiler (kurucu, kurucu ortak, direktör), ardından tüm ekip */}
    <LeadershipTeam embedded members={team} />
    <Timeline locale="tr" id="timeline" about />
    <AboutUsa locale="tr" />
    <CmsSection scope="hakkimizda" section="rakamlar" lang="tr" as={Numbers} locale="tr" id={SECTION_IDS.tr.numbers} />
    <AwardsShowcase locale="tr" />


        <CmsSection scope="hakkimizda" section="misyon" lang="tr" as={MissionVisionValues} />

    <CmsSection scope="hakkimizda" section="neden" lang="tr" as={WhyChooseUs} />
    <CmsSection scope="hakkimizda" section="cagri" lang="tr" as={CallToAction} />
    
    </main>
  );
}
