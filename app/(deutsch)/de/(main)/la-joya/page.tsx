import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/la-joya",
  title: "La Joya Long Beach İskele – Lofts & Penthouses | DND Cyprus",
  description:
    "La Joya in Long Beach, İskele, 2025 fertiggestellt: 74 Wohnungen in niedriger Bauweise, Lofts und Penthouses, 500 m vom Meer, mit Mitgliedschaft im Mariachi Beach Club.",
  image: "/og/la-joya.jpg",
  imageAlt: "Loft-Residenzen von La Joya am Pool",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, konum, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/la-joya.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <AzureProject slug="la-joya" locale="de" />
    </main>
  );
}
