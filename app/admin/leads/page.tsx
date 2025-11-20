import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // her istekte canlı veri çek

export default async function AdminLeadsPage() {
  const leads = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
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

        {leads.length === 0 ? (
          <p className="text-sm text-slate-500">Henüz herhangi bir kayıt yok.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tarih
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ad Soyad
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    E-posta
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Telefon
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Konu
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Mesaj
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
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
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{lead.subject}</td>
                    <td className="px-3 py-2 max-w-md">
                      <p className="whitespace-pre-wrap text-xs text-slate-700">
                        {lead.message}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
