// app/(default)/admin/leads/page.tsx
// Satış Talepleri (25.11.2026): özet kartları, durum sekmeleri, filtreler, tablo + seçili talebin ayrıntısı (durum, not, iletişim).
// Görsel dil kullanıcının beğendiği eski tabloyla aynı: beyaz zemin, slate tonları, teal bağlantılar, büyük harf küçük başlıklar.
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, Download, Mail, MessageCircle, Phone, Search, ArrowLeft, Pencil, Plus, X } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { ATTRIBUTION_KEYS, sanitizeAttribution, type Touch } from "@/lib/attribution";
import {
  LEAD_STATUSES,
  PERIODS,
  cyprusDateTime,
  filterLeads,
  formLabel,
  leadSummary,
  sourceGroup,
  statusCounts,
  statusInfo,
  telHref,
  waNumber,
  type LeadFilters,
} from "@/lib/lead-status";
import { addLeadNote, deleteLeadNote, setLeadStatus, setLeadStatusBulk } from "./actions";
import { AutoSubmitSelect, ConfirmButton, SelectAll, SelectedCount } from "./LeadControls";
import { pageLabelText } from "@/lib/page-label";

export const dynamic = "force-dynamic";

const PAGE_SIZES = [10, 25, 50] as const;

type SP = { durum?: string; q?: string; proje?: string; kaynak?: string; donem?: string; adet?: string; sayfa?: string; id?: string };

type Row = {
  id: number;
  createdAt: Date;
  name: string;
  email: string;
  phone: string | null;
  project: string | null;
  unitType: string | null;
  source: string | null;
  campaign: string | null;
  form: string | null;
  status: string;
};

function isMissingColumnError(err: unknown) {
  const e = err as { code?: unknown; message?: unknown } | null;
  const msg = typeof e?.message === "string" ? e.message : "";
  return e?.code === "P2022" || e?.code === "P2021" || /column .* does not exist|relation .* does not exist/i.test(msg) || msg.includes("42703");
}

async function loadRows(): Promise<{ rows: Row[]; legacy: boolean }> {
  const select = { id: true, createdAt: true, name: true, email: true, phone: true, project: true, unitType: true, source: true, campaign: true, form: true };
  try {
    const rows = await prisma.contactMessage.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }], select: { ...select, status: true } });
    return { rows, legacy: false };
  } catch (err) {
    if (!isMissingColumnError(err)) throw err;
    const rows = await prisma.contactMessage.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }], select });
    return { rows: rows.map((r) => ({ ...r, status: "yeni" })), legacy: true };
  }
}

async function loadDetail(id: number, legacy: boolean) {
  if (legacy) {
    const lead = await prisma.contactMessage.findUnique({
      where: { id },
      select: { id: true, createdAt: true, name: true, email: true, phone: true, subject: true, message: true, project: true, unitType: true, form: true, source: true, campaign: true, pageUrl: true, attribution: true },
    });
    return lead ? { ...lead, status: "yeni", notes: [] as { id: number; kind: string; text: string; author: string | null; createdAt: Date }[] } : null;
  }
  return prisma.contactMessage.findUnique({ where: { id }, include: { notes: { orderBy: { createdAt: "desc" } } } });
}

function qs(base: SP, patch: Partial<Record<keyof SP, string | undefined>>) {
  const p = new URLSearchParams();
  const merged = { ...base, ...patch };
  for (const k of ["durum", "q", "proje", "kaynak", "donem", "adet", "sayfa", "id"] as const) {
    const v = merged[k];
    if (v && !(k === "durum" && v === "tumu") && !(k === "sayfa" && v === "1") && !(k === "adet" && v === "10")) p.set(k, v);
  }
  const s = p.toString();
  return s ? `/admin/leads?${s}` : "/admin/leads";
}

