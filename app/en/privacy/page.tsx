// app/gizlilik-politikasi/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy | DND Cyprus",
  description:
    "On this page you can find for which purposes DND Cyprus processes your personal data, which legal bases we rely on, and what your rights are.",
};

export default function PrivacyPolicyPage() {
  const updatedAt = "30 October 2025"; // Update this date whenever the text is revised.

  return (
    <main className="min-h-svh bg-white text-neutral-900">
      <header className="border-b border-neutral-200 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <span className="text-sm text-neutral-500">
            Last updated: {updatedAt}
          </span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_1fr]">
        {/* TOC */}
        <nav
          aria-label="Table of contents"
          className="md:sticky md:top-24 md:self-start"
        >
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="mb-3 text-sm font-medium text-neutral-600">
              Table of contents
            </p>
            <ul className="space-y-2 text-sm">
              {[
                ["kapsam", "Scope"],
                ["veri-sorumlusu", "Data Controller & Contact"],
                ["toplanan-veriler", "Data We Collect"],
                ["kullanim-amaclari", "Purposes of Use"],
                ["hukuki-dayanak", "Legal Basis"],
                ["saklama-sureleri", "Retention Periods"],
                ["paylasim-aktarim", "Sharing & Transfers"],
                ["cerezler", "Cookies"],
                ["haklariniz", "Your Rights"],
                ["guvenlik", "Data Security"],
                ["cocuklar", "Children’s Privacy"],
                ["ucuncu-siteler", "Third-Party Websites"],
                ["degisiklikler", "Changes"],
                ["iletisim", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    className="hover:text-neutral-900 text-neutral-600 transition"
                    href={`#${href}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral max-w-none prose-h2:mt-10 prose-h2:scroll-mt-24">
          <section id="kapsam">
            <h2>Scope</h2>
            <p>
              This Privacy Policy relates to personal data processed on the{" "}
              <Link href="/" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              domain and its subpages (hereafter the “Service”). This document
              explains for which purposes we process your data, on which legal
              bases we rely, with whom we share it, how long we retain it, and
              the rights you have. By using the Service, you are deemed to have
              accepted this policy.
            </p>
          </section>

          <section id="veri-sorumlusu">
            <h2>Data Controller &amp; Contact</h2>
            <p>
              Within the scope of this policy, the “Company” or “DND Cyprus”
              refers to the entity with the following contact details:
            </p>
            <address className="not-italic rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>
                Alasya Park Sitesi 2. Etap, Dükkan No: 2-3 Uluçam Yolu, Sakarya
                – Gazimağusa
              </div>
              <div>
                E-mail:{" "}
                <a
                  href="mailto:info@dndcyprus.com"
                  className="underline underline-offset-4"
                >
                  info@dndcyprus.com
                </a>{" "}
                · Phone:{" "}
                <a
                  href="tel:+903924440363"
                  className="underline underline-offset-4"
                >
                  +90 392 444 0 363
                </a>
              </div>
            </address>
            <p className="mt-3 text-sm text-neutral-600">
              (The address and contact details have been updated based on the
              information published on the previous website.)
            </p>
          </section>

          <section id="toplanan-veriler">
            <h2>Data We Collect</h2>
            <ul>
              <li>
                <strong>Contact Data:</strong> Name, surname, e-mail address,
                phone number, and form content (your message, project interest,
                etc.).
              </li>
              <li>
                <strong>Usage Data:</strong> Technical log information such as
                IP address, browser type, referring/exit pages, time and
                duration of visit, device information and identifiers.
              </li>
              <li>
                <strong>Cookie Data:</strong> Strictly necessary cookies, cookie
                notice/consent preferences, and functionality cookies (e.g.,
                language selection, session preferences).
              </li>
              <li>
                <strong>Third-Party Interactions:</strong> Where you interact
                with social network plug-ins or services (e.g., Google,
                Facebook/Instagram, X (Twitter), LinkedIn), the information you
                choose to share from those accounts.
              </li>
            </ul>
          </section>

          <section id="kullanim-amaclari">
            <h2>Purposes of Use</h2>
            <ul>
              <li>
                To provide, maintain and monitor the performance of the Service
              </li>
              <li>To respond to and manage your contact requests</li>
              <li>
                To establish and perform contracts (e.g., project/offer
                processes, appointments, and pre-/post-sales support)
              </li>
              <li>
                For our legitimate interests (improving our services, analysing
                campaigns/events, ensuring security)
              </li>
              <li>
                With your explicit consent, to send news, newsletters and
                similar commercial communications
              </li>
            </ul>
          </section>

          <section id="hukuki-dayanak">
            <h2>Legal Basis</h2>
            <p>
              Your data is processed on the legal bases permitted by{" "}
              <em>applicable data-protection legislation</em>, such as the
              necessity for entering into or performing a contract, compliance
              with legal obligations, the balanced protection of our legitimate
              interests, and, where required, your explicit consent (e.g., under
              the GDPR or local regulations).
            </p>
          </section>

          <section id="saklama-sureleri">
            <h2>Retention Periods</h2>
            <p>
              Personal data is retained for as long as necessary for the
              purposes for which it is processed and for the minimum periods
              required to meet our legal obligations. Analytics and log data are
              kept for reasonable periods for security and functionality
              purposes.
            </p>
          </section>

          <section id="paylasim-aktarim">
            <h2>Sharing &amp; Transfers</h2>
            <ul>
              <li>
                <strong>Service Providers:</strong> With hosting, maintenance,
                security and analytics providers, for limited purposes.
              </li>
              <li>
                <strong>Affiliates / Business Partners:</strong> Where necessary
                and for legitimate purposes, with appropriate confidentiality
                safeguards.
              </li>
              <li>
                <strong>Legal Obligations:</strong> Where required to comply
                with valid requests from competent authorities.
              </li>
              <li>
                <strong>Cross-Border Transfers:</strong> Your data may be
                processed or stored on systems located outside your country of
                residence. In such cases, we implement appropriate technical and
                contractual safeguards.
              </li>
            </ul>
          </section>

          <section id="cerezler">
            <h2>Cookies</h2>
            <p>
              The Service may use <strong>strictly necessary</strong>,{" "}
              <strong>notice/consent</strong> and{" "}
              <strong>functionality</strong> cookies that help maintain your
              session and remember your preferences. You can restrict or delete
              cookies via your browser settings. Refusing cookies may affect the
              operation of some features.
            </p>
            <details className="mt-3 rounded-lg border border-neutral-200 p-4">
              <summary className="cursor-pointer font-medium">
                Cookie management (summary)
              </summary>
              <ul className="mt-3">
                <li>Browser settings &gt; Privacy/Site Settings &gt; Cookies</li>
                <li>Options to block or clear third-party cookies</li>
                <li>
                  You can change the categories you have consented to at any
                  time
                </li>
              </ul>
            </details>
          </section>

          <section id="haklariniz">
            <h2>Your Rights</h2>
            <ul>
              <li>To access, be informed about and request a copy of your data</li>
              <li>To request rectification and update</li>
              <li>
                To request erasure (“right to be forgotten”) and restriction of
                processing
              </li>
              <li>To object to processing and refuse direct marketing</li>
              <li>
                To data portability (where applicable) and to withdraw consent
              </li>
            </ul>
            <p>
              To exercise your rights, you can contact us at{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@dndcyprus.com?subject=Data%20Protection%20Request"
              >
                info@dndcyprus.com
              </a>
              . We may request additional information to verify your identity.
            </p>
          </section>

          <section id="guvenlik">
            <h2>Data Security</h2>
            <p>
              Transmission over the internet and electronic storage methods are
              not 100% secure. Nevertheless, we seek to protect your data
              through industry-standard technical and organisational measures.
            </p>
          </section>

          <section id="cocuklar">
            <h2>Children’s Privacy</h2>
            <p>
              The Service is not directed to children under 13 years of age. If
              we become aware that we have processed the personal data of a
              child under 13 without appropriate permission, we will take steps
              to delete such data.
            </p>
          </section>

          <section id="ucuncu-siteler">
            <h2>Third-Party Websites</h2>
            <p>
              Our Service may contain links to third-party websites. We are not
              responsible for the content or privacy practices of those sites;
              we recommend that you review the privacy policy of each site you
              visit.
            </p>
          </section>

          <section id="degisiklikler">
            <h2>Changes to this Policy</h2>
            <p>
              We may update this policy from time to time. We will publish new
              versions on this page and update the “Last updated” date. Where
              changes are material, we may notify you by appropriate means (for
              example, a notice on the website).
            </p>
          </section>

          <section id="iletisim">
            <h2>Contact</h2>
            <p>
              If you have any questions, you can write to{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@dndcyprus.com"
              >
                info@dndcyprus.com
              </a>
              .
            </p>
          </section>

          <hr className="my-10 border-neutral-200" />

          <p className="text-sm text-neutral-500">
            This text is for information purposes only and does not constitute
            legal advice. Applicable local legislation and, where relevant, the
            provisions of the GDPR prevail.
          </p>
        </div>
      </article>
    </main>
  );
}
