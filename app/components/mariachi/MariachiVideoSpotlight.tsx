// app/components/mariachi/MariachiVideoSpotlight.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";

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

export default function MariachiVideoSpotlight({
  title = "Tanıtım Videosu",
  subtitle = "Mariachi Beach Club atmosferini kısa bir videoda keşfedin: cabanalar, havuz & plaj, gün boyu keyif ve akşam DJ performansları.",
  badge = "VIDEO",
  // YouTube/Vimeo gömme bağlantısı (tercih: youtube-nocookie)
  embedUrl ="https://www.youtube.com/embed/AobeR8p2Aq4?si=Z_AaUhavwKNYLgNX",
  // Yerel video kullanmak isterseniz embedUrl'i null yapın:
  videoSrc = "",
  poster = "/mariachi/1.jpg",
  primaryCta = { label: "Cabana Rezervasyonu", href: "/reservations" },
  secondaryCta = { label: "Tüm Videolar", href: "/videos" },
  highlights = [
    { k: "Deneyim", v: "Gün boyu & Gece" },
    { k: "Alanlar", v: "Plaj • Havuz • Cabanalar" },
    { k: "Yiyecek/İçecek", v: "Restoran & Havuz Barı" },
  ],
}: {
  title?: string;
  subtitle?: string;
  badge?: string;
  embedUrl?: string | null;
  videoSrc?: string;
  poster?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  highlights?: { k: string; v: string }[];
}) {
  return (
    <section
      aria-label="Mariachi Beach Club — Tanıtım Videosu"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      {/* Dekoratif ışık halkaları (cam/ışıltı hissi) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(39,149,155,0.20), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(241,92,52,0.15), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-12 lg:pb-18">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "#fff",
            border: `1px solid ${TEAL}33`,
            color: TEAL,
            boxShadow: `0 6px 14px ${TEAL}1f`,
          }}
        >
          {badge}
        </motion.span>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 items-stretch">
          {/* SOL: Video kutusu */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="relative order-2 lg:order-1 lg:col-span-7"
          >
            {/* Cam/ışık vurgusu arka planı */}
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[28px] blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(39,149,155,0.18), rgba(241,92,52,0.12))",
                opacity: 0.7,
              }}
            />
            {/* Asıl video çerçevesi */}
            <div
              className="relative w-full aspect-video rounded-[22px] overflow-hidden bg-white"
              style={{
                border: `1px solid ${TEAL}29`,
                boxShadow:
                  "0 18px 40px rgba(0,0,0,0.10), 0 10px 24px rgba(39,149,155,0.12)",
              }}
            >
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : videoSrc ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  poster={poster}
                >
                  <source src={videoSrc} />
                </video>
              ) : (
                <img
                  src={poster}
                  alt="Mariachi Beach Club Tanıtım"
                  className="absolute inset-0 h-full w-full object-cover"
                  decoding="async"
                />
              )}
            </div>
          </motion.div>

          {/* SAĞ: Metin ve içerik */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="flex flex-col justify-center order-1 lg:order-2 lg:col-span-5"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h2>

            <p className="mt-3 text-base sm:text-lg" style={{ color: "#141517CC" }}>
              {subtitle}
            </p>

            {/* Bilgi kartları — saf beyaz kutular, renkli kenar / gölge */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {highlights.map((f, i) => (
                <div
                  key={f.k + i}
                  className="rounded-2xl px-4 py-3 bg-white"
                  style={{
                    border: `1px solid ${TEAL}26`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    className="text-[11px] uppercase tracking-wide"
                    style={{ color: TEAL }}
                  >
                    {f.k}
                  </div>
                  <div className="text-sm font-medium" style={{ color: "#141517" }}>
                    {f.v}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA'lar — birincil dolu (teal), ikincil beyaz zeminli */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={primaryCta.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{
                  background: TEAL,
                  color: "#fff",
                  boxShadow: `0 12px 28px ${TEAL}55`,
                }}
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium"
                style={{
                  background: "#fff",
                  color: ORANGE,
                  border: `1px solid ${ORANGE}55`,
                  boxShadow: `0 8px 20px ${ORANGE}14`,
                }}
              >
                {secondaryCta.label}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
