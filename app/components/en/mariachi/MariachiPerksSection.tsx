// app/components/mariachi/MariachiUnifiedPerks.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants, type Easing } from "framer-motion";
import { BadgePercent, ShieldCheck } from "lucide-react";

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

type LogoItem = { name: string; src: string; href?: string };

export default function MariachiUnifiedPerks({
title = "Membership & Resident Privileges",
subtitle = "Unified advantages at Mariachi Beach Club for everyone living in DND Cyprus projects.",
note = "For all DND residence owners: FREE ENTRY to Mariachi Beach Club + 10% DISCOUNT",
logos = [
  { name: "La Joya", src: "/logos/lajoya.png", href: "/en/la-joya" },
  { name: "La Joya Perla", src: "/logos/perla.png", href: "/en/perla" },
  { name: "La Joya Perla II", src: "/logos/perlaii.png", href: "/en/perla-ii" },
  { name: "Lagoon Verde", src: "/logos/lagoon.png", href: "/en/lagoon-verde" },
],
primaryCta = { label: "Make a Reservation", href: "/en/contact" },
secondaryCta = { label: "Verify Privileges", href: "/en/contact" },

/** Right-side image card props */
sideImage = "/mariachi/2.jpg",
sideImageAlt = "Mariachi Beach Club",
sideBadge = "Mariachi Beach Club",
sideTitle = "Privileged days by the sea",
sideSubtitle = "Exclusive for residence owners: free entry + 10% discount on food & beverages.",
sideHref = "#gallery", // leave empty to remove CTA
sideSticky = true,     // keeps the card visible while scrolling on desktop

}: {
  title?: string;
  subtitle?: string;
  note?: string;
  logos?: LogoItem[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };

  sideImage?: string;
  sideImageAlt?: string;
  sideBadge?: string;
  sideTitle?: string;
  sideSubtitle?: string;
  sideHref?: string;
  sideSticky?: boolean;
}) {
  return (
    <section
      aria-label="Mariachi Beach Club — Sakin Ayrıcalıkları (Tek Tip)"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      {/* soft auras */}
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
        {/* two-column layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT: copy + logos + CTAs */}
          <div>
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
                Resident Privileges
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">{title}</h2>
              <p className="mt-3 text-base sm:text-lg" style={{ color: "#141517CC" }}>{subtitle}</p>

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
                  <span className="text-[#141517B3]">(* On-site ID / residence verification may be required.)</span>
                </div>
              </div>
            </motion.div>

            {/* Logos */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-10"
            >
              <p className="text-sm font-medium flex items-center gap-2" style={{ color: "#141517B3" }}>
                <ShieldCheck className="h-4 w-4" style={{ color: TEAL }} />
                Valid for all residents of the following projects:
              </p>

              <ul
                role="list"
                className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
              >
                {logos.map(({ name, src, href }, i) => {
                  const inner = (
                    <div
                      className="group relative flex items-center justify-center rounded-2xl bg-white ring-1 ring-black/5 p-4 sm:p-5 h-24 sm:h-28 transition-transform duration-300"
                      style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }}
                    >
                      <img
                        src={src}
                        alt={name}
                        className="max-h-10 sm:max-h-12 md:max-h-14 w-auto object-contain select-none pointer-events-none grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition"
                        draggable={false}
                      />
                      <span className="sr-only">{name}</span>
                    </div>
                  );
                  return (
                    <li key={name + i}>
                      {href ? (
                        <Link href={href} aria-label={name} className="block hover:-translate-y-0.5 transition-transform">
                          {inner}
                        </Link>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* CTAs */}
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
          </div>

          {/* RIGHT: image card */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={[
              "relative rounded-[28px] overflow-hidden ring-1 ring-black/10",
              "shadow-[0_22px_54px_rgba(0,0,0,0.10)]",
              sideSticky ? "lg:sticky lg:top-24" : "",
              "min-h-[420px] sm:min-h-[520px] lg:min-h-[560px]"
            ].join(" ")}
            aria-label={sideImageAlt}
          >
            {/* cover image */}
            {sideImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${sideImage})` }}
                aria-hidden
              />
            ) : (
              <div
                className="absolute inset-0"
                aria-hidden
                style={{ background: "linear-gradient(135deg, rgba(39,149,155,0.20), rgba(241,92,52,0.14))" }}
              />
            )}

            {/* readability overlays */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.55) 65%)" }}
              aria-hidden
            />

            {/* content (local glass blur ONLY inside the card) */}
            <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
              {sideBadge && (
                <span
                  className="inline-flex w-fit items-center gap-2 text-[11px] tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  {sideBadge}
                </span>
              )}

              <h3 className="mt-3 text-white text-2xl sm:text-3xl font-semibold leading-snug drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
                {sideTitle}
              </h3>
              {sideSubtitle && (
                <p className="mt-2 text-white/85 text-sm sm:text-base max-w-md">
                  {sideSubtitle}
                </p>
              )}

              {sideHref && (
                <div className="mt-4">
                  <Link
                    href={sideHref}
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                    style={{ background: "#fff", color: TEAL, boxShadow: `0 12px 28px ${TEAL}44`, border: `1px solid ${TEAL}22` }}
                  >
                    View Photos
                  </Link>
                </div>
              )}
            </div>
          </motion.aside>
        </div>

        {/* footnote */}
        <p className="mt-8 text-xs" style={{ color: "#14151799" }}>
          *Privileges may be updated based on campaign and season conditions. On-site ID and residence verification may be required.
        </p>
      </div>
    </section>
  );
}
