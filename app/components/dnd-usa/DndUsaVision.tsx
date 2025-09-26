// app/components/dnd-usa/DndUsaVision.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Pillar = { title: string; desc: string; color: string };

const PILLARS: Pillar[] = [
  {
    title: "Güven & Şeffaflık",
    desc:
      "Karar alma ve raporlama süreçlerinde netlik; tedarikçi, müşteri ve yatırımcıyla güvene dayalı ilişkiler.",
    color: TEAL,
  },
  {
    title: "Sürdürülebilirlik",
    desc:
      "Malzeme seçimi, enerji verimliliği ve uzun ömürlü mimariyle çevresel etkiyi minimize eden yaklaşım.",
    color: ORANGE,
  },
  {
    title: "Yenilik & Tasarım",
    desc:
      "ABD pazar dinamiklerine uygun, fonksiyonel ve estetik çözümler; dijital araçlarla hızlanan proje yönetimi.",
    color: TEAL,
  },
  {
    title: "Müşteri Odaklılık",
    desc:
      "İhtiyaca göre kişiselleştirilen planlar, satış sonrası destek ve yaşam döngüsü boyunca değer yaratma.",
    color: ORANGE,
  },
];

export default function DndUsaVision({
  title = "Liderlik Felsefesi & Vizyon",
  subtitle = "DND USA, uluslararası deneyimi yerel beklentilerle birleştirerek; güvenilir, yenilikçi ve sürdürülebilir yaşam alanları üretir.",
  quote = {
    text:
      "Uzun vadeli kalite; tasarımda, uygulamada ve insan ilişkilerinde aynı anda mükemmelliği hedeflemekle başlar.",
    author: "DND USA",
  },
}: {
  title?: string;
  subtitle?: string;
  quote?: { text: string; author?: string };
}) {
  return (
    <section
      aria-label="DND USA — Liderlik Felsefesi & Vizyon"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
    >
      {/* brand gradient wash */}
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
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p className="mt-3 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.72)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* pillars grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                border: `1px solid ${p.color}33`,
                boxShadow: `0 10px 24px ${p.color}22`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${p.color}14`, color: p.color, border: `1px solid ${p.color}33` }}
              >
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: p.color }}
                />
                İlke
              </div>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(20,21,23,0.75)" }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* quote + mini metrics */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
              border: `1px solid ${TEAL}33`,
              boxShadow: `0 12px 28px ${TEAL}1f`,
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="text-3xl leading-none" style={{ color: ORANGE }}>“</span>
            <p className="mt-2 text-base sm:text-lg leading-relaxed" style={{ color: "rgba(20,21,23,0.86)" }}>
              {quote.text}
            </p>
            {quote.author ? (
              <footer className="mt-3 text-xs" style={{ color: "rgba(20,21,23,0.6)" }}>
                — {quote.author}
              </footer>
            ) : null}
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {[
              { k: "ABD & KKTC", v: "Çift Pazar Uzmanlığı", c: ORANGE },
              { k: "Kalite", v: "Uluslararası Standartlar", c: TEAL },
              { k: "İş Birliği", v: "Güçlü Tedarik Ağı", c: TEAL },
              { k: "Yaşam Değeri", v: "Uzun Vadeli Yaklaşım", c: ORANGE },
            ].map((m, i) => (
              <div
                key={m.k + i}
                className="rounded-xl p-4 text-left"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                  border: `1px solid ${m.c}33`,
                  boxShadow: `0 8px 18px ${m.c}22`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-[11px]" style={{ color: m.c }}>{m.k}</div>
                <div className="text-sm font-semibold mt-0.5">{m.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
