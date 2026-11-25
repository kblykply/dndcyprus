import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/en/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/en/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/en/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/en/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/en/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

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
    <main className="relative w-full min-h-screen overflow-x-clip">
<CmsSection scope="mariachi" section="hero" lang="en" as={PageHero} size="full" />
<CmsSection scope="mariachi" section="video" lang="en" as={MariachiVideoSpotlight} />
<CmsSection scope="mariachi" section="olanaklar" lang="en" as={MariachiHighlights} />
<CmsSection scope="mariachi" section="galeri" lang="en" as={MariachiGalleryExpanding} />

<CmsSection scope="mariachi" section="ayricaliklar" lang="en" as={MariachiPerksSection} />
<CmsSection scope="mariachi" section="iletisim" lang="en" as={ContactCTAMariachi} />
    </main>
  );
}
