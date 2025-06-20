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
        featured, 
        limit = 10, 
        offset = 0 
      } = event.queryStringParameters || {};

      const client = await pool.connect();
      try {
        let query = `
          SELECT bp.*, u.name as author_name 
          FROM blog_posts bp 
          LEFT JOIN users u ON bp.author_id = u.id
          WHERE bp.is_published = true
        `;
        const params = [];
        let paramCount = 1;
        
        if (category) {
          query += ` AND bp.category = $${paramCount}`;
          params.push(category);
          paramCount++;
        }
        
        if (featured === 'true') {
          query += ` AND bp.is_featured = $${paramCount}`;
          params.push(true);
          paramCount++;
        }
        
        query += ` ORDER BY bp.published_at DESC, bp.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        params.push(parseInt(limit), parseInt(offset));

        const result = await client.query(query, params);

        // Get total count for pagination
        let countQuery = `
          SELECT COUNT(*) as total
          FROM blog_posts bp 
          WHERE bp.is_published = true
        `;
        const countParams = [];
        let countParamCount = 1;
        
        if (category) {
          countQuery += ` AND bp.category = $${countParamCount}`;
          countParams.push(category);
          countParamCount++;
        }
        
        if (featured === 'true') {
          countQuery += ` AND bp.is_featured = $${countParamCount}`;
          countParams.push(true);
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
    console.error('Blog API Error:', error);
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