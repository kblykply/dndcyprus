"use client";

import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type ImageSet = {
  main: string;
  sideTop: string;
  sideBottom: string;
};

type Props = {
  images: ImageSet;
  youtubeId?: string;
  poster?: string;
  videoTitle?: string;
  startAt?: number;
  kicker?: string;
};

export default function AboutWhoWeAreGlass({
  images = {
    main: "/Mariachi - 2.png",
    sideTop: "/Mariachi - 2.png",
    sideBottom: "/Mariachi - 2.png",
  },
  youtubeId,
  poster,
videoTitle = "Introduction Video",
startAt = 0,
kicker = "About Us",

}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { margin: "-15% 0px -15% 0px", amount: 0.35 });
  const reduced = useReducedMotion();

  // Animation controls
  const textCtrl = useAnimation();
  const gridCtrl = useAnimation();
  const figMainCtrl = useAnimation();

  // Variants
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const D = reduced ? 0.001 : 0.6;

  const rise = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduced ? 0 : 18 },
      show: { opacity: 1, y: 0, transition: { duration: D, ease } },
    }),
    [D, ease, reduced]
  );

  const fadeScale = useMemo(
    () => ({
      hidden: { opacity: 0, scale: reduced ? 1 : 0.985 },
      show: { opacity: 1, scale: 1, transition: { duration: D, ease } },
    }),
    [D, ease, reduced]
  );

  useEffect(() => {
    if (inView) {
      textCtrl.start("show");
      gridCtrl.start("show");
      figMainCtrl.start({ opacity: 1, scale: 1, transition: { duration: D, ease, delay: reduced ? 0 : 0.05 } });
    } else {
      textCtrl.set("hidden");
      gridCtrl.set("hidden");
      figMainCtrl.set({ opacity: 0, scale: reduced ? 1 : 0.985 });
    }
  }, [inView, textCtrl, gridCtrl, figMainCtrl, D, ease, reduced]);

  return (
    <section
      ref={sectionRef}
      id="biz-kimiz"
      className="relative isolate bg-white px-4 sm:px-6 md:px-12 py-14 md:py-20 lg:py-24"
      aria-label="Biz Kimiz bölümü"
    >
      {/* brand glows (subtle, non-intrusive) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 md:opacity-80"
        style={{
          background: `
            radial-gradient(36rem 22rem at 4% -10%, ${TEAL}22, transparent 70%),
            radial-gradient(36rem 22rem at 100% 110%, ${ORANGE}18, transparent 70%)
          `,
          mixBlendMode: "screen",
        }}
      />

      {/* faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 50/50 layout */}
      <div className="relative z-10 mx-auto max-w-7xl grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Left (text) */}
        <motion.div
          variants={rise}
          initial="hidden"
          animate={textCtrl}
          className="glass rounded-2xl border bg-white/70 p-5 sm:p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
        >
          {/* Kicker + line */}
          <div className="mb-3 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[2px] w-12 rounded-full flex-none"
              style={{ backgroundColor: TEAL }}
            />
            <span className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-neutral-600">
              {kicker}
            </span>
          </div>

        <h2 className="text-[clamp(1.5rem,4.2vw,2.25rem)] font-semibold text-neutral-900">
  Who We Are
</h2>
<p className="mt-3 text-[clamp(0.95rem,2.5vw,1rem)] text-neutral-700">
  DND Cyprus is a design-driven real estate company developing residential and mixed-use projects across Cyprus.
</p>
<ul className="mt-6 space-y-3 text-[clamp(0.9rem,2.4vw,0.95rem)] text-neutral-700">
  <li className="flex gap-2">
    <Dot /> End-to-end project management with reliable partners, from concept to delivery.
  </li>
  <li className="flex gap-2">
    <Dot /> Location selection in prime areas, close to both the sea and the city.
  </li>
  <li className="flex gap-2">
    <Dot /> Transparency in sales, after-sales services, and long-term customer support.
  </li>
</ul>

<div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
  <a
    href="/en/projects"
    className="glass-thin inline-flex w-full sm:w-auto items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-neutral-900 ring-1 ring-[var(--glass-border)] transition-transform hover:scale-[1.02]"
  >
    View Our Projects
  </a>
  <a
    href="/en/team"
    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-neutral-700 hover:underline"
  >
    Our Team
  </a>

          </div>
        </motion.div>

        {/* Right (visual) */}
        <motion.div
          variants={fadeScale}
          initial="hidden"
          animate={gridCtrl}
          className="relative flex items-center"
        >
          <motion.figure
            initial={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
            animate={figMainCtrl}
            className="w-full overflow-hidden rounded-2xl border bg-white/50 ring-1 ring-black/5 shadow-xl"
          >
            {youtubeId ? (
              <VideoPlayer
                id={youtubeId}
                title={videoTitle}
                startAt={startAt}
                poster={poster ?? images.main}
                autoPlayOnClick={!reduced}
              />
            ) : (
              <img
                src={images.main}
                alt="Ekip veya proje görseli"
                className="block h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            )}
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full"
      style={{ backgroundColor: TEAL }}
    />
  );
}

/** Lightweight YouTube player with poster & play overlay */
function VideoPlayer({
  id,
  title,
  poster,
  startAt = 0,
  autoPlayOnClick = true,
 heading = "DND Beach Club Party",
description = "Get to know our projects and our team up close.",

}: {
  id: string;
  title: string;
  poster?: string;
  startAt?: number;
  autoPlayOnClick?: boolean;
  heading?: string;
  description?: string;
}) {
  const [play, setPlay] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${id}?${
    autoPlayOnClick && play ? "autoplay=1&" : ""
  }rel=0&modestbranding=1&playsinline=1&mute=0&start=${startAt}`;

  return (
    <div className="relative aspect-video w-full bg-black overflow-hidden rounded-2xl">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`${title} videoyu oynat`}
        >
          <img
            src={poster || `/api/og/video/${id}.jpg`}
            alt={title}
            className="h-full w-full object-cover opacity-95 transition-opacity group-hover:opacity-100"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
          {/* dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          {/* Text overlay (hide on mobile to avoid crowding) */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-left hidden sm:block">
            <h3 className="text-[clamp(1.125rem,2.4vw,1.75rem)] font-bold text-white drop-shadow-lg">
              {heading}
            </h3>
            <p className="mt-2 text-[clamp(0.9rem,1.8vw,1rem)] text-white/90 max-w-xl">
              {description}
            </p>
          </div>

          {/* Play button */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center justify-center rounded-full p-5 md:p-6 bg-white/90 shadow-2xl ring-1 ring-white/60 transition-transform group-hover:scale-105">
              <svg width="28" height="28" viewBox="0 0 24 24" fill={TEAL} aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
