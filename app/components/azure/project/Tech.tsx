"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectTech } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import { Icon } from "./icons";
import ProjectHead, { splitTitle } from "./ProjectHead";
import "../meridian.css";

// Teknik donanım: yatay kaydırılan 4:5 görsel kartlar, alt cam etiket, ok düğmeleri ve noktalar.
export default function Tech({ d, name, id, locale }: { d: ProjectTech; name: string; id: string; locale: Locale }) {
  const t = PROJECT_UI[locale].tech;
  const car = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const step = () => (car.current?.querySelector<HTMLElement>(".mr-card")?.getBoundingClientRect().width ?? 300) + 22;
  const go = (dir: number) => car.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  useEffect(() => {
    const el = car.current; if (!el) return;
    const onScroll = () => setI(Math.round(el.scrollLeft / step()));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="az-section az-proj mr" id={id}>
      <div className="az-wrap">
        <div className="az-head row">
          <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} className="mb-0" />
          <div className="az-ctrl rv d2">
            <button type="button" aria-label={t.prev} onClick={() => go(-1)}>←</button>
            <button type="button" aria-label={t.next} onClick={() => go(1)}>→</button>
          </div>
        </div>
        <div className="mr-cards rv d1" ref={car} role="group" aria-roledescription="carousel" aria-label={t.list}>
          {d.items.map((c, k) => (
            <article key={c.title + k} className="mr-card">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.title} loading="lazy" decoding="async" draggable={false} />
              </figure>
              <div className="cap">
                <span className="mr-mono"><Icon name={c.icon} size={18} /> {String(k + 1).padStart(2, "0")} · {d.badge}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="az-cdots" aria-hidden>{d.items.map((c, k) => <i key={c.title + k} className={k === i ? "on" : undefined} />)}</div>
      </div>
    </section>
  );
}
