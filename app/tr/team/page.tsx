import LeadershipTeam from "../../components/about/LeadershipTeam";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/team",
  title: "Ekibimiz | Yönetim, Satış ve Mühendislik – DND Cyprus",
  description:
    "DND Cyprus ekibiyle tanışın: yönetim, satış, satış sonrası, mimarlık, mühendislik ve finans kadromuz Kıbrıs projelerinizde yanınızda. Uzmanlarımıza ulaşın.",
});



export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      <h1 className="sr-only">DND Cyprus Ekibi</h1>
      <LeadershipTeam />
   
    
    </main>
  );
}
