import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/de/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "de",
  path: "/team",
  title: "Unser Team – Führung, Vertrieb & Technik | DND Cyprus",
  description:
    "Lernen Sie das Team von DND Cyprus kennen: Geschäftsleitung, Vertrieb, After-Sales, Architektur, Technik und Finanzen – Ihre Ansprechpartner für Immobilien in Nordzypern.",
});



export default async function HomePage() {
  const team = await getTeam("de"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="ekipSayfasi" section="hero" lang="de" as={PageHero} size="short" imagePosition="50% 16%" />
      <LeadershipTeam showHeader={false} members={team} />
   
    
    </main>
  );
}
