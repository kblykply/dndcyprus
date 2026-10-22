import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/la-joya",
  title: "La Joya Bahçeler İskele – lofty i penthouse’y | DND Cyprus",
  description:
    "Ukończona w 2025 roku La Joya w Bahçeler (İskele) to 74 domy w niskiej zabudowie, lofty i penthouse’y 500 m od morza, z członkostwem w Mariachi Beach Club.",
  image: "/og/la-joya.jpg",
  imageAlt: "Lofty La Joya przy basenie",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, konum, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/la-joya.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="la-joya" locale="pl" />
    </main>
  );
}
