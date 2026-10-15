
import LagoonVerdeMediaHub from "@/app/components/pl/LagoonVerdeMediaHub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/dndcyprus",
  title: "Centrum medialne DND – broszury, katalogi i filmy | DND Cyprus",
  description:
    "Centrum medialne DND Cyprus: broszura i plan płatności Lagoon Verde, katalog Cypru Północnego, filmy o La Joya i Property Awards oraz kampanie.",
});

export default function Page() {
  return (
    <main className="pt-16 md:pt-20">
      <LagoonVerdeMediaHub

      />
        

    </main>
  );
}
