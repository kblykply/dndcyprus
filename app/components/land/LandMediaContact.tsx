// app/components/land/LandMediaContact.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type SectionData = {
  heading: string;
  subhead?: string;
  tone: "light" | "dark";
  // Video: prefer embed; fallback to file + poster
  video?: { embedUrl?: string; src?: string; poster?: string; caption?: string };
  // Gallery images (click to enlarge)
  gallery: { src: string; alt?: string }[];
  // Downloads
  downloads?: { label: string; href: string }[];
  // Contact CTAs
  contact: {
    contactHref: string;
    whatsappHref?: string;
    phoneHref?: string; // e.g., tel:+90...
  };
};

// ====== DATA (edit here) ======
const DATA: SectionData = {
  heading: "Medya & İletişim",
  subhead:
    "Arsa çevresi ve parsel görünümünü fotoğraf & drone görüntüleri ile inceleyin. Detaylar ve yerinde keşif için bize ulaşın.",
  tone: "dark",
  video: {
    // If you have a YouTube/Vimeo embed URL, set it here:
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
    // Or use file + poster instead of embed:
    // src: "/land/gecitkale-drone.mp4",
    // poster: "/land/gecitkale-drone-poster.jpg",
    caption: "Drone görünümü — parsel ve çevre doku",
  },
  gallery: [
    { src: "/land/gecitkale-1.jpg", alt: "Parsel ve ana yol bağlantısı" },
    { src: "/land/gecitkale-2.jpg", alt: "Çevredeki konut dokusu" },
    { src: "/land/gecitkale-3.jpg", alt: "Parsel yönlenmesi ve topoğrafya" },
    { src: "/land/gecitkale-4.jpg", alt: "Saha görüntüsü — gündüz" },
    { src: "/land/gecitkale-5.jpg", alt: "Saha görüntüsü — akşamüstü" },
    { src: "/land/gecitkale-6.jpg", alt: "Yakın çevre — gelişim alanı" },
  ],
  downloads: [
    { label: "Konum & Erişim PDF", href: "/downloads/gecitkale-location.pdf" },
    { label: "Survey / Parsel Özeti", href: "/downloads/gecitkale-survey.pdf" },
  ],
  contact: {
    contactHref: "/contact",
    whatsappHref:
      "https://wa.me/905555555555?text=Merhaba%2C%20Ge%C3%A7itkale%20arsa%20detay%C4%B1%20ve%20ke%C5%9Fif%20i%C3%A7in%20ileti%C5%9Fime%20ge%C3%A7ebilir%20miyiz%3F",
    phoneHref: "tel:+905555555555",
  },
};

