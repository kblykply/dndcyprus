# DND Cyprus sitesi — çeviri notu (EN / DE / RU / PL)

Site: https://www.dndcyprus.com — DND Cyprus, Boston kökenli DND Homes'un Kıbrıs kolu; Kuzey Kıbrıs'ın İskele bölgesinde
ödüllü konut projeleri geliştiren bir gayrimenkul geliştiricisi. Projeler: Lagoon Verde (354 rezidans, lagün havuzu, Aralık 2028),
La Joya Perla II (128 birim, Mayıs 2027), La Joya Perla (denize 700 m, Kasım 2026), La Joya (74 konut, 2025'te tamamlandı),
Mariachi Beach Club (platin ödüllü plaj kulübü), Geçitkale arazi projesi (yakında). Satış ofisi İskele'de, merkez ofis Gazimağusa'da.
Okur: ev almak / yatırım yapmak isteyen yabancı alıcılar (İngiliz, Alman, Rus, Polonyalı) ve yurt dışındaki Türkler.
Kaynak dil Türkçe; İngilizce sürüm onaylı ve referans alınabilir (nüans için TR'ye bak).

## Üslup
- Premium ama güven veren bir geliştirici dili: kısa cümleler, somut rakamlar, abartısız. Kelimesi kelimesine DEĞİL; o dilde
  baştan yazılmış gibi doğal olmalı. Başlıklar kısa (en fazla iki satır), düğme metinleri o dilin alışılmış kalıpları.
- Hitap: EN doğal "you"; DE resmî "Sie"; RU "вы" (küçük harf, resmî ama sıcak); PL resmî "Państwo" (fiil 3. çoğul) — TUTARLI.
- Büyük/küçük harf hedef dilin kuralı (DE isimler büyük, RU/PL cümle düzeni; EN başlıklarda Title Case korunur).
- Hukuki sayfalar (gizlilik, şartlar): anlam birebir, hukuki üslup; şirket adı/adres/e-posta değişmez. "KVKK" ilk geçtiği yerde
  kısa açıklamayla (DE "KVKK (türkisches Datenschutzgesetz)", RU «KVKK (закон ТРСК/Турции о защите персональных данных)»,
  PL "KVKK (turecka ustawa o ochronie danych)"); EN "KVKK (Turkish data protection law)".

## Biçim kuralları (KESİN)
- Yalnızca METİN çevrilir: dosya yolları, görsel adları, id'ler, href'ler, CSS sınıfları, YouTube kimlikleri, koordinatlar,
  `/azure/...` görselleri, ikon adları ("Waves"), `accent: "sea"`, JSON-LD "@type"/"@context" asla değişmez.
- JSX içindeki `<b>…</b>` / `<strong>…</strong>` vurguları aynı sayıda kalır; hedef dilde en anlamlı kelimeyi sarar.
- Rakamlar, m², tarih ve saatler aynen; binlik ayırıcı hedef dilde: EN "43,179", DE "43.179", RU "43 179", PL "43 179";
  ondalık: EN "33.60 m²", DE/RU/PL "33,60 m²". Para: "₺" ve "£" simgeleri aynen; "TL taksit" → "lira instalments"/"Raten in Lira"/
  «рассрочка в лирах»/"raty w lirach".
- Tarihler: "Aralık 2028" → EN "December 2028", DE "Dezember 2028", RU "декабрь 2028", PL "grudzień 2028".
- Hiçbir metni boş bırakma, "TODO" yazma; emin olmadığın yerde EN sürümü esas al.

## Değişmeyen adlar
DND Cyprus, DND Homes, Lagoon Verde, La Joya, La Joya Perla, La Joya Perla II, Mariachi Beach Club, Joy Cafe, Long Beach,
Bahçeler, Ötüken, İskele (EN/DE/PL "İskele", RU "Искеле"), Geçitkale (RU "Гечиткале"), Aqua Park, Sand pool, Loft, Penthouse,
Studio, PropertyNC (ödül), WhatsApp, Instagram, YouTube, Google/Apple Maps.
- Gazimağusa → EN/DE/PL "Famagusta", RU "Фамагуста". Ercan Havalimanı → "Ercan Airport" / "Flughafen Ercan" / «аэропорт Эрджан» /
  "lotnisko Ercan". Kuzey Kıbrıs → "North Cyprus" / "Nordzypern" / «Северный Кипр» / "Cypr Północny". Kıbrıs → Cyprus / Zypern /
  Кипр / Cypr. Lefkoşa → Nicosia / Nikosia / Никосия / Nikozja. Girne → Kyrenia / Kyrenia / Кирения / Kyrenia.
- Daire tipleri: "1+0 Stüdyo" → "1+0 Studio" / "1+0 Studio" / «Студия 1+0» / "1+0 Studio"; "1+1 Loft", "2+1 Penthouse",
  "2+1 Çatı Teraslı" → "2+1 Roof Terrace" / "2+1 mit Dachterrasse" / «2+1 с террасой на крыше» / "2+1 z tarasem na dachu";
  "2+1 Bahçeli" → "2+1 Garden" / "2+1 mit Garten" / «2+1 с садом» / "2+1 z ogrodem".
- Ödüller: "Altın Ödül" → Gold Award / Goldpreis / «Золотая награда» / Złota Nagroda; "Platin Ödül" → Platinum Award /
  Platinpreis / «Платиновая награда» / Platynowa Nagroda.
- Durumlar: "Devam Eden" → Ongoing / Im Bau / «Строится» / W budowie; "Tamamlandı" → Completed / Fertiggestellt / «Завершён» /
  Ukończony; "Yakında" → Coming soon / Demnächst / «Скоро» / Wkrótce; "Teslim: Aralık 2028" → Delivery: … / Übergabe: … /
  «Сдача: …» / Oddanie: ….

## Arayüz sözlüğü (düğme ve etiketler — her yerde aynı)
Bilgi Al = Enquire / Anfragen / Узнать больше / Zapytaj · Fiyat ve kat planı iste = Request prices & floor plans /
Preise & Grundrisse anfordern / Запросить цены и планировки / Poproś o ceny i plany · Broşür (PDF) = Brochure (PDF) /
Broschüre (PDF) / Брошюра (PDF) / Broszura (PDF) · Detaylara bak = View details / Details ansehen / Подробнее / Zobacz szczegóły ·
Büyüt = Enlarge / Vergrößern / Увеличить / Powiększ · Kapat = Close / Schließen / Закрыть / Zamknij · Önceki/Sonraki =
Previous/Next / Zurück/Weiter / Назад/Далее / Poprzedni/Następny · Yol tarifi = Directions / Route / Маршрут / Trasa ·
Haritada Aç = Open on Map / In Karte öffnen / Открыть на карте / Otwórz na mapie · 360 Turu Başlat = Start 360 Tour /
360°-Tour starten / Начать 3D-тур / Rozpocznij wirtualny spacer · Yeni sekmede aç = Open in new tab / In neuem Tab öffnen /
Открыть в новой вкладке / Otwórz w nowej karcie · Toplam Kapalı Alan = Total Covered Area / Gesamte Wohnfläche /
Общая закрытая площадь / Powierzchnia zamknięta · Toplam Kullanım Alanı = Total Usable Area / Gesamte Nutzfläche /
Общая полезная площадь / Powierzchnia użytkowa · Daire Tipleri = Apartment types / Wohnungstypen / Типы квартир /
Typy mieszkań · Ad Soyad = Full name / Vor- und Nachname / Имя и фамилия / Imię i nazwisko · Telefon / E-posta / Mesaj / Gönder =
Phone / Email / Message / Send — Telefon / E-Mail / Nachricht / Senden — Телефон / Эл. почта / Сообщение / Отправить —
Telefon / E-mail / Wiadomość / Wyślij.

## Kalite
- Çeviri bittikten sonra kendi dilinde yüksek sesle okunduğunda reklam metni gibi akmalı; Türkçe cümle yapısı sızmasın.
- Aynı kavram her sayfada aynı kelimeyle (yukarıdaki sözlük).
