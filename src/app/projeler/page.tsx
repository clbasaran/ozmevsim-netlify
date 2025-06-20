'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon,
  HomeIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  StarIcon,
  ChevronRightIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  location: string;
  completedDate: string;
  image: string;
  description: string;
  scope: string[];
  results: {
    energySaving: string;
    satisfaction: string;
    duration: string;
  };
  featured: boolean;
}

export default function ProjelerPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Atatürk Kültür Merkezi İklimlendirme',
      category: 'cultural',
      client: 'Ankara Büyükşehir Belediyesi',
      location: 'Kızılay, Ankara',
      completedDate: '2023',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3',
      description: '5000 m² alanı kapsayan merkezi iklimlendirme sistemi projesi',
      scope: ['VRF Sistem', 'Merkezi Kontrol', 'Enerji Yönetimi', 'BMS Entegrasyonu'],
      results: {
        energySaving: '%35',
        satisfaction: '%98',
        duration: '45 gün'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Bahçelievler Sitesi Kombi Yenileme',
      category: 'residential',
      client: 'Bahçelievler Site Yönetimi',
      location: 'Bahçelievler, Ankara',
      completedDate: '2024',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3',
      description: '120 daireli sitede kombi değişimi ve doğalgaz tesisatı yenileme',
      scope: ['Kombi Değişimi', 'Tesisat Yenileme', 'Güvenlik Testleri', 'Bakım Planı'],
      results: {
        energySaving: '%25',
        satisfaction: '%95',
        duration: '30 gün'
      },
      featured: true
    },
    {
      id: 3,
      title: 'Ankara Üniversitesi Mühendislik Fakültesi',
      category: 'educational',
      client: 'Ankara Üniversitesi',
      location: 'Gölbaşı, Ankara',
      completedDate: '2023',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3',
      description: 'Mühendislik fakültesi binalarında akıllı iklimlendirme sistemi',
      scope: ['Akıllı Kontrol', 'Zonal Sistem', 'IoT Sensörler', 'Enerji Monitoring'],
      results: {
        energySaving: '%40',
        satisfaction: '%92',
        duration: '60 gün'
      },
      featured: false
    },
    {
      id: 4,
      title: 'Armada AVM Klima Sistemi',
      category: 'commercial',
      client: 'Armada AVM',
      location: 'Söğütözü, Ankara',
      completedDate: '2023',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3',
      description: 'AVM genelinde merkezi klima sistemi kurulumu ve bakımı',
      scope: ['Merkezi Klima', 'Havalandırma', 'Filtre Sistemleri', '7/24 Bakım'],
      results: {
        energySaving: '%30',
        satisfaction: '%96',
        duration: '90 gün'
      },
      featured: true
    },
    {
      id: 5,
      title: 'Çankaya Belediyesi Hizmet Binası',
      category: 'government',
      client: 'Çankaya Belediyesi',
      location: 'Çankaya, Ankara',
      completedDate: '2024',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3',
      description: 'Belediye hizmet binasında enerji verimli ısıtma sistemi',
      scope: ['Enerji Audit', 'Sistem Optimizasyonu', 'LED Dönüşüm', 'Akıllı Termostat'],
      results: {
        energySaving: '%45',
        satisfaction: '%99',
        duration: '40 gün'
      },
      featured: false
    },
    {
      id: 6,
      title: 'Villa Kompleksi İklimlendirme',
      category: 'residential',
      client: 'Özel Müşteri',
      location: 'Oran, Ankara',
      completedDate: '2024',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3',
      description: '15 villalık komplekste merkezi ısıtma ve soğutma sistemi',
      scope: ['VRV Sistem', 'Underfloor Heating', 'Pool Heating', 'Smart Home'],
      results: {
        energySaving: '%38',
        satisfaction: '%100',
        duration: '75 gün'
      },
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Tüm Projeler', icon: BuildingOfficeIcon },
    { id: 'residential', name: 'Konut', icon: HomeIcon },
    { id: 'commercial', name: 'Ticari', icon: ShoppingBagIcon },
    { id: 'educational', name: 'Eğitim', icon: AcademicCapIcon },
    { id: 'cultural', name: 'Kültürel', icon: BuildingOfficeIcon },
    { id: 'government', name: 'Kamu', icon: BuildingOfficeIcon }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Tamamlanan
                <span className="block text-blue-400">Projelerimiz</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
                25 yıllık deneyimimizle Ankara'da gerçekleştirdiğimiz 
                başarılı iklimlendirme projeleri
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <BuildingOfficeIcon className="h-5 w-5 text-blue-400" />
                  <span>500+ Tamamlanan Proje</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-blue-400" />
                  <span>10.000+ Mutlu Müşteri</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-blue-400" />
                  <span>%98 Memnuniyet</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Öne Çıkan Projeler
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                En büyük ve en başarılı projelerimizden seçmeler
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Öne Çıkan
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        {project.completedDate}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{project.results.energySaving}</div>
                        <div className="text-xs text-gray-500">Enerji Tasarrufu</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{project.results.satisfaction}</div>
                        <div className="text-xs text-gray-500">Memnuniyet</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{project.results.duration}</div>
                        <div className="text-xs text-gray-500">Süre</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.scope.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Projects with Filter */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tüm Projeler
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kategorilere göre filtreleyin ve detayları inceleyin
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeFilter === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <div className="absolute top-3 left-3">
                        <StarIcon className="h-6 w-6 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.client}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="h-3 w-3" />
                        {project.completedDate}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-sm font-bold text-green-600">{project.results.energySaving}</div>
                        <div className="text-xs text-gray-500">Tasarruf</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-blue-600">{project.results.satisfaction}</div>
                        <div className="text-xs text-gray-500">Memnuniyet</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-purple-600">{project.results.duration}</div>
                        <div className="text-xs text-gray-500">Süre</div>
                      </div>
                    </div>
                    <button className="w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center justify-center gap-2 group">
                      Detayları Gör
                      <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Rakamlarla Başarımız
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                25 yıllık deneyimimizin rakamları konuşuyor
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-100">Tamamlanan Proje</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">%35</div>
                <div className="text-blue-100">Ortalama Enerji Tasarrufu</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">%98</div>
                <div className="text-blue-100">Müşteri Memnuniyeti</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">25</div>
                <div className="text-blue-100">Yıllık Deneyim</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sizin Projeniz de Bu Listede Olsun
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                25 yıllık deneyimimiz ve uzman ekibimizle sizin için de 
                mükemmel bir iklimlendirme sistemi kuralım.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/iletisim"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
                >
                  Ücretsiz Keşif
                </motion.a>
                <motion.a
                  href="/randevu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-xl font-semibold"
                >
                  Online Randevu
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