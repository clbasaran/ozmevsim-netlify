'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon,
  PhotoIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  TagIcon,
  LinkIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface SEOSettings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    keywords: string[];
    language: string;
    robots: string;
  };
  openGraph: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    siteName: string;
    type: string;
    locale: string;
  };
  twitter: {
    card: string;
    site: string;
    creator: string;
    title: string;
    description: string;
    image: string;
  };
  verification: {
    google: string;
    bing: string;
    yandex: string;
    pinterest: string;
  };
  analytics: {
    googleAnalytics: string;
    googleTagManager: string;
    facebookPixel: string;
    hotjar: string;
  };
  schema: {
    organizationName: string;
    organizationType: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
    socialProfiles: string[];
  };
}

const defaultSEOSettings: SEOSettings = {
  general: {
    siteName: 'Öz Mevsim Isı Sistemleri',
    siteDescription: '25 yıllık deneyimle Ankara\'da kombi, klima, doğalgaz sistemleri kurulum hizmetleri. Profesyonel mühendislik çözümleri.',
    siteUrl: 'https://ozmevsim.com',
    defaultTitle: 'Öz Mevsim - Isı Sistemleri Mühendislik',
    titleTemplate: '%s | Öz Mevsim',
    keywords: ['kombi kurulumu', 'klima montajı', 'doğalgaz sistemleri', 'ısı sistemleri', 'mühendislik', 'Ankara'],
    language: 'tr-TR',
    robots: 'index, follow'
  },
  openGraph: {
    title: 'Öz Mevsim - Isı Sistemleri Mühendislik',
    description: '25 yıllık deneyimle Ankara\'da kombi, klima, doğalgaz sistemleri kurulum hizmetleri.',
    image: '/og-image.jpg',
    imageAlt: 'Öz Mevsim Isı Sistemleri',
    siteName: 'Öz Mevsim',
    type: 'website',
    locale: 'tr_TR'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ozmevsim',
    creator: '@ozmevsim',
    title: 'Öz Mevsim - Isı Sistemleri Mühendislik',
    description: '25 yıllık deneyimle Ankara\'da kombi, klima, doğalgaz sistemleri kurulum hizmetleri.',
    image: '/twitter-image.jpg'
  },
  verification: {
    google: '',
    bing: '',
    yandex: '',
    pinterest: ''
  },
  analytics: {
    googleAnalytics: '',
    googleTagManager: '',
    facebookPixel: '',
    hotjar: ''
  },
  schema: {
    organizationName: 'Öz Mevsim Isı Sistemleri Mühendislik',
    organizationType: 'Organization',
    address: 'Çankaya Mahallesi, Ankara, Türkiye',
    phone: '+90532XXXXXXX',
    email: 'info@ozmevsim.com',
    logo: '/images/logo.png',
    socialProfiles: [
      'https://www.facebook.com/ozmevsim',
      'https://www.instagram.com/ozmevsim',
      'https://www.linkedin.com/company/ozmevsim',
      'https://twitter.com/ozmevsim'
    ]
  }
};

