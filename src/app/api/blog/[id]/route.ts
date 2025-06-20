import { NextRequest, NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const params = context.params;
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    const result = await client.query(
      'SELECT * FROM blog_posts WHERE id = $1 AND is_active = true',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const params = context.params;
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, image_url, author_id, category, tags, is_featured, is_active, meta_title, meta_description } = body;

    // Generate slug if title is provided
    const slug = title ? title.toLowerCase()
      .trim()
      .replace(/[çÇ]/g, 'c')
      .replace(/[ğĞ]/g, 'g')
      .replace(/[ıI]/g, 'i')
      .replace(/[öÖ]/g, 'o')
      .replace(/[şŞ]/g, 's')
      .replace(/[üÜ]/g, 'u')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'blog-' + Date.now() : undefined;

    const client = await dbPool.connect();
    const result = await client.query(
      `UPDATE blog_posts 
       SET title = COALESCE($1, title), slug = COALESCE($2, slug), content = COALESCE($3, content), 
           excerpt = COALESCE($4, excerpt), image_url = COALESCE($5, image_url), author_id = COALESCE($6, author_id),
           category = COALESCE($7, category), tags = COALESCE($8, tags), is_featured = COALESCE($9, is_featured),
           is_active = COALESCE($10, is_active), meta_title = COALESCE($11, meta_title), 
           meta_description = COALESCE($12, meta_description), updated_at = NOW()
       WHERE id = $13 
       RETURNING *`,
      [title, slug, content, excerpt, image_url, author_id, category, 
       JSON.stringify(tags || []), is_featured, is_active, meta_title, meta_description, id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    console.log('✅ Blog post updated successfully:', result.rows[0].id);
    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error updating blog post:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const params = context.params;
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    
    // Soft delete - set is_active to false
    const result = await client.query(
      'UPDATE blog_posts SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    console.log('✅ Blog post deleted successfully:', id);
    const response = NextResponse.json({ message: 'Blog post deleted successfully' });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error deleting blog post:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
} 