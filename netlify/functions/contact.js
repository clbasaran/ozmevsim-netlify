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
      const { name, email, phone, subject, message } = body;

      // Validation
      if (!name || !email || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Name, email, and message are required' }),
        };
      }

      // In production, save to database
      // For now, just return success
      const id = Date.now().toString();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Message sent successfully',
          id: id
        }),
      };
    }

    if (method === 'GET') {
      // Mock data for contact messages
      const messages = [
        {
          id: '1',
          name: 'Ahmet Yılmaz',
          email: 'ahmet@example.com',
          phone: '0532 123 45 67',
          subject: 'Kombi Montajı',
          message: 'Yeni aldığım kombiyi monte ettirmek istiyorum.',
          urgency: 'medium',
          status: 'new',
          createdAt: '2024-01-15T10:00:00Z',
        },
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: messages
        }),
      };
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
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}; 