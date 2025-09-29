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
  gallery?: string[];    // <- lightbox gallery
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
  startPrice?: string;   // <- "£129,000'dan başlayan"
  // block?: string;      // <- no longer rendered (kept here only if you still use it elsewhere)
  // floors?: string;     // <- no longer rendered
  variants: Variant[];   // one or more variants (e.g., GRAND)
};

type Props = {
  title?: string;
  subtitle?: string;
  plans?: Plan[];
};

/* ---------------- Component ---------------- */
export default function Perla2FloorPlans({
  title = "Kat Planları",
  subtitle = "Daire tiplerine ait örnek planlar. Detaylı tipoloji ve ölçüler için satış ekibimizle iletişime geçiniz.",
  plans = DEFAULT_PLANS,
}: Props) {
  const [planIdx, setPlanIdx] = React.useState(0);
  const [variantIdx, setVariantIdx] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<{ open: boolean; idx: number }>({ open: false, idx: 0 });

  const plan = plans[planIdx];
  const variant = plan.variants[variantIdx];

  // reset variant when plan changes
  React.useEffect(() => setVariantIdx(0), [planIdx]);

  const openLightboxAt = (idx: number) => setLightbox({ open: true, idx });
  const closeLightbox = () => setLightbox({ open: false, idx: 0 });
  const nextImage = () =>
    setLightbox((s) => {
      const total = variant.gallery?.length ?? 0;
      return total ? { open: true, idx: (s.idx + 1) % total } : s;
    });
  const prevImage = () =>
    setLightbox((s) => {
      const total = variant.gallery?.length ?? 0;
      return total ? { open: true, idx: (s.idx - 1 + total) % total } : s;
    });

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

        {/* Plan Tabs (1+1 / 2+1 / 3+1 ...) */}
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

        {/* Variant Tabs + Start Price chip (NO Blok/Kat) */}
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

          <div className="hidden sm:flex items-center gap-2 text-xs">
            {plan.note ? (
              <span
                className="px-2 py-0.5 rounded-full border"
                style={{ background: `${ORANGE}14`, color: ORANGE, borderColor: `${ORANGE}33` }}
              >
                {plan.note}
              </span>
            ) : null}
            {plan.startPrice ? (
              <span
                className="px-2 py-0.5 rounded-full border"
                style={{ borderColor: `${TEAL}33`, background: `${TEAL}0f`, color: TEAL }}
                aria-label="Başlangıç fiyatı"
              >
                Başlangıç fiyatı: <b className="ml-1">{plan.startPrice}</b>
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
            aria-labelledby=""
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
                  {plan.startPrice ? <span className="ml-1">• {plan.startPrice}</span> : null}
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href={variant.image}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
                  >
                    Büyüt
                  </a>
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
                        <div className="text-xs opacity-75">Toplam Kapalı Alan</div>
                        <div className="text-base font-semibold">{variant.totals.kapali}</div>
                      </div>
                    ) : null}
                    {variant.totals?.kullanim ? (
                      <div
                        className="rounded-xl px-3 py-2 border"
                        style={{ borderColor: `${ORANGE}33`, background: `${ORANGE}0d` }}
                      >
                        <div className="text-xs opacity-75">Toplam Kullanım Alanı</div>
                        <div className="text-base font-semibold">{variant.totals.kullanim}</div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* ---- Gallery (with Lightbox) ---- */}
                {variant.gallery && variant.gallery.length > 0 ? (
                  <div className="mt-6">
                    <div className="mb-2 text-xs font-medium opacity-70">Galeri</div>
                    <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {variant.gallery.map((src, i) => (
                        <li key={src}>
                          <button
                            onClick={() => openLightboxAt(i)}
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
          * Görseller ve ölçüler temsilidir. Tip, ölçü ve yerleşimler projeye bağlı olarak değişebilir.
        </p>
      </div>

      {/* ---- Lightbox Overlay ---- */}
      <AnimatePresence>
        {lightbox.open && variant.gallery && variant.gallery.length > 0 ? (
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
            <div
              className="absolute inset-0 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-5xl w-full">
                <img
                  src={variant.gallery[lightbox.idx]}
                  alt=""
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                {/* Controls */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-3 -right-3 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{ background: `${ORANGE}`, color: "#fff" }}
                  aria-label="Kapat"
                >
                  Kapat
                </button>
                {variant.gallery.length > 1 ? (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{ background: `${TEAL}`, color: "#fff" }}
                      aria-label="Önceki"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{ background: `${TEAL}`, color: "#fff" }}
                      aria-label="Sonraki"
                    >
                      ›
                    </button>
                  </>
                ) : null}
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
    id: "p-1plus1",
    title: "1+1",
    size: "56–78 m²",
    note: "Yüksek talep",
    startPrice: "£129,000'dan başlayan",
    variants: [
      {
        name: "GRAND",
        note: "Örnek yerleşim",
        image: "/Perla-II-11-Loft-Residence-Grand.webp",
        pdf: "/files/perla2/1plus1-grand.pdf",
        areas: [
          { label: "Oturma Odası - Mutfak", value: "23 m²" },
          { label: "WC - Banyo", value: "4 m²" },
          { label: "Yatak Odası", value: "13,5 m²" },
          { label: "Balkon", value: "3 m²" },
          { label: "Çatı Terası Alanı", value: "23 m²" },
          { label: "Ortak Kullanım Alanı", value: "7 m²" },
        ],
        totals: { kapali: "43,5 m²", kullanim: "73,5 m²" },
        gallery: [
          "/perla-ii-in/1.jpg",
          "/perla-ii-in/2.jpg",
          "/perla-ii-in/3.jpg",
          "/perla-ii-in/4.jpg",
        ],
      },
    ],
  },
  {
    id: "p-2plus1",
    title: "2+1",
    size: "82–105 m²",
    startPrice: "£179,000'dan başlayan",
    variants: [
      {
        name: "DELUXE",
        image: "/Perla-II-21-Luxury-Suite.webp",
        pdf: "/files/perla2/2plus1-deluxe.pdf",
        areas: [
          { label: "Oturma Odası - Mutfak", value: "28 m²" },
          { label: "WC - Banyo", value: "4,5 m²" },
          { label: "Ebeveyn Yatak Odası", value: "14 m²" },
          { label: "Yatak Odası", value: "11 m²" },
          { label: "Balkon", value: "5 m²" },
          { label: "Ortak Kullanım Alanı", value: "8 m²" },
        ],
        totals: { kapali: "57,5 m²", kullanim: "70,5 m²" },
        gallery: [
           "/perla-ii-in/5.jpg",
          "/perla-ii-in/6.jpg",
          "/perla-ii-in/7.jpg",
          "/perla-ii-in/8.jpg",
        ],
      },
    ],
  },
  {
    id: "p-3plus1",
    title: "3+1",
    size: "120–145 m²",
    startPrice: "£255,000'dan başlayan",
    variants: [
      {
        name: "CORNER",
        image: "/Perla-II-11-Loft-Residence-Grand.webp",
        pdf: "/files/perla2/3plus1-corner.pdf",
        areas: [
          { label: "Salon - Mutfak", value: "32 m²" },
          { label: "WC - Banyo", value: "5 m²" },
          { label: "Ebeveyn Yatak Odası", value: "16 m²" },
          { label: "Yatak Odası 2", value: "12 m²" },
          { label: "Yatak Odası 3", value: "10 m²" },
          { label: "Balkon", value: "6 m²" },
        ],
        totals: { kapali: "75 m²", kullanim: "93 m²" },
        gallery: [
            "/perla-ii-in/1.jpg",
          "/perla-ii-in/2.jpg",
          "/perla-ii-in/3.jpg",
          "/perla-ii-in/4.jpg",
        ],
      },
    ],
  },
];
