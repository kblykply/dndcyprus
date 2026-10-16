// app/components/en/land/LandPlanningInfrastructure.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Card = {
  title: string;
  desc?: string;
  image: string;                      // public/ path
  tag: "Planning" | "Infrastructure"; // pill label
  accent?: "teal" | "orange";
};

type Props = {
  title?: ReactNode;
  subtitle?: string;
  items?: Card[]; // override to fully control cards
};

const DEFAULT_ITEMS: Card[] = [
  { title: "Zoning Basis", desc: "Development under Chapter 96 — planning in line with local regulations.", image: "/zon.jpg", tag: "Planning", accent: "teal" },
  { title: "Permitted Typologies", desc: "Single-storey villas, semi-detached villas and multi-storey apartment scenarios.", image: "/vil.jpg", tag: "Planning", accent: "orange" },
  { title: "Height Information", desc: "For information purposes: on an average plot, development up to ~5 floors is possible.", image: "/apart.jpg", tag: "Planning", accent: "teal" },
  { title: "Infrastructure Works", desc: "Ongoing works in the area for road, electricity and water infrastructure.", image: "/water.jpg", tag: "Infrastructure", accent: "orange" },
  { title: "Parcel & Title Deed", desc: "Parceling and title deed processes are prepared / at an advanced stage.", image: "/tapu.jpg", tag: "Infrastructure", accent: "teal" },
];

export default function LandPlanningInfrastructure({
  title = <>Planning & <b>Infrastructure</b></>,
  subtitle = "Zoning principles and the plot’s readiness status are summarized with visuals. Final approvals are subject to the relevant authorities.",
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
    <section className="az-section flush" aria-label="Planning & Infrastructure — Image Cards">
      <div className="az-head row" style={{ padding: "0 var(--edge)", marginBottom: 30 }}>
        <div>
          <span className="az-kicker rv">Zoning & Readiness</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>
        <div className="az-ctrl rv d2">
          <button type="button" aria-label="Previous" onClick={() => go(-1)}>←</button>
          <button type="button" aria-label="Next" onClick={() => go(1)}>→</button>
        </div>
      </div>

      <div className="az-car" ref={car} role="group" aria-roledescription="carousel" aria-label="Planning & Infrastructure cards">
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
