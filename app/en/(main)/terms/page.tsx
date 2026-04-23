// app/kullanim-kosullari/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms of Use | DND Cyprus",
  description:
    "Terms of use for the DND Cyprus website, including conditions of use, disclaimers, intellectual property and dispute provisions.",
};

export default function TermsPage() {
  const updatedAt = "30 October 2025";

  const toc: Array<[string, string]> = [
    ["giris", "1. Scope and Acceptance"],
    ["tanimlar", "2. Definitions"],
    ["hizmet", "3. Scope of the Service"],
    ["bilgilendirme", "4. Informational Nature"],
    ["yukumlulukler", "5. User Obligations"],
    ["yasakli", "6. Prohibited Use"],
    ["formlar", "7. Accounts and Contact/Forms"],
    ["teklif", "8. Offers, Prices and Errors"],
    ["ip", "9. Intellectual Property"],
    ["kullanici-icerigi", "10. User Content and License"],
    ["baglantilar", "11. Third-Party Links"],
    ["garantiler", "12. Disclaimer of Warranties"],
    ["sorumluluk", "13. Limitation of Liability"],
    ["tazminat", "14. Indemnification"],
    ["hukuk", "15. Governing Law and Jurisdiction"],
    ["degisiklik", "16. Changes"],
    ["butunluk", "17. Entire Agreement"],
    ["iletisim", "18. Contact"],
  ];

  return (
    <main className="min-h-svh bg-white text-neutral-900">
      <header className="border-b border-neutral-200 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">Terms of Use</h1>
          <span className="text-sm text-neutral-500">Effective as of: {updatedAt}</span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_1fr]">
        {/* TOC */}
        <nav aria-label="Table of contents" className="md:sticky md:top-24 md:self-start">
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="mb-3 text-sm font-medium text-neutral-600">Table of contents</p>
            <ul className="space-y-2 text-sm">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-neutral-600 transition hover:text-neutral-900">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* CONTENT */}
        <div className="prose prose-neutral max-w-none prose-h2:mt-10 prose-h2:scroll-mt-24">
          <section id="giris">
            <h2>1. Scope and Acceptance</h2>
            <p>
              These Terms of Use (“Terms”) govern the use of the services and content (collectively, the “Service”)
              provided on the{" "}
              <Link href="/" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              domain and its subpages. By using the Service, you are deemed to have accepted these Terms and any related
              policies (e.g., the Privacy Policy).
            </p>
          </section>

          <section id="tanimlar">
            <h2>2. Definitions</h2>
            <ul>
              <li>
                <strong>Company / DND Cyprus:</strong> The undertaking whose details are provided in the Contact section
                below.
              </li>
              <li>
                <strong>User:</strong> Any natural or legal person that visits or uses the Service.
              </li>
              <li>
                <strong>Content:</strong> Text, images, videos, documents and other materials.
              </li>
            </ul>
          </section>

          <section id="hizmet">
            <h2>3. Scope of the Service</h2>
            <p>
              The Service provides content for promotional and communication purposes regarding DND Cyprus projects,
              events and corporate information. Certain parts of the Service may be updated from time to time, may be
              temporarily unavailable, or may be discontinued entirely.
            </p>
          </section>

          <section id="bilgilendirme">
            <h2>4. Informational Nature</h2>
            <p>
              The content on this site is for information purposes only and does not constitute{" "}
              <em>investment advice, legal opinion, or a binding offer</em>. Project visuals, texts and technical
              details may be illustrative or representative; the right to make changes is reserved. Sales, delivery and
              similar commercial processes are subject to contracts and official documents that may be executed
              separately.
            </p>
          </section>

          <section id="yukumlulukler">
            <h2>5. User Obligations</h2>
            <ul>
              <li>To use the Service in compliance with applicable law and these Terms,</li>
              <li>
                Not to infringe the rights of others (including intellectual property, personality and privacy rights),
              </li>
              <li>Not to submit misleading, false or unlawful information,</li>
              <li>Not to take actions that would compromise the security of the site.</li>
            </ul>
          </section>

          <section id="yasakli">
            <h2>6. Prohibited Use</h2>
            <p>
              The following are prohibited: reverse engineering; automated data extraction (scraping) and unauthorised
              access attempts; distribution of malicious software; spam; and sending excessive requests that may disrupt
              the operation of the Service.
            </p>
          </section>

          <section id="formlar">
            <h2>7. Accounts and Contact/Forms</h2>
            <p>
              You are responsible for the accuracy of the information you provide in contact/application forms on the
              site. Where required, your separate consent is obtained for commercial communications, and you may withdraw
              such consent at any time.
            </p>
          </section>

          <section id="teklif">
            <h2>8. Offers, Prices and Errors</h2>
            <p>
              Any price/offer/availability information on the website is for preliminary information only and may be
              changed without notice. If typographical or display errors are detected, they may be corrected; the Company
              cannot be held liable for such errors beyond reasonable limits.
            </p>
          </section>

          <section id="ip">
            <h2>9. Intellectual Property</h2>
            <p>
              All designs, texts, images, logos, videos and software on the site, and any related rights, belong to the
              Company or its licensors. They may not be reproduced, distributed or used to create derivative works
              without prior written permission.
            </p>
          </section>

          <section id="kullanici-icerigi">
            <h2>10. User Content and License</h2>
            <p>
              We may use any feedback or suggestions that you submit to the Company for the purpose of improving the
              Service, without incurring any obligation to you. Content submitted through forms is processed in order to
              evaluate your application and respond to you (for further details, the{" "}
              <Link href="/gizlilik-politikasi" className="underline underline-offset-4">
                Privacy Policy
              </Link>{" "}
              applies).
            </p>
          </section>

          <section id="baglantilar">
            <h2>11. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites. The Company is not responsible for the content or
              practices of such sites; you should review the terms and policies of each site you visit.
            </p>
          </section>

          <section id="garantiler">
            <h2>12. Disclaimer of Warranties</h2>
            <p>
              The Service is provided “as is” and “as available”. Implied warranties, including but not limited to
              warranties of merchantability, fitness for a particular purpose and non-infringement, are disclaimed to
              the extent permitted by law.
            </p>
          </section>

          <section id="sorumluluk">
            <h2>13. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, the Company shall not be liable for indirect, incidental, special or
              consequential damages, or for loss of profit/data or other results beyond its reasonable control arising
              from the use of the Service.
            </p>
          </section>

          <section id="tazminat">
            <h2>14. Indemnification</h2>
            <p>
              You agree to indemnify the Company for any reasonable damages, costs and expenses (including attorneys’
              fees) that may arise from your breach of these Terms.
            </p>
          </section>

          <section id="hukuk">
            <h2>15. Governing Law and Jurisdiction</h2>
            <p>
              Unless otherwise agreed in writing, these Terms and the use of the Service are governed by the laws of the
              Turkish Republic of Northern Cyprus (TRNC). Courts and enforcement offices in Gazimağusa have jurisdiction
              over disputes. Mandatory consumer protection provisions remain reserved.
            </p>
          </section>

          <section id="degisiklik">
            <h2>16. Changes</h2>
            <p>
              We may update these Terms from time to time. We will publish new versions on this page and update the
              “Effective as of” date. Your continued use of the Service constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section id="butunluk">
            <h2>17. Entire Agreement</h2>
            <p>
              These Terms, together with the Privacy Policy and any other documents referenced on the site, constitute
              the entire agreement between the parties. If any provision is held invalid, the remaining provisions shall
              continue in full force and effect.
            </p>
          </section>

          <section id="iletisim">
            <h2>18. Contact</h2>
            <address className="not-italic rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>Alasya Park Sitesi 2. Etap, Dükkan No: 2-3 Uluçam Yolu, Sakarya – Gazimağusa</div>
              <div>
                E-mail:{" "}
                <a href="mailto:info@dndcyprus.com" className="underline underline-offset-4">
                  info@dndcyprus.com
                </a>{" "}
                · Phone:{" "}
                <a href="tel:+9039244400363" className="underline underline-offset-4">
                  +90 392 444 0 363
                </a>
              </div>
            </address>
            <p className="mt-3 text-sm text-neutral-600">
              The contact information on this page is based on the details published on our official website.
            </p>
          </section>

          <hr className="my-10 border-neutral-200" />
          <p className="text-sm text-neutral-500">
            This text is a general template for information purposes only and does not constitute legal advice. Please
            review it with your legal counsel to ensure that it is appropriate for your business model and local
            legislation.
          </p>
        </div>
      </article>
    </main>
  );
}
