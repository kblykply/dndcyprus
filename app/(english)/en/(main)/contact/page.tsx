import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactStays from "@/app/components/azure/ContactStays";
import ContactInfo from "@/app/components/en/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "en",
  path: "/contact",
  title: "Contact Us – Famagusta Head Office | DND Cyprus",
  description:
    "Visit DND Cyprus at our Famagusta head office. Call +90 392 444 03 63 or email info@dndcyprus.com about our projects and investments.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip az-contactpage">

<CmsSection scope="iletisim" section="hero" lang="en" as={PageHero} size="short" imagePosition="50% 60%" />
<CmsSection scope="iletisim" section="bilgi" lang="en" as={ContactInfo} />
<ContactStays locale="en" />
<CmsSection scope="iletisim" section="form" lang="en" as={ContactCard} locale="en" mode="contact" id="form" />
    
    </main>
  );
}
