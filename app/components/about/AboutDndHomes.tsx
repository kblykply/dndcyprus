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
      className="relative isolate px-4 sm:px-6 md:px-12 py-10 sm:py-14 lg:py-24 [color-scheme:light] bg-white"
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
            "bg-white",
            "supports-[backdrop-filter]:bg-white/85 supports-[backdrop-filter]:backdrop-blur-xl",
            "border border-black/10 ring-1 ring-black/5",
            "shadow-[0_8px_40px_rgba(0,0,0,0.12)]",
          ].join(" ")}
        >
          {/* White base floor */}
          <div className="absolute inset-0 -z-10 bg-white" aria-hidden />

          <VideoHeroCard id={videoId} title={videoTitle} poster={poster} startAt={startAt}>
            {/* BRAND GLOWS */}
            <div
              className="pointer-events-none absolute inset-0 opacity-70 md:opacity-90"
              aria-hidden
              style={{
                background: `
                  radial-gradient(36rem 22rem at 6% 0%, ${TEAL}22, transparent 70%),
                  radial-gradient(30rem 18rem at 96% 100%, ${ORANGE}18, transparent 70%)
                `,
                mixBlendMode: "screen",
              }}
            />

            {/* Kicker pill (top-left) — show on ≥sm */}
            <div className="hidden sm:block absolute left-4 top-4 md:left-6 md:top-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 ring-1 ring-white/20 backdrop-blur-md">
                <span className="h-[2px] w-10 rounded-full" style={{ backgroundColor: TEAL }} aria-hidden />
                {kicker}
              </div>
            </div>

            {/* Glass content stack (bottom-left) — hidden on mobile to avoid crowding */}
            <div className="hidden sm:block absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white pointer-events-auto">
              <GlassContent heading={heading} description={description} />

              {/* Bullet chips */}
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                <BlurChip>
                  <Dot /> Boston kökenli marka; Massachusetts’te 120 tamamlanmış proje
                </BlurChip>
                <BlurChip>
                  <Dot /> Kuzey Kıbrıs’ta{" "}
                  <strong className="font-semibold text-white">30.000+ konut</strong> vizyonu.
                </BlurChip>
                <BlurChip>
                  <Dot /> Bafra turizm yatırımı ve{" "}
                  <strong className="font-semibold text-white">Mariachi Beach Club</strong> ayrıcalıkları.
                </BlurChip>
                <BlurChip>
                  <Dot /> ABD &amp; KKTC merkez ofisleri; Amerikan kalite standartları.
                </BlurChip>
              </ul>

              {/* CTAs */}
              <div className="mt-3 inline-flex flex-wrap gap-2 rounded-xl bg-black/25 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur-md">
                <PrimaryCTA href="https://dnd-homes.com/">DND Homes Web Sitesi</PrimaryCTA>
                <SecondaryCTA href="/projects">Kuzey Kıbrıs Projeleri</SecondaryCTA>
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

        {/* ---- Mobile content (≤sm): stacked below the video for readability) ---- */}
        <div className="sm:hidden mt-4 text-black">
          {/* Mobile kicker */}
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/70 ring-1 ring-black/10">
              <span className="h-[2px] w-10 rounded-full" style={{ backgroundColor: TEAL }} aria-hidden />
              {kicker}
            </div>
          </div>

          <div className="rounded-xl border border-black/10 ring-1 ring-black/5 bg-white p-3 text-black">
            <h2 className="text-[clamp(1.05rem,3.5vw,1.25rem)] font-semibold leading-snug">
              {heading}
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-black/75">
              {description}
            </p>

            <ul className="mt-3 grid gap-2">
              <BlurChipMobile>
                <Dot /> Massachusetts’te 120 tamamlanmış proje
              </BlurChipMobile>
              <BlurChipMobile>
                <Dot /> KKTC’de <strong className="font-semibold text-black">30.000+ konut</strong> vizyonu
              </BlurChipMobile>
              <BlurChipMobile>
                <Dot /> Bafra yatırımı &amp; Mariachi Beach Club
              </BlurChipMobile>
              <BlurChipMobile>
                <Dot /> ABD &amp; KKTC ofisleri; kalite standartları
              </BlurChipMobile>
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              <PrimaryCTA href="https://dnd-homes.com/" invert>
                DND Homes Web Sitesi
              </PrimaryCTA>
              <SecondaryCTA href="/projects">Kuzey Kıbrıs Projeleri</SecondaryCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reusable bits ---------- */

function GlassContent({ heading, description }: { heading: string; description: string }) {
  return (
    <div className="max-w-3xl rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/20 backdrop-blur-md">
      <h2 className="text-[clamp(1.125rem,1.6vw,1.5rem)] md:text-[clamp(1.25rem,1.6vw,1.75rem)] font-semibold leading-snug text-pretty">
        {heading}
      </h2>
      <p className="mt-1 text-xs md:text-sm text-white/90 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function PrimaryCTA({
  href,
  children,
  invert,
}: {
  href: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      className={[
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm font-medium shadow ring-1 transition",
        invert
          ? "text-black bg-white ring-black/5 hover:brightness-95"
          : "text-black bg-white ring-black/5 hover:brightness-95",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function SecondaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
   <Link
  href={href}
  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm font-medium
             text-black/80 md:text-white
             ring-1 ring-black/10 md:ring-white/25
             hover:bg-black/[0.04] md:hover:bg-white/10 transition"
>
  {children}
</Link>
  );
}

function BlurChip({ children }: { children: React.ReactNode }) {
  return (
    <li className="break-words leading-normal rounded-xl bg-black/25 px-3 py-2 text-xs md:text-sm ring-1 ring-white/15 backdrop-blur-md flex items-start gap-2">
      {children}
    </li>
  );
}

function BlurChipMobile({ children }: { children: React.ReactNode }) {
  return (
    <li className="break-words leading-normal rounded-lg bg-black/[0.04] px-3 py-2 text-[13px] ring-1 ring-black/10 flex items-start gap-2 text-black/85">
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

  // Poster fallbacks (avoid black frame)
  const ytMax = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const ytHQ = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const [imgSrc, setImgSrc] = useState<string>(poster || ytMax);
  const [imgLoaded, setImgLoaded] = useState(false);

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
            src={imgSrc}
            alt={title}
            fill
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
            priority={false}
            unoptimized
            onLoadingComplete={() => setImgLoaded(true)}
            onError={() => {
              setImgLoaded(false);
              setImgSrc((prev) => (prev === ytMax ? ytHQ : prev));
            }}
          />
          {/* Scrim for base contrast */}
          <div
            className={[
              "absolute inset-0 transition-opacity duration-300 pointer-events-none",
              imgLoaded ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.08) 46%, rgba(0,0,0,0) 70%)",
            }}
            aria-hidden
          />
        </>
      )}

      {/* Iframe (when playing) */}
      {play && (
        <iframe
          className="absolute inset-0 h-full w-full bg-white"
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
  