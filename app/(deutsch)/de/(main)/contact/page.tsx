import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactInfo from "@/app/components/de/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/contact",
  title: "Kontakt – Büros in Famagusta & İskele | DND Cyprus",
  description:
    "Besuchen Sie DND Cyprus im Hauptsitz in Famagusta oder im Verkaufsbüro in İskele. Rufen Sie +90 392 444 03 63 an oder schreiben Sie an info@dndcyprus.com.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">

<PageHero size="short" kicker="Kontakt" title={<>Nehmen Sie <b>Kontakt auf.</b></>} lead="Kontaktieren Sie uns, um mehr über unsere Projekte und Investitionsmöglichkeiten zu erfahren." image="/azure/lv-3.jpg" imageAlt="DND Cyprus" ctas={[{ label: "Nachricht senden", href: "#form" }, { label: "Unsere Projekte", href: "/de/projects", variant: "ghost" }]} />
<ContactInfo />
<ContactCard locale="de" mode="contact" id="form" title={<>Verwirklichen wir Ihre Träume <b>gemeinsam.</b></>} lead="Das Team von DND Cyprus begleitet Sie bei Ihrer Investition. Hinterlassen Sie uns eine Nachricht – wir melden uns in Kürze bei Ihnen." showOffices={false} />
    
    </main>
  );
}
