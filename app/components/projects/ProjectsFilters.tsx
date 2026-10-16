// app/components/projects/ProjectsFilters.tsx
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
    href: "/tr/lagoon-verde",
  },
  {
    id: "la-joya-perla-ii",
    title: "La Joya Perla II",
    status: "Ongoing", // launched, in sales/construction
    type: "Residential",
    location: "Bahçeler, İskele",
    cover: "/azure/p2-9.jpg",
    href: "/tr/perla-ii",
  },
  {
    id: "la-joya-perla-i",
    title: "La Joya Perla I",
    status: "Ongoing",
    type: "Residential",
    location: "Bahçeler, İskele",
    cover: "/azure/p1-9.jpg",
    href: "/tr/perla",
  },
  {
    id: "la-joya",
    title: "La Joya",
    status: "Completed",
    type: "Residential",
    location: "İskele",
    cover: "/azure/lj-5.jpg",
    href: "/tr/la-joya",
  },

  // Beach Club
  {
    id: "mariachi-beach-club",
    title: "Mariachi Beach Club",
    status: "Upcoming",
    type: "Beach",
    location: "İskele",
    cover: "/azure/mb-2.jpg",
    href: "/tr/mariachi",
  },

  // Land
  {
    id: "gecitkale-land",
    title: "Geçitkale Arazi Projesi",
    status: "Upcoming",
    type: "Land",
    location: "Geçitkale",
    cover: "/gecitkaleimage.jpg",
    href: "/tr/gecitkale",
  },
];

/* ================== UI META ================== */
const STATUS_TABS: { key: ProjectStatus; label: string }[] = [
  { key: "All",       label: "Tümü" },
  { key: "Ongoing",   label: "Devam Eden" },
  { key: "Upcoming",  label: "Yakında" },
  { key: "Completed", label: "Tamamlanan" },
];

const TYPE_CHIPS: { key: ProjectType; label: string }[] = [
  { key: "All",         label: "Tümü" },
  { key: "Residential", label: "Konut" },
  { key: "Beach",       label: "Beach Club" },
  { key: "Land",        label: "Arazi" },
];

const CTA = "Detaylara bak";

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
    <section className="az-section tight" aria-label="Proje Filtreleri ve Liste">
      <div className="az-wrap">
        {/* Filtre çubuğu: durum sekmeleri (pill) + arama */}
        <div
          className="az-panel rv"
          style={{ padding: 14, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", background: "var(--glass)" }}
        >
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Durum">
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
            <label htmlFor="project-search" className="sr-only">Projelerde Ara</label>
            <input
              id="project-search"
              type="search"
              style={{ border: "1px solid var(--line)" }}
              placeholder="Projelerde ara…"
              value={filters.q}
              onChange={(e) => setFilters((v) => ({ ...v, q: e.target.value }))}
            />
          </div>
        </div>

        {/* Tür çipleri */}
        <div className="az-tags rv d1" role="group" aria-label="Tür" style={{ alignItems: "center" }}>
          <span style={{ background: "transparent", border: 0, padding: "7px 0", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, color: "var(--ink-40)" }}>
            Tür:
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

        {/* Proje kartları (ana sayfadaki .az-pc stili) */}
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
                <span className="az-st">{labelStatusTR(p.status)}</span>
                <span className="az-st">{labelTypeTR(p.type)}</span>
              </div>
              <div className="in">
                <small>{p.location}</small>
                <h3>{p.title}</h3>
                <div className="glassrow">{CTA} <i>→</i></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Boş durum */}
        {filtered.length === 0 && (
          <div className="az-panel" role="status" style={{ marginTop: 16, fontSize: 14, color: "var(--ink-60)" }}>
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

function labelTypeTR(t: Exclude<ProjectType, "All">) {
  switch (t) {
    case "Residential": return "Konut";
    case "Beach": return "Beach Club";
    case "Land": return "Arazi";
  }
}
