// app/components/contact/ContactInfo.tsx
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
  title = <>İletişim <b>Bilgileri</b></>,
  subtitle = "Tüm sorularınız için bize ulaşın. En kısa sürede dönüş yaparız.",
  offices = [
    {
      id: "hq",
      label: "DND Cyprus Merkez Ofis",
      addressLines: ["Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Gazimağusa, Kıbrıs, 99450"],
      city: "Gazimağusa",
      country: "Kuzey Kıbrıs",
      phone: "+90 392 444 03 63",
      phoneDisplay: "+90 392 444 03 63",
      email: "mailto:info@dndcyprus.com",
      hours: ["Hafta içi 08:30–17:30 , Cumartesi 8:30–13:00 "],
      mapUrl: "https://maps.app.goo.gl/xwGdVsU3TxJymkVK8",
      whatsapp: "https://wa.me/905488880363",
      image: "/dndofis.JPG",
      imageAlt: "DND Cyprus Merkez Ofis",
      coords: [35.1856, 33.3823],
    },
    {
      id: "sales",
      label: "Lagoon Verde Satış Ofisi",
      addressLines: ["Sahil Yolu 45", "İskele, Kuzey Kıbrıs"],
      city: "İskele",
      country: "Kuzey Kıbrıs",
      phone: "+90 392 444 03 63",
      phoneDisplay: "+90 392 444 03 63",
      email: "mailto:info@dndcyprus.com",
      hours: ["Hafta içi 08:30–17:30 , Cumartesi 8:30–13:00 "],
      mapUrl: "https://maps.app.goo.gl/V2ainR6Rs2JkLaN27",
      image: "/ofis.jpg",
      imageAlt: "DND Cyprus Satış Ofisi",
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
  // Kuruluş JSON-LD'si artık site geneli layout'ta (tr/layout, en/(main)/layout) basılıyor

  return (
    <section className="az-section" aria-label="İletişim Bilgileri">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>

        {/* Ofisler */}
        <div className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
          {offices.map((o, idx) => {
            const mapSrc = o.mapEmbedUrl || (o.coords ? buildGmapsEmbedSrc(o.coords) : null);

            return (
              <article key={o.id} className={`az-card rv d${(idx % 3) + 1}`}>
                {/* Görsel + Harita */}
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
                          buttonLabel="Haritayı göster"
                          title={`${o.label} Harita`}
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute inset-0 h-full w-full border-0"
                          aria-label={`${o.label} Harita`}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="px-6 pb-6 pt-3 sm:px-8 sm:pb-8">
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={{ fontSize: "clamp(22px, 2vw, 28px)" }}>{o.label}</h3>
                    <div className="az-tags" style={{ marginTop: 0 }}><span>Ofis</span></div>
                  </div>

                  {/* Adres */}
                  <p className="mt-3" style={{ fontSize: 15, color: "var(--ink-60)" }}>
                    {o.addressLines.map((line, i) => <span key={i} className="block">{line}</span>)}
                  </p>

                  {/* Çalışma saatleri */}
                  {o.hours?.length ? (
                    <div className="mt-4">
                      <div style={LABEL_STYLE}>Çalışma Saatleri</div>
                      <div className="mt-1 text-sm" style={{ color: "var(--ink-60)" }}>
                        {o.hours.map((h) => <div key={h}>{h}</div>)}
                      </div>
                    </div>
                  ) : null}

                  {/* İletişim */}
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
                      <a className="az-btn glass sm" href={o.mapUrl} target="_blank" rel="noopener noreferrer">Haritada Gör</a>
                    )}
                  </div>
                  {idx === 0 && socials?.length ? <SocialIcons items={socials} label="Sosyal medya" /> : null}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
