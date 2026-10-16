import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/la-joya",
  title: "La Joya Long Beach Iskele – Lofts & Penthouses | DND Cyprus",
  description:
    "Completed in 2025, La Joya in Long Beach, Iskele offers 74 low-rise homes, lofts and penthouses, 500 m from the sea, with Mariachi Beach Club membership.",
  image: "/og/la-joya.jpg",
  imageAlt: "La Joya poolside loft residences",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, konum, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/la-joya.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="la-joya" locale="en" />
    </main>
  );
}
