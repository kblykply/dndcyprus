import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactInfo from "@/app/components/en/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/contact",
  title: "Contact Us – Famagusta & Iskele Sales Offices | DND Cyprus",
  description:
    "Visit DND Cyprus at our Famagusta head office or Iskele sales office. Call +90 392 444 03 63 or email info@dndcyprus.com about our projects and investments.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<PageHero size="short" kicker="Contact" title={<>Get in <b>touch.</b></>} lead="Contact us to learn more about our projects and investment opportunities." image="/azure/lv-3.jpg" imageAlt="DND Cyprus" ctas={[{ label: "Send Message", href: "#form" }, { label: "Our Projects", href: "/en/projects", variant: "ghost" }]} />
<ContactInfo />
<ContactCard locale="en" mode="contact" id="form" title={<>Let’s bring your dreams <b>to life together.</b></>} lead="The DND Cyprus team is ready to support your investment. Leave a message and we will get back to you shortly." showOffices={false} />
    
    </main>
  );
}
