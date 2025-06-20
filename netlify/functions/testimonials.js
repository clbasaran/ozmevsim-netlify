const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  console.log('🔍 Testimonials API request received:', event.httpMethod);

  try {
    if (event.httpMethod === 'GET') {
      console.log('🔌 Attempting database connection...');
      
      const result = await pool.query(`
        SELECT 
          id,
          name,
          company,
          position,
          content as comment,
          rating,
          service_category,
          is_active,
          is_featured,
          is_approved,
          avatar_url,
          sort_order,
          created_at,
          updated_at
        FROM testimonials 
        WHERE is_active = true
        ORDER BY is_featured DESC, sort_order ASC, created_at DESC
      `);
      
      console.log('✅ Database connected successfully');
      console.log(`📊 Found ${result.rows.length} testimonials`);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: result.rows
        }),
      };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      
      const {
        name,
        company,
        position,
        content,
        rating,
        service_category,
        is_active = true,
        is_featured = false,
        is_approved = true,
        avatar_url,
        sort_order = 0
      } = body;

      if (!name || !content || !rating) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Name, content, and rating are required'
          }),
        };
      }

      const result = await pool.query(`
        INSERT INTO testimonials (
          name, company, position, content, rating, service_category,
          is_active, is_featured, is_approved, avatar_url, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `, [
        name, company, position, content, rating, service_category,
        is_active, is_featured, is_approved, avatar_url, sort_order
      ]);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          data: result.rows[0]
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed'
      }),
    };

  } catch (error) {
    console.error('❌ Error in testimonials function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Database connection failed',
        message: error.message
      }),
    };
  }
}; 