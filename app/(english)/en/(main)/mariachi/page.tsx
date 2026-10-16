import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/en/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/en/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/en/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/en/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/en/mariachi/ContactCTAMariachi";
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
    <main className="relative w-full min-h-screen overflow-x-clip">
<PageHero size="full" kicker="DND Cyprus" title={<>Mariachi <b>Beach Club</b></>} lead="An exclusive experience where the Mediterranean sun meets Latin rhythm, with pavilion comfort, all-day beach enjoyment and evening DJ performances." image="/azure/mb-6.jpg" imageAlt="Mariachi Beach Club" logo="/logos/mariachi.png" goldTag="Platinum Award · PropertyNC 2025" tags={["Beach Club", "Pool & Beach", "Pavilions", "DJ Nights"]} chips={[{ big: "4", label: "Jacuzzi pool" }, { big: "10%", label: "Discount for DND residents" }, { big: "2", label: "Bars" }]} ctas={[{ label: "Book a Pavilion", href: "/en/contact" }, { label: "View Menu", href: "/en/contact", variant: "ghost" }]} />
<MariachiVideoSpotlight />
<MariachiHighlights />
<MariachiGalleryExpanding />

<MariachiPerksSection />
<ContactCTAMariachi />
    </main>
  );
}
