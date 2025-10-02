// app/components/Header.tsx
"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { FaPhoneAlt, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ---------------- Config ---------------- */
const LIGHT_SELECTORS = '[data-bg="light"], .light-section, .bg-white';

/* ---------------- Types ---------------- */
type NavLeaf = { label: string; href: string };
type NavGroup = {
  label: string;
  href?: string;          // NEW: makes the parent label a direct link when present
  items?: NavLeaf[];
};

/* ---------------- NAV ---------------- */
// Example: some parents are direct links, others are pure dropdowns
const NAV: NavGroup[] = [
  {
    label: "Ana\u00A0Sayfa", // prevents line break
    href: "/",
  },
  {
    label: "Projeler",
    href: "/projects",
  },
  {
    label: "Hakkımızda",
    href: "/about",
    items: [{ label: "Ekibimiz", href: "/team" }],
  },

  {
    label: "İletişim",
    href: "/contact",
    
  },
  {
    label: "Yazılar",
    href: "/contact",
        items: [
      { label: "Haberler", href: "/news" },
      { label: "Bloglar", href: "/blog" },
    ],
    
  },

];



function useNormalizedPathname() {
  const raw = usePathname() || "/";
  const noHash = raw.split("#")[0].split("?")[0];
  const noLocale = noHash.replace(/^\/(tr|en)(?=\/|$)/i, "");
  const clean = noLocale.replace(/\/+$/, "") || "/";
  return clean;
}

