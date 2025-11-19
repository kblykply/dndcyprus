  // app/components/Footer.tsx
  "use client";

  import React from "react";

  const TEAL = "#27959b";
  const ORANGE = "#f15c34";

  type LinkItem = { label: string; href: string };
  type NavGroup = { title: string; links: LinkItem[] };

  type Props = {
    logoSrc?: string;             // /images/logo.svg
    companyName?: string;         // "DND Cyprus"
    tagline?: string;             // short one-liner
    addressLines?: string[];      // ["Örnek Cad. No:12", "Lefkoşa, Kuzey Kıbrıs"]
    email?: string;               // "info@dndcyprus.com"
    phone?: string;               // "+90 555 555 55 55"
    nav?: NavGroup[];             // grouped navigation
    socials?: LinkItem[];         // labels only (no icons)
    copyrightOwner?: string;      // "DND Cyprus"
    privacyHref?: string;
    termsHref?: string;
  };

 export default function Footer({
  logoSrc = "/DND-LOGO-2.svg",
  companyName = "DND Cyprus",
  tagline = "Reliable, transparent, and sustainable solutions.",
  addressLines = [
    "Alasya Park Site 2nd Phase, Shop No: 2-3, Ulucam Road, Sakarya – Gazimağusa",
  ],
  email = "info@dndcyprus.com",
  phone = "+90 392 444 03 63",
  nav = [
    {
      title: "Projects",
      links: [
        { label: "All Projects", href: "/en/projects" },
        { label: "Lagoon Verde", href: "/en/lagoon-verde" },
        { label: "La Joya Perla II", href: "/en/perla-ii" },
        { label: "La Joya Perla", href: "/en/perla" },
        { label: "La Joya", href: "/en/la-joya" },
        { label: "Mariachi Beach Club", href: "/en/mariachi" },
      ],
    },
    {
      title: "General",
      links: [
        { label: "Home", href: "/en" },
        { label: "Contact", href: "/en/contact" },
        { label: "News", href: "/en/press" },
      ],
    },

    {
      title: "About",
      links: [
        { label: "About Us", href: "/en/about" },
        { label: "Our Team", href: "/en/team" },
      ],
    },
  ],

  socials = [
    { label: "LinkedIn", href: "https://cy.linkedin.com/company/dndcyprus" },
    { label: "Instagram", href: "https://www.instagram.com/dndcyprus/" },
    { label: "Facebook", href: "https://www.facebook.com/dndcyprus/?locale=tr_TR" },
    { label: "YouTube", href: "https://www.youtube.com/@dndcyprus" },
  ],
  copyrightOwner = "DND Cyprus",
  privacyHref = "/en/privacy",
  termsHref = "/en/terms",

  }: Props) {
    const year = new Date().getFullYear();

    return (
      <footer
        className="relative overflow-hidden bg-white"
  style={
  {
    background: "#ffffff",
    color: "#141517",
    ["--stroke" as string]: "rgba(20,21,23,0.08)",
  } as React.CSSProperties
}

      >
        {/* subtle color wash */}
        <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
              background: `
                  radial-gradient(28rem 20rem at 15% 100%, ${TEAL}12, transparent 70%),
                  radial-gradient(26rem 16rem at 85% 0%, ${ORANGE}14, transparent 70%)
              `,
              }}
          />  

        {/* top divider */}
        <div className="relative h-px w-full" style={{ background: "var(--stroke)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Brand / Address */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                {logoSrc ? (
                  <img src={logoSrc} alt={companyName} className="h-9 w-auto" />
                ) : null}
              </div>
              <p className="mt-3 text-sm" style={{ color: "rgba(20,21,23,0.65)" }}>
                {tagline}
              </p>

              {addressLines?.length ? (
                <div className="mt-4 text-sm" style={{ color: "rgba(20,21,23,0.70)" }}>
                  {addressLines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                {phone ? (
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: `${TEAL}14`,
                      color: TEAL,
                      border: `1px solid ${TEAL}33`,
                    }}
                  >
                    {phone}
                  </a>
                ) : null}
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "rgba(20,21,23,0.85)",
                      border: "1px solid var(--stroke)",
                    }}
                  >
                    {email}
                  </a>
                ) : null}
              </div>

              {/* Social links */}
              {socials?.length ? (
                <div className="mt-4">
                  <div
                    className="text-xs uppercase tracking-wide mb-2"
                    style={{ color: "rgba(20,21,23,0.55)" }}
                  >
                    Social
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "rgba(20,21,23,0.85)",
                          border: "1px solid var(--stroke)",
                        }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Navigation groups */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {nav.map((group) => (
                <nav key={group.title} aria-label={group.title}>
                  <div className="text-sm font-semibold">{group.title}</div>
                  <ul className="mt-3 space-y-2">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          className="text-sm hover:opacity-80"
                          style={{ color: "rgba(20,21,23,0.70)" }}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--stroke)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs" style={{ color: "rgba(20,21,23,0.60)" }}>
                © {year} {copyrightOwner}. Tüm hakları saklıdır.
              </div>
              <div className="flex items-center gap-3 text-xs">
                <a
                  href={privacyHref}
                  className="underline underline-offset-4 hover:opacity-80"
                  style={{ color: "rgba(20,21,23,0.70)" }}
                >
                  Privacy
                </a>
                <span style={{ color: "rgba(20,21,23,0.40)" }}>•</span>
                <a
                  href={termsHref}
                  className="underline underline-offset-4 hover:opacity-80"
                  style={{ color: "rgba(20,21,23,0.70)" }}
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
