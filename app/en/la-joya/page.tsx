import Perla2Hero from "../../components/en/la-joya/Perla2Hero";
import Perla2Facts from "../../components/en/la-joya/Perla2Facts";
import Perla2Overview from "../../components/en/la-joya/Perla2Overview";
import Perla2Gallery from "../../components/en/la-joya/Perla2Gallery";
import Perla2FloorPlans from "../../components/en/la-joya/Perla2FloorPlans";
import Perla2Location from "../../components/en/la-joya/Perla2Location";
import Perla2Timeline from "../../components/en/la-joya/Perla2Timeline";
import Perla2CTA from "../../components/en/la-joya/Perla2CTA";
import Hotspots from "../../components/en/la-joya/Hotspots";
import Charts from "../../components/en/la-joya/Charts";
import MariachiPerks from "../../components/en/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "../../components/en/la-joya/LaJoyaTechnicalFacilities";

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

eyebrow="November 2024 Update" title="La Joya – Latest Construction Update" description="Construction at the La Joya project, which will be delivered soon, is progressing rapidly." video={{ src: "https://www.youtube.com/embed/VDcbFkpEQhQ?si=z9erV672JTOhKtKz", type: "youtube", title: "La Joya  — Update", }} cta={{ label: "View all updates", href: "https://www.youtube.com/@dndcyprus/videos" }}

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
