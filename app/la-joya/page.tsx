import Perla2Hero from "../components/la-joya/Perla2Hero";
import Perla2Facts from "../components/la-joya/Perla2Facts";
import Perla2Overview from "../components/la-joya/Perla2Overview";
import Perla2Gallery from "../components/la-joya/Perla2Gallery";
import Perla2FloorPlans from "../components/la-joya/Perla2FloorPlans";
import Perla2Amenities from "../components/la-joya/Perla2Amenities";
import Perla2Location from "../components/la-joya/Perla2Location";
import Perla2Timeline from "../components/la-joya/Perla2Timeline";
import Perla2CTA from "../components/la-joya/Perla2CTA";
import Hotspots from "../components/la-joya/Hotspots";
import Charts from "../components/la-joya/Charts";
import MariachiPerks from "../components/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "../components/la-joya/LaJoyaTechnicalFacilities";

import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";


export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">
<Perla2Hero />
<Perla2Overview />
<Perla2Facts />



<Perla2Gallery /> 
<LaJoyaTechnicalFacilities />

<Hotspots/>



<Perla2FloorPlans />

<MariachiPerks />
<Charts />

<Perla2Location />
<Perla2Timeline />
<Perla2CTA />


 <QuarterLogoBadge
          logoSrc="/logos/lajoya.png"
          alt="Your Project"
          href="/"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
