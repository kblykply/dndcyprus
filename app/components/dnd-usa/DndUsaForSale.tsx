// app/components/dnd-usa/DndUsaForSale.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
type SortOption = "price-desc" | "price-asc" | "name-asc";



const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Listing = {
  id: string;
  name: string;
  location: string;
  price: string;         // "$3,895,000" | "will announce soon"
  sqft?: string;         // "7350 Sqft"
  beds?: number;
  baths?: number;
  image?: string;
  href?: string;         // detail page
};

export default function DndUsaForSale({
  title = "Yatırım / Satılık Listeleri",
  subtitle = "Massachusetts’te satıştaki lüks konut portföyümüz.",
  items = DEFAULT_LISTINGS,
  showMortgage = true,
  defaultMonthlyRate = 0.0625,  // 6.25% annual
  defaultDown = 0.20,           // 20% down
  initialVisible = 6,
}: {
  title?: string;
  subtitle?: string;
  items?: Listing[];
  showMortgage?: boolean;
  defaultMonthlyRate?: number; // annual rate (e.g. 0.0625)
  defaultDown?: number;        // down payment fraction
  initialVisible?: number;
}) {
  // UI state
  const [query, setQuery] = useState("");
const [sort, setSort] = useState<SortOption>("price-desc");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minBeds, setMinBeds] = useState<number | "">("");
  const [visible, setVisible] = useState(initialVisible);

  // utils
  const toNum = (money?: string) => {
    if (!money) return NaN;
    if (money.toLowerCase().includes("announce")) return NaN;
    return Number(money.replace(/[^0-9.]/g, "") || NaN);
  };
  const toSqft = (s?: string) => Number((s || "").replace(/[^0-9.]/g, "") || NaN);

  // only For Sale (if full dataset is passed)
  const forSale = useMemo(
    () => items.filter(i => !/announce/i.test(i.price)),
    [items]
  );

  const filtered = useMemo(() => {
    let list = forSale;

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((l) =>
        `${l.name} ${l.location} ${l.price} ${l.sqft ?? ""}`.toLowerCase().includes(q)
      );
    }

    // price range
    list = list.filter((l) => {
      const p = toNum(l.price);
      if (isNaN(p)) return false;
      if (minPrice !== "" && p < minPrice) return false;
      if (maxPrice !== "" && p > maxPrice) return false;
      return true;
    });

    // beds
    if (minBeds !== "") {
      list = list.filter((l) => (l.beds ?? 0) >= Number(minBeds));
    }

    // sort
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "price-asc") list = [...list].sort((a, b) => toNum(a.price) - toNum(b.price));
    else list = [...list].sort((a, b) => toNum(b.price) - toNum(a.price));

    return list;
  }, [forSale, query, minPrice, maxPrice, minBeds, sort]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <section
      aria-label="DND USA — For Sale"
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
            radial-gradient(32rem 22rem at 10% 10%, ${TEAL}10, transparent 70%),
            radial-gradient(28rem 18rem at 90% 90%, ${ORANGE}12, transparent 70%)
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

        {/* filters */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-4">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(initialVisible); }}
              placeholder="Ara: isim, konum…"
              className="w-full text-xs rounded-full px-3 py-2 outline-none"
              style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)", color: "rgba(20,21,23,0.85)" }}
            />
          </div>

          <div className="lg:col-span-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-1 text-xs">
              <span style={{ color: "rgba(20,21,23,0.72)" }}>Fiyat</span>
              <input
                type="number"
                min={0}
                placeholder="min ($)"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value === "" ? "" : Number(e.target.value)); setVisible(initialVisible); }}
                className="w-28 rounded-full px-3 py-1 outline-none"
                style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)" }}
              />
              <span>–</span>
              <input
                type="number"
                min={0}
                placeholder="max ($)"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value === "" ? "" : Number(e.target.value)); setVisible(initialVisible); }}
                className="w-28 rounded-full px-3 py-1 outline-none"
                style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)" }}
              />
            </div>

            <div className="flex items-center gap-1 text-xs">
              <span style={{ color: "rgba(20,21,23,0.72)" }}>Yatak Odası</span>
              <select
                value={minBeds}
                onChange={(e) => { const v = e.target.value; setMinBeds(v === "" ? "" : Number(v)); setVisible(initialVisible); }}
                className="rounded-full px-3 py-1 outline-none"
                style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)", color: "rgba(20,21,23,0.85)" }}
              >
                <option value="">Hepsi</option>
                <option value="3">3+ </option>
                <option value="4">4+ </option>
                <option value="5">5+ </option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-3">
           <select
  value={sort}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(e.target.value as SortOption)
  }
  className="w-full text-xs rounded-full px-3 py-2 outline-none"
  style={{ background: "rgba(20,21,23,0.05)", border: "1px solid var(--stroke)", color: "rgba(20,21,23,0.85)" }}
