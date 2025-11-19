

import LandHero from "../../components/en/land/LandHero";
import LandKeyFacts from "../../components/en/land/LandKeyFacts";
import LandLocationAccess from "../../components/en/land/LandLocationAccess";
import LandPlanningInfrastructure from "../../components/en/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "../../components/en/land/LandOverviewDevelopment";
import GecitkaleOverview from "../../components/en/land/GecitkaleOverview";
import LandGallery from "../../components/en/land/LandGallery";
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
