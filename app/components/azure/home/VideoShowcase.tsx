"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { PiArrowsInDuotone, PiArrowsOutDuotone, PiSpeakerHighDuotone, PiSpeakerSlashDuotone } from "react-icons/pi";
import { mono } from "@/app/fonts";
import { useNearViewport } from "@/app/components/performance/useNearViewport";
import { VIDEO_SLIDES, VIDEO_UI, type VideoSlide } from "@/lib/azure/videos";
import { href, type Locale } from "@/lib/azure/site";
import "../meridian.css";
import "./video-showcase.css";

const AUTOPLAY_MS = 10000;
const pad = (n: number) => String(n).padStart(2, "0");
const toMinSec = (s?: number) => (s && Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "—");
const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

/* ---------- oynatıcı arayüzü (YouTube ve sitedeki mp4 aynı biçimde yönetilir) ---------- */
type Player = { play(): void; pause(): void; mute(): void; unmute(): void };

type YTPlayer = { playVideo(): void; pauseVideo(): void; mute(): void; unMute(): void; destroy(): void; getDuration(): number };
type YTGlobal = {
  Player: new (el: HTMLElement, o: {
    videoId: string; width: string; height: string; playerVars: Record<string, unknown>;
    events: { onReady?: (e: { target: YTPlayer }) => void; onStateChange?: (e: { data: number }) => void };
  }) => YTPlayer;
};
type WinYT = Window & { YT?: YTGlobal; onYouTubeIframeAPIReady?: () => void };

let ytApi: Promise<YTGlobal | null> | null = null;
function loadYouTube(): Promise<YTGlobal | null> {
  const w = window as WinYT;
  if (w.YT?.Player) return Promise.resolve(w.YT);
  if (!ytApi) {
    ytApi = new Promise((resolve) => {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => { prev?.(); resolve(w.YT ?? null); };
      const until = Date.now() + 10000;
      const check = () => (w.YT?.Player ? resolve(w.YT) : Date.now() < until ? setTimeout(check, 150) : resolve(null));
      check();
    });
  }
  return ytApi;
}

type MediaProps = { slide: VideoSlide; autoplay: boolean; onPlayer: (p: Player | null) => void; onDuration: (sec: number) => void };

function YouTubeMedia({ slide, autoplay, onPlayer, onDuration }: MediaProps) {
  const host = useRef<HTMLDivElement>(null);
  const cb = useRef({ onPlayer, onDuration });
  useEffect(() => { cb.current = { onPlayer, onDuration }; }, [onPlayer, onDuration]);
  // YouTube sessiz ve küçük oynatıcıda düşük kaliteyle açılıyor: ilk saniyelerde HD kapak karesi üstte kalır
  const [revealed, setRevealed] = useState(false);
  const id = slide.youtube!;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let alive = true;
    let yt: YTPlayer | null = null;
    let timer = 0;
    const mount = document.createElement("div");
    el.appendChild(mount);
    loadYouTube().then((YT) => {
      if (!alive || !YT) return;
      yt = new YT.Player(mount, {
        videoId: id, width: "100%", height: "100%",
        playerVars: { autoplay: autoplay ? 1 : 0, mute: 1, controls: 0, rel: 0, playsinline: 1, modestbranding: 1, iv_load_policy: 3, disablekb: 1, loop: 1, playlist: id },
        events: {
          onReady: ({ target }) => {
            if (!alive) return;
            try { target.mute(); if (autoplay) target.playVideo(); } catch {}
            const d = target.getDuration?.();
            if (d > 0) cb.current.onDuration(d);
            cb.current.onPlayer({ play: () => target.playVideo(), pause: () => target.pauseVideo(), mute: () => target.mute(), unmute: () => target.unMute() });
          },
          onStateChange: ({ data }) => {
            if (data !== 1) return; // 1 = oynuyor
            const d = yt?.getDuration?.();
            if (d && d > 0) cb.current.onDuration(d);
            clearTimeout(timer);
            timer = window.setTimeout(() => { if (alive) setRevealed(true); }, 4200);
          },
        },
      });
    });
    return () => {
      alive = false;
      clearTimeout(timer);
      try { yt?.destroy(); } catch {}
      el.innerHTML = "";
      cb.current.onPlayer(null);
    };
  }, [id, autoplay]);

  return (
    <>
      <div ref={host} className="yt" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`cover${revealed ? " off" : ""}`} src={ytThumb(id)} alt="" aria-hidden />
    </>
  );
}

