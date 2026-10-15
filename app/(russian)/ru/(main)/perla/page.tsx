import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/perla",
  title: "La Joya Perla, Искеле – квартиры у моря | DND Cyprus",
  description:
    "La Joya Perla в Bahçeler (Искеле), в 700 м от моря: студии, лофты 1+1 и квартиры 2+1, Sand pool, крытый бассейн, спа и привилегии Mariachi Beach Club.",
  image: "/og/perla.jpg",
  imageAlt: "Sand pool и жилые корпуса La Joya Perla",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="perla" locale="ru" />
    </main>
  );
}
