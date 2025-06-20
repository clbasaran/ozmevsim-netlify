'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CakeIcon, Cog6ToothIcon, ChartBarIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function CerezPolitikasiPage() {
  return (
    <main className="min-h-screen main-content">
      {/* Header */}
      <Header />

      {/* Cookie Policy Content */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-purple-100 p-4 rounded-full">
                <CakeIcon className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Çerez Politikası
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Öz Mevsim Isı Sistemleri web sitesinde kullanılan çerezler hakkında detaylı bilgiler.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <CakeIcon className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">1. Çerez Nedir?</h2>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Çerezler (cookies), web sitemizi ziyaret ettiğinizde tarayıcınız tarafından cihazınızda saklanan küçük metin dosyalarıdır. Bu dosyalar, web sitemizi daha verimli kullanmanızı sağlar ve size daha iyi bir deneyim sunar.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Çerezlerin Amacı</h3>
                  <ul className="list-disc list-inside text-purple-800 space-y-1">
                    <li>Web sitesinin düzgün çalışmasını sağlamak</li>
                    <li>Kullanıcı tercihlerini hatırlamak</li>
                    <li>Site performansını analiz etmek</li>
                    <li>Kullanıcı deneyimini geliştirmek</li>
                    <li>Güvenlik önlemlerini uygulamak</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Kullandığımız Çerez Türleri</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Cog6ToothIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-blue-900">Zorunlu Çerezler</h3>
                  </div>
                  <p className="text-blue-800 mb-3">
                    Web sitemizin temel işlevlerini yerine getirmesi için gerekli olan çerezlerdir. Bu çerezler olmadan site düzgün çalışmaz.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">İşlevsel Çerezler</h4>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Oturum yönetimi</li>
                        <li>Güvenlik doğrulaması</li>
                        <li>Form verilerinin korunması</li>
                        <li>Dil tercihi hatırlama</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Teknik Çerezler</h4>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Yük dengeleme</li>
                        <li>Sunucu seçimi</li>
                        <li>Hata raporlama</li>
                        <li>Performans optimizasyonu</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <ChartBarIcon className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-900">Analitik Çerezler</h3>
                  </div>
                  <p className="text-green-800 mb-3">
                    Web sitesi kullanımını analiz etmek ve kullanıcı deneyimini geliştirmek için kullanılan çerezlerdir.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Kullanım Analizi</h4>
                      <ul className="list-disc list-inside text-green-700 space-y-1">
                        <li>Sayfa görüntüleme sayıları</li>
                        <li>Ziyaret süresi</li>
                        <li>Tıklama oranları</li>
                        <li>Popüler sayfalar</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Demografik Bilgiler</h4>
                      <ul className="list-disc list-inside text-green-700 space-y-1">
                        <li>Coğrafi konum (şehir düzeyi)</li>
                        <li>Cihaz türü</li>
                        <li>Tarayıcı bilgileri</li>
                        <li>Ziyaret kaynağı</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <MegaphoneIcon className="h-6 w-6 text-orange-600 mr-2" />
                    <h3 className="text-lg font-semibold text-orange-900">Pazarlama Çerezleri</h3>
                  </div>
                  <p className="text-orange-800 mb-3">
                    Size kişiselleştirilmiş içerik ve reklamlar sunmak için kullanılan çerezlerdir (İsteğe bağlı).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Kişiselleştirme</h4>
                      <ul className="list-disc list-inside text-orange-700 space-y-1">
                        <li>İlgi alanı belirleme</li>
                        <li>Ürün tercihi hatırlama</li>
                        <li>Özelleştirilmiş kampanyalar</li>
                        <li>Gezinme geçmişi analizi</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Reklam Optimizasyonu</h4>
                      <ul className="list-disc list-inside text-orange-700 space-y-1">
                        <li>Hedefli reklamlar</li>
                        <li>Conversion takibi</li>
                        <li>A/B test çalışmaları</li>
                        <li>Yeniden pazarlama</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Üçüncü Taraf Çerezler</h2>
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Google Analytics</h3>
                  <p className="text-yellow-800 mb-3">
                    Web sitesi trafiğini analiz etmek ve kullanıcı davranışlarını anlamak için Google Analytics kullanmaktayız.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">Toplanan Bilgiler</h4>
                      <ul className="list-disc list-inside text-yellow-700 space-y-1">
                        <li>Sayfa görüntülemeleri</li>
                        <li>Ziyaret süreleri</li>
                        <li>Çıkış oranları</li>
                        <li>Demografik veriler</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">Gizlilik Seçenekleri</h4>
                      <ul className="list-disc list-inside text-yellow-700 space-y-1">
                        <li>IP anonim hale getirilir</li>
                        <li>Veri paylaşımı sınırlıdır</li>
                        <li>Çerez devre dışı bırakılabilir</li>
                        <li>Opt-out seçeneği mevcuttur</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Google Ads & Meta Pixel</h3>
                  <p className="text-blue-800 mb-3">
                    Dijital pazarlama kampanyalarımızın etkinliğini ölçmek için reklam platformlarının çerezlerini kullanıyoruz.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Google Ads</h4>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Conversion takibi</li>
                        <li>Remarketing listeleri</li>
                        <li>Hedef kitle oluşturma</li>
                        <li>Kampanya optimizasyonu</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Meta Pixel</h4>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Facebook reklamları</li>
                        <li>Instagram kampanyaları</li>
                        <li>Özel hedef kitleler</li>
                        <li>Lookalike kitleler</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Sosyal Medya Entegrasyonları</h3>
                  <p className="text-red-800 mb-3">
                    Sosyal medya paylaşım özellikleri için ilgili platformların çerezleri kullanılmaktadır.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">YouTube</h4>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        <li>Video oynatma</li>
                        <li>İzlenme istatistikleri</li>
                        <li>Tercih takibi</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">WhatsApp</h4>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        <li>Chat widget</li>
                        <li>Mesajlaşma geçmişi</li>
                        <li>Durum takibi</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">LinkedIn</h4>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        <li>B2B tracking</li>
                        <li>Şirket analizi</li>
                        <li>Paylaşım takibi</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Çerez Yönetimi</h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Tarayıcı Ayarları</h3>
                  <p className="text-green-800 mb-4">
                    Çerezleri tarayıcınızın ayarları üzerinden kontrol edebilirsiniz. Aşağıda popüler tarayıcılar için çerez yönetimi rehberi bulunmaktadır.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Desktop Tarayıcılar</h4>
                      <ul className="list-disc list-inside text-green-700 space-y-2">
                        <li><strong>Google Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                        <li><strong>Mozilla Firefox:</strong> Seçenekler → Gizlilik ve güvenlik → Çerezler</li>
                        <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezleri yönet</li>
                        <li><strong>Microsoft Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Mobil Tarayıcılar</h4>
                      <ul className="list-disc list-inside text-green-700 space-y-2">
                        <li><strong>Android Chrome:</strong> Ayarlar → Site ayarları → Çerezler</li>
                        <li><strong>iOS Safari:</strong> Ayarlar → Safari → Gizlilik ve güvenlik</li>
                        <li><strong>Samsung Internet:</strong> Ayarlar → Gizlilik ve güvenlik</li>
                        <li><strong>Opera Mobile:</strong> Ayarlar → Gizlilik → Çerezler</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Çerez Tercih Merkezi</h3>
                  <p className="text-orange-800 mb-4">
                    Web sitemizde bulunan çerez tercih merkezi üzerinden çerez kategorilerini kolayca yönetebilirsiniz.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-orange-900 mb-2">✅ Zorunlu</h4>
                      <p className="text-sm text-orange-700">Her zaman aktif (devre dışı bırakılamaz)</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-orange-900 mb-2">⚙️ Analitik</h4>
                      <p className="text-sm text-orange-700">İsteğe bağlı (açılıp kapatılabilir)</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-orange-900 mb-2">📢 Pazarlama</h4>
                      <p className="text-sm text-orange-700">İsteğe bağlı (açılıp kapatılabilir)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Çerez Yaşam Süreleri</h2>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-purple-800 mb-4">
                  Çerezlerimiz, türlerine göre farklı yaşam sürelerine sahiptir:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-3">Oturum Çerezleri</h3>
                    <ul className="list-disc list-inside text-purple-700 space-y-2">
                      <li><strong>Süre:</strong> Tarayıcı kapatılana kadar</li>
                      <li><strong>Amaç:</strong> Geçici oturum yönetimi</li>
                      <li><strong>Silinme:</strong> Otomatik olarak silinir</li>
                      <li><strong>Örnekler:</strong> Form verileri, güvenlik tokenları</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-3">Kalıcı Çerezler</h3>
                    <ul className="list-disc list-inside text-purple-700 space-y-2">
                      <li><strong>Süre:</strong> 30 gün - 2 yıl arası</li>
                      <li><strong>Amaç:</strong> Uzun vadeli tercih hatırlama</li>
                      <li><strong>Silinme:</strong> Belirtilen süre sonunda</li>
                      <li><strong>Örnekler:</strong> Dil tercihi, analitik veriler</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Çerez Süre Detayları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="font-semibold text-purple-900">Zorunlu</p>
                      <p className="text-sm text-purple-700">Oturum süresi</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">Tercih</p>
                      <p className="text-sm text-purple-700">1 yıl</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">Analitik</p>
                      <p className="text-sm text-purple-700">2 yıl</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">Pazarlama</p>
                      <p className="text-sm text-purple-700">30-90 gün</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Çerezleri Reddetmenin Etkileri</h2>
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Zorunlu Çerezleri Devre Dışı Bırakma</h3>
                  <ul className="list-disc list-inside text-red-800 space-y-2">
                    <li>Web sitesi düzgün çalışmayabilir</li>
                    <li>Güvenlik açıkları oluşabilir</li>
                    <li>Form gönderimi sorunları yaşanabilir</li>
                    <li>Oturum yönetimi problemleri olabilir</li>
                    <li>Bazı sayfalar erişilemez hale gelebilir</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Analitik Çerezleri Devre Dışı Bırakma</h3>
                  <ul className="list-disc list-inside text-yellow-800 space-y-2">
                    <li>Kişiselleştirilmiş deneyim sağlanamaz</li>
                    <li>Site geliştirme çalışmaları etkilenir</li>
                    <li>Kullanıcı davranış analizi yapılamaz</li>
                    <li>Performans optimizasyonu sınırlanır</li>
                    <li>Hata tespiti zorlaşır</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Pazarlama Çerezleri Devre Dışı Bırakma</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li>Genel reklamlar gösterilir (kişiselleştirilmemiş)</li>
                    <li>İlgi alanınıza uygun kampanyalar sunulamaz</li>
                    <li>Remarketing listeleri oluşturulamaz</li>
                    <li>Conversion takibi yapılamaz</li>
                    <li>Reklam etkinliği ölçülemez</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Veri Güvenliği</h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-800 mb-4">
                  Çerezler aracılığıyla toplanan verilerinizin güvenliği bizim için önceliktir. Bu kapsamda aşağıdaki güvenlik önlemlerini almaktayız:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-900 mb-3">Teknik Güvenlik</h3>
                    <ul className="list-disc list-inside text-green-700 space-y-2">
                      <li>SSL/TLS şifreleme protokolü</li>
                      <li>Güvenli çerez bayrakları (Secure, HttpOnly)</li>
                      <li>SameSite koruması</li>
                      <li>Düzenli güvenlik taramaları</li>
                      <li>Güvenlik duvarı koruması</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-3">Veri Koruması</h3>
                    <ul className="list-disc list-inside text-green-700 space-y-2">
                      <li>Kişisel veri anonim hale getirilir</li>
                      <li>Minimum veri toplama prensibi</li>
                      <li>Düzenli veri temizliği</li>
                      <li>Erişim kontrolü ve yetkilendirme</li>
                      <li>Veri aktarımında güvenlik protokolleri</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Yasal Uyum</h2>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <p className="text-blue-800 mb-4">
                  Çerez politikamız aşağıdaki yasal düzenlemelere uygun olarak hazırlanmıştır:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-3">Ulusal Mevzuat</h3>
                    <ul className="list-disc list-inside text-blue-700 space-y-2">
                      <li>6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</li>
                      <li>Elektronik Haberleşme Kanunu</li>
                      <li>Bilgi Toplumu Hizmetleri Kanunu</li>
                      <li>BTK Düzenlemeleri</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-3">Uluslararası Standartlar</h3>
                    <ul className="list-disc list-inside text-blue-700 space-y-2">
                      <li>Avrupa Birliği GDPR</li>
                      <li>ePrivacy Direktifi</li>
                      <li>ISO 27001 Güvenlik Standartları</li>
                      <li>Google Analytics/Ads Politikaları</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. İletişim ve Başvuru</h2>
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <p className="text-orange-800 mb-4">
                  Çerez politikamız hakkında sorularınız, önerileriniz veya şikayetleriniz için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-3">İletişim Bilgileri</h3>
                    <p className="text-orange-700 mb-2"><strong>Şirket:</strong> Öz Mevsim Isı Sistemleri Mühendislik İnşaat Sanayi ve Ticaret Limited Şirketi</p>
                    <p className="text-orange-700 mb-2"><strong>Adres:</strong> Kuşcağız Mahallesi Sanatoryum Caddesi No:221/A Keçiören, Ankara</p>
                    <p className="text-orange-700 mb-2"><strong>Telefon:</strong> +90 312 357 0600</p>
                    <p className="text-orange-700"><strong>E-posta:</strong> cerez@ozmevsim.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-3">Veri Koruma Sorumlusu</h3>
                    <p className="text-orange-700 mb-2"><strong>Görev:</strong> KVKK ve Çerez Politikası Uyum Sorumlusu</p>
                    <p className="text-orange-700 mb-2"><strong>E-posta:</strong> verikoruma@ozmevsim.com</p>
                    <p className="text-orange-700 mb-2"><strong>Çalışma Saatleri:</strong> Pazartesi-Cuma 09:00-18:00</p>
                    <p className="text-orange-700"><strong>Yanıt Süresi:</strong> En geç 5 iş günü</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Politika Güncellemeleri</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Bu Çerez Politikası, teknolojik gelişmeler, yasal değişiklikler veya iş gereksinimlerimiz doğrultusunda güncellenebilir.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Güncelleme Bildirimi</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Web sitesinde duyuru banner'ı</li>
                      <li>E-posta ile bilgilendirme</li>
                      <li>Pop-up uyarı mesajı</li>
                      <li>Sosyal medya kanalları</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Geçiş Süreci</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>30 gün önceden duyuru</li>
                      <li>Eski politika 30 gün daha geçerli</li>
                      <li>Yeni onay alma süreci</li>
                      <li>Çerez tercihlerini yeniden belirleme</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Son güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')} <br/>
                    <strong>Yürürlük tarihi:</strong> {new Date().toLocaleDateString('tr-TR')} <br/>
                    <strong>Versiyon:</strong> 1.0 <br/>
                    <strong>Bir sonraki inceleme:</strong> {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Çerez Tercihleri</h2>
              <p className="mb-6">Çerez ayarlarınızı yönetmek veya politikamız hakkında bilgi almak için bize ulaşın.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a href="tel:+903123570600" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  +90 312 357 0600
                </a>
                <a href="mailto:cerez@ozmevsim.com" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  cerez@ozmevsim.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  );
} 