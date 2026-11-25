import { getPress } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import PressSection from "@/app/components/pl/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/press",
  title: "Prasa i aktualności | DND Cyprus",
  description:
    "DND Cyprus w mediach: publikacje m.in. w Kıbrıs Postası, Yenidüzen i Haber Kıbrıs, w tym o ukończeniu rezydencji i wioski wakacyjnej La Joya.",
});

export default async function HomePage() {
  const press = await getPress("pl"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="haberler" section="hero" lang="pl" as={PageHero} size="short" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="pl" />
      <PressBlock locale="pl"><PressSection items={press} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="pl" />

    </main>
  );
}
