# DND Cyprus — Azure tasarımı devir notu

## 0. SON DURUM — 19 Ekim 2026, 16:30 (İstanbul)

**Önce bu bölümü oku.** Aşağıdaki eski bölümlerle (16–17 Ekim) çelişirse bu bölüm geçerlidir.

### Yayın durumu
- **Depo:** `/Users/nymboo/Documents/Mami/dndcyprus`, dal `azure-tasarim`. `main`'den 165 commit ileride, son commit `ad4fe9d5`. GitHub'a **push edilmedi**; push ve gerçek dndcyprus.com geçişi yalnız kullanıcının açık onayıyla.
- **Paylaşılan adres:** https://dndcyprus-azure.vercel.app. Vercel projesi `dndcyprus-azure`, scope `zubeyruygur-5267s-projects`. Herkese açık, arama motorlarına kapalı (noindex). Uzun önizleme adresleri (`…-zubeyruygur-5267s-projects.vercel.app`) Vercel girişi ister; başkasına her zaman ana adres gönderilir.
- **⚠️ Canlıda yanlış sürüm olabilir:** 19 Ekim 16:10'da kullanıcı yanlışlıkla eski önizlemeyi (m46ilkga9) onayladı; canlı adres `mngafuvo3` (ödül akordiyonu yok). En güncel önizleme **q4810ri6i** (`ad4fe9d5`). Önce kontrol et: `vercel inspect dndcyprus-azure.vercel.app --scope zubeyruygur-5267s-projects`. Hâlâ mngafuvo3 ise kullanıcıya şunu ver:
  `vercel promote https://dndcyprus-azure-q4810ri6i-zubeyruygur-5267s-projects.vercel.app --scope zubeyruygur-5267s-projects` (soru çıkınca "y").
- **Yayın akışı:** `git archive HEAD` → boş bir klasöre aç, içine `.vercel/project.json` (projectName dndcyprus-azure) ve noindex `vercel.json` koy → `vercel deploy --yes --scope zubeyruygur-5267s-projects` → önizleme adresini kullanıcıya ver. **Terfiyi kullanıcı yapar** (`vercel promote …`, "y" onayı ister, yeniden derler ~2 dk); Claude'un promote komutu izin sisteminde engellendi. Derleme ara sıra "next/font/google" hatası verir: yeniden yayınla, geçer.
- **Canlı kontrol:** Terfiden sonra ana adreste 5 dilde kontrol et. Playwright'ta `waitUntil: 'load'` kullan (analitik istekleri yüzünden networkidle beklenmez); ilk ziyarette açılan TL ödeme penceresini (`[role=dialog]`) kaldır. Sonra görsel önbelleğini ısıt: 5 dil × ana sayfalardaki `/_next/image?url=…` adreslerini curl ile çağır.

### Test
- Playwright e2e: 329 test, hepsi geçiyor. Yerel üretim derlemesine karşı çalıştırılır: `npx next build && npx next start -p 3117`, sonra `PW_CHROMIUM_EXECUTABLE=~/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell E2E_BASE_URL=http://localhost:3117 npx playwright test`. Playwright modülü: `/Users/nymboo/Documents/Mami/dndreserve-audit/node_modules/playwright`.
- Önizleme paneli `~/Documents` ve `~/Downloads`'ı okuyamaz: depoyu `/private/tmp/...` altına APFS klonuyla (`cp -c -R`) kopyalayıp orada derle.
- **Asla** geçerli bir formu `/api/contact`'a POST etme (gerçek lead oluşur); gerçek müşteriye mesaj/e-posta gönderme.

### 18–19 Ekim'de yapılanlar (hepsi 5 dilde)
- **Patronun akış belgesi** ("DND Cyprus web sitesi akis.pages", Netice Hanım): menü 7 başlık; **yalnız Projelerimiz açılır menü** (19 Ekim kararı; belgedeki "alt sayfalar" sayfa bölümleridir). Ana sayfa 8 bölüm; haberlerin yanında S.S.S. (kullanıcı istedi), biri açılınca diğeri kapanır.
- **Ana sayfa vitrini:** NeoCity → Lagoon Verde → La Joya → Perla → Perla II; 3 sn'de bir geçer, fare üstündeyken durmaz. Ana sayfada Amerika anılmaz (DND Homes Amerika yalnız Hakkımızda'da).
- **NeoCity sayfası:** teslim Nisan 2029; konum 35.15406, 33.85201 (sunum s.9 uydu görselinden Google uydu ile eşlendi); galeri 5 kare (`GALLERY=[1,2,3,4,11]`); iç mekân 10 kare, 03/06/08/09/10 masaüstündeki "S2" sürümleri; vaziyet planı kartı planla hizalı; 5 Sıfır ödeme kartında düğme solda.
- **Lagoon Verde = Ötüken, İskele** (katalog s.16), Bahçeler değil (Bahçeler = La Joya Perla / Perla II). Koordinat 35.228781, 33.880673, Plus Code 6VHJ+G7 Ötüken; sokak adresi hiçbir belgede yok. Mesafeler katalogdan dakika: Long Beach 5, Mariachi 7, hastane 10, Gazimağusa 15, Lefkoşa 35, Ercan 45, Girne 45. Ad: "Lagoon Verde Rezidansları ve Tatil Köyü" / "Residences & Holiday Village". Teslim Aralık 2028.
- **Yeni sayfalar:** `/advantage` (DND Ayrıcalığı: inşaat kalitesi, sosyal yaşam, DND Maintenance, ev sahibi ayrıcalıkları, Ülfet Beach Club ücretsiz giriş + Ülfet Shu %10), `/payment-plans` (TL ödeme modeli, NeoCity 5 Sıfır, kampanyalar, kira geliri), blog 5 dilde ("DND'den Haberler"), Haberler sayfasında Etkinlikler.
- **Hakkımızda:** Ozan Bey, Netice Hanım (satış sunumundaki portre, Kling ile HD + doğal renklendirme; saç koyu kahve), Aynur Hanım (Direktör & Mimar). Kartlar sağ-sol sırayla.
- **Ödüller:** geniş akordiyon; panel = ödülün projesinin fotoğrafı, açılınca madalya yukarıdan iner, bilgi cam kartta; platin (Mariachi) ortada ve başta açık. Başlık "PropertyNC 2025'te üç ödül".
- **Ödeme fırsatları kartları (ana sayfa ve /payment-plans):** tam fotoğraf + açık buzlu cam panel; 60 ay TL modeli Lagoon Verde VE NeoCity için.
- **Görünüm kuralları uygulandı:** fotoğraf üstündeki proje logoları beyaz ve eşit görsel alan (`lib/azure/logos.ts`); üst görsellerde rakam kartları ve "— İLETİŞİM" gibi üst etiketler yok; galeri ve iç mekânda tam ekran (`Lightbox.tsx`); Ülfet ve Mariachi "kimlik doğrulaması" notları kaldırıldı; düşük kaliteli fotoğraflar (Ülfet, 4 etkinlik) Kling ile HD.
- **Sitede hiçbir yerde fiyat yok** (kullanıcının kesin kuralı).

### Kullanıcının bu iki günde netleşen tercihleri
- Koyu/lacivert panel ve görsel üstü renk katmanı istemiyor; **tam fotoğraf + cam kart** seviyor.
- "Kötü görüntü istemiyorum": bulanık görsel yerine Kling Nano Banana 2 (`gemini-3.1-flash-image`, 2k) ile aslına sadık HD. Gerçek kişilerde yüz birebir korunur; renklendirmede gerçek fotoğraflardan renk kontrolü.
- Hizaya çok duyarlı; her düzeltmeyi ölçerek (getBoundingClientRect) doğrula.
- Terfi komutunu kod bloğunda ver ve "soru çıkınca y yaz" de. Kullanıcı yanlış komutu çalıştırabiliyor: en güncel önizleme adını her seferinde açıkça yaz.
- Kısa, Türkçe, ekran görüntüsüyle konuş; mesajlar Türkçe karaktersiz ve hızlı gelir ("bunu kaldır", "hizala").

