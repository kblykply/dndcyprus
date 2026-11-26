// app/(default)/admin/icerik/TranslateQueue.tsx — sırada bekleyen çeviriler: durum + "Şimdi dene"
"use client";

import { useActionState, useEffect } from "react";
import { Clock3, Loader2, RefreshCw } from "lucide-react";
import { runTranslationQueue } from "./actions";
import { showAdminToast } from "../leads/LiveForms";

type State = { message?: string; error?: string; at: number } | undefined;

export default function TranslateQueue({ count, detail }: { count: number; detail: string }) {
  const [state, action, pending] = useActionState<State, FormData>(runTranslationQueue, undefined);
  useEffect(() => {
    if (state?.at) showAdminToast(state);
  }, [state]);
  if (!count) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
      <span className="flex items-start gap-2">
        <Clock3 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <span>
          <b>{count} çeviri sırada.</b> {detail}
        </span>
      </span>
      <form action={action}>
        <button type="submit" disabled={pending} className="inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 disabled:opacity-60">
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <RefreshCw className="h-3.5 w-3.5" aria-hidden />}
          {pending ? "Deneniyor…" : "Şimdi dene"}
        </button>
      </form>
    </div>
  );
}
