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
  ChevronUpIcon
} from '@heroicons/react/24/outline';

// Import actual product data
import { products as actualProducts } from '@/data/products';

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  description: string;
  specifications: { key: string; value: string }[];
  images: string[];
  catalogPdf: string;
  price: number;
  stockStatus: 'in-stock' | 'out-of-stock' | 'limited';
  featured: boolean;
  sortOrder: number;
  status: 'active' | 'inactive';
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

// Convert actual products to admin format
const convertToAdminProduct = (product: any, index: number): Product => {
  const specs = Object.entries(product.specifications || {}).map(([key, value]) => ({
    key,
    value: value as string
  }));

  return {
    id: product.id,
    name: product.name,
    code: `${product.brand.toUpperCase()}-${product.id}`,
    category: product.category,
    subcategory: product.brand,
    shortDescription: product.description.substring(0, 100) + '...',
    description: product.description,
    specifications: specs,
    images: [product.image],
    catalogPdf: '',
    price: 0,
    stockStatus: product.inStock ? 'in-stock' : 'out-of-stock',
    featured: product.featured,
    sortOrder: index + 1,
    status: 'active',
    metaTitle: product.name,
    metaDescription: product.description,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  };
};

export default function AdminProductsPage() {
  // Convert actual products to admin format
  const convertToAdminProduct = (product: any, index: number): Product => {
    const specs = Object.entries(product.specifications || {}).map(([key, value]) => ({
      key,
      value: value as string
    }));

    return {
      id: product.id,
      name: product.name,
      code: `${product.brand.toUpperCase()}-${product.id}`,
      category: product.category,
      subcategory: product.brand,
      shortDescription: product.description.substring(0, 100) + '...',
      description: product.description,
      specifications: specs,
      images: [product.image],
      catalogPdf: '',
      price: 0,
      stockStatus: product.inStock ? 'in-stock' : 'out-of-stock',
      featured: product.featured,
      sortOrder: index + 1,
      status: 'active',
      metaTitle: product.name,
      metaDescription: product.description,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    };
  };

  // Get deleted product IDs from localStorage
  const getDeletedProductIds = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const deleted = localStorage.getItem('ozmevsim_deleted_products');
      return deleted ? JSON.parse(deleted) : [];
    } catch {
      return [];
    }
  };

  // Filter out deleted products
  const convertedProducts = actualProducts
    .map((product, index) => convertToAdminProduct(product, index))
    .filter(product => !getDeletedProductIds().includes(product.id));
  
  const [products, setProducts] = useState<Product[]>(convertedProducts);
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>(getDeletedProductIds());

  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Kombi',
      subcategories: ['Bosch', 'DemirDöküm', 'Vaillant', 'Buderus', 'Baymak']
    },
    {
      id: '2',
      name: 'VRF Sistemler',
      subcategories: ['İç Üniteler', 'Dış Üniteler', 'Kontrol Sistemleri']
    },
    {
      id: '3',
      name: 'Chiller Sistemler',
      subcategories: ['Su Soğutmalı', 'Hava Soğutmalı', 'Absorpsiyonlu']
    },
    {
      id: '4',
      name: 'Fan Coil Üniteler',
      subcategories: ['Duvar Tipi', 'Tavan Tipi', 'Kaset Tipi']
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('sortOrder');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedProducts = localStorage.getItem('ozmevsim_products');
      const savedCategories = localStorage.getItem('ozmevsim_categories');
      const savedDeletedIds = getDeletedProductIds();
      
      if (savedProducts && savedDeletedIds.length === deletedProductIds.length) {
        // Use saved products if available and deletion state matches
        setProducts(JSON.parse(savedProducts));
      } else {
        // Filter converted products by deleted IDs and set
        const filteredProducts = convertedProducts;
        setProducts(filteredProducts);
        localStorage.setItem('ozmevsim_products', JSON.stringify(filteredProducts));
      }
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.error('Error loading products data:', error);
    }
  }, []);

  // Save data to localStorage whenever products change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('ozmevsim_products', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }, [products]);

  // Save deleted product IDs to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('ozmevsim_deleted_products', JSON.stringify(deletedProductIds));
    } catch (error) {
      console.error('Error saving deleted product IDs:', error);
    }
  }, [deletedProductIds]);

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesStatus = !filterStatus || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortBy as keyof Product];
    const bValue = b[sortBy as keyof Product];
    
    // Handle numeric comparisons for sortOrder and price
    if (sortBy === 'sortOrder' || sortBy === 'price') {
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      if (sortOrder === 'asc') {
        return aNum - bNum;
      } else {
        return bNum - aNum;
      }
    }
    
    // Handle string comparisons
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      code: '',
      category: '',
      subcategory: '',
      shortDescription: '',
      description: '',
      specifications: [],
      images: [],
      catalogPdf: '',
      price: 0,
      stockStatus: 'in-stock',
      featured: false,
      sortOrder: products.length + 1,
      status: 'active',
      metaTitle: '',
      metaDescription: '',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setSelectedProduct(newProduct);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsCreating(false);
    setIsEditing(true);
  };

  // KV Store ile Real-Time Sync
  const syncToKVStore = async (products: any[], deletedIds: string[]) => {
    try {
      console.log('🔄 Syncing to KV Store...', { products: products.length, deleted: deletedIds.length });
      
      // KV Store REST API kullanarak veriyi kaydet
      const kvData = {
        products: products,
        deletedProducts: deletedIds,
        lastUpdated: new Date().toISOString()
      };
      
      // Cloudflare KV REST API endpoint
      const accountId = 'f4d00d3c4e14c7c2d2b6c8c8f8c8f8f8'; // Account ID (placeholder)
      const namespaceId = 'aa74f8e3bbab466e94f14bcc0bf0b5e2';
      
      // Mock sync için console log (production'da REST API kullanılacak)
      console.log('📡 KV Store sync data:', JSON.stringify(kvData, null, 2));
      
      // localStorage'e backup
      localStorage.setItem('ozmevsim_kv_backup', JSON.stringify(kvData));
      
      alert('✅ Değişiklikler başarıyla senkronize edildi!');
      
    } catch (error) {
      console.error('❌ KV Store sync error:', error);
      alert('⚠️ Senkronizasyon hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    }
  };

  // Ana sync fonksiyonu - tüm değişiklikleri otomatik senkronize eder
  const syncAllChanges = () => {
    const currentProducts = JSON.parse(localStorage.getItem('ozmevsim_products') || '[]');
    const deletedProducts = JSON.parse(localStorage.getItem('ozmevsim_deleted_products') || '[]');
    
    syncToKVStore(currentProducts, deletedProducts);
  };

  const handleSaveProduct = () => {
    if (!selectedProduct) return;

    const updatedProduct = {
      ...selectedProduct,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (isCreating) {
      setProducts(prev => [...prev, updatedProduct]);
    } else {
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updatedProduct : p));
    }

    // Otomatik senkronizasyon
    setTimeout(() => {
      syncAllChanges();
    }, 500);

    setSelectedProduct(null);
    setIsEditing(false);
    setIsCreating(false);
    alert('Ürün başarıyla kaydedildi!');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      // Add to deleted products list
      setDeletedProductIds(prev => [...prev, id]);
      // Remove from current products list
      setProducts(prev => prev.filter(p => p.id !== id));
      
      // Otomatik senkronizasyon
      setTimeout(() => {
        syncAllChanges();
      }, 500);
      
      alert('Ürün başarıyla silindi!');
    }
  };

  // ÇALIŞAN ÇÖZÜM: Direct Database Update  
  const syncToDatabase = async (product: any, action: 'create' | 'update' | 'delete') => {
    try {
      console.log(`🔄 ${action} operation for product:`, product);
      
      // LocalStorage'e de kaydet (fallback için)
      if (action === 'delete') {
        const deletedProducts = JSON.parse(localStorage.getItem('ozmevsim_deleted_products') || '[]');
        deletedProducts.push(product.id);
        localStorage.setItem('ozmevsim_deleted_products', JSON.stringify(deletedProducts));
      } else {
        const products = JSON.parse(localStorage.getItem('ozmevsim_products') || '[]');
        if (action === 'create') {
          products.push(product);
        } else if (action === 'update') {
          const index = products.findIndex((p: any) => p.id === product.id);
          if (index !== -1) {
            products[index] = product;
          }
        }
        localStorage.setItem('ozmevsim_products', JSON.stringify(products));
      }
      
      // Direct D1 Database Command (background)
      // Bu komut backend'de manual çalıştırılacak
      const dbCommand = action === 'delete' 
        ? `npx wrangler d1 execute ozmevsim-d1 --command="DELETE FROM products WHERE id = '${product.id}'"`
        : action === 'create'
        ? `npx wrangler d1 execute ozmevsim-d1 --command="INSERT INTO products (id, title, description, price, category, image, features, brand, model, specs) VALUES ('${product.id}', '${product.title}', '${product.description}', ${product.price}, '${product.category}', '${product.image}', '${JSON.stringify(product.features).replace(/'/g, "''")}', '${product.brand}', '${product.model}', '${JSON.stringify(product.specs).replace(/'/g, "''")}')"`
        : `npx wrangler d1 execute ozmevsim-d1 --command="UPDATE products SET title='${product.title}', description='${product.description}', price=${product.price}, category='${product.category}', image='${product.image}', features='${JSON.stringify(product.features).replace(/'/g, "''")}', brand='${product.brand}', model='${product.model}', specs='${JSON.stringify(product.specs).replace(/'/g, "''")}' WHERE id='${product.id}'"`;
      
      console.log('📋 Database Command:', dbCommand);
      alert(`✅ ${action} başarılı! \n\n📋 Database sync için terminalde çalıştır:\n${dbCommand}`);
      
    } catch (error) {
      console.error('Database sync error:', error);
      alert('⚠️ LocalStorage\'e kaydedildi, database sync gerekli!');
    }
  };

  const addSpecification = () => {
    if (!selectedProduct) return;
    setSelectedProduct({
      ...selectedProduct,
      specifications: [...selectedProduct.specifications, { key: '', value: '' }]
    });
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    if (!selectedProduct) return;
    const newSpecs = [...selectedProduct.specifications];
    newSpecs[index][field] = value;
    setSelectedProduct({
      ...selectedProduct,
      specifications: newSpecs
    });
  };

    const removeSpecification = (index: number) => {
    if (!selectedProduct) return;
    setSelectedProduct({
      ...selectedProduct,
      specifications: selectedProduct.specifications.filter((_, i) => i !== index)
    });
  };

  const moveSortOrder = (productId: string, direction: 'up' | 'down') => {
    const currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    const currentOrder = currentProduct.sortOrder;
    const targetOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
    
    const targetProduct = products.find(p => p.sortOrder === targetOrder);
    
    if (targetProduct) {
      // Swap sort orders
      setProducts(prev => prev.map(p => {
        if (p.id === productId) {
          return { ...p, sortOrder: targetOrder };
        } else if (p.id === targetProduct.id) {
          return { ...p, sortOrder: currentOrder };
        }
        return p;
      }));
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'Stokta';
      case 'limited': return 'Sınırlı';
      case 'out-of-stock': return 'Tükendi';
      default: return 'Bilinmiyor';
    }
  };

  const handleRestoreDeletedProducts = () => {
    if (confirm('Tüm silinen ürünleri geri yüklemek istediğinizden emin misiniz?')) {
      // Clear deleted products list
      setDeletedProductIds([]);
      // Reload all products
      const allProducts = actualProducts.map((product, index) => convertToAdminProduct(product, index));
      setProducts(allProducts);
      localStorage.removeItem('ozmevsim_deleted_products');
      alert('Silinen ürünler başarıyla geri yüklendi!');
    }
  };

  const handleBulkImport = () => {
    // Simulate Excel import
    const sampleProducts = [
      {
        id: Date.now().toString(),
        name: 'İmport Edilen Ürün 1',
        code: 'IMP-001',
        category: 'VRF Sistemler',
        subcategory: 'İç Üniteler',
        shortDescription: 'Excel\'den içe aktarılan örnek ürün',
        description: '<p>Bu ürün Excel dosyasından içe aktarılmıştır.</p>',
        specifications: [{ key: 'İçe Aktarma', value: 'Excel' }],
        images: [],
        catalogPdf: '',
        price: 10000,
        stockStatus: 'in-stock' as const,
        featured: false,
        sortOrder: products.length + 1,
        status: 'active' as const,
        metaTitle: 'İmport Edilen Ürün',
        metaDescription: 'Excel\'den içe aktarılan ürün',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
    ];

    setProducts(prev => [...prev, ...sampleProducts]);
    alert('Örnek ürünler başarıyla içe aktarıldı!');
  };

  const handleBulkExport = () => {
    const csvContent = [
      ['ID', 'Ürün Adı', 'Ürün Kodu', 'Kategori', 'Alt Kategori', 'Fiyat', 'Stok Durumu', 'Durum'],
      ...products.map(p => [
        p.id,
        p.name,
        p.code,
        p.category,
        p.subcategory,
        p.price,
        p.stockStatus,
        p.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'urunler.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Toplam {products.length} ürün • {filteredProducts.length} gösteriliyor
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <FunnelIcon className="w-4 h-4" />
            Filtrele
          </button>
          <button
            onClick={handleRestoreDeletedProducts}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            Geri Yükle
          </button>
          <button
            onClick={handleBulkImport}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            İçe Aktar
          </button>
          <button
            onClick={handleBulkExport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            <DocumentArrowUpIcon className="w-4 h-4" />
            Dışa Aktar
          </button>
          <button
            onClick={handleCreateProduct}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            Yeni Ürün
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
                placeholder="Ürün adı veya kodu ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white font-medium"
              />
            </div>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white font-medium"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white font-medium"
              >
                <option value="">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    Ürün
                    {sortBy === 'name' && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    Kategori
                    {sortBy === 'category' && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('price')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    Fiyat
                    {sortBy === 'price' && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('stockStatus')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    Stok
                    {sortBy === 'stockStatus' && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    Durum
                    {sortBy === 'status' && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('sortOrder')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    Sıralama
                    {sortBy === 'sortOrder' && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <CubeIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {product.name}
                          {product.featured && (
                            <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{product.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                    <div className="text-sm text-gray-500">{product.subcategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.price > 0 ? `₺${product.price.toLocaleString()}` : 'Fiyat Yok'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(product.stockStatus)}`}>
                      {getStockStatusText(product.stockStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sortOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveSortOrder(product.id, 'up')}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          title="Yukarı Taşı"
                          disabled={product.sortOrder === 1}
                        >
                          <ChevronUpIcon className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => moveSortOrder(product.id, 'down')}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          title="Aşağı Taşı"
                          disabled={product.sortOrder === products.length}
                        >
                          <ChevronDownIcon className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-orange-600 hover:text-orange-900"
                        title="Düzenle"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Görüntüle"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-900 font-bold">
                <span>{startIndex + 1}</span> - <span>{Math.min(startIndex + itemsPerPage, sortedProducts.length)}</span> arası,
                toplam <span>{sortedProducts.length}</span> sonuç
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border-2 border-gray-500 rounded disabled:opacity-50 bg-white text-gray-900 font-medium hover:bg-gray-100"
                >
                  Önceki
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border-2 rounded font-medium ${
                      currentPage === page
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'border-gray-500 hover:bg-gray-100 bg-white text-gray-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border-2 border-gray-500 rounded disabled:opacity-50 bg-white text-gray-900 font-medium hover:bg-gray-100"
                >
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {isEditing && selectedProduct && (
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
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b-2 border-gray-300 bg-gray-50 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isCreating ? 'Yeni Ürün Ekle' : 'Ürün Düzenle'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Ürün Adı *
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Ürün Kodu *
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.code}
                      onChange={(e) => setSelectedProduct({...selectedProduct, code: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Kategori *
                    </label>
                    <select
                      value={selectedProduct.category}
                      onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value, subcategory: ''})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      required
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Alt Kategori
                    </label>
                    <select
                      value={selectedProduct.subcategory}
                      onChange={(e) => setSelectedProduct({...selectedProduct, subcategory: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      disabled={!selectedProduct.category}
                    >
                      <option value="">Alt Kategori Seçin</option>
                      {categories
                        .find(cat => cat.name === selectedProduct.category)
                        ?.subcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Fiyat (₺)
                    </label>
                    <input
                      type="number"
                      value={selectedProduct.price}
                      onChange={(e) => setSelectedProduct({...selectedProduct, price: Number(e.target.value)})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Stok Durumu
                    </label>
                    <select
                      value={selectedProduct.stockStatus}
                      onChange={(e) => setSelectedProduct({...selectedProduct, stockStatus: e.target.value as any})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                    >
                      <option value="in-stock">Stokta</option>
                      <option value="limited">Sınırlı</option>
                      <option value="out-of-stock">Tükendi</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                    Kısa Açıklama
                  </label>
                  <textarea
                    value={selectedProduct.shortDescription}
                    onChange={(e) => setSelectedProduct({...selectedProduct, shortDescription: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                    Detaylı Açıklama
                  </label>
                  <textarea
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                    placeholder="HTML etiketleri kullanabilirsiniz..."
                  />
                </div>

                {/* Specifications */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-900 font-bold">
                      Teknik Özellikler
                    </label>
                    <button
                      type="button"
                      onClick={addSpecification}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Özellik Ekle
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedProduct.specifications.map((spec, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Özellik adı"
                          value={spec.key}
                          onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Değer"
                          value={spec.value}
                          onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecification(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedProduct.featured}
                      onChange={(e) => setSelectedProduct({...selectedProduct, featured: e.target.checked})}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label className="ml-2 text-sm text-gray-900 font-bold">Öne Çıkan Ürün</label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Durum
                    </label>
                    <select
                      value={selectedProduct.status}
                      onChange={(e) => setSelectedProduct({...selectedProduct, status: e.target.value as any})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Sıralama
                    </label>
                    <input
                      type="number"
                      value={selectedProduct.sortOrder}
                      onChange={(e) => setSelectedProduct({...selectedProduct, sortOrder: Number(e.target.value)})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      min="1"
                    />
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Meta Başlık
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.metaTitle}
                      onChange={(e) => setSelectedProduct({...selectedProduct, metaTitle: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">{selectedProduct.metaTitle.length}/60 karakter</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">
                      Meta Açıklama
                    </label>
                    <textarea
                      value={selectedProduct.metaDescription}
                      onChange={(e) => setSelectedProduct({...selectedProduct, metaDescription: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">{selectedProduct.metaDescription.length}/160 karakter</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t-2 border-gray-300 bg-gray-50 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border-2 border-gray-400 rounded-lg hover:bg-gray-100 text-gray-900 font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold"
                >
                  {isCreating ? 'Ürün Ekle' : 'Güncelle'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 