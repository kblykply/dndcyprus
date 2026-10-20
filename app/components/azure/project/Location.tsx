import type { Distance, ProjectLocation } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import { splitTitle } from "./ProjectHead";

// Eski Perla2Location.formatDistance ile aynı biçimlendirme; dakika verilmişse "5 dk"
function formatDistance(d: Distance, minute: string) {
  if (typeof d.min === "number") return `${d.min} ${minute}`;
  if (typeof d.m === "number") return `${Math.round(d.m)} m`;
  if (typeof d.km === "number") {
    if (d.km < 1) return `${Math.round(d.km * 1000)} m`;
    if (d.km < 50) return `${Number.isInteger(d.km) ? d.km.toFixed(0) : d.km.toFixed(1)} km`;
    return `${Math.round(d.km)} km`;
  }
  return "";
}
// çubuk uzunluğu: dakikalı listede dakika, diğerlerinde metre
const measure = (d: Distance) => (typeof d.min === "number" ? d.min : typeof d.m === "number" ? d.m : (d.km ?? 0) * 1000);

// "Haritada aç" bağlantısı (öne çıkan bilgilerdeki Lokasyon kartı): koordinat varsa tam nokta, yoksa adres araması
export const mapHref = (d: Pick<ProjectLocation, "lat" | "lng" | "mapQuery" | "address">) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(typeof d.lat === "number" && typeof d.lng === "number" ? `${d.lat},${d.lng}` : d.mapQuery ?? d.address)}`;

// Konum: az-loc kartı — solda başlık, adres, mesafe çubukları ve yol tarifi; sağda Google harita.
// Koordinat verilmemiş projede harita yerine konum görseli (mapImage) durur, yol tarifi düğmeleri gösterilmez.
export default function Location({ d, name, id, locale }: { d: ProjectLocation; name: string; id: string; locale: Locale }) {
  const t = PROJECT_UI[locale].location;
  const hasGeo = typeof d.lat === "number" && typeof d.lng === "number";
  const q = encodeURIComponent(`${d.lat},${d.lng}`);
  const googleDir = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const googleOpen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.mapQuery ?? d.address)}`;
  const appleDir = `https://maps.apple.com/?daddr=${q}`;
  const iframeSrc = d.embedSrc || `https://www.google.com/maps?q=${q}&z=14&output=embed`;
  const max = Math.max(...d.distances.map(measure), 1);
  return (
    <section className="az-section az-proj az-loc" id={id}>
      <div className="az-wrap">
        <div className="az-card rv">
          <div className="t">
            <span className="az-kicker">{d.kicker}</span>
            <h2 className="az-h2 sm">{splitTitle(d.title, name)}</h2>
            <p>{d.lead}</p>
            <p className="addr"><b>{t.address}</b> {d.address}</p>
            {d.distances.length > 0 && (
              <ul className="az-dist">
                {d.distances.map((x, i) => (
                  <li key={x.label + i} style={{ ["--w" as string]: Math.max(0.08, measure(x) / max).toFixed(2) } as React.CSSProperties} title={x.note}>
                    <span>{x.label}</span><b>{formatDistance(x, t.minute)}</b><i />
                  </li>
                ))}
              </ul>
            )}
            {d.nearby.length > 0 && <div className="az-tags">{d.nearby.map((n) => <span key={n}>{n}</span>)}</div>}
            {/* telefonda kısa etiket ("Google Haritalar"): üç düğme iki satıra sığar; erişilebilir ad tam metin */}
            {hasGeo && (
              <div className="btns">
                <a className="az-btn sea sm" href={googleDir} target="_blank" rel="noreferrer" aria-label={t.google}>
                  <span className="lg">{t.google}</span><span className="sh">{t.googleShort}</span>
                </a>
                <a className="az-btn glass sm" href={appleDir} target="_blank" rel="noreferrer" aria-label={t.apple}>
                  <span className="lg">{t.apple}</span><span className="sh">{t.appleShort}</span>
                </a>
                <a className="az-btn glass sm" href={googleOpen} target="_blank" rel="noreferrer">{t.open}</a>
              </div>
            )}
          </div>
          {hasGeo ? (
            <div className="map live">
              <iframe title={t.mapTitle} src={iframeSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          ) : d.mapImage ? (
            <div className="map pic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.mapImage} alt={d.mapAlt ?? t.mapTitle} loading="lazy" decoding="async" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
