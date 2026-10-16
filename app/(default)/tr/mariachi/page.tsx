import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/mariachi/ContactCTAMariachi";
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
    <main className="relative w-full min-h-screen overflow-x-clip">
<PageHero size="full" kicker="DND Cyprus" title={<>Mariachi <b>Beach Club</b></>} lead="Akdeniz güneşiyle Latin ritmini buluşturan; pavilyon konforu, gün boyu plaj keyfi ve akşam DJ performanslarıyla ayrıcalıklı bir deneyim." image="/azure/mb-6.jpg" imageAlt="Mariachi Beach Club" logo="/logos/mariachi.png" goldTag="Platin Ödül · PropertyNC 2025" tags={["Plaj Kulübü", "Havuz & Plaj", "Pavilyonlar", "DJ Geceleri"]} chips={[{ big: "4", label: "Jakuzili havuz" }, { big: "%10", label: "DND sakinlerine indirim" }, { big: "2", label: "Bar" }]} ctas={[{ label: "Pavilyon Rezervasyonu", href: "/tr/contact" }, { label: "Menüyü Görüntüle", href: "/tr/contact", variant: "ghost" }]} />
<MariachiVideoSpotlight />
<MariachiHighlights />
<MariachiGalleryExpanding />

<MariachiPerksSection />
<ContactCTAMariachi />
    </main>
  );
}
