
import LagoonVerdeMediaHub from "@/app/components/lagoon-verde/LagoonVerdeMediaHub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/dndcyprus",
  title: "DND Media Hub – Brochures, Catalogs & Videos | DND Cyprus",
  description:
    "The DND Cyprus media hub: browse the Lagoon Verde brochure and payment plan, the North Cyprus catalog, La Joya and Property Awards videos, and campaigns.",
});

export default function Page() {
  return (
    <main>
      <LagoonVerdeMediaHub

      />
        

    </main>
  );
}
