import { getPress } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import PressSection from "@/app/components/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/press",
  title: "Basın Haberleri ve Duyurular | DND Cyprus",
  description:
    "Basında DND Cyprus: La Joya Rezidansları ve Tatil Köyü'nün tamamlanması başta olmak üzere Kıbrıs Postası, Yenidüzen ve Haber Kıbrıs'taki haberleri okuyun.",
});
export default async function HomePage() {
  const press = await getPress("tr"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="haberler" section="hero" lang="tr" as={PageHero} size="short" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="tr" />
      <PressBlock locale="tr"><PressSection items={press} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="tr" />

    </main>
  );
}
