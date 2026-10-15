import { DeferredCatalog } from "@/app/components/performance/DeferredMedia";
import ProjectHero from "@/app/components/azure/ProjectHero";
import Perla2Facts from "@/app/components/perla-ii/Perla2Facts";
import Perla2Overview from "@/app/components/perla-ii/Perla2Overview";
import Perla2Gallery from "@/app/components/perla-ii/Perla2Gallery";
import Perla2FloorPlans from "@/app/components/perla-ii/Perla2FloorPlans";
import Perla2Amenities from "@/app/components/perla-ii/Perla2Amenities";
import Perla2Location from "@/app/components/perla-ii/Perla2Location";
import Perla2Timeline from "@/app/components/perla-ii/Perla2Timeline";
import ProjectCTA from "@/app/components/azure/ProjectCTA";
import Hotspots from "@/app/components/perla-ii/Hotspots";
import Charts from "@/app/components/perla-ii/Charts";
import MariachiPerks from "@/app/components/mariachi/MariachiPerks";

import LaJoyaTechnicalFacilities from "@/app/components/la-joya/LaJoyaTechnicalFacilities";




import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/perla-ii",
  title: "La Joya Perla II İskele | Satılık Daireler – DND Cyprus",
  description:
    "Bahçeler, İskele'de La Joya Perla II: stüdyo, 1+1 loft ve çatı teraslı ya da bahçeli 2+1 daireler; havuz, fitness ve yeşil alanlar. Kat planları için ulaşın.",
  image: "/og/perla-ii.jpg",
  imageAlt: "La Joya Perla II çatı terasları ve bahçe havuzlu daireler",
});


export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
<ProjectHero slug="perla-ii" locale="tr" />




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
<DeferredCatalog locale="tr" project="perla-ii" />

<Perla2Timeline

eyebrow="Ekim 2025 Güncellemesi" title="La Joya Perla II – Son İnşaat Güncellemesi" description="Kaba inşaat %55 seviyesinde. Mekanik/elektrik altyapı geçişleri planlandığı gibi ilerliyor. Sahil yaya aksı peyzajı için örnek uygulamalar test ediliyor." video={{ src: "https://www.youtube.com/embed/YSy7WB056Fg?si=Fx0EFJ50fgHkwstW", type: "youtube", title: "La Joya Perla II — Update", }} cta={{ label: "Tüm güncellemeleri gör →", href: "/tr/perla-ii" }}

/>
<ProjectCTA slug="perla-ii" locale="tr" />
    </main>
  );
}
