import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
import BrandWheel, { type WheelItem } from "./BrandWheel";

const BRANDS = [
  { name: "DND Group", logo: "/azure/brands/dndgroup.webp", path: "/contact" },
  { name: "DND Homes", logo: "/azure/brands/dndhomes.webp", href: "http://dnd-homes.com/" },
  { name: "Lagoon Verde", logo: "/azure/brands/lagoon.webp", path: "/lagoon-verde" },
  { name: "La Joya", logo: "/azure/brands/lajoya.webp", path: "/la-joya" },
  { name: "Mariachi Beach Club", logo: "/azure/brands/mariachi.webp", path: "/mariachi" },
  { name: "Perla", logo: "/azure/brands/perla.webp", path: "/perla" },
  { name: "Perla II", logo: "/azure/brands/perlaii.webp", path: "/perla-ii" },
];
const TEAMS: Record<Locale, [string, string]> = {
  tr: ["Satış · Mimarlık · Mühendislik", "Finans · Pazarlama · Operasyon"],
  en: ["Sales · Architecture · Engineering", "Finance · Marketing · Operations"],
  de: ["Vertrieb · Architektur · Ingenieurwesen", "Finanzen · Marketing · Betrieb"],
  ru: ["Продажи · Архитектура · Инжиниринг", "Финансы · Маркетинг · Операции"],
  pl: ["Sprzedaż · Architektura · Inżynieria", "Finanse · Marketing · Operacje"],
};
const PARTNERS = [
  { name: "Keurig Dr Pepper", logo: "/azure/brands/keurig-dr-pepper.webp" },
  { name: "Kellogg's", logo: "/azure/brands/kelloggs.webp" },
  { name: "Kraft", logo: "/azure/brands/kraft.webp" },
  { name: "Cargill", logo: "/azure/brands/cargill.webp" },
  { name: "Arthur Andersen", logo: "/azure/brands/arthur-andersen.webp" },
];

export default function Leadership({ locale }: { locale: Locale }) {
  const t = HOME[locale].leadership;
  const wheel: WheelItem[] = [
    ...BRANDS.map((b) => ({ name: b.name, logo: b.logo, href: b.href ?? href(locale, b.path!), external: !!b.href })),
    ...PARTNERS.map((b) => ({ name: b.name, logo: b.logo, muted: true })),
  ];
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
        <BrandWheel label={t.brandsLabel} items={wheel} />
      </div>
    </section>
  );
}
