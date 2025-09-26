import ProjectsHero from "../components/projects/ProjectsHero";
import ProjectsFilters from "../components/projects/ProjectsFilters";
import ProjectsCTA from "../components/projects/ProjectsCTA";
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

<ProjectsHero />
<ProjectsFilters />
<ProjectsCTA />
    </main>
  );
}
