const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const method = event.httpMethod;

    if (method === 'GET') {
      const { 
        category, 
        brand, 
        featured, 
        search, 
        limit = 20, 
        offset = 0 
      } = event.queryStringParameters || {};

      const client = await pool.connect();
      try {
        let query = `
          SELECT p.*, c.name as category_name 
          FROM products p 
          LEFT JOIN categories c ON p.category_id = c.id 
          WHERE p.is_active = true
        `;
        const params = [];
        let paramCount = 1;
        
        if (category) {
          query += ` AND c.slug = $${paramCount}`;
          params.push(category);
          paramCount++;
        }
        
        if (brand) {
          query += ` AND p.brand ILIKE $${paramCount}`;
          params.push(`%${brand}%`);
          paramCount++;
        }
        
        if (featured === 'true') {
          query += ` AND p.is_featured = $${paramCount}`;
          params.push(true);
          paramCount++;
        }
        
        if (search) {
          query += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
          params.push(`%${search}%`);
          paramCount++;
        }
        
        query += ` ORDER BY p.sort_order ASC, p.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        params.push(parseInt(limit), parseInt(offset));

        const result = await client.query(query, params);

        // Get total count for pagination
        let countQuery = `
          SELECT COUNT(*) as total
          FROM products p 
          LEFT JOIN categories c ON p.category_id = c.id 
          WHERE p.is_active = true
        `;
        const countParams = [];
        let countParamCount = 1;
        
        if (category) {
          countQuery += ` AND c.slug = $${countParamCount}`;
          countParams.push(category);
          countParamCount++;
        }
        
        if (brand) {
          countQuery += ` AND p.brand ILIKE $${countParamCount}`;
          countParams.push(`%${brand}%`);
          countParamCount++;
        }
        
        if (featured === 'true') {
          countQuery += ` AND p.is_featured = $${countParamCount}`;
          countParams.push(true);
          countParamCount++;
        }
        
        if (search) {
          countQuery += ` AND (p.name ILIKE $${countParamCount} OR p.description ILIKE $${countParamCount})`;
          countParams.push(`%${search}%`);
          countParamCount++;
        }

        const countResult = await client.query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].total);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: result.rows,
            pagination: {
              total,
              limit: parseInt(limit),
              offset: parseInt(offset),
              hasMore: parseInt(offset) + result.rows.length < total
            }
          }),
        };
      } finally {
        client.release();
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Products API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      }),
    };
  }
}; 