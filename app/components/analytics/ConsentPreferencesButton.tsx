"use client";

// Gizlilik sayfasındaki "Çerez tercihlerini değiştir" butonu → window.dndConsent.open()

export default function ConsentPreferencesButton({ locale }: { locale: "tr" | "en" }) {
  return (
    <button
      type="button"
      onClick={() => window.dndConsent?.open()}
      className="mt-4 inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27959b]"
      style={{ background: "#27959b" }}
    >
      {locale === "tr" ? "Çerez tercihlerini değiştir" : "Change cookie preferences"}
    </button>
  );
}
