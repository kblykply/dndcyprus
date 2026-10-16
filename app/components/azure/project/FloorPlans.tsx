"use client";

import { useCallback, useEffect, useState } from "react";
import { PiArrowsOutDuotone, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import type { FloorPlan, ProjectFloorPlans } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import ProjectHead, { splitTitle } from "./ProjectHead";
import "../meridian.css";

type Cta = { brochure?: string; tour?: string };

// Listede görünen ad: "1+0 Studio Residence"; varyant adındaki "(Grand)" gibi ekler atılır, tip zaten adda varsa tekrarlanmaz
const planLabel = (p: FloorPlan) => {
  const base = p.variants[0]?.name.replace(/\s*\([^)]*\)\s*$/, "").trim() || "";
  return base.startsWith(p.title) ? base : `${p.title} ${base}`.trim();
};
const variantTitle = (p: FloorPlan, name: string) => (name.startsWith(p.title) ? name : `${p.title} — ${name}`);
// "39,18 m²" gibi değerlerde sayı ile birim ayrı satıra düşmesin
const nb = (v: string) => v.replace(/ (m²|м²|m2)/g, "\u00A0$1");

/**
 * Kat planları — Meridian düzeni: solda ince çizgili daire tipi listesi (ad + mono ölçüler + nokta),
 * ortada görsel (plan; iç mekân fotoğrafı varsa Plan / İç mekân geçişi), sağda alan tablosu ve toplam,
 * altta fiyat talebi / broşür / 360° tur düğmeleri.
 */
export default function FloorPlans({ d, name, id, locale, cta = {} }: { d: ProjectFloorPlans; name: string; id: string; locale: Locale; cta?: Cta }) {
  const t = PROJECT_UI[locale].floor;
  const [pi, setPi] = useState(0);
  const [vi, setVi] = useState(0);
  const [view, setView] = useState<"plan" | "interior">("plan");
  const [gi, setGi] = useState(0);
  const [lb, setLb] = useState<{ images: string[]; idx: number } | null>(null);
  const plan = d.plans[pi];
  const v = plan.variants[Math.min(vi, plan.variants.length - 1)];
  const gallery = v.gallery ?? [];
  const showInterior = view === "interior" && gallery.length > 0;

  const selectPlan = (i: number) => { setPi(i); setVi(0); setGi(0); };
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
  const pad = (n: number) => String(n).padStart(2, "0");
  const brochureIsFile = !!cta.brochure && !cta.brochure.startsWith("#");

  return (
    <section className="az-section az-proj mr" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />

        <div className="mr-units rv d1">
          {/* sol: daire tipleri */}
          <div className="list" role="tablist" aria-label={t.types}>
            {d.plans.map((p, i) => (
              <button key={p.id} type="button" role="tab" aria-selected={i === pi} aria-controls={`${id}-panel`}
                className={i === pi ? "on" : undefined} onClick={() => selectPlan(i)} data-track="floorplan_view">
                <span className="nm">{planLabel(p)}</span>
                {p.size ? <span className="mr-mono">{p.size}</span> : null}
                <i aria-hidden />
              </button>
            ))}
          </div>

          {/* orta: görsel */}
          <div className="fig">
            {gallery.length > 0 && (
              <div className="sw" role="tablist" aria-label={t.gallery}>
                <button type="button" role="tab" aria-selected={!showInterior} className={!showInterior ? "on" : undefined} onClick={() => setView("plan")}>{t.planTab}</button>
                <button type="button" role="tab" aria-selected={showInterior} className={showInterior ? "on" : undefined} onClick={() => setView("interior")}>{t.interiorTab} · {gallery.length}</button>
              </div>
            )}
            <button type="button" className={`zoom${showInterior ? " photo" : ""}`} aria-label={t.enlargeAria}
              onClick={() => setLb(showInterior ? { images: gallery, idx: gi } : { images: [v.image], idx: 0 })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={showInterior ? gallery[gi] : v.image} src={showInterior ? gallery[gi] : v.image} alt={showInterior ? t.galleryImage(gi + 1) : alt} loading={showInterior ? "lazy" : "eager"} decoding="async" />
              <span className="go"><PiArrowsOutDuotone size={15} aria-hidden /> {t.enlarge}</span>
            </button>
            {showInterior && gallery.length > 1 && (
              <div className="nav">
                <button type="button" onClick={() => setGi((gi - 1 + gallery.length) % gallery.length)} aria-label={t.prev}><PiCaretLeftBold size={14} /></button>
                <span className="mr-mono">{pad(gi + 1)} / {pad(gallery.length)}</span>
                <button type="button" onClick={() => setGi((gi + 1) % gallery.length)} aria-label={t.next}><PiCaretRightBold size={14} /></button>
              </div>
            )}
          </div>

          {/* sağ: alan tablosu */}
          <div className="tbl" id={`${id}-panel`} role="tabpanel">
            <h3>{variantTitle(plan, v.name)}</h3>
            {(plan.variants.length > 1 || v.note || plan.note) && (
              <div className="vars">
                {plan.variants.length > 1 && plan.variants.map((x, i) => (
                  <button key={x.name} type="button" className={i === vi ? "on" : undefined} aria-pressed={i === vi} onClick={() => { setVi(i); setGi(0); }}>
                    {(x.name.match(/\(([^)]*)\)\s*$/)?.[1]) ?? x.name}
                  </button>
                ))}
                {v.note || plan.note ? <span className="mr-mono">{v.note || plan.note}</span> : null}
              </div>
            )}
            <dl>
              {v.areas.map((r) => <div key={r.label}><dt>{r.label}</dt><dd>{nb(r.value)}</dd></div>)}
              {(v.totals?.closed || v.totals?.usage) && (
                <div className="tot"><dt>{t.total}</dt><dd>{[v.totals?.closed, v.totals?.usage].filter(Boolean).map((x) => nb(x!)).join(" · ")}</dd></div>
              )}
            </dl>
            {v.pdf ? <a className="mr-link" href={v.pdf} target="_blank" rel="noreferrer">{t.pdf} ↗</a> : null}
            <p className="note">{d.note}</p>
          </div>
        </div>

        <div className="mr-ctas rv d2">
          <a className="az-btn sea" href="#fiyat-al" data-track="price_request_click">{t.request}</a>
          {cta.brochure ? (
            <a className="az-btn glass" href={cta.brochure} {...(brochureIsFile ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{t.brochure}</a>
          ) : null}
          {cta.tour ? <a className="az-btn glass" href={cta.tour}>{t.tour}</a> : null}
        </div>
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
            <div className="cap"><span>{variantTitle(plan, v.name)}</span><span>{lb.images.length > 1 ? `${lb.idx + 1} / ${lb.images.length}` : t.planImage}</span></div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
