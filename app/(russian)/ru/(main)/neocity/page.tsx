import AzureProject from "@/app/components/azure/project/AzureProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/neocity",
  title: "NeoCity Тузла, Фамагуста — виллы | DND Cyprus",
  description:
    "NeoCity рядом с Фамагустой и Тузлой: 54 виллы с частными садами, бассейн по желанию, магазин и спортплощадка. План «5 нулей» в лирах: взнос 35 %, 60 месяцев без процентов.",
  image: "/og/neocity.jpg",
  imageAlt: "Дуплекс-виллы NeoCity с частными бассейнами на закате",
});

// Azure proje şablonu (NeoCity: vaziyet planı ve 5 Sıfır ödeme bölümleriyle; Mariachi, teknik donanım, tur ve katalog yok).
// İçerik: lib/azure/projects/neocity.tsx
export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <AzureProject slug="neocity" locale="ru" />
    </main>
  );
}
