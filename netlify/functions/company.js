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
      const client = await pool.connect();
      try {
        const query = `SELECT * FROM company_info WHERE is_active = true ORDER BY created_at DESC LIMIT 1`;
        const result = await client.query(query);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: result.rows[0] || null
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
    console.error('Company API Error:', error);
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