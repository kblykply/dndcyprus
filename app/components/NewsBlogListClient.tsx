// app/components/NewsBlogListClient.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import type { BlogPost } from "./NewsBlogSection";

const wrap: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { when: "beforeChildren", staggerChildren: 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] },
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
};

export default function NewsBlogListClient({
  initialPosts = [],
  pageSize = 6,
  placeholderImage = "/Perla II - 2.png",
  showLoadMore = true,
  title = "Son Yazılar",
  subtitle = "Projelerimiz, bölgeler ve dijital satış deneyimleri üzerine güncel blog yazıları.",
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
      className="
        relative isolate w-full min-h-screen
        px-4 sm:px-6 md:px-8 py-16 md:py-20
      "
    >
      {/* === FULL-BLEED GLASS BACKDROP (no gaps around) === */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(80%_80%_at_10%_10%,rgba(39,149,155,0.18),transparent_60%),
              radial-gradient(70%_70%_at_90%_10%,rgba(241,92,52,0.12),transparent_60%),
              linear-gradient(to_bottom,rgba(255,255,255,0.65),rgba(255,255,255,0.35))]
          backdrop-blur-2xl
        "
      />
      {/* Soft vignette & top hairline */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(80%_80%_at_50%_20%,black,transparent_90%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/50" />
      {/* Subtle noise for texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22><filter id=%22n%22 x=%22-20%22 y=%22-20%22 width=%22240%22 height=%22240%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.45%22/></svg>')] bg-repeat" />

      {/* === Heading === */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-3 text-sm md:text-base text-white"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* === Grid === */}
      <motion.div
        variants={wrap}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2, once: false }}
        className="
          mx-auto mt-10 md:mt-12 max-w-6xl
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6
        "
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
                group relative flex flex-col rounded-3xl overflow-hidden
                bg-white/40 backdrop-blur-xl
                
                shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_30px_rgba(0,0,0,0.06)]
                ring-0 ring-teal-500/0 hover:ring-2 hover:ring-[#27959b33]
                transition-[transform,box-shadow,ring] duration-300
                hover:-translate-y-1
              "
            >
              {/* Cover */}
              <a href={href} className="relative block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={img}
                    alt={p.title || "Yazı görseli"}
                    className="
                      absolute inset-0 w-full h-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-[1.04]
                    "
                    loading="lazy"
                  />
                  {/* soft gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
                  {p.category && (
                    <span
                      className="
                        absolute left-3 top-3 text-[11px] px-2 py-0.5 rounded-full
                        bg-white/70 border border-white/80 backdrop-blur
                        text-black/80 font-medium shadow-sm
                      "
                    >
                      {p.category}
                    </span>
                  )}
                </div>
              </a>

              {/* Body */}
              <div className="p-5 md:p-6 flex flex-col gap-2">
                <a href={href} className="group">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight text-white group-hover:underline">
                    {p.title}
                  </h3>
                </a>

                {p.excerpt && (
                  <p className="text-[13px] leading-6 text-black/70 line-clamp-3">
                    {p.excerpt}
                  </p>
                )}

                {(date || p.readTime || p.author) && (
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-black/60">
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

              {/* Footer */}
              <div className="px-5 md:px-6 pb-5 md:pb-6 mt-auto">
                <a
                  href={href}
                  className="
                    inline-flex items-center gap-2 text-sm font-medium
                    rounded-full px-3.5 py-1.5
                    bg-white/80 backdrop-blur border border-white
                    text-black/80 hover:bg-white active:scale-[0.985]
                    transition
                    shadow-[0_2px_6px_rgba(0,0,0,0.06)]
                  "
                >
                  Devamını Oku <span aria-hidden>→</span>
                </a>
              </div>

              {/* Glow on hover */}
              <div
                aria-hidden
                className="
                  pointer-events-none absolute inset-0 rounded-3xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  shadow-[0_0_0_1px_rgba(255,255,255,.4),0_40px_80px_-30px_#27959b33,0_30px_60px_-40px_#f15c3426]
                "
              />
            </motion.article>
          );
        })}
      </motion.div>

      {/* Load more */}
      {canLoadMore && (
        <div className="mt-12 md:mt-14 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + pageSize)}
            className="
              rounded-full px-7 py-2.5 text-sm font-semibold
              bg-white/80 backdrop-blur border border-white
              text-black/80 hover:bg-white active:scale-[0.985]
              transition shadow-[0_6px_20px_rgba(0,0,0,.08)]
            "
          >
            Daha Fazla Yükle
          </button>
        </div>
      )}
    </section>
  );
}
