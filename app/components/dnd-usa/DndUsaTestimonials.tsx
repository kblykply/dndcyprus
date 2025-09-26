// app/components/dnd-usa/DndUsaTestimonials.tsx
"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string; // /images/testimonials/...
  logo?: string;   // /logos/...
  accent?: "teal" | "orange";
};

export default function DndUsaTestimonials({
  title = "Alıntılar & Referanslar",
  subtitle = "Ev sahipleri, yatırımcılar ve iş ortaklarımızdan geri bildirimler.",
  items = DEFAULT_ITEMS,
  layout = "grid",
}: {
  title?: string;
  subtitle?: string;
  items?: Testimonial[];
  layout?: "grid" | "carousel";
}) {
  // NOTE: allow null and keep it MutableRefObject
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: "prev" | "next") => {
    const el = railRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  return (
    <section
      aria-label="DND USA — Alıntılar & Referanslar"
      className="relative overflow-hidden"
     style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >
      {/* brand wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(28rem 20rem at 15% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 16rem at 85% 100%, ${ORANGE}14, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.7)" }}>
            {subtitle}
          </p>
        </motion.div>

        {layout === "grid" ? (
          <Grid items={items} />
        ) : (
          <Carousel
            items={items}
            railRef={railRef}
            onPrev={() => scrollBy("prev")}
            onNext={() => scrollBy("next")}
          />
        )}
      </div>
    </section>
  );
}

/* ---------------- GRID ---------------- */
function Grid({ items }: { items: Testimonial[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((t, i) => (
        <Card key={i} item={t} index={i} />
      ))}
    </div>
  );
}

/* ---------------- CAROUSEL ---------------- */
function Carousel({
  items,
  railRef,
  onPrev,
  onNext,
}: {
  items: Testimonial[];
  // Accept a MutableRefObject and allow null
  railRef: React.MutableRefObject<HTMLDivElement | null>;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-8 relative">
      <div
        ref={railRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none" } as any}
      >
        {items.map((t, i) => (
          <div key={i} className="snap-start shrink-0 w-[88%] sm:w-[60%] lg:w-[38%]">
            <Card item={t} index={i} />
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={onPrev}
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
        >
          ◀ Önceki
        </button>
        <button
          onClick={onNext}
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
        >
          Sonraki ▶
        </button>
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */
function Card({ item, index }: { item: Testimonial; index: number }) {
  const color = item.accent === "orange" ? ORANGE : TEAL;
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      className="h-full rounded-2xl p-5"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
        border: `1px solid ${color}33`,
        boxShadow: `0 12px 28px ${color}22`,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* header */}
      <div className="flex items-center gap-3">
        {item.avatar ? (
          <img src={item.avatar} alt={item.author} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div
            className="h-9 w-9 rounded-full grid place-items-center text-xs font-medium"
            style={{ background: `${color}14`, color }}
          >
            {item.author
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-sm font-semibold">{item.author}</div>
          {(item.role || item.company) && (
            <div className="text-[11px]" style={{ color: "rgba(20,21,23,0.7)" }}>
              {[item.role, item.company].filter(Boolean).join(" • ")}
            </div>
          )}
        </div>
        {item.logo ? (
          <img
            src={item.logo}
            alt={item.company || "logo"}
            className="ml-auto h-5 w-auto object-contain opacity-80"
          />
        ) : null}
      </div>

      {/* quote */}
      <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(20,21,23,0.86)" }}>
        “{item.quote}”
      </p>
    </motion.blockquote>
  );
}

/* ---------------- Defaults ---------------- */
const DEFAULT_ITEMS: Testimonial[] = [
  {
    quote: "Satın alma sürecinden teslimata kadar her adım şeffaf ve profesyoneldi.",
    author: "J. Miller",
    role: "Ev Sahibi",
    company: "Massachusetts",
    avatar: "/images/testimonials/jmiller.jpg",
    accent: "teal",
  },
  {
    quote: "DND USA ile yatırımcı ilişkileri ve raporlama net; risk yönetimi güçlü.",
    author: "S. Patel",
    role: "Yatırımcı",
    company: "Private Fund",
    avatar: "/images/testimonials/spatel.jpg",
    logo: "/logos/privatefund.svg",
    accent: "orange",
  },
  {
    quote: "Tasarım kalitesi ve malzeme seçimleri uzun ömürlü kullanım sağlıyor.",
    author: "E. Robinson",
    role: "Mimar",
    company: "Boston",
    accent: "teal",
  },
  {
    quote: "İnşaattaki disiplinleri ve teslim tarihlerine uyumları fark yaratıyor.",
    author: "M. Chen",
    role: "Proje Yöneticisi",
    company: "Yerel Tedarikçi",
    accent: "orange",
  },
  {
    quote: "Satış sonrası destek sayesinde taşındıktan sonra da yanımızdalardı.",
    author: "L. Garcia",
    role: "Ev Sahibi",
    company: "Suburban MA",
    accent: "teal",
  },
  {
    quote: "ABD piyasasında süreçleri iyi biliyorlar; izinler ve tedarik akıcı ilerledi.",
    author: "A. Thompson",
    role: "Geliştirici Ortak",
    company: "Mass Build",
    logo: "/logos/massbuild.svg",
    accent: "orange",
  },
];
