// app/components/StoryTimeline.tsx
"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Milestone = {
  year: string;
  title: string;
  summary: string;
  image: string;
};

const MILESTONES: Milestone[] = [
  { year: "2017", title: "DND Homes Kuruluşu", summary: "Şirketin ilk merkezi Boston’da kuruldu.", image: "/dnd-boston-ofis.png" },
  { year: "2017", title: "Amerika’daki İlk Proje", summary: "12 Longfellow Road, Lexington projesi hayata geçirildi.", image: "/12lex.jpg" },
  { year: "2018", title: "Ozan Dökmecioğlu Ödülü", summary: "Boston Business Journal tarafından “Yılın CFO’su” seçildi.", image: "/ozan-dokmecioglu-cfo-of-the-year.jpg" },
  { year: "2023", title: "DND Kıbrıs Kuruluşu", summary: "Kıbrıs’ta yeni operasyon merkezi açıldı.", image: "/kurulus.JPG" },
  { year: "2025", title: "Property NC Ödülleri", summary: "“En İyi Çıkış Yapan Şirket” ödülüne layık görüldü.", image: "/property_awards_2025-747.jpg" },
  { year: "2025", title: "İlk Proje La Joya Teslimi", summary: "La Joya projesi tamamlanarak teslim edildi.", image: "/la-joya/2.jpg" },
];

export default function StoryTimeline() {
  const [index, setIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const current = MILESTONES[index];

  const goTo = useCallback((i: number) => {
    prevIndexRef.current = index;
    const len = MILESTONES.length;
    setIndex(((i % len) + len) % len);
  }, [index]);

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // keyboard arrows
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <section id="story" className="relative w-full bg-white py-20 md:py-28" onKeyDown={onKeyDown} tabIndex={0}>
      <motion.div
        className="mx-auto max-w-6xl px-6 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {/* LEFT — static */}
        <div className="relative">
          <div
            aria-hidden
            className="select-none pointer-events-none absolute -top-16 -right-2 text-8xl md:text-9xl font-black tracking-tight opacity-100 text-gray-300 z-50"
          >
            {current.year}
          </div>

          <div className="relative rounded-3xl border border-black/10 bg-white/60 backdrop-blur-xl shadow-xl">
            <div className="relative p-7 md:p-10">
              <span className="inline-flex items-center rounded-full border border-black/10 bg-white/50 px-3 py-1 text-xs font-medium text-black/70 backdrop-blur-md">
                Şirket Hikayemiz
              </span>

              <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-black">
                {current.title}
              </h3>
              <p className="mt-3 text-black/80 leading-relaxed">
                {current.summary}
              </p>

              <div className="mt-7 flex items-center justify-between">
                {/* Dots — use index as key to allow duplicate years */}
                <div className="flex items-center gap-2">
                  {MILESTONES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`${MILESTONES[i].year} – ${MILESTONES[i].title} slaytına git`}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        i === index
                          ? "bg-black shadow-[0_0_0_4px_rgba(0,0,0,0.1)]"
                          : "bg-black/40 hover:bg-black/70"
                      }`}
                    />
                  ))}
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

        {/* RIGHT — elegant cross-fade + subtle zoom (no slide) */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/60 backdrop-blur-xl shadow-2xl">
            <div className="relative aspect-[16/11]">
              <AnimatePresence initial={false} mode="sync">
                {/* Outgoing image */}
                <motion.div
                  key={`out-${prevIndexRef.current}`}
                  className="absolute inset-0"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.02, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } }}
                  exit={{ opacity: 0 }}
                >
                  <Image
                    src={MILESTONES[prevIndexRef.current].image}
                    alt=""
                    fill
                    className="object-cover will-change-transform"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>

                {/* Incoming image */}
                <motion.div
                  key={`in-${index}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } }}
                  exit={{ opacity: 1 }}
                >
                  <Image
                    src={MILESTONES[index].image}
                    alt={MILESTONES[index].title}
                    fill
                    className="object-cover will-change-transform"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Preload neighbors for instant switches */}
          <div className="sr-only" aria-hidden>
            <Image src={MILESTONES[(index + 1) % MILESTONES.length].image} alt="" width={16} height={9} />
            <Image src={MILESTONES[(index - 1 + MILESTONES.length) % MILESTONES.length].image} alt="" width={16} height={9} />
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
                 border border-black/10 bg-white/60 backdrop-blur-xl
                 text-black hover:bg-white/80 transition shadow-lg"
    >
      {children}
    </button>
  );
}
