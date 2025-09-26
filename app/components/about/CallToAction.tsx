// app/components/CallToAction.tsx
"use client";

import React from "react";
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
};

export default function CallToAction({
  kicker = "DND Cyprus",
  title = "Birlikte Geleceği İnşa Edelim",
  subtitle = "Projeleriniz için güvenilir ve yenilikçi bir çözüm ortağı arıyorsanız, bizimle iletişime geçin.",
  buttonLabel = "İletişime Geçin",
  buttonHref = "/contact",
}: Props) {
  return (
    <section
      aria-label="Call to Action"
      className="relative overflow-hidden bg-white"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke" as any]: "rgba(20,21,23,0.08)",
      }}
    >


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
      {/* subtle accents */}


      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        {/* kicker */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
        >
          <span
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(20,21,23,0.05)",
              border: "1px solid var(--stroke)",
              color: TEAL,
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
          className="mt-4 text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: "rgba(20,21,23,0.65)" }}
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
          <a
            href={buttonHref}
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium transition-colors"
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
            {buttonLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
