// Markalı, çok dilli 404 içeriği: hem TR kök düzenindeki not-found hem de tüm sitedeki
// global-not-found (eşleşmeyen her adres) bunu çizer.
import Link from "next/link";

const TEAL = "#0d6570";
const ORANGE = "#f15c34";

const LINKS: { href: string; label: string; lang?: string }[] = [
  { href: "/tr/projects", label: "Projeler" },
  { href: "/tr/contact", label: "İletişim" },
  { href: "/en", label: "English site", lang: "en" },
  { href: "/de", label: "Deutsch", lang: "de" },
  { href: "/ru", label: "Русский", lang: "ru" },
  { href: "/pl", label: "Polski", lang: "pl" },
];

export default function NotFoundContent() {
  return (
    <main
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white px-6 py-16 text-[#0d2326]"
    >
      {/* hafif marka renkleri */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(32rem 22rem at 12% 100%, ${TEAL}14, transparent 70%),
            radial-gradient(28rem 18rem at 88% 0%, ${ORANGE}14, transparent 70%)
          `,
        }}
      />

      <div className="relative w-full max-w-xl text-center">
        <Link href="/tr" className="inline-block" aria-label="DND Cyprus ana sayfa">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/DND-LOGO-2.svg" alt="DND Cyprus" className="mx-auto h-12 w-auto" />
        </Link>

        <p
          className="mt-10 text-6xl font-extrabold tracking-tight sm:text-7xl"
          style={{ color: TEAL }}
        >
          404
        </p>

        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">Aradığınız sayfa bulunamadı</h1>
        <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(13,35,38,0.65)" }}>
          Sayfa taşınmış ya da kaldırılmış olabilir. Aşağıdaki bağlantılarla devam edebilirsiniz.
        </p>
        <p lang="en" className="mt-2 text-sm" style={{ color: "rgba(13,35,38,0.55)" }}>
          Page not found — it may have been moved or removed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tr"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: TEAL }}
          >
            Ana Sayfa
          </Link>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              lang={l.lang}
              className="rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[0.03]"
              style={{ borderColor: `${TEAL}55`, color: TEAL }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
