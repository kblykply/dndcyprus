// app/components/projects/Perla2Gallery.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type MediaItem = {
  src: string;
  alt?: string;
  type?: "image" | "video";
  poster?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: MediaItem[];
  initialCount?: number;
};

export default function Perla2Gallery({
  title = "Galeri",
  subtitle = "Proje görselleri ve renderlardan seçkiler.",
  items = DEFAULT_ITEMS,
  initialCount = 6,
}: Props) {
  const [limit, setLimit] = useState(Math.min(initialCount, items.length));
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const visible = useMemo(() => items.slice(0, limit), [items, limit]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section
      aria-label="La Joya Perla II — Galeri"
      className="relative overflow-hidden"
      style={{
        background: "#fff",
        color: "#141517",
        ["--stroke"]: "rgba(20,21,23,0.08)",
      } as React.CSSProperties & Record<"--stroke", string>}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((m, i) => (
            <button
              key={m.src + i}
              onClick={() => openAt(i)}
              className="group rounded-2xl overflow-hidden text-left"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                border: "1px solid var(--stroke)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="relative aspect-[16/10] bg-white overflow-hidden">
                {m.type === "video" ? (
                  <img
                    src={m.poster || "/images/video-poster.jpg"}
                    alt={m.alt || "Video"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={m.src}
                    alt={m.alt || "Galeri görseli"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}
                <span
                  className="absolute right-3 bottom-3 text-[11px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(20,21,23,0.55)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.35)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {m.type === "video" ? "Videoyu Gör" : ""}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Load more */}
        {limit < items.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setLimit((n) => Math.min(n + 6, items.length))}
              className="rounded-xl px-5 py-2.5 text-sm font-medium"
              style={{
                background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                color: "#fff",
                border: `1px solid ${TEAL}55`,
                boxShadow: `0 10px 28px ${TEAL}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`;
              }}
            >
              Daha Fazla Göster
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox open={open} onClose={() => setOpen(false)} items={items} index={index} setIndex={setIndex} />
    </section>
  );
}

/* ================= Lightbox ================= */

function Lightbox({
  open,
  onClose,
  items,
  index,
  setIndex,
}: {
  open: boolean;
  onClose: () => void;
  items: MediaItem[];
  index: number;
  setIndex: (n: number) => void;
}) {
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
  const startX = useRef<number | null>(null);

  const goPrev = useCallback(() => hasPrev && setIndex(index - 1), [hasPrev, index, setIndex]);
  const goNext = useCallback(() => hasNext && setIndex(index + 1), [hasNext, index, setIndex]);

  // keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext, onClose]);

  // touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) goPrev();
    if (dx < -40) goNext();
    startX.current = null;
  };

  // lock background scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "visible";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(0,0,0,0.8)", color: "#fff" }}
          onClick={onClose}
        >
          {/* CONTENT */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-modal="true"
            role="dialog"
          >
            {/* MEDIA — no fixed aspect, so no side black bars */}
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(8px)",
              }}
            >
              {items[index]?.type === "video" ? (
                <video
                  controls
                  poster={items[index]?.poster}
                  className="block max-w-[92vw] max-h-[82vh]"
                >
                  <source src={items[index]?.src} />
                </video>
              ) : (
                <img
                  src={items[index]?.src}
                  alt={items[index]?.alt || "Galeri"}
                  className="block w-auto h-auto max-w-[92vw] max-h-[82vh] select-none"
                  draggable={false}
                />
              )}
            </div>

            {/* FOOTER CONTROLS */}
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={goPrev}
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
                onClick={goNext}
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

            {/* CLOSE */}
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

/* ============ Default sample items (replace with your assets) ============ */
const DEFAULT_ITEMS: MediaItem[] = [
  { src: "/perla-ii/1.jpg", alt: "Ana cephe render", type: "image" },
  { src: "/perla-ii/2.jpg", alt: "Peyzaj ve havuz alanı", type: "image" },
  { src: "/perla-ii/3.jpg", alt: "Lobi ve ortak alan", type: "image" },
  { src: "/perla-ii/4.jpg", alt: "Daire içi—oturma odası", type: "image" },
  { src: "/perla-ii/5.jpg", alt: "Daire içi—mutfak", type: "image" },
  { src: "/perla-ii/6.jpg", alt: "Daire içi—yatak odası", type: "image" },
  { src: "/perla-ii/7.jpg", alt: "Daire içi—yatak odası", type: "image" },
  { src: "/perla-ii/8.jpg", alt: "Daire içi—yatak odası", type: "image" },
  { src: "/perla-ii/9.jpg", alt: "Daire içi—yatak odası", type: "image" },
  { src: "/perla-ii/10.jpg", alt: "Daire içi—yatak odası", type: "image" },
];
