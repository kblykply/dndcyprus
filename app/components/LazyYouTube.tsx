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
  /** Videonun kendi en-boy oranı (cover hesabı için); 4:3 video 16:9 sanılırsa gereksiz büyütülüp bulanıklaşır */
  ratio?: number;
  /** Dış kapsayıcı konum/boyut sınıfı (ör. "relative w-full h-full" ya da "absolute inset-0") */
  className?: string;
  /** true: 16:9 video kutuyu tamamen doldurur (siyah bant yok, taşan kısım kırpılır) */
  cover?: boolean;
  /** Oynat düğmesi etiketi (reduced-motion durumunda) */
  playLabel?: string;
  /** Varsayılan: arka plan videosunda 1200px, telefonda 600px (kullanıcı varmadan oynamaya başlasın), diğerlerinde 200px */
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
  ratio = 16 / 9,
  className = "relative w-full h-full",
  cover = false,
  playLabel = "Videoyu oynat",
  rootMargin,
  allow = "autoplay; encrypted-media; picture-in-picture",
  referrerPolicy = "origin-when-cross-origin",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Arka plan videosu (kaplama + kontroller kapalı): YouTube'un açılışta ve fare üstündeyken gösterdiği başlık,
  // düğmeler ve "Diğer videolar" bandı görünmesin diye ilk saniyelerde kapak üstte kalır, üstte şeffaf engel var.
  const background = cover && /(^|&)controls=0(&|$)/.test(query);
  const [shown, setShown] = useState(false);

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
    // Arka plan videosu bölüm ekrana gelmeden çok önce yüklenir: kapak, YouTube arayüzü sönene kadar (yüklemeden
    // ~3,8 sn sonra) üstte kaldığı için 200px'te takılınca video bölüme varıldıktan 5–6 sn sonra başlıyordu.
    // Telefonda 600px: 1200px'te bölüm açılışta zaten menzilde kalıyor, ~1,6 MB oynatıcı ilk görselle yarışıyordu
    const phone = window.matchMedia?.("(max-width: 767px)").matches;
    const margin = rootMargin ?? (background ? (phone ? "600px 0px" : "1200px 0px") : "200px");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin, background]);

  const src = `https://www.youtube-nocookie.com/embed/${videoId}${query ? `?${query}` : ""}`;
  const posterSrc = poster ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const scaleStyle: React.CSSProperties | undefined = cover
    ? {
        // kapsayıcı sorgu birimleriyle "object-fit: cover": 16:9 video her oranda kutuyu doldurur
        inset: "auto", left: "50%", top: "50%",
        width: `max(100%, calc(100cqh * ${ratio}))`, height: `max(100%, calc(100cqw / ${ratio}))`,
        transform: `translate(-50%, -50%)${zoom !== 1 ? ` scale(${zoom})` : ""}`,
      }
    : zoom !== 1 ? { transform: `scale(${zoom})` } : undefined;

  return (
    <div ref={wrapRef} className={`overflow-hidden bg-black ${className}`} style={cover ? { containerType: "size" } : undefined}>
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
            onLoad={background ? () => window.setTimeout(() => setShown(true), 3800) : undefined}
          />
        )}
        {background && mounted && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterSrc}
              alt=""
              aria-hidden
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${shown ? "opacity-0" : "opacity-100"}`}
            />
            <div aria-hidden className="absolute inset-0" />
          </>
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
