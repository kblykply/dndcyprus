// app/components/StoryTimeline.tsx
"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Milestone = {
  year: string;
  title: string;
  summary: string;
  image: string;
  badge?: string;
};

// Kept for future use if needed, not actively used to keep colors minimal
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
      className="relative w-full bg-white py-20 md:py-28"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <motion.div
        className="mx-auto max-w-7xl px-6 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {/* LEFT */}
        <div className="relative">
          {/* watermark year (very light neutral) */}
          <div
            aria-hidden
            className="select-none pointer-events-none absolute -top-16 -right-2 text-8xl md:text-9xl font-black tracking-tight text-black/5 z-100"
          >
            {current.year}
          </div>

          <div className="relative rounded-3xl border border-black/10 bg-white shadow-md z-10">
            <div className="relative p-7 md:p-10">
              {/* Neutral section label */}
             <span
  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
  style={{
    background: `${TEAL}14`,     // subtle teal tint (#27959b14)
    border: `1px solid ${TEAL}33`,// thin teal border
    color: TEAL,                  // teal text
  }}
>
  Şirket Hikayemiz
</span>

              <div className="mt-4 flex items-center gap-2">
                {/* Neutral year tag */}
          <span
  className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
  style={{
    background: `${ORANGE}14`,      // subtle orange tint
    border: `1px solid ${ORANGE}33`,// thin orange border
    color: ORANGE,                  // orange text
  }}
>
  {current.year}
</span>


                {/* Neutralized badge (optional) */}
                {current.badge && (
                  <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-black/70">
                    {current.badge}
                  </span>
                )}
              </div>

 <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 text-balance">           
  
  
       {current.title}
              </h3>
              <p className="mt-3 text-black/70 leading-relaxed">{current.summary}</p>

              <div className="mt-7 space-y-4">
                {/* progress bar (neutral) */}
                <div className="relative">
                  <div className="h-1.5 rounded-full bg-black/10" />
                  <motion.div
                    className="absolute top-0 left-0 h-1.5 rounded-full bg-black/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* Neutral dots */}
                  <div className="flex items-center gap-2">
                    {MILESTONES.map((m, i) => {
                      const active = i === index;
                      return (
                        <button
                          key={`${m.year}-${i}`}
                          onClick={() => goTo(i)}
                          aria-label={`${m.year} – ${m.title}`}
                          aria-current={active ? "step" : undefined}
                          className={`h-2.5 w-2.5 rounded-full transition-all ${
                            active ? "bg-black ring-2 ring-black/20" : "bg-black/25"
                          }`}
                          style={{ transform: active ? "scale(1.05)" : "scale(1)" }}
                        />
                      );
                    })}
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

        {/* RIGHT */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg">
            <div className="relative aspect-[16/11]">
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
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
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
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
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
