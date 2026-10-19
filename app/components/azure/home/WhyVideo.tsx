"use client";

import { useEffect, useRef, useState } from "react";
import { PiSpeakerHighDuotone, PiSpeakerSlashDuotone } from "react-icons/pi";
import { useNearViewport } from "@/app/components/performance/useNearViewport";
import { loadYouTube, noCaptions, ytThumb, type YTPlayer } from "../youtube-api";

/**
 * Neden DND kartındaki La Joya açılış videosu: kutuyu doldurur, sessiz ve döngülü başlar, altyazı kapalı
 * (kullanıcı: "alt yazıyı kapat, ses açıp kapatma olsun"); sağ altta cam ses düğmesi. YouTube'un açılıştaki başlık
 * şeridi görünmesin diye ilk saniyelerde HD kapak karesi üstte kalır (video vitrini ile aynı). Hareketi azalt açıksa
 * kendiliğinden oynamaz; ses düğmesi videoyu sesli başlatır.
 */
export default function WhyVideo({ videoId, title, mute, unmute }: { videoId: string; title: string; mute: string; unmute: string }) {
  const { ref: box, near } = useNearViewport<HTMLDivElement>("300px");
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!near || !el) return;
    let alive = true;
    let timer = 0;
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
            if (data !== 1) return; // 1 = oynuyor
            noCaptions(yt);
            clearTimeout(timer);
            timer = window.setTimeout(() => { if (alive) setRevealed(true); }, 4200);
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
      if (muted) { p.unMute(); p.playVideo(); } else p.mute();
      noCaptions(p);
    } catch {}
    setMuted(!muted);
  };

  return (
    <div ref={box} className="az-ytbg" title={title}>
      <div ref={host} className="yt" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`cover${revealed ? " off" : ""}`} src={ytThumb(videoId)} alt="" aria-hidden />
      <button type="button" className="snd" onClick={toggle} disabled={!ready} aria-pressed={!muted} aria-label={muted ? unmute : mute} title={muted ? unmute : mute}>
        {muted ? <PiSpeakerSlashDuotone size={20} aria-hidden /> : <PiSpeakerHighDuotone size={20} aria-hidden />}
      </button>
    </div>
  );
}
