import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/en/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";

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

<PageHero size="compact" kicker="Projects" title={<>Six addresses, <b>one standard.</b></>} lead="NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II and Mariachi Beach Club: compare all DND Cyprus projects in one place." image="/azure/lv-7.jpg" imageAlt="DND Cyprus" chips={[{ big: "6", label: "Projects" }, { big: "2", label: "Awards · 2025" }]} />
<ProjectsFilters />
<ContactCard locale="en" mode="home" id="iletisim" kicker="DND Cyprus" title={<>Learn more <b>about our projects.</b></>} lead="If you are interested in our ongoing or upcoming projects, our sales team will be glad to share detailed information and opportunities." />
    </main>
  );
}
