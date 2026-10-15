import { DeferredCatalog } from "@/app/components/performance/DeferredMedia";
import ProjectHero from "@/app/components/azure/ProjectHero";
import Perla2Facts from "@/app/components/perla/Perla2Facts";
import Perla2Overview from "@/app/components/perla/Perla2Overview";
import Perla2Gallery from "@/app/components/perla/Perla2Gallery";
import Perla2FloorPlans from "@/app/components/perla/Perla2FloorPlans";
import Perla2Amenities from "@/app/components/perla/Perla2Amenities";
import Perla2Location from "@/app/components/perla/Perla2Location";
import Perla2Timeline from "@/app/components/perla/Perla2Timeline";
import ProjectCTA from "@/app/components/azure/ProjectCTA";
import Hotspots from "@/app/components/perla/Hotspots";
import Charts from "@/app/components/perla/Charts";
import MariachiPerks from "@/app/components/mariachi/MariachiPerks";

import LaJoyaTechnicalFacilities from "@/app/components/la-joya/LaJoyaTechnicalFacilities";




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
    <main className="relative w-full min-h-screen overflow-x-hidden">
<ProjectHero slug="perla" locale="tr" />


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

<DeferredCatalog locale="tr" project="perla" />

<Perla2Timeline

eyebrow="Kasım 2024 Güncellemesi" title="La Joya Perla – Son İnşaat Güncellemesi" description="Kasım 2026’da teslim edilecek La Joya Perla projesinde inşaat hızla ilerliyor." video={{ src: "https://www.youtube.com/embed/YSy7WB056Fg?si=v_Pogz8TpxnfIBqR", type: "youtube", title: "La Joya Perla  — Update", }} cta={{ label: "Tüm güncellemeleri gör", href: "https://www.youtube.com/@dndcyprus/videos" }}

/>

<ProjectCTA slug="perla" locale="tr" />
    </main>
  );
}
