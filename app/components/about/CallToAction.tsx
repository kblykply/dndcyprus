// app/components/CallToAction.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;

  /** Background image props */
  bgSrc?: string;            // e.g. "/hero/perla2-living.jpg"
  bgAlt?: string;            // e.g. "Perla II interior"
  /** Optional: darken/brighten the image (0 = none, 1 = very strong) */
  vignetteStrength?: number; // default 0.45
  /** Optional overlay tint (brand glow stays); set to 0 to remove */
  tintOpacity?: number;      // default 0.18
};

export default function CallToAction({
  kicker = "DND Cyprus",
  title = "Birlikte Geleceği İnşa Edelim",
  subtitle = "Projeleriniz için güvenilir ve yenilikçi bir çözüm ortağı arıyorsanız, bizimle iletişime geçin.",
  buttonLabel = "İletişime Geçin",
  buttonHref = "/contact",
  bgSrc = "/lagoon-verde/1.jpg",
  bgAlt = "Arka plan",
  vignetteStrength = 0.45,
  tintOpacity = 0.18,
}: Props) {
  return (
    <section
      aria-label="Call to Action"
      className="relative overflow-hidden"
      style={
        {
          ["--stroke" as string]: "rgba(255,255,255,0.20)",
        } as React.CSSProperties
      }
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full">
          <Image
            src={bgSrc}
            alt={bgAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Brand radial glow + subtle tint */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(38rem 26rem at 12% 100%, ${TEAL}26, transparent 70%),
            radial-gradient(32rem 22rem at 88% 0%, ${ORANGE}26, transparent 70%),
            linear-gradient(0deg, rgba(0,0,0,${tintOpacity}), rgba(0,0,0,${tintOpacity}))
          `,
        }}
      />

      {/* Vignette/scrim for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(120% 100% at 50% 50%, transparent 0%, rgba(0,0,0,${vignetteStrength}) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        {/* kicker */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
        >
          <span
            className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(10, 10, 10, 0.35)",
              border: "1px solid var(--stroke)",
              color: "#E9FAFF",
              backdropFilter: "blur(8px)",
            }}
          >
            {kicker}
          </span>
        </motion.div>

        {/* title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-4 text-white text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
        >
          {title}
        </motion.h2>

        {/* subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-4 text-base sm:text-lg max-w-2xl mx-auto text-white/80"
        >
          {subtitle}
        </motion.p>

        {/* button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-8"
        >
          <motion.a
            href={buttonHref}
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium border"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              color: "#fff",
              boxShadow: `0 12px 28px ${TEAL}55`,
              borderColor: `rgba(255,255,255,0.22)`,
            }}
            whileHover={{
              backgroundColor: ORANGE,
              boxShadow: `0 14px 32px ${ORANGE}55`,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonLabel}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
