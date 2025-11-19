// app/components/WhyChooseUs.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle } from "lucide-react"; // you can swap with your own icons or images

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Strength = {
  title: string;
  description: string;
  icon?: React.ReactNode; // optional icon slot
  image?: string; // optional IMAGE SLOT
  accent?: "teal" | "orange";
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  strengths?: Strength[];
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyChooseUs({
 kicker = "DND Cyprus",
title = "Why Choose Us?",
subtitle = "We stand out with our reliable, innovative, and sustainable approach.",
strengths = [
  {
    title: "Quality Assurance",
    description:
      "We deliver high quality standards in every project through ISO-certified processes.",
    accent: "teal",
  },
  {
    title: "On-Time Delivery",
    description:
      "We complete our projects on the planned dates in a reliable and transparent manner.",
    accent: "orange",
  },
  {
    title: "Sustainability",
    description:
      "Energy-efficient, environmentally friendly materials and green solutions are our priority.",
    accent: "teal",
  },
  {
    title: "Customer Satisfaction",
    description:
      "With transparent communication and after-sales support, we build long-term relationships of trust.",
    accent: "orange",
  },

  ],
}: Props) {
  return (
    <section
      aria-label="Why Choose Us / Our Strengths"
      className="relative overflow-hidden bg-white"
    style={{
  background: "#ffffff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >

        <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(30rem 20rem at 12% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 18rem at 88% 100%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />
      {/* subtle color accents */}
     
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="text-left max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--stroke)",
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

          <motion.p
            variants={fadeUp}
            className="mt-2 text-base sm:text-lg"
            style={{ color: "rgba(20,21,23,0.65)" }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Strengths Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {strengths.map((s, i) => {
            const color = s.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="rounded-2xl p-6 flex flex-col items-start group transition-transform"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                  border: "1px solid var(--stroke)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Icon or Image slot */}
                <div className="mb-4">
                  {s.image ? (
                    <img src={s.image} alt={s.title} className="h-10 w-10 object-contain" />
                  ) : (
                    <CheckCircle size={32} style={{ color }} />
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(20,21,23,0.65)" }}>
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
        >
          <p style={{ color: "rgba(20,21,23,0.65)" }}>
Get in touch with us to learn more.
          </p>
          <a
            href="/en/contact"
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
Contact Us      
    </a>
        </motion.div>
      </div>
    </section>
  );
}
