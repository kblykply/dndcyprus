import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ProjectsFilters from "@/app/components/ru/projects/ProjectsFilters";
import { pageMetadata } from "@/lib/seo";

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

<PageHero size="compact" kicker="Проекты" title={<>Шесть адресов, <b>один стандарт.</b></>} lead="NeoCity, Lagoon Verde, La Joya, La Joya Perla, Perla II и Mariachi Beach Club: сравните все проекты DND Cyprus в одном месте." image="/azure/lv-7.jpg" imageAlt="DND Cyprus" chips={[{ big: "6", label: "проектов" }, { big: "2", label: "награды · 2025" }]} />
<ProjectsFilters />
<ContactCard locale="ru" mode="home" id="iletisim" kicker="DND Cyprus" title={<>Узнайте больше <b>о наших проектах.</b></>} lead="Если вас интересуют текущие или будущие проекты, наш отдел продаж с радостью расскажет подробности и предложит лучшие варианты." />
    </main>
  );
}
