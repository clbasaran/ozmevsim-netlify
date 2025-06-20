'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { 
  PlayIcon,
  DevicePhoneMobileIcon,
  WifiIcon,
  ChartBarIcon,
  CpuChipIcon,
  BoltIcon,
  ClockIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('mobile');
  const [liveData, setLiveData] = useState({
    temperature: 22,
    humidity: 45,
    energyUsage: '2.4',
    cost: '15.6'
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        temperature: Math.floor(Math.random() * 5) + 20,
        humidity: Math.floor(Math.random() * 20) + 40,
        energyUsage: (Math.random() * 2 + 1.5).toFixed(1),
        cost: (Math.random() * 10 + 10).toFixed(1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobil Kontrol',
      description: 'iOS ve Android uygulaması ile her yerden kontrol edin'
    },
    {
      icon: WifiIcon,
      title: 'IoT Bağlantısı',
      description: 'Wi-Fi ve 4G üzerinden anlık veri iletimi'
    },
    {
      icon: ChartBarIcon,
      title: 'Detaylı Raporlar',
      description: 'Enerji tüketimi ve tasarruf analizleri'
    },
    {
      icon: CpuChipIcon,
      title: 'Akıllı Sensörler',
      description: 'Sıcaklık, nem ve hava kalitesi ölçümleri'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Akıllı İklimlendirme
                  <span className="block text-blue-300">Demo Sistemi</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                  IoT teknolojisi ile cihazlarınızı uzaktan kontrol edin, 
                  enerji tasarrufu sağlayın ve konforunuzu artırın
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <PlayIcon className="h-5 w-5" />
                    Canlı Demo İzle
                  </motion.button>
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
            </div>
          </div>
        </section>

        {/* Live Demo Dashboard */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Canlı Monitoring Sistemi
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Gerçek zamanlı verilerle sisteminizin performansını takip edin
              </p>
            </motion.div>

            {/* Live Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Sıcaklık</h3>
                  <BoltIcon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{liveData.temperature}°C</div>
                <div className="text-red-100 text-sm">Hedef: 22°C</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Nem</h3>
                  <WifiIcon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{liveData.humidity}%</div>
                <div className="text-blue-100 text-sm">Optimal aralık</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Enerji</h3>
                  <ChartBarIcon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{liveData.energyUsage} kW</div>
                <div className="text-green-100 text-sm">%15 tasarruf</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Maliyet</h3>
                  <ClockIcon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2">₺{liveData.cost}</div>
                <div className="text-purple-100 text-sm">Günlük ortalama</div>
              </motion.div>
            </div>

            {/* Demo Interface Tabs */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex flex-wrap justify-center mb-8">
                <div className="flex bg-white rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setActiveTab('mobile')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === 'mobile'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mobil Uygulama
                  </button>
                  <button
                    onClick={() => setActiveTab('web')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === 'web'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Web Panel
                  </button>
                  <button
                    onClick={() => setActiveTab('automation')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === 'automation'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Otomasyon
                  </button>
                </div>
              </div>

              <div className="text-center">
                {activeTab === 'mobile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto"
                  >
                    <DevicePhoneMobileIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobil Kontrol</h3>
                    <p className="text-gray-600 mb-6">
                      iOS ve Android uygulaması ile cihazlarınızı her yerden kontrol edin.
                      Push bildirimler, otomatik programlama ve detaylı raporlar.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <strong>Uzaktan Kontrol</strong><br />
                        Sıcaklık ayarlama
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <strong>Programlama</strong><br />
                        Haftalık program
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'web' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto"
                  >
                    <ChartBarIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Web Yönetim Paneli</h3>
                    <p className="text-gray-600 mb-6">
                      Bilgisayarınızdan detaylı raporlar görün, çoklu cihaz yönetimi yapın
                      ve sistem ayarlarını optimize edin.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <strong>Detaylı Raporlar</strong><br />
                        Enerji analizi
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <strong>Çoklu Cihaz</strong><br />
                        Merkezi yönetim
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'automation' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto"
                  >
                    <Cog6ToothIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Akıllı Otomasyon</h3>
                    <p className="text-gray-600 mb-6">
                      Hava durumu, kullanım alışkanlıkları ve enerji fiyatlarına göre
                      otomatik optimizasyon yapan yapay zeka sistemi.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <strong>Yapay Zeka</strong><br />
                        Öğrenen sistem
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <strong>Enerji Optimizasyonu</strong><br />
                        %40 tasarruf
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
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
                  href="/iletisim"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold shadow-lg"
                >
                  Ücretsiz Keşif
                </motion.a>
                <motion.a
                  href="tel:+903123570600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold"
                >
                  Hemen Arayın
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