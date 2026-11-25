import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/en/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "en",
  path: "/team",
  title: "Our Team – Leadership, Sales & Engineering | DND Cyprus",
  description:
    "Meet the DND Cyprus team: leadership, sales, after-sales, architecture, engineering and finance professionals supporting your North Cyprus property journey.",
});



export default async function HomePage() {
  const team = await getTeam("en"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="ekipSayfasi" section="hero" lang="en" as={PageHero} size="short" imagePosition="50% 16%" />
      <LeadershipTeam showHeader={false} members={team} />
   
    
    </main>
  );
}
