import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { PiFacebookLogoDuotone, PiInstagramLogoDuotone, PiLinkedinLogoDuotone, PiYoutubeLogoDuotone } from "react-icons/pi";
import { CONTACT, FOOTER_COPY, LOCALE_META, NAV_COPY, PROJECTS, SOCIALS, href, type Locale } from "@/lib/azure/site";
import CookiePrefsLink from "./CookiePrefsLink";
import "./footer.css";
import FooterFit from "./FooterFit";

// sosyal medya ayrı sütun yerine logonun yanında simge olarak durur
const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: PiInstagramLogoDuotone, linkedin: PiLinkedinLogoDuotone, facebook: PiFacebookLogoDuotone, youtube: PiYoutubeLogoDuotone,
};
// iki sütunlu listeler sütun sütun okunur: satır sayısı öğe sayısının yarısı (yukarı yuvarlanır)
const rows = (n: number) => ({ "--rows": Math.ceil(n / 2) }) as CSSProperties;

export default function AzureFooter({ locale }: { locale: Locale }) {
  const t = FOOTER_COPY[locale];
  const n = NAV_COPY[locale];
  const year = new Date().getFullYear();
  const general = [
    { path: "/", label: n.home }, { path: "/about", label: n.about }, { path: "/team", label: n.team }, { path: "/press", label: n.press },
    ...(LOCALE_META[locale].blog ? [{ path: "/blog", label: n.blog }] : []),
    { path: "/dndcyprus", label: n.media }, { path: "/contact", label: n.contact },
  ];
  return (
    <footer className="az-footer">
      <div className="az-wrap">
        <div className="g">
          <div className="brand">
            <div className="top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/DND-LOGO-2.svg" alt="DND Cyprus" width={84} height={36} />
              <nav className="soc" aria-label={t.social}>
                {SOCIALS.map((s) => {
                  const C = SOCIAL_ICONS[s.label.toLowerCase()];
                  return <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>{C ? <C size={18} aria-hidden /> : s.label}</a>;
                })}
              </nav>
            </div>
            <p>{t.tagline} {CONTACT.hq[locale]}</p>
            <p className="ct">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <FooterFit />
          </div>
          <div>
            <h2>{t.projects}</h2>
            <ul style={rows(PROJECTS.length + 1)}>
              <li><Link href={href(locale, "/projects")} prefetch={false}>{n.all}</Link></li>
              {PROJECTS.map((p) => <li key={p.slug}><Link href={href(locale, `/${p.slug}`)} prefetch={false}>{p.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2>{t.general}</h2>
            <ul style={rows(general.length)}>
              {general.map((g) => <li key={g.path}><Link href={href(locale, g.path)} prefetch={false}>{g.label}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© {year} CY-DND HOMES LTD. {t.rights}</span>
          <span className="links">
            <Link href={href(locale, "/privacy")} prefetch={false}>{t.privacy}</Link>
            <Link href={href(locale, "/terms")} prefetch={false}>{t.terms}</Link>
            <CookiePrefsLink label={t.cookies} />
          </span>
        </div>
      </div>
    </footer>
  );
}
