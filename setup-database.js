#!/usr/bin/env node

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database connection configuration
const getDbConfig = () => {
  // Production'da DATABASE_URL kullan, development'ta ayrı ayrı değişkenler
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };
  }
  
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ozmevsim',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  };
};

async function setupDatabase() {
  const dbConfig = getDbConfig();
  const pool = new Pool(dbConfig);
  
  try {
    console.log('🔧 Öz Mevsim Database Setup');
    console.log('================================');
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Test connection
    console.log('📡 Database bağlantısı test ediliyor...');
    const testResult = await pool.query('SELECT NOW(), version()');
    console.log('✅ Database bağlantısı başarılı!');
    console.log(`📊 PostgreSQL Version: ${testResult.rows[0].version.split(' ')[1]}`);
    
    // Read and execute schema
    console.log('📋 Database schema oluşturuluyor...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'database', 'schema.sql'), 'utf8');
    await pool.query(schemaSQL);
    console.log('✅ Schema başarıyla oluşturuldu!');
    
    // Read and execute sample data
    console.log('📊 Örnek veriler ekleniyor...');
    const sampleDataSQL = fs.readFileSync(path.join(__dirname, 'database', 'sample-data.sql'), 'utf8');
    await pool.query(sampleDataSQL);
    console.log('✅ Örnek veriler başarıyla eklendi!');
    
    // Verify installation
    console.log('🔍 Kurulum doğrulanıyor...');
    const result = await pool.query('SELECT COUNT(*) as count FROM products');
    const productCount = result.rows[0].count;
    console.log(`✅ ${productCount} ürün kaydı bulundu`);
    
    const userResult = await pool.query('SELECT COUNT(*) as count FROM users');
    const userCount = userResult.rows[0].count;
    console.log(`✅ ${userCount} kullanıcı kaydı bulundu`);
    
    const categoryResult = await pool.query('SELECT COUNT(*) as count FROM categories');
    const categoryCount = categoryResult.rows[0].count;
    console.log(`✅ ${categoryCount} kategori kaydı bulundu`);
    
    console.log('\n🎉 Database kurulumu tamamlandı!');
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('\n📋 Admin Panel Bilgileri:');
      console.log('URL: http://localhost:3007/admin');
      console.log('Email: admin@ozmevsim.com');
      console.log('Şifre: admin123');
    }
    
    console.log('\n📋 Database Bilgileri:');
    if (process.env.DATABASE_URL) {
      const url = new URL(process.env.DATABASE_URL);
      console.log(`Host: ${url.hostname}`);
      console.log(`Port: ${url.port}`);
      console.log(`Database: ${url.pathname.slice(1)}`);
      console.log(`User: ${url.username}`);
    } else {
      console.log(`Host: ${dbConfig.host}`);
      console.log(`Port: ${dbConfig.port}`);
      console.log(`Database: ${dbConfig.database}`);
      console.log(`User: ${dbConfig.user}`);
    }
    
  } catch (error) {
    console.error('❌ Database kurulumu başarısız:', error.message);
    if (process.env.NODE_ENV === 'development') {
      console.error('📋 Hata detayı:', error);
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

async function resetDatabase() {
  const dbConfig = getDbConfig();
  const pool = new Pool(dbConfig);
  
  try {
    console.log('🔄 Database sıfırlanıyor...');
    
    // Drop all tables
    const dropTablesSQL = `
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `;
    
    await pool.query(dropTablesSQL);
    console.log('✅ Tüm tablolar silindi!');
    
    // Recreate schema and data
    await setupDatabase();
    
  } catch (error) {
    console.error('❌ Database sıfırlama başarısız:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

async function testConnection() {
  const dbConfig = getDbConfig();
  const pool = new Pool(dbConfig);
  
  try {
    console.log('🔍 Database bağlantısı test ediliyor...');
    const result = await pool.query('SELECT NOW(), COUNT(*) as product_count FROM products');
    console.log('✅ Bağlantı başarılı!');
    console.log(`📊 Ürün sayısı: ${result.rows[0].product_count}`);
    console.log(`🕐 Server zamanı: ${result.rows[0].now}`);
  } catch (error) {
    console.error('❌ Database bağlantı hatası:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

function showHelp() {
  console.log('🔧 Öz Mevsim Database Yönetim Aracı');
  console.log('=====================================');
  console.log('');
  console.log('Kullanım:');
  console.log('  node setup-database.js [komut]');
  console.log('');
  console.log('Komutlar:');
  console.log('  setup    - Database schema ve örnek veri kurulumu');
  console.log('  reset    - Database\'i sıfırla ve yeniden kur');
  console.log('  test     - Database bağlantısını test et');
  console.log('  help     - Bu yardım mesajını göster');
  console.log('');
  console.log('Environment Variables:');
  console.log('  DATABASE_URL - Full connection string (production)');
  console.log('  DB_HOST     - Database host (development)');
  console.log('  DB_PORT     - Database port (development)');
  console.log('  DB_NAME     - Database name (development)');
  console.log('  DB_USER     - Database user (development)');
  console.log('  DB_PASSWORD - Database password (development)');
  console.log('');
  console.log('Örnek kullanım:');
  console.log('  npm run db:setup     # Schema kurulumu');
  console.log('  npm run db:reset     # Database sıfırla');
  console.log('  npm run db:test      # Bağlantı testi');
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'setup':
    setupDatabase();
    break;
  case 'reset':
    resetDatabase();
    break;
  case 'test':
    testConnection();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (command) {
      console.error(`❌ Bilinmeyen komut: ${command}`);
    }
    showHelp();
    break;
} 