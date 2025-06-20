import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET() {
  console.log('🔍 FAQ API GET request received');
  try {
    console.log('🔌 Attempting database connection...');
    const client = await dbPool.connect();
    console.log('✅ Database connected successfully');
    
    const result = await client.query(`
      SELECT 
        id, question, answer, category, is_featured,
        sort_order, is_active, created_at, updated_at
      FROM faq 
      WHERE is_active = true 
      ORDER BY sort_order ASC, created_at DESC
    `);
    
    console.log(`📊 Found ${result.rows.length} FAQ items`);
    client.release();

    const response = NextResponse.json(result.rows);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching FAQ items:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch FAQ items' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, category, is_featured, sort_order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const client = await dbPool.connect();
    const result = await client.query(
      `INSERT INTO faq (question, answer, category, is_featured, sort_order, is_active, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW()) 
       RETURNING *`,
      [question, answer, category, is_featured || false, sort_order || 0]
    );
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ item' },
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