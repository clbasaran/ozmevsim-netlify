'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  TrophyIcon, 
  CogIcon,
  ChartBarIcon,
  HeartIcon,
  EyeIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: 'Yıllık Deneyim', value: '15+', icon: CalendarIcon },
    { label: 'Tamamlanan Proje', value: '2500+', icon: BuildingOfficeIcon },
    { label: 'Mutlu Müşteri', value: '1200+', icon: HeartIcon },
    { label: 'Uzman Ekip', value: '45+', icon: UserGroupIcon },
  ];

  const values = [
    {
      title: 'Kalite',
      description: 'En yüksek kalite standartlarında hizmet sunmak',
      icon: TrophyIcon,
    },
    {
      title: 'Güvenilirlik',
      description: 'Müşterilerimizin güvenini kazanmak ve korumak',
      icon: ShieldCheckIcon,
    },
    {
      title: 'İnovasyon',
      description: 'Sürekli gelişim ve yenilikçi çözümler',
      icon: CogIcon,
    },
    {
      title: 'Profesyonellik',
      description: 'Uzman kadro ile profesyonel hizmet',
      icon: AcademicCapIcon,
    },
  ];

  const teamMembers = [
    {
      name: 'Mehmet Özkan',
      role: 'Genel Müdür',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: 'Proje Yönetimi',
      experience: '25+ yıl',
      description: 'Isı sistemleri sektöründe 25 yıllık deneyime sahip.'
    },
    {
      name: 'Ayşe Demir',
      role: 'Proje Müdürü',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: 'Sistem Tasarımı',
      experience: '15+ yıl',
      description: 'Enerji verimliliği ve sistem optimizasyonu uzmanı.'
    },
    {
      name: 'Ali Kaya',
      role: 'Teknik Müdür',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: 'Kurulum & Montaj',
      experience: '12+ yıl',
      description: 'Kombi ve klima sistemleri kurulum uzmanı.'
    },
    {
      name: 'Fatma Şen',
      role: 'Müşteri İlişkileri Müdürü',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: 'Müşteri Hizmetleri',
      experience: '8+ yıl',
      description: 'Müşteri memnuniyeti ve destek hizmetleri uzmanı.'
    }
  ];

  const certifications = [
    'TSE Belgeli Firma',
    'ISO 9001 Kalite Yönetim Sistemi',
    'OHSAS 18001 İş Sağlığı ve Güvenliği',
    'ISO 14001 Çevre Yönetim Sistemi',
    'Yetkili Servis Belgesi',
    'EPDK Doğalgaz Lisansı',
  ];

  const timeline = [
    { year: '2008', event: 'Şirket kuruldu' },
    { year: '2010', event: 'İlk 100 proje tamamlandı' },
    { year: '2013', event: 'ISO 9001 belgesi alındı' },
    { year: '2016', event: '1000. proje milestone\'u' },
    { year: '2019', event: 'Yeni ofis ve depo açılışı' },
    { year: '2021', event: 'Dijital dönüşüm başladı' },
    { year: '2023', event: '2500+ proje tamamlandı' },
  ];

  return (
    <section id="about" className="pt-40 pb-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hakkımızda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            2008 yılından bu yana ısı sistemleri alanında güvenilir çözümler sunuyoruz
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <stat.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 bg-white rounded-xl p-2 shadow-lg">
          {[
            { key: 'story', label: 'Hikayemiz' },
            { key: 'mission', label: 'Misyon & Vizyon' },
            { key: 'team', label: 'Ekibimiz' },
            { key: 'certificates', label: 'Sertifikalarımız' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {/* Story Tab */}
          {activeTab === 'story' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Başarı Hikayemiz
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Öz Mevsim Isı Sistemleri, 2008 yılında küçük bir ekip ile başladığı yolculuğunda 
                  bugün 45+ uzman personeliyle İstanbul'un önde gelen ısı sistemleri şirketlerinden 
                  biri haline gelmiştir.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  15 yılı aşkın deneyimimizle 2500'den fazla projeyi başarıyla tamamladık. 
                  Kombi sistemlerinden klima kurulumlarına, doğalgaz tesisatından enerji verimliliği 
                  çözümlerine kadar geniş bir yelpazede hizmet sunuyoruz.
                </p>
                <div className="flex items-center space-x-4">
                  <MapPinIcon className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-600">
                    İstanbul merkezli, Türkiye geneli hizmet
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Zaman Çizelgesi
                </h4>
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
                    <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.year}
                    </div>
                    <div className="text-gray-700">
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Mission & Vision Tab */}
          {activeTab === 'mission' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <EyeIcon className="h-12 w-12 text-primary-600 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Vizyonumuz
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Türkiye'nin en güvenilir ve yenilikçi ısı sistemleri şirketi olmak. 
                    Sürdürülebilir enerji çözümleri ile çevreye duyarlı, müşteri odaklı 
                    hizmet anlayışımızla sektörde öncü olmaya devam etmek.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <HeartIcon className="h-12 w-12 text-primary-600 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Misyonumuz
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Müşterilerimizin konfor ve güvenliğini ön planda tutarak, en kaliteli 
                    ürünler ve profesyonel hizmet anlayışı ile ısı sistemleri alanında 
                    mükemmellik standardını yakalamak.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="text-center group">
                    <div className="bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <value.icon className="h-10 w-10 text-primary-600 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Uzman Ekibimiz
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Alanında uzman, deneyimli ve sertifikalı ekibimizle size en iyi hizmeti sunuyoruz
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <UserGroupIcon className="h-20 w-20 text-white" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h4>
                      <p className="text-primary-600 font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {member.experience} deneyim
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">
                        {member.expertise}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Sertifikalar & Belgeler
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Kalite ve güvenilirliğimizi belgeleyen sertifikalarımız
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <ShieldCheckIcon className="h-12 w-12 text-green-600 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {cert}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Aktif ve güncel belge
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
                <TrophyIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Kalite Güvencemiz
                </h4>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Tüm belgelerimiz aktif olup, düzenli olarak denetlenmekte ve yenilenmektedir. 
                  Bu sayede müşterilerimize en yüksek kalite standartlarında hizmet sunmaktayız.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 