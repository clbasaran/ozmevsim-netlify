'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserIcon,
  TagIcon
} from '@heroicons/react/24/outline';

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

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isPrimary: boolean;
  isActive: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied' | 'new' | 'archived';
  readAt?: string;
  repliedAt?: string;
  priority?: string;
  createdAt?: string;
}

interface FormSettings {
  enabled: boolean;
  requirePhone: boolean;
  requireSubject: boolean;
  autoReply: boolean;
  autoReplyMessage: string;
  emailNotifications: boolean;
  notificationEmail: string;
}

const defaultContactInfo: ContactInfo = {
  phone: '+90 312 357 0600',
  email: 'info@ozmevsim.com',
  address: 'Kuşcağız Mahallesi, Sanatoryum Caddesi No:221/A, Keçiören, Ankara',
  workingHours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
  emergencyPhone: '+90 532 446 7367',
  whatsapp: '+90 532 446 7367',
  fax: '+90 212 555 0124',
  website: 'www.ozmevsim.com'
};

const defaultLocations: Location[] = [
  {
    id: 1,
    name: 'Ana Merkez',
    address: 'Kuşcağız Mahallesi, Sanatoryum Caddesi No:221/A, Keçiören, Ankara',
    phone: '+90 312 357 0600',
    email: 'info@ozmevsim.com',
    workingHours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    isPrimary: true,
    isActive: true
  }
];

const defaultMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 532 123 4567',
    subject: 'Kombi Bakım Hizmeti',
    message: 'Merhaba, kombi bakım hizmeti hakkında bilgi almak istiyorum.',
    date: '2024-01-20T10:30:00Z',
    status: 'unread'
  }
];

const defaultFormSettings: FormSettings = {
  enabled: true,
  requirePhone: false,
  requireSubject: true,
  autoReply: true,
  autoReplyMessage: 'Mesajınız için teşekkürler. En kısa sürede size dönüş yapacağız.',
  emailNotifications: true,
  notificationEmail: 'admin@ozmevsim.com'
};

