import Arrow from "../Arrow";
import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
import BrandWheel, { type WheelItem } from "./BrandWheel";
import { OzanCard } from "../PersonCard";
import "./leadership.css";

// Sıra bilerek karışık: birbirine benzeyen logolar (Perla / Perla II / La Joya, DND Group / DND Homes) yan yana gelmesin
const BRANDS = [
  { name: "DND Group", logo: "/azure/brands/dndgroup.webp", path: "/contact" },
  { name: "Perla", logo: "/azure/brands/perla.webp", path: "/perla" },
  { name: "Lagoon Verde", logo: "/azure/brands/lagoon.webp", path: "/lagoon-verde" },
  { name: "Perla II", logo: "/azure/brands/perlaii.webp", path: "/perla-ii" },
  { name: "DND Homes", logo: "/azure/brands/dndhomes.webp", href: "http://dnd-homes.com/" },
  { name: "La Joya", logo: "/azure/brands/lajoya.webp", path: "/la-joya" },
  { name: "Mariachi Beach Club", logo: "/azure/brands/mariachi.webp", path: "/mariachi" },
];
const TEAMS: Record<Locale, [string, string]> = {
  tr: ["Satış · Mimarlık · Mühendislik", "Finans · Pazarlama · Operasyon"],
  en: ["Sales · Architecture · Engineering", "Finance · Marketing · Operations"],
  de: ["Vertrieb · Architektur · Ingenieurwesen", "Finanzen · Marketing · Betrieb"],
  ru: ["Продажи · Архитектура · Инжиниринг", "Финансы · Маркетинг · Операции"],
  pl: ["Sprzedaż · Architektura · Inżynieria", "Finanse · Marketing · Operacje"],
};
// Ekip panelindeki yüzler: public/teams portrelerinden baş ve omuz kırpılmış 192px kare WebP (public/azure/team), ekip sayfasındaki sırayla
const FACES = ["burcingul", "borhan", "sabina", "shadi", "bob", "onuryalcin"];

/**
 * Kurucu & yönetim: önce Ozan Bey için büyük öne çıkan blok (renkli portre + "Yılın CFO'su" rozeti, rol, isim,
 * tanıtım, alıntı, ince çizgili üç bilgi satırı, kariyerindeki kurumlar). Altında ikinci sırada
 * Aynur Hanım'ın kartı ve ekip paneli; en altta DND marka şeridi.
 */
export default function Leadership({ locale }: { locale: Locale }) {
  const t = HOME[locale].leadership;
  const [, ...others] = t.people;
  const total = Number(t.team.match(/\d+/)?.[0] ?? 0);
  const wheel: WheelItem[] = BRANDS.map((b) => ({ name: b.name, logo: b.logo, href: b.href ?? href(locale, b.path!), external: !!b.href }));
  return (
    <section className="az-section az-leaders" id="yonetim">
      <div className="az-wrap">
        <div className="az-head"><span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2></div>

        <OzanCard locale={locale} />

        <div className="az-lrow">
          {others.map((p) => (
            <article key={p.name} className="az-person rv d1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <figure><img src={p.img} alt={p.name} loading="lazy" /></figure>
              <div>
                <small>{p.role}</small><h3>{p.name}</h3><q>{p.q}</q>
                <dl>{p.dl.map(([k2, v]) => <div key={k2} style={{ display: "contents" }}><dt>{k2}</dt><dd>{v}</dd></div>)}</dl>
              </div>
            </article>
          ))}
          <aside className="az-team rv d2" aria-label={t.team}>
            <div className="faces" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {FACES.map((f) => <span key={f}><img src={`/azure/team/${f}.webp`} alt="" width={192} height={192} loading="lazy" decoding="async" draggable={false} /></span>)}
              {total > FACES.length ? <span className="more">+{total - FACES.length}</span> : null}
            </div>
            <h3>{t.team}</h3>
            <ul><li>{TEAMS[locale][0]}</li><li>{TEAMS[locale][1]}</li></ul>
            <Link className="az-btn glass sm" href={href(locale, "/team")} prefetch={false}>{t.teamCta} <Arrow /></Link>
          </aside>
        </div>

        <BrandWheel label={t.brandsLabel} items={wheel} />
      </div>
    </section>
  );
}
