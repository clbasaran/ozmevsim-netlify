'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  PhotoIcon,
  DocumentIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  EyeIcon,
  CheckIcon,
  ArrowLeftIcon,
  LinkIcon,
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
  CheckCircleIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  email: string;
  phone?: string;
  linkedin: string;
  twitter: string;
  experience?: string;
  education?: string;
  certifications?: string[];
  specializations?: string[];
  location?: string;
  languages?: string[];
  achievements?: string[];
  yearsOfExperience?: number;
}

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface Certificate {
  id: string;
  name: string;
  file: string;
  issuer: string;
  date: string;
}

interface AboutData {
  title: string;
  content: string;
  mission: string;
  vision: string;
  values: string[];
  foundedYear: string;
  employeeCount: string;
  locations: string[];
  metaTitle: string;
  metaDescription: string;
  lastModified: string;
  storyTitle: string;
  storyDescription1: string;
  storyDescription2: string;
  storyLocation: string;
  heroTitle: string;
  heroDescription: string;
}

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [aboutData, setAboutData] = useState<AboutData>({
    title: 'Hakkımızda',
    content: 'Öz Mevsim olarak sektörde uzun yılların deneyimi ile hizmet veriyoruz.',
    mission: 'Müşterilerimize en kaliteli hizmeti sunmak',
    vision: 'Sektörün lider firması olmak',
    values: ['Kalite', 'Güven', 'Müşteri Memnuniyeti'],
    foundedYear: '2008',
    employeeCount: '45+',
    locations: ['İstanbul', 'Ankara'],
    metaTitle: 'Hakkımızda - Öz Mevsim',
    metaDescription: 'Öz Mevsim hakkında detaylı bilgiler',
    lastModified: new Date().toISOString(),
    storyTitle: 'Başarı Hikayemiz',
    storyDescription1: 'Öz Mevsim Isı Sistemleri, 2008 yılında küçük bir ekip ile başladığı yolculuğunda bugün 45+ uzman personeliyle İstanbul\'un önde gelen ısı sistemleri şirketlerinden biri haline gelmiştir.',
    storyDescription2: '15 yılı aşkın deneyimimizle 2500\'den fazla projeyi başarıyla tamamladık. Kombi sistemlerinden klima kurulumlarına, doğalgaz tesisatından enerji verimliliği çözümlerine kadar geniş bir yelpazede hizmet sunuyoruz.',
    storyLocation: 'İstanbul merkezli, Türkiye geneli hizmet',
    heroTitle: 'Hakkımızda',
    heroDescription: '2008 yılından bu yana ısı sistemleri alanında güvenilir çözümler sunuyoruz'
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Mehmet Özkan',
      position: 'Genel Müdür',
      bio: '20 yıllık deneyimi ile iklim kontrol sektöründe uzman. Mühendislik geçmişi ve liderlik yetenekleri ile şirketi başarıya taşıyor.',
      photo: '/images/team/mehmet-ozkan.jpg',
      email: 'mehmet.ozkan@ozmevsim.com',
      linkedin: 'https://linkedin.com/in/mehmetozkan',
      twitter: ''
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      position: 'Teknik Müdür',
      bio: 'HVAC sistemleri konusunda 15 yıllık deneyime sahip. Projelerimizin teknik altyapısını yönetir.',
      photo: '/images/team/ayse-demir.jpg',
      email: 'ayse.demir@ozmevsim.com',
      linkedin: 'https://linkedin.com/in/aysedemir',
      twitter: ''
    }
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      year: '2010',
      title: 'Şirket Kuruluşu',
      description: 'Öz Mevsim İklim Sistemleri kuruldu.'
    },
    {
      id: '2',
      year: '2015',
      title: 'İlk Şube Açılışı',
      description: 'Ankara şubemizi açtık ve hizmet ağımızı genişlettik.'
    },
    {
      id: '3',
      year: '2020',
      title: 'ISO Sertifikası',
      description: 'ISO 9001 kalite yönetim sistemi sertifikasını aldık.'
    }
  ]);

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
      file: '/documents/iso-9001.pdf',
      issuer: 'TSE',
      date: '2020-06-15'
    },
    {
      id: '2',
      name: 'HVAC Teknik Yeterlilik Belgesi',
      file: '/documents/hvac-certificate.pdf',
      issuer: 'Enerji Bakanlığı',
      date: '2019-03-20'
    },
    {
      id: '3',
      name: 'Yetkili Servis Belgesi',
      file: '/documents/authorized-service.pdf',
      issuer: 'Sanayi ve Teknoloji Bakanlığı',
      date: '2018-09-10'
    },
    {
      id: '4',
      name: 'İş Sağlığı ve Güvenliği Belgesi',
      file: '/documents/work-safety.pdf',
      issuer: 'Çalışma ve Sosyal Güvenlik Bakanlığı',
      date: '2021-04-05'
    },
    {
      id: '5',
      name: 'Çevre Yönetim Sistemi ISO 14001',
      file: '/documents/iso-14001.pdf',
      issuer: 'TSE',
      date: '2022-01-20'
    },
    {
      id: '6',
      name: 'EPDK Doğalgaz Kurulum Yetki Belgesi',
      file: '/documents/epdk-license.pdf',
      issuer: 'EPDK',
      date: '2017-11-15'
    }
  ]);

  const [newValue, setNewValue] = useState('');

  // Load data from localStorage and save initial data
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Load team members from localStorage or save initial data
      const savedTeamMembers = localStorage.getItem('team-members');
      if (savedTeamMembers) {
        const parsedMembers = JSON.parse(savedTeamMembers);
        setTeamMembers(parsedMembers);
      } else {
        // Save initial team members
        localStorage.setItem('team-members', JSON.stringify(teamMembers));
      }

      // Load milestones from localStorage or save initial data
      const savedMilestones = localStorage.getItem('milestones');
      if (savedMilestones) {
        const parsedMilestones = JSON.parse(savedMilestones);
        setMilestones(parsedMilestones);
      } else {
        // Save initial milestones if none exist
        const initialMilestones: Milestone[] = [
          { id: '1', year: '2008', title: 'Şirket kuruldu', description: 'Öz Mevsim Isı Sistemleri kuruldu' },
          { id: '2', year: '2010', title: 'İlk 100 proje tamamlandı', description: 'Başarılı bir şekilde ilk 100 projemizi tamamladık' },
          { id: '3', year: '2013', title: 'ISO 9001 belgesi alındı', description: 'Kalite yönetim sistemi belgesi aldık' },
          { id: '4', year: '2016', title: '1000. proje milestone\'u', description: 'Binyinci projemizi başarıyla tamamladık' },
          { id: '5', year: '2019', title: 'Yeni ofis ve depo açılışı', description: 'Büyüyen ekibimiz için yeni ofisimizi açtık' },
          { id: '6', year: '2021', title: 'Dijital dönüşüm başladı', description: 'Teknolojik altyapımızı modernize ettik' },
          { id: '7', year: '2023', title: '2500+ proje tamamlandı', description: 'Bugüne kadar 2500\'den fazla projeyi başarıyla tamamladık' },
        ];
        setMilestones(initialMilestones);
        localStorage.setItem('milestones', JSON.stringify(initialMilestones));
      }

      // Load certificates from localStorage or save initial data
      const savedCertificates = localStorage.getItem('certificates');
      if (savedCertificates) {
        const parsedCertificates = JSON.parse(savedCertificates);
        setCertificates(parsedCertificates);
      } else {
        // Save initial certificates if none exist
        const initialCertificates: Certificate[] = [
          {
            id: '1',
            name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
            file: '/documents/iso-9001.pdf',
            issuer: 'TSE',
            date: '2020-06-15'
          },
          {
            id: '2',
            name: 'HVAC Teknik Yeterlilik Belgesi',
            file: '/documents/hvac-certificate.pdf',
            issuer: 'Enerji Bakanlığı',
            date: '2019-03-20'
          },
          {
            id: '3',
            name: 'Yetkili Servis Belgesi',
            file: '/documents/authorized-service.pdf',
            issuer: 'Sanayi ve Teknoloji Bakanlığı',
            date: '2018-09-10'
          },
          {
            id: '4',
            name: 'İş Sağlığı ve Güvenliği Belgesi',
            file: '/documents/work-safety.pdf',
            issuer: 'Çalışma ve Sosyal Güvenlik Bakanlığı',
            date: '2021-04-05'
          },
          {
            id: '5',
            name: 'Çevre Yönetim Sistemi ISO 14001',
            file: '/documents/iso-14001.pdf',
            issuer: 'TSE',
            date: '2022-01-20'
          },
          {
            id: '6',
            name: 'EPDK Doğalgaz Kurulum Yetki Belgesi',
            file: '/documents/epdk-license.pdf',
            issuer: 'EPDK',
            date: '2017-11-15'
          }
        ];
        setCertificates(initialCertificates);
        localStorage.setItem('certificates', JSON.stringify(initialCertificates));
      }

      // Load about data
      const savedAboutData = localStorage.getItem('about-data');
      if (savedAboutData) {
        const parsedData = JSON.parse(savedAboutData);
        setAboutData(parsedData);
      } else {
        // Save initial about data
        localStorage.setItem('about-data', JSON.stringify(aboutData));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isEditing) {
      const autoSaveInterval = setInterval(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearInterval(autoSaveInterval);
    }
  }, [isEditing, aboutData]);

  const handleAutoSave = () => {
    if (isEditing) {
      localStorage.setItem('about-data', JSON.stringify(aboutData));
      localStorage.setItem('team-members', JSON.stringify(teamMembers));
      localStorage.setItem('milestones', JSON.stringify(milestones));
      localStorage.setItem('certificates', JSON.stringify(certificates));
      
      // Dispatch custom events for updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('teamMembersUpdated'));
        window.dispatchEvent(new CustomEvent('aboutDataUpdated'));
      }
      
      setLastSaved(new Date());
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('about-data', JSON.stringify({
        ...aboutData,
        lastModified: new Date().toISOString()
      }));
      localStorage.setItem('team-members', JSON.stringify(teamMembers));
      localStorage.setItem('milestones', JSON.stringify(milestones));
      localStorage.setItem('certificates', JSON.stringify(certificates));
      
      // Dispatch custom events for updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('teamMembersUpdated'));
        window.dispatchEvent(new CustomEvent('aboutDataUpdated'));
      }
      
      setLastSaved(new Date());
      setIsEditing(false);
      
      // Show success toast
      alert('Veriler başarıyla kaydedildi!');
    } catch (error) {
      alert('Kaydetme sırasında bir hata oluştu!');
    } finally {
      setIsSaving(false);
    }
  };

  const addValue = () => {
    if (newValue.trim()) {
      setAboutData(prev => ({
        ...prev,
        values: [...prev.values, newValue.trim()]
      }));
      setNewValue('');
    }
  };

  const removeValue = (index: number) => {
    setAboutData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      position: '',
      bio: '',
      photo: '',
      email: '',
      linkedin: '',
      twitter: ''
    };
    const updatedMembers = [...teamMembers, newMember];
    setTeamMembers(updatedMembers);
    
    // Save to localStorage immediately
    localStorage.setItem('team-members', JSON.stringify(updatedMembers));
    
    // Dispatch custom event for team members update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('teamMembersUpdated'));
    }
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    const updatedMembers = teamMembers.map(member => {
      if (member.id === id) {
        let updatedValue: any = value;
        
        // Handle array fields
        if (field === 'specializations' || field === 'certifications' || field === 'languages') {
          updatedValue = value ? value.split(',').map(item => item.trim()).filter(item => item) : [];
        } else if (field === 'achievements') {
          updatedValue = value ? value.split('\n').map(item => item.trim()).filter(item => item) : [];
        } else if (field === 'yearsOfExperience') {
          updatedValue = value ? parseInt(value) : undefined;
        }
        
        return { ...member, [field]: updatedValue };
      }
      return member;
    });
    
    setTeamMembers(updatedMembers);
    
    // Save to localStorage immediately
    localStorage.setItem('team-members', JSON.stringify(updatedMembers));
    
    // Dispatch custom event for team members update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('teamMembersUpdated'));
    }
  };

  const removeTeamMember = (id: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedMembers);
    
    // Save to localStorage immediately
    localStorage.setItem('team-members', JSON.stringify(updatedMembers));
    
    // Dispatch custom event for team members update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('teamMembersUpdated'));
    }
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      year: '',
      title: '',
      description: ''
    };
    const updatedMilestones = [...milestones, newMilestone];
    setMilestones(updatedMilestones);
    
    // Save to localStorage immediately
    localStorage.setItem('milestones', JSON.stringify(updatedMilestones));
    
    // Dispatch custom event for timeline update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timelineUpdated'));
    }
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string) => {
    const updatedMilestones = milestones.map(milestone => 
      milestone.id === id ? { ...milestone, [field]: value } : milestone
    );
    setMilestones(updatedMilestones);
    
    // Save to localStorage immediately
    localStorage.setItem('milestones', JSON.stringify(updatedMilestones));
    
    // Dispatch custom event for timeline update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timelineUpdated'));
    }
  };

  const removeMilestone = (id: string) => {
    const updatedMilestones = milestones.filter(milestone => milestone.id !== id);
    setMilestones(updatedMilestones);
    
    // Save to localStorage immediately
    localStorage.setItem('milestones', JSON.stringify(updatedMilestones));
    
    // Dispatch custom event for timeline update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timelineUpdated'));
    }
  };

  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: '',
      file: '',
      issuer: '',
      date: new Date().toISOString().split('T')[0]
    };
    const updatedCertificates = [...certificates, newCertificate];
    setCertificates(updatedCertificates);
    
    // Save to localStorage immediately
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
    
    // Dispatch custom event for certificates update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('certificatesUpdated'));
    }
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    const updatedCertificates = certificates.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    setCertificates(updatedCertificates);
    
    // Save to localStorage immediately
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
    
    // Dispatch custom event for certificates update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('certificatesUpdated'));
    }
  };

  const removeCertificate = (id: string) => {
    const updatedCertificates = certificates.filter(cert => cert.id !== id);
    setCertificates(updatedCertificates);
    
    // Save to localStorage immediately
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
    
    // Dispatch custom event for certificates update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('certificatesUpdated'));
    }
  };

  const tabs = [
    { id: 'general', name: 'Genel Bilgiler', icon: BuildingOfficeIcon },
    { id: 'team', name: 'Ekip', icon: UserGroupIcon },
    { id: 'timeline', name: 'Tarihçe', icon: CalendarIcon },
    { id: 'certificates', name: 'Sertifikalar', icon: DocumentIcon },
    { id: 'seo', name: 'SEO Ayarları', icon: GlobeAltIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hakkımızda Yönetimi</h1>
          <p className="text-gray-600 mt-1">Hakkımızda sayfası içeriğini yönetin</p>
          {lastSaved && (
            <p className="text-sm text-green-600 mt-1">
              Son kaydetme: {lastSaved.toLocaleTimeString('tr-TR')}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <EyeIcon className="w-4 h-4" />
            Önizleme
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isEditing ? 'bg-gray-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <PencilIcon className="w-4 h-4" />
            {isEditing ? 'İptal' : 'Düzenle'}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckIcon className="w-4 h-4" />
              )}
              Kaydet
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* General Information Tab */}
            {activeTab === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sayfa Başlığı
                      </label>
                      <input
                        type="text"
                        value={aboutData.title}
                        onChange={(e) => setAboutData(prev => ({ ...prev, title: e.target.value }))}
                        disabled={!isEditing}
                        className="admin-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kuruluş Yılı
                      </label>
                      <input
                        type="text"
                        value={aboutData.foundedYear}
                        onChange={(e) => setAboutData(prev => ({ ...prev, foundedYear: e.target.value }))}
                        disabled={!isEditing}
                        className="admin-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Çalışan Sayısı
                      </label>
                      <input
                        type="text"
                        value={aboutData.employeeCount}
                        onChange={(e) => setAboutData(prev => ({ ...prev, employeeCount: e.target.value }))}
                        disabled={!isEditing}
                        className="admin-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Misyon
                      </label>
                      <textarea
                        value={aboutData.mission}
                        onChange={(e) => setAboutData(prev => ({ ...prev, mission: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                        className="admin-input resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vizyon
                      </label>
                      <textarea
                        value={aboutData.vision}
                        onChange={(e) => setAboutData(prev => ({ ...prev, vision: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                        className="admin-input resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ana İçerik
                  </label>
                  <textarea
                    value={aboutData.content}
                    onChange={(e) => setAboutData(prev => ({ ...prev, content: e.target.value }))}
                    disabled={!isEditing}
                    rows={8}
                    className="admin-input resize-none"
                    placeholder="HTML içerik girebilirsiniz..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    HTML etiketleri kullanabilirsiniz (p, strong, em, ul, li, etc.)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Değerlerimiz
                  </label>
                  <div className="space-y-2">
                    {aboutData.values.map((value, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const newValues = [...aboutData.values];
                            newValues[index] = e.target.value;
                            setAboutData(prev => ({ ...prev, values: newValues }));
                          }}
                          disabled={!isEditing}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent admin-input"
                        />
                        {isEditing && (
                          <button
                            onClick={() => removeValue(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          placeholder="Yeni değer ekle..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                          onKeyPress={(e) => e.key === 'Enter' && addValue()}
                        />
                        <button
                          onClick={addValue}
                          className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hero Section */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Bölümü (Ana Başlık)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ana Başlık
                      </label>
                      <input
                        type="text"
                        value={aboutData.heroTitle}
                        onChange={(e) => setAboutData(prev => ({ ...prev, heroTitle: e.target.value }))}
                        disabled={!isEditing}
                        className="admin-input"
                        placeholder="Örn: Hakkımızda"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ana Açıklama
                      </label>
                      <textarea
                        value={aboutData.heroDescription}
                        onChange={(e) => setAboutData(prev => ({ ...prev, heroDescription: e.target.value }))}
                        disabled={!isEditing}
                        rows={2}
                        className="admin-input resize-none"
                        placeholder="Örn: 2008 yılından bu yana ısı sistemleri alanında güvenilir çözümler sunuyoruz"
                      />
                    </div>
                  </div>
                </div>

                {/* Story Section */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Başarı Hikayesi Bölümü</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Başlık
                      </label>
                      <input
                        type="text"
                        value={aboutData.storyTitle}
                        onChange={(e) => setAboutData(prev => ({ ...prev, storyTitle: e.target.value }))}
                        disabled={!isEditing}
                        className="admin-input"
                        placeholder="Örn: Başarı Hikayemiz"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İlk Paragraf
                      </label>
                      <textarea
                        value={aboutData.storyDescription1}
                        onChange={(e) => setAboutData(prev => ({ ...prev, storyDescription1: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                        className="admin-input resize-none"
                        placeholder="Şirketin kuruluş hikayesi ve gelişimi..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İkinci Paragraf
                      </label>
                      <textarea
                        value={aboutData.storyDescription2}
                        onChange={(e) => setAboutData(prev => ({ ...prev, storyDescription2: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                        className="admin-input resize-none"
                        placeholder="Deneyim ve hizmet alanları..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Konum Bilgisi
                      </label>
                      <input
                        type="text"
                        value={aboutData.storyLocation}
                        onChange={(e) => setAboutData(prev => ({ ...prev, storyLocation: e.target.value }))}
                        disabled={!isEditing}
                        className="admin-input"
                        placeholder="Örn: İstanbul merkezli, Türkiye geneli hizmet"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Ekip Üyeleri</h3>
                  <button
                    onClick={addTeamMember}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Ekip Üyesi Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">
                            {member.name || 'Yeni Ekip Üyesi'}
                          </h4>
                          <button
                            onClick={() => removeTeamMember(member.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              İsim *
                            </label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                              placeholder="Örn: Mehmet Özkan"
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Pozisyon *
                            </label>
                            <input
                              type="text"
                              value={member.position}
                              onChange={(e) => updateTeamMember(member.id, 'position', e.target.value)}
                              placeholder="Örn: Genel Müdür"
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              E-posta
                            </label>
                            <input
                              type="email"
                              value={member.email}
                              onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                              placeholder="Örn: mehmet@ozmevsim.com"
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Telefon
                            </label>
                            <input
                              type="tel"
                              value={member.phone || ''}
                              onChange={(e) => updateTeamMember(member.id, 'phone', e.target.value)}
                              placeholder="Örn: +90 532 XXX XX XX"
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              LinkedIn URL
                            </label>
                            <input
                              type="url"
                              value={member.linkedin}
                              onChange={(e) => updateTeamMember(member.id, 'linkedin', e.target.value)}
                              placeholder="Örn: https://linkedin.com/in/mehmet"
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Twitter URL
                            </label>
                            <input
                              type="url"
                              value={member.twitter}
                              onChange={(e) => updateTeamMember(member.id, 'twitter', e.target.value)}
                              placeholder="Örn: https://twitter.com/mehmet"
                              className="admin-input"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fotoğraf URL
                          </label>
                          <input
                            type="url"
                            value={member.photo}
                            onChange={(e) => updateTeamMember(member.id, 'photo', e.target.value)}
                            placeholder="Örn: https://example.com/foto.jpg"
                            className="admin-input"
                          />
                          {member.photo && (
                            <div className="mt-2">
                              <img 
                                src={member.photo} 
                                alt="Önizleme" 
                                className="w-16 h-16 object-cover rounded-full border"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Deneyim Süresi (Yıl)
                            </label>
                            <input
                              type="number"
                              value={member.yearsOfExperience || ''}
                              onChange={(e) => updateTeamMember(member.id, 'yearsOfExperience', e.target.value)}
                              placeholder="Örn: 15"
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Lokasyon
                            </label>
                            <input
                              type="text"
                              value={member.location || ''}
                              onChange={(e) => updateTeamMember(member.id, 'location', e.target.value)}
                              placeholder="Örn: İstanbul"
                              className="admin-input"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Eğitim
                          </label>
                          <input
                            type="text"
                            value={member.education || ''}
                            onChange={(e) => updateTeamMember(member.id, 'education', e.target.value)}
                            placeholder="Örn: Makine Mühendisliği - İTÜ"
                            className="admin-input"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Uzmanlık Alanları
                          </label>
                          <input
                            type="text"
                            value={member.specializations?.join(', ') || ''}
                            onChange={(e) => updateTeamMember(member.id, 'specializations', e.target.value)}
                            placeholder="Örn: Kombi Kurulumu, Sistem Onarımı, Enerji Verimliliği"
                            className="admin-input"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Virgülle ayırarak yazın
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sertifikalar
                          </label>
                          <input
                            type="text"
                            value={member.certifications?.join(', ') || ''}
                            onChange={(e) => updateTeamMember(member.id, 'certifications', e.target.value)}
                            placeholder="Örn: PMP, ISO 9001 Lead Auditor, HVAC Sistem Uzmanlığı"
                            className="admin-input"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Virgülle ayırarak yazın
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diller
                          </label>
                          <input
                            type="text"
                            value={member.languages?.join(', ') || ''}
                            onChange={(e) => updateTeamMember(member.id, 'languages', e.target.value)}
                            placeholder="Örn: Türkçe, İngilizce, Almanca"
                            className="admin-input"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Virgülle ayırarak yazın
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Başarılar
                          </label>
                          <textarea
                            value={member.achievements?.join('\n') || ''}
                            onChange={(e) => updateTeamMember(member.id, 'achievements', e.target.value)}
                            rows={3}
                            placeholder="Her satıra bir başarı yazın"
                            className="admin-input resize-none"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Her satıra bir başarı yazın
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Biyografi
                          </label>
                          <textarea
                            value={member.bio}
                            onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
                            rows={4}
                            placeholder="Kişi hakkında detaylı bilgi..."
                            className="admin-input resize-none"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {member.bio.length}/500 karakter
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Şirket Tarihçesi</h3>
                  {isEditing && (
                    <button
                      onClick={addMilestone}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Milestone Ekle
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Yıl
                            </label>
                            <input
                              type="text"
                              value={milestone.year}
                              onChange={(e) => updateMilestone(milestone.id, 'year', e.target.value)}
                              disabled={!isEditing}
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Başlık
                            </label>
                            <input
                              type="text"
                              value={milestone.title}
                              onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                              disabled={!isEditing}
                              className="admin-input"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Açıklama
                            </label>
                            <textarea
                              value={milestone.description}
                              onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                              disabled={!isEditing}
                              rows={2}
                              className="admin-input resize-none"
                            />
                          </div>
                        </div>

                        {isEditing && (
                          <button
                            onClick={() => removeMilestone(milestone.id)}
                            className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Sertifikalar ve Belgeler</h3>
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const defaultCertificates: Certificate[] = [
                            {
                              id: '1',
                              name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
                              file: '/documents/iso-9001.pdf',
                              issuer: 'TSE',
                              date: '2020-06-15'
                            },
                            {
                              id: '2',
                              name: 'HVAC Teknik Yeterlilik Belgesi',
                              file: '/documents/hvac-certificate.pdf',
                              issuer: 'Enerji Bakanlığı',
                              date: '2019-03-20'
                            },
                            {
                              id: '3',
                              name: 'Yetkili Servis Belgesi',
                              file: '/documents/authorized-service.pdf',
                              issuer: 'Sanayi ve Teknoloji Bakanlığı',
                              date: '2018-09-10'
                            },
                            {
                              id: '4',
                              name: 'İş Sağlığı ve Güvenliği Belgesi',
                              file: '/documents/work-safety.pdf',
                              issuer: 'Çalışma ve Sosyal Güvenlik Bakanlığı',
                              date: '2021-04-05'
                            },
                            {
                              id: '5',
                              name: 'Çevre Yönetim Sistemi ISO 14001',
                              file: '/documents/iso-14001.pdf',
                              issuer: 'TSE',
                              date: '2022-01-20'
                            },
                            {
                              id: '6',
                              name: 'EPDK Doğalgaz Kurulum Yetki Belgesi',
                              file: '/documents/epdk-license.pdf',
                              issuer: 'EPDK',
                              date: '2017-11-15'
                            }
                          ];
                          
                          setCertificates(defaultCertificates);
                          localStorage.setItem('certificates', JSON.stringify(defaultCertificates));
                          
                          // Dispatch custom event for certificates update
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('certificatesUpdated'));
                          }
                          
                          alert('Sertifikalar varsayılan değerlere sıfırlandı!');
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        Varsayılanları Yükle
                      </button>
                      <button
                        onClick={addCertificate}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                      >
                        <PlusIcon className="w-4 h-4" />
                        Sertifika Ekle
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <DocumentIcon className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
                        
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sertifika Adı *
                              </label>
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Örn: ISO 9001:2015 Kalite Yönetim Sistemi"
                                className="admin-input"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Veren Kurum *
                              </label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Örn: TSE, EPDK, Bakanlık"
                                className="admin-input"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tarih
                              </label>
                              <input
                                type="date"
                                value={cert.date}
                                onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                                disabled={!isEditing}
                                className="admin-input"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Belge Dosyası (URL)
                              </label>
                              <input
                                type="text"
                                value={cert.file}
                                onChange={(e) => updateCertificate(cert.id, 'file', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Örn: /documents/iso-9001.pdf"
                                className="admin-input"
                              />
                            </div>
                          </div>

                          {cert.file && (
                            <div className="flex items-center gap-2">
                              <LinkIcon className="w-4 h-4 text-green-600" />
                              <a
                                href={cert.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-orange-600 hover:text-orange-700"
                              >
                                Belgeyi Görüntüle
                              </a>
                            </div>
                          )}
                        </div>

                        {isEditing && (
                          <button
                            onClick={() => removeCertificate(cert.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {certificates.length === 0 && (
                    <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
                      <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Henüz sertifika eklenmemiş</p>
                      {isEditing && (
                        <button
                          onClick={addCertificate}
                          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                        >
                          İlk Sertifikayı Ekle
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <motion.div
                key="seo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-medium text-gray-900">SEO Ayarları</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Başlık
                    </label>
                    <input
                      type="text"
                      value={aboutData.metaTitle}
                      onChange={(e) => setAboutData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      disabled={!isEditing}
                      className="admin-input"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {aboutData.metaTitle.length}/60 karakter
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Açıklama
                    </label>
                    <textarea
                      value={aboutData.metaDescription}
                      onChange={(e) => setAboutData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      disabled={!isEditing}
                      rows={3}
                      className="admin-input resize-none"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {aboutData.metaDescription.length}/160 karakter
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Sayfa Önizlemesi</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none">
                  <h1>{aboutData.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: aboutData.content }} />
                  
                  <h2>Misyonumuz</h2>
                  <p>{aboutData.mission}</p>
                  
                  <h2>Vizyonumuz</h2>
                  <p>{aboutData.vision}</p>
                  
                  <h2>Değerlerimiz</h2>
                  <ul>
                    {aboutData.values.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 