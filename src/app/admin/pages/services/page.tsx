'use client';

import React, { useState, useEffect } from 'react';
import { getAllServices, addService, updateService, deleteService } from '@/lib/data';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  isActive: boolean;
}

const iconOptions = [
  { value: 'fire', label: '🔥 Ateş', icon: '🔥' },
  { value: 'snowflake', label: '❄️ Kar Tanesi', icon: '❄️' },
  { value: 'flame', label: '🔥 Alev', icon: '🔥' },
  { value: 'wrench', label: '🔧 Anahtar', icon: '🔧' },
  { value: 'cog', label: '⚙️ Dişli', icon: '⚙️' },
  { value: 'bolt', label: '⚡ Şimşek', icon: '⚡' },
  { value: 'home', label: '🏠 Ev', icon: '🏠' },
  { value: 'shield', label: '🛡️ Kalkan', icon: '🛡️' }
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'fire',
    features: '',
    isActive: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery]);

  const fetchServices = () => {
    const allServices = getAllServices();
    setServices(allServices);
    setLoading(false);
  };

  const filterServices = () => {
    let filtered = [...services];

    if (searchQuery) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    try {
      if (editingService) {
        updateService(editingService.id, serviceData);
        alert('Hizmet güncellendi!');
      } else {
        addService(serviceData);
        alert('Hizmet oluşturuldu!');
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Hata oluştu!');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join(', '),
      isActive: service.isActive
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;

    try {
      deleteService(id);
      fetchServices();
      alert('Hizmet silindi!');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Hata oluştu!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'fire',
      features: '',
      isActive: true
    });
    setEditingService(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmet Yönetimi</h1>
          <p className="text-gray-600 mt-1">Sunduğunuz hizmetleri yönetin</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Yeni Hizmet</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Hizmet ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="text-sm text-gray-600 flex items-center">
            <WrenchScrewdriverIcon className="h-4 w-4 mr-1" />
            Toplam: {filteredServices.length} hizmet
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet Adı</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İkon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Özellikler (virgülle ayırın)</label>
                  <textarea
                    rows={3}
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Ücretsiz Keşif, Garanti Kapsamında, 24/7 Destek"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    Aktif (sitede görünür)
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    {editingService ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="bg-white rounded-xl shadow-sm">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Hizmet bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">Başlamak için yeni bir hizmet oluşturun.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Yeni Hizmet</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredServices.map((service) => (
              <div key={service.id} className={`border rounded-lg p-6 ${!service.isActive ? 'bg-gray-50 border-gray-200' : 'border-gray-300'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">
                        {iconOptions.find(opt => opt.value === service.icon)?.icon || '🔧'}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900">{service.title}</h3>
                  </div>
                  
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.isActive ? (
                      <>
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Aktif
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-3 w-3 mr-1" />
                        Pasif
                      </>
                    )}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