export default function Header() {
  const pathname = useNormalizedPathname();

  // Transparent routes (hero behind header)
  const isHome = pathname === "/";
  const isPerla = pathname === "/perla-ii" || pathname.startsWith("/perla-ii/");
  const isProjects = pathname === "/projects" || pathname.startsWith("/projects/");
  const isAbout = pathname === "/about" || pathname.startsWith("/about/");
    const isContact = pathname === "/contact" || pathname.startsWith("/contact/");

  const isTransparentRoute = isHome || isPerla || isProjects || isAbout || isContact ;

  const [scrolled, setScrolled] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnLight, setIsOnLight] = useState(false);
  const [openDrop, setOpenDrop] = useState<number | null>(null);
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [headerH, setHeaderH] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // hide-on-scroll (only for transparent routes)
  const lastY = useRef<number>(0);
  const [hideHeader, setHideHeader] = useState(false);

  // measure header height (no spacer used for sticky)
  useEffect(() => {
    const measure = () => {
      if (headerRef.current)
        setHeaderH(Math.ceil(headerRef.current.getBoundingClientRect().height));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // config values
  const FAB_SHOW_AT = isHome ? 600 : 600;
  const HIDE_DOWN_AT = isHome ? 400 : 400;
  const NEAR_TOP = 400;
  const MIN_DELTA = 50;

  useEffect(() => {
    let ticking = false;

    const run = () => {
      ticking = false;
      const y = window.scrollY;

      setScrolled(y > 8);
      setShowFab(y > FAB_SHOW_AT);

      if (!isTransparentRoute) return;

      const prev = lastY.current;
      const delta = Math.abs(y - prev);
      if (delta < MIN_DELTA) return;

      const goingDown = y > prev;

      if (goingDown && y > HIDE_DOWN_AT && !menuOpen) {
        setHideHeader(true);
      }

      if (y < NEAR_TOP) {
        setHideHeader(false);
      }

      lastY.current = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparentRoute, menuOpen, FAB_SHOW_AT, HIDE_DOWN_AT, NEAR_TOP]);

  /* Contrast detection for floating FAB */
  const recalcBg = useCallback(() => {
    const fab = document.getElementById("floating-hamburger");
    if (!fab) return;
    const rect = fab.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const candidates = Array.from(
      document.querySelectorAll(LIGHT_SELECTORS)
    ) as HTMLElement[];
    let onLight = false;
    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      if (centerY >= r.top && centerY <= r.bottom && r.height > 0 && r.width > 0) {
        onLight = true;
        break;
      }
    }
    setIsOnLight(onLight);
  }, []);
  useEffect(() => {
    recalcBg();
    window.addEventListener("scroll", recalcBg, { passive: true });
    window.addEventListener("resize", recalcBg);
    const interval = setInterval(recalcBg, 500);
    return () => {
      window.removeEventListener("scroll", recalcBg);
      window.removeEventListener("resize", recalcBg);
      clearInterval(interval);
    };
  }, [recalcBg]);

  /* Header classes */
  const positionClass = isTransparentRoute ? "fixed top-0" : "sticky top-0";
  const headerBase =
    `${positionClass} left-0 w-full z-50 transition-all duration-300 flex justify-between items-center px-6 md:px-10 py-4 md:py-6 will-change-transform`;

  const headerSkin = isTransparentRoute
    ? (scrolled ? "backdrop-blur-md ring-1 ring-white/10 bg-black/25" : "bg-transparent")
    : (scrolled
        ? "bg-white supports-[backdrop-filter]:backdrop-blur-md border-b border-black/10 shadow-sm"
        : "bg-white border-b border-black/10");

  const hideClass = isTransparentRoute && hideHeader ? "-translate-y-full" : "translate-y-0";

  const onTransparent = isTransparentRoute;
  const linkColor = onTransparent ? "rgba(255,255,255,0.88)" : "rgba(20,21,23,0.88)";
  const linkHover = onTransparent ? "#ffffff" : "#000000";
  const subColor = onTransparent ? "rgba(255,255,255,0.82)" : "rgba(20,21,23,0.72)";
  const dividerClass = onTransparent ? "bg-white/35" : "bg-black/15";

  return (
    <>
      <header ref={headerRef} className={[headerBase, headerSkin, hideClass].join(" ")}>
        {/* Logo */}
        <Link href="/" className="inline-block" prefetch={false}>
          <Image
            src={onTransparent ? "/DND-LOGO-LIGHT.svg" : "/DND-LOGO-2.svg"}
            alt="DND Cyprus"
            width={140}
            height={50}
            className="h-auto w-[120px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {NAV.map((group, i) => {
            const hasDropdown = (group.items?.length ?? 0) > 0;
            const hasHref = !!group.href;

            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenDrop(i)}
                onMouseLeave={() => setOpenDrop((o) => (o === i ? null : o))}
              >
                {/* Parent label: either a Link (direct) or a span/button (no link) */}
                {hasHref ? (
                  <Link
                    href={group.href!}
                    prefetch={false}
                    className="inline-flex items-center"
                    onFocus={() => setOpenDrop(i)}
                  >
                    <motion.span
                      animate={{ color: linkColor }}
                      transition={{ duration: 0.25 }}
                    >
                      {group.label}
                    </motion.span>
                    <motion.span
                      layoutId="nav-underline"
                      className="block h-[2px] mt-1 w-full"
                      animate={{ backgroundColor: openDrop === i ? linkHover : "transparent" }}
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="cursor-default select-none"
                    onFocus={() => setOpenDrop(i)}
                    aria-haspopup={hasDropdown ? "menu" : undefined}
                    aria-expanded={openDrop === i}
                  >
                    <motion.span
                      animate={{ color: linkColor }}
                      transition={{ duration: 0.25 }}
                    >
                      {group.label}
                    </motion.span>
                    <motion.span
                      layoutId="nav-underline"
                      className="block h-[2px] mt-1"
                      animate={{ backgroundColor: openDrop === i ? linkHover : "transparent" }}
                    />
                  </button>
                )}

                {/* Dropdown (if any) */}
                <AnimatePresence>
                  {hasDropdown && openDrop === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 mt-3 min-w-[220px] rounded-2xl overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.22)",
                      }}
                    >
                      <div
                        className="p-2"
                        style={{
                          background: onTransparent
                            ? "rgba(20,21,23,0.78)"
                            : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.94))",
                          border: onTransparent
                            ? "1px solid rgba(255,255,255,0.2)"
                            : "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {group.items!.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            prefetch={false}
                            className="block px-3 py-2 rounded-xl transition-colors hover:opacity-100"
                            style={{
                              color: onTransparent ? "rgba(255,255,255,0.95)" : "rgba(20,21,23,0.88)",
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <motion.button
            animate={{ color: subColor }}
            transition={{ duration: 0.25 }}
            className="text-sm hover:opacity-100 flex items-center gap-1 transition"
          >
            TR
          </motion.button>

          <div className={`h-5 w-px ${dividerClass}`} />

          <a
            href="tel:+905551112233"
            className={[
              "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm transition",
              onTransparent
                ? "text-white/90 bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black"
                : "text-black bg-black/[0.04] border border-black/10 hover:bg-black/10"
            ].join(" ")}
          >
            <FaPhoneAlt className="text-sm" />
            <span>Ara</span>
          </a>
        </div>
      </header>

      {/* Floating Hamburger FAB */}
      {showFab && !menuOpen && (
        <button
          id="floating-hamburger"
          onClick={() => setMenuOpen(true)}
          className={[
            "fixed top-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center transition shadow-lg border pointer-events-auto",
            isOnLight
              ? "bg-black/70 border-black/30 text-white hover:bg-black/80"
              : "text-white bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20"
          ].join(" ")}
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[10000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className={[
                "fixed top-0 right-0 h-full w-5/6 sm:w-2/3 md:w-1/3 z-[10001]",
                "backdrop-blur-lg bg-white/10 border-l border-white/20",
                "rounded-l-2xl shadow-lg p-0",
                "text-white flex flex-col",
                "pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)]"
              ].join(" ")}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              role="dialog"
              aria-modal="true"
            >
              {/* Top row: logo + home + close */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/15">
                <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3" prefetch={false}>
                  <div className="relative w-22 h-22 rounded-xl overflow-hidden ">
                    <Image src="/DND-LOGO-LIGHT.svg" alt="DND Cyprus" fill className="object-contain p-1" />
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    prefetch={false}
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M12 3.172 3 10h2v9h5v-6h4v6h5v-9h2z"/></svg>
                    Anasayfa
                  </Link>
                  <button
                    className="px-3 py-2 rounded-xl bg-white/15 border border-white/20 hover:bg-white hover:text-black transition"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Quick bar: language toggle (optional) */}
              <div className="px-5 py-3  flex items-center justify-between">
                <span className="text-xs opacity-80">Dili değiştir:</span>
                <div className="flex items-center gap-2 text-xs">
                  <Link href="#" className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">TR</Link>
                  <Link href="#" className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">EN</Link>
                </div>
              </div>

              {/* NAV accordion */}
              <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
                {NAV.map((group, i) => {
                  const hasDropdown = (group.items?.length ?? 0) > 0;
                  const hasHref = !!group.href;
                  const open = openAcc === i;

                  // Simple case: direct link only (no dropdown)
                  if (hasHref && !hasDropdown) {
                    return (
                      <Link
                        key={group.label}
                        href={group.href!}
                        prefetch={false}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20"
                      >
                        {group.label}
                      </Link>
                    );
                  }

                  // Link + dropdown: label navigates, chevron toggles
                  return (
                    <div key={group.label} className="rounded-2xl overflow-hidden border border-white/15">
                      <div className="w-full flex items-center justify-between px-4 py-3 bg-white/10">
                        <div className="min-w-0">
                          {hasHref ? (
                            <Link
                              href={group.href!}
                              prefetch={false}
                              onClick={() => setMenuOpen(false)}
                              className="font-medium hover:underline underline-offset-4"
                            >
                              {group.label}
                            </Link>
                          ) : (
                            <span className="font-medium">{group.label}</span>
                          )}
                        </div>
                        {hasDropdown && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenAcc(open ? null : i);
                            }}
                            className="ml-3 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-sm"
                            aria-label="Alt menüyü aç/kapat"
                            aria-expanded={open}
                          >
                            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              ▾
                            </motion.span>
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {hasDropdown && open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="bg-white/8"
                          >
                            {group.items!.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                prefetch={false}
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-2.5 hover:bg-white/10"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-5 pt-3 pb-2 border-top border-white/10 text-[11px] opacity-80">
                © {new Date().getFullYear()} DND Cyprus. Tüm hakları saklıdır.
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
