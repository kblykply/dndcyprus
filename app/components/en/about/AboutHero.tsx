// app/components/AboutHero.tsx
import Image from "next/image";
import React from "react";
import type { Variants } from "framer-motion";

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

export default function AboutHero({
  bg = "/uu.jpg",
  kicker = "About Us",
title = "DND Cyprus",
subtitle =
  "With our innovative vision, deep-rooted experience, and commitment to quality construction, we are building the future of Cyprus.",

}: {
  bg?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section
      aria-label="About Us Hero"
      className="relative h-[100vh] w-full flex items-end justify-center text-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image quality={65}
          fill
          preload
          sizes="100vw"
          src={bg}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 45%" }}
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.65))",
          }}
        />
      </div>

      {/* Content with Glassmorphic Box */}
      <div className="relative z-10 max-w-3xl px-6 select-none mb-24">
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
            <span
              className="inline-block text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full"
              style={{
                background: `${TEAL}30`,
                color: "#fff",
                border: `1px solid ${TEAL}66`,
              }}
            >
              {kicker}
            </span>
          )}

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
