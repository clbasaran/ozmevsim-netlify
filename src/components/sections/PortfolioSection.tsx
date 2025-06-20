'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BuildingOfficeIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
  HeartIcon,
  EyeIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  CameraIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { getFeaturedReferences, type Reference } from '@/lib/data';
import Image from 'next/image';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Reference | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [references, setReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Load references
  useEffect(() => {
    const loadReferences = () => {
      try {
        const apiReferences = getFeaturedReferences();
        setReferences(apiReferences);
      } catch (error) {
        console.error('Error loading references:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReferences();
  }, []);

  // Listen for reference updates from admin panel
  useEffect(() => {
    const handleReferencesUpdate = () => {
      try {
        const apiReferences = getFeaturedReferences();
        setReferences(apiReferences);
      } catch (error) {
        console.error('Error loading updated references:', error);
      }
    };

    window.addEventListener('referencesUpdated', handleReferencesUpdate);
    return () => {
      window.removeEventListener('referencesUpdated', handleReferencesUpdate);
    };
  }, []);

  const filters = [
    { key: 'all', label: 'Tüm Projeler', icon: BuildingOfficeIcon },
    { key: 'Konut', label: 'Konut', icon: HomeIcon },
    { key: 'Ticari', label: 'Ticari', icon: BuildingStorefrontIcon },
    { key: 'Endüstriyel', label: 'Endüstriyel', icon: BuildingOfficeIcon },
    { key: 'Kamu', label: 'Kamu', icon: AcademicCapIcon },
  ];

  const filteredProjects = references.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % 1); // Only one image per project for now
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + 1) % 1); // Only one image per project for now
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Referanslar yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Referanslarımız
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tamamladığımız projeler ve memnun müşterilerimizin deneyimleri
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {filter.label}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                      <EyeIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <MapPinIcon className="h-4 w-4" />
                      {project.location}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">
                      {project.client}
                    </span>
                    <div className="flex items-center gap-1">
                      {renderStars(project.rating)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {new Date(project.completedDate).toLocaleDateString('tr-TR')}
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Detayları Gör
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BuildingOfficeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Henüz proje bulunmuyor
            </h3>
            <p className="text-gray-600">
              Bu kategoride henüz tamamlanmış proje bulunmamaktadır.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedProject.client} • {selectedProject.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div>
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Proje Detayları
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Kategori</span>
                        <p className="font-medium text-gray-900">
                          {selectedProject.category}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Tamamlanma</span>
                        <p className="font-medium text-gray-900">
                          {new Date(selectedProject.completedDate).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Müşteri</span>
                        <p className="font-medium text-gray-900">
                          {selectedProject.client}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Değerlendirme</span>
                        <div className="flex items-center gap-1">
                          {renderStars(selectedProject.rating)}
                          <span className="text-sm text-gray-600 ml-1">
                            ({selectedProject.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                        Benzer Proje Talebi
                      </button>
                      <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <ShareIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection; 