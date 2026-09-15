"use client";

// Hafif çerez izni bandı (üçüncü taraf CMP yok). Sayfayı kilitlemez, fixed olduğu için kayma yaratmaz.
// window.dndConsent.open() ile tercihler yeniden açılır.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { localeFromPath, readConsent, saveConsent, type ConsentChoice } from "@/lib/analytics";

const TEAL = "#27959b";

const TEXT = {
  tr: {
    title: "Çerez tercihleri",
    body: "Zorunlu çerezlerin yanında, izninizle Google Analytics, Google Ads ve Meta ile ziyaretleri ve reklam sonuçlarını ölçüyoruz. Tercihinizi istediğiniz zaman değiştirebilirsiniz.",
    policy: "Gizlilik ve Çerez Politikası",
    policyHref: "/tr/privacy#cerez-reklam",
    acceptAll: "Tümünü kabul et",
    necessaryOnly: "Yalnızca zorunlu",
    preferences: "Tercihler",
    save: "Tercihleri kaydet",
    close: "Kapat",
    back: "Geri",
    necessary: "Zorunlu",
    necessaryDesc: "Sitenin çalışması ve çerez tercihinizin saklanması için gerekir.",
    alwaysOn: "Her zaman açık",
    analytics: "Analitik",
    analyticsDesc: "Ziyaret istatistikleri (Google Analytics 4).",
    ads: "Reklam",
    adsDesc: "Reklam ölçümü ve kişiselleştirme (Google Ads, Meta Pixel ve Dönüşüm API'si).",
  },
  en: {
    title: "Cookie preferences",
    body: "Besides necessary cookies, with your permission we use Google Analytics, Google Ads and Meta to measure visits and ad results. You can change your choice at any time.",
    policy: "Privacy and Cookie Policy",
    policyHref: "/en/privacy#cerez-reklam",
    acceptAll: "Accept all",
    necessaryOnly: "Necessary only",
    preferences: "Preferences",
    save: "Save preferences",
    close: "Close",
    back: "Back",
    necessary: "Necessary",
    necessaryDesc: "Required for the site to work and to remember your cookie choice.",
    alwaysOn: "Always on",
    analytics: "Analytics",
    analyticsDesc: "Visit statistics (Google Analytics 4).",
    ads: "Advertising",
    adsDesc: "Ad measurement and personalisation (Google Ads, Meta Pixel and Conversions API).",
  },
} as const;

