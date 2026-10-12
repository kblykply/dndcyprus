"use client";

import { useEffect, useState } from "react";

const SELECTORS = '[data-bg="light"], .light-section, .bg-white';
type Subscription = { id: string; update: (light: boolean) => void };
const subscriptions = new Set<Subscription>();
let frame = 0;
let sections: HTMLElement[] = [];
let dirty = true;
let disconnect: (() => void) | undefined;

// Floating controls share one set of geometry reads per frame. No polling is
// needed: scroll, resize, media loads and layout changes invalidate the result.
function measure() {
  frame = 0;
  const controls = [...subscriptions].map((subscription) => ({
    subscription, rect: document.getElementById(subscription.id)?.getBoundingClientRect(),
  })).filter(({ rect }) => rect && rect.width > 0 && rect.height > 0);
  if (!controls.length) return;
  if (dirty) {
    sections = [...document.querySelectorAll<HTMLElement>(SELECTORS)];
    dirty = false;
  }
  const bounds = sections.map((section) => section.getBoundingClientRect());
  for (const { subscription, rect } of controls) {
    const x = rect!.left + rect!.width / 2;
    const y = rect!.top + rect!.height / 2;
    subscription.update(bounds.some((bound) => bound.width > 0 && bound.height > 0 &&
      x >= bound.left && x <= bound.right && y >= bound.top && y <= bound.bottom));
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure);
}

function start() {
  dirty = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  document.addEventListener("load", schedule, true);
  const mutation = new MutationObserver(() => { dirty = true; schedule(); });
  mutation.observe(document.body, { childList: true, subtree: true });
  const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
  resize?.observe(document.body);
  disconnect = () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    document.removeEventListener("load", schedule, true);
    mutation.disconnect();
    resize?.disconnect();
    cancelAnimationFrame(frame);
    frame = 0;
    sections = [];
    disconnect = undefined;
  };
}

export function useLightBackground(id: string, enabled = true) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const subscription = { id, update: setLight };
    subscriptions.add(subscription);
    if (!disconnect) start();
    schedule();
    return () => {
      subscriptions.delete(subscription);
      if (!subscriptions.size) disconnect?.();
    };
  }, [id, enabled]);
  return light;
}
