import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/perla",
  title: "La Joya Perla İskele – apartamenty nad morzem | DND Cyprus",
  description:
    "La Joya Perla w Bahçeler (İskele), 700 m od morza: apartamenty Studio, lofty 1+1 i apartamenty 2+1, Sand pool, kryty basen, spa i przywileje Mariachi Beach Club. Zapraszamy do kontaktu.",
  image: "/og/perla.jpg",
  imageAlt: "Sand pool i budynki mieszkalne La Joya Perla",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="perla" locale="pl" />
    </main>
  );
}
