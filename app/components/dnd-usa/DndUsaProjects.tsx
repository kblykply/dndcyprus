// app/components/dnd-usa/DndUsaProjects.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Status = "For Sale" | "Sold" | "Under Development";
type Project = {
  id: string;
  name: string;
  location: string;
  status: Status;
  price?: string;   // "$3,895,000" | "will announce soon"
  sqft?: string;    // "7350 Sqft"
  image?: string;
  href?: string;
  accent?: "teal" | "orange";
};

export default function DndUsaProjects({
  title = "ABD Projelerimiz",
  subtitle = "Filtreleyin ve hızlıca inceleyin.",
  projects = USA_PROJECTS, // data below
  initialVisible = 6,
}: {
  title?: string;
  subtitle?: string;
  projects?: Project[];
  initialVisible?: number;
}) {
  const [status, setStatus] = useState<"All" | Status>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name-asc" | "price-desc" | "price-asc">("name-asc");
  const [visible, setVisible] = useState(initialVisible);

  // helpers
  const toNumber = (p?: string) => {
    if (!p) return NaN;
    if (p.toLowerCase().includes("announce")) return NaN;
    const m = p.replace(/[^0-9.]/g, "");
    return Number(m || NaN);
  };

  const filtered = useMemo(() => {
    let list = projects;
    if (status !== "All") list = list.filter(p => p.status === status);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        `${p.name} ${p.location} ${p.status} ${p.price ?? ""} ${p.sqft ?? ""}`
          .toLowerCase()
          .includes(q)
      );
    }

    if (sort === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => (toNumber(b.price) || -1) - (toNumber(a.price) || -1));
    } else {
      list = [...list].sort((a, b) => (toNumber(a.price) || Infinity) - (toNumber(b.price) || Infinity));
    }

    return list;
  }, [projects, status, query, sort]);

  const counts = useMemo(() => ({
    All: projects.length,
    "For Sale": projects.filter(p => p.status === "For Sale").length,
    "Under Development": projects.filter(p => p.status === "Under Development").length,
    "Sold": projects.filter(p => p.status === "Sold").length,
  }), [projects]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <section
      aria-label="DND USA Projects Showcase"
      className="relative overflow-hidden"
style={{
  background: "#fff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}
    >
      {/* brand wash */}
         <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
            background: `
                radial-gradient(28rem 20rem at 15% 100%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 0%, ${ORANGE}14, transparent 70%)
            `,
            }}
        />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
          <div className="mt-2 h-1 w-14 rounded-full" style={{ background: TEAL }} />
          <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.7)" }}>{subtitle}</p>
        </motion.div>

        {/* filter bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {(["All", "For Sale", "Under Development", "Sold"] as const).map(f => {
            const active = f === status;
            const color = active ? TEAL : "rgba(20,21,23,0.85)";
            const bg = active ? `${TEAL}14` : "rgba(20,21,23,0.05)";
            const border = active ? `1px solid ${TEAL}33` : "1px solid var(--stroke)";
            return (
              <button
                key={f}
                onClick={() => { setStatus(f); setVisible(initialVisible); }}
                className="text-xs px-3 py-1 rounded-full transition-colors"
                style={{ color, background: bg, border }}
              >
                {f} <span className="opacity-70">({counts[f as keyof typeof counts]})</span>
              </button>
            );
          })}

          {/* search */}
          <div className="ml-auto flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(initialVisible); }}
              placeholder="Ara: isim, konum, fiyat…"
              className="text-xs rounded-full px-3 py-1 outline-none"
              style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)", color: "rgba(20,21,23,0.85)" }}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="text-xs rounded-full px-3 py-1 outline-none"
              style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)", color: "rgba(20,21,23,0.85)" }}
            >
              <option value="name-asc">Ada göre (A→Z)</option>
              <option value="price-desc">Fiyata göre (Yüksek→Düşük)</option>
              <option value="price-asc">Fiyata göre (Düşük→Yüksek)</option>
            </select>
          </div>
        </div>

        {/* grid (compact) */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {shown.map((p, i) => {
              const disabled = p.status === "Sold";
              const color = disabled ? "rgba(20,21,23,0.7)" : (p.accent === "orange" ? ORANGE : TEAL);
              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                  className="rounded-2xl overflow-hidden group flex"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
                    border: `1px solid ${color}33`,
                    boxShadow: `0 10px 22px ${color}22`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* image */}
                  <div className="relative w-2/5 sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <img
                      src={p.image || "/images/projects/placeholder.jpg"}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute left-2 top-2 text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
                    >
                      {p.status}
                    </div>
                  </div>

                  {/* body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-sm sm:text-base font-semibold">{p.name}</h3>
                    <div className="text-[11px] mt-0.5" style={{ color: "rgba(20,21,23,0.65)" }}>
                      {p.location}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                      {p.price && (
                        <span className="px-2 py-0.5 rounded-full" style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                          {p.price}
                        </span>
                      )}
                      {p.sqft && (
                        <span className="px-2 py-0.5 rounded-full" style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                          {p.sqft}
                        </span>
                      )}
                    </div>

                    {p.href && (
                      <a
                        href={p.href}
                        className="mt-auto self-start text-xs px-3 py-1.5 rounded-full"
                        style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
                      >
                        Detayları Gör
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* load more */}
        <div className="mt-6 flex justify-center">
          {canLoadMore ? (
            <button
              onClick={() => setVisible(v => v + initialVisible)}
              className="text-xs px-4 py-2 rounded-full"
              style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
            >
              Daha Fazla Yükle
            </button>
          ) : filtered.length === 0 ? (
            <div className="text-sm" style={{ color: "rgba(20,21,23,0.65)" }}>
              Sonuç bulunamadı. Filtreden “All”’ı seçmeyi deneyin.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Data (US projects) ---------------- */
const USA_PROJECTS: Project[] = [
  // For Sale
  { id: "us-1-braemore", name: "1 Braemore Terrace", location: "1 Braemore Ter, Lexington, MA 02420", status: "For Sale", price: "$3,895,000", sqft: "7350 Sqft", image: "/images/projects/us/1-braemore.jpg", href: "/projects/1-braemore-terrace", accent: "teal" },
  { id: "us-28-newtonville", name: "28 Newtonville Avenue", location: "28 Newtonville Ave, Newton, MA 02458", status: "For Sale", price: "$3,698,000", sqft: "6846 Sqft", image: "/images/projects/us/28-newtonville.jpg", href: "/projects/28-newtonville-avenue", accent: "orange" },
  { id: "us-32-newtonville", name: "32 Newtonville Avenue", location: "32 Newtonville Ave, Newton, MA 02458", status: "For Sale", price: "$3,698,000", sqft: "6846 Sqft", image: "/images/projects/us/32-newtonville.jpg", href: "/projects/32-newtonville-avenue", accent: "teal" },
  { id: "us-40-winchester", name: "40 Winchester Drive", location: "40 Winchester Dr, Lexington, MA 02420", status: "For Sale", price: "$3,900,000", sqft: "7541 Sqft", image: "/images/projects/us/40-winchester.jpg", href: "/projects/40-winchester-drive", accent: "orange" },
  { id: "us-16-winchester", name: "16 Winchester Drive", location: "16 Winchester Dr, Lexington, MA 02420", status: "For Sale", price: "will announce soon", sqft: "7419 Sqft", image: "/images/projects/us/16-winchester.jpg", href: "/projects/16-winchester-drive", accent: "teal" },
  { id: "us-11-castle", name: "11 Castle Road", location: "11 Castle Rd, Lexington, MA 02420", status: "For Sale", price: "$4,795,000", image: "/images/projects/us/11-castle.jpg", href: "/projects/11-castle-road", accent: "orange" },
  { id: "us-492-putnam", name: "492 Putnam Ave", location: "492 Putnam Ave #492, Cambridge, MA 02139", status: "For Sale", price: "$2,375,000", image: "/images/projects/us/492-putnam.jpg", href: "/projects/492-putnam-ave", accent: "teal" },

  // Under Development
  { id: "us-15-tyler", name: "15 Tyler Road", location: "15 Tyler Road, Lexington, MA 02420", status: "Under Development", price: "will announce soon", sqft: "7739 Sqft", image: "/images/projects/us/15-tyler.jpg", href: "/projects/15-tyler-road", accent: "orange" },

  // Sold
  { id: "us-8-winston", name: "8 Winston Road", location: "8 Winston Rd, Lexington, MA 02421", status: "Sold", price: "$3,495,000", sqft: "7094 Sqft", image: "/images/projects/us/8-winston.jpg", href: "/projects/8-winston-road" },
  { id: "us-1256-commonwealth", name: "1256 Commonwealth Avenue", location: "1256 Commonwealth Ave, Newton, MA 02465", status: "Sold", price: "$3,572,500", sqft: "6377 Sqft", image: "/images/projects/us/1256-commonwealth.jpg", href: "/projects/1256-commonwealth-avenue" },
  { id: "us-131-dane-hill", name: "131 Dane Hill Road", location: "131 Dane Hill Road, Newton, MA 02461", status: "Sold", price: "$3,550,000", sqft: "7196 Sqft", image: "/images/projects/us/131-dane-hill.jpg", href: "/projects/131-dane-hill-road" },
  { id: "us-31-fairlawn", name: "31 Fairlawn Ln", location: "31 Fairlawn Ln, Lexington, MA 02420", status: "Sold", price: "$3,500,000", sqft: "7600 Sqft", image: "/images/projects/us/31-fairlawn.jpg", href: "/projects/31-fairlawn-ln" },
  { id: "us-1-revolutionary", name: "1 Revolutionary Road", location: "1 Revolutionary Road, Lexington, MA 02421", status: "Sold", price: "$2,825,000", sqft: "6402 Sqft", image: "/images/projects/us/1-revolutionary.jpg", href: "/projects/1-revolutionary-road" },
  { id: "us-25-normandy", name: "25 Normandy Road", location: "25 Normandy Rd, Lexington, MA 02421", status: "Sold", price: "$3,375,000", sqft: "6100 Sqft", image: "/images/projects/us/25-normandy.jpg", href: "/projects/25-normandy-road" },
  { id: "us-56-thorndike", name: "56 Thorndike Street", location: "56 Thorndike St #56, Brookline, MA 02446", status: "Sold", price: "$2,700,000", sqft: "2701 Sqft", image: "/images/projects/us/56-thorndike.jpg", href: "/projects/56-thorndike-street" },
  { id: "us-8-poplar", name: "8 Poplar Road", location: "8 Poplar Rd #B, Cambridge, MA 02138", status: "Sold", price: "$1,260,000", sqft: "1998 Sqft", image: "/images/projects/us/8-poplar.jpg", href: "/projects/8-poplar-road" },
  { id: "us-10-shailer", name: "10 Shailer Street, Brookline", location: "10 Shailer St #10, Brookline, MA 02446", status: "Sold", price: "$2,550,000", sqft: "2865 Sqft", image: "/images/projects/us/10-shailer.jpg", href: "/projects/10-shailer-street" },
  { id: "us-155-babcock", name: "155 Babcock Street", location: "155 Babcock Street #153, Brookline, MA 02446", status: "Sold", price: "$4,000,000", sqft: "5408 Sqft", image: "/images/projects/us/155-babcock.jpg", href: "/projects/155-babcock-street" },
  { id: "us-110-hampshire", name: "110 Hampshire Street", location: "110 Hampshire St #110, Cambridge, MA 02139", status: "Sold", price: "$1,575,000", sqft: "3365 Sqft", image: "/images/projects/us/110-hampshire.jpg", href: "/projects/110-hampshire-street" },
  { id: "us-23-25-jackson", name: "23 & 25 Jackson Street", location: "—", status: "Sold", price: "$2,582,800", sqft: "2301 Sqft", image: "/images/projects/us/23-25-jackson.jpg", href: "/projects/23-25-jackson-street" },
  { id: "us-68-freemont-a", name: "68 Freemont Street (A)", location: "68 Freemont St, Lexington, MA 02421", status: "Sold", price: "$3,183,659", sqft: "5215 Sqft", image: "/images/projects/us/68-freemont-a.jpg", href: "/projects/68-freemont-street-a" },
  { id: "us-1-oxbow", name: "1 Oxbow Road", location: "1 Oxbow Rd, Lexington, MA 02421", status: "Sold", price: "$3,227,100", image: "/images/projects/us/1-oxbow.jpg", href: "/projects/1-oxbow-road" },
  { id: "us-68-freemont-b", name: "68 Freemont Street (B)", location: "68 Freemont St, Lexington, MA 02421", status: "Sold", price: "$3,011,200", image: "/images/projects/us/68-freemont-b.jpg", href: "/projects/68-freemont-street-b" },
  { id: "us-153-babcock", name: "153 Babcock St", location: "153 Babcock St, Brookline, MA 02446", status: "Sold", price: "$4,284,515", image: "/images/projects/us/153-babcock.jpg", href: "/projects/153-babcock-st" },
];
