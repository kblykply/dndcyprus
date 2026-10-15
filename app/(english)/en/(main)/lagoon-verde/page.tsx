import { DeferredCatalog } from "@/app/components/performance/DeferredMedia";
import ProjectHero from "@/app/components/azure/ProjectHero";
import Perla2Facts from "@/app/components/en/lagoon-verde/Perla2Facts";
import Perla2Overview from "@/app/components/en/lagoon-verde/Perla2Overview";
import Perla2Gallery from "@/app/components/en/lagoon-verde/Perla2Gallery";
import Perla2FloorPlans from "@/app/components/en/lagoon-verde/Perla2FloorPlans";
import Perla2Amenities from "@/app/components/en/lagoon-verde/Perla2Amenities";
import Perla2Location from "@/app/components/en/lagoon-verde/Perla2Location";
import ProjectCTA from "@/app/components/azure/ProjectCTA";
import Hotspots from "@/app/components/en/lagoon-verde/Hotspots";
import Charts from "@/app/components/en/lagoon-verde/Charts";
import MariachiPerks from "@/app/components/en/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "@/app/components/en/la-joya/LaJoyaTechnicalFacilities";



import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/lagoon-verde",
  title: "Lagoon Verde Iskele – Apartments for Sale | DND Cyprus",
  description:
    "Lagoon Verde in Bahçeler, Iskele: studio, 1+1 and 2+1 apartments with a lagoon pool, aqua park, fitness and Mariachi Beach Club perks. Get floor plans and prices.",
  image: "/og/lagoon-verde.jpg",
  imageAlt: "Lagoon Verde lagoon pool and residence blocks",
});

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
<ProjectHero slug="lagoon-verde" locale="en" />

<Perla2Gallery /> 




<Perla2Overview />
<Perla2Facts />

<LaJoyaTechnicalFacilities />

<Hotspots/>



<Perla2FloorPlans />
<MariachiPerks />
<Charts />

<Perla2Amenities />
<Perla2Location />
<DeferredCatalog locale="en" project="lagoon-verde" />


<ProjectCTA slug="lagoon-verde" locale="en" />
    </main>
  );
}
