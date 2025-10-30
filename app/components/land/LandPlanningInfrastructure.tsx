// app/components/land/LandPlanningInfrastructure.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  type Variants,
  type Easing,
  useMotionValue,
  animate,
} from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE: Easing = [0.22, 1, 0.36, 1] as const;
const GAP = 20;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE },
  },
};

type Card = {
  title: string;
  desc?: string;
  image: string;               // public/ path
  tag: "Planlama" | "Altyapı"; // pill label
  accent?: "teal" | "orange";
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: Card[];      // override to fully control cards
  autoPlay?: boolean;
  intervalMs?: number;
};

export default function LandPlanningInfrastructure({
  title = "Planlama & Altyapı",
  subtitle = "Zonlama esasları ve arsanın hazır bulunuşluk durumu, görsellerle özetlenmiştir. Nihai izinler ilgili kurumların onayına tabidir.",
  items,
  autoPlay = true,
  intervalMs = 5000,
}: Props) {
  /* ---------- Data (defaults) ---------- */
  const data: Card[] = useMemo(
    () =>
      items ?? [
        {
          title: "Zonlama Dayanağı",
          desc: "Fasıl 96 kapsamında gelişim — yerel mevzuata uygun planlama.",
          image: "/zon.jpg",
          tag: "Planlama",
          accent: "teal",
        },
        {
          title: "İzinli Tipolojiler",
          desc: "Tek katlı villa, ikiz villa ve çok katlı apartman senaryoları.",
          image: "/vil.jpg",
          tag: "Planlama",
          accent: "orange",
        },
        {
          title: "Yükseklik Bilgisi",
          desc: "Bilgi amaçlı: ortalama bir parselde ~5 kata kadar imkân.",
          image: "/apart.jpg",
          tag: "Planlama",
          accent: "teal",
        },
        {
          title: "Altyapı Çalışmaları",
          desc: "Bölgede yol, elektrik ve su altyapısı için çalışmalar sürüyor.",
          image: "/water.jpg",
          tag: "Altyapı",
          accent: "orange",
        },
        {
          title: "Parsel & Tapu",
          desc: "Parselasyon ve tapu süreçlerinde hazır/ilerlemiş durum.",
          image: "/tapu.jpg",
          tag: "Altyapı",
          accent: "teal",
        },
       
      ],
    [items]
  );

  const total = data.length;

  /* ---------- Motion / State ---------- */
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0); // page index (not slide index)
  const [step, setStep] = useState(0);   // px (one card + gap)
  const [visibleCount, setVisibleCount] = useState(1);
  const [maxIndex, setMaxIndex] = useState(0);
  const [limits, setLimits] = useState<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });
  const hoverRef = useRef(false);
  const draggingRef = useRef(false);

  /* ---------- Refs ---------- */
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Helpers ---------- */
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  /* ---------- Measure / Layout ---------- */
  const measure = () => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;

    const firstWidth = slides[0].getBoundingClientRect().width;
    const stepPx = firstWidth + GAP;
    setStep(stepPx);

    const trackWidth =
      slides.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) +
      GAP * (slides.length - 1);

    const vpWidth = vp.getBoundingClientRect().width;

    const visible =
      Math.max(1, Math.floor((vpWidth + GAP - 1) / stepPx)) || 1;
    setVisibleCount(visible);

    const maxNegative = Math.min(0, vpWidth - trackWidth);
    setLimits({ left: maxNegative, right: 0 });

    const newMaxIndex = Math.max(0, slides.length - visible);
    setMaxIndex(newMaxIndex);

    const safeIndex = clamp(index, 0, newMaxIndex);
    if (safeIndex !== index) setIndex(safeIndex);

    const target = clamp(-safeIndex * stepPx, maxNegative, 0);
    x.set(target);
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  /* ---------- Navigation ---------- */
  const goTo = (i: number) => {
    const targetIndex = clamp(i, 0, maxIndex);
    setIndex(targetIndex);
    const target = clamp(-targetIndex * step, limits.left, limits.right);
    animate(x, target, { duration: 0.55, ease: EASE });
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  /* ---------- Drag / Swipe ---------- */
  const onDragStart = () => {
    draggingRef.current = true;
    hoverRef.current = true;
  };
  const onDragEnd = () => {
    draggingRef.current = false;
    if (!step) return;
    const current = x.get();
    const nearest = clamp(Math.round(Math.abs(current) / step), 0, maxIndex);
    goTo(nearest);
    setTimeout(() => (hoverRef.current = false), 80);
  };

  /* ---------- Autoplay ---------- */
  useEffect(() => {
    if (!autoPlay || maxIndex <= 0) return;
    const id = setInterval(() => {
      if (hoverRef.current || draggingRef.current) return;
      const nextIndex = index >= maxIndex ? 0 : index + 1;
      goTo(nextIndex);
    }, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, intervalMs, index, maxIndex, step]);

  /* ---------- UI ---------- */
  const totalPages = Math.max(1, maxIndex + 1);

  return (
    <section
      aria-label="Planlama & Altyapı — Görsel Kart Carousel"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* Aura accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(39,149,155,0.20), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(241,92,52,0.16), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-12 lg:pb-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-base sm:text-lg" style={{ color: "#141517CC" }}>
            {subtitle}
          </p>
        </motion.div>

          {/* Carousel */}
          <div className="mt-8 relative select-none">
            {/* Viewport */}
            <div
              ref={viewportRef}
              className="overflow-hidden"
              style={{ touchAction: "pan-y" }}
            >
              {/* Track (drag/swipe) */}
              <motion.div
                ref={trackRef}
                className="flex will-change-transform"
                style={{ x, columnGap: GAP }}
                drag="x"
                dragConstraints={limits}
                dragElastic={0.08}
                dragMomentum={false}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                role="group"
                aria-roledescription="carousel"
                aria-label="Planlama & Altyapı kartları"
              >
                {data.map((card, i) => {
                  const isActive = i >= index && i < index + visibleCount;
                  const accent =
                    card.accent === "orange" ? ORANGE : TEAL;

             return (
  <div
    key={card.title + i}
    // full width on mobile, multi-card on larger screens
    className="shrink-0 basis-full sm:basis-[56%] md:basis-[44%] lg:basis-[32%]"
    data-slide={i}
  >
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="relative h-[360px] sm:h-[420px] rounded-[24px] overflow-hidden"
      style={{
        boxShadow: isActive
          ? `0 20px 50px rgba(0,0,0,0.15), 0 10px 26px ${accent}12`
          : "0 14px 32px rgba(0,0,0,0.10)",
        transform: isActive ? "scale(1.02)" : "scale(0.98)",
        transition: "transform .35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${card.image})` }}
        aria-hidden
      />
      {/* Readability wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.08))",
        }}
        aria-hidden
      />
      {/* Glass footer */}
      <div
        className="absolute h-[160px] left-4 right-4 bottom-4 rounded-2xl p-4 sm:p-5 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.10))",
          border: "1px solid rgba(255,255,255,0.26)",
          color: "#fff",
        }}
      >
        {/* Tag pill */}
        <span
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full"
          style={{
            background: "#fff",
            border: `1px solid ${accent}33`,
            color: accent,
            boxShadow: `0 6px 14px ${accent}1f`,
          }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
          {card.tag}
        </span>

        <h3 className="mt-2 text-xl font-semibold text-white drop-shadow">
          {card.title}
        </h3>
        {card.desc ? (
          <p className="mt-1.5 text-sm leading-relaxed text-white/90">
            {card.desc}
          </p>
        ) : null}
      </div>
    </motion.div>
  </div>
);

                })}
              </motion.div>
            </div>

            {/* Dots (page-based) */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const isActive = i === index;
                return (
                  <button
                    type="button"
                    key={`dot-${i}`}
                    onClick={() => goTo(i)}
                    aria-label={`Sayfa ${i + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className="h-2.5 rounded-full transition-all"
                    style={{
                      width: isActive ? 28 : 8,
                      background: isActive ? TEAL : "#fff",
                      border: `1px solid ${
                        isActive ? `${TEAL}66` : "rgba(20,21,23,0.1)"
                      }`,
                      boxShadow: isActive ? `0 6px 12px ${TEAL}22` : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>
      </div>
    </section>
  );
}
