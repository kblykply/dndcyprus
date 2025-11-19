

import LandHero from "../../components/land/LandHero";
import LandKeyFacts from "../../components/land/LandKeyFacts";
import LandLocationAccess from "../../components/land/LandLocationAccess";
import LandPlanningInfrastructure from "../../components/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "../../components/land/LandOverviewDevelopment";
import GecitkaleOverview from "../../components/land/GecitkaleOverview";
import LandGallery from "../../components/land/LandGallery";
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
