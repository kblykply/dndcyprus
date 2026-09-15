// app/tr/privacy/page.tsx
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import ConsentPreferencesButton from "@/app/components/analytics/ConsentPreferencesButton";

export const dynamic = "force-static";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/privacy",
  title: "Gizlilik ve Çerez Politikası | DND Cyprus",
  description:
    "DND Cyprus'un kişisel verileri hangi amaçlarla işlediği, kullandığı çerezler (Google Analytics, Google Ads, Meta Pixel), çerez izninizi nasıl yönetebileceğiniz ve haklarınız.",
});

export default function PrivacyPolicyPage() {
  const updatedAt = "15 Eylül 2026"; // Bu metin güncellendiğinde tarihi de güncelleyin.

  return (
    <main className="min-h-svh bg-white text-neutral-900">
      <header className="border-b border-neutral-200 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Gizlilik ve Çerez Politikası
          </h1>
          <span className="text-sm text-neutral-500">
            Son güncelleme: {updatedAt}
          </span>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_1fr]">
        {/* TOC */}
        <nav
          aria-label="İçindekiler"
          className="md:sticky md:top-24 md:self-start"
        >
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="mb-3 text-sm font-medium text-neutral-600">
              İçindekiler
            </p>
            <ul className="space-y-2 text-sm">
              {[
                ["kapsam", "Kapsam"],
                ["veri-sorumlusu", "Veri Sorumlusu & İletişim"],
                ["toplanan-veriler", "Toplanan Veriler"],
                ["kullanim-amaclari", "Kullanım Amaçları"],
                ["hukuki-dayanak", "Hukuki Dayanak"],
                ["saklama-sureleri", "Saklama Süreleri"],
                ["paylasim-aktarim", "Paylaşım & Aktarımlar"],
                ["cerezler", "Çerezler (Cookies)"],
                ["cerez-reklam", "Çerezler ve reklam ölçümü"],
                ["haklariniz", "Haklarınız"],
                ["guvenlik", "Veri Güvenliği"],
                ["cocuklar", "Çocukların Gizliliği"],
                ["ucuncu-siteler", "Üçüncü Taraf Siteler"],
                ["degisiklikler", "Değişiklikler"],
                ["iletisim", "İletişim"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    className="hover:text-neutral-900 text-neutral-600 transition"
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
        <div className="prose prose-neutral max-w-none prose-h2:mt-10 prose-h2:scroll-mt-24 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <section id="kapsam">
            <h2>Kapsam</h2>
            <p>
              Bu Gizlilik Politikası,{" "}
              <Link href="/tr" className="underline underline-offset-4">
                dndcyprus.com
              </Link>{" "}
              alan adı ve alt sayfalarında (bundan sonra “Hizmet”) işlenen
              kişisel verilere ilişkindir. Bu metin; verilerinizi hangi
              amaçlarla işlediğimizi, hangi hukuki sebeplere dayandığımızı,
              kimlerle paylaştığımızı, saklama sürelerini ve sahip olduğunuz
              hakları açıklar. Hizmeti kullanarak bu politikayı kabul etmiş
              sayılırsınız.
            </p>
          </section>

          <section id="veri-sorumlusu">
            <h2>Veri Sorumlusu &amp; İletişim</h2>
            <p>
              Bu politika kapsamında “Şirket” veya “DND Cyprus” aşağıdaki
              iletişim bilgilerine sahip kurumu ifade eder:
            </p>
            <address className="not-italic rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="font-medium">DND Cyprus</div>
              <div>
                Alasya Park Sitesi 2. Etap, Dükkan No: 2-3 Uluçam Yolu, Sakarya
                – Gazimağusa
              </div>
              <div>
                E-posta:{" "}
                <a
                  href="mailto:info@dndcyprus.com"
                  className="underline underline-offset-4"
                >
                  info@dndcyprus.com
                </a>{" "}
                · Telefon:{" "}
                <a href="tel:+903924440363" className="underline underline-offset-4">
                  +90 392 444 0 363
                </a>
              </div>
            </address>
            <p className="mt-3 text-sm text-neutral-600">
              (Adres ve iletişim bilgileri eski sitede yayımlanan veriler
              esas alınarak güncellenmiştir.)
            </p>
          </section>

          <section id="toplanan-veriler">
            <h2>Toplanan Veriler</h2>
            <ul>
              <li>
                <strong>İletişim Verileri:</strong> Ad, soyad, e-posta, telefon
                numarası ve form içeriği (mesajınız, proje ilgi alanı vb.).
              </li>
              <li>
                <strong>Kullanım Verileri:</strong> IP adresi, tarayıcı türü,
                yönlendiren/çıkış sayfaları, ziyaret zamanı/süresi, cihaz ve
                tanımlayıcılar gibi teknik günlük kayıtları.
              </li>
              <li>
                <strong>Çerez Verileri:</strong> Zorunlu çerezler, çerez
                tercihiniz ve yalnızca izin verdiğinizde analitik ve reklam
                ölçümü çerezleri (ayrıntılar “Çerezler ve reklam ölçümü”
                bölümünde).
              </li>
              <li>
                <strong>Üçüncü Taraflarla Etkileşim:</strong> Sosyal ağ
                eklentileri veya hizmetleriyle (ör. Google, Facebook/Instagram,
                X (Twitter), LinkedIn) etkileşiminiz olması halinde ilgili
                hesaplardan paylaştığınız bilgiler.
              </li>
            </ul>
          </section>

          <section id="kullanim-amaclari">
            <h2>Kullanım Amaçları</h2>
            <ul>
              <li>Hizmetin sunulması, sürdürülmesi ve performansının izlenmesi</li>
              <li>İletişim taleplerinizin karşılanması ve yönetilmesi</li>
              <li>
                Sözleşmenin kurulması/ifası (ör. proje/teklif süreçleri, randevu
                ve satış öncesi/sonrası destek)
              </li>
              <li>
                Meşru menfaatler (hizmetlerimizin geliştirilmesi, kampanya/etkinlik
                analizleri, güvenliğin sağlanması)
              </li>
              <li>
                Açık rıza vermeniz halinde haber/bülten ve benzeri ticari
                iletilerin gönderilmesi
              </li>
            </ul>
          </section>

          <section id="hukuki-dayanak">
            <h2>Hukuki Dayanak</h2>
            <p>
              Verileriniz; bir sözleşmenin kurulması/ifası, hukuki yükümlülük,
              meşru menfaatlerimizin dengeli biçimde korunması ve gerekli
              hallerde açık rızanızın alınması gibi{" "}
              <em>uygulanabilir veri koruma mevzuatına</em> uygun hukuki
              sebeplere dayanılarak işlenir (ör. GDPR veya yerel düzenlemeler).
            </p>
          </section>

          <section id="saklama-sureleri">
            <h2>Saklama Süreleri</h2>
            <p>
              Kişisel veriler, işleme amaçları için gerekli olan süre boyunca
              ve yasal yükümlülüklerimizi yerine getirmek için gereken asgari
              sürelerle saklanır. Analitik günlük verileri, güvenlik ve işlevsellik
              amaçlarıyla makul sürelerde tutulur.
            </p>
          </section>

          <section id="paylasim-aktarim">
            <h2>Paylaşım &amp; Aktarımlar</h2>
            <ul>
              <li>
                <strong>Hizmet Sağlayıcıları:</strong> Barındırma, bakım,
                güvenlik ve analitik tedarikçilerle sınırlı amaçlarla.
              </li>
              <li>
                <strong>İştirakler/İş Ortakları:</strong> Sadece gerekli ve
                meşru amaçlar için, uygun gizlilik güvenceleri ile.
              </li>
              <li>
                <strong>Hukuki Zorunluluklar:</strong> Yetkili makamların
                geçerli talepleri doğrultusunda.
              </li>
              <li>
                <strong>Sınır Ötesi Aktarım:</strong> Verileriniz, bulunduğunuz
                ülke dışındaki sistemlerde işlenebilir/depolanabilir. Bu
                hallerde uygun teknik ve sözleşmesel güvenceler sağlanır.
              </li>
              <li>
                <strong>Reklam ve Ölçüm Ortakları:</strong> Google (Google
                Analytics, Google Ads) ve Meta Platforms (Facebook/Instagram);
                yalnızca çerez bandında ilgili izni verdiğinizde.
              </li>
            </ul>
          </section>

          <section id="cerezler">
            <h2>Çerezler (Cookies)</h2>
            <p>
              Hizmette sitenin çalışması ve tercihlerinizin hatırlanması için{" "}
              <strong>zorunlu</strong> çerezler kullanılır.{" "}
              <strong>Analitik</strong> ve <strong>reklam</strong> çerezleri
              ise yalnızca çerez bandında izin verdiğinizde çalışır. Tercihinizi
              istediğiniz zaman değiştirebilir, çerezleri tarayıcınızın
              ayarlarından da kısıtlayabilir veya silebilirsiniz.
            </p>
            <details className="mt-3 rounded-lg border border-neutral-200 p-4">
              <summary className="cursor-pointer font-medium">
                Çerez yönetimi (özet)
              </summary>
              <ul className="mt-3">
                <li>Sitedeki çerez bandı veya bu sayfadaki “Çerez tercihlerini değiştir” butonu</li>
                <li>Tarayıcı ayarları &gt; Gizlilik/Site Ayarları &gt; Çerezler</li>
                <li>Üçüncü taraf çerezleri engelleme/temizleme seçenekleri</li>
              </ul>
            </details>
          </section>

          <section id="cerez-reklam">
            <h2>Çerezler ve reklam ölçümü</h2>
            <p>
              Web sitemizin nasıl kullanıldığını ölçmek ve Google ile
              Meta (Facebook/Instagram) reklam kampanyalarımızın sonuçlarını
              görmek için aşağıdaki araçları kullanırız. Zorunlu çerezler
              dışındaki araçlar <strong>yalnızca çerez bandında izin
              verdiğinizde</strong> çerez kullanır veya veri gönderir.
            </p>

            <h3>Kullandığımız araçlar</h3>
            <ul>
              <li>
                <strong>Google Analytics 4 (Analitik izni):</strong> Hangi
                sayfaların ziyaret edildiğini, ziyaretçilerin siteye nereden
                geldiğini ve broşür indirme, sanal tur, iletişim gibi
                etkileşimleri toplu istatistik olarak gösterir.
              </li>
              <li>
                <strong>Google Ads dönüşüm ölçümü (Reklam izni):</strong> Bir
                Google reklamını tıkladıktan sonra form gönderme, WhatsApp veya
                telefonla iletişim gibi işlemleri ölçer.{" "}
                <strong>Gelişmiş dönüşümler</strong> kapsamında, form
                gönderdiğinizde e-posta adresiniz ve telefon numaranız
                tarayıcınızda SHA-256 ile tek yönlü karma değere (hash)
                dönüştürülerek Google’a iletilir ve yalnızca reklam tıklamasıyla
                eşleştirme için kullanılır.
              </li>
              <li>
                <strong>Meta Pixel (Reklam izni):</strong> Facebook ve Instagram
                reklamlarımızın sonuçlarını (sayfa görüntüleme, form gönderme,
                iletişim tıklamaları) ölçer ve reklamlarımızın ilgilenebilecek
                kişilere gösterilmesine yardımcı olur. Reklam izni vermediğiniz
                sürece yüklenmez.
              </li>
              <li>
                <strong>Meta Dönüşüm API’si (Reklam izni):</strong> Form
                gönderdiğinizde sunucumuz aynı “form gönderildi” olayını doğrudan
                Meta’ya iletir; böylece ölçüm tarayıcı engellemelerinden
                etkilenmez ve Pixel ile çift sayılmaz. Bu iletimde e-posta ve
                telefon SHA-256 ile karma değere dönüştürülür; ayrıca IP adresi,
                tarayıcı bilgisi, sayfa adresi ve Meta çerez tanımlayıcıları
                (_fbp/_fbc) gönderilir. Reklam izni vermediyseniz bu iletim
                yapılmaz.
              </li>
            </ul>
            <p>
              İzin vermediğinizde Google etiketleri çerez yazmaz ve okumaz;
              yalnızca çerez içermeyen sınırlı teknik sinyaller (ör. izin
              durumu, sayfa adresi, tarayıcı türü) gönderebilir ve Google bunları
              toplu ölçüm modellemesi için kullanabilir (Google İzin Modu). Bu
              durumda reklam tıklama bilgisi çerez yerine sayfa adresinde
              taşınabilir. Form gönderdiğinizde talebinizle birlikte geldiğiniz
              kampanyanın bilgisi (aşağıdaki dnd_ft/dnd_lt içeriği ve sayfa
              adresi) de kaydedilir. Google ve Meta verileri Türkiye ve KKTC
              dışındaki sunucularda işleyebilir.
            </p>

            <h3>Çerez listesi</h3>
            <div className="mt-3 overflow-x-auto rounded-lg border border-neutral-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-600">
                  <tr>
                    <th className="px-3 py-2 font-medium">Çerez</th>
                    <th className="px-3 py-2 font-medium">Sağlayıcı</th>
                    <th className="px-3 py-2 font-medium">Amaç</th>
                    <th className="px-3 py-2 font-medium">Süre</th>
                    <th className="px-3 py-2 font-medium">Kategori</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 align-top">
                  {[
                    ["dnd_consent", "DND Cyprus", "Çerez tercihinizi (analitik/reklam izni) saklar.", "180 gün", "Zorunlu"],
                    ["locale", "DND Cyprus", "Ana adrese girildiğinde dil tercihini hatırlar.", "1 yıl", "Zorunlu"],
                    ["dnd_ft, dnd_lt", "DND Cyprus", "Siteye ilk ve son geldiğiniz kampanyanın bilgisi: UTM parametreleri, reklam tıklama kimliği (gclid/fbclid), giriş sayfası ve yönlendiren site. Ad, e-posta veya telefon içermez.", "90 gün", "Analitik veya Reklam"],
                    ["_ga, _ga_<ID>", "Google", "Google Analytics 4: ziyaretçileri ve oturumları ayırt eder.", "2 yıla kadar", "Analitik"],
                    ["_gcl_au, _gcl_aw", "Google", "Google Ads: reklam tıklamasını form/iletişim işlemiyle eşleştirir.", "90 gün", "Reklam"],
                    ["_fbp", "Meta", "Meta Pixel: tarayıcıyı tanımlar, reklam ölçümü yapar.", "90 gün", "Reklam"],
                    ["_fbc", "Meta", "Facebook/Instagram reklam tıklamasının kimliğini (fbclid) saklar.", "90 gün", "Reklam"],
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

            <h3>İzninizi değiştirme veya geri çekme</h3>
            <p>
              İzninizi dilediğiniz zaman aşağıdaki butonla değiştirebilir veya
              geri çekebilirsiniz. Geri çektiğinizde ilgili çerezleri
              tarayıcınızdan sileriz ve Meta Pixel olay göndermeyi durdurur.
              Geri çekme, o zamana kadar yapılan işlemleri etkilemez.
            </p>
            <ConsentPreferencesButton locale="tr" />
          </section>

          <section id="haklariniz">
            <h2>Haklarınız</h2>
            <ul>
              <li>Erişim, bilgilendirme ve kopyasını talep etme</li>
              <li>Düzeltme ve güncelleme</li>
              <li>Silme (“unutulma hakkı”) ve işleme kısıtlama</li>
              <li>İtiraz etme ve doğrudan pazarlamayı reddetme</li>
              <li>
                Taşınabilirlik (uygulanabildiği ölçüde) ve rızayı geri çekme
              </li>
            </ul>
            <p>
              Haklarınızı kullanmak için{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@dndcyprus.com?subject=Kişisel%20Veri%20Başvurusu"
              >
                info@dndcyprus.com
              </a>{" "}
              adresinden bize ulaşabilirsiniz. Kimliğinizi doğrulamak için ek
              bilgiler isteyebiliriz.
            </p>
          </section>

          <section id="guvenlik">
            <h2>Veri Güvenliği</h2>
            <p>
              İnternet üzerinden iletim ve elektronik depolama yöntemleri yüzde
              100 güvenli değildir. Buna rağmen, endüstri standardı teknik ve
              idari tedbirlerle verilerinizi korumaya çalışıyoruz.
            </p>
          </section>

          <section id="cocuklar">
            <h2>Çocukların Gizliliği</h2>
            <p>
              Hizmet 13 yaşın altındaki kişilere yönelik değildir. 13 yaşından
              küçük bir çocuğun kişisel verilerini izinsiz işlediğimizi
              fark edersek, bu verileri silmek için gerekli adımları atarız.
            </p>
          </section>

          <section id="ucuncu-siteler">
            <h2>Üçüncü Taraf Siteler</h2>
            <p>
              Hizmetimiz üçüncü taraf sitelere bağlantılar içerebilir. Bu
              sitelerin içerik ve gizlilik uygulamalarından sorumlu değiliz;
              ziyaret ettiğiniz her sitenin politikasını incelemenizi öneririz.
            </p>
          </section>

          <section id="degisiklikler">
            <h2>Bu Politikanın Değişiklikleri</h2>
            <p>
              Bu politika zaman zaman güncellenebilir. Yeni sürümleri bu sayfada
              yayımlar, “Son güncelleme” tarihini değiştiririz. Önemli
              değişikliklerde, uygun araçlarla (ör. sitede bildirim) sizi
              bilgilendirebiliriz.
            </p>
          </section>

          <section id="iletisim">
            <h2>İletişim</h2>
            <p>
              Sorularınız için{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@dndcyprus.com"
              >
                info@dndcyprus.com
              </a>{" "}
              adresine yazabilirsiniz.
            </p>
          </section>

          <hr className="my-10 border-neutral-200" />

          <p className="text-sm text-neutral-500">
            Bu metin bilgilendirme amaçlıdır ve hukuki tavsiye niteliği
            taşımaz. Uygulanabilir yerel mevzuat ve (uygulanabildiği ölçüde)
            GDPR hükümleri saklıdır.
          </p>
        </div>
      </article>
    </main>
  );
}
