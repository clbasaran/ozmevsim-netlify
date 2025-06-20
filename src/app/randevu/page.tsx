'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function RandevuPage() {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // WhatsApp message content
  const whatsappMessage = encodeURIComponent(
    `Merhaba Öz Mevsim Isı Sistemleri 👋

🗓️ Randevu talep ediyorum:

📋 Hizmet türü: 
📍 Adres: 
📞 Telefon: 
📅 Tercih ettiğim tarih: 
⏰ Tercih ettiğim saat: 

💬 Ek notlar: 

Lütfen en kısa sürede dönüş yapabilir misiniz?

Teşekkürler! 🙏`
  );

  const whatsappURL = `https://wa.me/905324467367?text=${whatsappMessage}`;

  // Auto redirect after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          window.location.href = whatsappURL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [whatsappURL]);

  const handleInstantRedirect = () => {
    setIsRedirecting(true);
    window.location.href = whatsappURL;
  };

  const handleDirectCall = () => {
    window.location.href = 'tel:+905324467367';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 main-content">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 rounded-full">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hızlı Randevu Al
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              WhatsApp üzerinden anında randevu alın. Uzman ekibimiz size en kısa sürede geri dönüş yapacak.
            </p>
          </motion.div>

          {/* Redirect Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          >
            <div className="text-center">
              {!isRedirecting ? (
                <>
                  <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <ChatBubbleLeftRightIcon className="h-10 w-10 text-green-600" />
                    </motion.div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    WhatsApp'a Yönlendiriliyorsunuz
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    Randevu formunuz hazırlandı. {countdown} saniye sonra WhatsApp'a yönlendirileceksiniz.
                  </p>

                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <div className="text-6xl font-bold text-green-600 mb-2">
                      {countdown}
                    </div>
                    <div className="text-sm text-gray-500">saniye kaldı</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleInstantRedirect}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                      <span>Hemen WhatsApp'a Git</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={handleDirectCall}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      <span>Direkt Ara</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-8">
                  <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <CheckCircleIcon className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Yönlendiriliyor...
                  </h2>
                  <p className="text-gray-600">
                    WhatsApp açılıyor. Lütfen bekleyin...
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hızlı Randevu
              </h3>
              <p className="text-gray-600 text-sm">
                WhatsApp üzerinden anında randevu alın. Formunuz önceden hazırlanmıştır.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Anında İletişim
              </h3>
              <p className="text-gray-600 text-sm">
                Uzmanlarımızla WhatsApp üzerinden anında iletişime geçin.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                <ClockIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hızlı Dönüş
              </h3>
              <p className="text-gray-600 text-sm">
                Randevu talebinize en geç 30 dakika içinde dönüş yapıyoruz.
              </p>
            </motion.div>
          </div>

          {/* Contact Alternatives */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Diğer İletişim Seçenekleri
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <PhoneIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Telefon</h4>
                <p className="text-gray-600 mb-4">
                  Direkt arayarak randevu alabilirsiniz
                </p>
                <a 
                  href="tel:+905324467367"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center space-x-2"
                >
                  <PhoneIcon className="h-4 w-4" />
                  <span>+90 532 446 7367</span>
                </a>
              </div>

              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                <p className="text-gray-600 mb-4">
                  Mesajlaşarak detaylı bilgi alabilirsiniz
                </p>
                <button
                  onClick={handleInstantRedirect}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center space-x-2"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Working Hours */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Çalışma Saatleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Pazartesi - Cuma:</strong> 08:00 - 18:00
                </div>
                <div>
                  <strong>Cumartesi:</strong> 09:00 - 16:00
                </div>
                <div>
                  <strong>Acil Durum:</strong> 7/24 Hizmet
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 