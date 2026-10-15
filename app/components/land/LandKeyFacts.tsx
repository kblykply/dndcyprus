// app/components/land/LandKeyFacts.tsx
import type { ReactNode } from "react";

type Fact = { label: string; value: string; accent?: "teal" | "orange" };

type Props = {
  title?: ReactNode;
  subtitle?: string;
  facts?: Fact[];
  note?: string;
  /** optional: simple SEO JSON-LD */
  withSeoJsonLd?: boolean;
};

export default function LandKeyFacts({
  title = <>Öne Çıkan <b>Bilgiler</b></>,
  subtitle = "Arsaya dair temel parametreler. Nihai uygulama ilgili kurumların onayına tabidir.",
  facts = [
    { label: "Alan", value: "9,840 m²", accent: "teal" },
    { label: "Cephe", value: "42 m", accent: "orange" },
    { label: "Zonlama", value: "Fasıl 96", accent: "orange" },
    { label: "Maks. Yükseklik", value: "Bilgi amaçlı: ~5 kat", accent: "teal" },
  ],
  note = "*Bilgi amaçlıdır; imar/ruhsat parametreleri parsel özelinde ve yetkili kurum kararlarına göre değişebilir.",
  withSeoJsonLd = false,
}: Props) {
  return (
    <section className="az-section" aria-label="Geçitkale — Öne Çıkan Bilgiler">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Arsa Bilgileri</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label + i} className={`az-tile rv d${i % 4}`} style={{ minHeight: 170 }}>
              <div className="k">{f.label}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 2.4vw, 40px)",
                  lineHeight: 1.05,
                  letterSpacing: "-.02em",
                  color: f.accent === "orange" ? "var(--coral)" : "var(--sea)",
                  textWrap: "balance",
                }}
              >
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {note ? (
          <p className="rv d2" style={{ marginTop: 16, fontSize: 12, color: "var(--ink-40)" }}>{note}</p>
        ) : null}
      </div>

      {/* minimal SEO JSON-LD (optional) */}
      {withSeoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Place",
              name: "Geçitkale — Land Project",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Geçitkale",
                addressRegion: "İskele",
                addressCountry: "CY",
              },
              // Add exact coordinates when available:
              geo: {
                "@type": "GeoCoordinates",
                latitude: 35.261,
                longitude: 33.784,
              },
            }),
          }}
        />
      )}
    </section>
  );
}
