// app/components/de/projects/ProjectsFilters.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

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
  href: string;  // static detail page
};

type Filters = { status: ProjectStatus; type: ProjectType; q: string };

/* ================== DND CYPRUS — PROJECTS (edit here) ================== */
const DATA: Project[] = [
  // Residential
  {
    id: "lagoon-verde",
    title: "Lagoon Verde",
    status: "Ongoing", // “coming soon” / campaign posts
    type: "Residential",
    location: "Bahçeler, İskele",
    cover: "/azure/lv-7.jpg",
    href: "/de/lagoon-verde",
  },
  {
    id: "la-joya-perla-ii",
    title: "La Joya Perla II",
    status: "Ongoing", // launched, in sales/construction
    type: "Residential",
    location: "Bahçeler, İskele",
    cover: "/azure/p2-9.jpg",
    href: "/de/perla-ii",
  },
  {
    id: "la-joya-perla-i",
    title: "La Joya Perla I",
    status: "Ongoing",
    type: "Residential",
    location: "Bahçeler, İskele",
    cover: "/azure/p1-9.jpg",
    href: "/de/perla",
  },
  {
    id: "la-joya",
    title: "La Joya",
    status: "Completed",
    type: "Residential",
    location: "İskele",
    cover: "/azure/lj-5.jpg",
    href: "/de/la-joya",
  },

  // Beach Club
  {
    id: "mariachi-beach-club",
    title: "Mariachi Beach Club",
    status: "Upcoming",
    type: "Beach",
    location: "İskele",
    cover: "/azure/mb-2.jpg",
    href: "/de/mariachi",
  },

  // Land
  {
    id: "gecitkale-land",
    title: "Grundstücksprojekt Geçitkale",
    status: "Upcoming",
    type: "Land",
    location: "Geçitkale",
    cover: "/gecitkaleimage.jpg",
    href: "/de/gecitkale",
  },
];

/* ================== UI META ================== */
const STATUS_TABS: { key: ProjectStatus; label: string }[] = [
  { key: "All",       label: "Alle" },
  { key: "Ongoing",   label: "Im Bau" },
  { key: "Upcoming",  label: "Demnächst" },
  { key: "Completed", label: "Fertiggestellt" },
];

const TYPE_CHIPS: { key: ProjectType; label: string }[] = [
  { key: "All",         label: "Alle" },
  { key: "Residential", label: "Wohnen" },
  { key: "Beach",       label: "Beach Club" },
  { key: "Land",        label: "Grundstück" },
];

const CTA = "Details ansehen";

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
    <section className="az-section tight" aria-label="Projektfilter und Projektliste">
      <div className="az-wrap">
        {/* Filter bar: status tabs (pills) + search */}
        <div
          className="az-panel rv"
          style={{ padding: 14, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", background: "var(--glass)" }}
        >
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Status">
            {STATUS_TABS.map((t) => {
              const active = filters.status === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={active}
                  className={`az-btn sm ${active ? "sea" : "glass"}`}
                  onClick={() => setFilters((v) => ({ ...v, status: t.key }))}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="az-field" style={{ flex: "1 1 240px", maxWidth: 360 }}>
            <label htmlFor="project-search" className="sr-only">Projekte durchsuchen</label>
            <input
              id="project-search"
              type="search"
              style={{ border: "1px solid var(--line)" }}
              placeholder="Projekte durchsuchen…"
              value={filters.q}
              onChange={(e) => setFilters((v) => ({ ...v, q: e.target.value }))}
            />
          </div>
        </div>

        {/* Type chips */}
        <div className="az-tags rv d1" role="group" aria-label="Typ" style={{ alignItems: "center" }}>
          <span style={{ background: "transparent", border: 0, padding: "7px 0", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, color: "var(--ink-40)" }}>
            Typ:
          </span>
          {TYPE_CHIPS.map((t) => {
            const active = filters.type === t.key;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilters((v) => ({ ...v, type: t.key }))}
                style={{
                  padding: "7px 12px",
                  borderRadius: 999,
                  background: active ? "var(--sea)" : "var(--glass)",
                  border: `1px solid ${active ? "var(--sea)" : "rgba(255,255,255,.9)"}`,
                  color: active ? "#fff" : "var(--ink)",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "background .3s, color .3s",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Project cards (home-page .az-pc style) */}
        <div className="mt-6 grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.id} className="az-pc" href={p.href} prefetch={false}>
              <DeferredFillImage
                fill
                quality={65}
                sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 999px) 50vw, 480px"
                src={p.cover}
                alt=""
                className="object-cover"
                aria-hidden
              />
              <div className="top">
                <span className="az-st">{labelStatusEN(p.status)}</span>
                <span className="az-st">{labelTypeEN(p.type)}</span>
              </div>
              <div className="in">
                <small>{p.location}</small>
                <h3>{p.title}</h3>
                <div className="glassrow">{CTA} <i>→</i></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="az-panel" role="status" style={{ marginTop: 16, fontSize: 14, color: "var(--ink-60)" }}>
            Keine Ergebnisse gefunden. Versuchen Sie einen anderen Filter oder Suchbegriff.
          </div>
        )}
      </div>
    </section>
  );
}

/* helpers */
function labelStatusEN(s: Exclude<ProjectStatus, "All">) {
  switch (s) {
    case "Ongoing": return "Im Bau";
    case "Upcoming": return "Demnächst";
    case "Completed": return "Fertiggestellt";
  }
}

function labelTypeEN(t: Exclude<ProjectType, "All">) {
  switch (t) {
    case "Residential": return "Wohnen";
    case "Beach": return "Beach Club";
    case "Land": return "Grundstück";
  }
}
