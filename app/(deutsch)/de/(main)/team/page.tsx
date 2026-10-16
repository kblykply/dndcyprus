import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/de/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/team",
  title: "Unser Team – Führung, Vertrieb & Technik | DND Cyprus",
  description:
    "Lernen Sie das Team von DND Cyprus kennen: Geschäftsleitung, Vertrieb, After-Sales, Architektur, Technik und Finanzen – Ihre Ansprechpartner für Immobilien in Nordzypern.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="DND Cyprus" title={<>Unser Team</>} lead="Hinter dem Erfolg jedes Projekts steht die Professionalität unseres Teams – unser stärkstes Fundament." image="/dndtoplu.jpg" imagePosition="50% 62%" />
      <LeadershipTeam showHeader={false} />
   
    
    </main>
  );
}
