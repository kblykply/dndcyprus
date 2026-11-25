// app/(default)/admin/charts.tsx
// Panel grafikleri (WowDash şablonunun grafik dili, panelin beyaz/teal stiline uyarlanmış). Kütüphane yok: çizgiler SVG,
// yazılar HTML (telefonda küçülmesin diye). İpuçları CSS ile, JavaScript gerektirmez. Veri yoksa boş durum yazısı çıkar.
import type { ReactNode } from "react";
import Link from "next/link";
import { niceTicks } from "@/lib/lead-stats";

export function ChartCard({ title, sub, right, children, className = "" }: { title: string; sub?: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg leading-tight text-slate-900">{title}</h2>
          {sub ? <p className="mt-1 text-xs text-slate-500">{sub}</p> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

export function Empty({ children = "Bu dönemde veri yok." }: { children?: ReactNode }) {
  return <p className="flex h-40 items-center justify-center rounded-lg bg-slate-50 text-sm text-slate-400">{children}</p>;
}

/** Monoton kübik eğri: değerler arasında taşma (negatife inme) yapmayan yumuşak çizgi */
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : "";
  const n = pts.length;
  const dx = pts.slice(1).map((p, i) => p[0] - pts[i][0]);
  const m = pts.slice(1).map((p, i) => (p[1] - pts[i][1]) / dx[i]);
  const t: number[] = [m[0]];
  for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
  t.push(m[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
      continue;
    }
    const a = t[i] / m[i];
    const b = t[i + 1] / m[i];
    const s = a * a + b * b;
    if (s > 9) {
      const k = 3 / Math.sqrt(s);
      t[i] = k * a * m[i];
      t[i + 1] = k * b * m[i];
    }
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += ` C${pts[i][0] + h},${pts[i][1] + t[i] * h} ${pts[i + 1][0] - h},${pts[i + 1][1] - t[i + 1] * h} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
}

export function AreaChart({
  data,
  color = "#2aa9b3",
  height = 240,
  unit = "talep",
  id = "alan",
}: {
  data: { label: string; title: string; count: number }[];
  color?: string;
  height?: number;
  unit?: string;
  id?: string;
}) {
  if (!data.length) return <Empty />;
  const W = 1000;
  const H = 300;
  const { top, ticks } = niceTicks(Math.max(...data.map((d) => d.count)));
  const step = data.length > 1 ? W / (data.length - 1) : W;
  const pts: [number, number][] = data.map((d, i) => [data.length > 1 ? i * step : W / 2, H - (d.count / top) * H]);
  const line = smoothPath(pts);
  const area = `${line} L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`;
  const labelEvery = Math.max(1, Math.ceil(data.length / 8));
  return (
    <div className="flex gap-3">
      <div className="relative w-7 shrink-0 text-right text-[11px] text-slate-400" style={{ height }}>
        {ticks.map((v) => (
          <span key={v} className="absolute right-0 -translate-y-1/2" style={{ top: `${100 - (v / top) * 100}%` }}>
            {v}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative" style={{ height }}>
          {ticks.map((v) => (
            <span key={v} className="absolute inset-x-0 border-t border-dashed border-slate-200" style={{ top: `${100 - (v / top) * 100}%` }} />
          ))}
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.32" />
                <stop offset="100%" stopColor={color} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={area} fill={`url(#${id}-g)`} />
            <path d={line} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
          {/* Değer ipuçları: her noktanın sütunu üzerine gelince görünür */}
          <div className="absolute inset-0">
            {data.map((d, i) => {
              const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
              const w = data.length > 1 ? 100 / (data.length - 1) : 100;
              const y = 100 - (d.count / top) * 100;
              return (
                <div key={i} className="group absolute inset-y-0 -translate-x-1/2" style={{ left: `${x}%`, width: `${w}%` }} title={`${d.title}: ${d.count} ${unit}`}>
                  <span className="pointer-events-none absolute left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow group-hover:block" style={{ top: `${y}%`, background: color }} />
                  <span
                    className="pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] text-white group-hover:block"
                    style={{ top: `calc(${y}% - 34px)` }}
                  >
                    {d.title}: <b>{d.count}</b>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative mt-2 h-4 text-[11px] text-slate-400">
          {data.map((d, i) => {
            const lastIdx = data.length - 1;
            const show = i === lastIdx || (i % labelEvery === 0 && lastIdx - i >= labelEvery / 2);
            return show ? (
              <span key={i} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${data.length > 1 ? (i / (data.length - 1)) * 100 : 50}%` }}>
                {d.label}
              </span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export function Donut({
  items,
  total,
  centerLabel,
}: {
  items: { key: string; label: string; count: number; color: string }[];
  total: number;
  centerLabel: string;
}) {
  if (!total) return <Empty />;
  const R = 42;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f5f9" strokeWidth="13" />
          {items.map((it) => {
            const len = (it.count / total) * C;
            const el = (
              <circle
                key={it.key}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={it.color}
                strokeWidth="13"
                strokeDasharray={`${Math.max(0, len - (items.length > 1 ? 0.8 : 0))} ${C}`}
                strokeDashoffset={-acc}
              >
                <title>{`${it.label}: ${it.count}`}</title>
              </circle>
            );
            acc += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl leading-none">{total}</span>
          <span className="mt-1 text-xs text-slate-500">{centerLabel}</span>
        </div>
      </div>
      <ul className="w-full min-w-0 space-y-2 text-[13px]">
        {items.map((it) => (
          <li key={it.key} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: it.color }} />
            <span className="min-w-0 flex-1 truncate text-slate-700">{it.label}</span>
            <span className="font-medium text-slate-900">{it.count}</span>
            <span className="w-11 text-right text-xs text-slate-400">%{Math.round((it.count / total) * 100)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Dikey sütunlar (projelere göre gibi) */
export function Columns({ items, height = 200, color = "#2aa9b3" }: { items: { key: string; label: string; count: number; sub?: string }[]; height?: number; color?: string }) {
  if (!items.length) return <Empty />;
  const { top } = niceTicks(Math.max(...items.map((i) => i.count)));
  return (
    <div className="flex items-end gap-3" style={{ height: height + 44 }}>
      {items.map((it) => (
        <div key={it.key} className="flex min-w-0 flex-1 flex-col items-center gap-1.5" title={`${it.label}: ${it.count}`}>
          <span className="text-xs font-medium text-slate-700">{it.count}</span>
          <div className="flex w-full max-w-[56px] items-end rounded-t-lg bg-slate-100" style={{ height }}>
            <div className="w-full rounded-t-lg" style={{ height: `${(it.count / top) * 100}%`, background: color }} />
          </div>
          <span className="w-full truncate text-center text-[11px] text-slate-500">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Proje dağılımı (sade tablo): her proje bir satır; tek renk çubuk talep sayısını gösterir, yanında üç net sayı:
 * talep, görüşülen (görüşülüyor + satış), satış. Satır tıklanınca talepler o projeyle süzülür.
 */
export function ProjectBreakdown({
  items,
  total,
  hrefOf,
}: {
  items: { key: string; label: string; count: number; byStatus: Record<string, number> }[];
  total: number;
  hrefOf?: (key: string) => string;
}) {
  if (!items.length) return <Empty />;
  const max = Math.max(...items.map((i) => i.count));
  const pctText = (n: number) => {
    if (!total) return "";
    const p = (n / total) * 100;
    return p > 0 && p < 1 ? "%1'den az" : `%${Math.round(p)}`;
  };
  return (
    <div className="text-[13px]">
      <div className="grid grid-cols-[minmax(0,1fr)_64px_72px_52px] items-end gap-x-3 border-b border-slate-100 pb-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
        <span>Proje</span>
        <span className="text-right">Talep</span>
        <span className="text-right">Görüşülen</span>
        <span className="text-right">Satış</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {items.map((it) => {
          const talked = (it.byStatus.gorusuluyor ?? 0) + (it.byStatus.satis ?? 0);
          const sold = it.byStatus.satis ?? 0;
          const row = (
            <div className="grid grid-cols-[minmax(0,1fr)_64px_72px_52px] items-center gap-x-3 py-3">
              <span className="min-w-0">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-medium text-slate-800">{it.label}</span>
                  <span className="shrink-0 text-[11px] text-slate-400">{pctText(it.count)}</span>
                </span>
                <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-slate-100">
                  <span className="block h-full rounded-full bg-[#2aa9b3]" style={{ width: `${Math.max(2, (it.count / max) * 100)}%` }} />
                </span>
              </span>
              <span className="text-right text-[15px] font-semibold text-slate-900">{it.count.toLocaleString("tr-TR")}</span>
              <span className="text-right text-[15px] font-medium text-blue-600">{talked || "–"}</span>
              <span className="text-right text-[15px] font-medium text-teal-700">{sold || "–"}</span>
            </div>
          );
          return (
            <li key={it.key}>
              {hrefOf ? (
                <Link href={hrefOf(it.key)} className="-mx-2 block rounded-lg px-2 hover:bg-slate-50" title={`${it.label} taleplerini aç`}>
                  {row}
                </Link>
              ) : (
                row
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Yatay çubuk listesi (kaynak, kampanya, sayfa…) */
export function BarList({
  items,
  total,
  color = "#2aa9b3",
  colorOf,
}: {
  items: { key: string; label: string; count: number; extra?: ReactNode }[];
  total?: number;
  color?: string;
  colorOf?: (key: string, i: number) => string;
}) {
  if (!items.length) return <Empty />;
  const max = Math.max(...items.map((i) => i.count));
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={it.key}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-[13px]">
            <span className="min-w-0 truncate text-slate-700" title={it.label}>
              {it.label}
            </span>
            <span className="shrink-0 font-medium text-slate-900">
              {it.count}
              {total ? <span className="ml-1.5 text-xs font-normal text-slate-400">%{Math.round((it.count / total) * 100)}</span> : null}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full" style={{ width: `${(it.count / max) * 100}%`, background: colorOf ? colorOf(it.key, i) : color }} />
          </div>
          {it.extra ? <div className="mt-1 text-[11px] text-slate-500">{it.extra}</div> : null}
        </li>
      ))}
    </ul>
  );
}
