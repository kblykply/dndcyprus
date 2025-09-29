// app/components/ProjectsCTA.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// Proper Easing tuple
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
      className="relative isolate overflow-hidden"
      style={
        {
          // used by inline styles below
          ["--stroke"]: "rgba(255,255,255,0.12)",
        } as React.CSSProperties & Record<"--stroke", string>
      }
    >
      {/* Background image */}
      <Image
        src="/lagoon-verde/1.jpg" // ← change to your image path
        alt=""
        priority
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />

      {/* Dark–light color wash for readability */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(60rem 40rem at 15% 10%, ${TEAL}22, transparent 70%),
            radial-gradient(50rem 35rem at 85% 90%, ${ORANGE}22, transparent 72%),
            linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.35))
          `,
          mixBlendMode: "multiply",
        }}
      />

      {/* Subtle film grain / noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22 viewBox=%220 0 4 4%22><path fill=%22rgba(255,255,255,0.12)%22 d=%22M0 0h1v1H0zM2 1h1v1H2zM1 2h1v1H1zM3 3h1v1H3z%22/></svg>')",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        {/* Frosted glass card */}
        <div
          className="
            relative mx-auto max-w-4xl rounded-3xl
            bg-white/10 backdrop-blur-xl
            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)]
            ring-1 ring-white/20
            px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14
          "
        >
          {/* Inner highlight border (glass edge) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 1px 24px rgba(255,255,255,0.08)",
            }}
          />

          {/* Soft top/bottom gradient tint inside the glass */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
            }}
          />

          {/* Accent glows (left TEAL, right ORANGE) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: `${TEAL}33` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: `${ORANGE}2e` }}
          />

          {/* Content */}
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid var(--stroke)",
              color: "#ffff",
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
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white"
          >
            Projelerimiz Hakkında Daha Fazla Bilgi Alın
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="mt-3 max-w-2xl text-base sm:text-lg"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Devam eden veya yakında başlayacak projelerimizle ilgileniyorsanız,
            satış ekibimiz size detaylı bilgi ve fırsatlar sunmaktan memnuniyet duyar.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="/contact"
              className="rounded-xl px-6 py-3 text-sm font-medium text-white transition-transform duration-300 will-change-transform"
              style={{
                background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                border: `1px solid ${TEAL}66`,
                boxShadow: `0 16px 40px ${TEAL}44`,
                transform: "translateZ(0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`;
                e.currentTarget.style.boxShadow = `0 18px 44px ${ORANGE}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`;
                e.currentTarget.style.boxShadow = `0 16px 40px ${TEAL}44`;
              }}
            >
              İletişime Geçin
            </a>

            <a
              href="/about"
              className="
                rounded-xl px-6 py-3 text-sm font-medium
                text-white/90 transition hover:text-white
                bg-white/10 backdrop-blur
                ring-1 ring-white/20
              "
            >
              Hakkımızda
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
