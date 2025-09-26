import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import MapIntegration from "../components/contact/MapIntegration";
import ContactCTA from "../components/contact/ContactCTA";
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

<ContactHero />
<ContactInfo />
<ContactForm />
<MapIntegration />
<ContactCTA />
    
    </main>
  );
}
