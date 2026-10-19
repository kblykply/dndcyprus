import GlassArrow from "../GlassArrow";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { PiGearSixDuotone, PiHouseLineDuotone, PiKeyDuotone, PiTrophyDuotone } from "react-icons/pi";
import { HOME_FLOW } from "@/lib/azure/home-flow";
import { SECTION_IDS } from "@/lib/azure/nav";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import { href, type Locale } from "@/lib/azure/site";
import WhyVideo from "./WhyVideo";
import VenueCarousel from "./VenueCarousel";
import { VIDEO_UI } from "@/lib/azure/videos";
import "./flow.css";

// Ana sayfa akışının yeni bölümleri (Ekim 2026): 3 Neden DND · 4 Ödeme ve yatırım fırsatları · 5 Yaşam ve
// ayrıcalıklar · 6 Rakamlarla DND. Metinler lib/azure/home-flow.tsx; yalnız Kıbrıs (Amerika Hakkımızda'da).

const WHY_ICONS: Record<string, IconType> = { house: PiHouseLineDuotone, key: PiKeyDuotone, gear: PiGearSixDuotone, award: PiTrophyDuotone };

/** 3 · Neden DND?: solda teslim edilen La Joya'nın fotoğrafı, sağda dört gerekçe */
// La Joya resmi açılış videosu (DND Cyprus YouTube kanalı; lib/azure/videos.ts ile aynı)
const LJ_OPENING = "GKH4VSPH57E";

export function WhyDnd({ locale }: { locale: Locale }) {
  const t = HOME_FLOW[locale].why;
  return (
    <section className="az-section az-why" id="neden-dnd">
      <div className="az-wrap g">
        {/* La Joya açılış videosu (kullanıcı isteği): sessiz ve döngülü başlar, altyazı kapalı, ses düğmesi var (WhyVideo) */}
        <div className="pic rv">
          <WhyVideo videoId={LJ_OPENING} title={t.videoTitle} mute={VIDEO_UI[locale].mute} unmute={VIDEO_UI[locale].unmute} />
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
        {/* proje kartlarının dili: tam fotoğraf, altta nötr hafif koyulaşma, kısa beyaz yazı, çağrılar cam satırda (ayrıntı proje / ödeme sayfalarında).
            Her kart tek proje (kullanıcı: "ikisini tek fotoda verme"): proje sayfası + ödeme planı */}
        <div className="cards">
          <div className="card tl rv">
            <span className="bgph"><Image src="/azure/lv-5.jpg" alt="Lagoon Verde" fill quality={75} sizes="(min-width: 900px) 46vw, 100vw" /></span>
            <div className="tx">
              <small>{t.tl.k}</small>
              <h3 className="num"><span className="n">{t.tl.pre ? <i>{t.tl.pre}</i> : null}<b>60</b></span><span className="w">{t.tl.post}</span></h3>
              <div className="rows">
                <Link className="az-glassrow" href={href(locale, "/lagoon-verde")} prefetch={false}>Lagoon Verde <GlassArrow /></Link>
                <Link className="az-glassrow" href={`${href(locale, "/payment-plans")}#${SECTION_IDS[locale].tl}`} prefetch={false}>{t.neo.cta} <GlassArrow /></Link>
              </div>
            </div>
          </div>
          <div className="card neo rv d1">
            <span className="bgph"><Image src="/neocity/g-01.jpg" alt="NeoCity" fill quality={75} sizes="(min-width: 900px) 46vw, 100vw" /></span>
            <div className="tx">
              <small>{t.neo.k}</small>
              <ul className="zeros">{t.neo.zeros.map((z) => <li key={z}><b>0</b><span>{z}</span></li>)}</ul>
              <h3>{t.neo.h}</h3>
              <div className="rows">
                <Link className="az-glassrow" href={href(locale, "/neocity")} prefetch={false}>NeoCity <GlassArrow /></Link>
                <Link className="az-glassrow" href={`${href(locale, "/neocity")}#${PROJECT_UI[locale].ids.payment}`} prefetch={false}>{t.neo.cta} <GlassArrow /></Link>
              </div>
            </div>
          </div>
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
        {/* kaydırmalı üç mekân kartı: Ülfet Shu → Ülfet Beach Club → Mariachi (kullanıcının sırası) */}
        <div className="rv d1"><VenueCarousel locale={locale} /></div>
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
