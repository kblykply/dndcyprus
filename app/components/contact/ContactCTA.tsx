"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
};

export default function ContactCTA({
  title = "Hadi Projenizi Birlikte Hayata Geçirelim",
  subtitle = "DND Cyprus ekibi, inşaat ve yatırım projeleriniz için size destek olmaya hazır.",
  buttonText = "Hemen İletişime Geçin",
  buttonHref = "/contact",
}: Props) {
  return (
    <section
      aria-label="İletişim Çağrısı"
      className="relative overflow-hidden"
style={{
  background: "#ffffff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}
    >
      {/* background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(30rem 20rem at 15% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 16rem at 85% 100%, ${ORANGE}14, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-4 max-w-2xl mx-auto text-base sm:text-lg"
          style={{ color: "rgba(20,21,23,0.65)" }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-8"
        >
          <a
            href={buttonHref}
            className="inline-block rounded-xl px-6 py-3 text-sm font-medium shadow-lg transition-colors"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              color: "#fff",
              border: `1px solid ${TEAL}55`,
              boxShadow: `0 12px 28px ${TEAL}44`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
            }
          >
            {buttonText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
