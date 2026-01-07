// app/components/office/TurkiyeOfficeValueCards.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

type Card = {
  title: string;
  desc: string;
  tone?: "teal" | "orange" | "neutral";
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  cards?: Card[];
};

export default function TurkiyeOfficeValueCards({
  kicker = "Türkiye Ofisi",
  title = "Türkiye ofisi ne yapar?",
  subtitle = "Türkiye’den hızlı iletişim, net bilgilendirme ve uçtan uca süreç desteğiyle yatırım yolculuğunuzu kolaylaştırır.",
  cards = [
    {
      title: "Türkiye’den yatırım danışmanlığı",
      desc: "İhtiyacınıza ve bütçenize göre doğru projeyi ve daire tipini birlikte belirleriz.",
      tone: "teal",
    },
    {
      title: "Online / yüz yüze görüşme",
      desc: "Türkiye’de ekibimizle görüşebilir; online toplantıyla tüm detayları hızlıca netleştirebilirsiniz.",
      tone: "neutral",
    },
    {
      title: "Uygunluk & rezervasyon desteği",
      desc: "Uygun daire kontrolü, opsiyon/rezervasyon adımları ve gerekli evrak akışında yanınızdayız.",
      tone: "orange",
    },
    {
      title: "Ödeme planı & kampanya bilgilendirmesi",
      desc: "Güncel kampanyalar, taksit seçenekleri ve ödeme planlarını şeffaf şekilde paylaşırız.",
      tone: "neutral",
    },
  ],
}: Props) {
  const toneStyle = (tone?: Card["tone"]) => {
    if (tone === "teal") {
      return {
        badgeBg: `${TEAL}14`,
        badgeColor: TEAL,
        badgeBorder: `${TEAL}33`,
        glow: `0 14px 40px ${TEAL}14`,
      };
    }
    if (tone === "orange") {
      return {
        badgeBg: `${ORANGE}14`,
        badgeColor: ORANGE,
        badgeBorder: `${ORANGE}33`,
        glow: `0 14px 40px ${ORANGE}14`,
      };
    }
    return {
      badgeBg: "rgba(255,255,255,0.70)",
      badgeColor: "rgba(20,21,23,0.70)",
      badgeBorder: "rgba(20,21,23,0.10)",
      glow: "0 14px 40px rgba(0,0,0,0.05)",
    };
  };

  return (
    <section
      aria-label="Türkiye Ofisi — Değer Kartları"
      className="relative bg-white"
      style={{ color: "#141517" }}
      data-bg="light"
    >
      {/* Soft glows like your language */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(42rem 28rem at 0% 0%, ${TEAL}10, transparent 70%),
            radial-gradient(42rem 28rem at 100% 100%, ${ORANGE}10, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-3xl"
        >
          {kicker && (
            <span
              className="inline-block text-[12px] uppercase tracking-wide px-3 py-1 rounded-full mb-4"
              style={{
                background: `${TEAL}14`,
                color: TEAL,
                border: `1px solid ${TEAL}33`,
              }}
            >
              {kicker}
            </span>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-black/70 max-w-[70ch]">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, idx) => {
            const t = toneStyle(c.tone);
            return (
              <motion.div
                key={c.title + idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className="group rounded-2xl border bg-white/70 backdrop-blur-sm p-6 shadow-[0_10px_30px_rgba(0,0,0,.06)] transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "rgba(20,21,23,0.10)",
                  boxShadow: t.glow,
                }}
              >
                {/* tiny accent line */}
                <div
                  className="h-1 w-12 rounded-full mb-5"
                  style={{
                    background:
                      c.tone === "teal"
                        ? TEAL
                        : c.tone === "orange"
                        ? ORANGE
                        : "rgba(20,21,23,0.18)",
                    opacity: 0.9,
                  }}
                />

                <div
                  className="inline-flex items-center text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full border"
                  style={{
                    background: t.badgeBg,
                    color: t.badgeColor,
                    borderColor: t.badgeBorder,
                  }}
                >
                  Destek
                </div>

                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/65">
                  {c.desc}
                </p>

                {/* micro hover hint */}
                <div className="mt-5 flex items-center gap-2 text-xs text-black/45">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        c.tone === "teal"
                          ? TEAL
                          : c.tone === "orange"
                          ? ORANGE
                          : "rgba(20,21,23,0.25)",
                    }}
                  />
                  Net bilgilendirme • Hızlı geri dönüş
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
