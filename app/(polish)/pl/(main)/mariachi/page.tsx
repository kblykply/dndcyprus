import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/pl/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/pl/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/pl/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/pl/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/pl/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/mariachi",
  title: "Mariachi Beach Club İskele – plaża, basen i bar | DND Cyprus",
  description:
    "Mariachi Beach Club w Bahçeler (İskele): plaża i basen z 4 jacuzzi, altany, restauracja w latynoskim stylu, 2 bary i wieczory z DJ-em. Zapraszamy do rezerwacji pawilonu.",
  image: "/og/mariachi.jpg",
  imageAlt: "Altany i plaża Mariachi Beach Club",
});


export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
<CmsSection scope="mariachi" section="hero" lang="pl" as={PageHero} size="full" />
<CmsSection scope="mariachi" section="video" lang="pl" as={MariachiVideoSpotlight} />
<CmsSection scope="mariachi" section="olanaklar" lang="pl" as={MariachiHighlights} />
<CmsSection scope="mariachi" section="galeri" lang="pl" as={MariachiGalleryExpanding} />

<CmsSection scope="mariachi" section="ayricaliklar" lang="pl" as={MariachiPerksSection} />
<CmsSection scope="mariachi" section="iletisim" lang="pl" as={ContactCTAMariachi} />
    </main>
  );
}
