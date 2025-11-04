"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion, type Variants, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "./NewsBlogSection";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE_CB = [0.22, 1, 0.36, 1] as const;
const GAP_PX = 24; // Tailwind gap-6

const wrap: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { when: "beforeChildren", staggerChildren: 0.06, duration: 0.28, ease: EASE_CB },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 24, mass: 0.7 } },
};

function isHttpUrl(src?: string) {
  return !!src && (src.startsWith("http://") || src.startsWith("https://"));
}

// Safe, loose access helper without `any`
const loose = (o: unknown): Record<string, unknown> =>
  typeof o === "object" && o !== null ? (o as Record<string, unknown>) : {};

type Props = {
  initialPosts?: BlogPost[];
  pageSize?: number;
  placeholderImage?: string;
  showLoadMore?: boolean;
  title?: string;
  subtitle?: string;
  kicker?: string;
};

export default function NewsBlogListClient({
  initialPosts = [],
  pageSize = 6,
  placeholderImage = "/Perla II - 2.png",
  showLoadMore = true,
 title = "Latest Posts",
subtitle = "Up-to-date blog articles about our projects, regions, and digital sales experiences.",
kicker = "Blog & News",

}: Props) {
  const [visible, setVisible] = useState(pageSize);

  const sorted = useMemo(() => {
    const list = Array.isArray(initialPosts) ? initialPosts : [];
    return [...list].sort((a, b) => {
      const da = a?.date ? +new Date(a.date) : 0;
      const db = b?.date ? +new Date(b.date) : 0;
      return db - da;
    });
  }, [initialPosts]);

  const shown = sorted.slice(0, visible);
  const canLoadMore = showLoadMore && visible < sorted.length;

  // Carousel turns on when we have more than 3 posts
  const useCarousel = shown.length > 3;

  // Carousel state/refs (Framer Motion)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const x = useMotionValue(0);
  const [slideW, setSlideW] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [maxIndex, setMaxIndex] = useState(0);
  const [index, setIndex] = useState(0);

  // Drag/click guard + global selection toggle
  const isDraggingRef = useRef(false);
  const prevUserSelect = useRef<string>("");
  const prevWebkitUserSelect = useRef<string>("");

  const disableGlobalSelect = useCallback(() => {
    prevUserSelect.current = document.body.style.userSelect;
    prevWebkitUserSelect.current = document.body.style.getPropertyValue("-webkit-user-select");
    document.body.style.userSelect = "none";
    document.body.style.setProperty("-webkit-user-select", "none");
  }, []);

  const enableGlobalSelect = useCallback(() => {
    document.body.style.userSelect = prevUserSelect.current || "";
    if (prevWebkitUserSelect.current) {
      document.body.style.setProperty("-webkit-user-select", prevWebkitUserSelect.current);
    } else {
      document.body.style.removeProperty("-webkit-user-select");
    }
  }, []);

  useEffect(() => {
    return () => {
      // safety on unmount
      enableGlobalSelect();
    };
  }, [enableGlobalSelect]);

  const step = slideW ? slideW + GAP_PX : 0;

  const recalc = useCallback(() => {
    const cont = containerRef.current;
    const track = trackRef.current;
    if (!cont || !track) return;

    const first = track.querySelector("li");
    if (!first) return;

    const rect = first.getBoundingClientRect();
    const w = rect.width;
    setSlideW(w);

    // include the gap in the visible-slides calculation
    const vis = Math.max(1, Math.floor((cont.clientWidth + GAP_PX) / (w + GAP_PX)));
    setVisibleSlides(vis);

    const max = Math.max(0, shown.length - vis);
    setMaxIndex(max);

    // Snap current index back into bounds on resize
    setIndex((prev) => {
      const clamped = Math.min(Math.max(prev, 0), max);
      const target = -clamped * (w + GAP_PX);
      x.set(target);
      return clamped;
    });
  }, [shown.length, x]);

  useEffect(() => {
    if (!useCarousel) return;
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [useCarousel, recalc]);

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.min(Math.max(i, 0), maxIndex);
      setIndex(clamped);
      if (!step) return;
      const target = -clamped * step;
      animate(x, target, { type: "spring", stiffness: 260, damping: 30, mass: 0.8 });
    },
    [maxIndex, step, x]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Snap to nearest slide at the end of a drag
  const snapAfterDrag = useCallback(() => {
    if (!step) return;
    const currentX = x.get();
    const raw = -currentX / step;
    const nearest = Math.round(raw);
    goTo(nearest);
  }, [goTo, step, x]);

  // Handlers to guard against click after drag
  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    disableGlobalSelect(); // hard block selection across the page during drag
  }, [disableGlobalSelect]);

  const handleDragEnd = useCallback(() => {
    snapAfterDrag();
    // tiny delay to avoid immediate click after drag end
    setTimeout(() => {
      isDraggingRef.current = false;
      enableGlobalSelect();
    }, 50);
  }, [snapAfterDrag, enableGlobalSelect]);

  return (
    <section
      aria-label="News & Blog"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* top hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(20,21,23,0.08)]" />

        {/* subtle radial accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 8% 12%, rgba(39,149,155,0.05), transparent 60%), radial-gradient(50% 50% at 90% 10%, rgba(241,92,52,0.05), transparent 60%)",
          }}
        />

        {/* Kicker chip */}
        <motion.span
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(20,21,23,0.08)",
            color: TEAL,
          }}
        >
          {kicker}
        </motion.span>

        {/* Heading + sub */}
        <div className="mt-6">
          <motion.h2
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              className="mt-2 text-sm sm:text-base"
              style={{ color: "rgba(20,21,23,0.72)" }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* ---------- GRID (<= 3 posts) ---------- */}
        {!useCarousel && (
          <motion.ul
            variants={wrap}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2, once: false }}
            className="mx-auto mt-10 md:mt-12 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {shown.map((p, idx) => {
              const extras = loose(p);
              const img = p.cover || placeholderImage;
              const slug =
                p.slug ??
                (typeof extras.id === "string" || typeof extras.id === "number" ? String(extras.id) : "");
              const href = slug ? `/blog/${slug}` : "/blog";
              const date =
                p.date &&
                new Date(p.date).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                });
              const readTime = typeof extras.readTime === "number" ? (extras.readTime as number) : undefined;
              const author = typeof extras.author === "string" ? (extras.author as string) : undefined;

              return (
                <motion.li key={slug || `post-${idx}`} variants={item} className="h-full">
                  <Link
                    href={href}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="group h-full flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur-xl shadow transition hover:shadow-lg select-none [-webkit-user-drag:none]"
                  >
                    {/* Thumb */}
                    <div className="relative aspect-[16/10] shrink-0">
                      {img ? (
                        <Image
                          src={img}
                          alt={p.title || "Yazı görseli"}
                          fill
                          draggable={false}
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] pointer-events-none"
                          unoptimized={isHttpUrl(img)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={false}
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-xs text-black/40">
                          No cover
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-4 flex flex-col select-none">
                      <div className="text-xs text-black/60">
                        {date}
                        {typeof readTime === "number" ? ` • ${readTime} dk` : ""}
                        {author ? ` • ${author}` : ""}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold line-clamp-2 min-h-[3.2rem]">
                        {p.title}
                      </h3>
                      {p.excerpt ? (
                        <p className="mt-1 text-sm text-black/70 line-clamp-2">{p.excerpt}</p>
                      ) : null}
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}

        {/* ---------- CAROUSEL (> 3 posts) ---------- */}
        {useCarousel && (
          <div className="relative mt-10 md:mt-12 overflow-hidden" ref={containerRef}>
            {/* Track */}
            <motion.ul
              ref={trackRef}
              className="flex items-stretch gap-6 select-none cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -(maxIndex * (step || 0)), right: 0 }}
              dragElastic={0.05}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{
                x,
                touchAction: "pan-y",
                userSelect: "none",
              }}
            >
              {shown.map((p, idx) => {
                const extras = loose(p);
                const img = p.cover || placeholderImage;
                const slug =
                  p.slug ??
                  (typeof extras.id === "string" || typeof extras.id === "number" ? String(extras.id) : "");
                const href = slug ? `/blog/${slug}` : "/blog";
                const date =
                  p.date &&
                  new Date(p.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  });
                const readTime = typeof extras.readTime === "number" ? (extras.readTime as number) : undefined;
                const author = typeof extras.author === "string" ? (extras.author as string) : undefined;

                return (
                  <li
                    key={slug || `post-${idx}`}
                    className="
                      shrink-0
                      w-[85vw] sm:w-[70vw] md:w-[55vw]
                      lg:basis-[calc((100%_-_48px)/3)] lg:w-auto
                      max-w-none
                    "
                  >
                    <Link
                      href={href}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()} // stop native link drag
                      onClick={(e) => {
                        if (isDraggingRef.current) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      className="group h-full flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur-xl shadow transition hover:shadow-lg select-none [-webkit-user-drag:none]"
                    >
                      {/* Thumb */}
                      <div className="relative aspect-[16/10] shrink-0">
                        {img ? (
                          <Image
                            src={img}
                            alt={p.title || "Yazı görseli"}
                            fill
                            draggable={false}
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] pointer-events-none"
                            unoptimized={isHttpUrl(img)}
                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, (max-width:1280px) 55vw, 33vw"
                            priority={false}
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center text-xs text-black/40">
                            No cover
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex-1 p-4 flex flex-col select-none">
                        <div className="text-xs text-black/60">
                          {date}
                          {typeof readTime === "number" ? ` • ${readTime} dk` : ""}
                          {author ? ` • ${author}` : ""}
                        </div>
                        <h3 className="mt-2 text-lg font-semibold line-clamp-2 min-h-[3.2rem]">
                          {p.title}
                        </h3>
                        {p.excerpt ? (
                          <p className="mt-1 text-sm text-black/70 line-clamp-2">{p.excerpt}</p>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </motion.ul>

            {/* Arrows */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2">
              <button
                onClick={prev}
                disabled={index <= 0}
                className="pointer-events-auto rounded-full border border-black/10 bg-white/70 backdrop-blur px-3 py-2 shadow disabled:opacity-40"
                aria-label="Önceki"
                style={{ color: "rgba(20,21,23,0.85)" }}
              >
                ←
              </button>
              <button
                onClick={next}
                disabled={index >= maxIndex}
                className="pointer-events-auto rounded-full border border-black/10 bg-white/70 backdrop-blur px-3 py-2 shadow disabled:opacity-40"
                aria-label="Sonraki"
                style={{ color: "rgba(20,21,23,0.85)" }}
              >
                →
              </button>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2 z-10 relative">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Sayfa ${i + 1}`}
                  className="h-2 w-2 rounded-full transition"
                  style={{
                    background: i === index ? ORANGE : "rgba(20,21,23,0.18)",
                    transform: i === index ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Load more (only when not using carousel) */}
        {!useCarousel && canLoadMore && (
          <div className="mt-12 md:mt-14 flex justify-center gap-3">
            <button
              onClick={() => setVisible((v) => v + pageSize)}
              className="rounded-full px-7 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
            >
              Daha Fazla Yükle
            </button>
            <Link
              href="/blog"
              className="rounded-full px-7 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{
                background: "rgba(20,21,23,0.06)",
                border: "1px solid rgba(20,21,23,0.12)",
                color: "rgba(20,21,23,0.85)",
              }}
            >
              Tüm Yazılar
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
