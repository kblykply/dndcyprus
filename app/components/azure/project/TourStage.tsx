"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Minimize2, PlayCircle } from "lucide-react";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";

type FsDoc = Document & { webkitExitFullscreen?: () => void; webkitFullscreenElement?: Element | null };
type FsEl = HTMLElement & { webkitRequestFullscreen?: () => void };

export default function TourStage({ src, bg, poster, iframeTitle, locale }: { src: string; bg: string; poster: string; iframeTitle: string; locale: Locale }) {
  const t = PROJECT_UI[locale].tour;
  const [playing, setPlaying] = useState(false);
  const [fs, setFs] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => { const d = document as FsDoc; setFs(Boolean(d.fullscreenElement || d.webkitFullscreenElement)); };
    document.addEventListener("fullscreenchange", on);
    document.addEventListener("webkitfullscreenchange", on);
    return () => { document.removeEventListener("fullscreenchange", on); document.removeEventListener("webkitfullscreenchange", on); };
  }, []);

  const toggleFs = () => {
    const el = wrap.current as FsEl | null; const d = document as FsDoc;
    if (fs) (d.exitFullscreen ?? d.webkitExitFullscreen)?.call(d);
    else if (el) (el.requestFullscreen ?? el.webkitRequestFullscreen)?.call(el);
  };

  return (
    <div className="az-tour rv">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bg" src={bg} alt="" loading="lazy" />
      <div className="in">
        <div className="stage" ref={wrap}>
          {playing ? (
            <>
              <iframe src={src} title={iframeTitle} allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer" allowFullScreen />
              <button type="button" className="az-btn glass sm fs" onClick={toggleFs} aria-label={fs ? t.exitFsAria : t.fs}>
                {fs ? <Minimize2 size={15} /> : <Maximize2 size={15} />} {fs ? t.exitFs : t.fs}
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setPlaying(true)} aria-label={t.start} data-track="tour_start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster} alt="" loading="lazy" />
              <span className="play"><span><i><PlayCircle size={44} /></i>{t.start}</span></span>
            </button>
          )}
        </div>
        <div className="row">
          <a className="az-btn ghost sm" href={src} target="_blank" rel="noopener noreferrer" data-track="tour_start"><ExternalLink size={14} /> {t.open}</a>
        </div>
      </div>
    </div>
  );
}
