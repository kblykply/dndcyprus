import Perla2Hero from "@/app/components/en/la-joya/Perla2Hero";
import Perla2Facts from "@/app/components/en/la-joya/Perla2Facts";
import Perla2Overview from "@/app/components/en/la-joya/Perla2Overview";
import Perla2Gallery from "@/app/components/en/la-joya/Perla2Gallery";
import Perla2FloorPlans from "@/app/components/en/la-joya/Perla2FloorPlans";
import Perla2Location from "@/app/components/en/la-joya/Perla2Location";
import Perla2Timeline from "@/app/components/en/la-joya/Perla2Timeline";
import Perla2CTA from "@/app/components/en/la-joya/Perla2CTA";
import Hotspots from "@/app/components/en/la-joya/Hotspots";
import Charts from "@/app/components/en/la-joya/Charts";
import MariachiPerks from "@/app/components/en/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "@/app/components/en/la-joya/LaJoyaTechnicalFacilities";

import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/la-joya",
  title: "La Joya Long Beach Iskele – Lofts & Penthouses | DND Cyprus",
  description:
    "Completed in 2025, La Joya in Long Beach, Iskele offers 74 low-rise homes, lofts and penthouses, 500 m from the sea, with Mariachi Beach Club membership.",
  image: "/og/la-joya.jpg",
  imageAlt: "La Joya poolside loft residences",
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

<Perla2Location />
<Perla2Timeline

eyebrow="Completed in 2025" title="La Joya – Completed Project" description="The La Joya project was completed in 2025. The November 2024 video below is archive footage of construction before completion." video={{ src: "https://www.youtube.com/embed/VDcbFkpEQhQ?si=z9erV672JTOhKtKz", type: "youtube", title: "La Joya — November 2024 Construction Archive", }} cta={{ label: "View all videos", href: "https://www.youtube.com/@dndcyprus/videos" }}

/>

<Perla2CTA />


 <QuarterLogoBadge
          logoSrc="/logos/lajoya.png"
          alt="La Joya"
          href="/en"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
