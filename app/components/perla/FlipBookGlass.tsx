// app/components/perla2/FlipBookGlass.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { motion, type Variants } from "framer-motion";
import { Download } from "lucide-react";

// ==========================
// Types for react-pageflip
// ==========================
export type PageFlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
  flip: (pageIndex: number) => void;
  getCurrentPageIndex?: () => number;
  getPageCount?: () => number;
};

export type HTMLFlipBookHandle = {
  pageFlip: () => PageFlipApi | undefined;
};

export type FlipEvent = { data: number };

// npm i react-pageflip
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

// ==========================
// Component props
// ==========================
export type Props = {
  /** Each entry is a TWO-PAGE SPREAD (e.g., 1684×596). We split visually at render time. */
  pages: string[];
  pdfUrl?: string;
  bgImage?: string | null;
  kicker?: string;
  title?: string;
  /** single-page aspect ratio w/h — for half of 1684×596 ⇒ 842/596 */
  pageAspect?: number;
  maxWidth?: number;              // glass card max width
  vhMaxRatio?: number;            // desktop/tablet section height fraction
  mobileVhMaxRatio?: number;      // mobile section height fraction
  imgQuality?: number;            // Next/Image quality
};

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const PAGE_RADIUS_PX = 20;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type VirtualPage = { src: string; half: "left" | "right" };

