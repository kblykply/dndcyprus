import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/perla-ii",
  title: "La Joya Perla II İskele – Wohnungen kaufen | DND Cyprus",
  description:
    "La Joya Perla II in Bahçeler, İskele: Studio-, 1+1-Loft- und 2+1-Suiten mit Dachterrasse oder Garten, dazu Pool, Fitness und Grünflächen. Grundrisse anfordern.",
  image: "/og/perla-ii.jpg",
  imageAlt: "Wohnungen von La Joya Perla II mit Dachterrassen und Gartenpool",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla-ii.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="perla-ii" locale="de" />
    </main>
  );
}
