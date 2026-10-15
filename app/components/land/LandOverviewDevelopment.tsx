// app/components/land/LandOverviewDevelopment.tsx
import type { ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Bullet = {
  text: string;
  accent?: "teal" | "orange";
  /** Kart görseli */
  image?: string;
  /** Kısa alt metin */
  alt?: string;
};

type SectionData = {
  heading: ReactNode;
  lead: string;
  /** Senaryo kartının görseli */
  mainImage: string;
  mainImageAlt?: string;
  bullets: Bullet[];
  scenarioTitle: string;
  scenarioNote?: string;
  disclaimer?: string;
};

// ====== DATA ======
const DATA: SectionData = {
  heading: <>Genel Bakış & <b>Gelişim Potansiyeli</b></>,
  lead:
    "Geçitkale Etap II; Fasıl 96 kapsamında, tek katlı/ikiz villa ve çok katlı apartman tipolojilerine uygun planlanan, yeni konut bölgeleriyle çevrili gelişen bir lokasyondadır.",
  mainImage: "/gecitkaleimage.jpg",
  mainImageAlt: "Geçitkale Etap II genel görünüm",
  bullets: [
    {
      text: "Zonlama: Fasıl 96 — izinli tipolojiler: tek katlı villa, ikiz villa, çok katlı apartman.",
      accent: "teal",
      image: "/lagoon-verde/1.jpg",
      alt: "Zonlama şeması",
    },
    {
      text: "Ortalama bir arsa için inşaat izni: ~5 kata kadar (bilgi amaçlı).",
      accent: "orange",
      image: "/lagoon-verde/2.jpg",
      alt: "Kat yüksekliği simgesi",
    },
    {
      text: "Konum avantajı: Long Beach 12 dk, Gazimağusa 18 dk, Ercan Havalimanı 25 dk.",
      accent: "teal",
      image: "/ercan.jpg",
      alt: "Harita konum simgesi",
    },
    {
      text: "Bölgede altyapı çalışmaları devam ediyor; parselasyon ve tapu süreçleri hazır.",
      accent: "orange",
      image: "/elec.jpg",
      alt: "Altyapı görseli",
    },
  ],
  scenarioTitle: "Örnek Gelişim Senaryosu",
  scenarioNote:
    "Etap I referansı: ortalama parselde 5–6 katlı, 15 daireli apartman senaryosu mümkündür (örnek, kurumsal onaya tabidir).",
  disclaimer:
    "*Bilgiler tanıtım amaçlıdır; nihai uygulama parsel özelinde yetkili kurumların onayına tabidir.",
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
      <span className={`pill${b.accent === "orange" ? " gold" : ""}`}>{b.accent === "teal" ? "Fasıl 96" : "Bilgi"}</span>
      <p style={{ fontSize: 15, maxWidth: "40ch" }}>{b.text}</p>
    </article>
  );
}

export default function LandOverviewDevelopment() {
  const { heading, lead, mainImage, mainImageAlt, bullets, scenarioTitle, scenarioNote, disclaimer } = DATA;

  return (
    <section className="az-section" aria-label="Geçitkale — Genel Bakış & Gelişim Potansiyeli">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Gelişim Potansiyeli</span>
          <h2 className="az-h2 sm rv d1">{heading}</h2>
          <p className="az-lead rv d2">{lead}</p>
        </div>

        <div className="az-grid">
          {bullets.slice(0, 2).map((b, i) => <BulletTile key={i} b={b} i={i} />)}

          {/* Senaryo kartı: masaüstünde sağda iki satır boyu */}
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
