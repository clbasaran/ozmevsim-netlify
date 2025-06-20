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

    if (method === 'POST') {
      const body = JSON.parse(event.body);
      const { name, email, phone, subject, message, service_interest } = body;

      // Validation
      if (!name || !email || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Name, email, and message are required' }),
        };
      }

      // Get client IP (handle multiple IPs in x-forwarded-for)
      let ip_address = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || null;
      if (ip_address && ip_address.includes(',')) {
        ip_address = ip_address.split(',')[0].trim(); // Take first IP
      }
      const user_agent = event.headers['user-agent'] || null;

      // Save to database
      const client = await pool.connect();
      try {
        const result = await client.query(
          `INSERT INTO contact_messages 
           (name, email, phone, subject, message, service_interest, ip_address, user_agent) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
           RETURNING id`,
          [name, email, phone || null, subject || null, message, service_interest || null, ip_address, user_agent]
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
            id: result.rows[0].id
          }),
        };
      } finally {
        client.release();
      }
    }

    if (method === 'GET') {
      // Get contact messages for admin
      const { status, limit = 50, offset = 0 } = event.queryStringParameters || {};
      
      const client = await pool.connect();
      try {
        let query = `
          SELECT cm.*, u.name as assigned_to_name 
          FROM contact_messages cm 
          LEFT JOIN users u ON cm.assigned_to = u.id
        `;
        const params = [];
        let paramCount = 1;
        
        if (status) {
          query += ` WHERE cm.status = $${paramCount}`;
          params.push(status);
          paramCount++;
        }
        
        query += ` ORDER BY cm.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        params.push(parseInt(limit), parseInt(offset));

        const result = await client.query(query, params);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: result.rows
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
    console.error('Contact API Error:', error);
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