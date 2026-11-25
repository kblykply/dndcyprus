import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/ru/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/projects",
  title: "Наши проекты – жильё и пляжный клуб в Искеле | DND Cyprus",
  description:
    "Все проекты DND Cyprus в одном месте: NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II и Mariachi Beach Club. Сравните и выберите свой дом.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<CmsSection scope="projelerSayfasi" section="hero" lang="ru" as={PageHero} size="compact" />
<ProjectsFilters />
<CmsSection scope="projelerSayfasi" section="form" lang="ru" as={ContactCard} locale="ru" mode="home" id="iletisim" />
    </main>
  );
}
