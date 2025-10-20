// app/components/AwardsSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ------- Types & Data ------- */
type AwardSlide = {
  id: number;
  title: string;
  paragraphs: string[];
  emphasis?: string;
  cta?: { label: string; href: string };
  ribbon: string; // /public path
};

const SLIDES: AwardSlide[] = [
  {
    id: 1,
    title: "Platin Ödül – Mariachi Beach Club",
    paragraphs: [
      "<strong>Mariachi Beach Club</strong> için cesur vizyonumuz, 2025 PropertyNC Ödülleri’nde En İyi Önerilen Yeni Ticari Proje dalında ödül aldı.",
      "Dünya standartlarında eğlence, tasarım ve topluluk, Kuzey Kıbrıs sahillerine geliyor.",
    ],
    emphasis: "Kıbrıs’ta ABD Kalitesi.",
    cta: { label: "Daha Fazla →", href: "#" },
    ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png",
  },
  {
    id: 2,
    title: "Altın Ödül – DND Homes",
    paragraphs: [
      "DND Homes, 2025 yılında En İyi Yeni Girişim kategorisinde <strong>Altın Ödül</strong>’e layık görüldü.",
      "Proje, Kuzey Kıbrıs emlak sektöründe tasarım mükemmeliyeti ve müşteri memnuniyeti için yeni bir standart belirliyor.",
    ],
    cta: { label: "Daha Fazla →", href: "#" },
    ribbon: "/BEST-NEWCOMER.png",
  },
  {
    id: 3,
    title: "Altın Ödül – Lagoon Verde",
    paragraphs: [
      "Lagoon Verde, En İyi Sosyo-Kültürel Gelişim kategorisinde <strong>Altın Ödül</strong> ile onurlandırıldı.",
      "Bu ödül, refah, sürdürülebilirlik ve çevreyle uyumu önceliklendiren toplum odaklı bir projeyi kutluyor.",
    ],
    cta: { label: "Daha Fazla →", href: "#" },
    ribbon: "/BEST-SOCIOCULTURAL-GOLD.png",
  },
];

/* ------- Helpers ------- */
const POS = {
  left: { x: -170, scale: 1.1, opacity: 0.9, zIndex: 2 },
  center: { x: 0, scale: 1.45, opacity: 1, zIndex: 3 },
  right: { x: 170, scale: 1.1, opacity: 0.9, zIndex: 2 },
};
const ENTER_OFFSET = 260;

function orderedTriple(index: number) {
  const total = SLIDES.length;
  const left = (index - 1 + total) % total;
  const right = (index + 1) % total;
  return [SLIDES[left], SLIDES[index], SLIDES[right]] as const;
}

