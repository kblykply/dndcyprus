// Veri dosyalarındaki ikon adları (lucide-react) → bileşen. İstemci/sunucu sınırından
// fonksiyon geçmemesi için veri tarafında ad (string) tutulur, burada çözülür.
import type { LucideIcon } from "lucide-react";
import {
  Baby, BadgePercent, Car, Clapperboard, Coffee, Dumbbell, Flag, Home, Leaf, LifeBuoy, Pill, Puzzle,
  Scissors, ShoppingCart, Sparkles, Thermometer, Trophy, Utensils, Waves, Wind, Wine, Zap,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Baby, BadgePercent, Car, Clapperboard, Coffee, Dumbbell, Flag, Home, Leaf, LifeBuoy, Pill, Puzzle,
  Scissors, ShoppingCart, Sparkles, Thermometer, Trophy, Utensils, Waves, Wind, Wine, Zap,
};

export function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const C = ICONS[name] ?? Sparkles;
  return <C size={size} aria-hidden />;
}
