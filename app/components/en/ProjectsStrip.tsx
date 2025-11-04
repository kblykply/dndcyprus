// app/components/ProjectsStrip.tsx
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  name: string;
  region: string;
  blurb: string;
  img: string;
  href: string;
};

const PROJECTS: Project[] = [
  {
    name: "Lagoon Verde",
    region: "Iskele",
    blurb: "Living spaces that combine modern architecture and comfort under one roof.",
    img: "/lagoon-verde/1.jpg",
    href: "/en/lagoon-verde",
  },
  {
    name: "La Joya Perla II",
    region: "Iskele",
    blurb: "A concept intertwined with the sea, enriching social life.",
    img: "/perla-ii/1.jpg",
    href: "/en/perla-ii",
  },
  {
    name: "La Joya Perla I",
    region: "Iskele",
    blurb: "A timeless and elegant design that respects the natural texture.",
    img: "/perla/9.jpg",
    href: "/en/perla",
  },
  {
    name: "La Joya",
    region: "Iskele",
    blurb: "A boutique living experience along the coastline.",
    img: "/la-joya/3.jpg",
    href: "/en/la-joya",
  },
  {
    name: "Mariachi Beach Club",
    region: "Iskele",
    blurb: "Minimal and contemporary lines that capture the Mediterranean light.",
    img: "/mariachi/2.jpg",
    href: "/en/mariachi",
  },
];


/** Map projects to their award ribbon images under /public */
const AWARDS: Record<string, string | undefined> = {
  "Lagoon Verde": "/BEST-SOCIOCULTURAL-GOLD.png",
  "Mariachi Beach Club": "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png",
};

export default function ProjectsStrip() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const activeProject = PROJECTS[active];

  /* ---------- mobile strip viewport root ---------- */
  const stripRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-white" data-bg="dark">
      {/* Background cross-fade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeProject.img}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Image
              src={activeProject.img}
              alt={activeProject.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full pb-[env(safe-area-inset-bottom)] pointer-events-auto">
        {/* --------- MOBILE/TABLET: Center-mode card carousel --------- */}
     <div
  ref={stripRef}
  className={[
    "lg:hidden h-full",
    // allow horizontal scroll, but don't block vertical swipes
    "overflow-x-auto overflow-y-visible",
    "snap-x snap-mandatory",
    "[-webkit-overflow-scrolling:touch] touch-auto select-none",
    "[scrollbar-width:'none'] [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden",
    "px-4"
  ].join(" ")}
>

          <div
            className={[
              "h-full grid grid-flow-col auto-cols-[86%] xs:auto-cols-[82%] sm:auto-cols-[72%] gap-4 sm:gap-6",
              "items-center"
            ].join(" ")}
          >
            {PROJECTS.map((p, i) => {
              const isActive = i === active;
              const ribbon = AWARDS[p.name];

              return (
                <motion.article
                  key={p.name}
                  className="relative snap-center h-[76svh] sm:h-[78svh] rounded-3xl overflow-hidden"
                  onTouchStart={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  whileTap={{ scale: 0.98 }}
                  animate={{ scale: isActive ? 1 : 0.96 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  viewport={{ root: stripRef, amount: 0.6 }}
                  onViewportEnter={() => setActive(i)}
                >
                  {/* Card poster */}
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(max-width:1024px) 90vw"
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent" />

                  {/* Award ribbon */}
                  <AnimatePresence>
                    {mounted && ribbon && isActive && (
                      <motion.div
                        key={`${p.name}-mobile-award`}
                        initial={{ opacity: 0, x: 80, y: -80, scale: 0.9, rotate: -5, filter: "blur(6px)" }}
                        animate={{
                          opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)",
                          transition: { type: "spring", stiffness: 260, damping: 22 }
                        }}
                        exit={{ opacity: 0, x: 80, y: -80, scale: 0.95, transition: { duration: 0.22, ease: "easeOut" } }}
                        className="pointer-events-none absolute top-4 right-4"
                      >
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="relative w-14 sm:w-16"
                        >
                          <div className="relative aspect-[3/9]">
                            <Image
                              src={ribbon}
                              alt={`${p.name} award`}
                              fill
                              sizes="56px"
                              className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mobile content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/85">{p.region}</div>
                    <h3 className="mt-1 text-white text-xl font-semibold drop-shadow-sm">{p.name}</h3>
                    <p className="mt-2 text-white/90 text-[13px]/6">{p.blurb}</p>

                    <Link
                      href={p.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/95 bg-white/15 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl px-3 py-1.5 border border-white/20 backdrop-blur-md"
                      prefetch
                      aria-label={`${p.name} detay sayfasına git`}
                    >
                      <span>See Details</span>
                      <span className="translate-y-[1px]">→</span>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* --------- DESKTOP: 5-column full-height columns --------- */}
        <div className="hidden lg:grid h-full grid-cols-5">
          {PROJECTS.map((p, i) => {
            const isActive = i === active;
            const ribbon = AWARDS[p.name];

            return (
              <button
                key={p.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative overflow-hidden"
                aria-label={p.name}
                aria-selected={isActive}
              >
                {/* Divider */}
                <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-white/10" />

                {/* Title (stable) */}
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

                {/* Award ribbon */}
                <AnimatePresence>
                  {mounted && ribbon && isActive && (
                    <motion.div
                      key={`${p.name}-award`}
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

                    <Link
                      href={p.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md px-1 py-0.5"
                      prefetch
                      aria-label={`${p.name} detay sayfasına git`}
                    >
                      <span className="opacity-90">See Details</span>
                      <span className="translate-y-[1px]">→</span>
                    </Link>
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
      </div>
    </section>
  );
}
