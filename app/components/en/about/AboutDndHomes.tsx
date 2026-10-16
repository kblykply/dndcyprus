"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type Props = {
  kicker?: string;
  videoId: string;         // YouTube ID
  poster?: string;         // optional poster image
  videoTitle?: string;     // iframe title
  startAt?: number;        // seconds
  heading?: string;        // section heading
  description?: string;    // section lead
};

const POINTS: ReactNode[] = [
  <>Boston-based brand; 120 completed projects in Massachusetts.</>,
  <>A vision of <strong className="font-medium" style={{ color: "var(--ink)" }}>30,000+ homes</strong> in North Cyprus.</>,
  <>Bafra tourism investment and the exclusive <strong className="font-medium" style={{ color: "var(--ink)" }}>Mariachi Beach Club</strong> privileges.</>,
  <>Head offices in the USA &amp; TRNC; American quality standards.</>,
];

// Azure: heading block, then a 28px framed video box with a white panel beside it (points and buttons).
export default function AboutDndHomes({
  kicker = "Born in the USA, living in North Cyprus",
  videoId,
  poster,
  videoTitle = "DND Homes Introduction Video",
  startAt = 0,
  heading = "Discover our projects and living concept.",
  description = "DND Homes develops high-end residences in prime locations in Massachusetts (USA) and North Cyprus.",
}: Props) {
  return (
    <section id="dnd-homes" className="az-section" aria-label="DND Homes video">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{heading}</h2>
          <p className="az-lead rv d2">{description}</p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 min-[1440px]:grid-cols-[1.5fr_1fr]">
          <figure
            className="rv m-0 w-full max-w-full overflow-hidden rounded-[28px]"
            style={{ background: "var(--sea-deep)", boxShadow: "0 24px 60px rgba(13,35,38,.14)" }}
          >
            <VideoHeroCard id={videoId} title={videoTitle} poster={poster} startAt={startAt} />
          </figure>

          <aside className="az-panel rv d1 flex flex-col">
            {/* Meridian satırları: ince çizgili, masaüstünde video yüksekliğine eşit paylaşılır (altta boş alan kalmaz) */}
            <ul className="m-0 flex list-none flex-col border-t p-0 min-[1440px]:flex-1" style={{ borderColor: "var(--line)" }}>
              {POINTS.map((p, i) => (
                <li key={i} className="flex flex-col justify-center border-b py-3 text-[15px] leading-relaxed min-[1440px]:flex-1" style={{ color: "var(--ink-60)", borderColor: "var(--line)" }}>
                  <div className="flex items-start gap-3"><Check /><span>{p}</span></div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-6 min-[1440px]:mt-auto">
              <a className="az-btn sea sm" href="https://dnd-homes.com/" target="_blank" rel="noopener noreferrer">DND Homes Website</a>
              <Link className="az-btn glass sm" href="/en/projects" prefetch={false}>North Cyprus Projects</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <i
      aria-hidden="true"
      className="mt-[3px] grid h-5 w-5 flex-none place-items-center rounded-full text-[11px] not-italic text-white"
      style={{ background: "var(--sea)" }}
    >
      ✓
    </i>
  );
}

/** Poster (custom → YouTube maxres → hq) + play button; iframe mounts on click. */
function VideoHeroCard({
  id,
  title,
  poster,
  startAt = 0,
}: {
  id: string;
  title: string;
  poster?: string;
  startAt?: number;
}) {
  const [play, setPlay] = useState<false | "auto" | "manual">(false);
  const ytMax = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const ytHQ = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const [imgSrc, setImgSrc] = useState<string>(poster || ytMax);

  const src =
    `https://www.youtube-nocookie.com/embed/${id}?` +
    `${play === "auto" ? "autoplay=1&" : ""}` +
    `rel=0&modestbranding=1&playsinline=1&mute=0&start=${startAt}`;
  const start = () =>
    setPlay(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "manual" : "auto");

  return (
    <div className="relative aspect-video h-full w-full max-w-full" style={{ background: "var(--sea-deep)" }}>
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
        <>
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(min-width: 1280px) 900px, (min-width: 900px) 60vw, 100vw"
            className="object-cover"
            quality={65}
            unoptimized={!imgSrc.startsWith("/")}
            onError={() => setImgSrc((prev) => (prev === ytMax ? ytHQ : prev))}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(8,14,16,0) 55%, rgba(8,14,16,.38) 100%)" }}
          />
          <span className="az-tag absolute left-4 top-4 sm:left-5 sm:top-5">Video</span>
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 grid h-full w-full cursor-pointer place-items-center"
            aria-label={`Play video: ${title}`}
          >
            <span
              className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_14px_40px_rgba(0,0,0,.3)] transition-transform duration-500 group-hover:scale-105"
              style={{ color: "var(--sea)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