### Açık işler
1. q4810ri6i'nin terfisi (yukarı bak).
2. EN/DE/RU/PL çevirileri ana dili konuşan biri kontrol etmedi.
3. Gerçek dndcyprus.com geçişi (GitHub `kblykply/dndcyprus` `main`'e birleştirme + push) — kullanıcı onayı bekliyor.
4. Müşteriden bekleyen bilgi yok (`musteriden-istenecek-bilgiler.md`).

---

## Eski durum (16–17 Ekim)

Son güncelleme: 16 Ekim 2026, 22:50 (İstanbul); §6 17 Ekim 2026 sabahı QA ile güncellendi. Bu dosya, projeyi hiç görmemiş biri (ya da yeni bir Claude hesabı) işe kaldığı yerden devam edebilsin diye yazıldı. Her şey yerel olarak commit'li, çalışma alanı temiz.

## 1. Kısa durum

- **Ne yapıldı:** dndcyprus.com'un bütün arayüzü "Azure" tasarımına geçirildi. Kapsam: ana sayfa, 4 proje sayfası (Lagoon Verde, La Joya Perla II, La Joya Perla, La Joya), Mariachi, Geçitkale, projeler, hakkımızda, ekip, basın, blog, iletişim, gizlilik ve şartlar, 404. Site 5 dilde: TR, EN, DE, RU, PL.
- **Nerede:** Depo `/Users/nymboo/Documents/Mami/dndcyprus`, dal `azure-tasarim`. Dal `main`'den 82 commit ileride. Son commit tablonun en üstünde (§12).
- **Canlı:** dndcyprus.com, GitHub `kblykply/dndcyprus` `main` = `338fe497`, hâlâ ESKİ tasarımda. `azure-tasarim` GitHub'a **push edilmedi**, upstream yok. Canlıya geçiş yalnız kullanıcının açık onayıyla.
- **Önizleme:** Ayrı Vercel projesi `dndcyprus-azure`, adres https://dndcyprus-azure.vercel.app. Bu adres `4dc5e410`'dan önceki bir sürümü gösteriyor. `4dc5e410` hazır bir önizleme yayınında, ana adrese terfisi kullanıcıda (bkz. §8).

## 2. Kullanıcı ve çalışma kuralları (KESİN)

- **Push ve deploy yok:** Kullanıcının sözü: "Gerekli her şeyi yap ama yayınlama." `main`'e birleştirme, push ve canlı yayın yalnız açık onayla.
- **Commit imzası yok:** Commit ve PR mesajlarına `Co-Authored-By: Claude`, "Generated with Claude Code" ya da yapay zekâya değinen hiçbir satır eklenmez. Depolar müşteriye ait (kblykply, batumzff).
- **Önce örnek göster:** Bir bölümü kökten değiştirecek öneri doğrudan uygulanmaz.
  - Önce headless ekran görüntüsüyle 1–2 seçenek gösterilir, kullanıcı seçince uygulanır.
  - Küçük düzeltmeler (boşluk, hizalama, renk, metin) doğrudan yapılır.
  - Ders: "gün şeridi" doğrudan uygulandı, kullanıcı "eski haline döndür" dedi.
- **Testler en sonda:** Kullanıcının sözü: "Testleri en son yap her şey bitince." tsc, lint, test, build ve tarayıcı kontrolü tek seferde, işin sonunda yapılır.
- **İletişim:** Kullanıcıyla Türkçe, kısa ve ekran görüntüsüyle konuşulur. Kullanıcı ekran görüntüsü atıp kısa istekler yazar ("burası bizim tarzımıza uygun olmalı", "hizalı değil", "kaldır onu").
- **Kullanıcı bazen ESKİ siteye bakar:** Şunları görüyorsan görüntü canlı eski siteden ya da eski önizlemeden: siyah yuvarlak menü düğmesi, Montserrat yazı tipi, cam hero kartı, "Sayfa 1 / 22" flipbook. Önce yerelde (3102) aynı bölüme bak.
- **Paylaşılan çalışma alanı:** Aynı depoda birden çok Claude oturumu çalıştı. Yalnız kendi dosyalarını yolla commit et (`git commit -- <dosyalar>`). `git add -A`, stash, reset ve dal değiştirme yapma.

## 3. Tasarım dili (KESİN)

- **İki konsept birleşimi:**
  - Ana dil "Azure" (konsept-3): kıyı, cam, bento, mercan CTA.
  - Azure'da karşılığı olmayan bölümler "Meridian" (konsept-2) düzeniyle yapılır: ince çizgiler, büyük harfli aralıklı küçük etiketler, büyük grotesk rakamlar, görsel temiz ve açıklaması altta.
  - Kullanıcı "meridyen tarzı" derken bu konsepti kastediyor, küre ya da meridyen çizgisini değil.
  - Kaynaklar: `/Users/nymboo/Downloads/LAGOON VERDE/DND-TASARIM-SUNUM/konsept-2` ve `konsept-3`. Sunum canlıda: https://dnd-tasarim-sunum.vercel.app
- **Yazı tipleri:** Yalnız sitenin kendi tipleri. Başlık Outfit, metin ve etiket Albert Sans. Meridian'ın JetBrains Mono'su KULLANILMAZ (kullanıcı: "fontlar bizim tasarım dilimiz olmalı"). `.mr-mono` sınıf adı kaldı ama artık Albert Sans 600, .12em, büyük harf.
- **Renkler:** `app/globals.css` içinde tanımlı. `--sea #0d6570`, `--sea-deep #063a42`, `--coral #f15c34`, `--ink #0d2326`, `--sky #eef5f6`, `--sand #f4ecdd`. Köşe yarıçapı `--r 28px`.
- **Görsel üstüne renk katmanı yok:** Turkuaz ya da renkli katman konmaz (kullanıcı: "arkada görsel olmasının anlamı ne"). Yazı gerekiyorsa yalnız yazı bölgesinde nötr, hafif bir koyuluk.
- **Görseller ve ikonlar:**
  - Eski stok görseller ve lucide ikonları yeniden kullanılmaz.
  - Yeni fotogerçekçi görsel Kling MCP `gemini-3-pro-image` (Nano Banana Pro) ile üretilir. Promptta "mimariyi koru, gerçek fotoğraf, nötr renk" ifadesi bulunur.
  - İkonlar Phosphor duotone (`react-icons/pi`).
- **Kırpma ve satır sınırları:**
  - Başlıklar en çok iki satır.
  - Fotoğrafta yüz kırpılmaz (`PageHero imagePosition`).
  - Video kutularında siyah bant olmaz (`LazyYouTube cover`, doğru `ratio`).
- **Hizalama:** Kullanıcı hizaya çok duyarlı. Kartların üst ve alt kenarları, metin ve düğme kenarları ortak çizgilerde olmalı. Her değişiklikten sonra ölçerek doğrula (§6).

## 4. Mimari

- **Teknoloji:** Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, Prisma 7. Postgres talepler (lead) ve blog için kullanılıyor.
- **Rota grupları:**
  - Her dilin kendi kök düzeni var: `app/(default)/tr`, `app/(english)/en/(main)`, `app/(deutsch)/de/(main)`, `app/(russian)/ru/(main)`, `app/(polish)/pl/(main)`.
  - Diğer gruplar: `app/(default)/admin` (talepler paneli) ve `app/(menu)/tr`.
  - Bulunamayan adresler için `app/global-not-found.tsx` (`experimental.globalNotFound`).
- **Diller:**
  - `Locale = "tr" | "en" | "de" | "ru" | "pl"`, ayrıca `LOCALES` ve `LOCALE_META`, hepsi `lib/azure/site.ts` içinde.
  - Ortak veriler `Record<Locale, …>` biçiminde tutulur. Bir dil eksik yazılırsa tsc kırılır.
  - DE, RU ve PL sayfa ağaçları EN'in aynası. Metinli eski bileşenlerin dil kopyaları `app/components/{en,de,ru,pl}/` altında.
  - Çeviri kılavuzu `docs/ceviri-notu.md`. Çeviriler yapay zekâ ile yapıldı, ana dili konuşan biri kontrol etmedi. Blog yalnız Türkçe.
- **Azure katmanı:** `app/azure.css` (az-* sınıfları), `app/components/azure/meridian.css` (`.mr-*`), `app/fonts/index.ts`.
- **Bileşenler (`app/components/azure/`):**
  - `AzureHeader`: yüzen pill menü, mega menü ve dil menüsü.
  - `AzureFooter` ve `FooterFit`: sosyal simgeler adres metninin bittiği yerde biter.
  - `AzureFx`: `.rv` öğeleri görünür olunca `in` sınıfı alır. Sayaç animasyonları da burada.
  - `PageHero`, `ProjectHero`.
  - `ContactCard`: `#fiyat-al` talep formu, ülke kodlu `PhoneField`.
  - `PersonCard`, `WhatsAppAzure`, `SocialIcons`.
  - `home/`:
    - Üst bölümler: `HomeHero`, `AwardsShowcase`, `Bento`, `VideoShowcase`.
    - `Story`: yapışkan görselli hikaye.
    - `ProjectsCarousel`.
    - `LocationPanel`: gerçek Lagoon Verde haritası.
    - `Leadership` ve `BrandWheel` (logo şeridi).
    - `Timeline`: dünya/küre zaman çizelgesi.
    - `PressFaq`.
  - `project/`:
    - `AzureProject`: proje şablonu.
    - Üst bölümler: `Gallery`, `Overview`, `Facts`/`FactsGrid`, `Tech`.
    - `Interiors`/`InteriorStage`: film şeridi. Lagoon Verde'de Studio, Loft ve 2+1 seçici var.
    - `FloorPlans`: Meridian üç sütun.
    - `Mariachi`, `Amenities`.
    - `Tour`/`TourStage`: 360° tur.
    - `Location`.
    - `AzureCatalog`: react-pageflip kitap.
    - `Update`.
- **Veri:**
  - `lib/azure/site.ts`: diller, menü, projeler, iletişim.
  - `lib/azure/home.tsx`: ana sayfa metinleri.
  - `lib/azure/projects.tsx`: proje hero ve CTA verisi.
  - `lib/azure/projects/{lagoon-verde,perla-ii,perla,la-joya}.tsx`: proje şablonu verisi, 5 dil.
  - Diğerleri: `lagoon-verde-interiors.ts`, `mariachi.ts`, `project-types.ts`, `project-ui.ts`, `videos.ts`, `countries.ts`.
- **Görseller:**
  - `public/azure/`: Azure görselleri. İç mekân ve planlar `interiors/lagoon-verde/{studio,loft,2plus1,plans}` altında.
  - `public/lagoonflip/pages`: Lagoon Verde katalog sayfaları (69 adet).
  - `public/perlaflip` ve `public/perla2flip`: Perla katalog sayfaları.
  - `public/brochure/`: Perla PDF'leri.
  - `public/tours`: 360° turlar (516 MB).
  - `public/videos/hero-montaj.mp4`: ana sayfa hero videosu.
- **Bilinen teknik tuzaklar:**
  - **AzureFx `.rv`:** className'i React'çe değişen bir öğeye `rv` koyma, `in` sınıfı silinir. `rv`'yi sabit bir dış kaba koy.
  - **react-pageflip:** Çocuklar her çizimde değişirse kitap yeniden kurulur. Çözüm: `renderOnlyPageLengthChange` kullan, sayfa öğelerini `useMemo` ile tut, görselleri React dışında yükle.
  - **3102 ve `next build`:** 3102 çalışırken repoda `next build` YAPMA. İkisi aynı `.next` klasörünü paylaşıyor, dev önbelleği bozulur ve /tr sayfaları eski çizimi verir. Üretim doğrulamasını `git archive HEAD` kopyasında yap.
  - **Gizli tarayıcı paneli:** Panel gizliyken IntersectionObserver ve animasyonlar çalışmaz. Doğrulamayı headless Chrome ya da Playwright ile yap.

## 5. Çalıştırma

```bash
cd /Users/nymboo/Documents/Mami/dndcyprus
npm install
npx next dev -p 3102
```

Kontroller:

```bash
npx tsc --noEmit -p .
npm run lint
npm test
```

Beklenen sonuçlar: tsc 0 hata, lint 0 hata (uyarılar var), testler 78/78.

Önizleme ayarları `/Users/nymboo/Downloads/LAGOON VERDE/.claude/launch.json` dosyasında. `dndcyprus-web` 3102'de geliştirme sunucusu açar. `dndcyprus-prod` 3112'de `next start` çalıştırır, önce derleme gerekir.

## 6. Test ve doğrulama

- **17 Ekim 2026 gece QA'sı:** rapor `docs/qa-2026-10-17.md` (düzeltmeler, performans öncesi/sonrası, açık konular, yayın öncesi adımlar).
- **Kalıcı test paketi (Playwright Test, depoda):**
  - Yer: `e2e/` + `playwright.config.ts`.
  - Projeler: chromium-desktop, chromium-mobile (Pixel 7), webkit-mobile (iPhone 13), firefox-desktop.
  - Kapsam: 262 test (sayfalar, menü, formlar sahte API ile, API doğrulama ve 429, çerez izni, SEO, güvenlik başlıkları, medya, çapalar, kaydırma kilidi, axe).
  - Çalıştırma: `npm run build && npm run test:e2e`. Çalışan sunucuya karşı: `E2E_BASE_URL=http://localhost:3114 npm run test:e2e`.
  - Bu makinede Chromium sürümü farklı olduğu için `PW_CHROMIUM_EXECUTABLE=~/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell` gerekir.
  - CI: `.github/workflows/test.yml`. Henüz hiç koşmadı (push yok).
- **Birim testleri:** `npm test` (89). Video faststart/H.264 denetimi de burada.
- **Dikkat:** localhost:5432'de bir Postgres çalışıyor. `DATABASE_URL` yokken pg ona bağlanabilir. `/api/contact`'a geçerli form gönderme; yalnız 400 dönen ya da honeypot dolu istek gönder.
- **Üretim kopyası:** repo APFS klonu (`cp -cR`, `.git`/`.next` hariç) + `npm run build`. Sunucu: `LAGOON VERDE/.claude/launch.json` `dndcyprus-qa2` (3114). 3102'deki geliştirme sunucusunun `.next` klasörüne dokunmaz.

- **E2E betikleri (`scripts/e2e/`, başsız Chrome CDP):**
  - `audit.mjs`: 80 sayfa × boyut; taşma, kırık görsel, konsol hatası, başlık satırı.
  - `analyze.mjs`: sonuç özeti.
  - `links.mjs`: iç bağlantılar.
  - `interactions.mjs`: 22 senaryo. `/api/` istekleri engellenir, CRM'e kayıt gitmez.
  - `hydshift.mjs`: hidrasyon kayması.
  - `align.mjs`: bölüm kenarları.
  - `extra.mjs`: çapa atlama, hareket azaltma, 404.
  - Kullanım ve son sonuçlar `docs/qa-gece-2026-10-16.md` içinde.
- **Playwright (bölüm ölçümleri):**
  - Modül: `require('/Users/nymboo/Documents/Mami/dndreserve-audit/node_modules/playwright')`.
  - Chromium yolu: `~/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell`.
  - WebKit de kurulu.
- **Ölçüm standardı:** 5 dil × 320/375/768/1024/1280/1440/1920 px × Chromium + WebKit. Yatay taşma olmamalı, ortak çizgiler arası fark ≤2 px, başlıklar ≤2 satır.
- **Son durum (16 Ekim):** 240 sayfa yüklemesinde 0 sorun, 22/22 etkileşim, 86/86 bağlantı, hidrasyon kayması 0.

## 7. Ölçüm, reklam ve form altyapısı

- **Belgeler:**
  - `docs/OLCUM-KURULUMU.md`: GA4, Google Ads, Meta Pixel + CAPI, Clarity, GTM, çerez izni, UTM, migration.
  - `docs/OLCUM-TEST-RAPORU.md`: test raporu.
- **Ortam değişkenleri (yalnız adlar):**
  - Veritabanı ve yönetim: `DATABASE_URL`, `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `BLOG_BACKEND`.
  - Meta: `META_CAPI_TOKEN`, `META_GRAPH_API_VERSION`, `META_TEST_EVENT_CODE`, `NEXT_PUBLIC_META_PIXEL_ID`.
  - Google: `NEXT_PUBLIC_GA`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`, `NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL`, `NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
  - Diğer: `NEXT_PUBLIC_CLARITY_ID`.
- **Önizlemede değişken yok:** Vercel `dndcyprus-azure` projesinde form talep kaydetmez, analitik kapalı. Canlı projede değişkenlerin tanımlı olduğu doğrulanmadı.
- **Form API'si:** `app/api/contact`, talep kaydı ve Meta CAPI. Dil, istek yolundan alınır.

## 8. Yayın

### Önizleme (Vercel, canlıdan ayrı)

| Alan | Değer |
|---|---|
| Proje | `dndcyprus-azure` |
| Scope | `zubeyruygur-5267s-projects` |
| Proje id | `prj_UhMfJgzdg7CPJN6cYCiUj4TuikmO` |
| Ekip id | `team_mJ6HWh983F7hUR0KyAM3j6Ky` |
| Adres | https://dndcyprus-azure.vercel.app |
| Arama motorları | Kapalı (`X-Robots-Tag: noindex, nofollow`) |

Önizlemeye yalnız commit'li dal yüklenir. Önce temiz bir kopya çıkar:

```bash
D=/tmp/deploy-azure; rm -rf "$D"; mkdir -p "$D/.vercel"
git -C /Users/nymboo/Documents/Mami/dndcyprus archive HEAD | tar -x -C "$D"
```

Kopyaya iki dosya ekle. `.vercel/project.json`:

```json
{"projectId":"prj_UhMfJgzdg7CPJN6cYCiUj4TuikmO","orgId":"team_mJ6HWh983F7hUR0KyAM3j6Ky","projectName":"dndcyprus-azure"}
```

`vercel.json` (depoya eklenmez, yalnız kopyaya):

```json
{"headers":[{"source":"/(.*)","headers":[{"key":"X-Robots-Tag","value":"noindex, nofollow"}]}]}
```

Sonra yayınla:

```bash
cd /tmp/deploy-azure && vercel deploy --yes
```

- **Boyut:** Kopya yaklaşık 790 MB. Vercel CLI sınırı Pro planda 1 GB ve 15 bin dosya.
- **İzin:** Claude Code'un izin sistemi `--prod`'u "üretim yayını" diye engelliyor. `--prod`'suz yayın SSO korumalı ayrı bir adres üretir.
- **Ana adrese terfi:** Kullanıcı yapar. Vercel panelinde "Promote to Production" düğmesi ya da:

```bash
vercel promote <önizleme-adresi> --yes
```

- **Bekleyen önizleme:** https://dndcyprus-azure-aoa9otsw8-zubeyruygur-5267s-projects.vercel.app (`4dc5e410`). Ana adrese terfi edilmedi. `4dc5e410`'dan sonraki commit'ler henüz hiçbir yayında yok.

### Canlıya geçiş (yapılmadı, onay gerekli)

1. `azure-tasarim`'i GitHub'a push et.
2. İmzasız bir PR aç ve `main`'e birleştir. Canlı Vercel projesinin `main`'den yayınladığı doğrulanmadı.
3. Öncesinde canlı ortam değişkenlerini ve veritabanı migration'ını `docs/OLCUM-KURULUMU.md` §11'e göre kontrol et.

## 9. Diğer dallar

| Dal | Son commit | Not |
|---|---|---|
| `main` | `338fe497` (15.10) | Canlı, eski tasarım |
| `seo-reklam-hazirligi` | `5a74a97d` (16.09) | Uzakta var, `azure-tasarim`'in içinde |
| `fix/musteri-geri-bildirim` | `8e2125e6` (15.10) | Eski tasarımda basın düzeltmesi |
| `backup/before-msg-rewrite` | `133637c8` (15.10) | Commit mesajı temizliği öncesi yedek |

## 10. Açık işler ve kararını bekleyenler

1. **Önizleme terfisi:** Bekleyen önizlemeyi ana adrese terfi et. Ardından son commit için yeni bir önizleme yayını yap.
2. **Canlıya geçiş:** Push, PR ve `main`'e birleştirme, yalnız onayla.
3. **Katalog PDF'leri:** Perla ve Perla II PDF'leri (`public/brochure/perla.pdf`, `perla2.pdf`) flipbook görsellerinden üretildi. Baskı kalitesinde asılları varsa onlarla değiştir.
4. **Lagoon Verde harita pini:** Koordinat 35.228781, 33.880673 (Ötüken Camii yanı). Parselin tam noktası olduğu doğrulanmadı.
5. **Ödül sayısı:** Ana sayfa "Üç ödül, tek yıl", projeler sayfası "2 ödül · 2025" diyor. Tutarlılık doğrulanmadı.
6. **"30.000+ konut vizyonu":** Hero ve ABD kartından kaldırıldı. Hakkımızda sayfasında ve bir blog yazısında hâlâ geçiyor.
7. **Instagram bölümü:** Ana oturum kart düzenine aldı (`30e1416f`). Meridian önerisi (ızgara, telefon görseli yok) kullanıcı onayı bekliyor.
8. **Kampanya penceresi videosu:** "Hareketi azalt" ayarı açıkken de oynuyor.
9. **Ekip sayfası:** İki kişide fotoğraf yok.
10. **"DJ görseli bozuk":** Kullanıcı bir görüntü gönderdi, yerelde tekrarlanamadı. Büyük ihtimalle eski siteden.
11. **Lagoon Verde 2+1 planları:** Klasördeki `GF PLAN` Garden'a, `2 + 1 PLAN OPS2` ve `2 +1 TERAS PLAN` Roof'a eşlendi. Bu eşleştirme kullanıcıya açıkça onaylatılmadı.
12. **Çeviriler:** Ana dili konuşan biri kontrol etmedi.
13. **ABD rakamı:** "Massachusetts'te 120 tamamlanmış proje" kullanıcı tarafından doğrulandı, olduğu gibi kalacak. Tekrar sorma.

## 11. Önemli kararlar (özet)

### Ana sayfa

- **Hero:** Çipler ve lead kaldırıldı. Başlık küçültülüp aşağı alındı. Alt boşluk sol boşluğa eşitlendi.
- **Ödül vitrini:** Kartsız. Göstergeler kurdelelerin altında ince çizgi.
- **"Bir bakışta" bento:** Şirketi anlatıyor: Mariachi ile TL modeli, ABD, teknik standart, La Joya. Lagoon Verde ayrıntıları ve tekrar eden kartlar çıktı.
- **Video bölümü:** Açık zeminli Meridian düzeni. Süre ve kaynak satırı yok, ikinci bağlantı cam düğme.
- **Hikaye:** Yapışkan görselli. Gün şeridi denendi ve geri alındı. Son görsel artık atlanmıyor.
- **Konum:** Gerçek Lagoon Verde haritası.
- **Logo şeridi:** Düz, dik kartlar, tek sıra. Benzer logolar yan yana gelmiyor.
- **Zaman çizelgesi:** Dünya/küre kartı.

### Proje sayfaları

- **Kat planları:** Meridian üç sütun, ortak çizgiler, düğmeler tablonun altında. Lagoon Verde planları yeni renkli render'lar, antrasit kutuda.
- **İç mekân:** Film şeridi. Lagoon Verde'de Studio, Loft ve 2+1 gerçek oda fotoğraflarıyla. Oda adları bir tipte tekrar etmiyor.
- **Videolar:** Mariachi videosu 4:3 oranında net. Genel bakış videosu 16:9, kırpılmadan.
- **Katalog:** Azure kitap. Geçişler sabit, sırt gölgesi yok.
- **Sayaçlar:** Teknik donanım ve projeler şeridinde sayaç yok, yalnız ilerleme çizgisi.
- **Perla II banner'ı:** `/perla-ii/3.jpg`.

### Diğer sayfalar

- **Hakkımızda:** DND Homes paneli ince çizgili satırlar.
- **Altbilgi:** Sosyal simgeler adres metniyle aynı çizgide biter.
- **Projeler sayfası:** Lagoon Verde'nin konumu "Bahçeler".
- **Mariachi:** Avantaj kartında cabana görseli (`mb-6`).

## 12. Commit listesi (`main..azure-tasarim`, yeniden eskiye)

| Commit | Tarih | Açıklama |
|---|---|---|
| `d17bf2a4` | 16.10 22:43 | Altbilgi: sosyal simgeler adres metninin bittiği yerde biter |
| `4dc5e410` | 16.10 22:27 | Genel bakış videosu kırpılmaz, Perla II banner görseli, Mariachi kartında cabana görseli |
| `794d11a8` | 16.10 22:19 | Katalog geçişleri: kitap yalnız bir kez kurulur, çevirmede boş sayfa yok |
| `c10e480f` | 16.10 22:13 | Teknik donanım ve ana sayfa proje şeridi: sayaç kaldırıldı, yalnız ilerleme çizgisi |
| `6ade436e` | 16.10 22:08 | Katalog: iki sayfaya yayılan fotoğrafların ortasındaki sabit sırt gölgesi kaldırıldı. Teknik donanım ve ana sayfa proje şeridi: sayaç aralık (02–04 / 04) yerine görülen kart / toplam (03 / 04 → 04 / 04) |
| `47886423` | 16.10 21:58 | Hakkımızda / DND Homes: panelde alt boşluk yok, maddeler ince çizgili satırlar |
| `a4ae2796` | 16.10 21:55 | Katalog: Azure tasarımı kalıcı (Lagoon Verde, Perla, Perla II; 5 dil). Açık sahnede gerçek kitap, altta sayaç · ilerleme çizgisi · oklar, başlıkta PDF; Lagoon Verde sayfaları kesim işaretleri kırpılmış 69 A4 sayfa (kapak tek). … |
| `be5edb08` | 16.10 21:51 | Video bölümü: ikinci bağlantı (İletişime geç / Contact us…) altı çizili yazı yerine cam düğme, 5 dil |
| `d277c482` | 16.10 21:50 | Lagoon Verde kat planları: yeni renkli plan render'ları, antrasit kutu (beyaz boşluk yok) |
| `d7061e2f` | 16.10 20:02 | Ödül vitrini: ortadaki kurdelede aralıklı hafif parlama (kurdele şeklinde maskeli; ortaya geldikten ~1 sn sonra, 5 sn'de bir; hareket azaltmada kapalı) |
| `db4fb788` | 16.10 20:00 | Teknik donanım: hafif cam kartlar (görsel kartın içinde), etiket özelliğin adı (İklimlendirme, Enerji, Akıllı ev, Isıtma); ana sayfa proje şeridi gibi geçiş: 3 kart, fareli ekranda sabitlenip aşağı kaydırma yana kaydırır, ok yok; … |
| `2b35cd5e` | 16.10 19:43 | Zaman çizelgesi: duraklar kartların tam ortasının üstünde (kesikli çizgiler dik), uç çizgiler Boston/İskele yazısının altından başlar, mesafe etiketi rota tepesinin altında, kuyruklu yıldız ışıklı nokta, rota geniş ekranda sona … |
| `1d18b451` | 16.10 17:48 | Ana sayfa ödül bölümü: masaüstünde kurdele alanı geniş ve yüksek, yandaki kurdeleler büyük ve dışa açık; 'Bir bakışta'ya geçiş 72px (telefon ölçüleri aynı) |
| `be9421ad` | 16.10 17:36 | Misyon Vizyon & Değerler: ilgisiz görsel ve boş beyaz kart kalktı; 'projelerinize nasıl taşıdığımızı' sorusu ve Projeleri İncele düğmesi değerler panelinin altında (5 dil) |
| `c0dc838a` | 16.10 17:33 | İç mekân: film şeridi düzeni, Lagoon Verde'de daire tipine göre gerçek oda fotoğrafları |
| `82f63a7f` | 16.10 17:21 | Misyon Vizyon & Değerler: misyon ve vizyon kartları değerler paneliyle aynı koyu deniz zemin ve ikon çemberiyle |
| `579aa2e8` | 16.10 17:19 | Hakkımızda, Misyon Vizyon & Değerler: misyon ve vizyon ikonlu kartlar, değerler koyu deniz panelinde ince çizgili ikonlarla (sırayla belirir, üzerine gelince çember beyaza döner), 5 dil |
| `95ad5edc` | 16.10 17:17 | Olanaklar: başlık simgenin yanında (simge / başlık / numara tek satır, açıklama altta), kart bir satır kısaldı; dar kartta simge küçülür ve numara gizlenir (container query), 4 proje, 5 dil |
| `9d0f52df` | 16.10 17:11 | Lagoon Verde iç mekân görselleri (Studio 6, Loft 6, 2+1 9): web için WebP |
| `cbe6e867` | 16.10 17:07 | Proje sayfası: kat planları ve Mariachi ortak çizgilerde, Mariachi videosu net |
| `6e516f9d` | 16.10 17:02 | Proje sayfaları: Öne Çıkan Bilgiler ve Olanaklar Azure kartları (simge, numara, sırayla belirme, sayarak yükselen rakamlar, durum noktası, üzerine gelince yükselme ve renkli alt çizgi); 4 proje, 5 dil |
| `d805e0c6` | 16.10 16:56 | Hakkımızda: Ozan Bey ve Aynur Hanım ana sayfadaki yönetici kartıyla (ortak PersonCard; Aynur Hanım'da portre sağda), DND Homes video ve bilgi kartı aynı yükseklikte, düğmeler altta (5 dil) |
| `94e40be3` | 16.10 16:56 | Ana sayfa proje şeridi: içerik genişliğinde 3 kart (tablette 2, telefonda 1), oklar görsellerin sağında ve solunda, sayaç görünen aralık (01–03 / 06); fareli ekranlarda şerit sabitlenir ve aşağı kaydırma kartları yana kaydırır; … |
| `95a1003b` | 16.10 16:56 | 360° tur: sitedeki eski tur yerine markalı yeni tur (public/tours/360, Marzipano; sahne menüsü, site planı, Çevreyi Keşfet). Lagoon Verde, Perla II ve Perla sayfalarında; karolar sitedeki yerel klasörlerden, dil sayfaya göre (TR … |
| `c840b5a8` | 16.10 16:50 | Tüm iletişim formları deniz arka planında (ana sayfa, projeler, iletişim, proje sayfaları, Mariachi; 5 dil) |
| `4f6dcee5` | 16.10 16:50 | Footer: sosyal medya simgeleri adres metniyle aynı genişlikte biter (logo satırı 48ch), dışarı taşmaz |
| `30e1416f` | 16.10 16:23 | Ana sayfa Instagram bölümü: kenardan kenara beyaz bant yerine diğer bölümler gibi kart (aynı kenar hizası, yuvarlak köşe); oklar telefonda kartın içinde, yükseklik ayırma yalnız yüklenene kadar (5 dil) |
| `0790af79` | 16.10 16:02 | İletişim formları: alanlarda örnek metinler (ad, e-posta, mesaj; telefon örneği seçilen ülkeye göre), 5 dil; 374px altında kod düğmesi numaranın üstünde, dar/geniş düzen eşiği kartın iç genişliğine göre |
| `3e73e889` | 16.10 15:45 | Footer kısaldı: sosyal medya logonun yanında simge, proje ve genel bağlantılar iki sütunlu (sütun sütun okunur), tablette marka satırı yatay, telefonda listeler yan yana; masaüstü 459→315 px, telefon 1127→587 px, 5 dil |
| `1e826018` | 16.10 15:45 | Ekibimiz: filtre hapları çubuk boyunca eşit aralıklarla yayılır, sığmayınca yana kayar (5 dil) |
| `4e08bdfc` | 16.10 15:45 | İletişim formları: telefon alanında bayraklı, aranabilir ülke kodu seçici (La Joya'dan; 51 ülke, 5 dil, varsayılan dile göre); numara kodla birleşip '+90 533…' biçiminde gönderilir; dar formda ad ve telefon tam satır |
| `9671732d` | 16.10 15:26 | Ana sayfa iletişim kartı: arka plan hero ile aynı tesis fotoğrafı yerine deniz (yalnız su bölümü, kum ve dalga kırpıldı), 5 dil |
| `9819c9dd` | 16.10 15:10 | Bir bakışta, ABD kartı: DND Homes'un teslim ettiği iki proje (15 Tyler Road, Lexington; 131 Dane Hill Road, Newton) dnd-amerika sitesinden |
| `68cba619` | 16.10 15:01 | Bir bakışta: ABD kartında DND Homes'un iki ABD fotoğrafı, teknik donanım kartında simgeli kutular; orta alan boşluğu doldurur, düzen kart genişliğine göre (container query), 5 dil |
| `10f179c6` | 16.10 14:49 | Ana sayfa hero: proje sayfalarındaki gibi hafif süzülen 3 cam kart (120 ABD projesi, 3 PropertyNC 2025 ödülü, 60 aya kadar TL taksit), 5 dil; kart etiketleri dengeli kırılır |
| `67ebf21b` | 16.10 14:35 | Ekip paneli: yüzler baş ve omuzlara kırpılmış kare avatarlar (public/azure/team), saçtan çeneye tam görünür |
| `17ac288a` | 16.10 14:27 | Ozan Bey bloğu: bilgi kutuları ince çizgili satırlara dönüştü (değer yalnız virgülden kırılır), Hakkımızda düğmesi kaldırıldı, portre boyu içerikten gelir |
| `d793f15b` | 16.10 14:17 | Ana sayfa yönetim bölümü: Ozan Dökmecioğlu öne çıkan blokta (portre, Yılın CFO'su rozeti, tanıtım, alıntı, bilgi kutuları, kariyer logoları); Aynur Hanım ve ekip paneli ikinci sırada; 5 dil |
| `ab9d57cc` | 16.10 14:17 | Haberler: dar telefonda başlık satırı sarar, küçük resim oranlı; 320-360px'te yatay taşma yok |
| `1c751e31` | 16.10 14:00 | Ödül vitrini: kurdeleler 5 saniyede bir kendiliğinden kayar; üstüne gelmek ya da tıklamak dönüşü durdurmaz |
| `c5c2ccbc` | 16.10 13:47 | Lagoon Verde'de bir gün: kaydırma sonunda son adım ile görsel aynı çizgide biter |
| `2701be19` | 16.10 13:47 | Video bölümü: tüm slaytlarda eşit içerik yapısı (başlık 2, açıklama 2 satır, maddeler tek satır) |
| `f41838e1` | 16.10 13:32 | Video bölümü: düğme yazısı, ikincil bağlantı, "Sıradaki" ve oklar tek çizgide |
| `3acb7ed8` | 16.10 13:23 | Video bölümü: düğme, "İletişime geç" ve "Sıradaki" yazısı aynı alt çizgide biter |
| `e886bae4` | 16.10 13:19 | Ana sayfa video bölümü: iki sütun ortak satırlara bağlandı (subgrid), hiza her ekranda kendiliğinden tutar |
| `aa88b8a7` | 16.10 13:07 | Bento alt sıra hizası: etiketler üstte aynı çizgide, içerik altta aynı çizgide biter |
| `d7751390` | 16.10 13:01 | Ana sayfa video bölümü: liste videonun alt kenarına, düğmeler "Sıradaki" satırına hizalı |
| `e02748ac` | 16.10 12:56 | Ana sayfa video bölümü: sol metin sütunu video sütunuyla eşit hizada, kart daha sıkı |
| `b9379b5f` | 16.10 12:33 | QA raporu: 30.000+ maddesi güncellendi |
| `0ad2fab6` | 16.10 12:33 | Bento alt sıra: iki metin kartı beyaz ve üstten başlar, La Joya yazısı okunur, 30.000+ cümlesi kalktı |
| `5c2d9a3c` | 16.10 07:16 | Gece QA raporu ve E2E betikleri (scripts/e2e) |
| `589e1208` | 16.10 06:58 | Hizalama: karuseller ve Instagram içerik kenarında; proje videolarında YouTube arayüzü gizli |
| `70b0a13f` | 16.10 06:48 | Kayma ve erişilebilirlik: markalı genel 404, hidrasyon kaymaları, çapa atlamaları, hareket azaltma |
| `25dc3335` | 16.10 06:24 | Gece E2E denetimi düzeltmeleri: taşma, başlıklar, kırık bağlantılar, ses düğmesi |
| `8108675c` | 16.10 06:05 | Hikaye bölümü eski yapışkan görselli hâline döndü; kayma ve hizalama düzeltildi |
| `0628fbbc` | 16.10 05:50 | Ana sayfa: gün şeridi, gerçek konum haritası, hizalı haberler ve SSS |
| `993e861c` | 16.10 05:41 | Hero metni biraz yukarı (alt boşluk sol boşlukla eşit); ödül vitrini kartsız |
| `efb40309` | 16.10 05:32 | Ana sayfa sadeleşti: bento şirketi anlatıyor, video kartında süre / kaynak yok |
| `1d5efb09` | 16.10 05:24 | Logo şeridi ekip satırı ile sonraki başlığın tam ortasında: üst ve alt boşluk eşit |
| `335cc4c3` | 16.10 05:18 | Yazı tipleri sitenin kendi diline döndü; video bölümünde altyazı ve boşluk düzeltildi |
| `6d0e9355` | 16.10 05:04 | Ödül vitrini: göstergeler madalyaların altına, ince ilerleme çizgisi oldu |
| `a339510e` | 16.10 04:54 | Video bölümü Meridian diline geçti: açık zemin, beş dil tek bileşen |
| `9c023b88` | 16.10 04:28 | Logo şeridi düz: kartlar dik, tek sıra yavaş kayıyor, benzer logolar ayrıldı |
| `ba53f7cd` | 16.10 04:25 | Ana sayfa: dünya zaman çizelgesi geri geldi, hero çipleri kaldırıldı, Geçitkale kartına görsel |
| `9fdf6230` | 16.10 04:14 | Ödüller ön planda: hero altındaki küçük ödül hapları yerine canlı sitedeki gibi ödül vitrini (ortadaki kurdele büyük, kendiliğinden döner, tıklanınca ortaya gelir; başlık, açıklama ve bağlantı; beş dilde; kurdeleler hafif WebP) |
| `115068f2` | 16.10 04:11 | Ana sayfa hero'su: tanıtım cümlesi kaldırıldı (beş dilde); başlık biraz küçültüldü ve çerçevenin altına yaklaştırıldı |
| `915cb47f` | 16.10 04:05 | Proje galerisi: üzerine gelince kaybolma hatası düzeltildi (görünürlük sınıfı React'in değiştirmediği sabit dış kapta; önceden hover sınıfı AzureFx'in eklediği 'in' sınıfını silip galeriyi saydamlaştırıyordu) |
| `0378d8e2` | 16.10 03:46 | Kat planları Meridian konseptindeki düzene uyarlandı: solda ince çizgili daire tipi listesi (ad, mono ölçüler, nokta), ortada plan görseli (iç mekân fotoğrafı olan projelerde Plan / İç mekân geçişi ve fotoğraflar arası gezinme), … |
| `a0040d7c` | 16.10 03:35 | Hakkımızda, Mariachi ve Geçitkale: görsellerin üstündeki turkuaz renk katmanları kaldırıldı (beş dilde) |
| `1ad7f6ac` | 16.10 03:33 | İletişim sayfası: ayrı sosyal medya şeridi kaldırıldı; LinkedIn, Instagram, Facebook ve YouTube bağlantıları Merkez Ofis kartının altında küçük ikonlu bir satır (beş dilde, dile göre etiket) |
| `53205f55` | 16.10 03:25 | Kat planı bento düzeni (büyük plan kutusu, alan listesi, büyük rakamlı toplam alan kutuları, büyük + 4 küçük iç mekân mozaiği ve "+n"); görsellerin üstündeki turkuaz renk katmanları kaldırıldı (hero, proje kartları, bento, … |
| `0989f51e` | 16.10 03:25 | Meridian tasarım dili: Hikayemiz sabit büyük yıl, şehir/koordinat ve değişen görselle ince çizgili listeye; proje sayfalarında öne çıkan bilgiler, teknik donanım, olanaklar, Mariachi ve 360° tur Meridian diline (ince çizgiler, … |
| `ec6e5b2f` | 16.10 03:25 | Marka logoları U şeklinde kayan çarka çevrildi (büyük kartlar, ortadaki en büyük ve en altta, sürükleyerek çevrilir, odaklanan logo ortaya gelir); logolar kırpılmış hafif WebP kopyalarla (2,6 MB yerine 296 KB). Ekibimiz … |
| `9397f308` | 16.10 01:45 | Almanca, Rusça ve Lehçe sayfa ağaçları: /de, /ru ve /pl altında İngilizce ağacın aynası olan 15'er sayfa (ana sayfa, projeler, dört proje, Mariachi, Geçitkale, hakkımızda, ekip, basın, medya merkezi, iletişim, gizlilik, şartlar) … |
| `ab9d3e11` | 16.10 01:45 | Beş dil altyapısı (TR, EN, DE, RU, PL): Locale tipi ve dil tablosu, 5 dilli hreflang/Open Graph, sitemap ve tarayıcı diline göre kök yönlendirme; başlıkta açılır dil menüsü, mobil menüde dil çipleri; ortak Azure verisi (site, ana … |
| `5bc50d55` | 16.10 01:00 | Proje verileri: Perla, Perla II ve La Joya sayfalarında eski kopyadan kalan 'Lagoon Verde' metinleri (iç mekân alt başlığı, galeri alt başlığı, 360° tur başlığı) kendi proje adlarıyla düzeltildi; çift boşluklar temizlendi; iç … |
| `46309496` | 16.10 00:51 | Proje hero'sundaki fiyat/kat planı CTA'sına price_request_click izi (data-track) geri eklendi |
| `a2fd6d92` | 16.10 00:51 | Proje sayfaları: kat planı sekmelerine floorplan_view, 360° tur oynat/yeni sekme bağlantısına tour_start analitik izleri (eski Lagoon Verde bileşenlerindeki data-track ile aynı) |
| `3cfdd572` | 16.10 00:47 | Proje talep kartı başlığı kısaltıldı (masaüstünde en fazla iki satır); proje adı üst etikete taşındı |
| `22b586ee` | 16.10 00:45 | Azure tasarımı (2. tur): hakkımızda, Mariachi, Geçitkale, projeler listesi, iletişim ofisleri, ekip ızgarası, basın, blog, gizlilik/şartlar ve medya merkezi Azure diline taşındı; İngilizce medya merkezi ana düzene alındı (menü + … |
| `56ac947b` | 16.10 00:42 | Azure proje şablonu: proje sayfalarının ara bölümleri (galeri, genel bakış, bilgiler, teknik donanım, iç mekân, kat planları, Mariachi, olanaklar, 360° tur, konum, son güncelleme) tek ortak şablona (app/components/azure/project) … |
| `2f2be98e` | 16.10 00:19 | Azure tasarımı (ilk sürüm): yeni tasarım sistemi, yüzen pill menü ve mega menü, altbilgi, Outfit/Albert Sans fontları; Azure ana sayfa (video hero, ödüller, bento, hikâye, proje carousel, konum, yönetim, zaman çizelgesi, … |

## 13. Claude bellek notları (tam kopya)

Bu notlar Claude'un kalıcı belleğinden (`~/.claude/projects/-Users-nymboo-Downloads-LAGOON-VERDE/memory/`) kopyalandı. Yeni hesapta bellek yoksa buradan geri yükle.

### `dndcyprus-azure-dali` — dndcyprus reposunda Azure tasarımının uygulandığı yerel dal, dosya yapısı, kalan işler ve kullanıcının inceleme/düzeltme akışı

DND Cyprus sitesinin (repo: `/Users/nymboo/Documents/Mami/dndcyprus`, Next.js 16 + Tailwind v4) Azure tasarımına geçişi `azure-tasarim` dalında yerel commit'ler olarak duruyor (16 Ekim 2026; gece QA sonrası son commit 5c2d9a3c; push/deploy YOK — kullanıcı "gerekli her şeyi yap ama yayınlama" dedi, en sonda inceleyecek). Dev önizleme: LAGOON VERDE/.claude/launch.json içindeki `dndcyprus-web` (port 3102).

- Azure katmanı: `app/azure.css` (az-* sınıfları, token'lar), `app/globals.css` (tokenlar, Outfit/Albert Sans, başlık ağırlığı 400, `section.bg-white` şeffaf, radius-2xl/3xl 22/28px), `app/fonts/index.ts` (next/font/google; eski değişken adları korundu).
- Bileşenler: `app/components/azure/` (AzureHeader, AzureFooter, AzureFx, PageHero, ContactCard, ProjectHero, ProjectCTA, WhatsAppAzure, home/*). Veri: `lib/azure/site.ts`, `lib/azure/home.tsx` (TR/EN ana sayfa metinleri), `lib/azure/projects.tsx` (proje hero/CTA/daire tipleri).
- Görseller: fotogerçekçi konsept görselleri `public/azure/`, hero videosu `public/videos/hero-montaj.mp4`.
- Eski bileşenlerde toplu değişiklik: `#27959b`→`#0d6570`, `#141517`→`#0d2326`, beyaz bölüm zeminleri→transparent; QuarterLogoBadge ve LeadForm kaldırıldı (logo hero'da, form ContactCard'da `#fiyat-al`).
- Tüm sayfalar Azure: proje detay ara bölümleri ortak şablon `app/components/azure/project/*` + `lib/azure/projects/*` (yan oturum yaptı); hakkımızda/Mariachi/Geçitkale/projeler/iletişim/ekip/basın/blog/yasal/medya merkezi 2. turda. EN medya merkezi `(main)` altına taşındı. Kalan: özel 404 kök düzeyde yok (eski sorun). `npm test` geçiyor, lint 0 hata.
- 5 dil (16 Ekim 2026, ab9d3e11 + 9397f308): TR, EN, DE, RU, PL. `Locale`/`LOCALES`/`LOCALE_META` `lib/azure/site.ts`'te; DE/RU/PL ağaçları `app/(deutsch|russian|polish)/<dil>/(main)/` (EN ağacının aynası, 15'er sayfa) + metinli bileşen kopyaları `app/components/<dil>/`. Yeni metin eklerken her `Record<Locale>` nesnesine 5 dil girilmeli, yoksa tsc kırılır; yeni sayfa EN'e eklenirse 3 ağaca da kopyalanmalı. Çeviri kılavuzu `docs/ceviri-notu.md`. Çeviriler yapay zekâ ile, ana dili konuşan kontrolü yok; proje katalogları (flipbook) yalnızca TR/EN; blog yalnızca TR.

