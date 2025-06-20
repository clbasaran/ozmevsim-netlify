'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  XMarkIcon,
  CheckIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface CatalogItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  fileName: string;
  filePath: string;
  fileSize: string;
  uploadDate: string;
  featured: boolean;
  status: 'active' | 'inactive';
  sortOrder: number;
}

export default function AdminCatalogPage() {
  const [catalogs, setCatalogs] = useState<CatalogItem[]>([
    {
      id: '1',
      title: 'DemirDöküm Kombi Ailesi Broşürü',
      brand: 'DemirDöküm',
      category: 'Kombi',
      description: 'DemirDöküm kombi modellerinin teknik özellikleri ve avantajlarını içeren kapsamlı ürün kataloku.',
      fileName: '1-0-1-demirdoekuem-kombi-ailesi-brouerue-3019550.pdf',
      filePath: '/uploads/pdf/1-0-1-demirdoekuem-kombi-ailesi-brouerue-3019550.pdf',
      fileSize: '14 MB',
      uploadDate: '2024-01-15',
      featured: true,
      status: 'active',
      sortOrder: 1
    },
    {
      id: '2',
      title: 'Vaillant Kombi Ailesi Kırımlı Föyü',
      brand: 'Vaillant',
      category: 'Kombi',
      description: 'Vaillant kombi serilerinin detaylı teknik bilgileri ve kurulum rehberleri.',
      fileName: '1-0-5-vaillant-kombi-ailesi-krlml-foeyue-3020212.pdf',
      filePath: '/uploads/pdf/1-0-5-vaillant-kombi-ailesi-krlml-foeyue-3020212.pdf',
      fileSize: '1.1 MB',
      uploadDate: '2024-01-20',
      featured: true,
      status: 'active',
      sortOrder: 2
    },
    {
      id: '3',
      title: 'Bosch Condens 1200W OnePager',
      brand: 'Bosch',
      category: 'Kombi',
      description: 'Bosch Condens 1200W model kombi için tek sayfa ürün bilgi föyü.',
      fileName: 'o551031v272_Bosch_Condens_1200W_OnePager[6].pdf',
      filePath: '/uploads/pdf/o551031v272_Bosch_Condens_1200W_OnePager[6].pdf',
      fileSize: '313 KB',
      uploadDate: '2024-01-18',
      featured: false,
      status: 'active',
      sortOrder: 3
    },
    {
      id: '4',
      title: 'Bosch Condens 2200iW OnePager',
      brand: 'Bosch',
      category: 'Kombi',
      description: 'Bosch Condens 2200iW model kombi için tek sayfa ürün bilgi föyü.',
      fileName: 'o567919v272_Bosch_Condens_2200iW_OnePager[33].pdf',
      filePath: '/uploads/pdf/o567919v272_Bosch_Condens_2200iW_OnePager[33].pdf',
      fileSize: '475 KB',
      uploadDate: '2024-01-22',
      featured: false,
      status: 'active',
      sortOrder: 4
    }
  ]);

  const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const brands = ['', 'DemirDöküm', 'Vaillant', 'Bosch', 'Baymak', 'Buderus'];
  const categories = ['', 'Kombi', 'Klima', 'Isı Pompası', 'Radyatör'];

  const filteredCatalogs = catalogs.filter(catalog => {
    const matchesSearch = catalog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         catalog.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         catalog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !filterBrand || catalog.brand === filterBrand;
    const matchesCategory = !filterCategory || catalog.category === filterCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const handleCreateCatalog = () => {
    const newCatalog: CatalogItem = {
      id: Date.now().toString(),
      title: '',
      brand: '',
      category: '',
      description: '',
      fileName: '',
      filePath: '',
      fileSize: '',
      uploadDate: new Date().toISOString().split('T')[0],
      featured: false,
      status: 'active',
      sortOrder: catalogs.length + 1
    };
    setSelectedCatalog(newCatalog);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleEditCatalog = (catalog: CatalogItem) => {
    setSelectedCatalog(catalog);
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleSaveCatalog = () => {
    if (!selectedCatalog) return;

    if (isCreating) {
      setCatalogs(prev => [...prev, selectedCatalog]);
    } else {
      setCatalogs(prev => prev.map(c => c.id === selectedCatalog.id ? selectedCatalog : c));
    }

    setSelectedCatalog(null);
    setIsEditing(false);
    setIsCreating(false);
    alert('Katalog başarıyla kaydedildi!');
  };

  const handleDeleteCatalog = (id: string) => {
    if (confirm('Bu katalogu silmek istediğinizden emin misiniz?')) {
      setCatalogs(prev => prev.filter(c => c.id !== id));
      alert('Katalog başarıyla silindi!');
    }
  };

  const handleViewPDF = (filePath: string) => {
    window.open(filePath, '_blank');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      // Simulate file upload
      const fileName = file.name;
      const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      const filePath = `/uploads/pdf/${fileName}`;
      
      if (selectedCatalog) {
        setSelectedCatalog({
          ...selectedCatalog,
          fileName,
          filePath,
          fileSize,
          title: selectedCatalog.title || fileName.replace('.pdf', '').replace(/[-_]/g, ' ')
        });
      }
    } else {
      alert('Lütfen sadece PDF dosyası seçin.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Katalog Yönetimi</h1>
              <p className="text-gray-600">PDF katalogları ve broşürleri yönetin</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FunnelIcon className="h-5 w-5" />
                Filtreler
              </button>
              <button
                onClick={handleCreateCatalog}
                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Yeni Katalog
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arama
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Katalog ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marka
                  </label>
                  <select
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Tüm Markalar</option>
                    {brands.slice(1).map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Tüm Kategoriler</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterBrand('');
                      setFilterCategory('');
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Temizle
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Toplam Katalog</p>
                <p className="text-2xl font-bold text-gray-900">{catalogs.length}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Aktif Katalog</p>
                <p className="text-2xl font-bold text-green-600">
                  {catalogs.filter(c => c.status === 'active').length}
                </p>
              </div>
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Öne Çıkanlar</p>
                <p className="text-2xl font-bold text-blue-600">
                  {catalogs.filter(c => c.featured).length}
                </p>
              </div>
              <TagIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Marka Sayısı</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Array.from(new Set(catalogs.map(c => c.brand))).length}
                </p>
              </div>
              <ClipboardDocumentListIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Catalog List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Kataloglar ({filteredCatalogs.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Katalog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marka
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dosya Boyutu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCatalogs.map((catalog) => (
                  <tr key={catalog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-8 w-8 text-red-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {catalog.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {catalog.fileName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {catalog.brand}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {catalog.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {catalog.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        catalog.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {catalog.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                      {catalog.featured && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Öne Çıkan
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewPDF(catalog.filePath)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Görüntüle"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditCatalog(catalog)}
                          className="text-orange-600 hover:text-orange-900"
                          title="Düzenle"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCatalog(catalog.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Sil"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCatalogs.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Katalog bulunamadı</h3>
              <p className="text-gray-600">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && selectedCatalog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isCreating ? 'Yeni Katalog' : 'Katalog Düzenle'}
                  </h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Katalog Başlığı *
                    </label>
                    <input
                      type="text"
                      value={selectedCatalog.title}
                      onChange={(e) => setSelectedCatalog({...selectedCatalog, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Katalog başlığı"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marka *
                    </label>
                    <select
                      value={selectedCatalog.brand}
                      onChange={(e) => setSelectedCatalog({...selectedCatalog, brand: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Marka seçin</option>
                      {brands.slice(1).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori *
                    </label>
                    <select
                      value={selectedCatalog.category}
                      onChange={(e) => setSelectedCatalog({...selectedCatalog, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Kategori seçin</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PDF Dosyası
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {selectedCatalog.fileName && (
                      <p className="mt-1 text-sm text-gray-600">
                        Mevcut: {selectedCatalog.fileName}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={selectedCatalog.description}
                      onChange={(e) => setSelectedCatalog({...selectedCatalog, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Katalog açıklaması"
                    />
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCatalog.featured}
                        onChange={(e) => setSelectedCatalog({...selectedCatalog, featured: e.target.checked})}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Öne çıkan katalog</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durum
                    </label>
                    <select
                      value={selectedCatalog.status}
                      onChange={(e) => setSelectedCatalog({...selectedCatalog, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveCatalog}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 