// "DND'den Haberler" (blog) çevirileri: EN / DE / RU / PL. Türkçe asıl metin lib/blog.ts'de; slug, tarih, kapak ve dış
// bağlantılar her dilde aynı. Yazılar Türkçe asıl metinden çevrildi (Ekim 2026, müşteri isteği: her dilde olacak).
import type { Locale } from "./azure/site";

type Tr = { title: string; excerpt: string; author?: string; content: string };
type Lang = Exclude<Locale, "tr">;

const PNC_INT = "https://propertync.com/blog-detail/dnd-usa-quality-in-cyprus-standout-projects-and-future-goals";
const PNC_PREV = "https://propertync.com/blog-detail/from-global-career-to-real-estate-investments-in-north-cyprus";
const AW_DND = "https://awards.propertync.com/winner-detail/dnd-homes";
const AW_MB = "https://awards.propertync.com/winner-detail/mariachi-beach-club";
const IG_AW = "https://www.instagram.com/p/DI-4WRSCJaR/";
const FB_AW = "https://m.facebook.com/PropertyncAwards/photos/2025-award-winnerbest-newcomer-goldcompany-dnd-homesdndcyprus-propertyncawards-p/1289118946555955/";
const ARCH23 = "https://dndcyprus.com/en/2023/";
const YAHOO = "https://finance.yahoo.com/news/dnd-homes-unveils-expansion-plans-092000611.html";
const AWIRE = "https://www.accessnewswire.com/newsroom/en/business-and-professional-services/dnd-homes-unveils-expansion-plans-in-northern-cyprus-with-over-30-862906";
const a = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

const S1 = "dnd-usa-quality-in-cyprus-interview-2025";
const S2 = "dnd-cyprus-gold-award-propertync-2025";
const S3 = "dnd-cyprus-new-year-celebration-2023";
const S4 = "dnd-homes-30000-konut-buyume-plani-2024";

