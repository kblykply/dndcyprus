import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/neocity",
  title: "NeoCity Tuzla, Gazimağusa | Tek ve İkiz Villalar – DND Cyprus",
  description:
    "Gazimağusa ve Tuzla’nın yanı başında NeoCity: 54 villa, özel bahçe, opsiyonel özel havuz, site içi market ve spor alanı. 5 Sıfır TL ödeme planı: %35 peşinat, 60 ay faizsiz.",
  image: "/og/neocity.jpg",
  imageAlt: "NeoCity ikiz villalar ve özel havuzlar, gün batımı",
});

// Azure proje şablonu (NeoCity: vaziyet planı ve 5 Sıfır ödeme bölümleriyle; Mariachi, teknik donanım, tur ve katalog yok).
// İçerik: lib/azure/projects/neocity.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="neocity" locale="tr" />
    </main>
  );
}
