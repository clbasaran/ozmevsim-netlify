'use client';

interface MapProps {
  className?: string;
  height?: string;
}

// Company info
const companyInfo = {
  name: 'Öz Mevsim HVAC',
  address: 'Kuşcağız Mahallesi, 06170 Yenimahalle/Ankara',
  phone: '+90 532 446 73 67',
  email: 'info@ozmevsim.com'
};

export default function Map({ className = '', height = '400px' }: MapProps) {
  // Using Google Maps place search - this should pinpoint the exact address
  const fullAddress = 'Kuşcağız Mahallesi, Sanatoryum Cd. No:221/A, 06300 Keçiören/Ankara, Turkey';
  const addressQuery = encodeURIComponent(fullAddress);
  
  // Google Maps embed with place search
  const embedUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=tr&q=${addressQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div style={{ height }} className="w-full">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Öz Mevsim İsı Sistemleri Showroom Konumu"
        />
      </div>
      
      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">
          {companyInfo.name}
        </h4>
        <p className="text-gray-600 text-xs mb-3">
          {companyInfo.address}
        </p>
        <div className="space-y-1 mb-3">
          <p className="text-gray-600 text-xs flex items-center">
            <span className="mr-1">📞</span>
            {companyInfo.phone}
          </p>
          <p className="text-gray-600 text-xs flex items-center">
            <span className="mr-1">✉️</span>
            {companyInfo.email}
          </p>
        </div>
        <a
          href={`https://maps.google.com/?q=${addressQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-600 text-white px-3 py-1.5 rounded text-xs hover:bg-orange-700 transition-colors font-medium"
        >
          Yol Tarifi Al
        </a>
      </div>
    </div>
  );
} 