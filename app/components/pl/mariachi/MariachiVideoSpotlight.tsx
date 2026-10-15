// app/components/pl/mariachi/MariachiVideoSpotlight.tsx
"use client";

import DeferredIframe from "@/app/components/performance/DeferredIframe";
import { useMemo, type ReactNode } from "react";
import Link from "next/link";

export default function MariachiVideoSpotlight({
  title = <>Film <b>promocyjny</b></>,
  iframeTitle = "Film promocyjny",
  subtitle = "Zapraszamy Państwa do obejrzenia krótkiego filmu o atmosferze Mariachi Beach Club: altany, basen i plaża, wypoczynek przez cały dzień i wieczorne występy DJ-ów.",
  badge = "Wideo",
  embedUrl = "https://www.youtube.com/embed/AobeR8p2Aq4?si=Z_AaUhavwKNYLgNX",
  videoSrc = "",
  poster = "/azure/mb-2.jpg",
  primaryCta = { label: "Zarezerwuj pawilon", href: "/pl/contact" },
  secondaryCta = { label: "Wszystkie filmy", href: "https://www.youtube.com/@dndcyprus" },
  highlights = [
    { k: "Klimat", v: "Dzień i noc" },
    { k: "Strefy", v: "Plaża • Basen • Pawilony" },
    { k: "Jedzenie i napoje", v: "Restauracja i bar przy basenie" },
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
  const autoplayEmbedUrl = useMemo(() => {
    if (!embedUrl) return null;
    try {
      const url = new URL(embedUrl);
      const host = url.hostname;

      // YouTube (incl. youtube-nocookie)
      if (host.includes("youtube") || host.includes("youtu.be")) {
        url.searchParams.set("autoplay", "1");     // required
        url.searchParams.set("mute", "1");         // required for autoplay policies
        url.searchParams.set("playsinline", "1");  // iOS inline autoplay
        url.searchParams.set("controls", "1");     // optional, looks cleaner
        url.searchParams.set("rel", "0");          // no related vids at end
        url.searchParams.set("loop", "1");         // loop requires playlist=id
        const vid = url.pathname.split("/").pop() || "";
        if (vid && !url.searchParams.has("playlist")) {
          url.searchParams.set("playlist", vid);
        }
      }
      // Vimeo
      else if (host.includes("vimeo.com")) {
        url.searchParams.set("autoplay", "1");
        url.searchParams.set("muted", "1");
        url.searchParams.set("loop", "1");
        url.searchParams.set("autopause", "0");
        url.searchParams.set("background", "1"); // hides controls, inline style
      }
      // Generic iframe players
      else {
        url.searchParams.set("autoplay", "1");
        url.searchParams.set("muted", "1");
        url.searchParams.set("playsinline", "1");
      }
      return url.toString();
    } catch {
      const joiner = embedUrl.includes("?") ? "&" : "?";
      return `${embedUrl}${joiner}autoplay=1&mute=1&playsinline=1`;
    }
  }, [embedUrl]);

  const isExternal = (href: string) => href.startsWith("http");

  return (
    <section className="az-section" aria-label="Mariachi Beach Club — film promocyjny">
      <div className="az-wrap">
        <div className="az-card rv grid grid-cols-1 min-[900px]:grid-cols-[1.25fr_1fr]">
          {/* Video (dark player box, framed inside the card) */}
          <div className="self-center p-3 sm:p-4 min-[900px]:p-5">
            <div
              className="relative aspect-video overflow-hidden rounded-[22px] max-w-full"
              style={{ background: "var(--sea-deep)", boxShadow: "0 20px 50px rgba(13,35,38,.18)" }}
            >
              {autoplayEmbedUrl ? (
                <DeferredIframe
                  activation="click"
                  poster={poster}
                  buttonLabel="Odtwórz film"
                  src={autoplayEmbedUrl}
                  title={iframeTitle}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
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
                <img src={poster} alt="Mariachi Beach Club — prezentacja" className="absolute inset-0 h-full w-full object-cover" decoding="async" />
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
