"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HOME } from "@/lib/azure/home";
import { PROJECTS, href, type Locale } from "@/lib/azure/site";

const LAND_TITLE: Record<Locale, string> = {
  tr: "Geçitkale Arazi Projesi",
  en: "Geçitkale Land Project",
  de: "Grundstücksprojekt Geçitkale",
  ru: "Земельный проект Гечиткале",
  pl: "Projekt gruntowy Geçitkale",
};

export default function ProjectsCarousel({ locale }: { locale: Locale }) {
  const t = HOME[locale].projects;
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
    <section className="az-section flush" id="projeler">
      <div className="az-head row" style={{ padding: "0 var(--gutter)", marginBottom: 30 }}>
        <div><span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2></div>
        <div className="az-ctrl rv d2">
          <button type="button" aria-label={t.prev} onClick={() => go(-1)}>←</button>
          <button type="button" aria-label={t.next} onClick={() => go(1)}>→</button>
        </div>
      </div>
      <div className="az-car" ref={car}>
        {PROJECTS.map((p) => p.slug === "gecitkale" ? (
          <Link key={p.slug} className="az-pc soon" href={href(locale, "/gecitkale")} prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/azure/gk-1.jpg" alt="" loading="lazy" />
            <div className="top"><span className="az-st gold">{t.soonKicker}</span></div>
            <div className="in"><small>{p.location[locale]}</small><h3>{LAND_TITLE[locale]}</h3><p>{p.blurb[locale]}</p><div className="glassrow">{t.soonCta} <i>→</i></div></div>
          </Link>
        ) : (
          <Link key={p.slug} className="az-pc" href={href(locale, `/${p.slug}`)} prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover} alt="" loading="lazy" />
            <div className="top">{p.award && <span className="az-st gold">{p.award[locale]}</span>}<span className="az-st">{p.status[locale]}</span></div>
            <div className="in"><small>{p.location[locale]}</small><h3>{p.name}</h3><p>{p.blurb[locale]}</p><div className="glassrow">{p.cta[locale]} <i>→</i></div></div>
          </Link>
        ))}
      </div>
      <div className="az-cdots" aria-hidden>{PROJECTS.map((p, k) => <i key={p.slug} className={k === i ? "on" : undefined} />)}</div>
    </section>
  );
}
