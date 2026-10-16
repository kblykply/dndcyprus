import PageHero from "@/app/components/azure/PageHero";


import LandKeyFacts from "@/app/components/land/LandKeyFacts";
import LandLocationAccess from "@/app/components/land/LandLocationAccess";
import LandPlanningInfrastructure from "@/app/components/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "@/app/components/land/LandOverviewDevelopment";
import GecitkaleOverview from "@/app/components/land/GecitkaleOverview";
import LandGallery from "@/app/components/land/LandGallery";
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
    <main className="relative w-full min-h-screen overflow-x-clip">
      
<PageHero size="compact" kicker="DND Cyprus" title={<>Geçitkale</>} lead="Gelişen bölgede konumlanan arsa; villa, ikiz ve apart tipolojilerine uygun gelişim potansiyeli sunar." image="/gecitkaleimage.jpg" imageAlt="Geçitkale" tags={["Satılık Arsa", "Geçitkale, İskele", "Zonlama: Fasıl 96"]} chips={[{ big: "~5 kat", label: "Gelişim potansiyeli" }]} ctas={[{ label: "İletişime geçin", href: "/tr/contact" }]} />
<GecitkaleOverview />

<LandKeyFacts />
<LandGallery />

<LandLocationAccess />
<LandOverviewDevelopment />
<LandPlanningInfrastructure />

    </main>
  );
}
