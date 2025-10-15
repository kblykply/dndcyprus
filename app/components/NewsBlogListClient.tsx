// app/components/NewsBlogListClient.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
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

function isHttpUrl(src?: string) {
  return !!src && (src.startsWith("http://") || src.startsWith("https://"));
}

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

        {/* Grid -> uses new Card style */}
        <motion.ul
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
              <motion.li key={slug || `post-${idx}`} variants={item} className="h-full">
                <Link
                  href={href}
                  className="group h-full flex flex-col overflow-hidden rounded-2xl border border-black/10
                             bg-white/70 backdrop-blur-xl shadow transition hover:shadow-lg"
                >
                  {/* Thumb (fixed ratio) */}
                  <div className="relative aspect-[16/10] shrink-0">
                    {img ? (
                      <Image
                        src={img}
                        alt={p.title || "Yazı görseli"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="text-xs text-black/60">
                      {date}
                      {p.readTime ? ` • ${p.readTime} dk` : ""}
                      {p.author ? ` • ${p.author}` : ""}
                    </div>

                    {/* Reserve height for 2 lines so rows align */}
                    <h3 className="mt-2 text-lg font-semibold line-clamp-2 min-h-[3.2rem]">
                      {p.title}
                    </h3>

                    {p.excerpt ? (
                      <p className="mt-1 text-sm text-black/70 line-clamp-2">
                        {p.excerpt}
                      </p>
                    ) : null}

                    {/* If you add footer later, push it down with mt-auto */}
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Load more */}
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
