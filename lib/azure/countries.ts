// Telefon alanı ülke kodu listesi: La Joya sitesindeki seçiciden (lajoya-site, src/index.tpl.html + i18n/*.json) alındı.
// İlk 8 ülke "sık kullanılanlar" (açılışta üstte), son satır "Diğer ülke" (kod yok: numara + ile tam yazılır).
import type { Locale } from "./site";

export type Country = { code: string; flag: string; name: Record<Locale, string> };

export const COUNTRIES: Country[] = [
  { code: "+90", flag: "🇹🇷", name: { tr: "Türkiye / KKTC", en: "Türkiye / North Cyprus", de: "Türkei / Nordzypern", ru: "Турция / Северный Кипр", pl: "Turcja / Cypr Północny" } },
  { code: "+357", flag: "🇨🇾", name: { tr: "Güney Kıbrıs", en: "Cyprus", de: "Zypern", ru: "Кипр", pl: "Cypr" } },
  { code: "+44", flag: "🇬🇧", name: { tr: "Birleşik Krallık", en: "United Kingdom", de: "Vereinigtes Königreich", ru: "Великобритания", pl: "Wielka Brytania" } },
  { code: "+7", flag: "🇷🇺", name: { tr: "Rusya / Kazakistan", en: "Russia / Kazakhstan", de: "Russland / Kasachstan", ru: "Россия / Казахстан", pl: "Rosja / Kazachstan" } },
  { code: "+49", flag: "🇩🇪", name: { tr: "Almanya", en: "Germany", de: "Deutschland", ru: "Германия", pl: "Niemcy" } },
  { code: "+48", flag: "🇵🇱", name: { tr: "Polonya", en: "Poland", de: "Polen", ru: "Польша", pl: "Polska" } },
  { code: "+380", flag: "🇺🇦", name: { tr: "Ukrayna", en: "Ukraine", de: "Ukraine", ru: "Украина", pl: "Ukraina" } },
  { code: "+972", flag: "🇮🇱", name: { tr: "İsrail", en: "Israel", de: "Israel", ru: "Израиль", pl: "Izrael" } },
  { code: "+98", flag: "🇮🇷", name: { tr: "İran", en: "Iran", de: "Iran", ru: "Иран", pl: "Iran" } },
  { code: "+994", flag: "🇦🇿", name: { tr: "Azerbaycan", en: "Azerbaijan", de: "Aserbaidschan", ru: "Азербайджан", pl: "Azerbejdżan" } },
  { code: "+995", flag: "🇬🇪", name: { tr: "Gürcistan", en: "Georgia", de: "Georgien", ru: "Грузия", pl: "Gruzja" } },
  { code: "+374", flag: "🇦🇲", name: { tr: "Ermenistan", en: "Armenia", de: "Armenien", ru: "Армения", pl: "Armenia" } },
  { code: "+31", flag: "🇳🇱", name: { tr: "Hollanda", en: "Netherlands", de: "Niederlande", ru: "Нидерланды", pl: "Holandia" } },
  { code: "+32", flag: "🇧🇪", name: { tr: "Belçika", en: "Belgium", de: "Belgien", ru: "Бельгия", pl: "Belgia" } },
  { code: "+33", flag: "🇫🇷", name: { tr: "Fransa", en: "France", de: "Frankreich", ru: "Франция", pl: "Francja" } },
  { code: "+34", flag: "🇪🇸", name: { tr: "İspanya", en: "Spain", de: "Spanien", ru: "Испания", pl: "Hiszpania" } },
  { code: "+39", flag: "🇮🇹", name: { tr: "İtalya", en: "Italy", de: "Italien", ru: "Италия", pl: "Włochy" } },
  { code: "+41", flag: "🇨🇭", name: { tr: "İsviçre", en: "Switzerland", de: "Schweiz", ru: "Швейцария", pl: "Szwajcaria" } },
  { code: "+43", flag: "🇦🇹", name: { tr: "Avusturya", en: "Austria", de: "Österreich", ru: "Австрия", pl: "Austria" } },
  { code: "+45", flag: "🇩🇰", name: { tr: "Danimarka", en: "Denmark", de: "Dänemark", ru: "Дания", pl: "Dania" } },
  { code: "+46", flag: "🇸🇪", name: { tr: "İsveç", en: "Sweden", de: "Schweden", ru: "Швеция", pl: "Szwecja" } },
  { code: "+47", flag: "🇳🇴", name: { tr: "Norveç", en: "Norway", de: "Norwegen", ru: "Норвегия", pl: "Norwegia" } },
  { code: "+358", flag: "🇫🇮", name: { tr: "Finlandiya", en: "Finland", de: "Finnland", ru: "Финляндия", pl: "Finlandia" } },
  { code: "+353", flag: "🇮🇪", name: { tr: "İrlanda", en: "Ireland", de: "Irland", ru: "Ирландия", pl: "Irlandia" } },
  { code: "+30", flag: "🇬🇷", name: { tr: "Yunanistan", en: "Greece", de: "Griechenland", ru: "Греция", pl: "Grecja" } },
  { code: "+40", flag: "🇷🇴", name: { tr: "Romanya", en: "Romania", de: "Rumänien", ru: "Румыния", pl: "Rumunia" } },
  { code: "+359", flag: "🇧🇬", name: { tr: "Bulgaristan", en: "Bulgaria", de: "Bulgarien", ru: "Болгария", pl: "Bułgaria" } },
  { code: "+36", flag: "🇭🇺", name: { tr: "Macaristan", en: "Hungary", de: "Ungarn", ru: "Венгрия", pl: "Węgry" } },
  { code: "+420", flag: "🇨🇿", name: { tr: "Çekya", en: "Czechia", de: "Tschechien", ru: "Чехия", pl: "Czechy" } },
  { code: "+370", flag: "🇱🇹", name: { tr: "Litvanya", en: "Lithuania", de: "Litauen", ru: "Литва", pl: "Litwa" } },
  { code: "+371", flag: "🇱🇻", name: { tr: "Letonya", en: "Latvia", de: "Lettland", ru: "Латвия", pl: "Łotwa" } },
  { code: "+372", flag: "🇪🇪", name: { tr: "Estonya", en: "Estonia", de: "Estland", ru: "Эстония", pl: "Estonia" } },
  { code: "+375", flag: "🇧🇾", name: { tr: "Belarus", en: "Belarus", de: "Belarus", ru: "Беларусь", pl: "Białoruś" } },
  { code: "+998", flag: "🇺🇿", name: { tr: "Özbekistan", en: "Uzbekistan", de: "Usbekistan", ru: "Узбекистан", pl: "Uzbekistan" } },
  { code: "+996", flag: "🇰🇬", name: { tr: "Kırgızistan", en: "Kyrgyzstan", de: "Kirgisistan", ru: "Киргизия", pl: "Kirgistan" } },
  { code: "+993", flag: "🇹🇲", name: { tr: "Türkmenistan", en: "Turkmenistan", de: "Turkmenistan", ru: "Туркменистан", pl: "Turkmenistan" } },
  { code: "+20", flag: "🇪🇬", name: { tr: "Mısır", en: "Egypt", de: "Ägypten", ru: "Египет", pl: "Egipt" } },
  { code: "+962", flag: "🇯🇴", name: { tr: "Ürdün", en: "Jordan", de: "Jordanien", ru: "Иордания", pl: "Jordania" } },
  { code: "+961", flag: "🇱🇧", name: { tr: "Lübnan", en: "Lebanon", de: "Libanon", ru: "Ливан", pl: "Liban" } },
  { code: "+964", flag: "🇮🇶", name: { tr: "Irak", en: "Iraq", de: "Irak", ru: "Ирак", pl: "Irak" } },
  { code: "+966", flag: "🇸🇦", name: { tr: "Suudi Arabistan", en: "Saudi Arabia", de: "Saudi-Arabien", ru: "Саудовская Аравия", pl: "Arabia Saudyjska" } },
  { code: "+971", flag: "🇦🇪", name: { tr: "Birleşik Arap Emirlikleri", en: "United Arab Emirates", de: "Vereinigte Arabische Emirate", ru: "ОАЭ", pl: "Zjednoczone Emiraty Arabskie" } },
  { code: "+974", flag: "🇶🇦", name: { tr: "Katar", en: "Qatar", de: "Katar", ru: "Катар", pl: "Katar" } },
  { code: "+965", flag: "🇰🇼", name: { tr: "Kuveyt", en: "Kuwait", de: "Kuwait", ru: "Кувейт", pl: "Kuwejt" } },
  { code: "+1", flag: "🇺🇸", name: { tr: "ABD / Kanada", en: "USA / Canada", de: "USA / Kanada", ru: "США / Канада", pl: "USA / Kanada" } },
  { code: "+86", flag: "🇨🇳", name: { tr: "Çin", en: "China", de: "China", ru: "Китай", pl: "Chiny" } },
  { code: "+91", flag: "🇮🇳", name: { tr: "Hindistan", en: "India", de: "Indien", ru: "Индия", pl: "Indie" } },
  { code: "+92", flag: "🇵🇰", name: { tr: "Pakistan", en: "Pakistan", de: "Pakistan", ru: "Пакистан", pl: "Pakistan" } },
  { code: "+234", flag: "🇳🇬", name: { tr: "Nijerya", en: "Nigeria", de: "Nigeria", ru: "Нигерия", pl: "Nigeria" } },
  { code: "+27", flag: "🇿🇦", name: { tr: "Güney Afrika", en: "South Africa", de: "Südafrika", ru: "ЮАР", pl: "Republika Południowej Afryki" } },
  { code: "", flag: "🌐", name: { tr: "Diğer ülke", en: "Other country", de: "Anderes Land", ru: "Другая страна", pl: "Inny kraj" } },
];

