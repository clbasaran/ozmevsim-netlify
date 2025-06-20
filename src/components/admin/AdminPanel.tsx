'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastOrder: Date;
}

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
}

interface SystemMetric {
  label: string;
  value: string | number;
  change: number;
  icon: any;
  color: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  React.useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@email.com',
        phone: '+90 532 123 4567',
        address: 'Beşiktaş, İstanbul',
        totalOrders: 5,
        totalSpent: 45000,
        status: 'active',
        lastOrder: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Fatma Kaya',
        email: 'fatma@email.com',
        phone: '+90 535 987 6543',
        address: 'Kadıköy, İstanbul',
        totalOrders: 3,
        totalSpent: 28000,
        status: 'active',
        lastOrder: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'Mehmet Demir',
        email: 'mehmet@email.com',
        phone: '+90 538 456 7890',
        address: 'Şişli, İstanbul',
        totalOrders: 1,
        totalSpent: 12000,
        status: 'inactive',
        lastOrder: new Date('2023-12-05')
      }
    ];

    const mockOrders: Order[] = [
      {
        id: 'ORD-001',
        customerId: '1',
        customerName: 'Ahmet Yılmaz',
        products: ['Vaillant Kombi', 'Radyatör Seti'],
        total: 15000,
        status: 'in-progress',
        orderDate: new Date('2024-01-15'),
        deliveryDate: new Date('2024-01-25')
      },
      {
        id: 'ORD-002',
        customerId: '2',
        customerName: 'Fatma Kaya',
        products: ['Daikin Klima'],
        total: 8500,
        status: 'pending',
        orderDate: new Date('2024-01-14')
      },
      {
        id: 'ORD-003',
        customerId: '1',
        customerName: 'Ahmet Yılmaz',
        products: ['Kombi Kurulumu'],
        total: 500,
        status: 'completed',
        orderDate: new Date('2024-01-10'),
        deliveryDate: new Date('2024-01-12')
      }
    ];

    setCustomers(mockCustomers);
    setOrders(mockOrders);
  }, []);

  const metrics: SystemMetric[] = [
    {
      label: 'Toplam Müşteri',
      value: customers.length,
      change: 12,
      icon: UsersIcon,
      color: 'text-blue-600'
    },
    {
      label: 'Aktif Siparişler',
      value: orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length,
      change: 8,
      icon: ShoppingBagIcon,
      color: 'text-green-600'
    },
    {
      label: 'Aylık Ciro',
      value: '₺' + orders.reduce((acc, order) => acc + order.total, 0).toLocaleString(),
      change: 15,
      icon: CurrencyDollarIcon,
      color: 'text-purple-600'
    },
    {
      label: 'Tamamlanan',
      value: orders.filter(o => o.status === 'completed').length,
      change: 5,
      icon: CheckCircleIcon,
      color: 'text-green-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'customers', label: 'Müşteriler', icon: UsersIcon },
    { id: 'orders', label: 'Siparişler', icon: ShoppingBagIcon },
    { id: 'analytics', label: 'Analitik', icon: ChartBarIcon },
    { id: 'appointments', label: 'Randevular', icon: CalendarDaysIcon },
    { id: 'notifications', label: 'Bildirimler', icon: BellIcon },
    { id: 'reports', label: 'Raporlar', icon: DocumentTextIcon },
    { id: 'settings', label: 'Ayarlar', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Öz Mevsim Yönetim</p>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-300 ${
                  activeTab === item.id
                    ? 'bg-primary-600 text-white border-r-4 border-primary-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Sistem durumu ve özet bilgiler</p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {metrics.map((metric, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                          <p className="text-green-600 text-sm flex items-center mt-1">
                            <span>+{metric.change}%</span>
                            <span className="ml-1">bu ay</span>
                          </p>
                        </div>
                        <metric.icon className={`h-10 w-10 ${metric.color}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Son Siparişler</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerName}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900 dark:text-white">₺{order.total.toLocaleString()}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Müşteriler</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {customers.slice(0, 5).map((customer) => (
                          <div key={customer.id} className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 dark:text-primary-400 font-medium">
                                {customer.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{customer.email}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                              {customer.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Customers */}
            {activeTab === 'customers' && (
              <motion.div
                key="customers"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Müşteriler</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Müşteri yönetimi ve bilgileri</p>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                    <PlusIcon className="h-5 w-5" />
                    <span>Yeni Müşteri</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Müşteri ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">Tüm Durumlar</option>
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                </div>

                {/* Customers Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Müşteri
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            İletişim
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Siparişler
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Toplam Harcama
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Durum
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredCustomers.map((customer) => (
                          <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                                    {customer.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {customer.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {customer.address}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">{customer.email}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {customer.totalOrders}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              ₺{customer.totalSpent.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                                {customer.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Siparişler</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Sipariş yönetimi ve takibi</p>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                    <PlusIcon className="h-5 w-5" />
                    <span>Yeni Sipariş</span>
                  </button>
                </div>

                {/* Orders Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Sipariş No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Müşteri
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Ürünler
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Toplam
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Durum
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Tarih
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {order.customerName}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {order.products.join(', ')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              ₺{order.total.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {order.orderDate.toLocaleDateString('tr-TR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sistem Ayarları</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Uygulama yapılandırması ve tercihler</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Genel Ayarlar</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Site Başlığı
                        </label>
                        <input
                          type="text"
                          defaultValue="Öz Mevsim Isı Sistemleri"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          İletişim Email
                        </label>
                        <input
                          type="email"
                          defaultValue="info@ozmevsim.com"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          defaultValue="+90 212 555 0123"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bildirim Ayarları</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">Email Bildirimleri</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">SMS Bildirimleri</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">Push Bildirimleri</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 