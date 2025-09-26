// app/components/ClientsPartners.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type LogoItem = {
  id: string;
  name: string;
  category: "Government" | "Developer" | "Supplier" | "Consultant" | string;
  src: string;      // IMAGE SLOT
  href?: string;    // optional link
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  logos?: LogoItem[];
  showFilters?: boolean;
};

const head: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45 } },
};

const cardPresence: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.2 } },
};

export default function ClientsPartners({
  kicker = "DND Cyprus",
  title = "Partnerlerimiz",
  subtitle = "Güvenilir kurum ve markalarla uzun dönemli iş birlikleri kuruyoruz.",
  showFilters = true,
  logos = [
    { id: "gov-1", name: "Çevre ve Şehircilik", category: "Government", src: "/DND-LOGO-2.svg", href: "#" },
    { id: "gov-2", name: "Turizm Dairesi", category: "Government", src: "/DND-LOGO-2.svg" },
    { id: "dev-1", name: "Developer A", category: "Developer", src: "/DND-LOGO-2.svg", href: "#" },
    { id: "dev-2", name: "Developer B", category: "Developer", src: "/DND-LOGO-2.svg" },
    { id: "sup-1", name: "Supplier X", category: "Supplier", src: "/DND-LOGO-2.svg" },
    { id: "sup-2", name: "Supplier Y", category: "Supplier", src: "/DND-LOGO-2.svg" },
    { id: "con-1", name: "Consultant Z", category: "Consultant", src: "/DND-LOGO-2.svg  " },
  ],
}: Props) {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(logos.map(l => l.category)));
    return ["All", ...cats];
  }, [logos]);

  const filtered = useMemo(() => {
    if (active === "All") return logos;
    return logos.filter(l => l.category === active);
  }, [active, logos]);

  return (
    <section
      aria-label="Müşteriler ve İş Ortakları"
      className="relative overflow-hidden bg-white"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke" as any]: "rgba(20,21,23,0.08)",
      }}
    >



        <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(30rem 20rem at 12% 100%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 18rem at 88% 0%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          variants={head}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="text-left max-w-2xl"
        >
          <span
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(20,21,23,0.05)",
              border: "1px solid var(--stroke)",
              color: TEAL,
              backdropFilter: "blur(8px)",
            }}
          >
            {kicker}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            {title}
          </h2>
          <p className="mt-2 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map(cat => {
              const isActive = active === cat;
              const color = cat === "Government" ? ORANGE : TEAL;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full transition-colors"
                  style={{
                    background: isActive ? color : "rgba(20,21,23,0.05)",
                    color: isActive ? "#fff" : "rgba(20,21,23,0.75)",
                    border: isActive ? `1px solid ${color}AA` : "1px solid var(--stroke)",
                    boxShadow: isActive ? `0 6px 18px ${color}40` : "none",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Logo Grid (AnimatePresence for safe filter transitions) */}
        <motion.div layout className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((l) => (
              <motion.a
                key={l.id}
                href={l.href || "#"}
                target={l.href ? "_blank" : undefined}
                rel={l.href ? "noreferrer" : undefined}
                layout
                variants={cardPresence}
                initial="hidden"
                animate="show"
                exit="exit"
                className="rounded-xl border p-4 bg-white flex items-center justify-center group"
                style={{
                  borderColor: "var(--stroke)",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* IMAGE SLOT (logo) */}
                <img
                  src={l.src}
                  alt={l.name}
                  className="h-8 sm:h-9 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300
                             grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Optional strip / marquee (simple responsive row) */}
        <div className="mt-10 hidden sm:block">
          <div
            className="rounded-2xl py-4 px-6 overflow-hidden"
            style={{ background: "rgba(20,21,23,0.04)", border: "1px solid var(--stroke)" }}
          >
            <div className="flex items-center gap-8 animate-[slide_20s_linear_infinite] whitespace-nowrap"
                 style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}>
              {filtered.concat(filtered).map((l, i) => (
                <img
                  key={l.id + "-strip-" + i}
                  src={l.src}
                  alt={l.name}
                  className="h-7 object-contain opacity-70"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          {/* simple keyframes for marquee */}
          <style jsx>{`
            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <p style={{ color: "rgba(20,21,23,0.65)" }}>
            Siz de DND Cyprus iş ortakları arasında yer alın.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              color: "#fff",
              boxShadow: `0 10px 28px ${TEAL}40`,
              border: `1px solid ${TEAL}55`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
            }
          >
            İş Birliği Başlat
          </a>
        </div>
      </div>
    </section>
  );
}
