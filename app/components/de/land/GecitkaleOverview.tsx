// app/components/de/land/GecitkaleOverview.tsx
import type { ReactNode } from "react";
import LazyYouTube from "@/app/components/LazyYouTube";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

export type Props = {
  title?: ReactNode;
  lead?: string;
  highlights?: string[];
  chips?: string[];
  imagePrimary?: string;    // fallback image if no video
  embedUrl?: string | null; // YouTube watch or embed URL; null => use image
};

export default function GecitkaleOverview({
  title = "Geçitkale im Überblick",
  lead = "Geçitkale Phase II liegt in einer Gegend mit hohem Potenzial, umgeben von neuen Wohngebieten. Die Planung nach Fasıl 96 erlaubt eingeschossige Villen, Doppelvillen und mehrgeschossige Apartmenthäuser.",
  highlights = [
    "Baurecht: Fasıl 96 – zulässige Bauformen: eingeschossige Villa, Doppelvilla, mehrgeschossiges Apartmenthaus",
    "Richtwert für die Bebauung einer durchschnittlichen Parzelle (zur Information): bis zu ~5 Geschosse",
    "Fahrzeiten: Long Beach 12 Min. • Famagusta 18 Min. • Flughafen Ercan 25 Min.",
    "Die Erschließungsarbeiten laufen; Parzellierung und Grundbuchverfahren sind geregelt",
  ],
  chips = ["Investitionsfreundlich", "Wohnorientiert", "Gut erreichbare Lage"],
  imagePrimary = "/gecitkale/gecitkale-1.jpg",
  embedUrl = "https://www.youtube.com/watch?v=fpGuMq5qIEk",
}: Props) {
  // Extract the YouTube id from a watch/short URL; fall back to the image otherwise
  const YT_ID = /(?:v=|\.be\/)([A-Za-z0-9_-]{6,})/.exec(embedUrl ?? "")?.[1] ?? null;

  return (
    <section className="az-section" aria-label="Geçitkale – Überblick">
      <div className="az-wrap">
        <div className="az-card rv grid grid-cols-1 min-[900px]:grid-cols-[1fr_1.1fr]">
          {/* Text */}
          <div className="p-6 sm:p-8 min-[900px]:p-12">
            <span className="az-kicker">Geçitkale Phase II</span>
            <h2 className="az-h2 sm">{title}</h2>
            <p className="az-lead">{lead}</p>

            <ul className="mt-6 grid list-none gap-3 p-0">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3" style={{ fontSize: 15, lineHeight: 1.5 }}>
                  <i
                    aria-hidden
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: i % 2 === 0 ? "var(--sea)" : "var(--coral)" }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="az-tags" style={{ marginTop: 22 }}>
              {chips.map((c) => <span key={c}>{c}</span>)}
            </div>
          </div>

          {/* Media: dark player box inside a light cell */}
          <div className="grid place-items-center p-3 sm:p-4 min-[900px]:p-6" style={{ background: "var(--sky-2)" }}>
            <div
              className="relative aspect-video w-full max-w-full overflow-hidden rounded-[22px]"
              style={{ background: "#000", boxShadow: "0 20px 50px rgba(13,35,38,.18)" }}
            >
              {YT_ID ? (
                <LazyYouTube
                  videoId={YT_ID}
                  title="Imagevideo Geçitkale"
                  posterAlt="Imagevideo Geçitkale"
                  playLabel="Video abspielen"
                  className="absolute inset-0"
                  query={`autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&playlist=${YT_ID}`}
                />
              ) : (
                <DeferredFillImage
                  fill
                  quality={65}
                  sizes="(min-width: 1280px) 740px, (min-width: 900px) 55vw, 100vw"
                  src={imagePrimary}
                  alt="Gesamtansicht des Grundstücks in Geçitkale"
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
