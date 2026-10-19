import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/lagoon-verde",
  title: "Lagoon Verde, Искеле – квартиры на продажу | DND Cyprus",
  description:
    "Lagoon Verde в Ötüken (Искеле): студии, квартиры 1+1 и 2+1 с бассейном-лагуной, аквапарком, фитнесом и привилегиями Mariachi Beach Club. Запросите цены и планировки.",
  image: "/og/lagoon-verde.jpg",
  imageAlt: "Бассейн-лагуна и жилые корпуса Lagoon Verde",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog ve talep formu.
// İçerik: lib/azure/projects/lagoon-verde.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="lagoon-verde" locale="ru" />
    </main>
  );
}
