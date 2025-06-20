'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  EyeIcon,
  StarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  PlayIcon,
  CameraIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Reference {
  id: number;
  title: string;
  category: string;
  location: string;
  client: string;
  description: string;
  image: string;
  year: string;
  rating: number;
}

const defaultReferences: Reference[] = [
  {
    id: 1,
    title: "Merkez Ofis Isıtma Sistemi",
    category: "Ticari",
    location: "Ankara, Çankaya",
    client: "ABC Teknoloji",
    description: "Modern ofis binası için kombi ve radyatör montajı",
    image: "/uploads/references/office-heating.jpg",
    year: "2023",
    rating: 5
  },
  {
    id: 2,
    title: "Villa Klima Sistemi",
    category: "Konut",
    location: "Ankara, Beypazarı",
    client: "Özel Müşteri",
    description: "Villa için VRF klima sistemi kurulumu",
    image: "/uploads/references/villa-ac.jpg",
    year: "2023",
    rating: 5
  }
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Reference | null>(null);
  const [references] = useState<Reference[]>(defaultReferences);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Referanslarımız
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-project.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                  <p className="text-gray-600 text-sm">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">Bu kategoride proje bulunmuyor.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
} 