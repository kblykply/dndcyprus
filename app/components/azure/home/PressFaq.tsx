import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
import type { PressItem } from "@/app/components/PressSection";

const DATE_LOCALE: Record<Locale, string> = { tr: "tr-TR", en: "en-GB", de: "de-DE", ru: "ru-RU", pl: "pl-PL" };
const fmt = (iso: string, locale: Locale) => new Intl.DateTimeFormat(DATE_LOCALE[locale], { year: "numeric", month: "long", day: "2-digit" }).format(new Date(iso));

export default function PressFaq({ locale, items }: { locale: Locale; items: PressItem[] }) {
  const t = HOME[locale];
  const news = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  return (
    <section className="az-section" id="basin">
      <div className="az-wrap az-pf">
        <div>
          <span className="az-kicker rv">{t.press.kicker}</span><h2 className="az-h2 sm rv d1">{t.press.title}</h2>
          <div className="az-news">
            {news.map((n, k) => (
              <a key={n.id} className={`rv d${Math.min(k, 3)}`} href={n.url} target="_blank" rel="noopener noreferrer nofollow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={typeof n.cover === "string" ? n.cover : "/azure/news-1.jpg"} alt="" loading="lazy" />
                <span><small>{n.outlet}</small><b>{n.title}</b><span className="d">{fmt(n.date, locale)}</span></span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 16 }}><Link className="az-btn glass sm" href={href(locale, "/press")} prefetch={false}>{t.press.all} →</Link></div>
        </div>
        <div>
          <span className="az-kicker rv">{t.faq.kicker}</span><h2 className="az-h2 sm rv d1">{t.faq.title}</h2>
          <div className="az-faq rv d2">
            {t.faq.items.map((f, k) => (
              <details key={f.q} open={k === 0}><summary>{f.q} <i>+</i></summary><div className="a">{f.a}</div></details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
