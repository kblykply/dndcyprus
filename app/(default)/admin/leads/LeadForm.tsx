// app/(default)/admin/leads/LeadForm.tsx
"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LEAD_STATUSES, MANUAL_CHANNELS } from "@/lib/lead-status";
import type { LeadFormState } from "./actions";

export type LeadFormValues = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  project: string;
  unitType: string;
  subject: string;
  message: string;
  status: string;
  channel: string;
  createdAt: string; // datetime-local (Kıbrıs saati)
};

const INPUT =
  "mt-1.5 block h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";
const LABEL = "block text-[13px] font-medium text-slate-700";

function Select({ name, value, onChange, children, id }: { name: string; value: string; onChange?: (v: string) => void; children: React.ReactNode; id: string }) {
  return (
    <span className="relative mt-1.5 block">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.currentTarget.value)}
        className="block h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
    </span>
  );
}

export default function LeadForm({
  action,
  initial: base,
  projects,
  showChannel,
  cancelHref,
  submitLabel,
}: {
  action: (state: LeadFormState, formData: FormData) => Promise<LeadFormState>;
  initial: LeadFormValues;
  projects: { name: string; unitTypes: string[] }[];
  showChannel: boolean;
  cancelHref: string;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const initial: LeadFormValues = { ...base, ...(state?.values ?? {}) };
  const [project, setProject] = useState(base.project);
  const [status, setStatus] = useState(base.status || "yeni");
  const [channel, setChannel] = useState(base.channel || "telefon");
  const unitTypes = projects.find((p) => p.name === project)?.unitTypes ?? [];
  const projectNames = projects.map((p) => p.name);

  return (
    <form key={state?.at ?? 0} action={formAction} className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      {state?.error ? (
        <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="f-name" className={LABEL}>
            Ad soyad <span className="text-red-500">*</span>
          </label>
          <input id="f-name" name="name" required maxLength={120} defaultValue={initial.name} className={INPUT} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="f-phone" className={LABEL}>Telefon</label>
          <input id="f-phone" name="phone" type="tel" maxLength={40} defaultValue={initial.phone} placeholder="+90 533 000 00 00" className={INPUT} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="f-email" className={LABEL}>E-posta</label>
          <input id="f-email" name="email" type="email" maxLength={254} defaultValue={initial.email} placeholder="ornek@alanadi.com" className={INPUT} autoComplete="off" />
        </div>
        <p className="-mt-3 text-xs text-slate-500 sm:col-span-2">Telefon ya da e-postadan en az biri gerekli.</p>

        <div>
          <label htmlFor="f-project" className={LABEL}>Proje</label>
          <Select id="f-project" name="project" value={project} onChange={setProject}>
            <option value="">Proje seçilmemiş</option>
            {projectNames.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
            {project && !projectNames.includes(project) ? <option value={project}>{project}</option> : null}
          </Select>
        </div>
        <div>
          <label htmlFor="f-unit" className={LABEL}>Daire tipi</label>
          <input id="f-unit" name="unitType" list="f-unit-list" maxLength={80} defaultValue={initial.unitType} className={INPUT} autoComplete="off" />
          <datalist id="f-unit-list">
            {unitTypes.map((u) => (
              <option key={u} value={u} />
            ))}
            <option value="Henüz karar vermedim" />
          </datalist>
        </div>

        {showChannel ? (
          <div>
            <label htmlFor="f-channel" className={LABEL}>Geldiği kanal</label>
            <Select id="f-channel" name="channel" value={channel} onChange={setChannel}>
              {MANUAL_CHANNELS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        <div>
          <label htmlFor="f-status" className={LABEL}>Durum</label>
          <Select id="f-status" name="status" value={status} onChange={setStatus}>
            {LEAD_STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="f-date" className={LABEL}>Talep tarihi (Kıbrıs saati)</label>
          <input id="f-date" name="createdAt" type="datetime-local" defaultValue={initial.createdAt} className={INPUT} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="f-subject" className={LABEL}>Konu</label>
          <input id="f-subject" name="subject" maxLength={200} defaultValue={initial.subject} placeholder="Boş bırakılırsa kanaldan otomatik yazılır" className={INPUT} autoComplete="off" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-message" className={LABEL}>Mesaj / görüşme özeti</label>
          <textarea
            id="f-message"
            name="message"
            rows={4}
            maxLength={5000}
            defaultValue={initial.message}
            className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-end gap-2 border-t border-slate-100 pt-5">
        <Link href={cancelHref} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Vazgeç
        </Link>
        <button type="submit" disabled={pending} className="rounded-full bg-[#0d6570] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0a5159] disabled:opacity-60">
          {pending ? "Kaydediliyor…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
