// app/de/(main)/privacy/page.tsx
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import ConsentPreferencesButton from "@/app/components/analytics/ConsentPreferencesButton";


export const metadata = pageMetadata({
  locale: "de",
  path: "/privacy",
  title: "Datenschutz- und Cookie-Richtlinie | DND Cyprus",
  description:
    "Wie DND Cyprus personenbezogene Daten verarbeitet, welche Cookies wir nutzen (Google Analytics, Google Ads, Meta Pixel), wie Sie Ihre Einwilligung verwalten und welche Rechte Sie haben.",
});

export default function PrivacyPolicyPage() {
  const updatedAt = "15. September 2026"; // Update this date whenever the text is revised.

  return (
    <main className="min-h-svh pt-24 md:pt-28">
      <header>
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-3 px-6 py-6">
          <h1 className="text-3xl md:text-4xl tracking-tight">
            Datenschutz- und Cookie-Richtlinie
          </h1>
          <span className="text-sm text-[var(--ink-40)]">
            Zuletzt aktualisiert: {updatedAt}
          </span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_minmax(0,1fr)]">
        {/* TOC */}
        <nav
          aria-label="Inhaltsverzeichnis"
          className="md:sticky md:top-24 md:self-start"
        >
          <div className="rounded-[22px] border border-white/90 bg-white p-4 shadow-[0_10px_30px_rgba(13,35,38,0.05)]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sea)]">
              Inhaltsverzeichnis
            </p>
            <ul className="space-y-2 text-sm">
              {[
                ["kapsam", "Geltungsbereich"],
                ["veri-sorumlusu", "Verantwortlicher & Kontakt"],
                ["toplanan-veriler", "Erhobene Daten"],
                ["kullanim-amaclari", "Verarbeitungszwecke"],
                ["hukuki-dayanak", "Rechtsgrundlagen"],
                ["saklama-sureleri", "Speicherdauer"],
                ["paylasim-aktarim", "Weitergabe & Übermittlung"],
                ["cerezler", "Cookies"],
                ["cerez-reklam", "Cookies und Werbemessung"],
                ["haklariniz", "Ihre Rechte"],
                ["guvenlik", "Datensicherheit"],
                ["cocuklar", "Datenschutz bei Kindern"],
                ["ucuncu-siteler", "Websites Dritter"],
                ["degisiklikler", "Änderungen"],
                ["iletisim", "Kontakt"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    className="text-[var(--ink-60)] transition hover:text-[var(--ink)]"
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
        <div className="min-w-0 rounded-[28px] border border-white/90 bg-white p-6 md:p-10 [&_section]:scroll-mt-28 shadow-[0_10px_40px_rgba(13,35,38,0.06)] prose prose-neutral max-w-none prose-h2:mt-10 prose-h2:scroll-mt-24 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <section id="kapsam">
            <h2>Geltungsbereich</h2>
            <p>
              Diese Datenschutzrichtlinie gilt für personenbezogene Daten, die auf der Domain{" "}
              <Link href="/de" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              und ihren Unterseiten (nachfolgend der „Dienst“) verarbeitet werden. Sie
              erläutert, zu welchen Zwecken wir Ihre Daten verarbeiten, auf welche
              Rechtsgrundlagen wir uns stützen, an wen wir sie weitergeben, wie lange wir
              sie speichern und welche Rechte Ihnen zustehen. Mit der Nutzung des Dienstes
              gilt diese Richtlinie als von Ihnen akzeptiert.
            </p>
          </section>

          <section id="veri-sorumlusu">
            <h2>Verantwortlicher &amp; Kontakt</h2>
            <p>
              Im Sinne dieser Richtlinie bezeichnen „Unternehmen“ oder „DND Cyprus“
              die Stelle mit den folgenden Kontaktdaten:
            </p>
            <address className="not-italic rounded-[16px] border border-[var(--line)] bg-[var(--sky)] p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>
                Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450
              </div>
              <div>
                E-Mail:{" "}
                <a
                  href="mailto:info@dndcyprus.com"
                  className="underline underline-offset-4"
                >
                  info@dndcyprus.com
                </a>{" "}
                · Telefon:{" "}
                <a
                  href="tel:+903924440363"
                  className="underline underline-offset-4"
                >
                  +90 392 444 0 363
                </a>
              </div>
            </address>
            <p className="mt-3 text-sm text-[var(--ink-60)]">
              (Adresse und Kontaktdaten wurden anhand der auf der früheren Website
              veröffentlichten Angaben aktualisiert.)
            </p>
          </section>

          <section id="toplanan-veriler">
            <h2>Erhobene Daten</h2>
            <ul>
              <li>
                <strong>Kontaktdaten:</strong> Vor- und Nachname, E-Mail-Adresse,
                Telefonnummer und Inhalt des Formulars (Ihre Nachricht, Ihr
                Projektinteresse usw.).
              </li>
              <li>
                <strong>Nutzungsdaten:</strong> Technische Protokolldaten wie
                IP-Adresse, Browsertyp, Einstiegs- und Ausstiegsseiten, Zeitpunkt und
                Dauer des Besuchs, Geräteinformationen und Kennungen.
              </li>
              <li>
                <strong>Cookie-Daten:</strong> Technisch notwendige Cookies, Ihre
                Cookie-Einstellung und – nur mit Ihrer Einwilligung – Cookies für
                Analyse und Werbemessung (siehe „Cookies und
                Werbemessung“).
              </li>
              <li>
                <strong>Interaktionen mit Dritten:</strong> Wenn Sie Social-Media-Plug-ins
                oder -Dienste nutzen (z. B. Google, Facebook/Instagram, X (Twitter),
                LinkedIn), die Informationen, die Sie aus diesen Konten
                freigeben.
              </li>
            </ul>
          </section>

          <section id="kullanim-amaclari">
            <h2>Verarbeitungszwecke</h2>
            <ul>
              <li>
                Bereitstellung und Wartung des Dienstes sowie Überwachung seiner Leistung
              </li>
              <li>Beantwortung und Bearbeitung Ihrer Kontaktanfragen</li>
              <li>
                Anbahnung und Erfüllung von Verträgen (z. B. Projekt- und
                Angebotsprozesse, Termine sowie Betreuung vor und nach dem Kauf)
              </li>
              <li>
                Wahrung unserer berechtigten Interessen (Verbesserung unserer
                Leistungen, Auswertung von Kampagnen/Veranstaltungen, Gewährleistung der Sicherheit)
              </li>
              <li>
                Mit Ihrer ausdrücklichen Einwilligung: Versand von Neuigkeiten,
                Newslettern und ähnlicher kommerzieller Kommunikation
              </li>
            </ul>
          </section>

          <section id="hukuki-dayanak">
            <h2>Rechtsgrundlagen</h2>
            <p>
              Ihre Daten werden auf den Rechtsgrundlagen verarbeitet, die das{" "}
              <em>anwendbare Datenschutzrecht</em> zulässt, etwa zur Anbahnung
              oder Erfüllung eines Vertrags, zur Erfüllung rechtlicher Pflichten, zur
              ausgewogenen Wahrung unserer berechtigten Interessen und – soweit
              erforderlich – auf Grundlage Ihrer ausdrücklichen Einwilligung (z. B. nach
              der DSGVO oder lokalen Vorschriften).
            </p>
          </section>

          <section id="saklama-sureleri">
            <h2>Speicherdauer</h2>
            <p>
              Personenbezogene Daten werden so lange gespeichert, wie es für die
              Zwecke ihrer Verarbeitung erforderlich ist, sowie für die Mindestfristen,
              die zur Erfüllung unserer gesetzlichen Pflichten vorgeschrieben sind. Analyse-
              und Protokolldaten werden aus Sicherheits- und Funktionsgründen für
              angemessene Zeiträume aufbewahrt.
            </p>
          </section>

          <section id="paylasim-aktarim">
            <h2>Weitergabe &amp; Übermittlung</h2>
            <ul>
              <li>
                <strong>Dienstleister:</strong> An Anbieter für Hosting, Wartung,
                Sicherheit und Analyse, zu eng begrenzten Zwecken.
              </li>
              <li>
                <strong>Verbundene Unternehmen / Geschäftspartner:</strong> Soweit
                erforderlich und zu berechtigten Zwecken, mit angemessenen
                Vertraulichkeitsvorkehrungen.
              </li>
              <li>
                <strong>Gesetzliche Pflichten:</strong> Soweit dies zur Erfüllung
                rechtmäßiger Anfragen zuständiger Behörden erforderlich ist.
              </li>
              <li>
                <strong>Grenzüberschreitende Übermittlungen:</strong> Ihre Daten können
                auf Systemen außerhalb Ihres Wohnsitzlandes verarbeitet oder gespeichert
                werden. In diesen Fällen treffen wir angemessene technische und
                vertragliche Schutzmaßnahmen.
              </li>
              <li>
                <strong>Werbe- und Messpartner:</strong> Google
                (Google Analytics, Google Ads) und Meta Platforms
                (Facebook/Instagram) – nur, wenn Sie im Cookie-Banner die
                entsprechende Einwilligung erteilt haben.
              </li>
            </ul>
          </section>

          <section id="cerezler">
            <h2>Cookies</h2>
            <p>
              Der Dienst verwendet <strong>technisch notwendige</strong> Cookies, um
              zu funktionieren und Ihre Einstellungen zu speichern.{" "}
              Cookies für <strong>Analyse</strong> und <strong>Werbung</strong>{" "}
              werden nur mit Ihrer Einwilligung im Cookie-Banner verwendet. Sie können
              Ihre Wahl jederzeit ändern und Cookies außerdem über die Einstellungen
              Ihres Browsers einschränken oder löschen.
            </p>
            <details className="mt-3 rounded-[16px] border border-[var(--line)] p-4">
              <summary className="cursor-pointer font-medium">
                Cookie-Verwaltung (Übersicht)
              </summary>
              <ul className="mt-3">
                <li>Das Cookie-Banner auf der Website oder die Schaltfläche „Cookie-Einstellungen ändern“ auf dieser Seite</li>
                <li>Browsereinstellungen &gt; Datenschutz/Website-Einstellungen &gt; Cookies</li>
                <li>Optionen zum Blockieren oder Löschen von Drittanbieter-Cookies</li>
              </ul>
            </details>
          </section>

          <section id="cerez-reklam">
            <h2>Cookies und Werbemessung</h2>
            <p>
              Mit den unten genannten Tools messen wir, wie unsere Website genutzt wird,
              und sehen die Ergebnisse unserer Werbekampagnen bei Google und Meta
              (Facebook/Instagram). Abgesehen von technisch notwendigen Cookies setzen
              diese Tools nur dann Cookies oder senden Daten,{" "}
              <strong>wenn Sie im Cookie-Banner einwilligen</strong>.
            </p>

            <h3>Eingesetzte Tools</h3>
            <ul>
              <li>
                <strong>Google Analytics 4 (Einwilligung Analyse):</strong> zeigt
                als zusammengefasste Statistik, welche Seiten besucht werden, woher die
                Besucher kommen und welche Interaktionen stattfinden, etwa Downloads der
                Broschüre, virtuelle Touren und Kontaktklicks.
              </li>
              <li>
                <strong>Microsoft Clarity (Einwilligung Analyse):</strong> erstellt
                Heatmaps, die zeigen, wo geklickt und wie weit gescrollt wird, sowie
                anonymisierte Sitzungsaufzeichnungen, damit wir die Website
                benutzerfreundlicher gestalten können. In Formularfelder eingegebener Text wird maskiert und nicht aufgezeichnet.
                Ohne Ihre Einwilligung zur Analyse wird das Tool nicht geladen.
              </li>
              <li>
                <strong>Google Ads Conversion-Tracking (Einwilligung Werbung):</strong>{" "}
                misst Aktionen wie das Absenden eines Formulars oder die Kontaktaufnahme
                per WhatsApp oder Telefon nach dem Klick auf eine Google-Anzeige. Bei{" "}
                <strong>erweiterten Conversions</strong> werden Ihre E-Mail-Adresse und
                Telefonnummer beim Absenden eines Formulars in Ihrem Browser in einen
                nicht umkehrbaren SHA-256-Hash umgewandelt, an Google gesendet und
                ausschließlich verwendet, um die Conversion einem Anzeigenklick zuzuordnen.
              </li>
              <li>
                <strong>Meta Pixel (Einwilligung Werbung):</strong> misst die
                Ergebnisse unserer Anzeigen auf Facebook und Instagram (Seitenaufrufe,
                Formularübermittlungen, Kontaktklicks) und hilft, unsere Anzeigen Personen
                zu zeigen, die sich dafür interessieren könnten. Ohne Ihre Einwilligung zur
                Werbung wird es nicht geladen.
              </li>
              <li>
                <strong>Meta Conversions API (Einwilligung Werbung):</strong> Wenn
                Sie ein Formular absenden, übermittelt unser Server dasselbe Ereignis
                „Formular gesendet“ direkt an Meta, damit die Messung nicht durch
                Browser-Blocker beeinträchtigt und nicht doppelt mit dem Pixel gezählt wird. Ihre
                E-Mail-Adresse und Telefonnummer werden mit SHA-256 gehasht; zusätzlich werden Ihre IP-Adresse,
                Browserinformationen, die Seitenadresse und die Meta-Cookie-Kennungen
                (_fbp/_fbc) übermittelt. Ohne Ihre Einwilligung zur Werbung wird
                nichts gesendet.
              </li>
            </ul>
            <p>
              Ohne Ihre Einwilligung lesen oder schreiben Google-Tags keine Cookies;
              sie können lediglich begrenzte, cookielose technische Signale senden (z. B.
              Einwilligungsstatus, Seitenadresse, Browsertyp), die Google für eine
              aggregierte Conversion-Modellierung nutzen kann (Google Consent Mode). In
              diesem Fall können Informationen zum Anzeigenklick statt in einem Cookie in
              der Seitenadresse übertragen werden. Wenn Sie ein Formular absenden, werden
              Informationen über die Kampagne, über die Sie auf die Website gelangt sind
              (der Inhalt von dnd_ft/dnd_lt unten und die Seitenadresse), zusammen mit
              Ihrer Anfrage gespeichert. Google und Meta können Daten auf Servern
              außerhalb Ihres Landes verarbeiten.
            </p>

            <h3>Cookie-Liste</h3>
            <div className="mt-3 overflow-x-auto rounded-[16px] border border-[var(--line)]">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[var(--sky)] text-[var(--ink-60)]">
                  <tr>
                    <th className="px-3 py-2 font-medium">Cookie</th>
                    <th className="px-3 py-2 font-medium">Anbieter</th>
                    <th className="px-3 py-2 font-medium">Zweck</th>
                    <th className="px-3 py-2 font-medium">Dauer</th>
                    <th className="px-3 py-2 font-medium">Kategorie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)] align-top">
                  {[
                    ["dnd_consent", "DND Cyprus", "Speichert Ihre Cookie-Auswahl (Einwilligung für Analyse/Werbung).", "180 Tage", "Notwendig"],
                    ["locale", "DND Cyprus", "Merkt sich Ihre Sprache, wenn Sie die Startadresse aufrufen.", "1 Jahr", "Notwendig"],
                    ["dnd_ft, dnd_lt", "DND Cyprus", "Die Kampagne, über die Sie zuerst bzw. zuletzt auf die Website gelangt sind: UTM-Parameter, Anzeigenklick-ID (gclid/fbclid), Einstiegsseite und verweisende Website. Enthält weder Namen noch E-Mail-Adresse oder Telefonnummer.", "90 Tage", "Analyse oder Werbung"],
                    ["_ga, _ga_<ID>", "Google", "Google Analytics 4: unterscheidet Besucher und Sitzungen.", "Bis zu 2 Jahre", "Analyse"],
                    ["_clck, _clsk", "Microsoft", "Microsoft Clarity: verknüpft einen Besucher mit den Seitenaufrufen derselben Sitzung.", "1 Jahr / 1 Tag", "Analyse"],
                    ["CLID, MUID", "Microsoft (clarity.ms, bing.com)", "Microsoft Clarity: Drittanbieter-Kennung zur Unterscheidung von Sitzungen über Websites hinweg.", "1 Jahr", "Analyse"],
                    ["_gcl_au, _gcl_aw", "Google", "Google Ads: ordnet einen Anzeigenklick einer Formular- oder Kontaktaktion zu.", "90 Tage", "Werbung"],
                    ["_fbp", "Meta", "Meta Pixel: erkennt den Browser für die Werbemessung.", "90 Tage", "Werbung"],
                    ["_fbc", "Meta", "Speichert die Klick-ID von Facebook-/Instagram-Anzeigen (fbclid).", "90 Tage", "Werbung"],
                  ].map(([name, provider, purpose, duration, category]) => (
                    <tr key={name}>
                      <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">{name}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{provider}</td>
                      <td className="px-3 py-2 min-w-[14rem]">{purpose}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{duration}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Einwilligung ändern oder widerrufen</h3>
            <p>
              Sie können Ihre Einwilligung jederzeit über die Schaltfläche unten ändern
              oder widerrufen. Bei einem Widerruf löschen wir die betreffenden Cookies aus
              Ihrem Browser; Meta Pixel und Microsoft Clarity senden keine Daten mehr. Der Widerruf berührt nicht
              die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung.
            </p>
            <ConsentPreferencesButton locale="de" />
          </section>

          <section id="haklariniz">
            <h2>Ihre Rechte</h2>
            <ul>
              <li>Auskunft über Ihre Daten, Information und Erhalt einer Kopie</li>
              <li>Berichtigung und Aktualisierung</li>
              <li>
                Löschung („Recht auf Vergessenwerden“) und Einschränkung der
                Verarbeitung
              </li>
              <li>Widerspruch gegen die Verarbeitung und gegen Direktwerbung</li>
              <li>
                Datenübertragbarkeit (soweit anwendbar) und Widerruf der Einwilligung
              </li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte erreichen Sie uns unter{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@dndcyprus.com?subject=Data%20Protection%20Request"
              >
                info@dndcyprus.com
              </a>
              . Zur Überprüfung Ihrer Identität können wir zusätzliche Angaben anfordern.
            </p>
          </section>

          <section id="guvenlik">
            <h2>Datensicherheit</h2>
            <p>
              Die Übertragung über das Internet und elektronische Speichermethoden sind
              nicht zu 100 % sicher. Dennoch schützen wir Ihre Daten mit
              branchenüblichen technischen und organisatorischen Maßnahmen.
            </p>
          </section>

          <section id="cocuklar">
            <h2>Datenschutz bei Kindern</h2>
            <p>
              Der Dienst richtet sich nicht an Kinder unter 13 Jahren. Stellen wir fest,
              dass wir personenbezogene Daten eines Kindes unter 13 Jahren ohne
              entsprechende Zustimmung verarbeitet haben, ergreifen wir Maßnahmen,
              um diese Daten zu löschen.
            </p>
          </section>

          <section id="ucuncu-siteler">
            <h2>Websites Dritter</h2>
            <p>
              Unser Dienst kann Links zu Websites Dritter enthalten. Für deren Inhalte
              und Datenschutzpraktiken sind wir nicht verantwortlich; wir empfehlen
              Ihnen, die Datenschutzrichtlinie jeder besuchten Website
              zu lesen.
            </p>
          </section>

          <section id="degisiklikler">
            <h2>Änderungen dieser Richtlinie</h2>
            <p>
              Wir können diese Richtlinie von Zeit zu Zeit aktualisieren. Neue Fassungen
              veröffentlichen wir auf dieser Seite und passen das Datum „Zuletzt
              aktualisiert“ an. Bei wesentlichen Änderungen können wir Sie auf geeignetem
              Weg informieren (zum Beispiel durch einen Hinweis auf der Website).
            </p>
          </section>

          <section id="iletisim">
            <h2>Kontakt</h2>
            <p>
              Bei Fragen schreiben Sie uns gerne an{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@dndcyprus.com"
              >
                info@dndcyprus.com
              </a>
              .
            </p>
          </section>

          <hr className="my-10 border-[var(--line)]" />

          <p className="text-sm text-[var(--ink-40)]">
            Dieser Text dient ausschließlich der Information und stellt keine
            Rechtsberatung dar. Maßgeblich sind die geltenden lokalen Rechtsvorschriften
            und gegebenenfalls die Bestimmungen der DSGVO.
          </p>
        </div>
      </article>
    </main>
  );
}
