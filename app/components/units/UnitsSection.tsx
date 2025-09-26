// components/units/UnitsSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

/* Brand colors */
const TEAL = "#27959b";
const ORANGE = "#f15c34";

/* ---------------- Types ---------------- */
type UnitItem = {
  slug: string;
  title: string;
  cityLabel: string;
  city?: "iskele" | "magusa" | "girne" | "lefkosha" | string;
  type: "studio" | "1-plus-1" | "2-plus-1" | "3-plus-1";
  size?: string;
  price?: string;
  priceNum?: number;
  status?: "for-sale" | "reserved" | "sold";
  image?: string;
};

/* ---------------- Static DATA ---------------- */
const UNITS: UnitItem[] = [
  {
    slug: "perla-ii-2-plus-1",
    title: "Perla II — 2+1 Daire",
    cityLabel: "İskele (Mağusa)",
    city: "iskele",
    type: "2-plus-1",
    size: "95 m²",
    price: "€240,000",
    priceNum: 240000,
    status: "for-sale",
    image: "/units/pexels-fotoaibe-1571453.jpg",
  },
  {
    slug: "perla-ii-1-plus-1",
    title: "Perla II — 1+1 Daire",
    cityLabel: "İskele (Mağusa)",
    city: "iskele",
    type: "1-plus-1",
    size: "75 m²",
    price: "€180,000",
    priceNum: 180000,
    status: "reserved",
    image: "/units/pexels-fotoaibe-1571460.jpg",
  },
  {
    slug: "la-joya-studio",
    title: "La Joya — Stüdyo",
    cityLabel: "Girne",
    city: "girne",
    type: "studio",
    size: "45 m²",
    price: "€120,000",
    priceNum: 120000,
    status: "sold",
    image: "/IMG_0110.JPG",
  },
  // ⬇️ add more units here
];

/* ---------------- Component ---------------- */
export default function UnitsSection() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"" | UnitItem["type"]>("");
  const [status, setStatus] = useState<"" | NonNullable<UnitItem["status"]>>("");
  const [city, setCity] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sort, setSort] = useState<"price-desc" | "price-asc" | "name-asc">("price-desc");

  const filtered = useMemo(() => {
    let list = [...UNITS];

    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((u) =>
        `${u.title} ${u.cityLabel} ${u.type} ${u.price || ""}`.toLowerCase().includes(s)
      );
    }
    if (type) list = list.filter((u) => u.type === type);
    if (status) list = list.filter((u) => u.status === status);
    if (city) list = list.filter((u) => (u.city || "").toLowerCase() === city.toLowerCase());

    const min = Number(minPrice || 0);
    const max = Number(maxPrice || 0);
    if (min || max) {
      list = list.filter((u) => {
        const p = u.priceNum ?? moneyToNumber(u.price);
        if (!p) return false;
        if (min && p < min) return false;
        if (max && p > max) return false;
        return true;
      });
    }

    if (sort === "name-asc") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "price-asc")
      list.sort((a, b) => (a.priceNum ?? 0) - (b.priceNum ?? 0));
    else list.sort((a, b) => (b.priceNum ?? 0) - (a.priceNum ?? 0));

    return list;
  }, [q, type, status, city, minPrice, maxPrice, sort]);

  const reset = () => {
    setQ("");
    setType("");
    setStatus("");
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setSort("price-desc");
  };

  return (
    <section className="bg-white text-[#141517] relative">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(32rem 22rem at 6% 0%, ${TEAL}10, transparent 70%),
            radial-gradient(28rem 18rem at 100% 100%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Tüm Birimler</h1>
            <p className="mt-2 text-sm text-black/60">
              Proje bağımsız, arama ve filtrelerle doğru daireyi bulun.
            </p>
          </div>
          <div className="text-sm text-black/60">
            {filtered.length} sonuç
          </div>
        </div>

        {/* Filters */}
        <div
          className="mt-6 rounded-2xl p-4 sm:p-5"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.82))",
            border: "1px solid rgba(20,21,23,0.10)",
            boxShadow: "0 14px 28px rgba(0,0,0,0.06)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <input
                placeholder="Ara: 2+1, İskele, proje adı…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-full px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(20,21,23,0.10)",
                  color: "rgba(20,21,23,0.9)",
                }}
              />
              {!!q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(20,21,23,0.06)",
                    border: "1px solid rgba(20,21,23,0.10)",
                  }}
                >
                  Temizle
                </button>
              )}
            </div>
            <div className="flex gap-2 sm:justify-end">
              <button
                onClick={reset}
                className="text-xs px-3 py-2 rounded-full"
                style={{
                  background: `${ORANGE}14`,
                  color: ORANGE,
                  border: `1px solid ${ORANGE}33`,
                }}
              >
                Sıfırla
              </button>
            </div>
          </div>

          {/* Selects */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
<Select value={type} onChange={setType} label="Tip (Hepsi)">
                <option value="">Tip (Hepsi)</option>
              <option value="studio">Studio</option>
              <option value="1-plus-1">1+1</option>
              <option value="2-plus-1">2+1</option>
              <option value="3-plus-1">3+1</option>
            </Select>

<Select value={status} onChange={setStatus} label="Durum (Hepsi)">
                <option value="">Durum (Hepsi)</option>
              <option value="for-sale">Satılık</option>
              <option value="reserved">Rezerve</option>
              <option value="sold">Satıldı</option>
            </Select>

            <Select value={city} onChange={(v) => setCity(v)} label="Bölge (Hepsi)">
              <option value="">Bölge (Hepsi)</option>
              <option value="iskele">İskele (Mağusa)</option>
              <option value="magusa">Mağusa</option>
              <option value="girne">Girne</option>
              <option value="lefkosha">Lefkoşa</option>
            </Select>

            {/* Price range */}
            <div
              className="flex items-center gap-2 rounded-full px-3 py-2 border"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(20,21,23,0.10)",
              }}
              aria-label="Fiyat Aralığı"
            >
              <input
                type="number"
                inputMode="numeric"
                placeholder="Min €"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 bg-transparent text-sm outline-none"
              />
              <span className="text-black/40">—</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="Maks €"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 bg-transparent text-sm outline-none"
              />
            </div>

