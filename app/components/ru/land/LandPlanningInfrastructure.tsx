// app/components/ru/land/LandPlanningInfrastructure.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Card = {
  title: string;
  desc?: string;
  image: string;                      // public/ path
  tag: "Планирование" | "Инфраструктура"; // pill label
  accent?: "teal" | "orange";
};

type Props = {
  title?: ReactNode;
  subtitle?: string;
  items?: Card[]; // override to fully control cards
};

const DEFAULT_ITEMS: Card[] = [
  { title: "Основа зонирования", desc: "Застройка по нормам Fasıl 96 — планирование в соответствии с местными правилами.", image: "/zon.jpg", tag: "Планирование", accent: "teal" },
  { title: "Допустимая застройка", desc: "Одноэтажные виллы, виллы-близнецы и многоэтажные жилые дома.", image: "/vil.jpg", tag: "Планирование", accent: "orange" },
  { title: "Этажность", desc: "Для информации: на участке средней площади возможна застройка до ~5 этажей.", image: "/apart.jpg", tag: "Планирование", accent: "teal" },
  { title: "Инфраструктурные работы", desc: "В районе ведутся работы по прокладке дорог, электросетей и водоснабжения.", image: "/water.jpg", tag: "Инфраструктура", accent: "orange" },
  { title: "Межевание и титул", desc: "Межевание и оформление титулов собственности подготовлены или находятся на завершающей стадии.", image: "/tapu.jpg", tag: "Инфраструктура", accent: "teal" },
];

export default function LandPlanningInfrastructure({
  title = <>Планирование <b>и инфраструктура</b></>,
  subtitle = "Принципы зонирования и степень готовности участка — коротко и наглядно. Окончательные согласования остаются за компетентными органами.",
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
    <section className="az-section flush" aria-label="Планирование и инфраструктура — карточки">
      <div className="az-head row" style={{ padding: "0 var(--gutter)", marginBottom: 30 }}>
        <div>
          <span className="az-kicker rv">Зонирование и готовность</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>
        <div className="az-ctrl rv d2">
          <button type="button" aria-label="Назад" onClick={() => go(-1)}>←</button>
          <button type="button" aria-label="Далее" onClick={() => go(1)}>→</button>
        </div>
      </div>

      <div className="az-car" ref={car} role="group" aria-roledescription="карусель" aria-label="Карточки: планирование и инфраструктура">
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
