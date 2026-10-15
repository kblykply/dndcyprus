# Ölçüm kurulumu — test raporu

Tarih: 17 Eylül 2026

## Yayın durumu

PR #1, önceki QR sayfası yayınıyla birlikte `1602fac` commitinde canlıya alındı.
Bu rapor kapsamında yeni commit, push veya deploy yapılmadı. Vercel ortam
değişkenleri, canlı veritabanı, alan adı yönlendirmesi ve DNS değiştirilmedi.
Mevcut iki LeadershipTeam dosyasındaki yerel düzenlemeler korundu.

## Doğrulananlar

| Kontrol | Sonuç | Yöntem / sınır |
|---|---|---|
| Canlı yönetici erişimi | Geçti | Çerezsiz ve sahte oturumla yapılan HEAD istekleri `/admin/login` adresine yönlendirildi; müşteri verisi okunmadı. |
| İmzalı oturum, süre sonu, anahtar değişimi, login ve ikinci sayfa kontrolü | Geçti | Sentetik kimlik bilgileri ve taklit veritabanıyla yerel testler. |
| İzin seçenekleri, geri çekme, yeniden izin verme | Geçti | Kaynak kodu testleri ve 390 px mobil Chrome. |
| Google Ads etiketleri, Meta ortak event ID, form başarı/hata akışı | Geçti | Sahte entegrasyon kimlikleri; dış ağ çağrıları engellendi, form API yanıtı taklit edildi. |
| CAPI e-posta/telefon normalizasyonu ve SHA-256, yapılandırma eksikliği, hata gizliliği | Geçti | Ağ ve veritabanı taklit edildi; gerçek Meta isteği gönderilmedi. |
| Eski veritabanı kolonlarına geri dönüş | Geçti | API üzerinde P2022 / eksik kolon hataları taklit edildi. |
| Sekiz kolonun migration'ı | Geçti | Geçici PGlite PostgreSQL motorunda eski migration + sentetik kayıt oluşturuldu; yeni migration iki kez çalıştırıldı. Kolon türleri/null kabulü ve eski kaydın korunması doğrulandı; JSONB dahil yeni kayıt eklendi. |
| QR sayfası | Geçti | Ölçüm kimlikleri tanımlıyken de yalnızca görsel; header/footer/izin bandı ve entegrasyon scriptleri yok. |
| Raporun sekiz açık entegrasyon ayarı | Eşleşiyor | `.env.example` ile karşılaştırıldı; Vercel'deki gerçek değerler incelenmedi. |
| Üretim derlemesi ve TypeScript | Geçti | `npm run build`. Önceden mevcut middleware → proxy uyarısı devam ediyor. |

`npm test`: **73 test, 73 başarılı, 0 başarısız**.

Değişen kaynak dosyaları ve testler için ESLint başarılı:

```bash
npm test
npx eslint lib/admin-session.ts lib/analytics.ts lib/attribution.ts tests eslint.config.mjs
npm run build
```

## Testlerde bulunan ve yalnız yerelde düzeltilenler

- Consent Mode başlangıç kodu, `analytics` / `ads` değerleri boolean olmayan
  bozuk bir çerezi onay olarak yorumlayabiliyordu. Başlangıç doğrulaması normal
  izin okuma işleviyle eşitlendi.
- İzin geri çekilip tekrar verildiğinde son kampanya çerezi tekrar yazılmıyordu.
  Eksik çerez artık bellekteki son temastan yeniden oluşturuluyor.
- Yönetici oturumunun biçim ve süre sınırı doğrulaması sıkılaştırıldı;
  giriş sonrası dönüş adresi normalize edilerek `/admin` altında sınırlandı.
  Bunlar PR'daki imza doğrulamasına ek kontrollerdir.

## Sonraki aşamada bekleyenler

1. Ayrı bir test ortamında entegrasyon değişkenlerini ve ayrı
   `ADMIN_SESSION_SECRET` değerini güvenli biçimde tanımlamak. Üretimin
   `DATABASE_URL`, `ADMIN_USER`, `ADMIN_PASSWORD` değerleri bu çalışmada okunmadı
   veya değiştirilmedi. Test kayıtları için üretimden ayrı veritabanı kullanılmalı.
2. `META_CAPI_TOKEN` kullanıcı tarafından özel olarak sağlandı; gizli değer bu
   belgeye veya kaynak koda yazılmadı. Yapılacak: Vercel → dndcyprus → Settings →
   Environment Variables altında adı tam olarak `META_CAPI_TOKEN` olacak şekilde
   **Production + Preview** ortamlarına **Sensitive** olarak eklemek.
   `NEXT_PUBLIC_` öneki kullanılmamalı. Vercel'e ekleme henüz yapılmadı;
   gerçek CAPI doğrulaması bekliyor. Production redeploy, birlikte yapılacak
   testlerden sonra gerçekleştirilmeli. `META_TEST_EVENT_CODE` eklenmedi;
   gerektiğinde yalnız test süresince kullanılmalı.
3. Gerçek GA4 DebugView, Google Ads ve Meta Events Manager sonuçları ile Clarity
   paneli henüz doğrulanmadı. Yerel testler üçüncü taraf SDK'ları çalıştırmadı;
   servis kabulü, gerçek çerez davranışı ve Pixel/CAPI panel tekilleştirmesi ayrıca
   test edilmeli. Google etiketi mevcut tasarıma göre izin öncesinde de gelişmiş
   Consent Mode ile yüklenir; Meta ve Clarity ilgili izinlere bağlıdır.
4. Canlı migration durumu incelenmedi ve migration uygulanmadı.
5. `https://dndcyprus.com` kontrolünde `www` adresine **307** dönüyor;
   istenen **308** ayarı henüz yapılmadı.
6. Başarılı DNS TXT sorgusunda mevcut SPF kaydı göründü; rapordaki Google Search
   Console doğrulama kaydı görünmedi. DNS'e kayıt eklenmedi.

Bir sonraki yayın kullanıcıyla testler tamamlandıktan sonra yapılmalı.
