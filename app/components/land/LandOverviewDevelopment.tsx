// app/components/land/LandOverviewDevelopment.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type Bullet = {
  text: string;
  accent?: "teal" | "orange";
  /** Optional small visual for the card */
  image?: string;
  /** Accessible alt; keep short */
  alt?: string;
};

type SectionData = {
  heading: string;
  lead: string;
  tone: "light" | "dark";
  /** Subtle page background image (blurred) */
  backgroundImage?: string;
  /** Main hero visual on the RIGHT column */
  mainImage?: string;
  mainImageAlt?: string;
  bullets: Bullet[];
  scenarioNote?: string;
  disclaimer?: string;
};

// ====== DATA ======
const DATA: SectionData = {
  heading: "Genel Bakış & Gelişim Potansiyeli",
  lead:
    "Geçitkale Etap II; Fasıl 96 kapsamında, tek katlı/ikiz villa ve çok katlı apartman tipolojilerine uygun planlanan, yeni konut bölgeleriyle çevrili gelişen bir lokasyondadır.",
  tone: "dark",
  backgroundImage: "/gecitkaleimage.jpg", // ensure this exists under /public/land/
  mainImage: "/gecitkaleimage.jpg", // RIGHT hero image (text overlayed)
  mainImageAlt: "Geçitkale Etap II genel görünüm",
  bullets: [
    {
      text: "Zonlama: Fasıl 96 — izinli tipolojiler: tek katlı villa, ikiz villa, çok katlı apartman.",
      accent: "teal",
      image: "/lagoon-verde/1.jpg",
      alt: "Zonlama şeması",
    },
    {
      text: "Ortalama bir arsa için inşaat izni: ~5 kata kadar (bilgi amaçlı).",
      accent: "orange",
      image: "/lagoon-verde/2.jpg",
      alt: "Kat yüksekliği simgesi",
    },
    {
      text: "Konum avantajı: Long Beach 12 dk, Gazimağusa 18 dk, Ercan Havalimanı 25 dk.",
      accent: "teal",
      image: "/ercan.jpg",
      alt: "Harita konum simgesi",
    },
    {
      text: "Bölgede altyapı çalışmaları devam ediyor; parselasyon ve tapu süreçleri hazır.",
      accent: "orange",
      image: "/elec.jpg",
      alt: "Altyapı görseli",
    },
  ],
  scenarioNote:
    "Etap I referansı: ortalama parselde 5–6 katlı, 15 daireli apartman senaryosu mümkündür (örnek, kurumsal onaya tabidir).",
  disclaimer:
    "*Bilgiler tanıtım amaçlıdır; nihai uygulama parsel özelinde yetkili kurumların onayına tabidir.",
};

