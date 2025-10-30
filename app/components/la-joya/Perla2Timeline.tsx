// app/components/projects/Perla2Timeline.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Phase = {
  id: string;
  title: string;
  date: string;
  status: "done" | "current" | "next";
  desc?: string;
};
type Update = { date: string; text: string };

type Props = {
  title?: string;
  subtitle?: string;
  phases?: Phase[];
  updates?: Update[];
  overall?: number;
  /** optional construction update video */
  video?: { src: string; type?: "youtube" | "vimeo" | "mp4"; title?: string };
};

export default function Perla2Timeline({
  title = "La Joya İnşaat Zaman Çizelgesi",
  subtitle = "Planlanan aşamalar ve güncel durum. Tarihler tanıtım amaçlıdır; resmi teslim programı satış ekibinden teyit edilmelidir.",
  overall = 55,
  phases = DEFAULT_PHASES,
  updates = DEFAULT_UPDATES,
  video = {
    src: "https://www.youtube.com/embed/YSy7WB056Fg?si=Fx0EFJ50fgHkwstW",
    type: "youtube",
    title: "Son İnşaat Güncellemesi",
  },
}: Props) {
  const clamp = (n: number) => Math.max(0, Math.min(100, n));

  return (
    <section
      aria-label="La Joya Perla II — İnşaat Zaman Çizelgesi ve Durum"
      className="relative overflow-hidden"
      style={{
  background: "#ffffff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >
      {/* subtle wash */}
        

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between text-xs"
               style={{ color: "rgba(20,21,23,0.65)" }}>
            <span>Genel İlerleme</span>
            <span>{clamp(overall)}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "rgba(20,21,23,0.08)" }}>
            <div
              className="h-full"
              style={{
                width: `${clamp(overall)}%`,
                background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`,
              }}
            />
          </div>
        </motion.div>

        {/* timeline + updates + video */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <ol className="relative pl-6">
              <span className="absolute left-2 top-0 bottom-0 w-0.5"
                    style={{ background: "rgba(20,21,23,0.12)" }} />
              {phases.map((p, i) => {
                const isCurrent = p.status === "current";
                const isDone = p.status === "done";
                const dotColor =
                  isCurrent ? ORANGE : isDone ? TEAL : "rgba(20,21,23,0.35)";
                return (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="relative ml-0 mb-6 last:mb-0"
                  >
                    <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full"
                          style={{ background: dotColor }} />
                    <div
                      className="rounded-2xl p-4"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                        border: "1px solid var(--stroke)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] px-2 py-0.5 rounded-full"
                              style={{ background: `${dotColor}14`, color: dotColor }}>
                          {p.title}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(20,21,23,0.05)" }}>
                          {p.date}
                        </span>
                      </div>
                      {p.desc && (
                        <p className="mt-2 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>
                          {p.desc}
                        </p>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Updates + Video */}
          <div className="lg:col-span-1 space-y-6">
            {/* updates list */}
            <div className="rounded-2xl p-5"
                 style={{
                   background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
                   border: "1px solid var(--stroke)",
                   backdropFilter: "blur(10px)",
                 }}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Güncellemeler</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ background: `${TEAL}14`, color: TEAL }}>
                  {updates.length}
                </span>
              </div>
              <ul className="mt-3 space-y-3">
                {updates.map((u, i) => (
                  <li key={i} className="rounded-xl p-3"
                      style={{ background: "rgba(20,21,23,0.04)" }}>
                    <div className="text-[11px]" style={{ color: "rgba(20,21,23,0.55)" }}>{u.date}</div>
                    <div className="text-sm" style={{ color: "rgba(20,21,23,0.85)" }}>{u.text}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* latest update video */}
            {video?.src && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.82)",
                  border: "1px solid var(--stroke)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="aspect-[16/9] bg-black">
                  {video.type === "mp4" ? (
                    <video controls className="w-full h-full object-cover">
                      <source src={video.src} type="video/mp4" />
                    </video>
                  ) : (
                    <iframe
                      src={video.src}
                      title={video.title || "Son İnşaat Güncellemesi"}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Sample data === */
const DEFAULT_PHASES: Phase[] = [
  { id: "1", title: "Satış Lansmanı", date: "2024 Q3", status: "done" },
  { id: "2", title: "Kazı & Temel", date: "2025 Q1–Q2", status: "done" },
  { id: "3", title: "Kaba İnşaat", date: "2025 Q3–2026 Q1", status: "current" },
  { id: "4", title: "Mekanik & Elektrik", date: "2026 Q2–Q3", status: "next" },
  { id: "5", title: "İç Mekân & Cephe", date: "2026 Q3–Q4", status: "next" },
  { id: "6", title: "Peyzaj & Teslim", date: "2027 Mayıs", status: "next" },
];

const DEFAULT_UPDATES: Update[] = [
  { date: "2025-08", text: "Kaba inşaat %55 seviyesine ulaştı." },
  { date: "2025-06", text: "Temel imalatları tamamlandı." },
];
