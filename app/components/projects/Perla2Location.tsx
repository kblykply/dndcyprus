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
type Props = {
  title?: string;
  subtitle?: string;
  address?: string;
  lat?: number;
  lng?: number;
  embedSrc?: string;
  nearby?: POI[];
  grayscale?: boolean;
};

export default function Perla2Location({
  title = "Konum",
  subtitle = "Bahçeler, İskele — denize ve günlük ihtiyaçlara yakın konum.",
  address = "Bahçeler, İskele, Kuzey Kıbrıs",
  lat = 35.2869,
  lng = 33.9235,
  embedSrc,
  nearby = [
    { label: "Long Beach" },
    { label: "Market & Restoranlar" },
    { label: "Sahil Yürüyüş Yolu" },
    { label: "İskele Merkezi" },
  ],
  grayscale = false,
}: Props) {
  const mapsQuery = encodeURIComponent(`${lat},${lng}`);
  const mapsSearch = encodeURIComponent(address);
  const googleDir = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const googleOpen = `https://www.google.com/maps/search/?api=1&query=${mapsSearch}`;
  const appleDir = `https://maps.apple.com/?daddr=${mapsQuery}`;

  const iframeSrc =
    embedSrc ||
    `https://www.google.com/maps?q=${mapsQuery}&z=14&output=embed`;

  return (
    <section
      aria-label="La Joya Perla II — Konum"
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke" as any]: "rgba(20,21,23,0.08)",
      }}
    >
      {/* subtle brand wash */}
   

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
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.65)" }}
          >
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
          <div
            className="text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.78)" }}
          >
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
              Google Haritalar ile Yol Tarifi
            </a>
            <a
              href={appleDir}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: "rgba(20,21,23,0.05)",
                color: "rgba(20,21,23,0.85)",
                border: "1px solid var(--stroke)",
              }}
            >
              Apple Haritalar ile Yol Tarifi
            </a>
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
              Haritada Aç
            </a>
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

        {/* Nearby chips */}
        {nearby?.length ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            custom={3}
            className="mt-6 flex flex-wrap gap-2"
          >
            {nearby.map((p) => (
              <span
                key={p.label}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(20,21,23,0.05)",
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
