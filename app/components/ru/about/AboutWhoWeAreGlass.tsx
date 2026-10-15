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
  "Полное управление проектом вместе с надёжными партнёрами — от концепции до сдачи.",
  "Участки в лучших районах — рядом и с морем, и с городом.",
  "Прозрачность в продажах, послепродажном сервисе и долгосрочной поддержке клиентов.",
];

// Azure: text column on the left (kicker / heading / points / pill buttons), 28px framed video box on the right.
export default function AboutWhoWeAreGlass({
  images = {
    main: "/Mariachi - 2.png",
    sideTop: "/Mariachi - 2.png",
    sideBottom: "/Mariachi - 2.png",
  },
  youtubeId,
  poster,
  videoTitle = "Презентационное видео",
  startAt = 0,
  kicker = "О нас",
}: Props) {
  return (
    <section id="biz-kimiz" className="az-section" aria-label="Раздел «Кто мы»">
      <div className="az-wrap">
        <div className="grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-2 lg:gap-14">
          <div>
            <span className="az-kicker rv">{kicker}</span>
            <h2 className="az-h2 sm rv d1">Кто <b>мы</b></h2>
            <p className="az-lead rv d2">
              DND Cyprus — девелоперская компания, для которой дизайн стоит на первом месте. Мы создаём жилые и многофункциональные проекты по всему Кипру.
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
              <Link className="az-btn sea sm" href="/ru/projects" prefetch={false}>Смотреть проекты</Link>
              <Link className="az-btn glass sm" href="/ru/team" prefetch={false}>Наша команда</Link>
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
                alt="Фото команды или проекта"
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

/** Poster + play button; the YouTube iframe is mounted on click. */
function VideoPlayer({
  id,
  title,
  poster,
  startAt = 0,
  heading = "Вечеринка DND Beach Club",
  description = "Познакомьтесь с нашими проектами и командой поближе.",
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
          aria-label={`Смотреть видео: ${title}`}
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
            <span className="az-tag hidden flex-none sm:inline-flex">Видео</span>
          </span>
        </button>
      )}
    </div>
  );
}
