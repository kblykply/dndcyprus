import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactStays from "@/app/components/azure/ContactStays";
import ContactInfo from "@/app/components/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/contact",
  title: "İletişim | Gazimağusa Merkez Ofis – DND Cyprus",
  description:
    "DND Cyprus merkez ofisi Gazimağusa'da. Projeler ve yatırım fırsatları için +90 392 444 03 63 veya info@dndcyprus.com ile ulaşın.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip az-contactpage">

<CmsSection scope="iletisim" section="hero" lang="tr" as={PageHero} size="short" imagePosition="50% 60%" />
<CmsSection scope="iletisim" section="bilgi" lang="tr" as={ContactInfo} />
<ContactStays locale="tr" />
<CmsSection scope="iletisim" section="form" lang="tr" as={ContactCard} locale="tr" mode="contact" id="form" />
    
    </main>
  );
}
