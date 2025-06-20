import { Pool, PoolConfig } from 'pg';

// Database connection configuration
const dbConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ozmevsim',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create connection pool
let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = new Pool(dbConfig);
    
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }
  
  return pool;
}

// Database service class
export class DatabaseService {
  private pool: Pool;
  
  constructor() {
    this.pool = getDbPool();
  }
  
  // Generic query method
  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }
  
  // Products methods
  async getProducts(filters: {
    category?: string;
    brand?: string;
    featured?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = true
    `;
    const params: any[] = [];
    let paramCount = 1;
    
    if (filters.category) {
      query += ` AND c.slug = $${paramCount}`;
      params.push(filters.category);
      paramCount++;
    }
    
    if (filters.brand) {
      query += ` AND p.brand ILIKE $${paramCount}`;
      params.push(`%${filters.brand}%`);
      paramCount++;
    }
    
    if (filters.featured !== undefined) {
      query += ` AND p.is_featured = $${paramCount}`;
      params.push(filters.featured);
      paramCount++;
    }
    
    if (filters.search) {
      query += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
      paramCount++;
    }
    
    query += ` ORDER BY p.sort_order ASC, p.created_at DESC`;
    
    if (filters.limit) {
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
      paramCount++;
      
      if (filters.offset) {
        query += ` OFFSET $${paramCount}`;
        params.push(filters.offset);
      }
    }
    
    const result = await this.query(query, params);
    return result.rows;
  }
  
  async getProductById(id: string) {
    const result = await this.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = $1 AND p.is_active = true`,
      [id]
    );
    return result.rows[0];
  }
  
  async getProductBySlug(slug: string) {
    const result = await this.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.slug = $1 AND p.is_active = true`,
      [slug]
    );
    return result.rows[0];
  }
  
  // Contact messages methods
  async createContactMessage(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    service_interest?: string;
    ip_address?: string;
    user_agent?: string;
  }) {
    const result = await this.query(
      `INSERT INTO contact_messages 
       (name, email, phone, subject, message, service_interest, ip_address, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id`,
      [
        data.name,
        data.email,
        data.phone || null,
        data.subject || null,
        data.message,
        data.service_interest || null,
        data.ip_address || null,
        data.user_agent || null
      ]
    );
    return { success: true, id: result.rows[0].id };
  }
  
  async getContactMessages(filters: {
    status?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = `
      SELECT cm.*, u.name as assigned_to_name 
      FROM contact_messages cm 
      LEFT JOIN users u ON cm.assigned_to = u.id
    `;
    const params: any[] = [];
    let paramCount = 1;
    
    if (filters.status) {
      query += ` WHERE cm.status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }
    
    query += ` ORDER BY cm.created_at DESC`;
    
    if (filters.limit) {
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
      paramCount++;
      
      if (filters.offset) {
        query += ` OFFSET $${paramCount}`;
        params.push(filters.offset);
      }
    }
    
    const result = await this.query(query, params);
    return result.rows;
  }
  
  // Blog methods
  async getBlogPosts(filters: {
    category?: string;
    featured?: boolean;
    published?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = `
      SELECT bp.*, u.name as author_name 
      FROM blog_posts bp 
      LEFT JOIN users u ON bp.author_id = u.id
    `;
    const params: any[] = [];
    let paramCount = 1;
    const conditions: string[] = [];
    
    if (filters.published !== false) {
      conditions.push('bp.is_published = true');
    }
    
    if (filters.category) {
      conditions.push(`bp.category = $${paramCount}`);
      params.push(filters.category);
      paramCount++;
    }
    
    if (filters.featured !== undefined) {
      conditions.push(`bp.is_featured = $${paramCount}`);
      params.push(filters.featured);
      paramCount++;
    }
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ` ORDER BY bp.published_at DESC, bp.created_at DESC`;
    
    if (filters.limit) {
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
      paramCount++;
      
      if (filters.offset) {
        query += ` OFFSET $${paramCount}`;
        params.push(filters.offset);
      }
    }
    
    const result = await this.query(query, params);
    return result.rows;
  }
}

// Singleton instance
let dbService: DatabaseService | null = null;

export function getDatabaseService(): DatabaseService {
  if (!dbService) {
    dbService = new DatabaseService();
  }
  return dbService;
}

// Helper function to check database connection
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const pool = getDbPool();
    const result = await pool.query('SELECT NOW()');
    return !!result;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
} 