export default function AdminContactPage() {
  const [activeTab, setActiveTab] = useState('info');
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const [messages, setMessages] = useState<ContactMessage[]>(defaultMessages);
  const [formSettings, setFormSettings] = useState<FormSettings>(defaultFormSettings);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Load data from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const storedContactInfo = localStorage.getItem('ozmevsim_contact_info');
      const storedLocations = localStorage.getItem('ozmevsim_locations');
      const storedFormSettings = localStorage.getItem('ozmevsim_form_settings');
      
      // İletişim mesajları için birleşik kontrol
      const storedMessages = localStorage.getItem('contactMessages') || localStorage.getItem('ozmevsim_contact_messages');

      if (storedContactInfo) setContactInfo(JSON.parse(storedContactInfo));
      if (storedLocations) setLocations(JSON.parse(storedLocations));
      if (storedFormSettings) setFormSettings(JSON.parse(storedFormSettings));
      
      if (storedMessages) {
        try {
          const parsedMessages = JSON.parse(storedMessages);
          setMessages(parsedMessages);
        } catch (error) {
          console.error('Error parsing messages:', error);
        }
      }
    } catch (error) {
      console.error('Error loading contact data:', error);
    }
  }, []);

  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleSaveContactInfo = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveToLocalStorage('ozmevsim_contact_info', contactInfo);
      setIsSaving(false);
    }, 1000);
  };

  const handleSaveLocation = (locationData: Location) => {
    let updatedLocations;
    
    if (isEditing) {
      updatedLocations = locations.map(loc =>
        loc.id === locationData.id ? locationData : loc
      );
    } else {
      const newLocation = {
        ...locationData,
        id: Date.now()
      };
      updatedLocations = [newLocation, ...locations];
    }
    
    setLocations(updatedLocations);
    saveToLocalStorage('ozmevsim_locations', updatedLocations);
    setShowLocationForm(false);
    setSelectedLocation(null);
  };

  const handleDeleteLocation = (id: number) => {
    if (confirm('Bu lokasyonu silmek istediğinizden emin misiniz?')) {
      const updatedLocations = locations.filter(loc => loc.id !== id);
      setLocations(updatedLocations);
      saveToLocalStorage('ozmevsim_locations', updatedLocations);
    }
  };

  const handleUpdateMessageStatus = (id: string, status: ContactMessage['status']) => {
    const updatedMessages = messages.map(msg =>
      msg.id === id 
        ? { 
            ...msg, 
            status,
            readAt: status === 'read' && !msg.readAt ? new Date().toISOString() : msg.readAt
          }
        : msg
    );
    setMessages(updatedMessages);
    saveToLocalStorage('ozmevsim_contact_messages', updatedMessages);
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || msg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const loadMessages = () => {
    try {
      // Önce localStorage'dan yükle
      const storedMessages = localStorage.getItem('contactMessages') || localStorage.getItem('ozmevsim_contact_messages');
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      }
      
      // Sonra API'den de yükle ve birleştir
      fetch('/api/contact')
        .then(response => response.json())
        .then(result => {
          if (result.success && result.data) {
            const apiMessages = result.data.map((inquiry: any) => ({
              id: inquiry.id,
              name: inquiry.name,
              email: inquiry.email,
              phone: inquiry.phone,
              subject: inquiry.subject,
              message: inquiry.message,
              date: inquiry.createdAt,
              status: inquiry.status === 'new' ? 'unread' : 'read',
              createdAt: inquiry.createdAt
            }));
            
            // localStorage mesajları ile API mesajlarını birleştir
            const localMessages = storedMessages ? JSON.parse(storedMessages) : [];
            const allMessages = [...localMessages];
            
            // API'den gelen mesajları ekle (duplikasyondan kaçın)
            apiMessages.forEach((apiMsg: any) => {
              if (!allMessages.find(msg => msg.id === apiMsg.id)) {
                allMessages.push(apiMsg);
              }
            });
            
            // Tarihe göre sırala
            allMessages.sort((a, b) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime());
            
            setMessages(allMessages);
            
            // Güncellenmiş listeyi localStorage'a kaydet
            localStorage.setItem('contactMessages', JSON.stringify(allMessages));
            localStorage.setItem('ozmevsim_contact_messages', JSON.stringify(allMessages));
          }
        })
        .catch(error => {
          console.error('Error fetching messages from API:', error);
          // API hatası durumunda sadece localStorage mesajlarını kullan
        });
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' as const } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId);
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      setSelectedMessage(null);
    }
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  const getSubjectDisplay = (subject: string) => {
    const subjectMap: Record<string, string> = {
      'kombi-montaj': 'Kombi Montajı',
      'bakim-onarim': 'Bakım ve Onarım',
      'klima-montaj': 'Klima Montajı',
      'dogalgaz-tesisati': 'Doğalgaz Tesisatı',
      'tesisat-yenileme': 'Tesisat Yenileme',
      'acil-servis': 'Acil Servis',
      'diger': 'Diğer'
    };
    return subjectMap[subject] || subject;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">İletişim Yönetimi</h1>
        <p className="text-gray-600 mt-1">İletişim bilgileri, lokasyonlar ve mesajları yönetin</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'info', name: 'İletişim Bilgileri', icon: <PhoneIcon className="w-5 h-5" /> },
              { id: 'locations', name: 'Lokasyonlar', icon: <MapPinIcon className="w-5 h-5" /> },
              { id: 'messages', name: 'Mesajlar', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
              { id: 'settings', name: 'Form Ayarları', icon: <Cog6ToothIcon className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
                {tab.id === 'messages' && messages.filter(m => m.status === 'unread').length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                    {messages.filter(m => m.status === 'unread').length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Contact Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Temel İletişim Bilgileri</h3>
                <button
                  onClick={handleSaveContactInfo}
                  disabled={isSaving}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      Kaydet
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Ana Telefon
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="contact-address" className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <textarea
                    id="contact-address"
                    rows={3}
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-hours" className="block text-sm font-medium text-gray-700 mb-2">
                    Çalışma Saatleri
                  </label>
                  <input
                    id="contact-hours"
                    type="text"
                    value={contactInfo.workingHours}
                    onChange={(e) => setContactInfo({...contactInfo, workingHours: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-emergency" className="block text-sm font-medium text-gray-700 mb-2">
                    Acil Durum Telefonu
                  </label>
                  <input
                    id="contact-emergency"
                    type="tel"
                    value={contactInfo.emergencyPhone}
                    onChange={(e) => setContactInfo({...contactInfo, emergencyPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp
                  </label>
                  <input
                    id="contact-whatsapp"
                    type="tel"
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-fax" className="block text-sm font-medium text-gray-700 mb-2">
                    Fax
                  </label>
                  <input
                    id="contact-fax"
                    type="tel"
                    value={contactInfo.fax}
                    onChange={(e) => setContactInfo({...contactInfo, fax: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    id="contact-website"
                    type="text"
                    value={contactInfo.website}
                    onChange={(e) => setContactInfo({...contactInfo, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Şube Lokasyonları</h3>
                <button
                  onClick={() => {
                    setSelectedLocation({
                      id: 0,
                      name: '',
                      address: '',
                      phone: '',
                      email: '',
                      workingHours: '',
                      coordinates: { lat: 39.9334, lng: 32.8597 },
                      isPrimary: false,
                      isActive: true
                    });
                    setIsEditing(false);
                    setShowLocationForm(true);
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Yeni Lokasyon
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {locations.map((location) => (
                  <div key={location.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {location.name}
                          {location.isPrimary && (
                            <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                              Ana Merkez
                            </span>
                          )}
                        </h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          location.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {location.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsEditing(true);
                            setShowLocationForm(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        {!location.isPrimary && (
                          <button
                            onClick={() => handleDeleteLocation(location.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{location.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{location.workingHours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  İletişim Mesajları ({filteredMessages.length})
                </h3>
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Mesajlarda ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Tüm Durumlar</option>
                    <option value="new">Yeni</option>
                    <option value="read">Okundu</option>
                    <option value="replied">Yanıtlandı</option>
                    <option value="archived">Arşivlendi</option>
                  </select>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">İletişim</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Konu</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredMessages.map((message) => (
                        <tr key={message.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{message.name}</div>
                              <div className="text-sm text-gray-500">{message.email}</div>
                              <div className="text-sm text-gray-500">{message.phone}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">{message.subject}</div>
                            <div className="text-xs text-gray-500 line-clamp-2">{message.message}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(message.status)}`}>
                                {message.status === 'new' && 'Yeni'}
                                {message.status === 'read' && 'Okundu'}
                                {message.status === 'replied' && 'Yanıtlandı'}
                                {message.status === 'archived' && 'Arşivlendi'}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority || 'normal')}`}>
                                {message.priority === 'high' && 'Yüksek'}
                                {message.priority === 'normal' && 'Normal'}
                                {message.priority === 'low' && 'Düşük'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500">
                            {new Date(message.createdAt || message.date).toLocaleDateString('tr-TR')}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedMessage(message);
                                  setShowMessageDetail(true);
                                  if (message.status === 'new') {
                                    handleUpdateMessageStatus(message.id, 'read');
                                  }
                                }}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <select
                                value={message.status}
                                onChange={(e) => handleUpdateMessageStatus(message.id, e.target.value as ContactMessage['status'])}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="new">Yeni</option>
                                <option value="read">Okundu</option>
                                <option value="replied">Yanıtlandı</option>
                                <option value="archived">Arşivlendi</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Form Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">İletişim Formu Ayarları</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">İletişim Formunu Etkinleştir</h4>
                    <p className="text-sm text-gray-600">Ziyaretçilerin size mesaj gönderebilmesini sağlar</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formSettings.enabled}
                      onChange={(e) => setFormSettings({...formSettings, enabled: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Zorunlu Alanlar</h4>
                    
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formSettings.requirePhone}
                          onChange={(e) => setFormSettings({...formSettings, requirePhone: e.target.checked})}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Telefon numarası zorunlu</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formSettings.requireSubject}
                          onChange={(e) => setFormSettings({...formSettings, requireSubject: e.target.checked})}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Konu zorunlu</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Bildirimler</h4>
                    
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formSettings.emailNotifications}
                          onChange={(e) => setFormSettings({...formSettings, emailNotifications: e.target.checked})}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">E-posta bildirimleri</span>
                      </label>
                      
                      {formSettings.emailNotifications && (
                        <input
                          type="email"
                          placeholder="Bildirim e-posta adresi"
                          value={formSettings.notificationEmail}
                          onChange={(e) => setFormSettings({...formSettings, notificationEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="autoReply"
                      checked={formSettings.autoReply}
                      onChange={(e) => setFormSettings({...formSettings, autoReply: e.target.checked})}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoReply" className="ml-2 text-sm font-medium text-gray-700">
                      Otomatik yanıt mesajı gönder
                    </label>
                  </div>
                  
                  {formSettings.autoReply && (
                    <textarea
                      rows={4}
                      placeholder="Otomatik yanıt mesajınızı yazın..."
                      value={formSettings.autoReplyMessage}
                      onChange={(e) => setFormSettings({...formSettings, autoReplyMessage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => saveToLocalStorage('ozmevsim_form_settings', formSettings)}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Ayarları Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location Form Modal */}
      <AnimatePresence>
        {showLocationForm && selectedLocation && (
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isEditing ? 'Lokasyonu Düzenle' : 'Yeni Lokasyon'}
                  </h2>
                  <button
                    onClick={() => setShowLocationForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveLocation(selectedLocation);
                }}
                className="p-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lokasyon Adı *
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedLocation.name}
                      onChange={(e) => setSelectedLocation({...selectedLocation, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={selectedLocation.phone}
                      onChange={(e) => setSelectedLocation({...selectedLocation, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adres *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={selectedLocation.address}
                      onChange={(e) => setSelectedLocation({...selectedLocation, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={selectedLocation.email}
                      onChange={(e) => setSelectedLocation({...selectedLocation, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Çalışma Saatleri
                    </label>
                    <input
                      type="text"
                      value={selectedLocation.workingHours}
                      onChange={(e) => setSelectedLocation({...selectedLocation, workingHours: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLocation.isPrimary}
                      onChange={(e) => setSelectedLocation({...selectedLocation, isPrimary: e.target.checked})}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Ana merkez</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLocation.isActive}
                      onChange={(e) => setSelectedLocation({...selectedLocation, isActive: e.target.checked})}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Aktif</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowLocationForm(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    {isEditing ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {showMessageDetail && selectedMessage && (
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Mesaj Detayı</h2>
                  <button
                    onClick={() => setShowMessageDetail(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    <p className="text-gray-900">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <p className="text-gray-900">{selectedMessage.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                    <p className="text-gray-900">{new Date(selectedMessage.createdAt || selectedMessage.date).toLocaleString('tr-TR')}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
                  <p className="text-gray-900">{selectedMessage.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => {
                        handleUpdateMessageStatus(selectedMessage.id, e.target.value as ContactMessage['status']);
                        setSelectedMessage({...selectedMessage, status: e.target.value as ContactMessage['status']});
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="new">Yeni</option>
                      <option value="read">Okundu</option>
                      <option value="replied">Yanıtlandı</option>
                      <option value="archived">Arşivlendi</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowMessageDetail(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Kapat
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                    E-posta Gönder
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 