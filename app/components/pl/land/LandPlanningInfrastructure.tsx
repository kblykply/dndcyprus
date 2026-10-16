// app/components/pl/land/LandPlanningInfrastructure.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Card = {
  title: string;
  desc?: string;
  image: string;                      // public/ path
  tag: "Planowanie" | "Infrastruktura"; // pill label
  accent?: "teal" | "orange";
};

type Props = {
  title?: ReactNode;
  subtitle?: string;
  items?: Card[]; // override to fully control cards
};

const DEFAULT_ITEMS: Card[] = [
  { title: "Podstawa planistyczna", desc: "Zabudowa w ramach Fasıl 96 — planowanie zgodne z lokalnymi przepisami.", image: "/zon.jpg", tag: "Planowanie", accent: "teal" },
  { title: "Dopuszczalna zabudowa", desc: "Warianty: parterowe wille, wille bliźniacze i wielokondygnacyjne budynki mieszkalne.", image: "/vil.jpg", tag: "Planowanie", accent: "orange" },
  { title: "Wysokość zabudowy", desc: "Orientacyjnie: na przeciętnej działce możliwa jest zabudowa do ~5 kondygnacji.", image: "/apart.jpg", tag: "Planowanie", accent: "teal" },
  { title: "Prace infrastrukturalne", desc: "W okolicy trwają prace przy drogach oraz sieciach elektrycznej i wodociągowej.", image: "/water.jpg", tag: "Infrastruktura", accent: "orange" },
  { title: "Parcelacja i akt własności", desc: "Procedury parcelacji i aktów własności są przygotowane lub na zaawansowanym etapie.", image: "/tapu.jpg", tag: "Infrastruktura", accent: "teal" },
];

export default function LandPlanningInfrastructure({
  title = <>Planowanie i <b>infrastruktura</b></>,
  subtitle = "Zasady przeznaczenia terenu i stan przygotowania działki w skrócie, na zdjęciach. Ostateczne zgody wydają właściwe urzędy.",
  items,
}: Props) {
  const data = items ?? DEFAULT_ITEMS;

  // Same scroll logic as the home projects carousel (scroll-snap + arrows + dots)
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
    <section className="az-section flush" aria-label="Planowanie i infrastruktura — karty ze zdjęciami">
      <div className="az-head row" style={{ padding: "0 var(--edge)", marginBottom: 30 }}>
        <div>
          <span className="az-kicker rv">Plan i gotowość działki</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>
        <div className="az-ctrl rv d2">
          <button type="button" aria-label="Poprzedni" onClick={() => go(-1)}>←</button>
          <button type="button" aria-label="Następny" onClick={() => go(1)}>→</button>
        </div>
      </div>

      <div className="az-car" ref={car} role="group" aria-roledescription="carousel" aria-label="Karty: planowanie i infrastruktura">
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
