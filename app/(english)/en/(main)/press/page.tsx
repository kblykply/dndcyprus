import { getPress } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import PressSection from "@/app/components/en/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "en",
  path: "/press",
  title: "Press Coverage & News | DND Cyprus",
  description:
    "DND Cyprus in the press: coverage from Kıbrıs Postası, Yenidüzen, Haber Kıbrıs and more, including the completion of La Joya Residences and Holiday Village.",
});

export default async function HomePage() {
  const press = await getPress("en"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="haberler" section="hero" lang="en" as={PageHero} size="short" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="en" />
      <PressBlock locale="en"><PressSection items={press} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="en" />

    </main>
  );
}
