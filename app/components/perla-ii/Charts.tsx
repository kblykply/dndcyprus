"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

/** Types */
export type GrowthPoint = { label: string; index: number; date?: Date };
type Mode = "bar" | "line";

type Props = {
  title?: string;
  subtitle?: string;
  periods?: number;
  startDate?: string;
  fixedSemiAnnualRate?: number;
  customSemiAnnualRates?: number[];
  accent1?: string;
  accent2?: string;
  showDataLabels?: boolean; // now defaults to false
  defaultMode?: Mode;
};

/* ---------- Anim ---------- */
const easeCard: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const easeHeader: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- Data builder ---------- */
function buildSeriesSemi({
  periods,
  startDate,
  fixedSemiAnnualRate,
  customSemiAnnualRates,
}: Required<Pick<Props, "periods" | "startDate">> & {
  fixedSemiAnnualRate?: number;
  customSemiAnnualRates?: number[];
}): GrowthPoint[] {
  const start = new Date(startDate);
  const pts: GrowthPoint[] = [];
  let index = 100;
  for (let k = 0; k <= periods; k++) {
    const d = new Date(start);
    d.setMonth(start.getMonth() + k * 6);
    if (k > 0) {
      const r = customSemiAnnualRates?.[k - 1] ?? fixedSemiAnnualRate ?? 0;
      index *= 1 + (r || 0);
    }
    const half = d.getMonth() < 6 ? "H1" : "H2";
    pts.push({ label: `${d.getFullYear()} ${half}`, index, date: d });
  }
  return pts;
}

