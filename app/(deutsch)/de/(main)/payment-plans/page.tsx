import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import { PaymentSections } from "@/app/components/azure/pages/PageSections";
import { PAGES } from "@/lib/azure/pages";
import { pageMetadata } from "@/lib/seo";
import CmsSection from "@/app/components/cms/CmsSection";

const t = PAGES.de.payment;

export const metadata = pageMetadata({
  locale: "de",
  path: "/payment-plans",
  title: t.meta.title,
  description: t.meta.description,
  image: "/og/neocity.jpg",
  imageAlt: "DND Cyprus",
});

// Ödeme ve Yatırım Fırsatları (menü: TL ödeme modeli, güncel kampanyalar, yatırım ve kira geliri)
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <CmsSection scope="odeme" section="hero" lang="de" as={PageHero} size="compact" />
      <PaymentSections locale="de" />
      <ContactCard locale="de" mode="home" id="iletisim" />
    </main>
  );
}
