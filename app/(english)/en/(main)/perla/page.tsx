import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/perla",
  title: "La Joya Perla Iskele – Apartments by the Sea | DND Cyprus",
  description:
    "La Joya Perla in Bahçeler, Iskele, 700 m from the sea: studio, 1+1 loft and 2+1 apartments, sand pool, indoor pool, spa and Mariachi Beach Club perks. Enquire.",
  image: "/og/perla.jpg",
  imageAlt: "La Joya Perla sand pool and residence blocks",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="perla" locale="en" />
    </main>
  );
}
