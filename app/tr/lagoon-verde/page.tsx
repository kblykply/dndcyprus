import Perla2Hero from "../../components/lagoon-verde/Perla2Hero";
import Perla2Facts from "../../components/lagoon-verde/Perla2Facts";
import Perla2Overview from "../../components/lagoon-verde/Perla2Overview";
import Perla2Gallery from "../../components/lagoon-verde/Perla2Gallery";
import Perla2FloorPlans from "../../components/lagoon-verde/Perla2FloorPlans";
import Perla2Amenities from "../../components/lagoon-verde/Perla2Amenities";
import Perla2Location from "../../components/lagoon-verde/Perla2Location";
import Perla2CTA from "../../components/lagoon-verde/Perla2CTA";
import Hotspots from "../../components/lagoon-verde/Hotspots";
import Charts from "../../components/lagoon-verde/Charts";
import MariachiPerks from "../../components/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "../../components/la-joya/LaJoyaTechnicalFacilities";
import FlipBookGlass from "../../components/lagoon-verde/FlipBookGlass";


import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import LeadForm from "@/app/components/lead/LeadForm";
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
  locale="tr"
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
          href="/tr"
          size={180}         // tweak the visible radius
          hideOnMobile       // mobilde içeriğin üstüne binmesin
        />
    </main>
  );
}
