import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactStays from "@/app/components/azure/ContactStays";
import ContactInfo from "@/app/components/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/contact",
  title: "İletişim | Gazimağusa Merkez Ofis – DND Cyprus",
  description:
    "DND Cyprus merkez ofisi Gazimağusa'da. Projeler ve yatırım fırsatları için +90 392 444 03 63 veya info@dndcyprus.com ile ulaşın.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<PageHero size="short" kicker="İletişim" title={<>Bize <b>ulaşın.</b></>} lead="Projelerimiz ve yatırım fırsatları hakkında daha fazla bilgi almak için bizimle iletişime geçin." image="/azure/contact/iletisim-hero.jpg" imageAlt="DND Cyprus merkez ofis resepsiyonu" imagePosition="50% 55%" ctas={[{ label: "Mesaj Gönder", href: "#form" }, { label: "Projelerimiz", href: "/tr/projects", variant: "ghost" }]} />
<ContactInfo />
<ContactStays locale="tr" />
<ContactCard locale="tr" mode="contact" id="form" title={<>Hadi hayallerinizi birlikte <b>hayata geçirelim.</b></>} lead="DND Cyprus ekibi, yatırımlarınız için size destek olmaya hazır. Mesajınızı bırakın, en kısa sürede dönüş yapalım." showOffices={false} />
    
    </main>
  );
}