<Select value={sort} onChange={setSort} label="Sırala">
  
                <option value="price-desc">Fiyat (Yüksek → Düşük)</option>
              <option value="price-asc">Fiyat (Düşük → Yüksek)</option>
              <option value="name-asc">İsim (A → Z)</option>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="mt-6 text-sm text-black/60">Sonuç bulunamadı.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((u) => (
              <UnitCard key={u.slug} item={u} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Helpers ---------------- */
function moneyToNumber(s?: string) {
  if (!s) return undefined;
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

/* ---------------- Little UI helpers ---------------- */
function Select<T extends string>({
  value,
  onChange,
  label,
  children,
}: {
  value: T;
  onChange: (v: T) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-full px-3 py-2.5 text-sm outline-none"
        style={{
          background: "rgba(20,21,23,0.05)",
          border: "1px solid rgba(20,21,23,0.10)",
          color: "rgba(20,21,23,0.9)",
        }}
        aria-label={label}
      >
        {children}
      </select>
    </div>
  );
}


/* ---------------- Card ---------------- */
function UnitCard({ item }: { item: UnitItem }) {
  const href = `/units/${item.slug}`;

  // Solid, readable status pill colors
  const statusStyle =
    item.status === "sold"
      ? { bg: "rgba(20,21,23,0.85)", color: "#fff" }
      : item.status === "reserved"
      ? { bg: ORANGE, color: "#fff" }
      : { bg: TEAL, color: "#fff" };

  const statusLabel =
    item.status === "for-sale" ? "Satılık" : item.status === "reserved" ? "Rezerve" : "Satıldı";

  const typeLabel = item.type.replace("-plus-", "+").replace(/^studio$/i, "Studio");

  return (
    <Link
      href={href}
      className="group block rounded-3xl overflow-hidden transition-transform hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.86))",
        border: `1px solid rgba(20,21,23,0.09)`,
        boxShadow: "0 18px 36px rgba(0,0,0,0.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image || "/images/placeholder.jpg"}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {item.status && (
          <span
            className="absolute left-3 top-3 text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{
              background: statusStyle.bg,
              color: statusStyle.color,
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            }}
          >
            {statusLabel}
          </span>
        )}

        {/* subtle bottom gradient for depth */}
        <div
          className="absolute inset-x-0 bottom-0 h-20"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.10), transparent)" }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
        <div className="mt-1 text-xs text-black/65">{item.cityLabel}</div>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
          {item.size && badge(item.size)}
          {item.price && badge(item.price)}
          {typeLabel && badge(typeLabel)}
        </div>
      </div>
    </Link>
  );
}

function badge(text: string) {
  return (
    <span
      className="px-2.5 py-1 rounded-full"
      style={{
        background: "rgba(20,21,23,0.06)",
        border: "1px solid rgba(20,21,23,0.10)",
        color: "rgba(20,21,23,0.88)",
      }}
    >
      {text}
    </span>
  );
}
