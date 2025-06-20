import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET() {
  console.log('🔍 References API GET request received');
  try {
    console.log('🔌 Attempting database connection...');
    const client = await dbPool.connect();
    console.log('✅ Database connected successfully');
    
    const result = await client.query(`
      SELECT 
        id, title, description, client_name, project_type,
        location, completion_date, image_url, gallery_images,
        project_value, testimonial, is_featured, is_active,
        created_at, updated_at
      FROM client_references 
      WHERE is_active = true 
      ORDER BY completion_date DESC, created_at DESC
    `);
    
    console.log(`📊 Found ${result.rows.length} references`);
    client.release();

    const response = NextResponse.json(result.rows);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching references:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch references' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, client_name, project_type, location, completion_date, 
            image_url, gallery_images, project_value, testimonial, is_featured } = body;

    if (!title || !client_name) {
      return NextResponse.json(
        { error: 'Title and client name are required' },
        { status: 400 }
      );
    }

    const client = await dbPool.connect();
    const result = await client.query(
      `INSERT INTO client_references (title, description, client_name, project_type, location, completion_date, image_url, gallery_images, project_value, testimonial, is_featured, is_active, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, NOW(), NOW()) 
       RETURNING *`,
      [title, description, client_name, project_type, location, completion_date,
       image_url, JSON.stringify(gallery_images || []), project_value, testimonial, is_featured || false]
    );
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating reference:', error);
    return NextResponse.json(
      { error: 'Failed to create reference' },
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