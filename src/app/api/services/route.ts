import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET() {
  console.log('🔍 Services API GET request received');
  try {
    console.log('🔌 Attempting database connection...');
    const client = await dbPool.connect();
    console.log('✅ Database connected successfully');
    
    const result = await client.query(`
      SELECT 
        id, title, description, short_description, 
        image_url, icon, features, price_min, price_max,
        is_featured, is_active, sort_order,
        created_at, updated_at
      FROM services 
      WHERE is_active = true 
      ORDER BY sort_order ASC, created_at DESC
    `);
    
    console.log(`📊 Found ${result.rows.length} services`);
    client.release();

    const response = NextResponse.json(result.rows);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, short_description, image_url, icon, features, price_min, price_max, is_featured } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const client = await dbPool.connect();
    const result = await client.query(
      `INSERT INTO services (title, description, short_description, image_url, icon, features, price_min, price_max, is_featured, is_active, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, NOW(), NOW()) 
       RETURNING *`,
      [title, description, short_description, image_url, icon, 
       JSON.stringify(features || []), price_min, price_max, is_featured || false]
    );
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
} 