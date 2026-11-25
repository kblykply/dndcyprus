import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/projects",
  title: "Projelerimiz | İskele'de Konut ve Beach Club – DND Cyprus",
  description:
    "NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II ve Mariachi Beach Club: DND Cyprus projelerini tek sayfada karşılaştırın ve inceleyin.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<CmsSection scope="projelerSayfasi" section="hero" lang="tr" as={PageHero} size="compact" />
<ProjectsFilters />
<CmsSection scope="projelerSayfasi" section="form" lang="tr" as={ContactCard} locale="tr" mode="home" id="iletisim" />
    </main>
  );
}
