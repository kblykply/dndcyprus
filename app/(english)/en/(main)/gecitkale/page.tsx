import PageHero from "@/app/components/azure/PageHero";


import LandKeyFacts from "@/app/components/en/land/LandKeyFacts";
import LandLocationAccess from "@/app/components/en/land/LandLocationAccess";
import LandPlanningInfrastructure from "@/app/components/en/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "@/app/components/en/land/LandOverviewDevelopment";
import GecitkaleOverview from "@/app/components/en/land/GecitkaleOverview";
import LandGallery from "@/app/components/en/land/LandGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/gecitkale",
  title: "Geçitkale Land for Sale in Iskele, North Cyprus | DND Cyprus",
  description:
    "A 9,840 m² plot in Geçitkale, Iskele, zoned under Fasıl 96 for villas, twin villas and apartments; 12 min to Long Beach, 25 min to Ercan Airport. Get details.",
  image: "/og/gecitkale.jpg",
  imageAlt: "Aerial view of the Geçitkale land and surroundings",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      
<PageHero size="compact" title={<>Geçitkale</>} lead="A plot located in an emerging area, offering development potential suitable for villa, twin-house and apartment typologies." image="/gecitkaleimage.jpg" imageAlt="Geçitkale" tags={["Land for Sale", "Geçitkale, İskele", "Zoning: Fasıl 96"]} chips={[{ big: "~5 floors", label: "Development potential" }]} ctas={[{ label: "Contact us", href: "/en/contact" }]} />
<GecitkaleOverview />

<LandKeyFacts />
<LandGallery />

<LandLocationAccess />
<LandOverviewDevelopment />
<LandPlanningInfrastructure />

    </main>
  );
}
