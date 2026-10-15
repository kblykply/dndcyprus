"use client";

import { useState, type IframeHTMLAttributes } from "react";
import DeferredFillImage from "./DeferredFillImage";
import { useNearViewport } from "./useNearViewport";

type Props = IframeHTMLAttributes<HTMLIFrameElement> & {
  activation?: "visible" | "click";
  poster?: string;
  buttonLabel: string;
};

// Keep the existing aspect-ratio container. Maps start near the viewport;
// video players load only after a deliberate click on their poster.
export default function DeferredIframe({ activation = "visible", poster, buttonLabel, className, ...iframeProps }: Props) {
  const { ref, near } = useNearViewport<HTMLDivElement>("150px");
  const [opened, setOpened] = useState(false);
  const active = opened || (activation === "visible" && near);

  return (
    <div ref={ref} className="absolute inset-0 bg-neutral-100">
      {active ? (
        <iframe {...iframeProps} loading="eager" className={className || "absolute inset-0 w-full h-full border-0"} />
      ) : (
        <>
          {poster && <DeferredFillImage fill src={poster} alt="" quality={65}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 58vw, 100vw" className="object-cover" />}
          <button type="button" onClick={() => setOpened(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/15 focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#27959b]"
            aria-label={buttonLabel}>
            <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#141517] shadow-lg">{buttonLabel}</span>
          </button>
        </>
      )}
    </div>
  );
}
