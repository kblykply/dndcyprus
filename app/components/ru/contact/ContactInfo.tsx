// app/components/ru/contact/ContactInfo.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import DeferredIframe from "@/app/components/performance/DeferredIframe";
import SocialIcons from "@/app/components/azure/SocialIcons";

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
  mapImage?: string;            // haritanın tıklamadan önceki statik görseli (public/maps)
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
  title = <>Контактная <b>информация</b></>,
  subtitle = "Задайте нам любой вопрос — мы ответим как можно скорее.",
  offices = [
    {
      id: "hq",
      label: "Головной офис DND Cyprus",
      addressLines: [
        "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450",
      ],
      city: "Фамагуста",
      country: "Северный Кипр",
      phone: "+90 392 444 03 63",
      phoneDisplay: "+90 392 444 03 63",
      email: "mailto:info@dndcyprus.com",
      hours: ["Пн–пт 08:30–17:30, сб 08:30–13:00"],
      mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
      whatsapp: "https://wa.me/905488880363",
      image: "/dndofis.JPG",
      imageAlt: "Головной офис DND Cyprus",
      coords: [35.1310, 33.9193],
      mapImage: "/maps/ofis-gazimagusa.webp",
    },
    {
      id: "sales",
      label: "Офис продаж Lagoon Verde",
      addressLines: ["Sahil Yolu 45", "Искеле, Северный Кипр"],
      city: "Искеле",
      country: "Северный Кипр",
      phone: "+90 392 444 03 63",
      phoneDisplay: "+90 392 444 03 63",
      email: "mailto:info@dndcyprus.com",
      hours: ["Пн–пт 08:30–17:30, сб 08:30–13:00"],
      mapUrl: "https://maps.app.goo.gl/V2ainR6Rs2JkLaN27",
      image: "/ofis.jpg",
      imageAlt: "Офис продаж DND Cyprus",
      mapEmbedUrl:
        "https://www.google.com/maps?q=35.287,33.917&z=15&output=embed",
      mapImage: "/maps/ofis-iskele.webp",
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
    <section className="az-section" aria-label="Контактная информация">
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
                          activation="click"
                          poster={o.mapImage}
                          posterSizes="(max-width: 639px) calc(100vw - 56px), (max-width: 899px) calc(50vw - 40px), 360px"
                          posterQuality={75}
                          posterCredit={<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>}
                          src={mapSrc}
                          buttonLabel="Показать карту"
                          title={`${o.label}: карта`}
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute inset-0 h-full w-full border-0"
                          aria-label={`${o.label}: карта`}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="px-6 pb-6 pt-3 sm:px-8 sm:pb-8">
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={{ fontSize: "clamp(22px, 2vw, 28px)" }}>{o.label}</h3>
                    <div className="az-tags" style={{ marginTop: 0 }}><span>Офис</span></div>
                  </div>

                  {/* Address */}
                  <p className="mt-3" style={{ fontSize: 15, color: "var(--ink-60)" }}>
                    {o.addressLines.map((line, i) => <span key={i} className="block">{line}</span>)}
                  </p>

                  {/* Hours */}
                  {o.hours?.length ? (
                    <div className="mt-4">
                      <div style={LABEL_STYLE}>Часы работы</div>
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
                      <a className="az-btn glass sm" href={o.mapUrl} target="_blank" rel="noopener noreferrer">Открыть на карте</a>
                    )}
                  </div>
                  {idx === 0 && socials?.length ? <SocialIcons items={socials} label="Соцсети" /> : null}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
