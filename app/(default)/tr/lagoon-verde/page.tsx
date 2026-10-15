import { DeferredCatalog } from "@/app/components/performance/DeferredMedia";
import ProjectHero from "@/app/components/azure/ProjectHero";
import Perla2Facts from "@/app/components/lagoon-verde/Perla2Facts";
import Perla2Overview from "@/app/components/lagoon-verde/Perla2Overview";
import Perla2Gallery from "@/app/components/lagoon-verde/Perla2Gallery";
import Perla2FloorPlans from "@/app/components/lagoon-verde/Perla2FloorPlans";
import Perla2Amenities from "@/app/components/lagoon-verde/Perla2Amenities";
import Perla2Location from "@/app/components/lagoon-verde/Perla2Location";
import ProjectCTA from "@/app/components/azure/ProjectCTA";
import Hotspots from "@/app/components/lagoon-verde/Hotspots";
import Charts from "@/app/components/lagoon-verde/Charts";
import MariachiPerks from "@/app/components/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "@/app/components/la-joya/LaJoyaTechnicalFacilities";



import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/lagoon-verde",
  title: "Lagoon Verde İskele | Bahçeler'de Satılık Daireler – DND Cyprus",
  description:
    "İskele Bahçeler'de lagün havuzlu Lagoon Verde: studio, 1+1 ve 2+1 daireler, aquapark, fitness ve Mariachi Beach Club ayrıcalığı. Kat planları ve fiyat için ulaşın.",
  image: "/og/lagoon-verde.jpg",
  imageAlt: "Lagoon Verde lagün havuzu ve rezidans blokları",
});

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
<ProjectHero slug="lagoon-verde" locale="tr" />

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
<DeferredCatalog locale="tr" project="lagoon-verde" />


<ProjectCTA slug="lagoon-verde" locale="tr" />
    </main>
  );
}
