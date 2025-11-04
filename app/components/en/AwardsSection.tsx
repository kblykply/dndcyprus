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
    title: "Platinum Award – Mariachi Beach Club",
    paragraphs: [
      "Our bold vision for <strong>Mariachi Beach Club</strong> received the Platinum Award in the Best Proposed New Commercial Project category at the 2025 PropertyNC Awards.",
      "World-class entertainment, design, and community are coming to the shores of Northern Cyprus.",
    ],
    emphasis: "American Quality in Cyprus.",
    cta: { label: "Learn More →", href: "/en/mariachi" },
    ribbon: "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png",
  },
  {
    id: 2,
    title: "Gold Award – DND Homes",
    paragraphs: [
      "DND Homes was honored with the <strong>Gold Award</strong> in the Best Newcomer category in 2025.",
      "The project sets a new standard for design excellence and customer satisfaction in the Northern Cyprus real estate market.",
    ],
    cta: { label: "Learn More →", href: "https://dnd-homes.com" },
    ribbon: "/BEST-NEWCOMER.png",
  },
  {
    id: 3,
    title: "Gold Award – Lagoon Verde",
    paragraphs: [
      "Lagoon Verde was recognized with the <strong>Gold Award</strong> in the Best Socio-Cultural Development category.",
      "This award celebrates a community-driven project that prioritizes well-being, sustainability, and harmony with nature.",
    ],
    cta: { label: "Learn More →", href: "/en/lagoon-verde" },
    ribbon: "/BEST-SOCIOCULTURAL-GOLD.png",
  },
];


/* ------- Helpers ------- */
function orderedTriple(index: number) {
  const total = SLIDES.length;
  const left = (index - 1 + total) % total;
  const right = (index + 1) % total;
  return [SLIDES[left], SLIDES[index], SLIDES[right]] as const;
}

// Small hook to measure element size (for adaptive positions on mobile)
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setSize({ width: cr.width, height: cr.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
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

  // Measure carousel to adapt ribbon positions on small screens
  const [carouselRef, { width: carouselW }] = useElementSize<HTMLDivElement>();

  // Base horizontal offset for left/right ribbons, responsive to container width.
  // Keeps ribbons fully visible on narrow phones.
  const baseX = useMemo(() => {
    if (!carouselW) return 170;
    // Clamp between 90px (tiny phones) and 170px (desktop), roughly 28% of container.
    return Math.max(90, Math.min(170, carouselW * 0.28));
  }, [carouselW]);

  // Slightly smaller scales on very small widths so content doesn't overflow.
  const centerScale = carouselW && carouselW < 400 ? 1.3 : 1.45;
  const sideScale = carouselW && carouselW < 400 ? 1.04 : 1.1;

  const POS = useMemo(
    () => ({
      left: { x: -baseX, scale: sideScale, opacity: 0.9, zIndex: 2 },
      center: { x: 0, scale: centerScale, opacity: 1, zIndex: 3 },
      right: { x: baseX, scale: sideScale, opacity: 0.9, zIndex: 2 },
    }),
    [baseX, centerScale, sideScale]
  );

  const ENTER_OFFSET = Math.round(baseX * 1.4);

  return (
    <section
      className="w-full h-auto md:h-[100svh] flex items-center bg-white dark:bg-white [color-scheme:light]"
      onKeyDown={onKeyDown}
      tabIndex={0} // focusable for arrow keys
      aria-label="Ödüller bölümü"
    >
      <div
        ref={sectionRef}
        className="relative max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* LEFT — ribbons (draggable) */}
          <div className="md:col-span-6">
            <motion.div
              ref={carouselRef}
              className="relative w-full max-w-[520px] h-[320px] sm:h-[380px] md:h-[440px] mx-auto overflow-visible select-none [touch-action:pan-y] cursor-grab active:cursor-grabbing"
              onPanStart={() => setIsDragging(true)}
              onPanEnd={(e, info) => {
                const dx = info.offset.x;
                const vx = info.velocity.x;
                if (dx < -SWIPE_DISTANCE || vx < -SWIPE_VELOCITY) next();
                else if (dx > SWIPE_DISTANCE || vx > SWIPE_VELOCITY) prev();
                requestAnimationFrame(() => setIsDragging(false));
              }}
              aria-roledescription="carousel"
              aria-label="Ödüller şeridi"
            >
              <span className="sr-only">Kaydırarak değiştirin</span>
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

                // Responsive ribbon boxes using clamp() + calc() to keep ratio on small screens
                const centerW = "clamp(116px, 42vw, 180px)";
                const centerH = "calc(clamp(116px, 42vw, 180px) * 1.4444)"; // 260/180
                const sideW = "clamp(88px, 28vw, 128px)";
                const sideH = "calc(clamp(88px, 28vw, 128px) * 1.4844)"; // 190/128

                const boxW = role === "center" ? centerW : sideW;
                const boxH = role === "center" ? centerH : sideH;

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
                        "relative transition-[filter,opacity] duration-300",
                        role === "center" ? "drop-shadow-xl" : "opacity-90 hover:opacity-100",
                      ].join(" ")}
                      style={{
                        width: boxW as unknown as number, // TSX accepts string; cast for TS appeasement
                        height: boxH as unknown as number,
                      }}
                    >
                      <Image
                        src={item.ribbon}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 42vw, 220px"
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
                  className={`h-3 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/70
                  ${i === index ? "w-8 bg-zinc-900" : "w-3 bg-zinc-400 hover:bg-zinc-500"}`}
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
              className="min-h-[220px] md:min-h-[260px] will-change-transform antialiased text-zinc-900"
              aria-live="polite"
            >
              <motion.h3
                initial={{ y: 10, opacity: 1, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.42, ease: "easeOut", delay: 0.03 }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 text-balance"
              >
                {current.title}
              </motion.h3>

              <div className="mt-3 sm:mt-4 md:mt-5 space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-zinc-800">
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
                  className="inline-flex items-center gap-2 mt-5 sm:mt-6 text-base sm:text-lg font-medium underline decoration-zinc-500/50 hover:decoration-current text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 rounded-sm"
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
