// app/components/projects/Perla2CTA.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

export default function Perla2CTA({
  title = "La Joya Perla II’de yerinizi ayırtın",
  subtitle = "Sınırlı sayıdaki daire için satış ekibimizle hemen iletişime geçin.",
  buttonText = "Bilgi ve Teklif Al",
  buttonHref = "/contact",
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section
      aria-label="La Joya Perla II — Call to Action"
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke" as any]: "rgba(20,21,23,0.08)",
      }}
    >
      {/* brand wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(32rem 22rem at 12% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(28rem 18rem at 88% 100%, ${ORANGE}14, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl font-semibold"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-3 text-sm sm:text-base"
          style={{ color: "rgba(20,21,23,0.72)" }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-8"
        >
          <a
            href={buttonHref}
            className="inline-block rounded-xl px-6 py-3 text-sm sm:text-base font-medium shadow-md transition-transform"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              color: "#fff",
              border: `1px solid ${TEAL}55`,
              boxShadow: `0 10px 28px ${TEAL}40`,
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
