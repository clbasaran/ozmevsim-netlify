'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  XMarkIcon,
  CheckIcon,
  StarIcon,
  CubeIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  brand: string;
  features: string[];
  status: string;
  created_at: string;
  updated_at: string;
  main_image: string;
  short_description: string;
  price: number;
  price_range: string;
  specifications: Record<string, string>;
  is_active: boolean;
  is_featured: boolean;
}

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Kombi',
      subcategories: ['Bosch', 'DemirDöküm', 'Vaillant', 'Buderus', 'Baymak']
    },
    {
      id: '2',
      name: 'Klima',
      subcategories: ['Daikin', 'Mitsubishi', 'LG', 'Samsung']
    },
    {
      id: '3',
      name: 'Isı Pompası',
      subcategories: ['Daikin', 'Mitsubishi', 'Bosch', 'Vaillant']
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products/');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleCreateProduct = () => {
    setSelectedProduct({
      id: '',
      name: '',
      brand: '',
      category: '',
      description: '',
      image_url: '',
      main_image: '',
      short_description: '',
      features: [],
      price: 0,
      price_range: '',
      specifications: {},
      is_active: true,
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!selectedProduct) return;

    try {
      const method = isCreating ? 'POST' : 'PUT';
      const url = isCreating ? '/api/products/' : `/api/products/${selectedProduct.id}/`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProduct),
      });

      if (response.ok) {
        // Reload products
        const productsResponse = await fetch('/api/products/');
        if (productsResponse.ok) {
          const data = await productsResponse.json();
          setProducts(data);
        }
        
        setIsModalOpen(false);
        setSelectedProduct(null);
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/products/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const addFeature = () => {
    if (!selectedProduct) return;
    setSelectedProduct({
      ...selectedProduct,
      features: [...selectedProduct.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!selectedProduct) return;
    const newFeatures = [...selectedProduct.features];
    newFeatures[index] = value;
    setSelectedProduct({
      ...selectedProduct,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    if (!selectedProduct) return;
    setSelectedProduct({
      ...selectedProduct,
      features: selectedProduct.features.filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-800 bg-green-100';
      case 'inactive': return 'text-red-800 bg-red-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'inactive': return 'Pasif';
      default: return 'Bilinmiyor';
    }
  };

  // Filtered products
  const filteredProducts = Array.isArray(products) ? products
    .filter(product => {
      const matchesSearch = !searchTerm || 
                           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || product.category === filterCategory;
      const matchesStatus = !filterStatus || product.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Product];
      const bValue = b[sortBy as keyof Product];
      const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? result : -result;
    }) : [];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleFileUpload = async (file: File): Promise<string> => {
    if (!file) throw new Error('Dosya seçilmedi');

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'products');

    try {
      // You can implement a file upload API or use a service like Cloudinary
      // For now, we'll simulate upload and return a local path
      
      // Create a local file path simulation
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const uploadPath = `/uploads/products/${fileName}`;
      
      // Here you would normally upload to your storage service
      // For demo, we'll return the simulated path
      
      return uploadPath;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Dosya yüklenirken hata oluştu');
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Lütfen sadece resim dosyası seçin');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    try {
      setUploading(true);
      const uploadedUrl = await handleFileUpload(file);
      setSelectedProduct(prev => {
        if (!prev) return null;
        return {
          ...prev,
          image_url: uploadedUrl,
          main_image: uploadedUrl
        };
      });
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Resim yüklenirken hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
            <p className="text-gray-600">Ürünleri ekleyin, düzenleyin ve yönetin</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateProduct}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Yeni Ürün
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{Array.isArray(products) ? products.length : 0}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Ürün</p>
                <p className="text-2xl font-bold text-green-600">
                  {Array.isArray(products) ? products.filter(p => p.status === 'active').length : 0}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kategori</p>
                <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
              </div>
              <ClipboardDocumentListIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pasif Ürün</p>
                <p className="text-2xl font-bold text-red-600">
                  {Array.isArray(products) ? products.filter(p => p.status === 'inactive').length : 0}
                </p>
              </div>
              <XCircleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ürün adı veya marka ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              Filtreler
              {showFilters ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('');
                      setFilterStatus('');
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Ürün
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Kategori
                    {sortBy === 'category' && (
                      sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('brand')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Marka
                    {sortBy === 'brand' && (
                      sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Durum
                    {sortBy === 'status' && (
                      sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Güncelleme
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          src={product.image_url || '/images/placeholder-product.jpg'}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-product.jpg';
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.brand}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(product.updated_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Düzenle"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900 p-1"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} arası, toplam {filteredProducts.length} ürün
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Önceki
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Sonraki
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isCreating ? 'Yeni Ürün Ekle' : 'Ürün Düzenle'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Adı</label>
                    <input
                      type="text"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marka</label>
                    <input
                      type="text"
                      value={selectedProduct.brand}
                      onChange={(e) => setSelectedProduct({...selectedProduct, brand: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Fotoğrafı</label>
                  <div className="space-y-4">
                    {/* Current Image Preview */}
                    {selectedProduct.image_url && (
                      <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={selectedProduct.image_url}
                          alt="Ürün önizleme"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-product.jpg';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* File Upload Input */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          disabled={uploading}
                        />
                      </div>
                      {uploading && (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-sm text-gray-600">Yükleniyor...</span>
                        </div>
                      )}
                    </div>
                    
                    {/* URL Input as alternative */}
                    <div className="text-center text-sm text-gray-500">veya</div>
                    <div>
                      <input
                        type="url"
                        value={selectedProduct.image_url}
                        onChange={(e) => setSelectedProduct({...selectedProduct, image_url: e.target.value, main_image: e.target.value})}
                        placeholder="Fotoğraf URL'i girin"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Category and Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                      value={selectedProduct.category}
                      onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                    <select
                      value={selectedProduct.status}
                      onChange={(e) => setSelectedProduct({...selectedProduct, status: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                      <option value="draft">Taslak</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Özellikler</label>
                    <button
                      onClick={addFeature}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Özellik Ekle
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Özellik açıklaması"
                        />
                        <button
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isCreating ? 'Ürün Ekle' : 'Değişiklikleri Kaydet'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 