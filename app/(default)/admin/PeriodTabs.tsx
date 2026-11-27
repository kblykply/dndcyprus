// app/(default)/admin/PeriodTabs.tsx — dönem seçici (bağlantı sekmeleri; JavaScript gerektirmez)
import Link from "next/link";
import { OVERVIEW_PERIODS, type OverviewPeriod } from "@/lib/lead-stats";

export default function PeriodTabs({ base, active, extra = {} }: { base: string; active: OverviewPeriod; extra?: Record<string, string | undefined> }) {
  return (
    <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-sm" role="tablist" aria-label="Dönem">
      {OVERVIEW_PERIODS.map((p) => {
        const q = new URLSearchParams();
        if (p.key !== "12a") q.set("donem", p.key);
        for (const [k, v] of Object.entries(extra)) if (v) q.set(k, v);
        const href = q.toString() ? `${base}?${q}` : base;
        const on = p.key === active;
        return (
          <Link
            key={p.key}
            href={href}
            role="tab"
            aria-selected={on}
            className={`shrink-0 rounded-full px-4 py-2 font-medium ${on ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            {p.label}
          </Link>
        );
      })}
    </div>
  );
}
