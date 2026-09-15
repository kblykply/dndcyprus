

import LandHero from "../../../components/en/land/LandHero";
import LandKeyFacts from "../../../components/en/land/LandKeyFacts";
import LandLocationAccess from "../../../components/en/land/LandLocationAccess";
import LandPlanningInfrastructure from "../../../components/en/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "../../../components/en/land/LandOverviewDevelopment";
import GecitkaleOverview from "../../../components/en/land/GecitkaleOverview";
import LandGallery from "../../../components/en/land/LandGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/gecitkale",
  title: "Geçitkale Land for Sale in Iskele, North Cyprus | DND Cyprus",
  description:
    "A 9,840 m² plot in Geçitkale, Iskele, zoned under Fasıl 96 for villas, twin villas and apartments; 12 min to Long Beach, 25 min to Ercan Airport. Get details.",
  image: "/og/gecitkale.jpg",
  imageAlt: "Aerial view of the Geçitkale land and surroundings",
});
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">
      
<LandHero />
<GecitkaleOverview />

<LandKeyFacts />
<LandGallery />

<LandLocationAccess />
<LandOverviewDevelopment />
<LandPlanningInfrastructure />

    </main>
  );
}
