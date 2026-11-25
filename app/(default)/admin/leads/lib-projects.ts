// app/(default)/admin/leads/lib-projects.ts
// Formdaki proje ve daire tipi seçenekleri sitenin kendi proje sayfalarından (Türkçe adlar).
import { PROJECT_PAGES } from "@/lib/azure/projects";

export function projectOptions() {
  return Object.values(PROJECT_PAGES).map((p) => ({ name: p.name, unitTypes: p.unitTypes.tr }));
}
