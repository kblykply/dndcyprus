import PageHero from "@/app/components/azure/PageHero";


import LandKeyFacts from "@/app/components/de/land/LandKeyFacts";
import LandLocationAccess from "@/app/components/de/land/LandLocationAccess";
import LandPlanningInfrastructure from "@/app/components/de/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "@/app/components/de/land/LandOverviewDevelopment";
import GecitkaleOverview from "@/app/components/de/land/GecitkaleOverview";
import LandGallery from "@/app/components/de/land/LandGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/gecitkale",
  title: "Grundstück in Geçitkale, İskele zu verkaufen | DND Cyprus",
  description:
    "Grundstück mit 9.840 m² in Geçitkale, İskele, nach Fasıl 96 bebaubar mit Villen, Doppelvillen und Apartments; 12 Min. bis Long Beach, 25 Min. zum Flughafen Ercan.",
  image: "/og/gecitkale.jpg",
  imageAlt: "Luftaufnahme des Grundstücks in Geçitkale und seiner Umgebung",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      
<PageHero size="compact" kicker="DND Cyprus" title={<>Geçitkale</>} lead="Ein Grundstück in aufstrebender Lage mit Entwicklungspotenzial für Villen, Doppelhäuser und Apartmenthäuser." image="/gecitkaleimage.jpg" imageAlt="Geçitkale" tags={["Grundstück zu verkaufen", "Geçitkale, İskele", "Baurecht: Fasıl 96"]} chips={[{ big: "~5 Geschosse", label: "Entwicklungspotenzial" }]} ctas={[{ label: "Kontakt aufnehmen", href: "/de/contact" }]} />
<GecitkaleOverview />

<LandKeyFacts />
<LandGallery />

<LandLocationAccess />
<LandOverviewDevelopment />
<LandPlanningInfrastructure />

    </main>
  );
}
