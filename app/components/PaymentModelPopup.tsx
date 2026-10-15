"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, X } from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
// Oturum başına bir kez; kampanya değişirse anahtarın sürümü artırılır
const DISMISS_KEY = "dnd_tl_payment_popup_v1";

/*
  Yeni TL ödeme modeli tanıtımı — ana sayfa ilk açıldığında video popup'ı.
  - Sayfa `load` olduktan ve tarayıcı boşta kalınca açılır (LCP ile yarışmaz).
  - Dialog semantiği: role/aria-modal, açılışta odak kapat düğmesinde, ESC ve arka plana tıklama kapatır.
  - Video sessiz başlar (tarayıcı otomatik oynatma kuralı); ses düğmesiyle açılır.
*/
export default function PaymentModelPopup() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {}
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const show = () => setOpen(true);
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(show, { timeout: 2500 });
      } else {
        timerId = setTimeout(show, 800);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, []);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    videoRef.current?.pause();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !muted;
    if (muted) el.play().catch(() => {});
    setMuted(!muted);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tl-payment-popup-title"
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative flex max-h-[calc(100svh-2rem)] w-full max-w-[860px] flex-col overflow-hidden rounded-3xl bg-[#0f1416] text-white shadow-2xl ring-1 ring-white/10 md:flex-row">
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Kapat"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 transition hover:bg-black/75"
        >
          <X size={18} />
        </button>

        {/* Dikey (9:16) reel videosu */}
        <div className="relative flex shrink-0 justify-center bg-black md:w-[46%]">
          <video
            ref={videoRef}
            src="/videos/tl-odeme-modeli.mp4"
            poster="/videos/tl-odeme-modeli.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="aspect-[9/16] h-[46svh] w-auto object-cover md:h-auto md:max-h-[calc(100svh-2rem)] md:w-full"
          />
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={!muted}
            className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-lg backdrop-blur-md"
            style={{
              background: muted ? `${ORANGE}33` : `${TEAL}33`,
              border: `1px solid ${muted ? `${ORANGE}88` : `${TEAL}88`}`,
            }}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {muted ? "Sesi Aç" : "Sesi Kapat"}
          </button>
        </div>

        <div className="flex flex-col justify-center gap-4 overflow-y-auto p-6 sm:p-8">
          <span
            className="inline-block self-start rounded-full px-3 py-1 text-[12px] uppercase tracking-wide"
            style={{ background: `${TEAL}44`, border: `1px solid ${TEAL}66` }}
          >
            Yeni Ödeme Modeli
          </span>
          <h2 id="tl-payment-popup-title" className="text-2xl font-semibold leading-tight sm:text-3xl">
            Maaşınız TL, taksitiniz de TL
          </h2>
          <p className="text-sm text-white/80 sm:text-base">
            Size özel yeni konut finansman modeliyle Lagoon Verde&apos;de 60 aya kadar
            faizsiz ve vade farksız ödeme.
          </p>
          <ul className="space-y-2 text-sm sm:text-base">
            {[
              "Banka, faiz ve kefil yok",
              "Kur farkı ve vade farkı yok",
              "Taksitler KKTC asgari ücret artışına göre dönemsel güncellenir",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-[7px] inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ background: ORANGE, boxShadow: `0 0 0 3px ${ORANGE}33` }}
                />
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/tr/lagoon-verde"
              onClick={dismiss}
              className="rounded-full px-6 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: TEAL, boxShadow: `0 10px 24px ${TEAL}55` }}
            >
              Lagoon Verde&apos;yi İncele
            </Link>
            <Link
              href="/tr/contact"
              onClick={dismiss}
              className="rounded-full px-6 py-2.5 text-sm font-medium"
              style={{ background: `${ORANGE}33`, border: `1px solid ${ORANGE}66` }}
            >
              Bilgi Al
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
