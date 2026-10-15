"use client";

// Gizlilik sayfasındaki "Çerez tercihlerini değiştir" butonu → window.dndConsent.open()

export default function ConsentPreferencesButton({ locale }: { locale: "tr" | "en" }) {
  return (
    <button
      type="button"
      onClick={() => window.dndConsent?.open()}
      className="mt-4 inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d6570]"
      style={{ background: "#0d6570" }}
    >
      {locale === "tr" ? "Çerez tercihlerini değiştir" : "Change cookie preferences"}
    </button>
  );
}
