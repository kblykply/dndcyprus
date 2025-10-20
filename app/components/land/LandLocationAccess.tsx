// app/components/land/LandLocationAccess.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type DriveTime = { label: string; minutes: number };
type SectionData = {
  heading: string;
  subhead?: string;
  tone: "light" | "dark";
  center: { lat: number; lng: number };
  zoom: number;
  boundaryOverlay?: string; // optional transparent PNG with parcel outline over a base map
  driveTimes: DriveTime[];
  accessNotes?: string[];
  openInMapsHref?: string; // link to open in Google Maps
};

// ====== DATA (edit here) ======
const DATA: SectionData = {
  heading: "Konum & Ulaşım",
  subhead:
    "Günlük yaşam merkezlerine, sahile ve ana yol bağlantılarına yakın. Aşağıdaki süreler araçla tahmini sürüş süreleridir.",
  tone: "light",
  // Set your parcel center (example values)
  center: { lat: 35.261, lng: 33.784 },
  zoom: 13,
  // If you have a pre-rendered boundary overlay PNG aligned to a base map screenshot, place it in /public
  boundaryOverlay: "", // e.g. "/land/gecitkale-boundary.png"
  driveTimes: [
    { label: "Long Beach", minutes: 12 },
    { label: "Gazimağusa", minutes: 18 },
    { label: "Ercan Havalimanı", minutes: 25 },
    { label: "İskele Merkezi", minutes: 15 },
  ],
  accessNotes: [
    "Asfalt yola yakın, bölge bağlantılarına hızlı erişim.",
    "Düşük eğim; düzenli parsel formu, kolay yerleşim.",
    "Sessiz çevre; gelişmekte olan konut dokusu.",
  ],
  openInMapsHref:
    "https://www.google.com/maps?q=35.261,33.784&z=13", // update to exact coords
};

export default function LandLocationAccess() {
  const { heading, subhead, tone, center, zoom, boundaryOverlay, driveTimes, accessNotes, openInMapsHref } =
    DATA;
  const isLight = tone === "light";

  const [mode, setMode] = useState<"standard" | "satellite">("standard");

  // Build a simple Google Maps embed URL. For satellite, we add "&t=k".
  const embedUrl = useMemo(() => {
    const base = `https://www.google.com/maps?q=${center.lat},${center.lng}&z=${zoom}&output=embed`;
    return mode === "satellite" ? `${base}&t=k` : base;
  }, [center.lat, center.lng, zoom, mode]);

  return (
    <section
      aria-label="Land Project — Location & Access"
      className="relative"
      style={{
        background: isLight ? "#ffffff" : "#0b0c0d",
        color: isLight ? "#141517" : "#ffffff",
      }}
      data-bg={isLight ? "light" : "dark"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="text-2xl sm:text-3xl font-semibold"
          >
            {heading}
          </motion.h2>
          {subhead ? (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="mt-2 text-sm sm:text-base"
              style={{
                color: isLight ? "rgba(20,21,23,0.65)" : "rgba(255,255,255,0.85)",
              }}
            >
              {subhead}
            </motion.p>
          ) : null}
        </div>

        {/* Layout: Map left, details right */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl overflow-hidden border"
              style={{ borderColor: isLight ? "rgba(20,21,23,0.10)" : "rgba(255,255,255,0.18)" }}
            >
              {/* Mode toggle */}
              <div className="absolute right-3 top-3 z-20 flex gap-1 backdrop-blur-md rounded-full border px-1 py-1"
                style={{
                  background: isLight ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.35)",
                  borderColor: isLight ? "rgba(20,21,23,0.15)" : "rgba(255,255,255,0.28)",
                }}
              >
                <ToggleButton active={mode === "standard"} onClick={() => setMode("standard")}>
                  Standart
                </ToggleButton>
                <ToggleButton active={mode === "satellite"} onClick={() => setMode("satellite")}>
                  Uydu
                </ToggleButton>
              </div>

              {/* Map iframe */}
              <div className="aspect-video relative z-10">
                <iframe
                  title="Proje Konumu"
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Optional parcel overlay image (must be pre-aligned if used) */}
                {boundaryOverlay ? (
                  <img
                    src={boundaryOverlay}
                    alt="Parsel sınırı overlay"
                    className="pointer-events-none absolute inset-0 w-full h-full object-contain z-20 opacity-80 mix-blend-multiply"
                  />
                ) : null}
              </div>

              {/* Subtle brand wash */}
              <div
                aria-hidden
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(40rem 18rem at -10% 0%, ${TEAL}11, transparent 70%),
                    radial-gradient(40rem 18rem at 110% 100%, ${ORANGE}11, transparent 70%)
                  `,
                }}
              />
            </div>

            {/* Open in Maps */}
            {openInMapsHref ? (
              <div className="mt-3">
                <a
                  href={openInMapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm rounded-full px-4 py-2 border"
                  style={{
                    color: isLight ? TEAL : "#fff",
                    borderColor: isLight ? `${TEAL}55` : "rgba(255,255,255,0.35)",
                    background: isLight ? `${TEAL}0D` : "rgba(255,255,255,0.06)",
                  }}
                >
                  Google Haritalar’da Aç
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                    <path d="M5 5h5V3H3v7h2V5z"></path>
                  </svg>
                </a>
              </div>
            ) : null}
          </motion.div>

          {/* Right: drive times + notes */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-5"
          >
            {/* Drive time chips */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {driveTimes.map((d, i) => (
                <DriveTimeCard key={d.label + i} label={d.label} minutes={d.minutes} index={i} isLight={isLight} />
              ))}
            </div>

            {/* Access notes */}
            {accessNotes?.length ? (
              <div className="mt-6 rounded-2xl p-4 border backdrop-blur-md"
                style={{
                  background: isLight ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.08)",
                  borderColor: isLight ? "rgba(20,21,23,0.10)" : "rgba(255,255,255,0.18)",
                }}
              >
                <div className="text-sm font-semibold mb-2" style={{ color: isLight ? "#141517" : "#fff" }}>
                  Erişim & Çevre Notları
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm"
                  style={{ color: isLight ? "rgba(20,21,23,0.75)" : "rgba(255,255,255,0.85)" }}
                >
                  {accessNotes.map((n, i) => (
                    <li key={i}>{n}</li>
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

/* ====== Subcomponents ====== */

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium transition"
      style={{
        background: active ? TEAL : "transparent",
        color: active ? "#fff" : "#fff",
        border: `1px solid ${active ? `${TEAL}66` : "transparent"}`,
        boxShadow: active ? `0 8px 22px ${TEAL}44` : "none",
      }}
    >
      {children}
    </button>
  );
}

function DriveTimeCard({
  label,
  minutes,
  index,
  isLight,
}: {
  label: string;
  minutes: number;
  index: number;
  isLight: boolean;
}) {
  const accent = index % 2 === 0 ? TEAL : ORANGE;
  return (
    <div
      className="rounded-2xl p-3 border backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,.06)]"
      style={{
        background: isLight ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.08)",
        borderColor: `${accent}55`,
        boxShadow: `0 10px 24px ${accent}22`,
      }}
    >
      <div className="text-[11px] uppercase tracking-wide" style={{ color: isLight ? "rgba(20,21,23,0.55)" : "rgba(255,255,255,0.75)" }}>
        {label}
      </div>
      <div className="text-lg sm:text-xl font-semibold" style={{ color: accent }}>
        {minutes} dk
      </div>
    </div>
  );
}