/* ---------- Layout & scales ---------- */
function useChartLayout(points: GrowthPoint[]) {
  const P = { l: 56, r: 20, t: 22, b: 56 };
  const W = 960;
  const H = 420;
  const innerW = W - P.l - P.r;
  const innerH = H - P.t - P.b;

  const minY = Math.min(...points.map((p) => p.index));
  const maxY = Math.max(...points.map((p) => p.index));
  const yPad = Math.max(2, (maxY - minY) * 0.12);
  const y0 = Math.floor((minY - yPad) / 5) * 5;
  const y1 = Math.ceil((maxY + yPad) / 5) * 5;

  const xScaleLine = (i: number) => {
    const n = points.length - 1;
    if (n <= 0) return P.l;
    return P.l + (i / n) * innerW;
  };
  const xBandCenter = (i: number) => {
    const n = points.length;
    const step = innerW / n;
    return P.l + step * i + step / 2;
  };
  const yScale = (v: number) => P.t + (1 - (v - y0) / (y1 - y0 || 1)) * innerH;

  const range = y1 - y0;
  const tickStep = range > 60 ? 10 : 5;
  const ticks: number[] = [];
  for (let t = y0; t <= y1; t += tickStep) ticks.push(t);

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${xScaleLine(i)},${yScale(p.index)}`).join(" ");

  const band = innerW / points.length;
  const barGap = Math.min(18, Math.max(10, band * 0.18));
  const barW = Math.max(12, band - barGap);

  return { W, H, P, xScaleLine, xBandCenter, yScale, ticks, path, barW };
}

/* ---------- Component ---------- */
export default function ValueGrowthChart({
  title = "Tahmini Değer Artışı (6 Aylık)",
  subtitle = "Satın alma sonrası her 6 ayda beklenen endeks artışı — yalnızca % (fiyat içermez)",
  periods = 10,
  startDate = "2025-01-01",
  fixedSemiAnnualRate = 0.055,
  customSemiAnnualRates,
  accent1 = TEAL,
  accent2 = ORANGE,
  showDataLabels = false, // changed default
  defaultMode = "bar",
}: Props) {
  const points = React.useMemo(
    () => buildSeriesSemi({ periods, startDate, fixedSemiAnnualRate, customSemiAnnualRates }),
    [periods, startDate, fixedSemiAnnualRate, customSemiAnnualRates]
  );

  const { W, H, P, xScaleLine, xBandCenter, yScale, ticks, path, barW } = useChartLayout(points);

  const [mode, setMode] = React.useState<Mode>(defaultMode);
  const inViewAnim = { once: true, amount: 0.25 } as const;

  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [active, setActive] = React.useState<number | null>(null);
  const [hoverXY, setHoverXY] = React.useState<{ x: number; y: number } | null>(null);
  const [tooltipFlipLeft, setTooltipFlipLeft] = React.useState(false);

  const centers = React.useMemo(
    () => points.map((_, i) => (mode === "line" ? xScaleLine(i) : xBandCenter(i))),
    [points, mode, xScaleLine, xBandCenter]
  );

  const clientToViewBox = React.useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const inv = ctm.inverse();
    const res = pt.matrixTransform(inv);
    return { x: res.x, y: res.y };
  }, []);

  const pickNearestIndex = React.useCallback(
    (xVB: number) => {
      const xClamped = Math.max(P.l, Math.min(W - 20, xVB));
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < centers.length; i++) {
        const d = Math.abs(centers[i] - xClamped);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    },
    [centers, P.l, W]
  );

  const updateFromClient = (clientX: number, clientY: number) => {
    const p = clientToViewBox(clientX, clientY);
    if (!p) return;
    const i = pickNearestIndex(p.x);
    setActive(i);
    const xy = { x: centers[i], y: yScale(points[i].index) };
    setHoverXY(xy);
    setTooltipFlipLeft(xy.x > W - 180);
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => updateFromClient(e.clientX, e.clientY);
  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setActive(null);
    setHoverXY(null);
  };
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => updateFromClient(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => updateFromClient(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    setActive(null);
    setHoverXY(null);
  };

  const tooltip =
    active !== null && hoverXY ? (
      <div
        className="pointer-events-none absolute z-20"
        style={{
          left: `${(hoverXY.x / W) * 100}%`,
          top: `${(hoverXY.y / H) * 100}%`,
          transform: tooltipFlipLeft ? "translate(calc(-100% - 10px), -12px)" : "translate(10px, -12px)",
        }}
      >
        <div
          className="rounded-xl border px-3 py-2 text-xs shadow-lg"
          style={{
            background: "rgba(255,255,255,0.96)",
            borderColor: "rgba(20,21,23,0.12)",
            color: "rgba(20,21,23,0.9)",
            maxWidth: 220,
            whiteSpace: "nowrap",
          }}
        >
          <div className="font-medium">{points[active].label}</div>
          <div className="mt-0.5 opacity-80">Endeks: {points[active].index.toFixed(0)}%</div>
        </div>
      </div>
    ) : null;

  return (
    <section aria-label="6 Aylık Yatırım Değeri" className="relative hidden md:block" style={{ background: "#fff", color: "#141517" }}>
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        {/* Header + Switcher */}
        <motion.div
          variants={easeHeader}
          initial="hidden"
          whileInView="show"
          viewport={inViewAnim}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
              {subtitle}
            </p>
          </div>
          <div className="shrink-0">
            <div
              role="tablist"
              aria-label="Grafik modu"
              className="inline-flex rounded-full p-1 border"
              style={{ borderColor: "rgba(20,21,23,0.08)", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
            >
              <button
                role="tab"
                aria-selected={mode === "bar"}
                onClick={() => setMode("bar")}
                className={`px-3.5 py-1.5 text-sm rounded-full transition ${mode === "bar" ? "font-semibold" : ""}`}
                style={{
                  background: mode === "bar" ? `${ORANGE}14` : "transparent",
                  color: mode === "bar" ? ORANGE : "rgba(20,21,23,0.85)",
                  border: `1px solid ${mode === "bar" ? `${ORANGE}33` : "transparent"}`,
                }}
              >
                Sütun
              </button>
              <button
                role="tab"
                aria-selected={mode === "line"}
                onClick={() => setMode("line")}
                className={`ml-1 px-3.5 py-1.5 text-sm rounded-full transition ${mode === "line" ? "font-semibold" : ""}`}
                style={{
                  background: mode === "line" ? `${TEAL}14` : "transparent",
                  color: mode === "line" ? TEAL : "rgba(20,21,23,0.85)",
                  border: `1px solid ${mode === "line" ? `${TEAL}33` : "transparent"}`,
                }}
              >
                Çizgi
              </button>
            </div>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={easeCard}
          initial="hidden"
          whileInView="show"
          viewport={inViewAnim}
          className="mt-6 rounded-2xl border relative overflow-visible"
          style={{ borderColor: "rgba(20,21,23,0.08)", background: "#fff", boxShadow: "0 10px 24px rgba(0,0,0,0.06)" }}
        >
          <div
            className="relative"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {tooltip}

            <div className="relative p-3 sm:p-4 md:p-6">
              <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-[clamp(380px,58vh,680px)]" shapeRendering="geometricPrecision">
                {/* y grid & labels */}
                {ticks.map((t) => {
                  const y = yScale(t);
                  return (
                    <g key={`g-${t}`}>
                      <line x1={56} x2={W - 20} y1={y} y2={y} stroke="rgba(20,21,23,0.08)" />
                      <text x={56 - 10} y={y + 4} fontSize={12} textAnchor="end" fill="rgba(20,21,23,0.72)">
                        {t}%
                      </text>
                    </g>
                  );
                })}

                {/* x labels */}
                {points.map((p, i) => {
                  const x = mode === "line" ? xScaleLine(i) : xBandCenter(i);
                  return (
                    <text key={`xl-${i}`} x={x} y={H - 20} fontSize={12} textAnchor="middle" fill="rgba(20,21,23,0.85)">
                      {p.label}
                    </text>
                  );
                })}

                {/* Gradients */}
                <defs>
                  <linearGradient id="barGrad1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={TEAL} stopOpacity={1} />
                    <stop offset="100%" stopColor={TEAL} stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="barGrad2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={ORANGE} stopOpacity={1} />
                    <stop offset="100%" stopColor={ORANGE} stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={TEAL} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={TEAL} stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                {/* BAR MODE */}
                {mode === "bar" && (
                  <>
                    {points.map((p, i) => {
                      const cx = xBandCenter(i);
                      const y = yScale(p.index);
                      const x = cx - barW / 2;
                      const h = Math.max(0, H - 56 - y);
                      const fill = i % 2 === 0 ? "url(#barGrad1)" : "url(#barGrad2)";
                      return (
                        <motion.g key={`bar-${i}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={inViewAnim} transition={{ delay: i * 0.06 }}>
                          <motion.rect
                            x={x}
                            width={barW}
                            rx={8}
                            initial={{ y: H - 56, height: 0 }}
                            whileInView={{ y, height: h }}
                            viewport={inViewAnim}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            fill={fill}
                          />
                          <rect x={x - 12} width={barW + 24} y={22} height={H - 22 - 56} fill="transparent" />
                          {/* data labels removed */}
                        </motion.g>
                      );
                    })}
                  </>
                )}

                {/* LINE MODE */}
                {mode === "line" && (
                  <>
                    <motion.path
                      d={`${path} L ${xScaleLine(points.length - 1)},${H - 56} L ${xScaleLine(0)},${H - 56} Z`}
                      fill="url(#areaGrad)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={inViewAnim}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.path
                      d={path}
                      stroke="#ffffff"
                      strokeOpacity={0.95}
                      strokeWidth={5}
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={inViewAnim}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.path
                      d={path}
                      stroke={TEAL}
                      strokeWidth={3.4}
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={inViewAnim}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    {points.map((p, i) => {
                      const cx = xScaleLine(i);
                      const cy = yScale(p.index);
                      return (
                        <g key={`pt-${i}`}>
                          <circle cx={cx} cy={cy} r={7} fill="#fff" />
                          <motion.circle cx={cx} cy={cy} r={6} fill={TEAL} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={inViewAnim} transition={{ delay: 0.45 + i * 0.05 }} />
                          <circle cx={cx} cy={cy} r={22} fill="transparent" />
                        </g>
                      );
                    })}
                  </>
                )}

                {/* ACTIVE GUIDE */}
                {active !== null && (
                  <>
                    <line x1={centers[active]} x2={centers[active]} y1={22} y2={H - 56} stroke="rgba(20,21,23,0.24)" strokeDasharray="4 4" />
                    <circle cx={centers[active]} cy={yScale(points[active].index)} r={6.5} fill="#fff" stroke={TEAL} strokeWidth={2.2} />
                  </>
                )}
              </svg>
            </div>

            {tooltip}
          </div>
        </motion.div>

        <p className="mt-8 text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
          * Grafik her 6 ay için endeksi gösterir. Aşama açıklamaları metinde yer alabilir; grafik fiyat içermez.
        </p>
      </div>
    </section>
  );
}
