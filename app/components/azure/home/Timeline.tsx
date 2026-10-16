import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";
import { mono } from "@/app/fonts";
import StoryTimeline from "./StoryTimeline";
import "../meridian.css";

// Hikâyemiz — Meridian dili: solda sabit büyük yıl + şehir/koordinat + değişen görsel, sağda ince çizgili liste.
const PLACES: Record<Locale, { from: [string, string]; to: [string, string] }> = {
  tr: { from: ["Boston", "42°21′ K · 71°03′ B"], to: ["İskele", "35°17′ K · 33°53′ D"] },
  en: { from: ["Boston", "42°21′ N · 71°03′ W"], to: ["İskele", "35°17′ N · 33°53′ E"] },
  de: { from: ["Boston", "42°21′ N · 71°03′ W"], to: ["İskele", "35°17′ N · 33°53′ O"] },
  ru: { from: ["Бостон", "42°21′ с. ш. · 71°03′ з. д."], to: ["Искеле", "35°17′ с. ш. · 33°53′ в. д."] },
  pl: { from: ["Boston", "42°21′ N · 71°03′ W"], to: ["İskele", "35°17′ N · 33°53′ E"] },
};

export default function Timeline({ locale }: { locale: Locale }) {
  const t = HOME[locale].timeline;
  return (
    <section className={`az-section mr ${mono.variable}`}>
      <div className="az-wrap">
        <span className="az-kicker rv">{t.kicker}</span>
        <h2 className="az-h2 rv d1">{t.title}</h2>
        <StoryTimeline items={t.items} places={PLACES[locale]} />
      </div>
    </section>
  );
}
