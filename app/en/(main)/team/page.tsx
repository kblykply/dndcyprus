import LeadershipTeam from "../../../components/en/about/LeadershipTeam";
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
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      <LeadershipTeam />
   
    
    </main>
  );
}
