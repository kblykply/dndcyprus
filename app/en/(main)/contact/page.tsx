import ContactHero from "../../../components/en/contact/ContactHero";
import ContactInfo from "../../../components/en/contact/ContactInfo";
import ContactForm from "../../../components/en/contact/ContactForm";
import ContactCTA from "../../../components/en/contact/ContactCTA";
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
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

<ContactHero />
<ContactInfo />
<ContactForm />
<ContactCTA />
    
    </main>
  );
}
