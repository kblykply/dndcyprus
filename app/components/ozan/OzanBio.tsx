// app/components/about/OzanBio.tsx
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
    transition: { duration: 0.48, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Props = {
  title?: string;
  lead?: string;
  points?: { label: string; value: string; accent?: "teal" | "orange" }[];
  image?: string; // opsiyonel: küçük portre / arşiv foto
};

export default function OzanBio({
  title = "Ozan Dökmecioğlu",
  lead = "1971 yılında Mağusa’da doğan Ozan Dökmecioğlu, eğitimini Kuzey Kıbrıs’ta tamamladıktan sonra ODTÜ İşletme bölümünden mezun olmuş, 1995 yılında Harvard Üniversitesi’nde Investment Appraisal & Risk Analysis diplomasını almıştır. Uluslararası arenada Kraft Foods ve Kellogg gibi şirketlerde üst düzey finans ve yönetim rollerinde görev almış; yıllara dayanan bu kurumsal deneyimini DND markasını kurarak gayrimenkul geliştirme alanına taşımıştır.",
  points = [
    { label: "Doğum Yeri", value: "Mağusa, 1971", accent: "teal" },
    { label: "Eğitim", value: "ODTÜ – İşletme", accent: "orange" },
    { label: "Lisansüstü / Sertifika", value: "Harvard (1995) – Investment Appraisal & Risk Analysis", accent: "teal" },
    { label: "Kurumsal Deneyim", value: "Kraft Foods, Kellogg (uluslararası finans & yönetim)", accent: "orange" },
    { label: "Girişimcilik", value: "DND’nin Kurucusu ve Yönetim Kurulu Başkanı", accent: "teal" },
  ],
  image = "/OzanDokmecioglu.jpg",
}: Props) {
  return (
    <section
      aria-label="Ozan Dökmecioğlu — Biyografi"
      className="relative overflow-hidden"
style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}
    >
      {/* subtle brand wash */}
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Text */}
          <div className="lg:col-span-8">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              className="text-2xl sm:text-3xl font-semibold"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              custom={1}
              className="mt-3 text-base sm:text-lg leading-relaxed"
              style={{ color: "rgba(20,21,23,0.78)" }}
            >
              {lead}
            </motion.p>

            {/* key facts chips */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              custom={2}
              className="mt-6 flex flex-wrap gap-2"
            >
              {points.map((p, i) => {
                const color = p.accent === "orange" ? ORANGE : TEAL;
                return (
                  <span
                    key={p.label + i}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: `${color}14`,
                      color,
                      border: `1px solid ${color}33`,
                      backdropFilter: "blur(8px)",
                    }}
                    title={p.label}
                  >
                    {p.value}
                  </span>
                );
              })}
            </motion.div>
          </div>

          {/* Optional image / portrait */}
          <div className="lg:col-span-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                border: "1px solid var(--stroke)",
                boxShadow:
                  "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="aspect-[4/5] bg-white">
                <img
                  src={image}
                  alt="Ozan Dökmecioğlu — arşiv fotoğrafı"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* small note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          custom={3}
          className="mt-6 text-xs"
          style={{ color: "rgba(20,21,23,0.55)" }}
        >
          * Bu sayfa, kamuya açık kaynaklardan derlenen bilgilerle hazırlanmıştır.
        </motion.p>
      </div>
    </section>
  );
}
