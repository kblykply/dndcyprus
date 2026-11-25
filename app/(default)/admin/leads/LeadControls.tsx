// app/(default)/admin/leads/LeadControls.tsx
"use client";

import type { ReactNode, SelectHTMLAttributes } from "react";
import { useRef, useState } from "react";

/** Seçim değişince bulunduğu formu gönderir (durum, proje, kaynak, dönem) */
export function AutoSubmitSelect(props: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return <select {...props} onChange={(e) => e.currentTarget.form?.requestSubmit()} />;
}

/** Tablodaki bütün satır kutularını seçer; toplu durum çubuğunda seçili sayısını gösterir */
export function SelectAll({ formId }: { formId: string }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label="Bu sayfadaki bütün talepleri seç"
      className="h-4 w-4 rounded border-slate-300 accent-[#0d6570]"
      onChange={(e) => {
        const form = document.getElementById(formId);
        form?.querySelectorAll<HTMLInputElement>('input[name="ids"]').forEach((c) => (c.checked = e.currentTarget.checked));
        form?.dispatchEvent(new Event("change", { bubbles: true }));
      }}
    />
  );
}

export function SelectedCount({ formId }: { formId: string }) {
  const [n, setN] = useState(0);
  return (
    <span
      ref={(el) => {
        const form = el ? document.getElementById(formId) : null;
        if (!form || (form as HTMLFormElement & { __sayac?: boolean }).__sayac) return;
        (form as HTMLFormElement & { __sayac?: boolean }).__sayac = true;
        form.addEventListener("change", () => setN(form.querySelectorAll('input[name="ids"]:checked').length));
      }}
      className="text-xs text-slate-500"
    >
      {n ? `${n} talep seçili` : "Toplu işlem için satır seçin"}
    </span>
  );
}

/** Gönderimden önce onay ister (silme düğmeleri) */
export function ConfirmButton({ message, className, children, ...rest }: { message: string; className?: string; children: ReactNode; "aria-label"?: string; title?: string }) {
  return (
    <button
      type="submit"
      className={className}
      {...rest}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
