import Arrow from "../Arrow";
import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
import type { PressItem } from "@/app/components/PressSection";

const DATE_LOCALE: Record<Locale, string> = { tr: "tr-TR", en: "en-GB", de: "de-DE", ru: "ru-RU", pl: "pl-PL" };
const fmt = (iso: string, locale: Locale) => new Intl.DateTimeFormat(DATE_LOCALE[locale], { year: "numeric", month: "long", day: "2-digit" }).format(new Date(iso));

/** faq=false: yalnız haberler, tek sütun (ana sayfada S.S.S. haberlerin yanında gösterilir) */
export default function PressFaq({ locale, items, faq = true }: { locale: Locale; items: PressItem[]; faq?: boolean }) {
  const t = HOME[locale];
  const news = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  return (
    <section className="az-section" id="basin">
      <div className={`az-wrap az-pf${faq ? "" : " solo"}`}>
        <div>
          <div className="hd">
            <div><span className="az-kicker rv">{t.press.kicker}</span><h2 className="az-h2 sm rv d1">{t.press.title}</h2></div>
            <Link className="az-btn glass sm rv d1" href={href(locale, "/press")} prefetch={false}>{t.press.all} <Arrow /></Link>
          </div>
          <div className="az-news">
            {news.map((n, k) => (
              <a key={n.id} className={`rv d${Math.min(k, 3)}`} href={n.url} target="_blank" rel="noopener noreferrer nofollow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={typeof n.cover === "string" ? n.cover : "/azure/news-1.jpg"} alt="" loading="lazy" />
                <span><small>{n.outlet}</small><b>{n.title}</b><span className="d">{fmt(n.date, locale)}</span></span>
              </a>
            ))}
          </div>
        </div>
        {faq ? <div>
          <div className="hd"><div><span className="az-kicker rv">{t.faq.kicker}</span><h2 className="az-h2 sm rv d1">{t.faq.title}</h2></div></div>
          <div className="az-faq rv d2">
            {t.faq.items.map((f) => (
              <details key={f.q}><summary>{f.q} <i>+</i></summary><div className="a">{f.a}</div></details>
            ))}
          </div>
        </div> : null}
      </div>
    </section>
  );
}
