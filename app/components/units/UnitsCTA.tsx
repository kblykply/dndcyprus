// components/units/UnitsCTA.tsx
"use client";

import React from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

export default function UnitsCTA({
  title = "Aradığınız Dairenin Tam Zamanı",
  subtitle = "2+1, 1+1 veya stüdyo… İhtiyacınıza en uygun daire için birlikte ilerleyelim.",
  primary = { label: "Uzmanla Görüş", href: "/contact?from=units" },
  secondary = { label: "Tüm Üniteleri Gör", href: "/units" },
  bgImage ="/units/pexels-fotoaibe-1571460.jpg" 
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  bgImage?: string | null;
}) {
  return (
    <section
      aria-label="Units — CTA"
      className="relative overflow-hidden"
      style={{ background: "#fff", color: "#141517" }}
    >
      {/* optional background image */}
      {bgImage && (
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* soft wash for readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: bgImage
            ? `
              linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.92)),
              radial-gradient(42rem 28rem at 8% 0%, ${TEAL}10, transparent 70%),
              radial-gradient(36rem 24rem at 100% 100%, ${ORANGE}12, transparent 70%)
            `
            : `
              radial-gradient(42rem 28rem at 8% 0%, ${TEAL}10, transparent 70%),
              radial-gradient(36rem 24rem at 100% 100%, ${ORANGE}12, transparent 70%)
            `,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div
          className="mx-auto max-w-3xl rounded-3xl p-8 md:p-10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
            border: "1px solid rgba(20,21,23,0.10)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.06)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.72)" }}>
            {subtitle}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={primary.href}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: TEAL, color: "#fff", boxShadow: `0 12px 28px ${TEAL}33` }}
            >
              {primary.label}
            </a>
            <a
              href={secondary.href}
              className="px-6 py-2.5 rounded-full text-sm font-medium"
              style={{
                background: `${ORANGE}14`,
                color: ORANGE,
                border: `1px solid ${ORANGE}33`,
              }}
            >
              {secondary.label}
            </a>
          </div>

          {/* tiny confidence row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            {[
              { k: "Hızlı Dönüş", v: "<24 saat" },
              { k: "Güven", v: "Şeffaf Süreç" },
              { k: "Esneklik", v: "Farklı Tipler" },
              { k: "Destek", v: "Satış Sonrası" },
            ].map((m, i) => (
              <div
                key={m.k + i}
                className="rounded-xl px-3 py-2"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
                  border: `1px solid ${i % 2 ? ORANGE : TEAL}33`,
                  boxShadow: `0 8px 18px ${(i % 2 ? ORANGE : TEAL)}22`,
                }}
              >
                <div className="opacity-80">{m.k}</div>
                <div className="font-semibold">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
