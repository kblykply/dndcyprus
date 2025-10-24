// app/components/ProjectVideoSlider.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/* ---------------- Motion ---------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/* ---------------- Utils ---------------- */
const extractYouTubeId = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v") || "";
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
  } catch {}
  return url;
};
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const toMinSec = (secs?: number) => {
  if (!secs || !isFinite(secs)) return "–:–";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/* ---------------- Types ---------------- */
type CTALink = { label: string; href: string };
type SlideContent = {
  customHeadline: string;
  tagline?: string;
  bullets?: string[];
  primaryCta?: CTALink | null;
  secondaryCta?: CTALink | null;
};

type SlideInput = {
  id: number;
  videoUrl: string;
  backgroundImage?: string;
  badge?: string;
  content: SlideContent;
};

export type ProjectVideoSliderProps = {
  slides?: SlideInput[];
  autoplayMs?: number; // default 10000
  className?: string;
};

/* ---------------- YouTube API Loader ---------------- */
let ytApiPromise: Promise<any> | null = null;
function ensureYouTubeAPI() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve) => {
      const existing = document.getElementById("youtube-iframe-api");
      if (!existing) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = () => resolve((window as any).YT);
      const check = () => {
        if ((window as any).YT && (window as any).YT.Player) resolve((window as any).YT);
        else setTimeout(check, 120);
      };
      check();
    });
  }
  return ytApiPromise;
}

