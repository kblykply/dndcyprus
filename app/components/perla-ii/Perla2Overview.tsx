// app/components/projects/Perla2Overview.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

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

type Props = {
  title?: string;
  lead?: string;
  highlights?: string[];
  imagePrimary?: string;   // main visual (render/photo)
  imageSecondary?: string; // optional extra visual
};

export default function Perla2Overview({
  title = "Genel Bakış",
  lead = "La Joya Perla II; mimarisi, planlaması ve sosyal olanakları ile Bahçeler, İskele’de modern yaşamı yeniden tanımlayan bir konut projesidir. Denize ve şehir imkanlarına yakın konumu, yatırım ve oturum için dengeli bir seçenek sunar.",
  highlights = [
    "Uzun sahil şeridine, market ve restoranlara kolay erişim",
    "Verimli planlar ve doğal ışığı öne çıkaran cephe tasarımı",
    "Yüzme havuzu, fitness, yeşil alanlar ve otopark",
    "Zamanında teslim ve şeffaf iletişim yaklaşımı",
  ],
  imagePrimary = "/Perla II - 1.png",
  imageSecondary = "/Perla II - 1.png",
}: Props) {
  return (
    <section
      aria-label="La Joya Perla II — Genel Bakış"
      className="relative overflow-hidden"
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
                  <span className="text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.78)" }}>
                    {h}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Micro chips (optional, edit freely) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              custom={highlights.length + 3}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                { label: "Aile Dostu", color: TEAL },
                { label: "Yatırıma Uygun", color: ORANGE },
                { label: "Sahil Yaşamı", color: TEAL },
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
              <div className="aspect-[16/10] bg-white">
                <img
                  src={imagePrimary}
                  alt="Proje genel görünüm"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {imageSecondary ? (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                custom={1}
                className="mt-4 rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                  border: "1px solid var(--stroke)",
                  boxShadow:
                    "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
          
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
