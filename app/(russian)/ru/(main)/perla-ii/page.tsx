import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/perla-ii",
  title: "La Joya Perla II, Искеле – квартиры на продажу | DND Cyprus",
  description:
    "La Joya Perla II в Bahçeler (Искеле): студии, лофты 1+1 и апартаменты 2+1 с террасой на крыше или садом, бассейн, фитнес и зелёные зоны. Запросите планировки.",
  image: "/og/perla-ii.jpg",
  imageAlt: "Квартиры La Joya Perla II с террасами на крыше и садовым бассейном",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla-ii.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="perla-ii" locale="ru" />
    </main>
  );
}
