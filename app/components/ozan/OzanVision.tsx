// app/components/about/OzanVision.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const principles = [
  {
    title: "Güven & Şeffaflık",
    desc: "Her projenin temelinde güvenilirlik ve şeffaf iletişim; yatırımcı, müşteri ve iş ortaklarıyla kalıcı bağlar kurulması.",
    color: TEAL,
  },
  {
    title: "Sürdürülebilirlik",
    desc: "Çevreye duyarlı, uzun vadeli değer yaratan projeler; geleceğe bırakılacak mirasın kalitesine odaklanma.",
    color: ORANGE,
  },
  {
    title: "Vizyoner Liderlik",
    desc: "Kıbrıs’ın gayrimenkul sektöründe yenilikçi yaklaşımlar, uluslararası standartlarda kalite ve mimari estetik.",
    color: TEAL,
  },
];

export default function OzanVision({
  title = "Liderlik Felsefesi & Vizyon",
  subtitle = "Ozan Dökmecioğlu’nun iş anlayışı, DND Cyprus’un değerleri ve geleceğe yönelik vizyonuyla şekilleniyor.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section
      aria-label="Ozan Dökmecioğlu — Liderlik Felsefesi & Vizyon"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
    >
      {/* subtle brand wash */}
    
   <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
            background: `
                radial-gradient(28rem 20rem at 15% 100%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 0%, ${ORANGE}14, transparent 70%)
            `,
            }}
        />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5 }}
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

        {/* principles grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 text-left"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                border: "1px solid rgba(20,21,23,0.08)",
                backdropFilter: "blur(10px)",
                boxShadow:
                  "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
              }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: p.color }}
              >
                {p.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "rgba(20,21,23,0.78)" }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
