'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { 
  WifiIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CpuChipIcon,
  BoltIcon,
  CloudIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  PlayIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Dynamic imports
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function IoTPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobil Kontrol',
      description: 'iOS ve Android uygulaması ile her yerden cihazlarınızı kontrol edin',
      details: [
        'Uzaktan sıcaklık ayarlama',
        'Program oluşturma ve düzenleme',
        'Anlık bildirimler',
        'Enerji tüketim takibi'
      ]
    },
    {
      icon: ChartBarIcon,
      title: 'Akıllı Analiz',
      description: 'Enerji tüketimi ve performans analizleri ile optimizasyon',
      details: [
        'Detaylı enerji raporları',
        'Kullanım pattern analizi',
        'Maliyet hesaplamaları',
        'Optimizasyon önerileri'
      ]
    },
    {
      icon: CpuChipIcon,
      title: 'IoT Sensörler',
      description: 'Gelişmiş sensörler ile ortam koşullarını sürekli takip',
      details: [
        'Sıcaklık ve nem ölçümü',
        'Hava kalitesi takibi',
        'Hareket algılama',
        'Işık seviyesi ölçümü'
      ]
    },
    {
      icon: CloudIcon,
      title: 'Bulut Entegrasyonu',
      description: 'Güvenli bulut altyapısı ile verileriniz her zaman güvende',
      details: [
        '256-bit SSL şifreleme',
        'Otomatik yedekleme',
        'Çoklu cihaz senkronizasyonu',
        '99.9% uptime garantisi'
      ]
    }
  ];

  const benefits = [
    {
      icon: BoltIcon,
      title: 'Enerji Tasarrufu',
      description: '%40\'a varan enerji tasarrufu',
      stat: '%40'
    },
    {
      icon: Cog6ToothIcon,
      title: 'Otomatik Optimizasyon',
      description: 'Yapay zeka ile kendini optimize eden sistem',
      stat: '7/24'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Güvenli Sistem',
      description: 'Bank seviyesi güvenlik protokolleri',
      stat: '256-bit'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Kolay Kullanım',
      description: 'Sezgisel arayüz ve basit kurulum',
      stat: '5 dk'
    }
  ];

  const packages = [
    {
      name: 'Başlangıç',
      description: 'Küçük evler için temel IoT kontrol',
      features: [
        '1 akıllı termostat',
        'Mobil uygulama',
        'Temel raporlama',
        '1 yıl garanti',
        'Kurulum dahil'
      ],
      popular: false
    },
    {
      name: 'Standart',
      description: 'Orta büyüklükteki evler için gelişmiş kontrol',
      features: [
        '3 akıllı termostat',
        'IoT sensörler (5 adet)',
        'Gelişmiş analiz',
        'Ses kontrolü',
        '2 yıl garanti',
        'Kurulum ve eğitim'
      ],
      popular: true
    },
    {
      name: 'Premium',
      description: 'Büyük evler ve işyerleri için tam entegrasyon',
      features: [
        'Sınırsız cihaz',
        'Tüm sensör tipleri',
        'AI optimizasyon',
        'Teknik destek',
        '3 yıl garanti',
        'VIP kurulum ve eğitim'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  IoT ile
                  <span className="block text-blue-300">Akıllı İklimlendirme</span>
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Nesnelerin İnterneti teknolojisi ile cihazlarınızı uzaktan kontrol edin, 
                  enerji tasarrufu sağlayın ve konforunuzu maksimuma çıkarın.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="/demo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <PlayIcon className="h-5 w-5" />
                    Demo İzle
                  </motion.a>
                  <motion.a
                    href="/iletisim"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold border border-white/20"
                  >
                    Teklif Al
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <WifiIcon className="h-12 w-12 text-blue-300 mx-auto mb-3" />
                      <div className="text-2xl font-bold">7/24</div>
                      <div className="text-blue-100 text-sm">Monitoring</div>
                    </div>
                    <div className="text-center">
                      <BoltIcon className="h-12 w-12 text-green-300 mx-auto mb-3" />
                      <div className="text-2xl font-bold">%40</div>
                      <div className="text-blue-100 text-sm">Enerji Tasarrufu</div>
                    </div>
                    <div className="text-center">
                      <CpuChipIcon className="h-12 w-12 text-purple-300 mx-auto mb-3" />
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-blue-100 text-sm">IoT Cihazı</div>
                    </div>
                    <div className="text-center">
                      <DevicePhoneMobileIcon className="h-12 w-12 text-yellow-300 mx-auto mb-3" />
                      <div className="text-2xl font-bold">1 App</div>
                      <div className="text-blue-100 text-sm">Tek Kontrol</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                IoT Sistem Özellikleri
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Gelişmiş teknoloji ile maksimum konfor ve minimum enerji tüketimi
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl cursor-pointer transition-all ${
                      activeFeature === index
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start gap-4">
                      <feature.icon className={`h-8 w-8 mt-1 ${
                        activeFeature === index ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        {activeFeature === index && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-2"
                          >
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                {detail}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Akıllı Kontrol Merkezi</h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Salon Sıcaklığı</span>
                        <span className="font-bold">22°C</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white rounded-full h-2 w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Enerji Tüketimi</span>
                        <span className="font-bold">2.4 kW</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-green-400 rounded-full h-2 w-1/2"></div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Haftalık Tasarruf</span>
                        <span className="font-bold">₺45</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-yellow-400 rounded-full h-2 w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                IoT Sisteminin Avantajları
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Geleneksel sistemlere göre IoT ile elde edeceğiniz faydalar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{benefit.stat}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                IoT Paketleri
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                İhtiyacınıza uygun paketi seçin, hemen kurulum yapın
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-8 rounded-2xl shadow-lg ${
                    pkg.popular
                      ? 'bg-blue-600 text-white scale-105'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                        En Popüler
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold mb-2 ${
                      pkg.popular ? 'text-white' : 'text-gray-900'
                    }`}>
                      {pkg.name}
                    </h3>
                    <p className={pkg.popular ? 'text-blue-100' : 'text-gray-600'}>
                      {pkg.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircleIcon className={`h-5 w-5 ${
                          pkg.popular ? 'text-blue-200' : 'text-green-500'
                        }`} />
                        <span className={pkg.popular ? 'text-blue-100' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="/iletisim"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full text-center py-4 rounded-xl font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-white text-blue-600 hover:bg-gray-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Paketi Seç
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                IoT Sisteminizi Hemen Kuralım
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Uzman ekibimiz ile akıllı iklimlendirme sistemini evinize getirin.
                Ücretsiz keşif ve kurulum danışmanlığı alın.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/demo"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center gap-2"
                >
                  <PlayIcon className="h-5 w-5" />
                  Demo İzle
                </motion.a>
                <motion.a
                  href="/iletisim"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold"
                >
                  Ücretsiz Keşif
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 