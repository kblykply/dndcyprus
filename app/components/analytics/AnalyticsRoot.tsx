"use client";

// Ölçüm kökü: gtag.js / GTM / Meta Pixel yükleme, sayfa görüntüleme, proje view_item,
// tek bir tıklama dinleyicisiyle iletişim/broşür olayları ve izin bandı. /admin'de hiçbir şey yapmaz.

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import {
  isAdminPath,
  isTrackEventName,
  loadGoogleTags,
  loadGtm,
  loadMetaPixel,
  metaPageViewOnly,
  onConsentChange,
  pageView,
  projectFromPath,
  track,
} from "@/lib/analytics";
import { captureAttribution, persistAttribution } from "@/lib/attribution";
import ConsentBanner from "./ConsentBanner";

export default function AnalyticsRoot({ needsConsent = false }: { needsConsent?: boolean }) {
  const pathname = usePathname() || "";
  const admin = isAdminPath(pathname);

  useEffect(() => {
    if (admin) return;
    loadGoogleTags(); // izin yoksa Consent Mode çerezsiz çalıştırır
    loadGtm();
    loadMetaPixel(); // yalnızca reklam izni varsa
  }, [admin]);

  useEffect(() => {
    return onConsentChange((next, prev) => {
      if (isAdminPath(location.pathname)) return;
      persistAttribution();
      // İzin bu sayfada verildiyse Pixel şimdi yüklenir ve bu sayfa sayılır
      if (next.ads && !prev?.ads && loadMetaPixel()) metaPageViewOnly();
    });
  }, []);

  useEffect(() => {
    if (admin) return;
    document.addEventListener("click", onDocumentClick, true);
    document.addEventListener("auxclick", onDocumentClick, true);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      document.removeEventListener("auxclick", onDocumentClick, true);
    };
  }, [admin]);

  if (admin) return null;

  return (
    <>
      {/* useSearchParams statik sayfalarda Suspense ister */}
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
      <ConsentBanner initialOpen={needsConsent} />
    </>
  );
}

function RouteTracker() {
  const pathname = usePathname() || "";
  const search = useSearchParams()?.toString() ?? "";
  const lastItemPath = useRef("");

  useEffect(() => {
    if (isAdminPath(pathname)) return;
    captureAttribution();
    // Başlık (metadata) güncellensin diye bir tik bekle
    const timer = window.setTimeout(() => {
      pageView();
      const project = projectFromPath(pathname);
      if (project && lastItemPath.current !== pathname) {
        track("view_item", {
          item_id: project.slug,
          item_name: project.name,
          items: [{ item_id: project.slug, item_name: project.name, item_brand: "DND Cyprus" }],
        });
      }
      lastItemPath.current = project ? pathname : "";
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return null;
}

/* ---------------- Tıklama olayları ---------------- */

function placementOf(el: Element) {
  const label = (el as HTMLElement).dataset?.trackLabel;
  if (label) return label;
  if (el.closest("#whatsapp-fab")) return "floating_button";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return "content";
}

function onDocumentClick(e: MouseEvent) {
  if (e.type === "auxclick" && e.button !== 1) return;
  if (isAdminPath(location.pathname)) return;
  const target = e.target as Element | null;
  if (!target || typeof target.closest !== "function") return;

  const project = projectFromPath(location.pathname)?.slug;

  // 1) Açık işaretleme: data-track="<olay>" (+ data-track-label)
  const tracked = target.closest<HTMLElement>("[data-track]");
  const name = tracked?.dataset.track || "";
  if (tracked && isTrackEventName(name)) {
    const label = tracked.dataset.trackLabel || undefined;
    track(name, {
      project,
      label,
      ...(name === "brochure_download" ? fileParams(tracked, label) : {}),
    });
    return;
  }

  // 2) Bağlantı türüne göre
  const a = target.closest<HTMLAnchorElement>("a[href]");
  if (!a) return;
  const href = (a.getAttribute("href") || "").trim();
  const lower = href.toLowerCase();

  if (lower.startsWith("tel:")) {
    track("contact_phone", { project, placement: placementOf(a) });
  } else if (lower.includes("wa.me/") || lower.includes("api.whatsapp.com") || lower.startsWith("whatsapp:")) {
    track("contact_whatsapp", { project, placement: placementOf(a) });
  } else if (lower.startsWith("mailto:")) {
    track("contact_email", { project, placement: placementOf(a) });
  } else {
    const url = safeUrl(href);
    if (url && url.pathname.toLowerCase().endsWith(".pdf")) {
      const params = fileParams(a);
      track("brochure_download", { project, label: params.file_name, ...params });
    }
  }
}

function safeUrl(href: string) {
  try {
    return new URL(href, location.href);
  } catch {
    return null;
  }
}

/** GA4 file_download anlamında parametreler (öğe bir bağlantıdaysa dosya adı ondan alınır) */
function fileParams(el: HTMLElement, label?: string) {
  const a = el.closest<HTMLAnchorElement>("a[href]") ?? el.querySelector<HTMLAnchorElement>("a[href]");
  const parsed = a ? safeUrl(a.getAttribute("href") || "") : null;
  // Yalnızca gerçek dosya bağlantısı (uzantılı yol) dosya adı sayılır
  const url = parsed && /\.[a-z0-9]{2,5}$/i.test(parsed.pathname) ? parsed : null;
  const fromUrl = url ? decodeSafe(url.pathname.split("/").pop() || "") : "";
  const ext = fromUrl ? fromUrl.split(".").pop()!.toLowerCase() : "pdf";
  return {
    file_name: fromUrl || label,
    file_extension: ext,
    link_url: url ? `${url.origin}${url.pathname}` : undefined,
  };
}

function decodeSafe(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
