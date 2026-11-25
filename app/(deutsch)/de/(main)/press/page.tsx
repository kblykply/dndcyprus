import { getPress } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import PressSection from "@/app/components/de/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";

export const metadata = pageMetadata({
  locale: "de",
  path: "/press",
  title: "Presse & Neuigkeiten | DND Cyprus",
  description:
    "DND Cyprus in der Presse: Berichte von Kıbrıs Postası, Yenidüzen, Haber Kıbrıs und weiteren Medien, u. a. zur Fertigstellung der La Joya Residences and Holiday Village.",
});

export default async function HomePage() {
  const press = await getPress("de"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus in der Presse" title={<>Aktuelles</>} lead="Neues von DND, DND in der Presse und Veranstaltungen." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="de" />
      <PressBlock locale="de"><PressSection items={press} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="de" />

    </main>
  );
}