export function FlipBookGlassBase({
  pages,
  pdfUrl,
  bgImage = "/perla-ii/1.jpg",
  kicker = "LA JOYA PERLA II",
  title = "Tanıtım Kataloğu",
  pageAspect = 842 / 596,
  maxWidth = 2000,
  vhMaxRatio = 0.88,
  mobileVhMaxRatio = 0.58,
  imgQuality = 92,
}: Props) {
  const bookRef = useRef<HTMLFlipBookHandle | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState<number>(0);

  // SSR-safe defaults
  const [containerW, setContainerW] = useState<number>(maxWidth);
  const [vvh, setVvh] = useState<number>(900);

  // Virtual pages: L/R halves (visualized via 200% width technique)
  const virtualPages: VirtualPage[] = useMemo(
    () =>
      pages.flatMap((src) => [
        { src, half: "left" as const },
        { src, half: "right" as const },
      ]),
    [pages]
  );

  // Viewport + ResizeObserver
  useEffect(() => {
    const updateVvh = () => setVvh(window.visualViewport?.height ?? window.innerHeight);
    updateVvh();

    const onResize = () => updateVvh();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    let ro: ResizeObserver | null = null;
    if (containerRef.current) {
      ro = new ResizeObserver((entries) => {
        for (const e of entries) setContainerW(Math.round(e.contentRect.width));
      });
      ro.observe(containerRef.current);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, []);

  // Preload next spread
  useEffect(() => {
    const next = page + 1;
    const nextSrc = virtualPages[next]?.src;
    if (nextSrc && typeof window !== "undefined") {
      const pre = new window.Image();
      pre.src = nextSrc;
    }
  }, [page, virtualPages]);

  const isMobile = containerW < 768;

  const dims = useMemo(() => {
    const cw = Math.max(320, Math.min(containerW, maxWidth));
    const twoUp = cw >= 768; // single on phones
    const gutter = twoUp ? 40 : 0;

    const targetVh = vvh || 900;
    const sectionRatio = isMobile ? mobileVhMaxRatio : vhMaxRatio;

    const maxH = Math.max(420, Math.min((isMobile ? 0.52 : 0.8) * targetVh, 1100));
    const candW = Math.round((cw - gutter) / (twoUp ? 2 : 1));
    const candH = Math.round(candW / pageAspect);

    let h = candH;
    let w = candW;
    if (candH > maxH) {
      h = Math.round(maxH);
      w = Math.round(h * pageAspect);
    }
    return { singleW: w, singleH: h, twoUp, sectionRatio } as const;
  }, [containerW, maxWidth, vvh, isMobile, pageAspect, vhMaxRatio, mobileVhMaxRatio]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const api = bookRef.current?.pageFlip?.();
      if (!api) return;
      if (e.key === "ArrowLeft") api.flipPrev();
      if (e.key === "ArrowRight") api.flipNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sectionMinH = `min(${Math.round(
    (containerW < 768 ? mobileVhMaxRatio : vhMaxRatio) * 100
  )}dvh, ${Math.round((containerW < 768 ? mobileVhMaxRatio : vhMaxRatio) * 100)}vh)`;

  // Ask Next/Image for enough pixels (page is shown using 200% width wrapper)
  const imgSizes = `${Math.ceil(dims.singleW * 2)}px`;

  return (
    <section aria-label="Flipbook" className="relative isolate overflow-hidden" style={{ minHeight: sectionMinH }}>
      {/* Background */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <NextImage src={bgImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Brand washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(36rem 22rem at 14% -8%, ${TEAL}26, transparent 70%),
                       radial-gradient(34rem 20rem at 86% 108%, ${ORANGE}22, transparent 70%)`,
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%22440%22 viewBox=%220 0 40 440%22><filter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%2240%22 height=%22440%22 filter=%22url(%23n)%22 opacity=%220.45%22/></svg>')",
        }}
      />

      {/* OUTER container */}
      <div
        ref={containerRef}
        className="relative z-[2] mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-12"
        style={
          isMobile
            ? { display: "grid", placeItems: "center", minHeight: sectionMinH, paddingTop: "10px", paddingBottom: "10px" }
            : undefined
        }
      >
        {/* GLASS CARD */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="mx-auto w-full rounded-2xl ring-1 p-3 sm:p-6 lg:p-8"
          style={{
            maxWidth: `${maxWidth}px`,
            background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            color: "#fff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* HEADER */}
          <div className="mb-2 sm:mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {kicker && (
                <span
                  className="inline-flex items-center text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
                >
                  {kicker}
                </span>
              )}
              {title && <h2 className="text-sm sm:text-lg md:text-2xl font-semibold">{title}</h2>}
              <span className="rounded-full border px-2 py-0.5 text-[11px] sm:text-xs opacity-90">
                Sayfa {page + 1} / {virtualPages.length}
              </span>
            </div>

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm hover:bg-white/10"
              >
                <Download size={16} /> PDF
              </a>
            )}
          </div>

          {/* BOOK AREA */}
          <div className="relative flex-1 grid place-items-center touch-pan-y">
            {/* subtle center seam (desktop two-up only) */}
            {dims.twoUp && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 35%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.25))",
                  filter: "blur(0.2px)",
                }}
              />
            )}

            {/* @ts-expect-error: 3rd-party component lacks full TS generics */}
            <HTMLFlipBook
              ref={bookRef}
              className="flipbook"
              width={dims.singleW}
              height={dims.singleH}
              size="stretch"
              minWidth={260}
              maxWidth={2400}
              minHeight={220}
              maxHeight={2000}
              showCover={false}
              mobileScrollSupport={true}
              drawShadow={true}
              maxShadowOpacity={0.28}
              onFlip={(e: FlipEvent) => setPage(e.data)}
            >
              {virtualPages.map(({ src, half }, i) => {
                // We draw the spread at 200% width inside each page and shift it,
                // so exactly half fills the page with no blank space.
                const offsetLeft = half === "left" ? "0%" : "-100%";
                return (
                  <div
                    key={`${i}-${half}`}
                    className="relative h-full w-full rounded-[20px] overflow-hidden ring-1 ring-white/15 shadow-xl bg-transparent"
                  >
                    <div className="absolute inset-0" style={{ width: "200%", left: offsetLeft }}>
                      <NextImage
                        src={src}
                        alt={`Perla II flipbook ${half} – page ${i + 1}`}
                        fill
                        priority={i < 4}
                        quality={imgQuality}
                        sizes={imgSizes}
                        className="pointer-events-none object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </HTMLFlipBook>
          </div>
        </motion.div>
      </div>

      {/* Decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -bottom-24 z-[1] w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25 max-sm:hidden"
        style={{ background: `${TEAL}44` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 z-[1] w-[24rem] h-[24rem] rounded-full blur-3xl opacity-25 max-sm:hidden"
        style={{ background: `${ORANGE}44` }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-10 sm:h-16 bg-gradient-to-t from-black/35 to-transparent" />

      <style jsx global>{`
        :root {
          --flip-page-radius: ${PAGE_RADIUS_PX}px;
        }
        .flipbook .page,
        .flipbook .hard {
          background: transparent !important;
          border-radius: var(--flip-page-radius) !important;
          overflow: hidden !important;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.28);
          -webkit-mask-image: -webkit-radial-gradient(white, black);
        }
        .flipbook .page > div,
        .flipbook .page .page-content,
        .flipbook .hard > div {
          border-radius: var(--flip-page-radius) !important;
          overflow: hidden !important;
        }
        .flipbook {
          will-change: transform;
          touch-action: pan-y;
        }
      `}</style>
    </section>
  );
}

/* Quick wrapper so you can just <FlipBookGlass /> */
const DEFAULT_SPREADS = Array.from({ length: 11 }).map(
  (_, i) => `/perlaflip/l-${String(i + 1).padStart(2, "0")}.webp`
);

export default function FlipBookGlass() {
  return (
    <FlipBookGlassBase
      pages={DEFAULT_SPREADS}
      pdfUrl="/brochure/perla2.pdf"
      title="La Joya Perla II Kataloğu"
      kicker="LA JOYA PERLA II"
      maxWidth={2000}
      vhMaxRatio={0.88}
      mobileVhMaxRatio={0.58}
      imgQuality={95}
    />
  );
}
