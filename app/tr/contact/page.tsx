import ContactHero from "../../components/contact/ContactHero";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactForm from "../../components/contact/ContactForm";
import ContactCTA from "../../components/contact/ContactCTA";
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
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

<ContactHero />
<ContactInfo />
<ContactForm />
<ContactCTA />
    
    </main>
  );
}
