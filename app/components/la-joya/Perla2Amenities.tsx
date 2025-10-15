// app/components/projects/Perla2Amenities.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

type FeatureGroup = {
  id: string;
  title: string;
  items: string[];
  accent?: "teal" | "orange";
};

type Props = {
  title?: string;
  subtitle?: string;
  groups?: FeatureGroup[];
  brochureHref?: string;
  /** Background image behind the section (full-bleed) */
  bgImage?: string; // e.g. "/perla-ii/amenities-bg.jpg"
  /** Optional darker overlay on top of image (0–1) */
  overlayOpacity?: number; // default 0.35
  /** Optional vertical padding controls */
  padY?: { base?: string; lg?: string }; // e.g. { base: "py-16", lg: "lg:py-28" }
};

export default function Perla2Amenities({
  title = "Özellikler ve Donatılar",
  subtitle = "Sosyal alanlardan teknik altyapıya kadar günlük yaşamı kolaylaştıran, değer katan özellikler.",
  brochureHref = "/files/la-joya-perla-2-brosur.pdf",
  groups = DEFAULT_GROUPS,
  bgImage = "/lagoon-verde/6.jpg",
  overlayOpacity = 0.20,
  padY = { base: "py-16", lg: "lg:py-28" },
}: Props) {
  // typed CSS var for safe usage
  const rootStyle = {
    ["--stroke"]: "rgba(255,255,255,0.18)",
  } as React.CSSProperties & Record<"--stroke", string>;

  return (
    <section
      aria-label="La Joya Perla II — Özellikler"
      className="relative overflow-hidden"
      style={rootStyle}
    >
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
          transform: "translateZ(0)",
        }}
      />

      {/* Color wash + dark overlay for readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(40rem 28rem at 15% 0%, ${TEAL}25, transparent 60%),
             radial-gradient(46rem 32rem at 85% 100%, ${ORANGE}20, transparent 65%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Soft vignette for edge control */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(120% 120% at 50% 50%, black 55%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 120% at 50% 50%, black 55%, transparent 85%)",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0))",
        }}
      />

      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${padY.base ?? "py-16"} ${padY.lg ?? "lg:py-28"}`}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            {subtitle}
          </p>
        </motion.div>

        {/* Glass cards grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {groups.map((g, i) => {
            const color = g.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.article
                key={g.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                custom={i + 1}
                className="group relative rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))",
                  border: "1px solid var(--stroke)",
                  boxShadow:
                    "0 12px 28px rgba(0,0,0,0.22), inset 0 1px rgba(255,255,255,0.35)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                {/* Accent glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      `radial-gradient(18rem 12rem at 20% -10%, ${color}22, transparent 55%),
                       radial-gradient(22rem 14rem at 120% 110%, ${color}18, transparent 60%)`,
                  }}
                />

                <div
                  className="relative inline-flex items-center text-[11px] px-2 py-0.5 rounded-full"
                 style={{
    background: "rgba(0,0,0,0.55)",   // semi-transparent dark bg
    color : "rgba(255, 255, 255, 0.86)",
    border: `1px solid ${color}55`,
    boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
    backdropFilter: "blur(6px)",       // glass effect
  }}
                >
                  {g.title}
                </div>

                <ul className="relative mt-3 space-y-2">
                  {g.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-1 inline-block h-2.5 w-2.5 rounded-full"
                        style={{
                          background:
                            idx % 2 === 0 ? color : "rgba(255,255,255,0.55)",
                          boxShadow:
                            idx % 2 === 0
                              ? `0 0 0 3px ${color}26`
                              : "0 0 0 3px rgba(255,255,255,0.12)",
                        }}
                      />
                      <span className="text-sm sm:text-base text-white/90">
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom note + brochure */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          custom={groups.length + 2}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <p className="text-xs text-white/70">
            * Özellikler tip ve bloklara göre farklılık gösterebilir. Güncel liste için satış ekibimizle iletişime geçiniz.
          </p>

          {brochureHref ? (
            <a
              href={brochureHref}
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/40"
              style={{
                background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                color: "#fff",
                border: `1px solid ${TEAL}66`,
                boxShadow: `0 10px 28px ${TEAL}55, inset 0 1px rgba(255,255,255,0.42)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
              }
            >
              Broşür İndir (PDF)
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/* ================= Default feature content (edit freely) ================= */
const DEFAULT_GROUPS: FeatureGroup[] = [
  {
    id: "residence",
    title: "Konut & Yaşam",
    accent: "teal",
    items: [
      "1+1 Loft, 2+1 Penthouse, 1+0 Stüdyo Penthouse (toplam 74 konut)",
      "Loft dairelerde doğrudan havuz erişimi",
      "Penthouse’larda çatı terasında jakuzi ve deniz manzarası",
      "Açık otopark",
    ],
  },
  {
    id: "social",
    title: "Sosyal Alanlar",
    accent: "orange",
    items: [
      "Açık yüzme havuzları",
      "Restoran & Pool Bar",
      "Gym / Spor Salonu",
      "Mariachi Beach Club üyeliği ve indirimli hizmetler",
    ],
  },
  {
    id: "security",
    title: "Beach Club & Ayrıcalıklar",
    accent: "teal",
    items: [
      "Mariachi Beach Club: ~3 dk mesafede, La Joya sakinlerine üyelik",
      "Spa, pool bar ve restoran olanakları",
      "Plaj etkinlikleri ve eğlenceler (gün boyu / gece)",
      "Bölgede eğlence: Merit’in en büyük casinosu ~350 m",
    ],
  },
  {
    id: "technical",
    title: "Teknik Altyapı",
    accent: "orange",
    items: [
      "Merkezi ısıtma / soğutma",
      "Merkezi jeneratör",
      "Akıllı ev sistemleri",
      "Banyolarda yerden ısıtma",
    ],
  },
  {
    id: "sustainability",
    title: "Teslim & Ödeme",
    accent: "teal",
    items: [
      "Teslim: Kasım 2025",
      "Esnek ödeme planı alternatifleri",
      "Yabancılar için konut satın alma imkânı",
      "Promosyon kataloğu ile detaylı bilgi",
    ],
  },
  {
    id: "location",
    title: "Konum & Erişim",
    accent: "orange",
    items: [
      "Denize 500 m",
      "Mariachi Beach Club’a ~3 dk",
      "Gazimağusa merkeze ~15 dk",
      "Ercan ~45 dk • Larnaka ~60 dk",
    ],
  },
];


