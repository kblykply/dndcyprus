"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  PiBinocularsLight, PiCalendarCheckLight, PiHandshakeLight, PiHardHatLight, PiLeafLight,
  PiSealCheckLight, PiSmileyLight, PiTargetLight, PiUsersThreeLight,
} from "react-icons/pi";
import "./mvv.css";

// değerlerin ikonları (5 dilde aynı sıra): dürüstlük · kalite · güvenlik (HSE) · sürdürülebilirlik ·
// müşteri memnuniyeti · zamanında teslim · işbirliği & tedarik
const VALUE_ICONS: IconType[] = [
  PiHandshakeLight, PiSealCheckLight, PiHardHatLight, PiLeafLight, PiSmileyLight, PiCalendarCheckLight, PiUsersThreeLight,
];

type Props = {
  mission: { title: string; text: string };
  vision: { title: string; text: string };
  valuesTitle: string;
  values: string[];
  /** panelin altında ince çizgiyle ayrılmış soru + düğme (projelere) */
  cta?: { text: string; label: string; href: string };
};

/**
 * Misyon, Vizyon & Değerler: üç parça aynı dilde, koyu deniz zeminde ince çizgili ikonlar (yarı saydam çember):
 * misyon ve vizyon iki kart, değerler altta geniş panel. Panel görününce ikonlar sırayla belirir; üzerine gelince çember beyaza döner.
 * Hareket azaltma tercihinde animasyon yok.
 */
export default function MvvMedals({ mission, vision, valuesTitle, values, cta }: Props) {
  return (
    <div className="az-mvv">
      <div className="mv">
        <article className="rv mvc">
          <span className="ico" aria-hidden><PiTargetLight size={32} /></span>
          <div><span className="n">01</span><h3>{mission.title}</h3><p>{mission.text}</p></div>
        </article>
        <article className="rv d1 mvc">
          <span className="ico" aria-hidden><PiBinocularsLight size={32} /></span>
          <div><span className="n">02</span><h3>{vision.title}</h3><p>{vision.text}</p></div>
        </article>
      </div>
      <div className="vals rv d1">
        <div className="vh"><span className="k">03</span><h3>{valuesTitle}</h3></div>
        <ul>
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[i] ?? PiSealCheckLight;
            return (
              <li key={v} style={{ "--i": i } as CSSProperties}>
                <span className="ico" aria-hidden><Icon size={32} /></span>
                <span className="lbl">{v}</span>
              </li>
            );
          })}
        </ul>
        {cta ? (
          <div className="cta">
            <p>{cta.text}</p>
            <Link className="az-btn" href={cta.href} prefetch={false}>
              {cta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
