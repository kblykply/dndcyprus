import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/perla-ii",
  title: "La Joya Perla II Iskele – Apartments for Sale | DND Cyprus",
  description:
    "La Joya Perla II in Bahçeler, Iskele: studio, 1+1 loft and 2+1 suites with roof terraces or gardens, plus a pool, fitness and green areas. Request floor plans.",
  image: "/og/perla-ii.jpg",
  imageAlt: "La Joya Perla II roof terraces and garden pool apartments",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla-ii.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="perla-ii" locale="en" />
    </main>
  );
}
