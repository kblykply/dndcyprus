import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/de/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/projects",
  title: "Projekte – Wohnungen & Beach Club in İskele | DND Cyprus",
  description:
    "Alle Projekte von DND Cyprus auf einen Blick: Lagoon Verde, La Joya, La Joya Perla, Perla II, Mariachi Beach Club und das Grundstück in Geçitkale. Finden Sie Ihr Zuhause.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">

<PageHero size="compact" kicker="Projekte" title={<>Sechs Adressen, <b>ein Standard.</b></>} lead="Lagoon Verde, La Joya, La Joya Perla, Perla II, Mariachi Beach Club und das Grundstück in Geçitkale: Vergleichen Sie alle Projekte von DND Cyprus an einem Ort." image="/azure/lv-7.jpg" imageAlt="DND Cyprus" chips={[{ big: "6", label: "Projekte" }, { big: "2", label: "Auszeichnungen · 2025" }]} />
<ProjectsFilters />
<ContactCard locale="de" mode="home" id="iletisim" kicker="DND Cyprus" title={<>Erfahren Sie mehr <b>über unsere Projekte.</b></>} lead="Sie interessieren sich für unsere laufenden oder kommenden Projekte? Unser Vertriebsteam informiert Sie gern ausführlich über Details und Möglichkeiten." image="/azure/p1-9.jpg" />
    </main>
  );
}
