import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "de",
  path: "/neocity",
  title: "NeoCity Tuzla, Famagusta – Villen | DND Cyprus",
  description:
    "NeoCity neben Famagusta und Tuzla: 54 Villen mit Privatgarten, optionalem Privatpool, Markt und Sportanlage. 5-Null-Zahlungsplan in Lira: 35 % Anzahlung, 60 Monate zinsfrei.",
  image: "/og/neocity.jpg",
  imageAlt: "NeoCity Doppelvillen mit Privatpools bei Sonnenuntergang",
});

// Azure proje şablonu (NeoCity: vaziyet planı ve 5 Sıfır ödeme bölümleriyle; Mariachi, teknik donanım, tur ve katalog yok).
// İçerik: lib/azure/projects/neocity.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="neocity" locale="de" />
    </main>
  );
}
