'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhotoIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  CogIcon,
  ChartBarIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { getAllHeroSlides, updateHeroSlide, addHeroSlide, deleteHeroSlide, type HeroSlide as DataHeroSlide } from '@/lib/data';

// Admin interface that matches the data.ts structure
interface AdminHeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  stats: Array<{ value: string; label: string }>;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  isActive: boolean;
}

interface FeaturedService {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
  isActive: boolean;
  order: number;
}

interface HomeStat {
  id: number;
  label: string;
  value: string;
  icon: string;
  isActive: boolean;
  order: number;
}

interface HomeTestimonial {
  id: number;
  name: string;
  company: string;
  comment: string;
  avatar?: string;
  rating: number;
  isActive: boolean;
  order: number;
}

interface HomeSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  servicesTitle: string;
  servicesSubtitle: string;
  statsTitle: string;
  testimonialsTitle: string;
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

const defaultServices: FeaturedService[] = [
  {
    id: 1,
    title: 'Kombi Sistemleri',
    description: 'Modern ve verimli kombi kurulum ve bakım hizmetleri',
    icon: 'fire',
    link: '/hizmetler/kombi',
    isActive: true,
    order: 1
  },
  {
    id: 2,
    title: 'Klima Sistemleri',
    description: 'Profesyonel klima montaj ve servis hizmetleri',
    icon: 'snowflake',
    link: '/hizmetler/klima',
    isActive: true,
    order: 2
  },
  {
    id: 3,
    title: 'Bakım ve Onarım',
    description: 'Tüm marka ve modeller için bakım ve onarım',
    icon: 'wrench',
    link: '/hizmetler/bakim',
    isActive: true,
    order: 3
  }
];

const defaultStats: HomeStat[] = [
  {
    id: 1,
    label: 'Mutlu Müşteri',
    value: '500+',
    icon: 'users',
    isActive: true,
    order: 1
  },
  {
    id: 2,
    label: 'Tamamlanan Proje',
    value: '1200+',
    icon: 'chart',
    isActive: true,
    order: 2
  },
  {
    id: 3,
    label: 'Yıllık Deneyim',
    value: '15+',
    icon: 'clock',
    isActive: true,
    order: 3
  },
  {
    id: 4,
    label: 'Teknik Personel',
    value: '20+',
    icon: 'team',
    isActive: true,
    order: 4
  }
];

const defaultTestimonials: HomeTestimonial[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    company: 'Ev Sahibi',
    comment: 'Kombi montajında çok memnun kaldık. Hızlı ve kaliteli hizmet aldık.',
    rating: 5,
    isActive: true,
    order: 1
  },
  {
    id: 2,
    name: 'Fatma Demir',
    company: 'İşletme Sahibi',
    comment: 'Klima sistemleri için başvurduğumuz firmadan çok memnunuz. Tavsiye ederiz.',
    rating: 5,
    isActive: true,
    order: 2
  }
];

