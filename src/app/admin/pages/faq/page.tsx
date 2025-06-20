'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ClockIcon,
  TagIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  order: number;
  isActive: boolean;
  isPopular: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'Kombi montajı ne kadar sürer?',
      answer: 'Standart bir kombi montajı genellikle 2-4 saat arasında tamamlanır. Bu süre, montaj yerinin hazırlık durumu, boru çekimi gerekliliği ve kombi tipine göre değişiklik gösterebilir.',
      category: 'Montaj',
      keywords: ['kombi', 'montaj', 'süre', 'kurulum'],
      order: 1,
      isActive: true,
      isPopular: true,
      viewCount: 156,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      question: 'Kombi bakımı ne sıklıkla yapılmalı?',
      answer: 'Kombinizin verimli çalışması ve uzun ömürlü olması için yılda en az bir kez profesyonel bakım yaptırmanız önerilir. Yoğun kullanım durumunda 6 ayda bir bakım yapılabilir.',
      category: 'Bakım',
      keywords: ['bakım', 'kombi', 'periyot', 'verimlilik'],
      order: 2,
      isActive: true,
      isPopular: true,
      viewCount: 134,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      question: 'Hangi kombi markası daha iyi?',
      answer: 'Vaillant, Bosch, Demirdöküm, Buderus gibi markalar kalite ve güvenilirlik açısından öne çıkar. Marka seçimi, bütçeniz, evinizin büyüklüğü ve ısıtma ihtiyacınıza göre değişir.',
      category: 'Ürün Seçimi',
      keywords: ['marka', 'seçim', 'kalite', 'vaillant', 'bosch'],
      order: 3,
      isActive: true,
      isPopular: false,
      viewCount: 89,
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16'
    },
    {
      id: '4',
      question: 'Kombi arızaları için garanti süresi nedir?',
      answer: 'Yeni kombi satışlarında 2 yıl üretici garantisi, montaj işçiliğinde 1 yıl garanti sunuyoruz. Bakım ve onarım hizmetlerimizde ise 6 ay işçilik garantisi veriyoruz.',
      category: 'Garanti',
      keywords: ['garanti', 'arıza', 'süre', 'işçilik'],
      order: 4,
      isActive: true,
      isPopular: false,
      viewCount: 67,
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17'
    },
    {
      id: '5',
      question: 'Acil durumlarda hizmet veriyor musunuz?',
      answer: 'Evet, 7/24 acil servis hizmeti sunuyoruz. Kombi arızaları, su kaçakları ve ısıtma sistemlerindeki acil durumlar için hızlı müdahale ekibimiz mevcuttur.',
      category: 'Hizmet',
      keywords: ['acil', 'servis', '7/24', 'arıza'],
      order: 5,
      isActive: true,
      isPopular: true,
      viewCount: 198,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19'
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Montaj', color: 'bg-blue-100 text-blue-800', icon: '🔧' },
    { id: '2', name: 'Bakım', color: 'bg-green-100 text-green-800', icon: '⚙️' },
    { id: '3', name: 'Ürün Seçimi', color: 'bg-purple-100 text-purple-800', icon: '🛒' },
    { id: '4', name: 'Garanti', color: 'bg-yellow-100 text-yellow-800', icon: '🛡️' },
    { id: '5', name: 'Hizmet', color: 'bg-red-100 text-red-800', icon: '📞' },
    { id: '6', name: 'Genel', color: 'bg-gray-100 text-gray-800', icon: '❓' }
  ]);

  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedFaqs = localStorage.getItem('ozmevsim_faqs');
      const savedCategories = localStorage.getItem('ozmevsim_faq_categories');
      
      if (savedFaqs) {
        setFaqs(JSON.parse(savedFaqs));
      }
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.error('Error loading FAQ data:', error);
    }
  }, []);

  // Save data to localStorage whenever faqs change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('ozmevsim_faqs', JSON.stringify(faqs));
    } catch (error) {
      console.error('Error saving FAQs:', error);
    }
  }, [faqs]);

  // Filter and search FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filterCategory || faq.category === filterCategory;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'active' && faq.isActive) ||
                         (filterStatus === 'inactive' && !faq.isActive) ||
                         (filterStatus === 'popular' && faq.isPopular);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort FAQs
  const sortedFaqs = [...filteredFaqs].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'viewCount':
        aValue = a.viewCount;
        bValue = b.viewCount;
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        aValue = a[sortBy as keyof FAQ];
        bValue = b[sortBy as keyof FAQ];
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqs = sortedFaqs.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateFaq = () => {
    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: '',
      answer: '',
      category: '',
      keywords: [],
      order: faqs.length + 1,
      isActive: true,
      isPopular: false,
      viewCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setSelectedFaq(newFaq);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleEditFaq = (faq: FAQ) => {
    setSelectedFaq(faq);
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleSaveFaq = () => {
    if (!selectedFaq) return;

    const updatedFaq = {
      ...selectedFaq,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (isCreating) {
      setFaqs(prev => [...prev, updatedFaq]);
    } else {
      setFaqs(prev => prev.map(f => f.id === selectedFaq.id ? updatedFaq : f));
    }

    setSelectedFaq(null);
    setIsEditing(false);
    setIsCreating(false);
    alert('SSS başarıyla kaydedildi!');
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      setFaqs(prev => prev.filter(f => f.id !== id));
      alert('SSS başarıyla silindi!');
    }
  };

  const toggleFaqStatus = (id: string) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f));
  };

  const togglePopular = (id: string) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, isPopular: !f.isPopular } : f));
  };

  const handleBulkImport = () => {
    // Simulate CSV import
    const sampleFaqs = [
      {
        id: Date.now().toString(),
        question: 'İçe aktarılan soru örneği',
        answer: 'Bu soru CSV dosyasından içe aktarılmıştır.',
        category: 'Genel',
        keywords: ['içe aktarma', 'csv'],
        order: faqs.length + 1,
        isActive: true,
        isPopular: false,
        viewCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
    ];

    setFaqs(prev => [...prev, ...sampleFaqs]);
    alert('Örnek SSS başarıyla içe aktarıldı!');
  };

  const handleBulkExport = () => {
    const csvContent = [
      ['ID', 'Soru', 'Cevap', 'Kategori', 'Anahtar Kelimeler', 'Aktif', 'Popüler', 'Görüntülenme'],
      ...faqs.map(f => [
        f.id,
        f.question,
        f.answer,
        f.category,
        f.keywords.join('; '),
        f.isActive ? 'Evet' : 'Hayır',
        f.isPopular ? 'Evet' : 'Hayır',
        f.viewCount
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sss.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : '❓';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SSS Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Toplam {faqs.length} soru • {filteredFaqs.length} gösteriliyor
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
            onClick={handleCreateFaq}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <PlusIcon className="w-4 h-4" />
            Yeni Soru
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
                placeholder="Soru, cevap veya anahtar kelime ile ara..."
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
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
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
                <option value="popular">Popüler</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="order">Sıraya Göre</option>
                <option value="viewCount">Görüntülenmeye Göre</option>
                <option value="createdAt">Tarihe Göre</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            {paginatedFaqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{getCategoryIcon(faq.category)}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(faq.category)}`}>
                          {faq.category}
                        </span>
                        {faq.isPopular && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Popüler
                          </span>
                        )}
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          {faq.viewCount}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Sıra: {faq.order}</span>
                        <span>Oluşturulma: {new Date(faq.createdAt).toLocaleDateString('tr-TR')}</span>
                        <span>Güncelleme: {new Date(faq.updatedAt).toLocaleDateString('tr-TR')}</span>
                      </div>

                      {faq.keywords.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <TagIcon className="w-4 h-4 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {faq.keywords.map((keyword, index) => (
                              <span key={index} className="inline-flex px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Cevabı Göster/Gizle"
                      >
                        {expandedFaq === faq.id ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => toggleFaqStatus(faq.id)}
                        className={`p-2 rounded-lg ${
                          faq.isActive ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'
                        }`}
                        title={faq.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                      >
                        {faq.isActive ? (
                          <CheckCircleIcon className="w-4 h-4" />
                        ) : (
                          <XCircleIcon className="w-4 h-4" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => togglePopular(faq.id)}
                        className={`p-2 rounded-lg ${
                          faq.isPopular ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title={faq.isPopular ? 'Popülerden Çıkar' : 'Popüler Yap'}
                      >
                        ⭐
                      </button>
                      
                      <button
                        onClick={() => handleEditFaq(faq)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                        title="Düzenle"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Sil"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="prose prose-sm max-w-none text-gray-700">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                <span>{startIndex + 1}</span> - <span>{Math.min(startIndex + itemsPerPage, sortedFaqs.length)}</span> arası,
                toplam <span>{sortedFaqs.length}</span> sonuç
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                >
                  Önceki
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Form Modal */}
      <AnimatePresence>
        {isEditing && selectedFaq && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isCreating ? 'Yeni Soru Ekle' : 'Soru Düzenle'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="faq-question" className="block text-sm font-medium text-gray-700 mb-2">
                    Soru *
                  </label>
                  <input
                    id="faq-question"
                    type="text"
                    value={selectedFaq.question}
                    onChange={(e) => setSelectedFaq({...selectedFaq, question: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="faq-answer" className="block text-sm font-medium text-gray-700 mb-2">
                    Cevap *
                  </label>
                  <textarea
                    id="faq-answer"
                    value={selectedFaq.answer}
                    onChange={(e) => setSelectedFaq({...selectedFaq, answer: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="faq-category" className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori *
                    </label>
                    <select
                      id="faq-category"
                      value={selectedFaq.category}
                      onChange={(e) => setSelectedFaq({...selectedFaq, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="faq-order" className="block text-sm font-medium text-gray-700 mb-2">
                      Sıra Numarası
                    </label>
                    <input
                      id="faq-order"
                      type="number"
                      value={selectedFaq.order}
                      onChange={(e) => setSelectedFaq({...selectedFaq, order: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="faq-keywords" className="block text-sm font-medium text-gray-700 mb-2">
                    Anahtar Kelimeler
                  </label>
                  <input
                    id="faq-keywords"
                    type="text"
                    value={selectedFaq.keywords.join(', ')}
                    onChange={(e) => setSelectedFaq({
                      ...selectedFaq, 
                      keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Virgülle ayırarak yazın (örn: kombi, montaj, süre)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Anahtar kelimeler arama sonuçlarında daha kolay bulunmanızı sağlar
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <input
                      id="faq-active"
                      type="checkbox"
                      checked={selectedFaq.isActive}
                      onChange={(e) => setSelectedFaq({...selectedFaq, isActive: e.target.checked})}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor="faq-active" className="ml-2 text-sm text-gray-700">Aktif</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="faq-popular"
                      type="checkbox"
                      checked={selectedFaq.isPopular}
                      onChange={(e) => setSelectedFaq({...selectedFaq, isPopular: e.target.checked})}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor="faq-popular" className="ml-2 text-sm text-gray-700">Popüler Soru</label>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveFaq}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  {isCreating ? 'Soru Ekle' : 'Güncelle'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
