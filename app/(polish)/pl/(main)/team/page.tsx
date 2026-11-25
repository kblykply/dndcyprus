import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/pl/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/team",
  title: "Nasz zespół – zarząd, sprzedaż i inżynieria | DND Cyprus",
  description:
    "Przedstawiamy zespół DND Cyprus: zarząd oraz specjalistów od sprzedaży, obsługi posprzedażowej, architektury, inżynierii i finansów, którzy wspierają Państwa przy zakupie nieruchomości na Cyprze Północnym.",
});



export default async function HomePage() {
  const team = await getTeam("pl"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="ekipSayfasi" section="hero" lang="pl" as={PageHero} size="short" imagePosition="50% 16%" />
      <LeadershipTeam showHeader={false} members={team} />
   
    
    </main>
  );
}
