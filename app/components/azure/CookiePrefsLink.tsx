"use client";

// Altbilgideki "Çerez tercihleri" bağlantısı → mevcut izin katmanını açar (window.dndConsent.open)
export default function CookiePrefsLink({ label }: { label: string }) {
  return <button type="button" onClick={() => window.dndConsent?.open()}>{label}</button>;
}
