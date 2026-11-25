import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/en/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "en",
  path: "/projects",
  title: "Our Projects – Iskele Homes & Beach Club | DND Cyprus",
  description:
    "Browse DND Cyprus projects in one place: NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II and Mariachi Beach Club. Compare and find your home.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<CmsSection scope="projelerSayfasi" section="hero" lang="en" as={PageHero} size="compact" />
<ProjectsFilters />
<CmsSection scope="projelerSayfasi" section="form" lang="en" as={ContactCard} locale="en" mode="home" id="iletisim" />
    </main>
  );
}
