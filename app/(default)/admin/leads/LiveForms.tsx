// app/(default)/admin/leads/LiveForms.tsx
// Talep ayrıntısındaki formlar: sayfa yenilenmeden kaydeder, kayıt sürerken düğmeyi kilitler, sonucu bildirimle gösterir.
"use client";

import { useActionState, useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { AlarmClock, CheckCircle2, ChevronDown, Loader2, RefreshCw, TriangleAlert, X } from "lucide-react";
import { addLeadNoteLive, deleteLeadNoteLive, pullMetaLeadsLive, setFollowUpLive, setLeadStatusLive, type LiveState } from "./actions";

/** Panelin her yerinden bildirim göster: showAdminToast({ message } | { error }) — AdminToastHost (AdminShell) gösterir */
export function showAdminToast(state: LiveState) {
  if (typeof window !== "undefined" && state && (state.message || state.error)) window.dispatchEvent(new CustomEvent("admin-toast", { detail: state }));
}

/** Sağ altta birkaç saniye görünen bildirim (başarılı / hata); panel yerleşiminde bir kez durur */
export function AdminToastHost() {
  const [shown, setShown] = useState<LiveState>(undefined);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const on = (e: Event) => {
      const st = (e as CustomEvent<LiveState>).detail;
      setShown(st);
      clearTimeout(t);
      t = setTimeout(() => setShown(undefined), st?.error ? 6000 : 3200);
    };
    window.addEventListener("admin-toast", on);
    return () => {
      window.removeEventListener("admin-toast", on);
      clearTimeout(t);
    };
  }, []);
  if (!shown) return null;
  const err = !!shown.error;
  return (
    <div role="status" aria-live="polite" className={`fixed bottom-5 right-5 z-[400] flex max-w-sm items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-2xl ${err ? "bg-red-600" : "bg-slate-900"}`}>
      {err ? <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden /> : <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-300" aria-hidden />}
      <span>{shown.error ?? shown.message}</span>
      <button type="button" onClick={() => setShown(undefined)} className="ml-1 rounded p-0.5 text-white/60 hover:text-white" aria-label="Kapat">
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

/** Eylem sonucu değişince bildirimi gösterir */
function useToastOn(state: LiveState) {
  useEffect(() => {
    if (state?.at) showAdminToast(state);
  }, [state]);
}

export function NoteForm({ leadId, author }: { leadId: number; author: string }) {
  const [state, action, pending] = useActionState<LiveState, FormData>(addLeadNoteLive, undefined);
  // başarılı kayıttan sonra yazı kutusu boşalır (anahtar değişince form yeniden kurulur); hata olursa yazılan kalır
  const formKey = state?.ok ? state.at : "f";
  useToastOn(state);
  return (
    <>
      <form key={formKey} action={action} className="mt-4 rounded-lg border border-slate-200 p-2.5 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500/20">
        <input type="hidden" name="id" value={leadId} />
        <textarea
          name="text"
          required
          rows={2}
          maxLength={2000}
          placeholder="Not ekle…"
          aria-label="Not"
          disabled={pending}
          className="block w-full resize-y bg-transparent px-1 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
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
          <button type="submit" disabled={pending} className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70">
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : null}
            {pending ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </form>
    </>
  );
}

export function StatusForm({ leadId, status, options, className }: { leadId: number; status: string; options: { key: string; label: string }[]; className: string }) {
  const [state, action, pending] = useActionState<LiveState, FormData>(setLeadStatusLive, undefined);
  useToastOn(state);
  return (
    <form action={action} className="flex items-center justify-between gap-3 px-5 pt-4 text-[13px]">
      <input type="hidden" name="id" value={leadId} />
      <label htmlFor="durum-sec" className="text-slate-500">
        Durum
      </label>
      <span className="relative flex items-center gap-2">
        {pending ? <Loader2 className="h-4 w-4 animate-spin text-teal-600" aria-label="Kaydediliyor" /> : null}
        <select
          id="durum-sec"
          name="status"
          defaultValue={status}
          key={`${leadId}-${status}`}
          disabled={pending}
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          className={className}
        >
          {options.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
      </span>
    </form>
  );
}

/** Not silme: silinen not listeden kalkınca bu bileşen de kalkar; bildirim panel genelinde gösterilir */
export function NoteDelete({ noteId, children }: { noteId: number; children: ReactNode }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm("Bu not silinsin mi?")) return;
        const fd = new FormData();
        fd.set("noteId", String(noteId));
        start(async () => {
          showAdminToast(await deleteLeadNoteLive(undefined, fd));
        });
      }}
      aria-label="Notu sil"
      title="Notu sil"
      className="rounded p-0.5 text-slate-300 hover:bg-slate-100 hover:text-red-500 disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : children}
    </button>
  );
}

