import MariachiBeachClubHero from "../../components/en/mariachi/MariachiBeachClubHero";
import MariachiVideoSpotlight from "../../components/en/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "../../components/en/mariachi/MariachiHighlights";
import MariachiPerksSection from "../../components/en/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "../../components/en/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "../../components/en/mariachi/ContactCTAMariachi";
import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";


export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">
<MariachiBeachClubHero />
<MariachiVideoSpotlight />
<MariachiHighlights />
<MariachiGalleryExpanding />

<MariachiPerksSection />
<ContactCTAMariachi />


 <QuarterLogoBadge
          logoSrc="/logos/mariachi.png"
          alt="Your Project"
          href="/"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
