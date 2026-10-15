
import LagoonVerdeMediaHub from "@/app/components/ru/LagoonVerdeMediaHub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/dndcyprus",
  title: "Медиацентр DND – брошюры, каталоги и видео | DND Cyprus",
  description:
    "Медиацентр DND Cyprus: брошюра и план оплаты Lagoon Verde, каталог Северного Кипра, видео La Joya и Property Awards, а также рекламные кампании.",
});

export default function Page() {
  return (
    <main className="pt-16 md:pt-20">
      <LagoonVerdeMediaHub

      />
        

    </main>
  );
}
