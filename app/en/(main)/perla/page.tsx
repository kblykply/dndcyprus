import Perla2Hero from "../../../components/en/perla/Perla2Hero";
import Perla2Facts from "../../../components/en/perla/Perla2Facts";
import Perla2Overview from "../../../components/en/perla/Perla2Overview";
import Perla2Gallery from "../../../components/en/perla/Perla2Gallery";
import Perla2FloorPlans from "../../../components/en/perla/Perla2FloorPlans";
import Perla2Amenities from "../../../components/en/perla/Perla2Amenities";
import Perla2Location from "../../../components/en/perla/Perla2Location";
import Perla2Timeline from "../../../components/en/perla/Perla2Timeline";
import Perla2CTA from "../../../components/en/perla/Perla2CTA";
import Hotspots from "../../../components/en/perla/Hotspots";
import Charts from "../../../components/en/perla/Charts";
import MariachiPerks from "../../../components/en/mariachi/MariachiPerks";

import LaJoyaTechnicalFacilities from "../../../components/en/la-joya/LaJoyaTechnicalFacilities";

import FlipBookGlass from "../../../components/en/perla/FlipBookGlass";


import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/perla",
  title: "La Joya Perla Iskele – Apartments by the Sea | DND Cyprus",
  description:
    "La Joya Perla in Bahçeler, Iskele, 700 m from the sea: studio, 1+1 loft and 2+1 apartments, sand pool, indoor pool, spa and Mariachi Beach Club perks. Enquire.",
  image: "/og/perla.jpg",
  imageAlt: "La Joya Perla sand pool and residence blocks",
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

eyebrow="Kasım 2024 Update" title="La Joya Perla – Latest Construction Update" description="Construction at the La Joya Perla project, scheduled for delivery in November 2026, is progressing rapidly. " video={{ src: "https://www.youtube.com/embed/YSy7WB056Fg?si=v_Pogz8TpxnfIBqR", type: "youtube", title: "La Joya Perla  — Update", }} cta={{ label: "View all updates", href: "https://www.youtube.com/@dndcyprus/videos" }}

/>

<Perla2CTA />



 <QuarterLogoBadge
          logoSrc="/logos/perla.png"
          alt="Your Project"
          href="/en"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
