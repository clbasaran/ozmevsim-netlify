'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  description: string;
  main_image: string;
  category_name: string;
  brand: string;
  features: string[];
  is_active: boolean;
  price?: string;
  short_description?: string;
}

interface ApiProduct {
  id: string;
  name: string;
  description: string;
  main_image: string;
  category_name: string;
  brand: string;
  features: string[];
  is_active: boolean;
  price?: string;
  short_description?: string;
}

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['Tümü']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      console.log('🔍 ProductsSection: Starting to load products...');
      console.log('🌐 ProductsSection: Window location:', typeof window !== 'undefined' ? window.location.href : 'Server');
      console.log('🌐 ProductsSection: Environment:', process.env.NODE_ENV);
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('🔌 ProductsSection: About to call API...');
        
        // More explicit URL construction with trailing slash (required by next.config.js trailingSlash: true)
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const apiUrl = `${baseUrl}/api/products/`;
        console.log('🔌 ProductsSection: API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store' // Prevent caching issues
        });
        
        console.log('📡 ProductsSection: Response received:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          type: response.type,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        if (response.ok) {
          const responseData = await response.json();
          console.log('📊 ProductsSection: Received response:', responseData);
          
          // Handle API response format: {success: true, data: [...]}
          const data: ApiProduct[] = responseData.success ? responseData.data : responseData;
          console.log('📊 ProductsSection: Extracted data:', data);
          console.log('📊 ProductsSection: Data length:', data?.length);
          
          if (Array.isArray(data)) {
            setProducts(data);
            
            // Extract unique categories from products
            const allCategories = data.map((p) => p.category_name).filter((cat) => Boolean(cat) && typeof cat === 'string');
            console.log('🏷️ ProductsSection: All categories:', allCategories);
            const uniqueCategories: string[] = ['Tümü', ...Array.from(new Set(allCategories))];
            console.log('🏷️ ProductsSection: Unique categories:', uniqueCategories);
            setCategories(uniqueCategories);
          } else {
            console.error('❌ ProductsSection: Data is not an array:', data);
            setError('Invalid data format received from API');
          }
        } else {
          console.error('❌ ProductsSection: Failed to fetch products, status:', response.status);
          const errorText = await response.text();
          console.error('❌ ProductsSection: Error response:', errorText);
          setError(`API Error: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error('❌ ProductsSection: Error loading products:', error);
        if (error instanceof Error) {
          console.error('❌ ProductsSection: Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
          });
          setError(`Network Error: ${error.message}`);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        console.log('✅ ProductsSection: Loading finished');
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure component is fully mounted
    const timeoutId = setTimeout(loadProducts, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // WhatsApp redirect function
  const handleWhatsAppRedirect = (productName: string) => {
    const phoneNumber = '+905324467367'; // WhatsApp number
    const message = `Merhaba! ${productName} ürünü için teklif almak istiyorum. Detaylı bilgi verir misiniz?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = selectedCategory === 'Tümü' 
    ? products.slice(0, 6) // Show max 6 products on homepage
    : products.filter(product => product.category_name === selectedCategory).slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ürünler yükleniyor...</p>
          <p className="mt-2 text-sm text-gray-400">
            API çağrısı gerçekleştiriliyor...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Ürünler Yüklenemedi
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Premium Ürünlerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dünya standartlarında kaliteli ısıtma ve soğutma sistemleri ile konforunuzu artırın.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 bg-white rounded-lg p-2 shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Bu kategoride ürün bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-50 overflow-hidden">
                  <img
                    src={product.main_image}
                    alt={product.name}
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300 w-full h-full"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-product.jpg';
                    }}
                  />
                  {index < 3 && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Öne Çıkan
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                      <TagIcon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Brand & Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600">{product.brand}</span>
                    <span className="text-sm text-gray-500">{product.category_name}</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features?.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features?.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{product.features.length - 2} özellik
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Stokta
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleWhatsAppRedirect(product.name)}
                      className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingCartIcon className="h-4 w-4" />
                      Teklif Al
                    </button>
                    <Link
                      href={`/urunler/${product.id}`}
                      className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm flex items-center justify-center"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Tüm Ürünleri İncele
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection; 