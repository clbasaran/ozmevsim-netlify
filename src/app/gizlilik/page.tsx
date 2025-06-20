'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { EyeSlashIcon, ShieldCheckIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function GizlilikPage() {
  return (
    <main className="min-h-screen main-content">
      {/* Header */}
      <Header />

      {/* Privacy Policy Content */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <EyeSlashIcon className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gizlilik Politikası
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Öz Mevsim Isı Sistemleri olarak gizliliğinize verdiğimiz önemi ve kişisel bilgilerinizi nasıl koruduğumuzu öğrenin.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">1. Gizlilik Taahhüdümüz</h2>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  <strong>Öz Mevsim Isı Sistemleri Mühendislik İnşaat Sanayi ve Ticaret Limited Şirketi</strong> olarak, müşterilerimizin mahremiyetine saygı göstermek ve kişisel bilgilerini korumak temel değerlerimizdendir.
                </p>
                <p className="text-gray-700">
                  Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde, hizmetlerimizi kullandığınızda veya bizimle iletişime geçtiğinizde kişisel bilgilerinizin nasıl toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <UserIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">2. Topladığımız Bilgiler</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Kişisel Bilgiler</h3>
                  <ul className="list-disc list-inside text-green-800 space-y-2">
                    <li><strong>İletişim Bilgileri:</strong> Ad, soyad, telefon numarası, e-posta adresi, posta adresi</li>
                    <li><strong>Kimlik Bilgileri:</strong> T.C. kimlik numarası, doğum tarihi (gerekli durumlarda)</li>
                    <li><strong>Meslek Bilgileri:</strong> Şirket adı, pozisyon, iş adresi (kurumsal müşteriler için)</li>
                    <li><strong>Finansal Bilgiler:</strong> Faturalandırma bilgileri, ödeme tercihleri</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Teknik Bilgiler</h3>
                  <ul className="list-disc list-inside text-orange-800 space-y-2">
                    <li><strong>Web Sitesi Kullanımı:</strong> IP adresi, tarayıcı türü, ziyaret edilen sayfalar</li>
                    <li><strong>Cihaz Bilgileri:</strong> İşletim sistemi, cihaz türü, ekran çözünürlüğü</li>
                    <li><strong>Çerezler:</strong> Site performansı ve kullanıcı deneyimi için gerekli çerezler</li>
                    <li><strong>Log Kayıtları:</strong> Erişim zamanları, sayfa görüntüleme süreleri</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Hizmet Bilgileri</h3>
                  <ul className="list-disc list-inside text-purple-800 space-y-2">
                    <li><strong>Proje Detayları:</strong> Kombi/klima kurulum bilgileri, teknik özellikler</li>
                    <li><strong>Servis Geçmişi:</strong> Bakım kayıtları, onarım bilgileri, garanti durumu</li>
                    <li><strong>Talep Bilgileri:</strong> Hizmet talepleri, şikayetler, geri bildirimler</li>
                    <li><strong>Tercihler:</strong> İletişim tercihleri, hizmet seçenekleri</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Bilgi Toplama Yöntemleri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Doğrudan Toplama</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Online iletişim formları</li>
                    <li>Telefon görüşmeleri</li>
                    <li>E-posta yazışmaları</li>
                    <li>Yüz yüze görüşmeler</li>
                    <li>Sözleşme imzalama süreçleri</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Otomatik Toplama</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Web sitesi ziyaret analitikleri</li>
                    <li>Çerez teknolojileri</li>
                    <li>Sunucu log dosyaları</li>
                    <li>Mobil uygulama kullanımı</li>
                    <li>Sosyal medya etkileşimleri</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Bilgilerin Kullanım Amaçları</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Hizmet Sunumu</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-1">
                    <li>Kombi, klima ve doğalgaz sistemi kurulum hizmetlerinin verilmesi</li>
                    <li>Teknik destek ve müşteri hizmetlerinin sağlanması</li>
                    <li>Servis randevularının planlanması ve koordinasyonu</li>
                    <li>Garanti ve bakım hizmetlerinin yürütülmesi</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">İş Süreçleri</h3>
                  <ul className="list-disc list-inside text-green-800 space-y-1">
                    <li>Fiyat tekliflerinin hazırlanması ve sunulması</li>
                    <li>Sözleşme süreçlerinin yönetilmesi</li>
                    <li>Faturalandırma ve tahsilat işlemlerinin gerçekleştirilmesi</li>
                    <li>Stok yönetimi ve tedarik süreçlerinin optimize edilmesi</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">İletişim ve Pazarlama</h3>
                  <ul className="list-disc list-inside text-yellow-800 space-y-1">
                    <li>Müşteri memnuniyeti anketlerinin yapılması</li>
                    <li>Yeni ürün ve hizmetler hakkında bilgilendirme</li>
                    <li>Özel kampanya ve indirimlerden haberdar etme</li>
                    <li>Sektörel gelişmeler ve teknolojik yenilikler paylaşımı</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Yasal Yükümlülükler</h3>
                  <ul className="list-disc list-inside text-red-800 space-y-1">
                    <li>Vergi mevzuatı gereği belge ve kayıt saklama</li>
                    <li>Ticaret kanunu kapsamındaki yükümlülüklerin yerine getirilmesi</li>
                    <li>İş sağlığı ve güvenliği düzenlemelerine uyum</li>
                    <li>Kişisel Verilerin Korunması Kanunu'na uyum</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <LockClosedIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">5. Bilgi Güvenliği</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Teknik Güvenlik Önlemleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-green-800 space-y-2">
                      <li>256-bit SSL şifreleme teknolojisi</li>
                      <li>Güvenlik duvarı koruması</li>
                      <li>Düzenli güvenlik güncellemeleri</li>
                      <li>Antivirüs ve anti-malware koruması</li>
                    </ul>
                    <ul className="list-disc list-inside text-green-800 space-y-2">
                      <li>Güvenli veri yedekleme sistemleri</li>
                      <li>Erişim loglarının kaydedilmesi</li>
                      <li>Penetrasyon testleri</li>
                      <li>Güvenlik açığı taramaları</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">İdari Güvenlik Önlemleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-orange-800 space-y-2">
                      <li>Personel gizlilik sözleşmeleri</li>
                      <li>Rol bazlı erişim kontrolü</li>
                      <li>Düzenli güvenlik eğitimleri</li>
                      <li>Güvenlik politikalarının uygulanması</li>
                    </ul>
                    <ul className="list-disc list-inside text-orange-800 space-y-2">
                      <li>Veri işleme prosedürlerinin belirlenmesi</li>
                      <li>Olağandışı durum response planları</li>
                      <li>Düzenli güvenlik denetimleri</li>
                      <li>Üçüncü taraf güvenlik değerlendirmeleri</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Bilgi Paylaşımı</h2>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmamaktayız:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-3">İzinli Paylaşımlar</h3>
                    <ul className="list-disc list-inside text-yellow-800 space-y-2">
                      <li>Açık rızanızın bulunması durumunda</li>
                      <li>Hizmet sağlayıcılarımızla (sözleşme çerçevesinde)</li>
                      <li>İş ortaklarımızla (gerekli olan minimum bilgi)</li>
                      <li>Mali müşavirimiz ve muhasebe firması ile</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-3">Yasal Zorunluluklar</h3>
                    <ul className="list-disc list-inside text-yellow-800 space-y-2">
                      <li>Mahkeme kararları gereğince</li>
                      <li>Savcılık soruşturmaları kapsamında</li>
                      <li>Vergi dairesi talepleri doğrultusunda</li>
                      <li>Diğer yasal otoritelerin resmi talepleri</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Çerez Politikası</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Web sitemizde kullanıcı deneyimini geliştirmek ve site performansını optimize etmek için çerezler kullanmaktayız.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Zorunlu Çerezler</h3>
                    <p className="text-sm text-blue-700">Web sitesinin temel işlevleri için gerekli çerezler</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Analitik Çerezler</h3>
                    <p className="text-sm text-green-700">Site kullanımını analiz eden ve geliştiren çerezler</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Pazarlama Çerezleri</h3>
                    <p className="text-sm text-purple-700">İlgi alanlarınıza uygun içerik sunan çerezler</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Haklarınız</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-900 font-semibold mb-4">Kişisel bilgilerinizle ilgili sahip olduğunuz haklar:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li><strong>Bilgi Alma Hakkı:</strong> Hangi bilgilerinizin toplandığını öğrenme</li>
                    <li><strong>Erişim Hakkı:</strong> Sakladığımız bilgilerinize erişim talep etme</li>
                    <li><strong>Düzeltme Hakkı:</strong> Yanlış bilgilerin düzeltilmesini isteme</li>
                    <li><strong>Silme Hakkı:</strong> Belirli koşullarda bilgilerinizin silinmesini talep etme</li>
                  </ul>
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li><strong>Sınırlama Hakkı:</strong> Belirli işlemlerin durdurulmasını isteme</li>
                    <li><strong>İtiraz Hakkı:</strong> Belirli veri işleme faaliyetlerine itiraz etme</li>
                    <li><strong>Taşınabilirlik Hakkı:</strong> Verilerinizi başka platformlara aktarma</li>
                    <li><strong>Şikayet Hakkı:</strong> Veri koruma otoritelerine şikayet etme</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. İletişim ve Başvuru</h2>
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Gizlilik politikamız hakkında sorularınız veya haklarınızı kullanmak istediğinizde bize ulaşabilirsiniz:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-3">İletişim Bilgileri</h3>
                    <p className="text-orange-700 mb-2"><strong>Adres:</strong> Kuşcağız Mahallesi Sanatoryum Caddesi No:221/A Keçiören, Ankara</p>
                    <p className="text-orange-700 mb-2"><strong>Telefon:</strong> +90 312 357 0600</p>
                    <p className="text-orange-700"><strong>E-posta:</strong> gizlilik@ozmevsim.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-3">Yanıt Süreleri</h3>
                    <p className="text-orange-700 mb-2"><strong>E-posta:</strong> 2 iş günü içinde</p>
                    <p className="text-orange-700 mb-2"><strong>Telefon:</strong> Anında yanıt</p>
                    <p className="text-orange-700"><strong>Yazılı başvuru:</strong> 30 gün içinde</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Politika Güncellemeleri</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Bu Gizlilik Politikası, yasal düzenlemelerdeki değişiklikler, teknolojik gelişmeler veya iş uygulamalarımızdaki güncellemeler doğrultusunda revize edilebilir.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Önemli Değişiklikler</h3>
                    <p className="text-gray-700">E-posta ile bildirim gönderilecektir</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Küçük Güncellemeler</h3>
                    <p className="text-gray-700">Web sitesinde yayınlanacaktır</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Son güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')} <br/>
                  <strong>Yürürlük tarihi:</strong> {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Gizliliğiniz Bizim Önceliğimiz</h2>
              <p className="mb-6">Kişisel bilgilerinizin güvenliği konusunda sorularınız varsa, çekinmeden bizimle iletişime geçin.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a href="tel:+903123570600" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  +90 312 357 0600
                </a>
                <a href="mailto:gizlilik@ozmevsim.com" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  gizlilik@ozmevsim.com
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