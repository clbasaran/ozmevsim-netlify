// Cloudflare D1 Database Wrapper
// Öz Mevsim Website için database işlemleri

interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
  exec(sql: string): Promise<D1ExecResult>;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = any>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = any>(): Promise<D1Result<T>>;
}

interface D1Result<T = any> {
  results?: T[];
  success: boolean;
  error?: string;
  meta: {
    duration: number;
    size_after: number;
    rows_read: number;
    rows_written: number;
    last_row_id?: number;
  };
}

interface D1ExecResult {
  count: number;
  duration: number;
}

// Extend globalThis interface for D1
declare global {
  var DB: D1Database | undefined;
}

// Database işlemleri için wrapper class
export class DatabaseService {
  private db: D1Database;

  constructor(database: D1Database) {
    this.db = database;
  }

  // Products (Ürünler) işlemleri
  async getProducts(status = 'active') {
    try {
      const stmt = this.db.prepare('SELECT * FROM products WHERE status = ? ORDER BY created_at DESC');
      const result = await stmt.bind(status).all();
      return result.results || [];
    } catch (error: any) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProduct(id: number) {
    try {
      const stmt = this.db.prepare('SELECT * FROM products WHERE id = ?');
      return await stmt.bind(id).first();
    } catch (error: any) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async createProduct(product: any) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO products (title, description, price, image_url, category, brand, model, features, specifications, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = await stmt.bind(
        product.title,
        product.description,
        product.price,
        product.image_url,
        product.category,
        product.brand,
        product.model,
        JSON.stringify(product.features || []),
        JSON.stringify(product.specifications || {}),
        product.status || 'active'
      ).run();
      return { success: true, id: result.meta.last_row_id };
    } catch (error: any) {
      console.error('Error creating product:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  async updateProduct(id: number, product: any) {
    try {
      const stmt = this.db.prepare(`
        UPDATE products 
        SET title = ?, description = ?, price = ?, image_url = ?, category = ?, 
            brand = ?, model = ?, features = ?, specifications = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      const result = await stmt.bind(
        product.title,
        product.description,
        product.price,
        product.image_url,
        product.category,
        product.brand,
        product.model,
        JSON.stringify(product.features || []),
        JSON.stringify(product.specifications || {}),
        product.status || 'active',
        id
      ).run();
      return { success: result.success };
    } catch (error: any) {
      console.error('Error updating product:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  async deleteProduct(id: number) {
    try {
      const stmt = this.db.prepare('UPDATE products SET status = ? WHERE id = ?');
      const result = await stmt.bind('deleted', id).run();
      return { success: result.success };
    } catch (error: any) {
      console.error('Error deleting product:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  // Blog Posts işlemleri
  async getBlogPosts(status = 'published') {
    try {
      const stmt = this.db.prepare('SELECT * FROM blog_posts WHERE status = ? ORDER BY created_at DESC');
      const result = await stmt.bind(status).all();
      return result.results || [];
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  async createBlogPost(post: any) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO blog_posts (title, content, excerpt, featured_image, author, status, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const result = await stmt.bind(
        post.title,
        post.content,
        post.excerpt,
        post.featured_image,
        post.author,
        post.status || 'published',
        JSON.stringify(post.tags || [])
      ).run();
      return { success: true, id: result.meta.last_row_id };
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  async updateBlogPost(id: number, post: any) {
    try {
      const stmt = this.db.prepare(`
        UPDATE blog_posts 
        SET title = ?, content = ?, excerpt = ?, featured_image = ?, author = ?, status = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      const result = await stmt.bind(
        post.title,
        post.content,
        post.excerpt,
        post.featured_image,
        post.author,
        post.status || 'published',
        JSON.stringify(post.tags || []),
        id
      ).run();
      return { success: result.success };
    } catch (error: any) {
      console.error('Error updating blog post:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  async deleteBlogPost(id: number) {
    try {
      const stmt = this.db.prepare('UPDATE blog_posts SET status = ? WHERE id = ?');
      const result = await stmt.bind('deleted', id).run();
      return { success: result.success };
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  // FAQ işlemleri
  async getFAQs(status = 'active') {
    try {
      const stmt = this.db.prepare('SELECT * FROM faqs WHERE status = ? ORDER BY order_index ASC, created_at DESC');
      const result = await stmt.bind(status).all();
      return result.results || [];
    } catch (error: any) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  }

  async createFAQ(faq: any) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO faqs (question, answer, category, order_index, status)
        VALUES (?, ?, ?, ?, ?)
      `);
      const result = await stmt.bind(
        faq.question,
        faq.answer,
        faq.category,
        faq.order_index || 0,
        faq.status || 'active'
      ).run();
      return { success: true, id: result.meta.last_row_id };
    } catch (error: any) {
      console.error('Error creating FAQ:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  // Testimonials işlemleri
  async getTestimonials(status = 'active') {
    try {
      const stmt = this.db.prepare('SELECT * FROM testimonials WHERE status = ? ORDER BY created_at DESC');
      const result = await stmt.bind(status).all();
      return result.results || [];
    } catch (error: any) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  async createTestimonial(testimonial: any) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO testimonials (name, company, position, content, rating, avatar_url, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const result = await stmt.bind(
        testimonial.name,
        testimonial.company,
        testimonial.position,
        testimonial.content,
        testimonial.rating || 5,
        testimonial.avatar_url,
        testimonial.status || 'active'
      ).run();
      return { success: true, id: result.meta.last_row_id };
    } catch (error: any) {
      console.error('Error creating testimonial:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  // Contact Messages işlemleri
  async createContactMessage(message: any) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO contact_messages (name, email, phone, subject, message, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const result = await stmt.bind(
        message.name,
        message.email,
        message.phone,
        message.subject,
        message.message,
        'unread'
      ).run();
      return { success: true, id: result.meta.last_row_id };
    } catch (error: any) {
      console.error('Error creating contact message:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  async getContactMessages(status?: string) {
    try {
      let stmt;
      if (status) {
        stmt = this.db.prepare('SELECT * FROM contact_messages WHERE status = ? ORDER BY created_at DESC');
        const result = await stmt.bind(status).all();
        return result.results || [];
      } else {
        stmt = this.db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC');
        const result = await stmt.all();
        return result.results || [];
      }
    } catch (error: any) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  }

  // Site Settings işlemleri
  async getSetting(key: string) {
    try {
      const stmt = this.db.prepare('SELECT value, type FROM site_settings WHERE key = ?');
      const result = await stmt.bind(key).first();
      if (!result) return null;
      
      // Type'a göre parse et
      if (result.type === 'json') {
        return JSON.parse(result.value);
      } else if (result.type === 'boolean') {
        return result.value === 'true';
      } else if (result.type === 'number') {
        return parseFloat(result.value);
      }
      return result.value;
    } catch (error: any) {
      console.error('Error fetching setting:', error);
      return null;
    }
  }

  async setSetting(key: string, value: any, type = 'text') {
    try {
      let stringValue = value;
      if (type === 'json') {
        stringValue = JSON.stringify(value);
      } else if (type === 'boolean') {
        stringValue = value ? 'true' : 'false';
      } else if (type === 'number') {
        stringValue = value.toString();
      }

      const stmt = this.db.prepare(`
        INSERT OR REPLACE INTO site_settings (key, value, type, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `);
      const result = await stmt.bind(key, stringValue, type).run();
      return { success: result.success };
    } catch (error: any) {
      console.error('Error setting value:', error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  }

  async getAllSettings() {
    try {
      const stmt = this.db.prepare('SELECT key, value, type FROM site_settings');
      const result = await stmt.all();
      
      const settings: Record<string, any> = {};
      (result.results || []).forEach((row: any) => {
        if (row.type === 'json') {
          settings[row.key] = JSON.parse(row.value);
        } else if (row.type === 'boolean') {
          settings[row.key] = row.value === 'true';
        } else if (row.type === 'number') {
          settings[row.key] = parseFloat(row.value);
        } else {
          settings[row.key] = row.value;
        }
      });
      
      return settings;
    } catch (error: any) {
      console.error('Error fetching all settings:', error);
      return {};
    }
  }

  // Dashboard Statistics
  async getDashboardStats() {
    try {
      const queries = [
        this.db.prepare('SELECT COUNT(*) as count FROM products WHERE status = ?').bind('active'),
        this.db.prepare('SELECT COUNT(*) as count FROM blog_posts WHERE status = ?').bind('published'),
        this.db.prepare('SELECT COUNT(*) as count FROM faqs WHERE status = ?').bind('active'),
        this.db.prepare('SELECT COUNT(*) as count FROM testimonials WHERE status = ?').bind('active'),
        this.db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE status = ?').bind('unread'),
      ];

      const results = await Promise.all(queries.map(q => q.first()));
      
      return {
        products: results[0]?.count || 0,
        blog_posts: results[1]?.count || 0,
        faqs: results[2]?.count || 0,
        testimonials: results[3]?.count || 0,
        unread_messages: results[4]?.count || 0,
      };
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      return {
        products: 0,
        blog_posts: 0,
        faqs: 0,
        testimonials: 0,
        unread_messages: 0,
      };
    }
  }
}

// Helper function to get database instance
export function getDatabase(): D1Database | null {
  if (typeof globalThis !== 'undefined' && globalThis.DB) {
    return globalThis.DB;
  }
  return null;
}

// Helper function to create database service
export function createDatabaseService(): DatabaseService | null {
  const db = getDatabase();
  if (!db) return null;
  return new DatabaseService(db);
} 