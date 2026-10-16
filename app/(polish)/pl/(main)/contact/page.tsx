import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactInfo from "@/app/components/pl/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/contact",
  title: "Kontakt – biura w Famaguście i İskele | DND Cyprus",
  description:
    "Zapraszamy do siedziby głównej DND Cyprus w Famaguście lub biura sprzedaży w İskele. Prosimy dzwonić pod numer +90 392 444 03 63 lub pisać na info@dndcyprus.com w sprawie naszych inwestycji.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">

<PageHero size="short" kicker="Kontakt" title={<>Zapraszamy <b>do kontaktu.</b></>} lead="Chętnie opowiemy Państwu więcej o naszych projektach i możliwościach inwestycyjnych." image="/azure/lv-3.jpg" imageAlt="DND Cyprus" ctas={[{ label: "Wyślij wiadomość", href: "#form" }, { label: "Nasze projekty", href: "/pl/projects", variant: "ghost" }]} />
<ContactInfo />
<ContactCard locale="pl" mode="contact" id="form" title={<>Zrealizujmy Państwa marzenia <b>wspólnie.</b></>} lead="Zespół DND Cyprus jest gotów wesprzeć Państwa inwestycję. Prosimy zostawić wiadomość – wkrótce się odezwiemy." showOffices={false} />
    
    </main>
  );
}
