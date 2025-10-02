"use client";

import React from "react";
import Image from "next/image";
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
  /** Background image path or URL (public/ path recommended) */
  bgImage?: string | null;
  /** Increase if the image is too bright; 0–1 */
  overlayOpacity?: number;
  /** If true, section fills viewport height */
  fullHeight?: boolean;
};

export default function ContactCTA({
  title = "Hadi Hayallerinizi Birlikte Hayata Geçirelim",
  subtitle = "DND Cyprus ekibi, yatırımlarınız için size destek olmaya hazır.",
  buttonText = "Hemen İletişime Geçin",
  buttonHref = "/contact",
  bgImage = "/daireici.jpg",
  overlayOpacity = 0.35,
  fullHeight = false,
}: Props) {
  return (
    <section
      aria-label="İletişim Çağrısı"
      className={`relative overflow-hidden ${fullHeight ? "min-h-screen" : "min-h-[70vh]"}`}
      style={
        {
          ["--stroke"]: "rgba(255,255,255,0.18)",
        } as React.CSSProperties & Record<"--stroke", string>
      }
    >
      {/* Background image */}
      {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Tints & accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          // soft darkening + subtle color tint
          background: `
            linear-gradient(180deg, rgba(10,12,14,${overlayOpacity + 0.1}) 0%, rgba(10,12,14,${overlayOpacity}) 100%),
            radial-gradient(40rem 24rem at 12% -10%, ${TEAL}33, transparent 70%),
            radial-gradient(36rem 22rem at 88% 110%, ${ORANGE}33, transparent 70%)
          `,
        }}
      />

      {/* tiny film grain for realism */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><filter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%2240%22 height=%2240%22 filter=%22url(%23n)%22 opacity=%220.45%22/></svg>')",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Glass card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mx-auto max-w-3xl rounded-2xl p-8 sm:p-10 lg:p-12 shadow-[0_12px_48px_rgba(0,0,0,0.25)] ring-1"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08))",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid var(--stroke)",
            color: "#ffffff",
            boxShadow: `0 20px 60px rgba(0,0,0,0.35)`,
          }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-center"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-center"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex justify-center"
          >
            <a
              href={buttonHref}
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-transform duration-300 will-change-transform focus:outline-none focus:ring-2 focus:ring-white/40"
              style={{
                background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                color: "#fff",
                border: `1px solid ${TEAL}66`,
                boxShadow: `0 16px 36px ${TEAL}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`;
                e.currentTarget.style.boxShadow = `0 20px 44px ${ORANGE}44`;
                e.currentTarget.style.border = `1px solid ${ORANGE}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`;
                e.currentTarget.style.boxShadow = `0 16px 36px ${TEAL}40`;
                e.currentTarget.style.border = `1px solid ${TEAL}66`;
              }}
            >
              {buttonText}
            </a>
          </motion.div>

          {/* subtle underglow line */}
          <div
            aria-hidden
            className="mx-auto mt-8 h-px w-2/3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* Decorative corner orbs (outside card) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -bottom-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-25"
        style={{ background: `${TEAL}44` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25"
        style={{ background: `${ORANGE}44` }}
      />
    </section>
  );
}
