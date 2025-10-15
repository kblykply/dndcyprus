// app/components/StatsStrip.tsx
"use client";

import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Motion */
const wrap: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.06, duration: 0.22 } },
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
      setValue(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
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
  regionsCount = 8  ,
  awardsCount = 4,
  imageUrl = "/uu.jpg",
  showRegions = false,
}: StatsStripProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.5, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  const homes = useCountUp(plannedHomes, inView, 1500, "+");
  const regions = useCountUp(regionsCount, inView, 1100, "+");
  const awards = useCountUp(awardsCount, inView, 900, "+");

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
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* LEFT: Stats */}
          <div className="lg:col-span-6 flex min-w-0">
            <div className="w-full">
              <div className="text-left mb-10">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Rakamlarla DND</h2>
                <p className="mt-3 text-white/70 max-w-2xl">
                  Ada genelinde güçlü varlık, ölçekli planlama ve ödüllerle desteklenen kalite yaklaşımı.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Homes planned */}
                <motion.article variants={item} className={CARD}>
                  <div className="text-sm font-medium text-white/80">Planlanan Konut</div>
                  <div className="mt-2 text-5xl md:text-5xl font-semibold tracking-tight tabular-nums">{homes}</div>
                  <div className="mt-2 text-sm md:text-base text-white/70">
                    İskele, Girne, Esentepe, Geçitkale, Yedikonuk
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/50">Kaynak: dndcyprus.com</div>
                </motion.article>

                {/* Regions */}
                <motion.article variants={item} className={CARD}>
                  <div className="text-sm font-medium text-white/80">Bölgesel Yayılım</div>
                  <div className="mt-2 text-5xl md:text-5xl font-semibold tracking-tight tabular-nums">{regions}</div>
                  <div className="mt-2 text-sm md:text-base text-white/70">
                    Doğu & kuzey kıyı şeridi genelinde
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/50">Kaynak: dndcyprus.com</div>
                </motion.article>

                {/* Awards (full width on small screens) */}
                <motion.article
                  variants={item}
                  className={`${CARD} sm:col-span-2`}
                >
                  <div className="text-sm font-medium text-white/80">Ödüller</div>
                  <div className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight tabular-nums">{awards}</div>
                  <div className="mt-2 text-sm md:text-base text-white/70">Tanınma & başarılar (detaylar aşağıda)</div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/50">Örn: PropertyNC</div>
                </motion.article>
              </div>

              {showRegions && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {["İskele", "Girne", "Esentepe", "Geçitkale", "Yedikonuk"].map((r) => (
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
