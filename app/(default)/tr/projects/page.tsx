import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/projects/ProjectsFilters";
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
    <main className="relative w-full min-h-screen overflow-x-hidden">

<PageHero size="compact" kicker="Projeler" title={<>Altı adres, <b>tek standart.</b></>} lead="Lagoon Verde, La Joya, La Joya Perla, Perla II, Mariachi Beach Club ve Geçitkale arazisi: DND Cyprus projelerini tek yerde karşılaştırın." image="/azure/lv-7.jpg" imageAlt="DND Cyprus" chips={[{ big: "6", label: "Proje" }, { big: "2", label: "Ödül · 2025" }]} />
<ProjectsFilters />
<ContactCard locale="tr" mode="home" id="iletisim" kicker="DND Cyprus" title={<>Projelerimiz hakkında <b>daha fazla bilgi alın.</b></>} lead="Devam eden veya yakında başlayacak projelerimizle ilgileniyorsanız, satış ekibimiz size detaylı bilgi ve fırsatlar sunmaktan memnuniyet duyar." />
    </main>
  );
}