export default function SEOSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Load settings from localStorage
      const savedSettings = localStorage.getItem('ozmevsim_seo_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading SEO settings:', error);
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('ozmevsim_seo_settings', JSON.stringify(settings));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSettings = (section: keyof SEOSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addKeyword = () => {
    const newKeyword = prompt('Yeni anahtar kelime:');
    if (newKeyword && newKeyword.trim()) {
      setSettings(prev => ({
        ...prev,
        general: {
          ...prev.general,
          keywords: [...prev.general.keywords, newKeyword.trim()]
        }
      }));
    }
  };

  const removeKeyword = (index: number) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        keywords: prev.general.keywords.filter((_, i) => i !== index)
      }
    }));
  };

  const addSocialProfile = () => {
    const newProfile = prompt('Yeni sosyal medya profili URL:');
    if (newProfile && newProfile.trim()) {
      setSettings(prev => ({
        ...prev,
        schema: {
          ...prev.schema,
          socialProfiles: [...prev.schema.socialProfiles, newProfile.trim()]
        }
      }));
    }
  };

  const removeSocialProfile = (index: number) => {
    setSettings(prev => ({
      ...prev,
      schema: {
        ...prev.schema,
        socialProfiles: prev.schema.socialProfiles.filter((_, i) => i !== index)
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'Genel', icon: GlobeAltIcon },
    { id: 'opengraph', label: 'Open Graph', icon: PhotoIcon },
    { id: 'twitter', label: 'Twitter Cards', icon: DocumentTextIcon },
    { id: 'verification', label: 'Site Doğrulama', icon: CheckCircleIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'schema', label: 'Schema.org', icon: TagIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Ayarları</h1>
          <p className="text-gray-600 dark:text-gray-400">Site SEO ayarlarını ve meta verilerini yönetin</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            saveStatus === 'success'
              ? 'bg-green-600 text-white'
              : saveStatus === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Kaydediliyor...
            </>
          ) : saveStatus === 'success' ? (
            <>
              <CheckCircleIcon className="w-4 h-4" />
              Kaydedildi
            </>
          ) : saveStatus === 'error' ? (
            <>
              <ExclamationTriangleIcon className="w-4 h-4" />
              Hata
            </>
          ) : (
            'Kaydet'
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Genel SEO Ayarları</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => updateSettings('general', 'siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => updateSettings('general', 'siteUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Açıklaması
                </label>
                <textarea
                  rows={3}
                  value={settings.general.siteDescription}
                  onChange={(e) => updateSettings('general', 'siteDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">{settings.general.siteDescription.length}/160 karakter</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Varsayılan Başlık
                  </label>
                  <input
                    type="text"
                    value={settings.general.defaultTitle}
                    onChange={(e) => updateSettings('general', 'defaultTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Başlık Şablonu
                  </label>
                  <input
                    type="text"
                    value={settings.general.titleTemplate}
                    onChange={(e) => updateSettings('general', 'titleTemplate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                    placeholder="%s | Site Adı"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Anahtar Kelimeler
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {settings.general.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(index)}
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={addKeyword}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  + Anahtar Kelime Ekle
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dil
                  </label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => updateSettings('general', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="tr-TR">Türkçe (tr-TR)</option>
                    <option value="en-US">English (en-US)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Robots
                  </label>
                  <select
                    value={settings.general.robots}
                    onChange={(e) => updateSettings('general', 'robots', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="index, follow">Index, Follow</option>
                    <option value="noindex, nofollow">NoIndex, NoFollow</option>
                    <option value="index, nofollow">Index, NoFollow</option>
                    <option value="noindex, follow">NoIndex, Follow</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Open Graph Tab */}
      {activeTab === 'opengraph' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Open Graph Ayarları</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OG Başlık
                  </label>
                  <input
                    type="text"
                    value={settings.openGraph.title}
                    onChange={(e) => updateSettings('openGraph', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    value={settings.openGraph.siteName}
                    onChange={(e) => updateSettings('openGraph', 'siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  OG Açıklama
                </label>
                <textarea
                  rows={3}
                  value={settings.openGraph.description}
                  onChange={(e) => updateSettings('openGraph', 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  OG Görseli
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                    {settings.openGraph.image ? (
                      <img 
                        src={settings.openGraph.image} 
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="url"
                      value={settings.openGraph.image}
                      onChange={(e) => updateSettings('openGraph', 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      placeholder="/og-image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Önerilen boyut: 1200x630px</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Görsel Alt Metni
                </label>
                <input
                  type="text"
                  value={settings.openGraph.imageAlt}
                  onChange={(e) => updateSettings('openGraph', 'imageAlt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    İçerik Tipi
                  </label>
                  <select
                    value={settings.openGraph.type}
                    onChange={(e) => updateSettings('openGraph', 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="business.business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Locale
                  </label>
                  <input
                    type="text"
                    value={settings.openGraph.locale}
                    onChange={(e) => updateSettings('openGraph', 'locale', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Twitter Tab */}
      {activeTab === 'twitter' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Twitter Cards Ayarları</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Tipi
                  </label>
                  <select
                    value={settings.twitter.card}
                    onChange={(e) => updateSettings('twitter', 'card', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site (@username)
                  </label>
                  <input
                    type="text"
                    value={settings.twitter.site}
                    onChange={(e) => updateSettings('twitter', 'site', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                    placeholder="@ozmevsim"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter Başlık
                </label>
                <input
                  type="text"
                  value={settings.twitter.title}
                  onChange={(e) => updateSettings('twitter', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter Açıklama
                </label>
                <textarea
                  rows={3}
                  value={settings.twitter.description}
                  onChange={(e) => updateSettings('twitter', 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter Görseli
                </label>
                <input
                  type="url"
                  value={settings.twitter.image}
                  onChange={(e) => updateSettings('twitter', 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="/twitter-image.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Tab */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Site Doğrulama Kodları</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Google Search Console
                </label>
                <input
                  type="text"
                  value={settings.verification.google}
                  onChange={(e) => updateSettings('verification', 'google', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="google-site-verification kodu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bing Webmaster Tools
                </label>
                <input
                  type="text"
                  value={settings.verification.bing}
                  onChange={(e) => updateSettings('verification', 'bing', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="msvalidate.01 kodu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Yandex Webmaster
                </label>
                <input
                  type="text"
                  value={settings.verification.yandex}
                  onChange={(e) => updateSettings('verification', 'yandex', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="yandex-verification kodu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pinterest
                </label>
                <input
                  type="text"
                  value={settings.verification.pinterest}
                  onChange={(e) => updateSettings('verification', 'pinterest', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="p:domain_verify kodu"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Analytics ve Takip Kodları</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={settings.analytics.googleAnalytics}
                  onChange={(e) => updateSettings('analytics', 'googleAnalytics', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Google Tag Manager ID
                </label>
                <input
                  type="text"
                  value={settings.analytics.googleTagManager}
                  onChange={(e) => updateSettings('analytics', 'googleTagManager', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="GTM-XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.analytics.facebookPixel}
                  onChange={(e) => updateSettings('analytics', 'facebookPixel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="Facebook Pixel ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hotjar Site ID
                </label>
                <input
                  type="text"
                  value={settings.analytics.hotjar}
                  onChange={(e) => updateSettings('analytics', 'hotjar', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  placeholder="Hotjar Site ID"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema Tab */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Schema.org Yapılandırılmış Veri</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organizasyon Adı
                  </label>
                  <input
                    type="text"
                    value={settings.schema.organizationName}
                    onChange={(e) => updateSettings('schema', 'organizationName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organizasyon Tipi
                  </label>
                  <select
                    value={settings.schema.organizationType}
                    onChange={(e) => updateSettings('schema', 'organizationType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Organization">Organization</option>
                    <option value="Corporation">Corporation</option>
                    <option value="LocalBusiness">Local Business</option>
                    <option value="ProfessionalService">Professional Service</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adres
                </label>
                <input
                  type="text"
                  value={settings.schema.address}
                  onChange={(e) => updateSettings('schema', 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={settings.schema.phone}
                    onChange={(e) => updateSettings('schema', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={settings.schema.email}
                    onChange={(e) => updateSettings('schema', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={settings.schema.logo}
                  onChange={(e) => updateSettings('schema', 'logo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sosyal Medya Profilleri
                </label>
                <div className="space-y-2 mb-2">
                  {settings.schema.socialProfiles.map((profile, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="url"
                        value={profile}
                        onChange={(e) => {
                          const newProfiles = [...settings.schema.socialProfiles];
                          newProfiles[index] = e.target.value;
                          updateSettings('schema', 'socialProfiles', newProfiles);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        onClick={() => removeSocialProfile(index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addSocialProfile}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  + Sosyal Medya Profili Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}