import Img from "./Img";
import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";
import "./home/leadership.css";

// Ozan Bey'in kariyerindeki kurumlar (Arthur Andersen: kariyer başlangıcı). w/h: görselin piksel boyutu — tarayıcı
// yerini yüklemeden ayırır; yoksa tembel yüklenen logolar gelince satır sarıyor, bölüm 30–65 px uzayıp sayfayı itiyordu
export const CAREER = [
  { name: "Keurig Dr Pepper", logo: "/azure/brands/keurig-dr-pepper.webp", w: 520, h: 156 },
  { name: "Kellogg's", logo: "/azure/brands/kelloggs.webp", w: 515, h: 180 },
  { name: "Kraft", logo: "/azure/brands/kraft.webp", w: 472, h: 180 },
  { name: "Cargill", logo: "/azure/brands/cargill.webp", w: 403, h: 180 },
  { name: "Arthur Andersen", logo: "/azure/brands/arthur-andersen.webp", w: 515, h: 180 },
];

type Person = { img: string; role: string; name: string; bio?: string; q: string; dl: [string, string][] };
type Props = {
  person: Person;
  /** portrenin altındaki beyaz cam rozet ("Yılın CFO'su · Boston Business Journal 2018") */
  badge?: { b: string; rest: string };
  /** en altta gri kurum logoları */
  career?: { label: string; logos: { name: string; logo: string; w: number; h: number }[] };
  /** portre sağda (sayfada sağ-sol dengesi için) */
  flip?: boolean;
  /** sayfadaki başlık sırası: ana sayfada bölüm başlığının altında h3, Hakkımızda'da bölümün kendisi h2 */
  heading?: "h2" | "h3";
};

/**
 * Yönetici kartı (ana sayfa "Kurucu & yönetim" ve Hakkımızda): beyaz kartta renkli portre, rol, isim, tanıtım,
 * alıntı, ince çizgili bilgi satırları ve isteğe bağlı rozet / kurum logoları. Portre boyu içerikten gelir;
 * içerik portrenin üst ve alt kenarından eşit uzaklıkta biter. Stiller: home/leadership.css (.az-ozan).
 */
export function PersonCard({ person, badge, career, flip, heading = "h3" }: Props) {
  const H = heading;
  return (
    <article className={`az-ozan rv${flip ? " flip" : ""}`}>
      <figure>
        <Img src={person.img} sizes="(min-width: 1000px) 25vw, 50vw" alt={person.name} draggable={false} />
        {badge ? (
          <figcaption>
            <i aria-hidden><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9z" /></svg></i>
            <span><b>{badge.b}</b>{badge.rest}</span>
          </figcaption>
        ) : null}
      </figure>
      <div className="bd">
        <small className="role">{person.role}</small>
        <H className="nm">{person.name}</H>
        {person.bio ? <p className="bio">{person.bio}</p> : null}
        <blockquote><q>{person.q}</q></blockquote>
        {/* değer ilk virgülden sonra bölünmez parça: dar ekranda yalnız virgülden kırılır ("Keurig Dr Pepper," / "eski CFO / President Int.") */}
        <dl>
          {person.dl.map(([k, v]) => {
            const c = v.indexOf(", ");
            return <div key={k}><dt>{k}</dt><dd>{c > 0 ? <>{v.slice(0, c + 1)} <span>{v.slice(c + 2)}</span></> : v}</dd></div>;
          })}
        </dl>
        {career ? (
          <div className="past">
            <span>{career.label}</span>
            <ul aria-label={career.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {career.logos.map((c) => <li key={c.name} title={c.name}><img src={c.logo} alt={c.name} width={c.w} height={c.h} loading="lazy" decoding="async" draggable={false} /></li>)}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/** Ozan Dökmecioğlu: "Yılın CFO'su" rozeti ve kariyerindeki kurumlarla */
export function OzanCard({ locale, heading }: { locale: Locale; heading?: "h2" | "h3" }) {
  const t = HOME[locale].leadership;
  const cfo = HOME[locale].awards.items.find((x) => !x.ribbon);
  return (
    <PersonCard person={t.people[0]} heading={heading}
      badge={cfo ? { b: cfo.b, rest: cfo.rest.replace(/^\s*·\s*/, "") } : undefined}
      career={{ label: t.career, logos: CAREER }} />
  );
}

/** Aynur Zorba Güloğlu (Hakkımızda'da Ozan Bey ve Netice Hanım'dan sonra: portre solda, kartlar sağ-sol sırayla) */
export function AynurCard({ locale, heading }: { locale: Locale; heading?: "h2" | "h3" }) {
  return <PersonCard person={HOME[locale].leadership.people[1]} heading={heading} />;
}
