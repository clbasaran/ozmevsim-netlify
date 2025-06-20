'use client';

import { useState, useEffect } from 'react';
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
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  brand: string;
  features: string[];
  status: string;
}

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('features');

  // Load product data from API
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        // Fetch single product
        const response = await fetch(`/api/products?id=${productId}`);
        if (response.ok) {
          const allProducts = await response.json();
          const foundProduct = allProducts.find((p: Product) => p.id === productId);
          
          if (foundProduct) {
            setProduct(foundProduct);
            
            // Fetch related products from same category
            const relatedResponse = await fetch(`/api/products?category=${foundProduct.category}`);
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              const filtered = relatedData.filter((p: Product) => p.id !== productId).slice(0, 3);
              setRelatedProducts(filtered);
            }
          }
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // WhatsApp redirect function
  const handleWhatsAppRedirect = (productName: string) => {
    const phoneNumber = '+905324467367'; // WhatsApp number
    const message = `Merhaba! ${productName} ürünü için teklif almak istiyorum. Detaylı bilgi verir misiniz?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ürün yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
                  src={product.image_url}
                  alt={product.name}
                  className="object-contain p-8 w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-product.jpg';
                  }}
                />
              </div>
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Öne Çıkan
              </div>
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
                {product.features?.slice(0, 4).map((feature, index) => (
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
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    (312) 357 06 00
                  </a>
                  <span className="text-gray-300">•</span>
                  <a
                    href="mailto:info@ozmevsim.com"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    info@ozmevsim.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden mb-16"
          >
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                        selectedTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {selectedTab === 'features' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ürün Özellikleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
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
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Genel Bilgiler</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li><span className="font-medium">Marka:</span> {product.brand}</li>
                        <li><span className="font-medium">Kategori:</span> {product.category}</li>
                        <li><span className="font-medium">Durum:</span> {product.status}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'warranty' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Garanti & Servis</h3>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">2 Yıl Garanti</h4>
                      <p className="text-gray-600 text-sm">
                        Tüm ürünlerimiz 2 yıl garantili olup, garanti süresince ücretsiz servis hizmeti sunulmaktadır.
                      </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">7/24 Servis Desteği</h4>
                      <p className="text-gray-600 text-sm">
                        Ankara genelinde 7/24 acil servis hizmeti sunmaktayız. Arıza durumunda hemen bizimle iletişime geçin.
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/urunler/${relatedProduct.id}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-50 rounded-t-xl overflow-hidden">
                      <img
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-300 w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600 font-medium">{relatedProduct.brand}</span>
                        <span className="text-xs text-gray-500">{relatedProduct.category}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {relatedProduct.description}
                      </p>
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