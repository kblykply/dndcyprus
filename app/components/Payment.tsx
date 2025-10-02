"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

// ====== Motion Variants ======
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

// ====== Types ======
export type PaymentFeature = { text: string };

export type FlexiblePaymentProps = {
  headline?: string;
  badge?: string;
  subhead?: string;
  monthsMax?: number;
  startingPrice?: number; // numeric value (e.g., 53000)
  currency?: "£" | "$" | "€" | "₺" | string;
  features?: PaymentFeature[];
  legalNote?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
};

// ====== Component ======
export default function FlexiblePaymentSection({
  headline = "Projelerimizde esnek ödeme fırsatları",
  badge = "Kampanya",
  subhead =
    "72 aya varan taksit imkânı ve £53.000'dan başlayan daireler ile Kuzey Kıbrıs'ta yatırımınızı kolaylaştırın.",
  monthsMax = 72,
  startingPrice = 53000,
  currency = "£",
  features = [
    { text: "Faizsiz şirket içi ödeme planı" },
    { text: "Erken ödeme indirimi" },
    { text: "Düşük peşinat seçenekleri" },
    { text: "Kira garantisi opsiyonu (projeye göre)" },
  ],
  legalNote =
    "*Koşullar projeye göre değişebilir. Güncel kampanya detayları için satış ekibimizle iletişime geçin.",
  primaryCta = { label: "Ödeme Planı Talep Et", href: "/contact" },
  secondaryCta = { label: "Projelerimizi İnceleyin", href: "/projects" },
  backgroundImage = "/daireici.jpg",
}: FlexiblePaymentProps) {
  const formattedPrice = new Intl.NumberFormat("en-GB").format(startingPrice);

  return (
    <section
      aria-label="Esnek Ödeme Fırsatları"
      className="relative overflow-hidden bg-black"
      style={{ color: "#fff" }}
      data-bg="dark"
    >
      {/* Background image with overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-black/50 backdrop-blur-[4px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-16 lg:pb-24">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="relative z-10 grid lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left: Copy */}
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <span
              className="inline-block text-[12px] uppercase tracking-wide px-3 py-1 rounded-full mb-3 backdrop-blur-md"
              style={{ background: `${TEAL}44`, color: "#fff", border: `1px solid ${TEAL}66` }}
            >
              {badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-lg">
              {headline}
            </h2>
            <p className="mt-3 text-white/85 text-base sm:text-lg max-w-[60ch] drop-shadow">
              {subhead}
            </p>

            {/* Stats row */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatBox label="Taksit" value={`${monthsMax} Aya Kadar`} />
              <StatBox label="Başlangıç" value={`${currency}${formattedPrice}`}  />
              <StatBox label="Güvence" value="DND Cyprus" />
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={primaryCta.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 backdrop-blur-md"
                style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 24px ${TEAL}55` }}
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="px-6 py-2.5 rounded-full text-sm font-medium backdrop-blur-md"
                style={{ background: `${ORANGE}33`, color: "#fff", border: `1px solid ${ORANGE}66` }}
              >
                {secondaryCta.label}
              </Link>
            </div>

            {/* Legal */}
            {legalNote && (
              <p className="mt-5 text-xs text-white/75 max-w-[60ch]">{legalNote}</p>
            )}
          </motion.div>

          {/* Right: Feature cards */}
          <motion.ul
            variants={containerStagger}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            role="list"
          >
            {features.map((f, i) => (
              <motion.li key={i} variants={fadeUp}>
                <FeatureCard text={f.text} />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

// ====== Subcomponents ======
function StatBox({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="rounded-xl p-3 bg-white/10 backdrop-blur-md border shadow-[0_6px_20px_rgba(0,0,0,.4)]"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div className="text-[11px] uppercase tracking-wide text-white/70">{label}</div>
      <div className="text-lg sm:text-xl font-semibold" style={{ color: accent ? ORANGE : "#fff" }}>
        {value}
      </div>
    </div>
  );
}

function FeatureCard({ text }: { text: string }) {
  return (
    <div
      className="group relative h-28 sm:h-32 rounded-2xl border bg-white/10 backdrop-blur-lg shadow-[0_6px_24px_rgba(0,0,0,.45)] overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(60%_60% at 50% 50%, ${ORANGE}33, transparent 70%)` }}
      />

      <div className="relative z-10 h-full w-full grid place-items-center p-5 text-center">
        <p className="text-base sm:text-lg font-medium text-white drop-shadow">{text}</p>
      </div>
    </div>
  );
}
