// app/(default)/admin/AdminShell.tsx
"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AdminToastHost } from "./leads/LiveForms";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ExternalLink,
  FileText,
  Flame,
  Sun,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = { label: string; href: string; icon: LucideIcon; soon?: boolean; badge?: boolean };

const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Satış",
    items: [
      { label: "Bugün", href: "/admin/bugun", icon: Sun },
      { label: "Genel Bakış", href: "/admin/genel", icon: LayoutDashboard },
      { label: "Satış Talepleri", href: "/admin/leads", icon: Users, badge: true },
      { label: "Reklam Raporu", href: "/admin/reklam", icon: Megaphone },
    ],
  },
  {
    title: "Site",
    items: [
      { label: "Site Trafiği", href: "/admin/trafik", icon: TrendingUp },
      { label: "Isı Haritası", href: "/admin/isi-haritasi", icon: Flame },
      { label: "İçerik", href: "/admin/icerik", icon: FileText },
    ],
  },
];

function Nav({ pathname, waiting, user }: { pathname: string; waiting: number | null; user: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-100 px-6 pb-5 pt-6">
        <Link href="/admin/bugun" aria-label="DND Cyprus yönetim paneli">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/DND-LOGO-2.svg" alt="DND Cyprus" className="h-9 w-auto" />
        </Link>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Yönetim Paneli</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5 text-sm" aria-label="Panel menüsü">
        {GROUPS.map((g, gi) => (
          <div key={g.title} className={gi ? "pt-6" : ""}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{g.title}</p>
            <ul className="space-y-1">
              {g.items.map((item) => {
                const Icon = item.icon;
                if (item.soon) {
                  return (
                    <li key={item.href}>
                      <span className="flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-slate-400" title="Hazırlanıyor">
                        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.7} aria-hidden />
                        <span className="truncate">{item.label}</span>
                        <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">Yakında</span>
                      </span>
                    </li>
                  );
                }
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "flex items-center gap-3 whitespace-nowrap rounded-full px-3 py-2.5 font-medium",
                        active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.7} aria-hidden />
                      <span className="min-w-0 truncate">{item.label}</span>
                      {item.badge && waiting ? (
                        <span className="ml-auto rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-semibold text-slate-900" title="Aranmayı bekleyen">
                          {waiting}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 px-3 py-4 text-sm">
        <div className="mb-2 flex items-center gap-3 px-3 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef5f6] text-xs font-semibold uppercase text-[#0d6570]">
            {user.slice(0, 2)}
          </span>
          <div className="leading-tight">
            <p className="text-[13px] font-medium text-slate-900">{user}</p>
            <p className="text-[11px] text-slate-400">Yönetici</p>
          </div>
        </div>
        <Link href="/tr" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
          <ExternalLink className="h-[15px] w-[15px]" strokeWidth={1.7} aria-hidden />
          Siteye geri dön
        </Link>
        <a href="/admin/logout" className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-red-500 hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-[15px] w-[15px]" strokeWidth={1.7} aria-hidden />
          Çıkış Yap
        </a>
      </div>
    </div>
  );
}

export default function AdminShell({ children, waiting, user }: { children: ReactNode; waiting: number | null; user: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  if (pathname.startsWith("/admin/login")) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900" data-clarity-mask="true">
      <aside className="sticky top-0 hidden h-screen w-[232px] shrink-0 border-r border-slate-200 bg-white lg:block 2xl:w-[248px]">
        <Nav pathname={pathname} waiting={waiting} user={user} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <Link href="/admin/bugun" aria-label="DND Cyprus yönetim paneli">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/DND-LOGO-2.svg" alt="DND Cyprus" className="h-7 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </header>
        {open ? (
          <div className="fixed inset-x-0 bottom-0 top-[57px] z-20 overflow-y-auto bg-white lg:hidden">
            <Nav pathname={pathname} waiting={waiting} user={user} />
          </div>
        ) : null}

        <main className="flex-1 px-4 py-7 sm:px-8 lg:py-9 2xl:px-10">{children}</main>
        <AdminToastHost />
      </div>
    </div>
  );
}
