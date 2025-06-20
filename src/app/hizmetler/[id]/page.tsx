import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Service detail page component
export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  try {
    // Fetch service data from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/services/`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const services = await response.json();
    const service = services.find((s: any) => s.id === params.id);
    
    if (!service) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{service.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                <p className="text-gray-600 mt-2">{service.short_description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hizmet Detayları</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Özellikler</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fiyat Bilgisi</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Başlangıç Fiyatı:</span>
                    <span className="font-semibold text-green-600">
                      {service.price_min ? `₺${parseFloat(service.price_min).toLocaleString('tr-TR')}` : 'Talep Üzerine'}
                    </span>
                  </div>
                  {service.price_max && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maksimum Fiyat:</span>
                      <span className="font-semibold text-green-600">
                        ₺{parseFloat(service.price_max).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a 
                    href={`https://wa.me/905323570600?text=Merhaba, ${service.title} hizmetiniz hakkında bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">📱</span>
                    WhatsApp ile İletişim
                  </a>
                </div>
                
                <div className="mt-4">
                  <a 
                    href="/iletisim/"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">📧</span>
                    Teklif Talep Et
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching service:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/services/`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return {
        title: 'Hizmet Bulunamadı | Öz Mevsim',
        description: 'Aradığınız hizmet bulunamadı.'
      };
    }
    
    const services = await response.json();
    const service = services.find((s: any) => s.id === params.id);
    
    if (!service) {
      return {
        title: 'Hizmet Bulunamadı | Öz Mevsim',
        description: 'Aradığınız hizmet bulunamadı.'
      };
    }

    return {
      title: `${service.title} | Öz Mevsim Hizmetleri`,
      description: service.short_description || service.description,
      keywords: [service.title, 'öz mevsim', 'ankara', 'ısıtma', 'soğutma'],
      openGraph: {
        title: service.title,
        description: service.short_description || service.description,
        type: 'article',
        images: service.image_url ? [service.image_url] : []
      }
    };
  } catch (error) {
    return {
      title: 'Hizmet Detayı | Öz Mevsim',
      description: 'Öz Mevsim hizmet detayları'
    };
  }
} 