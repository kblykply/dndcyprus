// app/components/dnd-usa/DndUsaWhoWeAre.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

export default function DndUsaWhoWeAre() {
  return (
    <section
      aria-label="DND USA — Who We Are"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
    >
     {/* brand wash */}
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Biz Kimiz
          </h2>
          <div
            className="mt-2 h-1 w-14 rounded-full"
            style={{ background: TEAL }}
          />
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed"
            style={{ color: "rgba(20,21,23,0.72)" }}
          >
            DND Homes USA, Massachusetts’te konut geliştirme alanında faaliyet
            gösteren ve Kuzey Kıbrıs’taki köklü inşaat deneyimini Amerika’ya
            taşıyan bir markadır. Müşterilerimize modern, sürdürülebilir ve
            yüksek kaliteli yaşam alanları sunarak uluslararası alanda güven ve
            yenilik anlayışıyla öne çıkıyoruz.
          </p>
        </motion.div>

        {/* Highlights */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Uluslararası Deneyim",
              text: "Kuzey Kıbrıs ve ABD’de inşaat projelerinde 30+ yıllık bilgi birikimi.",
              accent: TEAL,
            },
            {
              title: "Yüksek Standartlar",
              text: "Malzeme kalitesinden mimariye kadar global standartlarda çözümler.",
              accent: ORANGE,
            },
            {
              title: "Müşteri Odaklılık",
              text: "Her projede beklentilerin ötesine geçen müşteri deneyimi.",
              accent: TEAL,
            },
          ].map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 backdrop-blur-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.72))",
                border: `1px solid ${h.accent}33`,
                boxShadow: `0 8px 18px ${h.accent}22`,
              }}
            >
              <h3 className="text-lg font-semibold" style={{ color: h.accent }}>
                {h.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "rgba(20,21,23,0.72)" }}
              >
                {h.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
