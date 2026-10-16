import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/lagoon-verde",
  title: "Lagoon Verde İskele – apartamenty na sprzedaż | DND Cyprus",
  description:
    "Lagoon Verde w Bahçeler (İskele): apartamenty Studio, 1+1 i 2+1 z basenem lagunowym, Aqua Parkiem, siłownią i przywilejami Mariachi Beach Club. Zapraszamy po plany i ceny.",
  image: "/og/lagoon-verde.jpg",
  imageAlt: "Basen lagunowy i budynki mieszkalne Lagoon Verde",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog ve talep formu.
// İçerik: lib/azure/projects/lagoon-verde.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="lagoon-verde" locale="pl" />
    </main>
  );
}
