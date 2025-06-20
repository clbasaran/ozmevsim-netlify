'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  FireIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Kombi montajı ne kadar sürer?',
    answer: 'Standart bir kombi montajı genellikle 2-4 saat arasında tamamlanır. Bu süre, montaj yerinin hazırlık durumu, boru çekimi gerekliliği ve kombi tipine göre değişiklik gösterebilir.',
    category: 'Montaj',
    order: 1,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    question: 'Kombi bakımı ne sıklıkla yapılmalı?',
    answer: 'Kombinizin verimli çalışması ve uzun ömürlü olması için yılda en az bir kez profesyonel bakım yaptırmanız önerilir. Yoğun kullanım durumunda 6 ayda bir bakım yapılabilir.',
    category: 'Bakım',
    order: 2,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    question: 'Hangi kombi markası daha iyi?',
    answer: 'Vaillant, Bosch, Demirdöküm, Buderus gibi markalar kalite ve güvenilirlik açısından öne çıkar. Marka seçimi, bütçeniz, evinizin büyüklüğü ve ısıtma ihtiyacınıza göre değişir. Uzman ekibimiz size en uygun seçeneği önerebilir.',
    category: 'Ürün Seçimi',
    order: 3,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const categories: Record<string, { name: string; icon: any; color: string }> = {
  'Genel': { name: 'Genel', icon: QuestionMarkCircleIcon, color: 'bg-blue-100 text-blue-600' },
  'Teknik': { name: 'Teknik', icon: WrenchScrewdriverIcon, color: 'bg-green-100 text-green-600' },
  'Montaj': { name: 'Montaj', icon: FireIcon, color: 'bg-red-100 text-red-600' },
  'Bakım': { name: 'Bakım', icon: WrenchScrewdriverIcon, color: 'bg-green-100 text-green-600' },
  'Ürün Seçimi': { name: 'Ürün Seçimi', icon: QuestionMarkCircleIcon, color: 'bg-blue-100 text-blue-600' },
  'Garanti': { name: 'Garanti', icon: ShieldCheckIcon, color: 'bg-purple-100 text-purple-600' },
  'Hizmet': { name: 'Hizmet', icon: PhoneIcon, color: 'bg-yellow-100 text-yellow-600' }
};

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFAQs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For static deployment, use default data
    setFaqs(defaultFAQs);
    setLoading(false);
  }, []);

  const filteredFAQs = faqs.filter((faq: FAQ) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isOpen = (id: string) => openItems.includes(id);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Isıtma ve soğutma sistemleri hakkında merak ettiğiniz her şey burada
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sorunuzu arayın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tümü
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionMarkCircleIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Aradığınız soruyu bulamadık. Lütfen farklı kelimeler deneyin.
              </p>
            </motion.div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mr-3 ${categories[faq.category].color}`}>
                          {React.createElement(categories[faq.category].icon, { className: "h-3 w-3 mr-1" })}
                          {categories[faq.category].name}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen(faq.id) ? (
                        <ChevronUpIcon className="h-6 w-6 text-primary-600" />
                      ) : (
                        <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {faq.answer}
                          </p>
                          

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ClockIcon className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">
            Sorunuz burada yok mu?
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Uzman ekibimiz size yardımcı olmaktan mutluluk duyar. Hemen iletişime geçin, ücretsiz danışmanlık alın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Hemen Ara
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 font-medium">
              WhatsApp İletişim
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 