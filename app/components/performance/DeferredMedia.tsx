"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "./useNearViewport";

const PaymentTr = dynamic(() => import("../Payment"), { ssr: false });
const PaymentEn = dynamic(() => import("../en/Payment"), { ssr: false });
const InstagramTr = dynamic(() => import("../IgPost"), { ssr: false });
const InstagramEn = dynamic(() => import("../en/IgPost"), { ssr: false });
const PerlaTr = dynamic(() => import("../perla/FlipBookGlass"), { ssr: false });
const PerlaEn = dynamic(() => import("../en/perla/FlipBookGlass"), { ssr: false });
const PerlaIITr = dynamic(() => import("../perla-ii/FlipBookGlass"), { ssr: false });
const PerlaIIEn = dynamic(() => import("../en/perla-ii/FlipBookGlass"), { ssr: false });
const LagoonTr = dynamic(() => import("../lagoon-verde/FlipBookGlass"), { ssr: false });
const LagoonEn = dynamic(() => import("../en/lagoon-verde/FlipBookGlass"), { ssr: false });

type Locale = "tr" | "en";
export function DeferredPayment({ locale }: { locale: Locale }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  const Component = locale === "en" ? PaymentEn : PaymentTr;
  return <div ref={ref} className="min-h-[640px]">{near ? <Component /> : null}</div>;
}

export function DeferredInstagram({ locale }: { locale: Locale }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  const Component = locale === "en" ? InstagramEn : InstagramTr;
  return (
    <div ref={ref} className="min-h-[1000px] lg:min-h-[720px] bg-white">
      {near ? <Component /> : (
        <div className="mx-auto max-w-7xl px-6 py-12 text-[#141517]">
          <a href="https://www.instagram.com/dndcyprus/" target="_blank" rel="noopener noreferrer">
            {locale === "en" ? "Follow DND Cyprus on Instagram" : "DND Cyprus’u Instagram’da takip edin"}
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
  const Component = catalogs[project][locale];
  return <div id="catalog" ref={ref} className="min-h-[75svh] bg-white">{near ? <Component /> : null}</div>;
}
