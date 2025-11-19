import ProjectsHero from "../../components/en/projects/ProjectsHero";
import ProjectsFilters from "../../components/en/projects/ProjectsFilters";
import ProjectsCTA from "../../components/en/projects/ProjectsCTA";
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

<ProjectsHero />
<ProjectsFilters />
<ProjectsCTA />
    </main>
  );
}
