import Arrow from "../Arrow";
import Image from "next/image";
import Link from "next/link";
import { PiCheckBold } from "react-icons/pi";
import { HOME } from "@/lib/azure/home";
import { PAGES } from "@/lib/azure/pages";
import { SECTION_IDS } from "@/lib/azure/nav";
import { PROJECT_DATA } from "@/lib/azure/projects/index";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import { SOCIALS, href, type Locale } from "@/lib/azure/site";
import Tech from "../project/Tech";
import Amenities from "../project/Amenities";
import Mariachi from "../project/Mariachi";
import Payment from "../project/Payment";
import { Offers } from "../home/FlowSections";
import UlfetPerks from "./UlfetPerks";
import { PersonCard } from "../PersonCard";
import "./pages.css";

// Yeni sayfaların bölümleri (lib/azure/pages.tsx metinleri). Sitede olan bileşenler yeniden kullanılır:
// teknik donanım kartları (Tech), olanaklar (Amenities), Mariachi ayrıcalıkları, NeoCity 5 Sıfır (Payment).

/** görsel + metin + madde listesi + düğme (satış sonrası, kira geliri) */
function Split({ id, kicker, title, lead, points, img, alt, note, cta, ctaHref, flip, stats, statsLabel, links }: {
  id: string; kicker: string; title: React.ReactNode; lead: string; points: string[]; img: string; alt: string; note: string; cta: string; ctaHref: string; flip?: boolean;
  stats?: { n: string; l: string }[]; statsLabel?: string; links?: { label: string; href: string }[];
}) {
  return (
    <section className="az-section az-split" id={id}>
      <div className={`az-wrap g${flip ? " flip" : ""}`}>
        <div className="pic rv"><Image src={img} alt={alt} fill quality={75} sizes="(min-width: 1000px) 50vw, 100vw" /></div>
        <div className="tx">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{lead}</p>
          <ul className="rv d2">{points.map((p) => <li key={p}><i><PiCheckBold size={12} aria-hidden /></i>{p}</li>)}</ul>
          {stats?.length ? (
            <div className="stats rv d2" aria-label={statsLabel}>
              {statsLabel ? <small>{statsLabel}</small> : null}
              <dl>{stats.map((x) => <div key={x.l}><dt>{x.n}</dt><dd>{x.l}</dd></div>)}</dl>
            </div>
          ) : null}
          <div className="btns rv d3">
            <Link className="az-btn sea sm" href={ctaHref} prefetch={false}>{cta} <Arrow /></Link>
            {links?.map((l) => <a key={l.href} className="az-btn glass sm" href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <Arrow /></a>)}
          </div>
          <p className="az-note-sm">{note}</p>
        </div>
      </div>
    </section>
  );
}

/** DND Ayrıcalığı sayfası: inşaat kalitesi · sosyal yaşam · satış sonrası · ev sahibi ayrıcalıkları */
export function AdvantageSections({ locale }: { locale: Locale }) {
  const t = PAGES[locale].advantage;
  const id = SECTION_IDS[locale];
  const tech = PROJECT_DATA.perla[locale].tech!;
  const amen = PROJECT_DATA["lagoon-verde"][locale].amenities;
  return (
    <>
      <Tech d={{ ...tech, kicker: t.quality.kicker, title: t.quality.title, lead: t.quality.lead }} name="DND" id={id.quality} locale={locale} />
      <Amenities d={{ ...amen, kicker: t.social.kicker, title: t.social.title, lead: t.social.lead }} name="DND" id={id.social} />
      <Split id={id.aftersales} kicker={t.after.kicker} title={t.after.title} lead={t.after.lead} points={t.after.points} img="/azure/pages/satis-sonrasi.jpg" alt={t.after.imageAlt} note={t.after.note} cta={t.after.cta} ctaHref={`${href(locale, "/contact")}#${id.form}`} />
      <Mariachi locale={locale} id={id.perks} />
      <UlfetPerks locale={locale} />
    </>
  );
}

