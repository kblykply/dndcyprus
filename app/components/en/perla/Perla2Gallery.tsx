// app/components/mariachi/MariachiGalleryExpanding.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, type Variants, type Easing } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE: Easing = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE },
  },
};

type GalleryItem = {
  src: string;   // public/ yolundan görsel
  alt?: string;
  label?: string; // (opsiyonel) alt cam şerit etiketi
};

export default function MariachiGalleryExpanding({
title = "La Joya Perla Gallery",
subtitle = "La Joya Perla Images",

  items,
}: {
  title?: string;
  subtitle?: string;
  items?: GalleryItem[];
}) {
  // 5 görsel için örnek veri — kendi yollarınızla değiştirin
  const data: GalleryItem[] = useMemo(
    () =>
      items ?? [
        { src: "/perla/1.jpg", alt: "Havuz" },
        { src: "/perla/7.jpg", alt: "Plaj" },
        { src: "/perla/3.jpg", alt: "Cabanalar" },
        { src: "/perla/6.jpg", alt: "DJ Gecesi" },
        { src: "/perla/8.jpg", alt: "Kokteyller" }, 

    
      ],
    [items]
  );

  // Hover / Tap aktif panel
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // Kart için büyüme oranı
  const growth = (i: number) => {
    // Tap ile seçilmişse onu esas al
    if (active !== null) return i === active ? 3.2 : 0.8;
    // Hover varsa ona göre
    if (hovered !== null) return i === hovered ? 3.2 : 0.8;
    // Varsayılan
    return 1;
  };

  return (
    <section
      aria-label="Mariachi Beach Club — Galeri"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      {/* Sayfa arka plan dekoru — gradyanlı aura (cam hissi) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(39,149,155,0.22), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(241,92,52,0.16), transparent 70%)",
        }}
      />

      {/* Başlık */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-base sm:text-lg" style={{ color: "#141517CC" }}>
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* ==== FULL-WIDTH (full-bleed) GALERİ ==== */}
      <div
        className="relative w-screen left-1/2 -translate-x-1/2 mt-8"
        // not: bu "full-bleed" hilesi, sayfa container'ından taşarak tam ekran genişlik verir
      >
        <div
          className="group relative mx-auto"
          onMouseLeave={() => setHovered(null)}
          style={{ maxWidth: "100vw" }}
        >
          {/* Track */}
          <div
            className="flex items-stretch"
            style={{
              height: "60svh",
            }}
          >
            {data.map((g, i) => {
              const grow = growth(i);
              return (
                <div
                  key={g.src + i}
                  className="relative basis-0 min-w-0 overflow-hidden"
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => setActive(active === i ? null : i)} // mobil için: dokununca sabitle
                  role="button"
                  aria-label={g.alt || `Galeri görseli ${i + 1}`}
                  style={{
                    flexGrow: grow,
                    transition: "flex-grow .55s cubic-bezier(0.22,1,0.36,1)",
                    cursor: "pointer",
                  }}
                >
                  {/* Görsel */}
                  <img
                    src={g.src}
                    alt={g.alt || ""}
                    className="h-full w-full object-cover select-none"
                    draggable={false}
                    style={{
                      transform: grow > 1 ? "scale(1.06)" : "scale(1.02)",
                      transition: "transform .6s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />

                  {/* Üst cam parıltı */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        grow > 1
                          ? "radial-gradient(60% 50% at 50% 0%, rgba(39,149,155,0.22), transparent 60%)"
                          : "radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
                      transition: "opacity .45s ease",
                    }}
                  />

                  {/* Alt cam şerit (etiket) */}
                  {g.label ? (
                    <div
                      className="absolute left-4 right-4 bottom-4 rounded-2xl px-4 py-2 backdrop-blur-md"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.10))",
                        border: "1px solid rgba(255,255,255,0.26)",
                        color: "#fff",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
                      }}
                    >
                      <div className="text-sm font-medium drop-shadow">{g.label}</div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Küçük ipucu */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
        <p className="mt-5 text-xs" style={{ color: "#14151799" }}>
          *On mobile, you can tap an image to enlarge and pin it, then tap again to return to the default view.

        </p>
      </div>
    </section>
  );
}
