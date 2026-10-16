// app/components/de/mariachi/MariachiVideoSpotlight.tsx
"use client";

import LazyYouTube from "@/app/components/LazyYouTube";
import { useMemo, type ReactNode } from "react";
import Link from "next/link";

export default function MariachiVideoSpotlight({
  title = <>Image<b>video</b></>,
  iframeTitle = "Imagevideo",
  subtitle = "Erleben Sie die Atmosphäre des Mariachi Beach Club im Kurzvideo: Pavillons, Pool- und Strandbereiche, Genuss den ganzen Tag und DJ-Auftritte am Abend.",
  badge = "Video",
  embedUrl = "https://www.youtube.com/embed/AobeR8p2Aq4?si=Z_AaUhavwKNYLgNX",
  videoSrc = "",
  poster = "/azure/mb-2.jpg",
  primaryCta = { label: "Pavillon reservieren", href: "/de/contact" },
  secondaryCta = { label: "Alle Videos", href: "https://www.youtube.com/@dndcyprus" },
  highlights = [
    { k: "Erlebnis", v: "Tag & Nacht" },
    { k: "Bereiche", v: "Strand • Pool • Pavillons" },
    { k: "Speisen & Getränke", v: "Restaurant & Poolbar" },
  ],
}: {
  title?: ReactNode;
  iframeTitle?: string;
  subtitle?: string;
  badge?: string;
  embedUrl?: string | null;
  videoSrc?: string;
  poster?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  highlights?: { k: string; v: string }[];
}) {
  // Ensure autoplay for embeds (YouTube/Vimeo/etc.)
  const ytId = useMemo(() => embedUrl?.match(/(?:youtube(?:-nocookie)?\.com\/embed\/|youtu\.be\/)([\w-]{6,})/)?.[1] ?? "", [embedUrl]);
  const isExternal = (href: string) => href.startsWith("http");

  return (
    <section className="az-section" aria-label="Mariachi Beach Club – Imagevideo">
      <div className="az-wrap">
        <div className="az-card rv grid grid-cols-1 min-[900px]:grid-cols-[1.25fr_1fr]">
          {/* Video (dark player box, framed inside the card) */}
          <div className="self-center p-3 sm:p-4 min-[900px]:p-5">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[22px] max-w-full" /* video 4:3 (960×720): 16:9 kutuda yanlarda siyah bant kalıyordu */
              style={{ background: "var(--sea-deep)", boxShadow: "0 20px 50px rgba(13,35,38,.18)" }}
            >
              {ytId ? (
                <LazyYouTube
                  // çerçevede kendiliğinden, sessiz ve döngüyle oynar (YouTube başlığı, düğmeleri ve "Diğer videolar" görünmez);
                  // eskiden tıklayınca YouTube oynatıcısı süslü açılış ekranı ve arayüzüyle açılıyordu
                  videoId={ytId}
                  query={`autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${ytId}&playsinline=1&modestbranding=1`}
                  ratio={4 / 3}
                  poster={poster}
                  cover
                  className="absolute inset-0"
                  title={iframeTitle}
                  posterAlt={iframeTitle}
                />
              ) : videoSrc ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  loop
                  controls
                  poster={poster}
                  preload="metadata"
                >
                  <source src={videoSrc} />
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={poster} alt="Vorstellung des Mariachi Beach Club" className="absolute inset-0 h-full w-full object-cover" decoding="async" />
              )}
            </div>
          </div>

          {/* Text */}
          <div className="self-center px-6 pb-7 pt-3 sm:px-8 sm:pb-8 min-[900px]:py-10 min-[900px]:pr-10 min-[900px]:pl-4">
            <span className="az-kicker">{badge}</span>
            <h2 className="az-h2 sm">{title}</h2>
            <p className="az-lead">{subtitle}</p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map((f, i) => (
                <div key={f.k + i} className="rounded-[18px] px-4 py-3" style={{ background: "var(--sky)" }}>
                  <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, color: "var(--sea)" }}>{f.k}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{f.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {isExternal(primaryCta.href)
                ? <a className="az-btn sea" href={primaryCta.href} target="_blank" rel="noopener noreferrer">{primaryCta.label}</a>
                : <Link className="az-btn sea" href={primaryCta.href} prefetch={false}>{primaryCta.label}</Link>}
              {isExternal(secondaryCta.href)
                ? <a className="az-btn glass" href={secondaryCta.href} target="_blank" rel="noopener noreferrer">{secondaryCta.label}</a>
                : <Link className="az-btn glass" href={secondaryCta.href} prefetch={false}>{secondaryCta.label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
