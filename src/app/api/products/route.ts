import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET() {
  console.log('🔍 Products API GET request received');
  try {
    console.log('🔌 Attempting database connection...');
    const client = await dbPool.connect();
    console.log('✅ Database connected successfully');
    
    const result = await client.query(`
      SELECT 
        p.id, p.name, p.description, p.short_description, 
        p.main_image as image_url, p.brand, 
        COALESCE(c.name, 'Genel') as category,
        p.features, p.specifications, p.is_active as status, 
        p.created_at, p.updated_at, p.price, p.stock_status
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true 
      ORDER BY p.sort_order ASC, p.created_at DESC
    `);
    
    console.log(`📊 Found ${result.rows.length} products`);
    client.release();

    // Add CORS headers for client-side access
    const response = NextResponse.json(result.rows);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
    // Add CORS headers for error responses too
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return errorResponse;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, short_description, main_image, brand, category_id, features, specifications, price, stock_status } = body;

    // Validate required fields
    if (!name || !description || !brand) {
      return NextResponse.json(
        { error: 'Name, description, and brand are required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

    const client = await dbPool.connect();
    const result = await client.query(
      `INSERT INTO products (name, slug, description, short_description, main_image, brand, category_id, features, specifications, price, stock_status, is_active, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, NOW(), NOW()) 
       RETURNING *`,
      [name, slug, description, short_description, main_image, brand, category_id, 
       JSON.stringify(features || []), JSON.stringify(specifications || {}), price, stock_status]
    );
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
} 