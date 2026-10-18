"use client";

import { useEffect, useRef, useState } from "react";
import { PiArrowUpRightBold, PiArrowsInDuotone, PiArrowsOutDuotone, PiPlayFill } from "react-icons/pi";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";

type FsDoc = Document & { webkitExitFullscreen?: () => void; webkitFullscreenElement?: Element | null };
type FsEl = HTMLElement & { webkitRequestFullscreen?: () => void };

export default function TourStage({ src, poster, iframeTitle, locale }: { src: string; poster: string; iframeTitle: string; locale: Locale }) {
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
    <div className="mr-tour rv">
      <div className="stage" ref={wrap}>
        {playing ? (
          <>
            <iframe src={src} title={iframeTitle} allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer" allowFullScreen />
            <button type="button" className="az-btn glass sm fs" onClick={toggleFs} aria-label={fs ? t.exitFsAria : t.fs}>
              {fs ? <PiArrowsInDuotone size={16} /> : <PiArrowsOutDuotone size={16} />} {fs ? t.exitFs : t.fs}
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={t.start} data-track="tour_start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt="" loading="lazy" />
            <span className="play"><i><PiPlayFill size={30} /></i><em>{t.start}</em></span>
          </button>
        )}
      </div>
      <div className="row">
        <span className="mr-mono">360° · {iframeTitle}</span>
        <a className="open" href={src} target="_blank" rel="noopener noreferrer" data-track="tour_start"><i aria-hidden><PiArrowUpRightBold size={15} /></i>{t.open}</a>
      </div>
    </div>
  );
}
