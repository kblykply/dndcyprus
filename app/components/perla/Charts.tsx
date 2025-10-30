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
  Clapperboard,
  Wine, // pool bar
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
  kicker?: string;
  items?: Amenity[];
};

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
      className="inline-flex shrink-0 items-center justify-center rounded-3xl size-16 sm:size-18 lg:size-20"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}33`,
        color,
      }}
    >
      <Icon size={30} />
    </span>
  );
}

/** ---- DEFAULT CONTENT: La Joya Perla — ÖNE ÇIKANLAR / Proje Olanakları ---- */
const DEFAULT_ITEMS: Amenity[] = [
  {
    label: "Restoran",
    desc: "Lezzetli bir deneyim için özenle hazırlanan şef menüsünün tadını çıkarın.",
    icon: Utensils,
    accent: "teal",
  },
  {
    label: "Pool Bar",
    desc: "Ferahlatıcı içeceklerle gününüze renk katın; lüks ve eğlencenin tadını çıkarın.",
    icon: Wine,
    accent: "orange",
  },
  {
    label: "Aqua Park",
    desc: "Aksiyon ve eğlenceyi bir araya getirin, enerji dolu günlerin keyfini çıkarın.",
    icon: LifeBuoy,
    accent: "teal",
  },
  {
    label: "Amfitiyatro & Sinema",
    desc: "Açık hava sinema keyfiyle eşsiz anlarınızı gökyüzü altında paylaşın.",
    icon: Clapperboard,
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
    label: "Spa & GYM",
    desc: "Zindeliğinizi ve konforunuzu ön planda tutan spa ve fitness olanakları.",
    icon: Dumbbell,
    accent: "teal",
  },
  {
    label: "Unisex Kuaför",
    desc: "La Joya Perla’da şıklığınızı tamamlayan profesyonel hizmet.",
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
  {
    label: "Mini Market",
    desc: "Günlük ihtiyaçlarınıza site içinden, hızlı ve kolay erişim.",
    icon: ShoppingCart,
    accent: "orange",
  },
];

export default function Perla2AmenitiesSection({
  kicker = "ÖNE ÇIKANLAR",
  title = "La Joya Perla Proje Olanakları",
  subtitle = "La Joya Perla kompleksi içerisinde konforunuz ve keyfiniz için tasarlanmış pek çok olanak yer alıyor.",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section
      aria-label="La Joya Perla — Proje Olanakları"
      className="relative overflow-hidden"
      style={
        {
          background: "#ffffff",
          color: "#141517",
          ["--stroke"]: "rgba(20,21,23,0.08)",
        } as React.CSSProperties & Record<"--stroke", string>
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-18 lg:py-24">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-3xl"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "#f4f6f8",
              border: "1px solid var(--stroke)",
              color: "rgba(20,21,23,0.75)",
            }}
          >
            {kicker}
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            {title}
          </h2>
          <p
            className="mt-2 text-base sm:text-lg leading-relaxed"
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
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          role="list"
        >
          {items.map((it, idx) => (
            <motion.li
              key={it.label + idx}
              variants={fadeUp}
              custom={1 + idx * 0.04}
              className="group rounded-3xl px-7 py-7 sm:px-8 sm:py-8 flex items-center gap-6 min-h-[148px]"
              style={{
                border: "1px solid var(--stroke)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.72))",
                backdropFilter: "blur(10px)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
              }}
            >
              <AccentIcon Icon={it.icon} accent={it.accent} />
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-semibold leading-snug">
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
