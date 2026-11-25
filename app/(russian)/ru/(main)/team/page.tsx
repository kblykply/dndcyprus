import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/ru/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/team",
  title: "Наша команда – руководство, продажи и инженеры | DND Cyprus",
  description:
    "Познакомьтесь с командой DND Cyprus: руководство, продажи, послепродажный сервис, архитекторы, инженеры и финансисты помогут вам на пути к недвижимости на Северном Кипре.",
});



export default async function HomePage() {
  const team = await getTeam("ru"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="ekipSayfasi" section="hero" lang="ru" as={PageHero} size="short" imagePosition="50% 16%" />
      <LeadershipTeam showHeader={false} members={team} />
   
    
    </main>
  );
}