>
  <option value="price-desc">Fiyat (Yüksek → Düşük)</option>
  <option value="price-asc">Fiyat (Düşük → Yüksek)</option>
  <option value="name-asc">İsim (A → Z)</option>
</select>
          </div>
        </div>

        {/* listings */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {shown.map((l, i) => {
              const color = TEAL;
              const price = toNum(l.price);
              const monthly = showMortgage && !isNaN(price)
                ? pm(pvAfterDown(price, defaultDown), defaultMonthlyRate / 12, 30 * 12)
                : NaN;

              return (
                <motion.article
                  key={l.id}
                  layout
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                  className="rounded-2xl overflow-hidden group flex flex-col"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
                    border: `1px solid ${color}33`,
                    boxShadow: `0 10px 22px ${color}22`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={l.image || "/images/projects/placeholder.jpg"}
                      alt={l.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3 text-[11px] px-2 py-0.5 rounded-full"
                         style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}>
                      For Sale
                    </div>
                  </div>

                  {/* body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-semibold">{l.name}</h3>
                    <div className="text-xs mt-1" style={{ color: "rgba(20,21,23,0.65)" }}>{l.location}</div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                        {l.price}
                      </span>
                      {l.sqft && (
                        <span className="px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                          {l.sqft}
                        </span>
                      )}
                      {typeof l.beds === "number" && (
                        <span className="px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                          {l.beds} bd
                        </span>
                      )}
                      {typeof l.baths === "number" && (
                        <span className="px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(20,21,23,0.06)", border: "1px solid var(--stroke)" }}>
                          {l.baths} ba
                        </span>
                      )}
                    </div>

                    {/* mortgage estimate */}
                    {showMortgage && !isNaN(monthly) && (
                      <div className="mt-2 text-[11px]" style={{ color: "rgba(20,21,23,0.7)" }}>
                        ~ ${formatMoney(monthly)}/ay tahmini mortgage (20% peşinat, 30y, {Math.round((defaultMonthlyRate)*1000)/10}%)
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      {l.href && (
                        <a
                          href={l.href}
                          className="text-xs px-3 py-1.5 rounded-full"
                          style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
                        >
                          Detayları Gör
                        </a>
                      )}
                      <a
                        href={`/contact?ref=${encodeURIComponent(l.id)}`}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
                      >
                        Yatırımcıyla Görüş
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load more */}
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
              Sonuç bulunamadı. Filtreleri gevşetmeyi deneyin.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */
function pvAfterDown(price: number, down: number) {
  return price * (1 - down);
}
function pm(pv: number, r: number, n: number) {
  // monthly payment: pv * r / (1 - (1+r)^-n)
  return pv * (r / (1 - Math.pow(1 + r, -n)));
}
function formatMoney(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/* ---------- Example data (real US “For Sale” from your list; add beds/baths if you have) ---------- */
const DEFAULT_LISTINGS: Listing[] = [
  { id: "us-1-braemore", name: "1 Braemore Terrace", location: "Lexington, MA", price: "$3,895,000", sqft: "7350 Sqft", image: "/images/projects/us/1-braemore.jpg", href: "/projects/1-braemore-terrace", beds: 6, baths: 7 },
  { id: "us-40-winchester", name: "40 Winchester Drive", location: "Lexington, MA", price: "$3,900,000", sqft: "7541 Sqft", image: "/images/projects/us/40-winchester.jpg", href: "/projects/40-winchester-drive", beds: 6, baths: 7 },
  { id: "us-11-castle", name: "11 Castle Road", location: "Lexington, MA", price: "$4,795,000", image: "/images/projects/us/11-castle.jpg", href: "/projects/11-castle-road", beds: 7, baths: 8 },
  { id: "us-32-newtonville", name: "32 Newtonville Avenue", location: "Newton, MA", price: "$3,698,000", sqft: "6846 Sqft", image: "/images/projects/us/32-newtonville.jpg", href: "/projects/32-newtonville-avenue", beds: 6, baths: 7 },
  { id: "us-28-newtonville", name: "28 Newtonville Avenue", location: "Newton, MA", price: "$3,698,000", sqft: "6846 Sqft", image: "/images/projects/us/28-newtonville.jpg", href: "/projects/28-newtonville-avenue", beds: 6, baths: 7 },
  { id: "us-492-putnam", name: "492 Putnam Ave", location: "Cambridge, MA", price: "$2,375,000", image: "/images/projects/us/492-putnam.jpg", href: "/projects/492-putnam-ave", beds: 3, baths: 3 },
  // You can append more For Sale listings here…
];