/** 1 … 4 5 6 … 12 biçiminde sayfa numaraları */
function pageList(page: number, pages: number): (number | "…")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
  if (page <= 3) [2, 3, 4].forEach((n) => set.add(n));
  if (page >= pages - 2) [pages - 1, pages - 2, pages - 3].forEach((n) => set.add(n));
  const nums = [...set].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

function Pagination({ sp, page, pages, total, from, to, size, idp }: { sp: SP; page: number; pages: number; total: number; from: number; to: number; size: number; idp: string }) {
  const btn = "flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13px]";
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <span>
          {total} talepten {from}–{to} gösteriliyor
        </span>
        <form method="GET" action="/admin/leads" className="flex items-center gap-1.5">
          {(["durum", "q", "proje", "kaynak", "donem"] as const).map((k) => (sp[k] ? <input key={k} type="hidden" name={k} value={sp[k]} /> : null))}
          <label htmlFor={idp}>Sayfada</label>
          <span className="relative">
            <AutoSubmitSelect id={idp} name="adet" defaultValue={String(size)} className="h-8 appearance-none rounded-md border border-slate-200 bg-white pl-2.5 pr-7 text-xs text-slate-700">
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </AutoSubmitSelect>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
          </span>
          <noscript>
            <button type="submit" className="rounded border border-slate-200 px-2 py-1">Uygula</button>
          </noscript>
        </form>
      </div>
      {pages > 1 ? (
        <nav className="flex flex-wrap items-center gap-1" aria-label="Sayfalar">
          {page > 1 ? (
            <Link href={qs(sp, { sayfa: String(page - 1), id: undefined })} className={`${btn} border border-slate-200 text-slate-700 hover:bg-slate-50`} aria-label="Önceki sayfa">
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <span className={`${btn} border border-slate-100 text-slate-300`} aria-hidden>
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
          {pageList(page, pages).map((n, i) =>
            n === "…" ? (
              <span key={`e${i}`} className="px-1 text-slate-400">
                …
              </span>
            ) : (
              <Link
                key={n}
                href={qs(sp, { sayfa: String(n), id: undefined })}
                aria-current={n === page ? "page" : undefined}
                className={`${btn} ${n === page ? "bg-slate-900 font-medium text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
              >
                {n}
              </Link>
            ),
          )}
          {page < pages ? (
            <Link href={qs(sp, { sayfa: String(page + 1), id: undefined })} className={`${btn} border border-slate-200 text-slate-700 hover:bg-slate-50`} aria-label="Sonraki sayfa">
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <span className={`${btn} border border-slate-100 text-slate-300`} aria-hidden>
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </nav>
      ) : null}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const s = statusInfo(status);
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${s.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function Card({ label, children, sub }: { label: string; children: ReactNode; sub: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      {children}
      <p className="mt-1.5 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

const TH = "px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500 whitespace-nowrap";
const TD = "px-3 py-3 align-middle";
const SELECT =
  "h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";

function TouchList({ title, touch }: { title: string; touch: Touch | null }) {
  if (!touch) return null;
  const rows: [string, string][] = [];
  for (const k of ATTRIBUTION_KEYS) {
    const v = touch[k];
    if (v) rows.push([k, v]);
  }
  if (touch.landing) rows.push(["giriş sayfası", pageLabelText(touch.landing)]);
  if (touch.referrer) rows.push(["yönlendiren", touch.referrer]);
  if (touch.ts) rows.push(["zaman", new Date(touch.ts).toLocaleString("tr-TR", { timeZone: "Asia/Famagusta" })]);
  if (!rows.length) return null;
  return (
    <div className="mt-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-slate-500">{k}</dt>
            <dd className="break-all text-slate-700">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function AdminLeadsPage(props: { searchParams?: Promise<SP> } = {}) {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/leads");

  const sp: SP = (await props.searchParams) ?? {};
  const f: LeadFilters = { durum: sp.durum, q: sp.q, proje: sp.proje, kaynak: sp.kaynak, donem: sp.donem };
  const now = new Date();
  const { rows, legacy } = await loadRows();

  const summary = leadSummary(rows, now);
  const base = filterLeads(rows, f, now, false); // durum hariç: sekme sayıları
  const counts = statusCounts(base);
  const filtered = f.durum && f.durum !== "tumu" ? base.filter((r) => statusInfo(r.status).key === f.durum) : base;
  const pageSize = (PAGE_SIZES as readonly number[]).includes(Number(sp.adet)) ? Number(sp.adet) : 10;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number(sp.sayfa) || 1));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pager = (idp: string) => (
    <Pagination sp={sp} page={page} pages={pages} total={filtered.length} from={(page - 1) * pageSize + 1} to={(page - 1) * pageSize + pageRows.length} size={pageSize} idp={idp} />
  );

  const idParam = Number(sp.id);
  const explicit = Number.isSafeInteger(idParam) && idParam > 0;
  const selectedId = explicit ? idParam : pageRows[0]?.id;
  const detail = selectedId ? await loadDetail(selectedId, legacy) : null;

  const projects = [...new Set(rows.map((r) => r.project).filter((p): p is string => !!p))].sort((a, b) => a.localeCompare(b, "tr"));
  const sources = new Map<string, string>();
  for (const r of rows) {
    const g = sourceGroup(r.source);
    sources.set(g.key, g.label);
  }
  const hasFilter = !!(f.q || f.proje || f.kaynak || (f.donem && f.donem !== "tumu"));
  const here = qs(sp, {});
  const excelHref = `/admin/leads/excel${here.includes("?") ? here.slice(here.indexOf("?")) : ""}`;
  const monthName = (d: Date) => d.toLocaleDateString("tr-TR", { month: "long", year: "numeric", timeZone: "Asia/Famagusta" });
  const maxMonthly = Math.max(1, ...summary.monthly);
  const authorCookie = store.get("admin_author")?.value;
  let author = "";
  try {
    author = authorCookie ? decodeURIComponent(authorCookie) : "";
  } catch {
    author = "";
  }

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Telefonda/tablette bir talep açıkken üst bölüm gizlenir; doğrudan ayrıntı görünür */}
      <div className={explicit ? "hidden xl:block" : ""}>
      {/* Başlık */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-tight text-black sm:text-[32px]">Satış Talepleri</h1>
          <p className="mt-1.5 text-sm text-slate-500">Web sitesi formlarından ve reklamlardan gelen bütün alıcı talepleri.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">Toplam: {summary.total}</span>
          <a
            href={excelHref}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download className="h-[15px] w-[15px]" strokeWidth={1.7} aria-hidden />
            Excel indir
          </a>
          {!legacy ? (
            <Link
              href="/admin/leads/yeni"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              <Plus className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden />
              Yeni talep
            </Link>
          ) : null}
        </div>
      </div>

      {legacy ? (
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Veritabanı güncellemesi (20261125180000_lead_status_notes) henüz uygulanmadı; durum ve not kaydedilemez, talepler görünür.
        </p>
      ) : null}

      {/* Özet */}
      <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
        <Card label="Bu ay" sub={<>Geçen ay: {summary.lastMonth}</>}>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="font-display text-3xl">{summary.thisMonth}</p>
            <div className="flex h-8 items-end gap-[3px]" aria-label="Son 7 ayın talep sayıları">
              {summary.monthly.map((v, i) => (
                <span
                  key={i}
                  title={`${monthName(summary.monthStarts[i])}: ${v}`}
                  className="w-1.5 rounded-sm bg-[#2aa9b3]"
                  style={{ height: `${Math.max(4, (v / maxMonthly) * 32)}px`, opacity: 0.3 + (i / 6) * 0.7 }}
                />
              ))}
            </div>
          </div>
        </Card>
        <Card
          label="Aranmayı bekleyen"
          sub={
            summary.oldestWaitingDays === null
              ? "Bekleyen talep yok"
              : summary.oldestWaitingDays === 0
                ? "En eskisi bugün geldi"
                : `En eskisi ${summary.oldestWaitingDays} gündür bekliyor`
          }
        >
          <p className="mt-2 font-display text-3xl text-amber-600">{summary.waiting}</p>
        </Card>
        <Card label="Görüşülen" sub="Arandı + görüşme sürüyor">
          <p className="mt-2 font-display text-3xl">{summary.talked}</p>
        </Card>
        <Card label="Satışa dönen" sub={`Dönüşüm oranı %${summary.conversion.toFixed(1).replace(".", ",")}`}>
          <p className="mt-2 font-display text-3xl text-[#0d6570]">{summary.sold}</p>
        </Card>
      </div>

      {/* Durum sekmeleri */}
      <div className="mt-8 -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-sm" role="tablist" aria-label="Duruma göre">
        {[{ key: "tumu", label: "Tümü" }, ...LEAD_STATUSES].map((t) => {
          const active = (f.durum || "tumu") === t.key;
          return (
            <Link
              key={t.key}
              href={qs(sp, { durum: t.key, sayfa: undefined, id: undefined })}
              role="tab"
              aria-selected={active}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 font-medium ${active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {t.label}
              <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{counts[t.key] ?? 0}</span>
            </Link>
          );
        })}
      </div>

      {/* Filtreler */}
      <form method="GET" action="/admin/leads" className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        {f.durum && f.durum !== "tumu" ? <input type="hidden" name="durum" value={f.durum} /> : null}
        <label className="col-span-2 flex h-10 min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500/20 sm:w-80">
          <Search className="h-[15px] w-[15px] shrink-0 text-slate-400" strokeWidth={1.7} aria-hidden />
          <input
            type="search"
            name="q"
            defaultValue={f.q || ""}
            placeholder="Ad, telefon ya da e-posta ara"
            aria-label="Talep ara"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </label>
        <span className="relative">
          <AutoSubmitSelect name="proje" defaultValue={f.proje || ""} aria-label="Proje" className={`${SELECT} w-full`}>
            <option value="">Tüm projeler</option>
            {projects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
            <option value="-">Proje seçilmemiş</option>
          </AutoSubmitSelect>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
        </span>
        <span className="relative">
          <AutoSubmitSelect name="kaynak" defaultValue={f.kaynak || ""} aria-label="Kaynak" className={`${SELECT} w-full`}>
            <option value="">Tüm kaynaklar</option>
            {[...sources.entries()].map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </AutoSubmitSelect>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
        </span>
        <span className="relative">
          <AutoSubmitSelect name="donem" defaultValue={f.donem || "tumu"} aria-label="Dönem" className={`${SELECT} w-full`}>
            {PERIODS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </AutoSubmitSelect>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
        </span>
        <button type="submit" className="sr-only">
          Ara
        </button>
        {hasFilter ? (
          <Link href={qs({ durum: f.durum }, {})} className="col-span-2 px-2 text-sm font-medium text-teal-700 hover:underline sm:col-span-1">
            Filtreleri temizle
          </Link>
        ) : null}
      </form>

      </div>

      {/* Liste + ayrıntı */}
      <div className="mt-4 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className={`min-w-0 ${explicit ? "hidden xl:block" : ""}`}>
          {rows.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <p className="font-display text-xl">Henüz talep yok</p>
              <p className="mt-1 text-sm text-slate-500">Siteden gelen form talepleri burada listelenecek ve info@dndcyprus.com&apos;a bildirilecek.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <p className="font-display text-xl">Bu filtrelerle talep bulunamadı</p>
              <Link href="/admin/leads" className="mt-2 inline-block text-sm font-medium text-teal-700 hover:underline">
                Bütün talepleri göster
              </Link>
            </div>
          ) : (
            <>
              {/* Masaüstü tablo + toplu durum */}
              <div className="hidden h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:flex">
              <form id="toplu" action={setLeadStatusBulk} className="flex-1">
                <input type="hidden" name="back" value={here} />
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-3 py-2">
                  <SelectedCount formId="toplu" />
                  {!legacy ? (
                    <span className="flex items-center gap-2">
                      <span className="relative">
                        <select name="status" aria-label="Seçilenlerin yeni durumu" className="h-8 appearance-none rounded-md border border-slate-200 bg-white pl-2.5 pr-8 text-xs text-slate-700">
                          {LEAD_STATUSES.map((s) => (
                            <option key={s.key} value={s.key}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
                      </span>
                      <button type="submit" className="h-8 rounded-md bg-slate-900 px-3 text-xs font-medium text-white hover:bg-slate-800">
                        Seçilenlere uygula
                      </button>
                    </span>
                  ) : null}
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className={`${TH} w-10`}>
                        <SelectAll formId="toplu" />
                      </th>
                      <th className={TH}>Tarih</th>
                      <th className={TH}>Ad Soyad</th>
                      <th className={TH}>Proje</th>
                      <th className={TH}>Kaynak</th>
                      <th className={TH}>Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((r) => {
                      const { date, time } = cyprusDateTime(r.createdAt);
                      const sel = detail?.id === r.id;
                      const href = qs(sp, { id: String(r.id) });
                      return (
                        <tr key={r.id} className={`border-t border-slate-100 ${sel ? "bg-teal-50/50 shadow-[inset_3px_0_0_#2aa9b3]" : "hover:bg-slate-50/60"}`}>
                          <td className={TD}>
                            <input type="checkbox" name="ids" value={r.id} aria-label={`${r.name} talebini seç`} className="h-4 w-4 rounded border-slate-300 accent-[#0d6570]" />
                          </td>
                          <td className={`${TD} whitespace-nowrap`}>
                            <Link href={href} className="block" scroll={false}>
                              <span className="block text-[13px] text-slate-700">{date}</span>
                              <span className="text-xs text-slate-400">{time}</span>
                            </Link>
                          </td>
                          <td className={`${TD} whitespace-nowrap`}>
                            <Link href={href} className="block hover:text-teal-800" scroll={false}>
                              <span className="block font-medium">{r.name}</span>
                              <span className="text-xs text-slate-500">{r.phone || r.email || "—"}</span>
                            </Link>
                          </td>
                          <td className={`${TD} whitespace-nowrap`}>
                            {r.project ? <span className="block">{r.project}</span> : <span className="block text-slate-400">—</span>}
                            {r.unitType ? <span className="text-xs text-slate-500">{r.unitType}</span> : null}
                          </td>
                          <td className={`${TD} whitespace-nowrap text-slate-700`}>
                            {r.source ? sourceGroup(r.source).label : <span className="text-slate-400">—</span>}
                            {r.campaign ? <span className="block max-w-[11rem] truncate text-xs text-slate-400">{r.campaign}</span> : null}
                          </td>
                          <td className={TD}>
                            <StatusPill status={r.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </form>
              {pager("adet-sec")}
              </div>

              {/* Telefon: kartlar */}
              <ul className="space-y-2.5 md:hidden">
                {pageRows.map((r) => {
                  const { date, time } = cyprusDateTime(r.createdAt);
                  return (
                    <li key={r.id}>
                      <Link href={qs(sp, { id: String(r.id) })} className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm active:bg-slate-50">
                        <span className="flex items-start justify-between gap-3">
                          <span>
                            <span className="block font-medium">{r.name}</span>
                            <span className="text-xs text-slate-500">
                              {date} · {time}
                            </span>
                          </span>
                          <StatusPill status={r.status} />
                        </span>
                        <span className="mt-2 block text-[13px] text-slate-700">
                          {r.project || "Proje seçilmemiş"}
                          {r.unitType ? <span className="text-slate-500"> · {r.unitType}</span> : null}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {r.phone || r.email || "—"}
                          {r.source ? ` · ${sourceGroup(r.source).label}` : ""}
                        </span>
                      </Link>
                    </li>
                  );
                })}
                <li className="overflow-hidden rounded-xl border border-slate-200 bg-white">{pager("adet-sec-m")}</li>
              </ul>
            </>
          )}
        </div>

        {/* Seçili talep */}
        {detail ? (
          <aside className={`${explicit ? "block" : "hidden xl:block"} rounded-xl border border-slate-200 bg-white shadow-sm`} aria-label="Talep ayrıntısı">
            <div className="xl:sticky xl:top-4">
            {explicit ? (
              <Link href={qs(sp, { id: undefined })} className="flex items-center gap-2 border-b border-slate-100 px-5 py-3 text-sm font-medium text-teal-700 xl:hidden">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Bütün talepler
              </Link>
            ) : null}
            <div className="flex items-start gap-3 border-b border-slate-100 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef5f6] text-sm font-semibold uppercase text-[#0d6570]">
                {detail.name
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-xl leading-tight">{detail.name}</h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {cyprusDateTime(detail.createdAt).date} {cyprusDateTime(detail.createdAt).time} · {formLabel(detail.form)}
                </p>
              </div>
              {!legacy ? (
                <Link
                  href={`/admin/leads/${detail.id}/duzenle`}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden /> Düzenle
                </Link>
              ) : null}
            </div>

            {!legacy ? (
              <form action={setLeadStatus} className="flex items-center justify-between gap-3 px-5 pt-4 text-[13px]">
                <input type="hidden" name="id" value={detail.id} />
                <input type="hidden" name="back" value={qs(sp, { id: String(detail.id) })} />
                <label htmlFor="durum-sec" className="text-slate-500">
                  Durum
                </label>
                <span className="relative">
                  <AutoSubmitSelect
                    id="durum-sec"
                    name="status"
                    defaultValue={statusInfo(detail.status).key}
                    key={`${detail.id}-${detail.status}`}
                    className="h-9 w-44 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-[13px] font-medium text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </AutoSubmitSelect>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
                </span>
                <noscript>
                  <button type="submit" className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white">
                    Kaydet
                  </button>
                </noscript>
              </form>
            ) : null}

            <div className="grid grid-cols-3 gap-2 px-5 pb-4 pt-3">
              {[
                { href: telHref(detail.phone), label: "Ara", icon: <Phone className="h-[18px] w-[18px] text-[#0d6570]" strokeWidth={1.7} aria-hidden /> },
                {
                  href: waNumber(detail.phone) ? `https://wa.me/${waNumber(detail.phone)}` : "",
                  label: "WhatsApp",
                  icon: <MessageCircle className="h-[18px] w-[18px] text-[#1f9d55]" strokeWidth={1.7} aria-hidden />,
                },
                { href: detail.email ? `mailto:${detail.email}` : "", label: "E-posta", icon: <Mail className="h-[18px] w-[18px] text-[#0d6570]" strokeWidth={1.7} aria-hidden /> },
              ].map((b) =>
                b.href ? (
                  <a
                    key={b.label}
                    href={b.href}
                    target={b.href.startsWith("https") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {b.icon}
                    {b.label}
                  </a>
                ) : (
                  <span key={b.label} className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-slate-200 py-2.5 text-xs text-slate-400" title="Bilgi yok">
                    {b.icon}
                    {b.label}
                  </span>
                ),
              )}
            </div>

            <dl className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-2.5 px-5 text-[13px]">
              <dt className="text-slate-500">Telefon</dt>
              <dd className="break-words">{detail.phone || <span className="text-slate-400">—</span>}</dd>
              <dt className="text-slate-500">E-posta</dt>
              <dd className="break-all">
                {detail.email ? (
                  <a href={`mailto:${detail.email}`} className="text-teal-700 hover:underline">
                    {detail.email}
                  </a>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </dd>
              <dt className="text-slate-500">Proje</dt>
              <dd>{[detail.project, detail.unitType].filter(Boolean).join(" · ") || <span className="text-slate-400">—</span>}</dd>
              <dt className="text-slate-500">Kaynak</dt>
              <dd>
                {detail.source ? sourceGroup(detail.source).label : <span className="text-slate-400">Bilinmiyor (eski kayıt)</span>}
                {detail.campaign ? <span className="text-slate-400"> · {detail.campaign}</span> : null}
              </dd>
              <dt className="text-slate-500">Konu</dt>
              <dd className="break-words">{detail.subject}</dd>
              {detail.pageUrl ? (
                <>
                  <dt className="text-slate-500">Sayfa</dt>
                  <dd className="truncate text-slate-600" title={detail.pageUrl}>
                    {(() => {
                      try {
                        return new URL(detail.pageUrl).pathname;
                      } catch {
                        return detail.pageUrl;
                      }
                    })()}
                  </dd>
                </>
              ) : null}
            </dl>

            <div className="mx-5 mt-4 rounded-lg bg-slate-50 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Mesaj</p>
              <p className="mt-1.5 whitespace-pre-wrap break-words text-[13px] leading-relaxed text-slate-700">{detail.message}</p>
            </div>

            {(() => {
              const a = sanitizeAttribution(detail.attribution);
              if (!a) return null;
              return (
                <details className="mx-5 mt-3 text-[13px]">
                  <summary className="cursor-pointer text-xs font-medium text-teal-700">Reklam ve ziyaret ayrıntısı</summary>
                  <TouchList title="İlk temas" touch={a.first ?? null} />
                  <TouchList title="Son temas" touch={a.last ?? null} />
                </details>
              );
            })()}

            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">İç notlar</p>
              <ol className="mt-3 space-y-3 border-l border-slate-200 pl-4 text-[13px]">
                {detail.notes.map((n) => (
                  <li key={n.id} className="relative">
                    <span className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ring-4 ring-white ${n.kind === "not" ? "bg-[#2aa9b3]" : "bg-slate-300"}`} />
                    <div className="flex items-start gap-2">
                      <p className={`min-w-0 flex-1 whitespace-pre-wrap break-words ${n.kind === "not" ? "text-slate-700" : "text-slate-500"}`}>{n.text}</p>
                      {n.kind === "not" ? (
                        <form action={deleteLeadNote}>
                          <input type="hidden" name="noteId" value={n.id} />
                          <input type="hidden" name="back" value={qs(sp, { id: String(detail.id) })} />
                          <ConfirmButton message="Bu not silinsin mi?" aria-label="Notu sil" title="Notu sil" className="rounded p-0.5 text-slate-300 hover:bg-slate-100 hover:text-red-500">
                            <X className="h-3.5 w-3.5" aria-hidden />
                          </ConfirmButton>
                        </form>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {n.author || "Yönetici"} · {cyprusDateTime(n.createdAt).date} {cyprusDateTime(n.createdAt).time}
                    </p>
                  </li>
                ))}
                <li className="relative">
                  <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-slate-300 ring-4 ring-white" />
                  <p className="text-slate-500">Talep geldi · {formLabel(detail.form)}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Sistem · {cyprusDateTime(detail.createdAt).date} {cyprusDateTime(detail.createdAt).time}
                  </p>
                </li>
              </ol>
              {!legacy ? (
                <form action={addLeadNote} className="mt-4 rounded-lg border border-slate-200 p-2.5 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500/20">
                  <input type="hidden" name="id" value={detail.id} />
                  <input type="hidden" name="back" value={qs(sp, { id: String(detail.id) })} />
                  <textarea
                    name="text"
                    required
                    rows={2}
                    maxLength={2000}
                    placeholder="Not ekle…"
                    aria-label="Not"
                    className="block w-full resize-y bg-transparent px-1 text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <input
                      name="author"
                      defaultValue={author}
                      maxLength={60}
                      placeholder="Adınız"
                      aria-label="Notu yazan"
                      className="h-8 w-32 rounded-md border border-slate-200 px-2 text-xs text-slate-700 outline-none focus:border-teal-600"
                    />
                    <button type="submit" className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800">
                      Kaydet
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
