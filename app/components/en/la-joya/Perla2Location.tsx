// app/components/projects/Perla2Location.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

type POI = { label: string; note?: string };
type DistanceItem = {
  label: string;
  /** provide exactly one of km or m */
  km?: number;
  m?: number;
  note?: string;
  accent?: "teal" | "orange";
};

type Props = {
  title?: string;
  subtitle?: string;
  address?: string;
  lat?: number;
  lng?: number;
  embedSrc?: string;
  nearby?: POI[];
  grayscale?: boolean;
  distances?: DistanceItem[];
};

function formatDistance(d: DistanceItem) {
  if (typeof d.m === "number") return `${Math.round(d.m)} m`;
  if (typeof d.km === "number") {
    // Under 1 km → show meters
    if (d.km < 1) return `${Math.round(d.km * 1000)} m`;
    // 1–50 km → 1 decimal if needed
    if (d.km < 50) return `${Number.isInteger(d.km) ? d.km.toFixed(0) : d.km.toFixed(1)} km`;
    // 50+ km → integers
    return `${Math.round(d.km)} km`;
  }
  return "";
}

export default function Perla2Location({
title = "La Joya Location",
subtitle = "Long Beach, İskele — a location close to the sea and daily amenities.",
address = "Long Beach, İskele, North Cyprus",
lat = 35.272493,
lng = 33.911998,
embedSrc = "https://www.google.com/maps?q=35.272493,33.911998&z=15&output=embed",
nearby = [
  { label: "Long Beach" },
  { label: "Mariachi Beach Club" },
  { label: "Restaurants & Markets" },
  { label: "İskele Center" },
],
grayscale = false,
distances = [
  { label: "Long Beach (coastline)", m: 500, accent: "teal" },
  { label: "Mariachi Beach Club", km: 1.2, accent: "orange" },
  { label: "Gazimağusa (Famagusta)", km: 15, accent: "teal" },
  { label: "Ercan Airport", km: 50, accent: "orange" },
],

}: Props) {
  const mapsQuery = encodeURIComponent(`${lat},${lng}`);
  const mapsSearch = encodeURIComponent(address);
  const googleDir = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const googleOpen = `https://www.google.com/maps/search/?api=1&query=${mapsSearch}`;
  const appleDir = `https://maps.apple.com/?daddr=${mapsQuery}`;

  const iframeSrc =
    embedSrc || `https://www.google.com/maps?q=${mapsQuery}&z=14&output=embed`;

  return (
    <section
      aria-label="La Joya Perla II — Konum"
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke"]: "rgba(20,21,23,0.08)",
      } as React.CSSProperties & Record<"--stroke", string>}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* address + actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          custom={1}
          className="mt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3"
        >
          <div className="text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.78)" }}>
            <span className="font-semibold">Adres:</span> {address}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={googleDir}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: `${TEAL}14`,
                color: TEAL,
                border: `1px solid ${TEAL}33`,
              }}
            >
Get Directions with Google Maps            </a>
            <a
              href={appleDir}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "rgba(20,21,23,0.85)",
                border: "1px solid var(--stroke)",
              }}
            >
Get Directions with Apple Maps            </a>
            <a
              href={googleOpen}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: `${ORANGE}14`,
                color: ORANGE,
                border: `1px solid ${ORANGE}33`,
              }}
            >
Open on Map            </a>
          </div>
        </motion.div>

        {/* map embed */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          custom={2}
          className="mt-6 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid var(--stroke)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="aspect-[16/9]">
            <iframe
              title="Proje Konumu"
              src={iframeSrc}
              loading="lazy"
              className="w-full h-full border-0"
              style={{ filter: grayscale ? "grayscale(100%)" : "none" }}
            />
          </div>
        </motion.div>

        {/* Distances grid */}
        {distances?.length ? (
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            custom={3}
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {distances.map((d, idx) => {
              const val = formatDistance(d);
              const accent = d.accent === "orange" ? ORANGE : TEAL;
              return (
                <motion.li
                  key={`${d.label}-${idx}`}
                  variants={fadeUp}
                  custom={3 + idx * 0.04}
                  className="group rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{
                    border: "1px solid var(--stroke)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                    backdropFilter: "blur(10px)",
                  }}
                  title={d.note}
                >
                  {/* icon */}
                  <span
                    aria-hidden
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: `${accent}14`,
                      border: `1px solid ${accent}33`,
                      color: accent,
                    }}
                  >
                    {/* simple location glyph */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                  </span>

                  {/* text */}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{d.label}</div>
                    <div className="text-xs" style={{ color: "rgba(20,21,23,0.65)" }}>
                      {val}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        ) : null}

        {/* Nearby chips */}
        {nearby?.length ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            custom={4}
            className="mt-6 flex flex-wrap gap-2"
          >
            {nearby.map((p) => (
              <span
                key={p.label}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "rgba(20,21,23,0.85)",
                  border: "1px solid var(--stroke)",
                  backdropFilter: "blur(8px)",
                }}
                title={p.note}
              >
                {p.label}
              </span>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
