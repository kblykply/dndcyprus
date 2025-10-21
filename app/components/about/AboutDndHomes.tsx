"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Props = {
  kicker?: string;
  videoId: string;         // YouTube ID
  poster?: string;         // optional poster image
  videoTitle?: string;     // iframe title
  startAt?: number;        // seconds
  heading?: string;        // overlay heading
  description?: string;    // overlay description
};

export default function AboutDndHomes({
  kicker = "ABD'de doğdu, Kuzey Kıbrıs’ta yaşıyor",
  videoId,
  poster,
  videoTitle = "DND Homes Tanıtım Videosu",
  startAt = 0,
  heading = "Projelerimizi ve yaşam konseptimizi keşfedin.",
  description = "DND Homes; Massachusetts (ABD) ve Kuzey Kıbrıs’ta seçkin lokasyonlarda üst düzey konutlar geliştirir.",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px", amount: 0.3 });
  const reduced = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;
  const D = reduced ? 0.001 : 0.6;

  const rise = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduced ? 0 : 16, filter: "blur(6px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: D, ease } },
    }),
    [D, ease, reduced]
  );

  return (
    <section
      ref={sectionRef}
      id="dnd-homes"
      className="relative isolate px-6 py-16 md:px-12 lg:py-24 [color-scheme:light]"
      aria-label="DND Homes Video Kartı"
    >
      <div className="mx-auto max-w-7xl">
        {/* Single video card */}
        <motion.figure
          variants={rise}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={[
            "relative overflow-hidden rounded-2xl",
            // Force a solid light surface so dark themes/extensions can't invert it
            "bg-white",
            // Keep a soft glass feel when blur is supported, but still light
            "supports-[backdrop-filter]:bg-white/85 supports-[backdrop-filter]:backdrop-blur-xl",
            // Use neutral (black-based) borders on light backgrounds
            "border border-black/10 ring-1 ring-black/5",
            "shadow-[0_8px_40px_rgba(0,0,0,0.12)]",
          ].join(" ")}
        >
          {/* White base floor (guarantees light look regardless of page/theme) */}
          <div className="absolute inset-0 -z-10 bg-white" aria-hidden />

          <VideoHeroCard
            id={videoId}
            title={videoTitle}
            poster={poster}
            startAt={startAt}
          >
            {/* BRAND GLOWS */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background: `
                  radial-gradient(36rem 22rem at 6% 0%, ${TEAL}22, transparent 70%),
                  radial-gradient(30rem 18rem at 96% 100%, ${ORANGE}18, transparent 70%)
                `,
                mixBlendMode: "screen",
                opacity: 0.8,
              }}
            />

            {/* Kicker pill (top-left) */}
            <div className="absolute left-4 top-4 md:left-6 md:top-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 ring-1 ring-white/20 backdrop-blur-md">
                <span className="h-[2px] w-10 rounded-full" style={{ backgroundColor: TEAL }} aria-hidden />
                {kicker}
              </div>
            </div>

            {/* Glass content stack (bottom-left) */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white pointer-events-auto">
              {/* Heading + description in a blur card */}
              <div className="max-w-3xl rounded-xl bg-black/35 px-4 py-3 ring-1 ring-white/20 backdrop-blur-md">
                <h2 className="text-lg font-semibold md:text-2xl leading-snug text-pretty">
                  {heading}
                </h2>
                <p className="mt-1 text-xs md:text-sm text-white/90 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Bullet chips (each is its own blur card) */}
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 max-w-4xl">
                <BlurChip>
                  <Dot /> Boston kökenli marka; Massachusetts’te 120 tamamlanmış proje
                </BlurChip>
                <BlurChip>
                  <Dot /> Kuzey Kıbrıs’ta{" "}
                  <strong className="font-semibold text-white">30.000+ konut</strong>
                  {" "}vizyonu.
                </BlurChip>
                <BlurChip>
                  <Dot /> Bafra turizm yatırımı ve{" "}
                  <strong className="font-semibold text-white">Mariachi Beach Club</strong> ayrıcalıkları.
                </BlurChip>
                <BlurChip>
                  <Dot /> ABD &amp; KKTC merkez ofisleri; Amerikan kalite standartları.
                </BlurChip>
              </ul>

              {/* CTAs in a small blur bar */}
              <div className="mt-3 inline-flex flex-wrap gap-2 rounded-xl bg-black/30 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur-md">
                <Link
                  href="https://dnd-homes.com/"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm font-medium text-black shadow ring-1 ring-black/5 hover:brightness-95 transition"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  DND Homes Web Sitesi
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm font-medium text-white/90 ring-1 ring-white/25 hover:bg-white/10 transition"
                >
                  Kuzey Kıbrıs Projeleri
                </Link>
              </div>
            </div>

            {/* Badge (top-right) */}
            <div className="absolute right-4 top-4 md:right-6 md:top-6">
              <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black ring-1 ring-black/10">
                Video
              </span>
            </div>
          </VideoHeroCard>
        </motion.figure>
      </div>
    </section>
  );
}

function BlurChip({ children }: { children: React.ReactNode }) {
  return (
    <li className="break-words leading-normal rounded-xl bg-black/30 px-3 py-2 text-xs md:text-sm ring-1 ring-white/15 backdrop-blur-md flex items-start gap-2">
      {children}
    </li>
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

/** Video hero with overlay children; overlay fades out on play */
function VideoHeroCard({
  id,
  title,
  poster,
  startAt = 0,
  autoPlayOnClick = true,
  children,
}: {
  id: string;
  title: string;
  poster?: string;
  startAt?: number;
  autoPlayOnClick?: boolean;
  children?: React.ReactNode; // overlay content
}) {
  const [play, setPlay] = useState(false);

  const src =
    `https://www.youtube-nocookie.com/embed/${id}?` +
    `${autoPlayOnClick && play ? "autoplay=1&" : ""}` +
    `rel=0&modestbranding=1&playsinline=1&mute=0&start=${startAt}`;

  return (
    <div className="relative aspect-video w-full bg-white">
      {/* Poster layer (when not playing) */}
      {!play && (
        <>
          <Image
            src={poster || `/api/og/video/${id}.jpg`}
            alt={title}
            fill
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
            priority={false}
          />
          {/* Scrim for base contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/10" />
        </>
      )}

      {/* Iframe (when playing) */}
      {play && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}

      {/* Overlay content (fades out on play) */}
      <div
        className={[
          "absolute inset-0 transition-opacity duration-300",
          play ? "opacity-0 pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        {children}

        {/* Play button */}
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label={`${title} videoyu oynat`}
        >
          <span className="inline-flex items-center justify-center rounded-full p-5 md:p-6 bg-white/90 shadow-2xl ring-1 ring-black/10 transition-transform group-hover:scale-105">
            <svg width="28" height="28" viewBox="0 0 24 24" fill={TEAL} aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
