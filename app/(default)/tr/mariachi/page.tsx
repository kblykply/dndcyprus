import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

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
    <main className="relative w-full min-h-screen overflow-x-clip">
<CmsSection scope="mariachi" section="hero" lang="tr" as={PageHero} size="full" />
<CmsSection scope="mariachi" section="video" lang="tr" as={MariachiVideoSpotlight} />
<CmsSection scope="mariachi" section="olanaklar" lang="tr" as={MariachiHighlights} />
<CmsSection scope="mariachi" section="galeri" lang="tr" as={MariachiGalleryExpanding} />

<CmsSection scope="mariachi" section="ayricaliklar" lang="tr" as={MariachiPerksSection} />
<CmsSection scope="mariachi" section="iletisim" lang="tr" as={ContactCTAMariachi} />
    </main>
  );
}
