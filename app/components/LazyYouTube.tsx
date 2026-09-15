// app/components/LazyYouTube.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

/*
  Tembel YouTube gömme:
  - Önce kapak görseli (i.ytimg.com küçük resmi ya da verilen poster) gösterilir.
  - Öğe görünüm alanına ~200px yaklaşınca gerçek iframe takılır.
  - prefers-reduced-motion açıksa otomatik takılmaz; oynat düğmesi gösterilir.
*/

type Props = {
  videoId: string;
  /** iframe başlığı (erişilebilirlik) */
  title: string;
  /** Kapak görseli için alt metin */
  posterAlt: string;
  /** Embed sorgu dizesi, ör. "autoplay=1&mute=1&loop=1&playlist=ID" */
  query?: string;
  /** Varsayılan: YouTube hqdefault küçük resmi */
  poster?: string;
  /** Yan bantları kırpmak için ölçek (1 = kırpma yok); kapak ve iframe'e birlikte uygulanır */
  zoom?: number;
  /** Dış kapsayıcı konum/boyut sınıfı (ör. "relative w-full h-full" ya da "absolute inset-0") */
  className?: string;
  /** Oynat düğmesi etiketi (reduced-motion durumunda) */
  playLabel?: string;
  rootMargin?: string;
  allow?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
};

export default function LazyYouTube({
  videoId,
  title,
  posterAlt,
  query = "",
  poster,
  zoom = 1,
  className = "relative w-full h-full",
  playLabel = "Videoyu oynat",
  rootMargin = "200px",
  allow = "autoplay; encrypted-media; picture-in-picture",
  referrerPolicy = "origin-when-cross-origin",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setReduced(true);
      return;
    }
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  const src = `https://www.youtube-nocookie.com/embed/${videoId}${query ? `?${query}` : ""}`;
  const posterSrc = poster ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const scaleStyle: React.CSSProperties | undefined =
    zoom !== 1 ? { transform: `scale(${zoom})` } : undefined;

  return (
    <div ref={wrapRef} className={`overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0 origin-center" style={scaleStyle}>
        {/* Kapak (iframe gelene kadar görünür, sonra altında kalır) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt={mounted ? "" : posterAlt}
          aria-hidden={mounted ? true : undefined}
          loading="lazy"
          decoding="async"
          width={480}
          height={360}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {mounted && (
          <iframe
            title={title}
            src={src}
            className="absolute inset-0 h-full w-full block"
            allow={allow}
            referrerPolicy={referrerPolicy}
            allowFullScreen
          />
        )}
      </div>

      {/* Hareket azaltma tercihinde: tıklayınca yükle */}
      {reduced && !mounted && (
        <button
          type="button"
          onClick={() => setMounted(true)}
          className="absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label={playLabel}
        >
          <span
            aria-hidden
            className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-black shadow-lg"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
