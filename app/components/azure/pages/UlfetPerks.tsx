import Arrow from "../Arrow";
import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@/lib/azure/pages";
import { SECTION_IDS } from "@/lib/azure/nav";
import { href, type Locale } from "@/lib/azure/site";
import "./pages.css";

/** Ülfet (Girne Karaoğlanoğlu) ev sahibi ayrıcalıkları: Ülfet Beach Club ücretsiz giriş, Ülfet Shu %10 */
export default function UlfetPerks({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const t = PAGES[locale].advantage.extra;
  if (compact) {
    return (
      <Link className="az-ulfet-row rv" href={`${href(locale, "/advantage")}#${SECTION_IDS[locale].perks}`} prefetch={false}>
        <span className="pic"><Image src="/azure/pages/ulfet-beach.jpg" alt="" fill quality={70} sizes="160px" /></span>
        <span className="tx"><small>{t.kicker}</small>{t.items.map((x) => <b key={x.h}>{x.h} · <em>{x.tag}</em></b>)}</span>
        <Arrow />
      </Link>
    );
  }
  return (
    <section className="az-section az-ulfet">
      <div className="az-wrap g">
        <div className="pic rv"><Image src="/azure/pages/ulfet-beach.jpg" alt={t.imageAlt} fill quality={75} sizes="(min-width: 1000px) 50vw, 100vw" /></div>
        <div className="tx">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 sm rv d1">{t.title}</h2>
          <p className="az-lead rv d2">{t.lead}</p>
          <ul className="rv d2">{t.items.map((x) => <li key={x.h}><span className="tag">{x.tag}</span><b>{x.h}</b><span>{x.p}</span></li>)}</ul>
        </div>
      </div>
    </section>
  );
}
