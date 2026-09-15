// app/components/projects/Perla2Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// Hero metinleri JS gecikse de görünür kalsın: opaklık 0'dan başlamaz, yalnızca hafif y kayması
const fadeUp: Variants = {
  hidden: { y: 14 },
  show: (i: number = 0) => ({
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Props = {
  title?: string;
  tagline?: string;
  location?: string;
  statusTR?: string;
  delivery?: string;
  heroImage?: string;   // background image
  heroAlt?: string;
  /** .pdf ise yeni sekmede açılır; "#catalog" gibi bir çapa ise sayfada kaydırır */
  brochureHref?: string;
  brochureLabel?: string;
  contactHref?: string;
  contactLabel?: string;
  kicker?: string;
  /** Optional: override top-scrim height (px) if your header is taller/shorter */
  topScrimHeight?: number;
};

export default function Perla2Hero({
  title = "Lagoon Verde",
  tagline = "Bahçeler, İskele’de modern yaşam ve yatırım fırsatı.",
  location = "Bahçeler, İskele",
  statusTR = "Devam Eden",
  delivery = "Aralık 2028",
  heroImage = "/lagoon-verde/5.jpg",
  heroAlt = "Lagoon Verde kumsal girişli lagün havuzu, palmiyeler ve rezidans blokları",
  brochureHref = "/lagoonbrotr.pdf",
  brochureLabel = "Broşür İndir (PDF)",
  contactHref = "#fiyat-al",
  contactLabel = "İletişime Geçin",
  kicker = "DND Cyprus",
  topScrimHeight = 104, // ~header height; tweak if needed
}: Props) {
  const isPdf = /\.pdf($|\?)/i.test(brochureHref ?? "");

  return (
   <section
  aria-label={`${title} — Hero`}
  // Mobilde görünen alan tam 1 ekran (header payı eklenir); masaüstünde eskisi gibi 120vh
  className="relative min-h-[calc(100svh_+_var(--hero-offset))] md:min-h-[120vh] flex items-center"
  // Pull the hero under the sticky header so the image + scrim appear behind it
  style={
    {
      marginTop: `-${topScrimHeight}px`,
      paddingTop: `${topScrimHeight}px`,
      ["--hero-offset"]: `${topScrimHeight}px`,
    } as React.CSSProperties & Record<"--hero-offset", string>
  }
>
  {/* Background image (z-0) — sayfada önceden yüklenen (priority) tek görsel */}
  <div className="absolute inset-0 z-0">
    <Image
      src={heroImage}
      alt={heroAlt}
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>

  {/* --- Overlays for readability --- */}
  {/* 1) Top scrim ONLY behind header (z-10, header is z-50) */}
  <div
    aria-hidden
    className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
    style={{
      height: `${topScrimHeight}px`,
      background: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
    }}
  />

  {/* 2) Hero-wide wash (brand + depth) (z-10 so it sits above image but below header) */}
  <div
    aria-hidden
    className="absolute inset-0 z-10 pointer-events-none"
    style={{
      background: `
        radial-gradient(60rem 30rem at 10% 0%, ${TEAL}22, transparent 70%),
        radial-gradient(60rem 30rem at 90% 100%, ${ORANGE}22, transparent 70%),
        linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.60))
      `,
    }}
  />


      {/* Soft brand blobs (very subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-3xl opacity-70"
        style={{ background: `${TEAL}22` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full blur-3xl opacity-70"
        style={{ background: `${ORANGE}20` }}
      />

      {/* Content — animasyon mount'ta başlar (whileInView beklemez) */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center text-white z-20">
        {/* Kicker */}
        {kicker && (
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            {kicker}
          </motion.span>
        )}

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
        >
          {title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-3 max-w-2xl mx-auto text-base sm:text-lg"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {tagline}
        </motion.p>

        {/* Chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          <Chip text={statusTR} color={ORANGE} />
          <Chip text={location} color="rgba(255,255,255,0.85)" neutral />
          <Chip text={`Teslim: ${delivery}`} color={TEAL} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3"
        >
          <a
            href={contactHref}
            data-track="price_request_click"
            className="rounded-full px-7 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: TEAL,
              color: "#fff",
              border: `1px solid ${TEAL}66`,
              boxShadow: `0 12px 28px ${TEAL}55`,
            }}
          >
            {contactLabel}
          </a>

          {brochureHref && (
            <a
              href={brochureHref}
              target={isPdf ? "_blank" : undefined}
              rel={isPdf ? "noopener" : undefined}
              data-track={isPdf ? "brochure_download" : undefined}
              className="rounded-full px-7 py-3 text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(8px)",
              }}
            >
              {brochureLabel}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* -------- Small chip helper -------- */
function Chip({
  text,
  color,
  neutral = false,
}: {
  text: string;
  color: string;
  neutral?: boolean;
}) {
  const styles = neutral
    ? {
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.28)",
        color: "#fff",
      }
    : {
        background: `${color}33`,
        border: `1px solid ${color}66`,
        color: "#fff",
      };

  return (
    <span
      className="text-xs px-3 py-1 rounded-full"
      style={styles as React.CSSProperties}
    >
      {text}
    </span>
  );
}
