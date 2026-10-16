"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { projectFromPath } from "@/lib/analytics";
import { attributionRef } from "@/lib/attribution";
import { CONTACT, type Locale } from "@/lib/azure/site";

const MSG: Record<Locale, { base: string; project: (name: string) => string }> = {
  tr: { base: "Merhaba! Bilgi almak istiyorum.", project: (name) => `Merhaba! ${name} hakkında bilgi almak istiyorum.` },
  en: { base: "Hello! I would like more information.", project: (name) => `Hello! I would like to know more about ${name}.` },
  de: { base: "Hallo! Ich hätte gerne weitere Informationen.", project: (name) => `Hallo! Ich hätte gerne mehr Informationen zu ${name}.` },
  ru: { base: "Здравствуйте! Хочу получить больше информации.", project: (name) => `Здравствуйте! Хочу узнать больше о проекте ${name}.` },
  pl: { base: "Dzień dobry! Proszę o więcej informacji.", project: (name) => `Dzień dobry! Proszę o więcej informacji o projekcie ${name}.` },
};

// Azure: sabit yeşil WhatsApp düğmesi. Proje sayfalarında proje adıyla hazır mesaj (eski davranış korundu).
export default function WhatsAppAzure({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "";
  const base = MSG[locale].base;
  const [message, setMessage] = useState(base);
  const refresh = useCallback(() => {
    const project = projectFromPath(pathname);
    const text = project
      ? MSG[locale].project(project.name)
      : base;
    setMessage(text + attributionRef());
  }, [pathname, locale, base]);
  useEffect(() => { refresh(); }, [refresh]);
  // Altbilginin alt satırı (yasal bağlantılar) görünürken düğme biraz yukarı kayar
  const [lift, setLift] = useState(false);
  useEffect(() => {
    const el = document.querySelector(".az-footer .bottom");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setLift(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);
  const hrefWa = useMemo(() => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, [message]);
  return (
    <a id="whatsapp-fab" className={`az-wa${lift ? " lift" : ""}`} href={hrefWa} onPointerDown={refresh} onFocus={refresh} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.3-.4v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.8 1 2.5 1.1 1.6 2.5 2.9 4.2 3.7.5.2 1 .4 1.5.5.5.2 1.1.1 1.6 0 .6-.2 1.2-.6 1.5-1.2.1-.3.2-.7.1-1l-.4-.3z" /></svg>
    </a>
  );
}
