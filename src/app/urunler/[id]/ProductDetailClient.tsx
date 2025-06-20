'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  TagIcon, 
  StarIcon,
  ShoppingCartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { getProductById, getProductsByCategory } from '@/data/products';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const product = getProductById(productId);
  const [selectedTab, setSelectedTab] = useState('features');

  // WhatsApp redirect function
  const handleWhatsAppRedirect = (productName: string) => {
    const phoneNumber = '+905324467367'; // WhatsApp number
    const message = `Merhaba! ${productName} ürünü için teklif almak istiyorum. Detaylı bilgi verir misiniz?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Ürünlere Dön
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const tabs = [
    { id: 'features', name: 'Özellikler', icon: CheckCircleIcon },
    { id: 'specs', name: 'Teknik Özellikler', icon: TagIcon },
    { id: 'warranty', name: 'Garanti & Servis', icon: ShieldCheckIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Content with proper top margin for fixed header */}
      <div className="page-content">
        {/* Breadcrumb */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Ana Sayfa
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href="/urunler"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Ürünler
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Product Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-white rounded-2xl shadow-sm overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain p-8 w-full h-full"
                />
              </div>
              {product.featured && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Öne Çıkan
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Brand & Category */}
              <div className="flex items-center gap-2 mb-4">
                <TagIcon className="h-5 w-5 text-gray-400" />
                <span className="text-lg text-gray-600 font-medium">{product.brand}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">{product.category}</span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.5) • 127 değerlendirme</span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-8">
                <div className="text-sm text-green-600 font-medium">
                  ✓ Stokta mevcut • Ücretsiz kargo
                </div>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => handleWhatsAppRedirect(product.name)}
                  className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Teklif Al
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Favorilere Ekle
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Ücretsiz Danışmanlık</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Uzman ekibimizden ürün hakkında detaylı bilgi alın.
                </p>
                <div className="flex gap-3">
                  <a
                    href="tel:+903123570600"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Hemen Ara
                  </a>
                  <Link
                    href="/iletisim"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-blue-200"
                  >
                    Mesaj Gönder
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            {/* Tab Navigation */}
            <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              {selectedTab === 'features' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ürün Özellikleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'specs' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Teknik Özellikler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-600">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'warranty' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Garanti & Servis</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Garanti Kapsamı</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          2 yıl üretici garantisi
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          Ücretsiz kurulum hizmeti
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          24/7 teknik destek
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          Orijinal yedek parça garantisi
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Servis Ağı</h4>
                      <p className="text-gray-700">
                        Ankara genelinde geniş servis ağımız ile hızlı ve güvenilir servis hizmeti sunuyoruz.
                        Acil durumlar için 7/24 çağrı merkezimiz hizmetinizdedir.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Benzer Ürünler</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/urunler/${relatedProduct.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600 font-medium">{relatedProduct.brand}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="text-sm text-green-600 font-medium">
                        ✓ Stokta
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 