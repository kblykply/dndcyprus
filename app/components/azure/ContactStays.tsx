import Img from "./Img";
import Arrow from "./Arrow";
import { PiEnvelopeSimpleDuotone, PiInstagramLogoDuotone, PiMapPinDuotone, PiWhatsappLogoDuotone } from "react-icons/pi";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/azure/site";
import "./contact-stays.css";

/**
 * İletişim sayfası: merkez ofisin altında La Joya Resort & Residences ve DND Reserve tanıtım kartları (22 Kasım 2026,
 * Lagoon Verde satış ofisinin yerine). Bilgiler kendi sitelerinden: lajoyacyprus.com/iletisim ve dndreserve.com/contact
 * (ikisinin rezervasyon ve WhatsApp hattı +90 548 888 03 63).
 */
const LJ_WA = "905488880363";
const LJ_TEL = "+90 548 888 03 63";

type Stay = { key: string; img: string; tag: string; name: string; text: string; cta: string; href: string; mail: string; addr: string; ig?: string };
type Copy = { kicker: string; title: ReactNode; lead: string; wa: string; stays: Stay[] };

const LJ = { img: "/azure/lj-5.jpg", href: "https://lajoyacyprus.com/", mail: "info@lajoyacyprus.com", ig: "lajoyaresort" };
const RS = { img: "/azure/contact/dnd-reserve.jpg", href: "https://www.dndreserve.com", mail: "info@dndreserve.com" };

const T: Record<Locale, Copy> = {
  tr: {
    kicker: "Konaklama ve kiralama", title: <>Tatiliniz için <b>La Joya ve DND Reserve.</b></>,
    lead: "DND ekosisteminde günlük ve haftalık konaklama: La Joya Resort & Residences ve DND Reserve kiralık daireleri.",
    wa: "WhatsApp",
    stays: [
      { key: "lj", ...LJ, tag: "Tatil konaklaması", name: "La Joya Resort & Residences", text: "Long Beach’e 500 m mesafede; ada havuzu, spor salonu ve Joy Cafe & Bar ile Stüdyo, 1+1 Loft ve 2+1 Penthouse’ta günlük ve haftalık konaklama.", cta: "Rezervasyon yap", addr: "Amber Sokak No: 12/A, Bahçeler – İskele" },
      { key: "rs", ...RS, tag: "Kiralık daireler", name: "DND Reserve", text: "İskele Long Beach’te günlük ve haftalık kiralık daireler. Müsaitliği görün, online ödeyin, rezervasyonunuzu anında kesinleştirin.", cta: "Müsait daireleri gör", addr: "Long Beach, İskele, Kuzey Kıbrıs" },
    ],
  },
  en: {
    kicker: "Stays and rentals", title: <>For your holiday: <b>La Joya and DND Reserve.</b></>,
    lead: "Daily and weekly stays within the DND ecosystem: La Joya Resort & Residences and DND Reserve rental apartments.",
    wa: "WhatsApp",
    stays: [
      { key: "lj", ...LJ, tag: "Holiday stays", name: "La Joya Resort & Residences", text: "500 m from Long Beach, with an island pool, gym and Joy Cafe & Bar: daily and weekly stays in studios, 1+1 lofts and 2+1 penthouses.", cta: "Book your stay", addr: "Amber Sokak No: 12/A, Bahçeler – İskele" },
      { key: "rs", ...RS, tag: "Rental apartments", name: "DND Reserve", text: "Daily and weekly rental apartments at Long Beach, İskele. Check availability, pay online and confirm your booking instantly.", cta: "See available apartments", addr: "Long Beach, İskele, North Cyprus" },
    ],
  },
  de: {
    kicker: "Unterkunft und Vermietung", title: <>Für Ihren Urlaub: <b>La Joya und DND Reserve.</b></>,
    lead: "Tages- und Wochenaufenthalte im DND-Ökosystem: La Joya Resort & Residences und die Mietwohnungen von DND Reserve.",
    wa: "WhatsApp",
    stays: [
      { key: "lj", ...LJ, tag: "Urlaubsunterkunft", name: "La Joya Resort & Residences", text: "500 m vom Long Beach, mit Inselpool, Fitnessraum und Joy Cafe & Bar: Tages- und Wochenaufenthalte in Studios, 1+1-Lofts und 2+1-Penthouses.", cta: "Jetzt buchen", addr: "Amber Sokak No: 12/A, Bahçeler – İskele" },
      { key: "rs", ...RS, tag: "Mietwohnungen", name: "DND Reserve", text: "Ferienwohnungen für Tage und Wochen am Long Beach, İskele. Verfügbarkeit prüfen, online bezahlen und die Buchung sofort bestätigen.", cta: "Freie Wohnungen ansehen", addr: "Long Beach, İskele, Nordzypern" },
    ],
  },
  ru: {
    kicker: "Проживание и аренда", title: <>Для вашего отдыха: <b>La Joya и DND Reserve.</b></>,
    lead: "Посуточное и понедельное проживание в экосистеме DND: La Joya Resort & Residences и апартаменты DND Reserve.",
    wa: "WhatsApp",
    stays: [
      { key: "lj", ...LJ, tag: "Отдых", name: "La Joya Resort & Residences", text: "В 500 м от Long Beach: бассейн с островом, спортзал и Joy Cafe & Bar; посуточное и понедельное проживание в студиях, лофтах 1+1 и пентхаусах 2+1.", cta: "Забронировать", addr: "Amber Sokak No: 12/A, Bahçeler – İskele" },
      { key: "rs", ...RS, tag: "Апартаменты в аренду", name: "DND Reserve", text: "Апартаменты посуточно и на неделю на Long Beach в Искеле. Проверьте свободные даты, оплатите онлайн и сразу подтвердите бронирование.", cta: "Свободные апартаменты", addr: "Long Beach, Искеле, Северный Кипр" },
    ],
  },
  pl: {
    kicker: "Pobyty i wynajem", title: <>Na wakacje: <b>La Joya i DND Reserve.</b></>,
    lead: "Pobyty na dni i tygodnie w ekosystemie DND: La Joya Resort & Residences oraz apartamenty na wynajem DND Reserve.",
    wa: "WhatsApp",
    stays: [
      { key: "lj", ...LJ, tag: "Pobyty wakacyjne", name: "La Joya Resort & Residences", text: "500 m od Long Beach, z basenem z wyspą, siłownią i Joy Cafe & Bar: pobyty na dni i tygodnie w studiach, loftach 1+1 i penthouse’ach 2+1.", cta: "Zarezerwuj pobyt", addr: "Amber Sokak No: 12/A, Bahçeler – İskele" },
      { key: "rs", ...RS, tag: "Apartamenty na wynajem", name: "DND Reserve", text: "Apartamenty na dni i tygodnie przy Long Beach w İskele. Sprawdź dostępność, zapłać online i od razu potwierdź rezerwację.", cta: "Zobacz wolne apartamenty", addr: "Long Beach, İskele, Cypr Północny" },
    ],
  },
};

