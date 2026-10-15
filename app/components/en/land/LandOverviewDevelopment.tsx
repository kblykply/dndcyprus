// app/components/en/land/LandOverviewDevelopment.tsx
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
  heading: <>Overview & <b>Development Potential</b></>,
  lead:
    "Geçitkale Phase II is located in a developing area surrounded by new residential zones and planned under Fasıl 96, suitable for single-storey/twin villas and multi-storey apartment typologies.",
  mainImage: "/gecitkaleimage.jpg",
  mainImageAlt: "Geçitkale Phase II general view",
  bullets: [
    {
      text: "Zoning: Fasıl 96 — permitted typologies: single-storey villa, twin villa, multi-storey apartment.",
      accent: "teal",
      image: "/lagoon-verde/1.jpg",
      alt: "Zoning scheme",
    },
    {
      text: "Indicative construction allowance for an average plot: up to ~5 floors (for information purposes).",
      accent: "orange",
      image: "/lagoon-verde/2.jpg",
      alt: "Floor height icon",
    },
    {
      text: "Location advantage: Long Beach 12 min, Famagusta 18 min, Ercan Airport 25 min.",
      accent: "teal",
      image: "/ercan.jpg",
      alt: "Map location icon",
    },
    {
      text: "Infrastructure works in the area are ongoing; parceling and title deed processes are in place.",
      accent: "orange",
      image: "/elec.jpg",
      alt: "Infrastructure visual",
    },
  ],
  scenarioTitle: "Sample Development Scenario",
  scenarioNote:
    "Phase I reference: on an average plot, a 5–6 storey building with around 15 apartments is feasible as a scenario (example only, subject to institutional approval).",
  disclaimer:
    "*Information is for promotional purposes only; final implementation is subject to approval by the competent authorities on a parcel-by-parcel basis.",
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
    <section className="az-section" aria-label="Geçitkale — Overview & Development Potential">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Development Potential</span>
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
