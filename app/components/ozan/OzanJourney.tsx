    // app/components/about/OzanJourney.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Step = {
  id: string;
  period: string;     // "1993–1999" | "2010–2016" | "Günümüz"
  title: string;      // "Finans Liderliği" | "Kurucu, DND Cyprus" ...
  org?: string;       // "Kellogg" | "Kraft Foods" | "DND Cyprus"
  location?: string;  // "İstanbul / KKTC" ...
  summary?: string;   // 1–2 cümle açıklama
  badges?: string[];  // ["M&A", "Bütçe", "Bölgesel Ölçek"]
};

type Props = {
  title?: string;
  subtitle?: string;
  steps?: Step[];
  highlights?: string[]; // kısa başarı/odak listesi
};

export default function OzanJourney({
  title = "Profesyonel Yolculuk",
  subtitle = "Kariyer adımları, liderlik rolleri ve girişimcilik deneyimi.",
  // ⚠️ Bu verileri kendi doğrulanmış tarihlerinizle güncelleyin:
  steps = DEFAULT_STEPS,
  highlights = [
    "Çok uluslu şirketlerde finans ve strateji yönetimi",
    "Bölgesel büyüme ve yatırım projeleri",
    "DND Cyprus ile gayrimenkul geliştirme ve proje liderliği",
  ],
}: Props) {
  return (
    <section
      aria-label="Ozan Dökmecioğlu — Profesyonel Yolculuk"
      className="relative overflow-hidden"
      style={{
  background: "#ffffff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >
      {/* subtle brand wash */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <ol className="relative pl-6">
              {/* vertical line */}
              <span
                aria-hidden
                className="absolute left-2 top-0 bottom-0 w-0.5"
                style={{ background: "rgba(20,21,23,0.12)" }}
              />
              {steps.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative ml-0 mb-6 last:mb-0"
                >
                  {/* Dot */}
                  <span
                    className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full"
                    style={{
                      background: i === 0 ? ORANGE : TEAL,
                      boxShadow: i === 0 ? `0 0 0 6px ${ORANGE}18` : "none",
                    }}
                  />
                  {/* Card */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                      border: "1px solid var(--stroke)",
                      boxShadow:
                        "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "rgba(20,21,23,0.78)",
                          border: "1px solid var(--stroke)",
                        }}
                      >
                        {s.period}
                      </span>
                      {s.org && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{
                            background: `${TEAL}14`,
                            color: TEAL,
                            border: `1px solid ${TEAL}33`,
                          }}
                        >
                          {s.org}
                        </span>
                      )}
                      {s.location && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{
                            background: `${ORANGE}14`,
                            color: ORANGE,
                            border: `1px solid ${ORANGE}33`,
                          }}
                        >
                          {s.location}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-base sm:text-lg font-semibold">{s.title}</h3>

                    {s.summary && (
                      <p className="mt-1 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>
                        {s.summary}
                      </p>
                    )}

                    {s.badges?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.badges.map((b, bi) => (
                          <span
                            key={bi}
                            className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              color: "rgba(20,21,23,0.85)",
                              border: "1px solid var(--stroke)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Highlights rail */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="text-base font-semibold">Öne Çıkanlar</h3>
              <ul className="mt-3 space-y-2">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: i % 2 === 0 ? TEAL : ORANGE }}
                    />
                    <span className="text-sm" style={{ color: "rgba(20,21,23,0.78)" }}>
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px]" style={{ color: "rgba(20,21,23,0.55)" }}>
                * Bilgiler vitrindir; resmi özgeçmiş için kurumsal kaynakları referans alınız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Edit this with verified dates/details ===== */
const DEFAULT_STEPS: Step[] = [
  {
    id: "now",
    period: "Günümüz",
    title: "Kurucu & Yönetim Kurulu Başkanı",
    org: "DND Cyprus",
    location: "Kuzey Kıbrıs / Uluslararası",
    summary:
      "Gayrimenkul geliştirme, yatırım ve stratejik ortaklıklar; sahil şeridi ve kentsel projelerde liderlik.",
    badges: ["Gayrimenkul Geliştirme", "Yatırım", "Strateji"],
  },
  {
    id: "corp2",
    period: "Öncesi",
    title: "Kıdemli Finans / Yönetim Roller",
    org: "Çok uluslu hızlı tüketim ve gıda şirketleri",
    location: "Avrupa / MENA",
    summary:
      "Bölgesel bütçe ve planlama, kârlılık optimizasyonu, dönüşüm projeleri ve büyüme programları.",
    badges: ["Bütçe & Planlama", "Büyüme", "Dönüşüm"],
  },
  {
    id: "edu",
    period: "Eğitim",
    title: "Lisans & Sertifika",
    org: "ODTÜ (İşletme) • (Sert.) Investment Appraisal & Risk Analysis",
    location: "Ankara / (Uluslararası Program)",
    summary:
      "İşletme temeli ve yatırım karar metodolojileri; finansal modelleme ve risk analizine odak.",
    badges: ["Finans", "Yatırım Analizi"],
  },
];
