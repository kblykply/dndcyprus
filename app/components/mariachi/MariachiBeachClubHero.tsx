// app/components/mariachi/MariachiBeachClubHero.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants, type Easing, rgbUnit } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE: Easing = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

type CTA = { label: string; href: string };
type Props = {
  /** Başlık */
  title?: string;
  /** Kısa açıklama */
  subtitle?: string;
  /** Küçük rozet metni */
  badge?: string;
  /** Arka plan video kaynağı (MP4/WebM) — otomatik oynatılır */
  videoSrc?: string | null;
  /** Video yoksa veya poster olarak kullanılacak görsel */
  bgImage?: string;
  /** Okunabilirlik için koyu katman opaklığı (0–1) */
  overlayOpacity?: number;
  /** Birincil çağrı-aksiyon düğmesi */
  primaryCta?: CTA;
  /** İkincil çağrı-aksiyon düğmesi */
  secondaryCta?: CTA;
  /** Kısa vurgu etiketleri */
  highlights?: string[];
};

export default function MariachiBeachClubHero({
  title = "Mariachi Beach Club",
  subtitle = "Akdeniz güneşiyle Latin ritmini buluşturan; pavilyon konforu, gün boyu plaj keyfi ve akşam DJ performanslarıyla ayrıcalıklı bir deneyim.",
  badge = "Plaj Kulübü",
  videoSrc = "/mariachi/hero.mp4",
  bgImage = "/mariachi/7.jpg",
  overlayOpacity = 0.35,
  primaryCta = { label: "Pavilyon Rezervasyonu", href: "/contact" },
  secondaryCta = { label: "Menüyü Görüntüle", href: "/contact" },
  highlights = ["Havuz & Plaj", "Pavilyonlar", "Restoran & Havuz Barı", "DJ Geceleri"],
}: Props) {
  return (
    <section
      aria-label="Mariachi Beach Club — Kahraman Bölüm"
      className="relative isolate overflow-hidden min-h-[100svh] md:min-h-screen"
      style={{ color: "#fff", background: "#000" }}
      data-bg="dark"
    >
      {/* Arka plan medya */}
      <div className="absolute inset-0 -z-10">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={bgImage}
          >
            <source src={videoSrc} />
          </video>
        ) : (
          <div
            aria-hidden
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        {/* Okunabilirlik katmanı */}
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlayOpacity ?? 0.35})` }}
        />
        {/* Yumuşak renk vinyeti */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 70% at 70% 0%, rgba(39,149,155,0.25), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
          }}
        />
      </div>

      {/* İçerik sarmalayıcı: 100vh ve dikey ortalama */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[100svh] md:min-h-screen flex items-center pt-24 pb-16 sm:pt-28 sm:pb-24">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-3xl"
        >
          {/* Cam efekti panel */}
          <motion.div
            variants={fadeUp}
            className="rounded-3xl p-6 sm:p-8 backdrop-blur-xl border shadow-[0_20px_60px_rgba(0,0,0,.45)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))",
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <span
              className="inline-block text-[11px] uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                color:  "rgba(220, 220, 220, 1)",

              }}
            >
              {badge}
            </span>

            <h1 className="mt-3 text-4xl sm:text-5xl font-semibold leading-tight drop-shadow">
              {title}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-white/90 max-w-[60ch]">
              {subtitle}
            </p>

            {/* Vurgu etiketleri */}
            {highlights?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {highlights.map((t, i) => (
                  <li
                    key={t + i}
                    className="px-3 py-1.5 rounded-full text-sm"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.18)",
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Eylem düğmeleri */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={primaryCta.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: TEAL, color: "#fff", boxShadow: `0 12px 28px ${TEAL}66` }}
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium"
                style={{ background: "rgba(255,255,255,0.08)", color:"rgba(255, 255, 255, 0.76)", border: `1px solid ${ORANGE}55` }}
              >
                {secondaryCta.label}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
