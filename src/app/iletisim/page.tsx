'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // API'ye gönder
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Mesajı localStorage'a da kaydet (admin panel için)
        const messageData = {
          id: result.data?.id || Date.now().toString(),
          ...formData,
          date: new Date().toISOString(),
          status: 'unread',
          createdAt: new Date().toISOString()
        };

        // Mevcut mesajları al
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const updatedMessages = [messageData, ...existingMessages];
        
        // Güncellenen mesajları kaydet
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
        
        // ozmevsim_contact_messages olarak da kaydet (admin panel uyumluluğu için)
        localStorage.setItem('ozmevsim_contact_messages', JSON.stringify(updatedMessages));
        
        // Form temizle
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        // Başarı mesajı
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      } else {
        throw new Error('API request failed');
      }
      
    } catch (error) {
      console.error('Message send error:', error);
      
      // API başarısız olursa sadece localStorage'a kaydet
      try {
        const messageData = {
          id: Date.now().toString(),
          ...formData,
          date: new Date().toISOString(),
          status: 'unread',
          createdAt: new Date().toISOString()
        };

        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const updatedMessages = [messageData, ...existingMessages];
        
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
        localStorage.setItem('ozmevsim_contact_messages', JSON.stringify(updatedMessages));
        
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        alert('Mesajınız başarıyla kaydedildi! En kısa sürede size dönüş yapacağız.');
        
      } catch (storageError) {
        console.error('Storage error:', storageError);
        alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header />

      {/* Content with proper top margin for fixed header */}
      <div className="page-content">
        {/* Hero Section */}
        <div className="pt-40 pb-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                İletişim
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-200 mb-8"
              >
                Isı sistemleri konusunda uzman ekibimizle iletişime geçin
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6 text-sm text-gray-200"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <span>25 Yıllık Deneyim</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <span>7/24 Acil Servis</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-orange-400" />
                  <span>Ücretsiz Keşif</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 bg-gray-800 rounded-t-3xl mt-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Bize Ulaşın</h2>
                <p className="text-gray-600">Projeleriniz için ücretsiz keşif ve danışmanlık</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="0555 123 45 67"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Hizmet Türü *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Hizmet türünü seçiniz</option>
                    <option value="kombi-montaj">Kombi Montajı</option>
                    <option value="bakim-onarim">Bakım ve Onarım</option>
                    <option value="klima-montaj">Klima Montajı</option>
                    <option value="dogalgaz-tesisati">Doğalgaz Tesisatı</option>
                    <option value="tesisat-yenileme">Tesisat Yenileme</option>
                    <option value="acil-servis">Acil Servis</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Projeniz hakkında detayları paylaşın..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Send size={20} />
                  Mesaj Gönder
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Company Info */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-xl">
                      <Phone className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                      <p className="text-gray-600">+90 312 357 0600</p>
                      <p className="text-gray-600">+90 532 446 7367</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-xl">
                      <Mail className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                      <p className="text-gray-600">info@ozmevsim.com</p>
                      <p className="text-gray-600">servis@ozmevsim.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-xl">
                      <MapPin className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                      <p className="text-gray-600">
                        Kuşcağız Mahallesi, Sanatoryum Caddesi<br />
                        No: 221/A<br />
                        Keçiören/Ankara
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-xl">
                      <Clock className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                      <p className="text-gray-600">Pazartesi - Cuma: 08:00 - 18:00</p>
                      <p className="text-gray-600">Cumartesi: 09:00 - 16:00</p>
                      <p className="text-gray-600">Pazar: Kapalı</p>
                      <p className="text-sm text-primary-600 mt-2 font-medium">
                        * Acil durumlar için 7/24 hizmet
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Emergency Service */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold mb-2">🚨 Acil Servis</h3>
                <p className="mb-4 opacity-90">
                  Kombi arızası, su kaçağı veya doğalgaz sorunu için 7/24 acil servis hizmeti
                </p>
                <div className="flex items-center gap-3">
                  <Phone className="text-white" size={20} />
                  <span className="font-bold text-xl">0555 ACİL (2245)</span>
                </div>
              </motion.div>

              {/* Service Areas */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hizmet Verdiğimiz Bölgeler</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Çankaya</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Keçiören</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Yenimahalle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Mamak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Sincan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Etimesgut</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Gölbaşı</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Pursaklar</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
                  💡 Diğer bölgeler için lütfen bizimle iletişime geçin. Ankara genelinde hizmet vermekteyiz.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Konum</h2>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-600">
                  <MapPin size={48} className="mx-auto mb-4 text-primary-500" />
                  <p className="text-lg font-medium text-gray-700">Google Maps Entegrasyonu</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Koordinat: 39.993430, 32.858557<br />
                    Çankaya/Ankara
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden Öz Mevsim?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                25 yıllık deneyimimiz ve müşteri odaklı yaklaşımımızla güvenilir çözümler sunuyoruz
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Güvenilir Hizmet</h3>
                <p className="text-gray-600">25 yıllık deneyim ve binlerce memnun müşteri</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hızlı Çözüm</h3>
                <p className="text-gray-600">7/24 acil servis ve hızlı müdahale</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ücretsiz Keşif</h3>
                <p className="text-gray-600">Projeleriniz için ücretsiz keşif ve danışmanlık</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 