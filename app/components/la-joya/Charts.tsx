// app/sections/LaJoyaAmenitiesSection.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Wine,
  Utensils,
  Waves,
  Dumbbell,
  Car,
} from "lucide-react";

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

type Amenity = {
  label: string;
  desc: string;
  icon: LucideIcon;
  accent?: "teal" | "orange";
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  items?: Amenity[];
};

const DEFAULT_ITEMS: Amenity[] = [
  {
    label: "Pool Bar",
    desc: "Ferahlatıcı içkilerle gününüzü renklendirin, lüksün ve eğlencenin tadını çıkarın.",
    icon: Wine,
    accent: "teal",
  },
  {
    label: "Restoran",
    desc: "Lezzetli bir deneyim için özenle hazırlanan şef menüsünün tadını çıkarın.",
    icon: Utensils,
    accent: "orange",
  },
  {
    label: "Yüzme Havuzu",
    desc: "Açık yüzme havuzlarında tatil keyfinizi en üst düzeye çıkarın.",
    icon: Waves,
    accent: "teal",
  },
  {
    label: "Spor Salonu",
    desc: "La Joya içerisindeki spor salonu ile zindeliğinizi ve sağlığınızı koruyun.",
    icon: Dumbbell,
    accent: "orange",
  },
  {
    label: "Açık Otopark",
    desc: "Açık otopark alanlarıyla pratik ve konforlu bir yaşama sahip olun.",
    icon: Car,
    accent: "teal",
  },
];

function AccentIcon({
  Icon,
  accent = "teal",
}: {
  Icon: LucideIcon;
  accent?: "teal" | "orange";
}) {
  const color = accent === "orange" ? ORANGE : TEAL;
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-2xl size-14 lg:size-16"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}33`,
        color,
      }}
    >
      <Icon size={28} />
    </span>
  );
}

export default function LaJoyaAmenitiesSection({
  kicker = "ÖNE ÇIKANLAR",
  title = "La joya Proje Olanakları",
  subtitle = "La Joya kompleksi içerisinde konforunuz için pek çok olanak yer alıyor.",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section
      aria-label="La Joya — Öne Çıkan Proje Olanakları"
      className="relative overflow-hidden"
      style={
        {
          background: "#ffffff",
          color: "#141517",
          ["--stroke"]: "rgba(20,21,23,0.08)",
        } as React.CSSProperties & Record<"--stroke", string>
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-2xl"
        >
          {/* Kicker pill */}
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
            style={{
              background: `${TEAL}10`,
              border: `1px solid ${TEAL}33`,
              color: TEAL,
            }}
          >
            {kicker}
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.65)" }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Amenity cards */}
        <motion.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          custom={1}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
        >
          {items.map((it, idx) => (
            <motion.li
              key={it.label + idx}
              variants={fadeUp}
              custom={1 + idx * 0.04}
              className="group rounded-3xl px-6 py-6 sm:px-7 sm:py-7 flex items-center gap-5 sm:gap-6 min-h-[132px]"
              style={{
                border: "1px solid var(--stroke)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.66))",
                backdropFilter: "blur(10px)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.06)",
              }}
            >
              <AccentIcon Icon={it.icon} accent={it.accent} />
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-semibold leading-snug">
                  {it.label}
                </div>
                <div
                  className="mt-1.5 text-sm sm:text-base leading-relaxed"
                  style={{ color: "rgba(20,21,23,0.65)" }}
                >
                  {it.desc}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
