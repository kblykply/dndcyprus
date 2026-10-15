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
  { year: "2017", title: "DND Homes Kuruluşu", summary: "Şirketin ilk merkezi Boston’da kuruldu.", image: "/dnd-boston-ofis.jpg", badge: "Kuruluş" },
  { year: "2017", title: "Amerika’daki İlk Proje", summary: "12 Longfellow Road, Lexington projesi hayata geçirildi.", image: "/12lex.jpg", badge: "ABD" },
  { year: "2018", title: "Ozan Dökmecioğlu Ödülü", summary: "Boston Business Journal tarafından “Yılın CFO’su” seçildi.", image: "/ozan-dokmecioglu-cfo-of-the-year.jpg", badge: "Ödül" },
  { year: "2023", title: "DND Kıbrıs Kuruluşu", summary: "Kıbrıs’ta yeni operasyon merkezi açıldı.", image: "/kurulus.JPG", badge: "Kıbrıs" },
  { year: "2025", title: "Property NC Ödülleri", summary: "“En İyi Çıkış Yapan Şirket” ödülüne layık görüldü.", image: "/property_awards_2025-747.jpg", badge: "Property NC" },
  { year: "2025", title: "İlk Proje La Joya Teslimi", summary: "La Joya projesi tamamlanarak teslim edildi.", image: "/la-joya/2.jpg", badge: "Teslim" },
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
            Şirket Hikayemiz
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">2017’den bugüne DND</h2>
          <p className="mt-2 text-base text-black/60 md:text-lg">Boston’dan Kuzey Kıbrıs’a uzanan yolculuğumuzun kilometre taşları.</p>
        </div>

        {/* Yatay zaman çizelgesi */}
        <nav aria-label="Kilometre taşları" className="relative mt-10">
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

        {/* İçerik: tam genişlik görsel pano, metin görselin üstünde (boş beyaz kart yerine) */}
        <div className="relative mt-10 overflow-hidden rounded-3xl shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
          <div className="relative h-[520px] sm:h-[480px] md:h-[500px]">
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
                  quality={70}
                  className="object-cover"
                  sizes="(min-width: 1280px) 1216px, 100vw"
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
                  quality={70}
                  className="object-cover"
                  sizes="(min-width: 1280px) 1216px, 100vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* okunabilirlik: telefonda alttan, masaüstünde soldan koyu geçiş */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/5 md:bg-gradient-to-r md:from-black/80 md:via-black/45 md:to-transparent" />

            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="w-full max-w-xl p-6 text-white sm:p-10 md:p-12">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white" style={{ background: `${ORANGE}cc` }}>
                    {current.badge ?? current.year}
                  </span>
                  <span className="ml-auto text-sm tabular-nums text-white/60 md:ml-3">
                    {String(index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
                  </span>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`txt-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <p className="mt-4 text-6xl font-black leading-none tracking-tight text-white md:text-7xl">{current.year}</p>
                    <span aria-hidden className="mt-3 block h-1 w-14 rounded-full" style={{ background: TEAL }} />
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-4xl">{current.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/80 md:text-lg">{current.summary}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-4">
                  <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/20">
                    <motion.div className="h-full rounded-full" style={{ background: TEAL }} initial={false} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <GlassIconButton onClick={prev} ariaLabel="Önceki">
                      <FiChevronLeft className="h-5 w-5" />
                    </GlassIconButton>
                    <GlassIconButton onClick={next} ariaLabel="Sonraki">
                      <FiChevronRight className="h-5 w-5" />
                    </GlassIconButton>
                  </div>
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-full
                 border border-white/25 bg-white/10 text-white backdrop-blur-md
                 transition hover:bg-white/20"
    >
      {children}
    </button>
  );
}
