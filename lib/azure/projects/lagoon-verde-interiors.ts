// Lagoon Verde iç mekân kareleri, daire tipine göre (Studio / Loft / 2+1). Kaynak: "İÇ MEKANLAR TESLİM DOSYASI - YENİ"
// renkli render'lar → public/azure/interiors/lagoon-verde/<tip>/<oda>-lg|sm.webp. Etiketler bir tipte tekrar etmez.
import type { InteriorGroup } from "@/lib/azure/project-types";
import type { Locale } from "@/lib/azure/site";

const LANG: Locale[] = ["tr", "en", "de", "ru", "pl"];
const LABEL: Record<string, string[]> = {
  "living": ["Salon", "Living room", "Wohnzimmer", "Гостиная", "Salon"],
  "dining": ["Yemek alanı", "Dining area", "Essbereich", "Обеденная зона", "Jadalnia"],
  "tv": ["TV köşesi", "TV wall", "TV-Wand", "ТВ-зона", "Strefa TV"],
  "lounge": ["Oturma alanı", "Lounge area", "Sitzbereich", "Зона отдыха", "Strefa wypoczynku"],
  "seating": ["Oturma grubu", "Seating area", "Sitzecke", "Мягкая зона", "Strefa relaksu"],
  "kitchen": ["Mutfak", "Kitchen", "Küche", "Кухня", "Kuchnia"],
  "bath": ["Banyo", "Bathroom", "Badezimmer", "Ванная", "Łazienka"],
  "mezz": ["Asma kat", "Mezzanine", "Galerie", "Антресоль", "Antresola"],
  "bedroom": ["Yatak odası", "Bedroom", "Schlafzimmer", "Спальня", "Sypialnia"],
  "aerial": ["Kuşbakışı", "Bird's-eye view", "Vogelperspektive", "Вид сверху", "Widok z góry"],
  "master": ["Ebeveyn yatak odası", "Master bedroom", "Elternschlafzimmer", "Главная спальня", "Sypialnia główna"],
  "study": ["Çalışma köşesi", "Study corner", "Arbeitsecke", "Рабочий уголок", "Kącik do pracy"],
};
const TYPES = [
  { id: "studio", name: "Studio", shots: [{ f: "living", k: "living", lg: 2400, sm: 1200 }, { f: "living-2", k: "dining", lg: 2400, sm: 1200 }, { f: "lounge", k: "tv", lg: 2400, sm: 1200 }, { f: "lounge-2", k: "lounge", lg: 2400, sm: 1200 }, { f: "kitchen", k: "kitchen", lg: 2400, sm: 1200 }, { f: "bath", k: "bath", lg: 1600, sm: 800, v: true }] },
  { id: "loft", name: "Loft", shots: [{ f: "living", k: "living", lg: 2400, sm: 1200 }, { f: "kitchen", k: "kitchen", lg: 2400, sm: 1200 }, { f: "bedroom", k: "mezz", lg: 2400, sm: 1200 }, { f: "bedroom-2", k: "bedroom", lg: 2400, sm: 1200 }, { f: "bath", k: "bath", lg: 1600, sm: 800, v: true }, { f: "aerial", k: "aerial", lg: 2400, sm: 1200 }] },
  { id: "2plus1", name: "2+1", shots: [{ f: "living", k: "living", lg: 2400, sm: 1200 }, { f: "living-2", k: "seating", lg: 2400, sm: 1200 }, { f: "lounge", k: "tv", lg: 2400, sm: 1200 }, { f: "dining", k: "dining", lg: 2400, sm: 1200 }, { f: "kitchen", k: "kitchen", lg: 2400, sm: 1200 }, { f: "bedroom", k: "master", lg: 2400, sm: 1200 }, { f: "bedroom-2", k: "bedroom", lg: 2400, sm: 1200 }, { f: "bedroom-3", k: "study", lg: 1600, sm: 800, v: true }, { f: "bath", k: "bath", lg: 900, sm: 450, v: true }] },
] as const;

const BASE = "/azure/interiors/lagoon-verde";
export const LV_INTERIOR_GROUPS = Object.fromEntries(LANG.map((l, li) => [l, TYPES.map((t) => ({
  id: t.id,
  name: t.name,
  shots: t.shots.map((s) => {
    const src = `${BASE}/${t.id}/${s.f}`;
    const label = LABEL[s.k][li];
    return { image: `${src}-lg.webp`, thumb: `${src}-sm.webp`, srcSet: `${src}-sm.webp ${s.sm}w, ${src}-lg.webp ${s.lg}w`, vertical: "v" in s, label, alt: `Lagoon Verde ${t.name} — ${label}` };
  }),
}))])) as Record<Locale, InteriorGroup[]>;
