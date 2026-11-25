import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactStays from "@/app/components/azure/ContactStays";
import ContactInfo from "@/app/components/ru/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/contact",
  title: "Контакты – головной офис в Фамагусте | DND Cyprus",
  description:
    "Приходите в головной офис DND Cyprus в Фамагусте. Звоните +90 392 444 03 63 или пишите на info@dndcyprus.com о проектах и инвестициях.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip az-contactpage">

<CmsSection scope="iletisim" section="hero" lang="ru" as={PageHero} size="short" imagePosition="50% 60%" />
<CmsSection scope="iletisim" section="bilgi" lang="ru" as={ContactInfo} />
<ContactStays locale="ru" />
<CmsSection scope="iletisim" section="form" lang="ru" as={ContactCard} locale="ru" mode="contact" id="form" />
    
    </main>
  );
}
