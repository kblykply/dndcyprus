"use client";

import Link from "next/link";
import { useState } from "react";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";

const Arrow = () => (
  <span className="arrow" aria-hidden>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" /></svg>
  </span>
);

export default function Bento({ locale }: { locale: Locale }) {
  const t = HOME[locale].bento;
  const [months, setMonths] = useState(60);
  return (
    <section className="az-section" id="lagoon">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 rv d1">{t.title}</h2>
          <p className="az-lead rv d2">{t.lead}</p>
        </div>
        <div className="az-grid">
          <Link className="az-tile img t-lagoon rv" href={href(locale, "/lagoon-verde")} prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bg" src="/azure/lv-2.jpg" alt="Lagoon Verde" loading="lazy" />
            <span className="pill gold">{t.lagoon.pill}</span><Arrow />
            <div className="k">{t.lagoon.k}</div><h3>{t.lagoon.h}</h3><p>{t.lagoon.p}</p>
          </Link>

          <div className="az-tile sea t-tl rv d1">
            <div className="k">{t.tl.k}</div>
            <h3>{t.tl.h}</h3>
            <div className="big" style={{ marginTop: 10 }}>{months} <span style={{ fontSize: ".32em", letterSpacing: 0, color: "rgba(255,255,255,.8)" }}>{t.tl.upto}</span></div>
            <ul className="rules">{t.tl.rules.map((r) => <li key={r}><i>✓</i>{r}</li>)}</ul>
            <div className="seg" role="group" aria-label={t.tl.k}>
              {[12, 24, 36, 48, 60].map((m) => (
                <button key={m} type="button" className={months === m ? "on" : undefined} onClick={() => setMonths(m)} aria-pressed={months === m}>{m}{m === 60 ? ` ${t.tl.months}` : ""}</button>
              ))}
            </div>
          </div>

          <div className="az-tile t-units rv d2">
            <div className="k">{t.units.k}</div>
            <div className="big">{t.units.big}<span style={{ fontSize: ".5em" }}>{t.units.small}</span></div>
            <p>{t.units.p}</p>
          </div>

          <div className="az-tile sand t-award rv d3">
            <div className="k">{t.usa.k}</div>
            <div className="big" data-count={t.usa.count}>0</div>
            <p>{t.usa.p}</p>
          </div>

          <Link className="az-tile img t-mariachi rv d2" href={href(locale, "/mariachi")} prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bg" src="/azure/mb-6.jpg" alt="Mariachi Beach Club" loading="lazy" />
            <span className="pill gold">{t.mariachi.pill}</span><Arrow />
            <div className="k">{t.mariachi.k}</div><h3>{t.mariachi.h}</h3><p>{t.mariachi.p}</p>
          </Link>

          <Link className="az-tile img t-lajoya rv d3" href={href(locale, "/la-joya")} prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bg" src="/azure/lj-2.jpg" alt="La Joya" loading="lazy" />
            <span className="pill">{t.lajoya.pill}</span>
            <div className="k">{t.lajoya.k}</div><h3>{t.lajoya.h}</h3><p>{t.lajoya.p}</p>
          </Link>

          <div className="az-tile t-homes rv d4">
            <div className="k">{t.tech.k}</div>
            <h3 style={{ fontSize: 22 }}>{t.tech.h}</h3>
            <p>{t.tech.p}</p>
          </div>

          <div className="az-tile t-awards rv d2">
            <div className="k">{t.awards.k}</div>
            <h3 style={{ fontSize: 26 }}>{t.awards.h}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginTop: 16 }}>
              {t.awards.items.map((a) => (
                <a key={a.title} href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "grid", gap: 8, alignContent: "start" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.ribbon} alt="" loading="lazy" style={{ height: 96, width: "auto", filter: "drop-shadow(0 6px 14px rgba(0,0,0,.12))" }} />
                  <b style={{ fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{a.title}</b>
                  <span style={{ fontSize: 13, color: "var(--ink-60)" }}>{a.text}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="az-tile sea t-stats rv d3">
            <div className="k">{t.stats.k}</div>
            <h3 style={{ fontSize: 26 }}>{t.stats.h}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 18 }}>
              {t.stats.items.map((s) => (
                <div key={s.label}>
                  <div className="big" style={{ fontSize: "clamp(36px,3.6vw,60px)" }} data-count={s.value} data-suffix={s.suffix}>0{s.suffix}</div>
                  <div style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", opacity: .85, marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
