import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import { AdvantageSections } from "@/app/components/azure/pages/PageSections";
import { PAGES } from "@/lib/azure/pages";
import { pageMetadata } from "@/lib/seo";

const t = PAGES.pl.advantage;

export const metadata = pageMetadata({
  locale: "pl",
  path: "/advantage",
  title: t.meta.title,
  description: t.meta.description,
  image: "/og/lagoon-verde.jpg",
  imageAlt: "DND Cyprus",
});

// DND Ayrıcalığı (menü: inşaat kalitesi ve mimari, sosyal yaşam ve tesisler, satış sonrası, ev sahibi ayrıcalıkları)
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="compact" kicker={t.hero.kicker} title={t.hero.title} lead={t.hero.lead} image="/azure/lv-1.jpg" imageAlt="DND Cyprus" />
      <AdvantageSections locale="pl" />
      <ContactCard locale="pl" mode="home" id="iletisim" />
    </main>
  );
}
