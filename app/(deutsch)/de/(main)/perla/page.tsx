import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/perla",
  title: "La Joya Perla İskele – Wohnungen am Meer | DND Cyprus",
  description:
    "La Joya Perla in Bahçeler, İskele, 700 m vom Meer: Studio-, 1+1-Loft- und 2+1-Wohnungen, Sand pool, Hallenbad, Spa und Vorteile im Mariachi Beach Club. Jetzt anfragen.",
  image: "/og/perla.jpg",
  imageAlt: "Sand pool und Wohngebäude von La Joya Perla",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, 360° tur, konum, katalog, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/perla.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="perla" locale="de" />
    </main>
  );
}
