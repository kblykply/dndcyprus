"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "./useNearViewport";
import type { Locale } from "@/lib/azure/site";

// Instagram bölümü beş dilde ayrı bileşen; her dil yalnızca kendini yükler.
const INSTAGRAM = {
  tr: dynamic(() => import("../IgPost"), { ssr: false }),
  en: dynamic(() => import("../en/IgPost"), { ssr: false }),
  de: dynamic(() => import("../de/IgPost"), { ssr: false }),
  ru: dynamic(() => import("../ru/IgPost"), { ssr: false }),
  pl: dynamic(() => import("../pl/IgPost"), { ssr: false }),
} satisfies Record<Locale, unknown>;
const IG_FOLLOW: Record<Locale, string> = {
  tr: "DND Cyprus’u Instagram’da takip edin",
  en: "Follow DND Cyprus on Instagram",
  de: "Folgen Sie DND Cyprus auf Instagram",
  ru: "Подписывайтесь на DND Cyprus в Instagram",
  pl: "Zapraszamy do obserwowania DND Cyprus na Instagramie",
};
export function DeferredInstagram({ locale }: { locale: Locale }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  const Component = INSTAGRAM[locale];
  return (
    // Ana sayfadaki diğer bölümler gibi kart: kenarlardan içeride, yuvarlak köşe, hafif gölge (taşan dekor kartta kalır)
    // yükseklik ayırma yalnız yüklenene kadar (sonra kart içerik boyunda, altta boşluk kalmaz)
    <div ref={ref} className={`${near ? "" : "min-h-[1150px] sm:min-h-[1030px] lg:min-h-[700px] "}overflow-hidden rounded-[36px] max-[900px]:rounded-[28px] border border-white/90 bg-white shadow-[0_10px_40px_rgba(13,35,38,0.06)]`}>
      {near ? <Component /> : (
        <div className="mx-auto max-w-7xl px-6 py-12 text-[#0d2326]">
          <a href="https://www.instagram.com/dndcyprus/" target="_blank" rel="noopener noreferrer">
            {IG_FOLLOW[locale]}
          </a>
        </div>
      )}
    </div>
  );
}

// Azure katalog (5 dil): açık sahne, gerçek kitap, sayaç · ilerleme çizgisi · oklar; bölüm yaklaşınca yüklenir
const AzureCatalog = dynamic(() => import("../azure/project/AzureCatalog"), { ssr: false });
export function DeferredCatalog({ locale, project }: { locale: Locale; project: "lagoon-verde" | "perla" | "perla-ii" }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  return <div id="catalog" ref={ref} className="min-h-[75svh]">{near ? <AzureCatalog locale={locale} project={project} /> : null}</div>;
}
