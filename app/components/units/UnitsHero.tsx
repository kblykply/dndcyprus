// components/units/UnitsHeroSlider.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const TEAL = "#27959b";
const ORANGE = "#f15c34";

// Tweak these if needed
const SCRIM_TOP = 0.20;     // 0..1 dark at top
const SCRIM_BOTTOM = 0.55;  // 0..1 darker at bottom

type UnitHeroItem = {
  slug: string;
  title: string;
  subtitle?: string;
  price?: string;
  cityLabel?: string;
  image?: string;           // /public path
  objectPosition?: string;  // e.g. "center 40%"
};

const UNITS: UnitHeroItem[] = [
  {
    slug: "perla-ii-2-plus-1",
    title: "Perla II — 2+1 Daire",
    subtitle: "Modern yaşam, deniz manzarası ile",
    price: "€240,000",
    cityLabel: "İskele (Mağusa)",
    image: "/IMG_0110.JPG",
    objectPosition: "center",
  },
  {
    slug: "perla-ii-1-plus-1",
    title: "Perla II — 1+1 Daire",
    subtitle: "Yatırım için ideal",
    price: "€180,000",
    cityLabel: "İskele (Mağusa)",
    image: "/units/pexels-fotoaibe-1571460.jpg",
    objectPosition: "center 45%",
  },
  {
    slug: "la-joya-studio",
    title: "La Joya — Stüdyo",
    subtitle: "Girne’nin kalbinde",
    price: "€120,000",
    cityLabel: "Girne",
    image: "/units/pexels-fotoaibe-1643383.jpg",
    objectPosition: "center",
  },
];

export default function UnitsHeroSlider() {
  return (
    <section aria-label="Units — Hero Slider" className="relative w-full h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {UNITS.map((unit) => (
          <SwiperSlide key={unit.slug}>
            <div className="relative w-full h-full">
              {/* Photo */}
              <img
                src={unit.image || "/images/placeholder.jpg"}
                alt={unit.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: unit.objectPosition || "center" }}
                loading="eager"
              />

              {/* Readability scrim (dark, but subtle) */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(
                      to bottom,
                      rgba(0,0,0,${SCRIM_TOP}) 0%,
                      rgba(0,0,0,${SCRIM_BOTTOM}) 70%
                    ),
                    radial-gradient(38rem 26rem at 8% 0%, ${TEAL}22, transparent 70%),
                    radial-gradient(34rem 22rem at 100% 100%, ${ORANGE}18, transparent 70%)
                  `,
                }}
              />

              {/* Content panel (glassy) */}
              <div className="relative h-full">
                <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-end pb-10">
                  <div
                    className="w-full max-w-2xl rounded-2xl p-5 sm:p-6"
                    style={{
                      background: "rgba(15,15,16,0.35)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      boxShadow: "0 16px 36px rgba(0,0,0,0.25)",
                      color: "#fff",
                    }}
                  >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                      {unit.title}
                    </h1>

                    {unit.subtitle && (
                      <p className="mt-2 text-sm sm:text-base opacity-90">{unit.subtitle}</p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2 text-[12px] sm:text-[13px]">
                      {unit.price && pill(unit.price)}
                      {unit.cityLabel && pill(unit.cityLabel)}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={`/units/${unit.slug}`}
                        className="px-5 py-2.5 rounded-full text-sm font-medium"
                        style={{
                          background: TEAL,
                          color: "#fff",
                          boxShadow: `0 8px 20px ${TEAL}55`,
                        }}
                      >
                        Detayları Gör
                      </a>
                      <a
                        href="/contact"
                        className="px-5 py-2.5 rounded-full text-sm font-medium"
                        style={{
                          background: "rgba(255,255,255,0.12)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.24)",
                        }}
                      >
                        İletişime Geç
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination style override for visibility */}
              <style jsx global>{`
                .swiper-pagination-bullet {
                  background: rgba(255, 255, 255, 0.6);
                  opacity: 1;
                }
                .swiper-pagination-bullet-active {
                  background: ${TEAL};
                }
              `}</style>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* small helper */
function pill(text: string) {
  return (
    <span
      className="px-2.5 py-1 rounded-full"
      style={{
        background: "rgba(255,255,255,0.14)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
      }}
    >
      {text}
    </span>
  );
}
