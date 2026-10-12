import ProjectsHero from "@/app/components/projects/ProjectsHero";
import ProjectsFilters from "@/app/components/projects/ProjectsFilters";
import ProjectsCTA from "@/app/components/projects/ProjectsCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/projects",
  title: "Projelerimiz | İskele'de Konut ve Beach Club – DND Cyprus",
  description:
    "Lagoon Verde, La Joya, La Joya Perla, Perla II, Mariachi Beach Club ve Geçitkale arsası: DND Cyprus projelerini tek sayfada karşılaştırın ve inceleyin.",
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
