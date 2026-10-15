import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/perla-ii",
  title: "La Joya Perla II İskele – apartamenty na sprzedaż | DND Cyprus",
  description:
    "La Joya Perla II w Bahçeler (İskele): apartamenty Studio, lofty 1+1 i apartamenty 2+1 z tarasem na dachu lub ogrodem, basen, siłownia i tereny zielone. Zapraszamy po plany.",
  image: "/og/perla-ii.jpg",
  imageAlt: "Tarasy na dachu i apartamenty z ogrodem przy basenie w La Joya Perla II",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla-ii.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="perla-ii" locale="pl" />
    </main>
  );
}
