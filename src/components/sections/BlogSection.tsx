'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  UserIcon,
  ClockIcon,
  TagIcon,
  EyeIcon,
  ArrowRightIcon,
  BookOpenIcon,
  NewspaperIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  featured_image?: string;
  is_featured: boolean;
  is_published: boolean;
  published_at?: string;
  tags?: string[] | any;
  created_at: string;
  updated_at: string;
}

const categories = {
  tips: { name: 'İpuçları', icon: LightBulbIcon, color: 'bg-yellow-100 text-yellow-700' },
  news: { name: 'Haberler', icon: NewspaperIcon, color: 'bg-blue-100 text-blue-700' },
  technology: { name: 'Teknoloji', icon: ArrowTrendingUpIcon, color: 'bg-purple-100 text-purple-700' },
  maintenance: { name: 'Bakım', icon: BookOpenIcon, color: 'bg-green-100 text-green-700' }
};

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching blog posts from API...');
        
        const response = await fetch('/api/blog/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Blog posts fetched successfully:', data);
        
        setBlogPosts(data || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching blog posts:', err);
        setError('Blog yazıları yüklenirken bir hata oluştu');
        
        // Fallback to default data in case of error
        setBlogPosts([
          {
            id: '1',
            title: 'Kış Aylarında Kombi Verimliliğini Artırmanın 10 Yolu',
            excerpt: 'Soğuk kış aylarında enerji faturalarınızı düşürürken evinizi sıcak tutmanın pratik yollarını keşfedin.',
            category: 'tips',
            author: 'Murat Özkan',
            featured_image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop',
            is_featured: true,
            is_published: true,
            published_at: '2024-03-15T10:00:00Z',
            tags: ['enerji tasarrufu', 'kombi', 'kış bakımı', 'verimlilik'],
            created_at: '2024-03-15T10:00:00Z',
            updated_at: '2024-03-15T10:00:00Z'
          },
          {
            id: '2',
            title: 'Yeni Nesil Akıllı Termostat Teknolojileri',
            excerpt: 'IoT destekli akıllı termostatlarla evinizin ısıtma sistemini nasıl optimize edebileceğinizi öğrenin.',
            category: 'technology',
            author: 'Ayşe Demir',
            featured_image: 'https://images.unsplash.com/photo-1558618666-fbd25c85cd64?w=600&h=400&fit=crop',
            is_featured: false,
            is_published: true,
            published_at: '2024-03-12T10:00:00Z',
            tags: ['akıllı sistem', 'termostat', 'IoT', 'teknoloji'],
            created_at: '2024-03-12T10:00:00Z',
            updated_at: '2024-03-12T10:00:00Z'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const publishedPosts = blogPosts.filter(post => post.is_published);
  
  const filteredPosts = selectedCategory === 'all' 
    ? publishedPosts 
    : publishedPosts.filter((post: BlogPost) => post.category === selectedCategory);

  const featuredPost = publishedPosts.find((post: BlogPost) => post.is_featured);
  const recentPosts = publishedPosts.filter((post: BlogPost) => !post.is_featured).slice(0, 5);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Blog & Haberler</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-gray-600">Blog yazıları yükleniyor...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Helper function to parse tags
  const parseTags = (tags: any): string[] => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
      try {
        return JSON.parse(tags);
      } catch {
        return [];
      }
    }
    return [];
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Tarih belirtilmemiş';
    }
  };

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
            Blog & Haberler
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Isıtma ve soğutma sistemleri hakkında güncel bilgiler, ipuçları ve şirket haberlerimiz
          </p>
        </motion.div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-amber-600 bg-amber-50 px-4 py-2 rounded-lg inline-block">
              {error}
            </p>
          </div>
        )}

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
            }`}
          >
            Tüm Yazılar
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
              }`}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'all' && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredPost.featured_image || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop'}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    {featuredPost.category && categories[featuredPost.category as keyof typeof categories] && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categories[featuredPost.category as keyof typeof categories].color}`}>
                        {React.createElement(categories[featuredPost.category as keyof typeof categories].icon, { className: "h-4 w-4 mr-1" })}
                        {categories[featuredPost.category as keyof typeof categories].name}
                      </span>
                    )}
                    <span className="ml-3 text-sm text-red-600 font-medium">Öne Çıkan</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  {featuredPost.excerpt && (
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span className="mr-4">{featuredPost.author || 'Yazar belirtilmemiş'}</span>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
                  </div>
                  
                  {parseTags(featuredPost.tags).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {parseTags(featuredPost.tags).slice(0, 3).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          <TagIcon className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                    Devamını Oku
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(0, 6).map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.featured_image || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=250&fit=crop'}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.category && categories[post.category as keyof typeof categories] && (
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categories[post.category as keyof typeof categories].color}`}>
                      {React.createElement(categories[post.category as keyof typeof categories].icon, { className: "h-3 w-3 mr-1" })}
                      {categories[post.category as keyof typeof categories].name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <UserIcon className="h-3 w-3 mr-1" />
                    <span>{post.author || 'Yazar belirtilmemiş'}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                  </div>
                </div>
                
                {parseTags(post.tags).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {parseTags(post.tags).slice(0, 2).map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group">
                  Devamını Oku
                  <ArrowRightIcon className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <NewspaperIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {selectedCategory === 'all' 
                ? 'Henüz blog yazısı bulunmamaktadır.' 
                : 'Bu kategoride henüz yazı bulunmamaktadır.'}
            </p>
          </div>
        )}

        {/* View All Button */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Tüm Blog Yazılarını Görüntüle
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
} 