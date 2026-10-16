import Image from "next/image";
import Link from "next/link";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
import BrandWheel, { type WheelItem } from "./BrandWheel";
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
// Ozan Bey'in kariyerindeki kurumlar (Arthur Andersen: kariyer başlangıcı). Önceden logo şeridindeydi, artık kendi bloğunda.
const CAREER = [
  { name: "Keurig Dr Pepper", logo: "/azure/brands/keurig-dr-pepper.webp" },
  { name: "Kellogg's", logo: "/azure/brands/kelloggs.webp" },
  { name: "Kraft", logo: "/azure/brands/kraft.webp" },
  { name: "Cargill", logo: "/azure/brands/cargill.webp" },
  { name: "Arthur Andersen", logo: "/azure/brands/arthur-andersen.webp" },
];
// Ekip panelindeki yüzler (public/teams, ekip sayfasındaki sırayla)
const FACES = ["burcingul", "borhan", "sabina", "shadi", "bob", "onuryalcin"];

/**
 * Kurucu & yönetim: önce Ozan Bey için büyük öne çıkan blok (renkli portre + "Yılın CFO'su" rozeti, rol, isim,
 * tanıtım, alıntı, ince çizgili üç bilgi satırı, kariyerindeki kurumlar). Altında ikinci sırada
 * Aynur Hanım'ın kartı ve ekip paneli; en altta DND marka şeridi.
 */
export default function Leadership({ locale }: { locale: Locale }) {
  const t = HOME[locale].leadership;
  const cfo = HOME[locale].awards.items.find((x) => !x.ribbon);
  const [ozan, ...others] = t.people;
  const total = Number(t.team.match(/\d+/)?.[0] ?? 0);
  const wheel: WheelItem[] = BRANDS.map((b) => ({ name: b.name, logo: b.logo, href: b.href ?? href(locale, b.path!), external: !!b.href }));
  return (
    <section className="az-section az-leaders" id="yonetim">
      <div className="az-wrap">
        <div className="az-head"><span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2></div>

        <article className="az-ozan rv">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ozan.img} alt={ozan.name} loading="lazy" decoding="async" draggable={false} />
            {cfo ? (
              <figcaption>
                <i aria-hidden><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9z" /></svg></i>
                <span><b>{cfo.b}</b>{cfo.rest.replace(/^\s*·\s*/, "")}</span>
              </figcaption>
            ) : null}
          </figure>
          <div className="bd">
            <small className="role">{ozan.role}</small>
            <h3>{ozan.name}</h3>
            {ozan.bio ? <p className="bio">{ozan.bio}</p> : null}
            <blockquote><q>{ozan.q}</q></blockquote>
            {/* değer ilk virgülden sonra bölünmez parça: dar ekranda yalnız virgülden kırılır ("Keurig Dr Pepper," / "eski CFO / President Int.") */}
            <dl>
              {ozan.dl.map(([k, v]) => {
                const c = v.indexOf(", ");
                return <div key={k}><dt>{k}</dt><dd>{c > 0 ? <>{v.slice(0, c + 1)} <span>{v.slice(c + 2)}</span></> : v}</dd></div>;
              })}
            </dl>
            <div className="past">
              <span>{t.career}</span>
              <ul aria-label={t.career}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {CAREER.map((c) => <li key={c.name} title={c.name}><img src={c.logo} alt={c.name} loading="lazy" decoding="async" draggable={false} /></li>)}
              </ul>
            </div>
          </div>
        </article>

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
              {FACES.map((f) => <span key={f}><Image src={`/teams/${f}.png`} alt="" width={120} height={180} sizes="120px" quality={75} /></span>)}
              {total > FACES.length ? <span className="more">+{total - FACES.length}</span> : null}
            </div>
            <h3>{t.team}</h3>
            <ul><li>{TEAMS[locale][0]}</li><li>{TEAMS[locale][1]}</li></ul>
            <Link className="az-btn glass sm" href={href(locale, "/team")} prefetch={false}>{t.teamCta} →</Link>
          </aside>
        </div>

        <BrandWheel label={t.brandsLabel} items={wheel} />
      </div>
    </section>
  );
}
