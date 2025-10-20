// app/components/land/GecitkaleOverview.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export type Props = {
  title?: string;
  lead?: string;
  highlights?: string[];
  imagePrimary?: string;    // fallback image if no video
  embedUrl?: string | null; // YouTube watch or embed URL; null => use image
};

export default function GecitkaleOverview({
  title = "Genel Bakış",
  lead = "Geçitkale Etap II; Fasıl 96 kapsamında, tek katlı/ikiz villa ve çok katlı apartman tipolojilerine uygun olarak planlanan; yeni konut bölgeleriyle çevrili, gelişim potansiyeli yüksek bir lokasyonda yer alır.",
  highlights = [
    "Zonlama: Fasıl 96 — izinli tipolojiler: tek katlı villa, ikiz villa, çok katlı apartman",
    "Ortalama bir arsa için inşaat izni (bilgi amaçlı): ~5 kata kadar",
    "Sürüş süreleri: Long Beach 12 dk • Gazimağusa 18 dk • Ercan Havalimanı 25 dk",
    "Altyapı çalışmaları devam ediyor; parselasyon ve tapu süreçleri hazır",
  ],
  imagePrimary = "/land/gecitkale-overview.jpg",
  embedUrl =    "https://www.youtube.com/watch?v=fpGuMq5qIEk"   ,
}: Props) {
  // Normalize YouTube URL to privacy-enhanced embed with autoplay/mute/loop
  const YT_ID =
    /(?:v=|\.be\/)([A-Za-z0-9_-]{6,})/.exec(embedUrl ?? "")?.[1] ?? null;
  const finalEmbed = YT_ID
    ? `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&modestbranding=1&playlist=${YT_ID}`
    : null;

  return (
    <section
      aria-label="Geçitkale — Genel Bakış"
      className="relative overflow-hidden pb-12 lg:pb-16"
      style={{
        background: "#fff",
        color: "#141517",
        ["--stroke"]: "rgba(20,21,23,0.08)",
      } as React.CSSProperties & Record<"--stroke", string>}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Text column */}
          <div className="lg:col-span-6">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              className="text-2xl sm:text-3xl font-semibold"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              custom={1}
              className="mt-3 text-base sm:text-lg leading-relaxed"
              style={{ color: "rgba(20,21,23,0.75)" }}
            >
              {lead}
            </motion.p>

            {/* Highlights */}
            <div className="mt-6 space-y-2">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.35 }}
                  custom={2 + i}
                  className="flex items-start gap-2"
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: i % 2 === 0 ? TEAL : ORANGE }}
                  />
                  <span
                    className="text-sm sm:text-base"
                    style={{ color: "rgba(20,21,23,0.78)" }}
                  >
                    {h}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Micro chips */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              custom={highlights.length + 3}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                { label: "Yatırıma Uygun", color: ORANGE },
                { label: "Konut Odaklı", color: TEAL },
                { label: "Erişilebilir Konum", color: TEAL },
              ].map((b) => (
                <span
                  key={b.label}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: `${b.color}14`,
                    color: b.color,
                    border: `1px solid ${b.color}33`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {b.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Media column */}
          <div className="lg:col-span-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                border: "1px solid var(--stroke)",
                boxShadow:
                  "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="aspect-video bg-black">
                {finalEmbed ? (
                  <iframe
                    title="Geçitkale tanıtım videosu"
                    src={finalEmbed}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={imagePrimary}
                    alt="Geçitkale arsa genel görünüm"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* subtle underglow line with spacing below */}
      <div className="relative z-10 mt-10 mb-12">
        <div
          aria-hidden
          className="mx-auto h-[2px] w-[92%] max-w-7xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(20,21,23,0.14), transparent)",
          }}
        />
      </div>
    </section>
  );
}
