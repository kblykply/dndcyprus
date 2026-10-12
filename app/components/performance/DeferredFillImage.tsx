"use client";

import Image, { type ImageProps } from "next/image";
import { useNearViewport } from "./useNearViewport";

// Native lazy loading can fetch images several screens ahead. Large galleries
// and project cards wait until their actual image box approaches the viewport.
export default function DeferredFillImage(props: ImageProps) {
  const { ref, near } = useNearViewport<HTMLDivElement>("150px");
  const original = typeof props.src === "string" ? props.src
    : "default" in props.src ? props.src.default.src : props.src.src;
  return (
    <div ref={ref} className="absolute inset-0">
      {near && <Image {...props} loading="eager" />}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={original} alt={props.alt} className={props.className}
          style={{ ...props.style, position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </noscript>
    </div>
  );
}
