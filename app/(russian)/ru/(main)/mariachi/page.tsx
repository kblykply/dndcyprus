import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/ru/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/ru/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/ru/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/ru/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/ru/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/mariachi",
  title: "Mariachi Beach Club, Искеле – пляж, бассейн и бар | DND Cyprus",
  description:
    "Mariachi Beach Club в Bahçeler (Искеле): пляж и бассейн с 4 джакузи, кабаны, ресторан с латиноамериканской кухней, 2 бара и DJ-вечера. Забронируйте павильон.",
  image: "/og/mariachi.jpg",
  imageAlt: "Кабаны и пляж Mariachi Beach Club",
});


export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
<CmsSection scope="mariachi" section="hero" lang="ru" as={PageHero} size="full" />
<CmsSection scope="mariachi" section="video" lang="ru" as={MariachiVideoSpotlight} />
<CmsSection scope="mariachi" section="olanaklar" lang="ru" as={MariachiHighlights} />
<CmsSection scope="mariachi" section="galeri" lang="ru" as={MariachiGalleryExpanding} />

<CmsSection scope="mariachi" section="ayricaliklar" lang="ru" as={MariachiPerksSection} />
<CmsSection scope="mariachi" section="iletisim" lang="ru" as={ContactCTAMariachi} />
    </main>
  );
}
