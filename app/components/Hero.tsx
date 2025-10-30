// components/Hero.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // ← NEW
import BackgroundVideo from "./BackgroundVideo";

/* ---------------- Variants (used only on tab switch) ---------------- */
const listVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, when: "beforeChildren", staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---------------- Types ---------------- */
type ProjectItem = {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
  floors: number;
  area: number;
  bedrooms: number;
  href?: string; // ← NEW: link target for “Daha Fazla”
};

/* ---------------- Card ---------------- */
function ProjectCard({ item }: { item: ProjectItem }) {
  const img1 = item.images[0];
  const img2 = item.images[1] ?? item.images[0];

  return (
    <motion.div
      variants={itemVariants} // <- only plays when parent runs variants on tab switch
      className="relative group rounded-lg overflow-hidden shadow-lg h-72 min-w-[85%] sm:min-w-[420px] md:min-w-[520px] snap-center"
    >
      <Image src={img1} alt={item.title} fill className="object-cover transition-opacity duration-300" />
      <Image src={img2} alt={`${item.title} hover`} fill className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-200" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
          <h4 className="text-xl font-semibold">{item.title}</h4>
          <p className="text-sm mt-1 text-white/90">{item.subtitle}</p>
        </div>

        <div className="mt-8 flex flex-col items-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {item.href ? (
            <Link
              href={item.href}
              className="px-5 py-2 text-sm font-medium rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-md shadow-sm hover:bg-white/25 transition mb-3 outline-none focus:ring-2 focus:ring-white/60"
              aria-label={`${item.title} – Daha Fazla`}
            >
              Daha Fazla
            </Link>
          ) : null}

          <div className="flex gap-4 justify-center text-sm text-white/80">
            <span>Daire Tipi: {item.floors}</span>
            <span>Alan: {item.area} m²</span>
            <span>Birim: {item.bedrooms}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Typewriter ---------------- */
const MESSAGES = [
  "Biz ev değil, daha iyi bir yaşam inşaa ediyoruz",
  "Mimariyi doğayla buluşturuyoruz",
  "Yatırımınıza değer katan projeler üretiyoruz",
];

function Typewriter({
  messages = MESSAGES,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseAfterType = 1400,
  pauseAfterDelete = 300,
  className = "",
}: {
  messages?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
}) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const t = window.setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const full = messages[msgIndex];
    const step = () => {
      if (!isDeleting) {
        if (display.length < full.length) {
          setDisplay(full.slice(0, display.length + 1));
          timerRef.current = window.setTimeout(step, typingSpeed) as unknown as number;
        } else {
          timerRef.current = window.setTimeout(() => setIsDeleting(true), pauseAfterType) as unknown as number;
        }
      } else {
        if (display.length > 0) {
          setDisplay(full.slice(0, display.length - 1));
          timerRef.current = window.setTimeout(step, deletingSpeed) as unknown as number;
        } else {
          timerRef.current = window.setTimeout(() => {
            setIsDeleting(false);
            setMsgIndex((i) => (i + 1) % messages.length);
          }, pauseAfterDelete) as unknown as number;
        }
      }
    };
    timerRef.current = window.setTimeout(step, isDeleting ? deletingSpeed : typingSpeed) as unknown as number;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [display, isDeleting, msgIndex, messages, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <h2 className={`text-2xl md:text-4xl font-medium leading-snug max-w-3xl mx-auto tracking-tight ${className}`} aria-live="polite">
      {display}
      <span className={`inline-block w-[2px] md:w-[3px] h-[1.1em] align-[-0.15em] ml-1 bg-white ${blink ? "opacity-100" : "opacity-20"}`} aria-hidden="true" />
    </h2>
  );
}

/* ---------------- Data ---------------- */
const TAB_LABELS = ["Rezidans Projeleri", "Arsa Projeleri", "Mariachi Beach Club"] as const;
type Tab = (typeof TAB_LABELS)[number];

