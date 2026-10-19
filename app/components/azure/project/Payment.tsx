import type { ProjectPayment } from "@/lib/azure/project-types";
import "./neocity.css";

/**
 * Ödeme modeli (NeoCity "5 Sıfır"): koyu deniz renginde kart. Solda başlık, açıklama ve beş "0" (faiz, banka, kefil,
 * vade farkı, kur farkı); sağda planın işleyişi adım adım ve talep düğmesi. Fiyat yazılmaz (diğer projelerde de yok).
 */
export default function Payment({ d, id }: { d: ProjectPayment; id: string }) {
  return (
    <section className="az-section az-proj az-pay" id={id}>
      <div className="az-wrap">
        <div className="card rv">
          <div className="l">
            <span className="az-kicker light">{d.kicker}</span>
            <h2 className="az-h2 sm">{d.title}</h2>
            <p className="lead">{d.lead}</p>
            <ul className="zeros">
              {d.zeros.map((z) => <li key={z}><b>0</b><span>{z}</span></li>)}
            </ul>
          </div>
          <div className="r">
            <ol className="steps">
              {d.steps.map((s, i) => <li key={s}><i>{String(i + 1).padStart(2, "0")}</i><span>{s}</span></li>)}
            </ol>
            <div className="q">
              <h3>{d.quote.h}</h3>
              <p>{d.quote.p}</p>
            </div>
            <a className="az-btn" href="#fiyat-al" data-track="price_request_click">{d.cta}</a>
          </div>
        </div>
        <p className="az-note-sm">{d.note}</p>
      </div>
    </section>
  );
}
