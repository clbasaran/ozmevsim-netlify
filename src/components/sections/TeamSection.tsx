'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CalendarIcon,
  AcademicCapIcon,
  StarIcon,
  XMarkIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  email: string;
  phone?: string;
  linkedin: string;
  twitter: string;
  experience?: number;
  education?: string;
  certifications?: string[];
  specializations?: string[];
  location?: string;
  languages?: string[];
  achievements?: string[];
  yearsOfExperience?: number;
}

interface DisplayTeamMember extends TeamMember {
  department: keyof typeof departments;
  title: string;
  avatar: string;
  specialization: string[];
  experience: number;
  education?: string;
  certifications?: string[];
  location?: string;
  languages?: string[];
  achievements?: string[];
  projects: number;
  yearsOfExperience?: number;
}

const departments = {
  management: { name: 'Yönetim', icon: BuildingOfficeIcon, color: 'bg-purple-100 text-purple-700' },
  technical: { name: 'Teknik', icon: WrenchScrewdriverIcon, color: 'bg-blue-100 text-blue-700' },
  sales: { name: 'Satış', icon: ChartBarIcon, color: 'bg-green-100 text-green-700' },
  support: { name: 'Destek', icon: ShieldCheckIcon, color: 'bg-orange-100 text-orange-700' }
};

// Department mapping function
const getDepartmentFromPosition = (position: string): keyof typeof departments => {
  const pos = position.toLowerCase();
  if (pos.includes('müdür') || pos.includes('genel') || pos.includes('yönetici')) return 'management';
  if (pos.includes('teknisyen') || pos.includes('teknik') || pos.includes('mühendis')) return 'technical';
  if (pos.includes('satış') || pos.includes('pazarlama') || pos.includes('danışman')) return 'sales';
  if (pos.includes('müşteri') || pos.includes('destek') || pos.includes('hizmet')) return 'support';
  return 'technical'; // default
};

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<DisplayTeamMember | null>(null);

  // Load team members from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadTeamMembers = () => {
      const savedTeamMembers = localStorage.getItem('team-members');
      if (savedTeamMembers) {
        try {
          const parsedTeamMembers = JSON.parse(savedTeamMembers);
          const validMembers = parsedTeamMembers.filter((member: TeamMember) => 
            member.name && member.name.trim()
          );
          setTeamMembers(validMembers);
        } catch (error) {
          console.error('Error parsing team members:', error);
        }
      }
    };

    // Load initially
    loadTeamMembers();

    // Listen for localStorage changes (cross-tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'team-members') {
        loadTeamMembers();
      }
    };

    // Listen for custom events (same-tab)
    const handleTeamUpdate = () => {
      loadTeamMembers();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('teamMembersUpdated', handleTeamUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('teamMembersUpdated', handleTeamUpdate);
    };
  }, []);

  // Convert team members to display format with departments
  const displayMembers: DisplayTeamMember[] = teamMembers.map(member => ({
    ...member,
    department: getDepartmentFromPosition(member.position),
    title: member.position,
    avatar: member.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    specialization: (member as any).specializations || [member.position || 'Genel'],
    experience: (member as any).yearsOfExperience || 5,
    education: (member as any).education || 'Mesleki Eğitim',
    certifications: (member as any).certifications || ['Sektör Uzmanı'],
    location: (member as any).location || 'İstanbul',
    languages: (member as any).languages || ['Türkçe'],
    achievements: (member as any).achievements || ['Başarılı Projeler', 'Müşteri Memnuniyeti', 'Takım Çalışması'],
    projects: 50,
    yearsOfExperience: (member as any).yearsOfExperience
  }));

  const filteredMembers = selectedDepartment === 'all' 
    ? displayMembers 
    : displayMembers.filter(member => member.department === selectedDepartment);

  const totalExperience = displayMembers.reduce((sum, member) => sum + member.experience, 0);
  const totalProjects = displayMembers.reduce((sum, member) => sum + member.projects, 0);
  const averageExperience = displayMembers.length > 0 ? totalExperience / displayMembers.length : 0;

  // Show fallback if no team members
  if (displayMembers.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Uzman Ekibimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ekip üyesi bilgileri admin panelden güncellenebilir.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-gray-500">Henüz ekip üyesi eklenmemiş.</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
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
            Uzman Ekibimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Alanında uzman, deneyimli ve müşteri odaklı ekibimizle size en kaliteli hizmeti sunuyoruz
          </p>
          
          {/* Team Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{displayMembers.length}</div>
              <p className="text-gray-600">Uzman Çalışan</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{averageExperience.toFixed(0)}+</div>
              <p className="text-gray-600">Yıl Ortalama Deneyim</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{totalProjects}+</div>
              <p className="text-gray-600">Tamamlanan Proje</p>
            </div>
          </div>
        </motion.div>

        {/* Department Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedDepartment('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedDepartment === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
            }`}
          >
            Tüm Ekip
          </button>
          {Object.entries(departments).map(([key, dept]) => (
            <button
              key={key}
              onClick={() => setSelectedDepartment(key)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedDepartment === key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
              }`}
            >
              <dept.icon className="h-4 w-4 mr-2" />
              {dept.name}
            </button>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Profile Header */}
              <div className="relative p-6 pb-4">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${departments[member.department].color}`}>
                        {React.createElement(departments[member.department].icon, { className: "h-3 w-3" })}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-2">
                      {member.title}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {member.experience} yıl deneyim
                    </div>
                  </div>
                </div>

                {/* Department Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${departments[member.department].color}`}>
                    {React.createElement(departments[member.department].icon, { className: "h-4 w-4 mr-1" })}
                    {departments[member.department].name}
                  </span>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Uzmanlık Alanları:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.specialization.slice(0, 2).map((spec, specIndex) => (
                      <span
                        key={specIndex}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {member.specialization.length > 2 && (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{member.specialization.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <AcademicCapIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {member.education}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{member.projects}</div>
                    <div className="text-xs text-gray-600">Proje</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{(member.certifications || []).length}</div>
                    <div className="text-xs text-gray-600">Sertifika</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedMember(member)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                  >
                    Detayları Gör
                  </button>
                  <div className="flex space-x-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <EnvelopeIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <PhoneIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          className="mt-16 bg-primary-600 rounded-2xl p-8 lg:p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <WrenchScrewdriverIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">
            Ekibimizde Yer Al
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
            Sektörün en iyi ekibinde çalışmak ve kariyerini geliştirmek istiyorsan, bize katıl!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium text-lg">
              Açık Pozisyonlar
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 font-medium text-lg">
              CV Gönder
            </button>
          </div>
        </motion.div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <img
                      src={selectedMember.avatar}
                      alt={selectedMember.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h3>
                      <p className="text-primary-600 font-medium">{selectedMember.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Hakkında</h4>
                    <p className="text-gray-700">{selectedMember.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Başarılar</h4>
                    <ul className="space-y-1">
                      {(selectedMember.achievements || []).map((achievement, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <StarIcon className="h-4 w-4 text-yellow-500 mr-2" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sertifikalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedMember.certifications || []).map((cert, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Diller</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedMember.languages || []).map((lang, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
} 