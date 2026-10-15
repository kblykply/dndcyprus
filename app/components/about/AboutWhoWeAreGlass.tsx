"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

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

const POINTS = [
  "Konseptten teslimata güvenilir iş ortaklarıyla süreç yönetimi.",
  "Öne çıkan bölgelerde, denize ve şehre yakın lokasyon seçimi.",
  "Satış, satış sonrası ve uzun vadeli müşteri desteğinde şeffaflık.",
];

// Azure: sol metin sütunu (kicker / başlık / maddeler / pill butonlar), sağda 28px çerçeveli video kutusu.
export default function AboutWhoWeAreGlass({
  images = {
    main: "/Mariachi - 2.png",
    sideTop: "/Mariachi - 2.png",
    sideBottom: "/Mariachi - 2.png",
  },
  youtubeId,
  poster,
  videoTitle = "Tanıtım Videosu",
  startAt = 0,
  kicker = "Hakkımızda",
}: Props) {
  return (
    <section id="biz-kimiz" className="az-section" aria-label="Biz Kimiz bölümü">
      <div className="az-wrap">
        <div className="grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-2 lg:gap-14">
          <div>
            <span className="az-kicker rv">{kicker}</span>
            <h2 className="az-h2 sm rv d1">Biz <b>Kimiz</b></h2>
            <p className="az-lead rv d2">
              DND Cyprus, Kıbrıs genelinde konut ve karma kullanımlı projeler geliştiren, tasarım odaklı bir
              gayrimenkul şirketidir.
            </p>
            <ul className="rv d2 m-0 mt-7 grid list-none gap-3 p-0">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed">
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="rv d3 mt-8 flex flex-wrap gap-3">
              <Link className="az-btn sea sm" href="/tr/projects" prefetch={false}>Projelerimizi Görün</Link>
              <Link className="az-btn glass sm" href="/tr/team" prefetch={false}>Ekibimiz</Link>
            </div>
          </div>

          <figure
            className="rv d1 m-0 w-full max-w-full overflow-hidden rounded-[28px]"
            style={{ background: "var(--sea-deep)", boxShadow: "0 24px 60px rgba(13,35,38,.14)" }}
          >
            {youtubeId ? (
              <VideoPlayer id={youtubeId} title={videoTitle} startAt={startAt} poster={poster ?? images.main} />
            ) : (
              <Image
                width={1280}
                height={720}
                quality={65}
                src={images.main}
                alt="Ekip veya proje görseli"
                className="block h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            )}
          </figure>
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

/** Kapak görseli + oynat düğmesi; tıklayınca YouTube iframe'i takılır. */
function VideoPlayer({
  id,
  title,
  poster,
  startAt = 0,
  heading = "DND Beach Club Party",
  description = "Projelerimizi ve ekibimizi yakından tanıyın.",
}: {
  id: string;
  title: string;
  poster?: string;
  startAt?: number;
  heading?: string;
  description?: string;
}) {
  const [play, setPlay] = useState<false | "auto" | "manual">(false);
  const src = `https://www.youtube-nocookie.com/embed/${id}?${
    play === "auto" ? "autoplay=1&" : ""
  }rel=0&modestbranding=1&playsinline=1&mute=0&start=${startAt}`;
  const start = () =>
    setPlay(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "manual" : "auto");

  return (
    <div className="relative aspect-video w-full max-w-full overflow-hidden" style={{ background: "var(--sea-deep)" }}>
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
          onClick={start}
          className="group absolute inset-0 h-full w-full cursor-pointer text-left"
          aria-label={`${title} videoyu oynat`}
        >
          <DeferredFillImage
            fill
            quality={65}
            src={poster || `/api/og/video/${id}.jpg`}
            alt={title}
            className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 720px, (min-width: 900px) 50vw, 100vw"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(6,58,66,0) 40%, rgba(6,58,66,.7) 100%)" }}
          />
          <span className="absolute inset-0 grid place-items-center">
            <span
              className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_14px_40px_rgba(0,0,0,.3)] transition-transform duration-500 group-hover:scale-105"
              style={{ color: "var(--sea)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-[18px] px-4 py-3 text-white sm:bottom-5 sm:left-5 sm:right-5"
            style={{ background: "rgba(255,255,255,.16)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.35)" }}
          >
            <span className="min-w-0">
              <b className="block text-[15px] font-medium" style={{ fontFamily: "var(--font-display)" }}>{heading}</b>
              <span className="mt-0.5 hidden text-[13px] text-white/85 sm:block">{description}</span>
            </span>
            <span className="az-tag hidden flex-none sm:inline-flex">Video</span>
          </span>
        </button>
      )}
    </div>
  );
}
