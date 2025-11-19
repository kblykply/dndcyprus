// app/components/land/LandHero.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const TOP_SCRIM_HEIGHT = 104; // ~header height; tweak if your header differs

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ===== Data lives here =====
const DATA = {
  kicker: "DND Cyprus",
  title: "Geçitkale",
  tagline:
    "A plot located in an emerging area, offering development potential suitable for villa, twin-house and apartment typologies.",
  location: "Geçitkale, İskele",
  statusTR: "Land for Sale",
  zoningNote: "Zoning: Fasıl 96",
  heightNote: "Development: up to ~5 floors (for information purposes)",
  heroImage: "/gecitkaleimage.jpg", // put your image in /public/land/
  contactHref: "/en/contact",
  brochureHref: "/downloads/gecitkale-ozet.pdf", // set '' or null to hide
};



export default function LandHero() {
  const {
    kicker,
    title,
    tagline,
    location,
    statusTR,
    zoningNote,
    heightNote,
    heroImage,
    brochureHref,
    contactHref,
  } = DATA;

  return (
    <section
      aria-label={`${title} — Hero`}
      className="relative min-h-[120vh] flex items-center"
      // Pull the hero under the sticky header so the image + scrim appear behind it
      style={{
        marginTop: `-${TOP_SCRIM_HEIGHT}px`,
        paddingTop: `${TOP_SCRIM_HEIGHT}px`,
      }}
    >
      {/* Background image (z-0) */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* --- Overlays for readability --- */}
      {/* 1) Top scrim ONLY behind header (z-10, header is z-50) */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: `${TOP_SCRIM_HEIGHT}px`,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
        }}
      />

      {/* 2) Hero-wide wash (brand + depth) (z-10 so it sits above image but below header) */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(60rem 30rem at 10% 0%, ${TEAL}22, transparent 70%),
            radial-gradient(60rem 30rem at 90% 100%, ${ORANGE}22, transparent 70%),
            linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.60))
          `,
        }}
      />

      {/* Soft brand blobs (very subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-3xl opacity-70"
        style={{ background: `${TEAL}22` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full blur-3xl opacity-70"
        style={{ background: `${ORANGE}20` }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 text-center text-white z-20">
        {/* Kicker */}
        {kicker && (
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            {kicker} • Land Project
          </motion.span>
        )}

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
        >
          {title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-3 max-w-2xl mx-auto text-base sm:text-lg"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {tagline}
        </motion.p>

        {/* Chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          <Chip text={statusTR} color={ORANGE} />
          <Chip text={location} color="rgba(255,255,255,0.85)" neutral />
          <Chip text={zoningNote} color={TEAL} />
          <Chip text={heightNote} color={TEAL} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <a
            href={contactHref}
            className="rounded-full px-7 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: TEAL,
              color: "#fff",
              border: `1px solid ${TEAL}66`,
              boxShadow: `0 12px 28px ${TEAL}55`,
            }}
          >
            Contact Us
          </a>

          {brochureHref ? (
            <a
              href={brochureHref}
              className="rounded-full px-7 py-3 text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(8px)",
              }}
            >
             Summary & Location PDF
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/* -------- Small chip helper -------- */
function Chip({
  text,
  color,
  neutral = false,
}: {
  text: string;
  color: string;
  neutral?: boolean;
}) {
  const styles = neutral
    ? {
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.28)",
        color: "#fff",
      }
    : {
        background: `${color}33`,
        border: `1px solid ${color}66`,
        color: "#fff",
      };

  return (
    <span
      className="text-xs px-3 py-1 rounded-full"
      style={styles as React.CSSProperties}
    >
      {text}
    </span>
  );
}