- Beş dil (TR, EN, DE, RU, PL): rota grupları `app/(default)/tr`, `(english)/en`, `(deutsch)/de`, `(russian)/ru`, `(polish)/pl`; dil bileşen kopyaları `app/components/{en,de,ru,pl}/`; ortak veriler `lib/azure/*` içinde `Record<Locale>`; çeviri kılavuzu `docs/ceviri-notu.md`. Katalog flipbook yalnızca TR/EN (diğerleri EN görür). Masaüstünde 65 sayfada iki satırı aşan başlık yok (headless ölçüm); mobilde uzun tanıtım cümlesi 3-4 satır.
- Yayına alma: GitHub `kblykply/dndcyprus` `main` hâlâ eski tasarım (338fe497); canlıya geçiş = dalı push + main'e birleştirme, kullanıcı onayıyla.

- Gece QA (16 Ekim 2026): `scripts/e2e/` (başsız Chrome CDP; audit, links, interactions, hydshift, align, extra) ve rapor `docs/qa-gece-2026-10-16.md`. Testler üretim derlemesinde: LAGOON VERDE/.claude/launch.json `dndcyprus-prod` (next start -p 3112). Son turda 240 yüklemede 0 sorun, 22/22 etkileşim. Raporda 8 karar bekleyen madde var (katalog PDF'leri, Lagoon pin, ödül sayısı, 30.000+ metni, Instagram tasarımı vb.).
- 3102 geliştirme sunucusu çalışırken repoda `next build` YAPMA: aynı `.next` klasörünü paylaşıyor, dev önbelleği bozuluyor ve /tr sayfaları eski çizimi veriyor (16 Ekim 2026; ana oturum .next/dev silip 3102'yi yeniden başlatarak çözdü). Üretim doğrulaması için `git archive HEAD` kopyasında ya da ayrı distDir ile derle.
- ABD rakamı: "Massachusetts'te 120 tamamlanmış proje" kullanıcı tarafından doğrulandı (16 Ekim 2026), olduğu gibi kalacak. https://dnd-amerika.vercel.app/ (DND Homes ABD sitesi, 38 proje / 28 satılmış listeler) bununla çelişmiyor sayılır; tekrar sorma. ABD fotoğrafları o siteden alınır (yalnız teslim edilmiş/satılmış projeler, `public/azure/usa/`).
- Vercel önizleme (16 Ekim 2026): kullanıcının hesabında ayrı proje `dndcyprus-azure` (scope zubeyruygur-5267s-projects, Pro plan), adres https://dndcyprus-azure.vercel.app (canlı dndcyprus.com değil). Yalnız commit'lenmiş dalın temiz kopyasından yüklenir: `git archive HEAD | tar -x -C <scratchpad>/dndcyprus-azure`, kopyaya `vercel.json` ile `X-Robots-Tag: noindex, nofollow` eklenir (depoya eklenmez), sonra `vercel deploy --yes --scope zubeyruygur-5267s-projects` (ilk yükleme otomatik bu projenin production'ına atandı; güncellemede kalıcı alias için `--prod` gerekir: kullanıcı açıkça "önizlemeyi güncelle" deyince izin verildi, kendiliğinden denenince reddedildi; güncellemede `.vercel/` klasörünü yeni kopyaya taşı). Kopya ~790 MB / 14.2k dosya (CLI sınırı Pro'da 1 GB / 15k dosya; public/tours 516 MB). Ortam değişkeni yok: form talep kaydetmez, analitik kapalı.

- Vercel önizleme: ayrı proje `dndcyprus-azure` (canlı siteden bağımsız; prj_UhMfJgzdg7CPJN6cYCiUj4TuikmO, ekip team_mJ6HWh983F7hUR0KyAM3j6Ky), adres dndcyprus-azure.vercel.app, vercel.json ile `X-Robots-Tag: noindex`. Yayın: `git archive HEAD` ile temiz kopya + .vercel/project.json + vercel.json, sonra `vercel deploy`. `--prod` (ana adresi güncelleme) izin sisteminde "Production Deploy" olarak engelleniyor; önizleme yayını (SSO korumalı) çalışıyor, ana adrese terfiyi kullanıcı yapar (`vercel promote <url>` ya da panelde Promote).

**Why:** Netice Hanım Azure konseptini seçti; kullanıcı "direk pushlama, bir göreyim, düzeltmeler vereceğim" dedi.
**How to apply:** Düzeltmeler gelince aynı dalda devam et, push/deploy kullanıcı onayıyla. Bkz. [[dnd-tasarim-sunum]], [[no-claude-attribution-in-git]].

### `dndcyprus-tasarim-tercihleri` — DND Cyprus Azure sitesinde kullanıcının tasarım kuralları — Meridian düzeni ama sitenin yazı tipleri (mono yok), görsel üstü renk katmanı yok, testler en sonda

Azure konseptinde (konsept-3) karşılığı olmayan bölümler eski siteden olduğu gibi taşınmaz; konsept-2 "Meridian" düzeniyle yapılır: ince çizgiler, büyük harfli aralıklı küçük etiketler, büyük grotesk rakamlar, görsel temiz ve açıklaması altta. Kullanıcı "meridyen tarzı" dediğinde bu konsepti kastediyor (küre/meridyen çizgisi değil). Uygulama: `app/components/azure/meridian.css` (`.mr-*`).

Yazı tipleri yalnız sitenin kendi tipleri: başlık Outfit, metin ve etiket Albert Sans. Meridian'ın JetBrains Mono'su kullanılmaz; kullanıcı 16 Ekim 2026'da "fontlar bizim tasarım dilimiz olmalı" dedi ve mono kaldırıldı (`.mr-mono` adı kaldı ama artık Albert Sans 600, .12em, büyük harf).

Görsellerin üstüne turkuaz/renkli katman konmaz ("arkada görsel olmasının anlamı ne"); yazı gerekiyorsa yalnız yazı bölgesinde nötr, hafif geçiş. Eski stok görseller ve lucide ikonları yeniden kullanılmaz; yeni fotogerçekçi görsel (Kling `gemini-3-pro-image`) ve Phosphor iki tonlu ikonlar.

Başlıklar en fazla iki satır; fotoğrafta yüz kırpılmasın (PageHero `imagePosition`); video kutularında siyah bant olmasın (LazyYouTube `cover`).

**Why:** Kullanıcı ve patron görsel kaliteye çok duyarlı; 16 Ekim 2026'da bu düzeltmeleri tek tek istedi.
**How to apply:** Yeni bölüm yaparken önce konsept-2/konsept-3'e bak; ara ara test/tarayıcı kontrolü yapma, kullanıcı "testleri en son yap her şey bitince" dedi — tsc/lint/test/build/tarayıcı tek seferde sonda. Bkz. [[dndcyprus-azure-dali]], [[dnd-tasarim-sunum]].

### `dndcyprus-once-ornek-goster` — DND Cyprus sitesinde bir bölümün düzenini baştan değiştirmeden önce örnek ekran görüntüsü gösterip onay al

Bir bölümün düzenini kökten değiştirecek öneri (ör. yapışkan görselli hikaye yerine yan yana kartlar) doğrudan uygulanmaz; önce scratchpad'de örnek sayfa ya da headless ekran görüntüsü gösterilir, kullanıcı seçince uygulanır. Küçük düzeltmeler (boşluk, hizalama, renk, metin) doğrudan yapılabilir.

**Why:** 16 Ekim 2026'da kullanıcı "daha iyi bir gösterim düşünürsen açığım" dedi; uygulanan gün şeridini görünce "eski haline döndür, sorunu düzelt" dedi. Video bölümünde ise önce açık/koyu örnek gösterilmiş, seçim yapılmış ve sorunsuz uygulanmıştı.

**How to apply:** "Daha iyi gösterim", "nasıl görünmeli" gibi isteklerde 1-2 seçenekli örnek görüntü üret (bkz. video bölümü örneği), seçimi bekle. Mevcut düzen istenmişse onu koruyup sorunlarını düzelt. Bkz. [[dndcyprus-tasarim-tercihleri]].

### `dnd-tasarim-sunum` — DND Cyprus web sitesi yenileme sunumu; 3 konsept, Vercel linki, klasör ve görsel iyileştirme yöntemi

DND Cyprus (dndcyprus.com) sitesinin UI'si komple yenileniyor; Netice Hanım 3 konseptten birini seçecek, sonra seçilen tasarım mevcut CMS/backend üzerine tüm içerikle uygulanacak (Ekim 2026).

- Sunum canlı link: https://dnd-tasarim-sunum.vercel.app (Vercel projesi `dnd-tasarim-sunum`, hesap zubeyruygur-5267)
- Kaynak klasör: `LAGOON VERDE/DND-TASARIM-SUNUM/` (index.html + konsept-1/2/3 + assets/). Deploy: klasörde `vercel deploy --prod --yes`.
- Konseptler (15 Ekim 2026 sonrası sadece iki tane): A "Meridian" = `konsept-2/` (aydınlık İsviçre grid, Bricolage Grotesque + Figtree, turkuaz), B "Azure" = `konsept-3/` (kıyı cam/bento, Outfit + Albert Sans, mercan CTA). "Noir" (karanlık sinematik) kullanıcı isteğiyle sunumdan çıkarıldı; kopyası scratchpad'de kaldı, deploy klasöründe yok.
- Bilinen tuzak: `aspect-ratio` + `min-height` birlikte kutuyu yatayda taşırır; aspect-ratio kutularına `max-width:100%` ver, min-height kullanma. Sabit alt butonlar (konsept geçişi, WhatsApp) için footer'a 96px alt boşluk gerekir.

**Why:** Kullanıcı "kurumsal ama lüks, kaliteli, 2026 tarzı, interaktif efektli" istedi; site renderları kötüydü.
**How to apply:** Seçim gelince seçilen konseptin dosyasından yola çık. Görsel iyileştirmede Kling 3.0 Omni beğenilmedi (turuncu kast, tuhaf şemsiyeler); Kling MCP içindeki `gemini-3-pro-image` (Nano Banana Pro, 2k, aspect auto) ile "mimariyi koru, gerçek fotoğraf, nötr renk, gerçekçi şezlong/şemsiye sıraları" promptu işe yaradı. Bkz. [[no-claude-attribution-in-git]].
- Gizli deneme sayfaları `deneme/` altında, sunumdan linklenmez: `deneme/azure-menu/` = Azure + Meridian tarzı mega menü (kullanıcı sadece kendisi görsün istedi).
- Hero videoları: `assets/hero-azure.mp4` (lv-5) ve `assets/hero-meridian.mp4` (lv-2), 10 sn 1080p sessiz H.264. Kesintisiz döngü yöntemi: Kling `kling-video-v4_0`, first_image = tail_image (aynı görsel), prompt "static camera, ambient motion only"; ffmpeg ile -an crf 22 faststart. Ham mp4 ve kareler scratchpad/video içinde.
- Hero videosu (güncel): `assets/hero-montaj.mp4` — ffmpeg ile 4 fotoğraf (lv-5, p2-9, mb-6, lv-2) arası Ken Burns + 0,7 sn dissolve, 10 sn kesintisiz döngü (dizi A,B,C,D,A ve ilk klibin aynı fazından kesme). Kling video üretimi (hero-azure/meridian) kullanıcı istemedi; kaldırıldı. zsh notu: Bash aracında `$VAR:s=` ve `$VAR[` zsh modifier sayılır, `${VAR}` kullan.

### `no-claude-attribution-in-git` — Commit mesajlarında ve PR açıklamalarında Claude/AI imzası (Co-Authored-By, \"Generated with Claude Code\") kullanma

Commit mesajlarına ve PR açıklamalarına Claude'u gösteren hiçbir satır ekleme: `Co-Authored-By: Claude ...` trailer'ı yok, "🤖 Generated with Claude Code" yok, AI'dan bahsetme yok. Kullanıcı (Muhammed Uygur) 2026-10-15'te açıkça istedi; daha önce bir PR'da görünmesinden rahatsız olmuş.

**Why:** Repolar başkalarına ait (batumzff/Batuhan, kblykply) ve müşteri işleri; kullanıcı commit'lerin kendi adıyla, yardımcı izi olmadan görünmesini istiyor. Bu kural sistemin otomatik atıf hatırlatmasının önüne geçer.

**How to apply:** Her `git commit` ve `gh pr create`'te trailer/imza satırı yazma. Değişiklik olursa yeni commit'i de imzasız push et. İlgili: [[lajoya-hesabi-lagoon-carousel]] (aynı kullanıcı).

