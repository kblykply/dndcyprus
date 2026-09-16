# Ölçüm ve Reklam Takibi Kurulumu

Bu belge, dndcyprus.com üzerindeki GA4, Google Ads, Meta Pixel, Meta Conversions API (CAPI), çerez izni ve kaynak (UTM) takibinin nasıl çalıştığını ve canlıya alınırken yapılacakları anlatır.

> Gizlilik ve Çerez Politikası metni (`/tr/privacy`, `/en/privacy`) ve izin akışı yayına almadan önce KVKK/GDPR konusunda bir hukukçuya kontrol ettirilmelidir.

## 1. Genel yapı

| Parça | Dosya | Görevi |
|---|---|---|
| Consent Mode varsayılanı | `app/layout.tsx` (`beforeInteractive`), metin `lib/analytics.ts` → `CONSENT_DEFAULT_SCRIPT` | Her etiketten önce 4 izin türünü `denied` yapar; `dnd_consent` çerezi varsa hemen `update` gönderir |
| Ölçüm kökü | `app/components/analytics/AnalyticsRoot.tsx` | gtag.js / GTM / Meta Pixel yükleme, sayfa görüntüleme, `view_item`, tıklama olayları, izin bandı. `/admin` altında hiçbir şey yapmaz |
| İzin bandı | `app/components/analytics/ConsentBanner.tsx` | TR/EN bant; `window.dndConsent.open()` ile yeniden açılır |
| Olay API'si | `lib/analytics.ts` → `track()` | dataLayer + GA4 + Ads dönüşümü + Meta eşlemesi |
| Kaynak takibi | `lib/attribution.ts` | UTM / gclid / fbclid → `dnd_ft`, `dnd_lt` (yalnızca izinle) |
| Form gönderimi | `lib/lead-submit.ts` | Tüm formlar; `eventId`, kaynak ve izin bayraklarıyla `/api/contact` |
| Sunucu | `app/api/contact/route.ts`, `lib/meta-capi.ts` | Kayıt + reklam izni varsa Meta CAPI `Lead` |
| Fiyat formu | `app/components/lead/LeadForm.tsx` | Proje sayfalarındaki ana dönüşüm formu |

Her entegrasyon, ilgili ortam değişkeni boşsa (veya biçimi hatalıysa) tamamen devre dışıdır. Hiçbiri tanımlı değilken site bugünkü gibi çalışır; yalnızca izin bandı görünür.

## 2. Ortam değişkenleri (Vercel → Project → Settings → Environment Variables)

`NEXT_PUBLIC_*` değerleri derleme sırasında koda gömülür: değiştirdikten sonra **yeniden deploy** gerekir.

Kopyalanabilir örnek dosya: repo kökündeki `.env.example`.

| Değişken | Nereden alınır | Örnek biçim |
|---|---|---|
| `NEXT_PUBLIC_GA4_ID` | GA4 → Yönetici → Veri akışları → Web akışı → Ölçüm kimliği | **`G-M944YNCLQ2`** (dndcyprus.com mülkü, hazır) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads → Hedefler → Dönüşümler → dönüşüm işlemi → Etiket kurulumu → "Etiketi kendiniz yükleyin" → `send_to` değerinin `/` öncesi | `AW-123456789` |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | "Form – Fiyat talebi" dönüşümünün `send_to` değerinde `/` sonrası | `AbCdEfGhIjKlMnOp` |
| `NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL` | "WhatsApp tıklaması" dönüşümünün etiketi | `QrStUvWxYz12345` |
| `NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL` | "Telefon tıklaması" dönüşümünün etiketi | `Z9y8X7w6V5u4T3s` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Events Manager → Veri kaynakları → Pixel → Kimlik (yalnızca rakam) | `1234567890123456` |
| `NEXT_PUBLIC_GTM_ID` (isteğe bağlı) | tagmanager.google.com → Container kimliği | `GTM-ABC1234` |
| `META_CAPI_TOKEN` (sunucu, **gizli**) | Events Manager → Pixel → Ayarlar → Dönüşüm API'si → "Erişim anahtarı oluştur" | `EAAG…` (uzun metin) |
| `META_GRAPH_API_VERSION` (sunucu) | developers.facebook.com/docs/graph-api/changelog → güncel sürüm | `v2X.0` biçiminde |
| `META_TEST_EVENT_CODE` (sunucu, isteğe bağlı) | Events Manager → Pixel → Test olayları → Sunucu olayları için test kodu | `TEST12345` |

