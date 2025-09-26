// app/components/Header.tsx
"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { FaGlobe, FaPhoneAlt, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ---------------- Config ---------------- */
const LIGHT_SELECTORS = '[data-bg="light"], .light-section, .bg-white';





const NAV = [
  {
    label: "Kurumsal",
    items: [
      { label: "Hakkımızda", href: "/about" },
      { label: "Liderlik", href: "/about#leadership" },
      { label: "Sertifikalar", href: "/about#awards" },
    ],
  },
  {
    label: "Projeler",
    items: [
      { label: "Tüm Projeler", href: "/projects" },
      { label: "Daireler (Units)", href: "/units" },
      { label: "DND USA", href: "/dnd-usa" },
    ],
  },
  {
    label: "İletişim",
    items: [
      { label: "Bize Ulaşın", href: "/contact" },
      { label: "Ofisler", href: "/contact#offices" },
    ],
  },
  {
    label: "Diğer",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Ozan Dökmecioğlu", href: "/ozan-dokmecioglu" },
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

  const isTransparentRoute = isHome || isPerla || isProjects || isAbout;

  const [scrolled, setScrolled] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnLight, setIsOnLight] = useState(false);
  const [openDrop, setOpenDrop] = useState<number | null>(null);
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [headerH, setHeaderH] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // NEW: hide-on-scroll state (only for transparent routes)
  const lastY = useRef<number>(0);
  const [hideHeader, setHideHeader] = useState(false);

  // measure header height (no spacer used for sticky)
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderH(Math.ceil(headerRef.current.getBoundingClientRect().height));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);


// config values
// thresholds per route
const FAB_SHOW_AT = isHome ? 600 : 600;   // show FAB later on home
const HIDE_DOWN_AT = isHome ? 400 : 400;  // hide header later on home
const NEAR_TOP = 400;                     // only show again near top
const MIN_DELTA = 50;                      // ignore small scroll jitters

useEffect(() => {
  let ticking = false;

  const run = () => {
    ticking = false;
    const y = window.scrollY;

    // elevation & fab threshold
    setScrolled(y > 8);
    setShowFab(y > FAB_SHOW_AT);

    if (!isTransparentRoute) return;

    const prev = lastY.current;
    const delta = Math.abs(y - prev);
    if (delta < MIN_DELTA) return;

    const goingDown = y > prev;

    // hide later (route-specific)
    if (goingDown && y > HIDE_DOWN_AT && !menuOpen) {
      setHideHeader(true);
    }

    // only show again when near the very top
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

  // initial run + bind
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
    const candidates = Array.from(document.querySelectorAll(LIGHT_SELECTORS)) as HTMLElement[];
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

  // Skin: stay transparent on hero; blur when scrolled
  const headerSkin = isTransparentRoute
    ? (scrolled ? "backdrop-blur-md ring-1 ring-white/10 bg-black/25" : "bg-transparent")
    : (scrolled
        ? "bg-white supports-[backdrop-filter]:backdrop-blur-md border-b border-black/10 shadow-sm"
        : "bg-white border-b border-black/10");

  // Translate away only on transparent routes
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
        <Link href="/" className="inline-block">
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
          {NAV.map((group, i) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenDrop(i)}
              onMouseLeave={() => setOpenDrop((o) => (o === i ? null : o))}
            >
              <motion.a
                href={group.items[0]?.href || "#"}
                onClick={(e) => e.preventDefault()}
                className="cursor-default select-none"
                animate={{ color: linkColor }}
                transition={{ duration: 0.25 }}
                onFocus={() => setOpenDrop(i)}
              >
                {group.label}
                <motion.span
                  layoutId="nav-underline"
                  className="block h-[2px] mt-1"
                  animate={{ backgroundColor: openDrop === i ? linkHover : "transparent" }}
                />
              </motion.a>

              <AnimatePresence>
                {openDrop === i && (
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
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
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
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <motion.button
            animate={{ color: subColor }}
            transition={{ duration: 0.25 }}
            className="text-sm hover:opacity-100 flex items-center gap-1 transition"
          >
            <FaGlobe className="text-base" />
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

      {/* No spacer needed; sticky reserves space itself. */}

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
          // safe areas
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
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <div className="relative w-22 h-22 rounded-xl overflow-hidden ">
              {/* replace with your logo path */}
              <Image src="/DND-LOGO-LIGHT.svg" alt="DND Cyprus" fill className="object-contain p-1" />
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
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
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs opacity-80">Dili değiştir:</span>
          <div className="flex items-center gap-2 text-xs">
            <Link href="#" className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">TR</Link>
            <Link href="#" className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">EN</Link>
          </div>
        </div>

        {/* NAV accordion */}
        <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
          {NAV.map((group, i) => {
            const open = openAcc === i;
            return (
              <div key={group.label} className="rounded-2xl overflow-hidden border border-white/15">
                <button
                  onClick={() => setOpenAcc(open ? null : i)}
                  className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/15 transition flex items-center justify-between"
                >
                  <span className="font-medium">{group.label}</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm"
                  >
                    ▾
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="bg-white/8"
                    >
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
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

        

          {/* Contact CTA block */}
          <div className="mt-4 rounded-2xl p-4 bg-white/8 border border-white/15">
            <div className="flex items-center gap-2 mb-3 text-sm/5">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.49a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01z"/></svg>
              <a href="tel:+905551112233" className="underline underline-offset-2">+90 555 111 22 33</a>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <a href="tel:+905551112233" className="px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-center hover:bg-white/25">
                Ara
              </a>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-center hover:bg-white/25">
                İletişim
              </Link>
              <Link href="/book-a-visit" onClick={() => setMenuOpen(false)} className="col-span-2 px-3 py-2 rounded-xl bg-white/20 border border-white/25 text-center hover:bg-white/30">
                Ziyaret Randevusu Al
              </Link>
            </div>
          </div>

     
        </nav>

        {/* Footer */}
        <div className="px-5 pt-3 pb-2 border-t border-white/10 text-[11px] opacity-80">
          © {new Date().getFullYear()} DND Cyprus. Tüm hakları saklıdır.
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>

    </>
  );
}
