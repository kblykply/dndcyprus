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
  <>Marke aus Boston; 120 abgeschlossene Projekte in Massachusetts.</>,
  <>Die Vision: <strong className="font-medium" style={{ color: "var(--ink)" }}>über 30.000 Wohneinheiten</strong> in Nordzypern.</>,
  <>Tourismusinvestition in Bafra und exklusive Vorteile im <strong className="font-medium" style={{ color: "var(--ink)" }}>Mariachi Beach Club</strong>.</>,
  <>Hauptsitze in den USA &amp; in der TRNZ; amerikanische Qualitätsstandards.</>,
];

// Azure: heading block, then a 28px framed video box with a white panel beside it (points and buttons).
export default function AboutDndHomes({
  kicker = "In den USA gegründet, in Nordzypern zu Hause",
  videoId,
  poster,
  videoTitle = "Vorstellungsvideo von DND Homes",
  startAt = 0,
  heading = "Entdecken Sie unsere Projekte und unser Wohnkonzept.",
  description = "DND Homes entwickelt hochwertige Residenzen in Toplagen in Massachusetts (USA) und Nordzypern.",
}: Props) {
  return (
    <section id="dnd-homes" className="az-section" aria-label="Video zu DND Homes">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{heading}</h2>
          <p className="az-lead rv d2">{description}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 min-[900px]:grid-cols-[1.5fr_1fr]">
          <figure
            className="rv m-0 w-full max-w-full overflow-hidden rounded-[28px]"
            style={{ background: "var(--sea-deep)", boxShadow: "0 24px 60px rgba(13,35,38,.14)" }}
          >
            <VideoHeroCard id={videoId} title={videoTitle} poster={poster} startAt={startAt} />
          </figure>

          <aside className="az-panel rv d1">
            <ul className="m-0 grid list-none gap-3 p-0">
              {POINTS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "var(--ink-60)" }}>
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="az-btn sea sm" href="https://dnd-homes.com/" target="_blank" rel="noopener noreferrer">Website von DND Homes</a>
              <Link className="az-btn glass sm" href="/de/projects" prefetch={false}>Projekte in Nordzypern</Link>
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
    <div className="relative aspect-video w-full max-w-full" style={{ background: "var(--sea-deep)" }}>
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
            aria-label={`Video abspielen: ${title}`}
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
