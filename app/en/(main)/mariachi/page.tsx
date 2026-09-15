import MariachiBeachClubHero from "../../../components/en/mariachi/MariachiBeachClubHero";
import MariachiVideoSpotlight from "../../../components/en/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "../../../components/en/mariachi/MariachiHighlights";
import MariachiPerksSection from "../../../components/en/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "../../../components/en/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "../../../components/en/mariachi/ContactCTAMariachi";
import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/mariachi",
  title: "Mariachi Beach Club Iskele – Beach, Pool & Bar | DND Cyprus",
  description:
    "Mariachi Beach Club in Bahçeler, Iskele: beach and pool with 4 jacuzzis, cabanas, a Latino-inspired restaurant, 2 bars and live DJ nights. Book your pavilion.",
  image: "/og/mariachi.jpg",
  imageAlt: "Mariachi Beach Club cabanas and beach",
});


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
          href="/en"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
