// app/components/home/OzanSpotlight.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import Link from "next/link";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// Define cubic-bezier as a const tuple so TS understands the Easing type
const EASE: Easing = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function OzanSpotlight({
  title = "Ozan Dökmecioğlu",
  subtitle = "DND Cyprus’un kurucusu ve vizyoner lideri. Küresel finans ve operasyon deneyimini Kıbrıs’taki çağdaş yaşam projelerine aktarıyor.",
  quote = "“Disiplin, şeffaflık ve sürdürülebilir büyüme — her işimizin temelinde.”",
  image = "/ozanbeycropped.png",
  logos = ["/Keurig_Dr_Pepper.png", "/Kellogg's-Logo.png", "/Kraft_logo_2012.png", "/Cargill_logo.png"],
}: {
  title?: string;
  subtitle?: string;
  quote?: string;
  image?: string;
  logos?: string[];
}) {
  return (
    <section
      aria-label="Ozan Dökmecioğlu — Spotlight"
      className="relative overflow-hidden -mb-6 lg:-mb-10"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-0">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(20,21,23,0.05)",
            border: "1px solid rgba(20,21,23,0.08)",
            color: TEAL,
          }}
        >
          Kurucu & Yönetim
        </motion.span>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 items-stretch min-h-[78vh] lg:min-h-[86vh]">
          {/* LEFT: image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={title}
                draggable={false}
                decoding="async"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[100%] lg:h-[105%] w-auto max-w-none object-contain pointer-events-none select-none"
              />
            </div>
          </motion.div>

          {/* RIGHT: text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="flex flex-col justify-center order-1 lg:order-2 pb-6 lg:pb-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h2>
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

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { k: "Uzmanlık", v: "Finans & Operasyon" },
                { k: "Küresel Rol", v: "Keurig Dr Pepper (Eski CFO/President Int.)" },
                { k: "Geçmiş", v: "Kellogg, Kraft, Cargill" },
              ].map((f, i) => (
                <div
                  key={f.k + i}
                  className="rounded-xl px-3 py-3"
                  style={{
                    background: "rgba(20,21,23,0.04)",
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

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/ozan-dokmecioglu"
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 22px ${TEAL}33` }}
              >
                Detaylı Profil
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full text-sm font-medium"
                style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
              >
                İletişime Geç
              </Link>
            </div>

            {/* Logos — clean brand strip */}
            {logos?.length ? (
              <div className="mt-10 pt-6 border-t border-neutral-200/60">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-10 gap-y-8 place-items-center">
                  {logos.map((src, i) => (
                    <li
                      key={src + i}
                      className="h-10 w-36 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                      title="Partner/Geçmiş Logo"
                    >
                      <img
                        src={src}
                        alt="Partner/Geçmiş Logo"
                        loading="lazy"
                        draggable={false}
                        className="h-8 sm:h-9 w-auto max-h-10 object-contain filter grayscale hover:grayscale-0 transition will-change-filter select-none"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
