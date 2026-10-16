// Azure ikon seti: Phosphor (duotone) — eski sitenin lucide setinden farklı, iki tonlu ince çizgi.
// Veri dosyalarında anlamlı anahtar (string) tutulur; istemci/sunucu sınırından bileşen geçmez.
import type { IconType } from "react-icons";
import {
  PiBabyDuotone, PiBarbellDuotone, PiBasketDuotone, PiBasketballDuotone, PiCoffeeDuotone, PiFanDuotone,
  PiFilmSlateDuotone, PiFlowerLotusDuotone, PiForkKnifeDuotone, PiGarageDuotone, PiGolfDuotone, PiHouseLineDuotone,
  PiLetterCirclePDuotone, PiLifebuoyDuotone, PiLightningDuotone, PiMartiniDuotone, PiMaskHappyDuotone, PiPillDuotone,
  PiPuzzlePieceDuotone, PiScissorsDuotone, PiShoppingCartSimpleDuotone, PiSparkleDuotone, PiSwimmingPoolDuotone,
  PiTennisBallDuotone, PiThermometerHotDuotone,
} from "react-icons/pi";

export const ICONS: Record<string, IconType> = {
  // olanaklar
  kids: PiBabyDuotone, playground: PiPuzzlePieceDuotone, parking: PiLetterCirclePDuotone, garage: PiGarageDuotone,
  theatre: PiMaskHappyDuotone, cinema: PiFilmSlateDuotone, cafe: PiCoffeeDuotone, gym: PiBarbellDuotone,
  golf: PiGolfDuotone, tennis: PiTennisBallDuotone, "farmers-market": PiBasketDuotone, aquapark: PiLifebuoyDuotone,
  pharmacy: PiPillDuotone, hair: PiScissorsDuotone, market: PiShoppingCartSimpleDuotone, beauty: PiFlowerLotusDuotone,
  basketball: PiBasketballDuotone, restaurant: PiForkKnifeDuotone, pool: PiSwimmingPoolDuotone, bar: PiMartiniDuotone,
  // teknik donanım
  climate: PiFanDuotone, generator: PiLightningDuotone, "smart-home": PiHouseLineDuotone, "floor-heating": PiThermometerHotDuotone,
};

export function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const C = ICONS[name] ?? PiSparkleDuotone;
  return <C size={size} aria-hidden />;
}
