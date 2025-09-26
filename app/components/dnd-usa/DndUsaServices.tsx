// app/components/dnd-usa/DndUsaServices.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Ruler, Briefcase, Home } from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const SERVICES = [
  {
    title: "Gayrimenkul Geliştirme",
    desc: "Massachusetts’te modern yaşam projeleri geliştiriyor, uluslararası deneyimimizi ABD pazarına taşıyoruz.",
    icon: Building2,
    accent: TEAL,
  },
  {
    title: "Mimari & Tasarım",
    desc: "Yenilikçi tasarım anlayışıyla fonksiyonel, estetik ve sürdürülebilir yaşam alanları sunuyoruz.",
    icon: Ruler,
    accent: ORANGE,
  },
  {
    title: "Proje Danışmanlığı",
    desc: "Yatırım, finansal planlama ve operasyonel süreçlerde kapsamlı danışmanlık sağlıyoruz.",
    icon: Briefcase,
    accent: TEAL,
  },
  {
    title: "Satış & Yönetim",
    desc: "Tamamlanan projelerde satış desteği ve mülk yönetimi hizmetleri sunarak müşteri memnuniyetini garanti ediyoruz.",
    icon: Home,
    accent: ORANGE,
  },
];

export default function DndUsaServices() {
  return (
    <section
      aria-label="DND USA Services"
      className="relative overflow-hidden"
      style={{ background: "#fff", color: "#141517" }}
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Uzmanlık Alanlarımız
          </h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p
            className="mt-3 text-base sm:text-lg"
            style={{ color: "rgba(20,21,23,0.72)" }}
          >
            DND USA, tasarımdan satışa kadar geniş bir yelpazede hizmet
            sunarak gayrimenkul yatırımlarınızı güvenle şekillendirir.
          </p>
        </motion.div>

        {/* services grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl backdrop-blur-lg transition-transform hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                border: `1px solid ${s.accent}33`,
                boxShadow: `0 8px 18px ${s.accent}22`,
              }}
            >
              <s.icon size={32} style={{ color: s.accent }} />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "rgba(20,21,23,0.72)" }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
