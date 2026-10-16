import Arrow from "../Arrow";
import Link from "next/link";
import type { ProjectUpdate } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";

// Son inşaat güncellemesi: video + metin kartı. comingSoon ise kart bulanık, üstte "çok yakında" paneli.
export default function Update({ d, id, locale }: { d: ProjectUpdate; id: string; locale: Locale }) {
  const t = PROJECT_UI[locale].update;
  const external = /^https?:\/\//i.test(d.cta?.href ?? "");
  return (
    <section className={`az-section az-proj az-up${d.comingSoon ? " soon" : ""}`} id={id}>
      <div className="az-wrap" style={{ position: "relative" }}>
        <div className="card rv" aria-hidden={d.comingSoon || undefined}>
          <div className="v">
            {d.video.type === "mp4" ? (
              <video controls poster={d.video.poster} preload="metadata"><source src={d.video.src} type="video/mp4" /></video>
            ) : (
              <iframe src={d.video.src} title={d.video.title || t.videoTitle} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
            )}
          </div>
          <div className="t">
            <span className="az-pill static">{d.eyebrow}</span>
            <h2 className="az-h2 sm">{d.title}</h2>
            <p className="lead">{d.description}</p>
            <ul>{d.bullets.map((b) => <li key={b}><i aria-hidden />{b}</li>)}</ul>
            {d.cta && (
              <div className="cta">
                {external
                  ? <a className="az-btn glass sm" href={d.cta.href} target="_blank" rel="noopener noreferrer" tabIndex={d.comingSoon ? -1 : 0}>{d.cta.label} <Arrow /></a>
                  : <Link className="az-btn glass sm" href={d.cta.href} prefetch={false} tabIndex={d.comingSoon ? -1 : 0}>{d.cta.label} <Arrow /></Link>}
              </div>
            )}
          </div>
        </div>
        {d.comingSoon && (
          <div className="ov" role="status" aria-live="polite">
            <div className="az-panel rv">
              <h3>{d.placeholderText}</h3>
              {d.placeholderSub && <p>{d.placeholderSub}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
