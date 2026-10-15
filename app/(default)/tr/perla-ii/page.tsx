import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/perla-ii",
  title: "La Joya Perla II İskele | Satılık Daireler – DND Cyprus",
  description:
    "Bahçeler, İskele'de La Joya Perla II: stüdyo, 1+1 loft ve çatı teraslı ya da bahçeli 2+1 daireler; havuz, fitness ve yeşil alanlar. Kat planları için ulaşın.",
  image: "/og/perla-ii.jpg",
  imageAlt: "La Joya Perla II çatı terasları ve bahçe havuzlu daireler",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla-ii.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="perla-ii" locale="tr" />
    </main>
  );
}