/* ---------------- Main Component ---------------- */
export default function ProjectVideoSlider({
  autoplayMs = 10000,
  className = "",
  slides = DEFAULT_SLIDES,
}: ProjectVideoSliderProps) {
  const playersRef = useRef<any[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);
  const [autoplayStopped, setAutoplayStopped] = useState(false);

  const registerPlayer = useCallback((index: number, player: any | null) => {
    playersRef.current[index] = player;
  }, []);

  const playOnly = useCallback((activeIndex: number) => {
    playersRef.current.forEach((p, i) => {
      if (!p) return;
      try {
        if (i === activeIndex) {
          p.playVideo?.();
        } else {
          p.pauseVideo?.();
          p.seekTo?.(0, true);
        }
      } catch {}
    });
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayStopped) return;
    try {
      swiperRef.current?.autoplay?.stop();
      setAutoplayStopped(true);
    } catch {}
  }, [autoplayStopped]);

  return (
    <section
      aria-label="Proje Video Sunum Slider"
      className={`relative w-full overflow-hidden bg-black ${className}`}
      style={{ color: "#fff" }}
      data-bg="dark"
    >
      {/* Custom white nav arrows */}
      <button
        type="button"
        aria-label="Önceki slayt"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute z-20 left-2 md:left-4 bottom-1 -translate-y-1/2 rounded-full p-2 md:p-3 bg-white/10 hover:bg-white/20 border border-white/30 shadow-lg backdrop-blur-md"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Sonraki slayt"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute z-20 right-2 md:right-4 bottom-1 -translate-y-1/2 rounded-full p-2 md:p-3 bg-white/10 hover:bg-white/20 border border-white/30 shadow-lg backdrop-blur-md"
      >
        <ChevronRight size={22} />
      </button>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Keyboard]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
          autoHeight                 // 👈 EKLENDİ
        autoplay={
          autoplayStopped
            ? false
            : {
                delay: autoplayMs,
                disableOnInteraction: false, // unmute/fullscreen manually stops it below
                pauseOnMouseEnter: false,
              }
        }
        pagination={{ clickable: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        noSwiping={true}
        noSwipingClass="swiper-no-swiping"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          playOnly(swiper.realIndex);
        }}
        onSlideChange={(swiper) => playOnly(swiper.realIndex)}
        className="relative"
        style={
          {
            // white dots + arrows
            ["--swiper-pagination-color" as any]: "#ffffff",
            ["--swiper-pagination-bullet-inactive-color" as any]: "rgba(255,255,255,0.5)",
            ["--swiper-pagination-bullet-inactive-opacity" as any]: "1",
          } as React.CSSProperties
        }
      >
        {slides.map((s, idx) => {
          const vid = extractYouTubeId(s.videoUrl);
          const bg = s.backgroundImage || ytThumb(vid);
          return (
            <SwiperSlide key={s.id}>
              <SlideContentBlock
                index={idx}
                id={vid}
                bgImage={bg}
                badge={s.badge ?? "Video"}
                content={s.content}
                onPlayerReady={(player) => registerPlayer(idx, player)}
                onNeedStopAutoplay={stopAutoplay}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

/* ---------------- Slide ---------------- */
function SlideContentBlock({
  index,
  id,
  bgImage,
  badge,
  content,
  onPlayerReady,
  onNeedStopAutoplay,
}: {
  index: number;
  id: string;
  bgImage: string;
  badge: string;
  content: SlideContent;
  onPlayerReady: (player: any | null) => void;
  onNeedStopAutoplay: () => void;
}) {
  const [author, setAuthor] = useState<string>("");
  const [duration, setDuration] = useState<string>("–:–");

  const handleMeta = useCallback((p: any) => {
    try {
      const data = p.getVideoData?.() || {};
      setAuthor(data.author || "");
      const d = p.getDuration?.();
      if (d) setDuration(toMinSec(d));
    } catch {}
  }, []);

  return (
    <div className="relative min-h-[560px] md:min-h-[640px]">  {/* 👈 min-h eklendi */}
    
          {/* Background */}
      <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      {/* Readability + subtle vignette */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_150px_rgba(0,0,0,.45)]" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-12 lg:pb-20">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="grid lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left */}
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <span
              className="inline-block text-[12px] uppercase tracking-wide px-3 py-1 rounded-full mb-3 backdrop-blur-md"
              style={{ background: `${TEAL}44`, color: "#fff", border: `1px solid ${TEAL}66` }}
            >
              {badge}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-lg">
              {content.customHeadline}
            </h2>

            {content.tagline && (
              <p className="mt-3 text-white/85 text-base sm:text-lg max-w-[60ch] drop-shadow">
                {content.tagline}
              </p>
            )}

            {(author || duration) && (
              <div className="mt-5 grid grid-cols-2 gap-3 max-w-md">
                <StatPill label="Süre" value={duration} />
                <StatPill label="Kaynak" value={author || "YouTube"} />
              </div>
            )}

            {!!content.bullets?.length && (
              <ul className="mt-6 space-y-2">
                {content.bullets.slice(0, 4).map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="mt-[6px] inline-block h-[10px] w-[10px] rounded-full"
                      style={{ background: ORANGE, boxShadow: `0 0 0 3px ${ORANGE}33` }}
                    />
                    <p className="text-white/90">{b}</p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 flex flex-wrap gap-4">
              {content.primaryCta !== null && content.primaryCta && (
                <Link
                  href={content.primaryCta.href}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 backdrop-blur-md"
                  style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 24px ${TEAL}55` }}
                >
                  {content.primaryCta.label}
                </Link>
              )}
              {content.secondaryCta !== null && content.secondaryCta && (
                <Link
                  href={content.secondaryCta.href}
                  className="px-6 py-2.5 rounded-full text-sm font-medium backdrop-blur-md"
                  style={{ background: `${ORANGE}33`, color: "#fff", border: `1px solid ${ORANGE}66` }}
                >
                  {content.secondaryCta.label}
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right: video */}
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <YouTubePanel
              videoId={id}
              index={index}
              onReady={(player) => {
                onPlayerReady(player);
                handleMeta(player);
              }}
              onNeedStopAutoplay={onNeedStopAutoplay}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Video Panel ---------------- */
function YouTubePanel({
  videoId,
  index,
  onReady,
  onNeedStopAutoplay,
}: {
  videoId: string;
  index: number;
  onReady: (player: any) => void;
  onNeedStopAutoplay: () => void;
}) {
  const containerId = useMemo(() => `yt-player-${index}-${videoId}`, [index, videoId]);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<any>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Watch fullscreen changes to update UI and stop autoplay
  useEffect(() => {
    const onFsChange = () => {
      const active = !!document.fullscreenElement && panelRef.current?.contains(document.fullscreenElement);
      setIsFullscreen(active);
      if (active) onNeedStopAutoplay();
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [onNeedStopAutoplay]);

  useEffect(() => {
    let mounted = true;
    ensureYouTubeAPI().then((YT) => {
      if (!mounted || !YT) return;
      const loopParams = { loop: 1, playlist: videoId };
      const player = new YT.Player(containerId, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0, // we keep controls hidden; custom UI below
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          ...loopParams,
        },
        events: {
          onReady: (ev: any) => {
            playerRef.current = ev.target;
            try {
              ev.target.mute();
              ev.target.playVideo();
            } catch {}
            onReady(ev.target);
          },
        },
      });
    });
    return () => {
      try {
        playerRef.current?.destroy?.();
      } catch {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, [containerId, videoId, onReady]);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (muted) {
        p.unMute?.();
        p.playVideo?.();
        onNeedStopAutoplay(); // stop slider autoplay on unmute
      } else {
        p.mute?.();
      }
      setMuted(!muted);
    } catch {}
  }, [muted, onNeedStopAutoplay]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await panelRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen();
      }
      // Autoplay will be stopped by the fullscreenchange listener,
      // but call defensively here too.
      onNeedStopAutoplay();
    } catch {}
  }, [onNeedStopAutoplay]);

  return (
    <div
      ref={panelRef}
      className="relative rounded-2xl overflow-hidden border bg-white/5 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,.45)] swiper-no-swiping"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div className="aspect-video w-full swiper-no-swiping">
        <div id={containerId} className="h-full w-full" />
      </div>

      {/* Bottom-left: Mute/Unmute */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMute();
        }}
        aria-pressed={!muted}
        className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-lg backdrop-blur-md swiper-no-swiping"
        style={{
          background: muted ? `${ORANGE}1A` : `${TEAL}1A`,
          color: "#fff",
          border: `1px solid ${muted ? `${ORANGE}66` : `${TEAL}66`}`,
        }}
        title={muted ? "Sesi Aç" : "Sesi Kapat"}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        {muted ? "Unmute" : "Mute"}
      </button>

      {/* Bottom-right: Fullscreen */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFullscreen();
        }}
        aria-pressed={isFullscreen}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-lg backdrop-blur-md swiper-no-swiping"
        style={{
          background: `rgba(0,0,0,.25)`,
          color: "#fff",
          border: `1px solid rgba(255,255,255,.35)`,
        }}
        title={isFullscreen ? "Tam Ekranı Kapat" : "Tam Ekran"}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        {isFullscreen ? "Exit" : "Fullscreen"}
      </button>
    </div>
  );
}

/* ---------------- Small UI ---------------- */
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl p-3 bg-white/10 backdrop-blur-md border shadow-[0_6px_20px_rgba(0,0,0,.4)]"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div className="text-[11px] uppercase tracking-wide text-white/70">{label}</div>
      <div className="text-lg sm:text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

/* ---------------- Example Slides (replace BGs with yours) ---------------- */
const DEFAULT_SLIDES: SlideInput[] = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/watch?v=hMbzVAJMzXo",
    backgroundImage: "/daireici.jpg",
    badge: "Video",
    content: {
      customHeadline: "La Joya Apartman Turu",
      tagline: "Denizle iç içe, yalın ve modern hatların buluştuğu bir sahne.",
      bullets: [
        "Sahil ritmini alan minimal mimari",
        "Geniş sosyal alanlar ve yürüyüş rotaları",
        "Gün batımında doğal ışık senaryosu",
      ],
      primaryCta: { label: "Projeyi İncele", href: "/projects" },
      secondaryCta: { label: "İletişime Geç", href: "/contact" },
    },
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/watch?v=fpGuMq5qIEk&pp=0gcJCQYKAYcqIYzv",
    backgroundImage: "/gecitkale/gecitkale-1.jpg",
    badge: "Video",
    content: {
      customHeadline: "Geçitkale Arsa Projesi Tanırımı",
      tagline: "Yeşil ve su ögeleri etrafında sakin bir ritim.",
      bullets: [
        "Açık hava yaşamını güçlendiren peyzaj",
        "Konfor odaklı planlama ve dolaşım",
        "Zengin servis ve tesis seçenekleri",
      ],
      primaryCta: { label: "Tüm Olanaklar", href: "/amenities" },
      secondaryCta: { label: "Satış Ekibi", href: "/contact" },
    },
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/watch?v=JNKcu1APZO0&pp=0gcJCQYKAYcqIYzv",
    backgroundImage: "lala.jpg",
    badge: "Video",
    content: {
      customHeadline: "Kuzey Kıbrıs Tanıtım Videosu",
      tagline: "Zamanla değer kazanan, iyi tasarlanmış bir yaşam ekosistemi.",
      bullets: [
        "Esnek ödeme ve teslim kolaylıkları",
        "Yüksek doluluk hedefi ve yönetim",
        "Uzun vadeli değer odaklı yaklaşım",
      ],
      primaryCta: { label: "Ödeme Planı", href: "/contact" },
      secondaryCta: { label: "Diğer Projeler", href: "/projects" },
    },
  },
];
