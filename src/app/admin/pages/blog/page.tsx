'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'tips' | 'news' | 'technology' | 'maintenance';
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: number;
  views: number;
  tags: string[];
  featuredImage: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

const categories = [
  { value: 'tips', label: 'İpuçları' },
  { value: 'news', label: 'Haberler' },
  { value: 'technology', label: 'Teknoloji' },
  { value: 'maintenance', label: 'Bakım' }
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'tips' as 'tips' | 'news' | 'technology' | 'maintenance',
    author: 'Admin',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    publishDate: new Date().toISOString().split('T')[0],
    readTime: 5,
    tags: '',
    featuredImage: '',
    featured: false,
    status: 'draft' as 'published' | 'draft' | 'archived'
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, filterCategory, filterStatus]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const result = await response.json();
      if (result.success) {
        setPosts(result.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(post => post.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(post => post.status === filterStatus);
    }

    setFilteredPosts(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      const url = editingPost ? '/api/blog' : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';
      const body = editingPost ? { id: editingPost.id, ...postData } : postData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();
      if (result.success) {
        fetchPosts();
        resetForm();
        alert(editingPost ? 'Makale güncellendi!' : 'Makale oluşturuldu!');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Hata oluştu!');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      authorAvatar: post.authorAvatar,
      publishDate: post.publishDate,
      readTime: post.readTime,
      tags: post.tags.join(', '),
      featuredImage: post.featuredImage,
      featured: post.featured,
      status: post.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        fetchPosts();
        alert('Makale silindi!');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Hata oluştu!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'tips',
      author: 'Admin',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: 5,
      tags: '',
      featuredImage: '',
      featured: false,
      status: 'draft'
    });
    setEditingPost(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600 mt-1">Blog makalelerini yönetin</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Yeni Makale</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Makale ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="published">Yayınlanan</option>
            <option value="draft">Taslak</option>
            <option value="archived">Arşivlenen</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-1" />
            Toplam: {filteredPosts.length} makale
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingPost ? 'Makale Düzenle' : 'Yeni Makale'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                    <input
                      id="blog-title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="blog-slug" className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                    <input
                      id="blog-slug"
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="blog-category" className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                      id="blog-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="blog-excerpt" className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                    <textarea
                      id="blog-excerpt"
                      rows={3}
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="blog-content" className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                    <textarea
                      id="blog-content"
                      rows={8}
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="blog-author" className="block text-sm font-medium text-gray-700 mb-2">Yazar</label>
                    <input
                      id="blog-author"
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="blog-read-time" className="block text-sm font-medium text-gray-700 mb-2">Okuma Süresi (dk)</label>
                    <input
                      id="blog-read-time"
                      type="number"
                      min="1"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="blog-publish-date" className="block text-sm font-medium text-gray-700 mb-2">Yayın Tarihi</label>
                    <input
                      id="blog-publish-date"
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="blog-status" className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                    <select
                      id="blog-status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayınla</option>
                      <option value="archived">Arşivle</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="blog-tags" className="block text-sm font-medium text-gray-700 mb-2">Etiketler (virgülle ayırın)</label>
                    <input
                      id="blog-tags"
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="enerji tasarrufu, kombi, kış bakımı"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="blog-image" className="block text-sm font-medium text-gray-700 mb-2">Öne Çıkan Görsel URL</label>
                    <input
                      id="blog-image"
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                      Öne çıkan makale olarak işaretle
                    </label>
                  </div>
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
                    {editingPost ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Makale</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Görüntülenme</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-4">
                      {post.featuredImage && (
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                        <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center text-xs text-gray-500">
                            <UserIcon className="h-3 w-3 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {post.readTime} dk
                          </span>
                          {post.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Öne Çıkan
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{post.tags.length - 3} daha</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {categories.find(cat => cat.value === post.category)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status === 'published' && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                      {post.status === 'draft' && <ClockIcon className="h-3 w-3 mr-1" />}
                      {post.status === 'archived' && <XCircleIcon className="h-3 w-3 mr-1" />}
                      {post.status === 'published' ? 'Yayınlı' : 
                       post.status === 'draft' ? 'Taslak' : 'Arşiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {post.views.toLocaleString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Makale bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">Başlamak için yeni bir makale oluşturun.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Yeni Makale</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
