"use client";

import React, { type CSSProperties } from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  bgImage?: string;
};

export default function HomeCTA({
  kicker = "DND Cyprus",
  title = "Birlikte Değer Yaratalım",
  subtitle = "Konut, ticari ve karma projelerde, tasarımdan teslimata uçtan uca çözüm sunuyoruz.",
  primaryText = "Teklif Al",
  primaryHref = "/contact",
  secondaryText = "Projelerimizi İncele",
  secondaryHref = "/projects",
  bgImage,
}: Props) {
  // ✅ CSS değişkeniyle type-safe style nesnesi
  const sectionStyle: CSSProperties & { ["--stroke"]: string } = {
    background: "#ffffff",
    color: "#141517",
    ["--stroke"]: "rgba(20,21,23,0.08)",
  };

  return (
    <section
      aria-label="Ana Sayfa CTA"
      className="relative overflow-hidden bg-white"
      style={sectionStyle}
    >
      {/* subtle gradient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(32rem 22rem at 12% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(28rem 18rem at 88% 100%, ${ORANGE}14, transparent 70%)
          `,
        }}
      />

      {/* optional background image (very subtle) */}
      {bgImage ? (
        <div className="absolute inset-0 opacity-15">
          <img src={bgImage} alt="" aria-hidden className="w-full h-full object-cover" />
        </div>
      ) : null}

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        {/* kicker */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--stroke)",
            color: TEAL,
            backdropFilter: "blur(8px)",
          }}
        >
          {kicker}
        </motion.span>

        {/* title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
        >
          {title}
        </motion.h2>

        {/* subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-4 max-w-2xl mx-auto text-base sm:text-lg"
          style={{ color: "rgba(20,21,23,0.65)" }}
        >
          {subtitle}
        </motion.p>

        {/* buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <a
            href={primaryHref}
            className="rounded-xl px-6 py-3 text-sm font-medium"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              color: "#fff",
              border: `1px solid ${TEAL}55`,
              boxShadow: `0 12px 28px ${TEAL}44`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`;
            }}
          >
            {primaryText}
          </a>

          {secondaryText && secondaryHref ? (
            <a
              href={secondaryHref}
              className="rounded-xl px-6 py-3 text-sm font-medium"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "rgba(20,21,23,0.85)",
                border: "1px solid var(--stroke)",
                backdropFilter: "blur(8px)",
              }}
            >
              {secondaryText}
            </a>
          ) : null}
        </motion.div>

        {/* optional micro badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-6 flex items-center justify-center gap-2 flex-wrap"
        >
          {[
            { label: "Zamanında Teslim", color: TEAL },
            { label: "Kalite Güvencesi", color: ORANGE },
            { label: "Şeffaf İletişim", color: TEAL },
          ].map((b) => (
            <span
              key={b.label}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: `${b.color}14`,
                color: b.color,
                border: `1px solid ${b.color}33`,
              }}
            >
              {b.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
