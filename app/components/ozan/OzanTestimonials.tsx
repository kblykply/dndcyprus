// app/components/about/OzanTestimonials.tsx
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
  avatar?: string; // /images/...
  logo?: string;   // /logos/...
  accent?: "teal" | "orange";
};

export default function OzanTestimonials({
  title = "Alıntılar & Referanslar",
  subtitle = "İş ortakları, ekip arkadaşları ve sektör paydaşlarından.",
  items = DEFAULT_ITEMS,
  layout = "grid", // "grid" | "carousel"
}: {
  title?: string;
  subtitle?: string;
  items?: Testimonial[];
  layout?: "grid" | "carousel";
}) {
const railRef = useRef<HTMLDivElement>(null);



  const scrollBy = (dir: "prev" | "next") => {
    const el = railRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  const Header = (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
        {subtitle}
      </p>
    </motion.div>
  );

  return (
    <section
      aria-label="Ozan Dökmecioğlu — Alıntılar & Referanslar"
      className="relative overflow-hidden"
style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}
    >


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
        {Header}

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
  railRef: React.Ref<HTMLDivElement>; // <-- was React.RefObject<HTMLDivElement>  
  onPrev: () => void;
  onNext: () => void;
}) {
   return (
    <div className="mt-8 relative">
      <div
        ref={railRef} // now perfectly compatible with MutableRefObject<HTMLDivElement | null>
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
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
  const TEAL = "#27959b";
  const ORANGE = "#f15c34";
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
          <img
            src={item.avatar}
            alt={item.author}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div
            className="h-9 w-9 rounded-full grid place-items-center text-xs font-medium"
            style={{ background: `${color}14`, color }}
          >
            {item.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
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

/* ---------------- Defaults (replace with real quotes) ---------------- */
const DEFAULT_ITEMS: Testimonial[] = [
  {
    quote:
      "Ozan Bey’in finans disiplini ve sakin liderliği, entegrasyon süreçlerimizi hızlandırdı.",
    author: "A. Yılmaz",
    role: "CEO",
    company: "İş Ortağı",
    avatar: "/images/testimonials/ayilmaz.jpg",
    logo: "/logos/partner.svg",
    accent: "teal",
  },
  {
    quote:
      "Uluslararası ölçekte büyüme için kurduğu finansal çerçeve, projelerimize net yön verdi.",
    author: "M. Kaya",
    role: "Yatırımcı",
    company: "Portföy A.Ş.",
    avatar: "/images/testimonials/mkaya.jpg",
    logo: "/logos/portfolio.svg",
    accent: "orange",
  },
  {
    quote:
      "Şeffaf iletişimi ve detaylı analizleri sayesinde karar süreçleri güvenle ilerliyor.",
    author: "E. Demir",
    role: "Kurumsal İlişkiler",
    company: "Global Group",
    avatar: "/images/testimonials/edemir.jpg",
    logo: "/logos/globalgroup.svg",
    accent: "teal",
  },
  {
    quote:
      "Sahadaki ekiplerle kurduğu bağ, finans hedeflerini operasyonel gerçeklikle buluşturuyor.",
    author: "S. Arslan",
    role: "Proje Direktörü",
    company: "DND Cyprus",
    avatar: "/images/testimonials/sarslan.jpg",
    logo: "/logos/dnd.svg",
    accent: "orange",
  },
  {
    quote:
      "Risk yönetimi yaklaşımı, volatil dönemlerde dahi istikrar sağladı.",
    author: "L. Öztürk",
    role: "Yönetim Kurulu Üyesi",
    company: "Bağımsız",
    accent: "teal",
  },
];
