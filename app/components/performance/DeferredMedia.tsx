"use client";

import { lazy, Suspense } from "react";
import { useNearViewport } from "./useNearViewport";
import type { Locale } from "@/lib/azure/site";

// Instagram bölümü beş dilde ayrı bileşen; her dil yalnızca kendini, o da bölüme yaklaşınca yükler.
// React.lazy: next/dynamic tanımı sayfa açılır açılmaz parçayı (IgPost + framer-motion, ~33 KB) indiriyordu.
const INSTAGRAM = {
  tr: lazy(() => import("../IgPost")),
  en: lazy(() => import("../en/IgPost")),
  de: lazy(() => import("../de/IgPost")),
  ru: lazy(() => import("../ru/IgPost")),
  pl: lazy(() => import("../pl/IgPost")),
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
  // yükseklik ayırma yalnız bileşen gelene kadar (kod inerken de yer tutucu kalır; sonra kart içerik boyunda)
  const follow = (
    <div className="min-h-[1150px] sm:min-h-[1030px] lg:min-h-[700px]">
      <div className="mx-auto max-w-7xl px-6 py-12 text-[#0d2326]">
        <a href="https://www.instagram.com/dndcyprus/" target="_blank" rel="noopener noreferrer">
          {IG_FOLLOW[locale]}
        </a>
      </div>
    </div>
  );
  return (
    // Ana sayfadaki diğer bölümler gibi kart: kenarlardan içeride, yuvarlak köşe, hafif gölge (taşan dekor kartta kalır)
    <div ref={ref} className="overflow-hidden rounded-[36px] max-[900px]:rounded-[28px] border border-white/90 bg-white shadow-[0_10px_40px_rgba(13,35,38,0.06)]">
      {near ? <Suspense fallback={follow}><Component /></Suspense> : follow}
    </div>
  );
}
