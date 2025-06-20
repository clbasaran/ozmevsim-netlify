'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PhotoIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon,
  TagIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Reference {
  id: number;
  title: string;
  description: string;
  client: string;
  clientLogo?: string;
  location: string;
  category: string;
  completedDate: string;
  image: string;
  images?: string[];
  status: 'active' | 'inactive';
  featured: boolean;
  rating: number;
  projectValue?: string;
  projectDuration?: string;
  services: string[];
  testimonial?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  color: string;
  count: number;
}

const defaultCategories: Category[] = [
  { id: 1, name: 'Ticari', color: 'blue', count: 0 },
  { id: 2, name: 'Konut', color: 'green', count: 0 },
  { id: 3, name: 'Endüstriyel', color: 'purple', count: 0 },
  { id: 4, name: 'Kamu', color: 'red', count: 0 },
  { id: 5, name: 'Hastane', color: 'yellow', count: 0 },
  { id: 6, name: 'Eğitim', color: 'indigo', count: 0 }
];

const defaultReferences: Reference[] = [
  {
    id: 1,
    title: 'Ankara Plaza Kombi Sistemi',
    description: 'Büyük ölçekli kombi sistemi kurulumu ve bakımı. Modern teknoloji ile enerji verimli çözüm.',
    client: 'Ankara Plaza AVM',
    clientLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    location: 'Ankara, Çankaya',
    category: 'Ticari',
    completedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600'
    ],
    status: 'active',
    featured: true,
    rating: 5,
    projectValue: '250.000 TL',
    projectDuration: '45 gün',
    services: ['Kombi Kurulumu', 'Bakım', 'Servis'],
    testimonial: 'Öz Mevsim ekibi profesyonel ve güvenilir hizmet verdi.',
    tags: ['kombi', 'enerji-verimli', 'büyük-proje'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 2,
    title: 'Yeşil Vadi Sitesi Merkezi Sistem',
    description: 'Merkezi ısıtma sistemi modernizasyonu. 200 daireli sitede komple sistem yenileme.',
    client: 'Yeşil Vadi Sitesi',
    location: 'Ankara, Keçiören',
    category: 'Konut',
    completedDate: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
    status: 'active',
    featured: true,
    rating: 5,
    projectValue: '450.000 TL',
    projectDuration: '60 gün',
    services: ['Merkezi Sistem', 'Modernizasyon'],
    tags: ['merkezi-sistem', 'konut', 'büyük-proje'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  }
];

export default function AdminReferencesPage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [filteredReferences, setFilteredReferences] = useState<Reference[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const storedReferences = localStorage.getItem('ozmevsim_references');
      if (storedReferences) {
        const parsedReferences = JSON.parse(storedReferences);
        setReferences(parsedReferences);
      } else {
        setReferences(defaultReferences);
        localStorage.setItem('ozmevsim_references', JSON.stringify(defaultReferences));
      }
    } catch (error) {
      console.error('Error loading references data:', error);
      setReferences(defaultReferences);
    }
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = references.filter(ref => {
      const matchesSearch = ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ref.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ref.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ref.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !filterCategory || ref.category === filterCategory;
      const matchesStatus = !filterStatus || ref.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort references
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Reference];
      let bValue: any = b[sortBy as keyof Reference];
      
      if (sortBy === 'completedDate' || sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortOrder === 'asc' ? -1 : 1;
      if (bValue == null) return sortOrder === 'asc' ? 1 : -1;
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredReferences(filtered);
  }, [references, searchTerm, filterCategory, filterStatus, sortBy, sortOrder]);

  // Update category counts
  useEffect(() => {
    const updatedCategories = categories.map(cat => ({
      ...cat,
      count: references.filter(ref => ref.category === cat.name).length
    }));
    setCategories(updatedCategories);
  }, [references]);

  const saveToLocalStorage = (data: Reference[]) => {
    localStorage.setItem('ozmevsim_references', JSON.stringify(data));
  };

  const handleCreateReference = () => {
    setSelectedReference({
      id: Date.now(),
      title: '',
      description: '',
      client: '',
      location: '',
      category: categories[0]?.name || '',
      completedDate: new Date().toISOString().split('T')[0],
      image: '',
      images: [],
      status: 'active',
      featured: false,
      rating: 5,
      services: [],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditReference = (reference: Reference) => {
    setSelectedReference(reference);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSaveReference = (referenceData: Reference) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let updatedReferences;
      
      if (isEditing) {
        updatedReferences = references.map(ref =>
          ref.id === referenceData.id ? { ...referenceData, updatedAt: new Date().toISOString() } : ref
        );
      } else {
        updatedReferences = [referenceData, ...references];
      }
      
      setReferences(updatedReferences);
      saveToLocalStorage(updatedReferences);
      setShowForm(false);
      setSelectedReference(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteReference = (id: number) => {
    if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
      const updatedReferences = references.filter(ref => ref.id !== id);
      setReferences(updatedReferences);
      saveToLocalStorage(updatedReferences);
    }
  };

  const handleToggleFeatured = (id: number) => {
    const updatedReferences = references.map(ref =>
      ref.id === id ? { ...ref, featured: !ref.featured, updatedAt: new Date().toISOString() } : ref
    );
    setReferences(updatedReferences);
    saveToLocalStorage(updatedReferences);
  };

  const handleBulkExport = () => {
    const dataStr = JSON.stringify(references, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ozmevsim-referanslar-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleBulkImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedData = JSON.parse(e.target?.result as string);
            if (Array.isArray(importedData)) {
              setReferences(importedData);
              saveToLocalStorage(importedData);
              alert(`${importedData.length} referans başarıyla içe aktarıldı.`);
            }
          } catch (error) {
            alert('Dosya formatı hatalı!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || 'gray';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referanslar Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Toplam {references.length} referans • {filteredReferences.length} gösteriliyor
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FunnelIcon className="w-4 h-4" />
            Filtrele
          </button>
          <button
            onClick={handleBulkImport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            İçe Aktar
          </button>
          <button
            onClick={handleBulkExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <DocumentArrowUpIcon className="w-4 h-4" />
            Dışa Aktar
          </button>
          <button
            onClick={handleCreateReference}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <PlusIcon className="w-4 h-4" />
            Yeni Referans
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Referans, müşteri veya etiket ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name} ({cat.count})</option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="updatedAt">Güncelleme Tarihi</option>
                <option value="completedDate">Tamamlanma Tarihi</option>
                <option value="title">Başlık</option>
                <option value="client">Müşteri</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="grid grid-cols-2 gap-1 w-4 h-4">
              <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
              <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
              <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
              <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
            </div>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="flex flex-col gap-1 w-4 h-4">
              <div className="bg-current w-full h-0.5 rounded-sm"></div>
              <div className="bg-current w-full h-0.5 rounded-sm"></div>
              <div className="bg-current w-full h-0.5 rounded-sm"></div>
            </div>
          </button>
        </div>

        <div className="text-sm text-gray-500">
          {filteredReferences.filter(ref => ref.featured).length} öne çıkan referans
        </div>
      </div>

      {/* References Grid/Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReferences.map((reference) => (
            <motion.div
              key={reference.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={reference.image}
                  alt={reference.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getCategoryColor(reference.category)}-100 text-${getCategoryColor(reference.category)}-800`}>
                    {reference.category}
                  </span>
                  {reference.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      ⭐ Öne Çıkan
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleToggleFeatured(reference.id)}
                    className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    {reference.featured ? (
                      <StarIconSolid className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <StarIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{reference.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: reference.rating }).map((_, i) => (
                      <StarIconSolid key={i} className="w-3 h-3" />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BuildingOfficeIcon className="w-4 h-4" />
                    {reference.client}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4" />
                    {reference.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(reference.completedDate).toLocaleDateString('tr-TR')}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{reference.description}</p>

                {reference.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {reference.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {reference.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{reference.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    reference.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {reference.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditReference(reference)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReference(reference.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referans</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReferences.map((reference) => (
                  <tr key={reference.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={reference.image}
                          alt={reference.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {reference.title}
                            {reference.featured && <StarIconSolid className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <div className="text-sm text-gray-500">{reference.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reference.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getCategoryColor(reference.category)}-100 text-${getCategoryColor(reference.category)}-800`}>
                        {reference.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        reference.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {reference.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reference.completedDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleFeatured(reference.id)}
                          className="text-yellow-600 hover:text-yellow-900 p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                        >
                          {reference.featured ? <StarIconSolid className="w-4 h-4" /> : <StarIcon className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEditReference(reference)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteReference(reference.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && selectedReference && (
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
                    {isEditing ? 'Referansı Düzenle' : 'Yeni Referans'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveReference(selectedReference);
                }}
                className="p-6 space-y-6"
              >
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ref-title" className="block text-sm font-medium text-gray-700 mb-2">
                      Proje Başlığı *
                    </label>
                    <input
                      id="ref-title"
                      type="text"
                      required
                      value={selectedReference.title}
                      onChange={(e) => setSelectedReference({...selectedReference, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="ref-client" className="block text-sm font-medium text-gray-700 mb-2">
                      Müşteri *
                    </label>
                    <input
                      id="ref-client"
                      type="text"
                      required
                      value={selectedReference.client}
                      onChange={(e) => setSelectedReference({...selectedReference, client: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="ref-category" className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori *
                    </label>
                    <select
                      id="ref-category"
                      required
                      value={selectedReference.category}
                      onChange={(e) => setSelectedReference({...selectedReference, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ref-location" className="block text-sm font-medium text-gray-700 mb-2">
                      Konum *
                    </label>
                    <input
                      id="ref-location"
                      type="text"
                      required
                      value={selectedReference.location}
                      onChange={(e) => setSelectedReference({...selectedReference, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="ref-date" className="block text-sm font-medium text-gray-700 mb-2">
                      Tamamlanma Tarihi
                    </label>
                    <input
                      id="ref-date"
                      type="date"
                      value={selectedReference.completedDate}
                      onChange={(e) => setSelectedReference({...selectedReference, completedDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="ref-status" className="block text-sm font-medium text-gray-700 mb-2">
                      Durum
                    </label>
                    <select
                      id="ref-status"
                      value={selectedReference.status}
                      onChange={(e) => setSelectedReference({...selectedReference, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="ref-description" className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    id="ref-description"
                    rows={4}
                    value={selectedReference.description}
                    onChange={(e) => setSelectedReference({...selectedReference, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="ref-value" className="block text-sm font-medium text-gray-700 mb-2">
                      Proje Değeri
                    </label>
                    <input
                      id="ref-value"
                      type="text"
                      value={selectedReference.projectValue || ''}
                      onChange={(e) => setSelectedReference({...selectedReference, projectValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="250.000 TL"
                    />
                  </div>

                  <div>
                    <label htmlFor="ref-duration" className="block text-sm font-medium text-gray-700 mb-2">
                      Proje Süresi
                    </label>
                    <input
                      id="ref-duration"
                      type="text"
                      value={selectedReference.projectDuration || ''}
                      onChange={(e) => setSelectedReference({...selectedReference, projectDuration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="45 gün"
                    />
                  </div>

                  <div>
                    <label htmlFor="ref-rating" className="block text-sm font-medium text-gray-700 mb-2">
                      Değerlendirme
                    </label>
                    <select
                      id="ref-rating"
                      value={selectedReference.rating}
                      onChange={(e) => setSelectedReference({...selectedReference, rating: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} Yıldız</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label htmlFor="ref-image" className="block text-sm font-medium text-gray-700 mb-2">
                    Ana Görsel URL
                  </label>
                  <input
                    id="ref-image"
                    type="url"
                    value={selectedReference.image}
                    onChange={(e) => setSelectedReference({...selectedReference, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Services */}
                <div>
                  <label htmlFor="ref-services" className="block text-sm font-medium text-gray-700 mb-2">
                    Hizmetler (virgülle ayırın)
                  </label>
                  <input
                    id="ref-services"
                    type="text"
                    value={selectedReference.services.join(', ')}
                    onChange={(e) => setSelectedReference({...selectedReference, services: e.target.value.split(', ').filter(s => s.trim())})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Kombi Kurulumu, Bakım, Servis"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="ref-tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Etiketler (virgülle ayırın)
                  </label>
                  <input
                    id="ref-tags"
                    type="text"
                    value={selectedReference.tags.join(', ')}
                    onChange={(e) => setSelectedReference({...selectedReference, tags: e.target.value.split(', ').filter(t => t.trim())})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="kombi, enerji-verimli, büyük-proje"
                  />
                </div>

                {/* Testimonial */}
                <div>
                  <label htmlFor="ref-testimonial" className="block text-sm font-medium text-gray-700 mb-2">
                    Müşteri Yorumu
                  </label>
                  <textarea
                    id="ref-testimonial"
                    rows={3}
                    value={selectedReference.testimonial || ''}
                    onChange={(e) => setSelectedReference({...selectedReference, testimonial: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Müşterinin projeyle ilgili yorumu..."
                  />
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={selectedReference.featured}
                    onChange={(e) => setSelectedReference({...selectedReference, featured: e.target.checked})}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Bu referansı öne çıkar
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        {isEditing ? 'Güncelle' : 'Kaydet'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredReferences.length === 0 && (
        <div className="text-center py-12">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Referans bulunamadı</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterCategory || filterStatus
              ? 'Arama kriterlerinizi değiştirmeyi deneyin.'
              : 'Henüz hiç referans eklenmemiş.'}
          </p>
          {!searchTerm && !filterCategory && !filterStatus && (
            <div className="mt-6">
              <button
                onClick={handleCreateReference}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                İlk Referansı Ekle
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 