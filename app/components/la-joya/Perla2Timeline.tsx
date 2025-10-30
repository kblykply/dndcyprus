// app/components/projects/Perla2LastUpdate.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

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
};

export default function Perla2LastUpdate({
  eyebrow = "Kasım 2024 Güncellemesi",
  title = "La Joya Son İnşaat Güncellemesi",
  description =
    "Yakında Teslim edilecek La Joya Projesinde inşaat hızla ilerliyor. ",
  video = {
    src: "https://www.youtube.com/embed/VDcbFkpEQhQ?si=pZzQhqiXy4Xp4pSd",
    type: "youtube",
    title: "La Joya Perla II – İnşaat Güncellemesi",
  },
  cta,
}: Props) {
  return (
    <section
      aria-label="La Joya Perla II — Son İnşaat Güncellemesi"
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke" as any]: "rgba(20,21,23,0.08)",
      }}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "var(--stroke)" as any, backdropFilter: "blur(10px)" }}
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
                    borderColor: "var(--stroke)" as any,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                  }}
                >
                  {cta.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
    </section>
  );
}

/* ------------------------------
   Usage (example)
   ------------------------------

<Perla2LastUpdate
  eyebrow="Ekim 2025 Güncellemesi"
  title="La Joya Perla II – Son İnşaat Güncellemesi"
  description="Kaba inşaat %55 seviyesinde. Mekanik/elektrik altyapı geçişleri planlandığı gibi ilerliyor. Sahil yaya aksı peyzajı için örnek uygulamalar test ediliyor."
  video={{
    src: "https://www.youtube.com/embed/YSy7WB056Fg?si=Fx0EFJ50fgHkwstW",
    type: "youtube",
    title: "La Joya Perla II — Update",
  }}
  cta={{ label: "Tüm güncellemeleri gör →", href: "/projects/perla2#updates" }}
/>

*/
