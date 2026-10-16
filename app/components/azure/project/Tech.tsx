"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ProjectTech } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import { Icon } from "./icons";
import ProjectHead, { splitTitle } from "./ProjectHead";
import "../meridian.css";
import "./tech.css";

// Kart etiketi: "Özellik" yerine özelliğin kendisi (simge anahtarına göre)
const KIND: Record<Locale, Record<string, string>> = {
  tr: { climate: "İklimlendirme", generator: "Enerji", "smart-home": "Akıllı ev", "floor-heating": "Isıtma" },
  en: { climate: "Climate control", generator: "Power", "smart-home": "Smart home", "floor-heating": "Heating" },
  de: { climate: "Klimatisierung", generator: "Energie", "smart-home": "Smart Home", "floor-heating": "Heizung" },
  ru: { climate: "Климат", generator: "Энергия", "smart-home": "Умный дом", "floor-heating": "Отопление" },
  pl: { climate: "Klimatyzacja", generator: "Energia", "smart-home": "Inteligentny dom", "floor-heating": "Ogrzewanie" },
};

/**
 * Teknik donanım: hafif cam kartlar (görsel kartın içinde, altında simge · özellik adı · başlık · açıklama).
 * Ana sayfadaki proje şeridiyle aynı geçiş: içerik genişliğinde 3 kart (tablette 2, telefonda 1 + sonrakinin ucu);
 * fareli ekranlarda (≥700px) sahne ekranda sabitlenir ve sayfayı aşağı kaydırmak kartları yana kaydırır (1px = 1px).
 * Dokunmatikte parmakla yana kaydırma (mıknatıslı). Ok yok; altta görünen aralık (01–03 / 04) ve ilerleme çizgisi.
 */
export default function Tech({ d, name, id, locale }: { d: ProjectTech; name: string; id: string; locale: Locale }) {
  const t = PROJECT_UI[locale].tech;
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState(false);
  const [prog, setProg] = useState(0);
  const [view, setView] = useState({ first: 0, vis: 3 });
  const n = d.items.length;
  const GAP = 18;
  const step = () => (car.current?.querySelector<HTMLElement>(".az-tcard")?.getBoundingClientRect().width ?? 300) + GAP;

  // konum → ilerleme çizgisi ve görünen kart aralığı
  useEffect(() => {
    const el = car.current; if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const end = max <= 0 || max - el.scrollLeft <= 40;
      setProg(max > 0 ? (end ? 1 : el.scrollLeft / max) : 0);
      const w = step(), vis = Math.max(1, Math.min(n, Math.round((el.clientWidth + GAP) / w)));
      setView({ vis, first: end ? Math.max(0, n - vis) : Math.min(n - vis, Math.max(0, Math.round(el.scrollLeft / w))) });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [n]);

  // fareli ekran mı (dokunmatikte sabitleme yok)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 700px)");
    const apply = () => setPin(mq.matches);
    apply(); mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // sabitleme: bölüm yüksekliği = üst pay + sahne + yatay kayma mesafesi; sayfa kaydırması şeridin konumunu belirler
  useEffect(() => {
    const s = sec.current, st = stage.current, el = car.current;
    if (!pin || !s || !st || !el) return;
    let raf = 0;
    const layout = () => {
      // sahne ekrana sığsın: taşma kadar görsel kısalır (en az 160px)
      s.style.removeProperty("--fig");
      const room = window.innerHeight - 88 - 16;
      const over = st.offsetHeight - room;
      const fig = el.querySelector("figure");
      if (over > 0 && fig) s.style.setProperty("--fig", `${Math.max(160, Math.floor(fig.getBoundingClientRect().height - over))}px`);
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const padTop = parseFloat(getComputedStyle(s).paddingTop) || 0;
      const top = Math.max(88, (window.innerHeight - st.offsetHeight) / 2);
      st.style.top = `${top}px`;
      s.style.height = `${padTop + st.offsetHeight + max}px`;
      return { max, padTop, top };
    };
    let geo = layout();
    const sync = () => {
      raf = 0;
      const dd = geo.top - (s.getBoundingClientRect().top + geo.padTop); // sahne yapıştığından beri aşağı kaydırılan
      el.scrollLeft = Math.min(geo.max, Math.max(0, dd));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sync); };
    const onResize = () => { geo = layout(); sync(); };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      s.style.height = ""; st.style.top = ""; s.style.removeProperty("--fig");
    };
  }, [pin]);

  // klavye: şerit odaktayken ← → bir kart
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const el = car.current, s = sec.current, st = stage.current; if (!el) return;
    const w = step();
    if (pin && s && st) {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const target = Math.min(max, Math.max(0, (Math.round(el.scrollLeft / w) + dir) * w));
      const padTop = parseFloat(getComputedStyle(s).paddingTop) || 0;
      window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY + padTop - (parseFloat(st.style.top) || 0) + target, behavior: "smooth" });
    } else el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const pad = (v: number) => String(v).padStart(2, "0");
  const last = Math.min(n, view.first + view.vis);

  return (
    <section ref={sec} className={`az-section az-proj mr az-tech${pin ? " pin" : ""}`} id={id}>
      <div className="az-wrap">
        <div ref={stage} className="stage">
          <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
          <div className="az-tcards" ref={car} tabIndex={0} role="region" aria-roledescription="carousel" aria-label={t.list} onKeyDown={onKey}>
            {d.items.map((c, k) => (
              <article key={c.title + k} className={`az-tcard rv d${k % 3}`}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.title} loading="lazy" decoding="async" draggable={false} />
                </figure>
                <div className="cap">
                  <span className="lb"><i><Icon name={c.icon} size={18} /></i>{pad(k + 1)} · {KIND[locale][c.icon] ?? d.badge}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="nav">
            <span className="count" aria-hidden>{view.vis > 1 ? <>{pad(view.first + 1)}<i>–</i>{pad(last)}</> : pad(view.first + 1)} <i>/</i> {pad(n)}</span>
            <span className="bar" aria-hidden><i style={{ transform: `scaleX(${Math.max(0.04, prog)})` }} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
