import Perla2Hero from "../../../components/en/lagoon-verde/Perla2Hero";
import Perla2Facts from "../../../components/en/lagoon-verde/Perla2Facts";
import Perla2Overview from "../../../components/en/lagoon-verde/Perla2Overview";
import Perla2Gallery from "../../../components/en/lagoon-verde/Perla2Gallery";
import Perla2FloorPlans from "../../../components/en/lagoon-verde/Perla2FloorPlans";
import Perla2Amenities from "../../../components/en/lagoon-verde/Perla2Amenities";
import Perla2Location from "../../../components/en/lagoon-verde/Perla2Location";
import Perla2CTA from "../../../components/en/lagoon-verde/Perla2CTA";
import Hotspots from "../../../components/en/lagoon-verde/Hotspots";
import Charts from "../../../components/en/lagoon-verde/Charts";
import MariachiPerks from "../../../components/en/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "../../../components/en/la-joya/LaJoyaTechnicalFacilities";
import FlipBookGlass from "../../../components/en/lagoon-verde/FlipBookGlass";


import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import LeadForm from "@/app/components/lead/LeadForm";
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

{/* Teklif formu — hero ve alt CTA "#fiyat-al" çapasına kaydırır */}
<LeadForm
  locale="en"
  project="lagoon-verde"
  projectName="Lagoon Verde"
  unitTypes={[
    "1+0 Studio Residence",
    "1+1 Loft Residence",
    "2+1 Roof Residence",
    "2+1 Garden Residence",
  ]}
/>

<Perla2CTA />

 <QuarterLogoBadge
          logoSrc="/logos/lagoon.png"
          alt="Lagoon Verde"
          href="/en"
          size={180}         // tweak the visible radius
          hideOnMobile       // mobilde içeriğin üstüne binmesin
        />
    </main>
  );
}
