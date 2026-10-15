import PageHero from "@/app/components/azure/PageHero";


import LandKeyFacts from "@/app/components/pl/land/LandKeyFacts";
import LandLocationAccess from "@/app/components/pl/land/LandLocationAccess";
import LandPlanningInfrastructure from "@/app/components/pl/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "@/app/components/pl/land/LandOverviewDevelopment";
import GecitkaleOverview from "@/app/components/pl/land/GecitkaleOverview";
import LandGallery from "@/app/components/pl/land/LandGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/gecitkale",
  title: "Działka na sprzedaż w Geçitkale, İskele, Cypr Północny | DND Cyprus",
  description:
    "Działka o powierzchni 9 840 m² w Geçitkale (İskele), przeznaczona wg Fasıl 96 pod wille, bliźniaki i apartamenty; 12 min do Long Beach, 25 min do lotniska Ercan. Zapraszamy po szczegóły.",
  image: "/og/gecitkale.jpg",
  imageAlt: "Widok z lotu ptaka na działkę w Geçitkale i jej otoczenie",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      
<PageHero size="compact" kicker="DND Cyprus" title={<>Geçitkale</>} lead="Działka w dynamicznie rozwijającej się okolicy, z potencjałem zabudowy pod wille, bliźniaki i budynki apartamentowe." image="/gecitkaleimage.jpg" imageAlt="Geçitkale" tags={["Działka na sprzedaż", "Geçitkale, İskele", "Przeznaczenie: Fasıl 96"]} chips={[{ big: "~5 kondygnacji", label: "Potencjał zabudowy" }]} ctas={[{ label: "Skontaktuj się z nami", href: "/pl/contact" }]} />
<GecitkaleOverview />

<LandKeyFacts />
<LandGallery />

<LandLocationAccess />
<LandOverviewDevelopment />
<LandPlanningInfrastructure />

    </main>
  );
}
