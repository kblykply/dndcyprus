

import LandHero from "../../components/land/LandHero";
import LandKeyFacts from "../../components/land/LandKeyFacts";
import LandLocationAccess from "../../components/land/LandLocationAccess";
import LandPlanningInfrastructure from "../../components/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "../../components/land/LandOverviewDevelopment";
import GecitkaleOverview from "../../components/land/GecitkaleOverview";
import LandGallery from "../../components/land/LandGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/gecitkale",
  title: "Geçitkale Satılık Arsa | İskele Yatırım Fırsatı – DND Cyprus",
  description:
    "Geçitkale, İskele'de Fasıl 96 imarlı 9.840 m² arsa: villa, ikiz villa ve apartmana uygun; Long Beach'e 12, Ercan Havalimanı'na 25 dk. Detaylar için ulaşın.",
  image: "/og/gecitkale.jpg",
  imageAlt: "Geçitkale arazisi ve çevresinin havadan görünümü",
});
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">
      
<LandHero />
<GecitkaleOverview />

<LandKeyFacts />
<LandGallery />

<LandLocationAccess />
<LandOverviewDevelopment />
<LandPlanningInfrastructure />

    </main>
  );
}
