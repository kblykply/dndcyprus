"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMenuDialog } from "@/app/components/performance/useMenuDialog";
import { CONTACT, NAV_COPY, PROJECTS, href, type Locale } from "@/lib/azure/site";

// Azure: yüzen cam pill menü + proje mega menüsü + tam ekran mobil menü.
export default function AzureHeader({ locale }: { locale: Locale }) {
  const t = NAV_COPY[locale];
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);       // mobil menü
  const [drop, setDrop] = useState(false);       // projeler açılır menüsü (dokunmatik için)
  const menuRef = useMenuDialog(open, setOpen);
  const dropRef = useRef<HTMLLIElement>(null);

  // dil değiştirince aynı sayfanın diğer dil sürümüne git
  const clean = pathname.replace(/^\/(tr|en)(?=\/|$)/i, "").replace(/\/+$/, "") || "/";
  const switchTo = (target: Locale) => {
    if (target === locale) return;
    const isBlog = clean.startsWith("/blog"); // blog yalnızca Türkçe
    router.push(href(target, isBlog ? "/" : clean));
  };

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDrop(false); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle("az-lock", open);
    return () => document.body.classList.remove("az-lock");
  }, [open]);
  useEffect(() => {
    if (!drop) return;
    const onDoc = (e: PointerEvent) => { if (!dropRef.current?.contains(e.target as Node)) setDrop(false); };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [drop]);

  const isActive = (path: string) => clean === path || (path !== "/" && clean.startsWith(path + "/"));
  const items: { label: string; path: string }[] = [
    { label: t.about, path: "/about" },
    { label: t.team, path: "/team" },
    { label: t.press, path: "/press" },
    { label: t.contact, path: "/contact" },
  ];

  return (
    <>
      <header className={`az-nav${solid ? " solid" : ""}`} id="az-nav">
        <div className="pill">
          <Link className="logo" href={href(locale, "/")} aria-label="DND Cyprus" prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/DND-LOGO-2.svg" alt="DND Cyprus" width={70} height={30} />
          </Link>
          <ul>
            <li ref={dropRef} className={drop ? "open" : undefined}>
              <button type="button" aria-haspopup="true" aria-expanded={drop} onClick={() => setDrop((d) => !d)}>
                {t.projects}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" /></svg>
              </button>
              <div className="drop">
                {PROJECTS.filter((p) => p.slug !== "gecitkale").map((p) => (
                  <Link key={p.slug} href={href(locale, `/${p.slug}`)} prefetch={false}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt="" width={56} height={56} loading="lazy" />
                    <span><b>{p.name}</b><small>{p.short[locale]}</small></span>
                  </Link>
                ))}
                <Link href={href(locale, "/projects")} prefetch={false}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/azure/sea.jpg" alt="" width={56} height={56} loading="lazy" />
                  <span><b>{t.all}</b><small>{t.allSub}</small></span>
                </Link>
              </div>
            </li>
            {items.map((it) => (
              <li key={it.path}>
                <Link href={href(locale, it.path)} className={isActive(it.path) ? "on" : undefined} prefetch={false}>{it.label}</Link>
              </li>
            ))}
          </ul>
          <Link className="az-btn sm" href={href(locale, "/contact")} prefetch={false}>{t.cta}</Link>
          <nav className="lang" aria-label={t.lang}>
            <a href={href("tr", clean.startsWith("/blog") ? "/" : clean)} className={locale === "tr" ? "on" : undefined} onClick={(e) => { e.preventDefault(); switchTo("tr"); }} lang="tr">TR</a>
            <a href={href("en", clean.startsWith("/blog") ? "/" : clean)} className={locale === "en" ? "on" : undefined} onClick={(e) => { e.preventDefault(); switchTo("en"); }} lang="en">EN</a>
          </nav>
          <button className="burger" type="button" aria-label={t.menu} aria-expanded={open} onClick={() => setOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" /></svg>
          </button>
        </div>
      </header>

      <div className={`az-mobile${open ? " on" : ""}`} ref={menuRef as React.RefObject<HTMLDivElement>} role="dialog" aria-modal="true" aria-hidden={!open}>
        <button className="close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" /></svg>
        </button>
        <Link className="big" href={href(locale, "/")} prefetch={false}>{t.home}</Link>
        <Link className="big" href={href(locale, "/projects")} prefetch={false}>{t.projects} <small>06</small></Link>
        <div className="sub">
          {PROJECTS.map((p) => <Link key={p.slug} href={href(locale, `/${p.slug}`)} prefetch={false}>{p.name}</Link>)}
        </div>
        {items.map((it) => <Link key={it.path} className="big" href={href(locale, it.path)} prefetch={false}>{it.label}</Link>)}
        <div className="sub">
          {locale === "tr" && <Link href="/tr/blog" prefetch={false}>{t.blog}</Link>}
          <Link href={href(locale, "/dndcyprus")} prefetch={false}>{t.media}</Link>
          <a href={href(locale === "tr" ? "en" : "tr", clean.startsWith("/blog") ? "/" : clean)} onClick={(e) => { e.preventDefault(); switchTo(locale === "tr" ? "en" : "tr"); }}>{locale === "tr" ? "English" : "Türkçe"}</a>
        </div>
        <div className="meta">
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <Link className="az-btn" href={href(locale, "/contact")} prefetch={false} style={{ justifySelf: "start", marginTop: 8 }}>{t.cta}</Link>
        </div>
      </div>
    </>
  );
}
