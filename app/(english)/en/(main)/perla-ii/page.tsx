import { DeferredCatalog } from "@/app/components/performance/DeferredMedia";
import Perla2Hero from "@/app/components/en/perla-ii/Perla2Hero";
import Perla2Facts from "@/app/components/en/perla-ii/Perla2Facts";
import Perla2Overview from "@/app/components/en/perla-ii/Perla2Overview";
import Perla2Gallery from "@/app/components/en/perla-ii/Perla2Gallery";
import Perla2FloorPlans from "@/app/components/en/perla-ii/Perla2FloorPlans";
import Perla2Amenities from "@/app/components/en/perla-ii/Perla2Amenities";
import Perla2Location from "@/app/components/en/perla-ii/Perla2Location";
import Perla2Timeline from "@/app/components/en/perla-ii/Perla2Timeline";
import Perla2CTA from "@/app/components/en/perla-ii/Perla2CTA";
import Hotspots from "@/app/components/en/perla-ii/Hotspots";
import Charts from "@/app/components/en/perla-ii/Charts";
import MariachiPerks from "@/app/components/en/mariachi/MariachiPerks";

import LaJoyaTechnicalFacilities from "@/app/components/en/la-joya/LaJoyaTechnicalFacilities";




import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/perla-ii",
  title: "La Joya Perla II Iskele – Apartments for Sale | DND Cyprus",
  description:
    "La Joya Perla II in Bahçeler, Iskele: studio, 1+1 loft and 2+1 suites with roof terraces or gardens, plus a pool, fitness and green areas. Request floor plans.",
  image: "/og/perla-ii.jpg",
  imageAlt: "La Joya Perla II roof terraces and garden pool apartments",
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
<DeferredCatalog locale="en" project="perla-ii" />

<Perla2Timeline

eyebrow="October 2025 Update" title="La Joya Perla II – Latest Construction Update" description="Structural construction is 55% complete. Mechanical and electrical infrastructure work is progressing as planned. Sample landscaping designs for the coastal pedestrian route are being tested." video={{ src: "https://www.youtube.com/embed/YSy7WB056Fg?si=Fx0EFJ50fgHkwstW", type: "youtube", title: "La Joya Perla II — Update", }} cta={{ label: "View all updates →", href: "/en/perla-ii" }}

/>
<Perla2CTA />


 <QuarterLogoBadge
          logoSrc="/logos/perlaii.png"
          alt="La Joya Perla II"
          href="/en"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
