'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, Tag, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  brand: string;
  price: string;
  currency: string;
  main_image: string;
  specifications: any;
  features: string[];
  is_featured: boolean;
  category_name: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedBrand, setSelectedBrand] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken hata oluştu');
        }
        
        const data = await response.json();
        if (data.success) {
          setProducts(data.data || []);
        } else {
          throw new Error(data.message || 'Ürünler yüklenemedi');
        }
      } catch (err) {
        console.error('Products fetch error:', err);
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories and brands from products
  const { uniqueCategories, uniqueBrands } = useMemo(() => {
    const categorySet = new Set<string>();
    const brandSet = new Set<string>();
    
    products.forEach(product => {
      if (product.category_name) categorySet.add(product.category_name);
      if (product.brand) brandSet.add(product.brand);
    });
    
    return {
      uniqueCategories: ['Tümü', ...Array.from(categorySet).sort()],
      uniqueBrands: ['Tümü', ...Array.from(brandSet).sort()]
    };
  }, [products]);

  // WhatsApp redirect function
  const handleWhatsAppRedirect = (productName: string) => {
    const phoneNumber = '+905324467367';
    const message = `Merhaba! ${productName} ürünü için teklif almak istiyorum. Detaylı bilgi verir misiniz?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category_name && product.category_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(product => product.category_name === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'Tümü') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    return filtered;
  }, [selectedCategory, selectedBrand, searchQuery, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="page-content">
          <div className="pt-40 pb-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-400 mx-auto mb-4" />
                  <p className="text-white">Ürünler yükleniyor...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="page-content">
          <div className="pt-40 pb-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-20">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header />

      {/* Content with proper top margin to account for fixed header */}
      <div className="page-content">
        {/* Header Section with Back Button */}
        <div className="pt-40 pb-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Ana Sayfaya Dön</span>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Ürünlerimiz</h1>
            <p className="text-lg text-gray-200 max-w-2xl">
              Dünya standartlarında kaliteli ısıtma ve soğutma sistemleri ile konforunuzu artırın.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-800 rounded-t-3xl mt-8">
          {/* Search and Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-primary-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-primary-700 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filtreler
              </button>
            </div>

            {/* Filters */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 transition-colors"
                >
                  {uniqueCategories.map(category => (
                    <option key={category} value={category} className="text-gray-900">{category}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marka</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 transition-colors"
                >
                  {uniqueBrands.map(brand => (
                    <option key={brand} value={brand} className="text-gray-900">{brand}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> ürün bulundu
                {selectedCategory !== 'Tümü' && <span className="text-primary-600"> • {selectedCategory}</span>}
                {selectedBrand !== 'Tümü' && <span className="text-primary-600"> • {selectedBrand}</span>}
              </p>
            </div>
            
            {/* Clear Filters */}
            {(selectedCategory !== 'Tümü' || selectedBrand !== 'Tümü' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('Tümü');
                  setSelectedBrand('Tümü');
                  setSearchQuery('');
                }}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
              >
                Filtreleri Temizle
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.main_image || '/images/products/default-product.jpg'}
                      alt={product.name}
                      className="object-contain p-4 w-full h-full"
                      loading="lazy"
                    />
                    {product.is_featured && (
                      <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Öne Çıkan
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2 shrink-0">
                        {product.brand}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.short_description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-primary-600 font-bold text-lg">
                        ₺{Number(product.price).toLocaleString('tr-TR')}
                      </div>
                      <span className="text-xs text-gray-500">{product.category_name}</span>
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 2 && (
                          <span className="text-xs text-gray-500">+{product.features.length - 2}</span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/urunler/${product.id}`}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                      >
                        Detaylar
                      </Link>
                      <button
                        onClick={() => handleWhatsAppRedirect(product.name)}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Teklif Al</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 