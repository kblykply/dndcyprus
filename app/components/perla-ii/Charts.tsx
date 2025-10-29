// app/sections/Perla2AmenitiesSection.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Utensils,
  ShoppingCart,
  LifeBuoy,
  Flag,
  Car,
  Waves,
  Dumbbell,
  Scissors,
  Baby,
  Puzzle,
  Trophy,
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
  title?: string;
  subtitle?: string;
  items?: Amenity[];
};

const DEFAULT_ITEMS: Amenity[] = [
  {
    label: "Restoran",
    desc: "Lezzetli bir deneyim için özenle hazırlanmış şef menüsünün tadını çıkarın.",
    icon: Utensils,
    accent: "teal",
  },
  {
    label: "Mini Market",
    desc: "Günlük ihtiyaçlarınıza site içinden, hızlı ve kolay erişim.",
    icon: ShoppingCart,
    accent: "orange",
  },
  {
    label: "Aqua Park",
    desc: "Aksiyon ve eğlenceyi bir araya getirin; enerji dolu günlerin tadını çıkarın.",
    icon: LifeBuoy,
    accent: "teal",
  },
  {
    label: "Tenis Kortu",
    desc: "Spor tutkunları için tasarlanan kortlarda keyifli maçlara katılın.",
    icon: Flag,
    accent: "orange",
  },
  {
    label: "Kapalı Yeraltı Garajı",
    desc: "Aracınızı güvenle park edin; hava koşullarından etkilenmeyin.",
    icon: Car,
    accent: "teal",
  },
  {
    label: "Açık & Kapalı Yüzme Havuzu",
    desc: "Her mevsim tatil hissi: açık ve kapalı havuz seçenekleri.",
    icon: Waves,
    accent: "orange",
  },
  {
    label: "Spa & Spor Salonu",
    desc: "Zindeliğinizi ve konforunuzu ön planda tutan spa ve fitness olanakları.",
    icon: Dumbbell,
    accent: "teal",
  },
  {
    label: "Unisex Kuaför",
    desc: "La Joya Perla II’de şıklığınızı tamamlayan profesyonel hizmet.",
    icon: Scissors,
    accent: "orange",
  },
  {
    label: "Kids Club",
    desc: "Çocuklar için güvenli, eğlenceli ve eğitici bir kulüp deneyimi.",
    icon: Baby,
    accent: "teal",
  },
  {
    label: "Çocuk Oyun Alanı",
    desc: "Özel tasarlanmış açık alanlarda güvenli ve keyifli oyun saatleri.",
    icon: Puzzle,
    accent: "orange",
  },
  {
    label: "Basketbol Sahası",
    desc: "Takım ruhunu güçlendiren, keyifli maçlar için açık saha.",
    icon: Trophy,
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

export default function Perla2AmenitiesSection({
  title = "La Joya Perla II — Olanaklar",
  subtitle = "La Joya Perla II kompleksi içerisinde konforunuz ve keyfiniz için tasarlanmış birçok tesis bulunmaktadır.",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section
      aria-label="La Joya Perla II — Olanaklar"
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
        {/* Header (Perla2 rhythm) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.65)" }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Larger, centered cards */}
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
