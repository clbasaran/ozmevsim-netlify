import { NextRequest, NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    const result = await client.query(
      'SELECT * FROM testimonials WHERE id = $1 AND is_active = true',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching testimonial:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { client_name, client_position, client_company, content, rating, image_url, is_featured, is_active } = body;

    const client = await dbPool.connect();
    const result = await client.query(
      `UPDATE testimonials 
       SET client_name = COALESCE($1, client_name), client_position = COALESCE($2, client_position), 
           client_company = COALESCE($3, client_company), content = COALESCE($4, content), 
           rating = COALESCE($5, rating), image_url = COALESCE($6, image_url), 
           is_featured = COALESCE($7, is_featured), is_active = COALESCE($8, is_active), 
           updated_at = NOW()
       WHERE id = $9 
       RETURNING *`,
      [client_name, client_position, client_company, content, rating, image_url, is_featured, is_active, id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    console.log('✅ Testimonial updated successfully:', result.rows[0].id);
    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error updating testimonial:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update testimonial', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    
    // Soft delete - set is_active to false
    const result = await client.query(
      'UPDATE testimonials SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    console.log('✅ Testimonial deleted successfully:', id);
    const response = NextResponse.json({ message: 'Testimonial deleted successfully' });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error deleting testimonial:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete testimonial', details: error instanceof Error ? error.message : 'Unknown error' },
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