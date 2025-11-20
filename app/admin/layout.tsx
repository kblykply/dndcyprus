// app/admin/layout.tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminNav from "./AdminNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname.startsWith("/admin/login");

  // LOGIN SAYFASI → NAV YOK, sadece child render
  if (isLoginPage) {
    return <>{children}</>;
  }

  // DİĞER ADMIN SAYFALARI → NAV + İÇERİK
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white md:block">
        <AdminNav />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col bg-white">
        {/* Mobile top bar */}
        <header className="block border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              DND Cyprus
            </p>
            <p className="text-sm font-semibold text-slate-900">Admin Panel</p>
          </div>
        </header>

        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
