import { getPress } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import PressSection from "@/app/components/ru/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/press",
  title: "Публикации в прессе и новости | DND Cyprus",
  description:
    "DND Cyprus в прессе: публикации Kıbrıs Postası, Yenidüzen, Haber Kıbrıs и других изданий, в том числе о завершении резиденций и курортного комплекса La Joya.",
});

export default async function HomePage() {
  const press = await getPress("ru"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus в прессе" title={<>Новости</>} lead="Новости DND, DND в прессе и мероприятия." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="ru" />
      <PressBlock locale="ru"><PressSection items={press} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="ru" />

    </main>
  );
}
