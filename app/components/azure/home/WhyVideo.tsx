"use client";

import Img from "../Img";
import { useEffect, useRef, useState } from "react";
import { PiPauseDuotone, PiPlayDuotone, PiSpeakerHighDuotone, PiSpeakerSlashDuotone } from "react-icons/pi";
import { useNearViewport } from "@/app/components/performance/useNearViewport";
import { loadYouTube, noCaptions, ytThumb, type YTPlayer } from "../youtube-api";

/**
 * Neden DND kartındaki La Joya açılış videosu: kutuyu doldurur, sessiz ve döngülü başlar, altyazı kapalı
 * (kullanıcı: "alt yazıyı kapat, ses açıp kapatma olsun", "durdurma ekleyelim"); sağ altta durdur/oynat ve ses düğmeleri. YouTube'un açılıştaki başlık
 * şeridi görünmesin diye ilk saniyelerde HD kapak karesi üstte kalır (video vitrini ile aynı); durdurulunca da kapak geri gelir. Hareketi azalt açıksa
 * kendiliğinden oynamaz; oynat ya da ses düğmesi başlatır.
 */
export default function WhyVideo({ videoId, title, mute, unmute, pause, play }: { videoId: string; title: string; mute: string; unmute: string; pause: string; play: string }) {
  const { ref: box, near } = useNearViewport<HTMLDivElement>("300px");
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!near || !el) return;
    let alive = true;
    let timer = 0;
    let started = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mount = document.createElement("div");
    el.appendChild(mount);
    loadYouTube().then((YT) => {
      if (!alive || !YT) return;
      const yt = new YT.Player(mount, {
        videoId, width: "100%", height: "100%",
        playerVars: { autoplay: still ? 0 : 1, mute: 1, controls: 0, rel: 0, playsinline: 1, modestbranding: 1, iv_load_policy: 3, disablekb: 1, cc_load_policy: 0, loop: 1, playlist: videoId },
        events: {
          onReady: ({ target }) => {
            if (!alive) return;
            try { target.mute(); if (!still) target.playVideo(); } catch {}
            noCaptions(target);
            player.current = target;
            setReady(true);
          },
          onStateChange: ({ data }) => {
            // 2 = durdu: YouTube durunca alta "daha fazla video" şeridi açıyor; HD kapak karesi geri gelir, şerit görünmez
            if (data === 2) { clearTimeout(timer); setPlaying(false); setRevealed(false); return; }
            if (data !== 1) return; // 1 = oynuyor
            setPlaying(true);
            noCaptions(yt);
            clearTimeout(timer);
            // ilk açılışta YouTube'un başlık şeridi kaybolana kadar bekle; sonraki oynatmalarda kapak hemen kalkar
            timer = window.setTimeout(() => { if (alive) setRevealed(true); }, started ? 450 : 4200);
            started = true;
          },
        },
      });
    });
    return () => {
      alive = false;
      clearTimeout(timer);
      try { player.current?.destroy(); } catch {}
      player.current = null;
      el.innerHTML = "";
    };
  }, [near, videoId]);

  const toggle = () => {
    const p = player.current;
    if (!p) return;
    try {
      if (muted) { p.unMute(); p.playVideo(); setPlaying(true); } else p.mute();
      noCaptions(p);
    } catch {}
    setMuted(!muted);
  };

  const togglePlay = () => {
    const p = player.current;
    if (!p) return;
    try { if (playing) p.pauseVideo(); else p.playVideo(); } catch {}
    setPlaying(!playing);
  };

  return (
    <div ref={box} className="az-ytbg" role="group" aria-label={title}>
      <div ref={host} className="yt" />
      <Img className={`cover${revealed ? " off" : ""}`} src={ytThumb(videoId)} sizes="(min-width: 1000px) 60vw, 100vw" loading="eager" alt="" aria-hidden />
      <div className="ctl">
      <button type="button" onClick={togglePlay} disabled={!ready} aria-pressed={!playing} aria-label={playing ? pause : play} title={playing ? pause : play}>
        {playing ? <PiPauseDuotone size={20} aria-hidden /> : <PiPlayDuotone size={20} aria-hidden />}
      </button>
      <button type="button" className="snd" onClick={toggle} disabled={!ready} aria-pressed={!muted} aria-label={muted ? unmute : mute} title={muted ? unmute : mute}>
        {muted ? <PiSpeakerSlashDuotone size={20} aria-hidden /> : <PiSpeakerHighDuotone size={20} aria-hidden />}
      </button>
      </div>
    </div>
  );
}
