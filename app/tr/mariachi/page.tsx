import MariachiBeachClubHero from "../../components/mariachi/MariachiBeachClubHero";
import MariachiVideoSpotlight from "../../components/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "../../components/mariachi/MariachiHighlights";
import MariachiPerksSection from "../../components/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "../../components/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "../../components/mariachi/ContactCTAMariachi";
import QuarterLogoBadge from "@/app/components/QuarterLogoBadge";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/mariachi",
  title: "Mariachi Beach Club İskele | Plaj ve Havuz – DND Cyprus",
  description:
    "Bahçeler, İskele'de Mariachi Beach Club: plaj, 4 jakuzili havuz, pavilyonlar, Latino menülü restoran, 2 bar ve DJ performansları. Pavilyonunuzu ayırtın.",
  image: "/og/mariachi.jpg",
  imageAlt: "Mariachi Beach Club pavilyonları ve plajı",
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
          href="/tr"
          size={180}         // tweak the visible radius
          // hideOnMobile     // uncomment if you want to hide on small screens
        />
    </main>
  );
}
