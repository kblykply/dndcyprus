// app/components/home/AynurSpotlightAlt.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// Typed cubic-bezier ease
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

type Props = {
  title?: string;
  role?: string;
  subtitle?: string;
  quote?: string;
  image?: string;
  highlights?: { k: string; v: string }[];
  profileHref?: string;
  contactHref?: string;
};

export default function AynurSpotlightAlt({
title = "Aynur Zorba Gülol",
role = "Director, DND Cyprus",
subtitle =
  "Provides strategic leadership for operational excellence, customer experience, and sustainable projects.",
quote =
  "“Trust, transparency, and team spirit — these are at the core of our success.”",
image = "/aynurhanimhome.PNG",
highlights = [
  { k: "Focus", v: "Operational Leadership" },
  { k: "Expertise", v: "Architecture & Management" },
  { k: "Approach", v: "Sustainability" },
],
profileHref = "/en/projects",
contactHref = "/en/contact",

}: Props) {
  return (
    <section
      aria-label="Aynur Zorba Gülol — Spotlight"
      className="relative overflow-visible bg-white pb-16 sm:pb-20 lg:pb-0"
      style={{ color: "#141517" }}
      data-bg="light"
    >
      {/* Soft corner glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(40rem 28rem at 0% 100%, ${TEAL}10, transparent 70%),
            radial-gradient(40rem 28rem at 100% 0%, ${ORANGE}10, transparent 70%)
          `,
        }}
      />

      {/* CONTENT WRAPPER */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 lg:pt-24 pb-0 min-h-0 sm:min-h-[88vh] lg:min-h-[95vh]">
        {/* Absolutized portrait (hidden on mobile) */}
        <img
          src={image}
          alt={title}
          className="
            hidden md:block
            pointer-events-none select-none
            absolute bottom-0 right-0 z-10
            h-[68vh] lg:h-[calc(95vh-4rem)]
            w-auto max-w-none object-contain object-bottom
            drop-shadow-[0_20px_45px_rgba(0,0,0,.18)]
          "
        />

        {/* TEXT GRID */}
        <div className="relative z-20 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* TEXT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="lg:col-span-7"
          >
            <span
              className="inline-block text-[11px] sm:text-[12px] uppercase tracking-wide px-3 py-1 rounded-full mb-4"
              style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
            >
Management Team

            </span>

            <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-tight">
              {title}
            </h2>
            <div className="mt-1 text-sm sm:text-base text-black/60">{role}</div>

            <p className="mt-4 text-[clamp(1rem,2.4vw,1.125rem)] text-black/70 max-w-[65ch]">
              {subtitle}
            </p>

            {quote && (
              <blockquote
                className="mt-6 text-[clamp(1rem,2.6vw,1.25rem)] italic font-medium text-black/85 border-l-4 pl-4"
                style={{ borderColor: ORANGE }}
              >
                {quote}
              </blockquote>
            )}

            {/* HIGHLIGHTS */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {highlights.map((f, i) => (
                <div
                  key={f.k + i}
                  className="rounded-xl p-3 bg-white/70 backdrop-blur-sm border text-sm shadow-[0_6px_20px_rgba(0,0,0,.04)]"
                  style={{ borderColor: "rgba(20,21,23,0.08)" }}
                >
                  <div className="text-[11px] uppercase tracking-wide text-black/55">
                    {f.k}
                  </div>
                  <div className="font-medium">{f.v}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href={profileHref}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 text-white"
                style={{ background: TEAL, boxShadow: `0 10px 24px ${TEAL}33` }}
              >
                Projects 
              </Link>
              <Link
                href={contactHref}
                className="px-6 py-2.5 rounded-full text-sm font-medium"
                style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Spacer for portrait */}
          <div className="hidden lg:block lg:col-span-5" aria-hidden />
        </div>
      </div>
    </section>
  );
}
