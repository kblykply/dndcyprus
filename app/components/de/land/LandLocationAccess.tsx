// app/components/de/land/LandLocationAccess.tsx
"use client";

import DeferredIframe from "@/app/components/performance/DeferredIframe";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

type DriveTime = { label: string; minutes: number };
type SectionData = {
  heading: ReactNode;
  subhead?: string;
  center: { lat: number; lng: number };
  zoom: number;
  boundaryOverlay?: string; // optional transparent PNG with parcel outline over a base map
  driveTimes: DriveTime[];
  accessNotes?: string[];
  openInMapsHref?: string; // link to open in Google Maps
};

// ====== DATA (edit here) ======
const DATA: SectionData = {
  heading: <>Lage & <b>Anbindung</b></>,
  subhead:
    "Nah an Einrichtungen des täglichen Bedarfs, an der Küste und an den Hauptverkehrsstraßen. Die folgenden Angaben sind ungefähre Fahrzeiten.",
  // Set your parcel center (example values)
  center: { lat: 35.261, lng: 33.784 },
  zoom: 13,
  // If you have a pre-rendered boundary overlay PNG aligned to a base map screenshot, place it in /public
  boundaryOverlay: "", // e.g. "/land/gecitkale-boundary.png"
  driveTimes: [
    { label: "Long Beach", minutes: 12 },
    { label: "Famagusta", minutes: 18 },
    { label: "Flughafen Ercan", minutes: 25 },
    { label: "Zentrum İskele", minutes: 15 },
  ],
  accessNotes: [
    "Nahe der asphaltierten Straße mit schneller Anbindung an das regionale Verkehrsnetz.",
    "Geringe Hangneigung; regelmäßiger Zuschnitt für eine einfache Bebauungsplanung.",
    "Ruhige Umgebung in einem aufstrebenden Wohngebiet.",
  ],
  openInMapsHref: "https://www.google.com/maps?q=35.261,33.784&z=13", // update to exact coords
};

export default function LandLocationAccess() {
  const { heading, subhead, center, zoom, boundaryOverlay, driveTimes, accessNotes, openInMapsHref } = DATA;

  const [mode, setMode] = useState<"standard" | "satellite">("standard");

  // Build a simple Google Maps embed URL. For satellite, we add "&t=k".
  const embedUrl = useMemo(() => {
    const base = `https://www.google.com/maps?q=${center.lat},${center.lng}&z=${zoom}&output=embed`;
    return mode === "satellite" ? `${base}&t=k` : base;
  }, [center.lat, center.lng, zoom, mode]);

  const maxMinutes = Math.max(...driveTimes.map((d) => d.minutes));

  return (
    <section className="az-section az-loc" aria-label="Geçitkale – Lage & Anbindung">
      <div className="az-wrap">
        <div className="az-card rv">
          {/* Text: distance bars + notes */}
          <div className="t">
            <span className="az-kicker">Lage</span>
            <h2 className="az-h2 sm">{heading}</h2>
            {subhead ? <p>{subhead}</p> : null}

            <ul className="az-dist">
              {driveTimes.map((d) => (
                <li key={d.label} style={{ ["--w" as string]: d.minutes / maxMinutes } as CSSProperties}>
                  <span>{d.label}</span>
                  <b>{d.minutes} Min.</b>
                  <i />
                </li>
              ))}
            </ul>

            {accessNotes?.length ? (
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, color: "var(--sea)" }}>
                  Anbindung & Umgebung
                </div>
                <ul style={{ marginTop: 10, paddingLeft: 18, display: "grid", gap: 6, fontSize: 14, color: "var(--ink-60)" }}>
                  {accessNotes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            ) : null}

            {openInMapsHref ? (
              <div style={{ marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="az-btn sea sm" href={openInMapsHref} target="_blank" rel="noopener noreferrer">
                  In Google Maps öffnen
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                    <path d="M5 5h5V3H3v7h2V5z"></path>
                  </svg>
                </a>
              </div>
            ) : null}
          </div>

          {/* Map */}
          <div className="map">
            <DeferredIframe
              buttonLabel="Karte anzeigen"
              title="Lage des Projekts"
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Optional parcel overlay image (must be pre-aligned if used) */}
            {boundaryOverlay ? (
              <DeferredFillImage
                fill
                quality={75}
                sizes="(min-width: 1280px) 760px, (min-width: 900px) 50vw, 100vw"
                src={boundaryOverlay}
                alt="Eingezeichnete Grundstücksgrenze"
                className="pointer-events-none z-[5] object-contain opacity-80 mix-blend-multiply"
              />
            ) : null}

            {/* View toggle */}
            <div
              className="absolute right-4 top-4 z-10 flex gap-1 rounded-full p-1"
              role="group"
              aria-label="Kartenansicht"
              style={{
                background: "rgba(255,255,255,.82)",
                border: "1px solid rgba(255,255,255,.9)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(13,35,38,.12)",
              }}
            >
              <ToggleButton active={mode === "standard"} onClick={() => setMode("standard")}>Standard</ToggleButton>
              <ToggleButton active={mode === "satellite"} onClick={() => setMode("satellite")}>Satellit</ToggleButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== Subcomponents ====== */

function ToggleButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
      style={{
        background: active ? "var(--sea)" : "transparent",
        color: active ? "#fff" : "var(--ink-60)",
        fontFamily: "inherit",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
