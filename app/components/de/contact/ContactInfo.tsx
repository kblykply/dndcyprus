// app/components/de/contact/ContactInfo.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import DeferredIframe from "@/app/components/performance/DeferredIframe";

type Office = {
  id: string;
  label: string;
  addressLines: string[];
  city?: string;
  country?: string;
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  hours?: string[];
  mapUrl?: string;
  whatsapp?: string;

  // Extended
  image?: string;
  imageAlt?: string;
  coords?: [number, number];    // [lat, lng]
  mapEmbedUrl?: string;         // optional custom iframe src
};

type Props = {
  kicker?: string;
  title?: ReactNode;
  subtitle?: string;
  offices?: Office[];
  socials?: { label: string; href: string }[];
};

// Google embed with native pin
function buildGmapsEmbedSrc(coords: [number, number]) {
  const [lat, lng] = coords;
  return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

const LABEL_STYLE = { fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, color: "var(--sea)" } as const;

export default function ContactInfo({
  kicker = "DND Cyprus",
  title = <>Unsere <b>Kontaktdaten</b></>,
  subtitle = "Sie haben Fragen? Schreiben Sie uns – wir melden uns so schnell wie möglich bei Ihnen.",
  offices = [
    {
      id: "hq",
      label: "Hauptsitz DND Cyprus",
      addressLines: [
        "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450",
      ],
      city: "Famagusta",
      country: "Nordzypern",
      phone: "+90 392 444 03 63",
      phoneDisplay: "+90 392 444 03 63",
      email: "mailto:info@dndcyprus.com",
      hours: ["Wochentags 08:30–17:30, Samstag 08:30–13:00"],
      mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
      whatsapp: "https://wa.me/905488880363",
      image: "/dndofis.JPG",
      imageAlt: "Hauptsitz DND Cyprus",
      coords: [35.1856, 33.3823],
    },
    {
      id: "sales",
      label: "Verkaufsbüro Lagoon Verde",
      addressLines: ["Sahil Yolu 45", "İskele, Nordzypern"],
      city: "İskele",
      country: "Nordzypern",
      phone: "+90 392 444 03 63",
      phoneDisplay: "+90 392 444 03 63",
      email: "mailto:info@dndcyprus.com",
      hours: ["Wochentags 08:30–17:30, Samstag 08:30–13:00"],
      mapUrl: "https://maps.app.goo.gl/V2ainR6Rs2JkLaN27",
      image: "/ofis.jpg",
      imageAlt: "Verkaufsbüro DND Cyprus",
      mapEmbedUrl:
        "https://www.google.com/maps?q=35.287,33.917&z=15&output=embed",
    },
  ],
  socials = [
    { label: "LinkedIn", href: "https://cy.linkedin.com/company/dndcyprus" },
    { label: "Instagram", href: "https://www.instagram.com/dndcyprus/" },
    { label: "Facebook", href: "https://www.facebook.com/dndcyprus/?locale=tr_TR" },
    { label: "YouTube", href: "https://www.youtube.com/@dndcyprus" },
  ],
}: Props) {
  // Organization JSON-LD is now emitted in the site-wide layouts (tr/layout, en/(main)/layout)

  return (
    <section className="az-section" aria-label="Kontaktdaten">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>

        {/* Offices */}
        <div className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
          {offices.map((o, idx) => {
            const mapSrc = o.mapEmbedUrl || (o.coords ? buildGmapsEmbedSrc(o.coords) : null);

            return (
              <article key={o.id} className={`az-card rv d${(idx % 3) + 1}`}>
                {/* Image + Map */}
                {(o.image || mapSrc) && (
                  <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2">
                    {o.image && (
                      <div className="relative h-48 overflow-hidden rounded-[22px]" style={{ background: "var(--sky-2)" }}>
                        <Image
                          src={o.image}
                          alt={o.imageAlt || o.label}
                          width={800}
                          height={600}
                          sizes="(max-width: 639px) calc(100vw - 56px), (max-width: 899px) calc(50vw - 40px), 360px"
                          quality={65}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    {mapSrc && (
                      <div className="relative h-48 overflow-hidden rounded-[22px]" style={{ background: "var(--sky-2)" }}>
                        <DeferredIframe
                          src={mapSrc}
                          buttonLabel="Karte anzeigen"
                          title={`Karte: ${o.label}`}
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute inset-0 h-full w-full border-0"
                          aria-label={`Karte: ${o.label}`}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="px-6 pb-6 pt-3 sm:px-8 sm:pb-8">
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={{ fontSize: "clamp(22px, 2vw, 28px)" }}>{o.label}</h3>
                    <div className="az-tags" style={{ marginTop: 0 }}><span>Büro</span></div>
                  </div>

                  {/* Address */}
                  <p className="mt-3" style={{ fontSize: 15, color: "var(--ink-60)" }}>
                    {o.addressLines.map((line, i) => <span key={i} className="block">{line}</span>)}
                  </p>

                  {/* Hours */}
                  {o.hours?.length ? (
                    <div className="mt-4">
                      <div style={LABEL_STYLE}>Öffnungszeiten</div>
                      <div className="mt-1 text-sm" style={{ color: "var(--ink-60)" }}>
                        {o.hours.map((h) => <div key={h}>{h}</div>)}
                      </div>
                    </div>
                  ) : null}

                  {/* Contacts */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {o.phone && (
                      <a className="az-btn sea sm" href={`tel:${o.phone.replace(/^tel:/, "").replace(/[^\d+]/g, "")}`}>
                        {o.phoneDisplay || o.phone.replace("tel:", "")}
                      </a>
                    )}
                    {o.email && (
                      <a className="az-btn glass sm" href={o.email}>{o.email.replace("mailto:", "")}</a>
                    )}
                    {o.whatsapp && (
                      <a className="az-btn glass sm" href={o.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: "var(--coral)" }}>
                        WhatsApp
                      </a>
                    )}
                    {o.mapUrl && (
                      <a className="az-btn glass sm" href={o.mapUrl} target="_blank" rel="noopener noreferrer">In Karte öffnen</a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Socials */}
        {socials?.length ? (
          <div className="rv d2" style={{ marginTop: 28 }}>
            <div className="mb-3 flex items-center gap-4">
              <h4 style={{ ...LABEL_STYLE, fontFamily: "var(--font-sans)" }}>Social Media</h4>
              <div className="h-px flex-1" style={{ background: "var(--line)" }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a key={s.label} className="az-btn glass sm" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
