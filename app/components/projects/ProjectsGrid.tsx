// app/components/ProjectsGrid.tsx
"use client";

import React, { useMemo, useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Project = {
  id: string;
  title: string;
  location: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  cover: string;  // /public image path
  href: string;   // link to static detail page
  tag?: "Residential" | "Beach" | "Land" | "Commercial" | "Mixed";
};

/* ====== DND Cyprus — edit the list below ====== */
const DATA: Project[] = [
  // Residential
  { id: "lagoon-verde",       title: "Lagoon Verde",        location: "Long Beach, İskele", status: "Upcoming",  cover: "/Lagoon - 1.png",     href: "/projects/lagoon-verde",       tag: "Residential" },
  { id: "la-joya-perla-ii",   title: "La Joya Perla II",    location: "Bahçeler, İskele",   status: "Ongoing",   cover: "/Perla II - 1.png",  href: "/projects/la-joya-perla-ii",   tag: "Residential" },
  { id: "la-joya-perla-i",    title: "La Joya Perla I",     location: "Bahçeler, İskele",   status: "Ongoing",   cover: "/Perla I - 1.png",  href: "/projects/la-joya-perla-i",    tag: "Residential" },
  { id: "la-joya",            title: "La Joya",             location: "İskele",            status: "Ongoing",   cover: "/La Joya - 1.png",          href: "/projects/la-joya",            tag: "Residential" },

  // Beach / Land
  { id: "mariachi-beach",     title: "Mariachi Beach Club", location: "İskele",            status: "Upcoming",  cover: "/Mariachi - 1.png", href: "/projects/mariachi-beach-club", tag: "Beach" },
  { id: "gecitkale-land",     title: "Geçitkale Arazi",     location: "Geçitkale",         status: "Upcoming",  cover: "/gecitkale-1.png",        href: "/projects/gecitkale",          tag: "Land" },

  // Example completed (replace or remove)
];

const STATUS_BADGE = {
  Ongoing:  { label: "Devam Eden",  color: ORANGE },
  Upcoming: { label: "Yakında",     color: TEAL },
  Completed:{ label: "Tamamlanan",  color: "#1f9d55" }, // subtle green for completed
};

type Props = {
  title?: string;
  subtitle?: string;
  initialCount?: number; // how many to show before "Daha Fazla"
};

export default function ProjectsGrid({
  title = "Projeler",
  subtitle = "Gündemdeki ve tamamlanan projelerimizden seçkiler.",
  initialCount = 6,
}: Props) {
  const [limit, setLimit] = useState(initialCount);
  const items = useMemo(() => DATA.slice(0, limit), [limit]);

  return (
    <section
      aria-label="Projeler Galerisi"
      className="relative overflow-hidden"
      style={{
  background: "#ffffff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >
      {/* subtle accent wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(32rem 22rem at 12% 0%, ${TEAL}10, transparent 70%),
            radial-gradient(28rem 18rem at 88% 100%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">{title}</h2>
          <p className="mt-2 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </div>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => {
            const badge = STATUS_BADGE[p.status];
            return (
              <a
                key={p.id}
                href={p.href}
                className="group rounded-2xl overflow-hidden block"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                  border: "1px solid var(--stroke)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="relative aspect-[16/10] bg-white overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* status badge */}
                  <span
                    className="absolute left-3 top-3 text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      background: `${badge.color}16`,
                      color: badge.color,
                      border: `1px solid ${String(badge.color)}33`,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {badge.label}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm uppercase tracking-wide" style={{ color: "rgba(20,21,23,0.55)" }}>
                        {p.location}{p.tag ? ` • ${p.tag}` : ""}
                      </div>
                      <h3 className="text-base font-semibold">{p.title}</h3>
                    </div>

                    {/* small arrow */}
                    <span
                      aria-hidden
                      className="translate-x-0 group-hover:translate-x-0.5 transition-transform text-sm"
                      style={{ color: "rgba(20,21,23,0.55)" }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Load more */}
        {limit < DATA.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setLimit((n) => Math.min(n + 6, DATA.length))}
              className="rounded-xl px-5 py-2.5 text-sm font-medium"
              style={{
                background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                color: "#fff",
                border: `1px solid ${TEAL}55`,
                boxShadow: `0 10px 28px ${TEAL}40`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
              }
            >
              Daha Fazla Göster
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
