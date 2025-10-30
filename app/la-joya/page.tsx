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


<Perla2Gallery /> 



<Perla2Overview />
<Perla2Facts />



<LaJoyaTechnicalFacilities />

<Hotspots/>



<Perla2FloorPlans />

<MariachiPerks />
<Charts />

<Perla2Location />
<Perla2Timeline

eyebrow="Kasım 2024 Güncellemesi" title="La Joya  – Son İnşaat Güncellemesi" description="Yakında Teslim edilecek La Joya Projesinde inşaat hızla ilerliyor." video={{ src: "https://www.youtube.com/embed/VDcbFkpEQhQ?si=z9erV672JTOhKtKz", type: "youtube", title: "La Joya  — Update", }} cta={{ label: "Tüm güncellemeleri gör", href: "https://www.youtube.com/@dndcyprus/videos" }}

/>

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
