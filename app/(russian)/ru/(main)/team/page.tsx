import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/ru/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/team",
  title: "Наша команда – руководство, продажи и инженеры | DND Cyprus",
  description:
    "Познакомьтесь с командой DND Cyprus: руководство, продажи, послепродажный сервис, архитекторы, инженеры и финансисты помогут вам на пути к недвижимости на Северном Кипре.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <PageHero size="short" kicker="DND Cyprus" title={<>Наша команда</>} lead="За каждым проектом стоит профессионализм нашей команды — это наш самый прочный фундамент." image="/azure/about-beach.jpg" />
      <LeadershipTeam showHeader={false} />
   
    
    </main>
  );
}
