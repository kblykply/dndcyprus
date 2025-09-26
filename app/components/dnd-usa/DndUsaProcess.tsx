// app/components/dnd-usa/DndUsaProcess.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, ClipboardList, Hammer, Building, Handshake } from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Step = {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent?: "teal" | "orange";
};

export default function DndUsaProcess({
  title = "Süreç / Nasıl Çalışıyoruz",
  subtitle = "DND USA olarak yatırımcılarımız ve ev sahiplerimiz için şeffaf ve güvenilir bir süreç yürütüyoruz.",
  steps = DEFAULT_STEPS,
}: {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}) {
  return (
    <section
      aria-label="DND USA — Process"
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.72)" }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* steps */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const color = s.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="rounded-2xl p-6 flex flex-col items-start"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                  border: `1px solid ${color}33`,
                  boxShadow: `0 12px 28px ${color}22`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="p-2.5 rounded-xl mb-4"
                  style={{
                    background: `${color}14`,
                    border: `1px solid ${color}33`,
                    color,
                  }}
                >
                  {s.icon}
                </div>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "rgba(20,21,23,0.72)" }}
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

const DEFAULT_STEPS: Step[] = [
  {
    id: 1,
    title: "İhtiyaç Analizi",
    desc: "Müşteri beklentilerini, yatırım hedeflerini ve yaşam tarzı ihtiyaçlarını analiz ediyoruz.",
    icon: <ClipboardList className="w-5 h-5" />,
    accent: "teal",
  },
  {
    id: 2,
    title: "Arazi & Konsept",
    desc: "En uygun lokasyonları seçip projeler için yenilikçi tasarım konseptleri geliştiriyoruz.",
    icon: <Home className="w-5 h-5" />,
    accent: "orange",
  },
  {
    id: 3,
    title: "Planlama",
    desc: "Mimari detaylar, izin süreçleri ve proje finansmanını titizlikle planlıyoruz.",
    icon: <Hammer className="w-5 h-5" />,
    accent: "teal",
  },
  {
    id: 4,
    title: "İnşaat",
    desc: "Kaliteli malzemeler ve disiplinli iş yönetimiyle projelerimizi hayata geçiriyoruz.",
    icon: <Building className="w-5 h-5" />,
    accent: "orange",
  },
  {
    id: 5,
    title: "Teslim & Sonrası",
    desc: "Müşterilerimize anahtar tesliminden sonra da satış sonrası destek sunuyoruz.",
    icon: <Handshake className="w-5 h-5" />,
    accent: "teal",
  },
];
