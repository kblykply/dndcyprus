// app/(default)/admin/leads/[id]/duzenle/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { manualChannel, utcToCyprusLocal } from "@/lib/lead-status";
import LeadForm from "../../LeadForm";
import { ConfirmButton } from "../../LeadControls";
import { deleteLead, updateLead } from "../../actions";
import { projectOptions } from "../../lib-projects";

export const dynamic = "force-dynamic";

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: raw } = await params;
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect(`/admin/login?next=/admin/leads`);
  const id = Number(raw);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const lead = await prisma.contactMessage.findUnique({ where: { id } });
  if (!lead) notFound();
  const manual = lead.form === "panel" || !!manualChannel(lead.source);
  const back = `/admin/leads?id=${lead.id}`;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href={back} className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Talebe dön
      </Link>
      <h1 className="mt-4 text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">Talebi düzenle</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        {manual ? "Panelden eklenen talep." : "Web sitesinden gelen talep; reklam ve ziyaret kaynağı korunur."}
      </p>
      <div className="mt-7">
        <LeadForm
          action={updateLead}
          projects={projectOptions()}
          showChannel={manual}
          cancelHref={back}
          submitLabel="Değişiklikleri kaydet"
          initial={{
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone ?? "",
            project: lead.project ?? "",
            unitType: lead.unitType ?? "",
            subject: lead.subject,
            message: lead.message,
            status: lead.status,
            channel: manualChannel(lead.source) ?? "telefon",
            createdAt: utcToCyprusLocal(lead.createdAt),
          }}
        />
      </div>

      <form action={deleteLead} className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-red-200 bg-red-50/50 p-5">
        <input type="hidden" name="id" value={lead.id} />
        <div>
          <p className="text-sm font-medium text-red-700">Talebi sil</p>
          <p className="mt-0.5 text-xs text-red-600/80">Talep ve bütün notları kalıcı olarak silinir, geri alınamaz.</p>
        </div>
        <ConfirmButton
          message={`${lead.name} talebi ve notları kalıcı olarak silinsin mi? Bu işlem geri alınamaz.`}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" aria-hidden /> Sil
        </ConfirmButton>
      </form>
    </div>
  );
}
