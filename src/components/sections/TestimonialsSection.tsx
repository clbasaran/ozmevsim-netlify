'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  CalendarIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid';
import { 
  ChatBubbleLeftIcon as QuoteIcon
} from '@heroicons/react/24/outline';
import { 
  UserIcon,
  BuildingOfficeIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
  avatar: string;
  projectType: 'residential' | 'commercial' | 'industrial';
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    title: 'Villa Sahibi',
    company: 'Özel',
    location: 'Sarıyer, İstanbul',
    rating: 5,
    comment: 'Öz Mevsim ekibinin profesyonelliği gerçekten takdire şayan. 300 m² villa projemizde tüm ısıtma sistemi kurulumunu gerçekleştirdiler. Vaillant kombi sistemimiz mükemmel çalışıyor, enerji tasarrufu %40 arttı. Kesinlikle tavsiye ederim.',
    project: 'Villa Kombi Sistemi Kurulumu',
    date: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    projectType: 'residential',
    verified: true
  },
  {
    id: 2,
    name: 'Fatma Özdemir',
    title: 'İnsan Kaynakları Müdürü',
    company: 'TechCorp AŞ',
    location: 'Şişli, İstanbul',
    rating: 5,
    comment: '3 katlı ofis binamızın tüm klima sistemlerini yeniledik. Öz Mevsim\'in danışmanlık hizmeti ve teknik ekibi harika. Proje zamanında teslim edildi, çalışanlarımız çok memnun. VRF sistemi harika çalışıyor.',
    project: 'Ofis VRF Klima Sistemi',
    date: '2024-02-08',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    projectType: 'commercial',
    verified: true
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    title: 'Fabrika Müdürü',
    company: 'Kaya Tekstil',
    location: 'Çerkezköy, Tekirdağ',
    rating: 5,
    comment: '5000 m² fabrika alanımızın ısıtma sistemini tamamen yeniledik. Bosch endüstriyel kombi sistemleri ile enerji maliyetlerimizi %50 düşürdük. Öz Mevsim ekibinin uzmanlığı ve 7/24 teknik desteği mükemmel.',
    project: 'Endüstriyel Isıtma Sistemi',
    date: '2023-12-20',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    projectType: 'industrial',
    verified: true
  },
  {
    id: 4,
    name: 'Ayşe Demir',
    title: 'Ev Hanımı',
    company: 'Özel',
    location: 'Beşiktaş, İstanbul',
    rating: 5,
    comment: 'Dairemizin eski kombi sistemini değiştirdik. Demirdöküm kombi ile artık hem daha sıcak hem de daha ekonomik. Kurulum ekibi çok titiz çalıştı, evimizi tertemiz bıraktılar. Teşekkürler!',
    project: 'Daire Kombi Değişimi',
    date: '2024-01-25',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    projectType: 'residential',
    verified: true
  },
  {
    id: 5,
    name: 'Can Arslan',
    title: 'Otel Müdürü',
    company: 'Grand Hotel İstanbul',
    location: 'Taksim, İstanbul',
    rating: 5,
    comment: '120 odalı otelimizin tüm ısıtma ve klima sistemlerini yeniledik. Öz Mevsim\'in proje yönetimi kusursuzdu. Misafirlerimizden sürekli övgü alıyoruz. Enerji verimliliği de %45 arttı.',
    project: 'Otel HVAC Sistemi',
    date: '2023-11-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    projectType: 'commercial',
    verified: true
  },
  {
    id: 6,
    name: 'Zeynep Şahin',
    title: 'Okul Müdürü',
    company: 'Gelişim İlkokulu',
    location: 'Kadıköy, İstanbul',
    rating: 5,
    comment: 'Okulumuzdaki 24 derslik için klima sistemi kurduk. Öz Mevsim ekibi öğrencilerimizi rahatsız etmeden işi tamamladı. Sistem mükemmel, öğrencilerimiz artık daha rahat eğitim alıyor.',
    project: 'Okul Klima Sistemi',
    date: '2024-03-05',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    projectType: 'commercial',
    verified: true
  }
];

const projectTypeIcons = {
  residential: HomeIcon,
  commercial: BuildingOfficeIcon,
  industrial: BuildingOfficeIcon
};

const projectTypeLabels = {
  residential: 'Konut',
  commercial: 'Ticari',
  industrial: 'Endüstriyel'
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<'all' | 'residential' | 'commercial' | 'industrial'>('all');

  const filteredTestimonials = selectedType === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.projectType === selectedType);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;
  const totalProjects = testimonials.length;

  return (
    <section className="pt-40 pb-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Müşteri Deneyimleri
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Projelerimizi tamamladığımız müşterilerimizin gerçek deneyimleri ve görüşleri
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {renderStars(5)}
                <span className="ml-2 text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600">Ortalama Değerlendirme</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{totalProjects}+</div>
              <p className="text-gray-600">Mutlu Müşteri</p>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {(['all', 'residential', 'commercial', 'industrial'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-medium transition-all duration-300 ${
                selectedType === type
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
              }`}
            >
              {type === 'all' ? 'Tümü' : projectTypeLabels[type]}
            </button>
          ))}
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {filteredTestimonials.length > 0 && (
              <motion.div
                key={`${selectedType}-${currentIndex}`}
                className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background Quote */}
                <div className="absolute top-4 right-4 opacity-10">
                  <QuoteIcon className="h-24 w-24 text-primary-600" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-6">
                      <div className="relative">
                        <img
                          src={filteredTestimonials[currentIndex].avatar}
                          alt={filteredTestimonials[currentIndex].name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-primary-100"
                        />
                        {filteredTestimonials[currentIndex].verified && (
                          <div className="absolute -bottom-1 -right-1">
                            <CheckBadgeIcon className="h-6 w-6 text-primary-600" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {filteredTestimonials[currentIndex].name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {filteredTestimonials[currentIndex].title} - {filteredTestimonials[currentIndex].company}
                      </p>
                      <div className="flex flex-wrap items-center text-sm text-gray-500">
                        <div className="flex items-center mr-4 mb-1">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {filteredTestimonials[currentIndex].location}
                        </div>
                        <div className="flex items-center mr-4 mb-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(filteredTestimonials[currentIndex].date).toLocaleDateString('tr-TR')}
                        </div>
                        <div className="flex items-center mb-1">
                          {React.createElement(projectTypeIcons[filteredTestimonials[currentIndex].projectType], {
                            className: "h-4 w-4 mr-1"
                          })}
                          {projectTypeLabels[filteredTestimonials[currentIndex].projectType]}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex-shrink-0 text-right">
                      <div className="flex items-center mb-2">
                        {renderStars(filteredTestimonials[currentIndex].rating)}
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        {filteredTestimonials[currentIndex].project}
                      </p>
                    </div>
                  </div>

                  {/* Comment */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                    "{filteredTestimonials[currentIndex].comment}"
                  </blockquote>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          {filteredTestimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-x-1"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {filteredTestimonials.length > 1 && (
          <div className="flex justify-center mt-8">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Siz de Memnun Müşterilerimiz Arasına Katılın
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            15 yıllık deneyimimiz ve uzman ekibimizle, size de en kaliteli hizmeti sunmaya hazırız.
          </p>
          <button className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium text-lg shadow-lg hover:shadow-xl">
            Ücretsiz Keşif Talep Et
          </button>
        </motion.div>
      </div>
    </section>
  );
} 