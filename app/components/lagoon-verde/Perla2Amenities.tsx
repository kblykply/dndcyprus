// app/sections/LagoonVerde360Section.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { PlayCircle, Maximize2, Minimize2, ExternalLink } from "lucide-react";

const TEAL = "#27959b";    // lagoon vibe
const ORANGE = "#f15c34";  // sunset accent

// ---- Defaults live in the section (as requested) ----
const TOUR_SRC = "/tours/lagoon-verde/app-files/index.html";
// Bigger viewer: use clamp to be large yet safe on small screens
const VIEW_HEIGHT = "clamp(460px, 86vh, 1100px)";
const BORDER_RADIUS = 20;

// Visuals
const BG_IMAGE = "/lagoon-verde/7.jpg";
const POSTER_IMAGE = "/lagoon-verde/2.jpg";
const OVERLAY_IMAGE = ""; // e.g. "/overlays/noise.png" or leave "" to disable

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---- Type helpers for fullscreen vendor prefixes & CSS vars ----
declare global {
  interface Document {
    webkitExitFullscreen?: () => Promise<void> | void;
    mozCancelFullScreen?: () => Promise<void> | void;
    msExitFullscreen?: () => Promise<void> | void;
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  }
  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void> | void;
    mozRequestFullScreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  }
}

/** Allow CSS custom properties without `any` */
type CSSVars = React.CSSProperties & { [key in `--${string}`]?: string | number };

export default function LagoonVerde360Section() {
  const [isPlaying, setIsPlaying] = useState(false); // lazy mount iframe
  const [isFs, setIsFs] = useState(false);
  const frameWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onFsChange = () => {
      const fsEl =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFs(Boolean(fsEl));
    };

    // Listen to standard + vendor-prefixed events (no `any`)
    const fsEvents = [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "MSFullscreenChange",
    ] as const;

    fsEvents.forEach((ev) =>
      document.addEventListener(ev, onFsChange as EventListener)
    );

    return () => {
      fsEvents.forEach((ev) =>
        document.removeEventListener(ev, onFsChange as EventListener)
      );
    };
  }, []);

  const enterFullscreen = () => {
    const el = frameWrapRef.current;
    if (!el) return;
    const req =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    req?.call(el);
  };

  const exitFullscreen = () => {
    const exit =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;
    exit?.call(document);
  };

  const sectionStyle: CSSVars = {
    minHeight: "70vh",
    "--stroke": "rgba(255,255,255,0.18)",
  };

  return (
    <section
      aria-label="Lagoon Verde — 360° Sanal Tur"
      className="relative overflow-hidden"
      style={sectionStyle}
    >
      {/* Background image */}
      {!!BG_IMAGE && (
        <div className="absolute inset-0">
          <Image
            src={BG_IMAGE}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Brand glows & tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,12,14,0.45) 0%, rgba(10,12,14,0.4) 100%),
            radial-gradient(40rem 24rem at 12% -10%, ${TEAL}33, transparent 70%),
            radial-gradient(36rem 22rem at 88% 110%, ${ORANGE}33, transparent 70%)
          `,
        }}
      />

      {/* Optional overlay image */}
      {OVERLAY_IMAGE && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage: `url(${OVERLAY_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Grain fallback */}
      {!OVERLAY_IMAGE && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%22440%22 viewBox=%220 0 40 40%22><filter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%2240%22 height=%2240%22 filter=%22url(%23n)%22 opacity=%220.45%22/></svg>')",
          }}
        />
      )}

      {/* Wider container */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-22">
        {/* Wider glass card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mx-auto w-full max-w-none rounded-3xl p-6 sm:p-8 lg:p-10 ring-1"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08))",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid var(--stroke)",
            color: "#ffffff",
            boxShadow: `0 24px 70px rgba(0,0,0,0.35)`,
          }}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
            >
              Lagoon Verde — 360° Tur
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-3xl mx-auto text-sm sm:text-base"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Projeyi panoramik olarak keşfedin. Yüklenme yalnızca “Play” ile
              başlar — sayfa performansı için optimize edildi.
            </motion.p>
          </div>

          {/* Viewer area (bigger) */}
          <div className="relative mx-auto w-full">
            <div
              ref={frameWrapRef}
              className="relative w-full"
              style={{
                height: VIEW_HEIGHT,
                borderRadius: BORDER_RADIUS,
                overflow: "hidden",
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Poster until Play */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group relative h-full w-full"
                  style={{ cursor: "pointer" }}
                  aria-label="360 Turu Başlat"
                >
                  <Image
                    src={POSTER_IMAGE}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/30" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <PlayCircle
                        size={80}
                        className="opacity-95 transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="text-white/90 text-sm sm:text-base">
                        360 Turu Başlat
                      </span>
                    </div>
                  </div>
                </button>
              )}

              {/* Iframe after Play */}
              {isPlaying && (
                <>
                  <iframe
                    src={TOUR_SRC}
                    title="Lagoon Verde 360 Tour"
                    style={{ width: "100%", height: "100%", border: 0, display: "block" }}
                    allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer"
                    allowFullScreen
                    loading="eager"
                  />
                  <button
                    onClick={isFs ? exitFullscreen : enterFullscreen}
                    className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-xl bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-md hover:bg-black/70"
                    aria-label={isFs ? "Fullscreen'den çık" : "Fullscreen"}
                  >
                    {isFs ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    {isFs ? "Çık" : "Fullscreen"}
                  </button>
                </>
              )}
            </div>

            {/* Utility row */}
            <div className="mt-4 flex items-center justify-center gap-3 opacity-90">
              <a
                href={TOUR_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <ExternalLink size={14} />
                Yeni sekmede aç
              </a>
            </div>

            {/* underglow */}
            <div
              aria-hidden
              className="mx-auto mt-8 h-px w-2/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative corner orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -bottom-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-25"
        style={{ background: `${TEAL}44` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25"
        style={{ background: `${ORANGE}44` }}
      />
    </section>
  );
}
