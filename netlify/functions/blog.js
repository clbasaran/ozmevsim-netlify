exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Mock blog posts
      const posts = [
        {
          id: '1',
          title: 'Kombi Bakımının Önemi',
          slug: 'kombi-bakiminin-onemi',
          excerpt: 'Düzenli kombi bakımı neden önemlidir?',
          content: 'Kombi bakımı hakkında detaylı bilgiler...',
          author: 'Öz Mevsim Ekibi',
          publishedAt: '2024-01-15T10:00:00Z',
          image: '/images/blog/kombi-bakim.jpg',
          category: 'Bakım',
          tags: ['kombi', 'bakım', 'enerji']
        },
        {
          id: '2',
          title: 'VRV Sistemlerin Avantajları',
          slug: 'vrv-sistemlerin-avantajlari',
          excerpt: 'VRV sistemler neden tercih edilmeli?',
          content: 'VRV sistemler hakkında detaylı bilgiler...',
          author: 'Öz Mevsim Ekibi',
          publishedAt: '2024-01-14T10:00:00Z',
          image: '/images/blog/vrv-sistem.jpg',
          category: 'Teknoloji',
          tags: ['vrv', 'klima', 'enerji']
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: posts
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}; 