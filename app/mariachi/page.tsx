import MariachiBeachClubHero from "../components/mariachi/MariachiBeachClubHero";
import MariachiVideoSpotlight from "../components/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "../components/mariachi/MariachiHighlights";
import MariachiPerksSection from "../components/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "../components/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "../components/mariachi/ContactCTAMariachi";



export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">
<MariachiBeachClubHero />
<MariachiVideoSpotlight />
<MariachiHighlights />
<MariachiGalleryExpanding />

<MariachiPerksSection />
<ContactCTAMariachi />
    </main>
  );
}
