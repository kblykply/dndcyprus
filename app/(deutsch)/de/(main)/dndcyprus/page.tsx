
import LagoonVerdeMediaHub from "@/app/components/de/LagoonVerdeMediaHub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/dndcyprus",
  title: "Mediencenter – Broschüren, Kataloge & Videos | DND Cyprus",
  description:
    "Das Mediencenter von DND Cyprus: Broschüre und Zahlungsplan von Lagoon Verde, Katalog zu Nordzypern, Videos zu La Joya und den Property Awards sowie Kampagnen.",
});

export default function Page() {
  return (
    <main className="pt-16 md:pt-20">
      <LagoonVerdeMediaHub

      />
        

    </main>
  );
}