/** initialOpen: sunucu, izin çerezi olmadığını gördüyse bant ilk HTML ile gelir (JS beklenmez, LCP gecikmez) */
export default function ConsentBanner({ initialOpen = false }: { initialOpen?: boolean }) {
  const pathname = usePathname() || "";
  const t = TEXT[localeFromPath(pathname)];
  const uid = useId();
  const titleId = `${uid}-title`;
  const bodyId = `${uid}-body`;

  const [open, setOpen] = useState(initialOpen);
  const [view, setView] = useState<"summary" | "prefs">("summary");
  const [hasChoice, setHasChoice] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ analytics: false, ads: false });
  const panelRef = useRef<HTMLDivElement>(null);
  const focusOnOpen = useRef(false);

  const openPreferences = useCallback(() => {
    const c = readConsent();
    setDraft({ analytics: !!c?.analytics, ads: !!c?.ads });
    setHasChoice(!!c);
    setView("prefs");
    focusOnOpen.current = true;
    setOpen(true);
  }, []);

  useEffect(() => {
    // Sunucu çerezi göremediyse bant zaten açık gelir; tarayıcıdaki gerçek duruma göre düzelt
    const c = readConsent();
    setHasChoice(!!c);
    // Statik sayfalarda sunucu çerezi göremez; seçim yapılmışsa bandı kapat
    setOpen(!c);

    window.dndConsent = { open: openPreferences, get: readConsent };
    return () => {
      if (window.dndConsent?.open === openPreferences) delete window.dndConsent;
    };
  }, [openPreferences]);

  useEffect(() => {
    // Kullanıcı açtıysa odak panele taşınır (ilk otomatik gösterimde odak çalınmaz)
    if (open && focusOnOpen.current) {
      focusOnOpen.current = false;
      panelRef.current?.focus();
    }
  }, [open, view]);

  const decide = (choice: ConsentChoice) => {
    saveConsent(choice);
    setHasChoice(true);
    setOpen(false);
    setView("summary");
  };

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && hasChoice) setOpen(false);
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={[
        // Mobil: WhatsApp butonunun üstünde; masaüstü: sol alt (sağdaki WhatsApp ve soldaki sosyal ikonlardan uzak)
        "fixed z-[9999] inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)]",
        "sm:inset-x-auto sm:left-20 sm:bottom-6 sm:w-[26rem]",
        "max-h-[calc(100svh-7rem)] overflow-y-auto rounded-2xl p-3.5 sm:p-5 outline-none",
        "text-[#141517] focus-visible:ring-4 focus-visible:ring-[#27959b]/25",
      ].join(" ")}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))",
        border: "1px solid rgba(20,21,23,0.08)",
        boxShadow: "0 18px 44px rgba(0,0,0,0.14), inset 0 1px rgba(255,255,255,0.65)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id={titleId} className="text-[15px] font-semibold tracking-tight">
          {t.title}
        </h2>
        {hasChoice ? (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-1 -mt-1 rounded-full px-2 py-1 text-xs text-[rgba(20,21,23,0.6)] hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-[#27959b]"
          >
            {t.close}
          </button>
        ) : null}
      </div>

      <p id={bodyId} className="mt-1.5 text-[13px] leading-relaxed text-[rgba(20,21,23,0.72)]">
        {view === "summary" ? t.body : null}{" "}
        <Link href={t.policyHref} className="font-medium underline underline-offset-2" style={{ color: TEAL }}>
          {t.policy}
        </Link>
      </p>

      {view === "prefs" ? (
        <ul className="mt-3 space-y-2">
          <PrefRow title={t.necessary} desc={t.necessaryDesc} fixedLabel={t.alwaysOn} />
          <PrefRow
            title={t.analytics}
            desc={t.analyticsDesc}
            checked={draft.analytics}
            onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
          />
          <PrefRow
            title={t.ads}
            desc={t.adsDesc}
            checked={draft.ads}
            onChange={(v) => setDraft((d) => ({ ...d, ads: v }))}
          />
        </ul>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => decide({ analytics: false, ads: false })}
          className="rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors hover:bg-black/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27959b]"
          style={{ border: `1px solid ${TEAL}66`, color: TEAL, background: "#fff" }}
        >
          {t.necessaryOnly}
        </button>
        <button
          type="button"
          onClick={() => decide({ analytics: true, ads: true })}
          className="rounded-xl px-3 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27959b]"
          style={{ background: TEAL, border: `1px solid ${TEAL}`, boxShadow: `0 10px 24px ${TEAL}33` }}
        >
          {t.acceptAll}
        </button>
      </div>

      <div className="mt-2 flex justify-center">
        {view === "summary" ? (
          <button
            type="button"
            onClick={() => {
              const c = readConsent();
              setDraft({ analytics: !!c?.analytics, ads: !!c?.ads });
              setView("prefs");
            }}
            className="rounded-lg px-3 py-1.5 text-[13px] font-medium underline underline-offset-2 text-[rgba(20,21,23,0.7)] hover:text-[#141517] focus-visible:outline-2 focus-visible:outline-[#27959b]"
          >
            {t.preferences}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => decide(draft)}
            className="w-full rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors hover:bg-black/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27959b]"
            style={{ background: "rgba(20,21,23,0.04)", border: "1px solid rgba(20,21,23,0.1)" }}
          >
            {t.save}
          </button>
        )}
      </div>
    </div>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  onChange,
  fixedLabel,
}: {
  title: string;
  desc: string;
  checked?: boolean;
  onChange?: (v: boolean) => void;
  fixedLabel?: string;
}) {
  const id = useId();
  return (
    <li
      className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
      style={{ background: "#fff", border: "1px solid rgba(20,21,23,0.08)" }}
    >
      <div className="min-w-0">
        <p id={`${id}-l`} className="text-[13px] font-medium">
          {title}
        </p>
        <p id={`${id}-d`} className="text-[12px] leading-snug text-[rgba(20,21,23,0.6)]">
          {desc}
        </p>
      </div>
      {fixedLabel ? (
        <span className="shrink-0 text-[11px] font-medium" style={{ color: TEAL }}>
          {fixedLabel}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={!!checked}
          aria-labelledby={`${id}-l`}
          aria-describedby={`${id}-d`}
          onClick={() => onChange?.(!checked)}
          className="relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27959b]"
          style={{ background: checked ? TEAL : "rgba(20,21,23,0.18)" }}
        >
          <span
            aria-hidden
            className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
            style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
          />
        </button>
      )}
    </li>
  );
}
