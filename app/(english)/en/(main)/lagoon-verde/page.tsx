import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/lagoon-verde",
  title: "Lagoon Verde Iskele – Apartments for Sale | DND Cyprus",
  description:
    "Lagoon Verde in Bahçeler, Iskele: studio, 1+1 and 2+1 apartments with a lagoon pool, aqua park, fitness and Mariachi Beach Club perks. Get floor plans and prices.",
  image: "/og/lagoon-verde.jpg",
  imageAlt: "Lagoon Verde lagoon pool and residence blocks",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog ve talep formu.
// İçerik: lib/azure/projects/lagoon-verde.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="lagoon-verde" locale="en" />
    </main>
  );
}
