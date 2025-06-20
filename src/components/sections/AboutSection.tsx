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
  PhoneIcon,
  EnvelopeIcon,
  DocumentIcon
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

  // Team members state - will be updated from localStorage
  const [teamMembers, setTeamMembers] = useState([
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
  ]);

  // Timeline/milestones state - will be updated from localStorage
  const [timeline, setTimeline] = useState([
    { year: '2008', event: 'Şirket kuruldu' },
    { year: '2010', event: 'İlk 100 proje tamamlandı' },
    { year: '2013', event: 'ISO 9001 belgesi alındı' },
    { year: '2016', event: '1000. proje milestone\'u' },
    { year: '2019', event: 'Yeni ofis ve depo açılışı' },
    { year: '2021', event: 'Dijital dönüşüm başladı' },
    { year: '2023', event: '2500+ proje tamamlandı' },
  ]);

  // Load team members from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server-side
    
    const loadTeamMembers = () => {
      const savedTeamMembers = localStorage.getItem('team-members');
      if (savedTeamMembers) {
        try {
          const parsedTeamMembers = JSON.parse(savedTeamMembers);
          // Convert admin format to display format
          const displayTeamMembers = parsedTeamMembers
            .filter((member: any) => member.name && member.name.trim()) // Only show members with names
            .map((member: any) => ({
              name: member.name || 'İsimsiz',
              role: member.position || 'Pozisyon Belirtilmemiş',
              image: member.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              expertise: (member.specializations && member.specializations.length > 0) 
                ? member.specializations[0] 
                : (member.position || 'Genel'),
              experience: member.yearsOfExperience 
                ? `${member.yearsOfExperience}+ yıl` 
                : '0+ yıl',
              description: member.bio || 'Açıklama bulunmuyor.',
              email: member.email || '',
              phone: member.phone || '',
              linkedin: member.linkedin || '',
              twitter: member.twitter || '',
              location: member.location || '',
              education: member.education || '',
              certifications: member.certifications || [],
              languages: member.languages || [],
              achievements: member.achievements || []
            }));
          if (displayTeamMembers.length > 0) {
            setTeamMembers(displayTeamMembers);
          }
        } catch (error) {
          console.error('Error parsing team members:', error);
        }
      }
    };

    // Load timeline/milestones from localStorage
    const loadTimeline = () => {
      const savedMilestones = localStorage.getItem('milestones');
      if (savedMilestones) {
        try {
          const parsedMilestones = JSON.parse(savedMilestones);
          // Convert admin format to display format
          const displayTimeline = parsedMilestones
            .filter((milestone: any) => milestone.year && milestone.title)
            .map((milestone: any) => ({
              year: milestone.year,
              event: milestone.title
            }))
            .sort((a: any, b: any) => parseInt(a.year) - parseInt(b.year)); // Sort by year
          
          if (displayTimeline.length > 0) {
            setTimeline(displayTimeline);
          }
        } catch (error) {
          console.error('Error parsing milestones:', error);
        }
      }
    };

    // Load certificates from localStorage
    const loadCertificates = () => {
      const savedCertificates = localStorage.getItem('certificates');
      if (savedCertificates) {
        try {
          const parsedCertificates = JSON.parse(savedCertificates);
          // Filter out empty certificates and format for display
          const displayCertificates = parsedCertificates
            .filter((cert: any) => cert.name && cert.name.trim())
            .map((cert: any) => ({
              id: cert.id,
              name: cert.name,
              issuer: cert.issuer || 'Belirtilmemiş',
              date: cert.date || new Date().toISOString().split('T')[0],
              file: cert.file || ''
            }));
          
          if (displayCertificates.length > 0) {
            setCertificates(displayCertificates);
          }
        } catch (error) {
          console.error('Error parsing certificates:', error);
        }
      }
    };

    // Load about data from localStorage
    const loadAboutData = () => {
      const savedAboutData = localStorage.getItem('about-data');
      if (savedAboutData) {
        try {
          const parsedAboutData = JSON.parse(savedAboutData);
          setAboutData({
            storyTitle: parsedAboutData.storyTitle || 'Başarı Hikayemiz',
            storyDescription1: parsedAboutData.storyDescription1 || aboutData.storyDescription1,
            storyDescription2: parsedAboutData.storyDescription2 || aboutData.storyDescription2,
            storyLocation: parsedAboutData.storyLocation || aboutData.storyLocation,
            heroTitle: parsedAboutData.heroTitle || 'Hakkımızda',
            heroDescription: parsedAboutData.heroDescription || '2008 yılından bu yana ısı sistemleri alanında güvenilir çözümler sunuyoruz'
          });
        } catch (error) {
          console.error('Error parsing about data:', error);
        }
      }
    };

    // Load initially
    loadTeamMembers();
    loadTimeline();
    loadCertificates();
    loadAboutData();

    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'team-members') {
        loadTeamMembers();
      } else if (e.key === 'milestones') {
        loadTimeline();
      } else if (e.key === 'certificates') {
        loadCertificates();
      } else if (e.key === 'about-data') {
        loadAboutData();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleTeamUpdate = () => {
      loadTeamMembers();
    };

    const handleTimelineUpdate = () => {
      loadTimeline();
    };

    const handleCertificatesUpdate = () => {
      loadCertificates();
    };

    const handleAboutDataUpdate = () => {
      loadAboutData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('teamMembersUpdated', handleTeamUpdate);
    window.addEventListener('timelineUpdated', handleTimelineUpdate);
    window.addEventListener('certificatesUpdated', handleCertificatesUpdate);
    window.addEventListener('aboutDataUpdated', handleAboutDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('teamMembersUpdated', handleTeamUpdate);
      window.removeEventListener('timelineUpdated', handleTimelineUpdate);
      window.removeEventListener('certificatesUpdated', handleCertificatesUpdate);
      window.removeEventListener('aboutDataUpdated', handleAboutDataUpdate);
    };
  }, []);

  // Certificates state - will be updated from localStorage
  const [certificates, setCertificates] = useState([
    {
      id: '1',
      name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
      issuer: 'TSE',
      date: '2020-06-15'
    },
    {
      id: '2',
      name: 'HVAC Teknik Yeterlilik Belgesi',
      issuer: 'Enerji Bakanlığı',
      date: '2019-03-20'
    }
  ]);

  // About data state - will be updated from localStorage
  const [aboutData, setAboutData] = useState({
    storyTitle: 'Başarı Hikayemiz',
    storyDescription1: 'Öz Mevsim Isı Sistemleri, 2008 yılında küçük bir ekip ile başladığı yolculuğunda bugün 45+ uzman personeliyle İstanbul\'un önde gelen ısı sistemleri şirketlerinden biri haline gelmiştir.',
    storyDescription2: '15 yılı aşkın deneyimimizle 2500\'den fazla projeyi başarıyla tamamladık. Kombi sistemlerinden klima kurulumlarına, doğalgaz tesisatından enerji verimliliği çözümlerine kadar geniş bir yelpazede hizmet sunuyoruz.',
    storyLocation: 'İstanbul merkezli, Türkiye geneli hizmet',
    heroTitle: 'Hakkımızda',
    heroDescription: '2008 yılından bu yana ısı sistemleri alanında güvenilir çözümler sunuyoruz'
  });



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
            2008 yılından bu yana ısı sistemleri sektöründe güvenilir çözümler sunarak, binlerce mutlu müşteriye hizmet veriyoruz.
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
                  {aboutData.storyTitle}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {aboutData.storyDescription1}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {aboutData.storyDescription2}
                </p>
                <div className="flex items-center space-x-4">
                  <MapPinIcon className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-600">
                    {aboutData.storyLocation}
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
                    Müşterilerimize en kaliteli ısı sistemleri çözümlerini sunarak, 
                    konforlu ve enerji verimli yaşam alanları oluşturmalarına katkı sağlamak. 
                    Teknik bilgi birikimine dayalı profesyonel hizmet anlayışımızla 
                    müşteri memnuniyetini en üst seviyeye çıkarmak.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Değerlerimiz
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="text-center">
                      <value.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
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
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      {member.image && member.image.startsWith('http') ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextEl = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextEl) nextEl.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center ${member.image && member.image.startsWith('http') ? 'hidden' : ''}`}>
                        <UserGroupIcon className="h-20 w-20 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h4>
                      <p className="text-primary-600 font-medium mb-2">
                        {member.role}
                      </p>
                      
                      <div className="space-y-1 mb-3">
                        <p className="text-gray-600 text-sm flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {member.experience} deneyim
                        </p>
                        {(member as any).location && (
                          <p className="text-gray-600 text-sm flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {(member as any).location}
                          </p>
                        )}
                      </div>

                      <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">
                        {member.expertise}
                      </p>

                      {(member as any).education && (
                        <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">
                          🎓 {(member as any).education}
                        </p>
                      )}

                      {(member as any).certifications && (member as any).certifications.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {(member as any).certifications.slice(0, 2).map((cert: string, certIndex: number) => (
                            <span key={certIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {cert}
                            </span>
                          ))}
                          {(member as any).certifications.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{(member as any).certifications.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex space-x-2">
                          {(member as any).email && (
                            <a
                              href={`mailto:${(member as any).email}`}
                              className="text-gray-400 hover:text-primary-600 transition-colors"
                            >
                              <EnvelopeIcon className="h-4 w-4" />
                            </a>
                          )}
                          {(member as any).phone && (
                            <a
                              href={`tel:${(member as any).phone}`}
                              className="text-gray-400 hover:text-primary-600 transition-colors"
                            >
                              <PhoneIcon className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          {(member as any).linkedin && (
                            <a
                              href={(member as any).linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-xs"
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
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
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Sertifikalarımız ve Belgelerimiz
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Kalite standartlarımızı gösteren sertifikalar ve yetki belgelerimiz
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert: any, index: number) => (
                  <div key={cert.id || index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary-600">
                    <div className="flex items-start">
                      <ShieldCheckIcon className="h-8 w-8 text-primary-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {cert.name}
                        </h4>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Veren:</span> {cert.issuer}
                          </p>
                          {cert.date && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Tarih:</span> {new Date(cert.date).toLocaleDateString('tr-TR')}
                            </p>
                          )}
                          {cert.file && (
                            <a
                              href={cert.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mt-2"
                            >
                              <DocumentIcon className="h-4 w-4 mr-1" />
                              Belgeyi Görüntüle
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {certificates.length === 0 && (
                <div className="text-center py-12">
                  <ShieldCheckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Henüz sertifika eklenmemiş
                  </p>
                </div>
              )}
              
              <div className="mt-12 bg-primary-600 rounded-2xl p-8 text-center text-white">
                <TrophyIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">
                  Kalite ve Güven Garantimiz
                </h3>
                <p className="text-primary-100 max-w-2xl mx-auto">
                  Tüm sertifikalarımız ve belgelerimiz, müşterilerimize sunduğumuz 
                  hizmetin kalitesini ve güvenilirliğini garanti altına alır.
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