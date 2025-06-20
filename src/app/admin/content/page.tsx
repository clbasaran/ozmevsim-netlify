'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PhotoIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  LanguageIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  LinkIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';

interface ContentFormData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: 'hero' | 'service' | 'product' | 'about' | 'team' | 'testimonial' | 'blog' | 'faq' | 'portfolio';
  status: 'published' | 'draft' | 'archived';
  featuredImage?: string;
  gallery?: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  customFields: Record<string, any>;
  publishDate: string;
  author: string;
  tags: string[];
  category?: string;
}

const ContentManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    type: 'service',
    status: 'draft',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    },
    customFields: {},
    publishDate: new Date().toISOString().split('T')[0],
    author: 'Admin',
    tags: []
  });

  // Mock data
  const [contentItems] = useState<ContentFormData[]>([
    {
      id: '1',
      title: 'Profesyonel Kombi Montaj Hizmeti',
      slug: 'profesyonel-kombi-montaj-hizmeti',
      content: 'Uzman ekibimizle güvenli kombi montajı...',
      excerpt: 'Profesyonel kombi montaj hizmetimiz ile evinizde güvenli ısıtma',
      type: 'service',
      status: 'published',
      featuredImage: '/images/kombi-montaj.jpg',
      seo: {
        metaTitle: 'Profesyonel Kombi Montaj Hizmeti | Öz Mevsim',
        metaDescription: 'İstanbul\'da profesyonel kombi montaj hizmeti. Uzman ekip, garantili işçilik.',
        keywords: ['kombi montaj', 'istanbul', 'profesyonel']
      },
      customFields: {
        duration: '2-4 saat',
        warranty: '2 yıl'
      },
      publishDate: '2024-01-15',
      author: 'Admin',
      tags: ['kombi', 'montaj', 'hizmet'],
      category: 'Isıtma Sistemleri'
    },
    {
      id: '2',
      title: 'Vaillant EcoTEC Plus Kombi',
      slug: 'vaillant-ecotec-plus-kombi',
      content: 'Yüksek verimli kondenzli kombi...',
      excerpt: 'Enerji tasarruflu Vaillant EcoTEC Plus kombi modelleri',
      type: 'product',
      status: 'published',
      featuredImage: '/images/vaillant-kombi.jpg',
      seo: {
        metaTitle: 'Vaillant EcoTEC Plus Kombi Modelleri',
        metaDescription: 'Vaillant EcoTEC Plus kombi özellikleri, fiyatları ve montaj hizmeti.',
        keywords: ['vaillant', 'kombi', 'ecotec plus']
      },
      customFields: {
        brand: 'Vaillant',
        power: '24 kW',
        efficiency: 'A+',
        price: '8500-12000 TL'
      },
      publishDate: '2024-01-10',
      author: 'Editor',
      tags: ['vaillant', 'kombi', 'ürün'],
      category: 'Kombiler'
    }
  ]);

  const contentTypes = [
    { value: 'hero', label: 'Hero Bölümü', icon: PhotoIcon },
    { value: 'service', label: 'Hizmet', icon: DocumentTextIcon },
    { value: 'product', label: 'Ürün', icon: TagIcon },
    { value: 'about', label: 'Hakkımızda', icon: UserIcon },
    { value: 'team', label: 'Ekip Üyesi', icon: UserIcon },
    { value: 'testimonial', label: 'Müşteri Yorumu', icon: DocumentTextIcon },
    { value: 'blog', label: 'Blog Yazısı', icon: DocumentTextIcon },
    { value: 'faq', label: 'S.S.S', icon: DocumentTextIcon },
    { value: 'portfolio', label: 'Portfolio', icon: PhotoIcon }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? '/api/blog' : '/api/blog';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem ? { id: editingItem.id, ...formData } : formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(editingItem ? 'İçerik güncellendi!' : 'İçerik oluşturuldu!');
        setShowForm(false);
        setEditingItem(null);
        // Refresh content list
        window.location.reload();
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Bir hata oluştu!');
    }
  };

  const handleEdit = (item: ContentFormData) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const renderCustomFields = () => {
    const fields = [];
    
    switch (formData.type) {
      case 'service':
        fields.push(
          <div key="duration" className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Süre</label>
              <input
                type="text"
                value={formData.customFields.duration || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  customFields: { ...formData.customFields, duration: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="2-4 saat"
              />
            </div>
          </div>
        );
        break;
        
      case 'product':
        fields.push(
          <div key="product-fields" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marka</label>
                <input
                  type="text"
                  value={formData.customFields.brand || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customFields: { ...formData.customFields, brand: e.target.value }
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Vaillant"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={formData.customFields.category || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customFields: { ...formData.customFields, category: e.target.value }
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="kombi">Kombi</option>
                  <option value="klima">Klima</option>
                  <option value="radiator">Radyatör</option>
                  <option value="isi-pompasi">Isı Pompası</option>
                </select>
              </div>
            </div>
          </div>
        );
        break;
        
      case 'team':
        fields.push(
          <div key="team-fields" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pozisyon</label>
                <input
                  type="text"
                  value={formData.customFields.position || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customFields: { ...formData.customFields, position: e.target.value }
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Proje Müdürü"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deneyim</label>
                <input
                  type="text"
                  value={formData.customFields.experience || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customFields: { ...formData.customFields, experience: e.target.value }
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="15 yıl"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanları</label>
              <input
                type="text"
                value={formData.customFields.expertise || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  customFields: { ...formData.customFields, expertise: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Kombi Sistemleri, Doğalgaz Tesisatı"
              />
            </div>
          </div>
        );
        break;
    }
    
    return fields;
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            <span>← Geri Dön</span>
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {editingItem ? 'İçerik Düzenle' : 'Yeni İçerik Ekle'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: generateSlug(title)
                    });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    /
                  </span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İçerik Türü *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {contentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Taslak</option>
                    <option value="published">Yayınlanan</option>
                    <option value="archived">Arşivlenen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kısa Açıklama</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="İçeriğin kısa açıklaması..."
                />
              </div>
            </div>
          </div>

          {/* İçerik */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">İçerik</h3>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="İçerik metnini buraya yazın..."
            />
          </div>

          {/* Özel Alanlar */}
          {renderCustomFields().length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Özel Alanlar</h3>
              <div className="space-y-4">
                {renderCustomFields()}
              </div>
            </div>
          )}

          {/* SEO */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Ayarları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Başlık</label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaTitle: e.target.value }
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seo.metaTitle.length}/60 karakter</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Açıklama</label>
                <textarea
                  value={formData.seo.metaDescription}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaDescription: e.target.value }
                  })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seo.metaDescription.length}/160 karakter</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Anahtar Kelimeler</label>
                <input
                  type="text"
                  value={formData.seo.keywords.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, keywords: e.target.value.split(',').map(k => k.trim()) }
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="kombi, montaj, istanbul"
                />
                <p className="text-xs text-gray-500 mt-1">Virgülle ayırın</p>
              </div>
            </div>
          </div>

          {/* Yayın Ayarları */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yayın Ayarları</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yayın Tarihi</label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yazar</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="kombi, hizmet, montaj"
              />
              <p className="text-xs text-gray-500 mt-1">Virgülle ayırın</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingItem ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">İçerik Yönetimi</h2>
          <p className="text-gray-600 mt-1">Tüm içerikleri buradan yönetebilirsiniz</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Yeni İçerik</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="İçerik ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Türler</option>
              {contentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="published">Yayınlanan</option>
              <option value="draft">Taslak</option>
              <option value="archived">Arşivlenen</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {item.featuredImage && (
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'published' ? 'bg-green-100 text-green-800' :
                    item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status === 'published' ? 'Yayınlanan' :
                     item.status === 'draft' ? 'Taslak' : 'Arşivlenen'}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {contentTypes.find(t => t.value === item.type)?.label}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(item.publishDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{item.author}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 text-gray-400 hover:text-green-600"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement; 