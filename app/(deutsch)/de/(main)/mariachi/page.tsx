import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/de/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/de/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/de/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/de/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/de/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "de",
  path: "/mariachi",
  title: "Mariachi Beach Club İskele – Strand, Pool & Bar | DND Cyprus",
  description:
    "Mariachi Beach Club in Bahçeler, İskele: Strand und Pool mit 4 Jacuzzis, Pavillons, lateinamerikanisch inspiriertes Restaurant, 2 Bars und Live-DJ-Abende. Pavillon reservieren.",
  image: "/og/mariachi.jpg",
  imageAlt: "Pavillons und Strand im Mariachi Beach Club",
});


export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
<CmsSection scope="mariachi" section="hero" lang="de" as={PageHero} size="full" />
<CmsSection scope="mariachi" section="video" lang="de" as={MariachiVideoSpotlight} />
<CmsSection scope="mariachi" section="olanaklar" lang="de" as={MariachiHighlights} />
<CmsSection scope="mariachi" section="galeri" lang="de" as={MariachiGalleryExpanding} />

<CmsSection scope="mariachi" section="ayricaliklar" lang="de" as={MariachiPerksSection} />
<CmsSection scope="mariachi" section="iletisim" lang="de" as={ContactCTAMariachi} />
    </main>
  );
}
