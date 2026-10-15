import type { ReactNode } from "react";
import Link from "next/link";

type Cta = { label: string; href: string; variant?: "coral" | "sea" | "glass" | "ghost"; track?: string };

type Props = {
  kicker?: string;
  title: ReactNode;
  lead?: string;
  image: string;
  imageAlt?: string;
  video?: string;              // mp4; image poster olur
  tags?: string[];             // sol üst etiketler (ilk altın renkte olabilir)
  goldTag?: string;
  chips?: { big: string; label: string }[];
  ctas?: Cta[];
  logo?: string;               // proje logosu (sağ üst)
  size?: "full" | "compact" | "short";
  id?: string;
};

// İç sayfalar için Azure hero çerçevesi: 36px yuvarlatılmış görsel, cam etiketler, floating chips.
export default function PageHero({ kicker, title, lead, image, imageAlt = "", video, tags = [], goldTag, chips, ctas = [], logo, size = "compact", id }: Props) {
  return (
    <section className={`az-hero ${size}`} id={id}>
      <div className="frame">
        {video ? (
          <video className="bg" autoPlay muted loop playsInline preload="metadata" poster={image} aria-label={imageAlt}>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="bg" src={image} alt={imageAlt} fetchPriority="high" />
        )}
        {(goldTag || tags.length || logo) ? (
          <div className="top">
            <div className="tagrow">
              {goldTag && <span className="az-tag gold">{goldTag}</span>}
              {tags.map((t) => <span key={t} className="az-tag">{t}</span>)}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo && <img className="plogo" src={logo} alt="" />}
          </div>
        ) : null}
        <div className="c">
          <div>
            {kicker && <span className="az-kicker light rv">{kicker}</span>}
            <h1 className="rv d1" style={kicker ? { marginTop: 14 } : undefined}>{title}</h1>
            {lead && <p className="rv d2">{lead}</p>}
            {ctas.length > 0 && (
              <div className="cta rv d3">
                {ctas.map((c) => {
                  const cls = `az-btn${c.variant && c.variant !== "coral" ? ` ${c.variant}` : ""}`;
                  return c.href.startsWith("#") || c.href.startsWith("http") || c.href.endsWith(".pdf")
                    ? <a key={c.label} className={cls} href={c.href} data-track={c.track} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}>{c.label}</a>
                    : <Link key={c.label} className={cls} href={c.href} data-track={c.track} prefetch={false}>{c.label}</Link>;
                })}
              </div>
            )}
          </div>
          {chips && chips.length > 0 && (
            <div className="chips rv d2">
              {chips.map((ch) => <div key={ch.label} className="az-chip"><b>{ch.big}</b><span>{ch.label}</span></div>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
