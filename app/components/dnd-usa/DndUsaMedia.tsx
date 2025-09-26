// app/components/dnd-usa/DndUsaMedia.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type MediaType = "Röportaj" | "Konuşma" | "Makale" | "Video";
type MediaItem = {
  id: string;
  type: MediaType;
  title: string;
  outlet?: string;     // medya/etkinlik
  date?: string;       // "2025-05" veya "Mayıs 2025"
  href?: string;       // makale/röportaj linki
  video?: {            // YouTube/Vimeo/MP4
    src: string;
    kind?: "youtube" | "vimeo" | "mp4";
    poster?: string;
  };
  logo?: string;       // outlet/etkinlik logo
  note?: string;       // kısa açıklama
  tags?: string[];     // arama
};

export default function DndUsaMedia({
  title = "Basında & Konuşmalar",
  subtitle = "ABD pazarındaki röportajlar, makaleler ve sahne konuşmaları.",
  items = DEFAULT_ITEMS,
  showSearch = true,
  showFeatured = true,
}: {
  title?: string;
  subtitle?: string;
  items?: MediaItem[];
  showSearch?: boolean;
  showFeatured?: boolean;
}) {
  const [filter, setFilter] = useState<MediaType | "Tümü">("Tümü");
  const [query, setQuery] = useState("");
  const [openVideo, setOpenVideo] = useState<MediaItem["video"] | null>(null);

  const filters: (MediaType | "Tümü")[] = ["Tümü", "Röportaj", "Konuşma", "Makale", "Video"];

  const visible = useMemo(() => {
    const base = filter === "Tümü" ? items : items.filter(i => i.type === filter);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(i => `${i.title} ${i.outlet ?? ""} ${i.note ?? ""} ${i.date ?? ""} ${i.tags?.join(" ") ?? ""}`.toLowerCase().includes(q));
  }, [filter, items, query]);

  // accessibility: close on Esc
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenVideo(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // pick a featured video if any
  const featured = showFeatured ? items.find(i => i.type === "Video" && i.video) : undefined;

  return (
    <section
      aria-label="DND USA — Basında & Konuşmalar"
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
                radial-gradient(28rem 20rem at 15% 100%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 0%, ${ORANGE}14, transparent 70%)
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

        {/* featured video */}
        {featured?.video && (
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-8 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
              border: "1px solid var(--stroke)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="aspect-[16/9] relative">
              {featured.video.kind === "mp4" ? (
                <video controls poster={featured.video.poster} className="w-full h-full object-contain bg-black">
                  <source src={featured.video.src} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={featured.video.src}
                  title={featured.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}>
                  Öne Çıkan Video
                </span>
                {featured.outlet && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                    {featured.outlet}
                  </span>
                )}
                {featured.date && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                    {featured.date}
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-base sm:text-lg font-semibold">{featured.title}</h3>
              {featured.note && <p className="mt-1 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>{featured.note}</p>}
            </div>
          </motion.div>
        )}

        {/* filters + search */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {filters.map((f) => {
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

          {showSearch && (
            <div className="ml-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ara: başlık, etkinlik, yıl…"
                className="text-xs rounded-full px-3 py-1 outline-none"
                style={{
                  background: "rgba(20,21,23,0.05)",
                  border: "1px solid var(--stroke)",
                  color: "rgba(20,21,23,0.85)",
                }}
              />
            </div>
          )}
        </motion.div>

        {/* grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((m, i) => {
            const badgeColor = m.type === "Konuşma" ? ORANGE : TEAL;
            return (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
                className="rounded-2xl p-5 h-full flex flex-col"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
                  border: "1px solid var(--stroke)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* header row */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: `${badgeColor}14`, color: badgeColor, border: `1px solid ${badgeColor}33` }}
                  >
                    {m.type}
                  </span>
                  <div className="flex items-center gap-2">
                    {m.outlet ? (
                      <span className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                        {m.outlet}
                      </span>
                    ) : null}
                    {m.date ? (
                      <span className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                        {m.date}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* title */}
                <h3 className="mt-2 text-base sm:text-lg font-semibold">{m.title}</h3>

                {/* note */}
                {m.note ? (
                  <p className="mt-1 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>
                    {m.note}
                  </p>
                ) : null}

                {/* actions */}
                <div className="mt-4 flex items-center gap-2 mt-auto">
                  {m.href ? (
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
                    >
                      Oku
                    </a>
                  ) : null}
                  {m.video?.src ? (
                    <button
                      onClick={() => setOpenVideo(m.video!)}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
                    >
                      İzle
                    </button>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Press kit CTA (optional) */}
        <div className="mt-10 text-center">
          <a
            href="/files/dnd-usa-press-kit.zip"
            className="inline-block rounded-full px-6 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: TEAL,
              color: "#fff",
              border: `1px solid ${TEAL}55`,
              boxShadow: `0 12px 28px ${TEAL}44`,
            }}
          >
            Press Kit İndir
          </a>
        </div>
      </div>

      {/* Lightbox for videos */}
      <VideoLightbox video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}

/* ----------- Video modal ----------- */
function VideoLightbox({
  video,
  onClose,
}: {
  video: MediaItem["video"] | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(0,0,0,0.75)", color: "#fff" }}
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
                {video?.kind === "mp4" ? (
                  <video controls poster={video?.poster} className="w-full h-full object-contain bg-black">
                    <source src={video?.src} type="video/mp4" />
                  </video>
                ) : (
                  <iframe
                    src={video?.src}
                    title="Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
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

/* ----------- Sample items (replace with real links) ----------- */
const DEFAULT_ITEMS: MediaItem[] = [
  {
    id: "u1",
    type: "Röportaj",
    title: "Massachusetts’te Lüks Konut Trendleri",
    outlet: "Real Estate Review",
    date: "2024",
    href: "#",
    note: "DND USA yaklaşımı ve müşteri deneyimi.",
    logo: "/logos/press-rer.svg",
    tags: ["ABD", "trend"],
  },
  {
    id: "u2",
    type: "Konuşma",
    title: "Sürdürülebilir Tasarım ve Kentsel Yaşam",
    outlet: "Boston Design Week",
    date: "2023",
    video: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", kind: "youtube", poster: "/images/press/bdw.jpg" },
    tags: ["konuşma", "boston"],
  },
  {
    id: "u3",
    type: "Makale",
    title: "ABD’de Proje Geliştirme Süreçlerinde En İyi Uygulamalar",
    outlet: "Design Today",
    date: "2023",
    href: "#",
    tags: ["makale", "süreç"],
  },
  {
    id: "u4",
    type: "Video",
    title: "DND USA — Proje Turu",
    outlet: "Company",
    date: "2024",
    video: { src: "/videos/dnd-usa-tour.mp4", kind: "mp4", poster: "/images/press/tour-poster.jpg" },
  },
  {
    id: "u5",
    type: "Röportaj",
    title: "Yatırımcı Perspektifi: DND ile Çalışmak",
    outlet: "Market Watch",
    date: "2022",
    href: "#",
  },
  {
    id: "u6",
    type: "Konuşma",
    title: "Konutta Kalite Standartları",
    outlet: "Mass Build Summit",
    date: "2024",
    video: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", kind: "youtube" },
  },
];
