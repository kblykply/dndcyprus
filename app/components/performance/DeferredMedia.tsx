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
const PerlaTr = dynamic(() => import("../perla/FlipBookGlass"), { ssr: false });
const PerlaEn = dynamic(() => import("../en/perla/FlipBookGlass"), { ssr: false });
const PerlaIITr = dynamic(() => import("../perla-ii/FlipBookGlass"), { ssr: false });
const PerlaIIEn = dynamic(() => import("../en/perla-ii/FlipBookGlass"), { ssr: false });
const LagoonTr = dynamic(() => import("../lagoon-verde/FlipBookGlass"), { ssr: false });
const LagoonEn = dynamic(() => import("../en/lagoon-verde/FlipBookGlass"), { ssr: false });

// Katalog (flipbook) yalnızca TR/EN; diğer diller İngilizce kataloğu görür.
const pick = (locale: Locale): "tr" | "en" => (locale === "tr" ? "tr" : "en");
export function DeferredInstagram({ locale }: { locale: Locale }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  const Component = INSTAGRAM[locale];
  return (
    <div ref={ref} className="min-h-[1000px] lg:min-h-[720px] bg-white">
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

const catalogs = {
  perla: { tr: PerlaTr, en: PerlaEn },
  "perla-ii": { tr: PerlaIITr, en: PerlaIIEn },
  "lagoon-verde": { tr: LagoonTr, en: LagoonEn },
};
export function DeferredCatalog({ locale, project }: { locale: Locale; project: keyof typeof catalogs }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  const Component = catalogs[project][pick(locale)];
  return <div id="catalog" ref={ref} className="min-h-[75svh] bg-white">{near ? <Component /> : null}</div>;
}
