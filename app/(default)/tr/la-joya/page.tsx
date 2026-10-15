import Perla2Hero from "@/app/components/la-joya/Perla2Hero";
import Perla2Facts from "@/app/components/la-joya/Perla2Facts";
import Perla2Overview from "@/app/components/la-joya/Perla2Overview";
import Perla2Gallery from "@/app/components/la-joya/Perla2Gallery";
import Perla2FloorPlans from "@/app/components/la-joya/Perla2FloorPlans";
import Perla2Location from "@/app/components/la-joya/Perla2Location";
import Perla2Timeline from "@/app/components/la-joya/Perla2Timeline";
import Perla2CTA from "@/app/components/la-joya/Perla2CTA";
import Hotspots from "@/app/components/la-joya/Hotspots";
import Charts from "@/app/components/la-joya/Charts";
import MariachiPerks from "@/app/components/mariachi/MariachiPerks";
import LaJoyaTechnicalFacilities from "@/app/components/la-joya/LaJoyaTechnicalFacilities";

import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/la-joya",
  title: "La Joya Long Beach İskele | Loft ve Penthouse – DND Cyprus",
  description:
    "2025’te tamamlanan La Joya, Long Beach, İskele’de denize 500 m: 74 konut, loft ve penthouse daireler, havuz ve Mariachi Beach Club üyeliği. Bilgi alın.",
  image: "/og/la-joya.jpg",
  imageAlt: "La Joya havuz kenarındaki loft konutlar",
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

eyebrow="2025’te Tamamlandı" title="La Joya – Tamamlanan Proje" description="La Joya projesi 2025 yılında tamamlanmıştır. Aşağıdaki Kasım 2024 videosu, tamamlanma öncesindeki inşaat sürecinin arşiv kaydıdır." video={{ src: "https://www.youtube.com/embed/VDcbFkpEQhQ?si=z9erV672JTOhKtKz", type: "youtube", title: "La Joya — Kasım 2024 İnşaat Arşivi", }} cta={{ label: "Tüm videoları gör", href: "https://www.youtube.com/@dndcyprus/videos" }}

/>

<Perla2CTA />


 <QuarterLogoBadge
          logoSrc="/logos/lajoya.png"
          alt="La Joya"
          href="/tr"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
