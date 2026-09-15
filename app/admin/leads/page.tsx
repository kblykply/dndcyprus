// app/admin/leads/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { ATTRIBUTION_KEYS, sanitizeAttribution, type Touch } from "@/lib/attribution";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: number;
  createdAt: Date;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  project: string | null;
  unitType: string | null;
  form: string | null;
  source: string | null;
  campaign: string | null;
  pageUrl: string | null;
  attribution: unknown;
};

/** Migration henüz çalışmadıysa yeni kolonlar yoktur (P2022 / Postgres 42703) */
function isMissingColumnError(err: unknown) {
  const e = err as { code?: unknown; message?: unknown } | null;
  const msg = typeof e?.message === "string" ? e.message : "";
  return e?.code === "P2022" || /column .* does not exist/i.test(msg) || msg.includes("42703");
}

async function loadLeads(): Promise<{ leads: LeadRow[]; legacy: boolean }> {
  try {
    const leads = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    return { leads, legacy: false };
  } catch (err) {
    if (!isMissingColumnError(err)) throw err;
    // Migration öncesi: yalnızca eski kolonlar
    const rows = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, name: true, email: true, phone: true, subject: true, message: true },
    });
    return {
      leads: rows.map((r) => ({
        ...r,
        project: null,
        unitType: null,
        form: null,
        source: null,
        campaign: null,
        pageUrl: null,
        attribution: null,
      })),
      legacy: true,
    };
  }
}

const TH = "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500";

function Dash() {
  return <span className="text-slate-400">-</span>;
}

function TouchList({ title, touch }: { title: string; touch: Touch | null }) {
  if (!touch) return null;
  const rows: [string, string][] = [];
  for (const k of ATTRIBUTION_KEYS) {
    const v = touch[k];
    if (v) rows.push([k, v]);
  }
  if (touch.landing) rows.push(["landing", touch.landing]);
  if (touch.referrer) rows.push(["referrer", touch.referrer]);
  if (touch.ts) rows.push(["zaman", new Date(touch.ts).toLocaleString("tr-TR")]);
  return (
    <div className="mt-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-[11px]">
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

export default async function AdminLeadsPage() {
  // Middleware'e ek ikinci kontrol: veriye yalnız geçerli oturumla erişilir
  const cookieStore = await cookies();
  if (!(await verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value))) {
    redirect("/admin/login?next=/admin/leads");
  }

  const { leads, legacy } = await loadLeads();

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              İletişim Formu Kayıtları
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              DND Cyprus web sitesinden gelen tüm form gönderimlerini buradan
              takip edebilirsiniz.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Toplam: {leads.length}
          </span>
        </div>

        {legacy ? (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Veritabanı güncellemesi (20260915120000_lead_attribution) henüz uygulanmadı; proje ve
            kaynak kolonları boş görünür. Formlar çalışmaya devam eder.
          </p>
        ) : null}

        {leads.length === 0 ? (
          <p className="text-sm text-slate-500">Henüz herhangi bir kayıt yok.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className={TH}>Tarih</th>
                  <th className={TH}>Ad Soyad</th>
                  <th className={TH}>E-posta</th>
                  <th className={TH}>Telefon</th>
                  <th className={TH}>Proje</th>
                  <th className={TH}>Tip</th>
                  <th className={TH}>Kaynak</th>
                  <th className={TH}>Konu</th>
                  <th className={TH}>Mesaj</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const attribution = sanitizeAttribution(lead.attribution);
                  return (
                    <tr
                      key={lead.id}
                      className="border-t border-slate-100 align-top hover:bg-slate-50/60"
                    >
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-slate-500">
                        {lead.createdAt.toLocaleString("tr-TR")}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{lead.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-teal-700 underline-offset-2 hover:underline"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {lead.phone ? (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-slate-700 underline-offset-2 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        ) : (
                          <Dash />
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {lead.project ? <span>{lead.project}</span> : <Dash />}
                        {lead.form ? (
                          <span className="block text-[11px] text-slate-400">form: {lead.form}</span>
                        ) : null}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs">
                        {lead.unitType || <Dash />}
                      </td>
                      <td className="px-3 py-2 min-w-[11rem] max-w-[16rem]">
                        {lead.source ? (
                          <span className="block text-xs font-medium text-slate-800">{lead.source}</span>
                        ) : (
                          <Dash />
                        )}
                        {lead.campaign ? (
                          <span className="block break-all text-[11px] text-slate-500">{lead.campaign}</span>
                        ) : null}
                        {attribution || lead.pageUrl ? (
                          <details className="mt-1">
                            <summary className="cursor-pointer text-[11px] text-teal-700">
                              Ayrıntı
                            </summary>
                            <TouchList title="İlk temas" touch={attribution?.first ?? null} />
                            <TouchList title="Son temas" touch={attribution?.last ?? null} />
                            {lead.pageUrl ? (
                              <p className="mt-2 break-all text-[11px] text-slate-500">
                                <span className="font-semibold uppercase tracking-wide">Sayfa:</span>{" "}
                                {lead.pageUrl}
                              </p>
                            ) : null}
                          </details>
                        ) : null}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{lead.subject}</td>
                      <td className="px-3 py-2 max-w-md">
                        <p className="whitespace-pre-wrap text-xs text-slate-700">
                          {lead.message}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
