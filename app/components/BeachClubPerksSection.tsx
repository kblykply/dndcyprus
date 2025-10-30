// app/components/BeachClubPerksSection.tsx
"use client";

import { motion, Variants, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------- Motion (transform + opacity only) ---------- */
const wrap: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.08, duration: 0.22 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.7 },
  },
};

/* ---------- Respect reduced motion without SSR mismatch ---------- */
function usePrefersReducedMotionSafe() {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setPrm(!!mq?.matches);
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);
  return prm;
}

export default function BeachClubPerksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();
  const prm = usePrefersReducedMotionSafe();

  // Re-trigger: play on enter, reset on exit
  useEffect(() => {
    if (prm) return;
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls, prm]);

  return (
<section className="relative py-16 md:py-24 bg-white text-black">
  {/* Background image */}
  <div className="absolute inset-0">
    <img
      src="/mariachi/3.jpg" // <-- place your Mariachi image in /public/images/
      alt="Mariachi Beach Club background"
      className="w-full h-full object-cover"
    />
    {/* overlay to keep text legible */}
    <div className="absolute inset-0 bg-white/20 " />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-[1000px] px-5">
    <motion.div
      ref={sectionRef}
      variants={wrap}
      initial="hidden"
      animate={prm ? undefined : controls}
      className="
        rounded-3xl p-8 md:p-10 text-center
        bg-white/70 backdrop-blur-xl
        border border-black/10
        shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_10px_30px_rgba(0,0,0,.06)]
      "
    >
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-semibold tracking-tight">
        Mariachi Beach Club
      </motion.h2>
      <motion.p variants={item} className="mt-4 text-black/70 max-w-2xl mx-auto">
        La Joya, La Joya Perla ve Perla II konut sahipleri, <strong>Mariachi Beach Club</strong>’a özel erişimle havuz, gastronomi ve sahil yaşamının keyfini çıkarır.
      </motion.p>

      <motion.div variants={item} className="mt-8">
        <a
          href="/mariachi"
          className="inline-flex items-center rounded-full px-6 py-3 bg-black text-white font-medium hover:bg-neutral-800 transition"
        >
          Mariachi'yi Keşfet →
        </a>
      </motion.div>
    </motion.div>
  </div>
</section>

  );
}
