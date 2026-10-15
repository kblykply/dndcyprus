"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  ids: string[];
  autoplayMs: number;
  locale: "tr" | "en";
  onVisit: (index: number) => void;
};

// The hero only needs a fade between full-screen slides. Keep the first slide
// in server HTML and load the larger carousel library in media sections later.
export default function HeroCarousel({ children, ids, autoplayMs, locale, onVisit }: Props) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const lastWheel = useRef(-Infinity);

  const goTo = useCallback((index: number, updateHash = true) => {
    if (!ids.length) return;
    const next = ((index % ids.length) + ids.length) % ids.length;
    if (next !== active) setLeaving(active);
    const focusedSlide = document.activeElement?.closest<HTMLElement>("[data-hero-slide]");
    if (focusedSlide && region.current?.contains(focusedSlide) && Number(focusedSlide.dataset.heroSlide) !== next) {
      region.current.focus({ preventScroll: true });
    }
    setActive(next);
    onVisit(next);
    if (updateHash) {
      const url = new URL(location.href);
      url.hash = ids[next];
      history.replaceState(history.state, "", url);
    }
  }, [active, ids, onVisit]);

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), reducedMotion ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [leaving, reducedMotion]);

  useEffect(() => {
    const syncHash = () => {
      try {
        const index = ids.indexOf(decodeURIComponent(location.hash.slice(1)));
        if (index >= 0) goTo(index, false);
      } catch { /* Ignore malformed or unrelated anchors. */ }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [ids, goTo]);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(query.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    query.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      query.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (slides.length < 2 || autoplayMs <= 0 || hovered || focused || hidden || reducedMotion) return;
    const timer = window.setTimeout(() => goTo(active + 1), autoplayMs);
    return () => window.clearTimeout(timer);
  }, [active, autoplayMs, focused, goTo, hidden, hovered, reducedMotion, slides.length]);

  useEffect(() => {
    const element = region.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < 30 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (performance.now() - lastWheel.current < 900) return;
      lastWheel.current = performance.now();
      goTo(active + (event.deltaX > 0 ? 1 : -1));
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [active, goTo]);

  const tr = locale === "tr";
  return (
    <div
      ref={region}
      className="hero-carousel relative h-full overflow-hidden"
      role="region"
      aria-roledescription={tr ? "slayt gösterisi" : "carousel"}
      aria-label={tr ? "Projeler" : "Projects"}
      tabIndex={0}
      style={{ touchAction: "pan-y pinch-zoom" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if ((event.target as HTMLElement).closest("input, textarea, select, [contenteditable='true']")) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onPointerDown={event => {
        if ((event.target as HTMLElement).closest("a, button")) return;
        pointer.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={event => {
        const start = pointer.current;
        pointer.current = null;
        if (!start) return;
        const dx = event.clientX - start.x, dy = event.clientY - start.y;
        if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(active + (dx < 0 ? 1 : -1));
      }}
      onPointerCancel={() => { pointer.current = null; }}
    >
      {slides.map((slide, index) => (
        <div
          key={ids[index]}
          data-hero-slide={index}
          role="group"
          aria-roledescription={tr ? "slayt" : "slide"}
          aria-label={`${index + 1} / ${slides.length}`}
          aria-hidden={index !== active}
          inert={index !== active}
          hidden={index !== active && index !== leaving}
          className={`hero-carousel-slide absolute inset-0 ${index === leaving ? "z-20 opacity-0 pointer-events-none" : index === active ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"}`}
        >
          {slide}
        </div>
      ))}
      {slides.length > 1 && <>
        <button type="button" className="hero-carousel-arrow hero-carousel-prev" onClick={() => goTo(active - 1)} aria-label={tr ? "Önceki slayt" : "Previous slide"}>‹</button>
        <button type="button" className="hero-carousel-arrow hero-carousel-next" onClick={() => goTo(active + 1)} aria-label={tr ? "Sonraki slayt" : "Next slide"}>›</button>
        <div className="hero-carousel-pagination">
          {ids.map((id, index) => <button key={id} type="button" className={`hero-carousel-dot ${index === active ? "hero-carousel-dot-active" : ""}`} onClick={() => goTo(index)} aria-label={tr ? `${index + 1}. slayta git` : `Go to slide ${index + 1}`} aria-current={index === active ? "true" : undefined} />)}
        </div>
      </>}
    </div>
  );
}
