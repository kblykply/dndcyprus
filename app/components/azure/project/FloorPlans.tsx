"use client";

import { useCallback, useEffect, useState } from "react";
import { PiArrowsOutDuotone } from "react-icons/pi";
import type { ProjectFloorPlans } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import ProjectHead, { splitTitle } from "./ProjectHead";

// Kat planları: daire tipi + varyant sekmeleri, plan görseli, alan tablosu, toplamlar, galeri ve lightbox.
export default function FloorPlans({ d, name, id, locale }: { d: ProjectFloorPlans; name: string; id: string; locale: Locale }) {
  const t = PROJECT_UI[locale].floor;
  const [pi, setPi] = useState(0);
  const [vi, setVi] = useState(0);
  const [lb, setLb] = useState<{ images: string[]; idx: number } | null>(null);
  const plan = d.plans[pi];
  const v = plan.variants[Math.min(vi, plan.variants.length - 1)];

  const selectPlan = (i: number) => { setPi(i); setVi(0); };
  const close = useCallback(() => setLb(null), []);
  const next = useCallback(() => setLb((s) => s ? { ...s, idx: (s.idx + 1) % s.images.length } : s), []);
  const prev = useCallback(() => setLb((s) => s ? { ...s, idx: (s.idx - 1 + s.images.length) % s.images.length } : s), []);
  useEffect(() => {
    if (!lb) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("az-lock");
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("az-lock"); };
  }, [lb, close, next, prev]);

  const alt = t.planAlt(plan.title, v.name);
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />

        <div className="az-seg rv" role="tablist" aria-label={t.types}>
          {d.plans.map((p, i) => (
            <button key={p.id} type="button" role="tab" aria-selected={i === pi} aria-controls={`${id}-panel`} className={i === pi ? "on" : undefined} onClick={() => selectPlan(i)} data-track="floorplan_view">
              {p.title}{p.size ? <span>({p.size})</span> : null}
            </button>
          ))}
        </div>
        {(plan.variants.length > 1 || plan.note) && (
          <div className="az-seg coral rv d1" role="tablist" aria-label={t.variants}>
            {plan.variants.length > 1 && plan.variants.map((x, i) => (
              <button key={x.name} type="button" role="tab" aria-selected={i === vi} className={i === vi ? "on" : undefined} onClick={() => setVi(i)}>{x.name}</button>
            ))}
            {plan.note ? <span className="az-pill c static">{plan.note}</span> : null}
          </div>
        )}

        <div className="az-fp rv d1" id={`${id}-panel`} role="tabpanel">
          {/* plan: büyük beyaz kutu, köşede büyüt, altta cam etiket */}
          <div className="plan">
            <button type="button" className="zoom" onClick={() => setLb({ images: [v.image], idx: 0 })} aria-label={t.enlargeAria}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.image} alt={alt} loading="lazy" decoding="async" />
              <span className="go"><PiArrowsOutDuotone size={16} aria-hidden /> {t.enlarge}</span>
            </button>
            <div className="cap">
              <b>{plan.title}</b>
              {plan.size ? <span>{plan.size}</span> : null}
              {v.pdf ? <a className="az-pill g" href={v.pdf} target="_blank" rel="noreferrer">{t.pdf}</a> : null}
            </div>
          </div>

          {/* alanlar */}
          <div className="info">
            <div className="hd">
              <span className="az-kicker">{plan.title}</span>
              <h3>{v.name}</h3>
              {v.note ? <span className="az-pill c static">{v.note}</span> : null}
            </div>
            <dl>
              {v.areas.map((r) => <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}
            </dl>
          </div>

          {/* toplamlar: ana sayfadaki büyük rakamlı kutular */}
          {v.totals?.closed ? <div className="stat sea"><small>{t.closed}</small><b>{v.totals.closed}</b></div> : null}
          {v.totals?.usage ? <div className="stat sand"><small>{t.usage}</small><b>{v.totals.usage}</b></div> : null}

          {/* iç mekân: büyük + 4 küçük mozaik; fazlası "+n" */}
          {v.gallery && v.gallery.length > 0 ? (() => {
            const g = v.gallery!;
            const shown = g.slice(0, 5);
            const extra = g.length - shown.length;
            return (
              <div className={`mosaic n${shown.length}`}>
                {shown.map((src, i) => (
                  <button key={src} type="button" className={i === 0 ? "big" : undefined} onClick={() => setLb({ images: g, idx: i })} aria-label={t.galleryImage(i + 1)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" decoding="async" />
                    {i === 0 ? <span className="tag">{t.gallery} · {g.length}</span> : null}
                    {i === shown.length - 1 && extra > 0 ? <span className="more">+{extra}</span> : null}
                  </button>
                ))}
              </div>
            );
          })() : null}
        </div>
        <p className="az-note-sm">{d.note}</p>
      </div>

      {lb ? (
        <div className="az-lb" role="dialog" aria-modal="true" aria-label={t.lightbox} onClick={close}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", display: "grid", justifyItems: "center" }}>
            <div className="fr">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lb.images[lb.idx]} alt={lb.images.length > 1 ? t.galleryImage(lb.idx + 1) : alt} draggable={false} />
              <button type="button" className="x" onClick={close} aria-label={t.close}>✕ {t.close}</button>
              {lb.images.length > 1 && (
                <>
                  <button type="button" className="p" onClick={prev} aria-label={t.prev}>‹</button>
                  <button type="button" className="nx" onClick={next} aria-label={t.next}>›</button>
                </>
              )}
            </div>
            <div className="cap"><span>{plan.title} — {v.name}</span><span>{lb.images.length > 1 ? `${lb.idx + 1} / ${lb.images.length}` : t.planImage}</span></div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
