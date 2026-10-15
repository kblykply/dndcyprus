import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";

export default function LocationPanel({ locale }: { locale: Locale }) {
  const t = HOME[locale].location;
  return (
    <section className="az-section az-loc">
      <div className="az-wrap">
        <div className="az-card rv">
          <div className="t">
            <span className="az-kicker">{t.kicker}</span>
            <h2 className="az-h2 sm">{t.title}</h2>
            <p>{t.p}</p>
            <ul className="az-dist">
              {t.dist.map((d) => <li key={d.label} style={{ ["--w" as string]: d.w } as React.CSSProperties}><span>{d.label}</span><b>{d.v}</b><i /></li>)}
            </ul>
            <div style={{ marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="az-btn sea sm" href="https://maps.app.goo.gl/V2ainR6Rs2JkLaN27" target="_blank" rel="noopener noreferrer">{t.directions}</a>
              <Link className="az-btn glass sm" href={href(locale, "/lagoon-verde")} prefetch={false}>{t.tour}</Link>
            </div>
          </div>
          <div className="map">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/azure/sea.jpg" alt="" loading="lazy" />
            <div className="pin"><i /></div>
            <div className="lbl"><b>{t.lbl}</b>{t.sub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
