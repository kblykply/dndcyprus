"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// ====== Motion variants (typed) ======
const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ====== Types ======
export type BrandItem = {
  name: string;
  logo: string; // public path (PNG)
  href?: string; // project detail URL
  tag?: string; // e.g., "Awarded", "Sold Out", "New"
  invertOnWhite?: boolean; // add invert filter for dark logos
};

export type OurBrandsProps = {
  title?: string;
  subtitle?: string;
  note?: string;
  brands?: BrandItem[];
};

// ====== Component ======
export default function OurBrands({
  title = "Our Brands & Projects",
  subtitle =
    "DND Cyprus çatısı altındaki ödüllü projeler ve alt markalar. Güven, tasarım ve sürdürülebilirlik odağında.",
  note = "*Logo örnekleri gerçek proje linkleri ile bağlanmıştır.",
  brands = [
    { name: "DND Group", logo: "/logos/dndgroup.png", href: "/about#group" },
    { name: "DND Homes", logo: "/logos/dndhomes.png", href: "/dndhomesprojects" },
    { name: "Lagoon Verde", logo: "/logos/lagoon.png", href: "/lagoon-verde", tag: "Altın Ödül" },
    { name: "La Joya", logo: "/logos/lajoya.png", href: "/la-joya" },
    { name: "Mariachi Beach Club", logo: "/logos/mariachi.png", href: "/projects/mariachi", tag: "Platin Ödül" },
    { name: "Perla", logo: "/logos/perla.png", href: "/projects/perla" },
    { name: "Perla II", logo: "/logos/perlaii.png", href: "/projects/perla-ii" },
  ],
}: OurBrandsProps) {
  return (
    <section
      aria-label="Our Brands & Projects"
      className="relative overflow-hidden bg-white"
      style={{ color: "#141517" }}
      data-bg="light"
    >
      {/* Soft corner glows matching DND style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(38rem 28rem at 0% 100%, ${TEAL}10, transparent 70%),
            radial-gradient(38rem 28rem at 100% 0%, ${ORANGE}10, transparent 70%)
          `,
        }}
      />

      {/* Subtle noise overlay (optional) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: "url('/noise.png')" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-16 lg:pb-24">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="relative z-10"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="max-w-3xl">
            <span
              className="inline-block text-[12px] uppercase tracking-wide px-3 py-1 rounded-full mb-3"
              style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
            >
              OurBrands
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-black/65 text-base sm:text-lg">{subtitle}</p>
          </motion.div>

          {/* Grid */}
          <motion.ul
            variants={containerStagger}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
            role="list"
          >
            {brands.map((b) => (
              <motion.li key={b.name} variants={cardIn}>
                <BrandCard item={b} />
              </motion.li>
            ))}
          </motion.ul>

          {/* Note */}
          {note && (
            <motion.p
              variants={fadeUp}
              className="mt-6 text-xs text-black/50"
            >
              {note}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ====== Card ======
function BrandCard({ item }: { item: BrandItem }) {
  if (item.href) {
    // Link dalı: href zorunlu ve tipli
    return (
      <Link href={item.href} aria-label={item.name}>
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative h-28 sm:h-32 lg:h-36 rounded-2xl border bg-white/70 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,.06)] overflow-hidden"
          style={{ borderColor: "rgba(20,21,23,0.08)" }}
        >
          {/* Hover glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(60%_60% at 50% 50%, ${ORANGE}12, transparent 70%)`,
            }}
          />

          {/* Tag / ribbon */}
          {item.tag && (
            <div
              className="absolute left-2 top-2 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
              style={{
                background: `${ORANGE}14`,
                color: ORANGE,
                border: `1px solid ${ORANGE}33`,
              }}
            >
              {item.tag}
            </div>
          )}

          {/* Logo */}
          <div className="relative z-10 h-full w-full grid place-items-center p-4">
            <img
              src={item.logo}
              alt={item.name}
              loading="lazy"
              className={[
                "max-h-12 sm:max-h-14 lg:max-h-16 w-auto object-contain transition-all duration-300",
                "grayscale group-hover:grayscale-0",
                item.invertOnWhite ? "invert" : "",
              ].join(" ")}
            />
          </div>

          {/* Focus ring */}
          <span
            className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-focus-within:ring-black/15 group-focus:ring-black/15"
            aria-hidden
          />
        </motion.div>
      </Link>
    );
  }

  // div dalı
  return (
    <div aria-label={item.name}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-28 sm:h-32 lg:h-36 rounded-2xl border bg-white/70 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,.06)] overflow-hidden"
        style={{ borderColor: "rgba(20,21,23,0.08)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(60%_60% at 50% 50%, ${ORANGE}12, transparent 70%)`,
          }}
        />
        {item.tag && (
          <div
            className="absolute left-2 top-2 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
            style={{
              background: `${ORANGE}14`,
              color: ORANGE,
              border: `1px solid ${ORANGE}33`,
            }}
          >
            {item.tag}
          </div>
        )}
        <div className="relative z-10 h-full w-full grid place-items-center p-4">
          <img
            src={item.logo}
            alt={item.name}
            loading="lazy"
            className={[
              "max-h-12 sm:max-h-14 lg:max-h-16 w-auto object-contain transition-all duration-300",
              "grayscale group-hover:grayscale-0",
              item.invertOnWhite ? "invert" : "",
            ].join(" ")}
          />
        </div>
        <span
          className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-focus-within:ring-black/15 group-focus:ring-black/15"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}

