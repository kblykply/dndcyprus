import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactStays from "@/app/components/azure/ContactStays";
import ContactInfo from "@/app/components/pl/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/contact",
  title: "Kontakt – siedziba główna w Famaguście | DND Cyprus",
  description:
    "Zapraszamy do siedziby głównej DND Cyprus w Famaguście. Prosimy dzwonić pod numer +90 392 444 03 63 lub pisać na info@dndcyprus.com w sprawie naszych inwestycji.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip az-contactpage">

<CmsSection scope="iletisim" section="hero" lang="pl" as={PageHero} size="short" imagePosition="50% 60%" />
<CmsSection scope="iletisim" section="bilgi" lang="pl" as={ContactInfo} />
<ContactStays locale="pl" />
<CmsSection scope="iletisim" section="form" lang="pl" as={ContactCard} locale="pl" mode="contact" id="form" />
    
    </main>
  );
}
