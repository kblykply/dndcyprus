// app/components/en/about/OzanSpotlight.tsx
import Link from "next/link";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";
import { portraitSource } from "@/lib/optimized-portraits";

const FACTS = [
  { k: "Expertise", v: "Finance & Operations" },
  { k: "Global Role", v: "Keurig Dr Pepper (Former CFO/President Int.)" },
  { k: "Background", v: "Kellogg, Kraft, Cargill" },
];

// Azure: 3:4 framed portrait on the left; kicker / name / quote / fact cards / pill buttons / logo strip on the right.
export default function OzanSpotlight({
  title = "Ozan Dökmecioğlu",
  subtitle = "Founder and visionary leader of DND Cyprus. He brings his global finance and operations experience to contemporary living projects in Cyprus.",
  quote = "“Discipline, transparency, and sustainable growth — the foundation of everything we do.”",
  image = "/azure/ozan.jpg",
  logos = ["/Keurig_Dr_Pepper.png", "/Kellogg's-Logo.png", "/Kraft_logo_2012.png", "/Cargill_logo.png"],
}: {
  title?: string;
  subtitle?: string;
  quote?: string;
  image?: string;
  logos?: string[];
}) {
  return (
    <section id="founder" className="az-section" aria-label="Ozan Dökmecioğlu — Spotlight">
      <div className="az-wrap">
        <div className="grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-14">
          <figure
            className="rv relative m-0 w-full max-w-full overflow-hidden rounded-[28px]"
            style={{ aspectRatio: "3 / 4", background: "var(--sky-2)", border: "1px solid rgba(255,255,255,.9)", boxShadow: "0 24px 60px rgba(13,35,38,.12)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitSource(image)}
              alt={title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-top"
            />
          </figure>

          <div>
            <span className="az-kicker rv">Founder &amp; Leadership</span>
            <h2 className="az-h2 sm rv d1">{title}</h2>
            <p className="az-lead rv d2">{subtitle}</p>

            {quote && (
              <blockquote
                className="rv d2 mt-6 border-l-2 pl-4 text-[17px] leading-relaxed"
                style={{ borderColor: "var(--coral)", color: "var(--ink)" }}
              >
                {quote}
              </blockquote>
            )}

            <dl className="rv d3 m-0 mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="rounded-[18px] bg-white px-4 py-3"
                  style={{ border: "1px solid rgba(255,255,255,.9)", boxShadow: "0 6px 18px rgba(13,35,38,.05)" }}
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--sea)" }}>{f.k}</dt>
                  <dd className="m-0 mt-1 text-[14px] font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="rv d3 mt-7 flex flex-wrap gap-3">
              <Link className="az-btn sea sm" href="/en/about" prefetch={false}>About Us</Link>
              <Link className="az-btn glass sm" href="/en/team" prefetch={false}>Our Team</Link>
            </div>

            {logos?.length ? (
              <ul
                className="rv d4 m-0 mt-8 flex list-none flex-wrap gap-2.5 border-t p-0 pt-6"
                style={{ borderColor: "var(--line)" }}
                aria-label="Previous companies"
              >
                {logos.map((src, i) => (
                  <li
                    key={src + i}
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5"
                    style={{ border: "1px solid rgba(255,255,255,.9)", boxShadow: "0 6px 18px rgba(13,35,38,.05)" }}
                    title="Partner logo"
                  >
                    <span className="relative block h-7 w-28">
                      <DeferredFillImage
                        fill
                        src={src}
                        alt="Partner logo"
                        sizes="112px"
                        quality={75}
                        draggable={false}
                        className="select-none object-contain"
                      />
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
