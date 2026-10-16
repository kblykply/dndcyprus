// app/pl/(main)/privacy/page.tsx
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import ConsentPreferencesButton from "@/app/components/analytics/ConsentPreferencesButton";


export const metadata = pageMetadata({
  locale: "pl",
  path: "/privacy",
  title: "Polityka prywatności i plików cookie | DND Cyprus",
  description:
    "Jak DND Cyprus przetwarza dane osobowe, jakich plików cookie używamy (Google Analytics, Google Ads, Meta Pixel), jak zarządzać zgodą na pliki cookie i jakie prawa Państwu przysługują.",
});

export default function PrivacyPolicyPage() {
  const updatedAt = "15 września 2026"; // Update this date whenever the text is revised.

  return (
    <main className="min-h-svh pt-24 md:pt-28">
      <header>
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-3 px-6 py-6">
          <h1 className="text-3xl md:text-4xl tracking-tight">
            Polityka prywatności i plików cookie
          </h1>
          <span className="text-sm text-[var(--ink-40)]">
            Ostatnia aktualizacja: {updatedAt}
          </span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_minmax(0,1fr)]">
        {/* TOC */}
        <nav
          aria-label="Spis treści"
          className="md:sticky md:top-24 md:self-start"
        >
          <div className="rounded-[22px] border border-white/90 bg-white p-4 shadow-[0_10px_30px_rgba(13,35,38,0.05)]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sea)]">
              Spis treści
            </p>
            <ul className="space-y-2 text-sm">
              {[
                ["kapsam", "Zakres"],
                ["veri-sorumlusu", "Administrator danych i kontakt"],
                ["toplanan-veriler", "Zbierane dane"],
                ["kullanim-amaclari", "Cele przetwarzania"],
                ["hukuki-dayanak", "Podstawa prawna"],
                ["saklama-sureleri", "Okresy przechowywania"],
                ["paylasim-aktarim", "Udostępnianie i przekazywanie danych"],
                ["cerezler", "Pliki cookie"],
                ["cerez-reklam", "Pliki cookie i pomiar reklam"],
                ["haklariniz", "Państwa prawa"],
                ["guvenlik", "Bezpieczeństwo danych"],
                ["cocuklar", "Prywatność dzieci"],
                ["ucuncu-siteler", "Strony internetowe osób trzecich"],
                ["degisiklikler", "Zmiany"],
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
            <h2>Zakres</h2>
            <p>
              Niniejsza Polityka prywatności dotyczy danych osobowych
              przetwarzanych w domenie{" "}
              <Link href="/pl" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              i jej podstronach (dalej „Serwis”). Dokument wyjaśnia, w jakich
              celach przetwarzamy Państwa dane, na jakich podstawach prawnych się
              opieramy, komu je udostępniamy, jak długo je przechowujemy oraz
              jakie prawa Państwu przysługują. Korzystanie z Serwisu oznacza
              akceptację niniejszej polityki.
            </p>
          </section>

          <section id="veri-sorumlusu">
            <h2>Administrator danych i kontakt</h2>
            <p>
              Na potrzeby niniejszej polityki „Spółka” lub „DND Cyprus” oznacza
              podmiot o następujących danych kontaktowych:
            </p>
            <address className="not-italic rounded-[16px] border border-[var(--line)] bg-[var(--sky)] p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>
                Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450
              </div>
              <div>
                E-mail:{" "}
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
              (Adres i dane kontaktowe zostały zaktualizowane na podstawie
              informacji opublikowanych w poprzedniej wersji strony internetowej.)
            </p>
          </section>

          <section id="toplanan-veriler">
            <h2>Zbierane dane</h2>
            <ul>
              <li>
                <strong>Dane kontaktowe:</strong> imię i nazwisko, adres e-mail,
                numer telefonu oraz treść formularza (Państwa wiadomość, projekt,
                którym są Państwo zainteresowani, itp.).
              </li>
              <li>
                <strong>Dane o korzystaniu z Serwisu:</strong> techniczne dane z
                logów, takie jak adres IP, typ przeglądarki, strony odsyłające i
                wyjściowe, czas i długość wizyty, informacje o urządzeniu oraz
                identyfikatory.
              </li>
              <li>
                <strong>Dane z plików cookie:</strong> niezbędne pliki cookie,
                zapisany wybór dotyczący plików cookie oraz – wyłącznie za
                Państwa zgodą – analityczne i reklamowe pliki cookie służące do
                pomiaru (zob. „Pliki cookie i pomiar reklam”).
              </li>
              <li>
                <strong>Interakcje z serwisami osób trzecich:</strong> w przypadku
                korzystania z wtyczek lub usług sieci społecznościowych (np.
                Google, Facebook/Instagram, X (Twitter), LinkedIn) – informacje,
                które zdecydują się Państwo udostępnić z tych kont.
              </li>
            </ul>
          </section>

          <section id="kullanim-amaclari">
            <h2>Cele przetwarzania</h2>
            <ul>
              <li>
                Świadczenie i utrzymanie Serwisu oraz monitorowanie jego działania
              </li>
              <li>Odpowiadanie na Państwa zapytania i ich obsługa</li>
              <li>
                Zawieranie i wykonywanie umów (np. procesy dotyczące projektów i
                ofert, umawianie spotkań oraz wsparcie przed- i posprzedażowe)
              </li>
              <li>
                Realizacja naszych prawnie uzasadnionych interesów (doskonalenie
                usług, analiza kampanii i wydarzeń, zapewnienie bezpieczeństwa)
              </li>
              <li>
                Za Państwa wyraźną zgodą – przesyłanie aktualności, newslettera i
                podobnych informacji handlowych
              </li>
            </ul>
          </section>

          <section id="hukuki-dayanak">
            <h2>Podstawa prawna</h2>
            <p>
              Państwa dane są przetwarzane na podstawach prawnych dopuszczonych
              przez{" "}
              <em>obowiązujące przepisy o ochronie danych osobowych</em>, takich
              jak niezbędność do zawarcia lub wykonania umowy, wypełnienie
              obowiązków prawnych, prawnie uzasadnione interesy administratora
              (przy zachowaniu równowagi interesów) oraz – w razie potrzeby –
              Państwa wyraźna zgoda (np. na podstawie RODO lub przepisów
              lokalnych).
            </p>
          </section>

          <section id="saklama-sureleri">
            <h2>Okresy przechowywania</h2>
            <p>
              Dane osobowe przechowujemy tak długo, jak jest to niezbędne do
              realizacji celów, w których są przetwarzane, oraz przez minimalne
              okresy wymagane do wypełnienia naszych obowiązków prawnych. Dane
              analityczne i dane z logów przechowujemy przez rozsądny okres ze
              względów bezpieczeństwa i funkcjonalności.
            </p>
          </section>

          <section id="paylasim-aktarim">
            <h2>Udostępnianie i przekazywanie danych</h2>
            <ul>
              <li>
                <strong>Dostawcy usług:</strong> dostawcom usług hostingu,
                utrzymania, bezpieczeństwa i analityki – w ograniczonych celach.
              </li>
              <li>
                <strong>Podmioty powiązane / partnerzy biznesowi:</strong> w razie
                potrzeby i w uzasadnionych celach, z zastosowaniem odpowiednich
                zabezpieczeń poufności.
              </li>
              <li>
                <strong>Obowiązki prawne:</strong> gdy jest to wymagane w celu
                wykonania uprawnionych żądań właściwych organów.
              </li>
              <li>
                <strong>Przekazywanie danych za granicę:</strong> Państwa dane mogą
                być przetwarzane lub przechowywane w systemach zlokalizowanych
                poza krajem Państwa zamieszkania. W takich przypadkach stosujemy
                odpowiednie zabezpieczenia techniczne i umowne.
              </li>
              <li>
                <strong>Partnerzy reklamowi i pomiarowi:</strong> Google (Google
                Analytics, Google Ads) oraz Meta Platforms (Facebook/Instagram) –
                wyłącznie wtedy, gdy wyrazili Państwo odpowiednią zgodę w banerze
                cookie.
              </li>
            </ul>
          </section>

          <section id="cerezler">
            <h2>Pliki cookie</h2>
            <p>
              Serwis korzysta z <strong>niezbędnych</strong> plików cookie, aby
              działać i zapamiętywać Państwa ustawienia.{" "}
              <strong>Analityczne</strong> i <strong>reklamowe</strong>{" "}
              pliki cookie są używane wyłącznie po wyrażeniu przez Państwa zgody w
              banerze cookie. Mogą Państwo w każdej chwili zmienić swój wybór, a
              także ograniczyć lub usunąć pliki cookie w ustawieniach przeglądarki.
            </p>
            <details className="mt-3 rounded-[16px] border border-[var(--line)] p-4">
              <summary className="cursor-pointer font-medium">
                Zarządzanie plikami cookie (podsumowanie)
              </summary>
              <ul className="mt-3">
                <li>Baner cookie w serwisie lub przycisk „Zmień ustawienia plików cookie” na tej stronie</li>
                <li>Ustawienia przeglądarki &gt; Prywatność/Ustawienia witryn &gt; Pliki cookie</li>
                <li>Opcje blokowania lub usuwania plików cookie innych firm</li>
              </ul>
            </details>
          </section>

          <section id="cerez-reklam">
            <h2>Pliki cookie i pomiar reklam</h2>
            <p>
              Korzystamy z poniższych narzędzi, aby mierzyć sposób korzystania z
              naszej strony oraz wyniki kampanii reklamowych w Google i Meta
              (Facebook/Instagram). Poza niezbędnymi plikami cookie narzędzia te
              używają plików cookie lub przesyłają dane{" "}
              <strong>wyłącznie po wyrażeniu przez Państwa zgody w banerze cookie</strong>.
            </p>

            <h3>Narzędzia, z których korzystamy</h3>
            <ul>
              <li>
                <strong>Google Analytics 4 (zgoda na analitykę):</strong> pokazuje
                w formie zbiorczych statystyk, które strony są odwiedzane, skąd
                przychodzą odwiedzający oraz interakcje, takie jak pobranie
                broszury, wirtualne spacery i kliknięcia w dane kontaktowe.
              </li>
              <li>
                <strong>Microsoft Clarity (zgoda na analitykę):</strong> tworzy
                mapy cieplne pokazujące, gdzie użytkownicy klikają i jak daleko
                przewijają stronę, a także zanonimizowane nagrania sesji, które
                pomagają nam ułatwić korzystanie z serwisu. Tekst wpisywany w pola
                formularzy jest maskowany i nie jest rejestrowany. Narzędzie nie
                jest ładowane bez zgody na analitykę.
              </li>
              <li>
                <strong>Śledzenie konwersji Google Ads (zgoda na reklamy):</strong>{" "}
                mierzy działania, takie jak wysłanie formularza lub kontakt przez
                WhatsApp lub telefon po kliknięciu reklamy Google. W przypadku{" "}
                <strong>konwersji rozszerzonych</strong> po wysłaniu formularza
                Państwa adres e-mail i numer telefonu są w przeglądarce
                przekształcane w jednokierunkowy skrót SHA-256, przesyłane do
                Google i wykorzystywane wyłącznie do powiązania konwersji z
                kliknięciem reklamy.
              </li>
              <li>
                <strong>Meta Pixel (zgoda na reklamy):</strong> mierzy wyniki
                naszych reklam na Facebooku i Instagramie (wyświetlenia stron,
                wysłane formularze, kliknięcia w dane kontaktowe) i pomaga
                wyświetlać nasze reklamy osobom, które mogą być nimi
                zainteresowane. Nie jest ładowany bez zgody na reklamy.
              </li>
              <li>
                <strong>Meta Conversions API (zgoda na reklamy):</strong> po
                wysłaniu formularza nasz serwer przesyła to samo zdarzenie
                „wysłano formularz” bezpośrednio do Meta, aby blokowanie w
                przeglądarce nie zakłócało pomiaru, a zdarzenie nie było liczone
                podwójnie wraz z Pixelem. Państwa adres e-mail i numer telefonu są
                haszowane algorytmem SHA-256; przesyłane są również adres IP,
                informacje o przeglądarce, adres strony oraz identyfikatory plików
                cookie Meta (_fbp/_fbc). Bez zgody na reklamy żadne dane nie są
                przesyłane.
              </li>
            </ul>
            <p>
              Bez Państwa zgody tagi Google nie odczytują ani nie zapisują plików
              cookie; mogą jedynie przesyłać ograniczone sygnały techniczne bez
              użycia plików cookie (np. stan zgody, adres strony, typ
              przeglądarki), które Google może wykorzystywać do zbiorczego
              modelowania konwersji (Google Consent Mode). W takim przypadku
              informacja o kliknięciu reklamy może być przekazywana w adresie
              strony zamiast w pliku cookie. Po wysłaniu formularza informacje o
              kampanii, za pośrednictwem której trafili Państwo na stronę
              (zawartość opisanych niżej plików dnd_ft/dnd_lt oraz adres strony),
              są zapisywane razem z Państwa zapytaniem. Google i Meta mogą
              przetwarzać dane na serwerach poza Państwa krajem.
            </p>

            <h3>Lista plików cookie</h3>
            <div className="mt-3 overflow-x-auto rounded-[16px] border border-[var(--line)]">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[var(--sky)] text-[var(--ink-60)]">
                  <tr>
                    <th className="px-3 py-2 font-medium">Plik cookie</th>
                    <th className="px-3 py-2 font-medium">Dostawca</th>
                    <th className="px-3 py-2 font-medium">Cel</th>
                    <th className="px-3 py-2 font-medium">Okres przechowywania</th>
                    <th className="px-3 py-2 font-medium">Kategoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)] align-top">
                  {[
                    ["dnd_consent", "DND Cyprus", "Zapisuje Państwa wybór dotyczący plików cookie (zgoda na analitykę/reklamy).", "180 dni", "Niezbędne"],
                    ["locale", "DND Cyprus", "Zapamiętuje wybrany język po wejściu na stronę główną.", "1 rok", "Niezbędne"],
                    ["dnd_ft, dnd_lt", "DND Cyprus", "Kampania, która jako pierwsza i jako ostatnia skierowała Państwa na stronę: parametry UTM, identyfikator kliknięcia reklamy (gclid/fbclid), strona docelowa i strona odsyłająca. Nie zawiera imienia i nazwiska, adresu e-mail ani numeru telefonu.", "90 dni", "Analityczne lub reklamowe"],
                    ["_ga, _ga_<ID>", "Google", "Google Analytics 4: rozróżnia odwiedzających i sesje.", "Do 2 lat", "Analityczne"],
                    ["_clck, _clsk", "Microsoft", "Microsoft Clarity: łączy odwiedzającego z wyświetleniami stron w ramach tej samej sesji.", "1 rok / 1 dzień", "Analityczne"],
                    ["CLID, MUID", "Microsoft (clarity.ms, bing.com)", "Microsoft Clarity: identyfikator zewnętrzny służący do rozróżniania sesji w różnych witrynach.", "1 rok", "Analityczne"],
                    ["_gcl_au, _gcl_aw", "Google", "Google Ads: łączy kliknięcie reklamy z wysłaniem formularza lub kontaktem.", "90 dni", "Reklamowe"],
                    ["_fbp", "Meta", "Meta Pixel: identyfikuje przeglądarkę na potrzeby pomiaru reklam.", "90 dni", "Reklamowe"],
                    ["_fbc", "Meta", "Przechowuje identyfikator kliknięcia reklamy na Facebooku/Instagramie (fbclid).", "90 dni", "Reklamowe"],
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

            <h3>Zmiana lub wycofanie zgody</h3>
            <p>
              Mogą Państwo w każdej chwili zmienić lub wycofać zgodę za pomocą
              poniższego przycisku. Po jej wycofaniu usuwamy powiązane pliki cookie
              z Państwa przeglądarki; Meta Pixel i Microsoft Clarity przestają przesyłać dane. Wycofanie zgody nie
              wpływa na zgodność z prawem przetwarzania dokonanego przed jej wycofaniem.
            </p>
            <ConsentPreferencesButton locale="pl" />
          </section>

          <section id="haklariniz">
            <h2>Państwa prawa</h2>
            <ul>
              <li>Prawo dostępu do danych, uzyskania informacji o ich przetwarzaniu oraz otrzymania ich kopii</li>
              <li>Prawo do sprostowania i aktualizacji danych</li>
              <li>
                Prawo do usunięcia danych („prawo do bycia zapomnianym”) oraz do
                ograniczenia przetwarzania
              </li>
              <li>Prawo do sprzeciwu wobec przetwarzania i rezygnacji z marketingu bezpośredniego</li>
              <li>
                Prawo do przenoszenia danych (w stosownych przypadkach) oraz do
                wycofania zgody
              </li>
            </ul>
            <p>
              Aby skorzystać ze swoich praw, mogą Państwo skontaktować się z nami
              pod adresem{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@dndcyprus.com?subject=Data%20Protection%20Request"
              >
                info@dndcyprus.com
              </a>
              . W celu weryfikacji tożsamości możemy poprosić o dodatkowe informacje.
            </p>
          </section>

          <section id="guvenlik">
            <h2>Bezpieczeństwo danych</h2>
            <p>
              Ani przesyłanie danych przez internet, ani elektroniczne metody ich
              przechowywania nie są w 100% bezpieczne. Dokładamy jednak starań, aby
              chronić Państwa dane za pomocą standardowych w branży środków
              technicznych i organizacyjnych.
            </p>
          </section>

          <section id="cocuklar">
            <h2>Prywatność dzieci</h2>
            <p>
              Serwis nie jest skierowany do dzieci poniżej 13. roku życia. Jeśli
              dowiemy się, że bez odpowiedniej zgody przetwarzaliśmy dane osobowe
              dziecka poniżej 13. roku życia, podejmiemy kroki w celu ich
              usunięcia.
            </p>
          </section>

          <section id="ucuncu-siteler">
            <h2>Strony internetowe osób trzecich</h2>
            <p>
              Nasz Serwis może zawierać linki do stron internetowych osób
              trzecich. Nie odpowiadamy za treści tych stron ani za stosowane przez
              nie praktyki w zakresie prywatności; zalecamy zapoznanie się z
              polityką prywatności każdej odwiedzanej strony.
            </p>
          </section>

          <section id="degisiklikler">
            <h2>Zmiany niniejszej polityki</h2>
            <p>
              Możemy okresowo aktualizować niniejszą politykę. Nowe wersje
              publikujemy na tej stronie, aktualizując datę „Ostatnia
              aktualizacja”. W przypadku istotnych zmian możemy poinformować
              Państwa w odpowiedni sposób (np. komunikatem w serwisie).
            </p>
          </section>

          <section id="iletisim">
            <h2>Kontakt</h2>
            <p>
              W razie pytań prosimy pisać na adres{" "}
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
            Niniejszy tekst ma charakter wyłącznie informacyjny i nie stanowi
            porady prawnej. Pierwszeństwo mają obowiązujące przepisy lokalne oraz
            – w stosownych przypadkach – postanowienia RODO.
          </p>
        </div>
      </article>
    </main>
  );
}
