import { getTeam } from "@/lib/content/store";
import PageHero from "@/app/components/azure/PageHero";
import LeadershipTeam from "@/app/components/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/team",
  title: "Ekibimiz | Yönetim, Satış ve Mühendislik – DND Cyprus",
  description:
    "DND Cyprus ekibiyle tanışın: yönetim, satış, satış sonrası, mimarlık, mühendislik ve finans kadromuz Kıbrıs projelerinizde yanınızda. Uzmanlarımıza ulaşın.",
});



export default async function HomePage() {
  const team = await getTeam("tr"); // panelden düzenlenebilir (lib/content)
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" title={<>Ekibimiz</>} lead="Her projemizin yükselişinde, ekibimizin profesyonelliği en sağlam yapı taşıdır." image="/property_awards_2025-747.jpg" imagePosition="50% 16%" />
      <LeadershipTeam showHeader={false} members={team} />
   
    
    </main>
  );
}
