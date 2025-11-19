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
    label: "Restaurant",
    desc: "Enjoy a carefully crafted chef’s menu for a truly delicious experience.",
    icon: Utensils,
    accent: "teal",
  },
  {
    label: "Pool Bar",
    desc: "Brighten your day with refreshing drinks and enjoy a blend of luxury and fun.",
    icon: Wine,
    accent: "orange",
  },
  {
    label: "Aqua Park",
    desc: "Combine action and entertainment and make the most of energetic, fun-filled days.",
    icon: LifeBuoy,
    accent: "teal",
  },
  {
    label: "Amphitheater & Cinema",
    desc: "Share unforgettable open-air cinema moments under the sky.",
    icon: Clapperboard,
    accent: "orange",
  },
  {
    label: "Underground Parking Garage",
    desc: "Park your vehicle safely and stay protected from weather conditions.",
    icon: Car,
    accent: "teal",
  },
  {
    label: "Indoor & Outdoor Swimming Pool",
    desc: "Holiday vibes in every season with both indoor and outdoor pool options.",
    icon: Waves,
    accent: "orange",
  },
  {
    label: "Spa & Gym",
    desc: "Spa and fitness facilities that keep your wellbeing and comfort at the forefront.",
    icon: Dumbbell,
    accent: "teal",
  },
  {
    label: "Unisex Hair Salon",
    desc: "Professional services at La Joya Perla to complete your look in style.",
    icon: Scissors,
    accent: "orange",
  },
  {
    label: "Kids Club",
    desc: "A safe, fun, and educational club experience for children.",
    icon: Baby,
    accent: "teal",
  },
  {
    label: "Children’s Playground",
    desc: "Safe and enjoyable playtime in specially designed outdoor areas.",
    icon: Puzzle,
    accent: "orange",
  },
  {
    label: "Basketball Court",
    desc: "An open court for enjoyable games that strengthen team spirit.",
    icon: Trophy,
    accent: "teal",
  },
  {
    label: "Mini Market",
    desc: "Fast and easy on-site access to your daily essentials.",
    icon: ShoppingCart,
    accent: "orange",
  },
]
;

export default function Perla2AmenitiesSection({
 kicker = "HIGHLIGHTS",
title = "La Joya Perla Project Amenities",
subtitle = "Within the La Joya Perla complex, you’ll find many amenities designed for your comfort and enjoyment.",

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
