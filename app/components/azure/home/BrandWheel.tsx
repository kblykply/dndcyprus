"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./brand-wheel.css";

export type WheelItem = { name: string; logo: string; href?: string; external?: boolean; muted?: boolean };

/**
 * Marka şeridi: logolar dik kartlarda tek sıra halinde yavaşça ve sonsuz kayar.
 * Fareyle üzerine gelince durur, sürükleyerek / kaydırarak çevrilir, klavyeyle odaklanan logo ortaya gelir.
 * JS yoksa ya da ölçülmeden önce ortalı, sarmalanan bir sıra olarak görünür.
 */
export default function BrandWheel({ items, label }: { items: WheelItem[]; label: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const focusTo = useRef<(i: number) => void>(() => {});
  const [ready, setReady] = useState(false);
  // az logo varsa şerit geniş ekranı doldurup kesintisiz dönebilsin diye liste kopyalanır (kopyalar ekran okuyucuya ve klavyeye kapalı)
  const copies = items.length ? Math.max(1, Math.ceil(12 / items.length)) : 1;
  const loop = Array.from({ length: copies }, (_, c) => items.map((b) => ({ ...b, copy: c }))).flat();
  const n = loop.length;

  useEffect(() => {
    const el = wrap.current;
    if (!el || !n) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 18;
    const SPEED = reduce ? 0 : 28; // px/sn
    let W = 0, cw = 0, S = 0, L = 0;
    let offset = 0, vel = 0, last = performance.now(), raf = 0, visible = false, hover = false, suppress = false;
    let drag: { x: number; o: number; moved: number; t: number; lx: number } | null = null;

    const measure = () => {
      const c = cards.current[0];
      if (!c) return;
      W = el.clientWidth;
      cw = c.offsetWidth;
      S = cw + GAP;
      L = S * n;
    };

    const layout = () => {
      if (!L) return;
      for (let i = 0; i < n; i++) {
        const node = cards.current[i];
        if (!node) continue;
        const x = ((((i * S - offset) % L) + L) % L) - S;
        node.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag) {
        if (Math.abs(vel) > 4) { offset += vel * dt; vel *= Math.exp(-dt * 2.6); }
        else { vel = 0; if (!hover) offset += SPEED * dt; }
      }
      layout();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(tick); } };

    focusTo.current = (i: number) => {
      // odaklanan logoyu ortaya getir
      offset = i * S - (W / 2 - cw / 2 + S);
      vel = 0;
      layout();
    };

    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      offset = drag.o - dx;
      const now = performance.now();
      const dts = (now - drag.t) / 1000;
      if (dts > 0) vel = Math.max(-2400, Math.min(2400, -(e.clientX - drag.lx) / dts));
      drag.t = now;
      drag.lx = e.clientX;
      if (!raf) layout();
    };
    const onUp = () => {
      if (drag && drag.moved > 6) suppress = true;
      if (drag && performance.now() - drag.t > 80) vel = 0; // bırakmadan önce durduysa savurma yok
      drag = null;
      el.classList.remove("drag");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, o: offset, moved: 0, t: performance.now(), lx: e.clientX };
      vel = 0;
      el.classList.add("drag");
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };
    const onClick = (e: MouseEvent) => { if (suppress) { e.preventDefault(); e.stopPropagation(); suppress = false; } };
    const onEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") hover = true; };
    const onLeave = () => { hover = false; };
    const onFocusIn = () => { hover = true; };
    const onFocusOut = () => { hover = false; };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("click", onClick, true);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);

    const ro = new ResizeObserver(() => { measure(); layout(); });
    ro.observe(el);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); }, { rootMargin: "120px 0px" });
    io.observe(el);

    measure();
    offset = -(W / 2 - cw / 2 + S) + S * Math.floor(n / 2); // ilk karede ortada bir logo
    layout();
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      onUp();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [n]);

  return (
    <div ref={wrap} className={`az-wheel${ready ? " ready" : ""}`} role="region" aria-label={label}>
      {loop.map((b, i) => {
        const dup = b.copy > 0;
        const key = `${b.name}-${b.copy}`;
        const img = (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.logo} alt={dup ? "" : b.name} loading="lazy" decoding="async" draggable={false} />
        );
        const common = {
          ref: (node: HTMLElement | null) => { cards.current[i] = node; },
          className: `card${b.muted ? " muted" : ""}`,
          title: b.name,
          onFocus: () => focusTo.current(i),
          ...(dup ? { "aria-hidden": true, tabIndex: -1 } : {}),
        };
        if (!b.href) return <span key={key} {...common}>{img}</span>;
        return b.external
          ? <a key={key} {...common} href={b.href} target="_blank" rel="noopener noreferrer" draggable={false}>{img}</a>
          : <Link key={key} {...common} href={b.href} prefetch={false} draggable={false}>{img}</Link>;
      })}
    </div>
  );
}
