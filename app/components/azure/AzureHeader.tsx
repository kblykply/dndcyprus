"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMenuDialog } from "@/app/components/performance/useMenuDialog";
import { NAV_TEXT, PROJECT_GROUPS, PROJECT_HASH, navItems, type NavItem, type NavLink } from "@/lib/azure/nav";
import { CONTACT, LOCALES, LOCALE_META, NAV_COPY, PROJECTS, href, stripLocale, type Locale } from "@/lib/azure/site";
import Arrow from "./Arrow";
import "./lang.css";
import "./nav.css";

// Azure: yüzen cam pill menü (7 başlık: Ana Sayfa, Projelerimiz mega menüsü, DND Ayrıcalığı, Ödeme ve Yatırım, Hakkımızda,
// Haberler, İletişim — lib/azure/nav.ts) + açılır bölümlü mobil menü.
export default function AzureHeader({ locale }: { locale: Locale }) {
  const t = NAV_COPY[locale];
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);       // mobil menü
  const [acc, setAcc] = useState<string | null>(null); // mobil menüde açık bölüm
  const [drop, setDrop] = useState<string | null>(null); // tıklamayla açık açılır menü (dokunmatik için)
  // seçim yapılınca menü kapanır ve fare menüden çıkana kadar kapalı kalır (yoksa :hover / :focus-within açık tutuyordu)
  const [shut, setShut] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false); // dil menüsü (5 dil)
  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useMenuDialog(open, setOpen);
  const dropRef = useRef<HTMLUListElement>(null);

  // dil değiştirince aynı sayfanın diğer dil sürümüne git
  const clean = stripLocale(pathname);
  const langTarget = (target: Locale) => href(target, clean.startsWith("/blog") && !LOCALE_META[target].blog ? "/" : clean); // blog artık her dilde (LOCALE_META.blog), kural yeni bir tek dilli bölüm için kalıyor
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

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDrop(null); setLangOpen(false); setAcc(null); }, [pathname]);
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
      if (drop && !dropRef.current?.contains(e.target as Node)) setDrop(null);
      if (langOpen && !langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [drop, langOpen]);

  const isActive = (path: string) => clean === path || (path !== "/" && clean.startsWith(path + "/"));
  const nav = NAV_TEXT[locale];
  const items = navItems(locale, LOCALE_META[locale].blog);
  const ph = PROJECT_HASH[locale];
  const linkOf = (c: NavLink) => c.external ?? `${href(locale, c.path)}${c.hash ? `#${c.hash}` : ""}`;
  const itemOn = (it: NavItem) => isActive(it.path) || it.children.some((c) => c.path && isActive(c.path));
  const projectOn = isActive("/projects") || PROJECTS.some((p) => isActive(`/${p.slug}`));
  const byslug = (slug: string) => PROJECTS.find((p) => p.slug === slug)!;
  // açılır menü durumları: hangi başlık tıklamayla açık (dokunmatik), hangisi seçimden sonra kapalı tutuluyor
  const liClass = (key: string, on: boolean, extra = "") =>
    [drop === key ? "open" : "", shut === key ? "shut" : "", extra].join(" ").trim() || undefined;
  const opener = (key: string) => ({
    onMouseEnter: () => setShut(null), onFocus: () => setShut(null),
    onClick: () => { setShut(null); setDrop((d) => (d === key ? null : key)); },
  });
  const pickIn = (key: string) => () => { setDrop(null); setShut(key); (document.activeElement as HTMLElement | null)?.blur(); };
  const chevron = <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" /></svg>;

  return (
    <>
      <header className={`az-nav${solid ? " solid" : ""}`} id="az-nav">
        <div className="pill">
          <Link className="logo" href={href(locale, "/")} aria-label="DND Cyprus" prefetch={false} onClick={toTop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/DND-LOGO-2.svg" alt="DND Cyprus" width={70} height={30} />
          </Link>
          {/* menü: müşterinin akış belgesindeki 7 başlık (lib/azure/nav.ts). Seçimden sonra açılır menü kapalı kalır;
              fare başlığa yeniden gelince (ya da klavye odağında) açılabilir */}
          <ul ref={dropRef}>
            <li>
              <Link href={href(locale, "/")} className={isActive("/") ? "on" : undefined} prefetch={false} onClick={toTop}>{nav.home}</Link>
            </li>
            <li className={liClass("projects", projectOn)}>
              <button type="button" aria-haspopup="true" aria-expanded={drop === "projects"} className={projectOn ? "on" : undefined} {...opener("projects")}>
                {nav.projects}{chevron}
              </button>
              <div className="drop mega">
                {PROJECT_GROUPS.map((g) => (
                  <div className="grp" key={g.key}>
                    <Link className="gh" href={`${href(locale, "/projects")}#${ph[g.key]}`} prefetch={false} onClick={pickIn("projects")}>{nav.groups[g.key]} <Arrow size={14} /></Link>
                    {g.slugs.map((slug) => {
                      const p = byslug(slug);
                      return (
                        <Link key={slug} href={href(locale, `/${slug}`)} prefetch={false} onClick={pickIn("projects")}>
                          {/* 56 px küçük resim: tam boy fotoğraf yerine 64/128 px WebP */}
                          <Image src={p.thumb} alt="" width={56} height={56} quality={75} />
                          <span><b>{p.name}</b><small>{p.short[locale]}</small></span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
                <Link className="all" href={href(locale, "/projects")} prefetch={false} onClick={pickIn("projects")}>{nav.allProjects} <Arrow size={14} /></Link>
              </div>
            </li>
            {items.map((it) => it.children.length <= 1 ? (
              <li key={it.key}>
                <Link href={linkOf(it.children[0] ?? { label: it.label, path: it.path })} className={itemOn(it) ? "on" : undefined} prefetch={false}>{it.label}</Link>
              </li>
            ) : (
              <li key={it.key} className={liClass(it.key, itemOn(it), "sm")}>
                <button type="button" aria-haspopup="true" aria-expanded={drop === it.key} className={itemOn(it) ? "on" : undefined} {...opener(it.key)}>
                  {it.key === "payment" ? <><span className="lg">{it.label}</span><span className="sh">{nav.paymentShort}</span></> : it.label}{chevron}
                </button>
                <div className="drop list">
                  {it.children.map((c) => c.external
                    ? <a key={c.label} href={c.external} target="_blank" rel="noopener noreferrer" onClick={pickIn(it.key)}>{c.label}<Arrow size={14} /></a>
                    : <Link key={c.label} href={linkOf(c)} prefetch={false} onClick={pickIn(it.key)}>{c.label}<Arrow size={14} /></Link>)}
                </div>
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
        <Link className="big" href={href(locale, "/")} prefetch={false} onClick={toTop}>{nav.home}</Link>
        {/* her başlık açılır bölüm: dokununca alt başlıklar çip olarak açılır (aynı anda bir bölüm açık) */}
        <button type="button" className={`big acc${acc === "projects" ? " open" : ""}`} aria-expanded={acc === "projects"} aria-controls="az-mobile-projects" onClick={() => setAcc((a) => (a === "projects" ? null : "projects"))}>
          {nav.projects}
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" /></svg>
        </button>
        <div className="sub acc-body groups" id="az-mobile-projects" hidden={acc !== "projects"}>
          {PROJECT_GROUPS.map((g) => (
            <div key={g.key} className="g">
              <Link className="gh" href={`${href(locale, "/projects")}#${ph[g.key]}`} prefetch={false}>{nav.groups[g.key]}</Link>
              {g.slugs.map((slug) => <Link key={slug} href={href(locale, `/${slug}`)} prefetch={false}>{byslug(slug).name}</Link>)}
            </div>
          ))}
          <Link className="all" href={href(locale, "/projects")} prefetch={false}>{nav.allProjects} <Arrow /></Link>
        </div>
        {items.map((it) => it.children.length <= 1 ? (
          <Link key={it.key} className="big" href={linkOf(it.children[0] ?? { label: it.label, path: it.path })} prefetch={false}>{it.label}</Link>
        ) : (
          <div key={it.key} className="accw">
            <button type="button" className={`big acc${acc === it.key ? " open" : ""}`} aria-expanded={acc === it.key} aria-controls={`az-mobile-${it.key}`} onClick={() => setAcc((a) => (a === it.key ? null : it.key))}>
              {it.label}
              <svg width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>
            <div className="sub acc-body" id={`az-mobile-${it.key}`} hidden={acc !== it.key}>
              {it.children.map((c) => c.external
                ? <a key={c.label} href={c.external} target="_blank" rel="noopener noreferrer">{c.label}</a>
                : <Link key={c.label} href={linkOf(c)} prefetch={false} onClick={() => setOpen(false)}>{c.label}</Link>)}
            </div>
          </div>
        ))}
        <nav className="langs" aria-label={t.lang}>
          {LOCALES.map((l) => (
            <a key={l} href={langTarget(l)} className={l === locale ? "on" : undefined} lang={l} hrefLang={l} aria-current={l === locale ? "true" : undefined} onClick={(e) => { e.preventDefault(); switchTo(l); }}>{LOCALE_META[l].name}</a>
          ))}
        </nav>
        <div className="meta">
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <Link className="az-btn" href={href(locale, "/contact")} prefetch={false}>{t.cta}</Link>
        </div>
      </div>
    </>
  );
}
