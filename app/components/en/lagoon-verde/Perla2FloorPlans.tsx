// app/components/projects/Perla2FloorPlans.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/* ---------------- Types ---------------- */
type AreaRow = { label: string; value: string };

type Variant = {
  name: string;          // "GRAND", "DELUXE" ...
  note?: string;
  image: string;         // main preview image path
  pdf?: string;          // optional brochure / plan PDF
  areas: AreaRow[];
  gallery?: string[];    // lightbox gallery
  totals?: {
    kapali?: string;     // "Toplam Kapalı Alan"
    kullanim?: string;   // "Toplam Kullanım Alanı"
  };
};

type Plan = {
  id: string;
  title: string;         // "1+1", "2+1"...
  size?: string;         // "56–78 m²"
  note?: string;         // "Sınırlı sayıda"
  /** @deprecated Kept for backward compatibility but NEVER rendered */
  startPrice?: string;   // ignored
  variants: Variant[];   // one or more variants (e.g., GRAND)
};

type Props = {
  title?: string;
  subtitle?: string;
  plans?: Plan[];
};

/* ---------------- Component ---------------- */
export default function Perla2FloorPlans({
 title = "Lagoon Verde Floor Plans",
subtitle =
  "Sample plans for apartment types. For detailed typologies and dimensions, please contact our sales team.",

  plans = DEFAULT_PLANS,
}: Props) {
  const [planIdx, setPlanIdx] = React.useState(0);
  const [variantIdx, setVariantIdx] = React.useState(0);

  // Lightbox owns the images it should show (main-only or gallery)
  const [lightbox, setLightbox] = React.useState<{
    open: boolean;
    idx: number;
    images: string[];
  }>({ open: false, idx: 0, images: [] });

  const plan = plans[planIdx];
  const variant = plan.variants[variantIdx];

  // reset variant when plan changes
  React.useEffect(() => setVariantIdx(0), [planIdx]);

  // ---- Openers ----
  // Büyüt -> open ONLY the main floor plan image
  const openMainImage = () =>
    setLightbox({ open: true, idx: 0, images: [variant.image] });

  // Thumbnails -> open gallery (if any)
  const openGalleryAt = (i: number) => {
    const gallery = variant.gallery ?? [];
    if (gallery.length === 0) return;
    setLightbox({ open: true, idx: i, images: gallery });
  };

  const closeLightbox = () => setLightbox({ open: false, idx: 0, images: [] });

  const nextImage = React.useCallback(() => {
    setLightbox((s) => {
      const total = s.images.length;
      return total > 0 ? { ...s, idx: (s.idx + 1) % total } : s;
    });
  }, []);

  const prevImage = React.useCallback(() => {
    setLightbox((s) => {
      const total = s.images.length;
      return total > 0 ? { ...s, idx: (s.idx - 1 + total) % total } : s;
    });
  }, []);

  // keyboard support for lightbox
  React.useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, nextImage, prevImage]);

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
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </div>

        {/* Plan Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="Daire Tipleri">
          {plans.map((p, i) => {
            const active = i === planIdx;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active}
                aria-controls={`plan-panel-${i}`}
                onClick={() => setPlanIdx(i)}
                className={`px-3.5 py-1.5 rounded-full text-sm border transition ${active ? "font-semibold" : ""}`}
                style={{
                  background: active ? `${TEAL}14` : "rgba(255,255,255,0.6)",
                  color: active ? TEAL : "rgba(20,21,23,0.85)",
                  border: `1px solid ${active ? `${TEAL}33` : "var(--stroke)"}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {p.title}
                {p.size ? <span className="ml-2 opacity-70">({p.size})</span> : null}
              </button>
            );
          })}
        </div>

        {/* Variant Tabs (NO price chip) */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Varyantlar">
            {plan.variants.map((v, i) => {
              const active = i === variantIdx;
              return (
                <button
                  key={v.name}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`variant-panel-${planIdx}-${i}`}
                  onClick={() => setVariantIdx(i)}
                  className={`px-3 py-1 rounded-full text-xs border transition ${active ? "font-semibold" : ""}`}
                  style={{
                    background: active ? `${ORANGE}14` : "rgba(255,255,255,0.6)",
                    color: active ? ORANGE : "rgba(20,21,23,0.85)",
                    border: `1px solid ${active ? `${ORANGE}33` : "var(--stroke)"}`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {v.name}
                </button>
              );
            })}
          </div>

          {/* Right side: ONLY informational note, NEVER price */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            {plan.note ? (
              <span
                className="px-2 py-0.5 rounded-full border"
                style={{ background: `${ORANGE}14`, color: ORANGE, borderColor: `${ORANGE}33` }}
              >
                {plan.note}
              </span>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${planIdx}-${variantIdx}`}
            id={`plan-panel-${planIdx}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid items-start gap-8 lg:grid-cols-2"
          >
            {/* Image + actions */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="aspect-[4/3] bg-white">
                <img
                  src={variant.image}
                  alt={`${plan.title} — ${variant.name} kat planı`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="text-sm opacity-80">
                  {plan.title}
                  {plan.size ? <span className="ml-1">• {plan.size}</span> : null}
                  {/* NEVER render price */}
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={openMainImage}
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{ background: `${TEAL}14`, color: TEAL, borderColor: `${TEAL}33` }}
                    aria-label="Görseli büyüt"
                  >
                    Büyüt
                  </button>
                  {variant.pdf ? (
                    <a
                      href={variant.pdf}
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

            {/* Table + gallery */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: "var(--stroke)" }}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">
                    {plan.title} — {variant.name}
                  </h3>
                  {variant.note ? (
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
                    >
                      {variant.note}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="p-4">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {variant.areas.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between border-b pb-2"
                      style={{ borderColor: "rgba(20,21,23,0.08)" }}
                    >
                      <dt className="text-sm">{r.label}</dt>
                      <dd className="text-sm font-medium">{r.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Totals */}
                {(variant.totals?.kapali || variant.totals?.kullanim) ? (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {variant.totals?.kapali ? (
                      <div
                        className="rounded-xl px-3 py-2 border"
                        style={{ borderColor: `${TEAL}33`, background: `${TEAL}0d` }}
                      >
                        <div className="text-xs opacity-75">Total Covered Area</div>
                        <div className="text-base font-semibold">{variant.totals.kapali}</div>
                      </div>
                    ) : null}
                    {variant.totals?.kullanim ? (
                      <div
                        className="rounded-xl px-3 py-2 border"
                        style={{ borderColor: `${ORANGE}33`, background: `${ORANGE}0d` }}
                      >
                        <div className="text-xs opacity-75">Total Usable Area</div>
                        <div className="text-base font-semibold">{variant.totals.kullanim}</div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* ---- Gallery (opens gallery-only in lightbox) ---- */}
                {variant.gallery && variant.gallery.length > 0 ? (
                  <div className="mt-6">
                    <div className="mb-2 text-xs font-medium opacity-70">Galeri</div>
                    <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {variant.gallery.map((src, i) => (
                        <li key={src}>
                          <button
                            onClick={() => openGalleryAt(i)}
                            className="group block w-full aspect-square overflow-hidden rounded-xl border"
                            style={{ borderColor: "var(--stroke)" }}
                            aria-label={`Galeri görseli ${i + 1}`}
                          >
                            <img
                              src={src}
                              alt=""
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                              loading="lazy"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* disclaimer */}
        <p className="mt-8 text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
* Images and dimensions are illustrative. Types, sizes, and layouts may vary depending on the project.
        </p>
      </div>

      {/* ---- Minimal, Professional Lightbox Overlay ---- */}
      <AnimatePresence>
        {lightbox.open && lightbox.images.length > 0 ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Galeri büyütülmüş görünüm"
            onClick={closeLightbox}
          >
            {/* Center stage */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Wrapper holding image + close + arrows */}
              <div className="relative w-full max-w-6xl" style={{ maxHeight: "85vh" }}>
                {/* IMAGE FRAME */}
                <div
                  className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl shadow-2xl bg-black/40"
                  style={{ minHeight: "40vh" }}
                >
                  <img
                    src={lightbox.images[lightbox.idx]}
                    alt=""
                    className="select-none"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "85vh",
                      objectFit: "contain",
                    }}
                    draggable={false}
                  />

                  {/* CLOSE BUTTON: pinned to image frame’s top-right */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-3 right-3 z-10 rounded-full px-3 py-1.5 text-sm font-medium bg-black/60 text-white border border-white/20 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                    aria-label="Kapat"
                  >
                    ✕ Kapat
                  </button>

                  {/* LEFT / RIGHT ARROWS (only if multiple images) */}
                  {lightbox.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-sm bg-black/60 text-white border border-white/20 hover:bg-black/70"
                        aria-label="Önceki"
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-sm bg-black/60 text-white border border-white/20 hover:bg-black/70"
                        aria-label="Sonraki"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Counter / Caption Row */}
                <div className="mt-3 flex items-center justify-between text-white/85 text-xs">
                  <div>
                    {plan.title} — {variant.name}
                  </div>
                  <div className="opacity-80">
                    {lightbox.images.length > 1
                      ? `${lightbox.idx + 1} / ${lightbox.images.length}`
                      : "Plan Görseli"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}


/* ---------------- Sample Data (edit with your real assets) ---------------- */
const DEFAULT_PLANS: Plan[] = [
  {
    id: "lv-1plus0",
    title: "1+0",
    size: "39.18 m² covered • 51.18 m² total usable area",
    variants: [
      {
        name: "Studio Residence",
        image: "/lagoon-verde-interior/floor-plans/studio.webp",
        areas: [
          { label: "Living Room", value: "29.36 m²" },
          { label: "WC - Bathroom", value: "5.48 m²" },
          { label: "Terrace", value: "4.34 m²" },
          { label: "Common Area", value: "6 m²" },
          { label: "Garden", value: "6 m²" },
        ],
        totals: { kapali: "39.18 m²", kullanim: "51.18 m²" },
        gallery: [
          "/lagoon-verde-interior/studio/1.jpg",
          "/lagoon-verde-interior/studio/3.jpg",
          "/lagoon-verde-interior/studio/4.jpg",
          "/lagoon-verde-interior/studio/5.jpg",
          "/lagoon-verde-interior/studio/6.jpg",
        ],
      },
    ],
  },
  {
    id: "lv-1plus1-loft",
    title: "1+1",
    size: "50.13 m² covered • 87.05 m² total usable area",
    variants: [
      {
        name: "Loft Residence",
        image: "/lagoon-verde-interior/floor-plans/loft.webp",
        areas: [
          { label: "Living Room", value: "25.57 m²" },
          { label: "WC - Bathroom", value: "5.48 m²" },
          { label: "Balcony", value: "3.53 m²" },
          { label: "Bedroom", value: "15.55 m²" },
          { label: "Roof Terrace", value: "30.92 m²" },
          { label: "Common Area", value: "6 m²" },
        ],
        totals: { kapali: "50.13 m²", kullanim: "87.05 m²" },
        gallery: [
          "/lagoon-verde-interior/loft/1.jpg",
          "/lagoon-verde-interior/loft/3.jpg",
          "/lagoon-verde-interior/loft/4.jpg",
          "/lagoon-verde-interior/loft/5.jpg",
          "/lagoon-verde-interior/loft/6.jpg",
        ],
      },
    ],
  },
  {
    id: "lv-2plus1-roof",
    title: "2+1",
    size: "70.50 m² covered • 149.4 m² total usable area",
    variants: [
      {
        name: "Roof Residence",
        image: "/lagoon-verde-interior/floor-plans/2plus1roof.webp",
        areas: [
          { label: "Living Room", value: "33.35 m²" },
          { label: "WC - Bathroom", value: "4.77 m²" },
          { label: "Bedroom 1", value: "13.77 m²" },
          { label: "Bedroom 2", value: "15.08 m²" },
          { label: "Balcony", value: "3.53 m²" },
          { label: "Roof Terrace", value: "66.90 m²" },
          { label: "Common Area", value: "12 m²" },
        ],
        totals: { kapali: "70.50 m²", kullanim: "149.4 m²" },
        gallery: [
          "/lagoon-verde-interior/2plus1/1.jpg",
          "/lagoon-verde-interior/2plus1/3.jpg",
          "/lagoon-verde-interior/2plus1/4.jpg",
          "/lagoon-verde-interior/2plus1/5.jpg",
          "/lagoon-verde-interior/2plus1/6.jpg",
          "/lagoon-verde-interior/2plus1/7.jpg",
          "/lagoon-verde-interior/2plus1/8.jpg",
          "/lagoon-verde-interior/2plus1/9.jpg",
        ],
      },
    ],
  },
  {
    id: "lv-2plus1-garden",
    title: "2+1",
    size: "78.37 m² covered • 102.37 m² total usable area",
    variants: [
      {
        name: "Garden Residence",
        image: "/lagoon-verde-interior/floor-plans/2plus1.webp",
        areas: [
          { label: "Living Room", value: "37.42 m²" },
          { label: "WC - Bathroom", value: "5.15 m²" },
          { label: "Bedroom 1", value: "13.36 m²" },
          { label: "Bedroom 2", value: "13.36 m²" },
          { label: "Terrace", value: "9.08 m²" },
          { label: "Garden", value: "12 m²" },
          { label: "Common Area", value: "12 m²" },
        ],
        totals: { kapali: "78.37 m²", kullanim: "102.37 m²" },
        gallery: [
          "/lagoon-verde-interior/2plus1/1.jpg",
          "/lagoon-verde-interior/2plus1/3.jpg",
          "/lagoon-verde-interior/2plus1/4.jpg",
          "/lagoon-verde-interior/2plus1/5.jpg",
          "/lagoon-verde-interior/2plus1/6.jpg",
          "/lagoon-verde-interior/2plus1/7.jpg",
          "/lagoon-verde-interior/2plus1/8.jpg",
          "/lagoon-verde-interior/2plus1/9.jpg",
        ],
      },
    ],
  },
];