Notlar:
- `META_CAPI_TOKEN` için Vercel'de "Sensitive" seçin; `NEXT_PUBLIC_` önekiyle **asla** tanımlamayın. Kod anahtarı loglamaz.
- `META_GRAPH_API_VERSION` boşsa CAPI gönderilmez ve logda bir kez `META_CAPI_SKIPPED` uyarısı görünür (sürüm koda gömülmedi; Meta eski sürümleri kapattıkça bu değeri güncelleyin).
- `META_TEST_EVENT_CODE` yalnızca test sırasında tanımlı olmalı; testten sonra silip yeniden deploy edin.
- Önce **Preview** ortamında tanımlayıp test edin, sonra **Production**'a ekleyin.

## 3. Çerez izni nasıl çalışır

1. Sayfa açılırken (hiçbir etiketten önce) Consent Mode v2 varsayılanı: `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` = `denied`, `wait_for_update: 500`, `ads_data_redaction: true`, `url_passthrough: true`.
2. `dnd_consent` çerezi (`{v:1, analytics, ads, ts}`, 180 gün, SameSite=Lax, https'te Secure) varsa aynı script hemen `gtag('consent','update', …)` gönderir.
3. gtag.js (GA4/Ads) izin beklemeden yüklenir (gelişmiş Consent Mode): izin yoksa çerez yazmaz, yalnızca çerezsiz sinyal gönderir.
4. Meta Pixel **yalnızca reklam izni verildikten sonra** yüklenir; izin geri çekilirse `fbq('consent','revoke')` çağrılır, `_fbp/_fbc/_gcl_*` çerezleri silinir. Analitik izni geri çekilirse `_ga*` silinir; ikisi de kapalıysa `dnd_ft/dnd_lt` silinir.
5. Bant seçenekleri: "Tümünü kabul et", "Yalnızca zorunlu", "Tercihler" (Analitik / Reklam anahtarları). Gizlilik sayfasındaki buton veya konsoldan `window.dndConsent.open()` bandı tekrar açar.

Meta CAPI yalnızca form gönderilirken tarayıcı `consent.ads === true` bildirirse çalışır. Google gelişmiş dönüşüm verisi (`user_data`) da yalnızca reklam izniyle ayarlanır.

## 4. Olaylar

| Olay (`track`) | Ne zaman | GA4 | Google Ads | Meta |
|---|---|---|---|---|
| `page_view` | Her sayfa / App Router gezinmesi | `page_view` | yeniden pazarlama | `PageView` |
| `view_item` | `/tr` veya `/en` altında `lagoon-verde`, `perla`, `perla-ii`, `la-joya`, `gecitkale` | `view_item` (`item_id`, `item_name`, `items`) | – | `ViewContent` |
| `generate_lead` | Form başarıyla kaydedildi (`project`, `form`) | `generate_lead` | Form dönüşümü (`transaction_id` = eventId) | `Lead` (`eventID` = CAPI `event_id`) |
| `contact_whatsapp` | `wa.me` / `api.whatsapp.com` bağlantısı | `contact_whatsapp` | WhatsApp dönüşümü | `Contact` |
| `contact_phone` | `tel:` bağlantısı | `contact_phone` | Telefon dönüşümü | `Contact` |
| `contact_email` | `mailto:` bağlantısı | `contact_email` | – | `Contact` |
| `brochure_download` | `.pdf` bağlantısı veya `data-track` | `brochure_download` (`file_name`, `file_extension`, `link_url`) | – | `BrochureDownload` (özel) |
| `price_request_click` | `data-track="price_request_click"` | aynı ad | – | `PriceRequest` (özel) |
| `tour_start` | `data-track="tour_start"` | aynı ad | – | `VirtualTour` (özel) |
| `floorplan_view` | `data-track="floorplan_view"` | aynı ad | – | `FloorPlanView` (özel) |

Ek parametreler: `project` (proje sayfasındaysa), `placement` (`floating_button`, `header`, `footer`, `content` veya `data-track-label`), `label`.

Yeni bir tıklamayı ölçmek için tıklanan öğeye `data-track="<olay_adı>"` ve isteğe bağlı `data-track-label="..."` eklemek yeterlidir (olay adı yukarıdaki listeden olmalı).

## 5. GA4

1. GA4 mülkü → Web veri akışı oluşturun (`https://www.dndcyprus.com`) → Ölçüm kimliğini `NEXT_PUBLIC_GA4_ID` yapın.
2. Veri akışı → Gelişmiş ölçüm → **"Tarayıcı geçmişi olaylarına dayalı sayfa değişiklikleri"ni kapatın** (sayfa görüntülemeleri koddan gönderiliyor; açık kalırsa çift sayılır).
3. Yönetici → Etkinlikler → **Önemli etkinlik (key event)** olarak işaretleyin:
   - `generate_lead` (ana hedef)
   - `contact_whatsapp`, `contact_phone`
   - İsteğe bağlı: `brochure_download`, `price_request_click`
4. Yönetici → Özel tanımlar → etkinlik kapsamlı özel boyutlar: `project`, `form`, `placement`, `label`.
5. Yönetici → Veri saklama → 14 ay.
6. Yönetici → Ürün bağlantıları → Google Ads bağlantısı.

## 6. Google Ads

1. Hedefler → Dönüşümler → Yeni dönüşüm işlemi → **Web sitesi** → "Manuel olarak kod ile":

| Dönüşüm işlemi | Kategori | Birincil/İkincil | Sayım | Ortam değişkeni |
|---|---|---|---|---|
| Form – Fiyat talebi | Potansiyel müşteri formu gönderme | **Birincil** | Bir | `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` |
| WhatsApp tıklaması | İletişim | İkincil | Bir | `NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL` |
| Telefon tıklaması | Telefon araması / İletişim | İkincil | Bir | `NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL` |

2. Her işlemde Etiket kurulumu → "Etiketi kendiniz yükleyin" → olay snippet'indeki `send_to: 'AW-123456789/AbCdEf…'`: `/` öncesi `NEXT_PUBLIC_GOOGLE_ADS_ID`, sonrası etikettir. Sayfaya snippet **eklemeyin**; kod zaten gönderiyor.
3. Form dönüşümünde **Gelişmiş dönüşümler** → açın → yöntem "Google etiketi" → müşteri verisi şartlarını kabul edin. (Kod, form sonrası e-posta ve telefonu `gtag('set','user_data')` ile verir; Google etiketi göndermeden önce hash'ler.)
4. GA4'ten içe aktarılan önemli etkinlikleri (`generate_lead` vb.) Ads'de **ikincil** bırakın; aksi halde aynı lead iki kez sayılır.
5. Otomatik etiketleme (gclid) açık kalsın.
6. Birkaç saat sonra Dönüşümler sayfasında durum "Dönüşüm kaydediliyor" ve Tanılama'da "Consent Mode" etkin görünmelidir.

## 7. Meta Pixel ve Conversions API

1. Events Manager → Veri kaynağı bağla → Web → Pixel oluşturun → kimliği `NEXT_PUBLIC_META_PIXEL_ID` yapın.
2. Pixel → Ayarlar → Dönüşüm API'si → "Manuel kurulum" / "Erişim anahtarı oluştur" → anahtarı `META_CAPI_TOKEN` olarak Vercel'e (Sensitive) ekleyin.
3. `META_GRAPH_API_VERSION` değerini güncel Graph API sürümü yapın.
4. Alan adı doğrulaması: `facebook-domain-verification` meta etiketi zaten kök layout'ta var; Business Manager → Marka güvenliği → Alan adları'nda `dndcyprus.com` doğrulandı mı kontrol edin.
5. Pixel ayarlarında "Trafik izinleri" kullanılıyorsa Vercel preview alan adını test süresince izin listesine ekleyin.
6. Kampanyalarda dönüşüm konumu "Web sitesi", optimizasyon olayı **Lead**. İhtiyaç olursa `BrochureDownload`, `PriceRequest`, `VirtualTour` için özel dönüşüm oluşturun.
7. Tekilleştirme: Pixel `Lead` olayı `eventID`, CAPI `event_id` ile aynı UUID'yi taşır; Events Manager'da "Tarayıcı ve Sunucu – tekilleştirildi" görünmelidir.

## 8. GTM (isteğe bağlı)

`NEXT_PUBLIC_GTM_ID` tanımlıysa GTM de yüklenir ve aynı `dataLayer`'ı kullanır (`{event: 'generate_lead', project, form, event_id}` vb.).

- **GA4, Google Ads ve Meta Pixel etiketlerini GTM içinde tekrar kurmayın** — kod zaten gönderiyor, çift sayım olur.
- GTM'i yalnızca ek pazarlama etiketleri (ör. LinkedIn, TikTok, Hotjar) için kullanın ve her etikete GTM'in yerleşik izin kontrolünü (Consent Settings → `ad_storage` / `analytics_storage`) ekleyin.

## 9. UTM şablonları

**Meta** (reklam düzeyi → İzleme → URL parametreleri):

```
utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}
```

**Google Ads** (Hesap ayarları → İzleme → Nihai URL son eki):

```
utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={creative}&utm_term={keyword}
```

- Kampanya adlarında boşluk ve Türkçe karakter kullanmayın; önerilen düzen: `lagoonverde_tr_lead_2026-09`.
- `{campaignid}` sayısal gelir; okunur ad isterseniz kampanya düzeyinde son ek tanımlayıp `utm_campaign=lagoonverde_tr_search` yazabilirsiniz.
- UTM değerlerine asla e-posta/telefon gibi kişisel veri koymayın (`@` içeren değerler kod tarafından atılır).
- WhatsApp butonu mesajın sonuna yalnızca `utm_source` ve `utm_campaign`'den oluşan kısa bir referans ekler: `(Ref: facebook-lagoonverde_tr_lead_2026-09)`. Satış ekibi WhatsApp lead'lerinin kaynağını buradan görebilir.

## 10. Veritabanı güncellemesi (migration)

Yeni migration: `prisma/migrations/20260915120000_lead_attribution/migration.sql` — `ContactMessage` tablosuna boş bırakılabilir `project`, `unitType`, `form`, `source`, `campaign`, `pageUrl`, `eventId`, `attribution (JSONB)` kolonlarını `ADD COLUMN IF NOT EXISTS` ile ekler (tekrar çalıştırmak güvenlidir).

**Kod migration'dan önce yayına çıkabilir:** kolonlar yoksa API kaydı eski kolonlarla yapar (Vercel logunda `CONTACT_API_LEGACY_COLUMNS`), `/admin/leads` sarı uyarı gösterir. Migration sonrası yeniden deploy gerekmez.

### Yöntem A — Prisma ile (önerilen)

```bash
# Production bağlantı bilgisini yerel dosyaya çek (dosyayı commit etmeyin)
vercel env pull .env.production.local --environment=production

# Neon/Vercel Postgres'te migration için havuzsuz (unpooled) adres kullanın
DATABASE_URL="<DATABASE_URL_UNPOOLED değeri>" npx prisma migrate status
DATABASE_URL="<DATABASE_URL_UNPOOLED değeri>" npx prisma migrate deploy
```

`migrate status/deploy` **P3005** ("database schema is not empty") verirse veritabanı daha önce `db push` ile kurulmuştur. Bir kez temel çizgi oluşturun, sonra deploy edin:

```bash
DATABASE_URL="…" npx prisma migrate resolve --applied 20251120112928_init_contact_messages
DATABASE_URL="…" npx prisma migrate deploy
```

### Yöntem B — SQL editöründen

Vercel → Storage → veritabanı → "Open in Neon" → SQL Editor'e `migration.sql` içeriğini yapıştırıp çalıştırın. Prisma migration geçmişi kullanılıyorsa ardından:

```bash
DATABASE_URL="…" npx prisma migrate resolve --applied 20260915120000_lead_attribution
```

Kontrol: `/admin/leads` sayfasındaki sarı uyarı kaybolmalı, yeni kayıtlarda Proje/Tip/Kaynak dolu gelmelidir.

## 11. Test listesi

**İzin**
- [ ] Gizli pencerede ilk ziyaret: bant görünür; DevTools → Application → Cookies'te `_ga`, `_fbp`, `_gcl_*` yok.
- [ ] Tag Assistant (tagassistant.google.com) → Consent sekmesi: sayfa açılışında 4 tür `denied`; "Tümünü kabul et" sonrası `granted`; "Yalnızca zorunlu" sonrası `denied` kalır.
- [ ] Meta Pixel Helper: izin yokken Pixel yok; reklam izni verilince aynı sayfada `PageView` (proje sayfasında `ViewContent` de).
- [ ] `/tr/privacy` → "Çerez tercihlerini değiştir" → Reklam kapat → `_fbp` silinir, Pixel Helper yeni olay göstermez.
- [ ] 375 px genişlikte bant WhatsApp butonunun üstünde durur, butonu kapatmaz.
- [ ] `/admin/leads` açıkken Network sekmesinde `googletagmanager` / `fbevents` isteği yok.

**GA4 (DebugView)** — Tag Assistant ile siteye bağlanınca DebugView'da cihaz görünür.
- [ ] Menüden sayfa değiştirince tek bir `page_view` (çift değil).
- [ ] Proje sayfasında `view_item` (`item_id` = `lagoon-verde`).
- [ ] WhatsApp butonu → `contact_whatsapp` (`placement` = `floating_button`), `tel:` → `contact_phone`, PDF → `brochure_download`.
- [ ] Form gönderimi → `generate_lead` (`project`, `form`).

**Google Ads**
- [ ] Tag Assistant'ta form sonrası `conversion` isteği `send_to=AW-…/<lead etiketi>`, WhatsApp/telefon tıklamasında ilgili etiketler.
- [ ] Reklam izniyle form gönderiminde istekte gelişmiş dönüşüm verisi (hash'lenmiş `em`) bulunur; izin yokken bulunmaz.

**Meta Events Manager → Test olayları** (`META_TEST_EVENT_CODE` tanımlı iken)
- [ ] Reklam izniyle LeadForm gönder: `Lead` hem **Tarayıcı** hem **Sunucu** kaynaklı gelir ve tekilleştirildi olarak görünür (aynı Event ID).
- [ ] Sunucu olayında e-posta/telefon eşleşme parametreleri, `fbp` ve (fbclid ile gelindiyse) `fbc` var.
- [ ] Reklam izni yokken form gönder: Test olaylarında hiçbir `Lead` görünmez.
- [ ] Vercel logunda `META_CAPI_FAILED` / `META_CAPI_SKIPPED` yok. Test bitince `META_TEST_EVENT_CODE`'u silip yeniden deploy et.

**Uçtan uca kaynak takibi**
- [ ] `https://<preview>/tr/lagoon-verde?utm_source=facebook&utm_medium=paid_social&utm_campaign=lagoonverde_tr_lead_2026-09&fbclid=test123` aç → kabul et → WhatsApp mesajında `(Ref: facebook-lagoonverde_tr_lead_2026-09)` var.
- [ ] Başka bir sayfaya git, geri dön, LeadForm'u gönder.
- [ ] `/admin/leads`: Proje = `lagoon-verde`, Tip dolu, Kaynak = `facebook / paid_social`, kampanya adı görünür; "Ayrıntı" altında ilk/son temas ve sayfa adresi.
- [ ] "Yalnızca zorunlu" ile aynı test: kayıt yine kaynak bilgisiyle gelir (bellekte tutulur), ama `dnd_ft/dnd_lt` çerezi oluşmaz ve CAPI gönderilmez.
- [ ] Honeypot: `company` alanı doldurulmuş istek `{ok:true}` döner ama kayıt oluşmaz.
