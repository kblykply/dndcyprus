import Perla2Hero from "../../components/perla/Perla2Hero";
import Perla2Facts from "../../components/perla/Perla2Facts";
import Perla2Overview from "../../components/perla/Perla2Overview";
import Perla2Gallery from "../../components/perla/Perla2Gallery";
import Perla2FloorPlans from "../../components/perla/Perla2FloorPlans";
import Perla2Amenities from "../../components/perla/Perla2Amenities";
import Perla2Location from "../../components/perla/Perla2Location";
import Perla2Timeline from "../../components/perla/Perla2Timeline";
import Perla2CTA from "../../components/perla/Perla2CTA";
import Hotspots from "../../components/perla/Hotspots";
import Charts from "../../components/perla/Charts";
import MariachiPerks from "../../components/mariachi/MariachiPerks";

import LaJoyaTechnicalFacilities from "../../components/la-joya/LaJoyaTechnicalFacilities";

import FlipBookGlass from "../../components/perla/FlipBookGlass";


import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/perla",
  title: "La Joya Perla İskele | Denize 700 m Daireler – DND Cyprus",
  description:
    "Bahçeler, İskele'de denize 700 m La Joya Perla: stüdyo, 1+1 loft ve 2+1 daireler, sand pool, kapalı havuz, spa ve Mariachi Beach Club ayrıcalığı. Bilgi alın.",
  image: "/og/perla.jpg",
  imageAlt: "La Joya Perla sand pool ve rezidans blokları",
});

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

eyebrow="Kasım 2024 Güncellemesi" title="La Joya Perla – Son İnşaat Güncellemesi" description="Kasım 2026 Teslim edilecek La Joya Perla Projesinde inşaat hızla ilerliyor." video={{ src: "https://www.youtube.com/embed/YSy7WB056Fg?si=v_Pogz8TpxnfIBqR", type: "youtube", title: "La Joya Perla  — Update", }} cta={{ label: "Tüm güncellemeleri gör", href: "https://www.youtube.com/@dndcyprus/videos" }}

/>

<Perla2CTA />



 <QuarterLogoBadge
          logoSrc="/logos/perla.png"
          alt="Your Project"
          href="/tr"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
