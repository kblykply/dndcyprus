import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/la-joya",
  title: "La Joya, Bahçeler, Искеле – лофты и пентхаусы | DND Cyprus",
  description:
    "La Joya в Bahçeler (Искеле), завершён в 2025 году: 74 дома малой этажности, лофты и пентхаусы в 500 м от моря и членство в Mariachi Beach Club.",
  image: "/og/la-joya.jpg",
  imageAlt: "Лофт-резиденции La Joya у бассейна",
});

// Azure proje şablonu: hero, galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları,
// Mariachi, olanaklar, konum, son güncelleme ve talep formu.
// İçerik: lib/azure/projects/la-joya.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="la-joya" locale="ru" />
    </main>
  );
}
