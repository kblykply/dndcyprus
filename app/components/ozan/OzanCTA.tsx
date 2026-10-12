// app/components/about/OzanCTA.tsx
import React from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

export default function OzanCTA({
  title = "Birlikte Değer Yaratmaya Hazır mısınız?",
  subtitle = "Ozan Dökmecioğlu ile iletişime geçin, deneyim ve vizyonunuzu güçlendirin.",
  primaryLabel = "İletişime Geç",
  primaryHref = "/contact",
  secondaryLabel = "Daha Fazla Bilgi",
  secondaryHref = "/about/ozan-dokmecioglu",
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section
      aria-label="Call to Action"
      className="relative overflow-hidden"
      style={{ background: "#fff", color: "#141517" }}
    >
      {/* brand gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(30rem 20rem at 12% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 18rem at 88% 100%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
        >
          {title}
        </h2>

        <p
          className="mt-3 text-sm sm:text-base max-w-2xl mx-auto"
          style={{ color: "rgba(20,21,23,0.72)" }}
        >
          {subtitle}
        </p>

        <div
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href={primaryHref}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: TEAL,
              color: "#fff",
              boxShadow: `0 6px 18px ${TEAL}55`,
            }}
          >
            {primaryLabel}
          </a>
          <a
            href={secondaryHref}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
            style={{
              background: `${ORANGE}14`,
              color: ORANGE,
              border: `1px solid ${ORANGE}33`,
            }}
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
