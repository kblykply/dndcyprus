"use client";

import Arrow from "../Arrow";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import "./hero-slider.css";

type Img = { src: string; srcSet: string; sizes: string };
export type Slide = {
  key: string; href: string; logo: string; name: string; short: string; title: ReactNode; sub: string; award?: string;
  img: Img; dik: Img | null;
};
type Props = { slides: Slide[]; brand: string; label: string; cta: string; prev: string; next: string; pause: string; play: string; media: string };

const DUR = 7000; // slayt başına süre (ms); ilerleme çizgisi bu sürede dolar

/**
 * Ana sayfa proje vitrini. Görseller üst üste, geçiş yumuşak kararma + hafif yaklaşma. Etkin slayt ve sonraki
 * slaytın görseli yüklenir (beşini birden indirmez). Kendiliğinden geçiş: fare üstündeyken, klavye odağı içerdeyken,
 * vitrin ekran dışındayken, sekme gizliyken ve "hareketi azalt" açıkken durur; durdur / oynat düğmesi var.
 * Telefonda yana kaydırma, klavyede sol / sağ ok.
 */
export default function HeroSlider({ slides, brand, label, cta, prev, next, pause, play, media }: Props) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1 % n]));
  const [user, setUser] = useState(true); // durdur / oynat düğmesi
  const [hold, setHold] = useState(false); // fare üstünde
  const [kbd, setKbd] = useState(false); // klavye odağı içerde
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);
  const box = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const vis = () => setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const go = (k: number) => {
    const to = ((k % n) + n) % n;
    setSeen((s) => (s.has(to) && s.has((to + 1) % n) ? s : new Set([...s, to, (to + 1) % n])));
    setI(to);
  };
  const auto = user && !reduce && n > 1;
  const paused = !auto || hold || kbd || !visible;

  const onFocus = (e: FocusEvent<HTMLElement>) => {
    let k = false;
    try { k = e.target.matches(":focus-visible"); } catch { k = false; }
    setKbd(k);
  };
  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); } else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };
  // telefonda yana kaydırma (dikey kaydırmayı engellemez: yatay hareket belirgin olunca sayılır)
  const onDown = (e: PointerEvent<HTMLDivElement>) => { if (e.pointerType !== "mouse") touch.current = { x: e.clientX, y: e.clientY }; };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const t = touch.current; touch.current = null;
    if (!t) return;
    const dx = e.clientX - t.x, dy = e.clientY - t.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) go(i + (dx < 0 ? 1 : -1));
  };

  const s = slides[i];
  return (
    <section ref={box} className="az-hero full az-hs" id="top" aria-roledescription="carousel" aria-label={label}
      onKeyDown={onKey} onFocus={onFocus} onBlur={() => setKbd(false)}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHold(true); }} onPointerLeave={() => setHold(false)}>
      <div className="frame" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => { touch.current = null; }}>
        {slides.map((x, k) => (
          <div key={x.key} className={`sl${k === i ? " on" : ""}`} aria-hidden={k !== i}>
            {seen.has(k) ? (
              <picture>
                {x.dik ? <source media={media} srcSet={x.dik.srcSet} sizes={x.dik.sizes} /> : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="bg" src={x.img.src} srcSet={x.img.srcSet} sizes={x.img.sizes} alt="" decoding="async"
                  loading={k === 0 ? "eager" : "lazy"} {...(k === 0 ? { fetchPriority: "high" as const } : {})} draggable={false} />
              </picture>
            ) : null}
          </div>
        ))}

        <div className="top">
          <h1 className="brand">{brand}</h1>
          {s.award ? <span className="az-tag gold">{s.award}</span> : null}
        </div>

        <div className="c">
          <div className="txt" key={s.key} aria-live={paused ? "polite" : "off"}>
            {s.logo ? <img className="logo" src={s.logo} alt="" draggable={false} /> : null}
            <p className="nm">{s.name}</p>
            <p className="h">{s.title}</p>
            <p className="sub">{s.sub}</p>
            <div className="cta">
              <Link className="az-btn" href={s.href} prefetch={false}>{cta} <Arrow /><span className="sr-only">: {s.name}</span></Link>
            </div>
          </div>

          <div className="nav">
            <div className="dots" role="group" aria-label={label}>
              {slides.map((x, k) => (
                <button key={x.key} type="button" className={k === i ? "on" : undefined} aria-current={k === i ? "true" : undefined} aria-label={x.name} onClick={() => go(k)}>
                  <span>{x.short}</span>
                  <i>{k === i ? <b key={`${i}-${auto}`} className={auto ? "run" : undefined} style={{ "--dur": `${DUR}ms`, animationPlayState: paused ? "paused" : "running" } as CSSProperties} onAnimationEnd={() => go(i + 1)} /> : null}</i>
                </button>
              ))}
            </div>
            <div className="arw">
              <button type="button" onClick={() => setUser((u) => !u)} aria-label={user ? pause : play} className="pp">
                {user
                  ? <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><rect x="3" y="2" width="3" height="10" rx="1" fill="currentColor" /><rect x="8" y="2" width="3" height="10" rx="1" fill="currentColor" /></svg>
                  : <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M4 2.5l8 4.5-8 4.5z" fill="currentColor" /></svg>}
              </button>
              <button type="button" onClick={() => go(i - 1)} aria-label={prev}><Arrow dir={-1} size={20} /></button>
              <button type="button" onClick={() => go(i + 1)} aria-label={next}><Arrow size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
