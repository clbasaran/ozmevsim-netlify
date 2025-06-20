-- Sample data for Öz Mevsim Isı Sistemleri
-- Run this after creating the schema

-- Insert admin user (password: admin123)
INSERT INTO users (email, password_hash, name, role) VALUES 
('admin@ozmevsim.com', '$2b$10$rOzJaEZ9QZlP6Z5J5q1N8OSEEgOkThXvGhP.HyFhYs6VKOEJp6t0G', 'Admin User', 'admin');

-- Insert categories
INSERT INTO categories (name, slug, description, sort_order) VALUES 
('Kombiler', 'kombiler', 'Kombi sistemleri ve ekipmanları', 1),
('Klimalar', 'klimalar', 'Klima sistemleri ve montajı', 2),
('Radyatörler', 'radyatorler', 'Radyatör sistemleri', 3),
('Su Isıtıcıları', 'su-isiticilari', 'Su ısıtıcı sistemleri', 4);

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, category_id, brand, price, currency, main_image, is_featured, specifications, features) VALUES 
(
  'Vaillant ecoTEC Plus', 
  'vaillant-ecotec-plus',
  'Yüksek verimli yoğuşmalı kombi. Enerji tasarrufu ve çevre dostu teknoloji.',
  'Yoğuşmalı kombi - 24 kW',
  (SELECT id FROM categories WHERE slug = 'kombiler'),
  'Vaillant',
  8500.00,
  'TRY',
  '/images/products/vaillant-ecotec.jpg',
  true,
  '{"power": "24 kW", "type": "Yoğuşmalı", "efficiency": "%94", "warranty": "5 yıl"}',
  '["Yüksek verim", "Çevre dostu", "Sessiz çalışma", "Uzun ömür"]'
),
(
  'Daikin Altherma', 
  'daikin-altherma',
  'Hava kaynaklı ısı pompası. Hem ısıtma hem de soğutma özelliği.',
  'Isı pompası sistemi - 8 kW',
  (SELECT id FROM categories WHERE slug = 'klimalar'),
  'Daikin',
  15000.00,
  'TRY',
  '/images/products/daikin-altherma.jpg',
  true,
  '{"power": "8 kW", "type": "Isı Pompası", "cop": "4.5", "warranty": "5 yıl"}',
  '["Enerji tasarrufu", "4 mevsim kullanım", "Sessiz çalışma", "Çevre dostu"]'
);

-- Insert settings
INSERT INTO settings (key, value, type, description, is_public) VALUES 
('site_title', '"Öz Mevsim Isı Sistemleri"', 'text', 'Site başlığı', true),
('contact_phone', '"+90 312 357 0600"', 'text', 'İletişim telefonu', true),
('contact_email', '"info@ozmevsim.com"', 'email', 'İletişim e-posta', true);

COMMIT; 