// app/(default)/admin/icerik/liste/[col]/[key]/page.tsx — liste kaydı ekle ("yeni") / düzenle
import { blobUploadConfigured } from "@/lib/content/blob";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { CONTENT_LOCALES } from "@/lib/content/core";
import { COLLECTIONS, isCollectionKey, listItems } from "@/lib/content/admin";
import ItemForm from "../../../ItemForm";

export const dynamic = "force-dynamic";

export default async function ItemPage({ params }: { params: Promise<{ col: string; key: string }> }) {
  const { col, key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect(`/admin/login?next=/admin/icerik/liste/${col}`);
  if (!isCollectionKey(col)) notFound();
  const def = COLLECTIONS[col];
  const isNew = key === "yeni";
  const { items } = await listItems(col);
  const item = isNew ? null : items.find((i) => i.key === key);
  if (!isNew && !item) notFound();

  const initial: Record<string, string> = {};
  const d = (item?.data ?? {}) as Record<string, unknown>;
  for (const f of def.shared) initial[f.key] = String(d[f.key] ?? (f.kind === "date" && isNew ? new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Famagusta" }) : ""));
  for (const f of def.perLocale) {
    const per = (d[f.key] ?? {}) as Record<string, unknown>;
    for (const l of CONTENT_LOCALES) {
      const v = per[l];
      initial[`${l}.${f.key}`] = Array.isArray(v) ? v.join(", ") : String(v ?? "");
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/admin/icerik/liste/${col}`} className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden /> {def.label}
      </Link>
      <h1 className="mt-4 text-[28px] leading-tight text-black sm:text-[32px]">{isNew ? `Yeni ${def.singular}` : col === "basin" ? "Haberi düzenle" : "Kişiyi düzenle"}</h1>
      <p className="mt-1.5 text-sm text-slate-500">{def.desc}</p>
      <div className="mt-7">
        <ItemForm
          collection={col}
          itemKey={isNew ? "" : key}
          shared={def.shared}
          perLocale={def.perLocale}
          initial={initial}
          published={item ? item.published : true}
          uploadEnabled={blobUploadConfigured()}
          cancelHref={`/admin/icerik/liste/${col}`}
        />
      </div>
    </div>
  );
}
