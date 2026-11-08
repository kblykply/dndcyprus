import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "pl",
  path: "/neocity",
  title: "NeoCity Famagusta – wille | DND Cyprus",
  description:
    "NeoCity w regionie Famagusty: 50 willi z prywatnymi ogrodami, opcjonalnym basenem, marketem i obiektem sportowym. Plan „5 zer” w lirach: 35% wkładu, 60 miesięcy bez odsetek.",
  image: "/og/neocity.jpg",
  imageAlt: "Wille bliźniacze NeoCity z prywatnymi basenami o zachodzie słońca",
});

// Azure proje şablonu (NeoCity: vaziyet planı ve 5 Sıfır ödeme bölümleriyle; Mariachi, teknik donanım, tur ve katalog yok).
// İçerik: lib/azure/projects/neocity.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="neocity" locale="pl" />
    </main>
  );
}
