// app/components/about/OzanGallery.tsx
"use client";

import React, {useMemo, useState, useEffect, useCallback} from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Kind = "image" | "video";
type MediaItem = {
  id: string;
  kind: Kind;
  src: string;                // img path OR iframe src (YouTube/Vimeo) / mp4
  poster?: string;            // for mp4 (optional)
  title?: string;
  caption?: string;
  date?: string;
  tags?: string[];            // optional search chips later
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: MediaItem[];
  showFilters?: boolean;
};

export default function OzanGallery({
  title = "Galeri / Medya",
  subtitle = "Etkinlik kareleri, röportajlar ve sahadan görüntüler.",
  items = DEFAULT_ITEMS,
  showFilters = true,
}: Props) {
  const [filter, setFilter] = useState<"Tümü" | "Fotoğraf" | "Video">("Tümü");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const base =
      filter === "Fotoğraf" ? items.filter(i => i.kind === "image")
      : filter === "Video"  ? items.filter(i => i.kind === "video")
      : items;

    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(i =>
      `${i.title ?? ""} ${i.caption ?? ""} ${i.date ?? ""} ${i.tags?.join(" ") ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [items, filter, query]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxItem = lightboxIndex == null ? null : filtered[lightboxIndex];

  const openAt = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => {
    if (lightboxIndex == null) return;
    setLightboxIndex((i) => (i! - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);
  const next = useCallback(() => {
    if (lightboxIndex == null) return;
    setLightboxIndex((i) => (i! + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  // keyboard: Esc / arrows
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex == null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  return (
    <section
      aria-label="Ozan Dökmecioğlu — Galeri / Medya"
      className="relative overflow-hidden"
      style={{ background: "#fff", color: "#141517", ["--stroke" as any]: "rgba(20,21,23,0.08)" }}
    >

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
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* filters + search */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            {(["Tümü", "Fotoğraf", "Video"] as const).map((f) => {
              const active = f === filter;
              const color = active ? TEAL : "rgba(20,21,23,0.85)";
              const bg = active ? `${TEAL}14` : "rgba(20,21,23,0.05)";
              const border = active ? `1px solid ${TEAL}33` : "1px solid var(--stroke)";
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="text-xs px-3 py-1 rounded-full transition-colors"
                  style={{ color, background: bg, border }}
                >
                  {f}
                </button>
              );
            })}
            <div className="ml-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ara (başlık, tarih, etiket)..."
                className="text-xs rounded-full px-3 py-1 outline-none"
                style={{
                  background: "rgba(20,21,23,0.05)",
                  border: "1px solid var(--stroke)",
                  color: "rgba(20,21,23,0.85)",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* masonry */}
        <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-6">
          <AnimatePresence>
            {filtered.map((m, i) => {
              const color = m.kind === "video" ? ORANGE : TEAL;
              return (
                <motion.article
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                  className="mb-6 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    border: "1px solid var(--stroke)",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                  onClick={() => openAt(i)}
                >
                  {/* media preview (auto height for masonry) */}
                  <div className="relative w-full">
                    {m.kind === "image" ? (
                      <img
                        src={m.src}
                        alt={m.title || "Medya"}
                        className="w-full h-auto object-cover block"
                        loading="lazy"
                      />
                    ) : m.poster ? (
                      <img
                        src={m.poster}
                        alt={m.title || "Video"}
                        className="w-full h-auto object-cover block"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full aspect-[16/9] bg-white" />
                    )}

                    {/* overlay */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 80%)",
                        color: "#fff",
                      }}
                    >
                      {m.title && <div className="text-sm font-semibold">{m.title}</div>}
                      {m.caption && (
                        <div className="text-[11px] mt-0.5 opacity-90">{m.caption}</div>
                      )}
                    </div>

                    {/* badges */}
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
                      >
                        {m.kind === "video" ? "Video" : "Fotoğraf"}
                      </span>
                      {m.date && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.75)", color: "#141517", border: "1px solid var(--stroke)" }}
                        >
                          {m.date}
                        </span>
                      )}
                    </div>

                    {/* play button for videos */}
                    {m.kind === "video" && (
                      <div className="absolute inset-0 grid place-items-center">
                        <span
                          className="inline-grid place-items-center h-12 w-12 rounded-full backdrop-blur-md group-hover:scale-105 transition-transform"
                          style={{ background: `${ORANGE}30`, border: `1px solid ${ORANGE}66` }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        onClose={close}
        onPrev={prev}
        onNext={next}
        hasNav={filtered.length > 1}
      />
    </section>
  );
}

/* ---------------- Lightbox (with Prev/Next & keyboard) ---------------- */
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasNav,
}: {
  item: MediaItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNav: boolean;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[92vw] max-w-5xl"
            initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="aspect-[16/9] bg-black">
                {item.kind === "image" ? (
                  <img
                    src={item.src}
                    alt={item.title || "Medya"}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : item.src.includes("youtube.com") || item.src.includes("vimeo.com") ? (
                  <iframe
                    src={item.src}
                    title={item.title || "Video"}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video controls poster={item.poster} className="w-full h-full object-contain bg-black">
                    <source src={item.src} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>

            {/* Top-right close */}
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

            {/* Prev/Next */}
            {hasNav && (
              <>
                <button
                  aria-label="Önceki"
                  onClick={onPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full grid place-items-center"
                  style={{
                    background: `${TEAL}33`,
                    color: "#fff",
                    border: `1px solid ${TEAL}66`,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  ‹
                </button>
                <button
                  aria-label="Sonraki"
                  onClick={onNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full grid place-items-center"
                  style={{
                    background: `${TEAL}33`,
                    color: "#fff",
                    border: `1px solid ${TEAL}66`,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  ›
                </button>
              </>
            )}

            {(item.title || item.caption) && (
              <div className="mt-3 text-center text-sm" style={{ color: "#fff" }}>
                {item.title ? <div className="font-medium">{item.title}</div> : null}
                {item.caption ? <div className="opacity-80 text-xs mt-1">{item.caption}</div> : null}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Sample items ---------------- */
const DEFAULT_ITEMS: MediaItem[] = [
  {
    id: "g1",
    kind: "image",
    src: "/v2ngfn_1702222926.jpg",
    title: "Konferans — CFO Paneli",
    caption: "Sürdürülebilir büyüme ve finansal disiplin",
    date: "2024",
    tags: ["konferans", "cfo"],
  },
  {
    id: "g2",
    kind: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    poster: "/A7405743_.jpg",
    title: "Röportaj — Uluslararası Ölçek",
    caption: "Küresel entegrasyon deneyimi",
    date: "2023",
    tags: ["röportaj", "video"],
  },
  {
    id: "g3",
    kind: "image",
    src: "/ozan-dokmecioglu-cfo-of-the-year.jpg",
    title: "CFO of the Year",
    caption: "Ödül gecesinden kare",
    date: "2018",
    tags: ["ödül", "cfo"],
  },
  {
    id: "g4",
    kind: "image",
    src: "/v2ngfn_1702222926.jpg",
    title: "Etkinlik",
    caption: "İş ortaklarıyla toplantı",
    date: "2022",
  },
  {
    id: "g5",
    kind: "video",
    src: "/videos/ozan-interview.mp4",
    poster: "/A7405743_.jpg",
    title: "CFO Talks",
    caption: "Dönüşüm & teknoloji",
    date: "2022",
  },
  {
    id: "g6",
    kind: "image",
    src: "/ozan-dokmecioglu-cfo-of-the-year.jpg",
    title: "Topluluk Buluşması",
    caption: "Yerel inisiyatiflere destek",
    date: "2023",
  },
];
