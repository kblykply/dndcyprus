// app/components/ProjectVideoSlider.tsx
"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { m as motion, useReducedMotion, type Variants } from "framer-motion";
import { Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/* ---------------- Motion ---------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
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
  if (secs === undefined || !Number.isFinite(secs)) return "–:–";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/* ---------------- Types ---------------- */
// Basit, yerel YouTube Iframe API tipleri (paket eklemeden çalışır)
type YTVideoData = { author?: string };
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
  getDuration(): number;
  getVideoData(): YTVideoData;
}
type YTReadyEvent = { target: YTPlayer };
type YTPlayerOptions = {
  videoId: string;
  width?: string | number;
  height?: string | number;
  playerVars?: Record<string, unknown>;
  events?: { onReady?: (ev: YTReadyEvent) => void };
};
interface YTGlobal {
  Player: new (elementId: string | HTMLElement, options: YTPlayerOptions) => YTPlayer;
}
interface WindowWithYT extends Window {
  YT?: YTGlobal;
  onYouTubeIframeAPIReady?: () => void;
}

// CSS değişkenlerini güvenle verebilmek için yardımcı tip
type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

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
  /** YouTube adresi; videoSrc verilmişse kullanılmaz */
  videoUrl?: string;
  /** Sitede barındırılan mp4 (ör. Instagram reel'leri YouTube'da olmadığı için) */
  videoSrc?: string;
  poster?: string;
  durationSec?: number;
  source?: string;
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
let ytApiPromise: Promise<YTGlobal | null> | null = null;

function ensureYouTubeAPI(): Promise<YTGlobal | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  const w = window as WindowWithYT;
  if (w.YT && w.YT.Player) return Promise.resolve(w.YT);

  if (!ytApiPromise) {
    ytApiPromise = new Promise<YTGlobal | null>((resolve) => {
      const existing = document.getElementById("youtube-iframe-api");
      if (!existing) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      w.onYouTubeIframeAPIReady = () => resolve((window as WindowWithYT).YT ?? null);
      const deadline = Date.now() + 10000;
      const check = () => {
        const ww = window as WindowWithYT;
        if (ww.YT && ww.YT.Player) resolve(ww.YT);
        else if (Date.now() < deadline) setTimeout(check, 120);
        else resolve(null);
      };
      check();
    });
  }
  return ytApiPromise;
}

