// app/(default)/admin/leads/yeni/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { utcToCyprusLocal } from "@/lib/lead-status";
import LeadForm from "../LeadForm";
import { createLead } from "../actions";
import { projectOptions } from "../lib-projects";

export const dynamic = "force-dynamic";

export default async function NewLeadPage() {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/leads/yeni");
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Satış Talepleri
      </Link>
      <h1 className="mt-4 text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">Yeni talep ekle</h1>
      <p className="mt-1.5 text-sm text-slate-500">Telefonla, ofiste ya da mesajla gelen talebi listeye ekleyin.</p>
      <div className="mt-7">
        <LeadForm
          action={createLead}
          projects={projectOptions()}
          showChannel
          cancelHref="/admin/leads"
          submitLabel="Talebi ekle"
          initial={{ name: "", email: "", phone: "", project: "", unitType: "", subject: "", message: "", status: "yeni", channel: "telefon", createdAt: utcToCyprusLocal(new Date()) }}
        />
      </div>
    </div>
  );
}
