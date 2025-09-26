// app/components/MissionVisionValues.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

type MVVProps = {
  kicker?: string;
  title?: string;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  valuesTitle?: string;
  values?: string[];
};

export default function MissionVisionValues({
  kicker = "DND Cyprus",
  title = "Misyon, Vizyon & Değerler",
  missionTitle = "Misyonumuz",
  missionText = "Estetik mimariyi, mühendislik disiplinini ve sürdürülebilir çözümleri birleştirerek Kuzey Kıbrıs’ta yaşam kalitesini yükselten projeler geliştirmek; şeffaflık, güvenlik ve zamanında teslim prensipleriyle değer üretmek.",
  visionTitle = "Vizyonumuz",
  visionText = "Kuzey Kıbrıs’ta yenilikçi gayrimenkul geliştirme alanında referans marka olmak; kalite, müşteri memnuniyeti ve çevresel duyarlılık konularında sektöre yön vermek.",
  valuesTitle = "Değerlerimiz",
  values = [
    "Dürüstlük & Şeffaflık",
    "Kalite Odaklılık",
    "Güvenlik Kültürü (HSE)",
    "Sürdürülebilirlik",
    "Müşteri Memnuniyeti",
    "Zamanında Teslim",
    "İşbirliği & Güvenilir Tedarik",
  ],
}: MVVProps) {
  return (
    <section
      aria-label="Misyon, Vizyon ve Değerler"
      className="relative overflow-hidden bg-white"
      style={{
        background: "#ffffff",
        color: "#141517",
        // local light tokens
        ["--stroke" as any]: "rgba(20,21,23,0.08)",
        ["--glass" as any]: "rgba(255,255,255,0.65)",
      }}
    >
      {/* subtle color accents */}
        <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(30rem 20rem at 12% 100%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 18rem at 88% 0%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="text-left"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(20,21,23,0.05)",
              border: "1px solid var(--stroke)",
              backdropFilter: "blur(8px)",
              color: TEAL,
            }}
          >
            {kicker}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* Mission */}
          <motion.div variants={scaleIn} className="lg:col-span-4">
            <div
              className="rounded-2xl p-6 sm:p-8 h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.6))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: TEAL }}
                />
                <h3 className="text-xl sm:text-2xl font-semibold">{missionTitle}</h3>
              </div>
              <p className="leading-relaxed" style={{ color: "rgba(20,21,23,0.65)" }}>
                {missionText}
              </p>

              {/* IMAGE SLOT M (opsiyonel küçük görsel) */}
              <div
                className="mt-5 rounded-xl overflow-hidden border"
                style={{ borderColor: "var(--stroke)", background: "#fff" }}
              >
                <img
                  src="/La Joya - 2.png"
                  alt="Misyon görseli"
                  className="w-full h-40 object-cover"
                />
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm" style={{ color: "rgba(20,21,23,0.65)" }}>
                    Misyon
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: `${TEAL}14`,
                      color: TEAL,
                      border: `1px solid ${TEAL}33`,
                    }}
                  >
                    • görsel
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div variants={scaleIn} className="lg:col-span-4">
            <div
              className="rounded-2xl p-6 sm:p-8 h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.6))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: ORANGE }}
                />
                <h3 className="text-xl sm:text-2xl font-semibold">{visionTitle}</h3>
              </div>
              <p className="leading-relaxed" style={{ color: "rgba(20,21,23,0.65)" }}>
                {visionText}
              </p>

              {/* IMAGE SLOT V (opsiyonel küçük görsel) */}
              <div
                className="mt-5 rounded-xl overflow-hidden border"
                style={{ borderColor: "var(--stroke)", background: "#fff" }}
              >
                <img
                  src="/La Joya - 2.png"
                  alt="Vizyon görseli"
                  className="w-full h-40 object-cover"
                />
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm" style={{ color: "rgba(20,21,23,0.65)" }}>
                    Vizyon
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: `${ORANGE}14`,
                      color: ORANGE,
                      border: `1px solid ${ORANGE}33`,
                    }}
                  >
                    • görsel
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div variants={scaleIn} className="lg:col-span-4">
            <div
              className="rounded-2xl p-6 sm:p-8 h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.6))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`,
                  }}
                />
                <h3 className="text-xl sm:text-2xl font-semibold">{valuesTitle}</h3>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {values.map((val, i) => (
                  <li key={val} className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full"
                      style={{ background: i % 2 === 0 ? TEAL : ORANGE }}
                    />
                    <span style={{ color: "rgba(20,21,23,0.75)" }}>{val}</span>
                  </li>
                ))}
              </ul>

              {/* IMAGE SLOT Values (kolaj/logolar opsiyonel) */}
              <div
                className="mt-5 rounded-xl overflow-hidden border"
                style={{ borderColor: "var(--stroke)", background: "#fff" }}
              >
                <img
                  src="/La Joya - 2.png"
                  alt="Değerler görseli"
                  className="w-full h-40 object-cover"
                />
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm" style={{ color: "rgba(20,21,23,0.65)" }}>
                    Değerler
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: `${TEAL}14`,
                      color: TEAL,
                      border: `1px solid ${TEAL}33`,
                    }}
                  >
                    • görsel
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Accent CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
        >
          <p style={{ color: "rgba(20,21,23,0.65)" }}>
            Değerlerimizi projelerinize nasıl taşıdığımızı görmek ister misiniz?
          </p>
          <a
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              color: "#fff",
              boxShadow: `0 10px 28px ${TEAL}40`,
              border: `1px solid ${TEAL}55`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
            }
          >
            Projeleri İncele
          </a>
        </motion.div>
      </div>
    </section>
  );
}
