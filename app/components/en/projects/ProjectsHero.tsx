// app/components/ProjectsHeroFullSlider.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import HeroCarousel from "@/app/components/performance/HeroCarousel";
import heroAsset from "@/lib/home-hero-asset.json";


type ProjectSlide = {
  id: string | number;
  title: string;
  subtitle?: string;
  badge?: string;
  image: string;        // /public/... path or remote (next.config for domains)
  ctaLabel?: string;
  ctaHref?: string;
  // optional per-slide tint color for accents
  tint?: string;        // e.g. "#27959b" or "#f15c34"
  align?: "left" | "right"; // content alignment (auto if omitted)
};

type Props = {
  projects?: ProjectSlide[];
  autoplayMs?: number;
  /** Sayfanın tek H1'i (görsel olarak gizli; slayt başlıkları h2). Boş verilirse basılmaz. */
  heading?: string;
};

const FALLBACKS: ProjectSlide[] = [
  {
    id: "lagoon-verde",
    title: "Lagoon Verde",
    subtitle:
      "Living spaces that bring modern architecture and comfort together under one roof.",
    badge: "Gold Award",
    image: "/lagoon-verde/1.jpg",
    ctaLabel: "Explore the Project",
    ctaHref: "/en/lagoon-verde",
    tint: "#27959b", // teal
    align: "left",
  },
  {
    id: "perla-ii",
    title: "La Joya Perla II",
    subtitle:
      "Just a few steps from the sea, with modern architecture and a high standard of living.",
    badge: "Striking Design",
    image: "/perla-ii/9.jpg",
    ctaLabel: "Explore the Project",
    ctaHref: "/en/perla-ii",
    tint: "#f15c34", // orange
    align: "right",
  },
  {
    id: "perla",
    title: "La Joya Perla",
    subtitle:
      "A refined, timeless design language that respects the natural surroundings.",
    badge: "The Pearl of Cyprus",
    image: "/perla/9.jpg",
    ctaLabel: "Details",
    ctaHref: "/en/perla",
    tint: "#27959b",
    align: "left",
  },
  {
    id: "la-joya",
    title: "La Joya",
    subtitle:
      "Completed in 2025 — boutique coastal living at La Joya.",
    badge: "Completed Project · 2025",
    image: "/la-joya/2.jpg",
    ctaLabel: "Details",
    ctaHref: "/en/la-joya",
    tint: "#f15c34",
    align: "right",
  },
  {
    id: "mariachi-beach-club",
    title: "Mariachi Beach Club",
    subtitle:
      "Offers a unique beach experience that brings socializing and entertainment together.",
    badge: "Platinum Award",
    image: "/mariachi/2.jpg",
    ctaLabel: "Explore the Project",
    ctaHref: "/en/mariachi",
    tint: "#27959b",
    align: "left",
  },
];



