'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneIcon,
  HomeIcon,
  DocumentTextIcon,
  CogIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  TruckIcon,
  AcademicCapIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  icon: any;
  duration: string;
  features: string[];
  tools: string[];
  responsible: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'İletişim ve Danışmanlık',
    description: 'Uzman ekibimizle iletişime geçin, ihtiyaçlarınızı paylaşın',
    detailedDescription: 'Müşterilerimizle ilk temas kurduğumuz aşamada, ihtiyaçlarınızı dinler, mevcut sisteminiz hakkında bilgi alır ve size en uygun çözümleri önermeye başlarız. Bu aşamada hiçbir ücret talep etmiyoruz.',
    icon: PhoneIcon,
    duration: '30 dakika',
    features: ['Ücretsiz danışmanlık', 'Uzman görüşü', 'İhtiyaç analizi', '7/24 erişim'],
    tools: ['Telefon', 'WhatsApp', 'Online form', 'Yüz yüze görüşme'],
    responsible: 'Satış Danışmanı',
    deliverables: ['İhtiyaç raporu', 'Ön bilgilendirme', 'Randevu planlaması']
  },
  {
    id: 2,
    title: 'Keşif ve Teknik İnceleme',
    description: 'Uzman teknisyenlerimiz ücretsiz keşif için mekanınıza gelir',
    detailedDescription: 'Deneyimli teknisyenlerimiz evinize veya işyerinize gelerek detaylı teknik inceleme yapar. Mevcut sistem analiz edilir, alan ölçümleri alınır ve size özel çözüm önerileri hazırlanır.',
    icon: MagnifyingGlassIcon,
    duration: '2-3 saat',
    features: ['Ücretsiz keşif', 'Detaylı ölçüm', 'Fotoğraflı rapor', 'Teknik analiz'],
    tools: ['Ölçüm cihazları', 'Termal kamera', 'Basınç ölçer', 'Dijital formlar'],
    responsible: 'Baş Teknisyen',
    deliverables: ['Teknik rapor', 'Ölçüm verileri', 'Fotoğraf dokümantasyonu', 'Öneriler']
  },
  {
    id: 3,
    title: 'Proje Tasarımı ve Teklif',
    description: 'Size özel proje tasarımı ve detaylı fiyat teklifi hazırlanır',
    detailedDescription: 'Keşif verilerine dayalı olarak, ihtiyaçlarınıza tam uygun proje tasarımı yapılır. Ürün seçimi, sistem şeması ve detaylı maliyet analizi ile birlikte kapsamlı teklif sunulur.',
    icon: DocumentTextIcon,
    duration: '2-3 gün',
    features: ['Özel tasarım', 'Detaylı teklif', 'Alternatif çözümler', 'Maliyet analizi'],
    tools: ['AutoCAD', 'Maliyet hesaplama', 'Ürün kataloğu', 'Proje yönetimi'],
    responsible: 'Proje Müdürü',
    deliverables: ['Proje çizimleri', 'Detaylı teklif', 'Ürün spesifikasyonları', 'Zaman planı']
  },
  {
    id: 4,
    title: 'Sözleşme ve Sipariş',
    description: 'Teklif onaylandıktan sonra sözleşme imzalanır ve ürünler sipariş edilir',
    detailedDescription: 'Teklifimizi beğendiğinizde, şeffaf sözleşme imzalanır ve ürünleriniz orijinal tedarikçilerden sipariş edilir. Ödeme planınız ve kurulum tarihiniz belirlenir.',
    icon: DocumentTextIcon,
    duration: '1 gün',
    features: ['Şeffaf sözleşme', 'Orijinal ürün garantisi', 'Esnek ödeme', 'Tarih garantisi'],
    tools: ['Dijital sözleşme', 'Sipariş sistemi', 'Ödeme terminali', 'Lojistik takip'],
    responsible: 'Satış Müdürü',
    deliverables: ['İmzalı sözleşme', 'Sipariş onayı', 'Ödeme planı', 'Kurulum tarihi']
  },
  {
    id: 5,
    title: 'Ürün Temini ve Hazırlık',
    description: 'Ürünler temin edilir ve kurulum için tüm hazırlıklar yapılır',
    detailedDescription: 'Sipariş edilen ürünler orijinal bayilerden temin edilir, kalite kontrolden geçirilir ve kurulum için gerekli tüm malzemeler hazırlanır. Kurulum ekibi belirlenir.',
    icon: TruckIcon,
    duration: '3-7 gün',
    features: ['Orijinal ürün', 'Kalite kontrol', 'Hızlı temin', 'Tam donanım'],
    tools: ['Tedarik ağı', 'Kalite kontrol', 'Depo yönetimi', 'Lojistik takip'],
    responsible: 'Lojistik Uzmanı',
    deliverables: ['Ürün teslimatı', 'Kalite sertifikası', 'Kurulum malzemeleri', 'Ekip ataması']
  },
  {
    id: 6,
    title: 'Profesyonel Kurulum',
    description: 'Uzman ekibimiz sisteminizi kusursuz şekilde kurar',
    detailedDescription: 'Sertifikalı teknisyenlerimiz mekanınıza gelir ve sisteminizi güvenlik standartlarına uygun şekilde kurar. Kurulum sırasında mekanınızın temizliğine özen gösterilir.',
    icon: WrenchScrewdriverIcon,
    duration: '4-8 saat',
    features: ['Uzman kurulum', 'Güvenlik önceliği', 'Temiz çalışma', 'Hızlı tamamlama'],
    tools: ['Profesyonel araçlar', 'Güvenlik ekipmanları', 'Koruyucu örtüler', 'Test cihazları'],
    responsible: 'Kurulum Ekibi',
    deliverables: ['Kurulu sistem', 'Test raporları', 'Kullanım kılavuzu', 'Garanti belgeleri']
  },
  {
    id: 7,
    title: 'Test ve Devreye Alma',
    description: 'Sistem kapsamlı testlerden geçirilerek devreye alınır',
    detailedDescription: 'Kurulum tamamlandıktan sonra sistem detaylı testlerden geçirilir. Güvenlik kontrolleri yapılır, performans ölçümleri alınır ve sistem optimize edilir.',
    icon: ChartBarIcon,
    duration: '1-2 saat',
    features: ['Kapsamlı test', 'Güvenlik kontrolü', 'Performans ölçümü', 'Optimizasyon'],
    tools: ['Test cihazları', 'Ölçüm aletleri', 'Güvenlik kontrol', 'Performans analizi'],
    responsible: 'Kalite Kontrol Uzmanı',
    deliverables: ['Test raporları', 'Güvenlik onayı', 'Performans verileri', 'Sistem ayarları']
  },
  {
    id: 8,
    title: 'Eğitim ve Teslim',
    description: 'Sistem kullanımı hakkında eğitim verilir ve teslim edilir',
    detailedDescription: 'Müşterilerimize sistemi nasıl kullanacakları, nelere dikkat edecekleri ve bakım konusunda detaylı eğitim veririz. Tüm belgeler teslim edilir.',
    icon: AcademicCapIcon,
    duration: '1 saat',
    features: ['Detaylı eğitim', 'Kullanım kılavuzu', 'Bakım bilgileri', 'Acil durum prosedürü'],
    tools: ['Eğitim materyalleri', 'Kullanım kılavuzu', 'Video anlatım', 'Soru-cevap'],
    responsible: 'Müşteri İlişkileri',
    deliverables: ['Kullanım eğitimi', 'Yazılı dökümanlar', 'İletişim bilgileri', 'Acil durum rehberi']
  },
  {
    id: 9,
    title: 'Garanti ve Servis',
    description: 'Uzun vadeli garanti ve sürekli servis desteği sağlanır',
    detailedDescription: 'Sistemlerimiz için 2+3 yıl garanti veriyoruz. Garanti süresi boyunca tüm servis hizmetleri ücretsizdir. Düzenli bakım hatırlatmaları yapılır.',
    icon: ShieldCheckIcon,
    duration: '5 yıl',
    features: ['2+3 yıl garanti', 'Ücretsiz servis', 'Düzenli bakım', 'Yedek parça garantisi'],
    tools: ['Servis takip sistemi', 'Hatırlatma sistemi', 'Yedek parça stoku', 'Mobil servis'],
    responsible: 'Servis Müdürü',
    deliverables: ['Garanti belgesi', 'Servis planı', 'İletişim hattı', 'Bakım takvimi']
  }
];