/** Açılışta üstte gösterilen sık kullanılan ülke sayısı (listenin başı) */
export const COUNTRY_HEAD = 8;

/** Sayfa diline göre varsayılan ülke kodu */
export const DEFAULT_DIAL: Record<Locale, string> = { tr: "+90", en: "+44", de: "+49", ru: "+7", pl: "+48" };

export const COUNTRY_UI: Record<Locale, { search: string; code: string; none: string; all: string }> = {
  tr: { search: "Ülke ara", code: "Ülke kodu", none: "Ülke bulunamadı", all: "Tüm ülkeler" },
  en: { search: "Search country", code: "Country code", none: "No country found", all: "All countries" },
  de: { search: "Land suchen", code: "Ländervorwahl", none: "Kein Land gefunden", all: "Alle Länder" },
  ru: { search: "Поиск страны", code: "Код страны", none: "Страна не найдена", all: "Все страны" },
  pl: { search: "Szukaj kraju", code: "Kierunkowy kraju", none: "Nie znaleziono kraju", all: "Wszystkie kraje" },
};

/** Numara kutusundaki örnek (ülke kodu ayrı seçildiği için kodsuz, cep telefonu biçiminde) */
const PHONE_SAMPLE: Record<string, string> = {
  "+90": "5xx xxx xx xx", "+357": "9x xxx xxx", "+44": "7xxx xxxxxx", "+7": "9xx xxx xx xx", "+49": "15x xxxxxxxx",
  "+48": "5xx xxx xxx", "+380": "xx xxx xx xx", "+972": "5x xxx xxxx", "+1": "xxx xxx xxxx",
};
export const phoneSample = (code: string) => (code ? PHONE_SAMPLE[code] ?? "xxx xxx xxxx" : "+xx xxx xxx xxxx");
