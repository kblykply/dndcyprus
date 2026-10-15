import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/pl/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/pl/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/pl/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/pl/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/pl/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";

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
    <main className="relative w-full min-h-screen overflow-x-hidden">
<PageHero size="full" kicker="DND Cyprus" title={<>Mariachi <b>Beach Club</b></>} lead="Wyjątkowe miejsce, w którym śródziemnomorskie słońce spotyka latynoski rytm: komfortowe pawilony, cały dzień na plaży i wieczorne występy DJ-ów." image="/azure/mb-6.jpg" imageAlt="Mariachi Beach Club" logo="/logos/mariachi.png" goldTag="Platynowa Nagroda · PropertyNC 2025" tags={["Beach club", "Basen i plaża", "Pawilony", "Wieczory z DJ-em"]} chips={[{ big: "4", label: "Baseny z jacuzzi" }, { big: "10%", label: "Zniżki dla mieszkańców DND" }, { big: "2", label: "Bary" }]} ctas={[{ label: "Zarezerwuj pawilon", href: "/pl/contact" }, { label: "Zobacz menu", href: "/pl/contact", variant: "ghost" }]} />
<MariachiVideoSpotlight />
<MariachiHighlights />
<MariachiGalleryExpanding />

<MariachiPerksSection />
<ContactCTAMariachi />
    </main>
  );
}
