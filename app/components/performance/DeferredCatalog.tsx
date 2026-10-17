"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "./useNearViewport";
import type { Locale } from "@/lib/azure/site";

// Azure katalog (5 dil): açık sahne, gerçek kitap, ilerleme çizgisi · oklar.
// Bölümün çerçevesi (başlık, sahne, şerit) sayfa açılırken son boyunda kurulur; kitap motoru ve görseller bölüm
// yaklaşınca yüklenir. Eskiden bütün bölüm yaklaşınca kuruluyor, 75svh yer tutucu 860–1085 px'e uzayıp
// kaydırırken (özellikle yukarı, Safari'de) sayfayı itiyordu.
// Ayrı dosya: DeferredMedia ile aynı modüldeyken ana sayfa da katalog parçasını (proje arayüz metinleri, 22 KB) indiriyordu.
const AzureCatalog = dynamic(() => import("../azure/project/AzureCatalog"), { ssr: false });
export function DeferredCatalog({ locale, project }: { locale: Locale; project: "lagoon-verde" | "perla" | "perla-ii" }) {
  const { ref, near } = useNearViewport<HTMLDivElement>("800px");
  return <div id="catalog" ref={ref}><AzureCatalog locale={locale} project={project} near={near} /></div>;
}