function HostedMedia({ slide, autoplay, onPlayer }: MediaProps) {
  const main = useRef<HTMLVideoElement>(null);
  const blur = useRef<HTMLVideoElement>(null);
  const cb = useRef(onPlayer);
  useEffect(() => { cb.current = onPlayer; }, [onPlayer]);

  useEffect(() => {
    const el = main.current;
    if (!el) return;
    const bg = blur.current;
    const p: Player = {
      play: () => { el.play().catch(() => {}); bg?.play().catch(() => {}); },
      pause: () => { el.pause(); bg?.pause(); },
      mute: () => { el.muted = true; },
      unmute: () => { el.muted = false; },
    };
    if (autoplay) p.play();
    cb.current(p);
    return () => { el.pause(); bg?.pause(); cb.current(null); };
  }, [slide.src, autoplay]);

  return (
    <>
      {/* Dikey video yatay kutuda: yanları aynı videonun bulanık, hareketli kopyası doldurur (siyah bant yok) */}
      {slide.vertical ? <video ref={blur} className="blur" aria-hidden tabIndex={-1} src={slide.src} poster={slide.poster} muted loop playsInline preload="metadata" /> : null}
      <video
        ref={main} className="main" src={slide.src} poster={slide.poster} muted loop playsInline preload="metadata"
        onTimeUpdate={(e) => { const b = blur.current; if (b && Math.abs(b.currentTime - e.currentTarget.currentTime) > 0.3) b.currentTime = e.currentTarget.currentTime; }}
      />
    </>
  );
}

function Poster({ slide }: { slide: VideoSlide }) {
  const src = slide.youtube ? ytThumb(slide.youtube) : slide.poster;
  if (!src) return null;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {slide.vertical ? <img className="blur" src={src} alt="" aria-hidden loading="lazy" /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={slide.vertical ? "main" : "cover"} src={src} alt="" aria-hidden loading="lazy" />
    </>
  );
}

/**
 * Ana sayfa video bölümü — Meridian dili, açık zemin: solda mono etiket + sayaç, iki parçalı başlık,
 * süre / kaynak satırı, numaralı maddeler ve tek dolu düğme; sağda video, altında ilerleme çizgileri,
 * "sıradaki" etiketi ve oklar. Slaytlar 10 sn'de bir kendiliğinden ilerler; ses açılınca ya da tam ekranda durur.
 */
