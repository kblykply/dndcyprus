"use client";

import React, { type CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE_CB = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_CB },
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
  /** Full-bleed background image under the glass card */
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
  bgImage = "/lagoon-verde/2.jpg",
}: Props) {
  // type-safe CSS variable
  const sectionStyle: CSSProperties & { ["--stroke"]: string } = {
    ["--stroke"]: "rgba(255,255,255,0.45)",
  };

  return (
    <section
      aria-label="Ana Sayfa CTA"
      className="relative overflow-hidden min-h-[60vh]"
      style={sectionStyle}
    >
      {/* === BACKGROUND IMAGE (z-0) === */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* === LIGHT SCRIMS (keep image visible) === */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(60% 60% at 12% 0%, ${TEAL}1F, transparent 70%),
            radial-gradient(50% 50% at 90% 100%, ${ORANGE}1F, transparent 70%),
            linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.28))
          `,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22><filter id=%22n%22 x=%22-20%22 y=%22-20%22 width=%22240%22 height=%22240%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.65%22/></svg>')",
        }}
      />

      {/* === CONTENT (z-10) === */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="
            mx-auto max-w-4xl text-center
            rounded-3xl p-8 sm:p-10 lg:p-12
            bg-white/15
            border border-[color:var(--stroke)]
            shadow-[0_10px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]
            backdrop-blur-2xl
          "
          style={{ WebkitBackdropFilter: "blur(24px)" }}
        >
          {/* kicker */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid var(--stroke)",
              color: "#fff",
              backdropFilter: "blur(8px)",
            }}
          >
            {kicker}
          </motion.span>

          {/* title */}
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          >
            {title}
          </motion.h2>

          {/* subtitle */}
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {subtitle}
          </motion.p>

          {/* buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center justify-center gap-3 flex-wrap"
          >
            <a
              href={primaryHref}
              className="rounded-xl px-6 py-3 text-sm font-medium transition-transform will-change-transform hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                color: "#fff",
                border: `1px solid ${TEAL}55`,
                boxShadow: `0 12px 30px ${TEAL}55`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`;
                e.currentTarget.style.boxShadow = `0 12px 30px ${ORANGE}55`;
                e.currentTarget.style.border = `1px solid ${ORANGE}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`;
                e.currentTarget.style.boxShadow = `0 12px 30px ${TEAL}55`;
                e.currentTarget.style.border = `1px solid ${TEAL}55`;
              }}
            >
              {primaryText}
            </a>

            {secondaryText && secondaryHref ? (
              <a
                href={secondaryHref}
                className="rounded-xl px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  color: "#fff",
                  border: "1px solid var(--stroke)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {secondaryText}
              </a>
            ) : null}
          </motion.div>

          {/* badges */}
          <motion.div
            variants={fadeUp}
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
                  background: "rgba(255,255,255,0.16)",
                  color: "#fff",
                  border: `1px solid ${b.color}55`,
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.25)`,
                  backdropFilter: "blur(6px)",
                }}
              >
                {b.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* bottom vignette above image but below content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-5 bg-gradient-to-t from-black/35 to-transparent" />
    </section>
  );
}
