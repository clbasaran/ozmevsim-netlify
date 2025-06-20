'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CalendarIcon, 
  ClockIcon,
  ArrowRightIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_id: string | null;
  category: string;
  tags: string[];
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/');
        if (response.ok) {
          const responseData = await response.json();
          console.log('Blog API response:', responseData);
          
          // Handle API response format: {success: true, data: [...]}
          const data = responseData.success ? responseData.data : responseData;
          
          if (Array.isArray(data)) {
            setPosts(data);
            
            // Extract unique categories
            const categorySet = new Set();
            data.forEach((post: BlogPost) => {
              if (post.category) {
                categorySet.add(post.category);
              }
            });
            const uniqueCategories = Array.from(categorySet) as string[];
            setCategories(uniqueCategories);
          } else {
            console.error('Blog data is not an array:', data);
            setPosts([]);
          }
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPosts = posts.filter(post => post.is_featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} dk okuma`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HVAC sektöründeki son gelişmeler, ipuçları ve uzman görüşleri
            </p>
          </motion.div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Tümü ({posts.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category} ({posts.filter(post => post.category === category).length})
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Öne Çıkan Yazılar
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.featured_image || '/images/blog-placeholder.jpg'}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {getReadingTime(post.content)}
                      </span>
                      {post.category && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs capitalize">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mb-6">
                        <TagIcon className="h-4 w-4 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Devamını Oku
                      <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.featured_image || '/images/blog-placeholder.jpg'}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {getReadingTime(post.content)}
                      </span>
                    </div>
                    
                    {post.category && (
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs capitalize mb-3">
                        {post.category}
                      </span>
                    )}
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        <TagIcon className="h-4 w-4 text-gray-400" />
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Devamını Oku
                      <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedCategory === 'all' ? 'Henüz blog yazısı bulunmuyor' : `"${selectedCategory}" kategorisinde yazı bulunamadı`}
              </h3>
              <p className="text-gray-600 mb-8">
                Yakında yeni içeriklerle karşınızda olacağız.
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tüm Yazıları Görüntüle
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Yeni İçeriklerden Haberdar Olun
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              HVAC sektöründeki son gelişmeleri ve ipuçlarını kaçırmamak için bizi takip edin.
            </p>
            <a
              href="/iletisim"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Bize Ulaşın
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 