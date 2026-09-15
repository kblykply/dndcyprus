import ProjectsHero from "../../../components/en/projects/ProjectsHero";
import ProjectsFilters from "../../../components/en/projects/ProjectsFilters";
import ProjectsCTA from "../../../components/en/projects/ProjectsCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/projects",
  title: "Our Projects – Iskele Homes & Beach Club | DND Cyprus",
  description:
    "Browse DND Cyprus projects in one place: Lagoon Verde, La Joya, La Joya Perla, Perla II, Mariachi Beach Club and Geçitkale land. Compare and find your home.",
});
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

<ProjectsHero />
<ProjectsFilters />
<ProjectsCTA />
    </main>
  );
}
