import type { IconType } from "react-icons";
import { PiFacebookLogoDuotone, PiInstagramLogoDuotone, PiLinkedinLogoDuotone, PiYoutubeLogoDuotone } from "react-icons/pi";
import "./social-icons.css";

// Ofis kartının altındaki küçük ikonlu sosyal medya satırı (İletişim sayfası).
const ICONS: Record<string, IconType> = {
  linkedin: PiLinkedinLogoDuotone,
  instagram: PiInstagramLogoDuotone,
  facebook: PiFacebookLogoDuotone,
  youtube: PiYoutubeLogoDuotone,
};

export default function SocialIcons({ items, label }: { items: { label: string; href: string }[]; label: string }) {
  return (
    <div className="az-social">
      <span className="lbl">{label}</span>
      <div className="ic">
        {items.map((s) => {
          const C = ICONS[s.label.toLowerCase()];
          return (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
              {C ? <C size={20} aria-hidden /> : s.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
