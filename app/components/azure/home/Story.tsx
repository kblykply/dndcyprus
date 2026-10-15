"use client";

import { useEffect, useRef, useState } from "react";
import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";

// Scrollytelling: sol sütunda adımlar kayar, sağda yapışkan görsel değişir.
export default function Story({ locale }: { locale: Locale }) {
  const t = HOME[locale].story;
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = ref.current?.querySelectorAll<HTMLElement>(".az-step");
    if (!steps?.length) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setI(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="az-section az-story" id="hikaye">
      <div className="az-wrap">
        <div className="az-head"><span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2></div>
        <div className="g">
          <div className="steps" ref={ref}>
            {t.steps.map((s, k) => (
              <div key={s.h} className={`az-step${k === i ? " on" : ""}`} data-i={k}>
                <div className="t">{s.t}</div><h3>{s.h}</h3><p>{s.p}</p>
                <div className="az-tags">{s.tags.map((x) => <span key={x}>{x}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="stick">
            {t.steps.map((s, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.img} className={k === i ? "on" : undefined} src={s.img} alt={k === i ? s.h : ""} loading={k === 0 ? "eager" : "lazy"} />
            ))}
            <div className="cap"><b>{t.steps[i].h}</b><div className="az-dots">{t.steps.map((s, k) => <i key={s.h} className={k === i ? "on" : undefined} />)}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
