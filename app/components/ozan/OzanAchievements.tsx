// app/components/about/OzanAchievements.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Metric = { label: string; value: string; note?: string };
type Award = { year?: string; title: string; org?: string; note?: string; accent?: "teal" | "orange" };
type Press = { title: string; outlet: string; href?: string; year?: string };
type Company = { name: string; role: string; logo: string };

export default function OzanAchievements({
  title = "Başarılar & Öne Çıkanlar",
  subtitle = "Finans ve uluslararası yönetimde elde edilen kilometre taşları.",
  metrics = DEFAULT_METRICS,
  awards = DEFAULT_AWARDS,
  companies = DEFAULT_COMPANIES,
  press = DEFAULT_PRESS,
}: {
  title?: string;
  subtitle?: string;
  metrics?: Metric[];
  awards?: Award[];
  companies?: Company[];
  press?: Press[];
}) {
  return (
   <section
  aria-label="Ozan Dökmecioğlu — Başarılar"
  className="relative overflow-hidden"
  style={{ background: "#ffffff", color: "#141517" }}
>
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

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-18 lg:py-24">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
        Başarılar & Öne Çıkanlar
      </h2>
      <div className="mt-1 h-1 w-14 rounded-full" style={{ background: TEAL }} />
      <p className="mt-3 text-sm sm:text-base opacity-80">
        Finans ve uluslararası yönetimde elde edilen kilometre taşları.
      </p>
    </motion.div>

    {/* Metrics */}
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((m, i) => {
        const color = i % 2 === 0 ? TEAL : ORANGE;
        return (
          <motion.div
            key={m.label + i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="rounded-2xl px-4 py-5 text-center transition-transform duration-300 hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))",
              border: `1px solid ${color}44`,
              boxShadow: `0 8px 20px ${color}22`,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-xl sm:text-2xl font-semibold leading-none">
              {m.value}
            </div>
            <div className="mt-1 text-xs" style={{ color }}>{m.label}</div>
            {m.note && (
              <div className="mt-0.5 text-[11px] opacity-70">{m.note}</div>
            )}
          </motion.div>
        );
      })}
    </div>

    {/* Company Logos */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="mt-12"
    >
      <h3 className="text-base font-semibold">Kariyer</h3>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {companies.map((c, i) => {
          const color = i % 2 === 0 ? TEAL : ORANGE;
          return (
            <div
              key={c.name + i}
              className="group rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                border: `1px solid ${color}55`,
                boxShadow: `0 12px 24px ${color}22`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="relative w-20 h-12 mb-3 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={c.logo}
                  alt={c.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="text-xs font-medium">{c.name}</div>
              <div className="text-[11px] opacity-70">{c.role}</div>
              <span
                className="mt-3 h-0.5 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: color }}
              />
            </div>
          );
        })}
      </div>
    </motion.div>

    {/* Awards + Press... (use same brand colors for borders/shadows) */}
  </div>
</section>

  );
}

/* ======= Sample data ======= */
const DEFAULT_METRICS: Metric[] = [
  { value: "CFO", label: "Keurig Dr Pepper", note: "President, International" },
  { value: "VP CFO", label: "Kellogg", note: "NA & Europe" },
  { value: "Liderlik", label: "Kraft • Cargill • Andersen" },
  { value: "ODTÜ", label: "İşletme Lisans" },
  { value: "Harvard", label: "Investment & Appraisal" },
  { value: "Ödül", label: "Best CFO of the Year" },
];

const DEFAULT_AWARDS: Award[] = [
  {
    title: "Başarılı Kurumsal Dönüşüm",
    org: "Keurig Dr Pepper",
    note: "CFO & President, International rolünde büyüme ve entegrasyon.",
    accent: "teal",
  },
  {
    title: "Bölgesel Finans Liderliği",
    org: "Kellogg",
    note: "North America & Europe CFO görevlerinde kârlılık ve ölçek yönetimi.",
    accent: "orange",
  },
];

const DEFAULT_COMPANIES: Company[] = [
  { name: "Keurig Dr Pepper", role: "CFO & President, International", logo: "/Keurig_Dr_Pepper.png" },
  { name: "Kellogg", role: "VP Finance, CFO NA & Europe", logo: "/Kellogg's-Logo.png" },
  { name: "Kraft Foods", role: "Finance Leadership", logo: "/Kraft_logo_2012.png" },
  { name: "Cargill", role: "Finance Roles", logo: "/Cargill_logo.png" },
  { name: "Arthur Andersen", role: "Career Start", logo: "/Arthur_Andersen_(ancien).png" },
];

const DEFAULT_PRESS: Press[] = [
  { title: "Küresel CFO bakış açısıyla değer yaratma", outlet: "Business Interview" },
  { title: "Uluslararası genişlemede finansal disiplin", outlet: "Industry Journal" },
];
