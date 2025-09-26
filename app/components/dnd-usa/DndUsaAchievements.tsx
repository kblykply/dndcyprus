// app/components/dnd-usa/DndUsaAchievements.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Metric = { label: string; value: string; note?: string };
type Award  = { year?: string; title: string; org?: string; note?: string; accent?: "teal" | "orange" };
type Logo   = { name: string; logo: string }; // partner/client badges
type Press  = { title: string; outlet: string; href?: string; year?: string };

export default function DndUsaAchievements({
  title = "Başarılar & Öne Çıkanlar",
  subtitle = "ABD’de konut geliştirme odağımızla kalite, güven ve tasarımda elde ettiğimiz kilometre taşları.",
  metrics = DEFAULT_METRICS,
  awards = DEFAULT_AWARDS,
  partners = DEFAULT_PARTNERS,
  press = DEFAULT_PRESS,
  showCta = true,
  ctaLabel = "Projelerimizi İnceleyin",
  ctaHref = "/projects",
}: {
  title?: string;
  subtitle?: string;
  metrics?: Metric[];
  awards?: Award[];
  partners?: Logo[];
  press?: Press[];
  showCta?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section
      aria-label="DND USA — Başarılar & Öne Çıkanlar"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517", ["--stroke" as any]: "rgba(20,21,23,0.10)" }}
    >
      {/* brand wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(42rem 30rem at 8% 90%, ${TEAL}10, transparent 70%),
            radial-gradient(36rem 30rem at 90% 5%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-18 lg:py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.70)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* metrics */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((m, i) => {
            const color = i % 2 === 0 ? TEAL : ORANGE;
            return (
              <motion.div
                key={m.label + i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl px-4 py-5 text-center"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))",
                  border: `1px solid ${color}33`,
                  boxShadow: `0 20px 40px ${color}1f, inset 0 1px rgba(255,255,255,0.7)`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-xl sm:text-2xl font-semibold leading-none">{m.value}</div>
                <div className="mt-1 text-xs" style={{ color }}>{m.label}</div>
                {m.note ? (
                  <div className="mt-0.5 text-[11px]" style={{ color: "rgba(20,21,23,0.6)" }}>
                    {m.note}
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        {/* highlight award */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-10 rounded-3xl p-6 lg:p-8"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.72))",
            border: "1px solid var(--stroke)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div
                className="inline-flex text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: `${ORANGE}16`, color: ORANGE, border: `1px solid ${ORANGE}30` }}
              >
                Öne Çıkan Başarı
              </div>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold">
                ABD Pazarında Ölçeklenebilir Konut Geliştirme Yetkinliği
              </h3>
              <p className="mt-1 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>
                Tasarımdan satışa uçtan uca kalite ve sürdürülebilirlik kriterleriyle teslim edilen projeler.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
              >
                Massachusetts
              </span>
              <span
                className="text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}
              >
                DND USA
              </span>
            </div>
          </div>
        </motion.div>

        {/* awards list */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {awards.map((a, i) => {
            const color = a.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.article
                key={(a.title || "a") + i}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
                  border: `1px solid ${color}33`,
                  boxShadow: `0 16px 34px ${color}1f, inset 0 1px rgba(255,255,255,0.7)`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {a.year ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}>
                      {a.year}
                    </span>
                  ) : null}
                  {a.org ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                      {a.org}
                    </span>
                  ) : null}
                </div>
                <h4 className="mt-2 text-base sm:text-lg font-semibold">{a.title}</h4>
                {a.note ? (
                  <p className="mt-1 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>{a.note}</p>
                ) : null}
              </motion.article>
            );
          })}
        </div>

        {/* partner/client logos */}
        {partners.length ? (
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-12"
          >
            <h3 className="text-base font-semibold">İş Ortakları & Tedarikçiler</h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.map((p, i) => {
                const color = i % 2 === 0 ? TEAL : ORANGE;
                return (
                  <div
                    key={p.name + i}
                    className="group rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                      border: `1px solid ${color}44`,
                      boxShadow: `0 12px 24px ${color}22`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="mt-2 text-[11px] opacity-80">{p.name}</div>
                    <span className="mt-2 h-0.5 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                          style={{ background: color }} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : null}

        {/* press */}
        {press.length ? (
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 rounded-2xl p-5"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
              border: "1px solid var(--stroke)",
              boxShadow: "0 16px 34px rgba(0,0,0,0.06)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Basında</h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}>
                {press.length}
              </span>
            </div>
            <ul className="mt-3 divide-y" style={{ borderColor: "rgba(20,21,23,0.1)" }}>
              {press.map((p, i) => (
                <li key={p.title + i} className="py-3">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between">
                      <span className="text-sm sm:text-base group-hover:underline">{p.title}</span>
                      <span className="text-xs opacity-70">{p.outlet}{p.year ? ` • ${p.year}` : ""}</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base">{p.title}</span>
                      <span className="text-xs opacity-70">{p.outlet}{p.year ? ` • ${p.year}` : ""}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        {/* CTA */}
        {showCta && (
          <div className="mt-10 text-center">
            <a
              href={ctaHref}
              className="inline-block rounded-full px-6 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{
                background: TEAL,
                color: "#fff",
                border: `1px solid ${TEAL}55`,
                boxShadow: `0 12px 28px ${TEAL}44`,
              }}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* =================== Defaults (edit freely) =================== */
const DEFAULT_METRICS: Metric[] = [
  { value: "30+", label: "Yıl Deneyim", note: "ABD & KKTC projeleri" },
  { value: "10+", label: "Tamamlanan Proje" },
  { value: "A+", label: "Malzeme / İşçilik" },
  { value: "LEED", label: "Sürdürülebilirlik Odağı" },
  { value: "7/24", label: "Müşteri Desteği" },
  { value: "AAA", label: "Tedarikçi Ağı" },
];

const DEFAULT_AWARDS: Award[] = [
  { year: "—", title: "Yüksek Memnuniyet Skoru", org: "Müşteri Anketleri", note: "Satış sonrası destek & şeffaf iletişim", accent: "teal" },
  { year: "—", title: "Mükemmel Tasarım Uygulamaları", org: "DND USA İç Değ.", note: "Fonksiyonel ve estetik planlar", accent: "orange" },
];

const DEFAULT_PARTNERS: Logo[] = [
  { name: "Local Architect", logo: "/logos/partner-architect.svg" },
  { name: "Materials Co.", logo: "/logos/partner-materials.svg" },
  { name: "Finance Group", logo: "/logos/partner-finance.svg" },
  { name: "City Permits", logo: "/logos/partner-permits.svg" },
  { name: "Energy Tech", logo: "/logos/partner-energy.svg" },
  { name: "Home Systems", logo: "/logos/partner-systems.svg" },
];

const DEFAULT_PRESS: Press[] = [
  { title: "Massachusetts’te Yeni Konut Standardı", outlet: "Real Estate Review", year: "2024", href: "#" },
  { title: "Sürdürülebilir Tasarımda DND Yaklaşımı", outlet: "Design Today", year: "2023", href: "#" },
];
