// app/components/de/land/LandPlanningInfrastructure.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Card = {
  title: string;
  desc?: string;
  image: string;                      // public/ path
  tag: "Planung" | "Infrastruktur"; // pill label
  accent?: "teal" | "orange";
};

type Props = {
  title?: ReactNode;
  subtitle?: string;
  items?: Card[]; // override to fully control cards
};

const DEFAULT_ITEMS: Card[] = [
  { title: "Baurechtliche Grundlage", desc: "Bebauung nach Fasıl 96 – Planung im Einklang mit den örtlichen Vorschriften.", image: "/zon.jpg", tag: "Planung", accent: "teal" },
  { title: "Zulässige Bauformen", desc: "Eingeschossige Villen, Doppelvillen und Szenarien für mehrgeschossige Apartmenthäuser.", image: "/vil.jpg", tag: "Planung", accent: "orange" },
  { title: "Angaben zur Höhe", desc: "Zur Information: Auf einer durchschnittlichen Parzelle ist eine Bebauung mit bis zu ~5 Geschossen möglich.", image: "/apart.jpg", tag: "Planung", accent: "teal" },
  { title: "Erschließungsarbeiten", desc: "In der Gegend laufen Arbeiten an Straßen, Strom- und Wasserversorgung.", image: "/water.jpg", tag: "Infrastruktur", accent: "orange" },
  { title: "Parzelle & Grundbuch", desc: "Parzellierung und Grundbuchverfahren sind vorbereitet bzw. weit fortgeschritten.", image: "/tapu.jpg", tag: "Infrastruktur", accent: "teal" },
];

export default function LandPlanningInfrastructure({
  title = <>Planung & <b>Infrastruktur</b></>,
  subtitle = "Baurechtliche Grundsätze und der Erschließungsstand des Grundstücks im Bild zusammengefasst. Die endgültigen Genehmigungen erteilen die zuständigen Behörden.",
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
    <section className="az-section flush" aria-label="Planung & Infrastruktur – Bildkarten">
      <div className="az-head row" style={{ padding: "0 var(--edge)", marginBottom: 30 }}>
        <div>
          <span className="az-kicker rv">Baurecht & Erschließung</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>
        <div className="az-ctrl rv d2">
          <button type="button" aria-label="Zurück" onClick={() => go(-1)}>←</button>
          <button type="button" aria-label="Weiter" onClick={() => go(1)}>→</button>
        </div>
      </div>

      <div className="az-car" ref={car} role="group" aria-roledescription="Karussell" aria-label="Karten zu Planung & Infrastruktur">
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
