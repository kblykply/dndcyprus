import Link from "next/link";
import { CONTACT, FOOTER_COPY, NAV_COPY, PROJECTS, SOCIALS, href, type Locale } from "@/lib/azure/site";
import CookiePrefsLink from "./CookiePrefsLink";

export default function AzureFooter({ locale }: { locale: Locale }) {
  const t = FOOTER_COPY[locale];
  const n = NAV_COPY[locale];
  const year = new Date().getFullYear();
  return (
    <footer className="az-footer">
      <div className="az-wrap">
        <div className="g">
          <div className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/DND-LOGO-2.svg" alt="DND Cyprus" width={84} height={36} />
            <p>{t.tagline} {CONTACT.hq[locale]}</p>
            <p style={{ marginTop: 10 }}>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
          <div>
            <h4>{t.projects}</h4>
            <ul>
              <li><Link href={href(locale, "/projects")} prefetch={false}>{n.all}</Link></li>
              {PROJECTS.map((p) => <li key={p.slug}><Link href={href(locale, `/${p.slug}`)} prefetch={false}>{p.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>{t.general}</h4>
            <ul>
              <li><Link href={href(locale, "/")} prefetch={false}>{n.home}</Link></li>
              <li><Link href={href(locale, "/about")} prefetch={false}>{n.about}</Link></li>
              <li><Link href={href(locale, "/team")} prefetch={false}>{n.team}</Link></li>
              <li><Link href={href(locale, "/press")} prefetch={false}>{n.press}</Link></li>
              {locale === "tr" && <li><Link href="/tr/blog" prefetch={false}>{n.blog}</Link></li>}
              <li><Link href={href(locale, "/dndcyprus")} prefetch={false}>{n.media}</Link></li>
              <li><Link href={href(locale, "/contact")} prefetch={false}>{n.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.social}</h4>
            <ul>
              {SOCIALS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
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
