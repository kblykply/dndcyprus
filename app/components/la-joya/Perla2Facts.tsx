// app/components/projects/Perla2Facts.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Fact = { label: string; value: string; accent?: "teal" | "orange" };

type Props = {
  title?: string;
  subtitle?: string;
  facts?: Fact[];
  /** optional: organization/product JSON-LD toggle */
  withSeoJsonLd?: boolean;
};

export default function Perla2Facts({
title = "La Joya Öne Çıkan Bilgiler",
subtitle = "Projenin temel özelliklerine hızlıca göz atın.",
facts = [
  { label: "Lokasyon", value: "Long Beach, İskele", accent: "teal" },
  { label: "Teslim", value: "Kasım 2025", accent: "orange" },
  { label: "Tip", value: "Rezidans & Beach Club", accent: "teal" },
  { label: "Birim Sayısı", value: "74", accent: "orange" },
  { label: "Arsa Alanı", value: "6.360 m²", accent: "teal" },
  { label: "Durum", value: "Devam Ediyor", accent: "orange" },
]
,

  withSeoJsonLd = true,
}: Props) {
  return (
    <section
      aria-label="La Joya Perla II — Öne Çıkan Bilgiler"
      className="relative overflow-hidden"
style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}
    >
      {/* subtle brand wash */}
 

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        {/* header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          custom={0}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* facts grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facts.map((f, i) => {
            const color = f.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.div
                key={f.label + i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                custom={i + 1}
                className="rounded-2xl p-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                  border: "1px solid var(--stroke)",
                  boxShadow:
                    "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full"
                  style={{
                    background: `${color}14`,
                    color,
                    border: `1px solid ${color}33`,
                  }}
                >
                  {f.label}
                </div>
                <div className="mt-2 text-base sm:text-lg font-semibold">
                  {f.value}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* note / disclaimer (optional) */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          custom={facts.length + 2}
          className="mt-6 text-xs"
          style={{ color: "rgba(20,21,23,0.55)" }}
        >
          * Bilgiler tanıtım amaçlıdır. Nihai teknik ve satış detayları için satış ekibimizle iletişime geçiniz.
        </motion.p>
      </div>

      {/* lightweight SEO JSON-LD */}
      {withSeoJsonLd && (
        <script
          type="application/ld+json"
          // keep it simple; update values as gerçek rakamlar netleştiğinde
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ApartmentComplex",
              name: "La Joya Perla II",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bahçeler",
                addressRegion: "İskele",
                addressCountry: "CY",
              },
              url: "https://www.yoursite.com/projects/la-joya-perla-ii",
              openingDate: "2027-05-01",
              slogan: "Modern yaşam ve yatırım fırsatı",
              numberOfRooms: "Varies",
            }),
          }}
        />
      )}
    </section>
  );
}
