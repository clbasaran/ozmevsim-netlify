'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  PhotoIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  CameraIcon,
  DocumentTextIcon,
  TagIcon,
  StarIcon,
  ShieldCheckIcon,
  TrophyIcon,
  HeartIcon,
  UserGroupIcon,
  ChartBarIcon,
  FireIcon,
  BoltIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface CompanyInfo {
  name: string;
  slogan: string;
  description: string;
  logo: string;
  favicon: string;
  foundedYear: string;
  experience: string;
  employeeCount: string;
  projectCount: string;
  customerCount: string;
  satisfactionRate: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  emergencyPhone: string;
  whatsapp: string;
  fax: string;
  website: string;
}

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  validUntil: string;
  certificateNumber: string;
  image: string;
  active: boolean;
}

interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

const mockSettings: GeneralSettings = {
  siteName: 'Öz Mevsim Isı Sistemleri',
  siteDescription: '25 yıllık deneyimle Ankara\'da kombi, klima, doğalgaz sistemleri kurulum hizmetleri.',
  siteUrl: 'https://ozmevsim.com',
  adminEmail: 'admin@ozmevsim.com',
  timezone: 'Europe/Istanbul',
  language: 'tr',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '24',
  maintenanceMode: false,
  registrationEnabled: true,
  emailNotifications: true,
  smsNotifications: false
};

const GeneralSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showModal, setShowModal] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [settings, setSettings] = useState<GeneralSettings>(mockSettings);
  const [isSaving, setIsSaving] = useState(false);

  // Company Information
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'Öz Mevsim Isı Sistemleri Mühendislik',
    slogan: 'Güvenilir Isı Çözümleri',
    description: '25 yıllık deneyimle Ankara\'da kombi, klima ve doğalgaz sistemleri kurulum hizmetleri sunuyoruz. Müşteri memnuniyeti odaklı yaklaşımımızla kaliteli ve güvenilir çözümler üretiyoruz.',
    logo: '/Mevsim-4.png',
    favicon: '/favicon.ico',
    foundedYear: '1998',
    experience: '25+',
    employeeCount: '45+',
    projectCount: '10.000+',
    customerCount: '2.500+',
    satisfactionRate: '%98'
  });

  // Contact Information
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+90 312 357 0600',
    email: 'info@ozmevsim.com',
    address: 'Kuşcağız Mahallesi, Sanatoryum Caddesi No:221/A, Keçiören, Ankara',
    workingHours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
    emergencyPhone: '+90 532 446 7367',
    whatsapp: '+90 532 446 7367',
    fax: '+90 212 555 0124',
    website: 'www.ozmevsim.com'
  });

  // Social Media
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    facebook: 'https://facebook.com/ozmevsim',
    instagram: 'https://instagram.com/ozmevsim',
    twitter: 'https://twitter.com/ozmevsim',
    linkedin: 'https://linkedin.com/company/ozmevsim',
    youtube: 'https://youtube.com/ozmevsim',
    tiktok: 'https://tiktok.com/@ozmevsim'
  });

  // Certifications
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: 1,
      name: 'TSE Sertifikası',
      issuer: 'Türk Standartları Enstitüsü',
      date: '2020-01-15',
      validUntil: '2025-01-15',
      certificateNumber: 'TSE-2020-001',
      image: '/certificates/tse.jpg',
      active: true
    },
    {
      id: 2,
      name: 'ISO 9001:2015',
      issuer: 'Kalite Yönetim Sistemi',
      date: '2019-06-20',
      validUntil: '2024-06-20',
      certificateNumber: 'ISO-9001-2019',
      image: '/certificates/iso.jpg',
      active: true
    },
    {
      id: 3,
      name: 'Yetkili Servis Belgesi',
      issuer: 'Bosch Termoteknik',
      date: '2018-03-10',
      validUntil: '2024-03-10',
      certificateNumber: 'BOSCH-YS-2018',
      image: '/certificates/bosch.jpg',
      active: true
    }
  ]);

  const tabs = [
    { id: 'company', name: 'Şirket Bilgileri', icon: BuildingOfficeIcon },
    { id: 'contact', name: 'İletişim Bilgileri', icon: PhoneIcon },
    { id: 'social', name: 'Sosyal Medya', icon: GlobeAltIcon },
    { id: 'certifications', name: 'Sertifikalar', icon: ShieldCheckIcon },
    { id: 'stats', name: 'İstatistikler', icon: ChartBarIcon }
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    alert('Ayarlar başarıyla kaydedildi!');
  };

  const handleInputChange = (field: keyof GeneralSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCertificationEdit = (cert: Certification | null) => {
    setEditingCertification(cert);
    setShowModal(true);
  };

  const handleCertificationSave = () => {
    if (!editingCertification) return;

    if (editingCertification.id === 0) {
      // Add new certification
      setCertifications(prev => [...prev, { ...editingCertification, id: Date.now() }]);
    } else {
      // Update existing certification
      setCertifications(prev => prev.map(cert => 
        cert.id === editingCertification.id ? editingCertification : cert
      ));
    }

    setShowModal(false);
    setEditingCertification(null);
  };

  const handleCertificationDelete = (id: number) => {
    if (confirm('Bu sertifikayı silmek istediğinizden emin misiniz?')) {
      setCertifications(prev => prev.filter(cert => cert.id !== id));
    }
  };

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Şirket Adı
            </label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slogan
            </label>
            <input
              type="text"
              value={companyInfo.slogan}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, slogan: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Şirket Açıklaması
            </label>
            <textarea
              value={companyInfo.description}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kuruluş Yılı
              </label>
              <input
                type="text"
                value={companyInfo.foundedYear}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, foundedYear: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deneyim
              </label>
              <input
                type="text"
                value={companyInfo.experience}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={companyInfo.logo}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, logo: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                <PhotoIcon className="h-5 w-5" />
              </button>
            </div>
            {companyInfo.logo && (
              <div className="mt-2">
                <img src={companyInfo.logo} alt="Logo" className="h-16 w-auto" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Favicon URL
            </label>
            <input
              type="text"
              value={companyInfo.favicon}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, favicon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Çalışan Sayısı
              </label>
              <input
                type="text"
                value={companyInfo.employeeCount}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, employeeCount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Proje Sayısı
              </label>
              <input
                type="text"
                value={companyInfo.projectCount}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, projectCount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Müşteri Sayısı
              </label>
              <input
                type="text"
                value={companyInfo.customerCount}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, customerCount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Memnuniyet Oranı
              </label>
              <input
                type="text"
                value={companyInfo.satisfactionRate}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, satisfactionRate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <PhoneIcon className="h-4 w-4 inline mr-2" />
              Telefon
            </label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <EnvelopeIcon className="h-4 w-4 inline mr-2" />
              E-posta
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPinIcon className="h-4 w-4 inline mr-2" />
              Adres
            </label>
            <textarea
              value={contactInfo.address}
              onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <ClockIcon className="h-4 w-4 inline mr-2" />
              Çalışma Saatleri
            </label>
            <input
              type="text"
              value={contactInfo.workingHours}
              onChange={(e) => setContactInfo(prev => ({ ...prev, workingHours: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Acil Durum Telefonu
            </label>
            <input
              type="tel"
              value={contactInfo.emergencyPhone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, emergencyPhone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              value={contactInfo.whatsapp}
              onChange={(e) => setContactInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fax
            </label>
            <input
              type="tel"
              value={contactInfo.fax}
              onChange={(e) => setContactInfo(prev => ({ ...prev, fax: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              value={contactInfo.website}
              onChange={(e) => setContactInfo(prev => ({ ...prev, website: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Facebook
            </label>
            <input
              type="url"
              value={socialMedia.facebook}
              onChange={(e) => setSocialMedia(prev => ({ ...prev, facebook: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="https://facebook.com/ozmevsim"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Instagram
            </label>
            <input
              type="url"
              value={socialMedia.instagram}
              onChange={(e) => setSocialMedia(prev => ({ ...prev, instagram: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="https://instagram.com/ozmevsim"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Twitter
            </label>
            <input
              type="url"
              value={socialMedia.twitter}
              onChange={(e) => setSocialMedia(prev => ({ ...prev, twitter: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="https://twitter.com/ozmevsim"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={socialMedia.linkedin}
              onChange={(e) => setSocialMedia(prev => ({ ...prev, linkedin: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="https://linkedin.com/company/ozmevsim"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              YouTube
            </label>
            <input
              type="url"
              value={socialMedia.youtube}
              onChange={(e) => setSocialMedia(prev => ({ ...prev, youtube: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="https://youtube.com/ozmevsim"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              TikTok
            </label>
            <input
              type="url"
              value={socialMedia.tiktok}
              onChange={(e) => setSocialMedia(prev => ({ ...prev, tiktok: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="https://tiktok.com/@ozmevsim"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertificationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sertifikalar ve Yetkilendirmeler</h3>
        <button
          onClick={() => handleCertificationEdit({
            id: 0,
            name: '',
            issuer: '',
            date: '',
            validUntil: '',
            certificateNumber: '',
            image: '',
            active: true
          })}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Yeni Sertifika Ekle
        </button>
      </div>

      <div className="grid gap-4">
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <ShieldCheckIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                  <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                    <span>Tarih: {cert.date}</span>
                    <span>Geçerlilik: {cert.validUntil}</span>
                    <span>No: {cert.certificateNumber}</span>
                  </div>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                    cert.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {cert.active ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCertificationEdit(cert)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleCertificationDelete(cert.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Site İstatistikleri</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Deneyim</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{companyInfo.experience} Yıl</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Proje</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{companyInfo.projectCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <HeartIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Müşteri</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{companyInfo.customerCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <StarIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Memnuniyet</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{companyInfo.satisfactionRate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Genel Ayarlar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Site genelinde geçerli ayarları yönetin</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BuildingOfficeIcon className="w-4 h-4" />
                Genel Bilgiler
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="w-4 h-4" />
                Bildirimler
              </div>
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'advanced'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <CogIcon className="w-4 h-4" />
                Gelişmiş
              </div>
            </button>
          </nav>
        </div>

        <form onSubmit={handleSave} className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Site Bilgileri</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Açıklaması
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin E-posta
                  </label>
                  <input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Zaman Dilimi
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Europe/Istanbul">İstanbul (UTC+3)</option>
                    <option value="Europe/London">Londra (UTC+0)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dil
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tarih Formatı
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bildirim Ayarları</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">E-posta Bildirimleri</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Önemli olaylar için e-posta bildirimleri alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">SMS Bildirimleri</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Acil durumlar için SMS bildirimleri alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gelişmiş Ayarlar</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Bakım Modu</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Site bakım modunda olduğunda ziyaretçiler bakım sayfasını görür</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Kullanıcı Kaydı</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Yeni kullanıcıların siteye kayıt olmasına izin ver</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.registrationEnabled}
                      onChange={(e) => handleInputChange('registrationEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex">
                  <ShieldCheckIcon className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Güvenlik Uyarısı</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Gelişmiş ayarları değiştirmeden önce sitenizin yedeğini aldığınızdan emin olun.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Kaydediliyor...
                </>
              ) : (
                'Ayarları Kaydet'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Certification Modal */}
      {showModal && editingCertification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingCertification.id === 0 ? 'Yeni Sertifika Ekle' : 'Sertifika Düzenle'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sertifika Adı
                </label>
                <input
                  type="text"
                  value={editingCertification.name}
                  onChange={(e) => setEditingCertification(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Veren Kurum
                </label>
                <input
                  type="text"
                  value={editingCertification.issuer}
                  onChange={(e) => setEditingCertification(prev => prev ? { ...prev, issuer: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tarih
                  </label>
                  <input
                    type="date"
                    value={editingCertification.date}
                    onChange={(e) => setEditingCertification(prev => prev ? { ...prev, date: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Geçerlilik
                  </label>
                  <input
                    type="date"
                    value={editingCertification.validUntil}
                    onChange={(e) => setEditingCertification(prev => prev ? { ...prev, validUntil: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sertifika Numarası
                </label>
                <input
                  type="text"
                  value={editingCertification.certificateNumber}
                  onChange={(e) => setEditingCertification(prev => prev ? { ...prev, certificateNumber: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                İptal
              </button>
              <button
                onClick={handleCertificationSave}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSettingsPage; 