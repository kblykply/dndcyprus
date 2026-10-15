// app/components/ru/land/LandOverviewDevelopment.tsx
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
  heading: <>Обзор и <b>потенциал застройки</b></>,
  lead:
    "Гечиткале, II очередь — развивающийся район в окружении новых жилых кварталов. Участок спланирован по нормам Fasıl 96 и подходит для одноэтажных вилл, вилл-близнецов и многоэтажных жилых домов.",
  mainImage: "/gecitkaleimage.jpg",
  mainImageAlt: "Общий вид: Гечиткале, II очередь",
  bullets: [
    {
      text: "Зонирование: Fasıl 96 — допустимая застройка: одноэтажная вилла, вилла-близнец, многоэтажный жилой дом.",
      accent: "teal",
      image: "/lagoon-verde/1.jpg",
      alt: "Схема зонирования",
    },
    {
      text: "Ориентировочная этажность для участка средней площади: до ~5 этажей (для информации).",
      accent: "orange",
      image: "/lagoon-verde/2.jpg",
      alt: "Значок этажности",
    },
    {
      text: "Выгодное расположение: Long Beach — 12 мин, Фамагуста — 18 мин, аэропорт Эрджан — 25 мин.",
      accent: "teal",
      image: "/ercan.jpg",
      alt: "Значок расположения на карте",
    },
    {
      text: "В районе продолжаются инфраструктурные работы; межевание и оформление титулов собственности уже ведутся.",
      accent: "orange",
      image: "/elec.jpg",
      alt: "Инфраструктура",
    },
  ],
  scenarioTitle: "Пример сценария застройки",
  scenarioNote:
    "По опыту I очереди: на участке средней площади возможен 5–6-этажный дом примерно на 15 квартир (только пример; требуется согласование с ведомствами).",
  disclaimer:
    "*Информация носит рекламный характер; окончательный проект для каждого участка подлежит согласованию с компетентными органами.",
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
      <span className={`pill${b.accent === "orange" ? " gold" : ""}`}>{b.accent === "teal" ? "Fasıl 96" : "Инфо"}</span>
      <p style={{ fontSize: 15, maxWidth: "40ch" }}>{b.text}</p>
    </article>
  );
}

export default function LandOverviewDevelopment() {
  const { heading, lead, mainImage, mainImageAlt, bullets, scenarioTitle, scenarioNote, disclaimer } = DATA;

  return (
    <section className="az-section" aria-label="Гечиткале — обзор и потенциал застройки">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Потенциал застройки</span>
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
