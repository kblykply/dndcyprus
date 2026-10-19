import Arrow from "../Arrow";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { PiCheckBold, PiGearSixDuotone, PiHouseLineDuotone, PiKeyDuotone, PiTrophyDuotone } from "react-icons/pi";
import { HOME_FLOW } from "@/lib/azure/home-flow";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import { href, type Locale } from "@/lib/azure/site";
import UlfetPerks from "../pages/UlfetPerks";
import "./flow.css";

// Ana sayfa akışının yeni bölümleri (Ekim 2026): 3 Neden DND · 4 Ödeme ve yatırım fırsatları · 5 Yaşam ve
// ayrıcalıklar · 6 Rakamlarla DND. Metinler lib/azure/home-flow.tsx; yalnız Kıbrıs (Amerika Hakkımızda'da).

const WHY_ICONS: Record<string, IconType> = { house: PiHouseLineDuotone, key: PiKeyDuotone, gear: PiGearSixDuotone, award: PiTrophyDuotone };

/** 3 · Neden DND?: solda teslim edilen La Joya'nın fotoğrafı, sağda dört gerekçe */
export function WhyDnd({ locale }: { locale: Locale }) {
  const t = HOME_FLOW[locale].why;
  return (
    <section className="az-section az-why" id="neden-dnd">
      <div className="az-wrap g">
        <div className="pic rv">
          <Image src="/azure/lj-5.jpg" alt={t.imageAlt} fill quality={75} sizes="(min-width: 1000px) 44vw, 100vw" />
          <span className="az-tag">{t.imageTag}</span>
        </div>
        <div>
          <div className="az-head">
            <span className="az-kicker rv">{t.kicker}</span>
            <h2 className="az-h2 sm rv d1">{t.title}</h2>
            <p className="az-lead rv d2">{t.lead}</p>
          </div>
          <ul className="items">
            {t.items.map((it, k) => {
              const I = WHY_ICONS[it.icon] ?? PiHouseLineDuotone;
              return (
                <li key={it.h} className={`rv d${k % 3}`}>
                  <i><I size={24} aria-hidden /></i>
                  <h3>{it.h}</h3>
                  <p>{it.p}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** 4 · Size özel ödeme ve yatırım fırsatları: Lagoon Verde TL modeli + NeoCity 5 Sıfır */
export function Offers({ locale, id = "odeme-firsatlari", kicker, title, lead }: { locale: Locale; id?: string; kicker?: string; title?: ReactNode; lead?: string }) {
  const t = HOME_FLOW[locale].offers;
  return (
    <section className="az-section az-offers" id={id}>
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker ?? t.kicker}</span>
          <h2 className="az-h2 sm rv d1">{title ?? t.title}</h2>
          <p className="az-lead rv d2">{lead ?? t.lead}</p>
        </div>
        <div className="cards">
          {/* 60 ay TL: Lagoon Verde ve NeoCity'de geçerli; iki projeye ayrı bağlantı (kart tıklanabilir değil) */}
          <div className="card tl rv">
            <span className="bgph"><Image src="/azure/lv-5.jpg" alt="Lagoon Verde" fill quality={72} sizes="(min-width: 900px) 46vw, 100vw" /></span>
            <div className="gl">
              <span className="k">{t.tl.k}</span>
              <div className="hd"><div className="big">60</div><h3>{t.tl.h}</h3></div>
              <p>{t.tl.p}</p>
              <ul>{t.tl.rules.map((r) => <li key={r}><i><PiCheckBold size={12} aria-hidden /></i>{r}</li>)}</ul>
              <div className="links">
                <Link href={href(locale, "/lagoon-verde")} prefetch={false}>Lagoon Verde <Arrow /></Link>
                <Link href={`${href(locale, "/neocity")}#${PROJECT_UI[locale].ids.payment}`} prefetch={false}>NeoCity <Arrow /></Link>
              </div>
            </div>
          </div>
          <Link className="card neo rv d1" href={`${href(locale, "/neocity")}#${PROJECT_UI[locale].ids.payment}`} prefetch={false}>
            <span className="bgph"><Image src="/neocity/g-01.jpg" alt="NeoCity" fill quality={72} sizes="(min-width: 900px) 46vw, 100vw" /></span>
            <span className="gl">
              <span className="k">{t.neo.k}</span>
              <ul className="zeros">{t.neo.zeros.map((z) => <li key={z}><b>0</b><span>{z}</span></li>)}</ul>
              <h3>{t.neo.h}</h3>
              <p>{t.neo.p}</p>
              <span className="go">{t.neo.cta} <Arrow /></span>
            </span>
          </Link>
        </div>
        <p className="az-note-sm">{t.note}</p>
      </div>
    </section>
  );
}

/** 5 · DND ile yaşam ve ayrıcalıklar: Mariachi Beach Club ayrıcalığı (ardından sayfada "Lagoon Verde'de bir gün") */
export function LifePerks({ locale }: { locale: Locale }) {
  const t = HOME_FLOW[locale].life;
  return (
    <section className="az-section az-life" id="yasam">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 sm rv d1">{t.title}</h2>
          <p className="az-lead rv d2">{t.lead}</p>
        </div>
        <Link className="perk rv" href={href(locale, "/mariachi")} prefetch={false}>
          <span className="pic"><Image src="/azure/mb-6.jpg" alt={t.perk.h} fill quality={75} sizes="(min-width: 900px) 52vw, 100vw" /></span>
          <span className="tx">
            <span className="k">{t.perk.k}</span>
            <span className="h">{t.perk.h}</span>
            <span className="p">{t.perk.p}</span>
            <span className="ls">{t.perk.items.map((x) => <span key={x}><i><PiCheckBold size={12} aria-hidden /></i>{x}</span>)}</span>
            <span className="go">{t.perk.cta} <Arrow /></span>
          </span>
        </Link>
        <UlfetPerks locale={locale} compact />
      </div>
    </section>
  );
}

/** 6 · Rakamlarla DND: yalnız Kıbrıs rakamları (sayaç: AzureFx [data-count]) */
/** usa: Hakkımızda sürümü — ABD'deki 120 proje başa eklenir, ödeme rakamı çıkar (ana sayfada Amerika anılmaz) */
export function Numbers({ locale, id = "rakamlar", usa, title }: { locale: Locale; id?: string; usa?: string; title?: ReactNode }) {
  const t = HOME_FLOW[locale].numbers;
  const items = usa ? [{ n: 120, label: usa } as { n: number; suffix?: string; label: string }, ...t.items.filter((x) => x.n !== 60)] : t.items;
  return (
    <section className="az-section az-nums" id={id}>
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 sm rv d1">{title ?? t.title}</h2>
        </div>
        <ul>
          {items.map((x, k) => (
            <li key={x.label} className={`rv d${k % 4}`}>
              <b data-count={x.n} data-suffix={x.suffix ?? ""}>{x.n}{x.suffix ?? ""}</b>
              <span>{x.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
