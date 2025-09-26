// app/components/about/OzanMedia.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type MediaType = "Röportaj" | "Konuşma" | "Makale" | "Video";
type MediaItem = {
  id: string;
  type: MediaType;
  title: string;
  outlet?: string;     // medya/etkinlik adı
  date?: string;       // "2025-05" ya da "Mayıs 2025"
  href?: string;       // makale/röportaj linki
  video?: {            // YouTube/Vimeo/MP4
    src: string;
    kind?: "youtube" | "vimeo" | "mp4";
    poster?: string;
  };
  logo?: string;       // outlet / etkinlik logo yolu (opsiyonel)
  note?: string;       // kısa açıklama
};

type Props = {
  title?: string;
  subtitle?: string;
  featuredVideo?: MediaItem["video"]; // üstte büyük video (opsiyonel)
  items?: MediaItem[];
};

export default function OzanMedia({
  title = "Basında & Konuşmalar",
  subtitle = "Röportajlar, makaleler ve konferans/seminer konuşmaları.",
  featuredVideo,
  items = DEFAULT_ITEMS,
}: Props) {
  const [filter, setFilter] = useState<MediaType | "Tümü">("Tümü");
  const [openVideo, setOpenVideo] = useState<MediaItem["video"] | null>(null);

  const filters: (MediaType | "Tümü")[] = ["Tümü", "Röportaj", "Konuşma", "Makale", "Video"];
  const visible = useMemo(
    () => (filter === "Tümü" ? items : items.filter((i) => i.type === filter)),
    [filter, items]
  );

  return (
    <section
      aria-label="Ozan Dökmecioğlu — Basında & Konuşmalar"
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
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* featured video (optional) */}
        {featuredVideo ? (
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-8 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
              border: "1px solid var(--stroke)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="aspect-[16/9] bg-black">
              {featuredVideo.kind === "mp4" ? (
                <video controls poster={featuredVideo.poster} className="w-full h-full object-contain">
                  <source src={featuredVideo.src} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={featuredVideo.src}
                  title="Öne çıkan video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        ) : null}

        {/* filters */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {filters.map((f) => {
            const active = f === filter;
            const color = active ? TEAL : "rgba(20,21,23,0.78)";
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
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-5 h-full flex flex-col"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
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
                  {m.date ? (
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)", color: "rgba(20,21,23,0.78)" }}
                    >
                      {m.date}
                    </span>
                  ) : null}
                </div>

                {/* title */}
                <h3 className="mt-2 text-base sm:text-lg font-semibold">{m.title}</h3>

                {/* outlet / logo */}
                {m.outlet || m.logo ? (
                  <div className="mt-1 flex items-center gap-2">
                    {m.logo ? (
                      <img src={m.logo} alt={m.outlet || "Medya"} className="h-5 w-auto object-contain opacity-80" />
                    ) : null}
                    {m.outlet ? (
                      <span className="text-xs" style={{ color: "rgba(20,21,23,0.7)" }}>
                        {m.outlet}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {/* note */}
                {m.note ? (
                  <p className="mt-2 text-sm" style={{ color: "rgba(20,21,23,0.75)" }}>
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
                      Oku / İzle
                    </a>
                  ) : null}
                  {m.video?.src ? (
                    <button
                      onClick={() => setOpenVideo(m.video!)}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
                    >
                      Videoyu Aç
                    </button>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Lightbox for video */}
      <VideoLightbox video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}

/* ============ Video Modal ============ */
function VideoLightbox({
  video,
  onClose,
}: {
  video: Props["featuredVideo"] | null;
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

/* ======== Placeholder items — replace with real links & logos ======== */
const DEFAULT_ITEMS: MediaItem[] = [
  {
    id: "m1",
    type: "Röportaj",
    title: "Uluslararası Büyümede Finansın Rolü",
    outlet: "Business Daily",
    date: "2024",
    href: "#",
    logo: "/logos/press-businessdaily.svg",
    note: "Küresel ölçekte CFO perspektifi ve entegrasyon.",
  },
  {
    id: "m2",
    type: "Konuşma",
    title: "Sürdürülebilir Büyüme: CFO’nun Ajandası",
    outlet: "Finance Summit",
    date: "2023",
    logo: "/logos/event-financesummit.svg",
    video: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", kind: "youtube" },
  },
  {
    id: "m3",
    type: "Makale",
    title: "Küresel Tedarik Zincirlerinde Finansal Dayanıklılık",
    outlet: "Industry Journal",
    date: "2023",
    href: "#",
    logo: "/logos/press-industryjournal.svg",
  },
  {
    id: "m4",
    type: "Video",
    title: "CFO Roundtable: Dönüşüm & Teknoloji",
    outlet: "CFO Talks",
    date: "2022",
    video: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", kind: "youtube" },
  },
  {
    id: "m5",
    type: "Röportaj",
    title: "Keurig Dr Pepper’da Entegrasyon Deneyimi",
    outlet: "Market Watch",
    date: "2021",
    href: "#",
    logo: "/logos/press-marketwatch.svg",
  },
];
