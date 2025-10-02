// app/components/NewsBlogListClient.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "./NewsBlogSection";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE_CB = [0.22, 1, 0.36, 1] as const;

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
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 24, mass: 0.7 },
  },
};

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
  title = "Son Yazılar",
  subtitle = "Projelerimiz, bölgeler ve dijital satış deneyimleri üzerine güncel blog yazıları.",
  kicker = "Blog & Haberler",
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

  return (
    <section
      aria-label="News & Blog"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517" }}
      data-bg="light"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* top hairline like Spotlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(20,21,23,0.08)]" />

        {/* subtle radial accents to keep DND vibe, very light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 8% 12%, rgba(39,149,155,0.05), transparent 60%), radial-gradient(50% 50% at 90% 10%, rgba(241,92,52,0.05), transparent 60%)",
          }}
        />

        {/* Kicker chip (matches Spotlight) */}
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

        {/* Grid */}
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2, once: false }}
          className="mx-auto mt-10 md:mt-12 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {shown.map((p, idx) => {
            const img = p.cover || placeholderImage;
            const slug = p.slug ?? String(p.id ?? "");
            const href = slug ? `/blog/${slug}` : "#";
            const date =
              p.date &&
              new Date(p.date).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              });

            return (
              <motion.article
                key={slug || `post-${idx}`}
                variants={item}
                className="
                  group relative flex flex-col rounded-2xl overflow-hidden
                  bg-white
                  border border-[rgba(20,21,23,0.08)]
                  shadow-[0_4px_18px_rgba(0,0,0,0.05)]
                  transition-[transform,box-shadow,border-color] duration-300
                  hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)]
                  hover:border-[rgba(20,21,23,0.12)]
                "
              >
                <Link href={href} className="relative block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={img}
                      alt={p.title || "Yazı görseli"}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    {/* soft top-to-bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent pointer-events-none" />
                    {!!p.category && (
                      <span
                        className="
                          absolute left-3 top-3 text-[11px] px-2 py-0.5 rounded-full
                          bg-white border border-white/70 backdrop-blur
                          text-black/80 font-medium shadow-sm
                        "
                      >
                        {p.category}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Body */}
                <div className="p-5 md:p-6 flex flex-col gap-2">
                  <Link href={href} className="group">
                    <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight">
                      {p.title}
                    </h3>
                  </Link>

                  {p.excerpt && (
                    <p className="text-[13px] leading-6 text-[rgba(20,21,23,0.72)] line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}

                  {(date || p.readTime || p.author) && (
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
                      {date && <span>{date}</span>}
                      {p.readTime && (
                        <>
                          <span className="opacity-40">•</span>
                          <span>{p.readTime} dk okuma</span>
                        </>
                      )}
                      {p.author && (
                        <>
                          <span className="opacity-40">•</span>
                          <span>{p.author}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer CTA (styled like Spotlight buttons) */}
                <div className="px-5 md:px-6 pb-5 md:pb-6 mt-auto">
               <Link
  href={href}
  className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-3.5 py-1.5 transition-transform hover:-translate-y-0.5"
  style={{
    background: "#fff",
    color: TEAL,
    border: `1px solid ${TEAL}33`,
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = `${TEAL}`;
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.border = `1px solid ${TEAL}`;
    e.currentTarget.style.boxShadow = `0 8px 20px ${TEAL}44`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.color = TEAL;
    e.currentTarget.style.border = `1px solid ${TEAL}33`;
    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
  }}
>
  Devamını Oku <span aria-hidden>→</span>
</Link>

                </div>

                {/* subtle hover glow accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `inset 0 0 0 1px rgba(255,255,255,.6), 0 30px 60px -40px ${TEAL}22, 0 26px 52px -44px ${ORANGE}22`,
                  }}
                />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Load more (Spotlight-like buttons) */}
        {canLoadMore && (
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
              style={{ background: "rgba(20,21,23,0.06)", border: "1px solid rgba(20,21,23,0.12)", color: "rgba(20,21,23,0.85)" }}
            >
              Tüm Yazılar
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
