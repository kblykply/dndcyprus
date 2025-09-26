// app/components/ProjectsStrip.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { CSSProperties } from "react";

type Project = {
  name: string;
  region: string;
  blurb: string;
  img: string;
};

const PROJECTS: Project[] = [
  { name: "Lagoon Verde",       region: "İskele",   blurb: "Modern mimari ve konforu tek çatı altında buluşturan yaşam alanları.", img: "/lagoon-verde/1.jpg" },
  { name: "La Joya Perla II",   region: "Long Beach", blurb: "Denizle iç içe, sosyal yaşamı zenginleştiren bir konsept.",         img: "/perla-ii/1.jpg" },
  { name: "La Joya Perla I",    region: "Girne",    blurb: "Doğal dokuya saygılı, şık ve zamansız tasarım dili.",                 img: "/perla/9.jpg" },
  { name: "La Joya",            region: "Tatlısu",  blurb: "Sahil hattında butik bir yaşam deneyimi.",                             img: "/la-joya/3.jpg " },
  { name: "Mariachi Beach Club",region: "Esentepe", blurb: "Akdeniz ışığını yakalayan minimal ve çağdaş çizgiler.",               img: "/mariachi/2.jpg" },
];

/** Map projects to their award ribbon images under /public */
const AWARDS: Record<string, string | undefined> = {
  "Lagoon Verde": "/BEST-SOCIOCULTURAL-GOLD.png",
  "Mariachi Beach Club": "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png",
};

export default function ProjectsStrip() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false); // <- prevents SSR/CSR mismatch for the ribbon
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-white" data-bg="dark">
      {/* Background cross-fade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={PROJECTS[active].img}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Image
              src={PROJECTS[active].img}
              alt={PROJECTS[active].name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Columns */}
      <div className="relative z-10 grid h-full grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {PROJECTS.map((p, i) => {
          const isActive = i === active;
          const ribbon = AWARDS[p.name];

          return (
            <button
              key={p.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onTouchStart={() => setActive(i)}
              className="group relative overflow-hidden"
              aria-label={p.name}
              aria-selected={isActive}
            >
              {/* Divider (desktop) */}
              <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-white/10 max-lg:hidden" />

              {/* Stable heading */}
              <div className="absolute inset-0 grid place-items-center p-6">
                <motion.span
                  layout="position"
                  className="text-white/90 text-[clamp(18px,1.8vw,26px)] font-medium tracking-[0.02em] drop-shadow-sm"
                  animate={{ opacity: isActive ? 0.22 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {p.name}
                </motion.span>
              </div>

              {/* Soft blur on the active column */}
             
<motion.div
  className="absolute inset-0"
  animate={{ backdropFilter: (isActive ? "blur(6px)" : "blur(0px)") as CSSProperties["backdropFilter"] }}
  transition={{ duration: 0.25 }}
/>

              {/* Award ribbon (hydrate-safe: only render after mount; no window reads) */}
              <AnimatePresence>
                {mounted && ribbon && isActive && (
                  <motion.div
                    key={`${p.name}-award`}
                    // Use fixed, SSR-safe offsets for first paint
                    initial={{ opacity: 0, x: 160, y: -160, scale: 0.9, rotate: -5, filter: "blur(6px)" }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                      filter: "blur(0px)",
                      transition: { type: "spring", stiffness: 260, damping: 22 },
                    }}
                    exit={{ opacity: 0, x: 160, y: -160, scale: 0.95, transition: { duration: 0.22, ease: "easeOut" } }}
                    className="pointer-events-none absolute top-6 right-6"
                  >
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-16 sm:w-20 md:w-24"
                    >
                      <div className="relative aspect-[3/9]">
                        <Image
                          src={ribbon}
                          alt={`${p.name} award`}
                          fill
                          sizes="(max-width:640px) 64px, (max-width:768px) 80px, 96px"
                          className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                          priority={false}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glass info card */}
              <motion.div
                initial={false}
                animate={{ y: isActive ? 0 : 24, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-sm"
              >
                <div className="rounded-2xl px-5 py-4 text-left text-white/95 border border-white/20 bg-white/15 backdrop-blur-md">
                  <div className="text-[10px] uppercase tracking-[0.18em] opacity-80">{p.region}</div>
                  <div className="mt-1 text-base font-semibold">{p.name}</div>
                  <div className="mt-2 text-[13px]/6 text-white/85">{p.blurb}</div>

                  <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                    <span className="opacity-90">Detaylara Bak</span>
                    <span className="translate-y-[1px]">→</span>
                  </div>
                </div>
              </motion.div>

              {/* Subtle hover wash */}
              <motion.div
                className="pointer-events-none absolute inset-0 bg-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
