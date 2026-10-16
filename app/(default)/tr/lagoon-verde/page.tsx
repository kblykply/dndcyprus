import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/lagoon-verde",
  title: "Lagoon Verde İskele | Bahçeler'de Satılık Daireler – DND Cyprus",
  description:
    "İskele Bahçeler'de lagün havuzlu Lagoon Verde: studio, 1+1 ve 2+1 daireler, aquapark, fitness ve Mariachi Beach Club ayrıcalığı. Kat planları ve fiyat için ulaşın.",
  image: "/og/lagoon-verde.jpg",
  imageAlt: "Lagoon Verde lagün havuzu ve rezidans blokları",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog ve talep formu.
// İçerik: lib/azure/projects/lagoon-verde.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="lagoon-verde" locale="tr" />
    </main>
  );
}