/** "Meta'dan çek": reklam formu taleplerini hemen panele alır; çekim sürerken düğme kilitli */
export function MetaPullButton() {
  const [state, action, pending] = useActionState<LiveState, FormData>(pullMetaLeadsLive, undefined);
  useToastOn(state);
  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        title="Facebook / Instagram reklam formlarındaki yeni talepleri şimdi getir (normalde 10 dakikada bir kendiliğinden gelir)"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-[15px] w-[15px] animate-spin" aria-hidden /> : <RefreshCw className="h-[15px] w-[15px]" strokeWidth={1.7} aria-hidden />}
        {pending ? "Meta'dan çekiliyor…" : "Meta'dan çek"}
      </button>
    </form>
  );
}

/** Takip: sorumlu + sonraki arama (Kıbrıs saati). Kayıt sürerken kilitli, sonuç bildirimle; sayfa yenilenmeden güncellenir. */
export function FollowUpForm({
  leadId,
  assignee,
  date,
  time,
  label,
  late,
  people,
}: {
  leadId: number;
  assignee: string;
  date: string;
  time: string;
  /** mevcut takibin kısa etiketi ("Bugün 14:00", "2 gün gecikti") */
  label: string;
  late: boolean;
  people: string[];
}) {
  const [state, action, pending] = useActionState<LiveState, FormData>(setFollowUpLive, undefined);
  useToastOn(state);
  const op = useRef<HTMLInputElement>(null);
  const input = "h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[13px] text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";
  return (
    <form action={action} key={`${assignee}|${date}|${time}`} className="border-t border-slate-100 px-5 py-4">
      <input type="hidden" name="id" value={leadId} />
      <input type="hidden" name="islem" defaultValue="kaydet" ref={op} />
      <p className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <span className="flex items-center gap-1.5">
          <AlarmClock className="h-3.5 w-3.5" aria-hidden /> Takip
        </span>
        {label ? (
          <span className={`rounded-full px-2 py-0.5 text-[11px] normal-case tracking-normal ${late ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`}>{label}</span>
        ) : null}
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="col-span-2 text-xs text-slate-500">
          Sorumlu
          <input name="assignee" defaultValue={assignee} list={`kisiler-${leadId}`} placeholder="Arayacak kişi" maxLength={40} className={`${input} mt-1`} />
          <datalist id={`kisiler-${leadId}`}>
            {people.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </label>
        <label className="text-xs text-slate-500">
          Sonraki arama
          <input type="date" name="date" defaultValue={date} className={`${input} mt-1`} />
        </label>
        <label className="text-xs text-slate-500">
          Saat (Kıbrıs)
          <input type="time" name="time" defaultValue={time || "10:00"} className={`${input} mt-1`} />
        </label>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <button type="submit" onClick={() => op.current && (op.current.value = "kaydet")} disabled={pending} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-60">
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : null}
          {pending ? "Kaydediliyor…" : "Takibi kaydet"}
        </button>
        {assignee || date ? (
          <button type="submit" onClick={() => op.current && (op.current.value = "temizle")} disabled={pending} className="h-8 rounded-lg px-2.5 text-xs font-medium text-slate-500 hover:bg-slate-100 disabled:opacity-60">
            Takibi kaldır
          </button>
        ) : null}
      </div>
    </form>
  );
}