export default function ContactStays({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <section className="az-section az-stays" aria-label={t.kicker}>
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 sm rv d1">{t.title}</h2>
          <p className="az-lead rv d2">{t.lead}</p>
        </div>
        <div className="g">
          {t.stays.map((s, i) => (
            <article key={s.key} className={`az-card rv d${i + 1}`}>
              <a className="pic" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                <Img src={s.img} sizes="(min-width: 900px) 600px, 100vw" alt={s.name} />
                <span className="tag">{s.tag}</span>
              </a>
              <div className="bd">
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <ul>
                  <li><PiWhatsappLogoDuotone size={18} aria-hidden /><a href={`https://wa.me/${LJ_WA}`} target="_blank" rel="noopener noreferrer">{LJ_TEL}</a></li>
                  <li><PiEnvelopeSimpleDuotone size={18} aria-hidden /><a href={`mailto:${s.mail}`}>{s.mail}</a></li>
                  <li><PiMapPinDuotone size={18} aria-hidden /><span>{s.addr}</span></li>
                </ul>
                <div className="cta">
                  <a className="az-btn sea sm" href={s.href} target="_blank" rel="noopener noreferrer">{s.cta} <Arrow /></a>
                  <a className="az-btn glass sm wa" href={`https://wa.me/${LJ_WA}`} target="_blank" rel="noopener noreferrer"><PiWhatsappLogoDuotone size={16} aria-hidden /> {t.wa}</a>
                  {s.ig ? <a className="az-btn glass sm" href={`https://www.instagram.com/${s.ig}/`} target="_blank" rel="noopener noreferrer"><PiInstagramLogoDuotone size={16} aria-hidden /> @{s.ig}</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
