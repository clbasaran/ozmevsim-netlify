'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ShieldCheckIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  location: string;
  joinDate: string;
  lastLogin: string;
  permissions: string[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@ozmevsim.com',
      phone: '+90 532 123 4567',
      role: 'admin',
      status: 'active',
      avatar: '/images/avatars/user1.jpg',
      location: 'Ankara, Türkiye',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-20 14:30',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@ozmevsim.com',
      phone: '+90 533 234 5678',
      role: 'editor',
      status: 'active',
      avatar: '/images/avatars/user2.jpg',
      location: 'İstanbul, Türkiye',
      joinDate: '2024-02-10',
      lastLogin: '2024-03-20 10:15',
      permissions: ['content', 'media']
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      phone: '+90 534 345 6789',
      role: 'user',
      status: 'suspended',
      location: 'İzmir, Türkiye',
      joinDate: '2024-03-01',
      lastLogin: '2024-03-15 16:45',
      permissions: ['read']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const itemsPerPage = 10;

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name) * order;
        case 'email':
          return a.email.localeCompare(b.email) * order;
        case 'joinDate':
          return (new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()) * order;
        case 'lastLogin':
          return (new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()) * order;
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteUsers = () => {
    if (confirm(`${selectedUsers.length} kullanıcıyı silmek istediğinizden emin misiniz?`)) {
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      user: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    return badges[role as keyof typeof badges] || badges.user;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      inactive: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      suspended: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return badges[status as keyof typeof badges] || badges.inactive;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kullanıcılar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Sistem kullanıcılarını yönetin
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Yeni Kullanıcı
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="İsim veya e-posta ile ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Tüm Roller</option>
            <option value="admin">Admin</option>
            <option value="editor">Editör</option>
            <option value="user">Kullanıcı</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
            <option value="suspended">Askıda</option>
          </select>
        </div>

        {/* Selected Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-between">
            <span className="text-sm text-orange-800 dark:text-orange-200">
              {selectedUsers.length} kullanıcı seçildi
            </span>
            <button
              onClick={handleDeleteUsers}
              className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              <TrashIcon className="w-4 h-4" />
              Sil
            </button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => {
                      setSortBy('name');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Kullanıcı
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rol
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Durum
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => {
                      setSortBy('joinDate');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Katılım Tarihi
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => {
                      setSortBy('lastLogin');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Son Giriş
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-right">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    İşlemler
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <UserIcon className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                      {user.role === 'admin' && <ShieldCheckIcon className="w-3 h-3 mr-1" />}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                      {user.status === 'active' && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                      {user.status === 'suspended' && <XCircleIcon className="w-3 h-3 mr-1" />}
                      {user.status === 'active' ? 'Aktif' : user.status === 'suspended' ? 'Askıda' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.lastLogin).toLocaleString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setShowEditModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <PencilSquareIcon className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Görüntüle">
                        <EyeIcon className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Sil">
                        <TrashIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Toplam <span className="font-medium">{filteredUsers.length}</span> kullanıcıdan{' '}
              <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
              </span>{' '}
              arası gösteriliyor
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {showAddModal ? 'Yeni Kullanıcı Ekle' : 'Kullanıcı Düzenle'}
              </h2>
            </div>
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    defaultValue={editingUser?.name}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    defaultValue={editingUser?.email}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    defaultValue={editingUser?.phone}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Konum
                  </label>
                  <input
                    type="text"
                    defaultValue={editingUser?.location}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rol
                  </label>
                  <select
                    defaultValue={editingUser?.role || 'user'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editör</option>
                    <option value="user">Kullanıcı</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Durum
                  </label>
                  <select
                    defaultValue={editingUser?.status || 'active'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                    <option value="suspended">Askıda</option>
                  </select>
                </div>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                    />
                    <LockClosedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  İzinler
                </label>
                <div className="space-y-2">
                  {['İçerik Yönetimi', 'Medya Yönetimi', 'Kullanıcı Yönetimi', 'Ayarlar'].map(permission => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-orange-500 focus:ring-orange-500 mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {showAddModal ? 'Kullanıcı Ekle' : 'Değişiklikleri Kaydet'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 