/* ---------------- Main Component ---------------- */
export default function   ProjectVideoSlider({
  autoplayMs = 10000,
  className = "",
  slides = DEFAULT_SLIDES,
}: ProjectVideoSliderProps) {
  const playersRef = useRef<(YTPlayer | null)[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const reducedMotion = useReducedMotion();

  const registerPlayer = useCallback((index: number, player: YTPlayer | null) => {
    playersRef.current[index] = player;
  }, []);

  const playOnly = useCallback((activeIndex: number) => {
    playersRef.current.forEach((p, i) => {
      if (!p) return;
      try {
        if (i === activeIndex && !reducedMotion) {
          p.playVideo?.();
        } else {
          p.pauseVideo?.();
          p.seekTo?.(0, true);
        }
      } catch {}
    });
  }, [reducedMotion]);

  const stopAutoplay = useCallback(() => {
    if (autoplayStopped) return;
    try {
      swiperRef.current?.autoplay?.stop();
      setAutoplayStopped(true);
    } catch {}
  }, [autoplayStopped]);

  const paginationVars: CSSVars = {
    "--swiper-pagination-color": "#ffffff",
    "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.5)",
    "--swiper-pagination-bullet-inactive-opacity": 1,
  };

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
        className="absolute z-20 min-h-11 min-w-11 left-[calc(50%-3.5rem)] md:left-4 bottom-16 md:bottom-1 -translate-y-1/2 rounded-full p-2 md:p-3 bg-white/10 hover:bg-white/20 border border-white/30 shadow-lg backdrop-blur-md"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Sonraki slayt"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute z-20 min-h-11 min-w-11 right-[calc(50%-3.5rem)] md:right-4 bottom-16 md:bottom-1 -translate-y-1/2 rounded-full p-2 md:p-3 bg-white/10 hover:bg-white/20 border border-white/30 shadow-lg backdrop-blur-md"
      >
        <ChevronRight size={22} />
      </button>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Keyboard]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoHeight
        autoplay={
          autoplayStopped || reducedMotion
            ? false
            : {
                delay: autoplayMs,
                disableOnInteraction: false, // unmute/fullscreen manuel durduruyor
                pauseOnMouseEnter: false,
              }
        }
        pagination={{ clickable: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        noSwiping
        noSwipingClass="swiper-no-swiping"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          playOnly(swiper.realIndex);
        }}
        onSlideChange={(swiper) => { setActiveSlide(swiper.realIndex); playOnly(swiper.realIndex); }}
        className="relative"
        style={paginationVars}
      >
        {slides.map((s, idx) => {
          const vid = s.videoSrc ? "" : extractYouTubeId(s.videoUrl ?? "");
          const bg = s.backgroundImage || s.poster || ytThumb(vid);
          return (
            <SwiperSlide key={s.id}>
              <SlideContentBlock
                active={idx === activeSlide}
                index={idx}
                id={vid}
                video={s.videoSrc ? { src: s.videoSrc, poster: s.poster, durationSec: s.durationSec, source: s.source } : undefined}
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
  active,
  index,
  id,
  video,
  bgImage,
  badge,
  content,
  onPlayerReady,
  onNeedStopAutoplay,
}: {
  active: boolean;
  index: number;
  id: string;
  video?: HostedVideo;
  bgImage: string;
  badge: string;
  content: SlideContent;
  onPlayerReady: (player: YTPlayer | null) => void;
  onNeedStopAutoplay: () => void;
}) {
  const [author, setAuthor] = useState<string>(video?.source ?? "");
  const [duration, setDuration] = useState<string>(toMinSec(video?.durationSec));

  const handleMeta = useCallback((p: YTPlayer) => {
    try {
      const data = p.getVideoData?.() || {};
      setAuthor(data.author || "");
      const d = p.getDuration?.();
      if (typeof d === "number" && d > 0) setDuration(toMinSec(d));
    } catch {}
  }, []);

  return (
    <div className="relative min-h-[560px] md:min-h-[640px]">
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
         {video ? (active ? <HostedVideoPanel
  video={video}
  onReady={(player) => {
    onPlayerReady(player);
    if (player) handleMeta(player);
  }}
  onNeedStopAutoplay={onNeedStopAutoplay}
/> : <div className="aspect-video overflow-hidden rounded-2xl bg-black">{video.poster ? <img src={video.poster} alt={content.customHeadline} loading="lazy" decoding="async" className="h-full w-full object-contain" /> : null}</div>) : active ? <YouTubePanel
  videoId={id}
  index={index}
  onReady={(player) => {
    onPlayerReady(player);
    if (player) handleMeta(player); // <<< null guard
  }}
  onNeedStopAutoplay={onNeedStopAutoplay}
/> : <div className="aspect-video overflow-hidden rounded-2xl bg-black"><img src={ytThumb(id)} alt={content.customHeadline} loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>}
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
  onReady: (player: YTPlayer | null) => void;
  onNeedStopAutoplay: () => void;
}) {
  const containerId = useMemo(() => `yt-player-${index}-${videoId}`, [index, videoId]);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const readyCallback = useRef(onReady);
  useEffect(() => { readyCallback.current = onReady; }, [onReady]);

  // Watch fullscreen changes to update UI and stop autoplay
  useEffect(() => {
    const onFsChange = () => {
      const active = !!document.fullscreenElement && !!panelRef.current?.contains(document.fullscreenElement);
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
    const loopParams: { loop: 1; playlist: string } = { loop: 1, playlist: videoId };
    const player = new YT.Player(containerId, {
      videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: reducedMotion ? 0 : 1,
        mute: 1,
        controls: 0,
        rel: 0,
        playsinline: 1,
        modestbranding: 1,
        iv_load_policy: 3,
        ...loopParams,
      },
      events: {
        onReady: (ev) => {
          if (!mounted) { ev.target.destroy(); return; }
          playerRef.current = ev.target;
          try {
            ev.target.mute();
            if (!reducedMotion) ev.target.playVideo();
          } catch {}
          readyCallback.current(ev.target);
        },
      },
    });
    playerRef.current = player;
  });

  return () => {
    mounted = false; // <<< önemli: prefer-const uyarısını da çözer
    try {
      playerRef.current?.destroy?.();
      playerRef.current = null;
      readyCallback.current(null);
    } catch {}
  };
}, [containerId, videoId, reducedMotion]);


  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (muted) {
        p.unMute?.();
        p.playVideo?.();
        onNeedStopAutoplay(); // unmute -> slider autoplay durur
      } else {
        p.mute?.();
      }
      setMuted((m) => !m);
    } catch {}
  }, [muted, onNeedStopAutoplay]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await panelRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen();
      }
      onNeedStopAutoplay();
    } catch {}
  }, [onNeedStopAutoplay]);

  return (
    <div
      ref={panelRef}
      className="relative rounded-2xl overflow-hidden border bg-white/5 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,.45)] swiper-no-swiping"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div className="relative aspect-video w-full swiper-no-swiping">
        <div id={containerId} className="h-full w-full" />
        {/* Kontroller gizli; videoya tıklanınca YouTube duraklatıp kanalın diğer videolarını
            (ör. eski Geçitkale videosu) öneren rafı açıyordu. Tıklamayı burada karşılıyoruz. */}
        <div aria-hidden className="absolute inset-0" />
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

/* ---------------- Hosted (mp4) Video Panel ---------------- */
type HostedVideo = { src: string; poster?: string; durationSec?: number; source?: string };

function HostedVideoPanel({
  video,
  onReady,
  onNeedStopAutoplay,
}: {
  video: HostedVideo;
  onReady: (player: YTPlayer | null) => void;
  onNeedStopAutoplay: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const reducedMotion = useReducedMotion();
  const readyCallback = useRef(onReady);
  useEffect(() => { readyCallback.current = onReady; }, [onReady]);

  useEffect(() => {
    const onFsChange = () => {
      const active = !!document.fullscreenElement && !!panelRef.current?.contains(document.fullscreenElement);
      setIsFullscreen(active);
      if (active) onNeedStopAutoplay();
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [onNeedStopAutoplay]);

  // YouTube oynatıcısıyla aynı arayüz: slider aktif slaytı oynatıp diğerlerini durdurabilsin
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const player: YTPlayer = {
      playVideo: () => { el.play().catch(() => {}); },
      pauseVideo: () => el.pause(),
      seekTo: (sec) => { el.currentTime = sec; },
      mute: () => { el.muted = true; },
      unMute: () => { el.muted = false; },
      destroy: () => el.pause(),
      getDuration: () => (Number.isFinite(el.duration) ? el.duration : video.durationSec ?? 0),
      getVideoData: () => ({ author: video.source }),
    };
    if (!reducedMotion) player.playVideo();
    readyCallback.current(player);
    return () => {
      el.pause();
      readyCallback.current(null);
    };
  }, [video.src, video.durationSec, video.source, reducedMotion]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (muted) {
      el.muted = false;
      el.play().catch(() => {});
      onNeedStopAutoplay();
    } else {
      el.muted = true;
    }
    setMuted((m) => !m);
  }, [muted, onNeedStopAutoplay]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await panelRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen();
      }
      onNeedStopAutoplay();
    } catch {}
  }, [onNeedStopAutoplay]);

  return (
    <div
      ref={panelRef}
      className="relative rounded-2xl overflow-hidden border bg-black shadow-[0_6px_24px_rgba(0,0,0,.45)] swiper-no-swiping"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      {/* Telefonda dikey video yatay kutuda çok küçük kalıyordu: mobilde 4:5, sm+ 16:9 */}
      <div className="relative aspect-[4/5] w-full swiper-no-swiping sm:aspect-video">
        {video.poster && (
          // Dikey (9:16) videoda yan boşlukları aynı karenin bulanık hâli doldurur
          <img aria-hidden src={video.poster} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />
        )}
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="relative h-full w-full object-contain"
        />
      </div>

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
    id: 5,
    videoSrc: "/videos/tl-odeme-modeli.mp4",
    poster: "/videos/tl-odeme-modeli.jpg",
    durationSec: 43,
    source: "Instagram",
    backgroundImage: "/lagoon-verde/1.jpg",
    badge: "Yeni Ödeme Modeli",
    content: {
      customHeadline: "Maaşınız TL, Taksitiniz de TL",
      tagline: "Size özel yeni konut finansman modeliyle ev sahibi olmak artık daha kolay.",
      bullets: [
        "Banka yok, faiz yok, kefil yok",
        "Kur farkı ve vade farkı yok; 60 aya kadar vade",
        "Taksitler KKTC asgari ücret artışına göre dönemsel güncellenir",
      ],
      primaryCta: { label: "Lagoon Verde'yi İncele", href: "/tr/lagoon-verde" },
      secondaryCta: { label: "Bilgi Al", href: "/tr/contact" },
    },
  },
  {
    id: 6,
    videoSrc: "/videos/lagoon-verde-tl-odeme.mp4",
    poster: "/videos/lagoon-verde-tl-odeme.jpg",
    durationSec: 36,
    source: "Instagram",
    backgroundImage: "/lagoon-verde/2.jpg",
    badge: "Lagoon Verde",
    content: {
      customHeadline: "Lagoon Verde'de TL ile Ev Sahibi Olun",
      tagline: "Maaşınız TL ise, hayalinizdeki eve giden yol da TL ile olsun.",
      bullets: [
        "Tüm ödemeler Türk Lirası ile",
        "Banka, faiz ve kur farkı yok",
        "Sınırlı sayıda rezidans",
      ],
      primaryCta: { label: "Lagoon Verde'yi İncele", href: "/tr/lagoon-verde" },
      secondaryCta: { label: "İletişime Geç", href: "/tr/contact" },
    },
  },
  {
  id: 4,
  videoUrl: "https://www.youtube.com/watch?v=GKH4VSPH57E",
  backgroundImage: "/lajoyaimage.jpg", // elinizdeki uygun bir görselle değişebilirsiniz
  badge: "Video",
  content: {
    customHeadline: "La Joya Açıldı!",
    tagline: "Akdeniz kıyısında yeni bir yaşam resmi açılışla başladı.",
    bullets: [
      "Resmi açılış: 1 Kasım 2025, İskele",
      "Ev sahipleri, iş ortakları ve ekibimizle kutlama",
      "Yalın mimari çizgiler, sosyal alanlar ve sahil atmosferi"
    ],
    primaryCta: { label: "La Joya’yı Keşfet", href: "/tr/la-joya" },
    secondaryCta: { label: "İletişime Geç", href: "/tr/contact" }
  }
}
,
  {
    id: 1,
    videoUrl: "https://www.youtube.com/watch?v=hMbzVAJMzXo",
    backgroundImage: "/daireici.jpg",
    badge: "Video",
    content: {
      customHeadline: "La Joya Rezidans Turu",
      tagline: "Denizle iç içe, yalın ve modern hatların buluştuğu bir sahne.",
      bullets: [
        "Sahil ritmini alan minimal mimari",
        "Geniş sosyal alanlar ve yürüyüş rotaları",
        "Gün batımında doğal ışık senaryosu",
      ],
      primaryCta: { label: "Projeyi İncele", href: "/tr/la-joya" },
      secondaryCta: { label: "İletişime Geç", href: "/tr/contact" },
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
      primaryCta: { label: "Hakkımızda", href: "/tr/contact" },
      secondaryCta: { label: "Diğer Projeler", href: "/tr/projects" },
    },
  },
];
