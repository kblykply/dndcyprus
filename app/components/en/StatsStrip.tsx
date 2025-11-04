// app/components/StatsStrip.tsx
"use client";

import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Motion */
const wrap: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.06, duration: 0.22 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.7 } },
};

/* Count-up */
function useCountUp(target: number, enabled: boolean, durationMs = 1400, suffix = "") {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      setValue(0);
      return;
    }
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / durationMs);
      const eased = easeOutCubic(p);
      setValue(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [target, enabled, durationMs]);

  return `${value.toLocaleString("tr-TR")}${suffix}`;
}

type StatsStripProps = {
  plannedHomes?: number;
  regionsCount?: number;
  awardsCount?: number;
  imageUrl?: string; // optional side image
  showRegions?: boolean;
};

function StatsStrip({
  plannedHomes = 30000,
  regionsCount = 8,
  awardsCount = 4,
  imageUrl = "/uu.jpg",
  showRegions = false,
}: StatsStripProps) {
  const prefersReducedMotion = useReducedMotion();

  // Animate once
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.18, margin: "0px 0px -12% 0px" });
  const controls = useAnimation();
  const [revealed, setRevealed] = useState(false);

  // Avoid initial SSR "hidden" flash until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (revealed) return;
    if (prefersReducedMotion) {
      controls.set("show");
      setRevealed(true);
      return;
    }
    if (inView) {
      controls.start("show");
      setRevealed(true);
    }
  }, [inView, controls, revealed, prefersReducedMotion]);

  // Counters start once
  const homes = useCountUp(plannedHomes, revealed, 1500, "+");
  const regions = useCountUp(regionsCount, revealed, 1100, "+");
  const awards = useCountUp(awardsCount, revealed, 900, "+");

  const CARD =
    "relative rounded-3xl p-7 md:p-8 bg-white/15 backdrop-blur-xl border border-white/20 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_16px_40px_rgba(0,0,0,.35)]";

  return (
    <section className="relative z-10 py-24 md:py-28 text-white">
      <div className="relative mx-auto w-full max-w-[1200px] px-5">
        {/* Layout: left stats, optional right image */}
        <motion.div
          ref={sectionRef}
          variants={wrap}
          initial={mounted ? "hidden" : false}
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* don't hide pre-mount to avoid hydration issues */}

          {/* LEFT: Stats */}
       <div className="lg:col-span-6 flex min-w-0">
  <div className="w-full">
    <div className="text-left mb-10">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">DND in Numbers</h2>
      <p className="mt-3 text-white/70 max-w-2xl">
        A strong presence across the island, large-scale planning, and a quality approach supported by awards.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Homes planned */}
      <motion.article variants={item} className={CARD}>
        <div className="text-sm font-medium text-white/80">Planned Residences</div>
        <div className="mt-2 text-5xl md:text-5xl font-semibold tracking-tight tabular-nums">{homes}</div>
        <div className="mt-2 text-sm md:text-base text-white/70">
          Iskele, Kyrenia, Esentepe, Geçitkale, Yedikonuk
        </div>
        <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/50">Source: dndcyprus.com</div>
      </motion.article>

      {/* Regions */}
      <motion.article variants={item} className={CARD}>
        <div className="text-sm font-medium text-white/80">Regional Presence</div>
        <div className="mt-2 text-5xl md:text-5xl font-semibold tracking-tight tabular-nums">{regions}</div>
        <div className="mt-2 text-sm md:text-base text-white/70">Across the eastern and northern coastlines</div>
        <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/50">Source: dndcyprus.com</div>
      </motion.article>

      {/* Awards (full width on small screens) */}
      <motion.article variants={item} className={`${CARD} sm:col-span-2`}>
        <div className="text-sm font-medium text-white/80">Awards</div>
        <div className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight tabular-nums">{awards}</div>
        <div className="mt-2 text-sm md:text-base text-white/70">Recognitions & achievements (details below)</div>
        <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/50">e.g. PropertyNC</div>
      </motion.article>
    </div>

    {showRegions && (
      <div className="mt-8 flex flex-wrap gap-2">
        {["Iskele", "Kyrenia", "Esentepe", "Geçitkale", "Yedikonuk"].map((r) => (
          <span
            key={r}
            className="rounded-full border border-white/25 bg-white/15 backdrop-blur-md px-3 py-1.5 text-sm text-white/80"
          >
            {r}
          </span>
        ))}
      </div>
    )}
  </div>
</div>


          {/* RIGHT: optional image */}
          {imageUrl && (
            <motion.div variants={item} className="lg:col-span-6 flex min-w-0">
              <div className="relative rounded-3xl p-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg w-full flex">
                <div
                  className="relative flex-1 min-h-[460px] rounded-2xl overflow-hidden bg-center bg-cover"
                  style={{ backgroundImage: `url('${imageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export { StatsStrip };
export default StatsStrip;
