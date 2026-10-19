"use client";

import { useState } from "react";
import type { ProjectSitePlan } from "@/lib/azure/project-types";
import ProjectHead, { splitTitle } from "./ProjectHead";
import "./neocity.css";

/**
 * Vaziyet planı (NeoCity): solda gündüz / gece anahtarlı büyük plan görseli (dokununca tam boy yeni sekmede),
 * sağda alan bilgileri ve site olanakları. Görseller üst üste durur, anahtar yalnız görünürlüğü değiştirir
 * (kutu boyu oynamaz).
 */
export default function SitePlan({ d, name, id }: { d: ProjectSitePlan; name: string; id: string }) {
  const [v, setV] = useState(0);
  const cur = d.views[v];
  return (
    <section className="az-section az-proj az-site" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <div className="grid">
          <figure className="pic rv">
            <a href={cur.image} target="_blank" rel="noopener" aria-label={cur.alt}>
              {d.views.map((x, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={x.id} src={x.image} alt={i === v ? x.alt : ""} aria-hidden={i === v ? undefined : true} className={i === v ? "on" : undefined} loading="lazy" decoding="async" />
              ))}
            </a>
            {d.views.length > 1 && (
              <div className="sw" role="group" aria-label={d.kicker}>
                {d.views.map((x, i) => (
                  <button key={x.id} type="button" aria-pressed={i === v} className={i === v ? "on" : undefined} onClick={() => setV(i)}>{x.label}</button>
                ))}
              </div>
            )}
          </figure>
          <div className="info rv d1">
            <dl>
              {d.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
            </dl>
            <ul className="lg">{d.legend.map((l) => <li key={l}>{l}</li>)}</ul>
            {d.note ? <p className="note">{d.note}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
