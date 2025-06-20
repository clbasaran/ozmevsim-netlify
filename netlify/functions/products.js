exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Mock products data
      const products = [
        {
          id: '1',
          name: 'Daikin VRV Sistemi',
          brand: 'Daikin',
          category: 'VRV Sistemleri',
          price: '45000',
          description: 'Yüksek verimli VRV klima sistemi',
          image: '/images/products/daikin-vrv.jpg',
          features: ['Enerji Tasarrufu', 'Sessiz Çalışma', '10 Yıl Garanti'],
          inStock: true,
          rating: 4.8
        },
        {
          id: '2',
          name: 'Vaillant ecoTEC Kombi',
          brand: 'Vaillant',
          category: 'Kombiler',
          price: '8500',
          description: 'Yoğuşmalı kombi sistemi',
          image: '/images/products/vaillant-kombi.jpg',
          features: ['Düşük Emisyon', 'Yüksek Verim', '5 Yıl Garanti'],
          inStock: true,
          rating: 4.6
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: products
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