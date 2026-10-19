import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/lagoon-verde",
  title: "Lagoon Verde İskele – Wohnungen kaufen | DND Cyprus",
  description:
    "Lagoon Verde in Ötüken, İskele: Studio-, 1+1- und 2+1-Wohnungen mit Lagunenpool, Aqua Park, Fitness und Vorteilen im Mariachi Beach Club. Preise & Grundrisse anfordern.",
  image: "/og/lagoon-verde.jpg",
  imageAlt: "Lagunenpool und Wohngebäude von Lagoon Verde",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog ve talep formu.
// İçerik: lib/azure/projects/lagoon-verde.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="lagoon-verde" locale="de" />
    </main>
  );
}
