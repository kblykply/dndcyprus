// app/components/dnd-usa/DndUsaHero.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

export default function DndUsaHero({
  bg = "/dndprojects.jpg",
  title = "DND USA — Lüks Konutlarda Yeni Bir Standart",
  subtitle = "Massachusetts’te modern yaşam alanları ve Kuzey Kıbrıs’taki köklü tecrübemizi birleştirerek, DND Homes USA ile güven, kalite ve yenilik odaklı projeler hayata geçiriyoruz.",
  ctaPrimary = { label: "Projelerimizi Görüntüle", href: "/projects" },
  ctaSecondary = { label: "İletişime Geç", href: "/contact" },
}: {
  bg?: string;
  title?: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}) {
  return (
    <section
      aria-label="DND USA Hero"
      className="relative overflow-hidden h-[81vh]"
      style={{ color: "#141517", background: "#ffffff" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={bg}
          alt="DND USA Projects"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 45%" }}
        />
      </div>

      {/* Scrims: edge vignette + brand wash (keeps image visible but text readable) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.35) 100%),
            radial-gradient(40rem 26rem at 10% 0%, ${TEAL}22, transparent 70%),
            radial-gradient(34rem 22rem at 95% 100%, ${ORANGE}18, transparent 70%)
          `,
        }}
      />

      {/* Decorative soft blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${TEAL}25` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${ORANGE}22` }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[78vh] flex items-end pb-10">
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Glass panel */}
          <div
            className="max-w-3xl rounded-3xl p-6 sm:p-8"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.82))",
              border: "1px solid rgba(20,21,23,0.10)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2">
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
              >
                DND USA
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: "rgba(20,21,23,0.06)", border: "1px solid rgba(20,21,23,0.10)", color: "rgba(20,21,23,0.70)" }}>
                Massachusetts
              </span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.75)" }}>
              {subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={ctaPrimary.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 22px ${TEAL}44` }}
              >
                {ctaPrimary.label}
              </a>
              <a
                href={ctaSecondary.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium"
                style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
              >
                {ctaSecondary.label}
              </a>
            </div>

            {/* tiny trust row */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
              {[
                { k: "Kalite", v: "Premium Malzeme" },
                { k: "Güven", v: "Şeffaf Süreç" },
                { k: "Destek", v: "Satış Sonrası" },
              ].map((m, i) => (
                <div
                  key={m.k + i}
                  className="rounded-xl px-3 py-2"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(255,255,255,0.84))",
                    border: `1px solid ${(i % 2 ? ORANGE : TEAL)}33`,
                    boxShadow: `0 10px 22px ${(i % 2 ? ORANGE : TEAL)}22`,
                  }}
                >
                  <div className="opacity-70">{m.k}</div>
                  <div className="font-semibold">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom soft divider (curved) */}

    </section>
  );
}
