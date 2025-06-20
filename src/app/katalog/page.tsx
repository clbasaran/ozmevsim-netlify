'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  TagIcon,
  CalendarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
  thumbnail?: string;
  featured: boolean;
}

const catalogData: CatalogItem[] = [
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
    featured: true
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
    featured: true
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
    featured: false
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
    featured: false
  }
];

const brands = ['Tümü', 'DemirDöküm', 'Vaillant', 'Bosch'];
const categories = ['Tümü', 'Kombi', 'Klima', 'Isı Pompası', 'Radyatör'];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Tümü');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCatalogs = catalogData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'Tümü' || item.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const handleViewPDF = (filePath: string, title: string = '') => {
    // Open PDF in dedicated viewer page for better HTML-like experience
    const encodedUrl = encodeURIComponent(filePath);
    const encodedTitle = encodeURIComponent(title);
    const viewerUrl = `/pdf-viewer?url=${encodedUrl}&title=${encodedTitle}`;
    window.open(viewerUrl, '_blank');
  };

  const handleDownloadPDF = (filePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Content with proper top margin for fixed header */}
      <div className="page-content py-12">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="font-medium">Ana Sayfaya Dön</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Ürün Katalogları
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Tüm markalarımıza ait ürün katalogları, teknik föyler ve kurulum rehberlerini inceleyin ve indirin.
            </motion.p>
          </div>

          {/* Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Katalog ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FunnelIcon className="h-5 w-5" />
                Filtreler
              </button>

              {/* Brand Filter */}
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full lg:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full lg:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-medium">{filteredCatalogs.length}</span> katalog bulundu
            </p>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalogs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* PDF Icon Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-center">
                  <DocumentTextIcon className="h-16 w-16 text-white mx-auto mb-2" />
                  <div className="flex items-center justify-center gap-2">
                    <TagIcon className="h-4 w-4 text-orange-200" />
                    <span className="text-orange-100 text-sm font-medium">{item.brand}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                    <span>{item.fileSize}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Güncelleme: {new Date(item.uploadDate).toLocaleDateString('tr-TR')}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewPDF(item.filePath, item.title)}
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                    >
                      <EyeIcon className="h-4 w-4" />
                      Görüntüle
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(item.filePath, item.fileName)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      İndir
                    </button>
                  </div>
                </div>

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                    Öne Çıkan
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredCatalogs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <DocumentTextIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Katalog bulunamadı</h3>
              <p className="text-gray-600 mb-4">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBrand('Tümü');
                  setSelectedCategory('Tümü');
                }}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Filtreleri temizle
              </button>
            </motion.div>
          )}

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-orange-50 rounded-lg p-6 mt-12 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Katalogda Aradığınızı Bulamadınız mı?
            </h3>
            <p className="text-gray-600 mb-4">
              Ek kataloglar ve teknik dokümanlar için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+905324467367"
                className="inline-flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                📞 0532 446 73 67
              </a>
              <a
                href="mailto:info@ozmevsim.com"
                className="inline-flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                ✉️ info@ozmevsim.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 