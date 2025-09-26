// app/components/ContactHero.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type CTA = { label: string; href: string };

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  bgImage?: string | null;
  primary?: CTA | null;
  secondary?: CTA | null;
  quick?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  } | null;
};

export default function ContactHero({
  kicker = "DND Cyprus",
  title = "İletişim",
  subtitle = "Projeleriniz, iş birlikleriniz veya sorularınız için ekibimiz her zaman hazır.",
  bgImage = "/La Joya - 2.png",
  primary = { label: "Hemen Ulaşın", href: "/contact#form" },
  secondary = { label: "Konum & Ofisler", href: "/contact#offices" },
  quick = { phone: "+90 533 000 00 00", whatsapp: "+90 533 000 00 00", email: "info@dndcyprus.com" },
}: Props) {
  return (
    <section
      aria-label="İletişim Girişi"
      className="relative overflow-hidden h-[77vh]"
      style={{ background: "#ffffff", color: "#141517" }}
    >
      {/* Background image */}
      {bgImage && (
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </div>
      )}

      {/* Brand wash overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.35)),
            radial-gradient(38rem 24rem at 10% 0%, ${TEAL}22, transparent 70%),
            radial-gradient(34rem 22rem at 95% 100%, ${ORANGE}18, transparent 70%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 min-h-[65vh] flex items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <div
            className="max-w-3xl rounded-3xl p-6 sm:p-8"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.84))",
              border: "1px solid rgba(20,21,23,0.10)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* Kicker */}
            {kicker && (
              <span
                className="inline-flex items-center text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                style={{
                  background: `${TEAL}14`,
                  color: TEAL,
                  border: `1px solid ${TEAL}33`,
                }}
              >
                {kicker}
              </span>
            )}

            {/* Title & Subtitle */}
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.75)" }}>
                {subtitle}
              </p>
            )}

            {/* CTA buttons */}
            {(primary || secondary) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {primary && (
                  <a
                    href={primary.href}
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                    style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 22px ${TEAL}44` }}
                  >
                    {primary.label}
                  </a>
                )}
                {secondary && (
                  <a
                    href={secondary.href}
                    className="px-6 py-2.5 rounded-full text-sm font-medium"
                    style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
                  >
                    {secondary.label}
                  </a>
                )}
              </div>
            )}

            {/* Quick contacts (text-only pills) */}
            {quick && (quick.phone || quick.whatsapp || quick.email) && (
              <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
                {quick.phone && (
                  <a
                    href={`tel:${quick.phone.replace(/\s+/g, "")}`}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(20,21,23,0.06)",
                      border: "1px solid rgba(20,21,23,0.10)",
                      color: "rgba(20,21,23,0.88)",
                    }}
                  >
                    Telefon: {quick.phone}
                  </a>
                )}
                {quick.whatsapp && (
                  <a
                    href={`https://wa.me/${quick.whatsapp.replace(/\D/g, "")}`}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: `${TEAL}14`,
                      border: `1px solid ${TEAL}33`,
                      color: TEAL,
                    }}
                  >
                    WhatsApp: {quick.whatsapp}
                  </a>
                )}
                {quick.email && (
                  <a
                    href={`mailto:${quick.email}`}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: `${ORANGE}14`,
                      border: `1px solid ${ORANGE}33`,
                      color: ORANGE,
                    }}
                  >
                    E-Posta: {quick.email}
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom curve */}
     
    </section>
  );
}
