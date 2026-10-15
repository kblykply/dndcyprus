// app/components/de/land/LandOverviewDevelopment.tsx
import type { ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Bullet = {
  text: string;
  accent?: "teal" | "orange";
  /** Card visual */
  image?: string;
  /** Short alt text */
  alt?: string;
};

type SectionData = {
  heading: ReactNode;
  lead: string;
  /** Scenario card visual */
  mainImage: string;
  mainImageAlt?: string;
  bullets: Bullet[];
  scenarioTitle: string;
  scenarioNote?: string;
  disclaimer?: string;
};

// ====== DATA ======
const DATA: SectionData = {
  heading: <>Überblick & <b>Entwicklungspotenzial</b></>,
  lead:
    "Geçitkale Phase II liegt in einer wachsenden Gegend, umgeben von neuen Wohngebieten. Die Planung nach Fasıl 96 erlaubt eingeschossige Villen, Doppelvillen und mehrgeschossige Apartmenthäuser.",
  mainImage: "/gecitkaleimage.jpg",
  mainImageAlt: "Gesamtansicht Geçitkale Phase II",
  bullets: [
    {
      text: "Baurecht: Fasıl 96 – zulässige Bauformen: eingeschossige Villa, Doppelvilla, mehrgeschossiges Apartmenthaus.",
      accent: "teal",
      image: "/lagoon-verde/1.jpg",
      alt: "Schema der Bebauung",
    },
    {
      text: "Richtwert für die Bebauung einer durchschnittlichen Parzelle: bis zu ~5 Geschosse (zur Information).",
      accent: "orange",
      image: "/lagoon-verde/2.jpg",
      alt: "Symbol für Geschosshöhe",
    },
    {
      text: "Lagevorteil: Long Beach 12 Min., Famagusta 18 Min., Flughafen Ercan 25 Min.",
      accent: "teal",
      image: "/ercan.jpg",
      alt: "Symbol für Kartenstandort",
    },
    {
      text: "Die Erschließungsarbeiten in der Gegend laufen; Parzellierung und Grundbuchverfahren sind geregelt.",
      accent: "orange",
      image: "/elec.jpg",
      alt: "Darstellung der Infrastruktur",
    },
  ],
  scenarioTitle: "Beispielhaftes Bebauungsszenario",
  scenarioNote:
    "Referenz Phase I: Auf einer durchschnittlichen Parzelle ist als Szenario ein Gebäude mit 5–6 Geschossen und rund 15 Wohnungen realisierbar (nur Beispiel, vorbehaltlich behördlicher Genehmigung).",
  disclaimer:
    "*Alle Angaben dienen nur Werbezwecken; die endgültige Umsetzung bedarf der Genehmigung der zuständigen Behörden für jede einzelne Parzelle.",
};

const SIZES = "(max-width: 639px) calc(100vw - 32px), (max-width: 999px) 50vw, 33vw";

function BulletTile({ b, i }: { b: Bullet; i: number }) {
  return (
    <article
      className={`az-tile img col-span-12 min-[640px]:col-span-6 min-[1000px]:col-span-4 rv d${i % 4}`}
      style={{ minHeight: 240 }}
    >
      {b.image ? (
        <div className="absolute inset-0" style={{ zIndex: -2 }} aria-hidden>
          <DeferredFillImage fill quality={65} sizes={SIZES} src={b.image} alt={b.alt ?? ""} className="bg object-cover" />
        </div>
      ) : null}
      <span className={`pill${b.accent === "orange" ? " gold" : ""}`}>{b.accent === "teal" ? "Fasıl 96" : "Info"}</span>
      <p style={{ fontSize: 15, maxWidth: "40ch" }}>{b.text}</p>
    </article>
  );
}

export default function LandOverviewDevelopment() {
  const { heading, lead, mainImage, mainImageAlt, bullets, scenarioTitle, scenarioNote, disclaimer } = DATA;

  return (
    <section className="az-section" aria-label="Geçitkale – Überblick & Entwicklungspotenzial">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Entwicklungspotenzial</span>
          <h2 className="az-h2 sm rv d1">{heading}</h2>
          <p className="az-lead rv d2">{lead}</p>
        </div>

        <div className="az-grid">
          {bullets.slice(0, 2).map((b, i) => <BulletTile key={i} b={b} i={i} />)}

          {/* Scenario card: two rows tall on the right on desktop */}
          <article
            className="az-tile img col-span-12 min-[1000px]:col-span-4 min-[1000px]:row-span-2 rv d2"
            style={{ minHeight: 400 }}
          >
            <div className="absolute inset-0" style={{ zIndex: -2 }} aria-hidden>
              <DeferredFillImage
                fill
                quality={65}
                sizes="(max-width: 999px) calc(100vw - 32px), 33vw"
                src={mainImage}
                alt={mainImageAlt ?? ""}
                className="bg object-cover"
              />
            </div>
            <h3>{scenarioTitle}</h3>
            {scenarioNote && <p style={{ fontSize: 15 }}>{scenarioNote}</p>}
            {disclaimer && <p style={{ fontSize: 12, opacity: 0.8, marginTop: 10 }}>{disclaimer}</p>}
          </article>

          {bullets.slice(2).map((b, i) => <BulletTile key={i + 2} b={b} i={i + 2} />)}
        </div>
      </div>
    </section>
  );
}
