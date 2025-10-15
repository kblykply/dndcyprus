// app/components/mariachi/MariachiPerksSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants, type Easing } from "framer-motion";
import { BadgePercent, Crown, ShieldCheck, CheckCircle2 } from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE: Easing = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE },
  },
};

type ProjectPerk = {
  /** Proje adı (erişilebilirlik için; kart üzerinde başlık gösterilmez) */
  project: string;
  /** Kapak görseli (public/ yolu) */
  image: string;
  /** Görünecek logo (public/ yolu) — arka plan YOK */
  logo?: string;
  /** Projeye özel ek ayrıcalıklar (opsiyonel) */
  perks?: string[];
};

export default function MariachiPerksSection({
  title = "Üyelik & Sakin Ayrıcalıkları",
  subtitle = "DND Cyprus projelerinde yaşayanlar için Mariachi Beach Club’da özel avantajlar.",
  note = "Tüm DND rezidans sakinlerine: Mariachi Beach Club’a ÜCRETSİZ GİRİŞ + %10 İNDİRİM",
  projects = [
    { project: "La Joya", image: "/la-joya/2.jpg", logo: "/logos/lajoya.png" },
    { project: "La Joya Perla", image: "/perla/7.jpg", logo: "/logos/perla.png" },
    { project: "La Joya Perla II", image: "/perla-ii/1.jpg", logo: "/logos/perlaii.png" },
    { project: "Lagoon Verde", image: "/lagoon-verde/7.jpg", logo: "/logos/lagoon.png" },
  ],
  primaryCta = { label: "Rezervasyon Yap", href: "/reservations" },
  secondaryCta = { label: "Ayrıcalıkları Doğrula", href: "/membership" },
}: {
  title?: string;
  subtitle?: string;
  note?: string;
  projects?: ProjectPerk[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section
      aria-label="Mariachi Beach Club — Üyelik ve Sakin Ayrıcalıkları"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      {/* Gradyan aura (önceki estetikle uyumlu) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(39,149,155,0.22), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(241,92,52,0.16), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-12 lg:pb-16">
        {/* Üst alan */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-3xl"
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
            style={{ background: "#fff", border: `1px solid ${TEAL}33`, color: TEAL, boxShadow: `0 6px 14px ${TEAL}1f` }}
          >
            Sakin Ayrıcalıkları
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">{title}</h2>
          <p className="mt-3 text-base sm:text-lg" style={{ color: "#141517CC" }}>{subtitle}</p>

          {/* Genel not (cam/gradyan şerit) */}
          <div
            className="mt-5 rounded-2xl px-4 py-3 backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(39,149,155,0.16), rgba(241,92,52,0.12))",
              border: "1px solid rgba(255,255,255,0.26)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <BadgePercent className="h-4 w-4" style={{ color: ORANGE }} />
              <strong style={{ color: ORANGE }}>{note}</strong>
              <span className="text-[#141517B3]">(*Yerinde kimlik / residence doğrulaması gerekebilir.)</span>
            </div>
          </div>
        </motion.div>

        {/* PROJE KARTLARI — DAHA BÜYÜK, LOGO ÜST SOL (ARKA PLAN YOK) */}
        <div className="mt-10 grid gap-8 md:gap-10 sm:grid-cols-1 lg:grid-cols-2">
          {projects.map(({ project, image, logo, perks = [] }, i) => (
            <motion.article
              key={project + i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="relative rounded-[28px] overflow-hidden"
              style={{
                background: "#fff",
                border: `1px solid ${TEAL}1f`,
                boxShadow: "0 22px 54px rgba(0,0,0,0.10)",
              }}
            >
              {/* Kapak görseli — daha yüksek */}
              <div className="relative h-72 sm:h-80 lg:h-96">
                {image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-hidden
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    aria-hidden
                    style={{ background: "linear-gradient(135deg, rgba(39,149,155,0.20), rgba(241,92,52,0.14))" }}
                  />
                )}

                {/* Üstten gradyan (okunabilirlik) */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.28))" }}
                  aria-hidden
                />

                {/* LOGO — ÜST SOL, BÜYÜK, ARKA PLAN YOK (sadece drop-shadow) */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  {logo ? (
                    <>
                      <img
                        src={logo}
                        alt={`${project} logo`}
                        className="h-16 sm:h-20 lg:h-24 w-auto object-contain select-none pointer-events-none"
                        style={{ filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.35))" }}
                        draggable={false}
                      />
                      <span className="sr-only">{project}</span>
                    </>
                  ) : (
                    <>
                      <Crown
                        className="h-12 sm:h-14 lg:h-16 w-auto"
                        style={{ color: "#ffffff", filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.45))" }}
                      />
                      <span className="sr-only">{project}</span>
                    </>
                  )}
                </div>
              </div>

              {/* İçerik paneli — daha geniş boşluklar */}
              <div className="px-6 sm:px-7 lg:px-8 pt-5 pb-6 sm:pt-6 sm:pb-7">
                <ul className="space-y-3" role="list">
                  {/* Ortak iki ayrıcalık */}
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5" style={{ color: TEAL }} />
                    <span className="text-[15px] sm:text-base font-medium" style={{ color: "#141517" }}>
                      Mariachi Beach Club’a ücretsiz giriş
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgePercent className="h-5 w-5" style={{ color: ORANGE }} />
                    <span className="text-[15px] sm:text-base font-medium" style={{ color: "#141517" }}>
                      Yiyecek & içecekte %10 indirim
                    </span>
                  </li>

                  {/* Projeye özel ek notlar (opsiyonel) */}
                  {perks.map((p, j) => (
                    <li key={p + j} className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5" style={{ color: TEAL }} />
                      <span className="text-sm sm:text-[15px]" style={{ color: "#141517B3" }}>
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA’lar */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={primaryCta.href}
            className="px-7 py-3 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: TEAL, color: "#fff", boxShadow: `0 12px 28px ${TEAL}55` }}
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="px-7 py-3 rounded-full text-sm font-medium"
            style={{ background: "#fff", color: ORANGE, border: `1px solid ${ORANGE}55`, boxShadow: `0 8px 20px ${ORANGE}14` }}
          >
            {secondaryCta.label}
          </Link>
        </div>

        {/* Dipnot */}
        <p className="mt-5 text-xs" style={{ color: "#14151799" }}>
          *Ayrıcalıklar kampanya ve sezon koşullarına göre güncellenebilir. Yerinde kimlik & residence doğrulaması gerekebilir.
        </p>
      </div>
    </section>
  );
}
