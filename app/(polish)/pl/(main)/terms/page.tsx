// app/pl/(main)/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";


export const metadata: Metadata = pageMetadata({
  locale: "pl",
  path: "/terms",
  title: "Warunki korzystania z serwisu | DND Cyprus",
  description:
    "Warunki korzystania ze strony DND Cyprus: zakres Serwisu, obowiązki użytkownika, własność intelektualna, ograniczenie odpowiedzialności i prawo właściwe TRCP.",
});

export default function TermsPage() {
  const updatedAt = "30 października 2025";

  const toc: Array<[string, string]> = [
    ["giris", "1. Zakres i akceptacja"],
    ["tanimlar", "2. Definicje"],
    ["hizmet", "3. Zakres Serwisu"],
    ["bilgilendirme", "4. Charakter informacyjny"],
    ["yukumlulukler", "5. Obowiązki użytkownika"],
    ["yasakli", "6. Zakazane działania"],
    ["formlar", "7. Konta i formularze kontaktowe"],
    ["teklif", "8. Oferty, ceny i błędy"],
    ["ip", "9. Własność intelektualna"],
    ["kullanici-icerigi", "10. Treści użytkownika i licencja"],
    ["baglantilar", "11. Linki do stron osób trzecich"],
    ["garantiler", "12. Wyłączenie gwarancji"],
    ["sorumluluk", "13. Ograniczenie odpowiedzialności"],
    ["tazminat", "14. Odszkodowanie"],
    ["hukuk", "15. Prawo właściwe i jurysdykcja"],
    ["degisiklik", "16. Zmiany"],
    ["butunluk", "17. Całość porozumienia"],
    ["iletisim", "18. Kontakt"],
  ];

  return (
    <main className="min-h-svh pt-24 md:pt-28">
      <header>
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-3 px-6 py-6">
          <h1 className="text-3xl md:text-4xl tracking-tight">Warunki korzystania z serwisu</h1>
          <span className="text-sm text-[var(--ink-40)]">Obowiązuje od: {updatedAt}</span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_1fr]">
        {/* TOC */}
        <nav aria-label="Spis treści" className="md:sticky md:top-24 md:self-start">
          <div className="rounded-[22px] border border-white/90 bg-white p-4 shadow-[0_10px_30px_rgba(13,35,38,0.05)]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sea)]">Spis treści</p>
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
        <div className="rounded-[28px] border border-white/90 bg-white p-6 md:p-10 shadow-[0_10px_40px_rgba(13,35,38,0.06)] prose prose-neutral max-w-none prose-h2:mt-10 prose-h2:scroll-mt-24">
          <section id="giris">
            <h2>1. Zakres i akceptacja</h2>
            <p>
              Niniejsze Warunki korzystania („Warunki”) regulują korzystanie z usług i treści (łącznie „Serwis”)
              udostępnianych w domenie{" "}
              <Link href="/pl" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              i jej podstronach. Korzystanie z Serwisu oznacza akceptację niniejszych Warunków oraz powiązanych z nimi
              zasad (np. Polityki prywatności).
            </p>
          </section>

          <section id="tanimlar">
            <h2>2. Definicje</h2>
            <ul>
              <li>
                <strong>Spółka / DND Cyprus:</strong> przedsiębiorstwo, którego dane podano poniżej w sekcji
                „Kontakt”.
              </li>
              <li>
                <strong>Użytkownik:</strong> każda osoba fizyczna lub prawna, która odwiedza Serwis lub z niego korzysta.
              </li>
              <li>
                <strong>Treści:</strong> teksty, obrazy, filmy, dokumenty i inne materiały.
              </li>
            </ul>
          </section>

          <section id="hizmet">
            <h2>3. Zakres Serwisu</h2>
            <p>
              Serwis udostępnia treści o charakterze promocyjnym i informacyjnym dotyczące projektów, wydarzeń oraz
              informacji korporacyjnych DND Cyprus. Niektóre części Serwisu mogą być okresowo aktualizowane, czasowo
              niedostępne lub całkowicie wycofane.
            </p>
          </section>

          <section id="bilgilendirme">
            <h2>4. Charakter informacyjny</h2>
            <p>
              Treści zamieszczone w tym serwisie mają charakter wyłącznie informacyjny i nie stanowią{" "}
              <em>doradztwa inwestycyjnego, opinii prawnej ani wiążącej oferty</em>. Wizualizacje, teksty i dane
              techniczne projektów mogą mieć charakter poglądowy lub przykładowy; zastrzegamy sobie prawo do wprowadzania
              zmian. Sprzedaż, przekazanie lokali i podobne procesy handlowe podlegają umowom i dokumentom urzędowym,
              które mogą zostać zawarte odrębnie.
            </p>
          </section>

          <section id="yukumlulukler">
            <h2>5. Obowiązki użytkownika</h2>
            <ul>
              <li>Korzystanie z Serwisu zgodnie z obowiązującym prawem i niniejszymi Warunkami,</li>
              <li>
                Nienaruszanie praw osób trzecich (w tym praw własności intelektualnej, dóbr osobistych i prawa do
                prywatności),
              </li>
              <li>Niepodawanie informacji wprowadzających w błąd, nieprawdziwych lub niezgodnych z prawem,</li>
              <li>Niepodejmowanie działań, które mogłyby zagrozić bezpieczeństwu serwisu.</li>
            </ul>
          </section>

          <section id="yasakli">
            <h2>6. Zakazane działania</h2>
            <p>
              Zabronione są: inżynieria wsteczna; automatyczne pozyskiwanie danych (scraping) i próby nieuprawnionego
              dostępu; rozpowszechnianie złośliwego oprogramowania; spam oraz wysyłanie nadmiernej liczby żądań, które
              mogą zakłócić działanie Serwisu.
            </p>
          </section>

          <section id="formlar">
            <h2>7. Konta i formularze kontaktowe</h2>
            <p>
              Ponoszą Państwo odpowiedzialność za prawdziwość informacji podanych w formularzach kontaktowych i
              zgłoszeniowych w serwisie. W razie potrzeby na komunikację handlową uzyskiwana jest odrębna zgoda, którą
              mogą Państwo w każdej chwili wycofać.
            </p>
          </section>

          <section id="teklif">
            <h2>8. Oferty, ceny i błędy</h2>
            <p>
              Wszelkie informacje o cenach, ofertach i dostępności zamieszczone w serwisie mają charakter wstępny i mogą
              ulec zmianie bez uprzedzenia. Wykryte błędy pisarskie lub błędy wyświetlania mogą zostać poprawione; Spółka
              nie ponosi odpowiedzialności za takie błędy w zakresie wykraczającym poza rozsądne granice.
            </p>
          </section>

          <section id="ip">
            <h2>9. Własność intelektualna</h2>
            <p>
              Wszelkie projekty graficzne, teksty, obrazy, logotypy, filmy i oprogramowanie w serwisie oraz związane z
              nimi prawa należą do Spółki lub jej licencjodawców. Bez uprzedniej pisemnej zgody nie wolno ich powielać,
              rozpowszechniać ani wykorzystywać do tworzenia utworów zależnych.
            </p>
          </section>

          <section id="kullanici-icerigi">
            <h2>10. Treści użytkownika i licencja</h2>
            <p>
              Możemy wykorzystywać przekazane Spółce opinie lub sugestie w celu doskonalenia Serwisu, nie zaciągając
              wobec Państwa żadnych zobowiązań. Treści przesłane za pomocą formularzy są przetwarzane w celu rozpatrzenia
              Państwa zgłoszenia i udzielenia odpowiedzi (szczegóły określa{" "}
              <Link href="/pl/privacy" className="underline underline-offset-4">
                Polityka prywatności
              </Link>
              ).
            </p>
          </section>

          <section id="baglantilar">
            <h2>11. Linki do stron osób trzecich</h2>
            <p>
              Serwis może zawierać linki do stron internetowych osób trzecich. Spółka nie odpowiada za treści ani
              praktyki tych stron; zalecamy zapoznanie się z warunkami i zasadami każdej odwiedzanej strony.
            </p>
          </section>

          <section id="garantiler">
            <h2>12. Wyłączenie gwarancji</h2>
            <p>
              Serwis jest udostępniany w stanie „takim, w jakim jest” oraz „w miarę dostępności”. W zakresie dozwolonym
              przez prawo wyłącza się wszelkie gwarancje dorozumiane, w tym m.in. gwarancje przydatności handlowej,
              przydatności do określonego celu oraz nienaruszania praw osób trzecich.
            </p>
          </section>

          <section id="sorumluluk">
            <h2>13. Ograniczenie odpowiedzialności</h2>
            <p>
              W zakresie dozwolonym przez prawo Spółka nie ponosi odpowiedzialności za szkody pośrednie, przypadkowe,
              szczególne lub następcze ani za utratę zysków lub danych bądź inne skutki pozostające poza jej rozsądną
              kontrolą, wynikające z korzystania z Serwisu.
            </p>
          </section>

          <section id="tazminat">
            <h2>14. Odszkodowanie</h2>
            <p>
              Zobowiązują się Państwo pokryć wszelkie uzasadnione szkody, koszty i wydatki Spółki (w tym koszty
              zastępstwa prawnego), które mogą wyniknąć z naruszenia przez Państwa niniejszych Warunków.
            </p>
          </section>

          <section id="hukuk">
            <h2>15. Prawo właściwe i jurysdykcja</h2>
            <p>
              O ile strony nie uzgodniły inaczej na piśmie, niniejsze Warunki i korzystanie z Serwisu podlegają prawu
              Tureckiej Republiki Cypru Północnego (TRCP). Do rozstrzygania sporów właściwe są sądy i urzędy egzekucyjne
              w Famaguście (Gazimağusa). Bezwzględnie obowiązujące przepisy o ochronie konsumentów pozostają
              nienaruszone.
            </p>
          </section>

          <section id="degisiklik">
            <h2>16. Zmiany</h2>
            <p>
              Możemy okresowo aktualizować niniejsze Warunki. Nowe wersje publikujemy na tej stronie, aktualizując datę
              „Obowiązuje od”. Dalsze korzystanie z Serwisu oznacza akceptację zaktualizowanych Warunków.
            </p>
          </section>

          <section id="butunluk">
            <h2>17. Całość porozumienia</h2>
            <p>
              Niniejsze Warunki wraz z Polityką prywatności i innymi dokumentami, do których odsyła serwis, stanowią
              całość porozumienia między stronami. Jeżeli którekolwiek z postanowień zostanie uznane za nieważne,
              pozostałe postanowienia zachowują pełną moc.
            </p>
          </section>

          <section id="iletisim">
            <h2>18. Kontakt</h2>
            <address className="not-italic rounded-[16px] border border-[var(--line)] bg-[var(--sky)] p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Famagusta, Cyprus, 99450</div>
              <div>
                E-mail:{" "}
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
              Dane kontaktowe na tej stronie opierają się na informacjach opublikowanych w naszym oficjalnym serwisie.
            </p>
          </section>

          <hr className="my-10 border-[var(--line)]" />
          <p className="text-sm text-[var(--ink-40)]">
            Niniejszy tekst jest ogólnym wzorem o charakterze wyłącznie informacyjnym i nie stanowi porady prawnej.
            Prosimy skonsultować go z doradcą prawnym, aby upewnić się, że odpowiada Państwa modelowi biznesowemu i
            przepisom lokalnym.
          </p>
        </div>
      </article>
    </main>
  );
}
