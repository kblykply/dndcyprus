"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Types ---------------- */
export type Hotspot = {
  id: string;
  label: string;   // used for a11y and tiny caption
  x: number;       // % from left
  y: number;       // % from top
  thumbSrc: string; // image shown in the right panel
};

type Angle = {
  id: string;
  name: string;      // tab label
  imageSrc: string;  // background render
  imageAlt: string;
  hotspots: Hotspot[];
};

/* ---------------- Component ---------------- */
export default function InteriorMaterialsHotspotsBase() {
  /* ------- Define your angles here ------- */
  const ANGLES: Angle[] = [
    {
      id: "angle-a",
      name: "Salon",
      imageSrc: "/la-joya-in/2.jpg",
      imageAlt: "Interior render – Angle A",
      hotspots: [
       
      ],
    },
    {
      id: "angle-b",
      name: "Mutfak",
      imageSrc: "/la-joya-in/3.jpg",
      imageAlt: "Interior render – Angle B",
      hotspots: [
       
      ],
    },
    {
      id: "angle-c",
      name: "Yatak Odası",
      imageSrc: "/la-joya-in/6.jpg",
      imageAlt: "Interior render – Angle C",
      hotspots: [
        
      ],
    },
  ];

  /* ------- State ------- */
  const [angleId, setAngleId] = React.useState<string>(ANGLES[0].id);
  const [activeId, setActiveId] = React.useState<string | null>(null); // hover visual only
  const [lockedId, setLockedId] = React.useState<string | null>(null); // click to open panel

  const angle = React.useMemo(
    () => ANGLES.find(a => a.id === angleId)!,
    [angleId]
  );

  // Panel shows ONLY locked selection (fix for pins near panel)
  const currentHotspot = angle.hotspots.find(h => h.id === lockedId) ?? null;

  const clearAll = () => { setActiveId(null); setLockedId(null); };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") clearAll(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Clear selection when switching angle
  React.useEffect(() => { clearAll(); }, [angleId]);

  return (
    <section className="isolate relative z-0 w-full py-10 sm:py-12">
      {/* Cross-fading background */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={angle.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <Image
              src={angle.imageSrc}
              alt={angle.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/60 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Heading */}
      <header className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          La Joya İç Mekan & Tasarım
        </h2>
        <p className="mt-1 text-white/80">
          Tatil Yaşamının  ve estetiğin buluştuğu <strong>Lagoon Verde</strong> sizlerle.
        </p>
      </header>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stage */}
        <div className="relative h-[68vh] md:h-[78vh] rounded-xl overflow-hidden ring-1 ring-white/10">
          {/* Hotspots for the current angle */}
          <div className="absolute inset-0">
            {angle.hotspots.map((hs) => (
              <HotspotMarker
                key={hs.id}
                hs={hs}
                isActive={activeId === hs.id || lockedId === hs.id}
                onHover={(state) => setActiveId(state ? hs.id : null)}
                onFocus={() => setActiveId(hs.id)}
                onBlur={() => setActiveId(null)}
                onClick={() => setLockedId(curr => (curr === hs.id ? null : hs.id))}
              />
            ))}
          </div>

          {/* Tabs – bottom-left */}
          <div className="absolute left-4 bottom-4 z-30 flex flex-wrap gap-2">
            {ANGLES.map((a) => {
              const selected = a.id === angleId;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAngleId(a.id)}
                  className={[
                    "px-3.5 py-2 rounded-full backdrop-blur-xl border transition",
                    selected
                      ? "bg-white/90 text-neutral-900 border-white/90"
                      : "bg-white/10 text-white/90 border-white/20 hover:bg-white/20",
                  ].join(" ")}
                >
                  {a.name}
                </button>
              );
            })}
          </div>

       
        </div>
      </div>
    </section>
  );
}

/* ---------------- Fixed Right Panel ---------------- */
function RightFixedPanel({
  hotspot,
  onClose,
}: {
  hotspot: Hotspot | null;
  onClose: () => void;
}) {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 z-50 -translate-y-1/2">
      <AnimatePresence initial={false} mode="wait">
        {hotspot ? (
          <motion.div
            key={hotspot.id}
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="pointer-events-auto w-[420px] max-w-[70vw] overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          >
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-neutral-900 ring-1 ring-black/10"
            >
              ×
            </button>

            {/* Fade the image when switching pins */}
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={hotspot.thumbSrc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative aspect-[4/3]"
                >
                  <Image
                    src={hotspot.thumbSrc}
                    alt={hotspot.label}
                    fill
                    className="object-cover"
                    sizes="420px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Minimal caption – remove if you want image only */}
            <div className="px-4 py-2 text-sm text-white/80">{hotspot.label}</div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            className="pointer-events-none w-[360px] max-w-[60vw] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-3 text-white/75"
          >
            Detaylı bilgi için iletişişme geçin.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Hotspot Marker ---------------- */
function HotspotMarker({
  hs,
  isActive,
  onHover,
  onFocus,
  onBlur,
  onClick,
}: {
  hs: Hotspot;
  isActive: boolean;
  onHover: (state: boolean) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}) {
  return (
    <div
      className="absolute z-20"
      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
    >
      <motion.button
        type="button"
        className="group relative -translate-x-1/2 -translate-y-1/2 outline-none"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-pressed={isActive}
        aria-label={hs.label}
      >
        <span
          className={[
            "relative flex h-9 w-9 items-center justify-center rounded-full shadow-lg ring-1 backdrop-blur-sm transition",
            isActive
              ? "bg-white text-neutral-900 ring-black/10"
              : "bg-white/90 text-neutral-900 ring-black/10 hover:bg-white",
          ].join(" ")}
        >
          +
        </span>

        {/* subtle pulse on idle */}
        <AnimatePresence>
          {!isActive && (
            <motion.span
              className="absolute inset-0 -z-10 rounded-full"
              initial={{ scale: 1, opacity: 0.35 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.2 }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