const defaultSettings: HomeSettings = {
  heroTitle: 'Güvenilir Isı Sistemleri',
  heroSubtitle: 'Uzman Kadro, Kaliteli Hizmet',
  aboutTitle: 'Hakkımızda',
  aboutDescription: 'Öz Mevsim Isı Sistemleri olarak, yılların deneyimi ile...',
  servicesTitle: 'Hizmetlerimiz',
  servicesSubtitle: 'Size en uygun çözümü sunuyoruz',
  statsTitle: 'Rakamlarla Öz Mevsim',
  testimonialsTitle: 'Müşteri Yorumları',
  cta: {
    title: 'Hemen İletişime Geçin',
    description: 'Uzman ekibimizle randevu alın',
    buttonText: 'Randevu Al',
    buttonLink: '/randevu'
  }
};

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'testimonials' | 'settings'>('hero');
  const [slides, setSlides] = useState<AdminHeroSlide[]>([]);
  const [services, setServices] = useState<FeaturedService[]>([]);
  const [stats, setStats] = useState<HomeStat[]>([]);
  const [testimonials, setTestimonials] = useState<HomeTestimonial[]>([]);
  const [settings, setSettings] = useState<HomeSettings>({
    heroTitle: '',
    heroSubtitle: '',
    aboutTitle: '',
    aboutDescription: '',
    servicesTitle: '',
    servicesSubtitle: '',
    statsTitle: '',
    testimonialsTitle: '',
    cta: {
      title: '',
      description: '',
      buttonText: '',
      buttonLink: ''
    }
  });
  
  const [showSlideForm, setShowSlideForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showStatForm, setShowStatForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  
  const [editingSlide, setEditingSlide] = useState<AdminHeroSlide | null>(null);
  const [editingService, setEditingService] = useState<FeaturedService | null>(null);
  const [editingStat, setEditingStat] = useState<HomeStat | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<HomeTestimonial | null>(null);
  const [loading, setLoading] = useState(true);

  // Load actual hero slides from data.ts
  useEffect(() => {
    const loadSlides = () => {
      try {
        const heroSlides = getAllHeroSlides();
        setSlides(heroSlides);
      } catch (error) {
        console.error('Error loading hero slides:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSlides();

    // Listen for updates
    const handleHeroSlidesUpdated = () => {
      loadSlides();
    };

    window.addEventListener('heroSlidesUpdated', handleHeroSlidesUpdated);
    return () => window.removeEventListener('heroSlidesUpdated', handleHeroSlidesUpdated);
  }, []);

  // Load other data from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedServices = localStorage.getItem('homeServices');
      if (savedServices) {
        setServices(JSON.parse(savedServices));
      } else {
        setServices(defaultServices);
      }

      const savedStats = localStorage.getItem('homeStats');
      if (savedStats) {
        console.log('Loading stats from localStorage:', JSON.parse(savedStats));
        setStats(JSON.parse(savedStats));
      } else {
        console.log('Loading default stats:', defaultStats);
        setStats(defaultStats);
      }

      const savedTestimonials = localStorage.getItem('homeTestimonials');
      if (savedTestimonials) {
        setTestimonials(JSON.parse(savedTestimonials));
      } else {
        setTestimonials(defaultTestimonials);
      }

      const savedSettings = localStorage.getItem('homeSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      } else {
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Fallback to defaults on error
      setServices(defaultServices);
      setStats(defaultStats);
      setTestimonials(defaultTestimonials);
      setSettings(defaultSettings);
    }
  }, []);

  // Save services to localStorage when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (services.length > 0) {
      try {
        localStorage.setItem('homeServices', JSON.stringify(services));
      } catch (error) {
        console.error('Error saving services:', error);
      }
    }
  }, [services]);

  // Save stats to localStorage when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (stats.length > 0) {
      try {
        console.log('Saving stats to localStorage:', stats);
        localStorage.setItem('homeStats', JSON.stringify(stats));
        // Trigger event to update frontend
        window.dispatchEvent(new Event('statsUpdated'));
      } catch (error) {
        console.error('Error saving stats:', error);
      }
    }
  }, [stats]);

  // Save testimonials to localStorage when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (testimonials.length > 0) {
      try {
        localStorage.setItem('homeTestimonials', JSON.stringify(testimonials));
      } catch (error) {
        console.error('Error saving testimonials:', error);
      }
    }
  }, [testimonials]);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (settings.heroTitle || settings.aboutTitle || settings.servicesTitle) {
      try {
        localStorage.setItem('homeSettings', JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    }
  }, [settings]);

  const handleSaveSlide = (slideData: AdminHeroSlide) => {
    try {
      if (editingSlide) {
        updateHeroSlide(editingSlide.id, slideData);
      } else {
        addHeroSlide({
          title: slideData.title,
          subtitle: slideData.subtitle,
          description: slideData.description,
          backgroundImage: slideData.backgroundImage,
          stats: slideData.stats,
          primaryCTA: slideData.primaryCTA,
          secondaryCTA: slideData.secondaryCTA,
          isActive: slideData.isActive
        });
      }
      
      // Reload slides
      setSlides(getAllHeroSlides());
      setShowSlideForm(false);
      setEditingSlide(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Slide kaydedilirken hata oluştu.');
    }
  };

  const handleDeleteSlide = (id: number) => {
    if (confirm('Bu slide\'ı silmek istediğinizden emin misiniz?')) {
      try {
        deleteHeroSlide(id);
        setSlides(getAllHeroSlides());
      } catch (error) {
        console.error('Error deleting slide:', error);
        alert('Slide silinirken hata oluştu.');
      }
    }
  };

  const handleToggleActive = (id: number) => {
    const slide = slides.find(s => s.id === id);
    if (slide) {
      updateHeroSlide(id, { isActive: !slide.isActive });
      setSlides(getAllHeroSlides());
    }
  };

  const tabs = [
    { id: 'hero', name: 'Hero Slider', icon: PhotoIcon },
    { id: 'services', name: 'Öne Çıkan Hizmetler', icon: SparklesIcon },
    { id: 'testimonials', name: 'Müşteri Yorumları', icon: UserGroupIcon },
    { id: 'settings', name: 'Genel Ayarlar', icon: CogIcon }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ana Sayfa Yönetimi</h1>
            <p className="mt-1 text-sm text-gray-600">Yükleniyor...</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ana Sayfa Yönetimi</h1>
          <p className="mt-1 text-sm text-gray-600">
            Ana sayfa içeriğini yönetin ve düzenleyin ({slides.length} hero slide)
          </p>
        </div>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
          <EyeIcon className="w-4 h-4" />
          Önizleme
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Hero Slider Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Hero Slider Yönetimi</h2>
                <button
                  onClick={() => {
                    setEditingSlide(null);
                    setShowSlideForm(true);
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Yeni Slide
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {slides.map((slide) => (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      slide.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={slide.backgroundImage}
                        alt={slide.title}
                        className="w-32 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{slide.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{slide.subtitle}</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{slide.description}</p>
                            
                            {/* Stats */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {slide.stats.slice(0, 4).map((stat, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {stat.value} {stat.label}
                                </span>
                              ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex gap-2 mt-2">
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                {slide.primaryCTA.text}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                {slide.secondaryCTA.text}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => handleToggleActive(slide.id)}
                                className={`px-2 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                                  slide.isActive 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                              >
                                {slide.isActive ? 'Aktif' : 'Pasif'}
                              </button>
                              <span className="text-xs text-gray-500">ID: {slide.id}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-4">
                            <button
                              onClick={() => {
                                setEditingSlide(slide);
                                setShowSlideForm(true);
                              }}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Düzenle"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSlide(slide.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Sil"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {slides.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz hero slide yok</h3>
                  <p className="mt-1 text-sm text-gray-500">Başlamak için ilk slide'ı oluşturun.</p>
                </div>
              )}
            </div>
          )}

          {/* Featured Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Öne Çıkan Hizmetler</h2>
                <button
                  onClick={() => {
                    setEditingService(null);
                    setShowServiceForm(true);
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Yeni Hizmet
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      service.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 text-sm">{service.icon}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{service.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            service.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {service.isActive ? 'Aktif' : 'Pasif'}
                          </span>
                          <span className="text-xs text-gray-500">Sıra: {service.order}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <button
                          onClick={() => {
                            setEditingService(service);
                            setShowServiceForm(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setServices(services.filter(s => s.id !== service.id));
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}



          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Müşteri Yorumları</h2>
                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    setShowTestimonialForm(true);
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Yeni Yorum
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      testimonial.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingTestimonial(testimonial);
                            setShowTestimonialForm(true);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setTestimonials(testimonials.filter(t => t.id !== testimonial.id));
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 italic">"{testimonial.comment}"</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        testimonial.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {testimonial.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Genel Ayarlar</h2>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  
                  const newSettings: HomeSettings = {
                    heroTitle: formData.get('heroTitle') as string,
                    heroSubtitle: formData.get('heroSubtitle') as string,
                    aboutTitle: formData.get('aboutTitle') as string,
                    aboutDescription: formData.get('aboutDescription') as string,
                    servicesTitle: formData.get('servicesTitle') as string,
                    servicesSubtitle: formData.get('servicesSubtitle') as string,
                    statsTitle: formData.get('statsTitle') as string,
                    testimonialsTitle: formData.get('testimonialsTitle') as string,
                    cta: {
                      title: formData.get('ctaTitle') as string,
                      description: formData.get('ctaDescription') as string,
                      buttonText: formData.get('ctaButtonText') as string,
                      buttonLink: formData.get('ctaButtonLink') as string,
                    }
                  };
                  
                  setSettings(newSettings);
                  localStorage.setItem('homeSettings', JSON.stringify(newSettings));
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Hero Ana Başlık
                    </label>
                    <input
                      type="text"
                      name="heroTitle"
                      defaultValue={settings.heroTitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Hero Alt Başlık
                    </label>
                    <input
                      type="text"
                      name="heroSubtitle"
                      defaultValue={settings.heroSubtitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Hakkımızda Başlık
                    </label>
                    <input
                      type="text"
                      name="aboutTitle"
                      defaultValue={settings.aboutTitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Hizmetler Başlık
                    </label>
                    <input
                      type="text"
                      name="servicesTitle"
                      defaultValue={settings.servicesTitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Hizmetler Alt Başlık
                    </label>
                    <input
                      type="text"
                      name="servicesSubtitle"
                      defaultValue={settings.servicesSubtitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      İstatistikler Başlık
                    </label>
                    <input
                      type="text"
                      name="statsTitle"
                      defaultValue={settings.statsTitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Yorumlar Başlık
                    </label>
                    <input
                      type="text"
                      name="testimonialsTitle"
                      defaultValue={settings.testimonialsTitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Hakkımızda Açıklama
                  </label>
                  <textarea
                    name="aboutDescription"
                    rows={4}
                    defaultValue={settings.aboutDescription}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white resize-none"
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">CTA Bölümü</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        CTA Başlık
                      </label>
                      <input
                        type="text"
                        name="ctaTitle"
                        defaultValue={settings.cta.title}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        CTA Açıklama
                      </label>
                      <input
                        type="text"
                        name="ctaDescription"
                        defaultValue={settings.cta.description}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Buton Metni
                      </label>
                      <input
                        type="text"
                        name="ctaButtonText"
                        defaultValue={settings.cta.buttonText}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Buton Linki
                      </label>
                      <input
                        type="text"
                        name="ctaButtonLink"
                        defaultValue={settings.cta.buttonLink}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Ayarları Kaydet
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Slide Form Modal */}
      <AnimatePresence>
        {showSlideForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingSlide ? 'Hero Slide Düzenle' : 'Yeni Hero Slide'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowSlideForm(false);
                      setEditingSlide(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  
                  // Parse stats
                  const stats = [];
                  for (let i = 0; i < 4; i++) {
                    const value = formData.get(`stat_value_${i}`) as string;
                    const label = formData.get(`stat_label_${i}`) as string;
                    if (value && label) {
                      stats.push({ value, label });
                    }
                  }

                  const slideData: AdminHeroSlide = {
                    id: editingSlide?.id || 0,
                    title: formData.get('title') as string,
                    subtitle: formData.get('subtitle') as string,
                    description: formData.get('description') as string,
                    backgroundImage: formData.get('backgroundImage') as string,
                    stats,
                    primaryCTA: {
                      text: formData.get('primaryCTA_text') as string,
                      href: formData.get('primaryCTA_href') as string
                    },
                    secondaryCTA: {
                      text: formData.get('secondaryCTA_text') as string,
                      href: formData.get('secondaryCTA_href') as string
                    },
                    isActive: formData.get('isActive') === 'on'
                  };
                  handleSaveSlide(slideData);
                }}
                className="p-6 space-y-6"
              >
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Ana Başlık *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={editingSlide?.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="Öz Mevsim Isı Sistemleri"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Alt Başlık *
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      required
                      defaultValue={editingSlide?.subtitle}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="Mühendislik Çözümleri"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Açıklama *
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    required
                    defaultValue={editingSlide?.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white resize-none"
                    placeholder="Slide açıklaması..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Arka Plan Görsel URL *
                  </label>
                  <input
                    type="url"
                    name="backgroundImage"
                    required
                    defaultValue={editingSlide?.backgroundImage}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    placeholder="https://images.unsplash.com/photo-.../image.jpg"
                  />
                </div>

                {/* Stats */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    İstatistikler (4 adet)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            name={`stat_value_${index}`}
                            defaultValue={editingSlide?.stats[index]?.value || ''}
                            placeholder="25+"
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                          />
                          <input
                            type="text"
                            name={`stat_label_${index}`}
                            defaultValue={editingSlide?.stats[index]?.label || ''}
                            placeholder="Yıllık Deneyim"
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Birincil CTA
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="primaryCTA_text"
                        defaultValue={editingSlide?.primaryCTA.text}
                        placeholder="İletişim"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                      <input
                        type="text"
                        name="primaryCTA_href"
                        defaultValue={editingSlide?.primaryCTA.href}
                        placeholder="tel:+903123570600"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      İkincil CTA
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="secondaryCTA_text"
                        defaultValue={editingSlide?.secondaryCTA.text}
                        placeholder="Online Randevu"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                      <input
                        type="text"
                        name="secondaryCTA_href"
                        defaultValue={editingSlide?.secondaryCTA.href}
                        placeholder="/randevu"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    defaultChecked={editingSlide?.isActive ?? true}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 font-medium">
                    Slide aktif (Ana sayfada gösterilecek)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSlideForm(false);
                      setEditingSlide(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
                  >
                    <CheckIcon className="w-4 h-4" />
                    {editingSlide ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Form Modal */}
      <AnimatePresence>
        {showServiceForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowServiceForm(false);
                      setEditingService(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  
                  const serviceData: FeaturedService = {
                    id: editingService?.id || Date.now(),
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    icon: formData.get('icon') as string,
                    link: formData.get('link') as string,
                    isActive: formData.get('isActive') === 'on',
                    order: parseInt(formData.get('order') as string) || services.length + 1
                  };

                  if (editingService) {
                    setServices(services.map(s => s.id === editingService.id ? serviceData : s));
                  } else {
                    setServices([...services, serviceData]);
                  }
                  
                  setShowServiceForm(false);
                  setEditingService(null);
                }}
                className="p-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Başlık *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={editingService?.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="Kombi Sistemleri"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      İkon
                    </label>
                    <input
                      type="text"
                      name="icon"
                      defaultValue={editingService?.icon}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="🔥"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Açıklama *
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    required
                    defaultValue={editingService?.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white resize-none"
                    placeholder="Hizmet açıklaması..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      defaultValue={editingService?.link}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="/hizmetler/kombi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Sıra
                    </label>
                    <input
                      type="number"
                      name="order"
                      defaultValue={editingService?.order}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="serviceActive"
                    defaultChecked={editingService?.isActive ?? true}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="serviceActive" className="ml-2 block text-sm text-gray-900 font-medium">
                    Hizmet aktif
                  </label>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowServiceForm(false);
                      setEditingService(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
                  >
                    <CheckIcon className="w-4 h-4" />
                    {editingService ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stat Form Modal */}
      <AnimatePresence>
        {showStatForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingStat ? 'İstatistik Düzenle' : 'Yeni İstatistik'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowStatForm(false);
                      setEditingStat(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  
                  const statData: HomeStat = {
                    id: editingStat?.id || Date.now(),
                    label: formData.get('label') as string,
                    value: formData.get('value') as string,
                    icon: formData.get('icon') as string,
                    isActive: formData.get('isActive') === 'on',
                    order: parseInt(formData.get('order') as string) || stats.length + 1
                  };

                  console.log('Stat form submitted:', statData);
                  console.log('Current stats:', stats);

                  if (editingStat) {
                    const updatedStats = stats.map(s => s.id === editingStat.id ? statData : s);
                    console.log('Updated stats (edit):', updatedStats);
                    setStats(updatedStats);
                  } else {
                    const newStats = [...stats, statData];
                    console.log('New stats (add):', newStats);
                    setStats(newStats);
                  }
                  
                  setShowStatForm(false);
                  setEditingStat(null);
                }}
                className="p-6 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Değer *
                    </label>
                    <input
                      type="text"
                      name="value"
                      required
                      defaultValue={editingStat?.value}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="500+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      İkon
                    </label>
                    <input
                      type="text"
                      name="icon"
                      defaultValue={editingStat?.icon}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="👥"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Etiket *
                  </label>
                  <input
                    type="text"
                    name="label"
                    required
                    defaultValue={editingStat?.label}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    placeholder="Mutlu Müşteri"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sıra
                  </label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={editingStat?.order}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    placeholder="1"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="statActive"
                    defaultChecked={editingStat?.isActive ?? true}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="statActive" className="ml-2 block text-sm text-gray-900 font-medium">
                    İstatistik aktif
                  </label>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowStatForm(false);
                      setEditingStat(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
                  >
                    <CheckIcon className="w-4 h-4" />
                    {editingStat ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial Form Modal */}
      <AnimatePresence>
        {showTestimonialForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingTestimonial ? 'Yorum Düzenle' : 'Yeni Yorum'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowTestimonialForm(false);
                      setEditingTestimonial(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  
                  const testimonialData: HomeTestimonial = {
                    id: editingTestimonial?.id || Date.now(),
                    name: formData.get('name') as string,
                    company: formData.get('company') as string,
                    comment: formData.get('comment') as string,
                    rating: parseInt(formData.get('rating') as string) || 5,
                    isActive: formData.get('isActive') === 'on',
                    order: parseInt(formData.get('order') as string) || testimonials.length + 1
                  };

                  if (editingTestimonial) {
                    setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? testimonialData : t));
                  } else {
                    setTestimonials([...testimonials, testimonialData]);
                  }
                  
                  setShowTestimonialForm(false);
                  setEditingTestimonial(null);
                }}
                className="p-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      İsim *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={editingTestimonial?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="Ahmet Yılmaz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Şirket/Pozisyon
                    </label>
                    <input
                      type="text"
                      name="company"
                      defaultValue={editingTestimonial?.company}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="Ev Sahibi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Yorum *
                  </label>
                  <textarea
                    name="comment"
                    rows={4}
                    required
                    defaultValue={editingTestimonial?.comment}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white resize-none"
                    placeholder="Müşteri yorumu..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Puan (1-5)
                    </label>
                    <select
                      name="rating"
                      defaultValue={editingTestimonial?.rating || 5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    >
                      <option value={5}>5 Yıldız</option>
                      <option value={4}>4 Yıldız</option>
                      <option value={3}>3 Yıldız</option>
                      <option value={2}>2 Yıldız</option>
                      <option value={1}>1 Yıldız</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Sıra
                    </label>
                    <input
                      type="number"
                      name="order"
                      defaultValue={editingTestimonial?.order}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="testimonialActive"
                    defaultChecked={editingTestimonial?.isActive ?? true}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="testimonialActive" className="ml-2 block text-sm text-gray-900 font-medium">
                    Yorum aktif
                  </label>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTestimonialForm(false);
                      setEditingTestimonial(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
                  >
                    <CheckIcon className="w-4 h-4" />
                    {editingTestimonial ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
