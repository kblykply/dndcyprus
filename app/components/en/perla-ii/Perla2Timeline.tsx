// app/components/projects/Perla2LastUpdate.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/** Allow CSS variables like --stroke on style objects */
type CSSVars = React.CSSProperties & { ["--stroke"]?: string };

/* ------------------------------------------------------------------
   Perla2LastUpdate – Only the latest construction update (video + text)
   ------------------------------------------------------------------ */

type Video = {
  src: string;
  type?: "youtube" | "vimeo" | "mp4";
  title?: string;
  poster?: string;
};

type Props = {
  eyebrow?: string; // ör: "Ekim 2025 Güncellemesi"
  title?: string; // ör: "Son İnşaat Güncellemesi"
  description?: string; // kısa açıklama paragrafı
  video: Video; // zorunlu
  cta?: { label: string; href: string };
  comingSoon?: boolean; // Tüm bölümü blur + overlay mesaj
  placeholderText?: string; // Overlay metni
};

export default function Perla2LastUpdate({
  eyebrow = "Kasım 2024 Güncellemesi",
  title = "La Joya Perla Son İnşaat Güncellemesi",
  description = "Kasım 2026'da Teslim edilecek La Joya Perla Projesinde inşaat hızla ilerliyor. ",
  video = {
    src: "https://www.youtube.com/embed/YSy7WB056Fg?si=-HLY_3T_kk2bIt_j",
    type: "youtube",
    title: "La Joya Perla II – İnşaat Güncellemesi",
  },
  cta,
  comingSoon = true,
  placeholderText = "Construction updates will be shared very soon.",
}: Props) {
  const sectionStyle: CSSVars = {
    background: "#ffffff",
    color: "#141517",
    "--stroke": "rgba(20,21,23,0.08)",
  };

  const varStroke = "var(--stroke)";

  return (
    <section
      aria-label="La Joya Perla II — Son İnşaat Güncellemesi"
      className="relative overflow-hidden"
      style={sectionStyle}
    >
      {/* Subtle brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            `radial-gradient(800px 400px at 10% 0%, ${TEAL}07 0%, transparent 55%),` +
            `radial-gradient(800px 400px at 100% 100%, ${ORANGE}10 0%, transparent 55%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Content wrapper is blurred when comingSoon */}
        <div
          className={
            comingSoon
              ? "blur-[6px] pointer-events-none select-none transition"
              : "transition"
          }
          aria-hidden={comingSoon ? true : undefined}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: varStroke, backdropFilter: "blur(10px)" }}
            >
              <div className="aspect-[16/9] bg-black">
                {video.type === "mp4" ? (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster={video.poster}
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                ) : (
                  <iframe
                    src={video.src}
                    title={video.title || "Son İnşaat Güncellemesi"}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              {eyebrow && (
                <span
                  className="inline-block text-[11px] px-2 py-0.5 rounded-full tracking-wide"
                  style={{ background: `${TEAL}14`, color: TEAL }}
                >
                  {eyebrow}
                </span>
              )}
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{title}</h2>
              {description && (
                <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.75)" }}>
                  {description}
                </p>
              )}

              <ul className="mt-4 space-y-2 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} />
                  Kayıt, şantiye sorumlusunun haftalık saha turundan alınmıştır.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />
                  Tarihler tanıtım amaçlıdır; resmi teslim programı satış ekibinden teyit edilmelidir.
                </li>
              </ul>

              {cta && (
                <div className="mt-6">
                  <Link
                    href={cta.href}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border"
                    style={{
                      borderColor: varStroke,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                    }}
                    aria-disabled={comingSoon}
                    tabIndex={comingSoon ? -1 : 0}
                  >
                    {cta.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Overlay (not blurred) */}
        {comingSoon && (
          <div
            className="absolute inset-0 grid place-items-center px-6"
            role="status"
            aria-live="polite"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center rounded-2xl border shadow-xl px-6 py-5 sm:px-8 sm:py-6"
              style={{
                borderColor: varStroke,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.74))",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="text-lg sm:text-2xl font-semibold leading-snug">
                {placeholderText}
              </h3>
              <p className="mt-1 text-xs sm:text-sm" style={{ color: "rgba(20,21,23,0.7)" }}>
The update is being prepared.              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
