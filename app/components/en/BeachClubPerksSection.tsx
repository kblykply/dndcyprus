// app/components/BeachClubPerksSection.tsx

import Image from "@/app/components/performance/DeferredFillImage";
import type { Variants } from "framer-motion";
import { MotionDiv, MotionH2, MotionP } from "@/app/components/performance/MotionElements";

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

export default function BeachClubPerksSection() {
  return (
<section className="relative py-16 md:py-24 bg-white text-black">
  {/* Background image */}
  <div className="absolute inset-0">
    <Image
      fill
      quality={65}
      sizes="100vw"
      src="/mariachi/3.jpg" // <-- place your Mariachi image in /public/images/
      alt="Mariachi Beach Club background"
      className="w-full h-full object-cover"
    />
    {/* overlay to keep text legible */}
    <div className="absolute inset-0 bg-white/20 " />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-[1000px] px-5">
    <MotionDiv
      variants={wrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4, margin: "-10% 0px -10% 0px" }}
      className="
        rounded-3xl p-8 md:p-10 text-center
        bg-white/70 backdrop-blur-xl
        border border-black/10
        shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_10px_30px_rgba(0,0,0,.06)]
      "
    >
      <MotionH2 variants={item} className="text-3xl md:text-4xl font-semibold tracking-tight">
        Mariachi Beach Club
      </MotionH2>
      <MotionP variants={item} className="mt-4 text-black/70 max-w-2xl mx-auto">
La Joya, La Joya Perla, and Perla II residents enjoy exclusive access to the <strong>Mariachi Beach Club</strong>, where they can experience poolside leisure, gastronomy, and coastal living.
      </MotionP>

      <MotionDiv variants={item} className="mt-8">
        <a
          href="/en/mariachi"
          className="inline-flex items-center rounded-full px-6 py-3 bg-black text-white font-medium hover:bg-neutral-800 transition"
        >
          Discover Mariachi →
        </a>
      </MotionDiv>
    </MotionDiv>
  </div>
</section>

  );
}
