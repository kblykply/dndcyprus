// app/components/dnd-usa/DndUsaStrengths.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe2, ShieldCheck, Users, Award } from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Strength = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent?: "teal" | "orange";
};

export default function DndUsaStrengths({
  title = "Neden DND USA?",
  subtitle = "Yatırımcılarımız ve ev sahiplerimiz için güvenilir, yenilikçi ve uluslararası deneyimle güçlendirilmiş çözümler sunuyoruz.",
  strengths = DEFAULT_STRENGTHS,
}: {
  title?: string;
  subtitle?: string;
  strengths?: Strength[];
}) {
  return (
    <section
      aria-label="DND USA Strengths"
      className="relative overflow-hidden"
      style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >
      {/* background brand wash */}
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
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.72)" }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((s, i) => {
            const color = s.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="p-6 rounded-2xl flex flex-col items-start hover:-translate-y-1 transition-transform"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                  border: `1px solid ${color}33`,
                  boxShadow: `0 10px 24px ${color}22`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: `${color}14`,
                    border: `1px solid ${color}33`,
                    color,
                  }}
                >
                  {s.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "rgba(20,21,23,0.7)" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Default strengths ---------------- */
const DEFAULT_STRENGTHS: Strength[] = [
  {
    title: "Uluslararası Deneyim",
    desc: "ABD ve Kuzey Kıbrıs’ta güçlü bir portföyle, farklı pazarlarda uzmanlık.",
    icon: <Globe2 className="w-5 h-5" />,
    accent: "teal",
  },
  {
    title: "Güven & İstikrar",
    desc: "Uzun vadeli yatırımlarda şeffaf, güvenilir ve istikrarlı yaklaşım.",
    icon: <ShieldCheck className="w-5 h-5" />,
    accent: "orange",
  },
  {
    title: "Müşteri Odaklılık",
    desc: "Müşteri ihtiyaçlarını önceliklendirerek beklentilerin ötesinde çözümler.",
    icon: <Users className="w-5 h-5" />,
    accent: "teal",
  },
  {
    title: "Kalite & Ödüller",
    desc: "Uluslararası standartlarda inşaat kalitesi ve sektör ödülleri.",
    icon: <Award className="w-5 h-5" />,
    accent: "orange",
  },
];