/** Ödeme ve Yatırım Fırsatları sayfası: TL ödeme modeli (+ NeoCity 5 Sıfır, S.S.S.) · kampanyalar · kira geliri */
export function PaymentSections({ locale }: { locale: Locale }) {
  const t = PAGES[locale].payment;
  const id = SECTION_IDS[locale];
  const neo = PROJECT_DATA.neocity[locale].payment!;
  const faq = HOME[locale].faq.items.slice(0, 2);
  return (
    <>
      <Offers locale={locale} id={id.tl} />
      <Payment d={neo} id={PROJECT_UI[locale].ids.payment} />
      <section className="az-section tight">
        <div className="az-wrap az-pfaq">
          <h2 className="az-h2 sm rv">{t.faqTitle}</h2>
          <div className="az-faq rv d1">
            {faq.map((f) => <details key={f.q}><summary>{f.q} <i>+</i></summary><div className="a">{f.a}</div></details>)}
          </div>
        </div>
      </section>
      <section className="az-section az-camp" id={id.campaigns}>
        <div className="az-wrap">
          <div className="az-head">
            <span className="az-kicker rv">{t.campaigns.kicker}</span>
            <h2 className="az-h2 sm rv d1">{t.campaigns.title}</h2>
            <p className="az-lead rv d2">{t.campaigns.lead}</p>
          </div>
          <div className="cards">
            {t.campaigns.items.map((c, k) => (
              <Link key={c.h} className={`card rv d${k}`} href={href(locale, c.path)} prefetch={false}>
                <span className="pic"><Image src={c.img} alt="" fill quality={70} sizes="(min-width: 900px) 33vw, 100vw" /></span>
                <span className="b">
                  <span className="k">{c.k}</span>
                  <span className="h">{c.h}</span>
                  <span className="p">{c.p}</span>
                  <span className="go">{c.cta} <Arrow /></span>
                </span>
              </Link>
            ))}
          </div>
          <p className="az-note-sm">{t.campaigns.note}</p>
        </div>
      </section>
      <Split id={id.rental} kicker={t.rental.kicker} title={t.rental.title} lead={t.rental.lead} points={t.rental.points} img="/azure/pages/kira-geliri.jpg" alt={t.rental.imageAlt} note={t.rental.note} cta={t.rental.cta} ctaHref={`${href(locale, "/contact")}#${id.form}`} flip
        stats={t.rental.stats} statsLabel={t.rental.statsLabel} links={t.rental.links} />
    </>
  );
}

/** Haberler sayfası: Etkinlikler (gerçek fotoğraflar) */
export function EventsSection({ locale }: { locale: Locale }) {
  const t = PAGES[locale].events;
  const ig = SOCIALS.find((s) => s.label === "Instagram")!.href;
  return (
    <section className="az-section az-events" id={SECTION_IDS[locale].events}>
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 sm rv d1">{t.title}</h2>
          <p className="az-lead rv d2">{t.lead}</p>
        </div>
        <ul>
          {t.items.map((e, k) => {
            const body = (
              <>
                <span className="pic"><Image src={e.img} alt={e.h} fill quality={70} sizes="(min-width: 1000px) 33vw, (min-width: 640px) 50vw, 100vw" /></span>
                <span className="b"><small>{e.date}</small><b>{e.h}</b><span>{e.p}</span></span>
              </>
            );
            return (
              <li key={e.h} className={`rv d${k % 3}`}>
                {e.href ? <Link href={href(locale, e.href)} prefetch={false}>{body}</Link> : <div>{body}</div>}
              </li>
            );
          })}
        </ul>
        <a className="az-btn glass sm rv" href={ig} target="_blank" rel="noopener noreferrer">{t.follow} <Arrow /></a>
      </div>
    </section>
  );
}

/** Hakkımızda: DND Homes Amerika (sunum metni + ABD'de teslim edilen iki proje) */
export function AboutUsa({ locale }: { locale: Locale }) {
  const t = PAGES[locale].about.usa;
  return (
    <section className="az-section az-usa" id={SECTION_IDS[locale].usa}>
      <div className="az-wrap g">
        <div className="tx">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 sm rv d1">{t.title}</h2>
          {t.p.map((p) => <p key={p} className="az-lead rv d2">{p}</p>)}
          <div className="stat rv d2"><b data-count={120}>120</b><span>{t.stat}</span></div>
          <a className="az-btn glass sm rv d3" href="https://dnd-homes.com" target="_blank" rel="noopener noreferrer">{t.link} <Arrow /></a>
        </div>
        <div className="ph rv d1">
          {["/azure/usa/15-tyler-road.webp", "/azure/usa/131-dane-hill-road.webp"].map((src, k) => (
            <figure key={src}>
              <span><Image src={src} alt={`${t.photos[k]} · DND Homes`} fill quality={75} sizes="(min-width: 1000px) 24vw, 50vw" /></span>
              <figcaption>{t.photos[k]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Hakkımızda: kurucu ortak Netice Dökmecioğlu (satış sunumundaki metin ve portre; portre sağda) */
export function PartnerCard({ locale }: { locale: Locale }) {
  const t = PAGES[locale].about.partner;
  const name = "Netice Dökmecioğlu";
  return (
    <section className="az-section" id={locale === "tr" ? "ortak" : "partner"} aria-label={name}>
      <div className="az-wrap">
        <PersonCard person={{ img: "/azure/netice.jpg", role: t.role, name, bio: t.bio, q: t.quote, dl: t.dl }} heading="h2" flip />
      </div>
    </section>
  );
}
