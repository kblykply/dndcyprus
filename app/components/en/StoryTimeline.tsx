// app/components/StoryTimeline.tsx
"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import Image from "@/app/components/performance/DeferredFillImage";
import { m as motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Milestone = {
  year: string;
  title: string;
  summary: string;
  image: string;
  badge?: string;
};

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MILESTONES: Milestone[] = [
  {
    year: "2017",
    title: "Founding of DND Homes",
    summary: "The company’s first headquarters was established in Boston.",
    image: "/dnd-boston-ofis.jpg",
    badge: "Foundation",
  },
  {
    year: "2017",
    title: "First Project in the USA",
    summary: "The 12 Longfellow Road, Lexington project was completed.",
    image: "/12lex.jpg",
    badge: "USA",
  },
  {
    year: "2018",
    title: "Ozan Dökmecioğlu Award",
    summary: "Named “CFO of the Year” by the Boston Business Journal.",
    image: "/ozan-dokmecioglu-cfo-of-the-year.jpg",
    badge: "Award",
  },
  {
    year: "2023",
    title: "Establishment of DND Cyprus",
    summary: "A new operational center was opened in Cyprus.",
    image: "/kurulus.JPG",
    badge: "Cyprus",
  },
  {
    year: "2025",
    title: "Property NC Awards",
    summary: "Received the “Best Newcomer Company” award.",
    image: "/property_awards_2025-747.jpg",
    badge: "Property NC",
  },
  {
    year: "2025",
    title: "Delivery of the First Project – La Joya",
    summary: "The La Joya project was completed and handed over.",
    image: "/la-joya/2.jpg",
    badge: "Delivery",
  },
];


export default function StoryTimeline() {
  const [index, setIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const len = MILESTONES.length;
  const current = MILESTONES[index];

  const goTo = useCallback(
    (i: number) => {
      prevIndexRef.current = index;
      setIndex(((i % len) + len) % len);
    },
    [index, len]
  );

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const progress = useMemo(() => (index + 1) / len, [index, len]);

  return (
    <section
      id="story"
      data-bg="light"
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ background: `linear-gradient(180deg, ${TEAL}0f 0%, #ffffff 85%)` }}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* yumuşak marka ışıkları */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full blur-3xl" style={{ background: `${TEAL}1f` }} />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-3xl" style={{ background: `${ORANGE}14` }} />

      <motion.div
        className="relative mx-auto max-w-7xl px-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {/* Başlık */}
        <div className="max-w-2xl">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider"
            style={{ background: `${TEAL}14`, border: `1px solid ${TEAL}33`, color: TEAL }}
          >
            Our Story
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">DND since 2017</h2>
          <p className="mt-2 text-base text-black/60 md:text-lg">Milestones of our journey from Boston to North Cyprus.</p>
        </div>

        {/* Yatay zaman çizelgesi */}
        <nav aria-label="Milestones" className="relative mt-10">
          <div aria-hidden className="absolute left-0 right-0 top-[11px] h-[2px] rounded-full bg-black/10" />
          <motion.div
            aria-hidden
            className="absolute left-0 top-[11px] h-[2px] rounded-full"
            style={{ background: TEAL }}
            initial={false}
            animate={{ width: `${(index / (len - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <ol className="relative grid grid-cols-6 gap-1">
            {MILESTONES.map((m, i) => {
              const active = i === index;
              const done = i < index;
              return (
                <li key={`${m.year}-${i}`} className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${m.year} – ${m.title}`}
                    aria-current={active ? "step" : undefined}
                    className="group flex flex-col items-center"
                  >
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full border-2 bg-white transition-all"
                      style={{
                        borderColor: active || done ? TEAL : "rgba(0,0,0,0.18)",
                        boxShadow: active ? `0 0 0 6px ${TEAL}22` : undefined,
                      }}
                    >
                      <span className="h-2.5 w-2.5 rounded-full transition-colors" style={{ background: active || done ? TEAL : "transparent" }} />
                    </span>
                    <span className={`mt-2 text-sm font-semibold transition-colors md:text-base ${active ? "" : "text-black/45 group-hover:text-black/70"}`} style={active ? { color: TEAL } : undefined}>
                      {m.year}
                    </span>
                    <span className={`mt-0.5 hidden text-xs md:block ${active ? "text-black/70" : "text-black/40"}`}>{m.badge}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* İçerik: görsel + metin */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-7">
            <div className="relative h-full overflow-hidden rounded-3xl shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              <div className="relative aspect-[16/10] md:aspect-auto md:h-full md:min-h-[380px]">
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={`out-${prevIndexRef.current}`}
                    className="absolute inset-0"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.02, transition: { duration: 0.6, ease: EASE } }}
                    exit={{ opacity: 0 }}
                  >
                    <Image
                      src={MILESTONES[prevIndexRef.current].image}
                      alt=""
                      fill
                      quality={65}
                      className="object-cover"
                      sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, calc(100vw - 48px)"
                    />
                  </motion.div>
                  <motion.div
                    key={`in-${index}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } }}
                    exit={{ opacity: 1 }}
                  >
                    <Image
                      src={MILESTONES[index].image}
                      alt={MILESTONES[index].title}
                      fill
                      quality={65}
                      className="object-cover"
                      sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, calc(100vw - 48px)"
                    />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-4 left-5 text-5xl font-black leading-none tracking-tight text-white/90 drop-shadow md:text-6xl">
                  {current.year}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.3)] ring-1 ring-black/5 md:p-9">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ background: `${ORANGE}14`, border: `1px solid ${ORANGE}33`, color: ORANGE }}
                >
                  {current.year}
                </span>
                {current.badge && (
                  <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-black/70">
                    {current.badge}
                  </span>
                )}
                <span className="ml-auto text-sm tabular-nums text-black/40">
                  {String(index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="flex flex-1 flex-col justify-center py-4"
                  key={`txt-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 text-balance md:text-3xl">{current.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-black/65 md:text-lg">{current.summary}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between">
                <div className="h-1.5 w-28 overflow-hidden rounded-full bg-black/10">
                  <motion.div className="h-full rounded-full" style={{ background: TEAL }} initial={false} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
                </div>
                <div className="flex items-center gap-2">
                  <GlassIconButton onClick={prev} ariaLabel="Previous">
                    <FiChevronLeft className="h-5 w-5" />
                  </GlassIconButton>
                  <GlassIconButton onClick={next} ariaLabel="Next">
                    <FiChevronRight className="h-5 w-5" />
                  </GlassIconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function GlassIconButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl
                 border border-black/10 bg-white text-black
                 hover:bg-black/5 transition shadow-md"
    >
      {children}
    </button>
  );
}
