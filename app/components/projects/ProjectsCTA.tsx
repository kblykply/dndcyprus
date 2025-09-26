// app/components/ProjectsCTA.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// Give the tuple a proper Easing type
const EASE_OUT: Easing = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export default function ProjectsCTA() {
  return (
    <section
      aria-label="Projeler CTA"
      className="relative overflow-hidden"
       style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke"]: "rgba(20,21,23,0.08)",
      } as React.CSSProperties & Record<"--stroke", string>}
    >
      {/* subtle accent wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(32rem 22rem at 15% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(28rem 18rem at 88% 100%, ${ORANGE}14, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(20,21,23,0.05)",
            border: "1px solid var(--stroke)",
            color: TEAL,
            backdropFilter: "blur(8px)",
          }}
        >
          DND Cyprus
        </motion.span>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
        >
          Projelerimiz Hakkında Daha Fazla Bilgi Alın
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-3 max-w-2xl mx-auto text-base sm:text-lg"
          style={{ color: "rgba(20,21,23,0.65)" }}
        >
          Devam eden veya yakında başlayacak projelerimizle ilgileniyorsanız, satış
          ekibimiz size detaylı bilgi ve fırsatlar sunmaktan memnuniyet duyar.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <a
            href="/contact"
            className="rounded-xl px-6 py-3 text-sm font-medium"
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
            İletişime Geçin
          </a>
          <a
            href="/about"
            className="rounded-xl px-6 py-3 text-sm font-medium"
            style={{
              background: "rgba(20,21,23,0.05)",
              color: "rgba(20,21,23,0.85)",
              border: "1px solid var(--stroke)",
              backdropFilter: "blur(8px)",
            }}
          >
            Hakkımızda
          </a>
        </motion.div>
      </div>
    </section>
  );
}
