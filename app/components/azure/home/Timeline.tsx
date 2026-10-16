import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";
import "./timeline-meridian.css";

// Meridyen haritası: küre ızgarası üzerinde Boston → İskele uçuş rotası; kilometre taşları rotadaki
// numaralı duraklar (ABD üçlüsü batıda, Kıbrıs üçlüsü doğuda), altta fotoğraflı kartlar ve duraklara
// inen kesikli çizgiler. Tablet: kartlar 3'lü ızgara; telefon: dikey meridyen çizgisi boyunca liste.

const MAP: Record<Locale, { from: string; to: string; fromXY: string; toXY: string; dist: string; route: string }> = {
  tr: { from: "Boston", to: "İskele", fromXY: "42°21′ K · 71°03′ B", toXY: "35°17′ K · 33°53′ D", dist: "≈ 8.500 km", route: "Boston’dan İskele’ye rota" },
  en: { from: "Boston", to: "İskele", fromXY: "42°21′ N · 71°03′ W", toXY: "35°17′ N · 33°53′ E", dist: "≈ 8,500 km", route: "Route from Boston to İskele" },
  de: { from: "Boston", to: "İskele", fromXY: "42°21′ N · 71°03′ W", toXY: "35°17′ N · 33°53′ O", dist: "≈ 8.500 km", route: "Route von Boston nach İskele" },
  ru: { from: "Бостон", to: "Искеле", fromXY: "42°21′ с. ш. · 71°03′ з. д.", toXY: "35°17′ с. ш. · 33°53′ в. д.", dist: "≈ 8 500 км", route: "Маршрут из Бостона в Искеле" },
  pl: { from: "Boston", to: "İskele", fromXY: "42°21′ N · 71°03′ W", toXY: "35°17′ N · 33°53′ E", dist: "≈ 8500 km", route: "Trasa z Bostonu do İskele" },
};

// Rota: viewBox 1000×280 içinde ikinci derece Bézier (rotanın tepesi kuzeye kavislenir)
const P0 = [40, 204], P1 = [500, -84], P2 = [960, 204];
const at = (t: number) => {
  const a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
  return [a * P0[0] + b * P1[0] + c * P2[0], a * P0[1] + b * P1[1] + c * P2[1]];
};
const STOPS = [0.045, 0.165, 0.285, 0.715, 0.835, 0.955];
const ROUTE = `M${P0[0]},${P0[1]} Q${P1[0]},${P1[1]} ${P2[0]},${P2[1]}`;

// küre ızgarası (dekoratif): meridyenler ve paraleller
const G = { cx: 600, cy: 780, r: 760, tilt: 0.34 };
const MERIDIANS = [12, 24, 36, 48, 60, 72, 84].map((d) => G.r * Math.sin((d * Math.PI) / 180));
const PARALLELS = [10, 22, 34, 46, 58, 70].map((d) => {
  const p = (d * Math.PI) / 180;
  return { cy: G.cy - G.r * Math.sin(p) * Math.cos(G.tilt), rx: G.r * Math.cos(p), ry: G.r * Math.cos(p) * Math.sin(G.tilt) };
});

export default function Timeline({ locale }: { locale: Locale }) {
  const t = HOME[locale].timeline;
  const m = MAP[locale];
  const items = t.items.slice(0, STOPS.length);
  const pts = items.map((_, i) => at(STOPS[i]));
  const col = (i: number) => ((2 * i + 1) / (2 * items.length)) * 1000;

  return (
    <section className="az-section">
      <div className="az-wrap">
        <span className="az-kicker rv">{t.kicker}</span>
        <h2 className="az-h2 rv d1">{t.title}</h2>

        <div className="az-meridian rv">
          <svg className="globe" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
              <clipPath id="az-globe-clip"><circle cx={G.cx} cy={G.cy} r={G.r} /></clipPath>
              <radialGradient id="az-globe-glow" cx="50%" cy="100%" r="80%">
                <stop offset="0" stopColor="#2aa9b3" stopOpacity=".28" />
                <stop offset="1" stopColor="#2aa9b3" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={G.cx} cy={G.cy} r={G.r} fill="url(#az-globe-glow)" />
            <g clipPath="url(#az-globe-clip)" fill="none">
              <line x1={G.cx} y1={G.cy - G.r} x2={G.cx} y2={G.cy + G.r} />
              {MERIDIANS.map((rx) => <ellipse key={rx} cx={G.cx} cy={G.cy} rx={rx} ry={G.r} />)}
              {PARALLELS.map((p) => <ellipse key={p.cy} cx={G.cx} cy={p.cy} rx={p.rx} ry={p.ry} />)}
            </g>
            <circle cx={G.cx} cy={G.cy} r={G.r} fill="none" className="rim" />
          </svg>

          <div className="arc" role="img" aria-label={`${m.route} · ${m.dist}`}>
            <svg viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden>
              <path className="route-base" d={ROUTE} vectorEffect="non-scaling-stroke" />
              <path className="route" d={ROUTE} pathLength={1} vectorEffect="non-scaling-stroke" />
              <path className="comet" d={ROUTE} pathLength={100} vectorEffect="non-scaling-stroke" />
              {pts.map(([x, y], i) => (
                <line key={i} className="leader" x1={x} y1={y} x2={col(i)} y2={280} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            <div className="end from" style={{ left: `${P0[0] / 10}%`, top: `${(P0[1] / 280) * 100}%` }}>
              <b>{m.from}</b><small>{m.fromXY}</small>
            </div>
            <div className="end to" style={{ left: `${P2[0] / 10}%`, top: `${(P2[1] / 280) * 100}%` }}>
              <b>{m.to}</b><small>{m.toXY}</small>
            </div>
            <div className="dist">{m.dist}</div>
            {pts.map(([x, y], i) => (
              <span key={i} className={`pin p${i}`} style={{ left: `${x / 10}%`, top: `${(y / 280) * 100}%` }}>
                <i>{i + 1}</i><em>{items[i].year}</em>
              </span>
            ))}
          </div>

          <ol className="stops">
            <li className="cap from"><b>{m.from}</b><small>{m.fromXY}</small></li>
            {items.map((it, i) => (
              <li key={it.tag + it.year} className={`stop s${i}`}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.img} alt="" loading="lazy" />
                  <i>{i + 1}</i>
                </figure>
                <div>
                  <b>{it.year}</b>
                  <small>{it.tag}</small>
                  <p>{it.p}</p>
                </div>
              </li>
            ))}
            <li className="cap to"><b>{m.to}</b><small>{m.toXY}</small></li>
          </ol>
        </div>
      </div>
    </section>
  );
}
