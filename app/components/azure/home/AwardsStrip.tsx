import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";

export default function AwardsStrip({ locale }: { locale: Locale }) {
  const t = HOME[locale].awards;
  return (
    <div className="az-logos rv">
      <span>{t.label}</span>
      <div className="l">
        {t.items.map((it) => (
          <div key={it.b + it.rest}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {it.ribbon ? <img src={it.ribbon} alt="" loading="lazy" /> : null}
            <span><b>{it.b}</b>{it.rest}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
