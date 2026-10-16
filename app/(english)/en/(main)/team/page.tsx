import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/en/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/team",
  title: "Our Team – Leadership, Sales & Engineering | DND Cyprus",
  description:
    "Meet the DND Cyprus team: leadership, sales, after-sales, architecture, engineering and finance professionals supporting your North Cyprus property journey.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus" title={<>Our Team</>} lead="Behind the rise of every project, our team’s professionalism is our strongest foundation." image="/dndtoplu.jpg" imagePosition="50% 62%" />
      <LeadershipTeam showHeader={false} />
   
    
    </main>
  );
}