export default function LandOverviewDevelopment() {
  const {
    heading,
    lead,
    tone,
    backgroundImage,
    mainImage,
    mainImageAlt,
    bullets,
    scenarioNote,
    disclaimer,
  } = DATA;

  const isLight = tone === "light";
  const hasBg = Boolean(backgroundImage);

  return (
    <section
      aria-label="Land Project — Overview & Development"
      className="relative overflow-hidden"
      style={{
        background: hasBg ? "transparent" : isLight ? "#ffffff" : "#0b0c0d",
        color: isLight ? "#141517" : "#ffffff",
      }}
      data-bg={isLight ? "light" : "dark"}
    >
      {/* ===== Background image (z-0) + brand wash (z-10) ===== */}
      {hasBg && (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImage}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
              style={{
                filter: "blur(10px) saturate(115%) brightness(0.9)",
                transform: "scale(1.06)",
              }}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `
                radial-gradient(60rem 30rem at 10% 0%, ${TEAL}22, transparent 70%),
                radial-gradient(60rem 30rem at 90% 100%, ${ORANGE}22, transparent 70%),
                linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.42))
              `,
            }}
          />
        </>
      )}

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Heading / Lead */}
        <div className="mb-8 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="text-2xl sm:text-3xl font-semibold"
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="mt-2 mx-auto max-w-3xl text-sm sm:text-base"
            style={{
              color: isLight ? "rgba(20,21,23,0.70)" : "rgba(255,255,255,0.88)",
            }}
          >
            {lead}
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Highlights with CARD IMAGES */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-7 rounded-3xl border p-5 sm:p-6 lg:self-center"
            style={{
              background: isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.08)",
              borderColor: isLight ? "rgba(20,21,23,0.10)" : "rgba(255,255,255,0.22)",
              boxShadow: isLight ? "0 12px 36px rgba(0,0,0,.12)" : "0 12px 36px rgba(0,0,0,.35)",
              backdropFilter: "blur(12px) saturate(140%)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {bullets.map((b, i) => {
                const accent = b.accent === "teal" ? TEAL : b.accent === "orange" ? ORANGE : undefined;
                return (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-2xl border group"
                    style={{
                      borderColor: accent ? `${accent}66` : isLight ? "rgba(20,21,23,0.12)" : "rgba(255,255,255,0.25)",
                      boxShadow: accent ? `0 10px 24px ${accent}22` : undefined,
                    }}
                  >
                    <div className="relative aspect-[16/10]">
                      {b.image ? (
                        <img
                          src={b.image}
                          alt={b.alt ?? ""}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          aria-hidden
                          style={{
                            background: accent
                              ? `linear-gradient(135deg, ${accent}66, ${accent}22)`
                              : isLight
                              ? "linear-gradient(135deg, rgba(20,21,23,0.12), rgba(20,21,23,0.06))"
                              : "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
                          }}
                        />
                      )}

                      {/* readability overlay */}
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.65) 100%)",
                        }}
                      />

                      {/* top-left chip */}
                      <div className="absolute left-3 top-3">
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                          style={{
                            background: accent ? `${accent}33` : "rgba(0,0,0,0.25)",
                            color: "#fff",
                            boxShadow: accent ? `0 4px 12px ${accent}44` : undefined,
                          }}
                        >
                          {b.accent === "teal" ? "Fasıl 96" : "Bilgi"}
                        </span>
                      </div>

                      {/* bottom text */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.95)" }}>
                          {b.text}
                        </p>
                      </div>

                      {/* hover glow */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: accent
                            ? `radial-gradient(28rem 14rem at 85% 90%, ${accent}22, transparent 70%)`
                            : `radial-gradient(28rem 14rem at 85% 90%, ${ORANGE}22, transparent 70%)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: MAIN IMAGE WITH TEXT OVERLAY */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-5 rounded-3xl border overflow-hidden relative group"
            style={{
              borderColor: isLight ? "rgba(20,21,23,0.10)" : "rgba(255,255,255,0.22)",
              boxShadow: isLight ? "0 12px 36px rgba(0,0,0,.12)" : "0 12px 36px rgba(0,0,0,.35)",
            }}
          >
            {/* Main visual */}
            <div className="relative aspect-[4/3] lg:aspect-[5/6]">
              <img
                src={mainImage ?? backgroundImage ?? ""}
                alt={mainImageAlt ?? "Proje görseli"}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay gradient for readability */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.60) 85%)",
                }}
              />

              {/* Floating chips / decorations */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ background: `${TEAL}1a`, color: "white", boxShadow: `0 4px 18px ${TEAL}33` }}
                >
                  Örnek Gelişim Senaryosu
                </span>
              </div>

              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Örnek Gelişim Senaryosu</h3>
                {scenarioNote && (
                  <p className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.92)" }}>
                    {scenarioNote}
                  </p>
                )}
                {disclaimer && (
                  <p className="mt-3 text-[11px] sm:text-xs" style={{ color: "rgba(255,255,255,0.80)" }}>
                    {disclaimer}
                  </p>
                )}
              </div>

              {/* Hover polish */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(40rem 20rem at 80% 90%, ${ORANGE}22, transparent 70%)`,
                }}
              />
            </div>
          </motion.aside>
        </div>

        {/* Under-glow line */}
        <div className="relative z-20 mt-10">
          <div
            aria-hidden
            className="mx-auto h-[2px] w-[92%]"
            style={{
              background: isLight
                ? "linear-gradient(90deg, transparent, rgba(20,21,23,0.18), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
