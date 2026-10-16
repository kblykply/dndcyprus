import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/pl/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/projects",
  title: "Nasze inwestycje – domy w İskele i beach club | DND Cyprus",
  description:
    "Wszystkie projekty DND Cyprus w jednym miejscu: Lagoon Verde, La Joya, La Joya Perla, Perla II, Mariachi Beach Club i działka w Geçitkale. Zachęcamy do porównania i wyboru domu.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">

<PageHero size="compact" kicker="Projekty" title={<>Sześć adresów, <b>jeden standard.</b></>} lead="Lagoon Verde, La Joya, La Joya Perla, Perla II, Mariachi Beach Club i działka w Geçitkale – wszystkie projekty DND Cyprus do porównania w jednym miejscu." image="/azure/lv-7.jpg" imageAlt="DND Cyprus" chips={[{ big: "6", label: "Projektów" }, { big: "2", label: "Nagrody · 2025" }]} />
<ProjectsFilters />
<ContactCard locale="pl" mode="home" id="iletisim" kicker="DND Cyprus" title={<>Więcej informacji <b>o naszych projektach.</b></>} lead="Jeśli interesują Państwa nasze bieżące lub planowane inwestycje, nasz zespół sprzedaży chętnie przedstawi szczegółowe informacje i aktualne możliwości." />
    </main>
  );
}
