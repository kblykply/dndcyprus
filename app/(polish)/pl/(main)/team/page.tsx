import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/pl/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/team",
  title: "Nasz zespół – zarząd, sprzedaż i inżynieria | DND Cyprus",
  description:
    "Przedstawiamy zespół DND Cyprus: zarząd oraz specjalistów od sprzedaży, obsługi posprzedażowej, architektury, inżynierii i finansów, którzy wspierają Państwa przy zakupie nieruchomości na Cyprze Północnym.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus" title={<>Nasz zespół</>} lead="Za rozwojem każdego projektu stoi profesjonalizm naszego zespołu – to nasz najmocniejszy fundament." image="/dndtoplu.jpg" imagePosition="50% 62%" />
      <LeadershipTeam showHeader={false} />
   
    
    </main>
  );
}