export const BLOG_I18N: Record<Lang, Record<string, Tr>> = {
  en: {
    [S1]: {
      title: "USA Quality in Cyprus: Interview with Ozan Dökmecioğlu",
      excerpt: "An interview with PropertyNC on DND’s vision and projects.",
      content: `
      <p>In an interview published on <strong>28 January 2025</strong>, DND Cyprus talked about its standout projects and future goals in İskele’s rising profile with its “USA Quality in Cyprus” approach. The interview stressed that design, functionality and harmony with the environment are considered together in every DND project. See the ${a(PNC_INT, "PropertyNC")} page for details.</p>
      <p>In projects such as <em>La Joya</em>, <em>La Joya Perla</em> and <em>La Joya Perla II</em>, the company makes low-rise architecture, natural landscaping, beach/club concepts and social facilities that offer an “everyday holiday feeling” its standard. Quality elements such as smart-home infrastructure, heating and cooling solutions and high insulation are also among the core components of its projects.</p>
      <ul>
        <li><strong>Vision:</strong> Not only building homes, but improving the region’s way of life through mixed investments focused on healthy living, tourism and education.</li>
        <li><strong>Sustainability:</strong> Environmental care in areas such as landscaping suited to local vegetation and water and waste management.</li>
        <li><strong>Community:</strong> A sense of community that blends “local and global” living through a beach club and social facilities.</li>
      </ul>
      <p>The DND team notes that, alongside growing investor interest in North Cyprus, infrastructure is also critical for the sector, and believes coordination with local authorities will speed up lasting solutions. For DND’s journey to North Cyprus and the background of its founder Ozan Dökmecioğlu, you can also read ${a(PNC_PREV, "this earlier PropertyNC interview")}.</p>
    `,
    },
    [S2]: {
      title: "DND Cyprus Wins Gold at the 2025 PropertyNC Awards",
      excerpt: "The company won the award in the ‘Best Newcomer’ category.",
      content: `
      <p>At the <em>PropertyNC Awards</em> held in <strong>April 2025</strong>, DND Cyprus won the <strong>Best Newcomer (Gold)</strong> award. The award recognised the company’s visionary approach, rapid scaling and its impact on the North Cyprus real estate ecosystem in a short time. See the official winner page ${a(AW_DND, "here")}.</p>
      <p>At the same ceremony, DND’s bold concept <strong>Mariachi Beach Club</strong> received the <em>Best Proposed New Commercial Project (Platinum)</em> award. Details: ${a(AW_MB, "Mariachi Beach Club")}. This success shows that DND is ambitious not only in housing but also in tourism and lifestyle projects. DND’s announcement also appeared on the company website: ${a("https://dndcyprus.com/en/", "dndcyprus.com")}.</p>
      <ul>
        <li><strong>Key criteria:</strong> Visionary leadership, brand positioning, high-volume launches in a short time and social and economic contribution.</li>
        <li><strong>Impact:</strong> Greater investor confidence, faster sales in and around İskele and a basis for new partnerships.</li>
        <li><strong>Future:</strong> Plans to grow a pipeline of sustainable, low-rise, healthy-living projects.</li>
      </ul>
      <p>For social posts from the awards night, see ${a(IG_AW, "DND Cyprus on Instagram")} and the ${a(FB_AW, "PropertyNC Awards post")}.</p>
    `,
    },
    [S3]: {
      title: "DND Cyprus Hosts Business Partners at a New Year Event",
      excerpt: "The company held a special event to celebrate the new year with its business partners.",
      content: `
      <p>On <strong>11 December 2023</strong>, DND Cyprus held a comprehensive <em>New Year Gala</em> bringing together business partners, agencies and industry stakeholders. The event was planned to celebrate the brand’s growth in North Cyprus, share its 2024 strategies and strengthen partnerships. The company’s official announcement: ${a(ARCH23, "DND Cyprus – 2023 Archive")}.</p>
      <p>The programme continued with opening speeches and music performances, and the guests included many names from the public sector and business. DND sees such gatherings not only as a celebration but also as a strategic platform for <em>investor confidence</em> and <em>community ties</em>.</p>
      <ul>
        <li><strong>Goal:</strong> To increase “local and global” benefit through projects focused on tourism, healthy living and education in 2024 and beyond.</li>
        <li><strong>Message:</strong> “Projects that add value to the country, raise standards and develop sustainable ways of living.”</li>
        <li><strong>Outcome:</strong> Stronger partnerships, greater brand awareness and a positive effect on sales.</li>
      </ul>
    `,
    },
    [S4]: {
      title: "DND Homes Announces a Growth Plan for 30,000+ Homes in North Cyprus",
      excerpt: "DND Homes announced expansion plans in North Cyprus with a target of more than 30,000 homes in İskele, Kyrenia, Esentepe, Geçitkale and Yedikonuk.",
      author: "Press release",
      content: `
    <p>In a press release published on <strong>14 May 2024</strong>, DND Homes announced a comprehensive growth plan in North Cyprus with a target of <strong>30,000+ homes</strong>. The company aims to scale luxury living standards and sustainable design principles in <em>İskele, Kyrenia, Esentepe, Geçitkale</em> and <em>Yedikonuk</em>.</p>
    <ul>
      <li><strong>Vision:</strong> To bring the idea of “living spaces offering unique quality and comfort” to the island.</li>
      <li><strong>Scope of investment:</strong> In addition to residential projects, 5-star hotel investments in <em>Bafra</em> and <em>Yedikonuk</em> and a <em>beach club</em> in the İskele region.</li>
      <li><strong>Timeline in the 2024 announcement (selected projects):</strong> La Joya (74 units) <em>end of 2025</em>, La Joya Perla (384 units) <em>end of 2026</em>, La Joya Perla II (128 units) <em>end of 2027</em>.</li>
    </ul>
    <p><strong>Current project status:</strong> La Joya was completed in 2025.</p>
    <blockquote>“Our goal is to lead in innovative residential development and build homes that provide <em>unique quality and comfort</em>.” — Ozan Dökmecioğlu</blockquote>
    <p>Details: ${a(YAHOO, "Yahoo Finance story")} and the ${a(AWIRE, "ACCESSWIRE press release")}.</p>
  `,
    },
  },
  de: {
    [S1]: {
      title: "USA Quality in Cyprus: Interview mit Ozan Dökmecioğlu",
      excerpt: "Im Gespräch mit PropertyNC ging es um die Vision und die Projekte von DND.",
      content: `
      <p>In einem am <strong>28. Januar 2025</strong> veröffentlichten Interview sprach DND Cyprus über seine herausragenden Projekte und Zukunftsziele im aufstrebenden İskele mit dem Ansatz „USA Quality in Cyprus“. Betont wurde, dass Design, Funktionalität und Einklang mit der Umwelt in jedem DND-Projekt gemeinsam gedacht werden. Details finden Sie auf der Seite von ${a(PNC_INT, "PropertyNC")}.</p>
      <p>In Projekten wie <em>La Joya</em>, <em>La Joya Perla</em> und <em>La Joya Perla II</em> macht das Unternehmen flache Architektur, natürliche Landschaftsgestaltung, Beach-/Club-Konzepte und Gemeinschaftseinrichtungen mit „jeden Tag Urlaubsgefühl“ zum Standard. Qualitätsmerkmale wie Smart-Home-Infrastruktur, Heiz- und Kühllösungen und hohe Dämmung gehören ebenfalls zu den Kernbestandteilen.</p>
      <ul>
        <li><strong>Vision:</strong> Nicht nur Wohnungen bauen, sondern die Lebensweise der Region durch gemischte Investitionen mit Fokus auf gesundes Leben, Tourismus und Bildung verbessern.</li>
        <li><strong>Nachhaltigkeit:</strong> Umweltbewusstsein etwa bei einer an die heimische Vegetation angepassten Gestaltung sowie bei Wasser- und Abfallmanagement.</li>
        <li><strong>Gemeinschaft:</strong> Ein Gemeinschaftsgefühl, das mit Beach Club und Einrichtungen „lokales und globales“ Leben verbindet.</li>
      </ul>
      <p>Das DND-Team betont, dass neben dem wachsenden Interesse von Investoren an Nordzypern auch die Infrastruktur für die Branche entscheidend ist, und ist überzeugt, dass die Abstimmung mit den lokalen Behörden dauerhafte Lösungen beschleunigt. Zum Weg von DND nach Nordzypern und zum Hintergrund des Gründers Ozan Dökmecioğlu lesen Sie auch ${a(PNC_PREV, "dieses frühere PropertyNC-Interview")}.</p>
    `,
    },
    [S2]: {
      title: "DND Cyprus gewinnt Gold bei den PropertyNC Awards 2025",
      excerpt: "Das Unternehmen wurde in der Kategorie „Best Newcomer“ ausgezeichnet.",
      content: `
      <p>Bei den im <strong>April 2025</strong> verliehenen <em>PropertyNC Awards</em> erhielt DND Cyprus die Auszeichnung <strong>Best Newcomer (Gold)</strong>. Sie würdigt den visionären Ansatz des Unternehmens, sein schnelles Wachstum und seinen Einfluss auf den Immobilienmarkt Nordzyperns in kurzer Zeit. Zur offiziellen Gewinnerseite geht es ${a(AW_DND, "hier")}.</p>
      <p>Bei derselben Verleihung erhielt das mutige DND-Konzept <strong>Mariachi Beach Club</strong> die Auszeichnung <em>Best Proposed New Commercial Project (Platinum)</em>. Details: ${a(AW_MB, "Mariachi Beach Club")}. Dieser Erfolg zeigt, dass DND nicht nur im Wohnungsbau, sondern auch bei Tourismus- und Lifestyle-Projekten ehrgeizig ist. Die Mitteilung von DND erschien auch auf der Unternehmenswebsite: ${a("https://dndcyprus.com/en/", "dndcyprus.com")}.</p>
      <ul>
        <li><strong>Wichtige Kriterien:</strong> Visionäre Führung, Markenpositionierung, umfangreiche Markteinführungen in kurzer Zeit und sozialer wie wirtschaftlicher Beitrag.</li>
        <li><strong>Wirkung:</strong> Mehr Vertrauen der Investoren, schnellere Verkäufe in und um İskele und eine Grundlage für neue Partnerschaften.</li>
        <li><strong>Zukunft:</strong> Pläne, das Portfolio nachhaltiger, flacher Projekte rund um gesundes Leben auszubauen.</li>
      </ul>
      <p>Beiträge vom Abend der Preisverleihung finden Sie bei ${a(IG_AW, "DND Cyprus auf Instagram")} und im ${a(FB_AW, "Beitrag der PropertyNC Awards")}.</p>
    `,
    },
    [S3]: {
      title: "DND Cyprus empfängt Geschäftspartner zum Jahresabschluss",
      excerpt: "Das Unternehmen feierte das neue Jahr mit seinen Geschäftspartnern bei einer besonderen Veranstaltung.",
      content: `
      <p>Am <strong>11. Dezember 2023</strong> veranstaltete DND Cyprus eine große <em>Neujahrsgala</em> mit Geschäftspartnern, Agenturen und Branchenvertretern. Ziel war es, das Wachstum der Marke in Nordzypern zu feiern, die Strategien für 2024 vorzustellen und Partnerschaften zu stärken. Die offizielle Mitteilung des Unternehmens: ${a(ARCH23, "DND Cyprus – Archiv 2023")}.</p>
      <p>Das Programm umfasste Eröffnungsreden und Musikauftritte; zu den Gästen zählten zahlreiche Vertreter aus Verwaltung und Wirtschaft. DND sieht solche Treffen nicht nur als Feier, sondern auch als strategische Plattform für <em>Investorenvertrauen</em> und <em>Gemeinschaft</em>.</p>
      <ul>
        <li><strong>Ziel:</strong> Mit Projekten in den Bereichen Tourismus, gesundes Leben und Bildung ab 2024 „lokalen und globalen“ Nutzen steigern.</li>
        <li><strong>Botschaft:</strong> „Projekte, die dem Land Wert verleihen, Standards anheben und nachhaltige Lebensweisen entwickeln.“</li>
        <li><strong>Ergebnis:</strong> Stärkere Partnerschaften, höhere Markenbekanntheit und positive Wirkung auf den Vertrieb.</li>
      </ul>
    `,
    },
    [S4]: {
      title: "DND Homes kündigt Wachstumsplan für über 30.000 Wohnungen in Nordzypern an",
      excerpt: "DND Homes kündigte Expansionspläne in Nordzypern mit mehr als 30.000 Wohnungen in İskele, Kyrenia, Esentepe, Geçitkale und Yedikonuk an.",
      author: "Pressemitteilung",
      content: `
    <p>In einer am <strong>14. Mai 2024</strong> veröffentlichten Pressemitteilung stellte DND Homes einen umfassenden Wachstumsplan für Nordzypern mit dem Ziel von <strong>über 30.000 Wohnungen</strong> vor. Das Unternehmen will luxuriöse Wohnstandards und nachhaltige Gestaltungsprinzipien in <em>İskele, Kyrenia, Esentepe, Geçitkale</em> und <em>Yedikonuk</em> ausweiten.</p>
    <ul>
      <li><strong>Vision:</strong> Das Konzept „Lebensräume mit einzigartiger Qualität und Komfort“ auf die Insel bringen.</li>
      <li><strong>Investitionsumfang:</strong> Neben Wohnprojekten 5-Sterne-Hotels in <em>Bafra</em> und <em>Yedikonuk</em> sowie ein <em>Beach Club</em> in der Region İskele.</li>
      <li><strong>Zeitplan laut Mitteilung von 2024 (ausgewählte Projekte):</strong> La Joya (74 Einheiten) <em>Ende 2025</em>, La Joya Perla (384 Einheiten) <em>Ende 2026</em>, La Joya Perla II (128 Einheiten) <em>Ende 2027</em>.</li>
    </ul>
    <p><strong>Aktueller Projektstand:</strong> La Joya wurde 2025 fertiggestellt.</p>
    <blockquote>„Unser Ziel ist es, bei innovativer Wohnentwicklung führend zu sein und Häuser mit <em>einzigartiger Qualität und Komfort</em> zu bauen.“ — Ozan Dökmecioğlu</blockquote>
    <p>Details: ${a(YAHOO, "Bericht bei Yahoo Finance")} und ${a(AWIRE, "Pressemitteilung von ACCESSWIRE")}.</p>
  `,
    },
  },
  ru: {
    [S1]: {
      title: "USA Quality in Cyprus: интервью с Озаном Докмеджиоглу",
      excerpt: "В интервью PropertyNC речь шла о видении и проектах DND.",
      content: `
      <p>В интервью, опубликованном <strong>28 января 2025 года</strong>, DND Cyprus рассказала о своих ключевых проектах и планах в набирающем популярность Искеле в рамках подхода «USA Quality in Cyprus». Было подчёркнуто, что дизайн, функциональность и гармония с окружающей средой в каждом проекте DND рассматриваются вместе. Подробности — на странице ${a(PNC_INT, "PropertyNC")}.</p>
      <p>В таких проектах, как <em>La Joya</em>, <em>La Joya Perla</em> и <em>La Joya Perla II</em>, компания делает стандартом малоэтажную архитектуру, природный ландшафт, концепции пляжа и клуба и общественные пространства, дарящие «ощущение отпуска каждый день». Умный дом, системы отопления и охлаждения и качественная изоляция также входят в основу проектов.</p>
      <ul>
        <li><strong>Видение:</strong> не просто строить жильё, а улучшать образ жизни региона через смешанные инвестиции в здоровый образ жизни, туризм и образование.</li>
        <li><strong>Устойчивость:</strong> бережное отношение к природе — озеленение с учётом местной растительности, управление водой и отходами.</li>
        <li><strong>Сообщество:</strong> чувство общности, объединяющее «местную и глобальную» жизнь благодаря пляжному клубу и общественным пространствам.</li>
      </ul>
      <p>Команда DND отмечает, что наряду с растущим интересом инвесторов к Северному Кипру для отрасли важна и инфраструктура, а взаимодействие с местными властями ускорит долгосрочные решения. О пути DND на Северный Кипр и биографии основателя Озана Докмеджиоглу можно прочитать в ${a(PNC_PREV, "предыдущем интервью PropertyNC")}.</p>
    `,
    },
    [S2]: {
      title: "DND Cyprus получила золото на PropertyNC Awards 2025",
      excerpt: "Компания отмечена наградой в номинации «Лучший новичок».",
      content: `
      <p>На церемонии <em>PropertyNC Awards</em> в <strong>апреле 2025 года</strong> DND Cyprus получила награду <strong>Best Newcomer (Gold)</strong>. Она отметила дальновидный подход компании, быстрый рост и её влияние на рынок недвижимости Северного Кипра за короткое время. Официальная страница победителя — ${a(AW_DND, "здесь")}.</p>
      <p>На той же церемонии смелая концепция DND <strong>Mariachi Beach Club</strong> получила награду <em>Best Proposed New Commercial Project (Platinum)</em>. Подробнее: ${a(AW_MB, "Mariachi Beach Club")}. Этот успех показывает, что DND амбициозна не только в жилье, но и в туристических и lifestyle-проектах. Сообщение DND также опубликовано на сайте компании: ${a("https://dndcyprus.com/en/", "dndcyprus.com")}.</p>
      <ul>
        <li><strong>Ключевые критерии:</strong> дальновидное руководство, позиционирование бренда, масштабные запуски за короткое время и социально-экономический вклад.</li>
        <li><strong>Результат:</strong> рост доверия инвесторов, ускорение продаж в Искеле и окрестностях, основа для новых партнёрств.</li>
        <li><strong>Будущее:</strong> планы расширять портфель устойчивых малоэтажных проектов для здорового образа жизни.</li>
      </ul>
      <p>Публикации с вечера награждения — в ${a(IG_AW, "Instagram DND Cyprus")} и ${a(FB_AW, "посте PropertyNC Awards")}.</p>
    `,
    },
    [S3]: {
      title: "DND Cyprus собрала партнёров на новогоднем вечере",
      excerpt: "Компания провела особое мероприятие, чтобы встретить новый год вместе с партнёрами.",
      content: `
      <p><strong>11 декабря 2023 года</strong> DND Cyprus провела большой <em>новогодний гала-вечер</em> для деловых партнёров, агентств и представителей отрасли. Цель — отметить рост бренда на Северном Кипре, представить стратегию на 2024 год и укрепить сотрудничество. Официальное сообщение компании: ${a(ARCH23, "DND Cyprus — архив 2023")}.</p>
      <p>Программа включала приветственные речи и музыкальные выступления; среди гостей были представители государственного сектора и бизнеса. DND рассматривает такие встречи не только как праздник, но и как стратегическую площадку для <em>доверия инвесторов</em> и <em>связей с сообществом</em>.</p>
      <ul>
        <li><strong>Цель:</strong> с 2024 года увеличивать «местную и глобальную» пользу за счёт проектов в сферах туризма, здорового образа жизни и образования.</li>
        <li><strong>Идея:</strong> «Проекты, которые приносят пользу стране, повышают стандарты и развивают устойчивый образ жизни».</li>
        <li><strong>Итог:</strong> более крепкие партнёрства, рост узнаваемости бренда и положительное влияние на продажи.</li>
      </ul>
    `,
    },
    [S4]: {
      title: "DND Homes объявила о плане роста на 30 000+ домов на Северном Кипре",
      excerpt: "DND Homes объявила о планах расширения на Северном Кипре с целью более 30 000 домов в Искеле, Кирении, Эсентепе, Гечиткале и Едиконуке.",
      author: "Пресс-релиз",
      content: `
    <p>В пресс-релизе от <strong>14 мая 2024 года</strong> DND Homes представила масштабный план роста на Северном Кипре с целью <strong>более 30 000 домов</strong>. Компания стремится распространить стандарты премиального жилья и принципы устойчивого дизайна на <em>Искеле, Кирению, Эсентепе, Гечиткале</em> и <em>Едиконук</em>.</p>
    <ul>
      <li><strong>Видение:</strong> принести на остров концепцию «жилых пространств исключительного качества и комфорта».</li>
      <li><strong>Масштаб инвестиций:</strong> помимо жилых проектов — 5-звёздочные отели в <em>Бафре</em> и <em>Едиконуке</em> и <em>пляжный клуб</em> в районе Искеле.</li>
      <li><strong>Сроки по сообщению 2024 года (избранные проекты):</strong> La Joya (74 квартиры) — <em>конец 2025</em>, La Joya Perla (384 квартиры) — <em>конец 2026</em>, La Joya Perla II (128 квартир) — <em>конец 2027</em>.</li>
    </ul>
    <p><strong>Текущий статус:</strong> проект La Joya завершён в 2025 году.</p>
    <blockquote>«Наша цель — лидировать в инновационном жилищном строительстве и создавать дома <em>исключительного качества и комфорта</em>». — Озан Докмеджиоглу</blockquote>
    <p>Подробнее: ${a(YAHOO, "материал Yahoo Finance")} и ${a(AWIRE, "пресс-релиз ACCESSWIRE")}.</p>
  `,
    },
  },
  pl: {
    [S1]: {
      title: "USA Quality in Cyprus: wywiad z Ozanem Dökmecioğlu",
      excerpt: "W rozmowie z PropertyNC omówiono wizję i projekty DND.",
      content: `
      <p>W wywiadzie opublikowanym <strong>28 stycznia 2025 r.</strong> DND Cyprus opowiedziało o swoich wyróżniających się projektach i planach w rozwijającym się İskele, zgodnie z podejściem „USA Quality in Cyprus”. Podkreślono, że w każdym projekcie DND design, funkcjonalność i harmonia z otoczeniem są traktowane łącznie. Szczegóły na stronie ${a(PNC_INT, "PropertyNC")}.</p>
      <p>W projektach takich jak <em>La Joya</em>, <em>La Joya Perla</em> i <em>La Joya Perla II</em> firma standardem czyni niską zabudowę, naturalną zieleń, koncepcje plaży i klubu oraz przestrzenie wspólne dające „poczucie wakacji na co dzień”. Inteligentny dom, systemy ogrzewania i chłodzenia oraz wysoka izolacja to także podstawowe elementy projektów.</p>
      <ul>
        <li><strong>Wizja:</strong> nie tylko budować domy, ale poprawiać styl życia w regionie poprzez mieszane inwestycje w zdrowy tryb życia, turystykę i edukację.</li>
        <li><strong>Zrównoważony rozwój:</strong> dbałość o środowisko, np. zieleń dopasowana do lokalnej roślinności oraz gospodarka wodą i odpadami.</li>
        <li><strong>Społeczność:</strong> poczucie wspólnoty łączące życie „lokalne i globalne” dzięki klubowi plażowemu i przestrzeniom wspólnym.</li>
      </ul>
      <p>Zespół DND zauważa, że obok rosnącego zainteresowania inwestorów Cyprem Północnym kluczowa dla branży jest też infrastruktura, a współpraca z lokalnymi władzami przyspieszy trwałe rozwiązania. O drodze DND na Cypr Północny i o założycielu Ozanie Dökmecioğlu przeczytasz też w ${a(PNC_PREV, "tym wcześniejszym wywiadzie PropertyNC")}.</p>
    `,
    },
    [S2]: {
      title: "DND Cyprus zdobywa złoto na PropertyNC Awards 2025",
      excerpt: "Firma została nagrodzona w kategorii „Best Newcomer”.",
      content: `
      <p>Podczas <em>PropertyNC Awards</em> w <strong>kwietniu 2025 r.</strong> DND Cyprus otrzymało nagrodę <strong>Best Newcomer (Gold)</strong>. Wyróżnienie doceniło wizjonerskie podejście firmy, szybki rozwój i jej wpływ na rynek nieruchomości Cypru Północnego w krótkim czasie. Oficjalna strona zwycięzcy jest ${a(AW_DND, "tutaj")}.</p>
      <p>Na tej samej gali odważna koncepcja DND <strong>Mariachi Beach Club</strong> otrzymała nagrodę <em>Best Proposed New Commercial Project (Platinum)</em>. Szczegóły: ${a(AW_MB, "Mariachi Beach Club")}. Ten sukces pokazuje, że DND ma ambicje nie tylko w budownictwie mieszkaniowym, ale też w projektach turystycznych i lifestyle’owych. Komunikat DND pojawił się także na stronie firmy: ${a("https://dndcyprus.com/en/", "dndcyprus.com")}.</p>
      <ul>
        <li><strong>Kluczowe kryteria:</strong> wizjonerskie przywództwo, pozycjonowanie marki, duże premiery w krótkim czasie oraz wkład społeczny i gospodarczy.</li>
        <li><strong>Efekt:</strong> większe zaufanie inwestorów, szybsza sprzedaż w İskele i okolicach oraz podstawa nowych partnerstw.</li>
        <li><strong>Przyszłość:</strong> plany rozwoju portfela zrównoważonych projektów o niskiej zabudowie, sprzyjających zdrowemu życiu.</li>
      </ul>
      <p>Posty z wieczoru gali znajdziesz na ${a(IG_AW, "Instagramie DND Cyprus")} i we ${a(FB_AW, "wpisie PropertyNC Awards")}.</p>
    `,
    },
    [S3]: {
      title: "DND Cyprus gości partnerów na wydarzeniu noworocznym",
      excerpt: "Firma zorganizowała wyjątkowe wydarzenie, aby powitać nowy rok razem z partnerami.",
      content: `
      <p><strong>11 grudnia 2023 r.</strong> DND Cyprus zorganizowało dużą <em>galę noworoczną</em> dla partnerów biznesowych, agencji i przedstawicieli branży. Celem było świętowanie rozwoju marki na Cyprze Północnym, przedstawienie strategii na 2024 rok i wzmocnienie współpracy. Oficjalny komunikat firmy: ${a(ARCH23, "DND Cyprus – archiwum 2023")}.</p>
      <p>Program obejmował przemówienia otwierające i występy muzyczne; wśród gości byli liczni przedstawiciele sektora publicznego i biznesu. DND traktuje takie spotkania nie tylko jako święto, ale też jako strategiczną platformę dla <em>zaufania inwestorów</em> i <em>więzi ze społecznością</em>.</p>
      <ul>
        <li><strong>Cel:</strong> od 2024 r. zwiększać korzyści „lokalne i globalne” dzięki projektom w turystyce, zdrowym stylu życia i edukacji.</li>
        <li><strong>Przesłanie:</strong> „Projekty, które dodają wartości krajowi, podnoszą standardy i rozwijają zrównoważony styl życia”.</li>
        <li><strong>Rezultat:</strong> silniejsze partnerstwa, większa rozpoznawalność marki i pozytywny wpływ na sprzedaż.</li>
      </ul>
    `,
    },
    [S4]: {
      title: "DND Homes ogłasza plan rozwoju obejmujący ponad 30 000 domów na Cyprze Północnym",
      excerpt: "DND Homes ogłosiło plany ekspansji na Cyprze Północnym z celem ponad 30 000 domów w İskele, Kyrenii, Esentepe, Geçitkale i Yedikonuk.",
      author: "Komunikat prasowy",
      content: `
    <p>W komunikacie prasowym z <strong>14 maja 2024 r.</strong> DND Homes przedstawiło kompleksowy plan rozwoju na Cyprze Północnym z celem <strong>ponad 30 000 domów</strong>. Firma chce rozszerzyć luksusowe standardy mieszkaniowe i zasady zrównoważonego projektowania na <em>İskele, Kyrenię, Esentepe, Geçitkale</em> i <em>Yedikonuk</em>.</p>
    <ul>
      <li><strong>Wizja:</strong> przenieść na wyspę ideę „przestrzeni do życia o wyjątkowej jakości i komforcie”.</li>
      <li><strong>Zakres inwestycji:</strong> oprócz projektów mieszkaniowych 5-gwiazdkowe hotele w <em>Bafrze</em> i <em>Yedikonuk</em> oraz <em>beach club</em> w regionie İskele.</li>
      <li><strong>Harmonogram z komunikatu z 2024 r. (wybrane projekty):</strong> La Joya (74 lokale) <em>koniec 2025</em>, La Joya Perla (384 lokale) <em>koniec 2026</em>, La Joya Perla II (128 lokali) <em>koniec 2027</em>.</li>
    </ul>
    <p><strong>Aktualny stan:</strong> projekt La Joya został ukończony w 2025 roku.</p>
    <blockquote>„Naszym celem jest przewodzić innowacyjnemu budownictwu mieszkaniowemu i tworzyć domy o <em>wyjątkowej jakości i komforcie</em>”. — Ozan Dökmecioğlu</blockquote>
    <p>Szczegóły: ${a(YAHOO, "artykuł Yahoo Finance")} i ${a(AWIRE, "komunikat ACCESSWIRE")}.</p>
  `,
    },
  },
};
