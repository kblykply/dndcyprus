import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/de/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/de/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/de/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/de/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/de/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";

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
<PageHero size="full" kicker="DND Cyprus" title={<>Mariachi <b>Beach Club</b></>} lead="Ein exklusives Erlebnis, bei dem die Mittelmeersonne auf lateinamerikanischen Rhythmus trifft – mit Pavillon-Komfort, Strandgenuss den ganzen Tag und DJ-Auftritten am Abend." image="/azure/mb-6.jpg" imageAlt="Mariachi Beach Club" logo="/logos/mariachi.png" goldTag="Platinpreis · PropertyNC 2025" tags={["Beach Club", "Pool & Strand", "Pavillons", "DJ-Abende"]} chips={[{ big: "4", label: "Jacuzzi-Pools" }, { big: "10 %", label: "Rabatt für DND-Bewohner" }, { big: "2", label: "Bars" }]} ctas={[{ label: "Pavillon reservieren", href: "/de/contact" }, { label: "Speisekarte ansehen", href: "/de/contact", variant: "ghost" }]} />
<MariachiVideoSpotlight />
<MariachiHighlights />
<MariachiGalleryExpanding />

<MariachiPerksSection />
<ContactCTAMariachi />
    </main>
  );
}