export default function LandMediaContact() {
  const { heading, subhead, tone, video, gallery, downloads, contact } = DATA;
  const isLight = tone === "light";

  // Lightbox state
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, gallery.length]);

  return (
    <section
      aria-label="Land Project — Media & Contact"
      className="relative overflow-hidden"
      style={{ background: isLight ? "#0b0c0d0d" : "#0b0c0d", color: isLight ? "#141517" : "#ffffff" }}
      data-bg={isLight ? "light" : "dark"}
    >
      {/* subtle brand wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(60rem 30rem at 10% 0%, ${TEAL}18, transparent 70%),
            radial-gradient(60rem 30rem at 90% 100%, ${ORANGE}18, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="text-2xl sm:text-3xl font-semibold"
          >
            {heading}
          </motion.h2>
          {subhead ? (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="mt-2 text-sm sm:text-base mx-auto max-w-3xl"
              style={{ color: isLight ? "rgba(20,21,23,0.70)" : "rgba(255,255,255,0.88)" }}
            >
              {subhead}
            </motion.p>
          ) : null}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Video + Gallery */}
          <div className="lg:col-span-8 space-y-6">
            {/* Media (Video) */}
            {video ? (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  background: isLight ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.08)",
                  borderColor: isLight ? "rgba(20,21,23,0.10)" : "rgba(255,255,255,0.18)",
                }}
              >
                <div className="aspect-video relative">
                  {video.embedUrl ? (
                    <iframe
                      title="Drone / Tanıtım Videosu"
                      src={video.embedUrl}
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      referrerPolicy="origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={video.src}
                      poster={video.poster}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      playsInline
                      controls
                      preload="metadata"
                    />
                  )}

                  {/* Caption blur card */}
                  {video.caption ? (
                    <div
                      className="absolute left-3 right-3 bottom-3 rounded-xl p-3 sm:p-4 backdrop-blur-md border"
                      style={{
                        background: isLight ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                        borderColor: isLight ? "rgba(20,21,23,0.12)" : "rgba(255,255,255,0.25)",
                        color: "#fff",
                      }}
                    >
                      <div className="text-xs sm:text-sm">{video.caption}</div>
                    </div>
                  ) : null}
                </div>

                {/* Subtle brand overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(40rem 18rem at -10% 0%, ${TEAL}11, transparent 70%),
                      radial-gradient(40rem 18rem at 110% 100%, ${ORANGE}11, transparent 70%)
                    `,
                  }}
                />
              </motion.div>
            ) : null}

            {/* Gallery grid */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              {gallery.map((g, i) => (
                <button
                  key={g.src + i}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group relative rounded-xl overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    borderColor: isLight ? "rgba(20,21,23,0.10)" : "rgba(255,255,255,0.18)",
                  }}
                >
                  <img
                    src={g.src}
                    alt={g.alt || `Galeri görseli ${i + 1}`}
                    className="h-36 md:h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(60% 60% at 50% 50%, ${ORANGE}22, transparent 70%)` }}
                  />
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right: Contact + Downloads */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Contact card */}
            <div
              className="rounded-2xl p-5 sm:p-6 border backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,.18)]"
              style={{
                background: isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.08)",
                borderColor: isLight ? "rgba(20,21,23,0.12)" : "rgba(255,255,255,0.20)",
              }}
            >
              <h3 className="text-lg font-semibold">İletişim</h3>
              <p
                className="mt-1 text-sm"
                style={{ color: isLight ? "rgba(20,21,23,0.75)" : "rgba(255,255,255,0.85)" }}
              >
                Detaylı bilgi ve yerinde keşif randevusu için ekibimizle iletişime geçin.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={contact.contactHref}
                  className="rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
                  style={{
                    background: TEAL,
                    color: "#fff",
                    border: `1px solid ${TEAL}66`,
                    boxShadow: `0 12px 28px ${TEAL}44`,
                  }}
                >
                  İletişim Formu
                </a>

                {contact.whatsappHref ? (
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-5 py-2.5 text-sm font-medium backdrop-blur-md"
                    style={{
                      background: `${ORANGE}22`,
                      color: "#fff",
                      border: `1px solid ${ORANGE}66`,
                      boxShadow: `0 10px 22px ${ORANGE}33`,
                    }}
                  >
                    WhatsApp
                  </a>
                ) : null}

                {contact.phoneHref ? (
                  <a
                    href={contact.phoneHref}
                    className="rounded-full px-5 py-2.5 text-sm font-medium"
                    style={{
                      background: "transparent",
                      color: isLight ? "#141517" : "#fff",
                      border: isLight ? "1px solid rgba(20,21,23,0.20)" : "1px solid rgba(255,255,255,0.35)",
                    }}
                  >
                    Ara
                  </a>
                ) : null}
              </div>
            </div>

            {/* Downloads */}
            {downloads?.length ? (
              <div
                className="rounded-2xl p-5 sm:p-6 border backdrop-blur-md"
                style={{
                  background: isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.08)",
                  borderColor: isLight ? "rgba(20,21,23,0.12)" : "rgba(255,255,255,0.20)",
                }}
              >
                <h3 className="text-lg font-semibold mb-3">İndirilebilir Dokümanlar</h3>
                <ul className="space-y-2">
                  {downloads.map((d, i) => (
                    <li key={d.href + i}>
                      <a
                        href={d.href}
                        className="group inline-flex items-center gap-2 text-sm rounded-full px-3 py-2 border"
                        style={{
                          color: isLight ? TEAL : "#fff",
                          borderColor: isLight ? `${TEAL}55` : "rgba(255,255,255,0.35)",
                          background: isLight ? `${TEAL}0D` : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <DownloadIcon />
                        {d.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-3 text-xs"
                  style={{ color: isLight ? "rgba(20,21,23,0.65)" : "rgba(255,255,255,0.75)" }}
                >
                  *Detaylı teknik çizimler ve resmi yazışmalar talep üzerine paylaşılır.
                </p>
              </div>
            ) : null}
          </motion.aside>
        </div>
      </div>

      {/* Lightbox */}
      {openIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.90))",
              backdropFilter: "blur(2px)",
            }}
          />
          <button
            aria-label="Kapat"
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 z-50 rounded-full px-3 py-2 text-sm font-medium"
            style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.28)" }}
          >
            Kapat
          </button>

          {/* Nav buttons */}
          <button
            aria-label="Önceki"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full px-3 py-2 text-sm font-medium"
            style={{ background: `${TEAL}33`, color: "#fff", border: `1px solid ${TEAL}66` }}
          >
            ←
          </button>
          <button
            aria-label="Sonraki"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i + 1) % gallery.length));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full px-3 py-2 text-sm font-medium"
            style={{ background: `${ORANGE}33`, color: "#fff", border: `1px solid ${ORANGE}66` }}
          >
            →
          </button>

          <div className="absolute inset-0 grid place-items-center p-4 z-40" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[openIndex].src}
              alt={gallery[openIndex].alt || "Büyük görsel"}
              className="max-h-[90vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ===== Icons ===== */
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M5 20h14v-2H5v2z"></path>
      <path d="M11 4h2v8h3l-4 4-4-4h3z"></path>
    </svg>
  );
}
