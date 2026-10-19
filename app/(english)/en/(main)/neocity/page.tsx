import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/neocity",
  title: "NeoCity Tuzla, Famagusta – Single & Twin Villas | DND Cyprus",
  description:
    "NeoCity beside Famagusta and Tuzla: 54 villas with private gardens, optional private pools, on-site market and sports area. 5 Zeros lira payment plan: 35% down, 60 months interest-free.",
  image: "/og/neocity.jpg",
  imageAlt: "NeoCity twin villas with private pools at sunset",
});

// Azure proje şablonu (NeoCity: vaziyet planı ve 5 Sıfır ödeme bölümleriyle; Mariachi, teknik donanım, tur ve katalog yok).
// İçerik: lib/azure/projects/neocity.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="neocity" locale="en" />
    </main>
  );
}
