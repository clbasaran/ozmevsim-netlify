'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckIcon, 
  UserGroupIcon, 
  ClockIcon, 
  BuildingOfficeIcon,
  StarIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

interface CompanyInfo {
  id: string;
  company_name: string;
  about_text: string;
  mission: string;
  vision: string;
  values: string[];
  founding_year: number;
  team_size: number;
  experience_years: number;
  hero_title: string;
  hero_subtitle: string;
}

const defaultCompanyInfo: CompanyInfo = {
  id: '1',
  company_name: 'Öz Mevsim Isı Sistemleri',
  about_text: 'Öz Mevsim Isı Sistemleri olarak 30 yıllık deneyimimizle, İstanbul genelinde kaliteli ısıtma ve soğutma çözümleri sunuyoruz. Müşteri memnuniyeti odaklı çalışma anlayışımızla, en son teknoloji ürünleri profesyonel ekibimizle montaj ediyor, satış sonrası destek sağlıyoruz.',
  mission: 'Müşterilerimize en kaliteli ısıtma ve soğutma sistemlerini, en uygun fiyatlarla sunarak yaşam konforlarını artırmak.',
  vision: 'Türkiye nin en güvenilir ısıtma ve soğutma sistemleri firması olmak.',
  values: ['Kalite', 'Güvenilirlik', 'Müşteri Memnuniyeti', 'Yenilik', 'Çevre Bilinci'],
  founding_year: 1994,
  team_size: 15,
  experience_years: 30,
  hero_title: 'Güvenilir Isıtma Çözümleri',
  hero_subtitle: '30 yıllık deneyimimizle evinizin konforu için buradayız'
};

export default function HakkimizdaPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(defaultCompanyInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch('/api/company/');
        if (response.ok) {
          const responseData = await response.json();
          console.log('Company API response:', responseData);
          
          // Handle API response format: {success: true, data: {...}}
          const data = responseData.success ? responseData.data : responseData;
          
          if (data) {
            setCompanyInfo({
              ...data,
              values: typeof data.values === 'string' ? JSON.parse(data.values) : data.values || defaultCompanyInfo.values
            });
          }
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
        // Keep default data
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  const stats = [
    {
      icon: ClockIcon,
      value: `${companyInfo.experience_years}+`,
      label: 'Yıl Deneyim',
      color: 'text-blue-600'
    },
    {
      icon: UserGroupIcon,
      value: `${companyInfo.team_size}+`,
      label: 'Uzman Çalışan',
      color: 'text-green-600'
    },
    {
      icon: BuildingOfficeIcon,
      value: '1000+',
      label: 'Mutlu Müşteri',
      color: 'text-purple-600'
    },
    {
      icon: StarIcon,
      value: '100%',
      label: 'Müşteri Memnuniyeti',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {companyInfo.hero_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {companyInfo.company_name}
              </h2>
              <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                <p>{companyInfo.about_text}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/team-office.jpg"
                  alt="Öz Mevsim Ofis"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-blue-50 p-8 rounded-2xl"
            >
              <div className="flex items-center mb-6">
                <HeartIcon className="h-10 w-10 text-blue-600 mr-4" />
                <h3 className="text-3xl font-bold text-gray-900">Misyonumuz</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {companyInfo.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-50 p-8 rounded-2xl"
            >
              <div className="flex items-center mb-6">
                <StarIcon className="h-10 w-10 text-green-600 mr-4" />
                <h3 className="text-3xl font-bold text-gray-900">Vizyonumuz</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {companyInfo.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşimizi yaparken bizi yönlendiren temel değerler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyInfo.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <CheckIcon className="h-8 w-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">{value}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Bizimle Çalışmaya Hazır Mısınız?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle tanışın ve projeleriniz için en uygun çözümü birlikte keşfedelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                İletişime Geçin
              </a>
              <a
                href="/hizmetler"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Hizmetlerimizi İnceleyin
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 