export default function AwardsSection() {
  const [index, setIndex] = useState(0);
  const trio = useMemo(() => orderedTriple(index), [index]);
  const current = SLIDES[index];
  const total = SLIDES.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // ----- drag state & thresholds -----
  const [isDragging, setIsDragging] = useState(false);
  const SWIPE_DISTANCE = 60; // px
  const SWIPE_VELOCITY = 400; // px/s

  // Direction for ribbons
  const prevRef = useRef(index);
  useEffect(() => {
    prevRef.current = index;
  }, [index]);
  const dir =
    (index - prevRef.current + total) % total === 1 ||
    (prevRef.current === total - 1 && index === 0)
      ? 1
      : -1;

  // Retrigger ribbons on section enter
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.35, once: false });
  const [enterWave, setEnterWave] = useState(0);
  useEffect(() => {
    if (inView) setEnterWave((n) => n + 1);
  }, [inView]);

  // Keyboard support
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [next, prev]
  );

  return (
    <section
      className="w-full h-[100svh] flex items-center bg-white dark:bg-white [color-scheme:light]"
      onKeyDown={onKeyDown}
      tabIndex={0} // focusable for arrow keys
      aria-label="Ödüller bölümü"
    >
      <div
        ref={sectionRef}
        className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center min-h-[520px]">
          {/* LEFT — ribbons (draggable) */}
          <div className="md:col-span-6">
            <motion.div
              className="relative w-[520px] h-[440px] mx-auto overflow-visible select-none [touch-action:pan-y] cursor-grab active:cursor-grabbing"
              onPanStart={() => setIsDragging(true)}
              onPanEnd={(e, info) => {
                const dx = info.offset.x;
                const vx = info.velocity.x;
                if (dx < -SWIPE_DISTANCE || vx < -SWIPE_VELOCITY) next();
                else if (dx > SWIPE_DISTANCE || vx > SWIPE_VELOCITY) prev();
                requestAnimationFrame(() => setIsDragging(false));
              }}
            >
              {trio.map((item, i) => {
                const role = i === 0 ? "left" : i === 1 ? "center" : "right";
                const target = POS[role as keyof typeof POS];

                // where a freshly mounted item should come from
                const enterFromX =
                  role === "center"
                    ? dir > 0
                      ? ENTER_OFFSET
                      : -ENTER_OFFSET
                    : role === "left"
                    ? -ENTER_OFFSET
                    : ENTER_OFFSET;

                return (
                  <motion.button
                    key={item.id} // stable key per ribbon id
                    onClick={() => {
                      if (isDragging) return;
                      setIndex(SLIDES.findIndex((s) => s.id === item.id));
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none will-change-transform"
                    initial={{ x: enterFromX, opacity: 0, scale: 0.9 }}
                    animate={{ x: target.x, opacity: target.opacity, scale: target.scale }}
                    transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.65 }}
                    style={{ zIndex: target.zIndex }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Seç: ${item.title}`}
                  >
                    <div
                      className={[
                        "relative transition-[filter] duration-300",
                        role === "center" ? "drop-shadow-xl" : "opacity-90 hover:opacity-100",
                      ].join(" ")}
                      style={{
                        width: role === "center" ? 180 : 128,
                        height: role === "center" ? 260 : 190,
                      }}
                    >
                      <Image
                        src={item.ribbon}
                        alt={item.title}
                        fill
                        sizes="220px"
                        priority={item.id === SLIDES[0].id}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        className="object-contain select-none pointer-events-none"
                      />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center md:justify-start gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Slayt ${i + 1}'e git`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-7 bg-zinc-900"
                      : "w-2.5 bg-zinc-400 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — text (forced light theme) */}
          <div className="md:col-span-6">
            <motion.div
              key={`${index}-${enterWave}`}
              initial={{ y: 16, opacity: 1, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="min-h-[260px] will-change-transform antialiased text-zinc-900"
            >
              <motion.h3
                initial={{ y: 10, opacity: 1, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.42, ease: "easeOut", delay: 0.03 }}
                className="text-2xl md:text-4xl font-semibold tracking-tight text-zinc-950 text-balance"
              >
                {current.title}
              </motion.h3>

              <div className="mt-4 md:mt-5 space-y-4 text-base md:text-lg leading-relaxed text-zinc-800">
                {current.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ y: 10, opacity: 1, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.38, ease: "easeOut", delay: 0.06 + i * 0.05 }}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}

                {current.emphasis && (
                  <motion.p
                    initial={{ y: 10, opacity: 1, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.38,
                      ease: "easeOut",
                      delay: 0.06 + current.paragraphs.length * 0.05,
                    }}
                    className="font-semibold text-zinc-900"
                  >
                    {current.emphasis}
                  </motion.p>
                )}
              </div>

              {current.cta && (
                <motion.a
                  href={current.cta.href}
                  initial={{ y: 10, opacity: 1, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.38, ease: "easeOut", delay: 0.14 }}
                  className="inline-flex items-center gap-2 mt-6 text-base md:text-lg font-medium underline decoration-zinc-500/50 hover:decoration-current text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 rounded-sm"
                >
                  {current.cta.label}
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
