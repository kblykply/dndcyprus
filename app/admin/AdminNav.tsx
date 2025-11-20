// app/admin/AdminNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS = [
  { label: "Leads", href: "/admin/leads" },
  // ileride başka admin sayfaları da ekleyebilirsin
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col border-r border-slate-200 bg-white">
      {/* Logo + başlık */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          DND CYPRUS
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-900">
          Admin Panel
        </p>

        {/* Navigation items */}
        <nav className="mt-6 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "block rounded-lg px-4 py-2 text-sm font-medium",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom area: siteye dön + logout */}
      <div className="mt-auto px-5 pb-5 space-y-2 text-xs">
        <Link
          href="/"
          className="block rounded-lg px-4 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          Siteye geri dön
        </Link>

        <Link
          href="/admin/logout"
          className="block rounded-lg px-4 py-2 font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          Çıkış Yap
        </Link>
      </div>
    </div>
  );
}
