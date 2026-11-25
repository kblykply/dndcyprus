import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactStays from "@/app/components/azure/ContactStays";
import ContactInfo from "@/app/components/de/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "de",
  path: "/contact",
  title: "Kontakt – Hauptsitz in Famagusta | DND Cyprus",
  description:
    "Besuchen Sie DND Cyprus im Hauptsitz in Famagusta. Rufen Sie +90 392 444 03 63 an oder schreiben Sie an info@dndcyprus.com.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip az-contactpage">

<CmsSection scope="iletisim" section="hero" lang="de" as={PageHero} size="short" imagePosition="50% 60%" />
<CmsSection scope="iletisim" section="bilgi" lang="de" as={ContactInfo} />
<ContactStays locale="de" />
<CmsSection scope="iletisim" section="form" lang="de" as={ContactCard} locale="de" mode="contact" id="form" />
    
    </main>
  );
}
