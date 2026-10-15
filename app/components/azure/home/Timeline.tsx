import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";

export default function Timeline({ locale }: { locale: Locale }) {
  const t = HOME[locale].timeline;
  return (
    <section className="az-section">
      <div className="az-wrap">
        <span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2>
        <div className="az-track">
          {t.items.map((m, k) => (
            <div key={m.tag + m.year} className={`az-m rv d${Math.min(k, 4)}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt="" loading="lazy" />
              <b>{m.year}</b><small>{m.tag}</small><p>{m.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
