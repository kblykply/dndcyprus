import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/de/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "de",
  path: "/projects",
  title: "Projekte – Wohnungen & Beach Club in İskele | DND Cyprus",
  description:
    "Alle Projekte von DND Cyprus auf einen Blick: NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II und Mariachi Beach Club. Finden Sie Ihr Zuhause.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<CmsSection scope="projelerSayfasi" section="hero" lang="de" as={PageHero} size="compact" />
<ProjectsFilters />
<CmsSection scope="projelerSayfasi" section="form" lang="de" as={ContactCard} locale="de" mode="home" id="iletisim" />
    </main>
  );
}
