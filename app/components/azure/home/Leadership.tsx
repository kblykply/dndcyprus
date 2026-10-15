import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";

const BRANDS = [
  { name: "DND Group", logo: "/logos/dndgroup.png", path: "/contact" },
  { name: "DND Homes", logo: "/logos/dndhomes.png", href: "http://dnd-homes.com/" },
  { name: "Lagoon Verde", logo: "/logos/lagoon.png", path: "/lagoon-verde" },
  { name: "La Joya", logo: "/logos/lajoya.png", path: "/la-joya" },
  { name: "Mariachi Beach Club", logo: "/logos/mariachi.png", path: "/mariachi" },
  { name: "Perla", logo: "/logos/perla.png", path: "/perla" },
  { name: "Perla II", logo: "/logos/perlaii.png", path: "/perla-ii" },
];
const TEAMS: Record<Locale, [string, string]> = {
  tr: ["Satış · Mimarlık · Mühendislik", "Finans · Pazarlama · Operasyon"],
  en: ["Sales · Architecture · Engineering", "Finance · Marketing · Operations"],
  de: ["Vertrieb · Architektur · Ingenieurwesen", "Finanzen · Marketing · Betrieb"],
  ru: ["Продажи · Архитектура · Инжиниринг", "Финансы · Маркетинг · Операции"],
  pl: ["Sprzedaż · Architektura · Inżynieria", "Finanse · Marketing · Operacje"],
};
const PARTNERS = [
  { name: "Keurig Dr Pepper", logo: "/Keurig_Dr_Pepper.png" },
  { name: "Kellogg's", logo: "/Kellogg's-Logo.png" },
  { name: "Kraft", logo: "/Kraft_logo_2012.png" },
  { name: "Cargill", logo: "/Cargill_logo.png" },
  { name: "Arthur Andersen", logo: "/Arthur_Andersen_(ancien).png" },
];

export default function Leadership({ locale }: { locale: Locale }) {
  const t = HOME[locale].leadership;
  return (
    <section className="az-section az-leaders" id="yonetim">
      <div className="az-wrap">
        <div className="az-head"><span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2></div>
        <div className="g">
          {t.people.map((p, k) => (
            <article key={p.name} className={`az-person rv${k ? " d2" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <figure><img src={p.img} alt={p.name} loading="lazy" /></figure>
              <div>
                <small>{p.role}</small><h3>{p.name}</h3><q>{p.q}</q>
                <dl>{p.dl.map(([k2, v]) => <div key={k2} style={{ display: "contents" }}><dt>{k2}</dt><dd>{v}</dd></div>)}</dl>
              </div>
            </article>
          ))}
        </div>
        <div className="az-trow rv">
          <span>{t.team}</span><span>{TEAMS[locale][0]}</span><span>{TEAMS[locale][1]}</span>
          <Link className="az-btn glass sm" href={href(locale, "/team")} prefetch={false}>{t.teamCta}</Link>
        </div>
        <div className="az-brands rv d1" aria-label={t.brandsLabel}>
          {BRANDS.map((b) => b.href
            ? <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer" title={b.name}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.logo} alt={b.name} loading="lazy" /></a>
            : <Link key={b.name} href={href(locale, b.path!)} prefetch={false} title={b.name}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.logo} alt={b.name} loading="lazy" /></Link>)}
          {PARTNERS.map((b) => <span key={b.name} className="logo" title={b.name}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.logo} alt={b.name} loading="lazy" style={{ height: 22, opacity: .7 }} /></span>)}
        </div>
      </div>
    </section>
  );
}
