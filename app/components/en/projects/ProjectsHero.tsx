// app/components/ProjectsHeroFullSlider.tsx
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Mousewheel,
  EffectFade,
  Parallax,
  A11y,
  HashNavigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
      "Delivery in 2025 — where elegance and functionality meet on the coastline.",
    badge: "Delivery 2025",
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
}: Props) {
  const slides = useMemo(() => projects?.length ? projects : FALLBACKS, [projects]);

  return (
    <section className="relative w-full h-[100svh]">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          Keyboard,
          Mousewheel,
          EffectFade,
          Parallax,
          A11y,
          HashNavigation,
        ]}
        effect="fade"
        speed={900}
        loop
        hashNavigation={{ watchState: true }}
        autoplay={{ delay: autoplayMs, disableOnInteraction: false }}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true }}
        navigation
        pagination={{ clickable: true }}
        parallax
        className="h-full"
      >
        {slides.map((s, i) => {
          const alignRight = s.align
            ? s.align === "right"
            : i % 2 === 1; // alternate by default
          const tint = s.tint || "#27959b";

          return (
            <SwiperSlide key={s.id} data-hash={String(s.id)}>
              <div className="relative h-[100svh] w-full">
                {/* Background image */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
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
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Minimal global overrides for bullets & arrows */}
  <style jsx global>{`
  @keyframes kenburns {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.06);
    }
  }
  .swiper {
    --swiper-theme-color: #ffffff;
  }

  /* Navigation arrows */
  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    padding: 9px;
    top: auto;    /* disable default top alignment */
    width: 34px;  /* smaller size */
    height: 34px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
  .swiper-button-prev {
    left: 20px; /* stick to bottom-left */
  }
  .swiper-button-next {
    left: 64px; /* a bit right of prev */
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 12px; /* smaller arrow icon */
    font-weight: 700;
  }

  /* Pagination dots */
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    opacity: 0.45;
    background: rgba(255, 255, 255, 0.9);
  }
  .swiper-pagination-bullet-active {
    width: 26px;
    border-radius: 999px;
    opacity: 1;
  }
  .swiper-pagination {
    bottom: 22px !important;
    right: 20px !important; /* keep dots bottom-right */
    left: auto !important;
  }
`}</style>

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
