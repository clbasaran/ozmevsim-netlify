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

const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Kış Aylarında Kombi Verimliliğini Artırmanın 10 Yolu',
    slug: 'kis-aylarinda-kombi-verimliligini-artirmanin-10-yolu',
    excerpt: 'Soğuk kış aylarında enerji faturalarınızı düşürürken evinizi sıcak tutmanın pratik yollarını keşfedin.',
    content: 'Kış aylarında artan doğalgaz faturaları ailelerin en büyük endişelerinden biri. İşte kombi verimliliğinizi artırarak hem tasarruf edebileceğiniz hem de çevreyi koruyabileceğiniz 10 etkili yöntem...',
    category: 'tips',
    author: 'Murat Özkan',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    publishDate: '2024-03-15',
    readTime: 8,
    views: 1250,
    tags: ['enerji tasarrufu', 'kombi', 'kış bakımı', 'verimlilik'],
    featuredImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop',
    featured: true,
    status: 'published',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Yeni Nesil Akıllı Termostat Teknolojileri',
    slug: 'yeni-nesil-akilli-termostat-teknolojileri',
    excerpt: 'IoT destekli akıllı termostatlarla evinizin ısıtma sistemini nasıl optimize edebileceğinizi öğrenin.',
    content: 'Teknolojinin hızla gelişmesiyle birlikte ev ısıtma sistemleri de akıllanıyor. Yeni nesil akıllı termostatlar...',
    category: 'technology',
    author: 'Ayşe Demir',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    publishDate: '2024-03-12',
    readTime: 6,
    views: 890,
    tags: ['akıllı sistem', 'termostat', 'IoT', 'teknoloji'],
    featuredImage: 'https://images.unsplash.com/photo-1558618666-fbd25c85cd64?w=600&h=400&fit=crop',
    featured: false,
    status: 'published',
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-03-12T10:00:00Z'
  }
];

const categories = {
  tips: { name: 'İpuçları', icon: LightBulbIcon, color: 'bg-yellow-100 text-yellow-700' },
  news: { name: 'Haberler', icon: NewspaperIcon, color: 'bg-blue-100 text-blue-700' },
  technology: { name: 'Teknoloji', icon: ArrowTrendingUpIcon, color: 'bg-purple-100 text-purple-700' },
  maintenance: { name: 'Bakım', icon: BookOpenIcon, color: 'bg-green-100 text-green-700' }
};

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For static deployment, use default data
    setBlogPosts(defaultBlogPosts);
    setLoading(false);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter((post: BlogPost) => post.category === selectedCategory);

  const featuredPost = blogPosts.find((post: BlogPost) => post.featured);
  const recentPosts = blogPosts.filter((post: BlogPost) => !post.featured).slice(0, 5);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Blog & Haberler</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          </div>
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
            Blog & Haberler
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Isıtma ve soğutma sistemleri hakkında güncel bilgiler, ipuçları ve şirket haberlerimiz
          </p>
        </motion.div>

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
                ? 'bg-primary-600 text-white shadow-lg'
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
                  ? 'bg-primary-600 text-white shadow-lg'
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
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categories[featuredPost.category].color}`}>
                      {React.createElement(categories[featuredPost.category].icon, { className: "h-4 w-4 mr-1" })}
                      {categories[featuredPost.category].name}
                    </span>
                    <span className="ml-3 text-sm text-red-600 font-medium">Öne Çıkan</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <img
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{featuredPost.author}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {new Date(featuredPost.publishDate).toLocaleDateString('tr-TR')}
                          <ClockIcon className="h-3 w-3 ml-3 mr-1" />
                          {featuredPost.readTime} dk okuma
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {featuredPost.views}
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedPost(featuredPost)}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center font-medium"
                  >
                    Devamını Oku
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured || selectedCategory !== 'all').map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categories[post.category].color}`}>
                    {React.createElement(categories[post.category].icon, { className: "h-3 w-3 mr-1" })}
                    {categories[post.category].name}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <EyeIcon className="h-3 w-3 mr-1" />
                    {post.views}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {post.readTime} dk
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedPost(post)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium"
                >
                  Yazıyı Oku
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          className="mt-16 bg-primary-600 rounded-2xl p-8 lg:p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <NewspaperIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">
            Blog Güncellemelerini Kaçırmayın
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
            Yeni yazılarımız, ipuçları ve özel kampanyalarımız hakkında ilk siz haberdar olun.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium whitespace-nowrap">
              Abone Ol
            </button>
          </div>
        </motion.div>

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={selectedPost.featuredImage}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categories[selectedPost.category].color}`}>
                    {React.createElement(categories[selectedPost.category].icon, { className: "h-4 w-4 mr-1" })}
                    {categories[selectedPost.category].name}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <img
                      src={selectedPost.authorAvatar}
                      alt={selectedPost.author}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedPost.author}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(selectedPost.publishDate).toLocaleDateString('tr-TR')}
                        <ClockIcon className="h-4 w-4 ml-4 mr-1" />
                        {selectedPost.readTime} dakika okuma
                        <EyeIcon className="h-4 w-4 ml-4 mr-1" />
                        {selectedPost.views} görüntüleme
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-600 mb-6">{selectedPost.excerpt}</p>
                  <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Etiketler:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
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