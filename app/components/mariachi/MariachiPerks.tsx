// app/components/mariachi/MariachiPerks.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { Waves, BadgePercent, Info, ArrowRight } from "lucide-react";

/** ---- INTERNAL DEFAULTS ---- */
const MARIACHI_DEFAULTS = {
  logoSrc: "/logos/mariachi.png",
  embedUrl:
    "https://www.youtube-nocookie.com/embed/AobeR8p2Aq4?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=AobeR8p2Aq4&playsinline=1&modestbranding=1",
  videoSrc: null as string | null,
  videoPoster: undefined as string | undefined,
  bgImage: "/mariachi/7.jpg",
  title: "Mariachi Beach Club Avantajları",
  subtitle: "Gündüz deniz & güneş, akşam ritim — tek adreste.",
  note: "Kimlik doğrulaması gerekebilir. Kampanya tarihleri ve gün koşulları değişebilir.",
  overlayOpacity: 0.45,
  mariachiHref: "/mariachi",
};

type Perk = { title: string; desc?: string; icon?: React.ReactNode };

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/** Zoom used to crop away the side bars of the original video inside the player */
const ZOOM_CROP = 1.55; // tweak 1.00–1.35 as needed (1.00 = no crop)

const WRAP: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06 },
  },
};
const ITEM: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function MariachiPerks() {
  const {
    logoSrc,
    embedUrl,
    videoSrc,
    videoPoster,
    bgImage,
    overlayOpacity,
    title,
    subtitle,
    note,
    mariachiHref,
  } = MARIACHI_DEFAULTS;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasLogo = !!logoSrc?.trim();
  const hasEmbed = !!embedUrl?.trim();
  const hasVideo = !!videoSrc?.trim();
  const hasBg = !!bgImage?.trim();
  const hasLink = !!mariachiHref?.trim();
  const isExternal = hasLink && /^https?:\/\//i.test(mariachiHref!);

  // Autoplay for MP4 (not for iframe)
  useEffect(() => {
    if (!hasVideo || hasEmbed) return;
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting && entry.intersectionRatio > 0.35
          ? el.play().catch(() => {})
          : el.pause(),
      { threshold: [0, 0.35, 0.75] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasVideo, hasEmbed]);

  const perks: Perk[] = [
    {
      title: "Ücretsiz Giriş",
      desc: "Proje sakinleri ve misafirleri için giriş ücreti alınmaz.",
      icon: <Waves className="h-5 w-5" />,
    },
    {
      title: "%10 İndirim",
      desc: "Restoran, havuz barı ve şezlong/cabana harcamalarında ekstra avantaj.",
      icon: <BadgePercent className="h-5 w-5" />,
    },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0b1220", color: "#ffffff" }}
      aria-label="Mariachi Beach Club – Avantajlar"
    >
      {/* Background + dark overlay (page backdrop) */}
      {hasBg && (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(6,10,16,${overlayOpacity}), rgba(6,10,16,${overlayOpacity}))`,
        }}
      />

      {/* Colored auras */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(39,149,155,0.28), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(241,92,52,0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* GLASS WRAPPER — stable blur layer (no backdrop-filter) */}
        <div className="relative rounded-[24px] p-6 sm:p-8 lg:p-10 overflow-hidden border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          {/* 1) Blurred clone of section bg underneath content */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(6,10,16,${overlayOpacity}), rgba(6,10,16,${overlayOpacity})), url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(18px)",
              transform: "scale(1.06)",
            }}
          />
          {/* 2) Frost tint on top of blur */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-[24px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.10))",
            }}
          />

          {/* Header */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.35, once: false }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <motion.div variants={ITEM} className="relative h-12 w-auto sm:h-14">
              {hasLogo && (
                <Image
                  src={logoSrc}
                  alt="Mariachi Beach Club"
                  width={220}
                  height={56}
                  className="h-12 sm:h-14 w-auto object-contain"
                  priority
                />
              )}
            </motion.div>
            <motion.div variants={ITEM} className="min-w-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                {title}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-white/85">{subtitle}</p>
            </motion.div>
          </motion.div>

          {/* Body */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* LEFT: Video + CTA (vertically centered on lg) */}
            {(hasEmbed || hasVideo) && (
              <div className="flex flex-col lg:self-center">
                {/* Transparent card */}
                <motion.div
                  variants={WRAP}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.25, once: false }}
                  className="relative overflow-hidden rounded-2xl ring-1 ring-white/20 bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                >
                  {/* Aspect-ratio frame that crops the player content */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    {hasEmbed ? (
                      // YOUTUBE IFRAME — zoom to crop side bars
                      <div
                        className="absolute inset-0 origin-center"
                        style={{ transform: `scale(${ZOOM_CROP})` }}
                      >
                        <iframe
                          title="Mariachi Beach Club tanıtım videosu"
                          src={embedUrl!}
                          className="h-full w-full block"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          referrerPolicy="origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      // MP4 VIDEO — object-cover + optional extra zoom
                      <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={videoSrc!}
                        poster={videoPoster}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        aria-label="Mariachi Beach Club tanıtım videosu"
                        style={{ transform: `scale(${ZOOM_CROP})`, transformOrigin: "center" }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* CTA below video — solid black */}
                {hasLink && (
                  <Link
                    href={mariachiHref!}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40"
                    style={{
                      background: "#000",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.22)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                    }}
                    aria-label="Mariachi sayfasına git"
                  >
                    Mariachi Sayfası
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}

            {/* RIGHT: Perks */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.25, once: false }}
              className="relative rounded-2xl p-5 sm:p-6 lg:p-7 ring-1 ring-white/20 bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="grid grid-cols-1 gap-4">
                {perks.map((perk, i) => (
                  <motion.div
                    key={perk.title + i}
                    variants={ITEM}
                    className="flex items-start gap-3 rounded-xl p-4 ring-1 ring-white/15 bg-transparent"
                  >
                    <div
                      className="shrink-0 grid place-items-center h-10 w-10 rounded-full"
                      style={{
                        background: "#fff",
                        border: `1px solid ${TEAL}33`,
                        boxShadow: `0 8px 18px ${TEAL}1f`,
                        color: TEAL,
                      }}
                      aria-hidden
                    >
                      {perk.icon ?? <Waves className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {perk.title}
                      </h3>
                      {perk.desc && (
                        <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-white/85">
                          {perk.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Info */}
              <div className="mt-5 flex items-start gap-2 text-xs sm:text-[13px] text-white/80">
                <Info className="h-4 w-4 shrink-0" />
                <p className="leading-relaxed">{note}</p>
              </div>

              {/* Accent strip */}
              <div
                className="mt-6 h-1.5 w-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})` }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
