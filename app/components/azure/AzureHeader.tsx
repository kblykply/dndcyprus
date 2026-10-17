"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMenuDialog } from "@/app/components/performance/useMenuDialog";
import { CONTACT, LOCALES, LOCALE_META, NAV_COPY, PROJECTS, href, stripLocale, type Locale } from "@/lib/azure/site";
import "./lang.css";

// Azure: yüzen cam pill menü + proje mega menüsü + tam ekran mobil menü.
export default function AzureHeader({ locale }: { locale: Locale }) {
  const t = NAV_COPY[locale];
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);       // mobil menü
  const [drop, setDrop] = useState(false);       // projeler açılır menüsü (dokunmatik için)
  // seçim yapılınca menü kapanır ve fare menüden çıkana kadar kapalı kalır (yoksa :hover / :focus-within açık tutuyordu)
  const [shut, setShut] = useState(false);
  const [langOpen, setLangOpen] = useState(false); // dil menüsü (5 dil)
  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useMenuDialog(open, setOpen);
  const dropRef = useRef<HTMLLIElement>(null);

  // dil değiştirince aynı sayfanın diğer dil sürümüne git
  const clean = stripLocale(pathname);
  const langTarget = (target: Locale) => href(target, clean.startsWith("/blog") && !LOCALE_META[target].blog ? "/" : clean); // blog yalnızca Türkçe
  const switchTo = (target: Locale) => {
    if (target === locale) return;
    router.push(langTarget(target));
  };

  // logo / "Ana sayfa": zaten ana sayfadaysak Next aynı adrese giderken kaydırmıyor; menüyü kapat, sayfanın başına çık
  // (html'de scroll-behavior: smooth; hareket azaltma açıksa anında). Adresteki #bölüm de silinir.
  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (clean !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    if (location.hash) history.replaceState(history.state, "", pathname);
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  };
  const pick = () => { setDrop(false); setShut(true); (document.activeElement as HTMLElement | null)?.blur(); };

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDrop(false); setLangOpen(false); }, [pathname]);
  // açık panelin dışına (menü çubuğu hariç) dokununca kapanır
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const tgt = e.target as Node;
      if (menuRef.current?.contains(tgt) || document.getElementById("az-nav")?.contains(tgt)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, menuRef]);
  useEffect(() => {
    document.body.classList.toggle("az-lock", open);
    return () => document.body.classList.remove("az-lock");
  }, [open]);
  useEffect(() => {
    if (!drop && !langOpen) return;
    const onDoc = (e: PointerEvent) => {
      if (drop && !dropRef.current?.contains(e.target as Node)) setDrop(false);
      if (langOpen && !langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [drop, langOpen]);

  const isActive = (path: string) => clean === path || (path !== "/" && clean.startsWith(path + "/"));
  const items: { label: string; path: string }[] = [
    { label: t.home, path: "/" },
    { label: t.about, path: "/about" },
    { label: t.team, path: "/team" },
    { label: t.press, path: "/press" },
    { label: t.contact, path: "/contact" },
  ];

  return (
    <>
      <header className={`az-nav${solid ? " solid" : ""}`} id="az-nav">
        <div className="pill">
          <Link className="logo" href={href(locale, "/")} aria-label="DND Cyprus" prefetch={false} onClick={toTop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/DND-LOGO-2.svg" alt="DND Cyprus" width={70} height={30} />
          </Link>
          <ul>
            <li>
              <Link href={href(locale, "/")} className={isActive("/") ? "on" : undefined} prefetch={false} onClick={toTop}>{t.home}</Link>
            </li>
            {/* seçimden sonra kapalı kalır; fare "Projeler" düğmesine yeniden gelince (ya da klavye odağında) açılabilir.
                Kapanınca fare menünün alanından "çıkmış" sayıldığı için mouseleave ile açmak menüyü hemen geri açıyordu */}
            <li ref={dropRef} className={[drop ? "open" : "", shut ? "shut" : ""].join(" ").trim() || undefined}>
              <button type="button" aria-haspopup="true" aria-expanded={drop} onMouseEnter={() => setShut(false)} onFocus={() => setShut(false)} onClick={() => { setShut(false); setDrop((d) => !d); }}>
                {t.projects}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" /></svg>
              </button>
              <div className="drop">
                {PROJECTS.filter((p) => p.slug !== "gecitkale").map((p) => (
                  <Link key={p.slug} href={href(locale, `/${p.slug}`)} prefetch={false} onClick={pick}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt="" width={56} height={56} loading="lazy" />
                    <span><b>{p.name}</b><small>{p.short[locale]}</small></span>
                  </Link>
                ))}
                <Link href={href(locale, "/projects")} prefetch={false} onClick={pick}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/azure/sea.jpg" alt="" width={56} height={56} loading="lazy" />
                  <span><b>{t.all}</b><small>{t.allSub}</small></span>
                </Link>
              </div>
            </li>
            {items.filter((it) => it.path !== "/").map((it) => (
              <li key={it.path}>
                <Link href={href(locale, it.path)} className={isActive(it.path) ? "on" : undefined} prefetch={false}>{it.label}</Link>
              </li>
            ))}
          </ul>
          <Link className="az-btn sm" href={href(locale, "/contact")} prefetch={false}>{t.cta}</Link>
          <nav className={`lang menu${langOpen ? " open" : ""}`} aria-label={t.lang} ref={langRef}>
            <button type="button" aria-haspopup="listbox" aria-expanded={langOpen} onClick={() => setLangOpen((o) => !o)}>
              {LOCALE_META[locale].short}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>
            <ul role="listbox" aria-label={t.lang}>
              {LOCALES.map((l) => (
                <li key={l} role="none">
                  <a href={langTarget(l)} role="option" aria-selected={l === locale} className={l === locale ? "on" : undefined} lang={l} hrefLang={l} onClick={(e) => { e.preventDefault(); setLangOpen(false); switchTo(l); }}>
                    <b>{LOCALE_META[l].short}</b><span>{LOCALE_META[l].name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* menü, düğmenin altında açılan panel; düğme açıkken çarpıya döner (panelin kendi kapatma düğmesi menünün altında kalıyordu) */}
          <button className="burger" type="button" aria-label={open ? t.close : t.menu} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open
              ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" /></svg>
              : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" /></svg>}
          </button>
        </div>
      </header>

      <div className={`az-mobile${open ? " on" : ""}`} ref={menuRef as React.RefObject<HTMLDivElement>} role="dialog" aria-modal="true" aria-hidden={!open}>
        <button className="close" type="button" aria-label={t.close} onClick={() => setOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" /></svg>
        </button>
        <Link className="big" href={href(locale, "/")} prefetch={false} onClick={toTop}>{t.home}</Link>
        <Link className="big" href={href(locale, "/projects")} prefetch={false}>{t.projects} <small>06</small></Link>
        <div className="sub">
          {PROJECTS.map((p) => <Link key={p.slug} href={href(locale, `/${p.slug}`)} prefetch={false}>{p.name}</Link>)}
        </div>
        {items.filter((it) => it.path !== "/").map((it) => <Link key={it.path} className="big" href={href(locale, it.path)} prefetch={false}>{it.label}</Link>)}
        <div className="sub">
          {LOCALE_META[locale].blog && <Link href={href(locale, "/blog")} prefetch={false}>{t.blog}</Link>}
          <Link href={href(locale, "/dndcyprus")} prefetch={false}>{t.media}</Link>
        </div>
        <nav className="langs" aria-label={t.lang}>
          {LOCALES.map((l) => (
            <a key={l} href={langTarget(l)} className={l === locale ? "on" : undefined} lang={l} hrefLang={l} aria-current={l === locale ? "true" : undefined} onClick={(e) => { e.preventDefault(); switchTo(l); }}>{LOCALE_META[l].name}</a>
          ))}
        </nav>
        <div className="meta">
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <Link className="az-btn" href={href(locale, "/contact")} prefetch={false} style={{ justifySelf: "start", marginTop: 8 }}>{t.cta}</Link>
        </div>
      </div>
    </>
  );
}