const processFeatures = [
  {
    title: 'Ücretsiz Keşif',
    description: 'Keşif ve danışmanlık hizmetlerimiz tamamen ücretsizdir',
    icon: MagnifyingGlassIcon
  },
  {
    title: 'Hızlı Çözüm',
    description: 'Ortalama 7-10 gün içinde projelerinizi tamamlıyoruz',
    icon: ClockIcon
  },
  {
    title: 'Uzman Ekip',
    description: 'Sertifikalı ve deneyimli teknisyenlerimizle çalışıyoruz',
    icon: UserGroupIcon
  },
  {
    title: 'Garanti',
    description: '2 yıl ürün + 3 yıl işçilik garantisi veriyoruz',
    icon: ShieldCheckIcon
  }
];

export default function ProcessSection() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'features'>('overview');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Çalışma Sürecimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İlk görüşmeden garanti sonrası servise kadar, adım adım profesyonel sürecimiz
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'timeline'
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Zaman Çizelgesi
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'features'
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Özellikler
            </button>
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>

                {/* Duration */}
                <div className="flex items-center text-sm text-primary-600 font-medium mb-4">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {step.duration}
                </div>

                {/* Features Preview */}
                <div className="space-y-1">
                  {step.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Expanded Content */}
                {selectedStep === step.id && (
                  <motion.div
                    className="mt-6 pt-6 border-t border-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 mb-4">{step.detailedDescription}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Sorumlu:</h4>
                        <p className="text-sm text-gray-600">{step.responsible}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Teslimatlar:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {step.deliverables.map((deliverable, index) => (
                            <li key={index}>• {deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
              
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative flex items-start mb-12 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <span className="text-sm text-primary-600 font-medium bg-primary-100 px-3 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{step.detailedDescription}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Ana Özellikler:</h4>
                          <ul className="space-y-1">
                            {step.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                                <StarIcon className="h-4 w-4 text-yellow-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Kullanılan Araçlar:</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.tools.map((tool, toolIndex) => (
                              <span
                                key={toolIndex}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <CogIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">
            Projenizi Başlatalım
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
            Uzman ekibimizle tanışın, ücretsiz keşif hizmetimizden yararlanın ve hayalinizdeki sistem için ilk adımı atın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium text-lg flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Ücretsiz Keşif
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 font-medium text-lg">
              Proje Danışmanlığı
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 