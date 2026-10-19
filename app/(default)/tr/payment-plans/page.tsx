import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import { PaymentSections } from "@/app/components/azure/pages/PageSections";
import { PAGES } from "@/lib/azure/pages";
import { pageMetadata } from "@/lib/seo";

const t = PAGES.tr.payment;

export const metadata = pageMetadata({
  locale: "tr",
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
      <PageHero size="compact" kicker={t.hero.kicker} title={t.hero.title} lead={t.hero.lead} image="/neocity/g-05.jpg" imageAlt="DND Cyprus" />
      <PaymentSections locale="tr" />
      <ContactCard locale="tr" mode="home" id="iletisim" />
    </main>
  );
}
