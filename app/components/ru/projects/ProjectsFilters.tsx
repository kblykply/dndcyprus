// app/components/ru/projects/ProjectsFilters.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECT_HASH } from "@/lib/azure/nav";
import Link from "next/link";
import GlassArrow from "@/app/components/azure/GlassArrow";
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
  {
    id: "neocity",
    title: "NeoCity",
    status: "Ongoing", // 1. etap satışta (Ekim 2026)
    type: "Residential",
    location: "Тузла, Фамагуста",
    cover: "/neocity/hero.jpg",
    href: "/ru/neocity",
  },
  // Residential
  {
    id: "lagoon-verde",
    title: "Lagoon Verde",
    status: "Ongoing", // “coming soon” / campaign posts
    type: "Residential",
    location: "Bahçeler, Искеле",
    cover: "/azure/lv-7.jpg",
    href: "/ru/lagoon-verde",
  },
  {
    id: "la-joya-perla-ii",
    title: "La Joya Perla II",
    status: "Ongoing", // launched, in sales/construction
    type: "Residential",
    location: "Bahçeler, Искеле",
    cover: "/azure/p2-9.jpg",
    href: "/ru/perla-ii",
  },
  {
    id: "la-joya-perla-i",
    title: "La Joya Perla I",
    status: "Ongoing",
    type: "Residential",
    location: "Bahçeler, Искеле",
    cover: "/azure/p1-9.jpg",
    href: "/ru/perla",
  },
  {
    id: "la-joya",
    title: "La Joya",
    status: "Completed",
    type: "Residential",
    location: "Искеле",
    cover: "/azure/lj-5.jpg",
    href: "/ru/la-joya",
  },

  // Beach Club
  {
    id: "mariachi-beach-club",
    title: "Mariachi Beach Club",
    status: "Upcoming",
    type: "Beach",
    location: "Искеле",
    cover: "/azure/mb-2.jpg",
    href: "/ru/mariachi",
  },

  // Land
  {
    id: "gecitkale-land",
    title: "Земельный участок в Гечиткале",
    status: "Upcoming",
    type: "Land",
    location: "Гечиткале",
    cover: "/gecitkaleimage.jpg",
    href: "/ru/gecitkale",
  },
];

/* ================== UI META ================== */
const STATUS_TABS: { key: ProjectStatus; label: string }[] = [
  { key: "All",       label: "Все" },
  { key: "Ongoing",   label: "Строится" },
  { key: "Upcoming",  label: "Скоро" },
  { key: "Completed", label: "Завершён" },
];

const TYPE_CHIPS: { key: ProjectType; label: string }[] = [
  { key: "All",         label: "Все" },
  { key: "Residential", label: "Жильё" },
  { key: "Beach",       label: "Пляж" },
  { key: "Land",        label: "Земля" },
];

const CTA = "Подробнее";

/* ================== COMPONENT ================== */
export default function ProjectsFilters() {
  const [filters, setFilters] = useState<Filters>({ status: "All", type: "All", q: "" });
  // menüden gelen durum çapası (/projects#devam-eden …): ilgili sekme seçilir, liste görünür alana kayar
  const box = useRef<HTMLElement>(null);
  useEffect(() => {
    const h = PROJECT_HASH["ru"];
    const map: Record<string, Exclude<ProjectStatus, "All">> = { [h.ongoing]: "Ongoing", [h.completed]: "Completed", [h.upcoming]: "Upcoming" };
    const apply = () => {
      const st = map[decodeURIComponent(location.hash.slice(1))];
      if (!st) return;
      setFilters((v) => ({ ...v, status: st }));
      // açılışta Next sayfayı başa aldıktan sonra kaydır
      window.setTimeout(() => box.current?.scrollIntoView({ block: "start", behavior: "smooth" }), 250);
    };
    apply();
    addEventListener("hashchange", apply);
    return () => removeEventListener("hashchange", apply);
  }, []);

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
    <section ref={box} style={{ scrollMarginTop: 90 }} className="az-section tight" aria-label="Фильтры и список проектов">
      <div className="az-wrap">
        {/* Filter bar: status tabs (pills) + search */}
        <div
          className="az-panel rv"
          style={{ padding: 14, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", background: "var(--glass)" }}
        >
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Статус">
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
            <label htmlFor="project-search" className="sr-only">Поиск проектов</label>
            <input
              id="project-search"
              type="search"
              style={{ border: "1px solid var(--line)" }}
              placeholder="Найти проект…"
              value={filters.q}
              onChange={(e) => setFilters((v) => ({ ...v, q: e.target.value }))}
            />
          </div>
        </div>

        {/* Type chips */}
        <div className="az-tags rv d1" role="group" aria-label="Тип" style={{ alignItems: "center" }}>
          <span style={{ background: "transparent", border: 0, padding: "7px 0", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, color: "var(--ink-60)" }}>
            Тип:
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
                <h2>{p.title}</h2>
                <div className="glassrow">{CTA} <GlassArrow /></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="az-panel" role="status" style={{ marginTop: 16, fontSize: 14, color: "var(--ink-60)" }}>
            Ничего не найдено. Попробуйте другой фильтр или запрос.
          </div>
        )}
      </div>
    </section>
  );
}

/* helpers */
function labelStatusEN(s: Exclude<ProjectStatus, "All">) {
  switch (s) {
    case "Ongoing": return "Строится";
    case "Upcoming": return "Скоро";
    case "Completed": return "Завершён";
  }
}

function labelTypeEN(t: Exclude<ProjectType, "All">) {
  switch (t) {
    case "Residential": return "Жильё";
    case "Beach": return "Пляжный клуб";
    case "Land": return "Земля";
  }
}
