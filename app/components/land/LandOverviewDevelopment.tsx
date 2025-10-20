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

type Bullet = { text: string; accent?: "teal" | "orange" };

type SectionData = {
  heading: string;
  lead: string;
  tone: "light" | "dark";
  backgroundImage?: string;
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
  bullets: [
    { text: "Zonlama: Fasıl 96 — izinli tipolojiler: tek katlı villa, ikiz villa, çok katlı apartman.", accent: "teal" },
    { text: "Ortalama bir arsa için inşaat izni: ~5 kata kadar (bilgi amaçlı).", accent: "orange" },
    { text: "Konum avantajı: Long Beach 12 dk, Gazimağusa 18 dk, Ercan Havalimanı 25 dk.", accent: "teal" },
    { text: "Bölgede altyapı çalışmaları devam ediyor; parselasyon ve tapu süreçleri hazır.", accent: "orange" },
  ],
  scenarioNote:
    "Etap I referansı: ortalama parselde 5–6 katlı, 15 daireli apartman senaryosu mümkündür (örnek, kurumsal onaya tabidir).",
  disclaimer:
    "*Bilgiler tanıtım amaçlıdır; nihai uygulama parsel özelinde yetkili kurumların onayına tabidir.",
};

export default function LandOverviewDevelopment() {
  const { heading, lead, tone, backgroundImage, bullets, scenarioNote, disclaimer } = DATA;
  const isLight = tone === "light";
  const hasBg = Boolean(backgroundImage);

  return (
    <section
      aria-label="Land Project — Overview & Development"
      className="relative overflow-hidden"
      style={{
        // transparent if bg image is present so it doesn't cover the image
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
                // keep subtle; avoid over-darkening
                filter: "blur(10px) saturate(115%) brightness(0.9)",
                transform: "scale(1.06)", // hide blur edges
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
          {/* Left: Highlights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-7 rounded-3xl border p-5 sm:p-6"
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
                    className="rounded-2xl p-4 border"
                    style={{
                      background: isLight ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.25)",
                      borderColor: accent ? `${accent}66` : isLight ? "rgba(20,21,23,0.12)" : "rgba(255,255,255,0.25)",
                      boxShadow: accent ? `0 10px 24px ${accent}22` : undefined,
                      backdropFilter: "blur(10px) saturate(140%)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="h-0.5 mb-2 rounded-full"
                      style={{ background: accent ?? (isLight ? "rgba(20,21,23,0.15)" : "rgba(255,255,255,0.25)") }}
                    />
                    <p
                      className="text-sm sm:text-base"
                      style={{ color: isLight ? "rgba(20,21,23,0.88)" : "rgba(255,255,255,0.92)" }}
                    >
                      {b.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Scenario */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-5 rounded-3xl border p-5 sm:p-6"
            style={{
              background: isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.08)",
              borderColor: isLight ? "rgba(20,21,23,0.10)" : "rgba(255,255,255,0.22)",
              boxShadow: isLight ? "0 12px 36px rgba(0,0,0,.12)" : "0 12px 36px rgba(0,0,0,.35)",
              backdropFilter: "blur(12px) saturate(140%)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full" style={{ background: TEAL, boxShadow: `0 0 0 6px ${TEAL}22` }} aria-hidden />
              <h3 className="text-base sm:text-lg font-semibold">Örnek Gelişim Senaryosu</h3>
            </div>

            <p className="text-sm sm:text-base" style={{ color: isLight ? "rgba(20,21,23,0.85)" : "rgba(255,255,255,0.90)" }}>
              {scenarioNote}
            </p>

            {disclaimer ? (
              <p className="mt-4 text-xs" style={{ color: isLight ? "rgba(20,21,23,0.70)" : "rgba(255,255,255,0.78)" }}>
                {disclaimer}
              </p>
            ) : null}
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
