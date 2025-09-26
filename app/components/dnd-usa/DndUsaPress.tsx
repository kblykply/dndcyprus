// app/components/dnd-usa/DndUsaPress.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type PressItem = {
  id: string;
  logo: string; // media/award logo
  title: string;
  desc: string;
  href: string;
  date?: string;
  accent?: "teal" | "orange";
};

export default function DndUsaPress({
  title = "Basında & Ödüller",
  subtitle = "DND USA, basın yayın organlarında ve sektör ödüllerinde sıkça yer alıyor.",
  items = DEFAULT_ITEMS,
}: {
  title?: string;
  subtitle?: string;
  items?: PressItem[];
}) {
  return (
    <section
      aria-label="DND USA — Press & Recognition"
      className="relative overflow-hidden"
      style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >
      {/* brand wash */}
      <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
            background: `
                radial-gradient(28rem 20rem at 15% 0%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 100%, ${ORANGE}14, transparent 70%)
            `,
            }}
        />  

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {title}
          </h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.72)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* press grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const color = p.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.75))",
                  border: `1px solid ${color}33`,
                  boxShadow: `0 12px 28px ${color}22`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="p-5 flex-1 flex flex-col">
                  <div className="h-10 flex items-center">
                    <img
                      src={p.logo}
                      alt={p.title}
                      className="max-h-10 w-auto object-contain"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                  <p
                    className="mt-2 text-sm flex-1"
                    style={{ color: "rgba(20,21,23,0.7)" }}
                  >
                    {p.desc}
                  </p>
                  {p.date && (
                    <div
                      className="mt-3 text-xs"
                      style={{ color: "rgba(20,21,23,0.55)" }}
                    >
                      {p.date}
                    </div>
                  )}
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs px-4 py-2 rounded-full self-start"
                    style={{
                      background: `${color}14`,
                      color,
                      border: `1px solid ${color}33`,
                    }}
                  >
                    Haberi Oku
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sample Press & Awards ---------------- */
const DEFAULT_ITEMS: PressItem[] = [
  {
    id: "pr1",
    logo: "/logos/nytimes.png",
    title: "DND USA Massachusetts’te Yeni Proje Başlattı",
    desc: "New York Times, DND USA’nın Lexington’daki lüks konut projesini duyurdu.",
    href: "#",
    date: "2024",
    accent: "teal",
  },
  {
    id: "pr2",
    logo: "/logos/boston-globe.png",
    title: "Boston Globe Röportajı",
    desc: "Ozan Dökmecioğlu, ABD pazarındaki fırsatları ve büyüme stratejilerini paylaştı.",
    href: "#",
    date: "2023",
    accent: "orange",
  },
  {
    id: "pr3",
    logo: "/logos/award.png",
    title: "Best Developer Award",
    desc: "DND USA, yenilikçi tasarımlarıyla prestijli 'Best Developer Award' ödülünü kazandı.",
    href: "#",
    date: "2022",
    accent: "teal",
  },
];
