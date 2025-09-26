// app/components/home/AynurSpotlight.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion"; // ✅ add this
import Link from "next/link";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// cubic-bezier tuple (well-typed)
const EASE_CB = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_CB }, // ✅ tuple, not number[]
  },
};

type Props = {
  title?: string;
  role?: string;
  subtitle?: string;
  quote?: string;
  image?: string; // left portrait (no background card)
  highlights?: { k: string; v: string }[];
  logos?: string[]; // optional partner/career logos
  profileHref?: string; // detail page
  contactHref?: string; // contact page
  linkedinHref?: string; // optional LinkedIn
};

export default function AynurSpotlight({
  title = "Aynur Zorba Gülol",
  role = "DND Cyprus Direktörü",
  subtitle = "Operasyonel mükemmeliyet, müşteri deneyimi ve kurumsal sürdürülebilirlik odağında projeleri yönlendiriyor.",
  quote = "“Şeffaf süreçler, güçlü ekip işbirliği ve detaylara verilen önem, kalıcı değer üretir.”",
  image = "/images/aynur-zorba-gulol.jpg",
  highlights = [
    { k: "Odak Alanı", v: "Operasyon & Müşteri Deneyimi" },
    { k: "Uzmanlık", v: "Süreç Tasarımı, Kalite & Teslim" },
    { k: "Yaklaşım", v: "Şeffaflık, Güven, Sürdürülebilirlik" },
  ],
  logos = [],
  profileHref = "/about#leadership",
  contactHref = "/contact",
  linkedinHref,
}: Props) {
  return (
    <section
      aria-label="Aynur Zorba Gülol — Spotlight"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Kicker */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(20,21,23,0.08)",
            color: TEAL,
          }}
        >
          Yönetim & Operasyon
        </motion.span>

        <div className="mt-6 grid items-end gap-10 lg:grid-cols-2">
          {/* LEFT: portrait (no background), anchored to bottom */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="flex justify-center lg:justify-start"
          >
            <img
              src={image}
              alt={title}
              className="w-auto max-w-[92%] lg:max-w-none h-[500px] lg:h-[600px] object-contain object-bottom"
            />
          </motion.div>

          {/* RIGHT: text & actions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h2>
            <div className="mt-1 text-sm sm:text-base text-black/60">{role}</div>

            <p className="mt-3 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.72)" }}>
              {subtitle}
            </p>

            {quote && (
              <blockquote
                className="mt-5 text-lg italic font-medium border-l-4 pl-4"
                style={{ borderColor: TEAL, color: "rgba(20,21,23,0.85)" }}
              >
                {quote}
              </blockquote>
            )}

            {/* Highlights */}
            {!!highlights?.length && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {highlights.map((f, i) => (
                  <div
                    key={f.k + i}
                    className="rounded-xl px-3 py-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: `1px solid rgba(20,21,23,0.08)`,
                    }}
                  >
                    <div className="text-[11px] uppercase tracking-wide" style={{ color: "rgba(20,21,23,0.55)" }}>
                      {f.k}
                    </div>
                    <div className="text-sm font-medium">{f.v}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={profileHref}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 22px ${TEAL}33` }}
              >
                Detaylı Profil
              </Link>
              <Link
                href={contactHref}
                className="px-6 py-2.5 rounded-full text-sm font-medium"
                style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
              >
                İletişime Geç
              </Link>
              {linkedinHref && (
                <a
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(20,21,23,0.06)",
                    border: "1px solid rgba(20,21,23,0.12)",
                    color: "rgba(20,21,23,0.85)",
                  }}
                >
                  LinkedIn
                </a>
              )}
            </div>

            {/* Logos (optional) */}
            {!!logos?.length && (
              <div className="mt-6 flex flex-wrap items-center gap-5 opacity-80">
                {logos.map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt="Logo"
                    className="h-7 w-auto object-contain"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
