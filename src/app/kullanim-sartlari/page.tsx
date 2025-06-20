'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { DocumentTextIcon, ExclamationTriangleIcon, ScaleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function KullanimSartlariPage() {
  return (
    <main className="min-h-screen main-content">
      {/* Header */}
      <Header />

      {/* Terms of Use Content */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <DocumentTextIcon className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Kullanım Şartları
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Öz Mevsim Isı Sistemleri web sitesi ve hizmetlerinin kullanım koşulları ve kuralları.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <UserGroupIcon className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">1. Genel Hükümler</h2>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Bu Kullanım Şartları, <strong>Öz Mevsim Isı Sistemleri Mühendislik İnşaat Sanayi ve Ticaret Limited Şirketi</strong> ("Şirket", "Biz", "Bizim") tarafından işletilen web sitesi ve sunulan hizmetlerin kullanımına ilişkin koşulları belirlemektedir.
                </p>
                <div className="bg-white p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-green-900 mb-2">Şirket Bilgileri</h3>
                  <p className="text-gray-700 mb-2"><strong>Unvan:</strong> Öz Mevsim Isı Sistemleri Mühendislik İnşaat Sanayi ve Ticaret Limited Şirketi</p>
                  <p className="text-gray-700 mb-2"><strong>Adres:</strong> Kuşcağız Mahallesi Sanatoryum Caddesi No:221/A Keçiören, Ankara</p>
                  <p className="text-gray-700 mb-2"><strong>Telefon:</strong> +90 312 357 0600</p>
                  <p className="text-gray-700"><strong>E-posta:</strong> info@ozmevsim.com</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Tanımlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Temel Tanımlar</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li><strong>Web Sitesi:</strong> ozmevsim.com alan adında yayınlanan site</li>
                    <li><strong>Kullanıcı:</strong> Web sitesini ziyaret eden veya hizmetlerimizi kullanan kişi</li>
                    <li><strong>Hizmetler:</strong> Şirket tarafından sunulan tüm ürün ve hizmetler</li>
                    <li><strong>İçerik:</strong> Web sitesindeki tüm metin, görsel, video ve diğer materyaller</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Hizmet Tanımları</h3>
                  <ul className="list-disc list-inside text-orange-800 space-y-2">
                    <li><strong>Kurulum Hizmetleri:</strong> Kombi, klima, doğalgaz sistemi kurulumu</li>
                    <li><strong>Bakım Hizmetleri:</strong> Periyodik kontrol ve bakım işlemleri</li>
                    <li><strong>Onarım Hizmetleri:</strong> Arıza giderme ve onarım çalışmaları</li>
                    <li><strong>Danışmanlık:</strong> Teknik danışmanlık ve proje geliştirme</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Kabul ve Onay</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <div className="flex">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-700 mb-4">
                      Web sitemizi kullanarak veya hizmetlerimizden yararlanarak bu Kullanım Şartları'nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Önemli Notlar</h3>
                      <ul className="list-disc list-inside text-yellow-800 space-y-1">
                        <li>Bu şartları kabul etmiyorsanız, web sitesini kullanmayınız</li>
                        <li>Şartlar düzenli olarak güncellenebilir</li>
                        <li>Güncel şartlar web sitesinde yayınlanır</li>
                        <li>Devam eden kullanım yeni şartların kabulü anlamına gelir</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Hizmet Kapsamı</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Isıtma Sistemleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                      <li>Kombi satışı ve kurulumu</li>
                      <li>Radyatör sistemleri</li>
                      <li>Yerden ısıtma sistemleri</li>
                      <li>Doğalgaz sistemleri</li>
                    </ul>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                      <li>Bacalı soba sistemleri</li>
                      <li>Termosifon sistemleri</li>
                      <li>Güneş enerjisi sistemleri</li>
                      <li>Isı pompası sistemleri</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Soğutma Sistemleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-green-800 space-y-2">
                      <li>Split klima sistemleri</li>
                      <li>VRF sistemleri</li>
                      <li>Kaset tipi klimalar</li>
                      <li>Duvar tipi klimalar</li>
                    </ul>
                    <ul className="list-disc list-inside text-green-800 space-y-2">
                      <li>Salon tipi klimalar</li>
                      <li>Inverter teknolojili sistemler</li>
                      <li>Enerji verimli çözümler</li>
                      <li>Endüstriyel soğutma</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Destek Hizmetleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-purple-800 space-y-2">
                      <li>24/7 teknik destek</li>
                      <li>Periyodik bakım hizmetleri</li>
                      <li>Acil onarım hizmetleri</li>
                      <li>Garanti kapsamı hizmetler</li>
                    </ul>
                    <ul className="list-disc list-inside text-purple-800 space-y-2">
                      <li>Sistem optimizasyonu</li>
                      <li>Enerji verimliliği danışmanlığı</li>
                      <li>Proje geliştirme</li>
                      <li>Teknik eğitimler</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Kullanıcı Yükümlülükleri</h2>
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Yasaklı Davranışlar</h3>
                  <ul className="list-disc list-inside text-red-800 space-y-2">
                    <li>Web sitesine zarar verici yazılım yükleme</li>
                    <li>Başkalarının hesaplarını izinsiz kullanma</li>
                    <li>Telif hakkı ihlali yapan içerik paylaşma</li>
                    <li>Yanıltıcı veya yanlış bilgi verme</li>
                    <li>Sistemi aşırı yüklemeye yönelik faaliyetler</li>
                    <li>Rekabete aykırı faaliyetlerde bulunma</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Sorumlu Kullanım</h3>
                  <ul className="list-disc list-inside text-green-800 space-y-2">
                    <li>Doğru ve güncel bilgi sağlama</li>
                    <li>Hesap güvenliğini koruma</li>
                    <li>Yasal düzenlemelere uyma</li>
                    <li>Diğer kullanıcılara saygı gösterme</li>
                    <li>Şirket personeli ile nezaketli iletişim</li>
                    <li>Randevu ve sözleşme yükümlülüklerini yerine getirme</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Fikri Mülkiyet Hakları</h2>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Web sitemizdeki tüm içerik, tasarım, logo, marka, yazılım ve diğer materyaller Öz Mevsim Isı Sistemleri'nin mülkiyetindedir.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-3">Korunan İçerikler</h3>
                    <ul className="list-disc list-inside text-purple-800 space-y-1">
                      <li>Öz Mevsim logosu ve markaları</li>
                      <li>Web sitesi tasarımı ve kodları</li>
                      <li>Ürün fotoğrafları ve görseller</li>
                      <li>Teknik dökümanlar ve kılavuzlar</li>
                      <li>Video ve animasyon içerikleri</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-3">Kullanım Sınırları</h3>
                    <ul className="list-disc list-inside text-purple-800 space-y-1">
                      <li>Ticari amaçla kullanım yasaktır</li>
                      <li>İzinsiz kopyalama yapılamaz</li>
                      <li>Değiştirme ve dağıtma yasaktır</li>
                      <li>Tersine mühendislik yapılamaz</li>
                      <li>Yazılı izin olmadan çoğaltma yasaktır</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <ScaleIcon className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">7. Sorumluluk Sınırlaması</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Hizmet Sınırlamaları</h3>
                  <ul className="list-disc list-inside text-yellow-800 space-y-2">
                    <li>Web sitesinin kesintisiz çalışmasını garanti edemeyiz</li>
                    <li>Teknik aksaklıklardan doğan zararlardan sorumlu değiliz</li>
                    <li>Üçüncü taraf sitelere bağlantılardan sorumlu değiliz</li>
                    <li>Kullanıcı kaynaklı sorunlardan sorumlu değiliz</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Hizmet Garantileri</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li>Kurulum hizmetlerimiz 2 yıl garanti kapsamındadır</li>
                    <li>Kullandığımız ürünler üretici garantisi ile korunur</li>
                    <li>İşçilik garantisi sözleşmede belirtilen süreler geçerlidir</li>
                    <li>Garanti kapsamı dışındaki müdahaleler ücretlidir</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Hizmet Koşulları</h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-900 mb-3">Hizmet Kapsamı</h3>
                    <ul className="list-disc list-inside text-green-800 space-y-2">
                      <li>Tüm hizmetler KDV dahildir</li>
                      <li>Hizmet kapsamı önceden belirlenir</li>
                      <li>Özel projeler için ayrı sözleşme düzenlenir</li>
                      <li>Toplu projelerde özel koşullar uygulanır</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-3">Ödeme Koşulları</h3>
                    <ul className="list-disc list-inside text-green-800 space-y-2">
                      <li>Ödeme koşulları proje bazında belirlenir</li>
                      <li>Havale/EFT ile ödeme kabul edilir</li>
                      <li>Çek ile ödeme vade farklılığı gösterir</li>
                      <li>Garanti kapsamı hizmet türüne göre değişir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. İptal ve İade</h2>
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">İptal Koşulları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-orange-800 space-y-2">
                      <li>Kurulum öncesi iptal: Ürün bedeli %100 iade</li>
                      <li>Kurulum sonrası iptal: İadesi mümkün değil</li>
                      <li>Malzeme hatası: Ücretsiz değişim</li>
                      <li>Müşteri memnuniyetsizliği: Değerlendirmeye alınır</li>
                    </ul>
                    <ul className="list-disc list-inside text-orange-800 space-y-2">
                      <li>İptal bildirimi yazılı olmalıdır</li>
                      <li>48 saat önceden bildirim gereklidir</li>
                      <li>Özel siparişler iptal edilemez</li>
                      <li>İade süreci 7-14 iş günü sürer</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">İade Olmayan Durumlar</h3>
                  <ul className="list-disc list-inside text-red-800 space-y-2">
                    <li>Kullanıcı hatası sonucu oluşan hasarlar</li>
                    <li>Normal kullanım sonucu olan aşınmalar</li>
                    <li>Müdahale edilmiş ürünler</li>
                    <li>Garanti süresi dolmuş ürünler</li>
                    <li>Yetkisiz servis müdahalesi görmüş ürünler</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Uyuşmazlık Çözümü</h2>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Bu kullanım şartlarından doğan uyuşmazlıkların çözümünde öncelikle dostane anlaşma yolu denenir.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-3">Çözüm Aşamaları</h3>
                    <ol className="list-decimal list-inside text-blue-800 space-y-1">
                      <li>Müşteri hizmetleri ile görüşme</li>
                      <li>Şirket yönetimi ile toplantı</li>
                      <li>Arabuluculuk süreci</li>
                      <li>Yasal süreç başlatılması</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-3">Yetki ve Kanun</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-1">
                      <li>Ankara Mahkemeleri yetkilidir</li>
                      <li>Türk Hukuku uygulanır</li>
                      <li>Tüketici hakları saklıdır</li>
                      <li>KVKK hükümleri geçerlidir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Değişiklik ve Güncellemeler</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Bu Kullanım Şartları, yasal düzenlemeler, teknolojik gelişmeler veya iş gereksinimlerimiz doğrultusunda güncellenebilir.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Bildirim Yöntemleri</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Web sitesinde duyuru</li>
                      <li>E-posta ile bilgilendirme</li>
                      <li>SMS ile uyarı</li>
                      <li>Sosyal medya kanalları</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Yürürlük</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Değişiklikler derhal yürürlüğe girer</li>
                      <li>Önemli değişikliklerde 30 gün süre verilir</li>
                      <li>Devam eden kullanım kabul sayılır</li>
                      <li>İtiraz hakkı korunur</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Son güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')} <br/>
                  <strong>Yürürlük tarihi:</strong> {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Sorularınız mı Var?</h2>
              <p className="mb-6">Kullanım şartları hakkında her türlü soru ve öneriniz için bizimle iletişime geçebilirsiniz.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a href="tel:+903123570600" className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  +90 312 357 0600
                </a>
                <a href="mailto:info@ozmevsim.com" className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  info@ozmevsim.com
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