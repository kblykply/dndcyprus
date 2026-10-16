import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";
import "../meridian.css";

// Gün çizgisindeki noktalar: sabah altın, öğle mercan, akşam turkuaz, gece koyu turkuaz
const DOT = ["#f0b35e", "var(--coral)", "var(--sea)", "var(--sea-deep)"];

/**
 * "Bir gün" şeridi: sabahtan geceye dört an yan yana. Üstte renk değiştiren ince gün çizgisi ve saatler,
 * altında aynı hizada başlayan dikey görsel, başlık, kısa metin ve olanaklar. Yapışkan görsel / kaydırma yok;
 * telefonda kartlar yana kayar.
 */
export default function Story({ locale }: { locale: Locale }) {
  const t = HOME[locale].story;
  const n = t.steps.length;
  return (
    <section className="az-section az-day" id="hikaye">
      <div className="az-wrap">
        <div className="az-head"><span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2></div>
        <ol className="row rv d2">
          {t.steps.map((s, k) => {
            const [time, part] = s.t.split(" · ");
            return (
              <li key={s.h} style={{ "--c": DOT[k % DOT.length], "--n": k < n - 1 ? DOT[(k + 1) % DOT.length] : "transparent" } as React.CSSProperties}>
                <div className="tick"><b>{time}</b>{part ? <span className="mr-mono">{part}</span> : null}</div>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.h} loading="lazy" decoding="async" />
                </figure>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <p className="mr-mono tg">{s.tags.join(" · ")}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
