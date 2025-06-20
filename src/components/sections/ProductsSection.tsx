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
import { getFeaturedProducts, categories } from '@/data/products';
import { getProducts, Product } from '@/lib/data';

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [filteredFeaturedProducts, setFilteredFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Load products from D1 or localStorage
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getProducts();
        const deletedIds = getDeletedProductIds();
        
        // Filter out deleted products and show only featured ones
        const filteredProducts = products
          .filter(product => !deletedIds.includes(product.id.toString()))
          .slice(0, 6); // Show max 6 products on homepage
        
        setFilteredFeaturedProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to static data
        setFilteredFeaturedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
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
    ? filteredFeaturedProducts 
    : filteredFeaturedProducts.filter(product => product.category === selectedCategory);

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
                  src={product.image}
                  alt={product.name}
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-300 w-full h-full"
                  loading="lazy"
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
                  <span className="text-sm text-gray-500">{product.category}</span>
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
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
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
                  <Link
                    href={`/urunler/${product.id}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                  >
                    Detayları Gör
                  </Link>
                  <button
                    onClick={() => {
                      const phoneNumber = '+905324467367';
                      const message = `Merhaba! ${product.name} ürünü için teklif almak istiyorum. Detaylı bilgi verir misiniz?`;
                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Teklif Al
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
          >
            Tüm Ürünleri Gör
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection; 