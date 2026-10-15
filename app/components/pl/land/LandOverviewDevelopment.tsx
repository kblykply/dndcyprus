// app/components/pl/land/LandOverviewDevelopment.tsx
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
  heading: <>Charakterystyka i <b>potencjał zabudowy</b></>,
  lead:
    "Etap II Geçitkale leży na rozwijającym się terenie, otoczonym nowymi osiedlami. Teren objęty jest planem Fasıl 96 i nadaje się pod parterowe wille, bliźniaki oraz wielokondygnacyjne budynki mieszkalne.",
  mainImage: "/gecitkaleimage.jpg",
  mainImageAlt: "Geçitkale, etap II — widok ogólny",
  bullets: [
    {
      text: "Przeznaczenie terenu: Fasıl 96 — dopuszczalna zabudowa: willa parterowa, willa bliźniacza, budynek wielokondygnacyjny.",
      accent: "teal",
      image: "/lagoon-verde/1.jpg",
      alt: "Schemat przeznaczenia terenu",
    },
    {
      text: "Orientacyjna zabudowa na przeciętnej działce: do ~5 kondygnacji (informacyjnie).",
      accent: "orange",
      image: "/lagoon-verde/2.jpg",
      alt: "Ikona liczby kondygnacji",
    },
    {
      text: "Atut lokalizacji: Long Beach 12 min, Famagusta 18 min, lotnisko Ercan 25 min.",
      accent: "teal",
      image: "/ercan.jpg",
      alt: "Ikona lokalizacji na mapie",
    },
    {
      text: "W okolicy trwają prace infrastrukturalne; parcelacja i akty własności są już przygotowane.",
      accent: "orange",
      image: "/elec.jpg",
      alt: "Zdjęcie infrastruktury",
    },
  ],
  scenarioTitle: "Przykładowy scenariusz zabudowy",
  scenarioNote:
    "Na wzór etapu I: na przeciętnej działce można zrealizować budynek o 5–6 kondygnacjach z około 15 mieszkaniami (wyłącznie przykład, wymaga zgody właściwych instytucji).",
  disclaimer:
    "*Informacje mają charakter wyłącznie promocyjny; ostateczna realizacja wymaga zgody właściwych urzędów dla każdej działki z osobna.",
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
      <span className={`pill${b.accent === "orange" ? " gold" : ""}`}>{b.accent === "teal" ? "Fasıl 96" : "Informacja"}</span>
      <p style={{ fontSize: 15, maxWidth: "40ch" }}>{b.text}</p>
    </article>
  );
}

export default function LandOverviewDevelopment() {
  const { heading, lead, mainImage, mainImageAlt, bullets, scenarioTitle, scenarioNote, disclaimer } = DATA;

  return (
    <section className="az-section" aria-label="Geçitkale — charakterystyka i potencjał zabudowy">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Potencjał zabudowy</span>
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
