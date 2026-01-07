// app/components/DefaultHero.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

type Props = {
  bg?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
};
{/* Background */}
export default function DefaultHero({
  bg = "/dndturkiye/hero.jpeg",
  kicker = "DND Cyprus",
title = "DND Türkiye Ofisi",
subtitle = "Türkiye merkezli danışmanlık ekibimiz, Kıbrıs projelerimiz için yatırımcı adaylarına şeffaf, planlı ve uçtan uca destek sunar."
,

  align = "center",
}: Props) {
  const isLeft = align === "left";

  return (
    <section
      aria-label={`${title} — Hero`}
      className="relative h-[100vh] w-full flex items-end justify-center"
    >
    {/* Background */}
<div className="absolute inset-0">
  <img
    src={bg}
    alt={title}
    className="w-full h-full object-cover"
    style={{ objectPosition: "center 45%" }}
    draggable={false}
  />

  {/* Top readability overlay */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.0) 60%)",
    }}
  />

  {/* Existing global gradient */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.65))",
    }}
  />
</div>


      {/* Content */}
      <div
        className={`relative z-10 w-full px-6 mb-24 ${
          isLeft ? "max-w-6xl mx-auto" : "max-w-3xl mx-auto text-center"
        }`}
      >
        <div
          className="rounded-2xl p-8 sm:p-10 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))",
            border: "1px solid rgba(255,255,255,0.28)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          {kicker && (
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className={`inline-block text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full ${
                isLeft ? "" : ""
              }`}
              style={{
                background: `${TEAL}30`,
                color: "#fff",
                border: `1px solid ${TEAL}66`,
              }}
            >
              {kicker}
            </motion.span>
          )}

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className={`font-bold text-white drop-shadow-lg ${
              isLeft
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : "text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className={`mt-4 text-base sm:text-lg text-white/90 ${
                isLeft ? "max-w-3xl" : "max-w-2xl mx-auto"
              }`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
