import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/pl/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/projects",
  title: "Nasze inwestycje – domy w İskele i beach club | DND Cyprus",
  description:
    "Wszystkie projekty DND Cyprus w jednym miejscu: NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II i Mariachi Beach Club. Zachęcamy do porównania i wyboru domu.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<CmsSection scope="projelerSayfasi" section="hero" lang="pl" as={PageHero} size="compact" />
<ProjectsFilters />
<CmsSection scope="projelerSayfasi" section="form" lang="pl" as={ContactCard} locale="pl" mode="home" id="iletisim" />
    </main>
  );
}