const projects: Record<Tab, ProjectItem[]> = {
  "Rezidans Projeleri": [
    {
      id: 1,
      title: "Lagoon Verde",
      subtitle: "Eşsiz lagün havuzu konsepti",
      images: ["/lagoon-verde/5.jpg", "/lagoon-verde/7.jpg"],
      floors: 4,
      area: 43.179,
      bedrooms: 354,
      href: "/lagoon-verde", // ← NEW
    },
    {
      id: 2,
      title: "La Joya Perla II",
      subtitle: "Denize ve şehir imkanlarına yakın konum",
      images: ["/perla-ii/9.jpg", "/perla-ii/5.jpg"],
      floors: 5,
      area: 8.799,
      bedrooms: 128,
      href: "/perla-ii", // ← NEW
    },
    {
      id: 3,
      title: "La Joya Perla I",
      subtitle: "Doğal görünümlü ‘sand pool’ konsepti",
      images: ["/perla/9.jpg", "/perla/4.jpg"],
      floors: 5,
      area: 25.053,
      bedrooms: 384,
      href: "/perla", // ← NEW
    },
    {
      id: 7,
      title: "La Joya",
      subtitle: "Tatil konsepli butik yaşam",
      images: ["/la-joya/13.jpg", "/la-joya/16.jpg"],
      floors: 3,
      area: 6.36,
      bedrooms: 74,
      href: "/la-joya", // ← NEW
    },
  ],
  "Arsa Projeleri": [
    {
      id: 5,
      title: "Geçitkale",
      subtitle: "Yatırıma uygun arazi",
      images: ["/gecitkaleimage.jpg", "/gecitkaleimage.jpg"],
      floors: 0,
      area: 9.841,
      bedrooms: 0,
      href: "/gecitkale", // ← NEW
    },
  ],
  "Mariachi Beach Club": [
    {
      id: 8,
      title: "Mariachi Beach Club",
      subtitle: "Doğayla iç içe yaşam",
      images: ["/mariachi/9.jpg", "/mariachi/12.jpg"],
      floors: 1,
      area: 5.001,
      bedrooms: 2,
      href: "/mariachi", // ← NEW
    },
  ],
};

const tabs: readonly Tab[] = TAB_LABELS;

/* ---------------- Hero ---------------- */
export default function Hero() {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [hasInteracted, setHasInteracted] = useState(false); // <- prevents first-load animation

  const items = projects[activeTab];
  const useCarousel = items.length > 2;

  // drag props only for carousel mode
  const dragProps = useCarousel
    ? {
        drag: "x" as const,
        dragConstraints: { left: -((items.length - 1) * 320), right: 0 },
        dragElastic: 0.1,
      }
    : {};

  const handleTabClick = (tab: Tab) => {
    if (tab !== activeTab) setHasInteracted(true);
    setActiveTab(tab);
  };

  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      <BackgroundVideo />

      {/* HERO */}
      <section className="relative h-screen px-6 z-10">
        <div className="h-full flex flex-col items-center justify-center text-center">
          <Typewriter className="mt-[90px]" />
        </div>

        {/* Tabs */}
     {/* Tabs */}
<div className="absolute bottom-4 sm:bottom-6 inset-x-0 w-full px-3 z-20 pointer-events-auto">
  {/* SCROLL CONTAINER */}
  <div
    className={[
      "w-full",
      // mobile: horizontal scroll; desktop: no scroll
      "overflow-x-auto lg:overflow-visible",
      "[-webkit-overflow-scrolling:touch]",
      "snap-x snap-mandatory scroll-px-3",
      "[scrollbar-width:'none'] [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden",
      // desktop centering
      "lg:flex lg:justify-center",
    ].join(" ")}
  >
    {/* CONTENT */}
    <div
      className={[
        "inline-flex min-w-max",
        "gap-4 sm:gap-6",
        "text-[15px] sm:text-lg font-medium",
        "border-b border-white/30",
        // ensure content is treated as a shrink-to-fit block at lg for clean centering
        "lg:min-w-0 lg:w-fit",
      ].join(" ")}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-3 sm:px-2 pb-1 shrink-0 snap-center transition ${
            activeTab === tab ? "border-b-2 border-white" : "text-white/70"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
</div>



      </section>

      {/* PROJECTS */}
     <section className="relative z-10 text-black mt-6 pb-14">
  <div className="w-full max-w-7xl px-4 md:px-6 mx-auto">
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab} // remount on tab change
        className={
          useCarousel
            ? [
                "flex cursor-grab active:cursor-grabbing",
                // responsive gaps
                "gap-4 sm:gap-5 md:gap-6 xl:gap-8",
                // responsive child card widths (only sizing)
                "[&>*]:shrink-0",
                "[&>*]:basis-[88%]",
                "sm:[&>*]:basis-[70%]",
                "md:[&>*]:basis-[48%]",
                "lg:[&>*]:basis-[31%]",
                "xl:[&>*]:basis-[24%]",
              ].join(" ")
            : [
                // responsive grid column counts + gaps (only sizing)
                "grid grid-cols-1",
                "sm:grid-cols-2",
                "lg:grid-cols-3",
                "gap-4 sm:gap-6 xl:gap-8",
              ].join(" ")
        }
        variants={listVariants}
        // Don't animate on first load. Animate only after a tab click.
        initial={hasInteracted ? "hidden" : false}
        animate="visible"
        exit={hasInteracted ? { opacity: 0, y: -8, transition: { duration: 0.15 } } : undefined}
        {...dragProps}
      >
        {items.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
</section>

    </main>
  );
}
