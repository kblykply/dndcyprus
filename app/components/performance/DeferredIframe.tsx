"use client";

import { useState, type IframeHTMLAttributes, type ReactNode } from "react";
import DeferredFillImage from "./DeferredFillImage";
import { useNearViewport } from "./useNearViewport";

type Props = IframeHTMLAttributes<HTMLIFrameElement> & {
  activation?: "visible" | "click";
  poster?: string;
  /** Afişin kutudaki gerçek genişliği (varsayılan: geniş video kutusu) */
  posterSizes?: string;
  posterQuality?: number;
  /** Afiş üstünde sağ altta küçük kaynak notu (ör. harita verisi atfı); düğmenin dışında, bağlantı olabilir */
  posterCredit?: ReactNode;
  buttonLabel: string;
};

// Keep the existing aspect-ratio container. Maps start near the viewport;
// video players load only after a deliberate click on their poster.
// Afişli tıklama modunda (iletişim haritası) görselin üstüne katman konmaz, düğme sol altta durur.
export default function DeferredIframe({
  activation = "visible", poster, posterSizes = "(min-width: 1280px) 680px, (min-width: 1024px) 58vw, 100vw",
  posterQuality = 65, posterCredit, buttonLabel, className, ...iframeProps
}: Props) {
  const { ref, near } = useNearViewport<HTMLDivElement>("150px");
  const [opened, setOpened] = useState(false);
  const active = opened || (activation === "visible" && near);

  return (
    <div ref={ref} className="absolute inset-0 bg-neutral-100">
      {active ? (
        <iframe {...iframeProps} loading="eager" className={className || "absolute inset-0 w-full h-full border-0"} />
      ) : (
        <>
          {poster && <DeferredFillImage fill src={poster} alt="" quality={posterQuality} sizes={posterSizes} className="object-cover" />}
          <button type="button" onClick={() => setOpened(true)}
            className={`absolute inset-0 flex focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#0d6570] ${poster ? "items-end justify-start p-3" : "items-center justify-center bg-black/15"}`}
            aria-label={buttonLabel}>
            <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0d2326] shadow-lg">{buttonLabel}</span>
          </button>
          {poster && posterCredit && (
            <span className="absolute bottom-1 right-2 rounded bg-white/75 text-[10px] leading-6 text-[#0d2326]/70 [&_a]:inline-block [&_a]:px-2 [&_a]:underline-offset-2 hover:[&_a]:underline">
              {posterCredit}
            </span>
          )}
        </>
      )}
    </div>
  );
}
