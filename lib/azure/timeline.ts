// lib/azure/timeline.ts — zaman çizelgesi (Hakkımızda "Yolculuğumuz") için harita etiketleri ve başlık; panelden düzenlenir (İçerik → Hakkımızda)
import type { Locale } from "./site";

export const TIMELINE_MAP: Record<Locale, { from: string; to: string; fromXY: string; toXY: string; dist: string; route: string }> = {
  tr: { from: "Boston", to: "İskele", fromXY: "42°21′ K · 71°03′ B", toXY: "35°17′ K · 33°53′ D", dist: "≈ 8.500 km", route: "Boston’dan İskele’ye rota" },
  en: { from: "Boston", to: "İskele", fromXY: "42°21′ N · 71°03′ W", toXY: "35°17′ N · 33°53′ E", dist: "≈ 8,500 km", route: "Route from Boston to İskele" },
  de: { from: "Boston", to: "İskele", fromXY: "42°21′ N · 71°03′ W", toXY: "35°17′ N · 33°53′ O", dist: "≈ 8.500 km", route: "Route von Boston nach İskele" },
  ru: { from: "Бостон", to: "Искеле", fromXY: "42°21′ с. ш. · 71°03′ з. д.", toXY: "35°17′ с. ш. · 33°53′ в. д.", dist: "≈ 8 500 км", route: "Маршрут из Бостона в Искеле" },
  pl: { from: "Boston", to: "İskele", fromXY: "42°21′ N · 71°03′ W", toXY: "35°17′ N · 33°53′ E", dist: "≈ 8500 km", route: "Trasa z Bostonu do İskele" },
};

// Hakkımızda başlığı: eski "Yolculuğumuz" bölümünün etiket, başlık ve açıklaması
export const TIMELINE_ABOUT_HEAD: Record<Locale, { kicker: string; title: string; lead: string }> = {
  tr: { kicker: "DND Cyprus", title: "Yolculuğumuz", lead: "Önemli kilometre taşlarımızı gezinerek keşfedin." },
  en: { kicker: "DND Cyprus", title: "Our Journey", lead: "Explore our key milestones." },
  de: { kicker: "DND Cyprus", title: "Unser Weg", lead: "Entdecken Sie unsere wichtigsten Meilensteine." },
  ru: { kicker: "DND Cyprus", title: "Наш путь", lead: "Ключевые вехи нашей истории." },
  pl: { kicker: "DND Cyprus", title: "Nasza historia", lead: "Najważniejsze etapy naszego rozwoju." },
};