export default function ProjectsHeroFullSlider({
  projects,
  autoplayMs = 5200,
  heading = "Residential projects in North Cyprus – DND Cyprus",
}: Props) {
  const slides = useMemo(() => projects?.length ? projects : FALLBACKS, [projects]);

  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const ids = useMemo(() => slides.map(slide => String(slide.id)), [slides]);
  const visit = useCallback((index: number) => setVisited(previous => previous.has(index) ? previous : new Set([...previous, index])), []);

  return (
    <section className="relative w-full h-[100svh] min-h-[36rem]">
      {heading ? <h1 className="sr-only">{heading}</h1> : null}
      <HeroCarousel ids={ids} autoplayMs={autoplayMs} locale="en" onVisit={visit}>
        {slides.map((s, i) => {
          const alignRight = s.align
            ? s.align === "right"
            : i % 2 === 1; // alternate by default
          const tint = s.tint || "#27959b";

          return (
            <div key={s.id} data-hash={String(s.id)} className="h-full">
              <div className="relative h-full w-full">
                {/* Background image */}
                <div className="absolute inset-0 -z-10">
                  {visited.has(i) && <picture>
                    {i === 0 && s.image === heroAsset.original && <source type="image/avif" sizes="100vw" srcSet={heroAsset.avif.map(asset => `${asset.src} ${asset.width}w`).join(", ")} />}
                    <Image quality={65}
                    src={s.image}
                    alt={s.title}
                    draggable={false}
                    fill
                    fetchPriority={i === 0 ? "high" : "auto"}
                    loading="eager"
                    sizes="100vw"
                    className="object-cover"
                  /></picture>}
                  {/* Ken Burns subtle zoom */}
                  <div className="absolute inset-0 scale-105 animate-[kenburns_12s_ease-in-out_infinite_alternate]" />
                  {/* Vignette + gradient for legibility */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 110% at 80% 10%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
                    }}
                    data-swiper-parallax-opacity="0.9"
                  />
                  <div
                    className={`absolute inset-y-0 ${
                      alignRight ? "left-0" : "right-0"
                    } w-1/2 max-md:hidden`}
                    style={{
                      background: `linear-gradient(${
                        alignRight ? "90deg" : "270deg"
                      }, rgba(0,0,0,0) 0%, ${hexToRgba(tint, 0.22)} 100%)`,
                    }}
                    data-swiper-parallax="-150"
                  />
                </div>

                {/* Content */}
                <div
                  className={[
                    "relative h-full w-full",
                    "px-6 md:px-10 lg:px-16",
                    "flex",
                    alignRight ? "justify-end" : "justify-start",
                    "items-end",
                    "pb-14 md:pb-20",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "max-w-[720px] w-full",
                      alignRight ? "md:text-right" : "md:text-left",
                    ].join(" ")}
                    data-swiper-parallax="-200"
                  >
                    {/* Glass card */}
                    <div
                      className={[
                        "rounded-3xl border border-white/20",
                        "bg-white/10 backdrop-blur-xl",
                        "shadow-[0_20px_80px_rgba(0,0,0,.35)]",
                        alignRight ? "ml-auto" : "mr-auto",
                        "p-6 md:p-8",
                      ].join(" ")}
                    >
                      {s.badge && (
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide"
                          style={{
                            background: hexToRgba(tint, 0.18),
                            color: "#fff",
                            border: `1px solid ${hexToRgba("#ffffff", 0.25)}`,
                          }}
                        >
                          {s.badge}
                        </span>
                      )}
                      <h2 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white">
                        {s.title}
                      </h2>
                      {s.subtitle && (
                        <p className="mt-4 text-white/85 text-base md:text-lg leading-relaxed">
                          {s.subtitle}
                        </p>
                      )}

           <div
  className={`mt-6 flex gap-3 md:gap-4 ${
    alignRight ? "justify-end" : "justify-start"
  }`}
>
  {s.ctaHref && s.ctaLabel && (
    <a
      href={s.ctaHref}
      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm md:text-base font-semibold text-white"
      style={{
        background: `linear-gradient(180deg, ${hexToRgba(
          tint,
          0.95
        )} 0%, ${darken(tint, 0.12)} 100%)`,
        boxShadow: `0 10px 30px ${hexToRgba(tint, 0.5)}`,
      }}
    >
      {s.ctaLabel}
    </a>
  )}
  <a
    href="#projects-list"
    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm md:text-base font-semibold bg-white/10 text-white border border-white/25 backdrop-blur"
  >
    All Projects
  </a>
</div>


                    </div>

                    {/* Soft accent line */}
                    <div
                      className="mt-6 h-1 w-28 rounded-full"
                      style={{ background: hexToRgba(tint, 0.7) }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </HeroCarousel>



    </section>
  );
}

/* ---------- tiny color helpers ---------- */
function hexToRgba(hex: string, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function darken(hex: string, amt = 0.1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = Math.max(0, Math.min(255, ((bigint >> 16) & 255) * (1 - amt)));
  const g = Math.max(0, Math.min(255, ((bigint >> 8) & 255) * (1 - amt)));
  const b = Math.max(0, Math.min(255, (bigint & 255) * (1 - amt)));
  return `rgb(${r}, ${g}, ${b})`;
}
