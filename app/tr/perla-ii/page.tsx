import Perla2Hero from "../../components/perla-ii/Perla2Hero";
import Perla2Facts from "../../components/perla-ii/Perla2Facts";
import Perla2Overview from "../../components/perla-ii/Perla2Overview";
import Perla2Gallery from "../../components/perla-ii/Perla2Gallery";
import Perla2FloorPlans from "../../components/perla-ii/Perla2FloorPlans";
import Perla2Amenities from "../../components/perla-ii/Perla2Amenities";
import Perla2Location from "../../components/perla-ii/Perla2Location";
import Perla2Timeline from "../../components/perla-ii/Perla2Timeline";
import Perla2CTA from "../../components/perla-ii/Perla2CTA";
import Hotspots from "../../components/perla-ii/Hotspots";
import Charts from "../../components/perla-ii/Charts";
import MariachiPerks from "../../components/mariachi/MariachiPerks";

import LaJoyaTechnicalFacilities from "../../components/la-joya/LaJoyaTechnicalFacilities";

import FlipBookGlass from "../../components/perla-ii/FlipBookGlass";


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

<Perla2Amenities />

<Perla2Location />
<FlipBookGlass />

<Perla2Timeline

eyebrow="Ekim 2025 Güncellemesi" title="La Joya Perla II – Son İnşaat Güncellemesi" description="Kaba inşaat %55 seviyesinde. Mekanik/elektrik altyapı geçişleri planlandığı gibi ilerliyor. Sahil yaya aksı peyzajı için örnek uygulamalar test ediliyor." video={{ src: "https://www.youtube.com/embed/YSy7WB056Fg?si=Fx0EFJ50fgHkwstW", type: "youtube", title: "La Joya Perla II — Update", }} cta={{ label: "Tüm güncellemeleri gör →", href: "/projects/perla2#updates" }}

/>
<Perla2CTA />


 <QuarterLogoBadge
          logoSrc="/logos/perlaii.png"
          alt="Your Project"
          href="/"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
