import PageHero from "@/app/components/azure/PageHero";


import LandKeyFacts from "@/app/components/ru/land/LandKeyFacts";
import LandLocationAccess from "@/app/components/ru/land/LandLocationAccess";
import LandPlanningInfrastructure from "@/app/components/ru/land/LandPlanningInfrastructure";
import LandOverviewDevelopment from "@/app/components/ru/land/LandOverviewDevelopment";
import GecitkaleOverview from "@/app/components/ru/land/GecitkaleOverview";
import LandGallery from "@/app/components/ru/land/LandGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/gecitkale",
  title: "Участок в Гечиткале, Искеле, Северный Кипр | DND Cyprus",
  description:
    "Участок 9 840 m² в Гечиткале (Искеле), зонирование Fasıl 96 под виллы, виллы-близнецы и жилые дома; 12 мин до Long Beach, 25 мин до аэропорта Эрджан.",
  image: "/og/gecitkale.jpg",
  imageAlt: "Участок в Гечиткале и окрестности с высоты",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      
<PageHero size="compact" kicker="DND Cyprus" title={<>Гечиткале</>} lead="Участок в развивающемся районе с потенциалом застройки под виллы, дома-близнецы и многоквартирные дома." image="/gecitkaleimage.jpg" imageAlt="Гечиткале" tags={["Участок на продажу", "Гечиткале, Искеле", "Зонирование: Fasıl 96"]} chips={[{ big: "~5 этажей", label: "Потенциал застройки" }]} ctas={[{ label: "Связаться с нами", href: "/ru/contact" }]} />
<GecitkaleOverview />

<LandKeyFacts />
<LandGallery />

<LandLocationAccess />
<LandOverviewDevelopment />
<LandPlanningInfrastructure />

    </main>
  );
}
