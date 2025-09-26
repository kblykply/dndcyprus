// app/components/dnd-usa/DndUsaCTA.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

export default function DndUsaCTA({
  title = "Birlikte Geleceği İnşa Edelim",
  subtitle = "ABD’deki projelerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçin.",
  primary = { label: "İletişime Geç", href: "/contact" },
  secondary = { label: "Projeleri Gör", href: "/projects" },
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section
      aria-label="DND USA — CTA"
      className="relative overflow-hidden"
      style={{ background: "#fff", color: "#141517" }}
    >
      {/* background wash */}
       <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
            background: `
                radial-gradient(28rem 20rem at 15% 100%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 0%, ${ORANGE}14, transparent 70%)
            `,
            }}
        />  

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 text-sm sm:text-base"
          style={{ color: "rgba(20,21,23,0.7)" }}
        >
          {subtitle}
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex flex-wrap justify-center gap-4"
        >
          <a
            href={primary.href}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: TEAL,
              color: "#fff",
              boxShadow: `0 6px 18px ${TEAL}44`,
            }}
          >
            {primary.label}
          </a>
          <a
            href={secondary.href}
            className="px-6 py-2.5 rounded-full text-sm font-medium"
            style={{
              background: `${ORANGE}14`,
              color: ORANGE,
              border: `1px solid ${ORANGE}33`,
            }}
          >
            {secondary.label}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
