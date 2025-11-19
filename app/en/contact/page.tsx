import ContactHero from "../../components/en/contact/ContactHero";
import ContactInfo from "../../components/en/contact/ContactInfo";
import ContactForm from "../../components/en/contact/ContactForm";
import ContactCTA from "../../components/en/contact/ContactCTA";
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
