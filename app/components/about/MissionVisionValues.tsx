// app/components/MissionVisionValues.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/* ---------- Animation only for headings/CTA (boxes are static) ---------- */

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- Types ---------- */

type MVVProps = {
  kicker?: string;
  title?: string;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  valuesTitle?: string;
  values?: string[];
  /** Full-bleed background image for the section */
  bgSrc?: string;
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
  bgSrc = "/perla-ii-in/2.jpg",
}: MVVProps) {
  return (
    <section
      aria-label="Misyon, Vizyon ve Değerler"
      className="relative overflow-hidden"
      style={
        {
          ["--glass"]: "rgba(255,255,255,0.16)",
          ["--glass-strong"]: "rgba(255,255,255,0.24)",
          ["--stroke"]: "rgba(255,255,255,0.22)",
          ["--ink"]: "rgba(255,255,255,0.92)",
        } as React.CSSProperties & Record<"--glass" | "--glass-strong" | "--stroke" | "--ink", string>
      }
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Vignette + readability gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Subtle color accents */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-screen opacity-60"
          style={{
            background: `
              radial-gradient(42rem 26rem at 12% 92%, ${TEAL}44, transparent 65%),
              radial-gradient(38rem 24rem at 88% 8%, ${ORANGE}33, transparent 65%)
            `,
          }}
        />
        {/* Soft noise for depth */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,\
              <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>\
                <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/></filter>\
                <rect width='120' height='120' filter='url(%23n)' opacity='0.05'/>\
              </svg>\")",
            backgroundSize: "240px 240px",
            mixBlendMode: "soft-light",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header (can animate) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="text-left"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--stroke)",
              color: "#ffffff",
              willChange: "transform, opacity",
            }}
          >
            {kicker}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
            style={{ color: "var(--ink)", willChange: "transform, opacity" }}
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-2 max-w-3xl text-base sm:text-lg"
            style={{ color: "rgba(255,255,255,0.78)", willChange: "transform, opacity" }}
          >
            Değer odaklı yaklaşımımızı şeffaf, ölçülebilir ve sürdürülebilir ilkelerle destekliyoruz.
          </motion.p>
        </motion.div>

        {/* Cards (NO animations here) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Mission */}
          <div className="lg:col-span-4">
            <GlassCard>
              <CardHeader dotColor={TEAL} title={missionTitle} />
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.82)" }}>
                {missionText}
              </p>
            </GlassCard>
          </div>

          {/* Vision */}
          <div className="lg:col-span-4">
            <GlassCard>
              <CardHeader dotColor={ORANGE} title={visionTitle} />
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.82)" }}>
                {visionText}
              </p>
            </GlassCard>
          </div>

          {/* Values */}
          <div className="lg:col-span-4">
            <GlassCard>
              <CardHeader dotGradient title={valuesTitle} />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {values.map((val, i) => (
                  <li key={val} className="flex items-start gap-2">
                    <span
                      className="mt-[10px] h-1.5 w-1.5 rounded-full"
                      style={{ background: i % 2 === 0 ? TEAL : ORANGE }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.86)" }}>{val}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* CTA (optional small animation is fine; remove motion if you want zero animations globally) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.78)" }}>
            Değerlerimizi projelerinize nasıl taşıdığımızı görmek ister misiniz?
          </p>

          <a
            href="/projects"
            className="group inline-flex items-center justify-center rounded-xl px-5 py-3 border backdrop-blur-md transition-transform"
            style={{
              background: `linear-gradient(180deg, ${TEAL}cc, ${TEAL}e6)`,
              borderColor: "rgba(255,255,255,0.28)",
              color: "#fff",
              boxShadow: `0 12px 30px ${TEAL}50, inset 0 1px 0 rgba(255,255,255,0.35)`,
            }}
          >
            <span className="mr-2">Projeleri İncele</span>
            <svg
              className="size-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Small composed pieces ---------- */

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-2xl p-6 sm:p-7 h-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))",
        border: "1px solid var(--stroke)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.28)",
        backdropFilter: "blur(14px)",          // static glassmorphism
        WebkitBackdropFilter: "blur(14px)",    // Safari support
        willChange: "auto",                    // no animation hints for boxes
      }}
    >
      {/* Glow edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[1rem]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
          mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
          borderRadius: 16,
        }}
      />
      {children}
    </div>
  );
}

function CardHeader({
  title,
  dotColor,
  dotGradient,
}: {
  title: string;
  dotColor?: string;
  dotGradient?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{
          background: dotGradient
            ? `linear-gradient(90deg, ${TEAL}, ${ORANGE})`
            : dotColor || TEAL,
        }}
      />
      <h3 className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--ink)" }}>
        {title}
      </h3>
    </div>
  );
}
