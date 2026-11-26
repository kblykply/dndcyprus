import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import AboutUs from "@/app/components/ru/about/AboutWhoWeAreGlass";
import MissionVisionValues from "@/app/components/ru/about/MissionVisionValues";
import Timeline from "@/app/components/azure/home/Timeline";
import WhyChooseUs from "@/app/components/ru/about/WhyChooseUs";

import CallToAction from "@/app/components/ru/about/CallToAction";
import { OzanCard, AynurCard } from "@/app/components/azure/PersonCard";

import LeadershipTeam from "@/app/components/ru/about/LeadershipTeam";
import AboutDndHomes from "@/app/components/ru/about/AboutDndHomes";
import { AboutUsa, PartnerCard } from "@/app/components/azure/pages/PageSections";
import { Numbers } from "@/app/components/azure/home/FlowSections";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import { SECTION_IDS } from "@/lib/azure/nav";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/about",
  title: "О нас – девелопер недвижимости на Северном Кипре | DND Cyprus",
  description:
    "DND Cyprus — кипрское подразделение бостонской DND Homes. Под руководством Ozan Dökmecioğlu мы создаём отмеченные наградами дизайнерские резиденции в Искеле.",
});



export default async function HomePage() {
  const team = await getTeam("ru"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="hakkimizda" section="hero" lang="ru" as={PageHero} size="compact" imagePosition="50% 35%" /> {/* grup fotoğrafı: geniş ekranda başlar kesilmesin (26.11.2026) */}
    <CmsSection scope="hakkimizda" section="kim" lang="ru" as={AboutUs} />
<CmsSection scope="hakkimizda" section="dndHomes" lang="ru" as={AboutDndHomes} />
<section className="az-section" id="founder" aria-label="Ozan Dökmecioğlu"><div className="az-wrap"><OzanCard locale="ru" heading="h2" /></div></section>
    <PartnerCard locale="ru" />
    <section className="az-section" id="director" aria-label="Aynur Zorba Gülol"><div className="az-wrap"><AynurCard locale="ru" heading="h2" /></div></section>
    {/* 22.11.2026: önce yöneticiler (kurucu, kurucu ortak, direktör), ardından tüm ekip */}
    <LeadershipTeam embedded members={team} />
    <Timeline locale="ru" id="timeline" about />
    <AboutUsa locale="ru" />
    <CmsSection scope="hakkimizda" section="rakamlar" lang="ru" as={Numbers} locale="ru" id={SECTION_IDS.ru.numbers} />
    <AwardsShowcase locale="ru" />


        <CmsSection scope="hakkimizda" section="misyon" lang="ru" as={MissionVisionValues} />

    <CmsSection scope="hakkimizda" section="neden" lang="ru" as={WhyChooseUs} />
    <CmsSection scope="hakkimizda" section="cagri" lang="ru" as={CallToAction} />
    
    </main>
  );
}
