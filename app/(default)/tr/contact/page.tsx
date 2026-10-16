import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactInfo from "@/app/components/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/contact",
  title: "İletişim | Gazimağusa ve İskele Satış Ofisleri – DND Cyprus",
  description:
    "DND Cyprus merkez ofisi Gazimağusa'da, satış ofisimiz İskele'de. Projeler ve yatırım fırsatları için +90 392 444 03 63 veya info@dndcyprus.com ile ulaşın.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<PageHero size="short" kicker="İletişim" title={<>Bize <b>ulaşın.</b></>} lead="Projelerimiz ve yatırım fırsatları hakkında daha fazla bilgi almak için bizimle iletişime geçin." image="/azure/lv-3.jpg" imageAlt="DND Cyprus" ctas={[{ label: "Mesaj Gönder", href: "#form" }, { label: "Projelerimiz", href: "/tr/projects", variant: "ghost" }]} />
<ContactInfo />
<ContactCard locale="tr" mode="contact" id="form" title={<>Hadi hayallerinizi birlikte <b>hayata geçirelim.</b></>} lead="DND Cyprus ekibi, yatırımlarınız için size destek olmaya hazır. Mesajınızı bırakın, en kısa sürede dönüş yapalım." showOffices={false} />
    
    </main>
  );
}
