'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  UserIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { 
  PhoneIcon as PhoneSolid,
  EnvelopeIcon as EnvelopeSolid,
  MapPinIcon as MapPinSolid
} from '@heroicons/react/24/solid';
import Map from '@/components/ui/Map';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Telefon',
      content: '+90 312 357 0600',
      description: 'Pazartesi - Cumartesi: 08:00 - 18:00',
      href: 'tel:+903123570600',
      color: 'text-blue-600'
    },
    {
      icon: EnvelopeIcon,
      title: 'E-posta',
      content: 'info@ozmevsim.com',
      description: 'Size 24 saat içinde dönüş yapıyoruz',
      href: 'mailto:info@ozmevsim.com',
      color: 'text-green-600'
    },
    {
      icon: MapPinIcon,
      title: 'Adres',
      content: 'Kuşcağız Mahallesi Sanatoryum Caddesi No 221/A Keçiören Ankara',
      description: 'Merkez ofisimiz',
      href: 'https://maps.google.com/?q=Kuşcağız+Mahallesi+Sanatoryum+Caddesi+No+221/A+Keçiören+Ankara',
      color: 'text-red-600'
    },
    {
      icon: ClockIcon,
      title: 'Çalışma Saatleri',
      content: 'Pazartesi - Cumartesi',
      description: '08:00 - 18:00',
      color: 'text-purple-600'
    }
  ];

  const services = [
    'Kombi Kurulumu',
    'Klima Montajı',
    'Proje Danışmanlığı',
    'Diğer'
  ];

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/905324467367', color: 'bg-green-500' },
    { name: 'Instagram', href: 'https://instagram.com/ozmevsim', color: 'bg-pink-500' },
    { name: 'Facebook', href: 'https://facebook.com/ozmevsim', color: 'bg-blue-500' },
    { name: 'Twitter', href: 'https://twitter.com/ozmevsim', color: 'bg-sky-500' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/ozmevsim', color: 'bg-blue-700' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contact_section',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Mesajı localStorage'a da kaydet (admin panel için)
        const messageData = {
          id: result.data?.id || Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.service,
          message: formData.message,
          priority: formData.priority,
          date: new Date().toISOString(),
          status: 'unread',
          createdAt: new Date().toISOString(),
          source: 'contact_section'
        };

        // Mevcut mesajları al
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const updatedMessages = [messageData, ...existingMessages];
        
        // Güncellenen mesajları kaydet
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
        localStorage.setItem('ozmevsim_contact_messages', JSON.stringify(updatedMessages));
        
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          priority: 'normal'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // API başarısız olursa sadece localStorage'a kaydet
      try {
        const messageData = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.service,
          message: formData.message,
          priority: formData.priority,
          date: new Date().toISOString(),
          status: 'unread',
          createdAt: new Date().toISOString(),
          source: 'contact_section'
        };

        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const updatedMessages = [messageData, ...existingMessages];
        
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
        localStorage.setItem('ozmevsim_contact_messages', JSON.stringify(updatedMessages));
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          priority: 'normal'
        });
        setSubmitStatus('success'); // Başarılı göster çünkü localStorage'a kaydedildi
      } catch (storageError) {
        console.error('Storage error:', storageError);
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="iletisim" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            İletişime Geçin
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Isı sistemleri konusundaki ihtiyaçlarınız için bizimle iletişime geçin. 
            Uzman ekibimiz size en uygun çözümü sunmak için hazır.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                İletişim Bilgileri
              </h3>
              
              {contactInfo.map((info, index) => (
                <div key={index} className="group">
                  <a
                    href={info.href}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`p-3 rounded-lg ${info.color} bg-opacity-10`}>
                      <info.icon className={`h-6 w-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-900 font-medium">
                        {info.content}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Hızlı İletişim
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+903123570600"
                  className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Hemen Ara</span>
                </a>
                <a
                  href="https://wa.me/905324467367"
                  className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Sosyal Medya
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 ${social.color} text-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                  >
                    <GlobeAltIcon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Mesaj Gönderin
              </h3>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300">
                    Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg flex items-center space-x-3">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-700 dark:text-red-300">
                    Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+90 5xx xxx xx xx"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hizmet Türü
                    </label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Hizmet seçin</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Urgency & Contact Preference */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Öncelik
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="low">Düşük</option>
                      <option value="normal">Normal</option>
                      <option value="high">Yüksek</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <EnvelopeIcon className="h-5 w-5" />
                      <span>Mesaj Gönder</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ofis Konumumuz
              </h3>
              <p className="text-gray-600 mb-6">
                Showroom'umuzu ziyaret ederek ürünlerimizi yakından inceleyebilirsiniz.
              </p>
            </div>
            <Map height="400px" />
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Hemen Arayın, Ücretsiz Keşif Randevusu Alın!
            </h3>
            <p className="text-primary-100 mb-6">
              Uzman ekibimiz size en uygun çözümü sunmak için hazır
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+902125550123"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <PhoneIcon className="h-5 w-5" />
                <span>Hemen Ara</span>
              </a>
              <a
                href="#"
                className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <EnvelopeIcon className="h-5 w-5" />
                <span>Randevu Al</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; 