// app/components/dnd-usa/DndUsaSustainability.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Recycle, Award, ShieldCheck } from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Point = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent?: "teal" | "orange";
};

export default function DndUsaSustainability({
  title = "Sürdürülebilirlik & Kalite",
  subtitle = "Projelerimizde çevreye duyarlı çözümleri kaliteyle birleştiriyoruz.",
  points = DEFAULT_POINTS,
  image = "/dndprojects.jpg",
}: {
  title?: string;
  subtitle?: string;
  points?: Point[];
  image?: string;
}) {
  return (
    <section
      aria-label="DND USA — Sustainability & Quality"
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
                radial-gradient(28rem 20rem at 15% 100%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 0%, ${ORANGE}14, transparent 70%)
            `,
            }}
        />  

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid gap-10 lg:grid-cols-2 items-center">
        {/* text content */}
        <motion.div
          initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p
            className="mt-3 text-sm sm:text-base max-w-lg"
            style={{ color: "rgba(20,21,23,0.72)" }}
          >
            {subtitle}
          </p>

          <ul className="mt-6 space-y-4">
            {points.map((p, i) => {
              const color = p.accent === "orange" ? ORANGE : TEAL;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{
                      background: `${color}14`,
                      border: `1px solid ${color}33`,
                      color,
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{p.title}</h3>
                    <p className="text-xs mt-1" style={{ color: "rgba(20,21,23,0.7)" }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* image */}
        <motion.div
          initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid var(--stroke)",
            boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={image}
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

const DEFAULT_POINTS: Point[] = [
  {
    title: "Çevre Dostu Malzemeler",
    desc: "Enerji verimli ve geri dönüştürülebilir malzemeler kullanıyoruz.",
    icon: <Leaf className="w-4 h-4" />,
    accent: "teal",
  },
  {
    title: "Enerji Verimliliği",
    desc: "Güneş panelleri ve akıllı enerji çözümleriyle düşük karbon ayak izi.",
    icon: <Recycle className="w-4 h-4" />,
    accent: "orange",
  },
  {
    title: "Kalite Sertifikaları",
    desc: "LEED ve ENERGY STAR gibi uluslararası sertifikalara uygun projeler.",
    icon: <Award className="w-4 h-4" />,
    accent: "teal",
  },
  {
    title: "Uzun Ömürlü Yapılar",
    desc: "Deprem yönetmeliklerine uygun, dayanıklı ve güvenli inşaat teknikleri.",
    icon: <ShieldCheck className="w-4 h-4" />,
    accent: "orange",
  },
];
