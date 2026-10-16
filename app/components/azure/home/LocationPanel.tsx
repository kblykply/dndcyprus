import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import { LAGOON_VERDE } from "@/lib/azure/projects/lagoon-verde";
import { href, type Locale } from "@/lib/azure/site";

/**
 * Ana sayfa konum kartı: solda mesafeler, sağda Lagoon Verde'nin gerçek konumunda canlı Google haritası
 * (koordinat proje sayfasıyla aynı kaynaktan). Eskiden genel bir deniz fotoğrafının ortasına pin konuyordu.
 */
export default function LocationPanel({ locale }: { locale: Locale }) {
  const t = HOME[locale].location;
  const ui = PROJECT_UI[locale];
  const { lat, lng } = LAGOON_VERDE[locale].location;
  const q = encodeURIComponent(`${lat},${lng}`);
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
              <a className="az-btn sea sm" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer">{t.directions}</a>
              <Link className="az-btn glass sm" href={`${href(locale, "/lagoon-verde")}#${ui.ids.tour}`} prefetch={false}>{t.tour}</Link>
            </div>
          </div>
          <div className="map live">
            <iframe title={ui.location.mapTitle} src={`https://www.google.com/maps?q=${q}&z=13&hl=${locale}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
