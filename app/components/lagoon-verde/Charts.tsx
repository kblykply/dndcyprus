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
  { label: "Fitness Merkezi", desc: "Sağlıklı ve aktif bir yaşam için, deniz havasının ferahlığı eşliğinde egzersiz yapabileceğiniz son teknoloji spor salonu.", icon: Dumbbell, accent: "teal" },
  { label: "Çocuk Parkı / Oyun Alanı", desc: "Çocukların güvenle oynayıp keşfedebileceği, ailelere de huzur sağlayan eğlenceli açık hava alanı.", icon: Baby, accent: "orange" },
  { label: "Güzellik Merkezi", desc: "Profesyonel güzellik ve spa bakımlarıyla, huzurlu atmosferde rahatlama ve yenilenme.", icon: Sparkles, accent: "teal" },
  { label: "Süpermarket", desc: "Gıda ve temel gereksinimlere topluluk içinde kolay erişim.", icon: ShoppingCart, accent: "orange" },
  { label: "Eczane", desc: "Sağlık ürünleri ve danışmanlığa hızlı erişim.", icon: Pill, accent: "teal" },
  { label: "Pool Bar & Restaurant", desc: "Havuz kenarında ferahlatıcı içecekler ve gurme lezzetler.", icon: Utensils, accent: "orange" },
  { label: "Aqua Park", desc: "Kaydıraklar ve tematik havuzlarla her yaşa uygun su eğlencesi.", icon: Waves, accent: "teal" },
  { label: "Mini Golf", desc: "Her yaşa uygun yaratıcı parkurlarda keyifli bir deneyim.", icon: Flag, accent: "orange" },
  { label: "Köy Pazarı", desc: "Taze yerel ürünler, organik seçenekler ve el yapımı lezzetler.", icon: Leaf, accent: "teal" },
  { label: "Amfitiyatro", desc: "Açık havada canlı performanslar ve yıldızlar altında film geceleri.", icon: Clapperboard, accent: "orange" },
  { 
  label: "Verde Cafe",
  desc: "Üçüncü nesil demlemeler, taze atıştırmalıklar ve sakin teras alanıyla gün boyu keyifli molalar.",
  icon: Coffee,
  accent: "teal" // istersen "orange" yapabilirsin
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
  title = "Lagoon Verde Olanakları",
  subtitle = "Lagoon Verde'de konforunuz ve keyfiniz için tasarlanmış birçok olanak.",
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
