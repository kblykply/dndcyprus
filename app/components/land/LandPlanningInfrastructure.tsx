// app/components/land/LandPlanningInfrastructure.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Card = {
  title: string;
  desc?: string;
  image: string;               // public/ path
  tag: "Planlama" | "Altyapı"; // pill label
  accent?: "teal" | "orange";
};

type Props = {
  title?: ReactNode;
  subtitle?: string;
  items?: Card[]; // override to fully control cards
};

const DEFAULT_ITEMS: Card[] = [
  { title: "Zonlama Dayanağı", desc: "Fasıl 96 kapsamında gelişim — yerel mevzuata uygun planlama.", image: "/zon.jpg", tag: "Planlama", accent: "teal" },
  { title: "İzinli Tipolojiler", desc: "Tek katlı villa, ikiz villa ve çok katlı apartman senaryoları.", image: "/vil.jpg", tag: "Planlama", accent: "orange" },
  { title: "Yükseklik Bilgisi", desc: "Bilgi amaçlı: ortalama bir parselde ~5 kata kadar imkân.", image: "/apart.jpg", tag: "Planlama", accent: "teal" },
  { title: "Altyapı Çalışmaları", desc: "Bölgede yol, elektrik ve su altyapısı için çalışmalar sürüyor.", image: "/water.jpg", tag: "Altyapı", accent: "orange" },
  { title: "Parsel & Tapu", desc: "Parselasyon ve tapu süreçlerinde hazır/ilerlemiş durum.", image: "/tapu.jpg", tag: "Altyapı", accent: "teal" },
];

export default function LandPlanningInfrastructure({
  title = <>Planlama & <b>Altyapı</b></>,
  subtitle = "Zonlama esasları ve arsanın hazır bulunuşluk durumu, görsellerle özetlenmiştir. Nihai izinler ilgili kurumların onayına tabidir.",
  items,
}: Props) {
  const data = items ?? DEFAULT_ITEMS;

  // Ana sayfa proje karuseli ile aynı kaydırma mantığı (scroll-snap + oklar + noktalar)
  const car = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const step = () => (car.current?.querySelector<HTMLElement>(".az-pc")?.getBoundingClientRect().width ?? 300) + 16;
  const go = (d: number) => car.current?.scrollBy({ left: d * step(), behavior: "smooth" });
  useEffect(() => {
    const el = car.current; if (!el) return;
    const onScroll = () => setI(Math.round(el.scrollLeft / step()));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="az-section flush" aria-label="Planlama & Altyapı — Görsel Kartlar">
      <div className="az-head row" style={{ padding: "0 var(--gutter)", marginBottom: 30 }}>
        <div>
          <span className="az-kicker rv">Zonlama & Hazırlık</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>
        <div className="az-ctrl rv d2">
          <button type="button" aria-label="Önceki" onClick={() => go(-1)}>←</button>
          <button type="button" aria-label="Sonraki" onClick={() => go(1)}>→</button>
        </div>
      </div>

      <div className="az-car" ref={car} role="group" aria-roledescription="carousel" aria-label="Planlama & Altyapı kartları">
        {data.map((card, k) => (
          <article key={card.title + k} className="az-pc">
            <DeferredFillImage
              fill
              src={card.image}
              alt=""
              quality={65}
              sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 440px"
              className="object-cover"
              aria-hidden
            />
            <div className="top">
              <span className={`az-st${card.accent === "orange" ? " gold" : ""}`}>{card.tag}</span>
            </div>
            <div className="in">
              <h3>{card.title}</h3>
              {card.desc ? <p>{card.desc}</p> : null}
            </div>
          </article>
        ))}
      </div>
      <div className="az-cdots" aria-hidden>
        {data.map((c, k) => <i key={c.title + k} className={k === i ? "on" : undefined} />)}
      </div>
    </section>
  );
}
