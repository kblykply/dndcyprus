import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/perla",
  title: "La Joya Perla İskele | Denize 700 m Daireler – DND Cyprus",
  description:
    "Bahçeler, İskele'de denize 700 m La Joya Perla: stüdyo, 1+1 loft ve 2+1 daireler, sand pool, kapalı havuz, spa ve Mariachi Beach Club ayrıcalığı. Bilgi alın.",
  image: "/og/perla.jpg",
  imageAlt: "La Joya Perla sand pool ve rezidans blokları",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="perla" locale="tr" />
    </main>
  );
}
