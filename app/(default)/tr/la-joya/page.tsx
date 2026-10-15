import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/la-joya",
  title: "La Joya Long Beach İskele | Loft ve Penthouse – DND Cyprus",
  description:
    "2025’te tamamlanan La Joya, Long Beach, İskele’de denize 500 m: 74 konut, loft ve penthouse daireler, havuz ve Mariachi Beach Club üyeliği. Bilgi alın.",
  image: "/og/la-joya.jpg",
  imageAlt: "La Joya havuz kenarındaki loft konutlar",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, konum, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/la-joya.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="la-joya" locale="tr" />
    </main>
  );
}
