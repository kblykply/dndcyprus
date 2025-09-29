// app/components/ProjectsFilters.tsx
"use client";

import React, { useMemo, useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/**
 * Status reflects the current public info:
 * - Ongoing: in sales/construction
 * - Upcoming: announced / coming soon
 * - Completed: delivered
 */
type ProjectStatus = "All" | "Ongoing" | "Upcoming" | "Completed";
/** Types tailored to DND Cyprus */
type ProjectType = "All" | "Residential" | "Beach" | "Land";

type Project = {
  id: string;
  title: string;
  status: Exclude<ProjectStatus, "All">;
  type: Exclude<ProjectType, "All">;
  location: string;
  cover: string; // /public image path
  href: string;  // static detail page you’ll create
};

type Filters = { status: ProjectStatus; type: ProjectType; q: string };

/* ================== DND CYPRUS — PROJECTS (edit here) ================== */
const DATA: Project[] = [
  // Residential
  {
    id: "lagoon-verde",
    title: "Lagoon Verde",
    status: "Upcoming", // “coming soon” / campaign posts
    type: "Residential",
    location: "Long Beach, İskele",
    cover: "/lagoon-verde/1.jpg",
    href: "/projects/lagoon-verde",
  },
  {
    id: "la-joya-perla-ii",
    title: "La Joya Perla II",
    status: "Ongoing", // launched, in sales/construction
    type: "Residential",
    location: "Bahçeler, İskele",
    cover: "/perla-ii/2.jpg",
    href: "/perla-ii",
  },
  {
    id: "la-joya-perla-i",
    title: "La Joya Perla I",
    status: "Ongoing",
    type: "Residential",
    location: "Bahçeler, İskele",
    cover: "/perla/1.jpg",
    href: "/projects/la-joya-perla-i",
  },
  {
    id: "la-joya",
    title: "La Joya",
    status: "Ongoing",
    type: "Residential",
    location: "İskele",
    cover: "/la-joya/2.jpg",
    href: "/projects/la-joya",
  },

  // Beach Club
  {
    id: "mariachi-beach-club",
    title: "Mariachi Beach Club",
    status: "Upcoming",
    type: "Beach",
    location: "İskele",
    cover: "/mariachi/2.jpg",
    href: "/projects/mariachi-beach-club",
  },

  // Land
  {
    id: "gecitkale-land",
    title: "Geçitkale Arazi Projesi",
    status: "Upcoming",
    type: "Land",
    location: "Geçitkale",
    cover: "/gecitkaleimage.png",
    href: "/projects/gecitkale",
  },
];

/* ================== UI META ================== */
const STATUS_TABS: { key: ProjectStatus; label: string; accent?: "teal" | "orange" }[] = [
  { key: "All",      label: "Tümü",        accent: "teal" },
  { key: "Ongoing",  label: "Devam Eden",  accent: "orange" },
  { key: "Upcoming", label: "Yakında",     accent: "teal" },
  { key: "Completed",label: "Tamamlanan",  accent: "orange" },
];

const TYPE_CHIPS: { key: ProjectType; label: string }[] = [
  { key: "All",         label: "Tümü" },
  { key: "Residential", label: "Konut" },
  { key: "Beach",       label: "Beach Club" },
  { key: "Land",        label: "Arazi" },
];

/* ================== COMPONENT ================== */
export default function ProjectsFilters() {
  const [filters, setFilters] = useState<Filters>({ status: "All", type: "All", q: "" });

  const filtered = useMemo(() => {
    return DATA.filter((p) => {
      const byStatus = filters.status === "All" || p.status === filters.status;
      const byType   = filters.type === "All" || p.type === filters.type;
      const haystack = (p.title + " " + p.location).toLowerCase();
      const byQ      = !filters.q || haystack.includes(filters.q.toLowerCase());
      return byStatus && byType && byQ;
    });
  }, [filters]);

  return (
    <section
      aria-label="Proje Filtreleri ve Liste"
      className="relative"
style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}
    >
      {/* subtle accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(28rem 16rem at 12% 0%, ${TEAL}10, transparent 70%),
            radial-gradient(24rem 14rem at 88% 100%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_TABS.map((t) => {
            const active = filters.status === t.key;
            const color = t.accent === "orange" ? ORANGE : TEAL;
            return (
              <button
                key={t.key}
                onClick={() => setFilters((v) => ({ ...v, status: t.key }))}
                className="text-xs sm:text-sm px-3 py-1 rounded-full transition-colors"
                style={{
                  background: active ? color : "rgba(20,21,23,0.05)",
                  color: active ? "#fff" : "rgba(20,21,23,0.78)",
                  border: active ? `1px solid ${color}AA` : "1px solid var(--stroke)",
                  boxShadow: active ? `0 6px 18px ${color}40` : "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Type Chips + Search */}
        <div className="mt-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wide" style={{ color: "rgba(20,21,23,0.55)" }}>
              Tür:
            </span>
            {TYPE_CHIPS.map((t) => {
              const active = filters.type === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setFilters((v) => ({ ...v, type: t.key }))}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full transition-colors"
                  style={{
                    background: active ? `${TEAL}` : "rgba(20,21,23,0.05)",
                    color: active ? "#fff" : "rgba(20,21,23,0.78)",
                    border: active ? `1px solid ${TEAL}AA` : "1px solid var(--stroke)",
                    boxShadow: active ? `0 6px 18px ${TEAL}40` : "none",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="w-full lg:w-[320px]">
            <label htmlFor="project-search" className="sr-only">Projelerde Ara</label>
            <input
              id="project-search"
              placeholder="Projelerde ara…"
              value={filters.q}
              onChange={(e) => setFilters((v) => ({ ...v, q: e.target.value }))}
              className="w-full rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: "#fff", border: "1px solid var(--stroke)" }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className="rounded-2xl overflow-hidden block group"
              style={{
                background: "#fff",
                border: "1px solid var(--stroke)",
                boxShadow: "0 10px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div className="aspect-[16/10] bg-white overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="text-sm uppercase tracking-wide" style={{ color: "rgba(20,21,23,0.55)" }}>
                  {p.location} • {labelStatusTR(p.status)}
                </div>
                <div className="text-base font-semibold">{p.title}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            className="mt-8 rounded-xl px-4 py-3 text-sm"
            style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)", color: "rgba(20,21,23,0.6)" }}
          >
            Sonuç bulunamadı. Farklı bir filtre veya arama deneyin.
          </div>
        )}
      </div>
    </section>
  );
}

/* helpers */
function labelStatusTR(s: Exclude<ProjectStatus, "All">) {
  switch (s) {
    case "Ongoing": return "Devam Eden";
    case "Upcoming": return "Yakında";
    case "Completed": return "Tamamlanan";
  }
}
