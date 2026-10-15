// app/components/en/land/LandGallery.tsx
"use client";

import { useMemo, useState, type ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type GalleryItem = {
  src: string;    // image from public/
  alt?: string;
  label?: string; // optional glass label; falls back to alt text
};

export default function LandGallery({
  title = "Gallery",
  subtitle = "Drone Images",
  items,
}: {
  title?: ReactNode;
  subtitle?: string;
  items?: GalleryItem[];
}) {
  const data: GalleryItem[] = useMemo(
    () =>
      items ?? [
        { src: "/gecitkale/gecitkale-1.jpg", alt: "Geçitkale project image 1" },
        { src: "/gecitkale/gecitkale-2.jpg", alt: "Geçitkale project image 2" },
        { src: "/gecitkale/gecitkale-3.jpg", alt: "Geçitkale project image 3" },
        { src: "/gecitkale/gecitkale-4.jpg", alt: "Geçitkale project image 4" },
        { src: "/gecitkale/gecitkale-5.jpg", alt: "Geçitkale project image 5" },
      ],
    [items]
  );

  // Hover / tap active panel
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // Panel growth ratio
  const growth = (i: number) => {
    if (active !== null) return i === active ? 3.2 : 0.8;
    if (hovered !== null) return i === hovered ? 3.2 : 0.8;
    return 1;
  };

  return (
    <section className="az-section" aria-label="Geçitkale — Gallery">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Geçitkale</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>

        {/* Expanding gallery: inside az-wrap, 28px framed panels. Stacks vertically on mobile. */}
        <div
          className="rv d1 flex flex-col gap-3 h-[min(680px,80svh)] min-[900px]:flex-row min-[900px]:h-[clamp(340px,56vh,600px)]"
          onMouseLeave={() => setHovered(null)}
        >
          {data.map((g, i) => {
            const grow = growth(i);
            const label = g.label || g.alt || `Gallery image ${i + 1}`;
            return (
              <div
                key={g.src + i}
                role="button"
                tabIndex={0}
                aria-label={label}
                aria-pressed={active === i}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onClick={() => setActive(active === i ? null : i)} // mobile: tap to pin
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(active === i ? null : i); }
                }}
                className="relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden rounded-[28px]"
                style={{
                  flexGrow: grow,
                  transition: "flex-grow .55s var(--ease)",
                  background: "var(--sea-deep)",
                  boxShadow: "0 14px 40px rgba(13,35,38,.1)",
                }}
              >
                <DeferredFillImage
                  fill
                  quality={65}
                  sizes="(max-width: 899px) 100vw, 50vw"
                  src={g.src}
                  alt={g.alt || ""}
                  className="h-full w-full select-none object-cover"
                  draggable={false}
                  style={{
                    transform: grow > 1 ? "scale(1.06)" : "scale(1.02)",
                    transition: "transform .6s var(--ease)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(6,58,66,0) 55%, rgba(6,58,66,.6) 100%)" }}
                />
                <span
                  className="az-st pointer-events-none absolute bottom-4 left-4"
                  style={{ opacity: grow > 1 ? 1 : 0, transition: "opacity .4s" }}
                  aria-hidden
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="rv d2" style={{ marginTop: 14, fontSize: 12, color: "var(--ink-40)" }}>
          *On mobile, tap an image to enlarge and pin it; tap again to return to the default view.
        </p>
      </div>
    </section>
  );
}
