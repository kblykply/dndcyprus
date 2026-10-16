import PageHero from "@/app/components/azure/PageHero";
import MariachiVideoSpotlight from "@/app/components/ru/mariachi/MariachiVideoSpotlight";
import MariachiHighlights from "@/app/components/ru/mariachi/MariachiHighlights";
import MariachiPerksSection from "@/app/components/ru/mariachi/MariachiPerksSection";
import MariachiGalleryExpanding from "@/app/components/ru/mariachi/MariachiGalleryExpanding";
import ContactCTAMariachi from "@/app/components/ru/mariachi/ContactCTAMariachi";
import { pageMetadata } from "@/lib/seo";

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
<PageHero size="full" kicker="DND Cyprus" title={<>Mariachi <b>Beach Club</b></>} lead="Эксклюзивный отдых, где средиземноморское солнце встречается с латиноамериканскими ритмами: комфорт павильонов, пляж весь день и DJ-сеты по вечерам." image="/azure/mb-6.jpg" imageAlt="Mariachi Beach Club" logo="/logos/mariachi.png" goldTag="Платиновая награда · PropertyNC 2025" tags={["Пляжный клуб", "Бассейн и пляж", "Павильоны", "DJ-вечера"]} chips={[{ big: "4", label: "бассейна-джакузи" }, { big: "10%", label: "Скидка для жителей DND" }, { big: "2", label: "бара" }]} ctas={[{ label: "Забронировать павильон", href: "/ru/contact" }, { label: "Смотреть меню", href: "/ru/contact", variant: "ghost" }]} />
<MariachiVideoSpotlight />
<MariachiHighlights />
<MariachiGalleryExpanding />

<MariachiPerksSection />
<ContactCTAMariachi />
    </main>
  );
}
