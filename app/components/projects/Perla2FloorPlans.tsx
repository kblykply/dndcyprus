// app/components/projects/Perla2FloorPlans.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Plan = {
  id: string;
  title: string;           // "1+1", "2+1"...
  size?: string;           // "56–78 m²"
  block?: string;          // "A Blok"
  floors?: string;         // "Z+9"
  image: string;           // preview image path
  pdf?: string;            // optional brochure / plan PDF
  note?: string;           // short note like "Sınırlı sayıda"
};

type Props = {
  title?: string;
  subtitle?: string;
  plans?: Plan[];
};

export default function Perla2FloorPlans({
  title = "Kat Planları",
  subtitle = "Daire tiplerine ait örnek planlar. Detaylı tipoloji ve ölçüler için satış ekibimizle iletişime geçiniz.",
  plans = DEFAULT_PLANS,
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const open = useMemo(() => openIdx !== null, [openIdx]);
  const current = useMemo(() => (openIdx !== null ? plans[openIdx] : null), [openIdx, plans]);

  return (
    <section
      aria-label="La Joya Perla II — Kat Planları"
      className="relative overflow-hidden"
style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}
    >
      {/* subtle brand wash */}
      

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </div>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <button
                onClick={() => setOpenIdx(i)}
                className="block w-full text-left"
                aria-label={`${p.title} planını büyüt`}
              >
                <div className="aspect-[4/3] bg-white">
                  <img
                    src={p.image}
                    alt={`${p.title} kat planı`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </button>

              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">{p.title}</h3>
                    <div className="mt-1 text-xs" style={{ color: "rgba(20,21,23,0.65)" }}>
                      {p.size ? `Alan: ${p.size}` : null}
                      {p.block ? ` • ${p.block}` : null}
                      {p.floors ? ` • Kat: ${p.floors}` : null}
                    </div>
                    {p.note ? (
                      <div
                        className="mt-2 inline-flex text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
                      >
                        {p.note}
                      </div>
                    ) : null}
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => setOpenIdx(i)}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: `${TEAL}14`,
                        color: TEAL,
                        border: `1px solid ${TEAL}33`,
                      }}
                    >
                      Büyüt
                    </button>

                    {p.pdf ? (
                      <a
                        href={p.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "rgba(20,21,23,0.85)",
                          border: "1px solid var(--stroke)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        PDF
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* disclaimer */}
        <p className="mt-6 text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
          * Görseller temsilidir. Tip, ölçü ve yerleşimler projeye bağlı olarak değişebilir.
        </p>
      </div>

      {/* Lightbox */}
      <PlanLightbox
        open={open}
        onClose={() => setOpenIdx(null)}
        items={plans.map((p) => ({ src: p.image, alt: `${p.title} kat planı` }))}
        index={openIdx ?? 0}
        setIndex={(n) => setOpenIdx(n)}
      />
    </section>
  );
}

/* ------------ Lightbox (image modal) ------------ */
function PlanLightbox({
  open,
  onClose,
  items,
  index,
  setIndex,
}: {
  open: boolean;
  onClose: () => void;
  items: { src: string; alt?: string }[];
  index: number;
  setIndex: (n: number) => void;
}) {
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) setIndex(index - 1);
      if (e.key === "ArrowRight" && hasNext) setIndex(index + 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, hasPrev, hasNext, index, setIndex, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(0,0,0,0.75)", color: "#fff" }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[92vw] max-w-4xl"
            initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="aspect-[4/3] bg-black">
                <img
                  src={items[index]?.src}
                  alt={items[index]?.alt || "Kat planı"}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            </div>

            {/* controls */}
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => hasPrev && setIndex(index - 1)}
                disabled={!hasPrev}
                className="text-xs px-3 py-1 rounded-full disabled:opacity-40"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.32)",
                  backdropFilter: "blur(6px)",
                }}
              >
                ← Önceki
              </button>

              <div className="text-xs opacity-80">
                {index + 1} / {items.length}
              </div>

              <button
                onClick={() => hasNext && setIndex(index + 1)}
                disabled={!hasNext}
                className="text-xs px-3 py-1 rounded-full disabled:opacity-40"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.32)",
                  backdropFilter: "blur(6px)",
                }}
              >
                Sonraki →
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute -top-3 -right-3 text-xs px-2.5 py-1 rounded-full"
              style={{
                background: `${ORANGE}33`,
                color: "#fff",
                border: `1px solid ${ORANGE}66`,
                backdropFilter: "blur(6px)",
              }}
            >
              Kapat ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------- Default placeholder plans (replace with your assets) --------- */
const DEFAULT_PLANS: Plan[] = [
  {
    id: "p-1plus1",
    title: "1+1",
    size: "56–78 m²",
    block: "A Blok",
    floors: "Z+9",
    image: "/Perla-II-11-Loft-Residence-Grand.webp",
    pdf: "/files/perla2/1plus1.pdf",
    note: "Yüksek talep",
  },
  {
    id: "p-2plus1",
    title: "2+1",
    size: "82–105 m²",
    block: "A/B Blok",
    floors: "Z+12",
    image: "/Perla-II-21-Luxury-Suite.webp",
    pdf: "/files/perla2/2plus1.pdf",
  },
  {
    id: "p-3plus1",
    title: "3+1",
    size: "120–145 m²",
    block: "B Blok",
    floors: "Z+14",
    image: "/Perla-II-11-Loft-Residence-Grand.webp",
    pdf: "/files/perla2/3plus1.pdf",
  },
];
