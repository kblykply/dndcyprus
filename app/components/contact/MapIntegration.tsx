// app/components/MapIntegration.tsx
"use client";

import React from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Office = {
  id: string;
  label: string;
  address: string;
  mapUrl: string; // Google Maps Embed link
  accent?: "teal" | "orange";
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  offices?: Office[];
};

export default function MapIntegration({
  kicker = "DND Cyprus",
  title = "Ofislerimiz",
  subtitle = "Merkez ve satış ofislerimizin konumunu haritada bulabilirsiniz.",
  offices = [
    {
      id: "hq",
      label: "Merkez Ofis",
      address: "Örnek Cad. No:12, Lefkoşa, Kuzey Kıbrıs",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.157!2d33.3823!3d35.1856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDExJzA4LjAiTiAzM8KwMjInNTYuMiJF!5e0!3m2!1str!2str!4v0000000000",
      accent: "teal",
    },
    {
      id: "sales",
      label: "Satış Ofisi",
      address: "Sahil Yolu 45, İskele, Kuzey Kıbrıs",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.157!2d33.8910!3d35.2810!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE2JzUxLjYiTiAzM8KwNTMnMjcuNiJF!5e0!3m2!1str!2str!4v0000000000",
      accent: "orange",
    },
  ],
}: Props) {
  return (
    <section
      aria-label="Ofis Konumları"
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#141517",
        ["--stroke" as any]: "rgba(20,21,23,0.08)",
      }}
    >
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
        <div className="max-w-2xl mb-10">
          <span
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(20,21,23,0.05)",
              border: "1px solid var(--stroke)",
              color: TEAL,
              backdropFilter: "blur(8px)",
            }}
          >
            {kicker}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            {title}
          </h2>
          <p className="mt-2 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </div>

        {/* grid of offices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((o) => {
            const color = o.accent === "orange" ? ORANGE : TEAL;
            return (
              <div
                key={o.id}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                  border: "1px solid var(--stroke)",
                  boxShadow:
                    "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="aspect-[16/9]">
                  <iframe
                    title={o.label}
                    src={o.mapUrl}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{o.label}</div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(20,21,23,0.65)" }}
                    >
                      {o.address}
                    </div>
                  </div>
                  <a
                    href={o.mapUrl.replace("embed?", "")} // open real map in tab
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: `${color}14`,
                      color,
                      border: `1px solid ${color}33`,
                    }}
                  >
                    Haritada Aç
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