export default function VideoShowcase({ locale }: { locale: Locale }) {
  const slides = VIDEO_SLIDES[locale];
  const ui = VIDEO_UI[locale];
  const n = slides.length;
  const { ref: nearRef, near } = useNearViewport<HTMLDivElement>("300px");
  const root = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const touchX = useRef<number | null>(null);

  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [fs, setFs] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});

  const s = slides[i];
  const next = slides[(i + 1) % n];
  const go = useCallback((k: number) => { setI(((k % n) + n) % n); setMuted(true); }, [n]);

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ekrandan çıkınca video durur, geri gelince devam eder
  useEffect(() => {
    if (!player.current || reduce) return;
    if (visible) player.current.play(); else player.current.pause();
  }, [visible, reduce]);

  useEffect(() => {
    const onFs = () => {
      const on = !!document.fullscreenElement && !!box.current?.contains(document.fullscreenElement);
      setFs(on);
      if (on) setStopped(true);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const visibleRef = useRef(false);
  useEffect(() => { visibleRef.current = visible; }, [visible]);
  // oynatıcı ekran dışındayken hazır olduysa beklesin; görünür olunca yukarıdaki etki başlatır
  const onPlayer = useCallback((p: Player | null) => { player.current = p; if (p && !visibleRef.current) p.pause(); }, []);
  const onDuration = useCallback((sec: number) => {
    setDurations((d) => (d[s.id] ? d : { ...d, [s.id]: sec }));
  }, [s.id]);

  const toggleMute = () => {
    const p = player.current;
    if (!p) return;
    if (muted) { p.unmute(); p.play(); setStopped(true); } else p.mute();
    setMuted(!muted);
  };
  const toggleFs = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await box.current?.requestFullscreen?.();
    } catch {}
  };

  const auto = !stopped && !reduce && n > 1;
  const setRefs = (el: HTMLDivElement | null) => { root.current = el; nearRef.current = el; };

  return (
    <div
      ref={setRefs}
      className={`az-wrap az-vs mr ${mono.variable}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ui.region}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
      }}
    >
      <div className="card" onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)} onPointerLeave={() => setHover(false)}>
        {/* metinler üst üste: kart yüksekliği en uzun slayta göre sabit kalır, geçişte zıplamaz */}
        <div className="txts">
          {slides.map((x, k) => (
            <div key={x.id} className={`txt${k === i ? " on" : ""}`} aria-hidden={k !== i} inert={k !== i}>
              <div className="hd"><span className="mr-mono">{x.tag}</span><span className="mr-mono"><b>{pad(k + 1)}</b> / {pad(n)}</span></div>
              <h3>{x.title[0]} <b>{x.title[1]}</b></h3>
              <p className="lead">{x.lead}</p>
              <dl className="meta">
                <div><dt className="mr-mono">{ui.duration}</dt><dd>{toMinSec(durations[x.id] ?? x.duration)}</dd></div>
                <div><dt className="mr-mono">{ui.source}</dt><dd>{x.source}</dd></div>
              </dl>
              <ol>{x.bullets.map((b, j) => <li key={b}><span className="mr-mono">{pad(j + 1)}</span>{b}</li>)}</ol>
              <div className="cta">
                <Link className="az-btn sea" href={href(locale, x.primary.path)} prefetch={false}>{x.primary.label}</Link>
                {x.secondary ? <Link className="ul" href={href(locale, x.secondary.path)} prefetch={false}>{x.secondary.label} →</Link> : null}
              </div>
            </div>
          ))}
        </div>

        <figure className="fig">
          <div ref={box} className={`box${s.vertical ? " v" : ""}`}>
            {near
              ? (s.youtube
                ? <YouTubeMedia key={s.id} slide={s} autoplay={!reduce} onPlayer={onPlayer} onDuration={onDuration} />
                : <HostedMedia key={s.id} slide={s} autoplay={!reduce} onPlayer={onPlayer} onDuration={onDuration} />)
              : <Poster slide={s} />}
            {/* videoya tıklayınca YouTube duraklayıp başka videolar önermesin; kaydırma hareketini burada karşıla */}
            <div
              className="blk" aria-hidden
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const x0 = touchX.current; touchX.current = null;
                if (x0 === null) return;
                const dx = e.changedTouches[0].clientX - x0;
                if (Math.abs(dx) > 44) go(i + (dx < 0 ? 1 : -1));
              }}
            />
            <div className="ctl">
              <button type="button" onClick={toggleMute} aria-pressed={!muted} aria-label={muted ? ui.unmute : ui.mute} title={muted ? ui.unmute : ui.mute}>
                {muted ? <PiSpeakerSlashDuotone size={18} /> : <PiSpeakerHighDuotone size={18} />}
              </button>
              <button type="button" onClick={toggleFs} aria-pressed={fs} aria-label={fs ? ui.exitFullscreen : ui.fullscreen} title={fs ? ui.exitFullscreen : ui.fullscreen}>
                {fs ? <PiArrowsInDuotone size={18} /> : <PiArrowsOutDuotone size={18} />}
              </button>
            </div>
          </div>

          <div className={`bars${!visible || hover || fs ? " pause" : ""}`} style={{ "--n": n } as CSSProperties}>
            {slides.map((x, k) => (
              <button key={x.id} type="button" className={k === i ? "on" : undefined} aria-label={ui.goTo(k + 1)} aria-current={k === i} onClick={() => go(k)}>
                <i>{k === i ? <span key={`${x.id}-${auto}`} className={auto ? "p run" : "p"} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} onAnimationEnd={() => go(i + 1)} /> : null}</i>
              </button>
            ))}
          </div>
          <figcaption className="row">
            <span className="mr-mono">{ui.next} · <b>{next.tag}</b></span>
            <span className="nav">
              <button type="button" onClick={() => go(i - 1)} aria-label={ui.prev}>←</button>
              <button type="button" onClick={() => go(i + 1)} aria-label={ui.nextAria}>→</button>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
