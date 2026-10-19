"use client";

import Arrow from "../Arrow";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./lightbox.css";

export type LightboxImage = { src: string; srcSet?: string; alt: string; label?: string };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Tam ekran görsel penceresi (galeri ve iç mekân): koyu zemin, görsel kırpılmadan ekranı doldurur, oklar ve sayaç;
 * Esc kapatır, ← / → gezer, telefonda kaydırılır. Açıkken sayfa kaymaz, kapanınca odak açan düğmeye döner.
 */
export default function Lightbox({ images, index, onIndex, onClose, ui }: {
  images: LightboxImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  ui: { close: string; prev: string; next: string; label: string };
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = images.length;
  const x = images[index];
  const go = (k: number) => onIndex(((k % n) + n) % n);

  useEffect(() => {
    const back = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => { html.style.overflow = prevOverflow; back?.focus?.(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!x) return null;
  return createPortal(
    <div
      className="az-full"
      role="dialog"
      aria-modal="true"
      aria-label={ui.label}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const x0 = touchX.current; touchX.current = null;
        if (x0 === null || n < 2) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 44) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={x.src} src={x.src} srcSet={x.srcSet} sizes="100vw" alt={x.alt} decoding="async" draggable={false} />
      <button type="button" className="x" ref={closeBtn} onClick={onClose} aria-label={ui.close}>✕</button>
      {n > 1 ? (
        <>
          <button type="button" className="p" onClick={() => go(index - 1)} aria-label={ui.prev}><Arrow dir={-1} size={20} /></button>
          <button type="button" className="nx" onClick={() => go(index + 1)} aria-label={ui.next}><Arrow size={20} /></button>
        </>
      ) : null}
      <p className="cap">
        {x.label ? <span>{x.label}</span> : null}
        {n > 1 ? <span aria-live="polite">{pad(index + 1)} / {pad(n)}</span> : null}
      </p>
    </div>,
    document.body,
  );
}
