// app/kullanim-kosullari/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | DND Cyprus",
  description:
    "DND Cyprus web sitesinin kullanım şartları, sorumluluk redleri, fikri mülkiyet ve uyuşmazlık hükümleri.",
};

export default function TermsPage() {
  const updatedAt = "30 Ekim 2025";

  const toc: Array<[string, string]> = [
    ["giris", "1. Kapsam ve Kabul"],
    ["tanimlar", "2. Tanımlar"],
    ["hizmet", "3. Hizmetin Kapsamı"],
    ["bilgilendirme", "4. Bilgilendirme Niteliği"],
    ["yukumlulukler", "5. Kullanıcı Yükümlülükleri"],
    ["yasakli", "6. Yasaklı Kullanım"],
    ["formlar", "7. Hesaplar ve İletişim/Formlar"],
    ["teklif", "8. Teklifler, Fiyatlar ve Hatalar"],
    ["ip", "9. Fikri Mülkiyet"],
    ["kullanici-icerigi", "10. Kullanıcı İçeriği ve Lisans"],
    ["baglantilar", "11. Üçüncü Taraf Bağlantılar"],
    ["garantiler", "12. Garantilerin Reddi"],
    ["sorumluluk", "13. Sorumluluğun Sınırlandırılması"],
    ["tazminat", "14. Tazminat"],
    ["hukuk", "15. Uygulanacak Hukuk ve Yargı"],
    ["degisiklik", "16. Değişiklikler"],
    ["butunluk", "17. Sözleşmenin Bütünlüğü"],
    ["iletisim", "18. İletişim"],
  ];

  return (
    <main className="min-h-svh bg-white text-neutral-900">
      <header className="border-b border-neutral-200 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">Kullanım Koşulları</h1>
          <span className="text-sm text-neutral-500">Yürürlük: {updatedAt}</span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_1fr]">
        {/* TOC */}
        <nav aria-label="İçindekiler" className="md:sticky md:top-24 md:self-start">
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="mb-3 text-sm font-medium text-neutral-600">İçindekiler</p>
            <ul className="space-y-2 text-sm">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-neutral-600 transition hover:text-neutral-900">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* CONTENT */}
        <div className="prose prose-neutral max-w-none prose-h2:mt-10 prose-h2:scroll-mt-24">
          <section id="giris">
            <h2>1. Kapsam ve Kabul</h2>
            <p>
              Bu Kullanım Koşulları (“Koşullar”),{" "}
              <Link href="/" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              alan adı ve alt sayfalarında sunulan hizmet ve içeriklerin
              (topluca “Hizmet”) kullanımını düzenler. Hizmeti kullanarak bu
              Koşulları ve varsa ilişkili politikaları (örn. Gizlilik Politikası)
              kabul etmiş sayılırsınız.
            </p>
          </section>

          <section id="tanimlar">
            <h2>2. Tanımlar</h2>
            <ul>
              <li>
                <strong>Şirket / DND Cyprus:</strong> Aşağıda İletişim bölümünde
                bilgileri yer alan teşebbüs.
              </li>
              <li>
                <strong>Kullanıcı:</strong> Hizmeti ziyaret eden veya kullanan
                gerçek/tüzel kişi.
              </li>
              <li>
                <strong>İçerik:</strong> Metin, görsel, video, doküman ve diğer
                materyaller.
              </li>
            </ul>
          </section>

          <section id="hizmet">
            <h2>3. Hizmetin Kapsamı</h2>
            <p>
              Hizmet; DND Cyprus projeleri, etkinlikleri ve kurumsal bilgiler
              hakkında tanıtım ve iletişim amaçlı içerik sunar. Hizmetin belirli
              bölümleri zaman zaman güncellenebilir, geçici olarak
              kullanılamayabilir veya tamamen sonlandırılabilir.
            </p>
          </section>

          <section id="bilgilendirme">
            <h2>4. Bilgilendirme Niteliği</h2>
            <p>
              Sitedeki içerikler bilgilendirme amaçlıdır; <em>yatırım tavsiyesi,
              hukuki görüş veya bağlayıcı teklif</em> niteliği taşımaz. Proje
              görselleri, metinler ve teknik bilgiler örnek/temsili olabilir;
              değişiklik yapma hakkı saklıdır. Satış, teslim ve benzeri ticari
              süreçler, ayrıca düzenlenecek sözleşme ve resmi belgelere tabidir.
            </p>
          </section>

          <section id="yukumlulukler">
            <h2>5. Kullanıcı Yükümlülükleri</h2>
            <ul>
              <li>Hizmeti yürürlükteki mevzuata ve bu Koşullara uygun kullanmak,</li>
              <li>Başkasının haklarını (fikri mülkiyet, kişilik, gizlilik) ihlal etmemek,</li>
              <li>Yanıltıcı, yanlış veya yasa dışı bilgi göndermemek,</li>
              <li>Site güvenliğini tehlikeye atacak girişimlerde bulunmamak.</li>
            </ul>
          </section>

          <section id="yasakli">
            <h2>6. Yasaklı Kullanım</h2>
            <p>
              Tersine mühendislik, otomatik veri çekme (scraping) ve yetkisiz
              erişim girişimleri; zararlı yazılım iletimi; spam; Hizmetin
              işleyişini bozacak yoğun istek göndermek gibi eylemler yasaktır.
            </p>
          </section>

          <section id="formlar">
            <h2>7. Hesaplar ve İletişim/Formlar</h2>
            <p>
              Sitedeki iletişim/başvuru formlarında paylaştığınız bilgilerin
              doğruluğundan siz sorumlusunuz. Ticari iletiler için gerekli
              onaylarınız ayrıca alınır ve dilediğinizde geri çekebilirsiniz.
            </p>
          </section>

          <section id="teklif">
            <h2>8. Teklifler, Fiyatlar ve Hatalar</h2>
            <p>
              Web sitesindeki fiyat/teklif/uygunluk bilgileri ön bilgilendirme
              niteliğindedir ve bildirimsiz değiştirilebilir. Yazım/sunum
              hataları fark edilirse düzeltilir; bu tür hatalardan Şirket makul
              ölçülerde sorumlu tutulamaz.
            </p>
          </section>

          <section id="ip">
            <h2>9. Fikri Mülkiyet</h2>
            <p>
              Sitedeki tüm tasarım, metin, görsel, logo, video ve yazılımlar
              ile bunlara ilişkin haklar Şirkete veya lisans verenlerine aittir.
              Önceden yazılı izin olmaksızın çoğaltılamaz, dağıtılamaz, türev
              eser oluşturulamaz.
            </p>
          </section>

          <section id="kullanici-icerigi">
            <h2>10. Kullanıcı İçeriği ve Lisans</h2>
            <p>
              Şirkete ilettiğiniz geri bildirim veya önerileri, size herhangi
              bir yükümlülük doğurmaksızın Hizmetin geliştirilmesi amacıyla
              kullanabiliriz. Formlar yoluyla sunduğunuz içerikleri, başvurunuzu
              değerlendirmek ve size dönüş yapmak için işleriz (ayrıntılar için{" "}
              <Link href="/gizlilik-politikasi" className="underline underline-offset-4">
                Gizlilik Politikası
              </Link>{" "}
              geçerlidir).
            </p>
          </section>

          <section id="baglantilar">
            <h2>11. Üçüncü Taraf Bağlantılar</h2>
            <p>
              Hizmet, üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin
              içerik ve uygulamalarından Şirket sorumlu değildir; ziyaret
              ettiğiniz her sitenin koşullarını ve politikalarını inceleyiniz.
            </p>
          </section>

          <section id="garantiler">
            <h2>12. Garantilerin Reddi</h2>
            <p>
              Hizmet “olduğu gibi” ve “mevcut hâliyle” sunulur. Ticari elverişlilik,
              belirli bir amaca uygunluk ve ihlal etmeme dâhil zımni garantiler
              yasaların izin verdiği ölçüde reddedilir.
            </p>
          </section>

          <section id="sorumluluk">
            <h2>13. Sorumluluğun Sınırlandırılması</h2>
            <p>
              Şirket; dolaylı, arızi, özel veya netice kabilinden doğan zararlardan
              ve kâr/kayıp veriler dâhil doğrudan kontrolü dışındaki sonuçlardan
              yasaların izin verdiği ölçüde sorumlu değildir.
            </p>
          </section>

          <section id="tazminat">
            <h2>14. Tazminat</h2>
            <p>
              Bu Koşulları ihlâliniz nedeniyle Şirketin uğrayabileceği makul
              zarar, masraf ve giderleri (avukatlık ücretleri dâhil) tazmin
              etmeyi kabul edersiniz.
            </p>
          </section>

          <section id="hukuk">
            <h2>15. Uygulanacak Hukuk ve Yargı</h2>
            <p>
              Aksi yazılı olarak kararlaştırılmadıkça, bu Koşullar ve Hizmetin
              kullanımı Kuzey Kıbrıs Türk Cumhuriyeti (KKTC) hukukuna tabidir.
              Uyuşmazlıklar bakımından Gazimağusa mahkemeleri ve icra daireleri
              yetkilidir. Zorunlu tüketici koruma hükümleri saklıdır.
            </p>
          </section>

          <section id="degisiklik">
            <h2>16. Değişiklikler</h2>
            <p>
              Koşulları zaman zaman güncelleyebiliriz. Yeni sürümleri bu sayfada
              yayımlar ve “Yürürlük” tarihini değiştiririz. Hizmeti kullanmaya
              devam etmeniz güncel Koşulları kabul ettiğiniz anlamına gelir.
            </p>
          </section>

          <section id="butunluk">
            <h2>17. Sözleşmenin Bütünlüğü</h2>
            <p>
              Bu Koşullar, Gizlilik Politikası ve sitede atıf yapılan diğer
              belgelerle birlikte taraflar arasındaki tam mutabakatı oluşturur.
              Herhangi bir hükmün geçersizliği hâlinde diğer hükümler yürürlükte
              kalır.
            </p>
          </section>

          <section id="iletisim">
            <h2>18. İletişim</h2>
            <address className="not-italic rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>Alasya Park Sitesi 2. Etap, Dükkan No: 2-3 Uluçam Yolu, Sakarya – Gazimağusa</div>
              <div>
                E-posta:{" "}
                <a href="mailto:info@dndcyprus.com" className="underline underline-offset-4">
                  info@dndcyprus.com
                </a>{" "}
                · Telefon:{" "}
                <a href="tel:+9039244400363" className="underline underline-offset-4">
                  +90 392 444 0 363
                </a>
              </div>
            </address>
            <p className="mt-3 text-sm text-neutral-600">
              Bu sayfadaki iletişim bilgileri resmî sitemizde yayımlanan bilgiler
              esas alınarak sunulmuştur.
            </p>
          </section>

          <hr className="my-10 border-neutral-200" />
          <p className="text-sm text-neutral-500">
            Bu metin bilgilendirme amaçlı genel bir şablondur ve hukuki tavsiye
            değildir. İş modeliniz ve yerel mevzuata uygunluk için hukuk
            danışmanınızla gözden geçiriniz.
          </p>
        </div>
      </article>
    </main>
  );
}
