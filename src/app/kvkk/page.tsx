'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ShieldCheckIcon, UserGroupIcon, DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function KVKKPage() {
  return (
    <main className="min-h-screen main-content">
      {/* Header */}
      <Header />

      {/* KVKK Content */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <ShieldCheckIcon className="h-12 w-12 text-orange-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Öz Mevsim Isı Sistemleri Mühendislik olarak, kişisel verilerinizin güvenliği bizim için önceliktir.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <DocumentTextIcon className="h-8 w-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">1. Veri Sorumlusu</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  <strong>Öz Mevsim Isı Sistemleri Mühendislik İnşaat Sanayi ve Ticaret Limited Şirketi</strong> ("Şirket") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatıyla, kişisel verilerinizin işlenmesi hakkında sizi bilgilendirmek isteriz.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <p><strong>Adres:</strong> Kuşcağız Mahallesi Sanatoryum Caddesi No:221/A Keçiören, Ankara</p>
                  </div>
                  <div>
                    <p><strong>Telefon:</strong> +90 312 357 0600</p>
                    <p><strong>E-posta:</strong> info@ozmevsim.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <UserGroupIcon className="h-8 w-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">2. Kişisel Verilerin İşlenme Amaçları</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Müşteri Hizmetleri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Kombi, klima ve doğalgaz sistemi kurulum hizmetlerinin sunulması</li>
                    <li>Teknik destek ve servis hizmetlerinin verilmesi</li>
                    <li>Müşteri memnuniyetinin ölçülmesi ve geliştirilmesi</li>
                    <li>Şikâyet ve taleplerin değerlendirilmesi</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">İş Süreçleri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Sözleşme süreçlerinin yürütülmesi</li>
                    <li>Faturalandırma ve tahsilat işlemlerinin gerçekleştirilmesi</li>
                    <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                    <li>Mali müşavirlik ve muhasebe işlemlerinin yürütülmesi</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Pazarlama ve İletişim</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Yeni ürün ve hizmetlerden haberdar edilmesi</li>
                    <li>Özel kampanya ve indirimlerden bilgilendirilmesi</li>
                    <li>Anket ve araştırmalarda yer alması (gönüllü katılım)</li>
                    <li>İletişim tercihlerinin yönetilmesi</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. İşlenen Kişisel Veri Kategorileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Kimlik Bilgileri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Ad, soyad</li>
                    <li>T.C. kimlik numarası</li>
                    <li>Doğum tarihi</li>
                    <li>Nüfus cüzdanı bilgileri</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Telefon numarası</li>
                    <li>E-posta adresi</li>
                    <li>Ev/iş adresi</li>
                    <li>Faks numarası</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Finansal Bilgiler</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Banka hesap bilgileri</li>
                    <li>Kredi kartı bilgileri</li>
                    <li>Faturalandırma bilgileri</li>
                    <li>Ödeme geçmişi</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Müşteri İşlem Bilgileri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Satın alınan ürün/hizmetler</li>
                    <li>Şikâyet ve talepler</li>
                    <li>Servis geçmişi</li>
                    <li>Müşteri memnuniyet anketleri</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <div className="flex">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-700 mb-4">Kişisel verileriniz aşağıdaki hukuki sebeplere dayanarak işlenmektedir:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Sözleşmenin kurulması veya ifası:</strong> Hizmet sözleşmelerinin yapılması ve yerine getirilmesi</li>
                      <li><strong>Yasal yükümlülük:</strong> Vergi, SGK, ticaret kanunu gibi yasal düzenlemeler</li>
                      <li><strong>Meşru menfaat:</strong> Müşteri memnuniyeti, kalite geliştirme, güvenlik</li>
                      <li><strong>Açık rıza:</strong> Pazarlama faaliyetleri için alınan özel izinler</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Kişisel Verilerin Paylaşılması</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Kişisel verileriniz, yasal düzenlemeler çerçevesinde ve güvenlik tedbirleri alınarak aşağıdaki kişi ve kuruluşlarla paylaşılabilir:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-red-900 mb-2">Yasal Otoriteler</h3>
                    <p className="text-sm text-red-700">Mahkemeler, savcılık, emniyet, vergi dairesi</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-blue-900 mb-2">İş Ortakları</h3>
                    <p className="text-sm text-blue-700">Tedarikçiler, alt yükleniciler, lojistik firmaları</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-green-900 mb-2">Hizmet Sağlayıcıları</h3>
                    <p className="text-sm text-green-700">Mali müşavir, bilgi işlem, güvenlik hizmetleri</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Veri Saklama Süreleri</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Kişisel verileriniz, işleme amacının gerektirdiği süre kadar ve yasal saklama yükümlülükleri gözetilerek saklanmaktadır:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Müşteri Verileri</h3>
                    <p className="text-gray-700">Sözleşme süresi + 10 yıl (TTK gereği)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mali Kayıtlar</h3>
                    <p className="text-gray-700">5 yıl (VUK gereği)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">İş Sağlığı Kayıtları</h3>
                    <p className="text-gray-700">15 yıl (İSGK gereği)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pazarlama Verileri</h3>
                    <p className="text-gray-700">Rıza geri alınana kadar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Kişisel Veri Sahibinin Hakları</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-900 font-semibold mb-4">KVKK'nın 11. maddesi gereğince sahip olduğunuz haklar:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
                    <li>İşleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                    <li>Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme</li>
                  </ul>
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li>Eksik/yanlış işlenen verilerin düzeltilmesini isteme</li>
                    <li>Yasal şartların oluşması halinde silme/yok etme talep etme</li>
                    <li>Düzeltme/silme işlemlerinin aktarıldığı kişilere bildirilmesini isteme</li>
                    <li>Zararınızın giderilmesini talep etme</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Güvenlik Tedbirleri</h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Teknik Güvenlik</h3>
                  <ul className="list-disc list-inside text-green-800 space-y-1">
                    <li>SSL sertifikası ile şifreli veri aktarımı</li>
                    <li>Güvenlik duvarı ve antivirüs koruması</li>
                    <li>Düzenli güvenlik güncellemeleri</li>
                    <li>Erişim loglarının tutulması</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">İdari Güvenlik</h3>
                  <ul className="list-disc list-inside text-orange-800 space-y-1">
                    <li>Personel gizlilik taahhütnameleri</li>
                    <li>Erişim yetki kontrolü ve sınırlaması</li>
                    <li>KVKK farkındalık eğitimleri</li>
                    <li>Olağandışı durum müdahale planları</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Başvuru Yolları</h2>
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Kişisel veri sahibi olarak haklarınızı kullanmak için aşağıdaki yollarla başvurabilirsiniz:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-orange-900 mb-2">Yazılı Başvuru</h3>
                    <p className="text-sm text-orange-700">Kuşcağız Mah. Sanatoryum Cad. No:221/A Keçiören, Ankara</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-orange-900 mb-2">E-posta</h3>
                    <p className="text-sm text-orange-700">kvkk@ozmevsim.com</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-orange-900 mb-2">Güvenli Elektronik İmza</h3>
                    <p className="text-sm text-orange-700">KEP adresi üzerinden</p>
                  </div>
                </div>
                <p className="text-sm text-orange-700 mt-4">
                  * Başvurularınız en geç 30 gün içinde değerlendirilecek ve sonuçlandırılacaktır.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Değişiklikler ve Güncellemeler</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Bu KVKK Aydınlatma Metni, yasal düzenlemelerdeki değişiklikler veya şirketimizin veri işleme faaliyetlerindeki güncellemeler doğrultusunda revize edilebilir. Önemli değişiklikler hakkında web sitemiz üzerinden veya diğer uygun yollarla bilgilendirileceksiniz.
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Son güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')} <br/>
                  <strong>Yürürlük tarihi:</strong> {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Sorularınız mı var?</h2>
              <p className="mb-6">KVKK ile ilgili her türlü soru ve talepleriniz için bizimle iletişime geçebilirsiniz.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a href="tel:+903123570600" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  +90 312 357 0600
                </a>
                <a href="mailto:kvkk@ozmevsim.com" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  kvkk@ozmevsim.com
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