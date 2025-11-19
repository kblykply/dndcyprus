// app/sections/LagoonVerdeAmenitiesSection.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Dumbbell,
  Baby,
  Sparkles,
  ShoppingCart,
  Pill,
  Utensils,
  Waves,
  Flag,
  Leaf,
  Clapperboard,
  Coffee,
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
    label: "Fitness Center",
    desc:
      "A state-of-the-art gym where you can work out in the fresh sea air for a healthy and active lifestyle.",
    icon: Dumbbell,
    accent: "teal",
  },
  {
    label: "Children’s Park / Playground",
    desc:
      "A fun outdoor area where children can play and explore safely, while families enjoy peace of mind.",
    icon: Baby,
    accent: "orange",
  },
  {
    label: "Beauty Center",
    desc:
      "Relax and rejuvenate with professional beauty and spa treatments in a tranquil atmosphere.",
    icon: Sparkles,
    accent: "teal",
  },
  {
    label: "Supermarket",
    desc: "Easy access to groceries and daily essentials within the community.",
    icon: ShoppingCart,
    accent: "orange",
  },
  {
    label: "Pharmacy",
    desc: "Quick access to healthcare products and professional advice.",
    icon: Pill,
    accent: "teal",
  },
  {
    label: "Pool Bar & Restaurant",
    desc: "Refreshing drinks and gourmet flavors by the poolside.",
    icon: Utensils,
    accent: "orange",
  },
  {
    label: "Aqua Park",
    desc: "Water fun for all ages with slides and themed pools.",
    icon: Waves,
    accent: "teal",
  },
  {
    label: "Mini Golf",
    desc: "Enjoyable experiences on creative courses suitable for all ages.",
    icon: Flag,
    accent: "orange",
  },
  {
    label: "Village Market",
    desc: "Fresh local produce, organic options, and handmade delicacies.",
    icon: Leaf,
    accent: "teal",
  },
  {
    label: "Amphitheater",
    desc: "Open-air live performances and movie nights under the stars.",
    icon: Clapperboard,
    accent: "orange",
  },
  {
    label: "Verde Cafe",
    desc:
      "Third-wave brews, fresh snacks, and a calm terrace area for enjoyable breaks throughout the day.",
    icon: Coffee,
    accent: "teal", // you can switch to "orange" if you prefer
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
      className="inline-flex shrink-0 items-center justify-center rounded-xl size-12 lg:size-14"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}33`,
        color,
      }}
    >
      {/* slightly larger glyph */}
      <Icon size={24} />
    </span>
  );
}

export default function LagoonVerdeAmenitiesSection({
title = "Lagoon Verde Amenities",
subtitle = "A wide range of amenities at Lagoon Verde designed for your comfort and enjoyment.",

  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section
      aria-label="Lagoon Verde — Olanaklar"
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke"]: "rgba(20,21,23,0.08)",
      } as React.CSSProperties & Record<"--stroke", string>}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header (Perla2Location rhythm) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* Bigger cards + centered icons */}
        <motion.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          custom={1}
          className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
        >
          {items.map((it, idx) => (
            <motion.li
              key={it.label + idx}
              variants={fadeUp}
              custom={1 + idx * 0.04}
              className="group rounded-2xl px-5 py-5 sm:px-6 sm:py-6 flex items-center gap-4 sm:gap-5 min-h-[112px]"
              style={{
                border: "1px solid var(--stroke)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                backdropFilter: "blur(10px)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
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
