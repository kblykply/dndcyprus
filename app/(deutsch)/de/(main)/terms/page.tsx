// app/kullanim-kosullari/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";


export const metadata: Metadata = pageMetadata({
  locale: "de",
  path: "/terms",
  title: "Nutzungsbedingungen | DND Cyprus",
  description:
    "Nutzungsbedingungen der Website von DND Cyprus: Umfang des Dienstes, Pflichten der Nutzer, geistiges Eigentum, Haftungsbeschränkung und anwendbares Recht der TRNZ.",
});

export default function TermsPage() {
  const updatedAt = "30. Oktober 2025";

  const toc: Array<[string, string]> = [
    ["giris", "1. Geltungsbereich und Annahme"],
    ["tanimlar", "2. Begriffsbestimmungen"],
    ["hizmet", "3. Umfang des Dienstes"],
    ["bilgilendirme", "4. Informationscharakter"],
    ["yukumlulukler", "5. Pflichten der Nutzer"],
    ["yasakli", "6. Unzulässige Nutzung"],
    ["formlar", "7. Konten und Kontakt/Formulare"],
    ["teklif", "8. Angebote, Preise und Fehler"],
    ["ip", "9. Geistiges Eigentum"],
    ["kullanici-icerigi", "10. Nutzerinhalte und Lizenz"],
    ["baglantilar", "11. Links zu Dritten"],
    ["garantiler", "12. Gewährleistungsausschluss"],
    ["sorumluluk", "13. Haftungsbeschränkung"],
    ["tazminat", "14. Freistellung"],
    ["hukuk", "15. Anwendbares Recht und Gerichtsstand"],
    ["degisiklik", "16. Änderungen"],
    ["butunluk", "17. Gesamte Vereinbarung"],
    ["iletisim", "18. Kontakt"],
  ];

  return (
    <main className="min-h-svh pt-24 md:pt-28">
      <header>
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-3 px-6 py-6">
          <h1 className="text-3xl md:text-4xl tracking-tight">Nutzungsbedingungen</h1>
          <span className="text-sm text-[var(--ink-40)]">Gültig ab: {updatedAt}</span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_1fr]">
        {/* TOC */}
        <nav aria-label="Inhaltsverzeichnis" className="md:sticky md:top-24 md:self-start">
          <div className="rounded-[22px] border border-white/90 bg-white p-4 shadow-[0_10px_30px_rgba(13,35,38,0.05)]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sea)]">Inhaltsverzeichnis</p>
            <ul className="space-y-2 text-sm">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-[var(--ink-60)] transition hover:text-[var(--ink)]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* CONTENT */}
        <div className="rounded-[28px] border border-white/90 bg-white p-6 md:p-10 [&_section]:scroll-mt-28 shadow-[0_10px_40px_rgba(13,35,38,0.06)] prose prose-neutral max-w-none prose-h2:mt-10 prose-h2:scroll-mt-24">
          <section id="giris">
            <h2>1. Geltungsbereich und Annahme</h2>
            <p>
              Diese Nutzungsbedingungen („Bedingungen“) regeln die Nutzung der Dienste und Inhalte (zusammen der „Dienst“),
              die auf der Domain{" "}
              <Link href="/de" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              und ihren Unterseiten bereitgestellt werden. Mit der Nutzung des Dienstes gelten diese Bedingungen sowie die
              zugehörigen Richtlinien (z. B. die Datenschutzrichtlinie) als von Ihnen akzeptiert.
            </p>
          </section>

          <section id="tanimlar">
            <h2>2. Begriffsbestimmungen</h2>
            <ul>
              <li>
                <strong>Unternehmen / DND Cyprus:</strong> Das Unternehmen, dessen Angaben unten im Abschnitt „Kontakt“
                aufgeführt sind.
              </li>
              <li>
                <strong>Nutzer:</strong> Jede natürliche oder juristische Person, die den Dienst besucht oder nutzt.
              </li>
              <li>
                <strong>Inhalte:</strong> Texte, Bilder, Videos, Dokumente und sonstige Materialien.
              </li>
            </ul>
          </section>

          <section id="hizmet">
            <h2>3. Umfang des Dienstes</h2>
            <p>
              Der Dienst stellt Inhalte zu Werbe- und Kommunikationszwecken über Projekte, Veranstaltungen und
              Unternehmensinformationen von DND Cyprus bereit. Einzelne Bereiche des Dienstes können von Zeit zu Zeit
              aktualisiert werden, vorübergehend nicht verfügbar sein oder vollständig eingestellt werden.
            </p>
          </section>

          <section id="bilgilendirme">
            <h2>4. Informationscharakter</h2>
            <p>
              Die Inhalte dieser Website dienen ausschließlich der Information und stellen{" "}
              <em>keine Anlageberatung, kein Rechtsgutachten und kein verbindliches Angebot</em> dar. Projektvisualisierungen,
              Texte und technische Angaben können illustrativ oder beispielhaft sein; Änderungen bleiben vorbehalten. Verkauf,
              Übergabe und ähnliche geschäftliche Vorgänge unterliegen gesondert abzuschließenden Verträgen und amtlichen
              Dokumenten.
            </p>
          </section>

          <section id="yukumlulukler">
            <h2>5. Pflichten der Nutzer</h2>
            <ul>
              <li>Nutzung des Dienstes im Einklang mit dem geltenden Recht und diesen Bedingungen;</li>
              <li>
                Keine Verletzung der Rechte Dritter (einschließlich Rechten des geistigen Eigentums, Persönlichkeits- und Datenschutzrechten);
              </li>
              <li>Keine irreführenden, falschen oder rechtswidrigen Angaben;</li>
              <li>Keine Handlungen, die die Sicherheit der Website gefährden.</li>
            </ul>
          </section>

          <section id="yasakli">
            <h2>6. Unzulässige Nutzung</h2>
            <p>
              Untersagt sind: Reverse Engineering; automatisiertes Auslesen von Daten (Scraping) und unbefugte
              Zugriffsversuche; die Verbreitung von Schadsoftware; Spam; sowie übermäßige Anfragen, die den Betrieb
              des Dienstes stören können.
            </p>
          </section>

          <section id="formlar">
            <h2>7. Konten und Kontakt/Formulare</h2>
            <p>
              Sie sind für die Richtigkeit der Angaben verantwortlich, die Sie in Kontakt- und Anfrageformularen auf der
              Website machen. Für kommerzielle Kommunikation wird – soweit erforderlich – Ihre gesonderte Einwilligung
              eingeholt, die Sie jederzeit widerrufen können.
            </p>
          </section>

          <section id="teklif">
            <h2>8. Angebote, Preise und Fehler</h2>
            <p>
              Preis-, Angebots- und Verfügbarkeitsangaben auf der Website dienen nur der vorläufigen Information und können
              ohne Ankündigung geändert werden. Festgestellte Schreib- oder Darstellungsfehler können berichtigt werden; über
              angemessene Grenzen hinaus haftet das Unternehmen für solche Fehler nicht.
            </p>
          </section>

          <section id="ip">
            <h2>9. Geistiges Eigentum</h2>
            <p>
              Alle Designs, Texte, Bilder, Logos, Videos und Software auf der Website sowie die damit verbundenen Rechte
              gehören dem Unternehmen oder seinen Lizenzgebern. Ohne vorherige schriftliche Genehmigung dürfen sie weder
              vervielfältigt noch verbreitet oder zur Erstellung abgeleiteter Werke verwendet werden.
            </p>
          </section>

          <section id="kullanici-icerigi">
            <h2>10. Nutzerinhalte und Lizenz</h2>
            <p>
              Feedback oder Vorschläge, die Sie dem Unternehmen übermitteln, dürfen wir zur Verbesserung des Dienstes
              verwenden, ohne Ihnen gegenüber eine Verpflichtung einzugehen. Über Formulare übermittelte Inhalte werden
              verarbeitet, um Ihre Anfrage zu prüfen und Ihnen zu antworten (für weitere Einzelheiten gilt die{" "}
              <Link href="/de/privacy" className="underline underline-offset-4">
                Datenschutzrichtlinie
              </Link>{" "}
              entsprechend).
            </p>
          </section>

          <section id="baglantilar">
            <h2>11. Links zu Dritten</h2>
            <p>
              Der Dienst kann Links zu Websites Dritter enthalten. Für deren Inhalte oder Praktiken ist das Unternehmen
              nicht verantwortlich; bitte lesen Sie die Bedingungen und Richtlinien jeder besuchten Website.
            </p>
          </section>

          <section id="garantiler">
            <h2>12. Gewährleistungsausschluss</h2>
            <p>
              Der Dienst wird „wie besehen“ und „wie verfügbar“ bereitgestellt. Stillschweigende Gewährleistungen,
              einschließlich, aber nicht beschränkt auf die Gewährleistung der Marktgängigkeit, der Eignung für einen bestimmten
              Zweck und der Nichtverletzung von Rechten Dritter, sind im gesetzlich zulässigen Umfang ausgeschlossen.
            </p>
          </section>

          <section id="sorumluluk">
            <h2>13. Haftungsbeschränkung</h2>
            <p>
              Soweit gesetzlich zulässig, haftet das Unternehmen nicht für mittelbare, zufällige, besondere oder Folgeschäden
              sowie nicht für entgangenen Gewinn, Datenverlust oder sonstige Folgen außerhalb seiner zumutbaren Kontrolle,
              die aus der Nutzung des Dienstes entstehen.
            </p>
          </section>

          <section id="tazminat">
            <h2>14. Freistellung</h2>
            <p>
              Sie verpflichten sich, das Unternehmen von allen angemessenen Schäden, Kosten und Aufwendungen (einschließlich
              Anwaltskosten) freizustellen, die aus Ihrem Verstoß gegen diese Bedingungen entstehen können.
            </p>
          </section>

          <section id="hukuk">
            <h2>15. Anwendbares Recht und Gerichtsstand</h2>
            <p>
              Sofern nicht schriftlich anders vereinbart, unterliegen diese Bedingungen und die Nutzung des Dienstes dem Recht der
              Türkischen Republik Nordzypern (TRNZ). Für Streitigkeiten sind die Gerichte und Vollstreckungsbehörden in Famagusta
              zuständig. Zwingende Verbraucherschutzvorschriften bleiben unberührt.
            </p>
          </section>

          <section id="degisiklik">
            <h2>16. Änderungen</h2>
            <p>
              Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Neue Fassungen veröffentlichen wir auf dieser Seite
              und passen das Datum „Gültig ab“ an. Mit der weiteren Nutzung des Dienstes akzeptieren Sie die aktualisierten Bedingungen.
            </p>
          </section>

          <section id="butunluk">
            <h2>17. Gesamte Vereinbarung</h2>
            <p>
              Diese Bedingungen bilden zusammen mit der Datenschutzrichtlinie und allen weiteren auf der Website genannten
              Dokumenten die gesamte Vereinbarung zwischen den Parteien. Sollte eine Bestimmung unwirksam sein, bleiben die
              übrigen Bestimmungen in vollem Umfang wirksam.
            </p>
          </section>

          <section id="iletisim">
            <h2>18. Kontakt</h2>
            <address className="not-italic rounded-[16px] border border-[var(--line)] bg-[var(--sky)] p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450</div>
              <div>
                E-Mail:{" "}
                <a href="mailto:info@dndcyprus.com" className="underline underline-offset-4">
                  info@dndcyprus.com
                </a>{" "}
                · Telefon:{" "}
                <a href="tel:+903924440363" className="underline underline-offset-4">
                  +90 392 444 0 363
                </a>
              </div>
            </address>
            <p className="mt-3 text-sm text-[var(--ink-60)]">
              Die Kontaktdaten auf dieser Seite beruhen auf den auf unserer offiziellen Website veröffentlichten Angaben.
            </p>
          </section>

          <hr className="my-10 border-[var(--line)]" />
          <p className="text-sm text-[var(--ink-40)]">
            Dieser Text ist eine allgemeine Vorlage, dient ausschließlich der Information und stellt keine Rechtsberatung dar.
            Bitte prüfen Sie mit Ihrem Rechtsbeistand, ob er für Ihr Geschäftsmodell und die lokale Gesetzgebung
            geeignet ist.
          </p>
        </div>
      </article>
    </main>
  );
}
