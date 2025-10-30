// app/components/ContactHeroGlass.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

type CTA = { label: string; href: string };

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  bgImage?: string;
  primary?: CTA;
  secondary?: CTA;
  quick?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
};

export default function ContactHeroGlass({
  kicker = "İletişim",
  title = "Bize Ulaşın",
  subtitle = "Projelerimiz ve yatırım fırsatları hakkında daha fazla bilgi almak için bizimle iletişime geçin.",
  bgImage = "/lagoon-verde/1.jpg",
  primary = { label: "Mesaj Gönder", href: "#form" },
  secondary = { label: "Projelerimiz", href: "/projects" },
  quick = {
    phone: "+90 392 444 03 63",
    whatsapp: "+90 548 888 03 63",
    email: "info@dndcyprus.com",
  },
}: Props) {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glassmorphic Panel */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto text-center px-6 py-10 rounded-2xl
                   backdrop-blur-md bg-white/15 border border-white/20 shadow-xl"
      >
              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="inline-block text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full"
                style={{
                  background: `${TEAL}30`,
                  color: "#fff",
                  border: `1px solid ${TEAL}66`,
                }}
              >
                {kicker}
              </motion.span>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
          {title}
        </h1>
        <p className="text-lg text-white/90 mb-8">{subtitle}</p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-6">
          {primary && (
            <Link
              href={primary.href}
              className="px-6 py-3 rounded-xl font-medium"
              style={{
                background: TEAL,
                color: "#fff",
                boxShadow: `0 8px 20px ${TEAL}44`,
              }}
            >
              {primary.label}
            </Link>
          )}
          {secondary && (
            <Link
              href={secondary.href}
              className="px-6 py-3 rounded-xl font-medium border border-white/30 bg-white/10 text-white hover:bg-white/20 transition"
            >
              {secondary.label}
            </Link>
          )}
        </div>

        {/* Quick Contact */}
        {quick && (
          <div className="flex flex-col md:flex-row justify-center gap-6 text-white/80 text-sm">
            {quick.phone && <span>{quick.phone}</span>}
            {quick.whatsapp && <span>{quick.whatsapp}</span>}
            {quick.email && <span>{quick.email}</span>}
          </div>
        )}
      </motion.div>
    </section>
  );
}
