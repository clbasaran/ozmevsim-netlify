import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET() {
  console.log('🔍 Blog API GET request received');
  try {
    console.log('🔌 Attempting database connection...');
    const client = await dbPool.connect();
    console.log('✅ Database connected successfully');
    
    const result = await client.query(`
      SELECT 
        id, title, content, excerpt, featured_image,
        author_id, slug, tags, meta_title, meta_description,
        is_featured, is_published, published_at,
        created_at, updated_at
      FROM blog_posts 
      WHERE is_published = true 
      ORDER BY published_at DESC, created_at DESC
    `);
    
    console.log(`📊 Found ${result.rows.length} blog posts`);
    client.release();

    const response = NextResponse.json(result.rows);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, excerpt, featured_image, author_id, slug, tags, meta_title, meta_description, is_featured } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const client = await dbPool.connect();
    const result = await client.query(
      `INSERT INTO blog_posts (title, content, excerpt, featured_image, author_id, slug, tags, meta_title, meta_description, is_featured, is_published, published_at, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true, NOW(), NOW(), NOW()) 
       RETURNING *`,
      [title, content, excerpt, featured_image, author_id, slug, 
       JSON.stringify(tags || []), meta_title, meta_description, is_featured || false]
    );
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
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